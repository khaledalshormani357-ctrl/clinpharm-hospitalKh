// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useState } from 'react';
import type { KnowledgeCitation } from '../../types/knowledgeGraph';
import { ClinicalEncyclopediaPage } from './ClinicalEncyclopediaPage';
import { ClinicalTopicSidebar } from './ClinicalTopicSidebar';
import { useTopicHistory } from '../../hooks/useTopicHistory';
import { buildSpecialtyGroups } from '../../lib/knowledgeGraph/specialtyGroups';
import { clinicalTopicHash, parseClinicalTopicHash } from '../../lib/knowledgeGraph/topicRoutes';
import { deriveSourceProvenance, getSourceProvenanceForSourceId, unavailableValue } from '../../lib/knowledgeGraph/provenance';
import { ALL_PROTOTYPE_RELATIONSHIPS, getClinicalTopicMetadata, getTopicSummaryCatalog, resolveKnowledgeGraphUri } from '../../lib/knowledgeGraph/prototypeRepository';
import { CitationPopover } from './CitationPopover';

const catalog = getTopicSummaryCatalog();

afterEach(() => {
  cleanup();
  localStorage.clear();
  window.history.replaceState({}, '', '/');
  document.getElementById('drawer-trigger-test')?.remove();
  vi.unstubAllGlobals();
});

describe('clinical encyclopedia route and repository', () => {
  it('round-trips a topic and a valid section through a deep link', () => {
    const url = clinicalTopicHash('demo-topic', 'clinical_presentation');
    expect(url).toBe('#/encyclopedia/demo-topic/section/clinical_presentation');
    expect(parseClinicalTopicHash(url)).toEqual({ topicSlug: 'demo-topic', sectionKey: 'clinical_presentation' });
    expect(parseClinicalTopicHash('#/encyclopedia/demo-topic/section/not-a-section')).toEqual({ topicSlug: 'demo-topic' });
    expect(parseClinicalTopicHash('#/encyclopedia/%E0%A4%A')).toBeNull();
  });

  it('counts only topics actually present and keeps empty categories explicit', () => {
    const groups = buildSpecialtyGroups(catalog);
    expect(groups).toHaveLength(15);
    expect(groups.reduce((sum, group) => sum + group.count, 0)).toBe(catalog.length);
    expect(groups.flatMap(group => group.topics.map(topic => topic.id)).sort()).toEqual(catalog.map(topic => topic.id).sort());
    expect(groups.some(group => group.count === 0)).toBe(true);
  });

  it('resolves all recorded relationship target URIs against existing repository records', () => {
    const unresolved = ALL_PROTOTYPE_RELATIONSHIPS.filter(relationship => !resolveKnowledgeGraphUri(relationship.targetTopicUri));
    expect(unresolved).toEqual([]);
  });

  it('classifies source layers only from sourceType and processingStatus fields', () => {
    expect(deriveSourceProvenance({ sourceType: 'google_drive_pdf', processingStatus: 'verified_complete' })).toEqual({ layer: 'extracted_original_book', state: 'pending-review' });
    expect(deriveSourceProvenance({ sourceType: 'local_file_pdf', processingStatus: 'verified_complete' })).toEqual({ layer: 'extracted_original_book', state: 'pending-review' });
    expect(deriveSourceProvenance({ sourceType: 'embedded_synthetic' })).toEqual({ layer: 'embedded_summary', state: 'summarized' });
    expect(deriveSourceProvenance({ sourceType: 'unverified_legacy' })).toEqual({ layer: 'unverified_legacy', state: 'pending-review' });
    expect(deriveSourceProvenance({})).toEqual({ layer: 'source_metadata_unavailable', state: 'source-metadata-unavailable' });
    expect(getSourceProvenanceForSourceId('missing-test-source').layer).toBe('source_metadata_unavailable');
    expect(unavailableValue('', 'en')).toBe('Unavailable');
    expect(unavailableValue(null, 'ar')).toBe('غير متاح');
  });

  it('renders missing citation source/page/year/evidence metadata as unavailable, not inferred', () => {
    const citation = {
      id: 'citation-gap-test',
      knowledgeStatementId: 'statement-gap-test',
      sourceId: 'missing-test-source',
      monographChapterId: '',
      monographSectionId: '',
      edition: '',
      publicationYear: 0,
      chapterNumber: 0,
      chapterTitle: '',
      sectionReference: '',
      pageRange: '',
      verbatimExcerpt: '',
      sourceLocationUri: 'local://ref/verbatim/missing/missing/missing',
      citationRole: 'primary_source',
      extractionMethod: 'curated_monograph'
    } satisfies KnowledgeCitation;
    const source = getSourceProvenanceForSourceId(citation.sourceId);
    render(<CitationPopover citation={citation} source={source} lang="en" canOpen={false} onOpenReference={vi.fn()} />);
    fireEvent.click(screen.getByText(/citation-gap-test|missing-test-source/));
    expect(screen.getAllByText('Unavailable').length).toBeGreaterThanOrEqual(5);
    expect(screen.getAllByText('Source metadata unavailable').length).toBeGreaterThan(0);
    expect(screen.getByRole('status').textContent).toContain('does not resolve');
  });
});

