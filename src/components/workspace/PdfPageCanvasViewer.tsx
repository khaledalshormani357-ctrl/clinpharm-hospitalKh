import { useEffect, useRef, useState } from 'react';
import { getSyncedPdfBytes } from '../../lib/googleDrive/fullBookIdb';
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
  HardDrive
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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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
        } else {
          const pdfBytes = await getSyncedPdfBytes(bookId);
          if (!pdfBytes) {
            if (!isCancelled) {
              setErrorMsg(
                lang === 'ar'
                  ? 'لم يتم العثور على ملف الـ PDF الثنائي في التخزين المحلي (IndexedDB) لهذا المرجع.'
                  : 'Binary PDF data is not stored in IndexedDB for this book.'
              );
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
          setErrorMsg(err instanceof Error ? err.message : 'Failed to render PDF page');
          setIsLoading(false);
        }
      }
    }

    void renderPdfPage();
    return () => {
      isCancelled = true;
    };
  }, [bookId, currentPage, scale, lang]);

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
              ? 'عارض صفحات الـ PDF الأصلي (محفوظ محلياً في IndexedDB بدون إنترنت)'
              : 'Original PDF Page Renderer (Cached Offline in IndexedDB)'}
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
              className="w-14 px-2 py-1 text-center rounded-md bg-slate-900 border border-slate-600 text-white font-bold text-xs"
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

          {cachedByteSize > 0 && (
            <button
              type="button"
              onClick={() => void downloadOfflinePdfFromVault(bookId)}
              className="ml-1 inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-sans font-bold text-[11px] cursor-pointer"
              title="Download full PDF from IndexedDB offline storage"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'تنزيل PDF أوفلاين' : 'Save PDF'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Canvas Container */}
      <div className="p-4 overflow-auto max-h-[75vh] flex items-center justify-center bg-slate-950/90 min-h-[420px]">
        {errorMsg ? (
          <div className="text-xs text-rose-300 bg-rose-950/50 border border-rose-800 rounded-xl p-4 max-w-md text-center">
            {errorMsg}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

