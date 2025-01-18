import ExamInfo from "@/components/mocktest/ExamInfo";
import ExamListTable from "@/components/mocktest/ExamListTable";
import ProgressBar from "@/components/mocktest/ProgressBar";
import React from "react";

const page = () => {
  return (
    <div className="fixed top-[75px] left-[75px] w-[calc(100vw-75px)] h-[calc(100vh-75px)] py-2 px-4 overflow-y-auto">
      <div className="flex flex-col gap-3">
        <ProgressBar />
        <ExamInfo />
        <ExamListTable />
      </div>
    </div>
  );
};

export default page;
