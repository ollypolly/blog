import { readFileSync } from 'fs';
import { join } from 'path';

const base = join(process.cwd(), 'public/posts/google-io-2026-new-web-apis');

export const viewTransitionsHtml = readFileSync(join(base, 'ViewTransitions.html'), 'utf-8');
export const viewTransitionsTs = readFileSync(join(base, 'ViewTransitions.ts'), 'utf-8');
