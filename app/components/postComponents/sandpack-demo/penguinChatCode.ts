import { readFileSync } from 'fs';
import { join } from 'path';

function getComponentCode() {
  const componentPath = join(
    process.cwd(),
    'app/components/postComponents/sandpack-demo/PenguinChat.tsx'
  );
  const stylesPath = join(
    process.cwd(),
    'app/components/postComponents/sandpack-demo/PenguinChat.css'
  );

  const componentCode = readFileSync(componentPath, 'utf-8');
  const stylesCode = readFileSync(stylesPath, 'utf-8');

  // Clean up the component code for Sandpack (remove 'use client' and adjust import)
  const cleanComponentCode = componentCode
    .replace("'use client';\n\n", '')
    .replace("import './PenguinChat.css';", "import './PenguinChat.css';");

  return {
    componentCode: cleanComponentCode,
    stylesCode,
  };
}

const { componentCode, stylesCode } = getComponentCode();

export const penguinChatCode = componentCode;
export const penguinChatStyles = stylesCode;
