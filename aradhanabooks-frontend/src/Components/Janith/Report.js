import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Reports = () => {
  const [riders, setRiders] = useState([]);
  const [taskCounts, setTaskCounts] = useState({});
  const [taskAmounts, setTaskAmounts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchRiders();
  }, []);

  const fetchRiders = () => {
    Axios.get("http://localhost:2001/api/riders")
      .then((response) => {
        setRiders(response.data.response || []);
        const initialCounts = {};
        const initialAmounts = {};
        response.data.response.forEach((rider) => {
          const taskCount = rider.assignedTasks || 0;
          initialCounts[rider.id] = taskCount;
          initialAmounts[rider.id] = taskCount * 100; // Task amount logic
        });
        setTaskCounts(initialCounts);
        setTaskAmounts(initialAmounts);
      })
      .catch((error) => {
        console.error("Error fetching riders:", error);
      });
  };

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Rider Report", 14, 20);

    const tableData = riders.map((rider) => [
      rider.id,
      rider.name,
      taskCounts[rider.id] || 0,
      taskAmounts[rider.id] || 0,
    ]);

    doc.autoTable({
      head: [["ID", "Name", "Assigned Tasks", "Task Amount (Rs)"]],
      body: tableData,
      startY: 30,
    });

    doc.save("rider_report.pdf");
  };

  return (
    <Box
      sx={{
        width: "calc(100% - 100px)",
        margin: "auto",
        marginTop: "100px",
        backgroundColor: "#0e450e", // Box background color
        padding: "20px",
        borderRadius: "8px",
        marginBottom: "400px",
      }}
    >
      {/* Table displaying rider data */}
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse", // Ensures borders touch
          backgroundColor: "#fff", // Table background color
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2" }}> {/* Optional header bg color */}
            <th style={{ fontSize: "20px", fontWeight: "bold", border: "1px solid black", padding: "10px" }}>ID</th>
            <th style={{ fontSize: "20px", fontWeight: "bold", border: "1px solid black", padding: "10px" }}>Name</th>
            <th style={{ fontSize: "20px", fontWeight: "bold", border: "1px solid black", padding: "10px" }}>Assigned Tasks</th>
            <th style={{ fontSize: "20px", fontWeight: "bold", border: "1px solid black", padding: "10px" }}>Task Amount (Rs)</th>
          </tr>
        </thead>
        <tbody>
          {riders.length > 0 ? (
            riders.map((rider) => (
              <tr key={rider.id}>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>{rider.id}</td>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>{rider.name}</td>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>{taskCounts[rider.id] || 0}</td>
                <td style={{ border: "1px solid black", padding: "10px", textAlign: "center" }}>{taskAmounts[rider.id] || 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} align="center" style={{ padding: "10px", border: "1px solid black" }}>
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Buttons container with flex positioning */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "20px",
        }}
      >
        {/* Dashboard Button (left corner) */}
        <Button
          sx={{
            backgroundColor: "#c21c63", // White button with pink text
            color: "#fff",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            fontWeight: "bold",
            border: "2px solid #c21c63", // Button border
            "&:hover": {
              opacity: "0.8",
              backgroundColor: "#c21c63",
              color: "#fff",
            },
          }}
          onClick={() => navigate("/delivery")}
        >
          Dashboard
        </Button>

        {/* Generate Report Button (right corner) */}
        <Button
          sx={{
            backgroundColor: "#c21c63", // White button with pink text
            color: "#fff",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "5px",
            fontWeight: "bold",
            border: "2px solid #c21c63", // Button border
            "&:hover": {
              opacity: "0.8",
              backgroundColor: "#c21c63",
              color: "#fff",
            },
          }}
          onClick={generatePDF}
        >
          Generate Report
        </Button>
      </Box>
    </Box>
  );
};

export default Reports;
