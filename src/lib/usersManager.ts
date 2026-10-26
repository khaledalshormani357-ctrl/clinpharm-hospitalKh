/**
 * Hospital Users, Role-Based Access Control (RBAC), and System Administration Manager
 * Primary System Administrator: د. خالد الشرماني (Dr. Khaled Al-Shormani)
 */

export type HospitalUserRole =
  | 'system_admin'
  | 'clinical_pharmacist'
  | 'attending_physician'
  | 'resident_intern';

export type SystemPermissionKey =
  | 'FULL_ADMIN_ACCESS'
  | 'MANAGE_USERS_RBAC'
  | 'APPROVE_DRP_INTERVENTIONS'
  | 'EDIT_PATIENT_LABS_MAR'
  | 'MANAGE_LIBRARY_VAULT'
  | 'EXPORT_PRINT_REPORTS'
  | 'CONFIGURE_ANDROID_PERMISSIONS'
  | 'OVERRIDE_HIGH_ALERT_DDI';

export interface HospitalUser {
  id: string;
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  email: string;
  phone: string;
  role: HospitalUserRole;
  departmentWard: string;
  licenseBadge: string;
  status: 'active' | 'on_duty' | 'suspended';
  isPrimarySystemAdmin?: boolean;
  permissions: SystemPermissionKey[];
  lastActiveAt: string;
  interventionsCount: number;
}

export interface SystemAuditLogEntry {
  id: string;
  timestamp: string;
  actorNameAr: string;
  actorNameEn: string;
  actorRole: HospitalUserRole;
  category: 'USER_ADMIN' | 'SECURITY_RBAC' | 'LIBRARY_VAULT' | 'CLINICAL_SAFETY';
  actionAr: string;
  actionEn: string;
}

export const PERMISSION_METADATA: Record<
  SystemPermissionKey,
  { labelAr: string; labelEn: string; descAr: string; descEn: string }
> = {
  FULL_ADMIN_ACCESS: {
    labelAr: 'صلاحية مدير النظام الشاملة (Full System Admin)',
    labelEn: 'Full System Administrator Authority',
    descAr: 'تحكم كامل بإعدادات النظام والمستشفى وقواعد البيانات والأمان',
    descEn: 'Complete administrative control over hospital CDSS settings and security'
  },
  MANAGE_USERS_RBAC: {
    labelAr: 'إدارة المستخدمين والصلاحيات (Users & RBAC)',
    labelEn: 'Manage Users, Roles & Permissions',
    descAr: 'إضافة وتعديل وتفعيل أو إيقاف حسابات الأطباء والصيادلة وتحديد صلاحياتهم',
    descEn: 'Create, edit, activate, or suspend clinician accounts and role permissions'
  },
  APPROVE_DRP_INTERVENTIONS: {
    labelAr: 'اعتماد التدخلات الدوائية ومذكرات SOAP',
    labelEn: 'Approve Clinical DRP & SOAP Interventions',
    descAr: 'توثيق واعتماد توصيات تعديل الجرعات وإيقاف الأدوية عالية الخطورة',
    descEn: 'Document, sign, and approve clinical pharmacist DRP interventions'
  },
  EDIT_PATIENT_LABS_MAR: {
    labelAr: 'إدخال وتعديل المرضى والفحوصات المختبرية وملف MAR',
    labelEn: 'Edit Patient Admissions, Laboratory Panels & Active MAR',
    descAr: 'إدخال المرضى وتحديث التحاليل المخبرية وأوامر الأدوية الوريدية والفموية',
    descEn: 'Admit patients, add custom laboratory results, and modify inpatient MAR orders'
  },
  MANAGE_LIBRARY_VAULT: {
    labelAr: 'إدارة خزنة المراجع الطبية الكاملة (IndexedDB Vault)',
    labelEn: 'Manage Full Reference Textbooks & Offline PDF Vault',
    descAr: 'فهرسة وتحديث وتنزيل المراجع الطبية السبعة الكاملة بدون إنترنت',
    descEn: 'Index, re-sync, and manage offline medical PDF textbooks in IndexedDB'
  },
  EXPORT_PRINT_REPORTS: {
    labelAr: 'طباعة وتصدير ومشاركة التقارير بصيغة PDF',
    labelEn: 'Print, Export & Share Clinical PDF Reports',
    descAr: 'توليد تقارير PDF رسمية ومشاركتها عبر أندرويد وسطح المكتب',
    descEn: 'Generate, print, and share official clinical PDF reports'
  },
  CONFIGURE_ANDROID_PERMISSIONS: {
    labelAr: 'إدارة أذونات تطبيق الأندرويد (Android Permissions)',
    labelEn: 'Configure Android Device & Storage Permissions',
    descAr: 'إدارة أذونات الملفات والطباعة والمشاركة والشبكة على أجهزة الأندرويد',
    descEn: 'Manage Android runtime permissions for storage, printing, sharing, and network'
  },
  OVERRIDE_HIGH_ALERT_DDI: {
    labelAr: 'تجاوز تنبيهات التعارضات الدوائية الحرجة (Stockley’s High-Alert)',
    labelEn: 'Authorize High-Alert Drug Interaction Overwrites',
    descAr: 'توقيع استشاري لتجاوز تنبيه تعارض دوائي حرج مع مبرر سريري موثق',
    descEn: 'Authorize clinical override of major drug interactions with documented rationale'
  }
};

