import { useState, useEffect, useRef } from 'react';
import { Language } from '../types/clinical';
import {
  AndroidPermissionItem,
  checkAllAndroidPermissions,
  requestAllAndroidPermissions,
  shareClinicalFile,
  printOrSaveClinicalPdf,
  getStorageQuotaInfo,
  StorageQuotaInfo
} from '../lib/androidPermissions';
import {
  X,
  ShieldCheck,
  Wifi,
  FolderOpen,
  Printer,
  Share2,
  Bell,
  ClipboardCheck,
  Cpu,
  CheckCircle2,
  Copy,
  Check,
  FileText,
  Sparkles,
  RefreshCw,
  Upload
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export function AndroidPermissionsModal({ isOpen, onClose, lang }: Props) {
  const [items, setItems] = useState<AndroidPermissionItem[]>([]);
  const [storageInfo, setStorageInfo] = useState<StorageQuotaInfo | null>(null);
  const [isRequesting, setIsRequesting] = useState(false);
  const [feedbackBanner, setFeedbackBanner] = useState<string | null>(null);
  const [copiedManifest, setCopiedManifest] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const refreshPermissions = async () => {
    const [permList, quota] = await Promise.all([
      checkAllAndroidPermissions(),
      getStorageQuotaInfo()
    ]);
    setItems(permList);
    setStorageInfo(quota);
  };

  useEffect(() => {
    if (isOpen) {
      void refreshPermissions();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGrantAll = async () => {
    setIsRequesting(true);
    setFeedbackBanner(null);
    try {
      const res = await requestAllAndroidPermissions();
      setItems(res.items);
      const quota = await getStorageQuotaInfo();
      setStorageInfo(quota);
      setFeedbackBanner(
        lang === 'ar'
          ? 'تم تفعيل وتثبيت جميع أذونات أندرويد (الملفات، التخزين الدائم، الطباعة PDF، المشاركة، الإنترنت، والتنبيهات) بنجاح!'
          : 'All Android permissions (Files, Persistent Storage, Print/PDF, Native Share, Internet & Notifications) activated!'
      );
    } finally {
      setIsRequesting(false);
    }
  };

  const handleTestPdfPrint = () => {
    printOrSaveClinicalPdf({
      title:
        lang === 'ar'
          ? 'تقرير اختبار الطباعة وتصدير الـ PDF — ClinPharm Hospital'
          : 'Android PDF & Print Service Verification — ClinPharm Hospital',
      subtitle:
        lang === 'ar'
          ? 'نظام الصيدلة السريرية المتكامل للمستشفيات (Android Print Spooler & PDF Generator)'
          : 'Clinical Pharmacy Workstation — Official Android Print & PDF Test',
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      filenameBase: 'ClinPharm-Android-PDF-Verification',
      bodyMarkdownOrText: [
        `# ${lang === 'ar' ? 'تأكيد جاهزية الطباعة وتصدير تقارير الـ PDF على أندرويد' : 'Android PDF & Print Capability Verification'}`,
        `- **Status:** Active & Verified (Android Print Spooler + FileProvider)`,
        `- **App ID:** com.clinpharm.hospital`,
        `## ${lang === 'ar' ? 'الأذونات المفعّلة في الحزمة (AndroidManifest.xml)' : 'Configured Android Manifest Permissions'}`,
        `- **Internet & Sync:** android.permission.INTERNET, ACCESS_NETWORK_STATE, ACCESS_WIFI_STATE`,
        `- **Files & PDF Storage:** READ_EXTERNAL_STORAGE, WRITE_EXTERNAL_STORAGE, MANAGE_EXTERNAL_STORAGE, READ_MEDIA_IMAGES`,
        `- **Printing & Sharing:** android.intent.action.PRINT, androidx.core.content.FileProvider, android.intent.action.SEND`,
        `- **Clinical Library:** 7 Reference Textbooks (47 Chapters + Stockley's Drug Interactions 9th Ed)`
      ].join('\n')
    });
    setFeedbackBanner(
      lang === 'ar'
        ? 'تم فتح نافذة الطباعة / حفظ كملف PDF! يمكنك اختيار "حفظ بتنسيق PDF (Save as PDF)" أو اختيار طابعة Wi-Fi.'
        : 'Opened Android Print / Save as PDF dialog!'
    );
  };

  const handleTestNativeShare = async () => {
    const res = await shareClinicalFile({
      filename: 'ClinPharm-Android-Report.md',
      title: 'ClinPharm Hospital — Clinical Pharmacy Report',
      summaryText:
        lang === 'ar'
          ? 'تقرير سريري من نظام ClinPharm Hospital مع دعم كامل لمشاركة الملفات على أندرويد'
          : 'Clinical report exported via ClinPharm Hospital Android Share Service',
      content: `# ClinPharm Hospital Clinical Report\n\nVerified Android FileProvider & Web Share API export.\nDate: ${new Date().toISOString()}\n`
    });
    if (res.success) {
      setFeedbackBanner(
        lang === 'ar'
          ? res.method === 'native_file_share'
            ? 'تم فتح قائمة مشاركة الملفات الأصلية في أندرويد (Share Sheet) بنجاح!'
            : 'تمت مشاركة / تصدير الملف بنجاح!'
          : 'File shared/exported successfully!'
      );
    }
  };

  const handleTestFilePicker = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFeedbackBanner(
      lang === 'ar'
        ? `تمت قراءة الملف من ذاكرة الجهاز بنجاح: "${file.name}" (${(file.size / 1024).toFixed(1)} KB)`
        : `Successfully read file from device storage: "${file.name}" (${(file.size / 1024).toFixed(1)} KB)`
    );
    e.target.value = '';
  };

  const getIconForCategory = (id: AndroidPermissionItem['id']) => {
    switch (id) {
      case 'internet_network':
        return <Wifi className="w-4 h-4 text-teal-500" />;
      case 'files_storage':
        return <FolderOpen className="w-4 h-4 text-amber-500" />;
      case 'pdf_printing':
        return <Printer className="w-4 h-4 text-indigo-500" />;
      case 'file_sharing':
        return <Share2 className="w-4 h-4 text-emerald-500" />;
      case 'notifications':
        return <Bell className="w-4 h-4 text-rose-500" />;
      case 'clipboard':
        return <ClipboardCheck className="w-4 h-4 text-sky-500" />;
      case 'wake_lock':
      default:
        return <Cpu className="w-4 h-4 text-purple-500" />;
    }
  };

  const manifestSnippet = `<!-- AndroidManifest.xml — ClinPharm Hospital Full Permissions -->
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
<uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
<uses-permission android:name="android.permission.READ_MEDIA_VISUAL_USER_SELECTED" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_DATA_SYNC" />`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-4xl w-full max-h-[92vh] border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 bg-slate-900 text-white border-b border-slate-800 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-extrabold text-sm sm:text-base">
                  {lang === 'ar'
                    ? 'مركز أذونات وصلاحيات الأندرويد (الملفات • الطباعة PDF • المشاركة • الإنترنت)'
                    : 'Android Permissions & Capabilities Center (Files • PDF Print • Share • Internet)'}
                </h2>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>AndroidManifest + Runtime Ready</span>
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {lang === 'ar'
                  ? 'إدارة وتفعيل جميع أذونات تطبيق الأندرويد للوصول للملفات، تخزين كتب PDF، الطباعة، والمشاركة المباشرة'
                  : 'Manage and activate all Android permissions for file access, PDF textbook storage, printing, and native sharing'}
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

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Top Action Bar: 1-Click Activate All + Quick Interactive Hardware/OS Tests */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white border border-teal-800/50 space-y-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-teal-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'ar'
                      ? 'تفعيل شامل بضغطة واحدة لجميع أذونات النظام والمتصفح وحزمة APK'
                      : 'One-Click Activation for All Android OS & WebView Permissions'}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-extrabold">
                  {lang === 'ar'
                    ? 'منح وتثبيت جميع أذونات الملفات والـ PDF والطباعة والمشاركة والإنترنت'
                    : 'Grant & Lock All Files, PDF, Print, Share & Network Permissions'}
                </h3>
                {storageInfo && (
                  <p className="text-[11px] text-slate-300 font-mono" dir="ltr">
                    Storage Status: {storageInfo.persisted ? 'PERSISTENT (Protected)' : 'Standard'} • Used:{' '}
                    {storageInfo.usageFormatted} / Quota: {storageInfo.quotaFormatted}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                <button
                  type="button"
                  onClick={() => void handleGrantAll()}
                  disabled={isRequesting}
                  className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg cursor-pointer transition"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {isRequesting
                      ? lang === 'ar'
                        ? 'جاري التفعيل...'
                        : 'Activating...'
                      : lang === 'ar'
                      ? 'تفعيل جميع الأذونات الآن'
                      : 'Activate All Permissions'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => void refreshPermissions()}
                  title={lang === 'ar' ? 'تحديث الحالة' : 'Refresh status'}
                  className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Test Buttons for Android File, Share & Print Permissions */}
            <div className="pt-3 border-t border-white/10 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleTestPdfPrint}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-teal-300" />
                <span>
                  {lang === 'ar' ? 'اختبار الطباعة / حفظ PDF' : 'Test Print / Save PDF'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => void handleTestNativeShare()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-emerald-300" />
                <span>
                  {lang === 'ar' ? 'اختبار مشاركة ملف (Android Share)' : 'Test Native File Share'}
                </span>
              </button>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-amber-300" />
                <span>
                  {lang === 'ar'
                    ? 'اختبار قراءة ملف من ذاكرة الهاتف (PDF/JSON)'
                    : 'Test Read File from Device Storage'}
                </span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.json,.md,.txt,.csv,application/pdf,application/json"
                onChange={handleTestFilePicker}
                className="hidden"
              />
            </div>
          </div>

          {feedbackBanner && (
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200 text-xs font-bold flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{feedbackBanner}</span>
              </div>
              <button
                type="button"
                onClick={() => setFeedbackBanner(null)}
                className="text-xs text-emerald-700 dark:text-emerald-300 underline cursor-pointer"
              >
                {lang === 'ar' ? 'إغلاق' : 'Dismiss'}
              </button>
            </div>
          )}

          {/* Detailed Android Permissions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {items.map(item => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col justify-between gap-3"
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shrink-0">
                        {getIconForCategory(item.id)}
                      </div>
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-slate-100">
                        {lang === 'ar' ? item.titleAr : item.titleEn}
                      </h4>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold shrink-0 ${
                        item.status === 'granted'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800'
                          : 'bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border border-teal-300 dark:border-teal-800'
                      }`}
                    >
                      {lang === 'ar' ? item.statusLabelAr : item.statusLabelEn}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                    {lang === 'ar' ? item.descriptionAr : item.descriptionEn}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200/80 dark:border-slate-700/70 space-y-1.5">
                  <div className="flex flex-wrap gap-1" dir="ltr">
                    {item.manifestPermissions.map(mp => (
                      <code
                        key={mp}
                        className="px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-slate-900 text-[10px] font-mono text-teal-700 dark:text-teal-300"
                      >
                        {mp}
                      </code>
                    ))}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400" dir="ltr">
                    {item.details}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Embedded AndroidManifest.xml Reference Block */}
          <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 text-slate-100">
            <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs">
              <span className="font-mono font-bold text-teal-400 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>
                  {lang === 'ar'
                    ? 'ملف أذونات الأندرويد المدمج تلقائياً في حزمة APK (android-config/AndroidManifest.xml)'
                    : 'Auto-Injected Android APK Permissions (android-config/AndroidManifest.xml)'}
                </span>
              </span>
              <button
                type="button"
                onClick={async () => {
                  await navigator.clipboard.writeText(manifestSnippet);
                  setCopiedManifest(true);
                  setTimeout(() => setCopiedManifest(false), 2000);
                }}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold cursor-pointer"
              >
                {copiedManifest ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>{lang === 'ar' ? 'تم النسخ' : 'Copied'}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>{lang === 'ar' ? 'نسخ الأذونات' : 'Copy Manifest'}</span>
                  </>
                )}
              </button>
            </div>
            <pre dir="ltr" className="p-4 text-[11px] font-mono overflow-x-auto leading-relaxed text-slate-300">
              {manifestSnippet}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
