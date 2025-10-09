// import { X } from 'lucide-react';
// import React from 'react'

// const Questions = ({setShowQuestionsFull,examForm,setExamForm}) => {
//     const addQuestion = () => {
//     setExamForm({
//       ...examForm,
//       questions: [...examForm.questions, { text: "", options: ["", ""], correct: 0 }],
//     });
//   };
//   const removeQuestion = (index) => {
//     if (confirm("Delete this question?")) {
//       const questions = [...examForm.questions];
//       questions.splice(index, 1);
//       setExamForm({ ...examForm, questions });
//     }
//   };
//   const addOption = (qIndex) => {
//     const questions = [...examForm.questions];
//     questions[qIndex].options.push("");
//     setExamForm({ ...examForm, questions });
//   };
//   const removeOption = (qIndex, oIndex) => {
//     const questions = [...examForm.questions];
//     if (questions[qIndex].options.length <= 2) return;
//     questions[qIndex].options.splice(oIndex, 1);
//     if (questions[qIndex].correct === oIndex) questions[qIndex].correct = 0;
//     setExamForm({ ...examForm, questions });
//   };
//   const updateQuestionText = (qIndex, value) => {
//     const questions = [...examForm.questions];
//     questions[qIndex].text = value;
//     setExamForm({ ...examForm, questions });
//   };
//   const updateOptionText = (qIndex, oIndex, value) => {
//     const questions = [...examForm.questions];
//     questions[qIndex].options[oIndex] = value;
//     setExamForm({ ...examForm, questions });
//   };
//   const markCorrect = (qIndex, oIndex) => {
//     const questions = [...examForm.questions];
//     questions[qIndex].correct = oIndex;
//     setExamForm({ ...examForm, questions });
//   };
//   return (
//     <div className="fixed inset-0 bg-white z-50 overflow-auto p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-2xl font-bold">Edit Questions</h2>
//             <X className="cursor-pointer" onClick={() => setShowQuestionsFull(false)} />
//           </div>

//           {examForm.questions.map((q, qIndex) => (
//             <div key={qIndex} className="border p-4 rounded mb-4">
//               <input
//                 type="text"
//                 placeholder={`Question ${qIndex + 1}`}
//                 className="border p-2 rounded w-full mb-2"
//                 value={q.text}
//                 onChange={(e) => updateQuestionText(qIndex, e.target.value)}
//               />
//               {q.options.map((opt, oIndex) => (
//                 <div key={oIndex} className="flex gap-2 mb-2">
//                   <input
//                     type="text"
//                     placeholder={`Option ${oIndex + 1}`}
//                     className="border p-2 rounded w-full"
//                     value={opt}
//                     onChange={(e) => updateOptionText(qIndex, oIndex, e.target.value)}
//                   />
//                   <button onClick={() => removeOption(qIndex, oIndex)} className="text-red-600">X</button>
//                   <button
//                     onClick={() => markCorrect(qIndex, oIndex)}
//                     className={`px-2 rounded ${q.correct === oIndex ? "bg-green-500 text-white" : "bg-gray-200"}`}
//                   >
//                     Correct
//                   </button>
//                 </div>
//               ))}
//               <button onClick={() => addOption(qIndex)} className="bg-blue-600 text-white px-4 py-2 rounded">Add Option</button>
//               <button onClick={() => removeQuestion(qIndex)} className="bg-red-600 text-white px-4 py-2 rounded ml-2">Delete Question</button>
//             </div>
//           ))}

//           <button onClick={addQuestion} className="bg-green-600 text-white px-4 py-2 rounded">Add Question</button>
//           <div className="mt-4">
//             <button onClick={() => setShowQuestionsFull(false)} className="bg-gray-600 text-white px-4 py-2 rounded">Done</button>
//           </div>
//         </div>
//   )
// }

// export default Questions
import { X } from 'lucide-react';
import React from 'react';

