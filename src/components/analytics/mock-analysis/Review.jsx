"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const Review = ({
  labels,
  data,
  backgroundColor,
  cutout,
  legends = true,
  offset,
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
  };

  return (
    <div className="p-5 w-[450px] h-[300px] rounded-[10px] flex flex-col max-w-full bg-white">
      <h1 className="text-xl font-medium mb-5">Review</h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="relative w-[170px] h-[170px]">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none text-[#625C5C]">
            <span className="text-md font-medium">{data[0]}%</span>
          </div>
        </div>
      </div>
      <div className="flex gap-4 items-center justify-center mt-5">
        <div className="flex gap-1 items-center text-sm font-light">
          <div className="w-3 h-3 bg-[#D6C7FB]"></div>
          <span>Needs to Review</span>
        </div>
        <div className="flex gap-1 items-center text-sm font-light">
          <div className="w-3 h-3 bg-[#8E6FD8]"></div>
          <span>Proficient</span>
        </div>
      </div>
    </div>
  );
};

export default Review;
