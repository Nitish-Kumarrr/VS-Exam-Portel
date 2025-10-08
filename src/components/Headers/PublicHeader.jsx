import React from "react";
import { Link } from "react-router-dom";

const PublicHeader = () => {
  return (
    <div className="bg-gradient-to-r from-gray-900 to-blue-400 text-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-4 bg-transparent">
        <div className="flex items-center space-x-2">
          <img src="/Images/LogoVS.jpeg" alt="Logo" className="w-12 h-12" />
          <span className="text-4xl font-bold"> VS Exams</span>
        </div>
        <div className="hidden md:flex space-x-6 items-center">

           <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/online-exams" className="hover:underline">
            Online Exams
          </Link>
          <Link to="/omr-exams" className="hover:underline">
            OMR Exams
          </Link>
          <Link to="/pricing" className="hover:underline">
            Pricing
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/signup" className="border border-white px-4 py-1 rounded hover:bg-white hover:text-blue-600 transition"
>
            Signup
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default PublicHeader;
