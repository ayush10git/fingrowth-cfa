"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Conceptual", total: 140, correct: 115 },
  { name: "Calculative", total: 154, correct: 129 },
];

const QuestionType = () => {
  return (
    <div className="w-full min-w-[453px] h-[350px] bg-white px-2 py-4 rounded-lg">
      <h2 className="text-lg font-medium mb-3">Question Type</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          layout="vertical" // Horizontal bar chart
          margin={{ top: 10, right: 10, left: 10, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={false} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
          <Bar
            dataKey="correct"
            stackId="a"
            fill="#A680FF"
            barSize={40}
          />
          <Bar
            dataKey="total"
            stackId="a"
            fill="#E4DFF1"
            barSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuestionType;
