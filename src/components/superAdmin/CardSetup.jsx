import React, { useState } from "react";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa6";
import { RiBankCardLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom"; // ✅ added useNavigate
import toast from "react-hot-toast"; // ✅ toast for notifications

const CardSetup = () => {
  const navigate = useNavigate(); // ✅ useNavigate hook
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    name: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.agree) {
      toast.error("Please agree to the terms before continuing.", {
        icon: "⚠️",
      });
      return;
    }

    toast.success("🎉 Membership started successfully!", {
      icon: "",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 relative">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)} // ✅ go back to previous page
        className="absolute top-6 left-6 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-800 font-semibold"
      >
        Back
      </button>

      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-red-600 text-center mb-6">
          VSExam
        </h1>

        <h2 className="text-sm font-semibold text-gray-600">STEP 3 OF 3</h2>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Set up your credit or debit card
        </h3>

        {/* Card Icons */}
        <div className="flex items-center gap-3 mb-4">
          <FaCcVisa size={36} className="text-blue-600" />
          <FaCcMastercard size={36} className="text-red-500" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Card Number */}
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="Card number"
              className="w-full border px-3 py-2 rounded-lg pr-10"
              required
            />
            <RiBankCardLine className="absolute right-3 top-3 text-gray-500" />
          </div>

          {/* Expiry and CVV */}
          <div className="flex gap-4">
            <input
              type="text"
              name="expiry"
              value={formData.expiry}
              onChange={handleChange}
              placeholder="Expiration date"
              className="w-1/2 border px-3 py-2 rounded-lg"
              required
            />
            <input
              type="text"
              name="cvv"
              value={formData.cvv}
              onChange={handleChange}
              placeholder="CVV"
              className="w-1/2 border px-3 py-2 rounded-lg"
              required
            />
          </div>

          {/* Name on Card */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name on card"
            className="w-full border px-3 py-2 rounded-lg"
            required
          />

          {/* Plan Info */}
          <div className="bg-gray-100 p-3 rounded-lg flex justify-between items-center text-sm">
            <span>
              <strong>₹199/month</strong> <br /> Basic
            </span>
            <Link to="/pricing">
              <button
                type="button"
                className="text-blue-600 font-semibold hover:underline"
              >
                Change
              </button>
            </Link>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-2 text-sm">
            <input
              type="checkbox"
              name="agree"
              checked={formData.agree}
              onChange={handleChange}
              className="mt-1"
            />
            <p className="text-gray-600">
              By ticking the box, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Terms of Use
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:underline">
                Privacy Statement
              </a>
              , and confirm that you are over 18.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
          >
            Start Membership
          </button>
        </form>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-6 text-center">
          Any payment above ₹2000 will need additional authentication.
          <br />
          This page is protected by Google reCAPTCHA to ensure you're not a bot.
        </p>
      </div>
    </div>
  );
};

export default CardSetup;
