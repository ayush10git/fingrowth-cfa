import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export const CompletionTable = ({ questions, questionAttempts }) => {
  // Updated data based on the provided image
  const data = [
    { question: "Subject A", total: 52, strong: 22, average: 18, weak: 12 },
    { question: "Subject B", total: 37, strong: 20, average: 7, weak: 10 },
    { question: "Subject C", total: 44, strong: 19, average: 11, weak: 14 },
    { question: "Subject D", total: 60, strong: 30, average: 15, weak: 15 },
    { question: "Subject E", total: 22, strong: 9, average: 10, weak: 3 },
    { question: "Subject F", total: 41, strong: 15, average: 20, weak: 6 },
    { question: "Subject G", total: 55, strong: 27, average: 18, weak: 10 },
    { question: "Subject H", total: 29, strong: 10, average: 19, weak: 0 },
    { question: "Subject I", total: 50, strong: 25, average: 13, weak: 12 },
    { question: "Subject J", total: 26, strong: 11, average: 8, weak: 7 },
  ];

  return (
    <TableContainer sx={{ paddingX: 2 }} className="bg-white">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Subject</strong>
            </TableCell>
            <TableCell>
              <strong>Total</strong>
            </TableCell>
            <TableCell>
              <strong>Strong</strong>
            </TableCell>
            <TableCell>
              <strong>Average</strong>
            </TableCell>
            <TableCell>
              <strong>Weak</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <React.Fragment key={item.question}>
              <TableRow
                sx={{
                  backgroundColor: "white",
                  border: "1.5px solid #ddd",
                  borderRadius: "8px",
                  overflow: "hidden",
                  marginBottom: "6px",
                  "&:last-child": {
                    marginBottom: 0, // No margin on the last row
                  },
                }}
              >
                <TableCell>{item.question}</TableCell>
                <TableCell>{item.total}</TableCell>
                <TableCell>{item.strong}</TableCell>
                <TableCell>{item.average}</TableCell>
                <TableCell>{item.weak}</TableCell>
              </TableRow>

              {/* Spacer Row */}
              {index < data.length - 1 && (
                <TableRow sx={{ height: "8px", backgroundColor: "transparent" }}>
                  <TableCell colSpan={5}></TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
