import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Grid, Card, CardContent, Typography, Snackbar, Box } from '@mui/material';
import { Alert } from '@mui/material';
import HomeHead from "../../Components/Sasin/HomeHead.js";
import HomeFoot from "../../Components/Sasin/HomeFoot.js";

const DiscountPage = () => {
  const [packages, setPackages] = useState([]);
  const [message, setMessage] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:2001/api/loyalty-discount');
        setPackages(response.data);
      } catch (error) {
        console.error('Error fetching packages:', error);
        setMessage('Error fetching discount packages');
        setOpenSnackbar(true);
      }
    };

    fetchPackages();
  }, []);

  const handleClaim = async (packageId) => {
    const customerEmail = localStorage.getItem('customerEmail');

    if (!customerEmail) {
      setMessage('Error: Customer not logged in or email missing.');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await axios.post('http://localhost:2001/api/loyalty-discount/claim', { email: customerEmail, packageId });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data.message || 'Error claiming discount');
    } finally {
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <HomeHead /> {/* Header */}
      
      <Box sx={{ padding: '20px', marginBottom: '20px', marginTop: '80px'}}> {/* Spacing for body */}
        <Grid container spacing={3}>
          {packages.map((pkg) => (
            <Grid item xs={12} sm={6} md={4} key={pkg._id}>
              <Card elevation={6} style={{ height: '100%' }}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {pkg.packageName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    {pkg.description}
                  </Typography>
                  <Button variant="contained" sx={{backgroundColor: '#E90074' }} fullWidth onClick={() => handleClaim(pkg._id)}>
                    Claim
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>

      <HomeFoot /> {/* Footer */}
    </Box>
  );
};

export default DiscountPage;
