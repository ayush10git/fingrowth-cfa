import React, { useState, useEffect } from "react";
import PieChart from "./PieChart";

const SubjectWisePerformance = () => {
  const [subjectData, setSubjectData] = useState([]);

  useEffect(() => {
    const fetchSubjectData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) return;

      try {
        const response = await fetch(
          "/api/analytics/overall?for=subject_wise_performance",
          {
            headers: { authtoken: authToken },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch subject data");

        const result = await response.json();

        if (result.success && result.data && result.data.subject_wise_performance) {
          setSubjectData(result.data.subject_wise_performance);
        }
      } catch (error) {
        console.error("Error fetching subject performance data:", error);
      }
    };

    fetchSubjectData();
  }, []);

  return (
    <div className="grid gap-5 p-4 bg-white w-full min-w-[600px] rounded-md">
      <h1 className="text-xl">Subject Wise Performance</h1>
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
    </div>
  );
};

export default SubjectWisePerformance;