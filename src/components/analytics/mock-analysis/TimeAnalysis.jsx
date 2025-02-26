"use client";
import React, { useState } from "react";
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

const data = [
  {
    time: "< 30secs",
    totalSolved: 200,
    subjects: [
      { total: 72, correct: 50 },
      { total: 68, correct: 40 },
      { total: 55, correct: 30 },
      { total: 80, correct: 60 },
      { total: 90, correct: 70 },
      { total: 65, correct: 40 },
      { total: 75, correct: 50 },
      { total: 85, correct: 65 },
      { total: 95, correct: 75 },
      { total: 60, correct: 35 },
    ],
  },
  {
    time: "30 sec - 1.5 mins",
    totalSolved: 180,
    subjects: [
      { total: 62, correct: 45 },
      { total: 78, correct: 55 },
      { total: 50, correct: 35 },
      { total: 88, correct: 65 },
      { total: 72, correct: 55 },
      { total: 69, correct: 50 },
      { total: 82, correct: 60 },
      { total: 90, correct: 75 },
      { total: 55, correct: 40 },
      { total: 48, correct: 30 },
    ],
  },
  {
    time: "1.5 mins - 2.5 mins",
    totalSolved: 160,
    subjects: [
      { total: 70, correct: 55 },
      { total: 85, correct: 60 },
      { total: 60, correct: 40 },
      { total: 75, correct: 50 },
      { total: 80, correct: 55 },
      { total: 90, correct: 65 },
      { total: 85, correct: 60 },
      { total: 72, correct: 50 },
      { total: 58, correct: 35 },
      { total: 60, correct: 40 },
    ],
  },
  {
    time: "> 2.5 mins",
    totalSolved: 140,
    subjects: [
      { total: 65, correct: 45 },
      { total: 75, correct: 50 },
      { total: 55, correct: 35 },
      { total: 82, correct: 60 },
      { total: 78, correct: 55 },
      { total: 85, correct: 60 },
      { total: 70, correct: 45 },
      { total: 90, correct: 70 },
      { total: 68, correct: 40 },
      { total: 50, correct: 30 },
    ],
  },
];

const filterOptions = ["All", "Correct", "Incorrect"];

const TimeAnalysisTable = () => {
  const [filter, setFilter] = useState("All");

  const getFilteredValue = (subject) => {
    if (filter === "All") return subject.total;
    if (filter === "Correct") return subject.correct;
    if (filter === "Incorrect") return subject.total - subject.correct;
  };

  return (
    <TableContainer sx={{ paddingX: 2 }} className="bg-white p-4 px-6 rounded-md">
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
            {Array.from({ length: 10 }, (_, i) => (
              <TableCell key={i}>
                <strong>{`Subject ${String.fromCharCode(65 + i)}`}</strong>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
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
            {Array(10)
              .fill(0)
              .map((_, i) => (
                <TableCell key={i}>
                  {data.reduce(
                    (sum, row) => sum + getFilteredValue(row.subjects[i]),
                    0
                  )}
                </TableCell>
              ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TimeAnalysisTable;
