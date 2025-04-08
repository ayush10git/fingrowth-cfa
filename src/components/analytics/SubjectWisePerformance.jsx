import React from "react";
import PieChart from "./PieChart";

const SubjectWisePerformance = ({ subjectData = [], loading = false }) => {
  // Filter out subjects with total=0 to only show subjects with data
  // const filteredSubjectData = subjectData.filter(subject => subject.total > 0);
  
  return (
    <div className="grid gap-5 p-4 bg-white w-full min-w-[600px] rounded-md">
      <h1 className="text-xl">Subject Wise Performance</h1>
      {loading ? (
        <div className="text-gray-500">Loading subject data...</div>
      ) : subjectData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {subjectData.map((subject, index) => {
            const correctPercentage = Math.round((subject.correct / subject.total) * 100);
            
            return (
              <PieChart
                key={index}
                labels={["Correct", "Incorrect"]}
                data={[correctPercentage, 100 - correctPercentage]}
                cutout="18%"
                legends={false}
                subject={subject.name}
              />
            );
          })}
        </div>
      ) : (
        <div className="text-gray-500">No subject data available</div>
      )}
    </div>
  );
};

export default SubjectWisePerformance;