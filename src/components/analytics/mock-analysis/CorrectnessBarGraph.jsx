"use client";

import { useEffect, useState } from "react";
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
      <div className="bg-zinc-700 text-white p-2 shadow-md border rounded-md">
        <p className="text-[12px]">{`Subject: ${payload[0].payload.name}`}</p>
        <p className="text-[12px]">{`Score: ${payload[0].value}%`}</p>
        <p className="text-[12px]">{`Correct: ${payload[0].payload.correct}/${payload[0].payload.total}`}</p>
      </div>
    );
  }
  return null;
};

const BarGraph = ({ isLoading = false, subjectWiseData = null }) => {
  const [subjectData, setSubjectData] = useState([]);

  useEffect(() => {
    // Use data from props if available
    if (subjectWiseData) {
      // Process the data to calculate percentage values
      const processedData = subjectWiseData.map((item) => ({
        ...item,
        value: Math.round((item.correct / item.total) * 100), // Calculate percentage
      }));

      setSubjectData(processedData);
    }
  }, [subjectWiseData]);

  return (
    <div className="p-5 w-full h-[600px] max-w-full bg-white rounded-lg">
      <h2 className="text-lg font-medium mb-3">Correctness</h2>
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p>Loading...</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={540}>
          <BarChart
            data={subjectData}
            margin={{ top: 20, right: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="value" barSize={25} radius={[10, 10, 0, 0]}>
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

export default BarGraph;