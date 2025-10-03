export default function Webcam() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left side (images) */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Laptop image */}
              <img
                src="Images/multi.webp"
                alt="Laptop portal"
                className="w-full max-w-md"
              />
            </div>
          </div>

          {/* Right side (text content) */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
               Multi-Device & Slow Internet Support Built-in
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Our platform is designed to work seamlessly across devices—whether you’re on a desktop, tablet, or smartphone. Even in areas with unstable or slow internet, we ensure a smooth and reliable experience with optimized loading, offline-ready features, and lightweight design.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Customized WebApps can be installed from your platform on Mobile
              devices, and they are also white-labeled with your Name, Logo &
              Colors. These WebApps function as fully native applications and run
              in full screen mode to reduce distractions during exams.
            </p>
             <p className="mt-6 italic text-gray-600">
              “Seamless experience across devices, optimized to work even on slow or patchy internet.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}