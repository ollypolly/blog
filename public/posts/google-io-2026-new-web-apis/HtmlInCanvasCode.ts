import { readFileSync } from 'fs';
import { join } from 'path';

const base = join(process.cwd(), 'public/posts/google-io-2026-new-web-apis');

export const htmlInCanvasHtml = readFileSync(join(base, 'HtmlInCanvas.html'), 'utf-8');
export const htmlInCanvasTs = readFileSync(join(base, 'HtmlInCanvas.ts'), 'utf-8');
