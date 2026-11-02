import { describe, expect, it } from 'vitest';
import {
  APP_TABS,
  buildNavigationEntries,
  hashForTab,
  tabFromHash,
  TAB_ROUTES,
} from './navigation';

const labels = Object.fromEntries(APP_TABS.map(tab => [tab, `Demo ${tab}`])) as Record<(typeof APP_TABS)[number], string>;

describe('hash navigation map', () => {
  it('maps each existing tab to a stable deep-link and back', () => {
    expect(APP_TABS).toHaveLength(8);
    for (const tab of APP_TABS) {
      const hash = hashForTab(tab);
      expect(hash).toBe(`#${TAB_ROUTES[tab]}`);
      expect(tabFromHash(hash)).toBe(tab);
    }
  });

  it('accepts a trailing slash and ignores route query fragments', () => {
    expect(tabFromHash('#/patients/')).toBe('patients');
    expect(tabFromHash('#/training?view=cases')).toBe('training');
  });

  it('preserves the existing admin destination without introducing a new navigation-level role gate', () => {
    const entries = buildNavigationEntries(labels, {});
    expect(entries.map(item => item.tab)).toEqual([...APP_TABS]);
    expect(entries.some(item => item.tab === 'users_admin')).toBe(true);
    expect(tabFromHash('#/users-admin')).toBe('users_admin');
  });

  it('adds counts only to destinations that currently show them', () => {
    const entries = buildNavigationEntries(labels, {
      patientCount: 4,
      interventionCount: 2,
      discrepancyCount: 3,
    });
    expect(entries.find(item => item.tab === 'patients')?.label).toBe('Demo patients (4)');
    expect(entries.find(item => item.tab === 'interventions')?.label).toBe('Demo interventions (2)');
    expect(entries.find(item => item.tab === 'reconciliation')?.label).toBe('Demo reconciliation (3)');
  });
});
