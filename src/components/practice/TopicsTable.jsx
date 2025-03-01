"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";

function createData(
  id,
  subject,
  questionsSolved,
  totalQuestions,
  percentageCorrect
) {
  return {
    id, // Store the subject's unique ID
    subject,
    questionsSolved,
    totalQuestions,
    percentageCorrect,
    completion: totalQuestions
      ? ((questionsSolved / totalQuestions) * 100).toFixed(2)
      : "0",
  };
}

function Row({ row }) {
  const router = useRouter();

  return (
    <TableRow
      sx={{
        marginBottom: "8px",
        backgroundColor: "white",
        borderRadius: "8px",
        border: "1px solid #E0E0E0",
        cursor: "pointer",
        "&:hover": { backgroundColor: "#f5f5f5" },
      }}
      onClick={() => router.push(`/dashboard/practice/${row.id}`)} // Use subject ID
    >
      <TableCell sx={{ fontWeight: "bold", borderRadius: "8px 0 0 8px" }}>
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
    id: PropTypes.string.isRequired, // Ensure ID is included
    subject: PropTypes.string.isRequired,
    questionsSolved: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    percentageCorrect: PropTypes.number.isRequired,
    completion: PropTypes.string.isRequired,
  }).isRequired,
};

export default function CollapsibleTable() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          setError("Authentication token is missing.");
          setLoading(false);
          return;
        }

        const response = await fetch("/api/subject", {
          headers: { authtoken: authToken },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }

        const data = await response.json();
        if (data.success && data.data.length > 0) {
          const formattedRows = data.data.map((subject) =>
            createData(
              subject.id, // Include subject ID
              subject.name,
              subject.attempted,
              subject.total,
              parseFloat(subject.correct) // Ensure correct is a number
            )
          );
          setRows(formattedRows);
        } else {
          throw new Error("No subject data found");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{
        width: "100%",
        margin: 0,
        textAlign: "center",
        borderRadius: "10px",
        backgroundColor: "transparent",
        padding: "8px",
      }}
    >
      <Table
        aria-label="collapsible table"
        sx={{
          "& .MuiTableCell-root": { textAlign: "center", padding: "12px" },
          borderCollapse: "separate",
          borderSpacing: "0 8px",
        }}
      >
        <TableHead>
          <TableRow
            sx={{ backgroundColor: "#F5F5F5", border: "1px solid #E0E0E0" }}
          >
            <TableCell sx={{ fontWeight: "bold", borderRadius: "8px 0 0 8px" }}>
              Subject
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Questions Solved
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Percentage Correct
            </TableCell>
            <TableCell align="center" sx={{ fontWeight: "bold" }}>
              Completion
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={4} align="center">
                Loading subjects...
              </TableCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <TableCell colSpan={4} align="center" className="text-red-500">
                {error}
              </TableCell>
            </TableRow>
          ) : rows.length > 0 ? (
            rows.map((row) => <Row key={row.id} row={row} />) // Use subject ID as key
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No subjects available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
