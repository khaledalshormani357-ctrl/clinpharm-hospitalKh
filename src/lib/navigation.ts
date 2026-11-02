export const APP_TABS = [
  'patients',
  'reconciliation',
  'calculators',
  'alerts',
  'interventions',
  'guidelines',
  'training',
  'users_admin',
] as const;

export type AppTab = (typeof APP_TABS)[number];
export type NavigationIcon =
  | 'patients'
  | 'reconciliation'
  | 'calculators'
  | 'alerts'
  | 'interventions'
  | 'guidelines'
  | 'training'
  | 'users_admin';

export interface NavigationEntry {
  tab: AppTab;
  path: string;
  icon: NavigationIcon;
  label: string;
}

export const TAB_ROUTES: Record<AppTab, string> = {
  patients: '/patients',
  reconciliation: '/reconciliation',
  calculators: '/calculators',
  alerts: '/alerts',
  interventions: '/interventions',
  guidelines: '/guidelines',
  training: '/training',
  users_admin: '/users-admin',
};

export function hashForTab(tab: AppTab): string {
  return `#${TAB_ROUTES[tab]}`;
}

export function tabFromHash(hash: string): AppTab | null {
  const path = hash.startsWith('#') ? hash.slice(1) : hash;
  const normalized = path.split('?')[0].replace(/\/$/, '') || '/';
  const entry = APP_TABS.find(tab => TAB_ROUTES[tab] === normalized);
  return entry ?? null;
}

export function buildNavigationEntries(
  labels: Record<AppTab, string>,
  options: { patientCount?: number; interventionCount?: number; discrepancyCount?: number }
): NavigationEntry[] {
  return APP_TABS.map(tab => ({
    tab,
    path: TAB_ROUTES[tab],
    icon: tab,
    label:
      tab === 'patients' && options.patientCount !== undefined
        ? `${labels[tab]} (${options.patientCount})`
        : tab === 'interventions' && options.interventionCount !== undefined
          ? `${labels[tab]} (${options.interventionCount})`
          : tab === 'reconciliation' && options.discrepancyCount !== undefined
            ? `${labels[tab]} (${options.discrepancyCount})`
            : labels[tab],
  }));
}
