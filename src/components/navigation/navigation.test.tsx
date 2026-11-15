// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import * as React from 'react';
import { buildNavigationEntries, APP_TABS } from '../../lib/navigation';
import type { AppTab } from '../../lib/navigation';
import { MobileNavigationDrawer } from './MobileNavigationDrawer';
import { MobileBottomNavigation } from './MobileBottomNavigation';
import { PrimarySidebar } from './PrimarySidebar';
import { useBackDismiss } from '../../hooks/useBackDismiss';
import { useHashTabNavigation } from '../../hooks/useHashTabNavigation';

const labels = Object.fromEntries(APP_TABS.map(tab => [tab, `Demo ${tab}`])) as Record<AppTab, string>;
const entries = buildNavigationEntries(labels, {});

afterEach(() => {
  cleanup();
  localStorage.clear();
  window.history.replaceState({}, '', '/');
});

describe('navigation components', () => {
  it('marks the active sidebar destination and persists collapse state', () => {
    const onNavigate = vi.fn();
    const { unmount } = render(
      <PrimarySidebar entries={entries} activeTab="calculators" lang="en" onNavigate={onNavigate} />
    );
    expect(screen.getByTestId('nav-calculators').getAttribute('aria-current')).toBe('page');
    fireEvent.click(screen.getByTestId('sidebar-collapse'));
    expect(localStorage.getItem('clinpharm-navigation-collapsed')).toBe('true');
    expect(screen.getByTestId('nav-patients').getAttribute('title')).toBe('Demo patients');
    fireEvent.click(screen.getByTestId('nav-training'));
    expect(onNavigate).toHaveBeenCalledWith('training');
    unmount();
    render(<PrimarySidebar entries={entries} activeTab="patients" lang="en" onNavigate={onNavigate} />);
    expect(screen.getByTestId('nav-patients').getAttribute('aria-label')).toBe('Demo patients');
  });

  it('lists existing destinations in the mobile drawer and closes after selection', () => {
    const onNavigate = vi.fn();
    const onRequestClose = vi.fn();
    render(
      <MobileNavigationDrawer
        open
        entries={entries}
        activeTab="patients"
        lang="ar"
        onNavigate={tab => { onNavigate(tab); onRequestClose(); }}
        onRequestClose={onRequestClose}
      />
    );
    expect(screen.getByRole('dialog', { name: 'قائمة التنقل' })).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'Demo training' }));
    expect(onNavigate).toHaveBeenCalledWith('training');
    expect(onRequestClose).toHaveBeenCalled();
  });

  it('supports Escape to close the drawer and shows a visible focus target', () => {
    const onRequestClose = vi.fn();
    render(
      <MobileNavigationDrawer
        open
        entries={entries}
        activeTab="patients"
        lang="en"
        onNavigate={vi.fn()}
        onRequestClose={onRequestClose}
      />
    );
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'Close menu' }));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onRequestClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole('button', { name: 'Close menu' }).className).toContain('focus-visible:ring-2');
  });

  it('sets the correct reading direction and exposes the same destinations in Arabic and English', () => {
    const { rerender } = render(
      <MobileNavigationDrawer open entries={entries} activeTab="patients" lang="ar" onNavigate={vi.fn()} onRequestClose={vi.fn()} />
    );
    expect(screen.getByRole('dialog').getAttribute('dir')).toBe('rtl');
    expect(screen.getByRole('button', { name: 'Demo guidelines' })).toBeTruthy();
    rerender(
      <MobileNavigationDrawer open entries={entries} activeTab="patients" lang="en" onNavigate={vi.fn()} onRequestClose={vi.fn()} />
    );
    expect(screen.getByRole('dialog').getAttribute('dir')).toBe('ltr');
  });

  it('keeps the mobile bottom destinations and opens More without inventing a route', () => {
    const onOpenDrawer = vi.fn();
    const onNavigate = vi.fn();
    render(
      <MobileBottomNavigation
        activeTab="patients"
        lang="en"
        labels={{ patients: 'Rounds', guidelines: 'Library', calculators: 'Calculators', alerts: 'Safety', more: 'More' }}
        onNavigate={onNavigate}
        onOpenDrawer={onOpenDrawer}
      />
    );
    fireEvent.click(screen.getByRole('button', { name: 'More' }));
    expect(onOpenDrawer).toHaveBeenCalledTimes(1);
    expect(onNavigate).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /Safety/ }));
    expect(onNavigate).toHaveBeenCalledWith('alerts');
  });
});

function BackDismissHarness() {
  const [open, setOpen] = React.useState(false);
  useBackDismiss(open, () => setOpen(false));
  return <button onClick={() => setOpen(value => !value)}>{open ? 'Drawer open' : 'Open drawer'}</button>;
}

function HashNavigationHarness() {
  const [activeTab, navigate] = useHashTabNavigation();
  return <button onClick={() => navigate('training')}>Current route: {activeTab}</button>;
}

describe('navigation hooks', () => {
  it('maps direct links and tab selections to the URL', () => {
    window.history.replaceState({}, '', '/#/guidelines');
    render(<HashNavigationHarness />);
    expect(screen.getByRole('button').textContent).toContain('Current route: guidelines');
    fireEvent.click(screen.getByRole('button'));
    expect(window.location.hash).toBe('#/training');
    expect(screen.getByRole('button').textContent).toContain('Current route: training');
  });

  it('updates the selected tab when browser or Android back emits popstate', () => {
    window.history.replaceState({}, '', '/#/patients');
    render(<HashNavigationHarness />);
    fireEvent.click(screen.getByRole('button'));
    window.history.replaceState({}, '', '/#/patients');
    act(() => window.dispatchEvent(new PopStateEvent('popstate')));
    expect(screen.getByRole('button').textContent).toContain('Current route: patients');
  });

  it('closes the mobile drawer before the route can be changed on back', () => {
    render(<BackDismissHarness />);
    fireEvent.click(screen.getByRole('button', { name: 'Open drawer' }));
    expect(window.history.state).toHaveProperty('__clinpharmMobileDrawer', true);
    act(() => window.dispatchEvent(new PopStateEvent('popstate')));
    expect(screen.getByRole('button', { name: 'Open drawer' })).toBeTruthy();
  });
});
