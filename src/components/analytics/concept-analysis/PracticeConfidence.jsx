"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PracticeConfidence = () => {
  const [confidenceData, setConfidenceData] = useState([
    { name: "Sure", total: 0, correct: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) return;

      try {
        const response = await fetch(
          "/api/analytics/practice?for=practice_confidence",
          {
            headers: { authtoken: authToken },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        console.log(data);

        if (data.success && data.data.practice_confidence.length > 0) {
          const apiData = data.data.practice_confidence[0];

          // Parse as integers
          const totalCorrect = parseInt(apiData.total_correct);
          const totalSure = parseInt(apiData.total_sure);

          // Calculate values for both categories
          const sureCorrect = parseInt(apiData.total_sure);
          const notSureTotal = totalCorrect - totalSure;

          setConfidenceData([
            {
              name: "Sure",
              total: totalCorrect,
              correct: totalSure,
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching confidence data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-w-[500px] h-[320px] bg-white px-2 py-4 rounded-lg">
      <h2 className="text-lg font-medium mb-3 ml-3">Confidence</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={confidenceData}
          layout="vertical" // Horizontal bar chart
          margin={{ top: 10, right: 20, left: 10, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={false} />
          <YAxis dataKey="name" type="category" />
          <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
          {/* Correctly Marked (Now Lighter Purple) */}
          <Bar dataKey="correct" stackId="a" fill="#A680FF" barSize={40} />
          {/* Total Marked (Now Darker Purple) */}
          <Bar dataKey="total" stackId="a" fill="#E4DFF1" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PracticeConfidence;
