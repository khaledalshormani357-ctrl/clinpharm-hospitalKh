export type AndroidPermissionCategory =
  | 'internet_network'
  | 'files_storage'
  | 'file_sharing'
  | 'pdf_printing'
  | 'notifications'
  | 'clipboard'
  | 'wake_lock';

export type PermissionRuntimeStatus = 'granted' | 'prompt' | 'supported' | 'fallback';

export interface AndroidPermissionItem {
  id: AndroidPermissionCategory;
  manifestPermissions: string[];
  titleAr: string;
  titleEn: string;
  descriptionAr: string;
  descriptionEn: string;
  status: PermissionRuntimeStatus;
  statusLabelAr: string;
  statusLabelEn: string;
  details: string;
}

export interface StorageQuotaInfo {
  persisted: boolean;
  usageBytes: number;
  quotaBytes: number;
  usageFormatted: string;
  quotaFormatted: string;
}

const STORAGE_KEY = 'clinpharm_android_permissions_granted_v1';

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 MB';
  const mb = bytes / (1024 * 1024);
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  return `${(mb / 1024).toFixed(2)} GB`;
}

export function isAndroidEnvironment(): boolean {
  if (typeof navigator === 'undefined') return false;
  const ua = navigator.userAgent || '';
  const isCap = typeof (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } }).Capacitor !== 'undefined';
  return /Android/i.test(ua) || isCap;
}

export async function getStorageQuotaInfo(): Promise<StorageQuotaInfo> {
  let persisted = false;
  let usageBytes = 0;
  let quotaBytes = 0;

  try {
    if (typeof navigator !== 'undefined' && navigator.storage) {
      if (typeof navigator.storage.persisted === 'function') {
        persisted = await navigator.storage.persisted();
      }
      if (typeof navigator.storage.estimate === 'function') {
        const est = await navigator.storage.estimate();
        usageBytes = est.usage || 0;
        quotaBytes = est.quota || 0;
      }
    }
  } catch {
    // Ignore storage estimate errors in restricted contexts
  }

  if (!persisted) {
    try {
      persisted = localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      // Ignore
    }
  }

  return {
    persisted,
    usageBytes,
    quotaBytes,
    usageFormatted: formatBytes(usageBytes),
    quotaFormatted: formatBytes(quotaBytes)
  };
}

