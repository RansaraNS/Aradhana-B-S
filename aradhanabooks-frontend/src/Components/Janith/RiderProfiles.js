  import { useEffect, useState } from "react";
  import Axios from "axios";
  import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
  import { useNavigate, useParams } from "react-router-dom";

  const RiderProfiles = () => {
    const { orderId } = useParams();
    const [riders, setRiders] = useState([]);
    const [taskCounts, setTaskCounts] = useState({}); // State to track task counts for each rider
    const [taskAmounts, setTaskAmounts] = useState({}); // State to track task amounts for each rider
    const navigate = useNavigate();

    useEffect(() => {
      fetchRiders();
    }, []);

    // Fetch riders and their task counts from backend
    const fetchRiders = () => {
      Axios.get('http://localhost:2001/api/riders')
        .then(response => {
          setRiders(response.data.response || []);

          // Initialize task counts and task amounts for each rider from backend
          const initialCounts = {};
          const initialAmounts = {};
          response.data.response.forEach(rider => {
            const taskCount = rider.assignedTasks || 0;
            initialCounts[rider.id] = taskCount;
            initialAmounts[rider.id] = taskCount * 100; // Calculate initial task amount
          });
          setTaskCounts(initialCounts);
          setTaskAmounts(initialAmounts);
        })
        .catch(error => {
          console.error("Error fetching riders:", error);
        });
    };

    const handleAddTask = (riderId) => {
      console.log(`Adding task for order ID: ${orderId}, Rider ID: ${riderId}`);

      // Increment task count for the specific rider
      const updatedCount = (taskCounts[riderId] || 0) + 1;

      // Update task count in the state
      setTaskCounts(prevCounts => ({
        ...prevCounts,
        [riderId]: updatedCount,
      }));

      // Calculate and update the task amount for the specific rider
      const updatedAmount = updatedCount * 100; // Task amount logic (assign tasks * Rs.100)
      setTaskAmounts(prevAmounts => ({
        ...prevAmounts,
        [riderId]: updatedAmount,
      }));

      // Send updated task count to the backend to persist it
      Axios.put(`http://localhost:2001/api/riders/${riderId}/tasks`, { assignedTasks: updatedCount })
        .then(() => {
          console.log("Task count updated successfully");
        })
        .catch(error => {
          console.error("Error updating task count:", error);
        });
    };

    return (
      <Box sx={{ width: '80%', margin: 'auto', marginTop: '50px', backgroundColor: '#0e450e', padding: '20px', borderRadius: '8px' }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>Vehicle Type</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>Assigned Tasks</TableCell> {/* New column for task count */}
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {riders.length > 0 ? (
                riders.map((rider) => (
                  <TableRow key={rider.id}>
                    <TableCell>{rider.id}</TableCell>
                    <TableCell>{rider.name}</TableCell>
                    <TableCell>{rider.vehicletype}</TableCell>
                    <TableCell>{taskCounts[rider.id] || 0}</TableCell> {/* Display the task count */}
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleAddTask(rider.id)} 
                        sx={{
                          borderColor: '#c21c63',
                          color: '#c21c63',
                          '&:hover': {
                            borderColor: '#b71b5b',
                            color: '#b71b5b',
                          },
                        }}
                      >
                        Add Task
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">No riders found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* New Table for Task Amount, ID, and Name */}
        <TableContainer component={Paper} sx={{ marginTop: '50px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>Name</TableCell>
                <TableCell sx={{ fontSize: '20px', fontWeight: 'bold' }}>Task Amount (Rs)</TableCell> {/* Task Amount column */}
              </TableRow>
            </TableHead>
            <TableBody>
              {riders.length > 0 ? (
                riders.map((rider) => (
                  <TableRow key={rider.id}>
                    <TableCell>{rider.id}</TableCell>
                    <TableCell>{rider.name}</TableCell>
                    <TableCell>{taskAmounts[rider.id] || 0}</TableCell> {/* Display the task amount */}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">No riders found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          <Button
            sx={{
              marginTop: '20px',
              backgroundColor: '#c21c63',
              color: '#fff',
              padding: '10px 20px',
              marginBottom: '100px',
              fontSize: '16px',
              borderRadius: '5px',
              '&:hover': {
                opacity: '0.8',
                backgroundColor: '#b71b5b',
              },
            }}
            onClick={() => navigate('/delivery')}
          >
            Dashboard
          </Button>

        </Box>
      </Box>
    );
  };

  export default RiderProfiles;
