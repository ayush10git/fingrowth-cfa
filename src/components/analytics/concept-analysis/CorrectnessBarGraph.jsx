"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

const data = [
  { name: "Subject A", value: 40 },
  { name: "Subject B", value: 60 },
  { name: "Subject C", value: 70 },
  { name: "Subject D", value: 90 },
  { name: "Subject E", value: 50 },
  { name: "Subject F", value: 75 },
  { name: "Subject G", value: 90 },
  { name: "Subject H", value: 70 },
  { name: "Subject I", value: 20 },
  { name: "Subject J", value: 30 },
];

// Function to determine bar color based on value
const getBarColor = (value) => {
  if (value > 75) return "#4CAF50"; // Green
  if (value >= 50) return "#FFEB3B"; // Yellow
  return "#F44336"; // Red
};

const CorrectnessBarGraph = () => {
  return (
    <div className="p-5 w-full h-[660px] max-w-full bg-white rounded-lg">
      <h2 className="text-lg font-medium mb-3">Correctness</h2>
      <ResponsiveContainer width="100%" height={580}>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip formatter={(value) => `Score: ${value}`} />
          <Bar dataKey="value" barSize={25}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(entry.value)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CorrectnessBarGraph;
