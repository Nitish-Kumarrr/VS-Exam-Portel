import React from "react";
import { Link } from "react-router-dom";

import { FaUniversity, FaUserCircle, FaIdBadge, FaCreditCard } from "react-icons/fa"; // ✅ added FaCreditCard

const FindUpiId = () => {
  const steps = [
    {
      icon: <FaUniversity className="text-red-600 text-2xl" />,
      text: "Go to the app linked to your UPI ID.",
    },
    {
      icon: <FaUserCircle className="text-red-600 text-2xl" />,
      text: "Tap your profile or settings menu.",
    },
    {
      icon: <FaIdBadge className="text-red-600 text-2xl" />,
      text: 'Find your ID under "UPI ID".',
    },
    {
      icon: <FaCreditCard className="text-red-600 text-2xl" />,
      text: "Copy your UPI ID and paste it on VSExam to finish the payment set up.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-8">Find your UPI ID</h1>

        <div className="space-y-6 text-left">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0">{step.icon}</div>
              <p className="text-gray-700">{step.text}</p>
            </div>
          ))}
        </div>
        <Link to="/super-admin-dashboard/billing">
        <button className="mt-10 w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition">
          Close
        </button>
        </Link>
      </div>
    </div>
  );
};

export default FindUpiId;
