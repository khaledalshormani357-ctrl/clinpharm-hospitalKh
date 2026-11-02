import { useCallback, useEffect, useState } from 'react';
import { AppTab, hashForTab, tabFromHash } from '../lib/navigation';

export interface NavigateTabOptions {
  replace?: boolean;
}

export function useHashTabNavigation(): [AppTab, (tab: AppTab, options?: NavigateTabOptions) => void] {
  const [activeTab, setActiveTab] = useState<AppTab>(() =>
    typeof window === 'undefined' ? 'patients' : tabFromHash(window.location.hash) ?? 'patients'
  );

  useEffect(() => {
    const replaceInvalidOrMissingHash = () => {
      const parsed = tabFromHash(window.location.hash);
      if (!parsed) {
        const target = `${window.location.pathname}${window.location.search}${hashForTab('patients')}`;
        window.history.replaceState(window.history.state, '', target);
        setActiveTab('patients');
      } else {
        setActiveTab(parsed);
      }
    };

    if (!tabFromHash(window.location.hash)) replaceInvalidOrMissingHash();
    window.addEventListener('popstate', replaceInvalidOrMissingHash);
    window.addEventListener('hashchange', replaceInvalidOrMissingHash);
    return () => {
      window.removeEventListener('popstate', replaceInvalidOrMissingHash);
      window.removeEventListener('hashchange', replaceInvalidOrMissingHash);
    };
  }, []);

  const navigate = useCallback((tab: AppTab, options: NavigateTabOptions = {}) => {
    if (typeof window !== 'undefined') {
      if (tabFromHash(window.location.hash) === tab) {
        setActiveTab(tab);
        return;
      }
      const target = `${window.location.pathname}${window.location.search}${hashForTab(tab)}`;
      const method = options.replace ? 'replaceState' : 'pushState';
      window.history[method](window.history.state, '', target);
    }
    setActiveTab(tab);
  }, []);

  return [activeTab, navigate];
}
