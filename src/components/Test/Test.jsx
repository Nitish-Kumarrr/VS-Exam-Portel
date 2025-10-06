import React, { useState } from "react";
import QuestionPage from "./QuestionPage";
import TestHeader from "./TestHeader";
import TestSection from "./TestSection";

const Test = () => {
  const tabs = ["Maths", "Physics", "Chemistry"]
  const [currentQn, setCurrentQn] = useState(1);
  const [activeTab, setActiveTab] = useState("Maths")

  return (
    <div className="flex flex-col h-screen bg-gray-200 gap-2 w-screen">
      <TestHeader />
      <div className="flex flex-col h-[calc(100vh-56px)] w-full mt-14 px-4 py-2 gap-2">
        <TestSection tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        <QuestionPage currentQn={currentQn} setCurrentQn={setCurrentQn} active={activeTab}/>
      </div>
    </div>
  );
};

export default Test;
