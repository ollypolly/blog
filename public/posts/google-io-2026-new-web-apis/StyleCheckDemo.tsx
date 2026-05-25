import SandpackDemo from '@/app/components/SandpackDemo';
import { styleCheckTs } from './StyleCheckCode';

export default function StyleCheckDemo() {
  return (
    <SandpackDemo
      template="vanilla-ts"
      editorHeight={220}
      editorWidthPercentage={100}
      showTabs={false}
      files={{ 'index.ts': styleCheckTs }}
    />
  );
}
