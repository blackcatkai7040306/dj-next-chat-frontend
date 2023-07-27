import React, { useState, useRef, useEffect } from "react";

const ChatWindow = ({ messages }) => {
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState(messages);
  const chatWindowRef = useRef(null);

  const handleInputChange = (event) => {
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

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [chatMessages]);

  return (
    <div className="chat-window">
      <div className="message-container" ref={chatWindowRef}>
        {chatMessages.map((message, index) => (
          <div
            key={index}
            className={`message ${
              message.sender === "User 1" ? "sent" : "received"
            }`}
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
