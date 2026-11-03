import { useCallback, useMemo, useState, useEffect } from 'react';
import type { KnowledgeCitation, LazyTopicSectionPayload, TopicSectionKey, TopicSummaryIndexItem } from '../types/knowledgeGraph';
import { getCitationSourceDetails, getSourceProvenanceForSourceId, type CitationSourceDetails } from '../lib/knowledgeGraph/provenance';
import {
  clearKnowledgeGraphSectionCache,
  getClinicalTopicMetadata,
  getLazySectionPayload,
  getKnowledgeGraphSectionCacheStats,
  getTopicConflictGroups,
  getTopicDrugLinks,
  getTopicRelationships,
  getTopicSummaryCatalog,
  resolveKnowledgeGraphUri,
  searchKnowledgeGraphPrototype
} from '../lib/knowledgeGraph/prototypeRepository';

export function useClinicalKnowledgeGraph() {
  const [catalog, setCatalog] = useState<TopicSummaryIndexItem[]>(() => getTopicSummaryCatalog());

  useEffect(() => {
    const refresh = () => setCatalog(getTopicSummaryCatalog());
    window.addEventListener('clinpharm-full-books-updated', refresh);
    return () => window.removeEventListener('clinpharm-full-books-updated', refresh);
  }, []);

  const getTopic = useCallback((topicIdOrSlug: string) => getClinicalTopicMetadata(topicIdOrSlug), []);
  const loadSection = useCallback(
    (topicIdOrSlug: string, sectionKey: TopicSectionKey) =>
      getLazySectionPayload(topicIdOrSlug, sectionKey),
    []
  );
  const getRelations = useCallback((topicId: string) => getTopicRelationships(topicId), []);
  const getConflicts = useCallback((topicId: string) => getTopicConflictGroups(topicId), []);
  const getDrugLinks = useCallback((topicId: string) => getTopicDrugLinks(topicId), []);
  const search = useCallback((query: string) => searchKnowledgeGraphPrototype(query), []);
  const resolveUri = useCallback((uri: string) => resolveKnowledgeGraphUri(uri), []);
  const cacheStats = useMemo(() => getKnowledgeGraphSectionCacheStats(), [catalog]);

  return {
    catalog,
    getTopic,
    loadSection,
    getRelations,
    getConflicts,
    getDrugLinks,
    search,
    resolveUri,
    cacheStats,
    clearCache: clearKnowledgeGraphSectionCache
  };
}

/** Loads a single selected section, not every topic or the full book library. */
export function useLazyClinicalTopicSection(
  topicId: string | undefined,
  sectionKey: TopicSectionKey,
  enabled: boolean
): LazyTopicSectionPayload | null {
  const [payload, setPayload] = useState<LazyTopicSectionPayload | null>(null);

  useEffect(() => {
    if (!enabled || !topicId) {
      setPayload(null);
      return;
    }
    setPayload(getLazySectionPayload(topicId, sectionKey) || null);
  }, [enabled, topicId, sectionKey]);

  return payload;
}

export function useCitationProvenance(citations: KnowledgeCitation[]): Array<{ citation: KnowledgeCitation; source: CitationSourceDetails }> {
  return useMemo(
    () => citations.map(citation => ({ citation, source: getCitationSourceDetails(citation) })),
    [citations]
  );
}

export function useSourceProvenance(sourceId: string): CitationSourceDetails {
  return useMemo(() => getSourceProvenanceForSourceId(sourceId), [sourceId]);
}
