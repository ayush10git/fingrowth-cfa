"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const mockData = [
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
];

const subjects = [
  "Subject A",
  "Subject B",
  "Subject C",
  "Subject D",
  "Subject E",
  "Subject F",
  "Subject G",
  "Subject H",
  "Subject I",
  "Subject J",
];

const MockAnalysisTable = () => {
  return (
    <div className="p-2 bg-white rounded-md">
      <h2 className="text-lg font-semibold mb-3">Mock Analysis</h2>
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
              {subjects.map((subject, index) => (
                <TableCell key={index} sx={{ padding: "8px" }}>
                  <strong>{subject} (%)</strong>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {mockData.map((row, index) => (
              <React.Fragment key={index}>
                <TableRow
                  sx={{
                    backgroundColor: "white",
                    border: "1.5px solid #ddd",
                    borderRadius: "8px",
                    overflow: "hidden",
                    marginBottom: "5px",
                    height: "40px", // Reduced row height
                    "&:last-child": {
                      marginBottom: 0, // No margin on the last row
                    },
                  }}
                >
                  <TableCell sx={{ padding: "8px" }}>{row.mock}</TableCell>
                  <TableCell sx={{ padding: "8px" }}>
                    {row.overallScore}
                  </TableCell>
                  {row.subjects.map((score, i) => (
                    <TableCell key={i} sx={{ padding: "8px" }}>
                      {score}
                    </TableCell>
                  ))}
                </TableRow>

                {/* Spacer Row */}
                {index < mockData.length - 1 && (
                  <TableRow
                    sx={{ height: "4px", backgroundColor: "transparent" }}
                  >
                    <TableCell colSpan={subjects.length + 2}></TableCell>
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
