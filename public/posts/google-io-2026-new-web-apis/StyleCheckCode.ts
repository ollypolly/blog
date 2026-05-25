import { readFileSync } from 'fs';
import { join } from 'path';

const base = join(process.cwd(), 'public/posts/google-io-2026-new-web-apis');

export const styleCheckTs = readFileSync(join(base, 'StyleCheck.ts'), 'utf-8');
