import { useState, useEffect } from "react";

const Customer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "support",
      text: "Welcome to our site 👋. Ask me anything, I’ll try to help!",
    },
  ]);
  const [input, setInput] = useState("");
  const [replies, setReplies] = useState([]);

  // Load predefined replies from JSON
  useEffect(() => {
    fetch("Data/supportData.json")
      .then((res) => res.json())
      .then((data) => setReplies(data));
  }, []);

  const handleSend = () => {
    if (input.trim() === "") return;

    // Add user's message
    setMessages((prev) => [...prev, { sender: "user", text: input }]);

    // Find a matching reply
    const found = replies.find(
      (r) => r.question.toLowerCase() === input.trim().toLowerCase()
    );

    // Add support reply after short delay
    setTimeout(() => {
      if (found) {
        setMessages((prev) => [
          ...prev,
          { sender: "support", text: found.answer },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "support",
            text: "Please go through Contact page and contact us",
          },
        ]);
      }
    }, 800);

    setInput("");
  };

  return (
    <div className="fixed bottom-5 right-5 flex flex-col items-end space-y-3">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 h-[400px] bg-white shadow-lg rounded-lg overflow-hidden border border-gray-300 flex flex-col">
          {/* Header */}
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
            <span className="font-semibold">Customer Support</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-3 flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-lg text-sm max-w-[70%] ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1 px-3 py-2 text-sm outline-none"
              placeholder="Write a reply..."
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 hover:bg-blue-700"
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Floating Button */}
      {!isOpen && (
        <div
          onClick={() => setIsOpen(true)}
          className="cursor-pointer relative flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
        >
          <span className="absolute -top-7 -left-10 text-sm font-bold text-blue-600 bg-white rounded-full px-2 py-1 shadow">
            We Are Here! 👋
          </span>
          <span className="text-white text-2xl">💬</span>
        </div>
      )}
    </div>
  );
};

export default Customer;
