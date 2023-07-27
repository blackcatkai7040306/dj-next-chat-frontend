"use client";
import React, { useState } from 'react';
import UserList from './components/UserList';
import ChatWindow from './components/ChatWindow';
import './style.css'

const users = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
];

const initialMessages = [
  { sender: 'User 1', content: 'Hello!' },
  { sender: 'User 2', content: 'Hi!' },
];

const HomePage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState(initialMessages);

  const handleUserSelect = user => {
    setSelectedUser(user);
  };

  return (
    <div className="chat-app">
      {/* <h1 className="app-title">Chat Application</h1> */}
      <UserList users={users} onUserSelect={handleUserSelect} selectedUser={selectedUser} />
      <ChatWindow messages={messages} />
    </div>
  );
};

export default HomePage;