export const ROLE_DEFAULT_PERMISSIONS: Record<HospitalUserRole, SystemPermissionKey[]> = {
  system_admin: [
    'FULL_ADMIN_ACCESS',
    'MANAGE_USERS_RBAC',
    'APPROVE_DRP_INTERVENTIONS',
    'EDIT_PATIENT_LABS_MAR',
    'MANAGE_LIBRARY_VAULT',
    'EXPORT_PRINT_REPORTS',
    'CONFIGURE_ANDROID_PERMISSIONS',
    'OVERRIDE_HIGH_ALERT_DDI'
  ],
  clinical_pharmacist: [
    'APPROVE_DRP_INTERVENTIONS',
    'EDIT_PATIENT_LABS_MAR',
    'MANAGE_LIBRARY_VAULT',
    'EXPORT_PRINT_REPORTS',
    'OVERRIDE_HIGH_ALERT_DDI'
  ],
  attending_physician: [
    'APPROVE_DRP_INTERVENTIONS',
    'EDIT_PATIENT_LABS_MAR',
    'EXPORT_PRINT_REPORTS',
    'OVERRIDE_HIGH_ALERT_DDI'
  ],
  resident_intern: ['EDIT_PATIENT_LABS_MAR', 'EXPORT_PRINT_REPORTS']
};

export const ROLE_LABELS: Record<
  HospitalUserRole,
  { labelAr: string; labelEn: string; badgeColor: string }
> = {
  system_admin: {
    labelAr: 'مدير النظام العام (System Administrator)',
    labelEn: 'System Administrator & Chief BCPS',
    badgeColor:
      'bg-amber-500/20 text-amber-800 dark:text-amber-300 border-amber-500/40'
  },
  clinical_pharmacist: {
    labelAr: 'صيدلي إكلينيكي معتمد (Clinical Pharmacist)',
    labelEn: 'Board-Certified Clinical Pharmacist',
    badgeColor:
      'bg-teal-500/20 text-teal-800 dark:text-teal-300 border-teal-500/40'
  },
  attending_physician: {
    labelAr: 'طبيب استشاري معالج (Attending Physician)',
    labelEn: 'Attending Consultant Physician',
    badgeColor:
      'bg-indigo-500/20 text-indigo-800 dark:text-indigo-300 border-indigo-500/40'
  },
  resident_intern: {
    labelAr: 'طبيب / صيدلي مقيم (Clinical Resident / Intern)',
    labelEn: 'Clinical Resident / PGY1 Intern',
    badgeColor:
      'bg-sky-500/20 text-sky-800 dark:text-sky-300 border-sky-500/40'
  }
};

