"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect, useState } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const Completion = ({
  labels = ["Attempted", "Remaining"],
  backgroundColor = ["#4F46E5", "#E5E7EB"],
  cutout = "70%",
  legends = true,
  offset = 0,
}) => {
  const [practiceData, setPracticeData] = useState({
    attempted: 0,
    total: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPracticeData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "/api/analytics/practice?for=practice_overall_completion",
          {
            headers: { authtoken: authToken },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch practice data");

        const result = await response.json();
        console.log(
          "Practice completion data:",
          JSON.stringify(result, null, 2)
        );

        if (result.success && result.data) {
          // Check if the expected data structure exists
          if (result.data.practice_overall_completion) {
            setPracticeData({
              attempted: result.data.practice_overall_completion.attempted || 0,
              total: result.data.practice_overall_completion.total || 0,
            });
          } else {
            console.warn(
              "API response missing practice_overall_completion property:",
              result.data
            );
            // Initialize with zeros instead of throwing an error
            setPracticeData({
              attempted: 0,
              total: 0,
            });
          }
        } else {
          setError("Failed to get completion data");
        }
      } catch (error) {
        console.error("Error fetching practice completion data:", error);
        setError("Could not load completion data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPracticeData();
  }, []);

  // Calculate remaining questions
  const remaining = Math.max(0, practiceData.total - practiceData.attempted);

  // Prepare data for the chart
  const chartData = [practiceData.attempted, remaining];

  // Total questions (used in tooltips to show percentages)
  const totalQuestions = chartData.reduce((acc, val) => acc + val, 0);

  const doughnutData = {
    labels,
    datasets: [
      {
        data: chartData,
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
            const value = tooltipItem.raw;
            const percentage =
              totalQuestions > 0
                ? ((value / totalQuestions) * 100).toFixed(1)
                : "0.0";
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        display: legends,
      },
    },
    cutout,
  };

  return (
    <div className="p-5 w-[430px] h-[300px] rounded-[10px] flex flex-col max-w-full bg-white">
      <h1 className="text-xl font-medium mb-5">Completion</h1>
      <div className="flex flex-wrap items-center justify-center">
        {isLoading ? (
          <div className="flex items-center justify-center h-[170px]">
            <p className="text-gray-500">Loading data...</p>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-[170px]">
            <p className="text-red-500">{error}</p>
          </div>
        ) : (
          <div className="relative w-[170px] h-[170px]">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none text-[#625C5C]">
              <span className="text-md font-medium">
                {practiceData.attempted}/{practiceData.total}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Completion;
