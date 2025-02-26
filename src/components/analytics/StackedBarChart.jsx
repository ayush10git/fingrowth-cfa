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

const rawData = [
  { subject: "Subject A", scores: [40, 20, 30, 10] },
  { subject: "Subject B", scores: [25, 35, 20, 20] },
  { subject: "Subject C", scores: [38, 22, 25, 15] },
  { subject: "Subject D", scores: [20, 30, 30, 20] },
  { subject: "Subject E", scores: [30, 25, 25, 20] },
  { subject: "Subject F", scores: [45, 20, 20, 15] },
  { subject: "Subject G", scores: [40, 25, 25, 10] },
  { subject: "Subject H", scores: [30, 30, 20, 20] },
  { subject: "Subject I", scores: [35, 25, 30, 10] },
  { subject: "Subject J", scores: [20, 20, 30, 30] },
];

const categories = [
  { label: "Strong (>70%)", color: "#A294F9" },
  { label: "Average (>50%)", color: "#CDC1FF" },
  { label: "Weak (<50%)", color: "#E5D9F2" },
  { label: "Not Assessed", color: "#F5EFFF" },
];

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
      mode: "nearest", // Ensure each bar section has its own tooltip
      intersect: true, // Ensures tooltip only appears when hovering over that section
      callbacks: {
        label: function (tooltipItem) {
          const datasetLabel = tooltipItem.dataset.label || "";
          const value = tooltipItem.raw;
          return `${datasetLabel}: ${value}%`;
        },
      },
    },
  },
};

export default function StackedBarChart() {
  return (
    <div className="w-full h-[95%] max-h-[550px] p-6 pb-[70px] bg-white rounded-[10px]">
      <h2 className="mb-4 text-xl">Conceptual Analysis</h2>
      <div className="h-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
