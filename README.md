# 🏥 ClinPharm Hospital CDSS | نظام الصيدلة السريرية المتكامل للمستشفيات

نظام دعم القرار السريري المتكامل للصيدلة الإكلينيكية في المستشفيات (**Inpatient Clinical Pharmacy Decision Support System — BCPS / BCCP Edition**)، مصمم للعمل كتطبيق ويب تقدمي قابل للتثبيت (**Installable PWA**) وتطبيق أندرويد أصلي (**Android APK via Capacitor**) مع دعم العمل الكامل بدون إنترنت (**Offline-First IndexedDB**).

---

## 🚀 تجربة التطبيق وتنزيله مباشرةً (Live Demo & Direct Download)

1. **🌐 تجربة الواجهة الحية وتثبيت التطبيق فوراً (PWA Web App)**:
   - افتح رابط **GitHub Pages** الخاص بالمستودع:
     `https://<YOUR-GITHUB-USERNAME>.github.io/<YOUR-REPO-NAME>/`
   - اضغط على زر **"تثبيت التطبيق / GitHub"** في الشريط العلوي لتثبيت التطبيق مباشرةً على شاشة هاتفك (Android / iOS) أو حاسوبك (Windows / macOS) بضغطة واحدة.

2. **📱 تنزيل حزمة الأندرويد المباشرة (`.APK`)**:
   - انتقل إلى قسم **[Releases](../../releases/latest)** في هذا المستودع على GitHub وقم بتنزيل الملف الجاهز:
     **`ClinPharm-Hospital-Android.apk`**
   - يتم بناء ملف الـ APK تلقائياً عبر GitHub Actions (`.github/workflows/build-android-apk.yml`) مع كل تحديث.

---

## ✨ المميزات الأساسية للنظام

### 1. 📚 المكتبة المرجعية الطبية الكاملة + ربط Google Drive الرسمي (100% Verbatim Full-Book PDF Engine)
- **6 مراجع سريرية معتمدة (44 فصلاً مدمجاً بالنص الإنجليزي الأصلي)**:
  - *DiPiro's Pharmacotherapy: A Pathophysiologic Approach (13th Ed)*
  - *ACCP/ASHP Cardiology Pharmacy Preparatory Review (2026 BCCP)*
  - *ACCP Updates in Therapeutics® 2026 — Volume 1 (Chapters 1–10)*
  - *ACCP Updates in Therapeutics® 2026 — Volume 2 (Chapters 11–22)*
  - *Pharmacotherapy Casebook & Bedside PPCP Workup Guide (Sections I–V)*
  - *Hospital Clinical Dosing Compendium & ICU Stewardship (Sections A–E)*
- **ربط حساب Google Drive ومزامنة الكتب الكاملة (`OAuth 2.0` + `pdfjs-dist` + `IndexedDB`)**:
  - إمكانية تسجيل الدخول بحساب Google واستيراد ملفات الـ PDF الكاملة للمراجع مباشرة من Google Drive أو من جهازك.
  - استخراج وفهرسة **100% من صفحات وفصول الكتاب حرفياً** (صفحة بصفحة دون أي اختصار أو ترجمة) وحفظها في قاعدة بيانات المتصفح الدائمة (`IndexedDB`) مع عارض صفحات PDF أصلي (`Canvas PDF Renderer`).

### 2. 🤖 المساعد السريري الذكي الحقيقي (Real Google Gemini 3.8 Flash Copilot)
- متصل فعلياً بنموذج **`gemini-3.8-flash`** عبر حزمة `@google/genai` الرسمية.
- يقرأ ملف المريض النشط (العمر، الوزن، `CrCl`، الكهارل، قائمة الأدوية `MAR`) ويطابق سؤالك مع الفقرات والصفحات الحرفية من المراجع الطبية ليقدم توصية سريرية موثقة بروابط الفصول والصفحات.

### 3. 🧮 الحاسبات السريرية والحركية الدوائية وفحص التداخلات
- حاسبة تصفية الكرياتينين (`Cockcroft-Gault CrCl` مع `IBW` و`AdjBW`).
- حاسبة جرعات الفانكومايسين (`AUC24/MIC Bayesian-Guided Dosing`) والأمينوغليكوزيدات.
- فحص التداخلات الدوائية الحرجة (`DDI`)، فترة الغسيل الدوائي (`36h Washout` بين `ACEi` و`Entresto`)، وتوثيق التدخلات بنظام **`IESC` + `SOAP / SBAR`**.

---

## 🛠️ التشغيل المحلي والنشر على GitHub

### أولاً: التشغيل المحلي الكامل (الواجهة + خادم الذكاء الاصطناعي)
```bash
# 1. تثبيت الحزم
npm install

# 2. إضافة مفتاح Gemini API في ملف .env
echo "GEMINI_API_KEY=your_api_key_here" > .env

# 3. تشغيل الخادم والواجهة على المنفذ 3000
npm run dev
```

### ثانياً: تفعيل النشر التلقائي على GitHub Pages وبناء الـ APK
1. ارفع الكود إلى مستودعك على GitHub (`main` branch).
2. لتفعيل المساعد الذكي في الواجهة المستضافة على GitHub Pages وداخل ملف الـ APK:
   - اذهب إلى **Settings** -> **Secrets and variables** -> **Actions** في مستودعك.
   - أضف سرّاً جديداً (`New repository secret`) باسم:
     `VITE_GEMINI_API_KEY`
3. لتفعيل **GitHub Pages**:
   - اذهب إلى **Settings** -> **Pages**، وتحت **Build and deployment (Source)** اختر **GitHub Actions**.

### ثالثاً: تشغيل الاختبارات الآلية (Unit Tests)
```bash
npm test
```
