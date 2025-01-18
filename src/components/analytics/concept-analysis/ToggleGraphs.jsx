"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  ArcElement
);

const Correctness = () => {
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
          if (value >= 75) return "#4CAF50";
          if (value >= 50) return "#FFEB3B";
          return "#F44336";
        },
        borderWidth: 1,
        borderColor: "#ddd",
        barThickness: 25,
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
      },
      x: {
        grid: {
          display: true,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};
const Completion = () => {
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
        backgroundColor: "#8E6FD8",
        borderWidth: 1,
        borderColor: "#ddd",
        barThickness: 25,
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
      },
      x: {
        grid: {
          display: true,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

const Difficulty = () => {
  const data = {
    labels: ["Easy", "Medium", "Difficult", "Expert"],
    datasets: [
      {
        label: "Difficulty",
        data: [85, 60, 70, 40],
        backgroundColor: ["#4CAF50", "#FFEB3B", "#FF9800", "#F44336"],
        barThickness: 100,
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

  return <Bar data={data} options={options} />;
};

const Confidence = () => {
  const data = {
    labels: ["Sure", "Not Sure"],
    datasets: [
      {
        label: "Score",
        data: [89.59, 30.77],
        backgroundColor: "#A78BFA",
        barThickness: 100,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}%`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "#E0E0E0",
        },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};
const QuestionType = () => {
  const data = {
    labels: ["Correct", "Incorrect"],
    datasets: [
      {
        label: "Score",
        data: [89.59, 30.77],
        backgroundColor: "#A78BFA",
        barThickness: 100,
      },
    ],
  };

  const options = {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw}%`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "#E0E0E0",
        },
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

const ToggleGraphs = () => {
  const [selectedGraph, setSelectedGraph] = useState(null);

  useEffect(() => {
    const savedGraph = localStorage.getItem("selectedGraph") || "subject";
    setSelectedGraph(savedGraph);
  }, []);

  useEffect(() => {
    if (selectedGraph) {
      localStorage.setItem("selectedGraph", selectedGraph);
    }
  }, [selectedGraph]);

  const renderGraph = () => {
    switch (selectedGraph) {
      case "subject":
        return <Correctness />;
      case "difficulty":
        return <Difficulty />;
      case "question-type":
        return <QuestionType />;
      case "confidence":
        return <Confidence />;
      case "completion":
        return <Completion />;
      default:
        return <Correctness />;
    }
  };

  const getGraphTitle = (graph) => {
    switch (graph) {
      case "subject":
        return "Subject";
      case "difficulty":
        return "Difficulty";
      case "question-type":
        return "Question Type";
      case "confidence":
        return "Confidence";
      case "completion":
        return "Completion";
      default:
        return "Subject";
    }
  };

  return (
    <div className="p-5 w-full h-[510px] max-w-full bg-white rounded-lg">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-medium mb-3">
          {getGraphTitle(selectedGraph)}
        </h2>
        <Select onValueChange={setSelectedGraph} value={selectedGraph}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Graph" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="subject">Subject</SelectItem>
            <SelectItem value="difficulty">Difficulty</SelectItem>
            <SelectItem value="confidence">Confidence</SelectItem>
            <SelectItem value="question-type">Question Type</SelectItem>
            <SelectItem value="completion">Completion</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full h-[420px]">{selectedGraph && renderGraph()}</div>
    </div>
  );
};

export default ToggleGraphs;