describe('topic drawer and history', () => {
  it('exposes all current topics in RTL and closes the mobile drawer with Escape', async () => {
    const close = vi.fn();
    const trigger = document.createElement('button');
    trigger.id = 'drawer-trigger-test';
    trigger.textContent = 'Open topics';
    document.body.appendChild(trigger);
    trigger.focus();
    const groups = buildSpecialtyGroups(catalog);
    function DrawerHarness() {
      const [open, setOpen] = useState(true);
      return <ClinicalTopicSidebar
        topics={catalog}
        groups={groups}
        selectedSpecialtyId={null}
        favoriteIds={[]}
        recentIds={[]}
        searchQuery=""
        filter="all"
        sortMode="category"
        lang="ar"
        mobileOpen={open}
        onSearchChange={vi.fn()}
        onFilterChange={vi.fn()}
        onSortModeChange={vi.fn()}
        onSpecialtySelect={vi.fn()}
        onSelectTopic={vi.fn()}
        onToggleFavorite={vi.fn()}
        onCloseMobile={() => { close(); setOpen(false); }}
      />;
    }
    render(<DrawerHarness />);
    const dialog = screen.getByRole('dialog', { name: 'قائمة الموضوعات' });
    expect(dialog.getAttribute('dir')).toBe('rtl');
    expect(document.activeElement).toBe(dialog.querySelector('[data-topic-drawer-close]'));
    expect(screen.getAllByText('لا توجد موضوعات متاحة بعد').length).toBeGreaterThan(0);
    fireEvent.keyDown(dialog, { key: 'Escape' });
    expect(close).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(document.activeElement).toBe(trigger));
    trigger.remove();
  });

  it('persists only topic IDs in favorites and recents', () => {
    function Harness() {
      const { favorites, recentTopics, toggleFavorite, recordVisit } = useTopicHistory();
      return <div>
        <button onClick={() => toggleFavorite('demo-topic-1')}>toggle favorite</button>
        <button onClick={() => recordVisit('demo-topic-1')}>visit topic</button>
        <span data-testid="favorites">{favorites.join(',')}</span>
        <span data-testid="recents">{recentTopics.join(',')}</span>
      </div>;
    }
    render(<Harness />);
    fireEvent.click(screen.getByText('toggle favorite'));
    fireEvent.click(screen.getByText('visit topic'));
    expect(localStorage.getItem('clinpharm_topic_favorites_v1')).toBe('["demo-topic-1"]');
    expect(localStorage.getItem('clinpharm_topic_recents_v1')).toBe('["demo-topic-1"]');
    expect(screen.getByTestId('favorites').textContent).toBe('demo-topic-1');
  });
});

describe('clinical encyclopedia page', () => {
  it('renders the current local topic offline, filters empty sections, and updates a section deep link', async () => {
    const topicRecord = catalog[0];
    const topic = getClinicalTopicMetadata(topicRecord.id)!;
    window.history.replaceState({}, '', clinicalTopicHash(topic.slug));
    const fetchMock = vi.fn(() => Promise.reject(new Error('offline')));
    vi.stubGlobal('fetch', fetchMock);
    render(<ClinicalEncyclopediaPage lang="en" onOpenReference={vi.fn()} />);

    await waitFor(() => expect(screen.getByTestId('clinical-topic-header')).toBeTruthy());
    expect(screen.getByRole('heading', { level: 1, name: topic.englishName })).toBeTruthy();
    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getAllByTestId(/^topic-section-/)).toHaveLength(topic.sectionsManifest.filter(section => section.availabilityStatus === 'populated').length);
    expect(localStorage.getItem('clinpharm_topic_recents_v1')).toContain(topic.id);

    const section = topic.sectionsManifest.find(item => item.availabilityStatus === 'populated');
    expect(section).toBeTruthy();
    const sectionButton = screen.getAllByRole('button', { name: new RegExp(section!.titleEn.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) })[0];
    act(() => fireEvent.click(sectionButton));
    expect(window.location.hash).toBe(clinicalTopicHash(topic.slug, section!.sectionKey));
  });
});
