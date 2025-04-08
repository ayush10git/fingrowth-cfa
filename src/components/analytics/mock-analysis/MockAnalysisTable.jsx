"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/navigation";

// Keep the fallback subjects in case API doesn't provide them
const defaultSubjects = [
  "Mathematics",
  "Science",
  "History",
  "Geography",
  "English",
  "Physics",
  "Chemistry",
  "Biology",
  "Literature",
  "Economics",
];

const MockAnalysisTable = ({ isLoading = false, mockAnalysisData = null }) => {
  const router = useRouter();
  const [mockData, setMockData] = useState([]);
  const [subjects, setSubjects] = useState(defaultSubjects);

  useEffect(() => {
    // Process API data if it's available in props
    if (mockAnalysisData) {
      processApiData(mockAnalysisData);
    }
  }, [mockAnalysisData]);

  const processApiData = (apiData) => {
    if (!apiData) return;

    // Extract all unique subjects across all mock tests
    const allSubjects = new Set();
    Object.values(apiData).forEach((mockTest) => {
      Object.keys(mockTest).forEach((subject) => {
        allSubjects.add(subject);
      });
    });
    const subjectsList = Array.from(allSubjects);

    // Only update subjects if we found some
    if (subjectsList.length > 0) {
      setSubjects(subjectsList);
    }

    // Transform API data into the format expected by the UI
    const formattedData = Object.entries(apiData).map(
      ([mockName, mockSubjects]) => {
        // Calculate overall score
        let totalScore = 0;
        let totalPossible = 0;

        Object.values(mockSubjects).forEach((scores) => {
          totalScore += parseInt(scores.question_score, 10) || 0;
          totalPossible += parseInt(scores.total_score, 10) || 0;
        });

        const overallScore =
          totalPossible > 0
            ? Math.round((totalScore / totalPossible) * 100)
            : 0;

        // Create subjects array with scores
        const subjectScores = subjectsList.map((subject) => {
          if (mockSubjects[subject]) {
            const total = parseInt(mockSubjects[subject].total_score, 10) || 0;
            const score =
              parseInt(mockSubjects[subject].question_score, 10) || 0;
            return total > 0 ? Math.round((score / total) * 100) : 0;
          }
          return 0; // Subject not in this mock test
        });

        return {
          mock: mockName,
          overallScore,
          subjects: subjectScores,
        };
      }
    );

    setMockData(formattedData);
  };

  // Fallback to mock data if loading or no data available
  const displayData =
    isLoading || mockData.length === 0
      ? [
          {
            mock: "Mock 1",
            overallScore: 85,
            subjects: [78, 82, 75, 80, 90, 85, 88, 92, 76, 84],
          },
          {
            mock: "Mock 2",
            overallScore: 78,
            subjects: [72, 75, 80, 85, 78, 76, 80, 82, 74, 79],
          },
          {
            mock: "Mock 3",
            overallScore: 92,
            subjects: [88, 90, 85, 87, 95, 92, 93, 97, 89, 91],
          },
          {
            mock: "Mock 4",
            overallScore: 81,
            subjects: [79, 82, 77, 83, 85, 80, 86, 88, 75, 84],
          },
          {
            mock: "Mock 5",
            overallScore: 76,
            subjects: [70, 72, 74, 75, 78, 76, 79, 81, 73, 77],
          },
          {
            mock: "Mock 6",
            overallScore: 89,
            subjects: [85, 88, 82, 87, 90, 86, 92, 94, 83, 89],
          },
          {
            mock: "Mock 7",
            overallScore: 95,
            subjects: [92, 94, 90, 93, 97, 95, 98, 99, 91, 96],
          },
          {
            mock: "Mock 8",
            overallScore: 83,
            subjects: [80, 82, 78, 85, 88, 81, 87, 89, 77, 84],
          },
        ]
      : mockData;

  // Use displaySubjects to maintain the UI consistency
  const displaySubjects =
    subjects.length <= 10 ? subjects : subjects.slice(0, 10);

  return (
    <div className="p-5 bg-white rounded-md">
      <h2 className="text-lg font-semibold mb-3 ml-2">Mock Analysis</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ padding: "8px" }}>
                <strong>Mock</strong>
              </TableCell>
              <TableCell sx={{ padding: "8px" }}>
                <strong>Overall Score (%)</strong>
              </TableCell>
              {displaySubjects.map((subject, index) => (
                <TableCell key={index} sx={{ padding: "8px" }}>
                  <strong>{subject} (%)</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {displayData.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow
                  sx={{
                    backgroundColor: "white",
                    border: "1.5px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    marginBottom: "5px",
                    height: "40px",
                    "&:last-child": {
                      marginBottom: 0,
                    },
                  }}
                  className="hover:bg-gray-50 hover:cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/dashboard/analytics/mock-analysis/${index + 1}`
                    )
                  }
                >
                  <TableCell sx={{ padding: "8px" }}>{row.mock}</TableCell>
                  <TableCell sx={{ padding: "8px" }} align="center">
                    {row.overallScore}
                  </TableCell>
                  {row.subjects
                    .slice(0, displaySubjects.length)
                    .map((score, i) => (
                      <TableCell key={i} sx={{ padding: "8px" }} align="center">
                        {score}
                      </TableCell>
                    ))}
                </TableRow>

                {/* Spacer Row */}
                {index < displayData.length - 1 && (
                  <TableRow
                    sx={{ height: "4px", backgroundColor: "transparent" }}
                  >
                    <TableCell colSpan={displaySubjects.length + 2}></TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MockAnalysisTable;