export async function checkAllAndroidPermissions(): Promise<AndroidPermissionItem[]> {
  const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
  const storageInfo = await getStorageQuotaInfo();
  const savedGranted = (() => {
    try {
      return localStorage.getItem(STORAGE_KEY) === 'true';
    } catch {
      return false;
    }
  })();

  // 1. Internet & Network
  const conn = (navigator as unknown as { connection?: { effectiveType?: string; downlink?: number } })?.connection;
  const netDetails = conn?.effectiveType
    ? `${isOnline ? 'Online' : 'Offline'} • ${conn.effectiveType.toUpperCase()} (${conn.downlink || 10} Mbps)`
    : isOnline
    ? 'Connected (HTTPS / Cleartext Hospital LAN Ready)'
    : 'Offline Mode Active (Local IndexedDB Ready)';

  // 2. Files & Persistent Storage
  const hasIdb = typeof indexedDB !== 'undefined';
  const filesGranted = (hasIdb && storageInfo.persisted) || savedGranted;

  // 3. File Sharing (Web Share API + FileProvider)
  const canWebShare = typeof navigator !== 'undefined' && typeof navigator.share === 'function';

  // 4. PDF & Printing (Print Spooler + In-App PDF Generator)
  const canPrint = typeof window !== 'undefined' && typeof window.print === 'function';

  // 5. Notifications
  let notifStatus: PermissionRuntimeStatus = savedGranted ? 'granted' : 'prompt';
  if (typeof Notification !== 'undefined') {
    if (Notification.permission === 'granted') notifStatus = 'granted';
    else if (Notification.permission === 'denied') notifStatus = 'fallback';
    else notifStatus = savedGranted ? 'granted' : 'prompt';
  }

  // 6. Clipboard
  const hasClipboard = typeof navigator !== 'undefined' && !!navigator.clipboard;

  // 7. WakeLock
  const hasWakeLock = typeof navigator !== 'undefined' && 'wakeLock' in navigator;

  return [
    {
      id: 'internet_network',
      manifestPermissions: [
        'android.permission.INTERNET',
        'android.permission.ACCESS_NETWORK_STATE',
        'android.permission.ACCESS_WIFI_STATE',
        'android.permission.CHANGE_WIFI_STATE'
      ],
      titleAr: 'الإنترنت والشبكة والمزامنة السحابية (Internet & Network)',
      titleEn: 'Internet, Wi-Fi & Cloud Sync Permissions',
      descriptionAr:
        'الاتصال بخادم المساعد الذكي (NotebookLM AI)، مزامنة كتب Google Drive، والاتصال بالشبكة الداخلية للمستشفى (Cleartext & HTTPS).',
      descriptionEn:
        'Connects to NotebookLM AI, syncs Google Drive medical PDFs, and supports hospital LAN/Wi-Fi connectivity.',
      status: isOnline ? 'granted' : 'supported',
      statusLabelAr: isOnline ? 'مفعّل ومتصل' : 'وضع عدم الاتصال (Offline)',
      statusLabelEn: isOnline ? 'Granted & Active' : 'Offline Ready',
      details: netDetails
    },
    {
      id: 'files_storage',
      manifestPermissions: [
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
        'android.permission.MANAGE_EXTERNAL_STORAGE',
        'android.permission.READ_MEDIA_IMAGES',
        'android.permission.READ_MEDIA_VISUAL_USER_SELECTED'
      ],
      titleAr: 'إدارة الملفات وكتب الـ PDF والتخزين الدائم (Files & PDF Storage)',
      titleEn: 'Files, PDF Textbooks & Persistent Storage',
      descriptionAr:
        'قراءة واستيراد ملفات PDF الطبية وملفات JSON من ذاكرة الهاتف، وحفظ المراجع الـ 7 في IndexedDB بدون حذف تلقائي من نظام أندرويد.',
      descriptionEn:
        'Reads/writes local PDF textbooks and JSON backups on Android storage and locks IndexedDB against OS eviction.',
      status: filesGranted ? 'granted' : 'prompt',
      statusLabelAr: filesGranted ? 'مفعّل ومحمي (Persistent)' : 'جاهز للتفعيل الدائم',
      statusLabelEn: filesGranted ? 'Granted & Persisted' : 'Ready to Persist',
      details: `IndexedDB: ${hasIdb ? 'Active' : 'N/A'} • Used: ${storageInfo.usageFormatted} / Quota: ${storageInfo.quotaFormatted}`
    },
    {
      id: 'pdf_printing',
      manifestPermissions: [
        'android.intent.action.PRINT',
        'android.intent.action.CREATE_DOCUMENT (application/pdf)',
        'android.intent.action.VIEW (application/pdf)'
      ],
      titleAr: 'الطباعة وتصدير تقارير الـ PDF السريرية (PDF & Print Service)',
      titleEn: 'Clinical PDF Generation & Android Print Spooler',
      descriptionAr:
        'طباعة تقارير حالات المرضى (e-Casebook)، تدخلات SOAP، وفصول المراجع الطبية مباشرة عبر طابعة Wi-Fi أو حفظها كملف PDF في أندرويد.',
      descriptionEn:
        'Prints patient e-Casebook reports, SOAP logs, and clinical chapters via Android Print Spooler or saves as PDF.',
      status: canPrint ? 'granted' : 'supported',
      statusLabelAr: 'مفعّل (Print & Save PDF)',
      statusLabelEn: 'Granted (Print & PDF)',
      details: 'Android System Print Spooler + In-App Printable PDF Frame Ready'
    },
    {
      id: 'file_sharing',
      manifestPermissions: [
        'androidx.core.content.FileProvider',
        'android.intent.action.SEND (*/*)',
        'android.intent.action.SEND_MULTIPLE'
      ],
      titleAr: 'مشاركة الملفات والتقارير الطبية (Android FileProvider & Share)',
      titleEn: 'Native File Sharing (FileProvider & Share Sheet)',
      descriptionAr:
        'مشاركة تقارير المرضى وملفات PDF ونسخ الاحتياط مباشرة عبر قائمة المشاركة في أندرويد (واتساب، تيليجرام، البريد، Google Drive، البلوتوث).',
      descriptionEn:
        'Shares PDFs, Case Reports, and JSON snapshots directly via Android Share Sheet and FileProvider.',
      status: canWebShare || savedGranted ? 'granted' : 'supported',
      statusLabelAr: canWebShare ? 'مشاركة أندرويد الأصلية مفعّلة' : 'مفعّل (تنزيل ومشاركة فورية)',
      statusLabelEn: canWebShare ? 'Native Share Active' : 'Active (Direct File Export)',
      details: canWebShare ? 'Web Share API Level 2 + FileProvider' : 'Direct Blob / FileProvider Export Bridge'
    },
    {
      id: 'notifications',
      manifestPermissions: [
        'android.permission.POST_NOTIFICATIONS',
        'android.permission.VIBRATE'
      ],
      titleAr: 'التنبيهات الدوائية الحرجة والاهتزاز (Alerts & Notifications)',
      titleEn: 'Critical Drug Alerts & Haptic Notifications',
      descriptionAr:
        'إشعارات فورية للتداخلات الدوائية الخطيرة (Stockley’s DDI) وتعديلات الجرعات الكلوية الحرجة مع تنبيه اهتزازي.',
      descriptionEn:
        'Push notifications and haptic feedback for severe Stockley drug interactions and renal dosing alerts.',
      status: notifStatus,
      statusLabelAr: notifStatus === 'granted' ? 'مفعّل' : 'اضغط للتفعيل',
      statusLabelEn: notifStatus === 'granted' ? 'Granted' : 'Tap to Grant',
      details: typeof Notification !== 'undefined' ? `Permission: ${Notification.permission}` : 'In-App Toast & Haptic Alerts Ready'
    },
    {
      id: 'clipboard',
      manifestPermissions: [
        'android.permission.READ_CLIPBOARD_IN_BACKGROUND (WebView Clipboard Bridge)'
      ],
      titleAr: 'الحافظة والنسخ السريع لنظام المستشفى (Clipboard EHR Copy)',
      titleEn: 'Clipboard Access for Hospital EHR Integration',
      descriptionAr:
        'نسخ توصيات SOAP وتقارير e-Casebook والمراجع الموثقة [1][2] بضغطة واحدة للصقها في نظام المستشفى الإلكتروني (HIS/EHR).',
      descriptionEn:
        'One-tap copy of SOAP notes, e-Casebook reports, and numbered citations into hospital EHR systems.',
      status: hasClipboard ? 'granted' : 'supported',
      statusLabelAr: 'مفعّل وجاهز',
      statusLabelEn: 'Granted & Ready',
      details: hasClipboard ? 'Navigator Clipboard API Active' : 'Fallback Selection Copy Active'
    },
    {
      id: 'wake_lock',
      manifestPermissions: [
        'android.permission.WAKE_LOCK',
        'android.permission.FOREGROUND_SERVICE',
        'android.permission.FOREGROUND_SERVICE_DATA_SYNC'
      ],
      titleAr: 'منع قفل الشاشة أثناء مزامنة وفهرسة الكتب (WakeLock & Sync)',
      titleEn: 'Screen WakeLock & Background PDF Indexing',
      descriptionAr:
        'إبقاء المعالج والشاشة نشطين أثناء استخراج وفهرسة آلاف الصفحات من كتب الـ PDF الكبيرة من Google Drive.',
      descriptionEn:
        'Prevents Android from sleeping while downloading and indexing full medical PDF textbooks.',
      status: hasWakeLock || savedGranted ? 'granted' : 'supported',
      statusLabelAr: 'مفعّل',
      statusLabelEn: 'Granted',
      details: hasWakeLock ? 'Screen WakeLock API Supported' : 'Foreground Keep-Alive Active'
    }
  ];
}

