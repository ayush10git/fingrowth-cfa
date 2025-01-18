"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

const BarGraph = () => {
  const data = {
    labels: [
      "Subject A",
      "Subject B",
      "Subject C",
      "Subject D",
      "Subject E",
      "Subject F",
      "Subject G",
      "Subject H",
      "Subject I",
      "Subject J",
    ],
    datasets: [
      {
        label: "Correctness",
        data: [40, 60, 70, 90, 50, 75, 90, 70, 20, 30],
        backgroundColor: (context) => {
          const value = context.raw;
          if (value >= 75) return "#4CAF50"; // Green
          if (value >= 50) return "#FFEB3B"; // Yellow
          return "#F44336"; // Red
        },
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 30, // Round the tops of the bars
        borderSkipped: "bottom", // Only round the top of the bars
        barThickness: 25, // Adjust the thickness
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Disables the legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `Score: ${tooltipItem.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          drawBorder: false,
          color: "#E0E0E0",
        },
        // Marker lines at 50 (Red) and 75 (Green)
        lineAt: [
          {
            value: 50,
            borderColor: "#F44336", // Red line at 50
            borderWidth: 1,
            label: {
              content: "50",
              position: "top",
            },
          },
          {
            value: 75,
            borderColor: "#4CAF50", // Green line at 75
            borderWidth: 1,
            label: {
              content: "75",
              position: "top",
            },
          },
        ],
      },
      x: {
        grid: {
          display: true,
        },
      },
    },
  };

  return (
    <div className="p-5 w-full h-[480px] max-w-full bg-white rounded-lg">
      <h2 className="text-lg font-medium mb-3">Correctness</h2>
      <div className="w-full h-[420px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarGraph;
