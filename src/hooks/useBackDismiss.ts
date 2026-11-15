import { useEffect, useRef } from 'react';

const DRAWER_HISTORY_MARKER = '__clinpharmMobileDrawer';

export function hasDrawerHistoryMarker(state: unknown): boolean {
  return Boolean(state && typeof state === 'object' && (state as Record<string, unknown>)[DRAWER_HISTORY_MARKER]);
}

export function useBackDismiss(open: boolean, onDismiss: () => void) {
  const openRef = useRef(open);
  const dismissRef = useRef(onDismiss);
  openRef.current = open;
  dismissRef.current = onDismiss;

  useEffect(() => {
    if (!open) return;

    if (!hasDrawerHistoryMarker(window.history.state)) {
      window.history.pushState(
        { ...(window.history.state && typeof window.history.state === 'object' ? window.history.state : {}), [DRAWER_HISTORY_MARKER]: true },
        '',
        window.location.href
      );
    }

    const onPopState = () => {
      if (openRef.current) dismissRef.current();
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [open]);
}
