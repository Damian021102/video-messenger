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
import ChatIcon from '@mui/icons-material/Chat'; // Add this line
import CloseIcon from '@mui/icons-material/Close'; // Add this line
import io from 'socket.io-client';
import { auth, signOut } from './firebase';
import { useNavigate } from 'react-router-dom';
import VideoChat from './VideoChat';
import CameraTest from './CameraTest';
import AddFriend from './AddFriend';

const socket = io('http://localhost:5000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([
    { name: 'Friend1', nickname: 'Friend1' },
    { name: 'Friend2', nickname: 'Friend2' },
    { name: 'Friend3', nickname: 'Friend3' }
  ]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isVideoChatOpen, setIsVideoChatOpen] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isCameraTestOpen, setIsCameraTestOpen] = useState(false);
  const [menuFriend, setMenuFriend] = useState(null); // Add this line
  const [currentChat, setCurrentChat] = useState('General Chat'); // Add this line
  const [privateChatFriend, setPrivateChatFriend] = useState(null); // Add this line
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
  const handleMenuOpen = (event, friend) => {
    setAnchorEl(event.currentTarget);
    setMenuFriend(friend); // Add this line
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuFriend(null); // Add this line
  };

  // Handle friend actions
  const handleAddFriend = () => {
    alert('Add friend functionality');
    handleMenuClose();
  };

  const handleKickFriend = () => {
    if (menuFriend) {
      alert(`Kick friend: ${menuFriend.name}`);
    }
    handleMenuClose();
  };

  const handleBlockFriend = () => {
    if (menuFriend) {
      alert(`Block friend: ${menuFriend.name}`);
    }
    handleMenuClose();
  };

  const handleChangeNickname = () => {
    if (menuFriend) {
      const newNickname = prompt(`Enter new nickname for ${menuFriend.name}`);
      if (newNickname) {
        setFriends((prevFriends) =>
          prevFriends.map((f) =>
            f.name === menuFriend.name ? { ...f, nickname: newNickname } : f
          )
        );
      }
    }
    handleMenuClose();
  };

  // Handle opening private chat
  const handleOpenPrivateChat = (friend) => {
    setPrivateChatFriend(friend);
    setCurrentChat(friend.name);
  };

  // Handle closing private chat
  const handleClosePrivateChat = () => {
    setPrivateChatFriend(null);
    setCurrentChat('General Chat');
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
      socket.emit('message', { text: inputValue, chat: currentChat });
      setInputValue('');
    }
  };

  // Filter messages based on the current chat
  const filteredMessages = messages.filter(msg => msg.chat === currentChat);

  return (
    <Box display="flex" height="100vh" bgcolor="#001f3f">
      {/* Friends Section (Left Side) */}
      <Box width="25%" bgcolor="#00284d" borderRight="1px solid" borderColor="#003366">
        <Box p={2}>
          <Typography variant="h6" fontWeight="bold" color="#39ff14">
            Friends
          </Typography>
          <AddFriend onAddFriend={handleAddFriend} />
          <List>
            {friends.map((friend, index) => (
              <ListItem
                key={index}
                sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <Box display="flex" alignItems="center">
                  <Avatar sx={{ bgcolor: '#39ff14', mr: 2 }}>{friend.nickname[0]}</Avatar>
                  <Typography color="#39ff14">{friend.nickname}</Typography>
                </Box>
                <Box>
                  {/* Chat Button */}
                  <IconButton
                    onClick={() => handleOpenPrivateChat(friend)}
                    sx={{ color: '#39ff14' }}
                  >
                    <ChatIcon />
                  </IconButton>
                  {/* Video Call Button */}
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent triggering the chat change
                      setSelectedFriend(friend);
                      setIsVideoChatOpen(true);
                    }}
                    sx={{ color: '#39ff14' }}
                  >
                    <VideocamIcon />
                  </IconButton>
                  {/* Friend Actions Menu */}
                  <IconButton onClick={(event) => handleMenuOpen(event, friend)}>
                    <MoreVertIcon sx={{ color: '#39ff14' }} />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={handleKickFriend}>Kick Friend</MenuItem>
                    <MenuItem onClick={handleBlockFriend}>Block Friend</MenuItem>
                    <MenuItem onClick={handleChangeNickname}>Change Nickname</MenuItem>
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
            {currentChat}
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
            {privateChatFriend && (
              <Tooltip title="Close Private Chat">
                <IconButton
                  onClick={handleClosePrivateChat}
                  sx={{
                    color: '#39ff14',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>

        {/* Messages */}
        <Box flex={1} p={2} overflow="auto" sx={{ bgcolor: '#001f3f' }}>
          {filteredMessages.map((msg, index) => (
            <Box key={index} mb={2} display="flex" flexDirection="column" alignItems={msg.sender === user.email ? 'flex-end' : 'flex-start'}>
              <Typography variant="caption" color="#39ff14">
                {msg.sender} - {msg.time}
              </Typography>
              <Paper elevation={1} sx={{ p: 1.5, display: 'inline-block', maxWidth: '70%', bgcolor: msg.sender === user.email ? '#004d40' : '#003366' }}>
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

      {/* Camera Test Dialog */}
      <CameraTest
        open={isCameraTestOpen}
        onClose={() => setIsCameraTestOpen(false)}
      />
    </Box>
  );
};

export default Chat;