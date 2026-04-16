import { existsSync } from 'fs';
import { join } from 'path';

/**
 * Monorepo `assets/` at repository root. Walks up from `__dirname` until a
 * directory named `assets` is found (works from any `dist/**` path depth).
 */
export function resolveAssetsRoot(): string {
  let dir = __dirname;
  for (let i = 0; i < 12; i++) {
    const candidate = join(dir, 'assets');
    if (existsSync(candidate)) {
      return candidate;
    }
    const parent = join(dir, '..');
    if (parent === dir) {
      break;
    }
    dir = parent;
  }
  return join(__dirname, '..', '..', '..', 'assets');
}
