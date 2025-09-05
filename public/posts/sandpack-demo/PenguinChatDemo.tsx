import SandpackDemo from '@/app/components/SandpackDemo';
import { penguinChatCode, penguinChatStyles } from './penguinChatCode';

export default function PenguinChatDemo() {
  return (
    <SandpackDemo
      files={{
        'App.tsx': penguinChatCode,
        'PenguinChat.css': penguinChatStyles,
      }}
    />
  );
}
