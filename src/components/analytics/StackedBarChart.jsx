import React from "react";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const categories = [
  { label: "Strong (>70%)", color: "#A294F9" },
  { label: "Average (>50%)", color: "#CDC1FF" },
  { label: "Weak (<50%)", color: "#E5D9F2" },
  { label: "Not Assessed", color: "#F5EFFF" },
];

export default function StackedBarChart({ conceptualData = {}, loading = false }) {
  // Process API data into the format expected by the chart
  const processApiData = (apiData) => {
    const processedData = [];

    // Only process subjects that have at least one assessed topic
    Object.keys(apiData).forEach((subject) => {
      // Skip subjects with no topics or only empty topics
      const hasAssessedTopics = Object.values(apiData[subject]).some(
        (topic) => topic.total > 0
      );
      if (!hasAssessedTopics) return;

      // Initialize counters for each category
      let strongCount = 0;
      let averageCount = 0;
      let weakCount = 0;
      let notAssessedCount = 0;
      let totalTopics = 0;

      // Analyze each topic in the subject
      Object.keys(apiData[subject]).forEach((topic) => {
        const { total, correct } = apiData[subject][topic];
        totalTopics++;

        if (total === 0) {
          // If total is 0, this topic hasn't been assessed
          notAssessedCount++;
        } else {
          // Calculate correctness percentage for this topic
          const correctPercentage = (correct / total) * 100;

          // Categorize based on performance
          if (correctPercentage > 70) {
            strongCount++;
          } else if (correctPercentage >= 50) {
            averageCount++;
          } else {
            weakCount++;
          }
        }
      });

      // Only add to processed data if there are topics
      if (totalTopics > 0) {
        // Convert to percentages of total topics
        const strongPercent = (strongCount / totalTopics) * 100;
        const averagePercent = (averageCount / totalTopics) * 100;
        const weakPercent = (weakCount / totalTopics) * 100;
        const notAssessedPercent = (notAssessedCount / totalTopics) * 100;

        processedData.push({
          subject: subject,
          scores: [
            strongPercent,
            averagePercent,
            weakPercent,
            notAssessedPercent,
          ],
        });
      }
    });

    // Limit to 10 subjects to prevent chart overcrowding
    return processedData.slice(0, 20);
  };

  const rawData = Object.keys(conceptualData).length > 0 
    ? processApiData(conceptualData) 
    : [];

  const data = {
    labels: rawData.map((item) => item.subject),
    datasets: categories.map((category, index) => ({
      label: category.label,
      data: rawData.map((item) => item.scores[index]),
      backgroundColor: category.color,
    })),
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { stacked: true },
      y: { stacked: true, max: 100, ticks: { stepSize: 10 } },
    },
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        mode: "nearest",
        intersect: true,
        callbacks: {
          label: function (tooltipItem) {
            const datasetLabel = tooltipItem.dataset.label || "";
            const value = tooltipItem.raw.toFixed(1);
            return `${datasetLabel}: ${value}%`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[95%] max-h-[550px] p-6 pb-[70px] bg-white rounded-[10px]">
      <h2 className="mb-4 text-xl">Conceptual Analysis</h2>
      <div className="h-full">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <p>Loading...</p>
          </div>
        ) : rawData.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <div className="h-full flex items-center justify-center">
            <p>No conceptual analysis data available</p>
          </div>
        )}
      </div>
    </div>
  );
}