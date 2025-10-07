import { useState } from "react";
import { MessageCircle } from "lucide-react"; // optional icon
import data from "./data.json";

function SupportChat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false); // controls chat visibility

  const openChat = () => {
    setMessages([{ sender: "support", text: "Hello! Welcome to our support chat. How can I help you today?" }]);
    setIsOpen(true);
  };

  const sendMessage = () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "student", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const lowerCaseInput = userMessage.text.toLowerCase();
      const matchedTrigger = data.triggers.find(trigger =>
        trigger.trigger.some(t => lowerCaseInput.includes(t.toLowerCase()))
      );

      const supportReply = {
        sender: "support",
        text: matchedTrigger ? matchedTrigger.response : data.defaultResponse,
      };
      setMessages((prev) => [...prev, supportReply]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 bg-white shadow-xl rounded-lg flex flex-col border"
          style={{ width: "400px", height: "550px" }} // MEDIUM SIZE ADDED
        >
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 rounded-t-lg font-semibold flex justify-between">
            💬 Support Chat
            <button onClick={() => setIsOpen(false)} className="text-sm">
              ✖
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto" style={{ height: "400px" }}>
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "student"
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-gray-800 mr-auto"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t p-2">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 px-3 py-2 outline-none border rounded-l"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 text-white px-4 py-2 rounded-r hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
} 
export default SupportChat;