export const DEFAULT_HOSPITAL_USERS: HospitalUser[] = [
  {
    id: 'user-admin-khaled-shormani',
    nameAr: 'د. خالد الشرماني',
    nameEn: 'Dr. Khaled Al-Shormani',
    titleAr: 'مدير النظام العام ورئيس قسم الصيدلة السريرية (BCPS, BCCCP)',
    titleEn: 'System Administrator & Chief of Clinical Pharmacy (BCPS, BCCCP)',
    email: 'khaledalshormani357@gmail.com',
    phone: '+967-777-000-357',
    role: 'system_admin',
    departmentWard: 'الإدارة العامة للنظام + العناية المركزة والقلب (All Wards / ICU / CCU)',
    licenseBadge: 'SYS-ADMIN-001 • BCPS',
    status: 'on_duty',
    isPrimarySystemAdmin: true,
    permissions: [...ROLE_DEFAULT_PERMISSIONS.system_admin],
    lastActiveAt: 'متصل الآن (Active System Admin Session)',
    interventionsCount: 148
  },
  {
    id: 'user-pharm-sarah',
    nameAr: 'د. سارة المنصوري',
    nameEn: 'Dr. Sarah Al-Mansouri',
    titleAr: 'صيدلي إكلينيكي أول — العناية المركزة والإنتان (BCCCP)',
    titleEn: 'Senior Critical Care Clinical Pharmacist (BCCCP)',
    email: 's.mansouri@clinpharm-hospital.org',
    phone: '+967-771-240-112',
    role: 'clinical_pharmacist',
    departmentWard: 'العناية المركزة (ICU) & قسم الطوارئ',
    licenseBadge: 'PHARM-ICU-104 • BCCCP',
    status: 'on_duty',
    permissions: [...ROLE_DEFAULT_PERMISSIONS.clinical_pharmacist],
    lastActiveAt: 'منذ 12 دقيقة (ICU Rounds)',
    interventionsCount: 84
  },
  {
    id: 'user-pharm-ahmed',
    nameAr: 'د. أحمد الكحلاني',
    nameEn: 'Dr. Ahmed Al-Kahlani',
    titleAr: 'صيدلي إكلينيكي — أمراض القلب والشرايين (BCCP)',
    titleEn: 'Cardiology Clinical Specialist Pharmacist (BCCP)',
    email: 'a.kahlani@clinpharm-hospital.org',
    phone: '+967-773-890-445',
    role: 'clinical_pharmacist',
    departmentWard: 'عناية القلب (CCU) & الباطنية',
    licenseBadge: 'PHARM-CCU-208 • BCCP',
    status: 'active',
    permissions: [...ROLE_DEFAULT_PERMISSIONS.clinical_pharmacist],
    lastActiveAt: 'منذ 35 دقيقة (CCU Telemetry)',
    interventionsCount: 62
  },
  {
    id: 'user-pharm-reem',
    nameAr: 'د. ريم الحمادي',
    nameEn: 'Dr. Reem Al-Hammadi',
    titleAr: 'صيدلي إكلينيكي — قسم الأطفال وحديثي الولادة (BCPPS)',
    titleEn: 'Pediatric & Neonatal Clinical Pharmacist (BCPPS)',
    email: 'r.hammadi@clinpharm-hospital.org',
    phone: '+967-770-512-908',
    role: 'clinical_pharmacist',
    departmentWard: 'قسم الأطفال وحديثي الولادة (Pediatrics & NICU)',
    licenseBadge: 'PHARM-PEDS-312 • BCPPS',
    status: 'on_duty',
    permissions: [...ROLE_DEFAULT_PERMISSIONS.clinical_pharmacist],
    lastActiveAt: 'منذ 18 دقيقة (Pediatrics Dosing)',
    interventionsCount: 57
  },
  {
    id: 'user-phys-tariq',
    nameAr: 'د. طارق السامعي',
    nameEn: 'Dr. Tariq Al-Samei',
    titleAr: 'طبيب استشاري العناية المركزة والأمراض الباطنية (MD, FCCP)',
    titleEn: 'Attending Consultant — Intensive Care & Internal Medicine',
    email: 't.samei@clinpharm-hospital.org',
    phone: '+967-777-611-209',
    role: 'attending_physician',
    departmentWard: 'العناية المركزة (ICU) & الباطنية (Internal Medicine)',
    licenseBadge: 'MD-CONS-401 • ICU',
    status: 'active',
    permissions: [...ROLE_DEFAULT_PERMISSIONS.attending_physician],
    lastActiveAt: 'منذ ساعة (ICU Multidisciplinary Round)',
    interventionsCount: 39
  },
  {
    id: 'user-res-lina',
    nameAr: 'د. لينا الأغبري',
    nameEn: 'Dr. Lina Al-Aghbari',
    titleAr: 'صيدلي مقيم سنة أولى — برنامج الزمالة السريرية (PGY1 Resident)',
    titleEn: 'PGY1 Clinical Pharmacy Resident',
    email: 'l.aghbari@clinpharm-hospital.org',
    phone: '+967-735-901-882',
    role: 'resident_intern',
    departmentWard: 'الأجنحة الداخلية والمطابقة الدوائية (MedRec & Internal Med)',
    licenseBadge: 'PGY1-RES-509',
    status: 'active',
    permissions: [...ROLE_DEFAULT_PERMISSIONS.resident_intern],
    lastActiveAt: 'منذ ساعتين (Admission MedRec)',
    interventionsCount: 24
  }
];

