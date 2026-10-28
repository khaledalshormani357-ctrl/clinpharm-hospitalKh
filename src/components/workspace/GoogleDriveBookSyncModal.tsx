import { useEffect, useState, useRef } from 'react';
import { Language } from '../../types/clinical';
import {
  initAuth,
  googleSignIn,
  logout,
  subscribeDriveAuth
} from '../../lib/googleDrive/googleDriveAuth';
import {
  BookSyncProgress,
  DriveFileItem,
  KNOWN_DRIVE_BOOK_MAPPINGS,
  ingestDriveFileAsFullBook,
  ingestLocalPdfFileAsFullBook,
  listUserDriveFiles
} from '../../lib/googleDrive/fullBookEngine';
import {
  BookImportJobRecord,
  BookProcessingStatus,
  SyncedFullBookRecord,
  getAllBookImportJobs,
  hydrateSyncedFullBooks,
  removeSyncedFullBook
} from '../../lib/googleDrive/fullBookIdb';
import {
  OfflineVaultDiagnostics,
  getOfflineVaultDiagnostics,
  requestPersistentOfflineStorage,
  downloadOfflinePdfFromVault,
  verifyOfflineBookIntegrity,
  formatStorageBytes,
  subscribeOfflineNetworkStatus
} from '../../lib/googleDrive/pdfOfflineStorageService';
import {
  X,
  CloudDownload,
  HardDrive,
  CheckCircle2,
  RefreshCw,
  Search,
  FileUp,
  Trash2,
  FolderOpen,
  FileText,
  LogOut,
  AlertCircle,
  BookOpenCheck,
  Link2,
  ShieldCheck,
  Download,
  Wifi,
  WifiOff,
  Database,
  AlertTriangle,
  FileSearch,
  ClipboardList
} from 'lucide-react';
import { User } from 'firebase/auth';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onBookSynced?: (record: SyncedFullBookRecord) => void;
}

export function getProcessingStatusBadgeMeta(
  status: BookProcessingStatus | undefined,
  lang: Language
): {
  label: string;
  badgeClass: string;
} {
  switch (status) {
    case 'verified_complete':
      return {
        label: lang === 'ar' ? 'مكتمل التحقق' : 'Verified Complete',
        badgeClass:
          'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
      };
    case 'partially_complete':
      return {
        label: lang === 'ar' ? 'مكتمل جزئياً' : 'Partially Complete',
        badgeClass:
          'bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-500/30'
      };
    case 'needs_ocr':
      return {
        label: lang === 'ar' ? 'يحتاج إلى OCR' : 'Needs OCR',
        badgeClass:
          'bg-orange-500/15 text-orange-800 dark:text-orange-300 border-orange-500/30'
      };
    case 'downloading':
      return {
        label: lang === 'ar' ? 'جارٍ التنزيل' : 'Downloading',
        badgeClass: 'bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-500/30'
      };
    case 'extracting':
      return {
        label: lang === 'ar' ? 'جارٍ استخراج المحتوى' : 'Extracting Content',
        badgeClass: 'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30'
      };
    case 'failed':
      return {
        label: lang === 'ar' ? 'فشل الاستيراد' : 'Import Failed',
        badgeClass: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30'
      };
    case 'embedded_summary':
      return {
        label: lang === 'ar' ? 'ملخص مضمّن غير أصلي' : 'Non-Original Embedded Summary',
        badgeClass:
          'bg-purple-500/15 text-purple-800 dark:text-purple-300 border-purple-500/30'
      };
    case 'not_imported':
    default:
      return {
        label: lang === 'ar' ? 'لم يُستورد' : 'Not Imported',
        badgeClass:
          'bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700'
      };
  }
}

