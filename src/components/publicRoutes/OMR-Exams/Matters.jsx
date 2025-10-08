import { Link } from "react-router-dom";


export default function Matters() {
  return (
    <>
      {/* Top section with text + image */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            {/* Left side (text content) */}
            <div>
              <h2 className="text-3xl font-bold mb-4">
                Launch Your Own Exam Platform in Minutes
              </h2>

              <ul className="space-y-4 text-gray-700 leading-relaxed">
                <li>
                  Add and manage exam keys directly from your account. OMR sheets
                  are automatically available for printing. Need more control?
                  Host your VSExam platform on your own domain. Exam keys are
                  added directly to your account, with the ability to instantly
                  download printable OMR sheets. Students can attempt exams
                  offline, and scanned responses can be uploaded for quick
                  evaluation.
                </li>
              </ul>

              <p className="mt-6 italic text-gray-600">
                “The all-in-one solution for OMR & Online Exams with integrated
                reporting.”
              </p>
            </div>

            {/* Right side (image) */}
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src="/Images/online.webp"
                  alt="Laptop portal"
                  className="w-full max-w-md rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom call-to-action section */}
      <section className="bg-gradient-to-r from-gray-900 to-blue-400 text-white py-16 text-center">
        <h3 className="text-2xl font-bold mb-4">
          Ready to Conduct OMR Exams Digitally?
        </h3>
        <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-100">
         <Link to="/contact">Contact US</Link>
        </button>
      </section>
    </>
  );
}
