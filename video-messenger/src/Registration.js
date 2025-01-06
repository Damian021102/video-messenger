import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword } from './firebase';
import { Button, Box, Typography, TextField, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      alert('Registration successful!');
      navigate('/chat');
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.message);
    }
  };

  const handleNormalSignUp = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registration successful!');
      navigate('/chat');
    } catch (error) {
      console.error('Error during registration:', error);
      setError(error.message); // Display error message
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="#001f3f">
      <Typography variant="h4" color="#39ff14" gutterBottom>
        Register
      </Typography>

      {/* Display error message */}
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      {/* Normal Registration Form */}
      <Box component="form" onSubmit={handleNormalSignUp} display="flex" flexDirection="column" width="300px">
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
          Register
        </Button>
      </Box>

      {/* Google Sign-Up Button */}
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
        onClick={handleGoogleSignUp}
      >
        Sign Up with Google
      </Button>

      {/* Link to Login Page */}
      <Typography variant="body2" color="#39ff14" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Link href="/login" color="#39ff14" underline="hover">
          Login here
        </Link>
      </Typography>
    </Box>
  );
};

export default Registration;