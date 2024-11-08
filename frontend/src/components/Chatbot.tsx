import React, { useState } from 'react';
import axios from 'axios';

const Chatbot: React.FC = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<string[]>([]);

    // Load CSRF token from your meta tags (if needed for Laravel's CSRF protection)
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    const sendMessageToChatbot = async () => {
        if (message.trim() === "") return; // Prevent empty messages

        // Add user message to chat
        setChatHistory(prev => [...prev, `User: ${message}`]);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_CHATBOT_URL}/chatbot`, // Full API endpoint URL
                { message },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRF-TOKEN': csrfToken, // CSRF token for Laravel, if required
                    },
                }
            );

            // Extract chatbot response and update chat history
            const botResponse = response.data.response;
            setChatHistory(prev => [...prev, `Bot: ${botResponse}`]);
        } catch (error) {
            console.error('Error:', error);
            setChatHistory(prev => [...prev, 'Bot: An error occurred.']);
        } finally {
            setMessage('');
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        sendMessageToChatbot();
    };

    return (
        <div>
            <div id="chat-window">
                {chatHistory.map((msg, idx) => (
                    <p key={idx}>{msg}</p>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Chatbot;