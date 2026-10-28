import {
  CLINICAL_LIBRARY_MAX_BYTES,
  estimateUtf8Bytes,
  ClinicalKnowledgeRecord
} from './knowledgeSchema';

export interface LibrarySizeEstimate {
  recordCount: number;
  textBytes: number;
  serializedBytes: number;
  allowedBytes: number;
  withinBudget: boolean;
  remainingBytes: number;
}

/** Conservative UTF-8 estimate for the serialized JSON payload before compression. */
export function estimateKnowledgeLibrarySize(
  records: ClinicalKnowledgeRecord[],
  allowedBytes = CLINICAL_LIBRARY_MAX_BYTES
): LibrarySizeEstimate {
  const serialized = JSON.stringify(records);
  const serializedBytes = estimateUtf8Bytes(serialized);
  return {
    recordCount: records.length,
    textBytes: records.reduce((sum, record) => sum + estimateUtf8Bytes(record.text), 0),
    serializedBytes,
    allowedBytes,
    withinBudget: serializedBytes <= allowedBytes,
    remainingBytes: Math.max(0, allowedBytes - serializedBytes)
  };
}

export function assertWithinKnowledgeLibraryBudget(
  records: ClinicalKnowledgeRecord[],
  allowedBytes = CLINICAL_LIBRARY_MAX_BYTES
): LibrarySizeEstimate {
  const estimate = estimateKnowledgeLibrarySize(records, allowedBytes);
  if (!estimate.withinBudget) {
    throw new Error(
      `Clinical library exceeds its ${allowedBytes}-byte budget (${estimate.serializedBytes} bytes estimated). Reduce or split the library before publishing.`
    );
  }
  return estimate;
}
