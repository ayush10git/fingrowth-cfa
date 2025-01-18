"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

const columns = [
  { id: "date", label: "Date", minWidth: 100, align: "center" },
  { id: "title", label: "Title", minWidth: 170, align: "center" },
  { id: "status", label: "Status", minWidth: 150, align: "center" },
  { id: "totalQuestions", label: "Total Questions", minWidth: 100, align: "center" },
  { id: "totalTime", label: "Total Time", minWidth: 100, align: "center" },
  { id: "score", label: "Score", minWidth: 150, align: "center" },
  { id: "action", label: "Action", minWidth: 150, align: "center" },
];

function createData(id, date, title, status, totalQuestions, totalTime, score, action) {
  return { id, date, title, status, totalQuestions, totalTime, score, action };
}

const rows = [
  createData(
    1,
    "02/10/24",
    "Mock Test 1",
    "Complete",
    90,
    "02:15:00",
    "355/500",
    "View Solution"
  ),
  createData(
    2,
    "02/10/24",
    "Mock Test 2",
    "Complete",
    90,
    "02:15:00",
    "391/500",
    "View Solution"
  ),
  createData(
    3,
    "02/10/24",
    "Mock Test 3",
    "Complete",
    90,
    "02:15:00",
    "289/500",
    "View Solution"
  ),
  createData(
    4,
    "02/10/24",
    "Mock Test 4",
    "Complete",
    90,
    "02:15:00",
    "265/500",
    "View Solution"
  ),
  createData(
    5,
    "02/10/24",
    "Mock Test 5",
    "Complete",
    90,
    "02:15:00",
    "411/500",
    "View Solution"
  ),
  createData(
    6,
    "02/10/24",
    "Mock Test 6",
    "Incomplete",
    90,
    "02:15:00",
    "--",
    "Take Test"
  ),
  createData(
    7,
    "02/10/24",
    "Mock Test 7",
    "Incomplete",
    90,
    "02:15:00",
    "--",
    "Take Test"
  ),
  createData(
    8,
    "02/10/24",
    "Mock Test 8",
    "Incomplete",
    90,
    "02:15:00",
    "--",
    "Take Test"
  ),
  createData(
    9,
    "02/10/24",
    "Mock Test 9",
    "Incomplete",
    90,
    "02:15:00",
    "--",
    "Take Test"
  ),
  createData(
    10,
    "02/10/24",
    "Mock Test 10",
    "Incomplete",
    90,
    "02:15:00",
    "--",
    "Take Test"
  ),
];

// Function to apply color based on the status
const getStatusStyle = (status) => {
  return status === "Complete" ? { color: "green" } : { color: "red" };
};

// Render the Action button and navigate to /exam/{id}
const renderActionButton = (row, router) => {
  const color = row.status === "Complete" ? "warning" : "success";

  const handleClick = () => {
    if (row.status === "Complete") {
      router.push(`/exam/solution/${row.id}`);
    } else {
      router.push(`/exam/${row.id}`);
    }
  };

  return (
    <button
      className="bg-[#8E6FD8] bg-opacity-70 w-[6.5rem] p-2 text-xs text-white"
      onClick={handleClick}
    >
      {row.action}
    </button>
  );
};

export default function StickyHeadTable() {
  const router = useRouter(); // For navigation
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className="-mt-2" sx={{ width: "100%", overflow: "hidden" }} elevation={0}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  className="font-semibold text-base py-2"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          className="py-2"
                          key={column.id}
                          align="center"
                        >
                          {column.id === "status" ? (
                            <span style={getStatusStyle(value)}>{value}</span>
                          ) : column.id === "action" ? (
                            renderActionButton(row, router)
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
