"use client";
import React from "react";
import CompletionProgress from "./CompletionProgress";
import MockCompletionBar from "./MockCompletionBar";

const SubjectCompletions = ({ subjectData = [], loading = false }) => {
  // Filter out subjects with total=0 and calculate completion percentages
  const subjectsWithPercentages = subjectData
    .filter(subject => subject.total > 0)
    .map(subject => {
      const completionPercentage = Math.round((subject.attempted / subject.total) * 100);
      
      return {
        name: subject.name,
        completion: completionPercentage
      };
    });

  // Limit the display to prevent overcrowding - show only first 10 subjects
  const displaySubjects = subjectsWithPercentages.slice(0, 24);

  return (
    <div className="pl-7 py-4 bg-white rounded-md w-full">
      <h1 className="mb-4 text-xl">Completion</h1>
      <div className="flex gap-10">
        <div className="w-[85%] flex flex-col gap-3">
          {loading ? (
            <div className="text-gray-500">Loading subject data...</div>
          ) : displaySubjects.length > 0 ? (
            displaySubjects.map((subject, index) => (
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