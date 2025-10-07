import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // ✅ fixed
import toast from "react-hot-toast";

const UpiSetup = () => {
  const [upiApp, setUpiApp] = useState("");
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Show toast with UPI info
    toast.success(`UPI App: ${upiApp}\nUPI ID: ${upiId}`, {
      duration: 3000,
      style: { whiteSpace: "pre-line" }, // preserves line breaks
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

        {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // go back
        className="absolute top-6 left-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-semibold"
      >
        Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-red-600 text-center mb-6">
          VSExam
        </h1>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">STEP 3 OF 3</h2>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Set up UPI AutoPay
        </h3>
        <p className="text-gray-600 mb-6">
          You can change this recurring payment any time in your settings.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">
              Select your UPI app
            </label>
            <select
              value={upiApp}
              onChange={(e) => setUpiApp(e.target.value)}
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="">-- Select App --</option>
              <option value="paytm">Paytm</option>
              <option value="gpay">Google Pay</option>
              <option value="phonepe">PhonePe</option>
              <option value="amazonpay">Amazon Pay</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-medium">UPI ID</label>
            <input
              type="text"
              value={upiId}
              onChange={(e) => setUpiId(e.target.value)}
              placeholder="example@upi"
              required
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          <Link to="/FindUpiId">
            <p className="text-sm text-blue-600 cursor-pointer hover:underline">
              How do I find my UPI ID?
            </p>
          </Link>

          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition"
          >
            Next
          </button>
        </form>

        <p className="text-xs text-gray-500 mt-6 text-center">
          End-to-end encrypted 🔒
        </p>
      </div>
    </div>
  );
};

export default UpiSetup;
