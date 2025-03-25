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
  return status === "Completed" ? { color: "green" } : { color: "red" };
};

export default function MockTestTable() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to format a Unix timestamp to DD/MM/YY
  const formatDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    return `${day}/${month}/${year}`;
  };

  // Function to convert seconds to HH:MM:SS format
  const formatTimeFromSeconds = (totalSeconds) => {
    if (!totalSeconds) return "--";

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const authToken = localStorage.getItem("authToken");
      if (!authToken) {
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "/api/analytics/mocktest?for=mock_tests_overview",
          {
            headers: { authtoken: authToken },
          }
        );

        if (!response.ok) throw new Error("Failed to fetch data");

        const result = await response.json();
        console.log("API response:", result);

        if (result.success && result.data.mock_tests_overview) {
          const formattedData = result.data.mock_tests_overview.map((item) => ({
            id: item.id,
            date: formatDate(item.mocktest_date),
            title: item.mocktest_title,
            status: item.status,
            totalQuestions: item.total_questions,
            totalTime: formatTimeFromSeconds(item.total_time_taken),
            score:
              item.score_get && item.score_get !== "0"
                ? `${item.score_get}/${item.total_score}`
                : "--",
            action: item.status === "Completed" ? "View Solution" : "Take Test",
          }));
          setRows(formattedData);
        }
      } catch (error) {
        console.error("Error fetching overview data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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
      if (row.status === "Completed") {
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
      {isLoading ? (
        <div className="flex justify-center items-center p-8">Loading...</div>
      ) : (
        <>
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
        </>
      )}
    </Paper>
  );
}
