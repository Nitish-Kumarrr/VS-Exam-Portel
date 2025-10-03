export default function Questions() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          
          {/* Left side (text content) */}
          <div>
            <h2 className="text-3xl font-bold mb-4">
              Multiple Question Formats
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Multiple Question Formats → Supports MCQs, True/False,
              Fill-in-the-Blanks, Essays, Coding Questions, and more
              describes the capability of an assessment system to handle
              various question types beyond simple multiple-choice,
              including true/false, fill-in-the-blanks, essay prompts,
              and complex coding challenges, allowing for more comprehensive
              evaluation.
            </p>
            <p className="text-gray-600 mb-4 leading-relaxed">
              This diversity ensures well-rounded assessments,
              combining speed and scalability of objective
              questions with depth and analytical power
              of subjective/coding formats. It allows institutions
              to test not just knowledge, but also understanding,
              problem-solving, and critical thinking skills.
            </p>
          </div>

          {/* Right side (image) */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src="Images/like.png"
                alt="Laptop portal"
                className="w-full max-w-md rounded-lg shadow-md"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
