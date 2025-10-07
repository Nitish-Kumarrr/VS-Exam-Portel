import { useState } from "react";
import { Bell, CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react";

export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Purchase Approved",
      message: "Your purchase order #1234 has been approved by the admin.",
      type: "success",
      time: "5 min ago",
    },
    {
      id: 2,
      title: "Purchase Rejected",
      message: "Purchase order #1235 has been rejected due to missing details.",
      type: "error",
      time: "15 min ago",
    },
    {
      id: 3,
      title: "Payment Successful",
      message: "Payment of ₹4,500 from client ‘ABC Pvt Ltd’ was successful.",
      type: "success",
      time: "30 min ago",
    },
    {
      id: 4,
      title: "Payment Failed",
      message: "Client ‘XYZ Corp’ payment failed. Please verify transaction.",
      type: "warning",
      time: "1 hr ago",
    },
    {
      id: 5,
      title: "Awaiting Approval",
      message: "Purchase request from ‘Ravi Kumar’ is pending admin approval.",
      type: "pending",
      time: "2 hrs ago",
    },
  ]);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="text-green-500" size={24} />;
      case "error":
        return <XCircle className="text-red-500" size={24} />;
      case "warning":
        return <AlertCircle className="text-yellow-500" size={24} />;
      case "pending":
        return <Clock className="text-blue-500" size={24} />;
      default:
        return <Bell className="text-gray-500" size={24} />;
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-4 bg-white shadow-md rounded-2xl">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Bell className="text-indigo-600" /> Notifications
      </h2>

      <div className="space-y-4">
        {notifications.map((note) => (
          <div
            key={note.id}
            className="flex items-start gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
          >
            {getIcon(note.type)}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-800">{note.title}</h3>
              <p className="text-gray-600 text-sm">{note.message}</p>
              <span className="text-xs text-gray-400">{note.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}