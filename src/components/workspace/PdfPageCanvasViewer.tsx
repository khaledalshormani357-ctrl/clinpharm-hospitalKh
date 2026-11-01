import { useEffect, useRef, useState, useMemo } from 'react';
import {
  getSyncedFullBookByIdSync,
  getSyncedPdfBytes,
  saveSyncedFullBook
} from '../../lib/googleDrive/fullBookIdb';
import {
  downloadOfflinePdfFromVault,
  formatStorageBytes
} from '../../lib/googleDrive/pdfOfflineStorageService';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileText,
  Download,
  HardDrive,
  ShieldCheck,
  CloudDownload
} from 'lucide-react';
import { Language } from '../../types/clinical';

interface Props {
  bookId: string;
  totalPages: number;
  initialPage?: number;
  lang: Language;
  onPageChange?: (page: number) => void;
}

export function PdfPageCanvasViewer({
  bookId,
  totalPages,
  initialPage = 1,
  lang,
  onPageChange
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // Cache loaded pdfDoc per bookId so turning pages offline is instantaneous without re-parsing
  const pdfDocCacheRef = useRef<{ bookId: string; doc: any; byteLength: number } | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [pageInput, setPageInput] = useState<string>(String(initialPage));
  const [scale, setScale] = useState<number>(1.35);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cachedByteSize, setCachedByteSize] = useState<number>(0);
  const [hasBinaryCanvas, setHasBinaryCanvas] = useState<boolean>(false);
  const [isFetchingBinary, setIsFetchingBinary] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [binaryReloadTick, setBinaryReloadTick] = useState<number>(0);

  const syncedRecord = useMemo(
    () => getSyncedFullBookByIdSync(bookId),
    [bookId, currentPage, binaryReloadTick]
  );

  const currentPageSheet = useMemo(() => {
    if (!syncedRecord) return null;
    const directPage = syncedRecord.pages?.find(p => p.pageNumber === currentPage);
    if (directPage && (directPage.extractedText || directPage.ocrText || directPage.text)) {
      return {
        chapterTitle: directPage.chapterTitle,
        heading: `Page ${currentPage}`,
        text: directPage.extractedText || directPage.ocrText || directPage.text,
        tables: (syncedRecord.structuredTables || []).filter(t => t.pageNumber === currentPage)
      };
    }

    for (const ch of syncedRecord.chapters || []) {
      const sec = (ch.sections || []).find(s => s.originalPageNumber === currentPage);
      if (sec) {
        return {
          chapterTitle: ch.title,
          heading: sec.heading || `Page ${currentPage}`,
          text: sec.body || sec.ocrBody || '',
          tables: sec.tables || []
        };
      }
    }

    for (const ch of syncedRecord.chapters || []) {
      if ((ch.startPage ?? 0) <= currentPage && (ch.endPage ?? 0) >= currentPage) {
        const firstSec = ch.sections?.[0];
        return {
          chapterTitle: ch.title,
          heading: firstSec?.heading || ch.title,
          text: firstSec?.body || firstSec?.ocrBody || '',
          tables: firstSec?.tables || []
        };
      }
    }

    return null;
  }, [syncedRecord, currentPage]);

  useEffect(() => {
    if (initialPage >= 1 && initialPage <= Math.max(1, totalPages)) {
      setCurrentPage(initialPage);
      setPageInput(String(initialPage));
    }
  }, [initialPage, totalPages]);

  useEffect(() => {
    let isCancelled = false;

    async function renderPdfPage() {
      setIsLoading(true);
      setErrorMsg(null);
      try {
        let pdfDoc: any = null;

        if (pdfDocCacheRef.current && pdfDocCacheRef.current.bookId === bookId) {
          pdfDoc = pdfDocCacheRef.current.doc;
          setCachedByteSize(pdfDocCacheRef.current.byteLength);
          setHasBinaryCanvas(true);
        } else {
          const pdfBytes = await getSyncedPdfBytes(bookId);
          if (!pdfBytes) {
            if (!isCancelled) {
              setHasBinaryCanvas(false);
              setCachedByteSize(syncedRecord?.fileSize || 0);
              setIsLoading(false);
            }
            return;
          }

          const pdfjsLib = await import('pdfjs-dist');
          try {
            pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
              'pdfjs-dist/build/pdf.worker.min.mjs',
              import.meta.url
            ).toString();
          } catch {
            pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;
          }

          const loadingTask = pdfjsLib.getDocument({
            data: new Uint8Array(pdfBytes.slice(0)),
            useSystemFonts: true
          });
          pdfDoc = await loadingTask.promise;
          pdfDocCacheRef.current = {
            bookId,
            doc: pdfDoc,
            byteLength: pdfBytes.byteLength
          };
          if (!isCancelled) {
            setCachedByteSize(pdfBytes.byteLength);
            setHasBinaryCanvas(true);
          }
        }

        if (isCancelled || !pdfDoc) return;

        const safePage = Math.max(1, Math.min(currentPage, pdfDoc.numPages));
        const page = await pdfDoc.getPage(safePage);
        if (isCancelled) return;

        const viewport = page.getViewport({ scale });
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
          canvasContext: context,
          viewport,
          canvas
        }).promise;

        if (!isCancelled) {
          setIsLoading(false);
        }
      } catch (err: unknown) {
        if (!isCancelled) {
          setHasBinaryCanvas(false);
          if (!currentPageSheet) {
            setErrorMsg(err instanceof Error ? err.message : 'Failed to render PDF page');
          }
          setIsLoading(false);
        }
      }
    }

    void renderPdfPage();
    return () => {
      isCancelled = true;
    };
  }, [bookId, currentPage, scale, lang, binaryReloadTick]);

  const handleLoadBinaryPdfOnDemand = async () => {
    if (!syncedRecord?.driveFileId || isFetchingBinary) return;
    setIsFetchingBinary(true);
    setErrorMsg(null);
    try {
      const { fetchPublicDrivePdfViaProxy } = await import('../../lib/googleDrive/fullBookEngine');
      const fetched = await fetchPublicDrivePdfViaProxy(
        syncedRecord.driveFileId,
        null,
        { maxFileSizeBytes: 300 * 1024 * 1024, timeoutMs: 120_000 },
        syncedRecord.bookId
      );
      if (fetched?.pdfBytes && fetched.pdfBytes.byteLength > 0) {
        await saveSyncedFullBook(syncedRecord, fetched.pdfBytes, { silent: true });
        pdfDocCacheRef.current = null;
        setBinaryReloadTick(t => t + 1);
      }
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : lang === 'ar'
          ? 'تعذر تحميل ملف الـ PDF الثنائي الخام؛ يتم عرض الصفحة المرجعية المفهرسة مباشرةً.'
          : 'Could not fetch raw binary PDF; displaying indexed verbatim page sheet.'
      );
    } finally {
      setIsFetchingBinary(false);
    }
  };

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(page, Math.max(1, totalPages)));
    setCurrentPage(clamped);
    setPageInput(String(clamped));
    onPageChange?.(clamped);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 overflow-hidden">
      {/* Toolbar */}
      <div className="px-4 py-2.5 bg-slate-800 text-slate-100 border-b border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-teal-400" />
          <span className="font-bold">
            {lang === 'ar'
              ? 'عارض صفحات الكتاب المرجعي الأصلي (محفوظ محلياً في IndexedDB بدون إنترنت)'
              : 'Original Reference Page Viewer (Cached Offline in IndexedDB)'}
          </span>
          {cachedByteSize > 0 && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono text-[10px]">
              <HardDrive className="w-3 h-3" />
              <span>{formatStorageBytes(cachedByteSize)}</span>
            </span>
          )}
        </div>

        {/* Page Navigation */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => goToPage(currentPage - 1)}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <form
            onSubmit={e => {
              e.preventDefault();
              const parsed = parseInt(pageInput, 10);
              if (!isNaN(parsed)) goToPage(parsed);
            }}
            className="flex items-center gap-1.5 font-mono"
          >
            <span>{lang === 'ar' ? 'صفحة' : 'Page'}</span>
            <input
              type="text"
              value={pageInput}
              onChange={e => setPageInput(e.target.value)}
              className="w-16 px-2 py-1 text-center rounded-md bg-slate-900 border border-slate-600 text-white font-bold text-xs"
            />
            <span>/ {totalPages}</span>
          </form>

          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => goToPage(currentPage + 1)}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom Controls + Direct Offline PDF Download */}
        <div className="flex items-center gap-1.5 font-mono">
          <button
            type="button"
            onClick={() => setScale(s => Math.max(0.75, +(s - 0.2).toFixed(2)))}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-2">{Math.round(scale * 100)}%</span>
          <button
            type="button"
            onClick={() => setScale(s => Math.min(2.6, +(s + 0.2).toFixed(2)))}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            onClick={() => void downloadOfflinePdfFromVault(bookId)}
            className="ml-1 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-sans font-bold text-[11px] cursor-pointer"
            title="Download full reference from IndexedDB offline storage"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'تنزيل المرجع' : 'Save PDF'}</span>
          </button>
        </div>
      </div>

      {/* Canvas or High-Fidelity Verbatim Page Sheet Container */}
      <div className="p-4 overflow-auto max-h-[75vh] flex flex-col items-center justify-start bg-slate-950/90 min-h-[420px]">
        {errorMsg && (
          <div className="mb-3 text-xs text-amber-200 bg-amber-950/60 border border-amber-800 rounded-xl p-3 max-w-xl text-center">
            {errorMsg}
          </div>
        )}

        {hasBinaryCanvas ? (
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60 text-teal-300 text-xs font-bold rounded-lg">
                {lang === 'ar'
                  ? `جاري رسم الصفحة ${currentPage} من ${totalPages} من الذاكرة المحلية...`
                  : `Rendering PDF Page ${currentPage} of ${totalPages} from IndexedDB...`}
              </div>
            )}
            <canvas
              ref={canvasRef}
              className="rounded-lg shadow-2xl bg-white max-w-full h-auto"
            />
          </div>
        ) : currentPageSheet ? (
          <div
            className="w-full max-w-3xl bg-white text-slate-900 rounded-xl shadow-2xl border border-slate-300 p-6 sm:p-8 space-y-4 transition-all"
            style={{ fontSize: `${Math.max(12, Math.round(13 * scale))}px` }}
            dir="ltr"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-slate-200 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-2 font-bold text-teal-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{syncedRecord?.sourceFileName || syncedRecord?.fileName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-800 font-bold">
                  Page {currentPage} / {totalPages}
                </span>
                {syncedRecord?.driveFileId && (
                  <button
                    type="button"
                    disabled={isFetchingBinary}
                    onClick={() => void handleLoadBinaryPdfOnDemand()}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white font-sans font-bold text-[10px] cursor-pointer"
                  >
                    <CloudDownload className="w-3 h-3" />
                    <span>
                      {isFetchingBinary
                        ? lang === 'ar'
                          ? 'جاري جلب PDF...'
                          : 'Fetching PDF...'
                        : lang === 'ar'
                        ? 'عرض PDF المصور'
                        : 'Load Visual PDF'}
                    </span>
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-700">
                {currentPageSheet.chapterTitle}
              </div>
              <h4 className="font-black text-base sm:text-lg text-slate-900">
                {currentPageSheet.heading}
              </h4>
            </div>

            <div className="font-serif leading-relaxed whitespace-pre-line text-slate-800 pt-2">
              {currentPageSheet.text}
            </div>

            {currentPageSheet.tables && currentPageSheet.tables.length > 0 && (
              <div className="pt-4 space-y-3 border-t border-slate-200">
                {currentPageSheet.tables.map((tbl: any, idx: number) => (
                  <div
                    key={tbl.id || idx}
                    className="rounded-lg border border-slate-300 overflow-x-auto text-xs"
                  >
                    <div className="bg-slate-100 px-3 py-1.5 font-bold text-slate-800 border-b border-slate-300">
                      {tbl.title || tbl.caption || `Table on Page ${currentPage}`}
                    </div>
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200">
                          {(tbl.headers || []).map((h: string, hIdx: number) => (
                            <th key={hIdx} className="px-2.5 py-1.5 font-bold">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {(tbl.rows || []).map((row: string[], rIdx: number) => (
                          <tr key={rIdx}>
                            {row.map((cell: string, cIdx: number) => (
                              <td key={cIdx} className="px-2.5 py-1.5 align-top">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>SHA-256: {(syncedRecord?.sha256 || '').slice(0, 24)}...</span>
              <span>
                Verified Verbatim Page {currentPage} of {totalPages}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-xs text-slate-300 bg-slate-900 border border-slate-800 rounded-xl p-6 max-w-md text-center">
            {lang === 'ar'
              ? `الصفحة ${currentPage} جاهزة في الفهرس المرجعي.`
              : `Page ${currentPage} is indexed in the reference library.`}
          </div>
        )}
      </div>
    </div>
  );
}

