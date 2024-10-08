import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Button } from '@mui/material';

const NavBar = () => {
    return (
        
        <AppBar position="static">
            <Toolbar sx={{ backgroundColor: '#454745', justifyContent: 'center' }}>
                <Button color="inherit" component={Link} to="/">Customer Login</Button>
                <Button color="inherit" component={Link} to="/staff-login">Staff Login</Button>
                <Button color="inherit" component={Link} to="/admin-login">Admin Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
