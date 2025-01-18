"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Correctness = ({
  labels,
  data,
  backgroundColor,
  cutout = "70%",
  legends = false,
  offset = 0,
}) => {
  // Total solved questions (used in tooltips to show percentages)
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
    <div className="p-5 w-[450px] h-[300px] rounded-[10px] flex flex-col max-w-full bg-white">
      <h1 className="text-xl font-medium mb-5">Correctness</h1>
      <div className="flex flex-wrap items-center justify-center mt-5">
        <div className="relative w-[280px] h-[110px]"> {/* Half the height */}
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
