import React from "react";

const features = [
  {
    icon: "💻",
    title: "Use Any Device",
    description:
      "Exams can be taken seamlessly on all devices — desktops, laptops, tablets, and mobile phones. No special setup is required, just a stable internet connection. The interface automatically adjusts to the screen size, ensuring a smooth user experience across platforms.",
  },
  {
    icon: "✔️",
    title: "All Question Types",
    description:
      "Supports a wide range of question formats including MCQs (3–6 options), numeric, subjective, and coding-based assessments in languages like Java, Python, and C++. This flexibility allows educators to design tests that match learning objectives, from simple quizzes to advanced programming challenges.",
  },
  {
    icon: "☁️",
    title: "Cloud-Based",
    description:
      "Our robust cloud infrastructure can handle thousands of users taking exams at the same time without performance issues. It eliminates the need for local installations and ensures 24/7 availability. With over 1 million exams already conducted, reliability and scalability are guaranteed.",
  },
  {
    icon: "⭐",
    title: "Your Brand",
    description:
      "Launch your own customized exam platform with your organization’s branding, logo, and unique domain. This strengthens trust with your candidates while giving a professional identity. Tailored themes and white-labeling options let you maintain consistency with your brand image.",
  },
  {
    icon: "📊",
    title: "Analytics & Reports",
    description:
      "Gain actionable insights with multi-page analytics reports that cover subject-wise, topic-wise, and time-wise performance. Track student progress, identify strengths and weaknesses, and export data in multiple formats. These insights make evaluations transparent and help improve teaching strategies.",
  },
  {
    icon: "📥",
    title: "Simple Import",
    description:
      "Quickly set up exams by importing question papers from MS Word, Excel, or CSV. The system automatically formats the content into an exam-ready structure. This saves hours of manual entry and allows administrators to focus on delivering quality assessments.",
  },
];

export default function KeyFeatures() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Key Features
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-justify">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
