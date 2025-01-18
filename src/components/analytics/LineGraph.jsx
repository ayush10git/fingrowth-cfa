import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const LineGraph = ({ subject, testResults }) => {
  const data = {
    labels: testResults.map((_, index) => `Test ${index + 1}`),
    datasets: [
      {
        data: testResults,
        fill: false,
        backgroundColor: "#8E6FD8",
        borderColor: "#8E6FD8",
        pointBackgroundColor: "#1E40AF",
        pointBorderColor: "#fff",
        tension: 0,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };

  return (
    <div className="flex flex-col w-full max-w-full p-4 bg-white rounded-md">
      <h2 className="text-2xl font-regular mb-4 text-center">
        {subject} Test Results
      </h2>
      <div className="w-full h-[350px]">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LineGraph;
