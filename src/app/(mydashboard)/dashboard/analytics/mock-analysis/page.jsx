import Confidence from "@/components/analytics/mock-analysis/Confidence";
import Correctness from "@/components/analytics/mock-analysis/Correctness";
import CorrectnessBarGraph from "@/components/analytics/mock-analysis/CorrectnessBarGraph";
import DifficultyChart from "@/components/analytics/mock-analysis/DifficultyChart";
import Review from "@/components/analytics/mock-analysis/Review";
import StickyHeadTable from "@/components/mocktest/ExamListTable";
import ProgressBar from "@/components/mocktest/ProgressBar";

const page = () => {
  const totalSolved = 25 + 30 + 20;
  const totalQuestions = 65 + 55 + 50;

  const correctPercentage = ((totalSolved / totalQuestions) * 100).toFixed(1);
  const incorrectPercentage = (100 - correctPercentage).toFixed(1);

  return (
    <div className="absolute top-[70px] left-[65px] p-2 flex flex-col gap-4">
      <div className="flex gap-3">
        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Correctness
              labels={["Correct", "Incorrect"]}
              data={[correctPercentage, incorrectPercentage]}
              backgroundColor={["#8E6FD8", "#E8DEFF"]}
              cutout="78%"
              legends={false}
            />
            <Review
              labels={["Correct", "Incorrect"]}
              data={[correctPercentage, incorrectPercentage]}
              backgroundColor={["#8E6FD8", "#D6C7FB"]}
              cutout="75%"
              legends={false}
            />
          </div>
          <CorrectnessBarGraph />
        </div>
        <div className="flex flex-col gap-3">
          <Confidence />
          <DifficultyChart />
        </div>
      </div>
      <div className="flex flex-col gap-5 bg-white pt-4 px-4 rounded-lg">
        <h1 className="text-lg">Mock Tests</h1>
        <ProgressBar />
        <StickyHeadTable />
      </div>
    </div>
  );
};

export default page;
