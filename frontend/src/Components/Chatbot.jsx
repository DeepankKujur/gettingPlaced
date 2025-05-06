import React, { useState, useContext } from "react";
import { MessageCircle, X } from "lucide-react";
import { Context } from "../main.jsx";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { isAuthorized, user } = useContext(Context);

  const API_KEY = "AIzaSyDvvdqVBlH0m8R_awO-336aaD1nn3SwKOQ";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const generateBotResponse = async () => {
    let roleInfo = "";

    if (isAuthorized && user?.role) {
      roleInfo = `The user is logged in as a "${user.role}". You should tailor your response to suit a ${user.role}.`;
    } else {
      roleInfo = `The user is not logged in. Provide general guidance for both job seekers and employers.`;
    }

    const context = `
      You are an intelligent assistant for the website "Getting Placed" (https://gettingplaced.netlify.app),
      a role-based job platform connecting job seekers and employers.

      ${roleInfo}

      ### Platform Features:

      **For Job Seekers:**
      - View all job listings
      - Search by title or category
      - Apply to jobs

      **For Employers:**
      - Post new jobs
      - Manage listings (edit/delete)
      - Schedule interviews (Zoom API)
      - Send interview invites (Nodemailer)
    `;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: context }] },
          { role: "user", parts: [{ text: input }] },
        ],
      }),
    };

    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error?.message || "API error");

      setMessages((prev) => [
        ...prev,
        { text: data.candidates[0].content.parts[0].text, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, I couldn't respond. Please try again.", sender: "bot" },
      ]);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    generateBotResponse();
    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!isChatOpen && (
        <button
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle size={28} />
        </button>
      )}

      {isChatOpen && (
        <div className="w-80 max-w-[90vw] h-[500px] flex flex-col bg-white shadow-xl rounded-lg fixed bottom-20 right-5">
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center rounded-t-lg">
            <h2 className="text-base font-semibold">Chat With Me</h2>
            <button onClick={() => setIsChatOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="flex-grow overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] break-words ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto text-right"
                    : "bg-gray-200 text-black mr-auto text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t border-gray-300 p-2 gap-2">
            <input
              type="text"
              className="flex-grow border border-gray-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              className="bg-blue-500 text-white px-4 rounded-lg hover:bg-blue-600 transition"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
