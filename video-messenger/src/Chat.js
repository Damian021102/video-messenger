import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  TextField,
  Button,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VideocamIcon from '@mui/icons-material/Videocam';
import Videocam from '@mui/icons-material/Videocam';
import io from 'socket.io-client';
import { auth, signOut } from './firebase';
import { useNavigate } from 'react-router-dom';
import VideoChat from './VideoChat';
import CameraTest from './CameraTest';


const socket = io('http://localhost:5000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState(['Friend1', 'Friend2', 'Friend3']);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isVideoChatOpen, setIsVideoChatOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isCameraTestOpen, setIsCameraTestOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch the logged-in user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Handle logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Handle friend actions menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle friend actions
  const handleAddFriend = () => {
    alert('Add friend functionality');
    handleMenuClose();
  };

  const handleKickFriend = () => {
    alert('Kick friend functionality');
    handleMenuClose();
  };

  const handleBlockFriend = () => {
    alert('Block friend functionality');
    handleMenuClose();
  };

  // Listen for incoming messages
  useEffect(() => {
    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  // Send message
  const sendMessage = () => {
    if (inputValue.trim()) {
      socket.emit('message', inputValue);
      setInputValue('');
    }
  };

  return (
    <Box display="flex" height="100vh" bgcolor="#001f3f">
      {/* Friends Section (Left Side) */}
      <Box width="25%" bgcolor="#00284d" borderRight="1px solid" borderColor="#003366">
        <Box p={2}>
          <Typography variant="h6" fontWeight="bold" color="#39ff14">
            Friends
          </Typography>
          <List>
            {friends.map((friend, index) => (
              <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ bgcolor: '#39ff14', mr: 2 }}>{friend[0]}</Avatar>
                  <Typography color="#39ff14">{friend}</Typography>
                </Box>
                <Box>
                  {/* Video Call Button */}
                  <IconButton
                    onClick={() => {
                      setSelectedFriend(friend);
                      setIsVideoChatOpen(true);
                    }}
                    sx={{ color: '#39ff14' }}
                  >
                    <VideocamIcon />
                  </IconButton>
                  {/* Friend Actions Menu */}
                  <IconButton onClick={handleMenuOpen}>
                    <MoreVertIcon sx={{ color: '#39ff14' }} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleAddFriend}>Add Friend</MenuItem>
                    <MenuItem onClick={handleKickFriend}>Kick Friend</MenuItem>
                    <MenuItem onClick={handleBlockFriend}>Block Friend</MenuItem>
                  </Menu>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>

      {/* Main Chat Area (Right Side) */}
      <Box flex={1} display="flex" flexDirection="column">
        {/* Chat Header */}
        <Box p={2} bgcolor="#00284d" borderBottom="1px solid" borderColor="#003366" display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" fontWeight="bold" color="#39ff14">
            General Chat
          </Typography>
          <Box display="flex" alignItems="center">
            {user && (
              <Avatar sx={{ bgcolor: '#39ff14', mr: 1 }}>
                {user.email ? user.email[0].toUpperCase() : 'U'}
              </Avatar>
            )}
            <Tooltip title="Logout">
              <IconButton
                onClick={handleLogout}
                sx={{
                  color: '#39ff14',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Messages */}
        <Box flex={1} p={2} overflow="auto">
          {messages.map((msg, index) => (
            <Box key={index} mb={2}>
              <Typography variant="caption" color="#39ff14">
                {msg.sender} - {msg.time}
              </Typography>
              <Paper elevation={1} sx={{ p: 1.5, display: 'inline-block', maxWidth: '70%', bgcolor: '#003366' }}>
                <Typography color="#39ff14">{msg.text}</Typography>
              </Paper>
            </Box>
          ))}
        </Box>

        {/* Input Area */}
        <Box p={2} bgcolor="#00284d" borderTop="1px solid" borderColor="#003366">
          <Box display="flex">
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              sx={{
                bgcolor: '#003366',
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#39ff14',
                  },
                  '&:hover fieldset': {
                    borderColor: '#39ff14',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#39ff14',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#39ff14',
                },
                '& .MuiInputLabel-root': {
                  color: '#39ff14',
                },
              }}
            />
            <Button
              variant="contained"
              sx={{
                ml: 2,
                bgcolor: '#39ff14',
                color: '#001f3f',
                '&:hover': {
                  bgcolor: '#39ff14',
                  opacity: 0.8,
                },
              }}
              onClick={sendMessage}
              endIcon={<SendIcon sx={{ color: '#001f3f' }} />}
            >
              Send
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Video Chat Dialog */}
      <VideoChat
        open={isVideoChatOpen}
        onClose={() => setIsVideoChatOpen(false)}
        friend={selectedFriend}
      />

      {/* Camera Test Button and Dialog */}
      <Button
        variant="contained"
        startIcon={<Videocam />}
        onClick={() => setIsCameraTestOpen(true)}
        sx={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 1000,
          bgcolor: '#39ff14',
          color: '#001f3f',
          '&:hover': {
            bgcolor: '#39ff14',
            opacity: 0.8,
          },
        }}
      >
        Start Camera Test
      </Button>
      <CameraTest
        open={isCameraTestOpen}
        onClose={() => setIsCameraTestOpen(false)}
      />
    </Box>
  );
};

export default Chat;