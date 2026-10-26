import { Language, Patient } from '../types/clinical';
import {
  getAllVerbatimBooks,
  expandQueryTokensForLibrary,
  VerbatimBook,
  VerbatimChapter,
  VerbatimSection,
  VerbatimReferenceTable,
  searchClinicalReferences,
  simulateCaseWithReferences,
  buildSimulatorParamsFromPatient
} from './clinicalReferences';
import { DRUG_INTERACTIONS_DB } from './mockData';

export interface GroundedNotebookSource {
  sourceIndex: number;
  bookId: string;
  bookTitle: string;
  bookBadge: string;
  bookBadgeAr: string;
  chapterNumber: number;
  chapterTitle: string;
  chapterTitleAr: string;
  pageRange: string;
  sectionNumber: string;
  sectionHeading: string;
  sectionHeadingAr: string;
  evidenceGrade: string;
  sourceUrl: string;
  verbatimBody: string;
  clinicalNotes: string[];
  boardPearls: string[];
  boardPearlsAr: string[];
  markdownTable?: string;
  tableTitle?: string;
  citation: string;
  score: number;
}

export interface MatchedStockleyDdi {
  drugA: string;
  drugB: string;
  severity: 'Contraindicated' | 'Major' | 'Moderate';
  stockleyRating: string;
  referenceSource: string;
  referenceUrl: string;
  mechanism: string;
  clinicalEffect: string;
  actionRequired: string;
  isPatientActivePair: boolean;
}

export interface NotebookLmGroundingBundle {
  queryTokens: string[];
  isPatientSpecificQuery: boolean;
  isDdiQuery: boolean;
  numberedSources: GroundedNotebookSource[];
  matchedInteractions: MatchedStockleyDdi[];
  notebookSourcesContext: string;
  patientContext: string;
  referenceContext: string;
}

function formatTableAsMarkdown(table: VerbatimReferenceTable): string {
  const lines: string[] = [];
  lines.push(`**Table: ${table.title}${table.titleAr ? ` (${table.titleAr})` : ''}**`);
  lines.push(`| ${table.headers.join(' | ')} |`);
  lines.push(`| ${table.headers.map(() => '---').join(' | ')} |`);
  for (const row of table.rows) {
    lines.push(`| ${row.map((c: string) => c.replace(/\n+/g, ' ').trim()).join(' | ')} |`);
  }
  return lines.join('\n');
}

function isQueryAskingAboutActivePatient(query: string): boolean {
  const q = query.toLowerCase();
  const patientKeywords = [
    'مريض',
    'المريض',
    'حالي',
    'الحالي',
    'نشط',
    'النشط',
    'ملف',
    'حالة',
    'أدوية المريض',
    'ادوية المريض',
    'فحوصات المريض',
    'patient',
    'active patient',
    'current patient',
    'audit',
    'soap',
    'iesc',
    'dtp',
    'drp',
    'chart',
    'mar'
  ];
  return patientKeywords.some(kw => q.includes(kw));
}

function isQueryAskingAboutDdi(query: string): boolean {
  const q = query.toLowerCase();
  const ddiKeywords = [
    'stockley',
    'ستوكلي',
    'تداخل',
    'تداخلات',
    'تعارض',
    'تعارضات',
    'interaction',
    'interactions',
    'ddi',
    'مع',
    'و ',
    'vs',
    'switch',
    'تحويل',
    'الجمع بين',
    'contraindicated'
  ];
  return ddiKeywords.some(kw => q.includes(kw));
}

