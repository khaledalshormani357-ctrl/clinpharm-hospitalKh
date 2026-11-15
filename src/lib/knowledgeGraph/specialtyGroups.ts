import type { TopicSummaryIndexItem } from '../../types/knowledgeGraph';
import type { MedicalSystemCategory } from '../library/libraryTypes';

export interface SpecialtyGroupDefinition {
  id: string;
  labelEn: string;
  labelAr: string;
  sourceSpecialty?: MedicalSystemCategory;
}

export interface SpecialtyGroup extends SpecialtyGroupDefinition {
  topics: TopicSummaryIndexItem[];
  count: number;
}

/** Categories only; a group without an exact source specialty remains empty. */
export const SPECIALTY_GROUPS: SpecialtyGroupDefinition[] = [
  { id: 'cardiology', labelEn: 'Cardiology', labelAr: 'أمراض القلب والشرايين', sourceSpecialty: 'Cardiology' },
  { id: 'critical-care-infectious-disease', labelEn: 'Critical Care & Infectious Disease', labelAr: 'العناية المركزة والأمراض المعدية', sourceSpecialty: 'Critical Care & Infectious Disease' },
  { id: 'nephrology-fluids', labelEn: 'Nephrology & Fluids', labelAr: 'أمراض الكلى والسوائل', sourceSpecialty: 'Nephrology & Fluids' },
  { id: 'gastroenterology-hepatology', labelEn: 'Gastroenterology & Hepatology', labelAr: 'أمراض الجهاز الهضمي والكبد', sourceSpecialty: 'Gastroenterology & Hepatology' },
  { id: 'endocrinology-metabolism', labelEn: 'Endocrinology & Metabolism', labelAr: 'الغدد الصماء والاستقلاب', sourceSpecialty: 'Endocrinology & Metabolism' },
  { id: 'clinical-methodology-ppcp', labelEn: 'Clinical Methodology & PPCP', labelAr: 'المنهجية السريرية وPPCP', sourceSpecialty: 'Clinical Methodology & PPCP' },
  { id: 'hospital-dosing-protocols', labelEn: 'Hospital Dosing & IV Protocols', labelAr: 'جرعات المستشفى وبروتوكولات الوريد', sourceSpecialty: 'Hospital Dosing & IV Protocols' },
  { id: 'drug-interactions-safety', labelEn: 'Drug Interactions & Safety', labelAr: 'التداخلات الدوائية وسلامة الدواء', sourceSpecialty: 'Drug Interactions & Safety' },
  { id: 'emergency-medicine', labelEn: 'Emergency Medicine', labelAr: 'طب الطوارئ' },
  { id: 'hematology-oncology', labelEn: 'Hematology & Oncology', labelAr: 'أمراض الدم والأورام' },
  { id: 'neurology', labelEn: 'Neurology', labelAr: 'طب الأعصاب' },
  { id: 'pulmonology', labelEn: 'Pulmonology', labelAr: 'أمراض الرئة' },
  { id: 'pediatrics', labelEn: 'Pediatrics', labelAr: 'طب الأطفال' },
  { id: 'psychiatry', labelEn: 'Psychiatry', labelAr: 'الطب النفسي' },
  { id: 'rheumatology', labelEn: 'Rheumatology', labelAr: 'أمراض الروماتيزم' }
];

export function buildSpecialtyGroups(topics: TopicSummaryIndexItem[]): SpecialtyGroup[] {
  return SPECIALTY_GROUPS.map(group => {
    const matchingTopics = group.sourceSpecialty
      ? topics.filter(topic => topic.specialty === group.sourceSpecialty)
      : [];
    return { ...group, topics: matchingTopics, count: matchingTopics.length };
  });
}
