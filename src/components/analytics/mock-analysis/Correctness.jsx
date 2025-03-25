"use client";

import { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Correctness = ({
  labels = ["Correct", "Incorrect"],
  backgroundColor = ["#4CAF50", "#FF5252"],
  cutout = "70%",
  legends = false,
  offset = 0,
}) => {
  const [performanceData, setPerformanceData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "/api/analytics/mocktest?for=mock_correctness",
          {
            headers: { authtoken: authToken },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        console.log("API response:", result);

        if (result.success) {
          setPerformanceData(result.data.mock_correctness);
        }
      } catch (error) {
        console.error("Error fetching mocktest correctness data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-5 w-full h-[270px] rounded-[10px] flex items-center justify-center bg-white">
        <p>Loading...</p>
      </div>
    );
  }

  // Calculate percentages for chart display
  const total = performanceData?.total || 0;
  const correct = performanceData?.correct || 0;
  const incorrect = total - correct;

  // Calculate percentage correct (for center display)
  const percentageCorrect = total > 0 ? Math.round((correct / total) * 100) : 0;

  // Data for the chart - using the raw counts for accurate tooltips
  const chartData = [correct, incorrect];

  const doughnutData = {
    labels,
    datasets: [
      {
        data: [percentageCorrect, 100 - percentageCorrect], // Display as percentages in the chart
        backgroundColor,
        borderWidth: 0,
        offset,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            // Show actual count and percentage in tooltip
            if (tooltipItem.dataIndex === 0) {
              return `Correct: ${correct}/${total} (${percentageCorrect}%)`;
            } else {
              return `Incorrect: ${incorrect}/${total} (${
                100 - percentageCorrect
              }%)`;
            }
          },
        },
      },
      legend: {
        display: legends,
      },
    },
    cutout,
    rotation: -90, // Start drawing from the top
    circumference: 180, // Draw only half of the circle
  };

  return (
    <div className="p-5 w-full h-[270px] rounded-[10px] flex flex-col max-w-full bg-white">
      <h1 className="text-xl font-medium mb-5">Correctness</h1>
      <div className="flex flex-wrap items-center justify-center mt-5">
        <div className="relative w-[280px] h-[110px]">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="absolute inset-0 flex flex-col justify-end items-center pointer-events-none text-[#625C5C]">
            <span className="text-lg font-medium">{percentageCorrect}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Correctness;
