"use client";
import React from "react";
import "../../../globals.css";
import DoughnutChart from "@/components/analytics/DoughnutChartCard";
import PieChart from "@/components/analytics/PieChart";
import StackedBarChart from "@/components/analytics/StackedBarChart";
import SubjectWisePerformance from "@/components/analytics/SubjectWisePerformance";
import SubjectCompletions from "@/components/analytics/LineGraph";
import Link from "next/link";

const Dashboard = () => {
  const totalSolved = 25 + 30 + 20;
  const totalQuestions = 65 + 55 + 50;

  const correctPercentage = ((totalSolved / totalQuestions) * 100).toFixed(1);
  const incorrectPercentage = (100 - correctPercentage).toFixed(1);

  console.log(localStorage.getItem("authToken"))

  return (
    <div className="absolute top-[60px] left-[60px] w-[calc(100vw-70px)] h-[calc(100vh-60px)] p-4 pt-6 ">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl">Overall Analysis</h1>
        <Link href="/dashboard/analytics/mock-review" className="bg-zinc-300 px-3 py-1 rounded-full hover:bg-zinc-200">Detailed Review</Link>
      </div>

      <div className="flex gap-3 md:flex-col lg:flex-row">
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
    </div>
  );
};

export default Dashboard;
