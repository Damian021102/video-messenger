import React, { useState } from 'react';
import { auth, googleProvider, signInWithPopup, createUserWithEmailAndPassword } from './firebase';
import { Button, Box, Typography, TextField, Link, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import backgroundImage from './img/background.jpg'; // Correct the path to the background image

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
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      sx={{
        backgroundImage: `url(${backgroundImage})`, // Add background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper elevation={3} sx={{ p: 4, bgcolor: 'rgba(128, 128, 128, 0.7)', borderRadius: 2 }}> {/* Change Paper color */}
        <Typography variant="h4" color="#C71585" gutterBottom> {/* Change text color to dark pink */}
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
            sx={{
              mb: 2,
              bgcolor: '#000080', // Change color to navy blue
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#C71585', // Change border color to dark pink
                },
                '&:hover fieldset': {
                  borderColor: '#C71585', // Change border color to dark pink
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#C71585', // Change border color to dark pink
                },
              },
              '& .MuiInputBase-input': {
                color: '#FFFFFF', // Change input text color to white
              },
              '& .MuiInputLabel-root': {
                color: '#C71585', // Change label color to dark pink
              },
            }}
            required
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{
              mb: 2,
              bgcolor: '#000080', // Change color to navy blue
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#C71585', // Change border color to dark pink
                },
                '&:hover fieldset': {
                  borderColor: '#C71585', // Change border color to dark pink
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#C71585', // Change border color to dark pink
                },
              },
              '& .MuiInputBase-input': {
                color: '#FFFFFF', // Change input text color to white
              },
              '& .MuiInputLabel-root': {
                color: '#C71585', // Change label color to dark pink
              },
            }}
            required
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: '#ADD8E6', // Change button color to light blue
              color: '#000000',
              '&:hover': {
                bgcolor: '#ADD8E6',
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
            bgcolor: '#ADD8E6', // Change button color to light blue
            color: '#000000',
            '&:hover': {
              bgcolor: '#ADD8E6',
              opacity: 0.8,
            },
          }}
          onClick={handleGoogleSignUp}
        >
          Sign Up with Google
        </Button>

        {/* Link to Login Page */}
        <Typography variant="body2" color="#C71585" sx={{ mt: 2 }}> {/* Change text color to dark pink */}
          Already have an account?{' '}
          <Link href="/login" color="#C71585" underline="hover"> {/* Change link color to dark pink */}
            Login here
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

export default Registration;