const STORAGE_USERS_KEY = 'clinpharm_hospital_users_v1';
const STORAGE_ACTIVE_USER_KEY = 'clinpharm_active_user_id_v1';
const STORAGE_AUDIT_LOGS_KEY = 'clinpharm_system_audit_logs_v1';

const DEFAULT_AUDIT_LOGS: SystemAuditLogEntry[] = [
  {
    id: 'audit-init-1',
    timestamp: new Date().toISOString(),
    actorNameAr: 'د. خالد الشرماني (مدير النظام)',
    actorNameEn: 'Dr. Khaled Al-Shormani (System Admin)',
    actorRole: 'system_admin',
    category: 'LIBRARY_VAULT',
    actionAr:
      'تم رفع وفهرسة المراجع الطبية الـ 7 الكاملة (DiPiro 13th, ACCP 2026, Stockley’s, Casebook, Hospital Compendium) محلياً في البرنامج لتعمل 100% بدون إنترنت.',
    actionEn:
      'Pre-loaded and indexed all 7 full clinical reference textbooks into in-app IndexedDB vault for 100% offline operation.'
  },
  {
    id: 'audit-init-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    actorNameAr: 'د. خالد الشرماني (مدير النظام)',
    actorNameEn: 'Dr. Khaled Al-Shormani (System Admin)',
    actorRole: 'system_admin',
    category: 'SECURITY_RBAC',
    actionAr:
      'تفعيل مصفوفة صلاحيات المستخدمين (RBAC) وتعيين د. خالد الشرماني مديراً عاماً للنظام بصلاحيات كاملة.',
    actionEn:
      'Activated Role-Based Access Control (RBAC) matrix with Dr. Khaled Al-Shormani as Primary System Administrator.'
  },
  {
    id: 'audit-init-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 40).toISOString(),
    actorNameAr: 'د. ريم الحمادي',
    actorNameEn: 'Dr. Reem Al-Hammadi',
    actorRole: 'clinical_pharmacist',
    category: 'CLINICAL_SAFETY',
    actionAr:
      'تحديث بروتوكولات حاسبات جرعات أدوية الأطفال (Pediatric Drug Dosing) وحاسبات DynaMedex السريرية.',
    actionEn:
      'Verified pediatric weight-based drug dosing formulary and DynaMedex clinical calculators.'
  }
];

function notifyUsersChanged() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('clinpharm-users-updated'));
  }
}

