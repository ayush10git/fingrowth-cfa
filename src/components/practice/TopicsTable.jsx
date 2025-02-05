"use client";
import { useRouter } from "next/navigation";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";
import * as React from "react";

function createData(
  subject,
  questionsSolved,
  totalQuestions,
  percentageCorrect
) {
  return {
    subject,
    questionsSolved,
    totalQuestions,
    percentageCorrect,
    completion: ((questionsSolved / totalQuestions) * 100).toFixed(2),
  };
}

function Row(props) {
  const { row } = props;
  const router = useRouter();

  return (
    <TableRow
      sx={{
        marginBottom: "8px", // Add gap between rows
        backgroundColor: "white", // Ensure rows have a white background
        borderRadius: "8px", // Rounded corners for rows
        border: "1px solid #E0E0E0", // Add 1px gray border to rows
        cursor: "pointer", // Make rows clickable
        "&:hover": {
          backgroundColor: "#f5f5f5", // Hover effect
        },
      }}
      onClick={() => router.push(`/dashboard/practice/${row.subject.replace(/\s+/g, "-")}`)}
    >
      <TableCell
        component="th"
        scope="row"
        sx={{ fontWeight: "bold", borderRadius: "8px 0 0 8px" }}
      >
        {row.subject}
      </TableCell>
      <TableCell align="center">
        {row.questionsSolved}/{row.totalQuestions}
      </TableCell>
      <TableCell align="center">{row.percentageCorrect}%</TableCell>
      <TableCell align="center">{row.completion}%</TableCell>
    </TableRow>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    subject: PropTypes.string.isRequired,
    questionsSolved: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    percentageCorrect: PropTypes.number.isRequired,
    completion: PropTypes.string.isRequired,
  }).isRequired,
};

const rows = [
  createData("Mathematics", 50, 60, 80),
  createData("History", 47, 68, 58),
  createData("Geography", 25, 48, 63),
  createData("English", 45, 50, 75),
  createData("Economics", 45, 50, 87),
];

export default function CollapsibleTable() {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        width: "100%",
        margin: 0,
        textAlign: "center",
        borderRadius: "10px",
        backgroundColor: "transparent", // Make the table container transparent
        padding: "8px", // Add padding to the table container
      }}
    >
      <Table
        aria-label="collapsible table"
        sx={{
          "& .MuiTableCell-root": {
            textAlign: "center",
            padding: "12px",
          },
          borderCollapse: "separate", // Allow gaps between rows
          borderSpacing: "0 8px", // Add spacing between rows
        }}
      >
        <TableHead>
          <TableRow
            sx={{ backgroundColor: "#F5F5F5", border: "1px solid #E0E0E0" }}
          >
            <TableCell
              className="font-medium text-lg"
              sx={{ fontWeight: "bold", borderRadius: "8px 0 0 8px" }}
            >
              Subject
            </TableCell>
            <TableCell
              align="center"
              className="font-medium text-lg"
              sx={{ fontWeight: "bold" }}
            >
              Questions Solved
            </TableCell>
            <TableCell
              align="center"
              className="font-medium text-lg"
              sx={{ fontWeight: "bold" }}
            >
              Percentage Correct
            </TableCell>
            <TableCell
              align="center"
              className="font-medium text-lg"
              sx={{ fontWeight: "bold" }}
            >
              Completion
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.subject} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
