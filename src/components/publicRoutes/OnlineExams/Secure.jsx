
export default function Secure() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left side (text content) */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Secure Browser Technology
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Secure Browser Technology ensures that candidates remain fully
              focused on the exam by restricting access to other applications
              and online resources during the test. Once the exam begins, the
              browser locks the system and prevents students from
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              • Opening new tabs or switching windows <br />
              • Copying, pasting, or taking screenshots <br />
              • Running background applications or unauthorized software <br />
              • Using external storage devices or screen-sharing tools
            </p>
            <p className="text-gray-600 leading-relaxed">
              This lockdown environment minimizes cheating and ensures exam
              integrity. At the same time, institutions can whitelist essential
              tools if needed. With this technology, test-takers can only
              access the exam screen until submission, creating a fair and
              distraction-free assessment experience.
            </p>
          </div>

          {/* Right side (image) */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="Images/secure.png"
                alt="Laptop portal"
                className="w-full max-w-md"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
