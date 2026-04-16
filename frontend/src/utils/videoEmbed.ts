import { mediaUrl } from './mediaUrl';

export type VideoBlock =
  | { kind: 'iframe'; src: string }
  | { kind: 'video'; src: string }
  | { kind: 'link'; href: string };

/** Transforme une URL YouTube / Vimeo / fichier en iframe, balise video ou lien externe. */
export function parseVideoUrl(raw: string): VideoBlock {
  const t = String(raw).trim();
  if (!t) {
    return { kind: 'link', href: '#' };
  }
  if (/^https?:\/\//i.test(t)) {
    const ytEmbed = t.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i);
    if (ytEmbed) {
      return {
        kind: 'iframe',
        src: `https://www.youtube.com/embed/${ytEmbed[1]}?rel=0`,
      };
    }
    const ytWatch = t.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    const ytShort = t.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    const id = ytWatch?.[1] ?? ytShort?.[1];
    if (id) {
      return {
        kind: 'iframe',
        src: `https://www.youtube.com/embed/${id}?rel=0`,
      };
    }
    const vm = t.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (vm) {
      return {
        kind: 'iframe',
        src: `https://player.vimeo.com/video/${vm[1]}`,
      };
    }
    if (/\.(mp4|webm|mov)(\?|$)/i.test(t)) {
      return { kind: 'video', src: t };
    }
    return { kind: 'link', href: t };
  }
  const local = mediaUrl(t);
  if (/\.(mp4|webm|mov)(\?|$)/i.test(local)) {
    return { kind: 'video', src: local };
  }
  return { kind: 'link', href: local };
}