const Questions = ({ setShowQuestionsFull, examForm, setExamForm }) => {
    const addQuestion = () => {
        setExamForm({
            ...examForm,
            questions: [
                ...examForm.questions,
                {
                    type: "text",
                    text: "",
                    image: null,
                    options: ["", ""],
                    correct: 0
                },
            ],
        });
    };

    const removeQuestion = (index) => {
        if (confirm("Delete this question?")) {
            const questions = [...examForm.questions];
            questions.splice(index, 1);
            setExamForm({ ...examForm, questions });
        }
    };

    const addOption = (qIndex) => {
        const questions = [...examForm.questions];
        questions[qIndex].options.push("");
        setExamForm({ ...examForm, questions });
    };

    const removeOption = (qIndex, oIndex) => {
        const questions = [...examForm.questions];
        if (questions[qIndex].options.length <= 2) return;
        questions[qIndex].options.splice(oIndex, 1);
        if (questions[qIndex].correct === oIndex) questions[qIndex].correct = 0;
        setExamForm({ ...examForm, questions });
    };

    const updateQuestionText = (qIndex, value) => {
        const questions = [...examForm.questions];
        questions[qIndex].text = value;
        setExamForm({ ...examForm, questions });
    };

    const updateOptionText = (qIndex, oIndex, value) => {
        const questions = [...examForm.questions];
        questions[qIndex].options[oIndex] = value;
        setExamForm({ ...examForm, questions });
    };

    const markCorrect = (qIndex, oIndex) => {
        const questions = [...examForm.questions];
        questions[qIndex].correct = oIndex;
        setExamForm({ ...examForm, questions });
    };

    const handleQuestionTypeChange = (qIndex, type) => {
        const questions = [...examForm.questions];
        questions[qIndex].type = type;
        // Reset fields when switching types
        if (type === "text") {
            questions[qIndex].image = null;
        } else {
            questions[qIndex].text = "";
        }
        setExamForm({ ...examForm, questions });
    };

    const handleImageUpload = (qIndex, file) => {
        const questions = [...examForm.questions];
        questions[qIndex].image = URL.createObjectURL(file);
        setExamForm({ ...examForm, questions });
    };

    return (
        <div className="fixed inset-0 bg-white z-50 overflow-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Edit Questions</h2>
                <X className="cursor-pointer" onClick={() => setShowQuestionsFull(false)} />
            </div>

            {examForm.questions.map((q, qIndex) => (
                <div key={qIndex} className="border p-4 rounded mb-4">
                    {/* --- Question Type Selector --- */}
                    <div className="flex gap-4 mb-3">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name={`questionType-${qIndex}`}
                                value="text"
                                checked={q.type === "text"}
                                onChange={() => handleQuestionTypeChange(qIndex, "text")}
                            />
                            Text
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name={`questionType-${qIndex}`}
                                value="image"
                                checked={q.type === "image"}
                                onChange={() => handleQuestionTypeChange(qIndex, "image")}
                            />
                            Image
                        </label>
                    </div>

                    <div className="mb-3">
                        <label className="block font-medium text-gray-700 mb-2">
                            Question {qIndex + 1}
                        </label>
                        <input
                            type="text"
                            placeholder="Enter your question"
                            className="border p-2 rounded w-full mb-3"
                            value={q.text}
                            onChange={(e) => updateQuestionText(qIndex, e.target.value)}
                        />

                        {q.type === "image" && (
                            <div>
                                <label className="block font-medium mb-2 text-gray-700">
                                    Upload Question Image (Optional):
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(qIndex, e.target.files[0])}
                                    className="block w-full text-sm text-gray-700 
                   border border-gray-300 rounded cursor-pointer 
                   bg-gray-50 focus:outline-none file:mr-3 file:py-2 
                   file:px-4 file:rounded file:border-0 
                   file:text-sm file:font-semibold 
                   file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                                />
                                {q.image && (
                                    <img
                                        src={q.image}
                                        alt={`Question ${qIndex + 1}`}
                                        className="w-48 h-48 object-cover rounded mt-3 border border-gray-300"
                                    />
                                )}
                            </div>
                        )}
                    </div>


                    {/* --- Options Section --- */}
                    {q.options.map((opt, oIndex) => (
                        <div key={oIndex} className="flex gap-2 mb-2">
                            <input
                                type="text"
                                placeholder={`Option ${oIndex + 1}`}
                                className="border p-2 rounded w-full"
                                value={opt}
                                onChange={(e) => updateOptionText(qIndex, oIndex, e.target.value)}
                            />
                            <button onClick={() => removeOption(qIndex, oIndex)} className="text-red-600">
                                X
                            </button>
                            <button
                                onClick={() => markCorrect(qIndex, oIndex)}
                                className={`px-2 rounded ${q.correct === oIndex ? "bg-green-500 text-white" : "bg-gray-200"
                                    }`}
                            >
                                Correct
                            </button>
                        </div>
                    ))}

                    <button
                        onClick={() => addOption(qIndex)}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Add Option
                    </button>
                    <button
                        onClick={() => removeQuestion(qIndex)}
                        className="bg-red-600 text-white px-4 py-2 rounded ml-2"
                    >
                        Delete Question
                    </button>
                </div>
            ))}

            <button
                onClick={addQuestion}
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Add Question
            </button>

            <div className="mt-4">
                <button
                    onClick={() => setShowQuestionsFull(false)}
                    className="bg-gray-600 text-white px-4 py-2 rounded"
                >
                    Done
                </button>
            </div>
        </div>
    );
};

export default Questions;
