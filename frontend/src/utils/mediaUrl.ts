/**
 * Resolves image/video paths from the API/DB to a browser URL.
 * - http(s) URLs are returned unchanged (e.g. Unsplash, YouTube).
 * - Filenames are served at /static/img/... (Vite public/ + Nest useStaticAssets).
 */
export function mediaUrl(path: string | undefined | null): string {
  if (path == null || path === '') return '';
  const raw = String(path).trim();
  if (raw === '' || raw.toLowerCase() === 'null' || raw.toLowerCase() === 'undefined') {
    return '';
  }
  if (/^https?:\/\//i.test(raw)) return raw;
  let clean = raw.replace(/^\/+/, '');
  if (/^(static\/)?videos\//i.test(clean)) {
    clean = clean.replace(/^static\//i, '').replace(/^videos\//i, '');
    const segments = clean.split('/').filter(Boolean).map((s) => encodeURIComponent(s));
    return `/static/videos/${segments.join('/')}`;
  }
  clean = clean.replace(/^(static\/)?img\//, '');
  const segments = clean.split('/').filter(Boolean).map((s) => encodeURIComponent(s));
  return `/static/img/${segments.join('/')}`;
}
