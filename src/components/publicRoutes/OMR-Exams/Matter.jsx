
import React from "react";
import { Link } from "react-router-dom";

function Matter() {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-blue-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Smart OMR Exam Management</h2>
          <p className="text-lg mb-6">
            Conduct, evaluate, and analyze OMR-based exams digitally with ease.
          </p>
          <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
           <Link to= "/login"> Get Started </Link>
          
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-2">Automated Evaluation</h4>
              <p>
                Upload scanned OMR sheets and let the system evaluate instantly
                with 100% accuracy.No manual checking, no delays — results are ready in just seconds.
                With automated evaluation, educators save hours of effort while students get immediate, accurate feedback.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-2">Detailed Analytics</h4>
              <p>
                Get insights on student performance with question-wise and
                subject-wise reports.Identify the toughest and easiest questions, and measure question-level difficulty.
                Export results in Excel/PDF format for sharing or record-keeping.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <h4 className="text-xl font-semibold mb-2">Easy Setup</h4>
              <p>
                No complex hardware required. Just scan OMR sheets and upload
                through the portal.Works seamlessly with any standard scanner or mobile camera.
                Access from anywhere, anytime, without technical overhead.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold mb-4">About OMR Exams</h3>
          <p className="text-lg leading-relaxed text-gray-700">
            OMR (Optical Mark Recognition) exams are widely used for large-scale
            assessments such as entrance exams, competitive tests, and school
            evaluations. With digital OMR systems, institutes can save time,
            reduce errors, and provide accurate results faster.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Matter;
