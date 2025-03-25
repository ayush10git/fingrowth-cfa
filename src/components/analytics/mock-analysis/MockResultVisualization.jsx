"use client"
import React, { useState, useEffect } from "react";
import Tooltip from "@mui/material/Tooltip";

const MockResultsVisualization = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mockData, setMockData] = useState([]);

  // Color palette for subjects
  const subjectColors = {
    Mathematics: "#1f77b4",
    Science: "#aec7e8",
    History: "#98df8a",
    Geography: "#ff9896",
    English: "#ffbb78",
    Physics: "#c5b0d5",
    Chemistry: "#c49c94",
    Biology: "#f7b6d2",
    Literature: "#dbdb8d",
    Economics: "#cedb9c",
  };

  // Process the API data into the format needed for visualization
  const processApiData = (apiData) => {
    const processedData = Object.entries(apiData).map(
      ([testName, subjects]) => {
        const subjectData = Object.entries(subjects).map(
          ([subjectName, scores]) => {
            const score = parseInt(scores.score_get);
            const totalAttempted = parseInt(scores.total_attempted_score);
            const scorePercentage = (score / totalAttempted) * 100;

            return {
              name: subjectName,
              score: scorePercentage,
              rawScore: score,
              totalAttempted: totalAttempted,
              color: subjectColors[subjectName] || "#999999", // Default color if not in palette
            };
          }
        );

        return {
          name: testName,
          subjects: subjectData,
        };
      }
    );

    setMockData(processedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "/api/analytics/mocktest?for=mock_what_made_you_score_less",
          {
            headers: { authtoken: authToken },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        console.log("API response:", result);

        if (result.success) {
          processApiData(result.data.mock_what_made_you_score_less);
        }
      } catch (error) {
        console.error("Error fetching mock analysis data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4 bg-white rounded-md flex items-center justify-center h-64">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    );
  }

  if (mockData.length === 0) {
    return (
      <div className="p-4 bg-white rounded-md flex items-center justify-center h-64">
        <div className="text-xl text-gray-500">No data available</div>
      </div>
    );
  }

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
                <span className="font-medium w-32 truncate">{mock.name}</span>
                <div className="flex-1 h-8 rounded-lg overflow-hidden flex">
                  {mock.subjects.map((subject) => {
                    const widthPercentage = (subject.score / totalScore) * 100;

                    return (
                      <Tooltip
                        key={`${mock.name}-${subject.name}`}
                        title={`${subject.name}: ${subject.rawScore}/${
                          subject.totalAttempted
                        } (${subject.score.toFixed(1)}%)`}
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

      <div className="flex flex-wrap gap-4 justify-center">
        {Object.entries(subjectColors).map(([subject, color]) => (
          <div
            key={subject}
            className="flex items-center gap-2 text-zinc-500 text-xs"
          >
            <div className="w-3 h-3" style={{ backgroundColor: color }}></div>
            <span>{subject}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MockResultsVisualization;
