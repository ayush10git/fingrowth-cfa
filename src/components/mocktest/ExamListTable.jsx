"use client";
import React, { useEffect, useState } from "react";
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
  {
    id: "totalQuestions",
    label: "Total Questions",
    minWidth: 100,
    align: "center",
  },
  { id: "totalTime", label: "Total Time", minWidth: 100, align: "center" },
  { id: "score", label: "Score", minWidth: 150, align: "center" },
  { id: "action", label: "Action", minWidth: 150, align: "center" },
];

const getStatusStyle = (status) => {
  return status === "Complete" ? { color: "green" } : { color: "red" };
};

export default function MockTestTable() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);

  // Add this function to convert seconds to HH:MM:SS format
  // Function to convert minutes to HH:MM:SS format
  const formatTimeFromMinutes = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const seconds = 0; // Since we're working with whole minutes, seconds is always 0

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };

  // Then update your formattedData mapping in the useEffect
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");

    fetch("/api/mocktest", {
      headers: {
        authtoken: authToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.data) {
          console.log(data.data);
          const formattedData = data.data.map((item, index) => ({
            id: item.id,
            date: "02/10/24", // Static value
            title: item.title,
            status: item.total_correct > 0 ? "Complete" : "Incomplete",
            totalQuestions: item.total_questions,
            totalTime: formatTimeFromMinutes(item.max_time), // Convert minutes to HH:MM:SS
            score:
              item.total_correct > 0
                ? `${item.total_correct * 50}/${item.max_score}`
                : "--",
            action: item.total_correct > 0 ? "View Solution" : "Take Test",
          }));
          setRows(formattedData);
        }
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderActionButton = (row) => {
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

  return (
    <Paper className="-mt-2" sx={{ width: "100%" }} elevation={0}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="mocktest table">
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
              .map((row) => (
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
                          renderActionButton(row)
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
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
