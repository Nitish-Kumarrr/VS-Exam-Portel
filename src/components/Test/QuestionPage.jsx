import React from 'react'

const QuestionPage = ({currentQn,setCurrentQn,activeTab}) => {
    return (
        <div className="h-[calc(100vh-170px)] w-full flex gap-3">
            <div className="flex flex-col flex-1 h-[calc(100vh-130px)] w-full">
                <div className="h-[calc(100vh-90px)] w-full bg-white">
                    <div className="flex-1 p-6">
                        <h2 className="font-bold text-lg mb-2">Question No. {currentQn}</h2>
                        <p className="text-gray-700 text-sm mb-4">
                            Question has ONLY ONE correct option <br />
                            Marking Scheme: <br />
                            • +3 Marks : If Correct <br />
                            • -1 Marks : If Incorrect
                        </p>

                        <div className="rounded-lg  bg-white">
                            <p className="mb-4 border p-4">
                                Let α and β be the roots of x² - 6x - 2 = 0, with α &gt; β. If aₙ = αⁿ - βⁿ for n ≥ 1, then the value of <br />
                                (a₁₀ - 2a₈) / (2a₉) is?
                            </p>

                            <div className="flex items-center justify-center gap-4">
                                <button className="border px-4 py-2 rounded-full bg-gray-500 cursor-pointer text-white">A</button>
                                <button className="border px-4 py-2 rounded-full bg-gray-500 cursor-pointer text-white">B</button>
                                <button className="border px-4 py-2 rounded-full bg-gray-500 cursor-pointer text-white">C</button>
                                <button className="border px-4 py-2 rounded-full bg-gray-500 cursor-pointer text-white">D</button>
                            </div>
                        </div>


                    </div>
                </div>
                <div className="flex justify-between items-center gap-1 h-10">
                    <button className="w-[50%] h-6 flex items-center justify-center bg-gray-400 text-white cursor-pointer rounded-2xl">Mark for Review & Next</button>
                    <button className="w-[50%] h-6 flex items-center justify-center bg-blue-500 text-white cursor-pointer rounded-2xl">Save & Next</button>
                </div>
            </div>
            <div className="w-[350px] h-[calc(100vh-130px)] flex flex-col justify-between">
                <div className="w-full flex flex-col bg-white p-4 gap-3">
                    <div className="w-full flex justify-between items-center">
                        <p>MATHS - Question Paper</p>
                        <span></span>
                    </div>
                    <div className="grid grid-cols-5 gap-2">
                        {[1, 2, 3, 4, 5].map((num) => (
                            <button
                                key={num}
                                onClick={() => setCurrentQn(num)}
                                className={`w-8 h-8 rounded cursor-pointer ${currentQn === num ? "bg-orange-400 text-white" : "bg-gray-200"
                                    }`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-2 w-full ">
                    <div className="flex w-full justify-between items-center gap-2">
                        <button className="w-[50%] h-6 flex items-center justify-center bg-gray-400 text-white cursor-pointer rounded-2xl">Question Paper</button>
                        <button className="w-[50%] h-6 flex items-center justify-center bg-gray-400 text-white cursor-pointer rounded-2xl">Instructions</button>
                    </div>
                    <button className="w-full h-6 flex items-center justify-center bg-gray-400 text-white  rounded-2xl cursor-pointer">Finish Exam</button>
                </div>
            </div>
        </div>
    )
}

export default QuestionPage