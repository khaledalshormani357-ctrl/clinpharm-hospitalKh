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
  SyncedFullBookRecord,
  hydrateSyncedFullBooks,
  removeSyncedFullBook
} from '../../lib/googleDrive/fullBookIdb';
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
  Link2
} from 'lucide-react';
import { User } from 'firebase/auth';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onBookSynced?: (record: SyncedFullBookRecord) => void;
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
  const [driveFiles, setDriveFiles] = useState<DriveFileItem[]>([]);
  const [driveSearch, setDriveSearch] = useState<string>('');
  const [isLoadingDriveFiles, setIsLoadingDriveFiles] = useState<boolean>(false);

  // Per-book custom Drive File ID or URL overrides
  const [customDriveIds, setCustomDriveIds] = useState<Record<string, string>>(() => {
    const map: Record<string, string> = {};
    for (const item of KNOWN_DRIVE_BOOK_MAPPINGS) {
      map[item.bookId] = item.defaultDriveId;
    }
    return map;
  });

  // Target book assignment when importing from Drive file list or local upload
  const [selectedTargetBookId, setSelectedTargetBookId] = useState<string>('auto');

  const [activeProgress, setActiveProgress] = useState<BookSyncProgress | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [confirmDeleteBookId, setConfirmDeleteBookId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

    void hydrateSyncedFullBooks().then(records => {
      setSyncedBooks(records);
    });

    const handleUpdated = () => {
      void hydrateSyncedFullBooks().then(records => {
        setSyncedBooks(records);
      });
    };
    window.addEventListener('clinpharm-full-books-updated', handleUpdated);

    return () => {
      unsubInit();
      unsubState();
      window.removeEventListener('clinpharm-full-books-updated', handleUpdated);
    };
  }, []);

  const fetchUserDriveFiles = async (accessToken: string, query?: string) => {
    setIsLoadingDriveFiles(true);
    setErrorMessage(null);
    try {
      const files = await listUserDriveFiles(accessToken, query);
      setDriveFiles(files);

      // Auto-match user's Drive files by name to the 6 core books if found
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

  const handleSyncSingleBookFromDrive = async (bookId: string, driveIdOrUrl: string) => {
    if (!token || needsAuth) {
      setNeedsAuth(true);
      setErrorMessage(
        lang === 'ar'
          ? 'يرجى تسجيل الدخول بحساب Google أولاً للوصول إلى ملفات Google Drive.'
          : 'Please sign in with Google first to access your Google Drive files.'
      );
      return;
    }

    setErrorMessage(null);
    setSuccessMessage(null);
    try {
      const record = await ingestDriveFileAsFullBook({
        accessToken: token,
        driveFileId: driveIdOrUrl,
        targetBookId: bookId === 'auto' ? undefined : bookId,
        onProgress: p => setActiveProgress(p)
      });

      setSuccessMessage(
        lang === 'ar'
          ? `تم استيراد وفهرسة الكتاب الكامل "${record.fileName}" بنجاح (${record.totalPages} صفحة • ${record.totalChapters} فصلاً حرفياً)!`
          : `Successfully synced and indexed 100% of "${record.fileName}" (${record.totalPages} pages • ${record.totalChapters} chapters)!`
      );
      onBookSynced?.(record);
    } catch (err: unknown) {
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
    if (!token || needsAuth) {
      setNeedsAuth(true);
      return;
    }
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
    if (syncedCount > 0) {
      setSuccessMessage(
        lang === 'ar'
          ? `تمت مزامنة وفهرسة ${syncedCount} مراجع كاملة بنجاح من Google Drive!`
          : `Successfully synced and indexed ${syncedCount} full books from Google Drive!`
      );
    }
    if (errors.length > 0) {
      setErrorMessage(
        lang === 'ar'
          ? `ملاحظة لبعض الملفات (تأكد من وجودها في حسابك أو اخترها من قائمة ملفات Drive أدناه): ${errors.join(' | ')}`
          : `Note for some IDs (verify file access in your Drive or pick from your Drive list below): ${errors.join(' | ')}`
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

        setSuccessMessage(
          lang === 'ar'
            ? `تم استيراد وفهرسة ملف الـ PDF الكامل "${record.fileName}" (${record.totalPages} صفحة • ${record.totalChapters} فصلاً) بنجاح!`
            : `Successfully indexed 100% of "${record.fileName}" (${record.totalPages} pages • ${record.totalChapters} chapters)!`
        );
        onBookSynced?.(record);
      }
    } catch (err: unknown) {
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
    setSuccessMessage(
      lang === 'ar'
        ? 'تم مسح النسخة المخزنة محلياً من المتصفح (IndexedDB).'
        : 'Removed cached full book from browser IndexedDB storage.'
    );
  };

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
                  ? 'ربط Google Drive واستيراد الكتب المرجعية الكاملة (100% من الصفحات حرفياً)'
                  : 'Google Drive Connection & 100% Full-Book PDF Verbatim Indexer'}
              </h2>
              <p className="text-xs text-slate-400">
                {lang === 'ar'
                  ? 'يقرأ ويستخرج كل صفحة وكل فصل من ملفات الـ PDF في Google Drive دون أي اختصار أو ترجمة ويحفظها محلياً في IndexedDB'
                  : 'Extracts and indexes 100% of pages and chapters verbatim from your Google Drive PDFs and persists them in IndexedDB'}
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
                <span>{activeProgress.message}</span>
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
                ? 'هل أنت متأكد من إزالة النسخة المفهرسة محلياً لهذا الكتاب من ذاكرة المتصفح؟ (لن يتأثر ملفك الأصلي في Google Drive)'
                : 'Are you sure you want to remove the locally cached index for this book? (Your file in Google Drive will not be affected)'}
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
          {/* Section 1: Google Drive Account Connection Bar + Direct Local PDF Upload */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                {lang === 'ar'
                  ? '1. حالة اتصال حساب Google Drive'
                  : '1. Google Drive Account Status'}
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
                    ? 'سجّل الدخول بحساب Google الخاص بك لقراءة واستيراد كتب الـ PDF الكاملة مباشرةً من Google Drive.'
                    : 'Sign in with your Google account to read and index your full PDF reference books directly from Google Drive.'}
                </p>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {needsAuth ? (
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="gsi-material-button inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 shadow-xs text-xs font-bold transition cursor-pointer"
                >
                  <div className="w-4 h-4 shrink-0">
                    <svg
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      className="block w-full h-full"
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
                      />
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      />
                      <path fill="none" d="M0 0h48v48H0z" />
                    </svg>
                  </div>
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
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleSyncAllMappedBooks}
                    disabled={Boolean(activeProgress)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-500 disabled:opacity-50 text-white text-xs font-bold transition cursor-pointer"
                  >
                    <CloudDownload className="w-4 h-4" />
                    <span>
                      {lang === 'ar'
                        ? 'مزامنة وفهرسة جميع الكتب من Drive'
                        : 'Sync All Reference Books from Drive'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => void logout()}
                    className="inline-flex items-center gap-1 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-semibold cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? 'تسجيل الخروج' : 'Sign Out'}</span>
                  </button>
                </>
              )}

              {/* Direct Local PDF File Upload Option */}
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
                    ? 'رفع ملف PDF كامل من جهازك مباشرة'
                    : 'Import Full PDF from Device'}
                </span>
              </button>
            </div>
          </div>

          {/* Section 2: The 6 Core Reference Books & Their Full-Book Sync Status */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <BookOpenCheck className="w-4 h-4 text-teal-600" />
                <span>
                  {lang === 'ar'
                    ? '2. المراجع السريرية الستة المعتمدة (ربط وفهرسة الكتب الكاملة)'
                    : '2. Core Clinical Reference Textbooks (Full-Book PDF Mapping & Status)'}
                </span>
              </h3>
              <span className="text-[11px] font-mono text-slate-500">
                {syncedBooks.length} {lang === 'ar' ? 'كتب كاملة مفهرسة محلياً' : 'Full PDF Books Indexed in IndexedDB'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {KNOWN_DRIVE_BOOK_MAPPINGS.map(mapping => {
                const syncedRecord = syncedBooks.find(s => s.bookId === mapping.bookId);
                const driveInputVal = customDriveIds[mapping.bookId] || '';

                return (
                  <div
                    key={mapping.bookId}
                    className={`p-3.5 rounded-xl border space-y-2.5 ${
                      syncedRecord
                        ? 'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
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

                      {syncedRecord ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 text-[10px] font-bold font-mono shrink-0">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>
                            {syncedRecord.totalPages} {lang === 'ar' ? 'صفحة كاملة' : 'Pages Indexed'}
                          </span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-[10px] font-semibold shrink-0">
                          {lang === 'ar' ? 'ملخص مدمج فقط' : 'Built-in Summary'}
                        </span>
                      )}
                    </div>

                    {syncedRecord && (
                      <div className="text-[11px] text-emerald-800 dark:text-emerald-300 font-mono bg-emerald-100/60 dark:bg-emerald-950/50 px-2.5 py-1.5 rounded-lg flex items-center justify-between gap-2">
                        <span className="truncate">
                          ✓ {syncedRecord.fileName} • {syncedRecord.totalPages} pp •{' '}
                          {syncedRecord.totalChapters} Ch •{' '}
                          {(syncedRecord.totalCharacters / 1000).toFixed(0)}k chars
                        </span>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteBookId(mapping.bookId)}
                          className="text-rose-600 hover:text-rose-500 p-1 shrink-0 cursor-pointer"
                          title="Remove local cached copy"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
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
                          void handleSyncSingleBookFromDrive(mapping.bookId, driveInputVal)
                        }
                        className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white text-[11px] font-bold whitespace-nowrap cursor-pointer"
                      >
                        {syncedRecord
                          ? lang === 'ar'
                            ? 'تحديث من Drive'
                            : 'Re-Sync'
                          : lang === 'ar'
                          ? 'جلب الكتاب الكامل'
                          : 'Sync Full PDF'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Browse & Search All PDFs / Folders in User's Google Drive */}
          {!needsAuth && token && (
            <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-teal-600" />
                  <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                    {lang === 'ar'
                      ? '3. تصفح ملفات الـ PDF والمجلدات في حساب Google Drive الخاص بك'
                      : '3. Browse & Import PDFs Directly from Your Google Drive'}
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
                    ? 'لم يتم العثور على ملفات PDF مطابقة في Drive. يمكنك البحث باسم آخر أو لصق رابط الملف أعلاه.'
                    : 'No matching PDF files found in your Google Drive. Try another search or paste a Drive file link above.'}
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
                            void handleSyncSingleBookFromDrive(selectedTargetBookId, file.id)
                          }
                          className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:opacity-40 text-white text-[11px] font-bold shrink-0 cursor-pointer"
                        >
                          {lang === 'ar'
                            ? 'استيراد وفهرسة 100% من الصفحات'
                            : 'Import & Index 100% Pages'}
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
