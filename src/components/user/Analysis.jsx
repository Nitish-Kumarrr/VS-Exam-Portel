import React from 'react'
import HeadingDescription from '../HeadingDescription'
import ScoresCard from '../ScoresCard'
const Analysis = () => {
  return (
    <div className="h-full flex flex-col gap-[10px]">
      <HeadingDescription heading="1005 - Analytics" description="Overall and Subject-wise Analytics"/>
      <div className="flex flex-col p-4 w-full">
        <div className="flex flex-col w-full  gap-2">
          <h5 className="text-xl">Latest Exam Ranks</h5>
          <div className="overflow-x-auto w-full flex gap-2 ">
           <ScoresCard />
          </div>
        </div>
        {/* <div className="flex bg-gray-200  p-4 ">
          <p className="text-xl">No Exam Analytics Yet</p>
        </div> */}
      </div>
    </div>
  )
}

export default Analysis