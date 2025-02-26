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

export const DetailReviewQuestionTable = ({ questions, questionAttempts }) => {
  // Merge questions and attempts with conditional Review logic
  const data = questions.map((question) => {
    const attempt = questionAttempts.find(
      (attempt) => attempt.question_id === question.question_id
    );
    return {
      ...question,
      correct: attempt?.answer_given === question.answer,
      action: attempt?.answer_given === question.answer ? "Review" : "--",
    };
  });

  return (
    <TableContainer sx={{ marginTop: 1, paddingX: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Question</strong>
            </TableCell>
            <TableCell>
              <strong>Recommendation</strong>
            </TableCell>
            <TableCell>
              <strong>Action</strong>
            </TableCell>
            <TableCell>
              <strong>Subject</strong>
            </TableCell>
            <TableCell>
              <strong>Topic</strong>
            </TableCell>
            <TableCell>
              <strong>Correct</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item, index) => (
            <React.Fragment key={item.question_id}>
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
                <TableCell>
                  {item.correct === false ? "Must Review" : "No Need to Review"}
                </TableCell>
                <TableCell align="center">
                  {item.correct === false ? (
                    <button className="px-3 py-1 bg-[#8E6FD8] text-white bg-opacity-80">
                      Review
                    </button>
                  ) : (
                    "--"
                  )}
                </TableCell>
                <TableCell>{item.subject}</TableCell>
                <TableCell>{item.topic}</TableCell>
                <TableCell align="center">
                  {item.correct ? (
                    <CheckCircleIcon className="text-green-500 w-7 h-7" />
                  ) : (
                    <CancelIcon className="text-red-500 w-7 h-7" />
                  )}
                </TableCell>
              </TableRow>

              {/* Spacer Row */}
              {index < data.length - 1 && (
                <TableRow sx={{ height: "8px", backgroundColor: "transparent" }}>
                  <TableCell colSpan={6}></TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
