import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, signInWithEmailAndPassword } from './firebase';
import { Button, Box, Typography, TextField, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Login successful!');
      navigate('/chat');
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message);
    }
  };

  const handleNormalLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Login successful!');
      navigate('/chat');
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message);
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="#001f3f">
      <Typography variant="h4" color="#39ff14" gutterBottom>
        Login
      </Typography>

      {/* Display error message */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Normal Login Form */}
      <Box component="form" onSubmit={handleNormalLogin} display="flex" flexDirection="column" width="300px">
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2, bgcolor: '#003366', color: '#39ff14' }}
          required
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2, bgcolor: '#003366', color: '#39ff14' }}
          required
        />
        <Button
          type="submit"
          variant="contained"
          sx={{
            bgcolor: '#39ff14',
            color: '#001f3f',
            '&:hover': {
              bgcolor: '#39ff14',
              opacity: 0.8,
            },
          }}
        >
          Login
        </Button>
      </Box>

      {/* Google Login Button */}
      <Button
        variant="contained"
        sx={{
          mt: 2,
          bgcolor: '#39ff14',
          color: '#001f3f',
          '&:hover': {
            bgcolor: '#39ff14',
            opacity: 0.8,
          },
        }}
        onClick={handleGoogleLogin}
      >
        Login with Google
      </Button>

      {/* Link to Registration Page */}
      <Typography variant="body2" color="#39ff14" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link href="/register" color="#39ff14" underline="hover">
          Register here
        </Link>
      </Typography>
    </Box>
  );
};

export default Login;