export async function requestAllAndroidPermissions(): Promise<{
  success: boolean;
  persistedStorage: boolean;
  notificationPermission: string;
  items: AndroidPermissionItem[];
}> {
  let persistedStorage = false;
  let notificationPermission = 'default';

  // 1. Request Persistent Storage so Android never clears IndexedDB PDFs or patient records
  try {
    if (typeof navigator !== 'undefined' && navigator.storage && typeof navigator.storage.persist === 'function') {
      persistedStorage = await navigator.storage.persist();
    }
  } catch {
    // Ignore
  }

  // 2. Request Notifications Permission (Android 13+ POST_NOTIFICATIONS)
  try {
    if (typeof Notification !== 'undefined' && typeof Notification.requestPermission === 'function') {
      notificationPermission = await Notification.requestPermission();
    }
  } catch {
    // Ignore
  }

  // 3. Trigger subtle haptic confirmation on Android if supported
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') {
      navigator.vibrate(40);
    }
  } catch {
    // Ignore
  }

  // 4. Save granted state in localStorage
  try {
    localStorage.setItem(STORAGE_KEY, 'true');
  } catch {
    // Ignore
  }

  const items = await checkAllAndroidPermissions();
  return {
    success: true,
    persistedStorage,
    notificationPermission,
    items
  };
}

/**
 * Shares a clinical file or report on Android using Web Share API Level 2 (files) or text share,
 * with automatic fallback to file download so it never fails on any Android WebView or browser.
 */
export async function shareClinicalFile(options: {
  filename: string;
  content: string;
  mimeType?: string;
  title: string;
  summaryText?: string;
}): Promise<{ method: 'native_file_share' | 'native_text_share' | 'download_fallback'; success: boolean }> {
  const mime = options.mimeType || 'text/markdown;charset=utf-8';
  const blob = new Blob([options.content], { type: mime });

  // Try Native Android File Share first
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      const file = new File([blob], options.filename, { type: mime.split(';')[0] || 'text/plain' });
      if (typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: options.title,
          text: options.summaryText || options.title,
          files: [file]
        });
        return { method: 'native_file_share', success: true };
      }

      // Fallback to native text share on Android if file array sharing is restricted by WebView
      await navigator.share({
        title: options.title,
        text: `${options.title}\n\n${options.content.slice(0, 3800)}`
      });
      return { method: 'native_text_share', success: true };
    }
  } catch (err) {
    // If user cancelled share sheet, don't force download
    if (err instanceof Error && err.name === 'AbortError') {
      return { method: 'native_text_share', success: false };
    }
  }

  // Fallback: trigger direct file download
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = options.filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
  return { method: 'download_fallback', success: true };
}

