import React, { useEffect, useState } from "react";
import QuestionPage from "./QuestionPage";
import TestHeader from "./TestHeader";
import TestSection from "./TestSection";

const Test = () => {
  const tabs = ["Java"]
  const [currentQn, setCurrentQn] = useState(0);
  const [activeTab, setActiveTab] = useState("Java");
  const [timeLeft, setTimeLeft] = useState(10); 

  useEffect(() => {
    if (timeLeft <= 0) return; 

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer); 
  }, [timeLeft]);

  

  return (
    <div className="flex flex-col h-screen bg-gray-200 gap-2 w-screen">
      <TestHeader timeLeft={timeLeft}/>
      <div className="flex flex-col h-[calc(100vh-56px)] w-full mt-14 px-4 py-2 gap-2">
        <TestSection tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <QuestionPage currentQn={currentQn} setCurrentQn={setCurrentQn} active={activeTab} timeLeft={timeLeft}/>
      </div>
    </div>
  );
};

export default Test;