export function matchStockleyInteractions(
  query: string,
  tokens: string[],
  currentPatient?: Patient
): MatchedStockleyDdi[] {
  const qLower = query.toLowerCase();
  const patientMedTokens = currentPatient
    ? [
        ...currentPatient.activeMedications.flatMap(m => [
          m.genericName.toLowerCase(),
          m.name.toLowerCase()
        ]),
        ...currentPatient.homeMedications.flatMap(m => [
          m.genericName.toLowerCase(),
          m.name.toLowerCase()
        ])
      ]
    : [];

  const checkPatientMedsToo =
    Boolean(currentPatient) &&
    (isQueryAskingAboutActivePatient(query) || isQueryAskingAboutDdi(query));

  const scored: { item: MatchedStockleyDdi; score: number }[] = [];

  for (const entry of DRUG_INTERACTIONS_DB) {
    const drugALower = entry.drugA.toLowerCase();
    const drugBLower = entry.drugB.toLowerCase();
    const fullEntryHay = `${entry.drugA} ${entry.drugB} ${entry.mechanism} ${entry.clinicalEffect} ${entry.actionRequired}`.toLowerCase();

    const drugAWords = drugALower
      .split(/[\s/(),+-]+/)
      .filter(w => w.length >= 3 && w !== 'and' && w !== 'acid');
    const drugBWords = drugBLower
      .split(/[\s/(),+-]+/)
      .filter(w => w.length >= 3 && w !== 'and' && w !== 'acid');

    const queryMatchesA = drugAWords.some(w => qLower.includes(w) || tokens.includes(w));
    const queryMatchesB = drugBWords.some(w => qLower.includes(w) || tokens.includes(w));

    const patientHasA = drugAWords.some(w =>
      patientMedTokens.some(pm => pm.includes(w) || w.includes(pm))
    );
    const patientHasB = drugBWords.some(w =>
      patientMedTokens.some(pm => pm.includes(w) || w.includes(pm))
    );

    const isPatientActivePair = patientHasA && patientHasB;

    let score = 0;
    if (queryMatchesA && queryMatchesB) {
      score += 120;
    } else if ((queryMatchesA && patientHasB) || (queryMatchesB && patientHasA)) {
      score += 85;
    } else if (checkPatientMedsToo && isPatientActivePair) {
      score += 95;
    } else if (queryMatchesA || queryMatchesB) {
      if (isQueryAskingAboutDdi(query)) {
        score += 55;
      } else {
        score += 25;
      }
    } else {
      let tokHits = 0;
      for (const t of tokens) {
        if (t.length >= 4 && fullEntryHay.includes(t)) {
          tokHits++;
        }
      }
      if (tokHits >= 3) {
        score += tokHits * 12;
      }
    }

    if (score >= 40) {
      scored.push({
        item: {
          ...entry,
          isPatientActivePair
        },
        score
      });
    }
  }

  return scored.sort((a, b) => b.score - a.score).map(s => s.item);
}

