import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { auth, db } from './firebase'; // Import auth and db
import { collection, query, where, getDocs, updateDoc, arrayUnion, doc } from 'firebase/firestore';

const AddFriend = () => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);

  // Search for users by email or display name
  const handleSearch = async () => {
    const q1 = query(collection(db, 'users'), where('email', '==', search));
    const q2 = query(collection(db, 'users'), where('displayName', '==', search));
    const querySnapshot1 = await getDocs(q1);
    const querySnapshot2 = await getDocs(q2);
    const results = [];
    querySnapshot1.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() });
    });
    querySnapshot2.forEach((doc) => {
      if (!results.some((user) => user.id === doc.id)) {
        results.push({ id: doc.id, ...doc.data() });
      }
    });
    setUsers(results);
  };

  // Add a friend
  const handleAddFriend = async (friendId) => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      friendsList: arrayUnion(friendId),
    });
    alert('Friend added!');
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh" bgcolor="#001f3f">
      <Typography variant="h4" color="#39ff14" gutterBottom>
        Add Friend
      </Typography>
      <Box display="flex" flexDirection="column" width="300px">
        <TextField
          label="Search by email or name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{ mb: 2, bgcolor: '#003366', color: '#39ff14' }}
        />
        <Button
          variant="contained"
          sx={{
            bgcolor: '#39ff14',
            color: '#001f3f',
            '&:hover': {
              bgcolor: '#39ff14',
              opacity: 0.8,
            },
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box mt={2}>
        {users.map((user) => (
          <Box key={user.id} display="flex" alignItems="center" justifyContent="space-between" width="300px" mb={2}>
            <Typography color="#39ff14">{user.displayName} ({user.email})</Typography>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#39ff14',
                color: '#001f3f',
                '&:hover': {
                  bgcolor: '#39ff14',
                  opacity: 0.8,
                },
              }}
              onClick={() => handleAddFriend(user.id)}
            >
              Add
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default AddFriend;