import SandpackDemo from '@/app/components/SandpackDemo';
import { viewTransitionsHtml, viewTransitionsTs } from './ViewTransitionsCode';

export default function ViewTransitionsDemo() {
  return (
    <SandpackDemo
      template="vanilla-ts"
      editorHeight={520}
      files={{
        'index.html': viewTransitionsHtml,
        'index.ts': viewTransitionsTs,
      }}
    />
  );
}