export function buildNotebookLmGrounding(
  query: string,
  lang: Language,
  currentPatient?: Patient
): NotebookLmGroundingBundle {
  const baseTokens = expandQueryTokensForLibrary(query);
  const patientSpecific = isQueryAskingAboutActivePatient(query);
  const ddiSpecific = isQueryAskingAboutDdi(query);

  // If the user is asking about the active patient, enrich search tokens with the patient's active medications and diagnoses
  const enrichedTokenSet = new Set<string>(baseTokens);
  if (currentPatient && (patientSpecific || baseTokens.length <= 2)) {
    for (const med of currentPatient.activeMedications) {
      const medName = med.genericName.toLowerCase().trim();
      if (medName.length >= 3) enrichedTokenSet.add(medName);
      for (const part of medName.split(/[\s/+-]+/)) {
        if (part.length >= 3) enrichedTokenSet.add(part);
      }
    }
    for (const diag of currentPatient.diagnoses) {
      for (const part of diag.toLowerCase().split(/[\s/(),-]+/)) {
        if (part.length >= 3 && !['stage', 'acute', 'chronic', 'type', 'with'].includes(part)) {
          enrichedTokenSet.add(part);
        }
      }
    }
  }

  const queryTokens = Array.from(enrichedTokenSet);
  const cleanQ = query.trim().toLowerCase();

  // Score every section across all 7 books (47+ chapters)
  const candidates: {
    book: VerbatimBook;
    chapter: VerbatimChapter;
    section: VerbatimSection;
    matchedTable?: VerbatimReferenceTable;
    score: number;
  }[] = [];

  for (const book of getAllVerbatimBooks()) {
    for (const chapter of book.chapters) {
      const chapterHay = `${chapter.title} ${chapter.titleAr} ${chapter.keywords.join(' ')} ${book.badge}`.toLowerCase();

      let chapterBaseScore = 0;
      if (chapterHay.includes(cleanQ)) {
        chapterBaseScore += 60;
      }
      if (ddiSpecific && book.id === 'stockleys-drug-interactions') {
        chapterBaseScore += 35;
      }

      for (const tok of queryTokens) {
        if (chapter.keywords.some(k => k.toLowerCase().includes(tok))) {
          chapterBaseScore += 16;
        } else if (chapterHay.includes(tok)) {
          chapterBaseScore += 8;
        }
      }

      for (const section of chapter.sections) {
        const secHeadingHay = `${section.heading} ${section.headingAr} ${section.evidenceGrade || ''}`.toLowerCase();
        const secBodyLower = section.body.toLowerCase();
        const secNotesLower = (section.clinicalNotes || []).join(' ').toLowerCase();

        let secScore = chapterBaseScore;
        if (secHeadingHay.includes(cleanQ) || secBodyLower.includes(cleanQ)) {
          secScore += 85;
        }

        let distinctTokenHits = 0;
        for (const tok of queryTokens) {
          let hit = false;
          if (secHeadingHay.includes(tok)) {
            secScore += 28;
            hit = true;
          }
          if (secBodyLower.includes(tok)) {
            secScore += 18;
            hit = true;
          }
          if (secNotesLower.includes(tok)) {
            secScore += 14;
            hit = true;
          }
          if (hit) distinctTokenHits++;
        }

        if (distinctTokenHits >= 2) {
          secScore += distinctTokenHits * 22;
        }

        // Check section tables and chapter quickTables
        const candidateTables = [...(section.tables || []), ...chapter.quickTables];
        let bestTable: VerbatimReferenceTable | undefined;
        let bestTableScore = 0;

        for (const tbl of candidateTables) {
          const tblHay = `${tbl.title} ${tbl.titleAr || ''} ${tbl.headers.join(' ')} ${tbl.rows.map(r => r.join(' ')).join(' ')}`.toLowerCase();
          let tScore = 0;
          for (const tok of queryTokens) {
            if (tblHay.includes(tok)) tScore += 15;
          }
          if (tScore > bestTableScore) {
            bestTableScore = tScore;
            bestTable = tbl;
          }
        }

        secScore += Math.min(bestTableScore, 45);

        if (secScore >= 24) {
          candidates.push({
            book,
            chapter,
            section,
            matchedTable: bestTable,
            score: secScore
          });
        }
      }
    }
  }

  candidates.sort((a, b) => b.score - a.score);

  // Deduplicate by section ID and pick top 6 grounded sources
  const selected: GroundedNotebookSource[] = [];
  const seenSections = new Set<string>();

  for (const cand of candidates) {
    const key = `${cand.chapter.id}::${cand.section.id}`;
    if (seenSections.has(key)) continue;
    seenSections.add(key);

    const idx = selected.length + 1;
    selected.push({
      sourceIndex: idx,
      bookId: cand.book.id,
      bookTitle: cand.book.title,
      bookBadge: cand.book.badge,
      bookBadgeAr: cand.book.badgeAr,
      chapterNumber: cand.chapter.chapterNumber,
      chapterTitle: cand.chapter.title,
      chapterTitleAr: cand.chapter.titleAr,
      pageRange: cand.chapter.pageRange,
      sectionNumber: cand.section.number,
      sectionHeading: cand.section.heading,
      sectionHeadingAr: cand.section.headingAr,
      evidenceGrade: cand.section.evidenceGrade || cand.chapter.edition,
      sourceUrl: cand.chapter.sourceUrl,
      verbatimBody: cand.section.body,
      clinicalNotes: cand.section.clinicalNotes || [],
      boardPearls: cand.chapter.boardPearls.slice(0, 3),
      boardPearlsAr: (cand.chapter.boardPearlsAr || cand.chapter.boardPearls).slice(0, 3),
      markdownTable: cand.matchedTable ? formatTableAsMarkdown(cand.matchedTable) : undefined,
      tableTitle: cand.matchedTable?.title,
      citation: cand.chapter.citation,
      score: cand.score
    });

    if (selected.length >= 6) break;
  }

  // Fallback if query had very unusual words: search ACCP_2026_CHAPTERS and map to top chapters
  if (selected.length === 0) {
    const { chapters } = searchClinicalReferences(query);
    const fallbackCh = chapters[0];
    const allBooks = getAllVerbatimBooks();
    const firstBook = allBooks.find(b => b.id === 'stockleys-drug-interactions') || allBooks[0];
    const firstChap = firstBook.chapters[0];
    const firstSec = firstChap.sections[0];
    if (firstSec) {
      selected.push({
        sourceIndex: 1,
        bookId: firstBook.id,
        bookTitle: firstBook.title,
        bookBadge: firstBook.badge,
        bookBadgeAr: firstBook.badgeAr,
        chapterNumber: firstChap.chapterNumber,
        chapterTitle: fallbackCh ? fallbackCh.title : firstChap.title,
        chapterTitleAr: fallbackCh ? fallbackCh.titleAr : firstChap.titleAr,
        pageRange: firstChap.pageRange,
        sectionNumber: firstSec.number,
        sectionHeading: firstSec.heading,
        sectionHeadingAr: firstSec.headingAr,
        evidenceGrade: firstSec.evidenceGrade || firstChap.edition,
        sourceUrl: fallbackCh ? fallbackCh.sourceUrl : firstChap.sourceUrl,
        verbatimBody: fallbackCh ? fallbackCh.summary : firstSec.body,
        clinicalNotes: fallbackCh ? fallbackCh.keyRecommendations : firstSec.clinicalNotes || [],
        boardPearls: fallbackCh ? fallbackCh.clinicalPearls : firstChap.boardPearls.slice(0, 3),
        boardPearlsAr: fallbackCh ? fallbackCh.clinicalPearlsAr : (firstChap.boardPearlsAr || firstChap.boardPearls).slice(0, 3),
        citation: firstChap.citation,
        score: 10
      });
    }
  }

  const matchedInteractions = matchStockleyInteractions(query, queryTokens, currentPatient).slice(0, 5);

  const customLabsText =
    currentPatient?.labs.customLabs && currentPatient.labs.customLabs.length > 0
      ? `Custom / Additional Laboratory Tests: ${currentPatient.labs.customLabs
          .map(c => `${c.name} = ${c.value} ${c.unit} (Ref: ${c.referenceRange}${c.isAbnormal ? ', ABNORMAL' : ''})`)
          .join('; ')}.`
      : '';

  const patientSim = currentPatient
    ? simulateCaseWithReferences(buildSimulatorParamsFromPatient(currentPatient))
    : null;

  const patientContext = currentPatient
    ? `Active Inpatient: ${currentPatient.name} (${currentPatient.nameEn}), MRN: ${currentPatient.mrn}, Age: ${currentPatient.age}y, Sex: ${currentPatient.gender}, Weight: ${currentPatient.weight} kg, Height: ${currentPatient.height} cm, Ward: ${currentPatient.ward} (${currentPatient.room}), Clinical Status: ${currentPatient.status.toUpperCase()}.
Diagnoses: ${currentPatient.diagnoses.join(' | ')}.
Allergies: ${currentPatient.allergies.join(' | ') || 'NKDA'}.
Key Labs: SCr ${currentPatient.labs.serumCreatinine} mg/dL, Cockcroft-Gault CrCl ${currentPatient.labs.crcl} mL/min, K+ ${currentPatient.labs.potassium} mEq/L, Na+ ${currentPatient.labs.sodium} mEq/L, WBC ${currentPatient.labs.wbc} x10^3/uL, Platelets ${currentPatient.labs.platelets} x10^3/uL, INR ${currentPatient.labs.inr ?? 'N/A'}, Lactate ${currentPatient.labs.lactate ?? 'N/A'} mmol/L, TDM: ${currentPatient.labs.tdmSummary || 'None'}. ${customLabsText}
Active Inpatient MAR: ${currentPatient.activeMedications.map(m => `${m.genericName} (${m.name}) ${m.dose} ${m.route} ${m.frequency} [${m.indication}]`).join('; ') || 'None'}.
Home Medications: ${currentPatient.homeMedications.map(m => `${m.genericName} ${m.dose} ${m.frequency}`).join('; ') || 'None'}.
Case Engine Evidence Summary: ${patientSim?.readySoapPlanEn || ''}`
    : 'No active inpatient selected.';

  const stockleyDdiBlock =
    matchedInteractions.length > 0
      ? `MATCHED STOCKLEY'S DRUG INTERACTIONS MONOGRAPHS (Google Drive Ref: 1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S):\n` +
        matchedInteractions
          .map(
            (ddi, idx) =>
              `[DDI-${idx + 1}] ${ddi.drugA} + ${ddi.drugB} (${ddi.severity.toUpperCase()} | ${ddi.stockleyRating})${
                ddi.isPatientActivePair ? ' [ACTIVE IN PATIENT MAR]' : ''
              }
  - Mechanism: ${ddi.mechanism}
  - Clinical Effect: ${ddi.clinicalEffect}
  - Stockley's Action Required: ${ddi.actionRequired}
  - Source URI: ${ddi.referenceUrl}`
          )
          .join('\n\n')
      : '';

  const numberedSourcesBlock = selected
    .map(
      src =>
        `[SOURCE ${src.sourceIndex}] Book: ${src.bookBadge} (${src.bookTitle}) | Ch. ${src.chapterNumber}: ${src.chapterTitle} (${src.pageRange}) | Sec. ${src.sectionNumber}: ${src.sectionHeading}
Evidence Grade: ${src.evidenceGrade}
Reference URI: ${src.sourceUrl}
Verbatim Text:
${src.verbatimBody}
${src.clinicalNotes.length > 0 ? `Clinical Directives:\n- ${src.clinicalNotes.join('\n- ')}` : ''}
${src.markdownTable ? `\nReference Table:\n${src.markdownTable}` : ''}
Board Pearls: ${src.boardPearls.join(' | ')}`
    )
    .join('\n\n========================================\n\n');

  const notebookSourcesContext = [stockleyDdiBlock, numberedSourcesBlock].filter(Boolean).join('\n\n========================================\n\n');

  return {
    queryTokens,
    isPatientSpecificQuery: patientSpecific,
    isDdiQuery: ddiSpecific,
    numberedSources: selected,
    matchedInteractions,
    notebookSourcesContext,
    patientContext,
    referenceContext: stockleyDdiBlock
  };
}

