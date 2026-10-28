# Clinical Knowledge Base — design and safety contract

## Purpose
Convert locally imported reference-book PDF page text into searchable, source-cited retrieval records for ClinPharm Hospital. The Android package remains small; reference content is imported after installation.

## Current implementation in this branch
- Normalizes extracted text and splits long pages into overlapping chunks.
- Keeps source ID/title, edition when available, chapter/section labels, and exact PDF page number with every chunk.
- Provides lexical retrieval over already imported IndexedDB book pages and includes a small number of cited passages in the Copilot grounding context.
- Includes a configurable serialized-library budget; default limit is 950 MiB (below 1 GiB).
- Keeps every newly converted record marked `needs_review`.

## Important limitations
- This is a foundation, not proof that the actual Google Drive books have been downloaded, parsed, or reviewed. The app still needs the user to import accessible source PDFs.
- Lexical retrieval is not semantic understanding, and domain labels are heuristic.
- PDF extraction may miss text in scanned/image-only pages, distort multi-column layouts, or misread tables. OCR and table validation are separate requirements.
- No automatically extracted dose, contraindication, diagnosis criterion, or treatment recommendation is considered validated. A qualified reviewer must confirm clinical records against the cited source and current applicable guidance.
- The size check estimates UTF-8 JSON serialization; it does not yet measure a final compressed release artifact or native Android disk usage. Before publishing a downloadable library, produce an actual versioned package, calculate its SHA-256, and verify its final byte size is below 1 GiB.
- This branch does not upload books, change Supabase schemas/data, call paid services, or modify `main`.

## Target production architecture
1. Source manifest with title, edition, publisher, language, access/license metadata, file hash, and import timestamp.
2. Extraction pipeline with page-level provenance, OCR detection, table extraction, normalization, and extraction-quality flags.
3. Search index for disease, presentation, differential diagnosis, diagnostics, treatment, drug dosing, interactions, contraindications, monitoring, and clinical algorithms.
4. Each clinical statement must retain its source/page citation, applicable population, units, evidence status, and review history.
5. Offline package with version manifest, checksum verification, safe resumable download, atomic install/update, rollback, and a storage budget under 1 GiB.
6. AI retrieval must quote only selected source passages, cite them inline, flag missing evidence, and never treat unreviewed extracted text as a validated clinical directive.

## Validation gates before clinical deployment
- Corpus inventory and rights/access check.
- Extraction coverage and OCR/table spot-checks.
- Golden-query retrieval tests with expected source pages.
- Independent clinical review of high-risk content (dose calculations, renal/hepatic adjustment, pregnancy, pediatrics, anticoagulation, insulin, electrolytes, and high-alert infusions).
- Offline Android install/update/recovery tests.
- Final package size and integrity verification.
