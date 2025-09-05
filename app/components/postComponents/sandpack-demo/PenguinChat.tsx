'use client';

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
}
