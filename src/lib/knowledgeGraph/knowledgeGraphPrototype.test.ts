import { describe, expect, it, beforeEach } from 'vitest';
import {
  ALL_PROTOTYPE_CONFLICTS,
  ALL_PROTOTYPE_DOSING,
  ALL_PROTOTYPE_GUIDELINES,
  ALL_PROTOTYPE_RELATIONSHIPS,
  ALL_PROTOTYPE_STATEMENTS,
  ALL_PROTOTYPE_TABLES,
  ALL_PROTOTYPE_TOPICS,
  CLINICAL_DRUGS_PROTOTYPE_DB,
  CLINICAL_TOPIC_DRUG_LINKS,
  KNOWLEDGE_SOURCES_REGISTRY,
  clearKnowledgeGraphSectionCache,
  deduplicateKnowledgeStatements,
  getClinicalTopicMetadata,
  getKnowledgeGraphSectionCacheStats,
  getLazySectionPayload,
  getTopicSummaryCatalog,
  resolveKnowledgeGraphUri,
  searchKnowledgeGraphPrototype,
  verifyCitationTraceability
} from './prototypeRepository';
import { getAllVerbatimBooks, searchVerbatimLibrary } from '../library';
import { resolveLocalReference } from '../clinicalReferences';
import { KnowledgeStatement } from '../../types/knowledgeGraph';

