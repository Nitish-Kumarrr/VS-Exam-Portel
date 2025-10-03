import React, { useState } from 'react'
import { FaXmark } from "react-icons/fa6";
const initialScores = [
  { id: 1, date: "13 Sep 2025", exam: "IIT-JEE", score: "10/10", rank: "1 out of 1 student" },
  { id: 2, date: "14 Sep 2025", exam: "NEET", score: "9/10", rank: "2 out of 10 students" },
  { id: 3, date: "15 Sep 2025", exam: "AIIMS", score: "8/10", rank: "3 out of 15 students" },
  { id: 4, date: "16 Sep 2025", exam: "BITSAT", score: "7/10", rank: "5 out of 20 students" },
  { id: 5, date: "17 Sep 2025", exam: "JEE-Advanced", score: "10/10", rank: "1 out of 5 students" },
];
const ScoresCard = () => {
    const [scores, setScores] = useState(initialScores);

  const handleRemove = (id) => {
    setScores(scores.filter((score) => score.id !== id));
  };
    return (
        // <div className="h-[120px] w-[300px] flex-shrink-0 bg-amber-300 flex flex-col gap-3 p-3">
        //     <div className="flex justify-between items-center">
        //         <p className="text-xl ">13 Sep 2025-IIT-JEE</p>
        //         <p className=" w-4 bg-white"><FaXmark /></p>
        //     </div>
        //     <div className="flex flex-col gap-2">
        //         <div className="flex items-center">
        //             <p>Score -</p>
        //             <p className="text-white">10/10</p>
        //         </div>
        //         <div className="flex items-center">
        //             <p>Rank -</p>
        //             <p className="text-white">1 out of 1 student</p>
        //         </div>
        //     </div>
        // </div>
        <>
        {scores.map((score) => (
        <div
          key={score.id}
          className="h-[120px] w-[300px] flex-shrink-0 bg-amber-300 flex flex-col gap-3 p-3"
        >
          <div className="flex justify-between items-center">
            <p className="text-xl">
              {score.date}-{score.exam}
            </p>
            <button
              onClick={() => handleRemove(score.id)}
              className="w-4 bg-white flex items-center justify-center cursor-pointer"
            >
              <FaXmark />
            </button>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p>Score -</p>
              <p className="text-white">{score.score}</p>
            </div>
            <div className="flex items-center gap-2">
              <p>Rank -</p>
              <p className="text-white">{score.rank}</p>
            </div>
          </div>
        </div>
      ))}
      {scores.length === 0 && <p>No scores available</p>}
    </>
    )
}

export default ScoresCard