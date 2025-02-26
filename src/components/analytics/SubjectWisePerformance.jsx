import React from "react";
import PieChart from "./PieChart";

const SubjectWisePerformance = () => {
  return (
    <div className="grid gap-5 p-4 bg-white w-full min-w-[600px] rounded-md">
    <h1 className="text-xl">Subject Wise Performance</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[45, 62, 75, 59, 90, 63, 60, 50, 39].map((correct, index) => (
          <PieChart
            key={index}
            labels={["Correct", "Incorrect"]}
            data={[correct, 100 - correct]}
            backgroundColor={
              index % 2 === 0 ? ["#8E6FD8", "#E8DEFF"] : undefined
            }
            cutout="18%"
            legends={false}
          />
        ))}
      </div>
    </div>
  );
};

export default SubjectWisePerformance;
