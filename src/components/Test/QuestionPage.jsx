import React, { useEffect, useState } from 'react'
import Instructions from './Instuctions';
import Modal from '../UI/Modal';

const data = [
    {
        "questionId": 1,
        "content": "Which keyword is used to inherit a class in Java?",
        "image": null,
        "option1": "extends",
        "option2": "implements",
        "option3": "inherits",
        "option4": "instanceof",
        "answer": "extends",
        "quiz": {
            "qId": 3,
            "title": "Java & DSA Fundamentals",
            "description": "Core Java and basic DSA questions for coding interviews.",
            "maxMarks": "40",
            "numberOfQuestions": "10",
            "active": true,
            "category": {
                "cid": 402,
                "title": "Software Engineer",
                "description": "Quizzes on programming, data structures, algorithms, and system design."
            }
        }
    },
    {
        "questionId": 2,
        "content": "Which of the following is not a feature of Java?",
        "image": null,
        "option1": "Platform Independent",
        "option2": "Object Oriented",
        "option3": "Pointers",
        "option4": "Automatic Garbage Collection",
        "answer": "Pointers",
        "quiz": {
            "qId": 3,
            "title": "Java & DSA Fundamentals",
            "description": "Core Java and basic DSA questions for coding interviews.",
            "maxMarks": "40",
            "numberOfQuestions": "10",
            "active": true,
            "category": {
                "cid": 402,
                "title": "Software Engineer",
                "description": "Quizzes on programming, data structures, algorithms, and system design."
            }
        }
    },
    {
        "questionId": 3,
        "content": "What is the size of int in Java?",
        "image": null,
        "option1": "2 bytes",
        "option2": "4 bytes",
        "option3": "8 bytes",
        "option4": "Depends on OS",
        "answer": "4 bytes",
        "quiz": {
            "qId": 3,
            "title": "Java & DSA Fundamentals",
            "description": "Core Java and basic DSA questions for coding interviews.",
            "maxMarks": "40",
            "numberOfQuestions": "10",
            "active": true,
            "category": {
                "cid": 402,
                "title": "Software Engineer",
                "description": "Quizzes on programming, data structures, algorithms, and system design."
            }
        }
    },
    {
        "questionId": 4,
        "content": "Which of the following data structures uses FIFO order?",
        "image": null,
        "option1": "Stack",
        "option2": "Queue",
        "option3": "Tree",
        "option4": "Graph",
        "answer": "Queue",
        "quiz": {
            "qId": 3,
            "title": "Java & DSA Fundamentals",
            "description": "Core Java and basic DSA questions for coding interviews.",
            "maxMarks": "40",
            "numberOfQuestions": "10",
            "active": true,
            "category": {
                "cid": 402,
                "title": "Software Engineer",
                "description": "Quizzes on programming, data structures, algorithms, and system design."
            }
        }
    },
    {
        "questionId": 5,
        "content": "Which collection class is synchronized in Java?",
        "image": null,
        "option1": "ArrayList",
        "option2": "LinkedList",
        "option3": "Vector",
        "option4": "HashSet",
        "answer": "Vector",
        "quiz": {
            "qId": 3,
            "title": "Java & DSA Fundamentals",
            "description": "Core Java and basic DSA questions for coding interviews.",
            "maxMarks": "40",
            "numberOfQuestions": "10",
            "active": true,
            "category": {
                "cid": 402,
                "title": "Software Engineer",
                "description": "Quizzes on programming, data structures, algorithms, and system design."
            }
        }
    },
    {
        "questionId": 6,
        "content": "Which sorting algorithm has the best average-case complexity?",
        "image": null,
        "option1": "Bubble Sort",
        "option2": "Quick Sort",
        "option3": "Selection Sort",
        "option4": "Insertion Sort",
        "answer": "Quick Sort",
        "quiz": {
            "qId": 3,
            "title": "Java & DSA Fundamentals",
            "description": "Core Java and basic DSA questions for coding interviews.",
            "maxMarks": "40",
            "numberOfQuestions": "10",
            "active": true,
            "category": {
                "cid": 402,
                "title": "Software Engineer",
                "description": "Quizzes on programming, data structures, algorithms, and system design."
            }
        }
    },
    {
        "questionId": 7,
        "content": "What is the time complexity to search an element in a balanced binary search tree?",
        "image": null,
        "option1": "O(1)",
        "option2": "O(log n)",
        "option3": "O(n)",
        "option4": "O(n log n)",
        "answer": "O(log n)",
        "quiz": {
            "qId": 3,
            "title": "Java & DSA Fundamentals",
            "description": "Core Java and basic DSA questions for coding interviews.",
            "maxMarks": "40",
            "numberOfQuestions": "10",
            "active": true,
            "category": {
                "cid": 402,
                "title": "Software Engineer",
                "description": "Quizzes on programming, data structures, algorithms, and system design."
            }
        }
    },
    {
        "questionId": 8,
        "content": "Which of these exceptions is checked during compile time?",
        "image": null,
        "option1": "NullPointerException",
        "option2": "ArrayIndexOutOfBoundsException",
        "option3": "IOException",
        "option4": "ArithmeticException",
        "answer": "IOException",
        "quiz": {
            "qId": 3,
            "title": "Java & DSA Fundamentals",
            "description": "Core Java and basic DSA questions for coding interviews.",
            "maxMarks": "40",
            "numberOfQuestions": "10",
            "active": true,
            "category": {
                "cid": 402,
                "title": "Software Engineer",
                "description": "Quizzes on programming, data structures, algorithms, and system design."
            }
        }
    },
    {
        "questionId": 9,
        "content": "In Java, which keyword prevents a class from being inherited?",
        "image": null,
        "option1": "final",
        "option2": "static",
        "option3": "abstract",
        "option4": "const",
        "answer": "final",
        "quiz": {
            "qId": 3,
            "title": "Java & DSA Fundamentals",
            "description": "Core Java and basic DSA questions for coding interviews.",
            "maxMarks": "40",
            "numberOfQuestions": "10",
            "active": true,
            "category": {
                "cid": 402,
                "title": "Software Engineer",
                "description": "Quizzes on programming, data structures, algorithms, and system design."
            }
        }
    },
    {
        "questionId": 10,
        "content": "What is the default value of a local variable in Java?",
        "image": null,
        "option1": "0",
        "option2": "null",
        "option3": "Depends on the data type",
        "option4": "No default value (must be initialized)",
        "answer": "No default value (must be initialized)",
        "quiz": {
            "qId": 3,
            "title": "Java & DSA Fundamentals",
            "description": "Core Java and basic DSA questions for coding interviews.",
            "maxMarks": "40",
            "numberOfQuestions": "10",
            "active": true,
            "category": {
                "cid": 402,
                "title": "Software Engineer",
                "description": "Quizzes on programming, data structures, algorithms, and system design."
            }
        }
    }
]

