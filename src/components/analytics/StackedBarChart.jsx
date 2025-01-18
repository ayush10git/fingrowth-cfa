import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const rawData = [
  { subject: "Subject 1", topics: [5, 6, 4, 3, 7] },
  { subject: "Subject 2", topics: [6, 7, 3, 4, 6] },
  { subject: "Subject 3", topics: [3, 5, 4, 2, 3] },
  { subject: "Subject 4", topics: [2, 3, 5, 4, 6] },
  { subject: "Subject 5", topics: [6, 8, 7, 3, 4] },
  { subject: "Subject 6", topics: [8, 7, 5, 6, 4] },
  { subject: "Subject 7", topics: [5, 6, 4, 2, 3] },
  { subject: "Subject 8", topics: [6, 7, 5, 3, 6] },
  { subject: "Subject 9", topics: [7, 5, 6, 3, 4] },
  { subject: "Subject 10", topics: [8, 6, 4, 3, 7] },
];

const data = {
  labels: rawData.map((item) => item.subject),
  datasets: rawData[0].topics.map((_, topicIndex) => {
    const baseOpacity = 1.0;
    const decrement = 0.2;

    return {
      label: `Topic ${topicIndex + 1}`,
      data: rawData.map((item) => {
        const total = item.topics.reduce((sum, current) => sum + current, 0);
        return (item.topics[topicIndex] / total) * 100;
      }),
      backgroundColor: rawData.map((_, i) => {
        const opacity = Math.max(baseOpacity - topicIndex * decrement, 0.2);
        return `rgba(142, 111, 216, ${opacity})`;
      }),
    };
  }),
};

const options = {
  responsive: true,
  maintainAspectRatio: false, // Disable default aspect ratio to fill the container
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
      ticks: {
        max: 100,
        stepSize: 10,
      },
    },
  },
  plugins: {
    legend: false,
    tooltip: {
      mode: 'index',
      intersect: false,
    },
  },
};

export default function StackedBarChart() {
  return (
    <div className="w-[820px] h-[95%] p-6 pb-[70px] bg-white rounded-[10px]">
      <h2 className="mb-4 text-xl">Conceptual Analysis</h2>
      <div className="h-full">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
