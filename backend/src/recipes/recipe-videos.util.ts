import type { Recette } from '../entities/recette.entity';

/** Fusionne l’ancien champ `video` et le tableau `videos` (sans doublons, ordre conservé). */
export function mergeRecipeVideoUrls(r: Recette): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  const push = (s: string | undefined | null) => {
    const t = s?.trim();
    if (!t || seen.has(t)) return;
    seen.add(t);
    out.push(t);
  };
  for (const x of r.videos ?? []) {
    push(x);
  }
  push(r.video);
  return out;
}
