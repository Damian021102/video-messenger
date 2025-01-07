import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './Registration';
import Login from './Login';
import Chat from './Chat';
import VideoChat from './VideoChat';
import { Box } from '@mui/material';
import './App.css';

function App() {
  return (
    <Router>
      <Box>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/videochat" element={<VideoChat />} /> {/* Add a route for VideoChat */}
          <Route path="/" element={<Login />} /> {/* Default to Login */}
        </Routes>
      </Box>
    </Router>
  );
}

export default App;