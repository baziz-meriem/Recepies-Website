import { mediaUrl } from '../utils/mediaUrl';

/** Demo: deployed API (Render). No trailing slash. */
const base = 'https://recepies-website.onrender.com';

export async function apiGet<T>(
  path: string,
  token?: string | null,
): Promise<T> {
  const headers: Record<string, string> = { Accept: 'application/json' };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${base}${path}`, {
    credentials: 'include',
    headers,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || res.statusText);
  }
  return res.json() as Promise<T>;
}

export async function apiPost<T>(
  path: string,
  body: unknown,
  token?: string | null,
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    credentials: 'include',
    headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    let msg = res.statusText;
    try {
      const j = await res.json();
      msg = j.message ?? JSON.stringify(j);
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  return res.json() as Promise<T>;
}

export async function apiPatch<T>(
  path: string,
  body: unknown,
  token: string,
): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json() as Promise<T>;
}

export async function apiDelete(path: string, token: string): Promise<void> {
  const res = await fetch(`${base}${path}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
}

export type UploadImageResponse = { path: string; url: string };

export type UploadVideoResponse = { path: string; url: string };

/** Upload an image (JPEG, PNG, WebP, GIF, max ~5 Mo). Requires JWT. */
export async function apiUploadImage(
  file: File,
  token: string,
): Promise<UploadImageResponse> {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(`${base}/api/uploads/image`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: fd,
  });
  if (!res.ok) {
    let msg = res.statusText;
    try {
      const j = (await res.json()) as { message?: string | string[] };
      if (typeof j.message === 'string') msg = j.message;
      else if (Array.isArray(j.message)) msg = j.message.join(', ');
    } catch {
      try {
        msg = await res.text();
      } catch {
        /* ignore */
      }
    }
    throw new Error(msg);
  }
  return res.json() as Promise<UploadImageResponse>;
}

/** Upload a video file (MP4, WebM, MOV, max ~80 Mo). Requires JWT. */
export async function apiUploadVideo(
  file: File,
  token: string,
): Promise<UploadVideoResponse> {
  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch(`${base}/api/uploads/video`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: fd,
  });
  if (!res.ok) {
    let msg = res.statusText;
    try {
      const j = (await res.json()) as { message?: string | string[] };
      if (typeof j.message === 'string') msg = j.message;
      else if (Array.isArray(j.message)) msg = j.message.join(', ');
    } catch {
      try {
        msg = await res.text();
      } catch {
        /* ignore */
      }
    }
    throw new Error(msg);
  }
  return res.json() as Promise<UploadVideoResponse>;
}

/** Absolute URL for `/static/...` paths using the demo API origin. */
export function staticUrl(path: string): string {
  const m = mediaUrl(path);
  if (!m || /^https?:\/\//i.test(m)) return m;
  const b = base.replace(/\/$/, '');
  return b ? `${b}${m}` : m;
}

/** Vignettes recettes (externe inchangé, sinon `/static/...` sur l’API demo). */
export function recipeImageUrl(image: string | undefined | null): string {
  const m = mediaUrl(image);
  const path = m || '/static/img/placeholder-recipe.svg';
  if (/^https?:\/\//i.test(path)) return path;
  const b = base.replace(/\/$/, '');
  return b ? `${b}${path}` : path;
}
