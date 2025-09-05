'use client'

import { Sandpack } from '@codesandbox/sandpack-react'
import { penguinChatCode, penguinChatStyles } from './penguinChatCode'

export default function PenguinChatDemo() {
  return (
    <Sandpack
      template="react-ts"
      files={{
        'App.tsx': penguinChatCode,
        'PenguinChat.css': penguinChatStyles
      }}
      options={{
        showNavigator: false,
        showTabs: true,
        showLineNumbers: true,
        editorHeight: 400
      }}
      theme="light"
    />
  )
}