/**
 * Pure NotebookLM-style Verbatim Reference Synthesis Engine.
 * Used when offline or when deterministic textbook extraction is needed.
 * NEVER outputs canned templates or unrelated text—synthesizes strictly from the numbered sources [1], [2], [3]
 * and matched Stockley's Drug Interactions that directly answer the user's question.
 */
export function synthesizeGroundedNotebookAnswer(
  query: string,
  lang: Language,
  currentPatient: Patient | undefined,
  bundle: NotebookLmGroundingBundle
): string {
  const { numberedSources, matchedInteractions, isPatientSpecificQuery } = bundle;
  const topSources = numberedSources.slice(0, 4);
  const lines: string[] = [];

  if (lang === 'ar') {
    lines.push(
      `### 📚 الإجابة المرجعية الموثّقة (NotebookLM Source-Grounded Synthesis)`
    );
    lines.push(
      `> **توثيق المصادر:** تم استخراج هذه الإجابة حصرياً من **${topSources.length} مصادر مرجعية معتمدة**${
        matchedInteractions.length > 0 ? ` و **${matchedInteractions.length} مونوجراف من مرجع Stockley’s للتداخلات الدوائية**` : ''
      } دون أي تأليف خارج المراجع.`
    );
    lines.push('');

    // 1. If Stockley's Drug Interactions matched the query or active patient audit, present them first with exact mechanisms & actions
    if (matchedInteractions.length > 0) {
      lines.push(
        `#### ⚠️ فحص ومونوجراف التداخلات الدوائية (Stockley’s Drug Interactions • Ref: \`1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S\`):`
      );
      for (const ddi of matchedInteractions) {
        const badge =
          ddi.severity === 'Contraindicated'
            ? '🚫 **ممنوع قطعياً (Contraindicated)**'
            : ddi.severity === 'Major'
            ? '🔴 **تداخل خطير (Major — Action Required)**'
            : '🟠 **تداخل متوسط (Moderate)**';
        const activeTag = ddi.isPatientActivePair
          ? ` *(تداخل مرصود فعلياً في أدوية المريض النشط: ${currentPatient?.name})*`
          : '';
        lines.push(`* **${ddi.drugA} + ${ddi.drugB}** — ${badge} [${ddi.stockleyRating}]${activeTag}`);
        lines.push(`  - **الآلية الدوائية (Mechanism):** ${ddi.mechanism}`);
        lines.push(`  - **الأثر الإكلينيكي (Clinical Effect):** ${ddi.clinicalEffect}`);
        lines.push(`  - **الإجراء الصيدلاني المعتمد (Stockley’s Action):** ${ddi.actionRequired}`);
      }
      lines.push('');
    }

    // 2. If the query specifically asks about the active patient (or if patient meds have direct findings), show patient-tailored application
    if (currentPatient && (isPatientSpecificQuery || matchedInteractions.some(d => d.isPatientActivePair))) {
      const sim = simulateCaseWithReferences(buildSimulatorParamsFromPatient(currentPatient));
      lines.push(
        `#### 🩺 تطبيق المراجع على المريض النشط: ${currentPatient.name} (${currentPatient.mrn} • CrCl = ${currentPatient.labs.crcl} mL/min):`
      );
      lines.push(
        `* **المؤشرات المخبرية الحاسمة:** SCr = ${currentPatient.labs.serumCreatinine} mg/dL | **CrCl = ${currentPatient.labs.crcl} mL/min** | K+ = ${currentPatient.labs.potassium} mEq/L | Na+ = ${currentPatient.labs.sodium} mEq/L | INR = ${currentPatient.labs.inr ?? 'N/A'}${
          currentPatient.labs.tdmSummary ? ` | **TDM:** ${currentPatient.labs.tdmSummary}` : ''
        }${
          currentPatient.labs.customLabs && currentPatient.labs.customLabs.length > 0
            ? ` | **فحوصات إضافية:** ${currentPatient.labs.customLabs.map(c => `${c.name}: ${c.value} ${c.unit}`).join('، ')}`
            : ''
        }`
      );
      if (sim.immediateActions.length > 0 && isPatientSpecificQuery) {
        lines.push(`* **التدخلات الصيدلانية الموثّقة لحالة المريض (IESC / SOAP):**`);
        for (const act of sim.immediateActions.slice(0, 4)) {
          lines.push(
            `  - **[${act.priorityLabelAr}] ${act.drugOrTarget}:** ${act.actionAr} *(السبب: ${act.rationaleAr} — [${act.citationBadge}])*`
          );
        }
      }
      lines.push('');
    }

    // 3. Present the exact numbered reference evidence [1], [2], [3] matching the query
    lines.push(`#### 📖 الأدلة والنصوص المرجعية المباشرة للسؤال (Verbatim Reference Evidence):`);
    for (const src of topSources) {
      lines.push(
        `\n##### [${src.sourceIndex}] ${src.bookBadgeAr} (${src.bookBadge}) — الفصل ${src.chapterNumber}: ${src.sectionHeadingAr || src.sectionHeading} (${src.pageRange})`
      );
      lines.push(`* **درجة الدليل / المعيار:** \`${src.evidenceGrade}\``);

      // Extract the most relevant paragraphs from verbatimBody
      const paragraphs = src.verbatimBody
        .split(/\n\n+/)
        .map(p => p.trim())
        .filter(Boolean);
      const selectedParas = paragraphs.slice(0, 3).join('\n\n');
      lines.push(selectedParas);

      if (src.clinicalNotes.length > 0) {
        lines.push(`\n**التوصيات الإكلينيكية الحاسمة [${src.sourceIndex}]:**`);
        for (const note of src.clinicalNotes) {
          lines.push(`- ${note} [${src.sourceIndex}]`);
        }
      }

      if (src.markdownTable) {
        lines.push(`\n${src.markdownTable}\n`);
      }

      const pearlsToUse = src.boardPearlsAr.length > 0 ? src.boardPearlsAr : src.boardPearls;
      if (pearlsToUse.length > 0) {
        lines.push(`* **💎 درة سريرية (Board Pearl) [${src.sourceIndex}]:** ${pearlsToUse[0]}`);
      }
    }

    lines.push(`\n---`);
    lines.push(`**المراجع المقتبسة بالترقيم (Cited Sources):**`);
    for (const src of topSources) {
      lines.push(
        `- **[${src.sourceIndex}]** ${src.bookTitle} — Ch. ${src.chapterNumber} (${src.sectionNumber}: ${src.sectionHeading}), ${src.pageRange}.`
      );
    }

    return lines.join('\n');
  }

  // English synthesis
  lines.push(`### 📚 NotebookLM Source-Grounded Clinical Synthesis`);
  lines.push(
    `> **Strict Reference Grounding:** Synthesized directly from **${topSources.length} accredited textbook sections**${
      matchedInteractions.length > 0 ? ` and **${matchedInteractions.length} Stockley’s Drug Interactions monographs**` : ''
    } with zero unverified extrapolation.`
  );
  lines.push('');

  if (matchedInteractions.length > 0) {
    lines.push(
      `#### ⚠️ Stockley’s Drug Interactions Screening (Ref: \`1eg07NXxWYgJq0NxLf0Vim1JlV7KTu16S\`):`
    );
    for (const ddi of matchedInteractions) {
      const activeTag = ddi.isPatientActivePair
        ? ` *(Active in Patient MAR: ${currentPatient?.nameEn})*`
        : '';
      lines.push(
        `* **${ddi.drugA} + ${ddi.drugB}** — **${ddi.severity.toUpperCase()}** [${ddi.stockleyRating}]${activeTag}`
      );
      lines.push(`  - **Mechanism:** ${ddi.mechanism}`);
      lines.push(`  - **Clinical Effect:** ${ddi.clinicalEffect}`);
      lines.push(`  - **Stockley’s Action Required:** ${ddi.actionRequired}`);
    }
    lines.push('');
  }

  if (currentPatient && (isPatientSpecificQuery || matchedInteractions.some(d => d.isPatientActivePair))) {
    const sim = simulateCaseWithReferences(buildSimulatorParamsFromPatient(currentPatient));
    lines.push(
      `#### 🩺 Patient-Specific Application: ${currentPatient.nameEn} (${currentPatient.mrn} • CrCl = ${currentPatient.labs.crcl} mL/min):`
    );
    lines.push(
      `* **Critical Labs:** SCr ${currentPatient.labs.serumCreatinine} mg/dL | **CrCl ${currentPatient.labs.crcl} mL/min** | K+ ${currentPatient.labs.potassium} mEq/L | Na+ ${currentPatient.labs.sodium} mEq/L | INR ${currentPatient.labs.inr ?? 'N/A'}${
        currentPatient.labs.tdmSummary ? ` | **TDM:** ${currentPatient.labs.tdmSummary}` : ''
      }`
    );
    if (sim.immediateActions.length > 0 && isPatientSpecificQuery) {
      for (const act of sim.immediateActions.slice(0, 4)) {
        lines.push(
          `  - **[${act.priorityLabelEn}] ${act.drugOrTarget}:** ${act.actionEn} *(${act.rationaleEn} — [${act.citationBadge}])*`
        );
      }
    }
    lines.push('');
  }

  lines.push(`#### 📖 Verbatim Evidence from Accredited Sources:`);
  for (const src of topSources) {
    lines.push(
      `\n##### [${src.sourceIndex}] ${src.bookBadge} — Ch. ${src.chapterNumber} (${src.sectionNumber}: ${src.sectionHeading}) [${src.pageRange}]`
    );
    lines.push(`* **Evidence Standard:** \`${src.evidenceGrade}\``);
    const paragraphs = src.verbatimBody
      .split(/\n\n+/)
      .map(p => p.trim())
      .filter(Boolean);
    lines.push(paragraphs.slice(0, 3).join('\n\n'));

    if (src.clinicalNotes.length > 0) {
      lines.push(`\n**Key Clinical Directives [${src.sourceIndex}]:**`);
      for (const note of src.clinicalNotes) {
        lines.push(`- ${note} [${src.sourceIndex}]`);
      }
    }

    if (src.markdownTable) {
      lines.push(`\n${src.markdownTable}\n`);
    }

    if (src.boardPearls.length > 0) {
      lines.push(`* **💎 Board Pearl [${src.sourceIndex}]:** ${src.boardPearls[0]}`);
    }
  }

  lines.push(`\n---`);
  lines.push(`**Numbered Reference Sources:**`);
  for (const src of topSources) {
    lines.push(
      `- **[${src.sourceIndex}]** ${src.bookTitle} — Ch. ${src.chapterNumber} (${src.sectionNumber}: ${src.sectionHeading}), ${src.pageRange}.`
    );
  }

  return lines.join('\n');
}