export function GoogleDriveBookSyncModal({
  isOpen,
  onClose,
  lang,
  onBookSynced
}: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [needsAuth, setNeedsAuth] = useState<boolean>(true);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  const [syncedBooks, setSyncedBooks] = useState<SyncedFullBookRecord[]>([]);
  const [importJobs, setImportJobs] = useState<BookImportJobRecord[]>([]);
  const [vaultDiag, setVaultDiag] = useState<OfflineVaultDiagnostics | null>(null);
  const [selectedReportBookId, setSelectedReportBookId] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>([]);
  const [driveSearch, setDriveSearch] = useState<string>('');
  const [isLoadingDriveFiles, setIsLoadingDriveFiles] = useState<boolean>(false);

  const [customDriveIds, setCustomDriveIds] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const item of KNOWN_DRIVE_BOOK_MAPPINGS) {
      map[item.bookId] = item.defaultDriveId;
    }
    return map;
  });

  const [selectedTargetBookId, setSelectedTargetBookId] = useState<string>('auto');
  const [activeProgress, setActiveProgress] = useState<BookSyncProgress | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmDeleteBookId, setConfirmDeleteBookId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const refreshVaultDiagnostics = async () => {
    const records = await hydrateSyncedFullBooks();
    setSyncedBooks(records);
    const jobs = await getAllBookImportJobs();
    setImportJobs(jobs);
    const diag = await getOfflineVaultDiagnostics();
    setVaultDiag(diag);
  };

  useEffect(() => {
    const unsubInit = initAuth(
      (u, t) => {
        setUser(u);
        setToken(t);
        setNeedsAuth(false);
      },
      () => {
        setNeedsAuth(true);
      }
    );

    const unsubState = subscribeDriveAuth(state => {
      setUser(state.user);
      setToken(state.accessToken);
      setNeedsAuth(state.needsAuth);
    });

    const unsubNet = subscribeOfflineNetworkStatus(online => {
      setIsOnline(online);
      void refreshVaultDiagnostics();
    });

    void refreshVaultDiagnostics();

    const handleUpdated = () => {
      void refreshVaultDiagnostics();
    };
    window.addEventListener('clinpharm-full-books-updated', handleUpdated);

    return () => {
      unsubInit();
      unsubState();
      unsubNet();
      window.removeEventListener('clinpharm-full-books-updated', handleUpdated);
    };
  }, []);

  const fetchUserDriveFiles = async (accessToken: string, query?: string) => {
    setIsLoadingDriveFiles(true);
    setErrorMessage(null);
    try {
      const files = await listUserDriveFiles(accessToken, query);
      setDriveFiles(files);

      setCustomDriveIds(prev => {
        const updated = { ...prev };
        for (const mapping of KNOWN_DRIVE_BOOK_MAPPINGS) {
          const matchedFile = files.find(f =>
            mapping.matchKeywords.some(kw => f.name.toLowerCase().includes(kw.toLowerCase()))
          );
          if (matchedFile) {
            updated[mapping.bookId] = matchedFile.id;
          }
        }
        return updated;
      });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to list Google Drive files';
      setErrorMessage(msg);
      if (msg.toLowerCase().includes('401') || msg.toLowerCase().includes('unauthorized')) {
        setNeedsAuth(true);
      }
    } finally {
      setIsLoadingDriveFiles(false);
    }
  };

  useEffect(() => {
    if (isOpen && token && !needsAuth) {
      void fetchUserDriveFiles(token);
    }
  }, [isOpen, token, needsAuth]);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
        await fetchUserDriveFiles(result.accessToken);
      }
    } catch (err: unknown) {
      setErrorMessage(
        err instanceof Error ? err.message : 'Google Sign-In failed. Please try again.'
      );
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleSyncSingleBookFromDrive = async (
    bookId: string,
    driveIdOrUrl: string,
    forceReprocess = false
  ) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const record = await ingestDriveFileAsFullBook({
        accessToken: token,
        driveFileId: driveIdOrUrl,
        targetBookId: bookId === 'auto' ? undefined : bookId,
        forceReprocess,
        onProgress: p => setActiveProgress(p)
      });

      await refreshVaultDiagnostics();
      const badgeMeta = getProcessingStatusBadgeMeta(record.processingStatus, lang);
      if (record.processingStatus === 'verified_complete') {
        setSuccessMessage(
          lang === 'ar'
            ? `[${badgeMeta.label}] تم استيراد والتحقق من ملف PDF الأصلي "${record.sourceFileName || record.fileName}" (${record.totalPages} صفحة • ${record.extractedTextPageCount} صفحة نصية • SHA-256: ${(record.sha256 || '').slice(0, 12)}...)!`
            : `[${badgeMeta.label}] Imported and verified original PDF "${record.sourceFileName || record.fileName}" (${record.totalPages} pages • ${record.extractedTextPageCount} text pages • SHA-256: ${(record.sha256 || '').slice(0, 12)}...)!`
        );
      } else {
        setErrorMessage(
          lang === 'ar'
            ? `[${badgeMeta.label}] تم استيراد "${record.sourceFileName || record.fileName}" (${record.extractedTextPageCount ?? 0} صفحة نصية من أصل ${record.totalPages} صفحة؛ ${record.unprocessedPageCount ?? 0} صفحة مصورة تحتاج إلى OCR).`
            : `[${badgeMeta.label}] Imported "${record.sourceFileName || record.fileName}" (${record.extractedTextPageCount ?? 0} text pages of ${record.totalPages}; ${record.unprocessedPageCount ?? 0} scanned pages require OCR).`
        );
      }
      onBookSynced?.(record);
    } catch (err: unknown) {
      await refreshVaultDiagnostics();
      setErrorMessage(
        err instanceof Error
          ? err.message
          : 'Failed to download and index file from Google Drive.'
      );
    } finally {
      setActiveProgress(null);
    }
  };

  const handleSyncAllMappedBooks = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);

    let syncedCount = 0;
    const errors: string[] = [];

    for (const mapping of KNOWN_DRIVE_BOOK_MAPPINGS) {
      const driveId = customDriveIds[mapping.bookId] || mapping.defaultDriveId;
      if (!driveId) continue;

      try {
        const record = await ingestDriveFileAsFullBook({
          accessToken: token,
          driveFileId: driveId,
          targetBookId: mapping.bookId,
          onProgress: p => setActiveProgress(p)
        });
        syncedCount++;
        onBookSynced?.(record);
      } catch (err: unknown) {
        errors.push(
          `${mapping.badge}: ${err instanceof Error ? err.message : 'File not accessible'}`
        );
      }
    }

    setActiveProgress(null);
    await refreshVaultDiagnostics();
    if (syncedCount > 0) {
      setSuccessMessage(
        lang === 'ar'
          ? `تم استيراد ${syncedCount} ملفات PDF من Google Drive بنجاح!`
          : `Successfully imported ${syncedCount} PDF books from Google Drive!`
      );
    }
    if (errors.length > 0) {
      setErrorMessage(
        lang === 'ar'
          ? `فشل استيراد بعض الملفات (لم يتم استبدالها بملخصات وهمية): ${errors.join(' | ')}`
          : `Some imports failed (no synthetic substitutes were used): ${errors.join(' | ')}`
      );
    }
  };

  const handleLocalFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        let targetId: string | undefined =
          selectedTargetBookId === 'auto' ? undefined : selectedTargetBookId;

        if (!targetId) {
          const matchedMapping = KNOWN_DRIVE_BOOK_MAPPINGS.find(m =>
            m.matchKeywords.some(kw => file.name.toLowerCase().includes(kw.toLowerCase()))
          );
          if (matchedMapping) {
            targetId = matchedMapping.bookId;
          }
        }

        const record = await ingestLocalPdfFileAsFullBook({
          file,
          targetBookId: targetId,
          onProgress: p => setActiveProgress(p)
        });

        await refreshVaultDiagnostics();
        const badgeMeta = getProcessingStatusBadgeMeta(record.processingStatus, lang);
        if (record.processingStatus === 'verified_complete') {
          setSuccessMessage(
            lang === 'ar'
              ? `[${badgeMeta.label}] تم استيراد والتحقق من ملف PDF الأصلي "${record.sourceFileName || record.fileName}" (${record.totalPages} صفحة • ${record.totalChapters} فصلاً)!`
              : `[${badgeMeta.label}] Verified and indexed 100% of "${record.sourceFileName || record.fileName}" (${record.totalPages} pages • ${record.totalChapters} chapters)!`
          );
        } else {
          setErrorMessage(
            lang === 'ar'
              ? `[${badgeMeta.label}] تم استيراد "${record.sourceFileName || record.fileName}" (${record.extractedTextPageCount ?? 0} صفحة نصية، و${record.unprocessedPageCount ?? 0} صفحة تحتاج إلى OCR).`
              : `[${badgeMeta.label}] Imported "${record.sourceFileName || record.fileName}" (${record.extractedTextPageCount ?? 0} text pages, ${record.unprocessedPageCount ?? 0} pages needing OCR).`
          );
        }
        onBookSynced?.(record);
      }
    } catch (err: unknown) {
      await refreshVaultDiagnostics();
      setErrorMessage(err instanceof Error ? err.message : 'Failed to parse local PDF file.');
    } finally {
      setActiveProgress(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleConfirmDeleteLocalCache = async (bookId: string) => {
    await removeSyncedFullBook(bookId);
    setConfirmDeleteBookId(null);
    await refreshVaultDiagnostics();
    setSuccessMessage(
      lang === 'ar'
        ? 'تم مسح النسخة المخزنة محلياً من المتصفح (IndexedDB).'
        : 'Removed cached book from browser IndexedDB storage.'
    );
  };

  const handleEnablePersistentStorage = async () => {
    const granted = await requestPersistentOfflineStorage();
    await refreshVaultDiagnostics();
    if (granted) {
      setSuccessMessage(
        lang === 'ar'
          ? 'تم تفعيل حماية التخزين الدائم (Persistent IndexedDB Storage).'
          : 'Persistent IndexedDB storage granted!'
      );
    } else {
      setErrorMessage(
        lang === 'ar'
          ? 'المتصفح يدير التخزين المحلي تلقائياً.'
          : 'Browser manages storage persistence automatically.'
      );
    }
  };

  const handleVerifyIntegrity = async (bookId: string) => {
    setErrorMessage(null);
    setSuccessMessage(null);
    const res = await verifyOfflineBookIntegrity(bookId);
    if (res.isVerifiedOriginalPdf) {
      setSuccessMessage(lang === 'ar' ? res.messageAr : res.messageEn);
    } else {
      setErrorMessage(lang === 'ar' ? res.messageAr : res.messageEn);
    }
  };

  const handleDownloadOfflinePdf = async (bookId: string) => {
    const ok = await downloadOfflinePdfFromVault(bookId);
    if (!ok) {
      setErrorMessage(
        lang === 'ar'
          ? 'ملف الـ PDF الثنائي الأصلي غير مستورد بعد لهذا المرجع؛ قم باستيراده من Google Drive أو من جهازك.'
          : 'Original binary PDF has not been imported yet for this reference; import it from Google Drive or device.'
      );
    }
  };

  const selectedBookForReport = selectedReportBookId
    ? syncedBooks.find(b => b.bookId === selectedReportBookId)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-5xl w-full max-h-[92vh] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
              <CloudDownload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-sm sm:text-base">
                {lang === 'ar'
                  ? 'منظومة استيراد والتحقق من ملفات PDF الطبية الأصلية الكاملة (Google Drive & Local PDF)'
                  : 'Authentic Full-PDF Medical Reference Ingestion, Verification & Diagnostic Vault'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'ar'
                  ? 'فصل صارم بين ملفات PDF الأصلية الموثّقة (SHA-256) والملخصات المدمجة، مع تتبع الصفحات النصية والمصورة (OCR) والجداول'
                  : 'Strict separation between SHA-256 verified original PDFs and built-in summaries, tracking native text, OCR, and tables'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Progress Banner */}
        {activeProgress && (
          <div className="px-5 py-3.5 bg-teal-950 text-teal-100 border-b border-teal-800 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-teal-400 animate-spin" />
                <span>
                  {activeProgress.stageNumber
                    ? `[Stage ${activeProgress.stageNumber}/10] `
                    : ''}
                  {activeProgress.message}
                </span>
              </span>
              {activeProgress.totalPages > 0 && (
                <span className="font-mono text-teal-300">
                  Page {activeProgress.currentPage} / {activeProgress.totalPages} (
                  {Math.round((activeProgress.currentPage / activeProgress.totalPages) * 100)}%)
                </span>
              )}
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-teal-400 transition-all duration-200"
                style={{
                  width:
                    activeProgress.totalPages > 0
                      ? `${Math.max(
                          5,
                          Math.round(
                            (activeProgress.currentPage / activeProgress.totalPages) * 100
                          )
                        )}%`
                      : '40%'
                }}
              />
            </div>
          </div>
        )}

        {/* Status Messages */}
        {errorMessage && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">{errorMessage}</div>
          </div>
        )}

        {successMessage && (
          <div className="mx-5 mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="flex-1 font-semibold">{successMessage}</div>
          </div>
        )}

        {/* Confirmation Modal for Removing Local Cached Book */}
        {confirmDeleteBookId && (
          <div className="mx-5 mt-4 p-4 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="font-semibold text-amber-900 dark:text-amber-200">
              {lang === 'ar'
                ? 'هل أنت متأكد من إزالة النسخة المفهرسة محلياً لهذا الكتاب من ذاكرة المتصفح؟'
                : 'Are you sure you want to remove the locally cached index for this book?'}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleConfirmDeleteLocalCache(confirmDeleteBookId)}
                className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold cursor-pointer"
              >
                {lang === 'ar' ? 'تأكيد الحذف المحلي' : 'Confirm Remove'}
              </button>
              <button
                type="button"
                onClick={() => setConfirmDeleteBookId(null)}
                className="px-3 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold cursor-pointer"
              >
                {lang === 'ar' ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        )}

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Section 0: IndexedDB Offline PDF Storage Vault Status & Quota Diagnostics */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-teal-950/90 via-slate-900 to-slate-900 text-white border border-teal-800/60 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Database className="w-5 h-5 text-teal-400 shrink-0" />
                <div>
                  <div className="font-bold text-xs sm:text-sm flex items-center gap-2 flex-wrap">
                    <span>
                      {lang === 'ar'
                        ? 'تشخيص خزنة التخزين المحلي IndexedDB والتحقق من سلامة الكتب'
                        : 'IndexedDB Medical PDF Verification & Storage Diagnostics'}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isOnline
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
                          : 'bg-amber-500/20 text-amber-300 border border-amber-400/30'
                      }`}
                    >
                      {isOnline ? (
                        <>
                          <Wifi className="w-3 h-3" />
                          <span>{lang === 'ar' ? 'متصل بالإنترنت' : 'Online'}</span>
                        </>
                      ) : (
                        <>
                          <WifiOff className="w-3 h-3" />
                          <span>{lang === 'ar' ? 'وضع عدم الاتصال' : 'Offline Mode'}</span>
                        </>
                      )}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {lang === 'ar'
                      ? 'لا يُصنّف أي مرجع كـ «مكتمل التحقق» إلا بعد التحقق من توقيع %PDF- وبصمة SHA-256 واكتمال استخراج كافة الصفحات.'
                      : 'A book is marked "Verified Complete" ONLY when its %PDF- signature, SHA-256 hash, and 100% of pages are verified.'}
                  </p>
                </div>
              </div>

              {!vaultDiag?.isPersistentStorageGranted ? (
                <button
                  type="button"
                  onClick={() => void handleEnablePersistentStorage()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-400/40 text-xs font-bold cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-teal-300" />
                  <span>
                    {lang === 'ar'
                      ? 'تفعيل التخزين الدائم غير القابل للمسح'
                      : 'Lock Persistent Offline Storage'}
                  </span>
                </button>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {lang === 'ar'
                      ? 'التخزين الدائم محمي ومُفعّل'
                      : 'Persistent Offline Storage Protected'}
                  </span>
                </span>
              )}
            </div>

            {vaultDiag && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                  <div className="text-[10px] text-slate-400">
                    {lang === 'ar' ? 'ملفات PDF الأصلية المكتملة' : 'Verified Original PDFs'}
                  </div>
                  <div className="font-mono font-bold text-sm text-emerald-300 mt-0.5">
                    {vaultDiag.totalVerifiedOriginalPdfs}{' '}
                    <span className="text-[10px] font-normal text-slate-400">
                      ({vaultDiag.totalEmbeddedSummaries}{' '}
                      {lang === 'ar' ? 'ملخص مدمج' : 'summary'})
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                  <div className="text-[10px] text-slate-400">
                    {lang === 'ar' ? 'إجمالي الصفحات المفهرسة' : 'Total Indexed Pages'}
                  </div>
                  <div className="font-mono font-bold text-sm text-teal-300 mt-0.5">
                    {vaultDiag.totalPagesCached.toLocaleString()}{' '}
                    <span className="text-[11px] font-normal text-slate-400">
                      ({vaultDiag.totalChaptersCached} {lang === 'ar' ? 'فصلاً' : 'Ch'})
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                  <div className="text-[10px] text-slate-400">
                    {lang === 'ar' ? 'حجم الخزنة المحلية' : 'IndexedDB Vault Size'}
                  </div>
                  <div className="font-mono font-bold text-sm text-amber-300 mt-0.5">
                    {formatStorageBytes(vaultDiag.totalVaultBytes)}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
                  <div className="text-[10px] text-slate-400">
                    {lang === 'ar' ? 'سعة تخزين المتصفح المتاحة' : 'Browser Storage Quota'}
                  </div>
                  <div className="font-mono font-bold text-sm text-sky-300 mt-0.5">
                    {vaultDiag.browserQuotaBytes
                      ? `${formatStorageBytes(vaultDiag.browserUsageBytes || 0)} / ${formatStorageBytes(
                          vaultDiag.browserQuotaBytes
                        )}`
                      : lang === 'ar'
                      ? 'متاح بالكامل'
                      : 'Available'}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 1: Google Drive Account Connection Bar + Direct Local PDF Upload */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                {lang === 'ar'
                  ? '1. اتصال Google Drive أو رفع ملف PDF أصلي من جهازك'
                  : '1. Google Drive Connection or Direct Local PDF Import'}
              </div>
              {!needsAuth && user ? (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>
                    {lang === 'ar' ? 'متصل بحساب:' : 'Connected as:'} {user.displayName || user.email}
                  </span>
                  <span className="text-xs font-normal text-slate-500">({user.email})</span>
                </div>
              ) : (
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {lang === 'ar'
                    ? 'سجّل الدخول بحساب Google لاستيراد ملفات PDF المصرح بها، أو ارفع ملف PDF الأصلي من جهازك مباشرة.'
                    : 'Sign in with Google to import authorized Drive PDFs, or upload an original PDF file directly from your device.'}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {needsAuth && (
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="gsi-material-button inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs text-xs font-bold transition cursor-pointer"
                >
                  <span>
                    {isLoggingIn
                      ? lang === 'ar'
                        ? 'جاري الاتصال...'
                        : 'Signing in...'
                      : lang === 'ar'
                      ? 'Sign in with Google (ربط Google Drive)'
                      : 'Sign in with Google'}
                  </span>
                </button>
              )}
              <button
                type="button"
                onClick={handleSyncAllMappedBooks}
                disabled={Boolean(activeProgress)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
              >
                <CloudDownload className="w-4 h-4" />
                <span>
                  {lang === 'ar'
                    ? 'استيراد الكتب من روابط Drive'
                    : 'Import Books from Drive Links'}
                </span>
              </button>

              {!needsAuth && (
                <button
                  type="button"
                  onClick={() => void logout()}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}</span>
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                multiple
                onChange={handleLocalFileUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={Boolean(activeProgress)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition cursor-pointer"
              >
                <FileUp className="w-4 h-4 text-teal-400" />
                <span>
                  {lang === 'ar'
                    ? 'رفع ملف PDF أصلي من جهازك'
                    : 'Import Original PDF from Device'}
                </span>
              </button>
            </div>
          </div>

          {/* Section 2: The 7 Core Reference Books & Their Explicit Verification Status */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <BookOpenCheck className="w-4 h-4 text-teal-600" />
                <span>
                  {lang === 'ar'
                    ? '2. حالة استيراد والتحقق من المراجع الطبية السبعة'
                    : '2. Reference Textbooks Ingestion & Verification Status'}
                </span>
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {KNOWN_DRIVE_BOOK_MAPPINGS.map(mapping => {
                const syncedRecord = syncedBooks.find(s => s.bookId === mapping.bookId);
                const vaultBook = vaultDiag?.books.find(b => b.bookId === mapping.bookId);
                const driveInputVal = customDriveIds[mapping.bookId] || '';
                const effectiveStatus: BookProcessingStatus = syncedRecord
                  ? syncedRecord.processingStatus ||
                    (syncedRecord.sourceType === 'embedded_synthetic'
                      ? 'embedded_summary'
                      : 'partially_complete')
                  : 'not_imported';
                const statusBadge = getProcessingStatusBadgeMeta(effectiveStatus, lang);

                return (
                  <div
                    key={mapping.bookId}
                    className={`p-3.5 rounded-xl border space-y-2.5 ${
                      effectiveStatus === 'verified_complete'
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                        : effectiveStatus === 'partially_complete' || effectiveStatus === 'needs_ocr'
                        ? 'bg-amber-50/40 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                        : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-800'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-xs text-slate-900 dark:text-slate-100">
                          {lang === 'ar' ? mapping.titleAr : mapping.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {lang === 'ar' ? mapping.badgeAr : mapping.badge}
                        </div>
                      </div>

                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-bold shrink-0 ${statusBadge.badgeClass}`}
                      >
                        {effectiveStatus === 'verified_complete' ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <AlertTriangle className="w-3 h-3" />
                        )}
                        <span>{statusBadge.label}</span>
                      </span>
                    </div>

                    {syncedRecord && (
                      <div className="text-[11px] font-mono bg-slate-100/80 dark:bg-slate-900/70 px-2.5 py-2 rounded-lg space-y-1 border border-slate-200/70 dark:border-slate-800">
                        <div className="flex items-center justify-between gap-2">
                          <span className="truncate font-semibold text-slate-800 dark:text-slate-200">
                            {syncedRecord.sourceFileName || syncedRecord.fileName}
                          </span>
                          <div className="flex items-center gap-1 shrink-0">
                            {vaultBook?.hasBinaryPdf &&
                              syncedRecord.sourceType !== 'embedded_synthetic' && (
                                <button
                                  type="button"
                                  onClick={() => void handleDownloadOfflinePdf(mapping.bookId)}
                                  className="px-1.5 py-0.5 rounded bg-teal-600 hover:bg-teal-500 text-white text-[10px] font-sans font-bold inline-flex items-center gap-1 cursor-pointer"
                                  title="Download cached original PDF"
                                >
                                  <Download className="w-3 h-3" />
                                  <span>PDF</span>
                                </button>
                              )}
                            <button
                              type="button"
                              onClick={() => void handleVerifyIntegrity(mapping.bookId)}
                              className="px-1.5 py-0.5 rounded bg-emerald-700/20 hover:bg-emerald-700/30 text-emerald-800 dark:text-emerald-200 text-[10px] font-sans font-bold cursor-pointer"
                            >
                              {lang === 'ar' ? 'فحص' : 'Verify'}
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setSelectedReportBookId(
                                  selectedReportBookId === mapping.bookId ? null : mapping.bookId
                                )
                              }
                              className="px-1.5 py-0.5 rounded bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-800 dark:text-indigo-200 text-[10px] font-sans font-bold cursor-pointer"
                            >
                              {lang === 'ar' ? 'تقرير' : 'Report'}
                            </button>
                            <button
                              type="button"
                              onClick={() => setConfirmDeleteBookId(mapping.bookId)}
                              className="text-rose-600 hover:text-rose-500 p-1 shrink-0 cursor-pointer"
                              title="Remove local cached copy"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-[10px] text-slate-600 dark:text-slate-400 pt-1 border-t border-slate-200/60 dark:border-slate-800">
                          <div>
                            {lang === 'ar' ? 'الصفحات الأصلية:' : 'Total Pages:'}{' '}
                            <strong className="text-slate-900 dark:text-white">
                              {syncedRecord.originalPageCount ?? syncedRecord.totalPages}
                            </strong>
                          </div>
                          <div>
                            {lang === 'ar' ? 'نص أصلي:' : 'Native Text:'}{' '}
                            <strong className="text-emerald-700 dark:text-emerald-400">
                              {syncedRecord.extractedTextPageCount ?? 0}
                            </strong>
                          </div>
                          <div>
                            {lang === 'ar' ? 'صفحات OCR:' : 'OCR Pages:'}{' '}
                            <strong className="text-sky-700 dark:text-sky-400">
                              {syncedRecord.ocrPageCount ?? 0}
                            </strong>
                          </div>
                          <div>
                            {lang === 'ar' ? 'غير معالجة:' : 'Needs OCR:'}{' '}
                            <strong
                              className={
                                (syncedRecord.unprocessedPageCount ?? 0) > 0
                                  ? 'text-rose-600 font-bold'
                                  : 'text-slate-500'
                              }
                            >
                              {syncedRecord.unprocessedPageCount ?? 0}
                            </strong>
                          </div>
                        </div>

                        {syncedRecord.sha256 && (
                          <div className="text-[9px] text-slate-500 truncate">
                            SHA-256: {syncedRecord.sha256} • Source: {syncedRecord.sourceType}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Drive File ID or Link Input + Sync Button */}
                    <div className="flex items-center gap-1.5">
                      <div className="relative flex-1">
                        <Link2 className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          value={driveInputVal}
                          onChange={e =>
                            setCustomDriveIds(prev => ({
                              ...prev,
                              [mapping.bookId]: e.target.value
                            }))
                          }
                          placeholder={
                            lang === 'ar'
                              ? 'معرف ملف Google Drive أو رابط الـ PDF...'
                              : 'Google Drive File ID or Share Link...'
                          }
                          className="w-full pl-8 pr-2.5 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-mono"
                        />
                      </div>

                      <button
                        type="button"
                        disabled={Boolean(activeProgress) || !driveInputVal.trim()}
                        onClick={() =>
                          void handleSyncSingleBookFromDrive(mapping.bookId, driveInputVal, true)
                        }
                        className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white text-[11px] font-bold whitespace-nowrap cursor-pointer"
                      >
                        {syncedRecord && syncedRecord.sourceType !== 'embedded_synthetic'
                          ? lang === 'ar'
                            ? 'إعادة استيراد وتحقق'
                            : 'Re-Import PDF'
                          : lang === 'ar'
                          ? 'استيراد PDF الأصلي'
                          : 'Import Original PDF'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Book Detailed Diagnostic Report Drawer */}
          {selectedBookForReport && (
            <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 border border-teal-500/40 space-y-3 text-xs font-mono">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2 font-sans font-bold text-teal-300">
                  <FileSearch className="w-4 h-4" />
                  <span>
                    {lang === 'ar'
                      ? `تقرير التحقق التشخيصي للكتاب: ${selectedBookForReport.displayTitle || selectedBookForReport.fileName}`
                      : `Diagnostic Verification Report: ${selectedBookForReport.displayTitle || selectedBookForReport.fileName}`}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedReportBookId(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                <div>Source File: {selectedBookForReport.sourceFileName || selectedBookForReport.fileName}</div>
                <div>Source Type: {selectedBookForReport.sourceType}</div>
                <div>Status: {selectedBookForReport.processingStatus}</div>
                <div>File Size: {formatStorageBytes(selectedBookForReport.fileSize)}</div>
                <div>Original Pages: {selectedBookForReport.originalPageCount ?? selectedBookForReport.totalPages}</div>
                <div>Processed Pages: {selectedBookForReport.processedPageCount ?? 0}</div>
                <div>Native Text Pages: {selectedBookForReport.extractedTextPageCount ?? 0}</div>
                <div>OCR Pages: {selectedBookForReport.ocrPageCount ?? 0}</div>
                <div>Unprocessed/Needs OCR: {selectedBookForReport.unprocessedPageCount ?? 0}</div>
                <div>Blank Pages: {selectedBookForReport.blankPageCount ?? 0}</div>
                <div>Chapters: {selectedBookForReport.totalChapters}</div>
                <div>Tables Extracted: {selectedBookForReport.structuredTables?.length ?? 0}</div>
              </div>
              <div className="text-[10px] text-slate-400 break-all">
                SHA-256: {selectedBookForReport.sha256 || 'N/A'}
              </div>
              {selectedBookForReport.diagnosticReport?.warnings &&
                selectedBookForReport.diagnosticReport.warnings.length > 0 && (
                  <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-800 text-amber-200 text-[10px] space-y-1 max-h-32 overflow-y-auto">
                    <div className="font-bold">Warnings ({selectedBookForReport.diagnosticReport.warnings.length}):</div>
                    {selectedBookForReport.diagnosticReport.warnings.slice(0, 15).map((w, idx) => (
                      <div key={idx}>• {w}</div>
                    ))}
                  </div>
                )}
            </div>
          )}

          {/* Section 3: Recent Import Jobs Log */}
          {importJobs.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-teal-600" />
                <span>
                  {lang === 'ar'
                    ? 'سجل مهام الاستيراد والتشخيص (Import Jobs Audit Log)'
                    : 'Recent PDF Import Jobs & Verification Audit Log'}
                </span>
              </h3>
              <div className="max-h-44 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 text-[11px] font-mono">
                {importJobs.slice(0, 8).map(job => {
                  const badge = getProcessingStatusBadgeMeta(job.jobStatus, lang);
                  return (
                    <div
                      key={job.id}
                      className="px-3 py-2 bg-white dark:bg-slate-900 flex flex-wrap items-center justify-between gap-2"
                    >
                      <div className="min-w-0">
                        <span className="font-bold text-slate-800 dark:text-slate-200">
                          {job.sourceFileName}
                        </span>{' '}
                        <span className="text-slate-400">
                          ({job.sourceType} • {formatStorageBytes(job.fileSize)})
                        </span>
                        {job.safeErrorMessage && (
                          <div className="text-rose-600 text-[10px]">{job.safeErrorMessage}</div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-slate-500">
                          Text: {job.extractedTextPageCount}/{job.originalPageCount} • OCR:{' '}
                          {job.ocrPageCount} • Unprocessed: {job.unprocessedPageCount} • Tables:{' '}
                          {job.tablesSavedCount}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded border text-[10px] font-sans font-bold ${badge.badgeClass}`}
                        >
                          {badge.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section 4: Browse & Search All PDFs / Folders in User's Google Drive */}
          {!needsAuth && token && (
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-teal-600" />
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                    {lang === 'ar'
                      ? 'تصفح ملفات الـ PDF والمجلدات في حساب Google Drive الخاص بك'
                      : 'Browse & Import PDFs Directly from Your Google Drive'}
                  </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={selectedTargetBookId}
                    onChange={e => setSelectedTargetBookId(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold"
                  >
                    <option value="auto">
                      {lang === 'ar'
                        ? 'تعيين تلقائي أو إضافة ككتاب جديد'
                        : 'Auto-Detect or Add as New Book'}
                    </option>
                    {KNOWN_DRIVE_BOOK_MAPPINGS.map(m => (
                      <option key={m.bookId} value={m.bookId}>
                        {lang === 'ar' ? `ربط بـ: ${m.badgeAr}` : `Link to: ${m.badge}`}
                      </option>
                    ))}
                  </select>

                  <form
                    onSubmit={e => {
                      e.preventDefault();
                      void fetchUserDriveFiles(token, driveSearch);
                    }}
                    className="flex items-center gap-1.5"
                  >
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={driveSearch}
                        onChange={e => setDriveSearch(e.target.value)}
                        placeholder={
                          lang === 'ar' ? 'ابحث في ملفات Drive...' : 'Search your Drive PDFs...'
                        }
                        className="pl-8 pr-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isLoadingDriveFiles}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold cursor-pointer"
                    >
                      {lang === 'ar' ? 'بحث' : 'Search'}
                    </button>
                  </form>
                </div>
              </div>

              {isLoadingDriveFiles ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  {lang === 'ar'
                    ? 'جاري قراءة قائمة ملفات PDF من حساب Google Drive...'
                    : 'Loading PDF files from your Google Drive...'}
                </div>
              ) : driveFiles.length === 0 ? (
                <div className="p-6 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500">
                  {lang === 'ar'
                    ? 'لم يتم العثور على ملفات PDF مطابقة في Drive.'
                    : 'No matching PDF files found in your Google Drive.'}
                </div>
              ) : (
                <div className="max-h-64 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
                  {driveFiles.map(file => {
                    const isFolder = file.mimeType === 'application/vnd.google-apps.folder';
                    const sizeMb = file.size
                      ? `${(Number(file.size) / (1024 * 1024)).toFixed(1)} MB`
                      : isFolder
                      ? 'Folder'
                      : 'Doc';

                    return (
                      <div
                        key={file.id}
                        className="px-3.5 py-2.5 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          {isFolder ? (
                            <FolderOpen className="w-4 h-4 text-amber-500 shrink-0" />
                          ) : (
                            <FileText className="w-4 h-4 text-teal-600 shrink-0" />
                          )}
                          <div className="min-w-0">
                            <div className="font-bold text-slate-800 dark:text-slate-100 truncate">
                              {file.name}
                            </div>
                            <div className="text-[10px] font-mono text-slate-400">
                              ID: {file.id} • {sizeMb}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          disabled={Boolean(activeProgress)}
                          onClick={() =>
                            void handleSyncSingleBookFromDrive(selectedTargetBookId, file.id, true)
                          }
                          className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white text-[11px] font-bold shrink-0 cursor-pointer"
                        >
                          {lang === 'ar' ? 'استيراد وفهرسة الملف الأصلي' : 'Import Original PDF'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
