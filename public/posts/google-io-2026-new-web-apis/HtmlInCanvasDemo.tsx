import SandpackDemo from '@/app/components/SandpackDemo';
import { htmlInCanvasHtml, htmlInCanvasTs } from './HtmlInCanvasCode';

export default function HtmlInCanvasDemo() {
  return (
    <SandpackDemo
      template="vanilla-ts"
      editorHeight={500}
      files={{
        'index.html': htmlInCanvasHtml,
        'index.ts': htmlInCanvasTs,
      }}
    />
  );
}
