"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Confidence = ({ isLoading = false, mockConfidenceData = null }) => {
  const [confidenceData, setConfidenceData] = useState(null);

  useEffect(() => {
    // Use data from props if available
    if (mockConfidenceData) {
      setConfidenceData(mockConfidenceData);
    }
  }, [mockConfidenceData]);

  // Prepare the data for chart
  const prepareChartData = () => {
    if (!confidenceData) return [];

    // Parse values from API response
    const totalSure = parseInt(confidenceData.total_sure, 10) || 0;
    const totalSureCorrect = parseInt(confidenceData.total_sure_correct, 10) || 0;
    const totalNotSure = parseInt(confidenceData.total_not_sure, 10) || 0;
    const totalNotSureCorrect = parseInt(confidenceData.total_not_sure_correct, 10) || 0;

    return [
      { name: "Sure", total: totalSure, correct: totalSureCorrect },
      { name: "Not Sure", total: totalNotSure, correct: totalNotSureCorrect },
    ];
  };

  const chartData = isLoading ? [] : prepareChartData();

  return (
    <div className="w-full min-w-[500px] h-[320px] bg-white px-2 py-4 rounded-lg">
      <h2 className="text-lg font-medium mb-3 ml-3">Confidence</h2>
      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <p>Loading...</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={chartData}
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
      )}
    </div>
  );
};

export default Confidence;