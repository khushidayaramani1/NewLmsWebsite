import React, { useState, useEffect, useRef } from 'react';
import { IoMdSend } from "react-icons/io";

const Chat = () => {
  const [userInput, setUserInput] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // ✅ Auto-scroll to bottom whenever messageList changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messageList]);

  const handleSendMessage = async () => {
    if (!userInput.trim() || isLoading) return;

    const currentQuery = userInput;
    setUserInput(""); // Clear input immediately for better UX

    // 1. Add User Message to list
    setMessageList(prev => [...prev, { sender: "user", text: currentQuery }]);
    
    // 2. Start Loading & Fetch
    setIsLoading(true);
    const abortController = new AbortController();
    const timeoutId = setTimeout(() => abortController.abort(), 30000); // 30s timeout

    try {
      const response = await fetch(`http://localhost:8087/chat?question=${encodeURIComponent(currentQuery)}`, {
        signal: abortController.signal
      });
      const data = await response.json();
      
      // 3. Add Bot Message (Assuming your Spring Boot Map returns { "answer": "..." })
      setMessageList(prev => [...prev, { sender: "bot", text: data.answer || "No response received." }]);
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error("Error fetching bot reply:", error);
        setMessageList(prev => [...prev, { sender: "bot", text: "Sorry, I'm having trouble connecting to the server." }]);
      }
    } finally {
      clearTimeout(timeoutId);
      setIsLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md mx-auto bg-white shadow-2xl rounded-2xl h-[600px] flex flex-col border border-gray-100 overflow-hidden'>
      
      {/* ✅ MESSAGES AREA (Scrollable) */}
      <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50' ref={scrollRef}>
        {messageList.map((elem, index) => (
          <div key={index} className={`flex ${elem.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                elem.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
            }`}>
              {elem.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-500 p-2 rounded-lg text-xs animate-pulse">AI is thinking...</div>
          </div>
        )}
      </div>

      {/* ✅ INPUT AREA */}
      <div className='p-4 bg-white border-t border-gray-100'>
        <div className='flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400 transition-all'>
          <input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            type="text"
            className='flex-1 bg-transparent outline-none text-sm h-10'
            placeholder='Ask Gemini something...'
            disabled={isLoading}
          />
          <IoMdSend
            size={24}
            onClick={handleSendMessage}
            className={`${userInput.trim() && !isLoading ? 'text-blue-600 cursor-pointer' : 'text-gray-400'}`}
          />
        </div>
      </div>
    </div>
  );
};

export default Chat;