import Completion from "@/components/analytics/concept-analysis/Completion";
import CompletionTable from "@/components/analytics/concept-analysis/CompletionTable";
import Correctness from "@/components/analytics/concept-analysis/Correctness";
import CorrectnessBarGraph from "@/components/analytics/concept-analysis/CorrectnessBarGraph";
import PracticeConfidence from "@/components/analytics/concept-analysis/PracticeConfidence";
import QuestionType from "@/components/analytics/concept-analysis/QuestionType";
import SubjectWiseCompletion from "@/components/analytics/concept-analysis/SubjectWiseCompletion";
import Confidence from "@/components/analytics/mock-analysis/Confidence";
import CollapsibleTable from "@/components/practice/TopicsTable";
import React from "react";

const page = () => {
  return (
    <div className="absolute top-[70px] left-[65px] p-2 w-[calc(100%-65px)] flex flex-col gap-4">
      <h1 className="text-2xl p-2">Conecpt Analysis</h1>
      <div className="flex gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-center gap-3">
            <Correctness legends={false} />
            <Completion
              labels={["Complete", "Incomplete"]}
              data={[94, 21]}
              backgroundColor={["#8E6FD8", "#D6C7FB"]}
              cutout="75%"
              legends={false}
            />
          </div>
          <CorrectnessBarGraph />
        </div>
        <CompletionTable />
      </div>
      <div className="flex gap-3">
        <SubjectWiseCompletion />
        <div className="flex flex-col gap-3">
          <PracticeConfidence />
          <QuestionType />
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg">
        <h1 className="text-lg ">Practice</h1>
        <CollapsibleTable />
      </div>
    </div>
  );
};

export default page;