let memoryUsers: HospitalUser[] = [...DEFAULT_HOSPITAL_USERS];
let memoryActiveUserId: string = DEFAULT_HOSPITAL_USERS[0].id;

export function getHospitalUsers(): HospitalUser[] {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return memoryUsers;
  }
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(memoryUsers));
      return memoryUsers;
    }
    const parsed = JSON.parse(raw) as HospitalUser[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return memoryUsers;
    }
    // Always ensure primary system admin Khaled Al-Shormani exists at the top
    const hasAdmin = parsed.some(u => u.id === 'user-admin-khaled-shormani');
    if (!hasAdmin) {
      const merged = [DEFAULT_HOSPITAL_USERS[0], ...parsed];
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(merged));
      memoryUsers = merged;
      return merged;
    }
    memoryUsers = parsed;
    return parsed;
  } catch {
    return memoryUsers;
  }
}

export function saveHospitalUsers(users: HospitalUser[]): void {
  memoryUsers = users;
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    notifyUsersChanged();
  } catch {
    // ignore storage errors
  }
}

export function getActiveHospitalUser(): HospitalUser {
  const users = getHospitalUsers();
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const activeId = localStorage.getItem(STORAGE_ACTIVE_USER_KEY);
    if (activeId) {
      const found = users.find(u => u.id === activeId);
      if (found) return found;
    }
  }
  const memFound = users.find(u => u.id === memoryActiveUserId);
  if (memFound) return memFound;
  return users[0] || DEFAULT_HOSPITAL_USERS[0];
}

export function setActiveHospitalUser(userId: string): HospitalUser {
  const users = getHospitalUsers();
  const target = users.find(u => u.id === userId) || users[0];
  memoryActiveUserId = target.id;
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_ACTIVE_USER_KEY, target.id);
  }
  appendSystemAuditLog(
    `تم تبديل الجلسة النشطة إلى: ${target.nameAr} (${ROLE_LABELS[target.role].labelAr})`,
    `Switched active clinician session to: ${target.nameEn} (${ROLE_LABELS[target.role].labelEn})`,
    'SECURITY_RBAC'
  );
  notifyUsersChanged();
  return target;
}

export function addHospitalUser(input: {
  nameAr: string;
  nameEn: string;
  titleAr: string;
  titleEn: string;
  email: string;
  phone: string;
  role: HospitalUserRole;
  departmentWard: string;
  licenseBadge: string;
  permissions?: SystemPermissionKey[];
}): HospitalUser {
  const users = getHospitalUsers();
  const newUser: HospitalUser = {
    id: `user-${Date.now()}`,
    nameAr: input.nameAr.trim(),
    nameEn: input.nameEn.trim() || input.nameAr.trim(),
    titleAr: input.titleAr.trim() || ROLE_LABELS[input.role].labelAr,
    titleEn: input.titleEn.trim() || ROLE_LABELS[input.role].labelEn,
    email: input.email.trim() || 'staff@clinpharm-hospital.org',
    phone: input.phone.trim() || '+967-770-000-000',
    role: input.role,
    departmentWard: input.departmentWard.trim() || 'All Wards',
    licenseBadge: input.licenseBadge.trim() || `STAFF-${Math.floor(100 + Math.random() * 900)}`,
    status: 'active',
    permissions: input.permissions || [...ROLE_DEFAULT_PERMISSIONS[input.role]],
    lastActiveAt: 'حساب جديد مفعّل (Newly Added)',
    interventionsCount: 0
  };

  const updated = [...users, newUser];
  saveHospitalUsers(updated);
  appendSystemAuditLog(
    `إضافة مستخدم جديد للنظام: ${newUser.nameAr} (${ROLE_LABELS[newUser.role].labelAr}) بواسطة مدير النظام`,
    `Added new hospital user: ${newUser.nameEn} (${ROLE_LABELS[newUser.role].labelEn})`,
    'USER_ADMIN'
  );
  return newUser;
}

