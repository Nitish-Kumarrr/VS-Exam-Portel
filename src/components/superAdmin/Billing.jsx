import React from "react";
import { Link } from "react-router-dom";
import { FaCcVisa, FaCcMastercard, FaGooglePay, FaAmazonPay } from "react-icons/fa";
import { SiPaytm, SiPhonepe } from "react-icons/si";
import { RiBankCardLine } from "react-icons/ri";

const Billing = () => {
  return (
    <div className="h-[calc(100vh-56px)] items-center flex  justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-red-600 text-center mb-4">VSExam</h1>
        
        <h2 className="text-lg font-semibold text-gray-800 mb-1">STEP 1 OF 3</h2>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose how to pay</h3>
        <p className="text-gray-600 mb-4 text-sm">
          Your payment is encrypted and you can change your payment method at anytime.
          <br />
          <span className="font-semibold">Secure for peace of mind.</span> Cancel easily online.
        </p>

        {/* Payment Options */}
        <div className="space-y-3">
          {/* Card Option */}
          <Link to="/super-admin/card-setup">
            <button className="w-full flex justify-between items-center border rounded-lg px-4 py-2 hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <RiBankCardLine size={22} className="text-gray-600" />
                <span className="font-medium text-gray-800">Credit or Debit Card</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCcVisa size={26} className="text-blue-600" />
                <FaCcMastercard size={26} className="text-red-500" />
              </div>
            </button>
          </Link>

          {/* UPI Autopay Option */}
          <Link to="/super-admin/AutoPay">
            <button className="w-full flex justify-between items-center border rounded-lg px-4 py-2 hover:shadow-md transition">
              <div className="flex items-center gap-3">
                <span className="font-medium text-gray-800">UPI AutoPay</span>
              </div>
              <div className="flex items-center gap-3">
                <SiPaytm size={26} className="text-blue-500" />
                <SiPhonepe size={26} className="text-purple-600" />
                <FaAmazonPay size={26} className="text-yellow-600" />
                <FaGooglePay size={26} className="text-green-600" />
              </div>
            </button>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          End-to-end encrypted 🔒
        </p>
      </div>
    </div>
  );
};

export default Billing;
