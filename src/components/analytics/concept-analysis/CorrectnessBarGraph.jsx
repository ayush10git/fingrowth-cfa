"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";
import { useState, useEffect } from "react";

// Function to determine bar color based on value
const getBarColor = (value) => {
  if (value > 75) return "#4CAF50"; // Green
  if (value >= 50) return "#FFEB3B"; // Yellow
  return "#F44336"; // Red
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-700 text-white p-2 shadow-md rounded-md">
        <p className="font-semibold text-[14px]">{payload[0].payload.name}</p>
        <p className="text-[12px]">
          Correct: {payload[0].payload.correct} / {payload[0].payload.total}
        </p>
        <p className="text-[12px]">Score: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const CorrectnessBarGraph = () => {
  const [subjectData, setSubjectData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubjectData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "/api/analytics/practice?for=practice_subject_wise_correctness",
          {
            headers: { authtoken: authToken },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch subject data");

        const result = await response.json();
        console.log("API Response:", result.data);

        // Initialize an empty array for the processed data
        let processedData = [];

        // If we have the expected data structure in the API response
        if (
          result.success &&
          result.data &&
          result.data.practice_subject_wise_correctness &&
          Array.isArray(result.data.practice_subject_wise_correctness)
        ) {
          processedData = result.data.practice_subject_wise_correctness.map(
            (subject) => {
              const percentage =
                subject.total > 0
                  ? Math.round((subject.correct / subject.total) * 100)
                  : 0;

              return {
                name: subject.name || "Unknown Subject",
                correct: subject.correct || 0,
                total: subject.total || 0,
                value: percentage,
              };
            }
          );
        }
        // If the API response has changed structure but still has some data
        else if (result.success && result.data) {
          console.log("Unexpected data structure, attempting to extract data");

          // Try to find subject data in the response
          const possibleArrays = Object.values(result.data).filter((val) =>
            Array.isArray(val)
          );

          for (const arr of possibleArrays) {
            if (arr.length > 0 && arr[0].name !== undefined) {
              processedData = arr.map((subject) => ({
                name: subject.name || "Unknown Subject",
                correct: subject.correct || 0,
                total: subject.total || 0,
                value:
                  subject.total > 0
                    ? Math.round((subject.correct / subject.total) * 100)
                    : 0,
              }));
              break;
            }
          }
        }

        console.log("Processed Data:", processedData);
        setSubjectData(processedData);
      } catch (error) {
        console.error("Error fetching subject correctness data:", error);
        setSubjectData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubjectData();
  }, []);

  return (
    <div className="p-5 w-full h-[660px] max-w-full bg-white rounded-lg">
      <h2 className="text-lg font-medium mb-3">Correctness</h2>
      {isLoading ? (
        <div className="flex items-center justify-center h-[580px]">
          <p className="text-gray-500">Loading data...</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={580}>
          <BarChart
            data={subjectData}
            margin={{ top: 20, right: 0, left: -25, bottom: 10 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
              interval={0}
              
              height={60}
            />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" barSize={30} radius={[5, 5, 0, 0]}>
              {subjectData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CorrectnessBarGraph;
