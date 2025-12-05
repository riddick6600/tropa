// Hardcoded base path to match next.config.ts
const BASE_PATH = '/tropa';

export function getAssetPath(path: string): string {
    // If the path is absolute (external), return it as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Ensure path starts with /
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    // If running in development (no base path usually unless configured, but for safety)
    // or if we rely on next.config.ts, we should be consistent.
    // However, simplest fix for GH Pages static export is to just prepend the string.

    return `${BASE_PATH}${normalizedPath}`;
}
