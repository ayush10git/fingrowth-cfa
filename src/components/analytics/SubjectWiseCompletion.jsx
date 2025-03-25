"use client";
import React, { useEffect, useState } from "react";
import CompletionProgress from "./CompletionProgress";
import MockCompletionBar from "./MockCompletionBar";

const SubjectCompletions = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjectData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/analytics/overall?for=subject_wise_completion", {
          headers: { authtoken: authToken },
        });

        if (!response.ok) throw new Error("Failed to fetch subject data");

        const data = await response.json();
        if (data.success && data.data.subject_wise_completion) {
          setSubjectData(data.data.subject_wise_completion);
        }
      } catch (error) {
        console.error("Error fetching subject data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjectData();
  }, []);

  // Calculate completion percentages for each subject
  const subjectsWithPercentages = subjectData.map(subject => {
    const completionPercentage = subject.total > 0 
      ? Math.round((subject.attempted / subject.total) * 100) 
      : 0;
    
    return {
      name: subject.name,
      completion: completionPercentage
    };
  });

  return (
    <div className="pl-7 py-4 bg-white rounded-md w-full">
      <h1 className="mb-4 text-xl">Completion</h1>
      <div className="flex gap-10">
        <div className="w-[85%] flex flex-col gap-3">
          {loading ? (
            <div className="text-gray-500">Loading subject data...</div>
          ) : subjectsWithPercentages.length > 0 ? (
            subjectsWithPercentages.map((subject, index) => (
              <CompletionProgress 
                key={index}
                subject={subject.name} 
                completion={subject.completion} 
              />
            ))
          ) : (
            <div className="text-gray-500">No subject data available</div>
          )}
        </div>
        <div className="relative bottom-7">
          <MockCompletionBar subject="Mock Completion" completion={40} />
        </div>
      </div>
    </div>
  );
};

export default SubjectCompletions;