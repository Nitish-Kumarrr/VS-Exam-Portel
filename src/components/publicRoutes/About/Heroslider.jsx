import React from "react";
import { Link } from "react-router-dom";


const Heroslider = () => {
  return (
    <section className="bg-blue-600 text-white">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-10 py-20 flex flex-col md:flex-row items-center">
        
        {/* Left Side */}
        <div className="md:w-1/2 space-y-8">
          <h1 className="text-5xl md:text-5xl font-bold leading-tight">
            Welcome to <br />
            Our Exam Platform
          </h1>
          <p className="text-lg">
            Exam Platform for <br />
            your Organization at Low Cost <br />
            Easy to use & Your Branding
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded shadow hover:bg-gray-100">
             <Link to="/login">New Exam Platform</Link>
          </button>

        </div>

        {/* Right Side */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="/Images/Home2.jpeg"
            alt="VSExams"
            className="w-[600px] md:w-[600px]"
          />
        </div>
      </div>
    </section>
  );
};

export default Heroslider;
