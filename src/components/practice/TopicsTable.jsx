"use client";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
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
  percentageCorrect,
  topics
) {
  return {
    subject,
    questionsSolved,
    totalQuestions,
    percentageCorrect,
    topics,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset", textAlign: "center" },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            className="text-[#8E6FD8]"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.subject}
        </TableCell>
        <TableCell align="center">
          {row.questionsSolved}/{row.totalQuestions}
        </TableCell>
        <TableCell align="center">{row.percentageCorrect}%</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1, textAlign: "center" }}>
              <Table
                size="small"
                aria-label="topics"
                sx={{
                  "& .MuiTableCell-root": { textAlign: "center" },
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Topic</TableCell>
                    <TableCell align="center">Questions Solved</TableCell>
                    <TableCell align="center">Percentage Correct</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.topics.map((topic) => (
                    <TableRow key={topic.name}>
                      <TableCell component="th" scope="row">
                        {topic.name}
                      </TableCell>
                      <TableCell align="center">
                        {topic.questionsSolved}/{topic.totalQuestions}
                      </TableCell>
                      <TableCell align="center">
                        {topic.percentageCorrect}%
                      </TableCell>
                      <TableCell align="center">
                        <button className="bg-[#8E6FD8] bg-opacity-70 text-white py-1 px-4 ">
                          Practice
                        </button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    subject: PropTypes.string.isRequired,
    questionsSolved: PropTypes.number.isRequired,
    totalQuestions: PropTypes.number.isRequired,
    percentageCorrect: PropTypes.number.isRequired,
    topics: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        questionsSolved: PropTypes.number.isRequired,
        totalQuestions: PropTypes.number.isRequired,
        percentageCorrect: PropTypes.number.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

const rows = [
  createData("Mathematics", 50, 60, 80, [
    {
      name: "Algebra",
      questionsSolved: 20,
      totalQuestions: 25,
      percentageCorrect: 90,
    },
    {
      name: "Geometry",
      questionsSolved: 15,
      totalQuestions: 20,
      percentageCorrect: 75,
    },
    {
      name: "Trigonometry",
      questionsSolved: 15,
      totalQuestions: 15,
      percentageCorrect: 70,
    },
  ]),
  createData("Physics", 30, 40, 70, [
    {
      name: "Kinematics",
      questionsSolved: 10,
      totalQuestions: 15,
      percentageCorrect: 60,
    },
    {
      name: "Dynamics",
      questionsSolved: 20,
      totalQuestions: 25,
      percentageCorrect: 75,
    },
  ]),
  createData("Chemistry", 40, 50, 85, [
    {
      name: "Organic Chemistry",
      questionsSolved: 25,
      totalQuestions: 30,
      percentageCorrect: 90,
    },
    {
      name: "Inorganic Chemistry",
      questionsSolved: 15,
      totalQuestions: 20,
      percentageCorrect: 80,
    },
  ]),
];

export default function CollapsibleTable() {
  return (
    <TableContainer
      component={Paper}
      elevation={0} // Remove shadow
      sx={{
        width: "100%", // Full width of the screen
        margin: 0, // Remove margin
        textAlign: "center",
      }}
    >
      <Table
        aria-label="collapsible table"
        sx={{
          "& .MuiTableCell-root": { textAlign: "left" },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="right" className="font-medium text-lg">
              Subject
            </TableCell>
            <TableCell align="center" className="font-medium text-lg">
              Questions Solved
            </TableCell>
            <TableCell align="center" className="font-medium text-lg">
              Percentage Correct
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
