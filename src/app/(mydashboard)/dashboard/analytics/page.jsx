"use client";
import React from "react";
import "../../../globals.css";
import DoughnutChart from "@/components/analytics/DoughnutChartCard";
import PieChart from "@/components/analytics/PieChart";
import LineGraph from "@/components/analytics/LineGraph";
import StackedBarChart from "@/components/analytics/StackedBarChart";

const Dashboard = () => {
  const totalSolved = 25 + 30 + 20;
  const totalQuestions = 65 + 55 + 50;

  const correctPercentage = ((totalSolved / totalQuestions) * 100).toFixed(1);
  const incorrectPercentage = (100 - correctPercentage).toFixed(1);

  const subject = "Mathematics";
  const testResults = [85, 78, 92, 88, 76];

  return (
    <div className="absolute top-[60px] left-[60px] w-[calc(100vw-70px)] h-[calc(100vh-60px)] py-2">
      <div className="flex gap-3 p-4 h-full">
        <div className="flex flex-col gap-3">
          <div className="w-[600px]">
            <DoughnutChart
              labels={["Correct", "Incorrect"]}
              data={[correctPercentage, incorrectPercentage]}
              backgroundColor={["#8E6FD8", "#E8DEFF"]}
              cutout="78%"
              legends={false}
            />
          </div>
          <div className="grid gap-5 p-4 bg-white w-full max-w-[600px] rounded-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[45, 62, 75, 59, 90, 63, 60, 50, 39].map((correct, index) => (
                <PieChart
                  key={index}
                  labels={["Correct", "Incorrect"]}
                  data={[correct, 100 - correct]}
                  backgroundColor={
                    index % 2 === 0 ? ["#8E6FD8", "#E8DEFF"] : undefined
                  }
                  cutout="18%"
                  legends={false}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <LineGraph subject={subject} testResults={testResults} />
          <StackedBarChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
