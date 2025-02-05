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
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";

const data = {
  Mathematics: [
    "Algebra",
    "Geometry",
    "Calculus",
    "Trigonometry",
    "Probability",
  ],
  Science: ["Physics", "Chemistry", "Biology", "Astronomy"],
  History: [
    "Ancient History",
    "Medieval History",
    "Modern History",
    "World Wars",
  ],
  Geography: [
    "Physical Geography",
    "Human Geography",
    "Cartography",
    "Climatology",
  ],
  English: ["Grammar", "Literature", "Writing Skills", "Poetry"],
  Economics: [
    "Microeconomics",
    "Macroeconomics",
    "International Trade",
    "Public Finance",
  ],
};

// Generate random stats for each topic
const generateRandomStats = () => {
  const totalQuestions = Math.floor(Math.random() * 50) + 10; // Between 10 and 60
  const questionsSolved = Math.floor(Math.random() * totalQuestions);
  const percentageSolved = ((questionsSolved / totalQuestions) * 100).toFixed(
    1
  );
  const percentageCorrect = (Math.random() * 100).toFixed(1); // Random percentage correct
  return {
    totalQuestions,
    questionsSolved,
    percentageSolved,
    percentageCorrect,
  };
};

const Page = ({ params }) => {
  const { subject } = params;
  const [topics, setTopics] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (data[subject]) {
      setTopics(
        data[subject].map((topic) => ({ topic, ...generateRandomStats() }))
      );
    }
  }, [subject]);

  return (
    <div className="fixed top-[75px] left-[75px] w-[calc(100vw-75px)] h-[calc(100vh-75px)] py-2 px-4 overflow-y-auto">
      <h2 className="text-2xl font-bold mb-4">{subject} Topics</h2>
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
            "& .MuiTableCell-root": {
              textAlign: "center",
              padding: "12px",
            },
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
            {topics.length > 0 ? (
              topics.map((row, index) => (
                <TableRow
                  key={index}
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
                      className="bg-[#8E6FD8] bg-opacity-70  px-5 py-1 text-sm text-white"
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
