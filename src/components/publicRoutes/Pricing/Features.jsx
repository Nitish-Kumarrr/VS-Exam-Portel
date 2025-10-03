export default function Features() {
  const features = [
    "Real-Time Exam Monitoring",
    "Randomized Question Papers",
    "Supports Objective & Subjective Questions",
    "Automated Result Generation",
    "Secure Cloud Storage",
    "Multi-Device Access",
    "Live Exam Notifications",
    "Customizable Exam Settings",
  ];

  return (
    <section id="features" className="py-16 bg-gray-100">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-black-700 mb-10">
          Core Features
        </h2>

        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center p-3 bg-white rounded-md shadow hover:bg-blue-50 transition"
            >
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600 font-bold mr-3">
                ✓
              </span>
              <span className="text-gray-800">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
