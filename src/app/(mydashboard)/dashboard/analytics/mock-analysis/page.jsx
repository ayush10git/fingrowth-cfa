"use client";

import { useEffect, useState } from "react";
import Confidence from "@/components/analytics/mock-analysis/Confidence";
import Correctness from "@/components/analytics/mock-analysis/Correctness";
import CorrectnessBarGraph from "@/components/analytics/mock-analysis/CorrectnessBarGraph";
import DifficultyChart from "@/components/analytics/mock-analysis/DifficultyChart";
import MockAnalysisTable from "@/components/analytics/mock-analysis/MockAnalysisTable";
import MockResultsVisualization from "@/components/analytics/mock-analysis/MockResultVisualization";
import Review from "@/components/analytics/mock-analysis/Review";
import TimeAnalysisTable from "@/components/analytics/mock-analysis/TimeAnalysis";
import StickyHeadTable from "@/components/mocktest/ExamListTable";
import ProgressBar from "@/components/mocktest/ProgressBar";

const Page = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [analyticsData, setAnalyticsData] = useState({
    mock_correctness: null,
    mock_confidence: null,
    mock_subject_wise_correctness: null,
    mock_time_analysis: null,
    mock_analysis: null,
    mock_what_made_you_score_less: null,
    mock_tests_overview: null
  });

  const totalSolved = 25 + 30 + 20;
  const totalQuestions = 65 + 55 + 50;

  const correctPercentage = ((totalSolved / totalQuestions) * 100).toFixed(1);
  const incorrectPercentage = (100 - correctPercentage).toFixed(1);

  useEffect(() => {
    const fetchData = async () => {
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setIsLoading(false);
        return;
      }

      try {
        // Make a single API call to fetch all required data
        const response = await fetch(
          "/api/analytics/mocktest?for=mock_correctness,mock_confidence,mock_subject_wise_correctness,mock_time_analysis,mock_analysis,mock_what_made_you_score_less,mock_tests_overview",
          {
            headers: { authtoken: authToken },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        console.log("API response:", result);

        if (result.success) {
          setAnalyticsData(result.data);
        }
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="absolute top-[70px] left-[65px] p-2 flex flex-col gap-4 w-[calc(100%-65px)]">
      <h1 className="text-2xl p-2">Mock Analysis</h1>

      <div className="flex gap-3">
        <div className="flex flex-col gap-3">
          <Correctness
            labels={["Correct", "Incorrect"]}
            data={[correctPercentage, incorrectPercentage]}
            backgroundColor={["#8E6FD8", "#E8DEFF"]}
            cutout="78%"
            legends={false}
            isLoading={isLoading}
            mockCorrectnessData={analyticsData.mock_correctness}
          />
          <Confidence 
            isLoading={isLoading}
            mockConfidenceData={analyticsData.mock_confidence}
          />
        </div>
        <CorrectnessBarGraph 
          isLoading={isLoading}
          subjectWiseData={analyticsData.mock_subject_wise_correctness}
        />
      </div>
      <TimeAnalysisTable 
        isLoading={isLoading}
        timeAnalysisData={analyticsData.mock_time_analysis}
      />
      <MockAnalysisTable 
        isLoading={isLoading}
        mockAnalysisData={analyticsData.mock_analysis}
      />
      <MockResultsVisualization 
        isLoading={isLoading}
        mockVisualizationData={analyticsData.mock_what_made_you_score_less}
      />
      <div className="flex flex-col gap-5 bg-white pt-4 px-4 rounded-lg">
        <h1 className="text-lg">Mock Tests</h1>
        <ProgressBar />
        <StickyHeadTable 
          isLoading={isLoading}
          mockTestsData={analyticsData.mock_tests_overview}
        />
      </div>
    </div>
  );
};

export default Page;