describe('Phase 3 Clinical Knowledge Graph Prototype — DKA & Heart Failure', () => {
  beforeEach(() => {
    clearKnowledgeGraphSectionCache();
  });

  it('1. Enforces strict composite referential integrity across topics, sections, statements, drugs, dosing, and guidelines', () => {
    expect(ALL_PROTOTYPE_TOPICS.length).toBe(2);

    for (const topic of ALL_PROTOTYPE_TOPICS) {
      // Every topic has the 20 standard clinical section slots in its manifest
      expect(topic.sectionsManifest.length).toBe(20);

      for (const section of topic.sectionsManifest) {
        expect(section.topicId).toBe(topic.id);
        const matchingStatements = ALL_PROTOTYPE_STATEMENTS.filter(
          st => st.topicId === topic.id && st.sectionId === section.id
        );
        expect(section.populatedStatementCount).toBe(matchingStatements.length);

        if (section.availabilityStatus === 'populated') {
          expect(matchingStatements.length).toBeGreaterThan(0);
          expect(section.sourceIds.length).toBeGreaterThan(0);
        } else {
          expect(matchingStatements.length).toBe(0);
          expect(section.availabilityNoteEn?.length).toBeGreaterThan(20);
          expect(section.availabilityNoteAr?.length).toBeGreaterThan(20);
        }
      }
    }

    // Verify every statement's composite (topicId, sectionId, sectionKey) matches its parent section
    for (const stmt of ALL_PROTOTYPE_STATEMENTS) {
      const parentTopic = getClinicalTopicMetadata(stmt.topicId);
      expect(parentTopic).toBeDefined();
      const parentSection = parentTopic!.sectionsManifest.find(s => s.id === stmt.sectionId);
      expect(parentSection).toBeDefined();
      expect(parentSection!.sectionKey).toBe(stmt.sectionKey);
      expect(stmt.citations.length).toBeGreaterThan(0);
    }

    // Verify every dosing record links to a valid normalized drug, topic, and source
    const drugIds = new Set(CLINICAL_DRUGS_PROTOTYPE_DB.map(d => d.id));
    const sourceIds = new Set(KNOWLEDGE_SOURCES_REGISTRY.map(s => s.id));
    for (const dosing of ALL_PROTOTYPE_DOSING) {
      expect(drugIds.has(dosing.drugId)).toBe(true);
      expect(sourceIds.has(dosing.sourceId)).toBe(true);
      expect(getClinicalTopicMetadata(dosing.indicationTopicId)).toBeDefined();
      for (const adj of dosing.organAdjustments) {
        expect(adj.dosingId).toBe(dosing.id);
        expect(adj.drugId).toBe(dosing.drugId);
        expect(adj.topicId).toBe(dosing.indicationTopicId);
      }
    }

    // Verify clinical_topic_drugs join table integrity
    for (const link of CLINICAL_TOPIC_DRUG_LINKS) {
      expect(getClinicalTopicMetadata(link.topicId)).toBeDefined();
      expect(drugIds.has(link.drugId)).toBe(true);
      expect(sourceIds.has(link.sourceId)).toBe(true);
    }

    // Verify tables and guideline recommendations link to valid topics, sections, and sources
    for (const tbl of ALL_PROTOTYPE_TABLES) {
      const topic = getClinicalTopicMetadata(tbl.topicId);
      expect(topic).toBeDefined();
      expect(topic!.sectionsManifest.some(s => s.id === tbl.sectionId)).toBe(true);
      expect(sourceIds.has(tbl.sourceId)).toBe(true);
    }

    for (const rec of ALL_PROTOTYPE_GUIDELINES) {
      const topic = getClinicalTopicMetadata(rec.topicId);
      expect(topic).toBeDefined();
      expect(topic!.sectionsManifest.some(s => s.id === rec.sectionId)).toBe(true);
      expect(sourceIds.has(rec.sourceId)).toBe(true);
    }
  });

  it('2. Verifies 100% source traceability to real VERBATIM_BOOKS chapters and sections with zero phantom sources', () => {
    for (const stmt of ALL_PROTOTYPE_STATEMENTS) {
      for (const citation of stmt.citations) {
        const trace = verifyCitationTraceability(citation);
        expect(trace.isValid, trace.reason || `Failed citation ${citation.id}`).toBe(true);
        expect(trace.sourceExistsInLibrary).toBe(true);
        expect(trace.chapterExistsInBook).toBe(true);
        expect(trace.sectionExistsInChapter).toBe(true);
        expect(trace.hasNonEmptyPageAndSectionRef).toBe(true);
        expect(trace.hasVerbatimExcerpt).toBe(true);
      }
    }

    // DKA uses ONLY the 4 relevant sources that actually document DKA in the library
    const dkaTopic = getClinicalTopicMetadata('topic-dka')!;
    expect(dkaTopic.contributingSources).toEqual([
      'accp-2026-vol2',
      'dipiro-13th-ed',
      'hospital-compendium',
      'clinical-casebook-guide'
    ]);
    expect(dkaTopic.contributingSources).not.toContain('accp-cardiology-2026');
    expect(dkaTopic.contributingSources).not.toContain('stockleys-drug-interactions');

    // Heart Failure uses ONLY the 5 relevant sources that actually document HF in the library
    const hfTopic = getClinicalTopicMetadata('topic-heart-failure')!;
    expect(hfTopic.contributingSources).toEqual([
      'dipiro-13th-ed',
      'accp-cardiology-2026',
      'accp-2026-vol2',
      'stockleys-drug-interactions',
      'clinical-casebook-guide'
    ]);
  });

  it('3. Enforces 3-layer provenance separation and anti-hallucination guard (never AI-generated)', () => {
    const allowedMethods = new Set([
      'verbatim_extraction',
      'deterministic_rule_extraction',
      'pharmacist_curated'
    ]);

    for (const stmt of ALL_PROTOTYPE_STATEMENTS) {
      expect(allowedMethods.has(stmt.generationMethod)).toBe(true);
      expect(stmt.generationMethod).not.toBe('ai_generated');
      // Layer 1 (Clinical summary) & Layer 2 (Verbatim original text) must be distinct and non-empty
      expect(stmt.verbatimSourceText.trim().length).toBeGreaterThan(30);
      expect(stmt.statementTextEn.trim().length).toBeGreaterThan(30);
      expect(stmt.statementTextAr.trim().length).toBeGreaterThan(30);
    }

    for (const dosing of ALL_PROTOTYPE_DOSING) {
      expect(allowedMethods.has(dosing.generationMethod)).toBe(true);
      expect(dosing.verbatimDosingExcerpt.trim().length).toBeGreaterThan(25);
    }
  });

  it('4. Treats the 20 sections as non-mandatory and marks undocumented sections honestly without synthetic filler', () => {
    const dkaEpiPayload = getLazySectionPayload('topic-dka', 'epidemiology_risk_factors');
    expect(dkaEpiPayload).toBeDefined();
    expect(dkaEpiPayload!.section.availabilityStatus).toBe('not_documented_in_current_sources');
    expect(dkaEpiPayload!.statements.length).toBe(0);
    expect(dkaEpiPayload!.section.availabilityNoteEn).toContain('not separately tabulated');
  });

  it('5. Deduplicates multi-source statements with identical fingerprints while preserving conflicting evidence separately', () => {
    const baseStmt = ALL_PROTOTYPE_STATEMENTS.find(s => s.id === 'stmt-dka-patho-1')!;
    const duplicateFromSecondSource: KnowledgeStatement = {
      ...baseStmt,
      id: 'stmt-dka-patho-1-dup',
      verificationStatus: 'verified_single_source',
      citations: [
        {
          id: 'cit-dka-patho-dup-dipiro',
          knowledgeStatementId: 'stmt-dka-patho-1-dup',
          sourceId: 'dipiro-13th-ed',
          monographChapterId: 'dipiro-ch83-endocrine-dka',
          monographSectionId: 'dipiro-endo-sec1',
          edition: '13th Edition (2026)',
          publicationYear: 2026,
          chapterNumber: 83,
          chapterTitle: 'Endocrine Disorders: DKA',
          sectionReference: 'Section 6.1',
          pageRange: 'pp. 1190–1255',
          verbatimExcerpt:
            'Diabetic Ketoacidosis (DKA) is characterized by the triad of hyperglycemia, high-anion-gap metabolic acidosis, and ketonemia.',
          sourceLocationUri:
            'local://ref/verbatim/dipiro-13th-ed/dipiro-ch83-endocrine-dka/dipiro-endo-sec1',
          citationRole: 'corroborating_source',
          extractionMethod: 'curated_monograph'
        }
      ]
    };

    const merged = deduplicateKnowledgeStatements([baseStmt, duplicateFromSecondSource]);
    expect(merged.length).toBe(1);
    expect(merged[0].citations.length).toBe(2);
    expect(merged[0].verificationStatus).toBe('verified_multi_source');

    // Conflicting statements must NEVER be merged even if passed with identical fingerprint
    const conflictStmtA = ALL_PROTOTYPE_STATEMENTS.find(s => s.id === 'stmt-dka-insulin-1')!;
    const conflictStmtB: KnowledgeStatement = {
      ...conflictStmtA,
      id: 'stmt-dka-insulin-1-alt'
    };
    const conflictResult = deduplicateKnowledgeStatements([conflictStmtA, conflictStmtB]);
    expect(conflictResult.length).toBe(2);

    // Verify all 5 documented conflict groups exist across DKA (3) and Heart Failure (2)
    expect(ALL_PROTOTYPE_CONFLICTS.length).toBe(5);
    const dkaConflicts = ALL_PROTOTYPE_CONFLICTS.filter(c => c.topicId === 'topic-dka');
    const hfConflicts = ALL_PROTOTYPE_CONFLICTS.filter(c => c.topicId === 'topic-heart-failure');
    expect(dkaConflicts.length).toBe(3);
    expect(hfConflicts.length).toBe(2);

    for (const cg of ALL_PROTOTYPE_CONFLICTS) {
      expect(cg.positions.length).toBeGreaterThanOrEqual(2);
      expect(cg.resolutionGuidanceEn.length).toBeGreaterThan(20);
      expect(cg.resolutionGuidanceAr.length).toBeGreaterThan(20);
    }
  });

  it('6. Connects Heart Failure to all 13 required clinical/pharmacological topics and DKA to its 5 related topics with navigable URIs', () => {
    const hfRels = ALL_PROTOTYPE_RELATIONSHIPS.filter(
      r => r.sourceTopicId === 'topic-heart-failure'
    );
    expect(hfRels.length).toBe(13);

    const expectedHfTargets = [
      'topic-hfref',
      'topic-hfpef',
      'topic-adhf',
      'topic-cardiogenic-shock',
      'topic-loop-diuretics',
      'topic-ace-inhibitors',
      'topic-arbs',
      'topic-arni',
      'topic-beta-blockers-hf',
      'topic-sglt2-inhibitors',
      'topic-hyperkalemia',
      'topic-aki-ckd',
      'topic-hypertension'
    ];
    expect(hfRels.map(r => r.targetTopicId)).toEqual(expectedHfTargets);

    for (const rel of ALL_PROTOTYPE_RELATIONSHIPS) {
      const resolvedTarget = resolveKnowledgeGraphUri(rel.targetTopicUri);
      expect(resolvedTarget, `Unresolvable URI: ${rel.targetTopicUri}`).toBeDefined();
      const resolvedSource = resolveKnowledgeGraphUri(rel.sourceLocationUri);
      expect(resolvedSource, `Unresolvable source URI: ${rel.sourceLocationUri}`).toBeDefined();
    }

    // Verify DKA <-> Heart Failure bridge resolves directly to the Heart Failure topic
    const dkaToHfEdge = ALL_PROTOTYPE_RELATIONSHIPS.find(
      r => r.id === 'rel-dka-heart-failure-sglt2-bridge'
    );
    expect(dkaToHfEdge).toBeDefined();
    const nav = resolveKnowledgeGraphUri(dkaToHfEdge!.targetTopicUri);
    expect(nav?.targetType).toBe('knowledge_topic');
    expect(nav?.topicId).toBe('topic-heart-failure');
  });

  it('7. Protects Android WebView memory via lazy section loading and bounded LRU section cache', () => {
    const catalog = getTopicSummaryCatalog();
    expect(catalog.length).toBe(2);
    // Catalog call does not populate the section LRU cache
    expect(getKnowledgeGraphSectionCacheStats().cachedSectionCount).toBe(0);

    // Load 1 section -> cache size becomes 1
    const sec1 = getLazySectionPayload('topic-dka', 'overview_definition');
    expect(sec1?.statements.length).toBeGreaterThan(0);
    expect(getKnowledgeGraphSectionCacheStats().cachedSectionCount).toBe(1);

    // Load 12 sections sequentially -> LRU cache never exceeds maxCacheCapacity (8)
    const hfTopic = getClinicalTopicMetadata('topic-heart-failure')!;
    for (const sec of hfTopic.sectionsManifest.slice(0, 12)) {
      getLazySectionPayload('topic-heart-failure', sec.sectionKey);
    }

    const statsAfter12 = getKnowledgeGraphSectionCacheStats();
    expect(statsAfter12.cachedSectionCount).toBeLessThanOrEqual(statsAfter12.maxCacheCapacity);
    expect(statsAfter12.cachedSectionCount).toBe(8);
  });

  it('8. Preserves 100% backward compatibility with existing Verbatim Library and resolveLocalReference', () => {
    const books = getAllVerbatimBooks();
    expect(books.length).toBeGreaterThanOrEqual(7);

    const searchHits = searchVerbatimLibrary('Sacubitril');
    expect(searchHits.length).toBeGreaterThan(0);

    const legacyRef = resolveLocalReference('local://ref/chapter/dipiro-13-hf-cardiorenal');
    expect(legacyRef.chapter.id).toBe('dipiro-13-hf-cardiorenal');

    const topicRef = resolveLocalReference('local://ref/topic/diabetic-ketoacidosis-dka');
    expect(topicRef.verbatimChapterId).toBe('accp-v2-cirrhosis-dka');

    const kgMatches = searchKnowledgeGraphPrototype('Potassium 3.3');
    expect(kgMatches.some(m => m.topic.id === 'topic-dka')).toBe(true);
  });
});
