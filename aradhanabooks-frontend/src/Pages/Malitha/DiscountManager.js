import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminHead from "../../Components/Sasin/AdminHead";
import AdminFoot from "../../Components/Sasin/AdminFoot";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Alert,
  Box
} from '@mui/material';

const DiscountManager = () => {
  const [packages, setPackages] = useState([]);
  const [newPackage, setNewPackage] = useState({
    packageName: '',
    description: '',
    conditionAmount: '',
    discountPercentage: ''
  });
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Fetch existing discount packages
    axios.get('http://localhost:2001/api/loyalty-discount')
      .then((response) => {
        setPackages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching packages:', error);
      });
  }, []);

  const handleAdd = () => {
    // Input validation
    if (!newPackage.packageName || !newPackage.description || !newPackage.conditionAmount || !newPackage.discountPercentage) {
      setMessage('All fields are required!');
      setOpenSnackbar(true);
      return;
    }

    axios.post('http://localhost:2001/api/loyalty-discount/create', newPackage)
      .then((response) => {
        setPackages([...packages, response.data]); // Add new package to the list
        setNewPackage({ packageName: '', description: '', conditionAmount: '', discountPercentage: '' });
        setMessage('Package added successfully!');
      })
      .catch((error) => {
        console.error('Error adding package:', error);
        setMessage(error.response?.data.message || 'Error adding package'); // Display error message
      })
      .finally(() => {
        setOpenSnackbar(true);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:2001/api/loyalty-discount/${id}`)
      .then(() => {
        setPackages(packages.filter(pkg => pkg._id !== id)); // Update package list without reload
        setMessage('Package deleted successfully!');
      })
      .catch((error) => {
        console.error('Error deleting package:', error);
        setMessage(error.response?.data.message || 'Error deleting package'); // Display error message
      })
      .finally(() => {
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <AdminHead /> {/* Include AdminHead here */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
        <Paper sx={{ width: '100%', maxWidth: '1200px', marginBottom: '20px', padding: '20px' }}>
          <Card>
            <CardContent>
              <Typography variant="h4" gutterBottom>Discount Packages</Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Package Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Condition Amount</TableCell>
                    <TableCell>Discount Percentage</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {packages.map((pkg) => (
                    <TableRow key={pkg._id}>
                      <TableCell>{pkg.packageName}</TableCell>
                      <TableCell>{pkg.description}</TableCell>
                      <TableCell>{pkg.conditionAmount}</TableCell>
                      <TableCell>{pkg.discountPercentage}%</TableCell>
                      <TableCell>
                        <Button color="secondary" onClick={() => handleDelete(pkg._id)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card style={{ marginTop: '20px' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>Add New Discount Package</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Package Name" 
                    value={newPackage.packageName} 
                    onChange={(e) => setNewPackage({ ...newPackage, packageName: e.target.value })} 
                    fullWidth 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Description" 
                    value={newPackage.description} 
                    onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })} 
                    fullWidth 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Condition Amount" 
                    value={newPackage.conditionAmount} 
                    onChange={(e) => setNewPackage({ ...newPackage, conditionAmount: e.target.value })} 
                    fullWidth 
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField 
                    label="Discount Percentage" 
                    value={newPackage.discountPercentage} 
                    onChange={(e) => setNewPackage({ ...newPackage, discountPercentage: e.target.value })} 
                    fullWidth 
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button 
                    variant="contained" 
                    sx={{
                      backgroundColor: '#1D8731'
                    }} 
                    onClick={handleAdd} 
                    fullWidth 
                  >
                    Add Package
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
              {message}
            </Alert>
          </Snackbar>
        </Paper>
      </Box>
      <AdminFoot /> {/* Include AdminFoot here */}
    </>
  );
};

export default DiscountManager;
