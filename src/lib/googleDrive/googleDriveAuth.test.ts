import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Server } from 'http';
import type { AddressInfo } from 'net';
import { renderToStaticMarkup } from 'react-dom/server';
import React from 'react';
import { createApp } from '../../../server';
import { DriveOAuthBridgeView } from '../../App';
import {
  AUTHORIZED_BRIDGE_ORIGIN,
  buildAuthorizedBridgeUrl,
  generateOAuthStateNonce,
  handleBridgeWindowMessage,
  isAllowedBridgeProviderOrigin,
  isAuthorizedFirebaseDomain,
  postBridgeResultToOpener,
  validateBridgeCallerOrigin,
} from './googleDriveAuth';

describe('Google Drive OAuth Bridge & Express Routing Verification Suite', () => {
  let server: Server | null = null;
  let baseUrl = '';

  afterEach(async () => {
    vi.restoreAllMocks();
    if (server) {
      await new Promise<void>((resolve) => server!.close(() => resolve()));
      server = null;
    }
  });

  async function startTestServer() {
    const app = await createApp({ serveDistOnly: true });
    server = app.listen(0, '127.0.0.1');
    await new Promise<void>((resolve) => server!.once('listening', resolve));
    const addr = server.address() as AddressInfo;
    baseUrl = `http://127.0.0.1:${addr.port}`;
  }

  // Test 3: اختبار أن "/" يعيد الواجهة الرئيسية
  it('1. serves the main frontend HTML on GET / with HTTP 200', async () => {
    await startTestServer();
    const res = await fetch(`${baseUrl}/`);
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/html');
    const html = await res.text();
    expect(html).toContain('<div id="root"></div>');
    expect(html).toContain('ClinPharm');
  });

  // Test 4: اختبار أن "/?drive_oauth_bridge=1&caller=https%3A%2F%2Flocalhost" يعرض شاشة وسيط OAuth
  it('2. serves the frontend HTML on GET /?drive_oauth_bridge=1&caller=https%3A%2F%2Flocalhost and renders DriveOAuthBridgeView', async () => {
    await startTestServer();
    const res = await fetch(
      `${baseUrl}/?drive_oauth_bridge=1&caller=https%3A%2F%2Flocalhost`
    );
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toContain('text/html');
    const html = await res.text();
    expect(html).toContain('<div id="root"></div>');
    expect(html).not.toContain('Error: Page not found');

    // Verify DriveOAuthBridgeView component renders the OAuth Bridge UI accurately
    const originalWindow = globalThis.window;
    try {
      (globalThis as Record<string, unknown>).window = {
        location: {
          search: '?drive_oauth_bridge=1&caller=https%3A%2F%2Flocalhost&state=test-state-123',
        },
        opener: { postMessage: vi.fn() },
      };

      const markup = renderToStaticMarkup(React.createElement(DriveOAuthBridgeView));
      expect(markup).toContain('ربط حساب Google Drive | ClinPharm Hospital');
      expect(markup).toContain('متابعة تسجيل الدخول بحساب Google');
      expect(markup).toContain('Origin: https://localhost');
    } finally {
      (globalThis as Record<string, unknown>).window = originalWindow;
    }
  });

  // Test 5: اختبار أن مسارات API غير المعروفة تعيد استجابة JSON مناسبة، دون تحويلها إلى صفحة HTML
  it('3. returns HTTP 404 JSON (never HTML) for unknown /api/* routes', async () => {
    await startTestServer();

    const getRes = await fetch(`${baseUrl}/api/non-existent-route`);
    expect(getRes.status).toBe(404);
    expect(getRes.headers.get('content-type')).toContain('application/json');
    const getJson = await getRes.json();
    expect(getJson).toEqual({ error: 'API endpoint not found' });

    const postRes = await fetch(`${baseUrl}/api/oauth/unknown`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ test: true }),
    });
    expect(postRes.status).toBe(404);
    expect(postRes.headers.get('content-type')).toContain('application/json');
    const postJson = await postRes.json();
    expect(postJson).toEqual({ error: 'API endpoint not found' });
  });

  // Test 6: اختبار تدفق الرسائل بين النافذة الأصلية والنافذة الوسيطة، بما في ذلك رفض الأصول غير المصرح بها
  it('4. validates caller/provider origins strictly, never uses wildcard "*", and rejects unauthorized postMessage origins or mismatched state', () => {
    // Caller origin allowlist validation
    expect(validateBridgeCallerOrigin('https://localhost')).toBe('https://localhost');
    expect(validateBridgeCallerOrigin('http://localhost:3000')).toBe('http://localhost:3000');
    expect(validateBridgeCallerOrigin('capacitor://localhost')).toBe('capacitor://localhost');
    expect(
      validateBridgeCallerOrigin('https://khaledalshormani357-ctrl.github.io/clinpharm-hospitalKh')
    ).toBe('https://khaledalshormani357-ctrl.github.io');
    expect(validateBridgeCallerOrigin(AUTHORIZED_BRIDGE_ORIGIN)).toBe(AUTHORIZED_BRIDGE_ORIGIN);

    // Rejects wildcard, untrusted domains, and non-http(s) schemes
    expect(validateBridgeCallerOrigin('*')).toBeNull();
    expect(validateBridgeCallerOrigin('https://evil-phishing.example.com')).toBeNull();
    expect(validateBridgeCallerOrigin('javascript:alert(1)')).toBeNull();
    expect(validateBridgeCallerOrigin('')).toBeNull();

    // Popup -> Opener postMessage validation: must target exact validated origin, never '*'
    const mockOpener = { postMessage: vi.fn() };
    const state = generateOAuthStateNonce();

    const blockedResult = postBridgeResultToOpener(
      mockOpener,
      'https://attacker.example.org',
      {
        type: 'CLINPHARM_DRIVE_OAUTH_SUCCESS',
        accessToken: 'ya29.secret_token_value',
        state,
      }
    );
    expect(blockedResult.ok).toBe(false);
    expect(mockOpener.postMessage).not.toHaveBeenCalled();

    const missingOpenerResult = postBridgeResultToOpener(null, 'https://localhost', {
      type: 'CLINPHARM_DRIVE_OAUTH_SUCCESS',
      accessToken: 'ya29.secret_token_value',
      state,
    });
    expect(missingOpenerResult.ok).toBe(false);
    expect(missingOpenerResult.error).toContain('window.opener');

    const allowedResult = postBridgeResultToOpener(mockOpener, 'https://localhost', {
      type: 'CLINPHARM_DRIVE_OAUTH_SUCCESS',
      accessToken: 'ya29.secret_token_value',
      state,
    });
    expect(allowedResult.ok).toBe(true);
    expect(allowedResult.targetOrigin).toBe('https://localhost');
    expect(mockOpener.postMessage).toHaveBeenCalledTimes(1);
    expect(mockOpener.postMessage).toHaveBeenCalledWith(
      {
        type: 'CLINPHARM_DRIVE_OAUTH_SUCCESS',
        accessToken: 'ya29.secret_token_value',
        state,
      },
      'https://localhost' // Never '*'
    );

    // Parent window incoming MessageEvent validation
    const onSuccess = vi.fn();
    const onError = vi.fn();

    // 1. Rejects message from untrusted origin
    const untrustedAccepted = handleBridgeWindowMessage(
      {
        origin: 'https://evil-attacker.com',
        data: {
          type: 'CLINPHARM_DRIVE_OAUTH_SUCCESS',
          accessToken: 'ya29.forged_token',
          state,
        },
      },
      { expectedState: state, onSuccess, onError }
    );
    expect(untrustedAccepted).toBe(false);
    expect(onSuccess).not.toHaveBeenCalled();

    // 2. Rejects message from valid origin with mismatched state
    const wrongStateAccepted = handleBridgeWindowMessage(
      {
        origin: AUTHORIZED_BRIDGE_ORIGIN,
        data: {
          type: 'CLINPHARM_DRIVE_OAUTH_SUCCESS',
          accessToken: 'ya29.valid_token',
          state: 'wrong-state',
        },
      },
      { expectedState: state, onSuccess, onError }
    );
    expect(wrongStateAccepted).toBe(false);
    expect(onSuccess).not.toHaveBeenCalled();

    // 3. Accepts message from authorized bridge origin with matching state
    expect(isAllowedBridgeProviderOrigin(AUTHORIZED_BRIDGE_ORIGIN)).toBe(true);
    const validAccepted = handleBridgeWindowMessage(
      {
        origin: AUTHORIZED_BRIDGE_ORIGIN,
        data: {
          type: 'CLINPHARM_DRIVE_OAUTH_SUCCESS',
          accessToken: 'ya29.verified_token',
          state,
        },
      },
      { expectedState: state, onSuccess, onError }
    );
    expect(validAccepted).toBe(true);
    expect(onSuccess).toHaveBeenCalledWith('ya29.verified_token');
  });

  // Test 7: اختبار عدم تسريب رموز الوصول أو الأسرار إلى السجلات أو عناوين URL
  it('5. never leaks OAuth access tokens or client secrets into bridge URLs or console logs', () => {
    const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const state = generateOAuthStateNonce();
    const bridgeUrl = buildAuthorizedBridgeUrl('https://localhost', state);

    expect(bridgeUrl).toContain('drive_oauth_bridge=1');
    expect(bridgeUrl).toContain('caller=https%3A%2F%2Flocalhost');
    expect(bridgeUrl).toContain(`state=${encodeURIComponent(state)}`);
    expect(bridgeUrl).not.toMatch(/access_token|ya29\.|client_secret|AIza/i);

    const mockOpener = { postMessage: vi.fn() };
    const sensitiveToken = 'ya29.a0AfH6SM_SUPER_SECRET_ACCESS_TOKEN_999';
    postBridgeResultToOpener(mockOpener, 'https://localhost', {
      type: 'CLINPHARM_DRIVE_OAUTH_SUCCESS',
      accessToken: sensitiveToken,
      state,
    });

    const allLoggedArgs = [
      ...consoleLogSpy.mock.calls.flat(),
      ...consoleErrorSpy.mock.calls.flat(),
    ].join(' ');
    expect(allLoggedArgs).not.toContain(sensitiveToken);
  });

  it('6. recognizes authorized Firebase domains (*.run.app, *.firebaseapp.com, *.web.app) to avoid GIS origin_mismatch (Error 400)', () => {
    expect(
      isAuthorizedFirebaseDomain('ais-dev-sr6y5mqqoromsgvakmmu26-177021215798.europe-west2.run.app')
    ).toBe(true);
    expect(
      isAuthorizedFirebaseDomain('ais-pre-sr6y5mqqoromsgvakmmu26-177021215798.europe-west2.run.app')
    ).toBe(true);
    expect(isAuthorizedFirebaseDomain('gen-lang-client-0487905478.firebaseapp.com')).toBe(true);
    expect(isAuthorizedFirebaseDomain('gen-lang-client-0487905478.web.app')).toBe(true);
    expect(isAuthorizedFirebaseDomain('localhost')).toBe(false);
    expect(isAuthorizedFirebaseDomain('khaledalshormani357-ctrl.github.io')).toBe(false);
  });
});
