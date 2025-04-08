"use client";
import React, { useEffect, useState } from "react";
import "../../../globals.css";
import DoughnutChart from "@/components/analytics/DoughnutChartCard";
import PieChart from "@/components/analytics/PieChart";
import StackedBarChart from "@/components/analytics/StackedBarChart";
import SubjectWisePerformance from "@/components/analytics/SubjectWisePerformance";
import SubjectCompletions from "@/components/analytics/SubjectWiseCompletion";
import Link from "next/link";

const page = () => {
  const [analyticsData, setAnalyticsData] = useState({
    overall_performance: { total: 0, correct: 0 },
    subject_wise_performance: [],
    subject_wise_completion: [],
    conceptual_analysis: {}
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "/api/analytics/overall?for=overall_performance,subject_wise_completion,subject_wise_performance,conceptual_analysis",
          {
            headers: { authtoken: authToken },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch analytics data");

        const data = await response.json();
        if (data.success) {
          setAnalyticsData(data.data);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  console.log(analyticsData);
  

  // Original code had these values hardcoded, keeping them for now
  const totalSolved = 25 + 30 + 20;
  const totalQuestions = 65 + 55 + 50;

  const correctPercentage = ((totalSolved / totalQuestions) * 100).toFixed(1);
  const incorrectPercentage = (100 - correctPercentage).toFixed(1);

  return (
    <div className="absolute top-[60px] left-[60px] w-[calc(100vw-70px)] h-[calc(100vh-60px)] p-4 pt-6 ">
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-2xl">Overall Analysis</h1>
        <Link href="/dashboard/analytics/mock-review" className="bg-zinc-300 px-3 py-1 rounded-full hover:bg-zinc-200">
          Detailed Review
        </Link>
      </div>

      <div className="flex gap-3 md:flex-col lg:flex-row">
        <div className="flex flex-col gap-3">
          <DoughnutChart
            performanceData={analyticsData.overall_performance}
            loading={loading}
            labels={["Correct", "Incorrect"]}
            backgroundColor={["#8E6FD8", "#E8DEFF"]}
            cutout="78%"
            legends={false}
          />
          <SubjectWisePerformance 
            subjectData={analyticsData.subject_wise_performance} 
            loading={loading} 
          />
        </div>
        {/* right */}
        <div className="flex flex-col gap-3 w-full flex-grow">
          <SubjectCompletions 
            subjectData={analyticsData.subject_wise_completion} 
            loading={loading} 
          />
          <StackedBarChart 
            conceptualData={analyticsData.conceptual_analysis} 
            loading={loading} 
          />
        </div>
      </div>
    </div>
  );
};

export default page;