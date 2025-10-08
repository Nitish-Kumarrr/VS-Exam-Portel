function Exams() {
  const features = [
    {
      icon: "📘",
      title: "Online Exams",
      description: "Conduct secure online exams with AI proctoring & instant results.",
    },
    {
      icon: "⚡",
      title: "Fast & Reliable",
      description: "High concurrency system handling thousands of students seamlessly.",
    },
    {
      icon: "🏆",
      title: "Achievements",
      description: "Track rankings, performance, and award digital certificates.",
    },
  ];

  return (
    <section className="bg-gradient-to-r from-gray-900 to-blue-400 py-12 px-6 flex justify-center ">
      <div className="bg-white shadow-lg rounded-lg p-8 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full hover:scale-105 transition-transform">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="text-center hover:scale-105 transition-transform"
          >
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.description}</p>
          </div>
          
        ))}
      </div>
    </section>
  );
}export default Exams