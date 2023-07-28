"use client";
import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import ChatWindow from "./components/ChatWindow";
import "./style.css";

interface User {
  id: number;
  name: string;
}

interface Message {
  sender: string;
  receiver: string;
  content: string;
}

const HomePage: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  let socket: WebSocket;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL;

  useEffect(() => {
    fetch(`${apiUrl}/chat/conversations/`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const newUsers = data.results.map((user: any) => ({
          id: user?.receiver_details?.id,
          name: user?.receiver_details?.username,
        }));
        setUsers(newUsers);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedUser) {
      fetch(`${apiUrl}/chat/messages/${selectedUser.id}`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const transformedData = data.results.map((message: any) => ({
            sender: message?.sender_details?.username,
            content: message?.message,
            receiver: message?.receiver_details?.username,
          }));
          setMessages(transformedData);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }, [selectedUser]);

  const handleIncomingMessage = (event: MessageEvent) => {
    const message = JSON.parse(event.data);
    setMessages((prevMessages) => [...prevMessages, message]);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  useEffect(() => {
    socket = new WebSocket(`${socketUrl}/ws/`);

    socket.addEventListener("open", () => {
      console.log("WebSocket connection established");
    });

    socket.addEventListener("message", handleIncomingMessage);

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className="chat-app">
      {/* <h1 className="app-title">Chat Application</h1> */}
      <UserList
        users={users}
        onUserSelect={handleUserSelect}
        selectedUser={selectedUser}
      />
      <ChatWindow messages={messages} userId={selectedUser?.id ?? 0} />
    </div>
  );
};

export default HomePage;
