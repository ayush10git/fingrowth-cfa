import Confidence from "@/components/analytics/mock-analysis/Confidence";
import Correctness from "@/components/analytics/mock-analysis/Correctness";
import CorrectnessBarGraph from "@/components/analytics/mock-analysis/CorrectnessBarGraph";
import MockAnalysisTable from "@/components/analytics/mock-analysis/MockAnalysisTable";
import MockResultsVisualization from "@/components/analytics/mock-analysis/MockResultVisualization";
import SingleMockResultVisualization from "@/components/analytics/mock-analysis/SingleMockResultVisualisation";
import TimeAnalysisTable from "@/components/analytics/mock-analysis/TimeAnalysis";

const page = ({ params }) => {
  const { mockId } = params;
  const totalSolved = 25 + 30 + 20;
  const totalQuestions = 65 + 55 + 50;

  const correctPercentage = ((totalSolved / totalQuestions) * 100).toFixed(1);
  const incorrectPercentage = (100 - correctPercentage).toFixed(1);

  return (
    <div className="absolute top-[70px] left-[65px] p-2 flex flex-col gap-4 w-[calc(100%-65px)]">
      <h1 className="text-2xl p-2">Mock Analysis</h1>

      <div className="flex gap-3">
        <div className="flex flex-col gap-3">
          <Correctness
            labels={["Correct", "Incorrect"]}
            data={[correctPercentage, incorrectPercentage]}
            backgroundColor={["#8E6FD8", "#E8DEFF"]}
            cutout="78%"
            legends={false}
          />
          <Confidence />
        </div>
        <CorrectnessBarGraph />
      </div>
      <TimeAnalysisTable />
      <SingleMockResultVisualization mockId={mockId} />
    </div>
  );
};

export default page;
