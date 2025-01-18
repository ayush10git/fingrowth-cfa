import ProgressBar from "@/components/mocktest/ProgressBar";
import PracticeInfo from "@/components/practice/PracticeInfo";
import TopicsTable from "@/components/practice/TopicsTable";

const page = () => {
  return (
    <div className="fixed top-[75px] left-[70px] w-[calc(100vw-75px)] h-[calc(100vh-75px)] py-2 px-2 overflow-y-auto">
      <div className="flex flex-col gap-3">
        <ProgressBar />
        <PracticeInfo />
        <TopicsTable />
      </div>
    </div>
  );
};

export default page;
