import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({
  labels,
  data,
  backgroundColor,
  cutout,
  legends = true,
  offset,
}) => {
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
    <div className="p-5 min-w-[600px] w-full h-[330px] rounded-[10px] flex flex-col max-w-full bg-white">
      <h1 className="text-xl font-medium mb-5">
        Total Questions Solved
      </h1>
      <div className="flex flex-wrap items-center justify-center">
        <div className="relative w-[220px] h-[220px]">
          <Doughnut data={doughnutData} options={doughnutOptions} />
          <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none text-[#625C5C]">
            <span className="text-md font-medium">{data[0]}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoughnutChart;
