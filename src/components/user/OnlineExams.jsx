import React, { useState } from 'react'
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { MdSend } from "react-icons/md";
import { IoMdPlayCircle } from "react-icons/io";
import StartExam from '../StartExam';
import Exams from '../publicRoutes/OnlineExams/Exams';
import Questions from '../publicRoutes/OnlineExams/Questions';
import Home from '../publicRoutes/OnlineExams/Home';
import Protections from '../publicRoutes/OnlineExams/Protections';
import Webcam from '../publicRoutes/OnlineExams/Webcam';
import Secure from '../publicRoutes/OnlineExams/Secure';
import HeadingDescription from '../HeadingDescription';

const OnlineExams = () => {
  const [showVedio, setShowVedio] = useState(false)
  const [showExamInfo, setShowExamInfo] = useState(false)
  console.log(localStorage.getItem("role"),"role")
  const [role,setRole]= useState(localStorage.getItem("role"))
  return (
    <>
       <div className="h-full flex flex-col gap-[10px]">
        <HeadingDescription heading="Online Exams" description="Select the Online Exam you'd like to attempt" />
        <div className="border-1 border-gray-200 mx-4" ></div>
        <div className="flex flex-col gap-[10px] px-4 pt-1 pb-4">
          <h1 className="text-[22px] text-[#000000DE]">Open & Upcoming Exams</h1>
          <div className="flex flex-col gap-[10px] shadow-lg pb-3">
            <div className="px-4 py-2 flex items-center gap-2 ">
              <span className="cursor-pointer" onClick={() => setShowExamInfo(prev => !prev)}><IoMdArrowDropdownCircle size={24} /></span>
              <p className="text-red-500 text-[22px]">ASE-Trainee </p>
              <p className="text-black-500 text-[22px]">- 1 Exam</p>
            </div>
            {showExamInfo && <div className="border-1 border-gray-100"></div>}
            {showExamInfo && <div className="p-4 w-full flex ">
              <StartExam />
            </div>}
          </div>
        </div>
        <div className="border-1 border-gray-200 mx-4" ></div>
        <div className="p-4 w-full flex justify-between">
          <div className={`"flex flex-col gap-3 shadow-2xl ${showVedio ? "h-[300px]" : "h-max"}  w-[400px] rounded-md "`}>
            <div className="w-full p-3 bg-blue-500 h-[55px] flex items-center justify-between rounded-t-md">
              <p className="text-white text-[20px]">VS-Solutions-Hiring</p>
              <span className="cursor-pointer" onClick={() => setShowVedio(prev => !prev)}><IoMdPlayCircle size={24} color="white" /></span>
            </div>
            {showVedio && (
              <div className="w-full flex justify-center p-4">
                <iframe
                  width="100%"
                  height="200"
                  src="https://www.youtube.com/embed/pKyiLrMLQ80"
                  title="VS Solutions Hiring"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-md"
                ></iframe>
              </div>
            )}
          </div>

        </div>
      </div> 
        
    </>
  )
}

export default OnlineExams