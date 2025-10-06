// Instructions.jsx
import React from "react";

const Instructions = () => {
  return (
    <div className="space-y-3 text-gray-700">
      <p>📘 <b>General Instructions:</b></p>
      <ul className="list-disc ml-5 space-y-2">
        <li>Total Duration: 5 Minutes</li>
        <li>Each question carries 3 marks.</li>
        <li>1 mark will be deducted for each wrong answer.</li>
        <li>Do not refresh or leave the page during the test.</li>
        <li>Click “Finish Exam” before the timer ends if you complete early.</li>
      </ul>
      <p className="text-blue-600 mt-4">
        ⚠️ Once you submit, you cannot reattempt the test.
      </p>
    </div>
  );
};

export default Instructions;
