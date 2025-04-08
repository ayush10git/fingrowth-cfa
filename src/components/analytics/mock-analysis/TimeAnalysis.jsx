"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  MenuItem,
  Select,
  FormControl,
} from "@mui/material";

const filterOptions = ["All", "Correct", "Incorrect"];

const TimeAnalysisTable = ({ isLoading = false, timeAnalysisData = null }) => {
  const [filter, setFilter] = useState("All");
  const [apiData, setApiData] = useState(null);
  const [subjectNames, setSubjectNames] = useState([]);

  useEffect(() => {
    // Use data from props if available
    if (timeAnalysisData) {
      setApiData(timeAnalysisData);

      // Extract subject names from the data
      if (timeAnalysisData["0-30_secs"]) {
        const subjects = Object.keys(timeAnalysisData["0-30_secs"]);
        setSubjectNames(subjects);
      }
    }
  }, [timeAnalysisData]);

  // Transform API data to match the UI structure
  const prepareData = () => {
    if (!apiData || subjectNames.length === 0) return [];

    // Create data structure similar to the original
    const transformedData = [
      {
        time: "< 30secs",
        totalSolved: calculateTotalSolved(apiData["0-30_secs"] || {}),
        subjects: subjectNames.map((subject) => {
          const subjectData = apiData["0-30_secs"]?.[subject] || {};
          return {
            total: subjectData.total_attempted_below_30secs || 0,
            correct: subjectData.subject_correct_below_30secs || 0,
          };
        }),
      },
      {
        time: "30 sec - 1.5 mins",
        totalSolved: 180, // Using original values for time ranges that don't have API data
        subjects: subjectNames.map(() => ({ total: 0, correct: 0 })),
      },
      {
        time: "1.5 mins - 2.5 mins",
        totalSolved: 160,
        subjects: subjectNames.map(() => ({ total: 0, correct: 0 })),
      },
      {
        time: "> 2.5 mins",
        totalSolved: 140,
        subjects: subjectNames.map(() => ({ total: 0, correct: 0 })),
      },
    ];

    return transformedData;
  };

  const calculateTotalSolved = (timeRangeData) => {
    return Object.values(timeRangeData).reduce((total, subject) => {
      return total + (subject.total_attempted_below_30secs || 0);
    }, 0);
  };

  const getFilteredValue = (subject) => {
    if (filter === "All") return subject.total;
    if (filter === "Correct") return subject.correct;
    if (filter === "Incorrect") return subject.total - subject.correct;
  };

  const data = isLoading ? [] : prepareData();

  return (
    <TableContainer
      sx={{ paddingX: 2 }}
      className="bg-white p-4 px-6 rounded-md"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Time Analysis</h2>
        <FormControl variant="outlined" size="small">
          <Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            displayEmpty
          >
            {filterOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Time</strong>
            </TableCell>
            <TableCell>
              <strong>Total Solved</strong>
            </TableCell>
            {subjectNames.map((subject, i) => (
              <TableCell key={i}>
                <strong>{subject}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            <TableRow>
              <TableCell colSpan={12} align="center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            <>
              {data.map((row, index) => (
                <React.Fragment key={index}>
                  <TableRow
                    sx={{
                      backgroundColor: "white",
                      border: "1.5px solid #ddd",
                      borderRadius: "8px",
                      overflow: "hidden",
                    }}
                  >
                    <TableCell>{row.time}</TableCell>
                    <TableCell>{row.totalSolved}</TableCell>
                    {row.subjects.map((subject, i) => (
                      <TableCell
                        key={i}
                        sx={{
                          color:
                            filter === "Correct"
                              ? "green"
                              : filter === "Incorrect"
                              ? "red"
                              : "black",
                        }}
                      >
                        {getFilteredValue(subject)}
                      </TableCell>
                    ))}
                  </TableRow>
                  {index < data.length - 1 && (
                    <TableRow
                      sx={{ height: "8px", backgroundColor: "transparent" }}
                    >
                      <TableCell colSpan={12}></TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
              <TableRow sx={{ fontWeight: "bold" }}>
                <TableCell>Total</TableCell>
                <TableCell>
                  {data.reduce((sum, row) => sum + row.totalSolved, 0)}
                </TableCell>
                {subjectNames.map((_, i) => (
                  <TableCell key={i}>
                    {data.reduce(
                      (sum, row) =>
                        sum +
                        getFilteredValue(
                          row.subjects[i] || { total: 0, correct: 0 }
                        ),
                      0
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TimeAnalysisTable;