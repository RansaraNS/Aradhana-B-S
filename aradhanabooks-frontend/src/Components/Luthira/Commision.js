// Commission.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Axios from 'axios';

export default function Commission() {
  const [riders, setRiders] = useState([]); // State for rider data

  useEffect(() => {
    // Fetch rider data when the component mounts
    fetchRiderData();
  }, []);

  const fetchRiderData = async () => {
    try {
      const response = await Axios.get('http://localhost:2001/api/riders');
      setRiders(response.data.response); // Assuming response data is under `response`
    } catch (error) {
      console.error('Error fetching rider data:', error);
    }
  };

  // Calculate the total task amount for all riders
  const totalTaskAmount = riders.reduce((total, rider) => total + (rider.assignedTasks * 100), 0);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" component="h1" sx={{ marginBottom: '20px', color: '#1D8731', textAlign: 'center' }}>
        Rider Assignment Overview
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Assigned Tasks</TableCell>
              <TableCell>Task Amount (Rs)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {riders.map((rider) => (
              <TableRow key={rider.id}>
                <TableCell>{rider.id}</TableCell>
                <TableCell>{rider.name}</TableCell>
                <TableCell>{rider.assignedTasks}</TableCell>
                <TableCell>{rider.assignedTasks * 100}</TableCell> {/* Calculate task amount */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Total Task Amount Calculation */}
      <Box sx={{ marginTop: '20px', textAlign: 'center' }}>
        <Typography variant="h6" component="p">
          Total Task Amount: Rs:{totalTaskAmount}
        </Typography>
      </Box>
    </Box>
  );
}
