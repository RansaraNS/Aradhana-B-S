import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making API requests
import mainlogo from '../../../Images/Aradhana Books & Stationary Logo.png'

const StaffLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(''); // Error message state
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:2001/api/auth/staff-login', { email, password }); // Adjust the endpoint as necessary
      console.log('Login successful:', response.data);
      
      // Navigate to staff dashboard or wherever after successful login
      navigate('/itemtable'); // Adjust the route to your staff dashboard
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Paper elevation={3} style={{ justifyContent: 'center', backgroundColor: '#D8EFD3', padding: '20px', maxWidth: '400px', margin: 'auto', marginTop: '140px' }}>
      <div>
            <img
                src={mainlogo}
                alt="Logo"
                className="side-panel-photo1" 
            />
        </div>
      <Typography component="h1" variant="h5" textAlign="center" fontWeight="bold" sx={{ marginBottom: '20px' }}>
        STAFF LOGIN
      </Typography>

      <TextField
        fullWidth
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
        error={!!error}
      />

      <TextField
        fullWidth
        type={showPassword ? 'text' : 'password'}
        label="Password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleTogglePassword} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
        error={!!error}
      />

      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Button
        variant="contained"
        onClick={handleLogin}
        fullWidth
        sx={{ backgroundColor: '#6EC207', mt: 2 }}
      >
        Login
      </Button>
    </Paper>
  );
};

export default StaffLogin;
