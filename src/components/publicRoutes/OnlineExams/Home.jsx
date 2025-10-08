export default function Home() {
  return (
    <section className="bg-gradient-to-r from-gray-900 to-blue-400 text-white py-16">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
        Simplify, Secure & Scale Online Exams
          </h1>
          <p className="text-lg mb-4">
           Launch your branded Online Exam Platform, accessible anywhere and anytime
           by Students.
          </p>
          <p className="text-lg mb-6">
            <span className="font-semibold">2 Million+ Exams taken</span> — Get 
            started with your own Exam Platform today!
          </p>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="Images/onExam.png" 
            alt="Online Exam Platform"
            className="w-full max-w-lg rounded-lg "
          />
        </div>

      </div>
    </section>
  );
}