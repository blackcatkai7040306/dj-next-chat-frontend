import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  KeyboardEvent,
} from "react";

interface Message {
  sender: string;
  receiver: string;
  content: string;
}

interface ChatWindowProps {
  messages: Message[];
  userId: number;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, userId }) => {
  console.log(messages)
  const [newMessage, setNewMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      const updatedMessages = [
        ...chatMessages,
        { sender: localStorage.getItem("username"), content: newMessage },
      ];
      setNewMessage("");
      setChatMessages(updatedMessages);

      // Send POST request to the API
      fetch("http://localhost:8000/v1/chat/messages/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          message: newMessage,
          receiver: userId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Message sent successfully:", data);
        })
        .catch((error) => {
          console.error("Error sending message:", error);
        });
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    setChatMessages(messages);
  }, [messages]);

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
            className={`message ${
              message.sender === localStorage.getItem("username")
                ? "sent"
                : "received"
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
