import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Heroslider() {
  return (
    <section
      className="relative flex items-center justify-start min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Images/HomePic1.jpeg')" }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Animated content */}
      <motion.div
        className="relative text-left text-white max-w-xl ml-24 md:ml-32"
        initial={{ opacity: 0, x: -60 }}      // start position (off-screen left)
        animate={{ opacity: 1, x: 0 }}        // end position (normal)
        transition={{ duration: 1, ease: "easeOut" }} // smooth slide
      >
        <motion.h1
          className="text-4xl md:text-6xl font-light"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Welcome to
        </motion.h1>

        <motion.h2
          className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-red-700 via-purple-600 to-blue-400 bg-clip-text text-transparent drop-shadow-lg mt-2"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          VSExam Portal
        </motion.h2>

        <motion.p
          className="mt-6 text-lg md:text-xl text-gray-200 max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          Your trusted platform for secure online examinations and seamless
          assessments.
        </motion.p>

        <motion.div
          className="mt-8 flex"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <Link
            to="/signuppage"
            className="px-6 py-3 rounded-md bg-black text-white font-medium hover:bg-gray-800 transition"
          >
            Start a free trial
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}