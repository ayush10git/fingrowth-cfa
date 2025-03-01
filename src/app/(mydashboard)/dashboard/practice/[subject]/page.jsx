"use client";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";

const Page = ({ params }) => {
  const { subject } = params;
  
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
          setError("Authentication token is missing.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `/api/subject/${subject}`,
          {
            headers: { authtoken: authToken },
          }
        );

        if (!response.ok) {
          throw new Error(`API responded with status ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data.length > 0) {
          setTopics(
            data.data.map((topic) => ({
              id: topic.id,
              topic: topic.name,
              totalQuestions: topic.total_q,
              questionsSolved: topic.attempted,
              percentageCorrect: parseFloat(topic.correct),
              percentageSolved: (
                (topic.attempted / topic.total_q) *
                100
              ).toFixed(1),
            }))
          );
        } else {
          setError("No topics found.");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [subject]);

  return (
    <div className="fixed top-[75px] left-[75px] w-[calc(100vw-75px)] h-[calc(100vh-75px)] py-2 px-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">Topics</h2>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          width: "100%",
          textAlign: "center",
          borderRadius: "10px",
          backgroundColor: "transparent",
          padding: "8px",
        }}
      >
        <Table
          aria-label="topics table"
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
              <TableCell
                sx={{ fontWeight: "bold", borderRadius: "8px 0 0 8px" }}
              >
                Topic
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Total Questions
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Questions Solved
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Percentage Solved
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: "bold" }}>
                Percentage Correct
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontWeight: "bold", borderRadius: "0 8px 8px 0" }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  Loading topics...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} align="center" className="text-red-500">
                  {error}
                </TableCell>
              </TableRow>
            ) : topics.length > 0 ? (
              topics.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{
                    marginBottom: "8px",
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #E0E0E0",
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" },
                  }}
                >
                  <TableCell
                    sx={{ fontWeight: "bold", borderRadius: "8px 0 0 8px" }}
                  >
                    {row.topic}
                  </TableCell>
                  <TableCell align="center">{row.totalQuestions}</TableCell>
                  <TableCell align="center">{row.questionsSolved}</TableCell>
                  <TableCell align="center">{row.percentageSolved}%</TableCell>
                  <TableCell align="center">{row.percentageCorrect}%</TableCell>
                  <TableCell
                    align="center"
                    sx={{ borderRadius: "0 8px 8px 0" }}
                  >
                    <button
                      onClick={() =>
                        router.push(
                          `/dashboard/practice/${subject}/${row.topic}`
                        )
                      }
                      className="bg-[#8E6FD8] bg-opacity-70 px-5 py-1 text-sm text-white"
                    >
                      Practice
                    </button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No topics available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Page;
