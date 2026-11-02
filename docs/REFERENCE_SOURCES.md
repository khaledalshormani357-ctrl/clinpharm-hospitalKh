# Reference-source layers and UI labels

ClinPharm currently contains distinct source layers. A record must retain its origin; content from one layer must not be presented as though it came from another. These labels describe provenance, not clinical endorsement.

## A. Extracted book packs

The six compressed packs under `public/books-vault/` (with `index.json`) are DiPiro 13th Edition, ACCP Volume 1, ACCP Volume 2, ACCP Cardiology 2026, Stockley's Drug Interactions, and Clinical Casebook. They are loaded through `fullBookEngine` / `fullBookIdb` into IndexedDB. The packs total about 10 MB compressed; decompressed content is much larger. Their records may include a book title, chapters, page counts, structured tables, a diagnostic report, and a SHA-256 field.

**UI label:** `Extracted book` (or the localized equivalent), with the book, chapter, and page only when those values exist. Show hash availability as metadata only. `sha256` identifies bytes; it does not by itself prove that extracted text is verbatim, complete, clinically reviewed, or guideline-endorsed. Only apply the application's source-state label when the actual record fields support it (`sourceType: google_drive_pdf` and `processingStatus: verified_complete`); otherwise show the actual state or `Source metadata unavailable`.

## B. Hand-written embedded monographs

The 13 TypeScript monograph files in `src/lib/library/monographs/` (about 575 KB) are hand-written embedded summaries, not original book text. A number of records set `isVerbatimSource: true`, but that flag is not evidence that the content is verbatim. The library also classifies these as `embedded_synthetic` / `embedded_summary`.

**Required UI label:** `Embedded summary — not original source text`. Never label this layer `verbatim`, `original`, or `verified`; do not place it in an authoritative extracted dosing table.

## C. Other structured data

This layer includes `src/lib/clinicalReferences.ts`, the DKA and heart-failure knowledge-graph prototypes in `src/lib/knowledgeGraph/`, and the Supabase schemas/migrations. These are not interchangeable with the extracted book packs. Migration `0003` defines book tables; migration `0004` defines topics/drugs/dosing tables but is not applied and must not be represented as an available clinical database.

**UI label:** `Knowledge graph record` for records from the prototype repository; use source-specific labels for reference metadata only when the underlying fields establish them. A database schema or an unapplied migration is not itself a clinical content source. For missing or ambiguous provenance, display `Source metadata unavailable` rather than infer a stronger claim.

## Implementation rule

Derive provenance labels from the record's real `sourceType`, `processingStatus`, and other source fields. Treat `sourceType: unverified_legacy` as unverified legacy content, not as an extracted original. Do not infer provenance from a title, a filename, `isVerbatimSource`, a hash alone, or the presence of a schema. Preserve source fields when displaying or searching content, and report records whose layer cannot be determined instead of relabeling or fabricating it.
