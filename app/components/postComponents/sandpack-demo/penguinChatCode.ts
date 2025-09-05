export const penguinChatCode = `'use client';

import React, { useState } from 'react';
import './PenguinChat.css';

interface Message {
  id: number;
  username: string;
  text: string;
  timestamp: Date;
}

export default function PenguinChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      username: 'Penguin123',
      text: 'Hey everyone!',
      timestamp: new Date(),
    },
    {
      id: 2,
      username: 'IceBreaker',
      text: 'Anyone want to play Find Four?',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      username: 'You',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h3>🐧 Penguin Chat</h3>
        <span className="room-info">Plaza</span>
      </div>

      <div className="messages">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <span className="username">{message.username}:</span>
            <span className="text">{message.text}</span>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          maxLength={100}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}`

export const penguinChatStyles = `.chat-container {
  max-width: 400px;
  margin: 0 auto;
  border: 2px solid #0066cc;
  border-radius: 12px;
  overflow: hidden;
  background: linear-gradient(135deg, #e6f3ff 0%, #cce7ff 100%);
  font-family: 'Arial', sans-serif;
}

.chat-header {
  background: #0066cc;
  color: white;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-header h3 {
  margin: 0;
  font-size: 16px;
}

.room-info {
  font-size: 14px;
  opacity: 0.9;
}

.messages {
  height: 200px;
  overflow-y: auto;
  padding: 12px;
  background: white;
}

.message {
  margin-bottom: 8px;
  word-wrap: break-word;
}

.username {
  font-weight: bold;
  color: #0066cc;
  margin-right: 6px;
}

.text {
  color: #333;
}

.input-area {
  display: flex;
  padding: 12px;
  background: #f0f8ff;
  border-top: 1px solid #cce7ff;
}

.input-area input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #cce7ff;
  border-radius: 20px;
  outline: none;
  font-size: 14px;
}

.input-area input:focus {
  border-color: #0066cc;
}

.input-area button {
  margin-left: 8px;
  padding: 8px 16px;
  background: #0066cc;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.input-area button:hover {
  background: #0052a3;
}

.input-area button:disabled {
  background: #ccc;
  cursor: not-allowed;
}`