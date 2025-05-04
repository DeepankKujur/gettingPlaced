import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false); // State for toggling chatbox

  const API_KEY = "AIzaSyDvvdqVBlH0m8R_awO-336aaD1nn3SwKOQ";
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

  const generateBotResponse = async () => {
    const context = `
      You are an intelligent assistant for the website "Getting Placed" (https://gettingplaced.netlify.app), 
      a role-based job platform connecting job seekers and employers.
  
      ### For Job Seekers:
      - Can view all available job listings up to date.
      - Can search for jobs by title or category.
      - Can apply to jobs directly through the platform.
      
      ### For Employers:
      - Can view and search all job listings.
      - Can post new job opportunities.
      - Can view, update, and delete their posted jobs (CRUD operations).
      - Can schedule interviews with applicants using Zoom API.
      - Can send interview invites via email using Nodemailer.
  
      When responding, focus on guiding users based on their role (job seeker or employer) and your knowledge of the site's features. Only respond with what's relevant to the platform.
    `;
  
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          { role: "user", parts: [{ text: context }] },
          { role: "user", parts: [{ text: input }] }
        ]
      }),
    };
  
    try {
      const response = await fetch(API_URL, requestOptions);
      const data = await response.json();
  
      if (!response.ok) throw new Error(data.error.message);
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.candidates[0].content.parts[0].text, sender: "bot" },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
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
      {/* Chat Icon */}
      {!isChatOpen && (
        <button
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
          onClick={() => setIsChatOpen(true)}
        >
          <MessageCircle size={40} />
        </button>
      )}

      {/* Chatbox */}
      {isChatOpen && (
        <div className="w-80 h-96 flex flex-col bg-white shadow-lg rounded-lg fixed bottom-16 right-5">
          {/* Header */}
          <div className="bg-blue-500 text-white p-3 flex justify-between items-center rounded-t-lg ">
            <h2 className="text-lg font-semibold ">Chat With Me</h2>
            <button onClick={() => setIsChatOpen(false)}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-grow overflow-y-auto p-3 flex flex-col">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 my-1 rounded-md max-w-[80%] ${
                  msg.sender === "user"
                    ? "bg-blue-500 text-white ml-auto text-right"
                    : "bg-gray-300 text-black mr-auto text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex gap-2 border-t p-2">
            <input
              type="text"
              className="flex-grow border p-2 rounded-l-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
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
