"use client";
import { useState, useEffect } from "react";
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
  return "#8E6FD8";
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-zinc-700 text-white p-2 shadow-md rounded-md">
        <p className="font-semibold text-[14px]">{payload[0].payload.name}</p>
        <p className="text-[12px]">
          Completed: {payload[0].payload.attempted} / {payload[0].payload.total}
        </p>
        <p className="text-[12px]">Completion: {payload[0].value}%</p>
      </div>
    );
  }
  return null;
};

const SubjectWiseCompletion = () => {
  const [subjectData, setSubjectData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) return;

      try {
        const response = await fetch(
          "/api/analytics/practice?for=practice_subject_wise_completion",
          {
            headers: { authtoken: authToken },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        console.log(data);
        if (data.success) {
          // Transform the data to calculate completion percentage but keep original values
          const transformedData =
            data.data.practice_subject_wise_completion.map((item) => ({
              name: item.name,
              value: Math.round((item.attempted / item.total) * 100),
              attempted: item.attempted,
              total: item.total,
            }));
          setSubjectData(transformedData);
        }
      } catch (error) {
        console.error("Error fetching subject data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-3 w-full max-w-full bg-white rounded-lg">
      <h2 className="text-lg font-medium my-3 ml-3">Subject Wise Completion</h2>
      <ResponsiveContainer width="100%" height={570}>
        <BarChart data={subjectData} margin={{ top: 20, right: 20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 14 }} />
          <YAxis domain={[0, 100]} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" barSize={25}>
            {subjectData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SubjectWiseCompletion;
