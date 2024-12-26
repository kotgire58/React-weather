import React, { useState } from 'react';
import axios from 'axios';

const ChatbotComponent = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      role: 'user',
      parts: [{ text: 'Hello' }],
    },
    {
      role: 'model',
      parts: [{ text: 'Great to meet you. What would you like to know?' }],
    },
  ]);

  const apiKey = 'AIzaSyAFnKTxZKhK6MnFtzhKsLry6G7vhkh3dik'; // Environment variable

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = {
      role: 'user',
      parts: [{ text: inputText }],
    };

    // Add user message to chat history
    const updatedChatHistory = [...chatHistory, userMessage];
    setChatHistory(updatedChatHistory);

    try {
      const response = await axios.post(
        'https://generativeai.googleapis.com/v1beta2/models/gemini-1.5-flash:generateText', // Google API endpoint for Gemini
        {
          prompt: inputText, // User input as prompt
          temperature: 0.7,  // Creativity
          maxOutputTokens: 150, // Max response tokens
          chatHistory: updatedChatHistory, // Send previous chat context
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`, // Authentication with Bearer token
            'Content-Type': 'application/json',
          },
        }
      );

      // Get the response text from the model
      const modelResponseText = response.data.generatedText;

      // Add model response to chat history
      setChatHistory([
        ...updatedChatHistory,
        {
          role: 'model',
          parts: [{ text: modelResponseText }],
        },
      ]);

      setResponseText(modelResponseText);
    } catch (error) {
      console.error('Error generating response:', error);
      setResponseText('Sorry, there was an error processing your request.');
    }

    setInputText(''); // Clear input field
  };

  return (
    <div>
      <h1>Simple Chatbot</h1>
      <div>
        {chatHistory.map((message, index) => (
          <div key={index}>
            <strong>{message.role === 'user' ? 'You' : 'Bot'}:</strong>
            <p>{message.parts[0].text}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask something..."
        />
        <button type="submit">Send</button>
      </form>

      <div>
        {responseText && <p><strong>Bot:</strong> {responseText}</p>}
      </div>
    </div>
  );
};

export default ChatbotComponent;
