"use client";
import React, { useState } from 'react';
import UserList from './components/UserList';
import ChatWindow from './components/ChatWindow';
import './style.css';

interface User {
  id: number;
  name: string;
}

const users: User[] = [
  { id: 1, name: 'User 1' },
  { id: 2, name: 'User 2' },
];

interface Message {
  sender: string;
  content: string;
}

const initialMessages: Message[] = [
  { sender: 'User 1', content: 'Hello!' },
  { sender: 'User 2', content: 'Hi!' },
];

const HomePage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);

  const handleUserSelect = (user: User) => {
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
