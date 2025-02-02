"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Confidence = () => {
  const data = {
    labels: ["Sure", "Not Sure"], // Two separate bars
    datasets: [
      {
        label: "Correctly Marked",
        data: [60, 30], // Correct "Sure" and "Not Sure"
        backgroundColor: ["rgba(166, 123, 248, 1)", "rgba(166, 123, 248, 1)"], // Darker purple (progress)
        barThickness: 40,
      },
      {
        label: "Total Marked",
        data: [80, 60], // Total "Sure" and "Not Sure"
        backgroundColor: [
          "rgba(166, 123, 248, 0.3)",
          "rgba(166, 123, 248, 0.3)",
        ], // Light purple (background)
        barThickness: 40,
      },
    ],
  };

  const options = {
    indexAxis: "y", // Horizontal bar chart
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend (optional)
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.dataset.label || "";
            return `${label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true, // Stack the bars
        beginAtZero: true,
        grid: {
          drawBorder: false,
          color: "rgba(0, 0, 0, 0.1)",
        },
        max: 100, // Set max to 100 for percentage
      },
      y: {
        stacked: true, // Stack the bars
        grid: {
          drawBorder: false,
          display: false,
        },
      },
    },
  };

  return (
    <div className="w-[520px] h-[350px] bg-white p-5 rounded-lg">
      <h2 className="text-lg font-medium mb-3">Confidence</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Confidence;
