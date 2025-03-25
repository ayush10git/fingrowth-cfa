"use client";
import { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Correctness = ({
  labels = ["Correct", "Incorrect"],
  backgroundColor = ["#8E6FD8", "#F5F5F5"],
  cutout = "80%",
  legends = true,
  offset = [0, 0],
}) => {
  const [performanceData, setPerformanceData] = useState({
    practice_correctness: { total: 0, correct: 0 },
  });

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) return;

      try {
        const response = await fetch(
          "/api/analytics/practice?for=practice_correctness",
          {
            headers: { authtoken: authToken },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        console.log(data);
        if (data.success) {
          setPerformanceData(data.data);
        }
      } catch (error) {
        console.error("Error fetching performance data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate percentages
  const { total, correct } = performanceData.practice_correctness || {
    total: 0,
    correct: 0,
  };
  const correctPercentage = total > 0 ? Math.round((correct / total) * 100) : 0;
  const incorrectPercentage = 100 - correctPercentage;

  // Prepare data for chart
  const data = [correctPercentage, incorrectPercentage];
  const totalSolved = data.reduce((acc, val) => acc + val, 0);

  const doughnutData = {
    labels,
    datasets: [
      {
        data,
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
            const percentage = ((value / totalSolved) * 100).toFixed(1);
            return `${tooltipItem.label}: ${value}%`;
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
    <div className="p-5 w-[430px] h-[300px] rounded-[10px] flex flex-col max-w-full bg-white">
      <h1 className="text-xl font-medium mb-5">Correctness</h1>
      <div className="flex flex-wrap items-center justify-center mt-5">
        <div className="relative w-[280px] h-[110px]">
          {" "}
          {/* Half the height */}
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="absolute inset-0 flex flex-col justify-end items-center pointer-events-none text-[#625C5C]">
            {/* Positioned at bottom center */}
            <span className="text-lg font-medium">{data[0]}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Correctness;
