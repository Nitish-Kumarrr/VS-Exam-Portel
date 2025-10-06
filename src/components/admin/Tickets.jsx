import { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, X, CheckCircle, Paperclip, FileText, Download } from "lucide-react";

export default function Tickets() {
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: "Billing Issue",
      category: "Billing",
      priority: "High",
      status: "Open",
      createdAt: "28 Sep 2025, 09:15 AM",
      messages: [
        { sender: "Admin", text: "I was overcharged on my last invoice.", time: "09:15 AM", attachments: [] },
        { sender: "Super Admin", text: "We’ll check and get back to you.", time: "09:20 AM", attachments: [] },
      ],
    },
    {
      id: 2,
      subject: "Exam Analytics Bug",
      category: "Technical",
      priority: "Medium",
      status: "Closed",
      createdAt: "27 Sep 2025, 02:30 PM",
      messages: [
        { sender: "Admin", text: "Analytics graph not loading.", time: "02:30 PM", attachments: [] },
        { sender: "Super Admin", text: "Fixed now, please try again.", time: "03:00 PM", attachments: [] },
      ],
    },
  ]);

  const [activeTicket, setActiveTicket] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [newAttachments, setNewAttachments] = useState([]);
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [ticketData, setTicketData] = useState({
    subject: "",
    description: "",
    category: "General",
    priority: "Low",
    attachments: [],
  });
  const [ticketSuccess, setTicketSuccess] = useState(false);
  const [modalAttachment, setModalAttachment] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [activeTicket, tickets]);

  const handleRaiseTicket = (e) => {
    e.preventDefault();
    const newTicket = {
      id: Date.now(),
      subject: ticketData.subject,
      category: ticketData.category,
      priority: ticketData.priority,
      status: "Open",
      createdAt: new Date().toLocaleString([], { hour12: true }),
      messages: [
        {
          sender: "Admin",
          text: ticketData.description,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          attachments: ticketData.attachments,
        },
      ],
    };
    const updatedTickets = [newTicket, ...tickets];
    setTickets(updatedTickets);
    setTicketSuccess(true);
    setTimeout(() => {
      setTicketSuccess(false);
      setShowRaiseModal(false);
      setTicketData({ subject: "", description: "", category: "General", priority: "Low", attachments: [] });
      setActiveTicket(newTicket);
    }, 2000);
  };

  const sendMessage = () => {
    if (!newMessage.trim() && newAttachments.length === 0) return;
    const updatedTickets = tickets.map((t) =>
      t.id === activeTicket.id
        ? {
            ...t,
            messages: [
              ...t.messages,
              {
                sender: "Admin",
                text: newMessage,
                time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                attachments: newAttachments,
              },
            ],
          }
        : t
    );
    setTickets(updatedTickets);
    setActiveTicket(updatedTickets.find((t) => t.id === activeTicket.id));
    setNewMessage("");
    setNewAttachments([]);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleAttachmentChange = (e, type = "chat") => {
    const files = Array.from(e.target.files);
    if (type === "chat") setNewAttachments(files);
    else setTicketData({ ...ticketData, attachments: files });
  };

  const renderAttachment = (file) => {
    const isImage = file.type.startsWith("image/");
    const isPDF = file.type === "application/pdf";

    const handleClick = () => setModalAttachment(file);

    return (
      <div
        key={file.name}
        onClick={handleClick}
        className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md my-1 shadow-sm cursor-pointer hover:bg-gray-200 transition"
      >
        {isImage ? (
          <img src={URL.createObjectURL(file)} alt={file.name} className="w-16 h-16 object-cover rounded-md" />
        ) : (
          <FileText size={20} />
        )}
        <span className="truncate">{file.name}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col md:flex-row h-[85vh] bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 border-r bg-white flex flex-col">
        <div className="flex justify-between items-center p-4 border-b bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-xl font-bold text-gray-700">Support Tickets</h2>
          <button
            onClick={() => setShowRaiseModal(true)}
            className="px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm rounded-lg shadow hover:shadow-lg transition"
          >
            + Raise Ticket
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {tickets.length === 0 ? (
            <div className="text-gray-400 text-center mt-4">No tickets yet. Raise a new ticket!</div>
          ) : (
            tickets.map((ticket) => (
              <div
                key={ticket.id}
                onClick={() => setActiveTicket(ticket)}
                className={`cursor-pointer p-3 rounded-xl border transition hover:shadow-md ${
                  activeTicket?.id === ticket.id
                    ? "bg-blue-50 border-blue-300 shadow-md"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="font-semibold text-gray-800">{ticket.subject}</div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>{ticket.category}</span>
                  <span>{ticket.priority}</span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      ticket.status === "Open" ? "bg-green-100 text-green-600" : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {ticket.status}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">{ticket.createdAt}</div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col bg-white">
        {activeTicket ? (
          <>
            <div className="p-4 border-b flex justify-between items-center bg-gradient-to-r from-blue-50 to-purple-50 shadow-sm">
              <h3 className="font-bold text-lg text-gray-700">{activeTicket.subject}</h3>
              <span
                className={`text-sm px-3 py-1 rounded-full font-medium ${
                  activeTicket.status === "Open"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {activeTicket.status}
              </span>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {activeTicket.messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === "Admin" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-2xl shadow break-words ${
                      msg.sender === "Admin"
                        ? "bg-blue-500 text-white rounded-br-none hover:bg-blue-600 transition"
                        : "bg-gray-200 text-gray-800 rounded-bl-none hover:bg-gray-300 transition"
                    }`}
                  >
                    <p>{msg.text}</p>
                    {msg.attachments?.map((file) => renderAttachment(file))}
                    <span className="text-xs opacity-70 block text-right">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 border-t flex flex-col md:flex-row items-center gap-3 bg-white">
              <textarea
                rows={1}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message and press Enter..."
                className="flex-1 border rounded-2xl px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 md:mb-0"
              />
              <input
                type="file"
                multiple
                accept="image/*,application/pdf"
                onChange={(e) => handleAttachmentChange(e, "chat")}
                className="hidden"
                id="chatAttachments"
              />
              <label
                htmlFor="chatAttachments"
                className="bg-gray-200 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-300 transition"
              >
                <Paperclip size={18} />
              </label>
              <button
                onClick={sendMessage}
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-2xl flex items-center gap-2 shadow hover:shadow-lg transition-all"
              >
                <Send size={18} /> Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-400 text-center p-6">
            <MessageSquare size={32} className="mr-2" />
            <span>Select a ticket to start chatting.</span>
          </div>
        )}
      </div>

      {/* Attachment Modal */}
      {modalAttachment && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
          onClick={() => setModalAttachment(null)}
        >
          <div
            className="relative bg-white rounded-lg overflow-hidden max-w-3xl w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
              onClick={() => setModalAttachment(null)}
            >
              <X size={24} />
            </button>

            {modalAttachment.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(modalAttachment)}
                alt={modalAttachment.name}
                className="max-h-[80vh] w-auto mx-auto my-4"
              />
            ) : modalAttachment.type === "application/pdf" ? (
              <iframe
                src={URL.createObjectURL(modalAttachment)}
                className="w-full h-[80vh]"
                title={modalAttachment.name}
              ></iframe>
            ) : (
              <p className="p-4">Cannot preview this file.</p>
            )}

            <div className="flex justify-end p-4 border-t">
              <a
                href={URL.createObjectURL(modalAttachment)}
                download={modalAttachment.name}
                className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                <Download size={16} /> Download
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Raise Ticket Modal */}
      {showRaiseModal && (
        <div
          onClick={() => setShowRaiseModal(false)}
          className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 relative animate-fadeIn"
          >
            <button
              onClick={() => setShowRaiseModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
            >
              <X size={24} />
            </button>

            {ticketSuccess ? (
              <div className="flex flex-col items-center justify-center py-10">
                <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
                <h2 className="text-xl font-bold text-green-600">Ticket Raised Successfully!</h2>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Raise a Ticket</h2>
                <form onSubmit={handleRaiseTicket} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={ticketData.subject}
                    onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
                    required
                    className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    placeholder="Describe your issue..."
                    value={ticketData.description}
                    onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
                    required
                    rows={4}
                    className="w-full border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex gap-2">
                    <select
                      value={ticketData.category}
                      onChange={(e) => setTicketData({ ...ticketData, category: e.target.value })}
                      className="flex-1 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="General">General</option>
                      <option value="Billing">Billing</option>
                      <option value="Technical">Technical</option>
                      <option value="Other">Other</option>
                    </select>
                    <select
                      value={ticketData.priority}
                      onChange={(e) => setTicketData({ ...ticketData, priority: e.target.value })}
                      className="flex-1 border p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                    </select>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept="image/*,application/pdf"
                    onChange={(e) => handleAttachmentChange(e, "ticket")}
                    className="hidden"
                    id="ticketAttachments"
                  />
                  <label
                    htmlFor="ticketAttachments"
                    className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-full cursor-pointer hover:bg-gray-300 transition"
                  >
                    <Paperclip size={16} /> Attach Files
                  </label>
                  <div>
                    {ticketData.attachments?.map((file) => renderAttachment(file))}
                  </div>
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <Paperclip size={16} /> Submit Ticket
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
