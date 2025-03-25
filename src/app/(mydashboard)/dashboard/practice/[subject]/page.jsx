"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Collapse,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

// Updated mock data with % solved information
const initialMockData = [
  {
    id: 1,
    name: "Quantitative Methods",
    total_q: 248,
    solved: 30, // Added explicit solved count for parent topic
    subtopics: [
      {
        id: 101,
        name: "Quantitative Methods: Practice Pack",
        total_q: 59,
        solved: 7,
        percent_solved: "12",
        correct: "45",
      },
      {
        id: 102,
        name: "Basics of Multiple Regression and Underlying Assumptions",
        total_q: 9,
        solved: 9,
        percent_solved: "100",
        correct: "89",
      },
      {
        id: 103,
        name: "Evaluating Regression Model Fit and Interpreting Model Results",
        total_q: 20,
        solved: 14,
        percent_solved: "70",
        correct: "72",
      },
      {
        id: 104,
        name: "Model Misspecification",
        total_q: 9,
        solved: 0,
        percent_solved: "0",
        correct: "--",
      },
      {
        id: 105,
        name: "Extensions of Multiple Regression",
        total_q: 13,
        solved: 0,
        percent_solved: "0",
        correct: "--",
      },
      {
        id: 106,
        name: "Time-Series Analysis",
        total_q: 73,
        solved: 0,
        percent_solved: "0",
        correct: "--",
      },
      {
        id: 107,
        name: "Machine Learning",
        total_q: 26,
        solved: 0,
        percent_solved: "0",
        correct: "--",
      },
      {
        id: 108,
        name: "Big Data Projects",
        total_q: 39,
        solved: 0,
        percent_solved: "0",
        correct: "--",
      },
    ],
  },
  {
    id: 2,
    name: "Economics",
    total_q: 159,
    solved: 59, // Added explicit solved count for parent topic
    subtopics: [
      {
        id: 201,
        name: "Economics: Practice Pack",
        total_q: 59,
        solved: 0,
        percent_solved: "0",
        correct: "--",
      },
      {
        id: 202,
        name: "Currency Exchange Rates: Understanding Equilibrium Value",
        total_q: 59,
        solved: 59,
        percent_solved: "100",
        correct: "71",
      },
      {
        id: 203,
        name: "Economic Growth",
        total_q: 41,
        solved: 0,
        percent_solved: "0",
        correct: "--",
      },
    ],
  },
];

// Helper function to calculate the aggregated metrics
const calculateAggregatedMetrics = (topic) => {
  if (!topic.subtopics || topic.subtopics.length === 0) {
    return {
      ...topic,
      solved: topic.solved || 0,
      percent_solved:
        topic.solved > 0
          ? ((topic.solved / topic.total_q) * 100).toFixed(0)
          : "0",
      correct: topic.correct || "--",
    };
  }

  // Calculate total solved questions
  const totalSolved = topic.subtopics.reduce(
    (sum, subtopic) => sum + (subtopic.solved || 0),
    0
  );

  // Calculate percent solved - ensure it's a string
  const percentSolved = ((totalSolved / topic.total_q) * 100).toFixed(0);

  // Calculate weighted correct percentage
  let weightedCorrectSum = 0;
  let totalSolvedWithScores = 0;

  topic.subtopics.forEach((subtopic) => {
    if (subtopic.solved > 0 && subtopic.correct !== "--") {
      weightedCorrectSum += parseFloat(subtopic.correct) * subtopic.solved;
      totalSolvedWithScores += subtopic.solved;
    }
  });

  // Calculate the weighted average
  const correctPercentage =
    totalSolvedWithScores > 0
      ? (weightedCorrectSum / totalSolvedWithScores).toFixed(0)
      : "--";

  return {
    ...topic,
    solved: totalSolved,
    percent_solved: percentSolved,
    correct: correctPercentage,
  };
};

