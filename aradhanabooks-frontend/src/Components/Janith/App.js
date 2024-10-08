import { useNavigate } from 'react-router-dom';
import './App.css';
import Calendar from 'react-calendar';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AssessmentIcon from '@mui/icons-material/Assessment';
import location from '../../Images/location.png';

import {
  Container,
  TextField,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
} from '@mui/material';
import 'react-calendar/dist/Calendar.css'; // Ensure the calendar styles are included
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts'; // Import chart components

function App() {
  const navigate = useNavigate();
  const [riders, setRiders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRiders, setFilteredRiders] = useState([]);
  const [date, setDate] = useState(new Date());
  const [totalAssignedTasks, setTotalAssignedTasks] = useState(0); // State for total assigned tasks
  const [taskData, setTaskData] = useState([]); // State for bar graph data

  useEffect(() => {
    // Fetch the rider data from the API on component mount
    Axios.get('http://localhost:2001/api/riders')
      .then((response) => {
        const riderData = response.data.response || [];
        setRiders(riderData);
        calculateTotalAssignedTasks(riderData); // Calculate total tasks when fetching riders
      })
      .catch((error) => {
        console.error("Error fetching riders:", error);
      });
  }, []);

  const calculateTotalAssignedTasks = (riders) => {
    const totalTasks = riders.reduce((total, rider) => total + (rider.assignedTasks || 0), 0);
    setTotalAssignedTasks(totalTasks);
    setTaskData(riders.map(rider => ({ name: rider.name, tasks: rider.assignedTasks || 0 }))); // Prepare data for bar chart
  };

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    
    const filtered = riders.filter((rider) =>
      rider.id.toLowerCase().includes(value) ||
      rider.name.toLowerCase().includes(value) ||
      rider.vehicletype.toLowerCase().includes(value)
    );
    setFilteredRiders(filtered);
  };

  const onChangeDate = (newDate) => {
    setDate(newDate); // Update the date when the user selects a date from the calendar
  };

  const handleItemsButtonClick = () => {
    navigate('/items'); // Navigate to Item.js
  };

  return (
    <div className="App">
      <div className="side-panel">
        <div className="dd">
          <img 
            src={location}
            alt="Logoo" 
            className="side-panel-photo" 
          />
          <h1>DashBoard</h1>
        </div>
        <ul className="side-nav">
          <li className="side-nav-item" onClick={() => navigate('/porders')}>
            <ListAltIcon />  Orders
          </li>
          <li className="side-nav-item" onClick={() => navigate('/createRider')}>
            <PersonAddIcon /> Create Rider
          </li>
          <li className="side-nav-item" onClick={() => navigate('/riders')}>
            <PeopleIcon /> Riders
          </li>
          <li className="side-nav-item" onClick={() => navigate('/rider-profiles')}>
            <AccountBoxIcon /> Rider Profiles
          </li>
          <li className="side-nav-item" onClick={() => navigate('/reports')}>
            <AssessmentIcon /> Reports
          </li>
        </ul>
        <div className='jj'>
          <h5>Delivery Manager: Janith Waduge</h5>
          <h5>jhansamana@gmail.com<br />714531428</h5>
        </div>
      </div>
      <div className="content">
        <Container>
          <Typography variant="h4" align="center" gutterBottom>
            Aradhana Book Delivery
          </Typography>

          {/* Search Bar */}
          <TextField
            variant="outlined"
            label="Search by Rider ID, Name, or Vehicle Type"
            fullWidth
            value={searchTerm}
            onChange={handleSearch}
            style={{ marginBottom: '20px' }}
          />

          {/* Search Results */}
          {searchTerm && ( // Show the table only if there is a search term
            <TableContainer component={Paper} style={{ marginBottom: '20px' }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Telephone</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRiders.length > 0 ? (
                    filteredRiders.map((rider) => (
                      <TableRow key={rider.id}>
                        <TableCell>{rider.id}</TableCell>
                        <TableCell>{rider.name}</TableCell>
                        <TableCell>{rider.telephone}</TableCell>
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
          )}

          {/* Button for Items */}
          <Button variant="contained" color="primary" onClick={handleItemsButtonClick}>
            Items
          </Button>

          {/* Total Assigned Tasks Card */}
          <Card sx={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="h5" align="center">Total Assigned Tasks: {totalAssignedTasks}</Typography>
            </CardContent>
          </Card>

          {/* Flexbox Container for Bar Chart and Calendar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {/* Bar Chart for Task Distribution */}
            <div style={{ flex: 1, marginRight: '20px' }}>
              <BarChart
                width={250}
                height={300}
                data={taskData}
                margin={{
                  top: 5, right: 30, left: 20, bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="tasks" fill="#8884d8" />
              </BarChart>
            </div>

            {/* Calendar */}
            <div style={{ flex: 1 }}>
              <div className="calendar-container">
                <Typography variant="h6">Today: {date.toDateString()}</Typography>
                <Calendar
                  onChange={onChangeDate}
                  value={date}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default App;
