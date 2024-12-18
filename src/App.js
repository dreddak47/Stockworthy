import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const ChatBot = () => {
  const [messages, setMessages] = useState([]); // Array of chat messages
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === "") return; // Do nothing if input is empty

    // Add user message to chat
    const userMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput(""); 
    setLoading(true); // Show loading indicator
    try {
      // Send the user message to the backend
      const response = await axios.post("https://9a2a-34-32-203-204.ngrok-free.app/chat", { query: input });
      const formattedResponse = response.data.response.replace(/(\[[^\]]+\]):/g, "$1:\n");
      // Add bot response to chat
      const botMessage = { sender: "bot", text: formattedResponse  };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      // Add error message to chat
      const errorMessage = { sender: "bot", text: "Error: Unable to get a response from the server." };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }finally {
      setLoading(false); // Hide loading indicator
    }

  };

  return (
    <div>
    
    <div className="chat-container">
    <h1 class="heading">StockWorthy</h1>
    <h2 class="sub-heading">Your Personalized StockAdvisor!</h2>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div className={`message ${msg.sender === "user" ? "user-message" : "bot-message"}`}>
          {msg.text.split("\n").map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>
        ))}
        {loading && <div className="loading-message"><h2>Thinking...</h2></div>}
      </div>
      <div className="input-box">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
    </div>
  );
};

export default ChatBot;