// TopicRow component for handling expandable functionality
const TopicRow = ({ topic, isMainTopic, onSubtopicUpdate, topicIndex }) => {
  const [open, setOpen] = useState(false);
  const hasSubtopics = topic.subtopics && topic.subtopics.length > 0;

  // Function to handle updating a subtopic's correct value
  const handleSubtopicUpdate = (subtopicIndex, newCorrectValue) => {
    if (onSubtopicUpdate) {
      onSubtopicUpdate(topicIndex, subtopicIndex, newCorrectValue);
    }
  };

  const handlePractice = () => {
    console.log(`Practice topic: ${topic.name}`);
    // Implement navigation or action for practice
  };

  return (
    <>
      <TableRow
        sx={{
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <TableCell
          component="th"
          scope="row"
          sx={{
            paddingLeft: isMainTopic ? "15px" : "40px",
            paddingTop: "8px",
            paddingBottom: "8px",
            width: "30%", // Adjusted to make room for new column
          }}
        >
          <div className="flex items-center">
            {hasSubtopics && (
              <button onClick={() => setOpen(!open)} className="mr-2">
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </button>
            )}
            <span className="text-gray-800">{topic.name}</span>
          </div>
        </TableCell>
        <TableCell
          align="center"
          sx={{
            paddingTop: "8px",
            paddingBottom: "8px",
            width: "12.5%",
          }}
        >
          {topic.total_q}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            paddingTop: "8px",
            paddingBottom: "8px",
            width: "12.5%",
          }}
        >
          {topic.solved}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            paddingTop: "8px",
            paddingBottom: "8px",
            color:
              topic.percent_solved && topic.percent_solved !== "0"
                ? parseFloat(topic.percent_solved) > 50
                  ? "#2e7d32"
                  : "#ed6c02"
                : "inherit",
            width: "12.5%",
          }}
        >
          {topic.percent_solved ? `${topic.percent_solved}%` : "0%"}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            paddingTop: "8px",
            paddingBottom: "8px",
            color:
              topic.correct !== "--"
                ? parseFloat(topic.correct) > 75
                  ? "#2e7d32"
                  : "#ed6c02"
                : "inherit",
            width: "12.5%",
          }}
        >
          {topic.correct !== "--" ? `${topic.correct}%` : "--"}
        </TableCell>
        <TableCell
          align="center"
          sx={{
            paddingTop: "8px",
            paddingBottom: "8px",
            width: "20%",
          }}
        >
          <button
            onClick={handlePractice}
            className="px-4 py-1 bg-[#8E6FD8] text-white rounded-md"
          >
            Practice
          </button>
        </TableCell>
      </TableRow>

      {hasSubtopics && (
        <TableRow>
          <TableCell
            style={{ paddingBottom: 0, paddingTop: 0, border: "none" }}
            colSpan={6}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table
                size="small"
                aria-label="subtopics"
                sx={{ tableLayout: "fixed" }}
              >
                <TableBody>
                  {topic.subtopics.map((subtopic, subtopicIndex) => (
                    <SubtopicRow
                      key={subtopic.id}
                      subtopic={subtopic}
                      subtopicIndex={subtopicIndex}
                      onUpdate={handleSubtopicUpdate}
                    />
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};

// Subtopic row component
const SubtopicRow = ({ subtopic, subtopicIndex, onUpdate }) => {
  const [correctValue, setCorrectValue] = useState(subtopic.correct);

  // Handle edit for demonstration purposes
  const handleCorrectValueChange = () => {
    // This is a placeholder for where you'd have an edit function
    // For demo purposes, let's simulate changing to a random value
    const newValue = Math.floor(Math.random() * 100).toString();
    setCorrectValue(newValue);

    // Call the parent's update function
    if (onUpdate) {
      onUpdate(subtopicIndex, newValue);
    }
  };

  const handlePractice = () => {
    console.log(`Practice subtopic: ${subtopic.name}`);
    // Implement navigation or action for practice
  };

  return (
    <TableRow
      sx={{
        backgroundColor: "#fafafa",
        "&:hover": {
          backgroundColor: "#f0f0f0",
        },
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      <TableCell
        component="th"
        scope="row"
        sx={{
          paddingLeft: "40px",
          paddingTop: "8px",
          paddingBottom: "8px",
          width: "30%",
        }}
      >
        <div className="flex items-center">
          <span className="text-gray-800">{subtopic.name}</span>
        </div>
      </TableCell>
      <TableCell
        align="center"
        sx={{
          paddingTop: "8px",
          paddingBottom: "8px",
          width: "12.5%",
        }}
      >
        {subtopic.total_q}
      </TableCell>
      <TableCell
        align="center"
        sx={{
          paddingTop: "8px",
          paddingBottom: "8px",
          width: "12.5%",
        }}
      >
        {subtopic.solved}
      </TableCell>
      <TableCell
        align="center"
        sx={{
          paddingTop: "8px",
          paddingBottom: "8px",
          color:
            subtopic.percent_solved && subtopic.percent_solved !== "0"
              ? parseFloat(subtopic.percent_solved) > 50
                ? "#2e7d32"
                : "#ed6c02"
              : "inherit",
          width: "12.5%",
        }}
      >
        {`${subtopic.percent_solved}%`}
      </TableCell>
      <TableCell
        align="center"
        sx={{
          paddingTop: "8px",
          paddingBottom: "8px",
          color:
            correctValue !== "--"
              ? parseFloat(correctValue) > 75
                ? "#2e7d32"
                : "#ed6c02"
              : "inherit",
          width: "12.5%",
          cursor: "pointer",
        }}
        onClick={handleCorrectValueChange} // Added for demo to simulate changing values
      >
        {correctValue !== "--" ? `${correctValue}%` : "--"}
      </TableCell>
      <TableCell
        align="center"
        sx={{
          paddingTop: "8px",
          paddingBottom: "8px",
          width: "20%",
        }}
      >
        <button onClick={handlePractice} className="px-4 py-1 bg-[#8E6FD8] text-white rounded-md">Practice</button>
      </TableCell>
    </TableRow>
  );
};

const Page = ({ params }) => {
  const { subject } = params;
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch and process the initial data
    const fetchTopics = async () => {
      try {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Process the initial data with aggregated metrics
        const processedData = initialMockData.map((topic) =>
          calculateAggregatedMetrics(topic)
        );

        setTopics(processedData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, [subject]);

  // Handler for updating subtopics
  const handleSubtopicUpdate = (topicIndex, subtopicIndex, newCorrectValue) => {
    setTopics((prevTopics) => {
      // Create a deep copy to avoid mutation
      const updatedTopics = JSON.parse(JSON.stringify(prevTopics));

      // Update the specific subtopic's correct value
      updatedTopics[topicIndex].subtopics[subtopicIndex].correct =
        newCorrectValue;

      // Recalculate the aggregated metrics for the parent topic
      updatedTopics[topicIndex] = calculateAggregatedMetrics(
        updatedTopics[topicIndex]
      );

      return updatedTopics;
    });
  };

  return (
    <div className="fixed top-[75px] left-[70px] w-[calc(100vw-75px)] h-[calc(100vh-75px)] overflow-y-auto bg-gray-50">
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "100%",
          borderRadius: "0px",
          backgroundColor: "white",
          boxShadow: "none",
          padding: "0",
          margin: "0",
        }}
      >
        <Table
          aria-label="topics table"
          sx={{
            borderCollapse: "collapse",
            width: "100%",
            tableLayout: "fixed",
          }}
        >
          <TableHead>
            <TableRow
              sx={{
                borderBottom: "1px solid #e0e0e0",
                backgroundColor: "#f5f5f5",
              }}
            >
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  paddingLeft: "15px",
                  width: "30%",
                }}
              >
                Topic
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  width: "12.5%",
                }}
              >
                Total Questions
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  width: "12.5%",
                }}
              >
                Questions Solved
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  width: "12.5%",
                }}
              >
                % Solved
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  width: "12.5%",
                }}
              >
                % Correct
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                  width: "20%",
                }}
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
              topics.map((topic, index) => (
                <TopicRow
                  key={topic.id}
                  topic={topic}
                  isMainTopic={true}
                  onSubtopicUpdate={handleSubtopicUpdate}
                  topicIndex={index}
                />
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