const QuestionPage = ({ currentQn, setCurrentQn, activeTab, timeLeft }) => {
    const [questions, setQuestions] = useState(data);
    const [responses, setResponses] = useState({});
    const [status, setStatus] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [showQuestionPaper, setShowQuestionPaper] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);
    const handleOptionSelect = (option) => {
        setResponses((prev) => ({
            ...prev,
            [currentQn]: option,
        }));
    };

    const handleReviewAndNext = () => {
        setStatus((prev) => ({
            ...prev,
            [currentQn]: "review",
        }));
        if (currentQn < data.length - 1) setCurrentQn(currentQn + 1);
    };

    const handleSaveAndNext = () => {
        setStatus((prev) => ({
            ...prev,
            [currentQn]: "answered",
        }));
        if (currentQn < data.length - 1) setCurrentQn(currentQn + 1);
    };
    const handleFinishExam = () => {
        let total = 0;
        questions.forEach((q, idx) => {
            if (responses[idx] === q.answer) {
                total += 1;
            }
        });
        setScore(total);
        setIsFinished(true);
    };
    useEffect(() => {
        if (timeLeft === 0) {
            handleFinishExam()
        }
    }, [timeLeft]);
    if (isFinished) {
        return (
            <div className="h-[calc(100vh-170px)] w-full flex items-center justify-center">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                    <h2 className="text-xl font-bold mb-4">Exam Finished ✅</h2>
                    <p className="text-lg">Your Score: <span className="font-bold">{score}</span></p>
                    <p className="text-sm text-gray-600 mt-2">Total Questions: {questions.length}</p>
                </div>
            </div>
        );
    }
    //   const selectedOption = responses[currentQn];
    return (
        <div className="h-[calc(100vh-170px)] w-full flex gap-3">
            <div className="flex flex-col flex-1 h-[calc(100vh-130px)] w-full">
                <div className="h-[calc(100vh-90px)] w-full bg-white">
                    <div className="flex-1 p-6">
                        <h2 className="font-bold text-lg mb-2">Question No. {currentQn + 1}</h2>
                        <p className="text-gray-700 text-sm mb-4">
                            Question has ONLY ONE correct option <br />
                            Marking Scheme: <br />
                            • +1 Marks : If Correct <br />
                            • 0 Marks : If Incorrect <br />

                        </p>

                        <div className="rounded-lg  bg-white">
                            <p className="mb-4 border p-4">
                                {questions[currentQn]?.content}
                            </p>

                            {questions[currentQn]?.image ? <div className="flex items-center justify-center gap-4">
                                <button className="border px-4 py-2 rounded-full bg-gray-500 cursor-pointer text-white">A</button>
                                <button className="border px-4 py-2 rounded-full bg-gray-500 cursor-pointer text-white">B</button>
                                <button className="border px-4 py-2 rounded-full bg-gray-500 cursor-pointer text-white">C</button>
                                <button className="border px-4 py-2 rounded-full bg-gray-500 cursor-pointer text-white">D</button>
                            </div> :
                                <div className="flex flex-col  gap-2">
                                    <div className="flex gap-3 items-center">
                                        <span>A)</span><button
                                            onClick={() => handleOptionSelect(questions[currentQn]?.option1)}
                                            className={`border px-4 py-2 rounded-sm cursor-pointer text-black 
        ${responses[currentQn] === questions[currentQn]?.option1 ? "bg-blue-500 text-white" : "bg-white"}`}>{questions[currentQn]?.option1}</button>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <span>B)</span><button onClick={() => handleOptionSelect(questions[currentQn]?.option2)}
                                            className={`border px-4 py-2 rounded-sm cursor-pointer text-black 
        ${responses[currentQn] === questions[currentQn]?.option2 ? "bg-blue-500 text-white" : "bg-white"}`}>{questions[currentQn]?.option2}</button>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <span>C)</span><button onClick={() => handleOptionSelect(questions[currentQn]?.option3)}
                                            className={`border px-4 py-2 rounded-sm cursor-pointer text-black 
        ${responses[currentQn] === questions[currentQn]?.option3 ? "bg-blue-500 text-white" : "bg-white"}`}>{questions[currentQn]?.option3}</button>
                                    </div>
                                    <div className="flex gap-3 items-center">
                                        <span>D)</span><button onClick={() => handleOptionSelect(questions[currentQn]?.option4)}
                                            className={`border px-4 py-2 rounded-sm cursor-pointer text-black 
        ${responses[currentQn] === questions[currentQn]?.option4 ? "bg-blue-500 text-white" : "bg-white"}`}>{questions[currentQn]?.option4}</button>
                                    </div>

                                </div>
                            }
                        </div>


                    </div>
                </div>
                <div className="flex justify-between items-center gap-1 h-10">
                    <button className="w-[50%] h-6 flex items-center justify-center bg-gray-400 text-white cursor-pointer rounded-2xl"
                        onClick={handleReviewAndNext}
                    >Mark for Review & Next</button>
                    <button className="w-[50%] h-6 flex items-center justify-center bg-blue-500 text-white cursor-pointer rounded-2xl"
                        onClick={handleSaveAndNext}
                    >Save & Next</button>
                </div>
            </div>
            <div className="w-[350px] h-[calc(100vh-130px)] flex flex-col justify-between">
                <div className="w-full flex flex-col bg-white p-4 gap-3">
                    <div className="w-full flex justify-between items-center">
                        <p>JAVA - Question Paper</p>
                        <span></span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {Array.from({ length: data.length }, (_, i) => i + 1).map((num, index) => {
                            const qStatus = status[index];
                            const isCurrent = currentQn === index;

                            let bgColor = "bg-gray-300";
                            if (qStatus === "review") bgColor = "bg-yellow-400";
                            if (qStatus === "answered") bgColor = "bg-green-500";
                            if (isCurrent && !qStatus) bgColor = "bg-orange-400";

                            return (
                                <button
                                    key={num}
                                    onClick={() => setCurrentQn(index)}
                                    className={`w-8 h-8 rounded cursor-pointer text-white ${bgColor}`}
                                >
                                    {num}
                                </button>
                            );
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full ">
                    <div className="flex w-full justify-between items-center gap-2">
                        <button className="w-[50%] h-6 flex items-center justify-center bg-gray-400 text-white cursor-pointer rounded-2xl" onClick={() => setShowQuestionPaper(true)}>Question Paper</button>
                        <button className="w-[50%] h-6 flex items-center justify-center bg-gray-400 text-white cursor-pointer rounded-2xl" onClick={() => setShowInstructions(true)}>Instructions</button>
                    </div>
                    <button className="w-full h-6 flex items-center justify-center bg-gray-400 text-white  rounded-2xl cursor-pointer" onClick={handleFinishExam}>Finish Exam</button>
                </div>
            </div>
            {/* Question Paper Modal */}
            {showQuestionPaper && (
                <Modal title="Question Paper" onClose={() => setShowQuestionPaper(false)}>
                    <ul className="space-y-3 text-gray-800">
                        {questions.map((q, index) => (
                            <li key={q.questionId} className="border-b pb-2">
                                <b>Q{index + 1}:</b> {q.content}
                            </li>
                        ))}
                    </ul>
                </Modal>
            )}

            {/* Instructions Modal */}
            {showInstructions && (
                <Modal title="Instructions" onClose={() => setShowInstructions(false)}>
                    <Instructions />
                </Modal>
            )}
        </div>
    )
}

export default QuestionPage