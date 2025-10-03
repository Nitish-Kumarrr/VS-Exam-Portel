import React from 'react'
import TabContainer from './UI/TabContainer'

const ExamSection = ({tabs,activeTab, setActiveTab}) => {

  return (
    <div className="h-14 w-full flex items-center gap-4 bg-white p-2 shadow-lg rounded-sm">
        <p className="text-[16px] font-medium">Sections:</p>
        <TabContainer tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
    </div>
  )
}

export default ExamSection