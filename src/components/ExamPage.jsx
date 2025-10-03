import React, { useState } from "react";
import ExamHeader from "./Header/ExamHeader";
import ExamSection from "./ExamSection";
import QuestionPage from "./QuestionPage";

const ExamPage = () => {
  const tabs = ["Maths", "Physics", "Chemistry"]
  const [currentQn, setCurrentQn] = useState(1);
  const [activeTab, setActiveTab] = useState("Maths")

  return (
    <div className="flex flex-col h-screen bg-gray-200 gap-2 w-screen">
      <ExamHeader />
      <div className="flex flex-col h-[calc(100vh-56px)] w-full mt-14 px-4 py-2 gap-2">
        <ExamSection tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <QuestionPage currentQn={currentQn} setCurrentQn={setCurrentQn} active={activeTab}/>
      </div>
    </div>
  );
};

export default ExamPage;
