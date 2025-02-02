import Completion from "@/components/analytics/concept-analysis/Completion";
import { CompletionTable } from "@/components/analytics/concept-analysis/CompletionTable";
import ToggleGraphs from "@/components/analytics/concept-analysis/ToggleGraphs";
import Correctness from "@/components/analytics/mock-analysis/Correctness";
import CollapsibleTable from "@/components/practice/TopicsTable";
import React from "react";

const page = () => {
  const totalSolved = 25 + 30 + 20;
  const totalQuestions = 65 + 55 + 50;

  const correctPercentage = ((totalSolved / totalQuestions) * 100).toFixed(1);
  const incorrectPercentage = (100 - correctPercentage).toFixed(1);
  return (
    <div className="absolute top-[70px] left-[65px] p-2 w-[calc(100%-65px)] flex flex-col gap-4">
      <div className="flex gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-3">
            <Correctness
              labels={["Correct", "Incorrect"]}
              data={[correctPercentage, incorrectPercentage]}
              backgroundColor={["#8E6FD8", "#E8DEFF"]}
              cutout="78%"
              legends={false}
            />
            <Completion
              labels={["Complete", "Incomplete"]}
              data={[94, 21]}
              backgroundColor={["#8E6FD8", "#D6C7FB"]}
              cutout="75%"
              legends={false}
            />
          </div>
          <ToggleGraphs />
        </div>
        <CompletionTable />
      </div>
      <div className="bg-white p-4 rounded-lg">
      <h1 className="text-lg ">Practice</h1>
        <CollapsibleTable />
      </div>
    </div>
  );
};

export default page;
