import React, { useEffect, useRef, useState } from 'react'
import { MdSend } from 'react-icons/md'
import RulesPopup from './RulesPopup';
import { useNavigate } from "react-router-dom";

const StartExam = () => {
  const navigate = useNavigate();
  const [showRulesPopup, setShowRulesPopup] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const handleStartExamClick = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setStream(mediaStream);
      setShowRulesPopup(true);
    } catch (err) {
      alert("Camera and Microphone access is required to take the exam.");
      console.error(err);
    }
  };

  const handleAcceptRules = () => {
    setShowRulesPopup(false);
    navigate("/online-exams/test")
  };

  const handleCancel = () => {
    setShowRulesPopup(false);
    if (stream) {
      stream.getTracks().forEach(track => track.stop()); 
    }
  };
    return (
        <>
        <div className="flex flex-col gap-3 shadow-2xl h-[275px] w-[400px] rounded-md overflow-hidden">
            <div className="w-full p-3 bg-blue-500 h-[55px] flex items-center">
                <p className="text-white text-[20px]">VS-Solutions-Hiring</p>
            </div>
            <div className="flex items-center justify-between p-3 w-full">
                <p className="bg-green-400 flex items-center justify-center px-3 py-2 rounded-md text-white" >25 Questions</p>
                <p className="bg-red-500 flex items-center justify-center px-3 py-2 rounded-md text-white">25 Mins</p>
                <p className="bg-yellow-400 flex items-center justify-center px-3 py-2 rounded-md text-white">25 Marks</p>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center justify-between px-3 py-1 w-full">
                    <p className="text-md">Start At</p>
                    <p className="text-red-500 text-md">8:30 PM, 15 Sep 2025</p>
                </div>
                <div className="flex items-center justify-between px-3 py-1 w-full">
                    <p className="text-md">Start Before</p>
                    <p className="text-red-500 text-md">11:59 PM, 16 Sep 2025</p>
                </div>
            </div>
            <div className="w-full flex items-center justify-center">
                <button
                    onClick={handleStartExamClick}
                    className="flex items-center justify-center gap-1 h-10 w-[120px]  bg-blue-500 text-white rounded-md cursor-pointer">Start Exam <MdSend /></button>
            </div>
        </div>
        {showRulesPopup && (
        <RulesPopup handleAcceptRules={handleAcceptRules} handleCancel={handleCancel} setShowRulesPopup={setShowRulesPopup} videoRef={videoRef}/>
      )}
        </>
    )
}

export default StartExam