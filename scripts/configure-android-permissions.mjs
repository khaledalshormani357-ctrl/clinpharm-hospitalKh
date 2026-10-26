import fs from 'node:fs';
import path from 'node:path';

/**
 * Configures comprehensive Android permissions, FileProvider paths, Print/Share intent queries,
 * and Network Security Config for ClinPharm Hospital Android APK (Capacitor Android).
 *
 * Covers:
 * 1. Internet & Network State (INTERNET, ACCESS_NETWORK_STATE, ACCESS_WIFI_STATE)
 * 2. Files, Documents & External Storage (READ/WRITE_EXTERNAL_STORAGE, MANAGE_EXTERNAL_STORAGE, READ_MEDIA_*)
 * 3. PDF Generation, Printing & Native File Sharing (FileProvider + Intent Queries for Print/Share/PDF)
 * 4. Notifications, Vibration, WakeLock & Foreground Data Sync
 */

const ANDROID_PERMISSIONS_XML = `
    <!-- 1. أذونات الإنترنت والشبكة والمزامنة السحابية (Internet & Hospital Network Sync) -->
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_WIFI_STATE" />
    <uses-permission android:name="android.permission.CHANGE_WIFI_STATE" />

    <!-- 2. أذونات قراءة وحفظ الملفات والمراجع الطبية وملفات الـ PDF (Files, PDFs & Storage Access) -->
    <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" android:maxSdkVersion="32" />
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" android:maxSdkVersion="32" tools:ignore="ScopedStorage" />
    <uses-permission android:name="android.permission.MANAGE_EXTERNAL_STORAGE" tools:ignore="ScopedStorage" />
    <uses-permission android:name="android.permission.READ_MEDIA_IMAGES" />
    <uses-permission android:name="android.permission.READ_MEDIA_VIDEO" />
    <uses-permission android:name="android.permission.READ_MEDIA_AUDIO" />
    <uses-permission android:name="android.permission.READ_MEDIA_VISUAL_USER_SELECTED" />

    <!-- 3. أذونات الإشعارات والتنبيهات السريرية والاهتزاز ومنع خمول الشاشة أثناء الفهرسة -->
    <uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
    <uses-permission android:name="android.permission.VIBRATE" />
    <uses-permission android:name="android.permission.WAKE_LOCK" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
    <uses-permission android:name="android.permission.FOREGROUND_SERVICE_DATA_SYNC" />
    <uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />
`;

const ANDROID_QUERIES_XML = `
    <!-- استعلامات مشاركة الملفات وطباعة الـ PDF وفتح المراجع الطبية (Android 11+ Package Visibility) -->
    <queries>
        <intent>
            <action android:name="android.intent.action.SEND" />
            <data android:mimeType="*/*" />
        </intent>
        <intent>
            <action android:name="android.intent.action.SEND_MULTIPLE" />
            <data android:mimeType="*/*" />
        </intent>
        <intent>
            <action android:name="android.intent.action.VIEW" />
            <data android:mimeType="application/pdf" />
        </intent>
        <intent>
            <action android:name="android.intent.action.OPEN_DOCUMENT" />
            <data android:mimeType="*/*" />
        </intent>
        <intent>
            <action android:name="android.intent.action.CREATE_DOCUMENT" />
            <data android:mimeType="application/pdf" />
        </intent>
        <intent>
            <action android:name="android.intent.action.PRINT" />
        </intent>
    </queries>
`;

const FILE_PATHS_XML = `<?xml version="1.0" encoding="utf-8"?>
<paths xmlns:android="http://schemas.android.com/apk/res/android">
    <external-path name="my_images" path="." />
    <external-path name="external_storage_root" path="." />
    <external-files-path name="external_files" path="." />
    <external-files-path name="documents" path="Documents" />
    <external-files-path name="downloads" path="Download" />
    <files-path name="internal_files" path="." />
    <cache-path name="cache" path="." />
    <external-cache-path name="external_cache" path="." />
</paths>
`;

const NETWORK_SECURITY_CONFIG_XML = `<?xml version="1.0" encoding="utf-8"?>
<network-security-config>
    <base-config cleartextTrafficPermitted="true">
        <trust-anchors>
            <certificates src="system" />
            <certificates src="user" />
        </trust-anchors>
    </base-config>
</network-security-config>
`;

const FULL_MANIFEST_TEMPLATE = `<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools">
${ANDROID_PERMISSIONS_XML}
${ANDROID_QUERIES_XML}
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:usesCleartextTraffic="true"
        android:requestLegacyExternalStorage="true"
        android:preserveLegacyExternalStorage="true"
        android:hardwareAccelerated="true"
        android:largeHeap="true"
        android:networkSecurityConfig="@xml/network_security_config"
        android:theme="@style/AppTheme">

        <activity
            android:configChanges="orientation|keyboardHidden|keyboard|screenSize|locale|smallestScreenSize|screenLayout|uiMode|navigation"
            android:name=".MainActivity"
            android:label="@string/title_activity_main"
            android:theme="@style/AppTheme.NoActionBarLaunch"
            android:launchMode="singleTask"
            android:exported="true">

            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>

            <!-- استقبال ملفات PDF و JSON السريرية عند مشاركتها مع التطبيق -->
            <intent-filter>
                <action android:name="android.intent.action.VIEW" />
                <action android:name="android.intent.action.SEND" />
                <category android:name="android.intent.category.DEFAULT" />
                <category android:name="android.intent.category.BROWSABLE" />
                <data android:mimeType="application/pdf" />
                <data android:mimeType="application/json" />
                <data android:mimeType="text/markdown" />
                <data android:mimeType="text/plain" />
            </intent-filter>
        </activity>

        <provider
            android:name="androidx.core.content.FileProvider"
            android:authorities="\${applicationId}.fileprovider"
            android:exported="false"
            android:grantUriPermissions="true">
            <meta-data
                android:name="android.support.FILE_PROVIDER_PATHS"
                android:resource="@xml/file_paths" />
        </provider>
    </application>
</manifest>
`;

// 1. Always write canonical reference configs in /android-config
const referenceDir = path.resolve(process.cwd(), 'android-config');
fs.mkdirSync(referenceDir, { recursive: true });
fs.writeFileSync(path.join(referenceDir, 'AndroidManifest.xml'), FULL_MANIFEST_TEMPLATE, 'utf8');
fs.writeFileSync(path.join(referenceDir, 'file_paths.xml'), FILE_PATHS_XML, 'utf8');
fs.writeFileSync(path.join(referenceDir, 'network_security_config.xml'), NETWORK_SECURITY_CONFIG_XML, 'utf8');
console.log('[configure-android-permissions] Wrote canonical Android permission configs to android-config/');

// 2. If ./android project directory exists (e.g. during Capacitor APK build), inject all permissions & XML resources
const androidMainDir = path.resolve(process.cwd(), 'android', 'app', 'src', 'main');
if (fs.existsSync(androidMainDir)) {
  const xmlDir = path.join(androidMainDir, 'res', 'xml');
  fs.mkdirSync(xmlDir, { recursive: true });
  fs.writeFileSync(path.join(xmlDir, 'file_paths.xml'), FILE_PATHS_XML, 'utf8');
  fs.writeFileSync(path.join(xmlDir, 'network_security_config.xml'), NETWORK_SECURITY_CONFIG_XML, 'utf8');

  const manifestPath = path.join(androidMainDir, 'AndroidManifest.xml');
  fs.writeFileSync(manifestPath, FULL_MANIFEST_TEMPLATE, 'utf8');
  console.log('[configure-android-permissions] Patched android/app/src/main/AndroidManifest.xml with full permissions!');
}
