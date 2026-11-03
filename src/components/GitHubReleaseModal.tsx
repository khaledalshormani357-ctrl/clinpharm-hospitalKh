import { useState } from 'react';
import { Language, Patient, ClinicalIntervention, ReconciliationDiscrepancy } from '../types/clinical';
import { usePWAInstall } from '../lib/usePWAInstall';
import { getAllVerbatimBooks } from '../lib/library';
import {
  X,
  Download,
  Smartphone,
  Globe,
  CheckCircle2,
  Copy,
  Check,
  Terminal,
  PackageCheck,
  ShieldCheck,
  Share2,
  Wifi,
  WifiOff,
  HardDriveDownload
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  patients: Patient[];
  interventions: ClinicalIntervention[];
  discrepancies: ReconciliationDiscrepancy[];
}

export function GitHubReleaseModal({
  isOpen,
  onClose,
  lang,
  patients,
  interventions,
  discrepancies
}: Props) {
  const { isInstallable, isInstalled, isIOS, isOnline, install } = usePWAInstall();
  const [githubRepoSlug, setGithubRepoSlug] = useState<string>('khaledalshormani/clinpharm-hospital');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'install_now' | 'github_deploy' | 'android_apk'>('install_now');

  if (!isOpen) return null;

  const books = getAllVerbatimBooks();
  const totalChapters = books.reduce((sum, b) => sum + b.chapters.length, 0);

  const cleanSlug = githubRepoSlug.trim().replace(/^https?:\/\/github\.com\//i, '').replace(/\/+$/, '');
  const [repoOwner = 'username', repoName = 'clinpharm-hospital'] = cleanSlug.split('/');

  const livePagesUrl = `https://${repoOwner}.github.io/${repoName}/`;
  const latestApkReleaseUrl = `https://github.com/${repoOwner}/${repoName}/releases/latest/download/ClinPharm-Hospital-Android.apk`;
  const githubActionsUrl = `https://github.com/${repoOwner}/${repoName}/actions`;

  const gitPushCommands = `# 1. تهيئة المستودع ورفع الكود إلى GitHub
git init
git add .
git commit -m "feat: release ClinPharm Hospital PWA + Android APK + Google Drive Full-Book Sync"
git branch -M main
git remote add origin https://github.com/${repoOwner}/${repoName}.git
git push -u origin main

# ملاحظة: بمجرد الرفع سيعمل GitHub Actions تلقائياً على:
# (أ) نشر الواجهة التفاعلية مباشرة على GitHub Pages:
#     ${livePagesUrl}
# (ب) بناء حزمة أندرويد الرسمية (ClinPharm-Hospital-Android.apk) في قسم Releases!`;

  const localBuildCommands = `# تشغيل النسخة الكاملة (الواجهة + خادم الذكاء الاصطناعي Gemini 3.8 Flash):
npm install
npm run dev

# أو بناء نسخة الواجهة المستقلة (Static PWA Build) لرفعها على أي استضافة:
GITHUB_PAGES=true npm run build
npx vite preview`;

  const copyText = async (key: string, value: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleDownloadOfflineReleaseBundle = () => {
    const bundle = {
      app: 'ClinPharm Hospital CDSS',
      version: '2.6.0-github-release',
      exportedAt: new Date().toISOString(),
      librarySummary: {
        booksCount: books.length,
        chaptersCount: totalChapters,
        books: books.map(b => ({
          id: b.id,
          title: b.title,
          edition: b.edition,
          chaptersCount: b.chapters.length
        }))
      },
      wardData: {
        patients,
        interventions,
        discrepancies
      }
    };

    const blob = new Blob([JSON.stringify(bundle, null, 2)], {
      type: 'application/json;charset=utf-8'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ClinPharm-Hospital-Full-Workspace-Release.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[92vh] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-bold text-sm sm:text-base">
                  {lang === 'ar'
                    ? 'مركز تنزيل وتثبيت التطبيق وإصدار GitHub الرسمي'
                    : 'App Installation & GitHub Live Release Hub'}
                </h2>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold font-mono ${
                    isOnline
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {isOnline ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  <span>{isOnline ? 'PWA Service Worker Ready' : 'Offline Mode Active'}</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'ar'
                  ? 'ثبّت التطبيق مباشرة على هاتفك أو حاسوبك (PWA)، أو انشر الواجهة وملف الـ APK تلقائياً عبر GitHub'
                  : 'Install directly as a standalone app (PWA), or deploy the live web frontend and Android APK via GitHub'}
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

        {/* Navigation Tabs */}
        <div className="px-5 pt-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('install_now')}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'install_now'
                ? 'border-teal-600 text-teal-700 dark:text-teal-300 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>
              {lang === 'ar'
                ? '1. تثبيت وتجربة التطبيق الآن (مباشر)'
                : '1. Install & Test App Now (Direct PWA)'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('github_deploy')}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'github_deploy'
                ? 'border-teal-600 text-teal-700 dark:text-teal-300 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>
              {lang === 'ar'
                ? '2. واجهة GitHub Pages الحية للمستخدمين'
                : '2. GitHub Pages Live Web Frontend'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('android_apk')}
            className={`px-3.5 py-2 rounded-t-xl text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'android_apk'
                ? 'border-teal-600 text-teal-700 dark:text-teal-300 bg-white dark:bg-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <PackageCheck className="w-3.5 h-3.5" />
            <span>
              {lang === 'ar'
                ? '3. تنزيل حزمة الأندرويد (.APK) من GitHub Releases'
                : '3. Android .APK GitHub Release'}
            </span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* TAB 1: DIRECT INSTALL & REAL TESTING */}
          {activeTab === 'install_now' && (
            <div className="space-y-4">
              {/* Primary PWA Install Card */}
              <div className="p-5 rounded-2xl bg-slate-900 text-white border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-teal-500/20 text-teal-300 border border-teal-400/30 text-[11px] font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>
                      {lang === 'ar'
                        ? 'جاهز للتثبيت والعمل بدون إنترنت (Standalone App + Offline IndexedDB)'
                        : 'Standalone Installable App + Offline IndexedDB Ready'}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-extrabold">
                    {lang === 'ar'
                      ? 'ثبّت تطبيق ClinPharm Hospital مباشرةً على جهازك'
                      : 'Install ClinPharm Hospital Directly on Your Device'}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                    {lang === 'ar'
                      ? 'يعمل التطبيق كتطبيق أصلي مستقل (Standalone Application) على أندرويد، آيفون، ويندوز، وماك مع حفظ جميع المرضى والحاسبات والكتب المرجعية (44 فصلاً + كتب Google Drive الكاملة) في الذاكرة المحلية للجهاز.'
                      : 'Runs as a full-screen standalone native-like app on Android, iOS, Windows, and macOS with complete local caching of all 6 books, 44 chapters, and synced Google Drive PDFs.'}
                  </p>
                </div>

                <div className="shrink-0 flex flex-col gap-2 w-full md:w-auto">
                  {isInstalled ? (
                    <div className="px-4 py-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>
                        {lang === 'ar' ? 'التطبيق مثبّت ويعمل كـ Standalone!' : 'App Installed & Running Standalone!'}
                      </span>
                    </div>
                  ) : isInstallable ? (
                    <button
                      type="button"
                      onClick={() => void install()}
                      className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition"
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        {lang === 'ar'
                          ? 'تثبيت التطبيق الآن بضغطة واحدة (Install App)'
                          : 'Install App Now (1-Click PWA)'}
                      </span>
                    </button>
                  ) : (
                    <div className="p-3 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-200 space-y-1 max-w-xs">
                      <div className="font-bold text-teal-300 flex items-center gap-1.5">
                        <Share2 className="w-3.5 h-3.5" />
                        <span>
                          {isIOS
                            ? lang === 'ar'
                              ? 'طريقة التثبيت على iPhone / iPad:'
                              : 'Install on iPhone / iPad:'
                            : lang === 'ar'
                            ? 'تثبيت مباشر من المتصفح:'
                            : 'Install from Browser Menu:'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 leading-relaxed">
                        {isIOS
                          ? lang === 'ar'
                            ? 'اضغط على زر المشاركة (Share) في سفاري ثم اختر "إضافة إلى الشاشة الرئيسية (Add to Home Screen)".'
                            : 'Tap the Share icon in Safari, then tap "Add to Home Screen".'
                          : lang === 'ar'
                          ? 'اضغط على أيقونة التثبيت في شريط العنوان بمتصفح Chrome/Edge أو اختر "Install App / تثبيت التطبيق" من قائمة المتصفح.'
                          : 'Click the Install icon in your Chrome/Edge address bar or choose "Install App" from the browser menu.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Real Features Verification Checklist */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="font-bold text-xs text-teal-700 dark:text-teal-300">
                    {lang === 'ar' ? '✓ الذكاء الاصطناعي الحقيقي (Gemini 3.8)' : '✓ Real Gemini 3.8 Flash AI'}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {lang === 'ar'
                      ? 'يعمل المساعد الذكي تلقائياً عبر الخادم (/api/copilot/chat) أو مباشرة عبر مفتاح VITE_GEMINI_API_KEY عند النشر على GitHub Pages والأندرويد.'
                      : 'Automatically routes through /api/copilot/chat or direct @google/genai SDK when hosted on static GitHub Pages or Android APK.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="font-bold text-xs text-teal-700 dark:text-teal-300">
                    {lang === 'ar' ? '✓ ربط Google Drive والكتب الكاملة' : '✓ Google Drive Full-PDF Sync'}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {lang === 'ar'
                      ? 'استخراج النص المتاح من ملفات PDF الطبية من Google Drive أو الجهاز وحفظ سجل الصفحات في IndexedDB؛ تظل الصفحات المصورة بحاجة إلى OCR.'
                      : 'Extracts available text from Google Drive or local medical PDFs and stores page records in IndexedDB; scanned pages may still need OCR.'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1.5">
                  <div className="font-bold text-xs text-teal-700 dark:text-teal-300">
                    {lang === 'ar' ? '✓ حزمة البيانات الكاملة بدون إنترنت' : '✓ Full Offline Workspace Bundle'}
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {lang === 'ar'
                      ? `يتضمن ${books.length} مراجع، ${totalChapters} فصلاً، حاسبات الحركية الدوائية، وحالات الاختبار السريرية.`
                      : `Includes ${books.length} books, ${totalChapters} chapters, PK calculators, and bedside test cases.`}
                  </p>
                </div>
              </div>

              {/* Export Offline Snapshot Button */}
              <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900">
                <div className="space-y-0.5">
                  <div className="font-bold text-xs text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <HardDriveDownload className="w-4 h-4 text-teal-600" />
                    <span>
                      {lang === 'ar'
                        ? 'تنزيل نسخة البيانات السريرية الكاملة (Offline Workspace Snapshot)'
                        : 'Download Full Clinical Workspace & Library Snapshot (.JSON)'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    {lang === 'ar'
                      ? 'تنزيل ملف يضم جميع حالات المرضى والتدخلات الصيدلانية وملخص الفصول لمشاركتها مع فريقك.'
                      : 'Download a portable JSON snapshot of all ward patients, SOAP interventions, and library index.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDownloadOfflineReleaseBundle}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer"
                >
                  {lang === 'ar' ? 'تنزيل الحزمة (.json)' : 'Download Bundle (.json)'}
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: GITHUB PAGES LIVE FRONTEND DEPLOYMENT */}
          {activeTab === 'github_deploy' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/80 space-y-2">
                <div className="font-bold text-xs sm:text-sm text-teal-900 dark:text-teal-200">
                  {lang === 'ar'
                    ? 'تم تجهيز ملف النشر التلقائي (.github/workflows/deploy-github-pages.yml) داخل المشروع!'
                    : 'Automated GitHub Pages Deployment (.github/workflows/deploy-github-pages.yml) is Ready!'}
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  {lang === 'ar'
                    ? 'بمجرد رفع هذا المشروع إلى حسابك في GitHub، سيقوم GitHub Actions تلقائياً ببناء الواجهة التفاعلية الكاملة (PWA) ونشرها على رابط GitHub Pages الخاص بك ليدخل عليها أي مستخدم ويجرب التطبيق أو يثبته على هاتفه.'
                    : 'As soon as you push this project to your GitHub repository, GitHub Actions will automatically build the full PWA frontend and publish it to your live GitHub Pages URL.'}
                </p>
              </div>

              {/* Repo Slug Customizer */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  {lang === 'ar'
                    ? 'اكتب اسم مستودعك على GitHub (username/repo) لتوليد الروابط والأوامر الجاهزة:'
                    : 'Enter your GitHub repository slug (username/repo) to generate your live URLs:'}
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={githubRepoSlug}
                  onChange={e => setGithubRepoSlug(e.target.value)}
                  placeholder="username/clinpharm-hospital"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 font-mono text-xs"
                />
              </div>

              {/* Generated Live Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {lang === 'ar' ? 'رابط تجربة الواجهة الحية (GitHub Pages URL)' : 'Live GitHub Pages Web App URL'}
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <code dir="ltr" className="text-xs font-mono text-teal-600 dark:text-teal-400 truncate">
                      {livePagesUrl}
                    </code>
                    <button
                      type="button"
                      onClick={() => void copyText('pagesUrl', livePagesUrl)}
                      className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer shrink-0"
                    >
                      {copiedKey === 'pagesUrl' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-[10px] font-bold uppercase text-slate-400">
                    {lang === 'ar' ? 'رابط تنزيل الـ APK المباشر من GitHub Releases' : 'Direct Android APK Release Link'}
                  </span>
                  <div className="flex items-center justify-between gap-2">
                    <code dir="ltr" className="text-xs font-mono text-teal-600 dark:text-teal-400 truncate">
                      {latestApkReleaseUrl}
                    </code>
                    <button
                      type="button"
                      onClick={() => void copyText('apkUrl', latestApkReleaseUrl)}
                      className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 cursor-pointer shrink-0"
                    >
                      {copiedKey === 'apkUrl' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Git Push Commands Block */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100">
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-teal-400 flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>GitHub Push & Auto-Deploy Commands</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => void copyText('gitCmds', gitPushCommands)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold cursor-pointer"
                  >
                    {copiedKey === 'gitCmds' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{lang === 'ar' ? 'نسخ الأوامر' : 'Copy Commands'}</span>
                      </>
                    )}
                  </button>
                </div>
                <pre dir="ltr" className="p-4 text-[11px] font-mono overflow-x-auto leading-relaxed text-slate-200">
                  {gitPushCommands}
                </pre>
              </div>
            </div>
          )}

          {/* TAB 3: ANDROID APK BUILD & RELEASE */}
          {activeTab === 'android_apk' && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2">
                <h3 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                  {lang === 'ar'
                    ? 'بناء تلقائي لملف الهاتف ClinPharm-Hospital-Android.apk عبر GitHub Actions'
                    : 'Automated Android .APK Build & GitHub Release (.github/workflows/build-android-apk.yml)'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'ar'
                    ? 'يحتوي المشروع على مجلد أندرويد أصلي (Capacitor Android) مع ملف workflow جاهز (.github/workflows/build-android-apk.yml) يقوم بتثبيت Java 21 و Android SDK على خوادم GitHub مجاناً، ثم يبني ملف الـ APK ويرفعه تلقائياً إلى قسم Releases في مستودعك لتنزيله مباشرة على أي هاتف أندرويد.'
                    : 'Includes a complete Capacitor Android project and GitHub Actions workflow (.github/workflows/build-android-apk.yml) that compiles the APK on GitHub runners and publishes ClinPharm-Hospital-Android.apk directly to GitHub Releases.'}
                </p>
              </div>

              <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100">
                <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-teal-400">
                    {lang === 'ar' ? 'أوامر التشغيل المحلي أو البناء اليدوي' : 'Local Run & Build Commands'}
                  </span>
                  <button
                    type="button"
                    onClick={() => void copyText('localCmds', localBuildCommands)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold cursor-pointer"
                  >
                    {copiedKey === 'localCmds' ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span>{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>{lang === 'ar' ? 'نسخ' : 'Copy'}</span>
                      </>
                    )}
                  </button>
                </div>
                <pre dir="ltr" className="p-4 text-[11px] font-mono overflow-x-auto leading-relaxed text-slate-200">
                  {localBuildCommands}
                </pre>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/70 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                <div className="font-bold">
                  {lang === 'ar'
                    ? '💡 تفعيل الذكاء الاصطناعي الحقيقي (Gemini 3.8 Flash) على GitHub Pages وملف الـ APK:'
                    : '💡 Enabling Real Gemini 3.8 Flash AI on Static GitHub Pages & Android APK:'}
                </div>
                <p className="text-[11px] leading-relaxed">
                  {lang === 'ar'
                    ? `في إعدادات مستودعك على GitHub (Settings -> Secrets and variables -> Actions)، أضف سرّاً باسم VITE_GEMINI_API_KEY وضع فيه مفتاح Gemini الخاص بك؛ سيعمل المساعد الذكي الحقيقي داخل نسخة الـ Web على GitHub Pages وداخل ملف الـ APK تلقائياً.`
                    : `In your GitHub repository (Settings -> Secrets and variables -> Actions), add a secret named VITE_GEMINI_API_KEY. Both the GitHub Pages frontend and the Android APK will automatically connect to live Gemini 3.8 Flash.`}
                </p>
                <div className="pt-1 font-mono text-[11px] text-teal-700 dark:text-teal-300">
                  GitHub Actions URL: {githubActionsUrl}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
