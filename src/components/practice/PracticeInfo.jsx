import React from 'react'

const PracticeInfo = () => {
  return (
    <div>
      <div className="flex gap-[2.5rem] items-center">
      <div className="w-[122px] h-[110px] flex flex-col gap-1 items-center justify-center bg-[#8E6FD8] bg-opacity-50">
        <span className="text-3xl">67%</span>
        <span className="text-sm font-light">Correct</span>
      </div>

      <div className="flex gap-[3.5rem]">
        <div className="flex gap-2">
          <div className="w-[2px] h-[80px] bg-[#8E6FD8]"></div>
          <div className="flex flex-col justify-center gap-1 text-lg font-light">
            <span>1098 of 2574</span>
            <span>Questions Taken</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-[2px] h-[80px] bg-[#8E6FD8]"></div>
          <div className="flex flex-col justify-center gap-1 text-lg font-light">
            <span>00:01:18</span>
            <span>Avg. Time Taken / Ques.</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-[2px] h-[80px] bg-[#8E6FD8]"></div>
          <div className="flex flex-col justify-center gap-1 text-lg font-light">
            <span>00:01:31</span>
            <span>Avg. Time Taken / Correct Ques.</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-[2px] h-[80px] bg-[#8E6FD8]"></div>
          <div className="flex flex-col justify-center gap-1 text-lg font-light">
            <span>00:01:47</span>
            <span>Avg. Time Taken / Inorrect Ques.</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default PracticeInfo