export function updateHospitalUser(
  userId: string,
  patch: Partial<HospitalUser>
): HospitalUser[] {
  const users = getHospitalUsers();
  const updated = users.map(u => {
    if (u.id !== userId) return u;
    // Primary System Admin Khaled Al-Shormani always keeps system_admin role and active status
    if (u.isPrimarySystemAdmin) {
      return {
        ...u,
        ...patch,
        role: 'system_admin' as HospitalUserRole,
        status: patch.status === 'suspended' ? 'on_duty' : patch.status || u.status,
        isPrimarySystemAdmin: true
      };
    }
    return { ...u, ...patch };
  });
  saveHospitalUsers(updated);
  return updated;
}

export function toggleUserPermission(
  userId: string,
  perm: SystemPermissionKey
): HospitalUser[] {
  const users = getHospitalUsers();
  const target = users.find(u => u.id === userId);
  if (!target) return users;

  // Primary System Admin keeps FULL_ADMIN_ACCESS & MANAGE_USERS_RBAC locked on
  if (
    target.isPrimarySystemAdmin &&
    (perm === 'FULL_ADMIN_ACCESS' || perm === 'MANAGE_USERS_RBAC')
  ) {
    return users;
  }

  const hasPerm = target.permissions.includes(perm);
  const nextPerms = hasPerm
    ? target.permissions.filter(p => p !== perm)
    : [...target.permissions, perm];

  const updated = updateHospitalUser(userId, { permissions: nextPerms });
  appendSystemAuditLog(
    `تحديث صلاحيات ${target.nameAr}: ${hasPerm ? 'إلغاء' : 'منح'} صلاحية (${PERMISSION_METADATA[perm].labelAr})`,
    `Updated permissions for ${target.nameEn}: ${hasPerm ? 'Revoked' : 'Granted'} ${perm}`,
    'SECURITY_RBAC'
  );
  return updated;
}

export function deleteHospitalUser(userId: string): HospitalUser[] {
  const users = getHospitalUsers();
  const target = users.find(u => u.id === userId);
  if (!target || target.isPrimarySystemAdmin) {
    return users;
  }
  const updated = users.filter(u => u.id !== userId);
  saveHospitalUsers(updated);
  appendSystemAuditLog(
    `حذف حساب المستخدم: ${target.nameAr} (${target.licenseBadge})`,
    `Removed hospital user account: ${target.nameEn} (${target.licenseBadge})`,
    'USER_ADMIN'
  );
  return updated;
}

export function getSystemAuditLogs(): SystemAuditLogEntry[] {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return DEFAULT_AUDIT_LOGS;
  }
  try {
    const raw = localStorage.getItem(STORAGE_AUDIT_LOGS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_AUDIT_LOGS_KEY, JSON.stringify(DEFAULT_AUDIT_LOGS));
      return DEFAULT_AUDIT_LOGS;
    }
    const parsed = JSON.parse(raw) as SystemAuditLogEntry[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_AUDIT_LOGS;
  } catch {
    return DEFAULT_AUDIT_LOGS;
  }
}

export function appendSystemAuditLog(
  actionAr: string,
  actionEn: string,
  category: SystemAuditLogEntry['category'] = 'USER_ADMIN'
): SystemAuditLogEntry {
  const activeUser = getActiveHospitalUser();
  const entry: SystemAuditLogEntry = {
    id: `audit-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    timestamp: new Date().toISOString(),
    actorNameAr: activeUser.nameAr,
    actorNameEn: activeUser.nameEn,
    actorRole: activeUser.role,
    category,
    actionAr,
    actionEn
  };
  const current = getSystemAuditLogs();
  const updated = [entry, ...current].slice(0, 80);
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    try {
      localStorage.setItem(STORAGE_AUDIT_LOGS_KEY, JSON.stringify(updated));
    } catch {
      // ignore
    }
  }
  notifyUsersChanged();
  return entry;
}

export function subscribeHospitalUsers(onUpdate: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('clinpharm-users-updated', onUpdate);
  return () => window.removeEventListener('clinpharm-users-updated', onUpdate);
}
