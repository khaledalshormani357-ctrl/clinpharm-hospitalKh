import type { TopicSectionKey } from '../../types/knowledgeGraph';
import { TAB_ROUTES } from '../navigation';

const SECTION_KEYS: TopicSectionKey[] = [
  'overview_definition',
  'epidemiology_risk_factors',
  'pathophysiology',
  'etiology_precipitants',
  'classification_diagnosis',
  'clinical_presentation',
  'investigations_workup',
  'differential_diagnosis',
  'treatment_management',
  'therapeutic_protocols',
  'pharmacotherapy_dosing',
  'organ_dose_adjustment',
  'monitoring_followup',
  'complications',
  'special_populations',
  'discharge_criteria',
  'clinical_guidelines',
  'references_evidence',
  'related_topics',
  'clinical_pearls_faqs'
];

export interface ClinicalTopicRoute {
  topicSlug: string;
  sectionKey?: TopicSectionKey;
}

export function isTopicSectionKey(value: string | undefined): value is TopicSectionKey {
  return Boolean(value && SECTION_KEYS.includes(value as TopicSectionKey));
}

export function clinicalTopicHash(topicSlug: string, sectionKey?: TopicSectionKey): string {
  const encodedSlug = encodeURIComponent(topicSlug.trim());
  const sectionPath = sectionKey ? `/section/${encodeURIComponent(sectionKey)}` : '';
  return `#${TAB_ROUTES.encyclopedia}/${encodedSlug}${sectionPath}`;
}

export function parseClinicalTopicHash(hash: string): ClinicalTopicRoute | null {
  const rawPath = hash.startsWith('#') ? hash.slice(1) : hash;
  const path = rawPath.split('?')[0].replace(/\/$/, '');
  const prefix = `${TAB_ROUTES.encyclopedia}/`;
  if (!path.startsWith(prefix)) return null;

  const segments = path.slice(prefix.length).split('/').filter(Boolean);
  if (!segments.length) return null;

  let topicSlug: string;
  try {
    topicSlug = decodeURIComponent(segments[0]);
  } catch {
    return null;
  }
  if (!topicSlug) return null;

  const sectionKey = segments[1] === 'section' ? segments[2] : undefined;
  return {
    topicSlug,
    ...(isTopicSectionKey(sectionKey) ? { sectionKey } : {})
  };
}
