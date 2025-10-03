import React, { useState } from 'react'

const RulesPopup = ({ handleAcceptRules, handleCancel, setShowRulesPopup, videoRef }) => {
    const [isAgreed, setIsAgreed] = useState(false)
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"
      onClick={(e) => {
        setShowRulesPopup(false)
        e.stopPropagation()
      }}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-2xl w-[700px] flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Section 1 - Rules */}
        <h2 className="text-xl font-bold">Exam Rules & Regulations</h2>
        <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
          <li>Camera & Microphone must remain on during the exam.</li>
          <li>Do not switch tabs or minimize the browser window.</li>
          <li>Any malpractice will lead to disqualification.</li>
          <li>Ensure a stable internet connection before starting.</li>
        </ul>

        {/* Camera Preview */}
        <div className="flex justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-[300px] h-[200px] rounded-md bg-black"
          ></video>
        </div>

        {/* Section 2 - Instructions (from 2nd screenshot) */}
        <div className="mt-4">
          <h2 className="text-lg font-bold">Read Instructions Carefully</h2>
          <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-1 mt-2">
            <li>
              Select <b>"Save & Next"</b> button, to save your Answer and go to Next Question
            </li>
            <li>
              Select <b>"Mark for Review & Next"</b> button, to mark question for Review and go
              to Next Question
            </li>
            <li>
              Select <b>"Finish Exam"</b> button, to finish & Submit your Answers
            </li>
            <li>You <b>cannot pause</b> this test</li>
            <li>
              Select <b>"Instructions"</b> button, to view these instructions at any time
            </li>
          </ol>

          {/* Legend */}
          <h3 className="text-md font-semibold mt-4">Overview Legend</h3>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
            <p className="flex items-center gap-2">
              <span className="bg-green-400 w-4 h-4 rounded-sm inline-block"></span> Answered
            </p>
            <p className="flex items-center gap-2">
              <span className="bg-orange-500 w-4 h-4 rounded-sm inline-block"></span> Not Answered
            </p>
            <p className="flex items-center gap-2">
              <span className="bg-gray-400 w-4 h-4 rounded-sm inline-block"></span> Not Seen Yet
            </p>
            <p className="flex items-center gap-2">
              <span className="bg-purple-500 w-4 h-4 rounded-sm inline-block"></span> Marked for Review
            </p>
            <p className="flex items-center gap-2 col-span-2">
              <span className="bg-violet-400 w-4 h-4 rounded-sm inline-block"></span> Answered & Marked for Review (considered for evaluation)
            </p>
          </div>

          {/* Checkbox for agreement */}
          <div className="flex items-center gap-2 mt-3">
            <input type="checkbox" id="agree" className="cursor-pointer" checked={isAgreed}
            onChange={(e) => setIsAgreed(e.target.checked)}/>
            <label htmlFor="agree" className="text-sm text-gray-700">
              I have read and understood all the Instructions
            </label>
          </div>
          {isAgreed && (
          <p className="text-green-600 font-semibold text-center mt-2">
            ✅ All the Best!
          </p>
        )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded-md cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleAcceptRules}
            className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
          >
            Accept & Start
          </button>
        </div>
      </div>
    </div>
  )
}

export default RulesPopup
