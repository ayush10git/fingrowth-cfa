"use client";
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({
  performanceData = { total: 0, correct: 0 },
  loading = false,
  labels = ["Correct", "Incorrect"],
  backgroundColor = ["#4CAF50", "#F5F5F5"],
  cutout = "80%",
  legends = true,
  offset = [0, 0],
}) => {
  // Calculate percentages
  const { total, correct } = performanceData || {
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
  };

  return (
    <div className="p-5 min-w-[600px] w-full h-[330px] rounded-[10px] flex flex-col max-w-full bg-white">
      <h1 className="text-xl font-medium mb-5">Overall Correctness</h1>
      <div className="flex flex-wrap items-center justify-center">
        {loading ? (
          <div className="flex items-center justify-center h-[220px]">
            <p>Loading chart data...</p>
          </div>
        ) : (
          <div className="relative w-[220px] h-[220px]">
            <Doughnut data={doughnutData} options={doughnutOptions} />
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none text-[#625C5C]">
              <span className="text-md font-medium">{data[0]}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoughnutChart;