import React from "react";

const ExamInfo = () => {
  return (
    <div className="flex gap-[2.5rem] items-center">
      <div className="w-[122px] h-[110px] flex flex-col gap-1 items-center justify-center bg-[#8E6FD8] bg-opacity-60">
        <span className="text-3xl">67%</span>
        <span className="text-sm font-light">Correct</span>
      </div>

      <div className="flex gap-[3.5rem]">
        <div className="flex gap-2">
          <div className="w-[2px] h-[80px] bg-[#8E6FD8]"></div>
          <div className="flex flex-col justify-center gap-1 text-lg font-light">
            <span>5 of 10</span>
            <span>Mock Exams Taken</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-[2px] h-[80px] bg-[#8E6FD8]"></div>
          <div className="flex flex-col justify-center gap-1 text-lg font-light">
            <span>00:01:04</span>
            <span>Avg. Time Taken / Ques</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-[2px] h-[80px] bg-[#8E6FD8]"></div>
          <div className="flex flex-col justify-center gap-1 text-lg font-light">
            <span>01:54:31</span>
            <span>Avg. Time Taken</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-[2px] h-[80px] bg-[#8E6FD8]"></div>
          <div className="flex flex-col justify-center gap-1 text-lg font-light">
            <span>335</span>
            <span>Avg. Score</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamInfo;
