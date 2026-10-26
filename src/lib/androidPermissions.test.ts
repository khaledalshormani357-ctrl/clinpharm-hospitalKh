import { describe, it, expect } from 'vitest';
import {
  checkAllAndroidPermissions,
  requestAllAndroidPermissions,
  formatBytes
} from './androidPermissions';

describe('Android Permissions & Capabilities Engine', () => {
  it('returns all 7 required Android permission categories with manifest declarations', async () => {
    const items = await checkAllAndroidPermissions();
    expect(items.length).toBe(7);

    const ids = items.map(i => i.id);
    expect(ids).toContain('internet_network');
    expect(ids).toContain('files_storage');
    expect(ids).toContain('pdf_printing');
    expect(ids).toContain('file_sharing');
    expect(ids).toContain('notifications');
    expect(ids).toContain('clipboard');
    expect(ids).toContain('wake_lock');

    const allManifestPerms = items.flatMap(i => i.manifestPermissions).join(' ');
    expect(allManifestPerms).toContain('android.permission.INTERNET');
    expect(allManifestPerms).toContain('android.permission.READ_EXTERNAL_STORAGE');
    expect(allManifestPerms).toContain('android.permission.WRITE_EXTERNAL_STORAGE');
    expect(allManifestPerms).toContain('android.permission.MANAGE_EXTERNAL_STORAGE');
    expect(allManifestPerms).toContain('android.intent.action.PRINT');
    expect(allManifestPerms).toContain('androidx.core.content.FileProvider');
  });

  it('activates and persists Android permissions state via requestAllAndroidPermissions', async () => {
    const result = await requestAllAndroidPermissions();
    expect(result.success).toBe(true);
    expect(result.items.length).toBe(7);
  });

  it('formats storage quota bytes accurately', () => {
    expect(formatBytes(0)).toBe('0 MB');
    expect(formatBytes(10 * 1024 * 1024)).toBe('10.0 MB');
  });
});
