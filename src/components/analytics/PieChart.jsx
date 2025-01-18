import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ labels, data, cutout, legends = true, offset }) => {
  const totalSolved = data.reduce((acc, val) => acc + val, 0);

  const backgroundColor =
    (data[0] >= 75)
      ? ["#4DDB45", "#D4F4D2"]
      : (data[0] >= 50)
      ? ["#DCE312", "#F6F9CF"]
      : ["#EB1B1B", "#FAAFAF"];

  const doughnutData = {
    labels,
    datasets: [
      {
        data,
        backgroundColor,
        borderWidth: 0,
        offset,
        borderRadius: 3
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
    <div className="h-[220px] p-4 flex flex-col gap-3 max-w-full bg-white border border-gray-400 rounded-md">
      <div className="flex flex-wrap items-center justify-center">
        <div className="relative w-[140px]">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none text-[#625C5C]">
            <span className="text-[9px] font-medium">{data[0]}%</span>
          </div>
        </div>
      </div>
      <span className="text-center">Subject</span>
    </div>
  );
};

export default PieChart;
