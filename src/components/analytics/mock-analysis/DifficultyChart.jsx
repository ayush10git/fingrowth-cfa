"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DifficultyChart = () => {
  const data = {
    labels: ["Easy", "Medium", "Difficult", "Expert"],
    datasets: [
      {
        label: "Difficulty",
        data: [85, 60, 70, 40],
        backgroundColor: ["#4CAF50", "#FFEB3B", "#FF9800", "#F44336"],
        borderRadius: 5,
        barThickness: 50,
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
      tooltip: {
        enabled: true,
      },
    },
    layout: {
      padding: 0,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div className="w-[520px] h-[430px] bg-white rounded-lg p-4">
      <h2 className="text-lg font-medium mb-2">Difficulty</h2>
      <div className="w-full h-[380px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default DifficultyChart;
