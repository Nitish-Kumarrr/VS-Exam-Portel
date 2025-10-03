export default function Protections() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left side (images) */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Laptop image */}
              <img
                src="Images/auto.png"
                alt="Laptop portal"
                className="w-full max-w-md"
              />
            </div>
          </div>

          {/* Right side (text content) */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
               Auto Proctoring 
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              {/* Your white-labeled web platform is created at{" "}
              <span className="text-blue-600 underline">
                institute-name.exam.in
              </span>{" "} */}
             Auto proctoring is an AI-driven technology 
             that monitors online exams without a human invigilator. 
             By using the candidate’s webcam, microphone, screen activity, 
             and behavior patterns, it detects and flags suspicious actions 
             in real time, ensuring exam security and integrity at scale.

            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              AI-powered monitoring – Supervises exams without human invigilators.
              Multi-feed tracking – Uses webcam, microphone, and screen sharing to watch candidates.
              Behavioral analytics – Detects eye movement, background voices, and unusual activity.
              Real-time alerts – Flags suspicious actions instantly to maintain exam integrity.
            </p>
            {/* <p className="text-gray-600 leading-relaxed">
              
            This lockdown environment minimizes cheating and ensures
             exam integrity. At the same time, institutions can whitelist
              essential tools if needed. With this technology, test-takers 
              can only access the exam screen until submission, creating
               a fair and distraction-free assessment experience.
            </p> */}
          </div>
        </div>
      </div>
    </section>
  );
}
