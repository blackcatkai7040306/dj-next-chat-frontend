import React, { useState, useRef, useEffect, ChangeEvent, KeyboardEvent } from "react";

interface Message {
  sender: string;
  content: string;
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>(messages);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const updatedMessages = [
        ...chatMessages,
        { sender: "User 1", content: newMessage },
      ];
      setNewMessage("");
      setChatMessages(updatedMessages);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [chatMessages]);

  return (
    <div className="chat-window">
      <div className="message-container" ref={chatWindowRef}>
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === "User 1" ? "sent" : "received"}`}
          >
            <div className="message-content">{message.content}</div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={newMessage}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatWindow;
