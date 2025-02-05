import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const AddFriend = ({ onAddFriend }) => {
  const [friendName, setFriendName] = useState('');

  const handleAdd = () => {
    if (friendName.trim()) {
      onAddFriend(friendName);
      setFriendName('');
    }
  };

  return (
    <Box display="flex" alignItems="center" mb={2}>
      <TextField
        variant="outlined"
        placeholder="Add Friend"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
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
        onClick={handleAdd}
        sx={{
          ml: 2,
          bgcolor: '#39ff14',
          color: '#001f3f',
          '&:hover': {
            bgcolor: '#39ff14',
            opacity: 0.8,
          },
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddFriend;