"use client";
import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const QuestionType = () => {
  const [questionTypeData, setQuestionTypeData] = useState([
    { name: "Conceptual", total: 0, correct: 0 },
    { name: "Calculative", total: 0, correct: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) return;

      try {
        const response = await fetch(
          "/api/analytics/practice?for=practice_question_type",
          {
            headers: { authtoken: authToken },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        console.log(data);

        if (data.success && data.data.practice_question_type.length > 0) {
          const apiData = data.data.practice_question_type[0];

          setQuestionTypeData([
            {
              name: "Conceptual",
              total: parseInt(apiData.total_attempted_conceptual_question),
              correct: parseInt(apiData.total_correct_conceptual_question),
            },
            {
              name: "Calculative",
              total: parseInt(apiData.total_attempted_calculative_question),
              correct: parseInt(apiData.total_correct_calculative_question),
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching question type data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full min-w-[500px] h-[320px] bg-white px-2 py-4 rounded-lg">
      <h2 className="text-lg font-medium mb-3 ml-3">Question Type</h2>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={questionTypeData}
          layout="vertical" // Horizontal bar chart
          margin={{ top: 10, right: 10, left: 10, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={false} />
          <YAxis dataKey="name" type="category" tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value, name) => [`${value}`, `${name}`]} />
          <Bar dataKey="correct" stackId="a" fill="#A680FF" barSize={40} />
          <Bar dataKey="total" stackId="a" fill="#E4DFF1" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QuestionType;
