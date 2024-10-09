// src/services/auth.js
import axios from 'axios';

const API_URL = 'http://localhost:2001/api/auth'; // Base URL for authentication API

// Function to handle login
const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    // Save token (optional) for session management
    if (response.data.token) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

// Function to handle logout
const logout = () => {
  localStorage.removeItem('user'); // Clear session
};

// Function to get the current user
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage
};

export default {
  login,
  logout,
  getCurrentUser,
};
