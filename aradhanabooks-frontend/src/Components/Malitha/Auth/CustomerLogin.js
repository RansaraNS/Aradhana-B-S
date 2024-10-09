import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import authService from '../../../services/auth';
import mainlogo from '../../../Images/Aradhana Books & Stationary Logo.png'

const CustomerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setErrorMessage('Email and Password are required.');
      setOpenErrorSnackbar(true);
      return;
    }

    try {
      setIsLoading(true);
      const user = await authService.login(email, password); // Use authService.login to call the API

      console.log('Login successful', user);

      setOpenSnackbar(true);

      setTimeout(() => {
        navigate('/home');
      }, 2000);
    } catch (error) {
      setErrorMessage(error);
      setOpenErrorSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
    setOpenErrorSnackbar(false);
  };

  return (
    <Container maxWidth="xs" sx={{ justifyContent: 'center'}}>
      <Box
        sx={{
          backgroundColor: '#F5F5F5',
          alignItems: 'center',
          padding: '2rem',
          marginTop: '120px',
          justifyContent: 'center',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          width: '100%',
          backgroundColor: '#D6EFD8'
        }}
      >
        <div>
        <img
            src={mainlogo}
            alt="Logo"
            className="side-panel-photo1" 
          />
        </div>
        <Typography component="h1" variant="h5" textAlign="center" fontWeight="bold">
          LOGIN
        </Typography>

        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 2 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
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
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            
            sx={{ backgroundColor: '#eb1873', mt: 2, mb: 2 }}
          >
            LOGIN
          </Button>

          <Typography variant="body2" textAlign="center">
            Don't have an account?{' '}
            <a href="/register" style={{ textDecoration: 'none', color: '#1976d2' }}>
              Register
            </a>
          </Typography>
        </Box>
      </Box>

      {/* Snackbar for success notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Logged in successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CustomerLogin;
