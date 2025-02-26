import React from "react";
import Tooltip from "@mui/material/Tooltip";

const MockResultsVisualization = () => {
  const mockData = [
    {
      name: "Mock 1",
      subjects: [
        { name: "Math", score: 85, color: "#1f77b4" },
        { name: "Science", score: 75, color: "#aec7e8" },
        { name: "English", score: 65, color: "#ffbb78" },
        { name: "History", score: 80, color: "#98df8a" },
        { name: "Geography", score: 70, color: "#ff9896" },
        { name: "Physics", score: 60, color: "#c5b0d5" },
        { name: "Chemistry", score: 75, color: "#c49c94" },
        { name: "Biology", score: 55, color: "#f7b6d2" },
        { name: "Computer Science", score: 90, color: "#dbdb8d" },
        { name: "Economics", score: 72, color: "#cedb9c" },
      ],
    },
    {
      name: "Mock 2",
      subjects: [
        { name: "Math", score: 80, color: "#1e77b4" },
        { name: "Science", score: 70, color: "#aec7e8" },
        { name: "English", score: 90, color: "#ffbb78" },
        { name: "History", score: 75, color: "#98df8a" },
        { name: "Geography", score: 45, color: "#ff9896" },
        { name: "Physics", score: 65, color: "#c5b0d5" },
        { name: "Chemistry", score: 78, color: "#c49c94" },
        { name: "Biology", score: 88, color: "#f7b6d2" },
        { name: "Computer Science", score: 72, color: "#dbdb8d" },
        { name: "Economics", score: 68, color: "#cedb9c" },
      ],
    },
    {
      name: "Mock 3",
      subjects: [
        { name: "Math", score: 92, color: "#1e77b4" },
        { name: "Science", score: 60, color: "#aec7e8" },
        { name: "English", score: 75, color: "#ffbb78" },
        { name: "History", score: 78, color: "#98df8a" },
        { name: "Geography", score: 83, color: "#ff9896" },
        { name: "Physics", score: 65, color: "#c5b0d5" },
        { name: "Chemistry", score: 76, color: "#c49c94" },
        { name: "Biology", score: 85, color: "#f7b6d2" },
        { name: "Computer Science", score: 80, color: "#dbdb8d" },
        { name: "Economics", score: 70, color: "#cedb9c" },
      ],
    },
    {
      name: "Mock 4",
      subjects: [
        { name: "Math", score: 88, color: "#1e77b4" },
        { name: "Science", score: 78, color: "#aec7e8" },
        { name: "English", score: 67, color: "#ffbb78" },
        { name: "History", score: 82, color: "#98df8a" },
        { name: "Geography", score: 75, color: "#ff9896" },
        { name: "Physics", score: 65, color: "#c5b0d5" },
        { name: "Chemistry", score: 80, color: "#c49c94" },
        { name: "Biology", score: 58, color: "#f7b6d2" },
        { name: "Computer Science", score: 90, color: "#dbdb8d" },
        { name: "Economics", score: 73, color: "#cedb9c" },
      ],
    },
    {
      name: "Mock 5",
      subjects: [
        { name: "Math", score: 85, color: "#1e77b4" },
        { name: "Science", score: 77, color: "#aec7e8" },
        { name: "English", score: 70, color: "#ffbb78" },
        { name: "History", score: 80, color: "#98df8a" },
        { name: "Geography", score: 75, color: "#ff9896" },
        { name: "Physics", score: 68, color: "#c5b0d5" },
        { name: "Chemistry", score: 79, color: "#c49c94" },
        { name: "Biology", score: 60, color: "#f7b6d2" },
        { name: "Computer Science", score: 88, color: "#dbdb8d" },
        { name: "Economics", score: 74, color: "#cedb9c" },
      ],
    },
    {
      name: "Mock 6",
      subjects: [
        { name: "Math", score: 86, color: "#1e77b4" },
        { name: "Science", score: 76, color: "#aec7e8" },
        { name: "English", score: 68, color: "#ffbb78" },
        { name: "History", score: 81, color: "#98df8a" },
        { name: "Geography", score: 73, color: "#ff9896" },
        { name: "Physics", score: 66, color: "#c5b0d5" },
        { name: "Chemistry", score: 77, color: "#c49c94" },
        { name: "Biology", score: 59, color: "#f7b6d2" },
        { name: "Computer Science", score: 87, color: "#dbdb8d" },
        { name: "Economics", score: 75, color: "#cedb9c" },
      ],
    },
    {
      name: "Mock 7",
      subjects: [
        { name: "Math", score: 84, color: "#1e77b4" },
        { name: "Science", score: 75, color: "#aec7e8" },
        { name: "English", score: 66, color: "#ffbb78" },
        { name: "History", score: 79, color: "#98df8a" },
        { name: "Geography", score: 72, color: "#ff9896" },
        { name: "Physics", score: 64, color: "#c5b0d5" },
        { name: "Chemistry", score: 76, color: "#c49c94" },
        { name: "Biology", score: 57, color: "#f7b6d2" },
        { name: "Computer Science", score: 86, color: "#dbdb8d" },
        { name: "Economics", score: 71, color: "#cedb9c" },
      ],
    },
  ];

  return (
    <div className="p-4 bg-white rounded-md flex flex-col gap-4">
      <h1 className="text-xl font-bold mb-8">What Made You Score Less</h1>

      <div className="space-y-6">
        {mockData.map((mock) => {
          const totalScore = mock.subjects.reduce(
            (sum, subject) => sum + subject.score,
            0
          );

          return (
            <div key={mock.name} className="mb-6">
              <div className="flex items-center mb-2">
                <span className="font-medium w-16">{mock.name}</span>
                <div className="flex-1 h-8 rounded-lg overflow-hidden flex">
                  {mock.subjects.map((subject) => {
                    const widthPercentage = (subject.score / totalScore) * 100;

                    return (
                      <Tooltip
                        key={`${mock.name}-${subject.name}`}
                        title={`${subject.name}: ${subject.score}%`}
                        arrow
                      >
                        <div
                          className="h-full transition-opacity duration-200 hover:opacity-80 cursor-pointer"
                          style={{
                            width: `${widthPercentage}%`,
                            backgroundColor: subject.color,
                          }}
                        />
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 justify-center">
        {mockData[0].subjects.map((subject) => (
          <div
            key={subject.name}
            className="flex items-center gap-2 text-zinc-500 text-xs"
          >
            <div
              className="w-3 h-3"
              style={{ backgroundColor: subject.color }}
            ></div>
            <span>{subject.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockResultsVisualization;
