import { PlusCircle, X } from 'lucide-react'
import React from 'react'

const ExamDetails = ({setShowModal,examForm,setExamForm,handleSaveExam,setShowQuestionsFull,editingExam}) => {
  return (
     <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-start pt-10 z-50 overflow-auto">
          <div className="bg-white p-6 rounded w-full max-w-4xl relative">
            <X className="absolute top-4 right-4 cursor-pointer" onClick={() => setShowModal(false)} />
            <h3 className="text-xl font-bold mb-4">{editingExam ? "Edit Exam" : "Create Exam"}</h3>
            <input
              type="text"
              placeholder="Exam Title"
              className="border p-2 rounded w-full mb-2"
              value={examForm.title}
              onChange={(e) => setExamForm({ ...examForm, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Subject"
              className="border p-2 rounded w-full mb-2"
              value={examForm.subject}
              onChange={(e) => setExamForm({ ...examForm, subject: e.target.value })}
            />
            <input 
              type="text"
              placeholder="Description"
              name="description"
              className="border p-2 rounded w-full mb-2"
              value={examForm.description}
              onChange={(e) => setExamForm({ ...examForm, description: e.target.value })}
            />
            <input
              type="text"
              placeholder="Exam Duration (e.g., 30 min)"
              className="border p-2 rounded w-full mb-2"
              value={examForm.duration}
              onChange={(e) => setExamForm({ ...examForm, duration: e.target.value })}
            />
            <label className="block mb-1 font-semibold">Exam Start</label>
            <input
              type="datetime-local"
              className="border p-2 rounded w-full mb-2"
              value={examForm.examStart}
              onChange={(e) => setExamForm({ ...examForm, examStart: e.target.value })}
            />
            <label className="block mb-1 font-semibold">Exam Expiry</label>
            <input
              type="datetime-local"
              className="border p-2 rounded w-full mb-4"
              value={examForm.examEnd}
              onChange={(e) => setExamForm({ ...examForm, examEnd: e.target.value })}
            />
            <button
              onClick={() => setShowQuestionsFull(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-2"
            >
              <PlusCircle className="mr-2" /> Add Questions
            </button>
            <button
              onClick={handleSaveExam}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {editingExam ? "Update Exam" : "Create Exam"}
            </button>
          </div>
        </div>
  )
}

export default ExamDetails