import React, { useState } from 'react';
import { TextField, Button, Paper, Typography, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import mainlogo from '../../../Images/Aradhana Books & Stationary Logo.png'

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:2001/api/auth/admin-login', {
                email,
                password,
            });
            // If login is successful
            if (response.data.token) {
                console.log('Login successful');
                // Store the token in localStorage or any state management tool
                localStorage.setItem('token', response.data.token);
                navigate('/admin-control-panel'); // Redirect to admin control panel
            }
        } catch (error) {
            console.log('Login failed', error.response?.data?.message);
            setErrorMessage(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#E9FF97', maxWidth: '400px', margin: 'auto', marginTop: '140px' }}>
        <div>
            <img
                src={mainlogo}
                alt="Logo"
                className="side-panel-photo1" 
            />
        </div>
            <Typography component="h1" variant="h5" textAlign="center" fontWeight="bold" sx={{marginBottom: '20px'}}>
                ADMIN LOGIN
            </Typography>

            <TextField
                fullWidth
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2 }}
            />

            <TextField
                fullWidth
                type={showPassword ? 'text' : 'password'}
                label="Password"
                variant="outlined"
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
            />

            {errorMessage && (
                <Typography color="error" variant="body2" textAlign="center" sx={{ mb: 2 }}>
                    {errorMessage}
                </Typography>
            )}

            <Button
                variant="contained"
                
                onClick={handleLogin}
                fullWidth
                sx={{ backgroundColor: '#1D8731' , mt: 2 }}
            >
                Login
            </Button>
        </Paper>
    );
};

export default AdminLogin;
