import React from 'react'
import VijaySoftwareSolutions from "/VijaySoftwareSolutions.jpg"
const TestHeader = ({ timeLeft }) => {
    const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return (
    <header className="h-14 bg-white flex items-center justify-between px-4 shadow-sm fixed top-0 left-0 right-0 z-10">
                <div className="flex items-center gap-[22px] h-14 overflow-hidden">
                  <img
                    src={VijaySoftwareSolutions}
                    alt="logo"
                    className="h-[100px] w-[100px]"
                  />
                </div>
                <div className="flex items-center">
                  <p className="text-md">Weekly Test</p>
                </div>
                <div className="flex items-center">
                  <p className="text-md text-blue-400">Time Left: {String(minutes).padStart(2, "0")}:
          {String(seconds).padStart(2, "0")}</p>
                </div>
              </header>
  )
}

export default TestHeader;