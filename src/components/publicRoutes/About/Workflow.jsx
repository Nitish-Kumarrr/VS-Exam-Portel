import React from "react";

const Workflow = () => {
  const steps = [
    {
      title: "Create your Account",
      desc: "Your own customized VS exam platform at your-name.VSexam.in with your logo and colors, where your Admins and candidates will login",
      icon: "📘", // Replace with an SVG or image if needed
    },
    {
      title: "Add your Content",
      desc: "Easily add and edit Question Papers, create Online Exams, optionally create candidate accounts to facilitate conducting online exams",
      icon: "♾️",
    },
    {
      title: "Conduct Online Exams",
      desc: "Schedule exams and monitor them in realtime to see how many and who is taking the exam with various other metrics",
      icon: "⏱️",
    },
    {
      title: "View Results & Analytics",
      desc: "After exam window is closed, scores and analytics for all candidates are visible to the Admin & candidates",
      icon: "📊",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Text and Steps */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            How VS Exam Works
          </h2>
          <p className="text-gray-600 mb-10">
            Typical Workflow for conducting online exams
          </p>

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start space-x-4">
                <div className="text-blue-600 text-2xl">{step.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Image / Illustration */}
        <div className="flex justify-center">
          <img
            src="/Images/WebPagePic.jpg"
            alt="Workflow illustration"
            className="max-w-md w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default Workflow;
