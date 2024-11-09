import React, { useState, useEffect } from "react";
import axios from "axios";

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<string[]>([]);

  // Ensure CSRF Token is set
  useEffect(() => {
    const csrfToken = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute("content");
    if (csrfToken) {
      axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken; // Set CSRF token for all requests
    }

    // Optionally get CSRF token if using Sanctum
    axios.get("/sanctum/csrf-cookie").then((response) => {
      console.log("CSRF token set");
    });
  }, []);

  const sendMessageToChatbot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() === "") return;

    setChatHistory((prev) => [...prev, `You: ${message}`]);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_CHATBOT_URL}/chatbot`,
        { message },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Send cookies with the request
        }
      );

      const botResponse = response.data.response;
      setChatHistory((prev) => [...prev, `Assistant: ${botResponse}`]);
    } catch (error) {
      console.error("Error:", error);
      setChatHistory((prev) => [
        ...prev,
        "Assistant: Sorry, I encountered an error.",
      ]);
    } finally {
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-[400px] max-w-full bg-white rounded-lg shadow">
      <div className="bg-gray-100 p-4 rounded-t-lg">
        <h2 className="text-lg font-semibold text-gray-800">AI Assistant</h2>
      </div>

      <div
        className="flex-1 p-4 overflow-y-auto space-y-4"
        style={{ maxHeight: "300px" }}
      >
        {chatHistory.map((msg, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg ${
              msg.startsWith("You:")
                ? "bg-blue-100 ml-auto max-w-[80%]"
                : "bg-gray-100 mr-auto max-w-[80%]"
            }`}
          >
            <p className="text-sm">{msg}</p>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessageToChatbot} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chatbot;
