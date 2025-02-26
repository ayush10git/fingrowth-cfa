"use client";
import React from "react";
import "../../../globals.css";
import DoughnutChart from "@/components/analytics/DoughnutChartCard";
import PieChart from "@/components/analytics/PieChart";
import StackedBarChart from "@/components/analytics/StackedBarChart";
import SubjectWisePerformance from "@/components/analytics/SubjectWisePerformance";
import SubjectCompletions from "@/components/analytics/LineGraph";

const Dashboard = () => {
  const totalSolved = 25 + 30 + 20;
  const totalQuestions = 65 + 55 + 50;

  const correctPercentage = ((totalSolved / totalQuestions) * 100).toFixed(1);
  const incorrectPercentage = (100 - correctPercentage).toFixed(1);

  return (
    <div className="flex gap-3 absolute top-[60px] left-[60px] w-[calc(100vw-70px)] h-[calc(100vh-60px)] p-4 pt-6 md:flex-col lg:flex-row">
      {/* left */}
      <div className="flex flex-col gap-3">
        <DoughnutChart
          labels={["Correct", "Incorrect"]}
          data={[correctPercentage, incorrectPercentage]}
          backgroundColor={["#8E6FD8", "#E8DEFF"]}
          cutout="78%"
          legends={false}
        />
        <SubjectWisePerformance />
      </div>
      {/* right */}
      <div className="flex flex-col gap-3 w-full flex-grow">
        <SubjectCompletions />
        <StackedBarChart />
      </div>
    </div>
  );
};

export default Dashboard;