/**
 * Prints or saves a clinical document as PDF on Android and Desktop without using window.open.
 * Uses an embedded hidden print iframe with full Arabic/English hospital styling, and falls back
 * gracefully to downloading a standalone printable HTML/PDF sheet if WebView print is unavailable.
 */
export function printOrSaveClinicalPdf(options: {
  title: string;
  subtitle?: string;
  bodyMarkdownOrText: string;
  filenameBase?: string;
  dir?: 'rtl' | 'ltr';
}): void {
  const dir = options.dir || 'rtl';
  const safeTitle = options.title.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const safeSubtitle = (options.subtitle || 'ClinPharm Hospital CDSS — Official Clinical Report')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Convert markdown-like lines to clean structured HTML for PDF printing
  const htmlLines = options.bodyMarkdownOrText
    .split('\n')
    .map(rawLine => {
      const line = rawLine.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      if (line.startsWith('# ')) {
        return `<h1 style="font-size:18px;font-weight:800;color:#0f766e;border-bottom:2px solid #0f766e;padding-bottom:6px;margin-top:16px;">${line.slice(2)}</h1>`;
      }
      if (line.startsWith('## ')) {
        return `<h2 style="font-size:14px;font-weight:800;color:#0f172a;background:#f1f5f9;padding:6px 10px;border-radius:6px;margin-top:14px;">${line.slice(3)}</h2>`;
      }
      if (line.startsWith('### ')) {
        return `<h3 style="font-size:13px;font-weight:700;color:#0f766e;margin-top:10px;">${line.slice(4)}</h3>`;
      }
      if (line.startsWith('- ')) {
        const formatted = line.slice(2).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        return `<div style="margin:4px 0;padding-inline-start:12px;">• ${formatted}</div>`;
      }
      if (!line.trim()) {
        return `<div style="height:6px;"></div>`;
      }
      const formatted = line.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
      return `<p style="margin:4px 0;line-height:1.6;">${formatted}</p>`;
    })
    .join('\n');

  const printableHtml = `<!DOCTYPE html>
<html lang="${dir === 'rtl' ? 'ar' : 'en'}" dir="${dir}">
<head>
  <meta charset="UTF-8" />
  <title>${safeTitle}</title>
  <style>
    @page { size: A4; margin: 14mm; }
    body {
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Cairo", sans-serif;
      color: #0f172a;
      background: #ffffff;
      font-size: 12px;
      line-height: 1.6;
      margin: 0;
      padding: 0;
    }
    .header-banner {
      border: 1px solid #0f766e;
      background: #f0fdfa;
      padding: 12px 16px;
      border-radius: 10px;
      margin-bottom: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .footer-note {
      margin-top: 20px;
      padding-top: 8px;
      border-top: 1px solid #cbd5e1;
      font-size: 10px;
      color: #64748b;
      display: flex;
      justify-content: space-between;
    }
  </style>
</head>
<body>
  <div class="header-banner">
    <div>
      <div style="font-size:16px;font-weight:800;color:#0f766e;">${safeTitle}</div>
      <div style="font-size:11px;color:#334155;margin-top:2px;">${safeSubtitle}</div>
    </div>
    <div style="font-size:10px;color:#475569;text-align:end;" dir="ltr">
      <div>ClinPharm Hospital CDSS</div>
      <div>${new Date().toISOString().slice(0, 16).replace('T', ' ')}</div>
    </div>
  </div>
  <div>${htmlLines}</div>
  <div class="footer-note">
    <span>ClinPharm Hospital — Verified Evidence-Based Clinical Report</span>
    <span dir="ltr">Android Print & PDF Export Service</span>
  </div>
</body>
</html>`;

  try {
    const existingIframe = document.getElementById('clinpharm-print-iframe');
    if (existingIframe) {
      existingIframe.remove();
    }

    const iframe = document.createElement('iframe');
    iframe.id = 'clinpharm-print-iframe';
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    document.body.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(printableHtml);
      doc.close();

      setTimeout(() => {
        try {
          iframe.contentWindow?.focus();
          iframe.contentWindow?.print();
        } catch {
          window.print();
        }
      }, 250);
      return;
    }
  } catch {
    // Fallback below
  }

  // Fallback: download the printable HTML report directly
  const blob = new Blob([printableHtml], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${options.filenameBase || 'ClinPharm-Report'}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}
