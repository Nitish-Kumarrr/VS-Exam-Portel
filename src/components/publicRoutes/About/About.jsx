// src/components/Home.jsx
import React from "react";

const About = () => {
  return (
    <section className="py-16 bg-gray-100">
      {/* Why Choose Us Section */}
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose Us?</h2>
        
        <div className="grid gap-8 md:grid-cols-2">
          
          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              ✅ Secure and reliable exam environment with advanced proctoring
              features. From AI-based monitoring to real-time invigilation, we ensure
              integrity and transparency in every assessment.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              ✅ Detailed analytics and reports to evaluate candidate performance.
              Track strengths, weaknesses, and progress with customizable reports for
              both individuals and groups.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              ✅ Responsive design – works seamlessly on desktop, tablet, and mobile.
              No matter the device or browser, candidates enjoy a smooth and consistent
              experience without interruptions.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              ✅ Flexible question types – MCQs, subjective, numeric, coding, and more.
              Our platform supports diverse assessment needs for schools, colleges,
              corporate training, and competitive exams.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              ✅ Easy setup and administration – Create, schedule, and manage exams
              effortlessly with an intuitive dashboard and automation tools.
            </p>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <p className="text-gray-600">
              ✅ 24/7 dedicated support – Our expert team is always available to
              resolve technical issues, guide examiners, and ensure a hassle-free
              experience for candidates.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
