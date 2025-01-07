import React, { useRef, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box } from '@mui/material'; // Add Box here
import { Videocam, Close } from '@mui/icons-material';
import io from 'socket.io-client'; // Add this line


const socket = io('http://localhost:3000'); // Add this line


const VideoChat = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    // Access the user's camera
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
    // Stop the camera stream
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <>
      <IconButton color="primary" onClick={handleOpen}>
        <Videocam />
      </IconButton>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Video Chat
          <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="space-around">
            <video ref={localVideoRef} autoPlay muted width="300" height="225"></video>
            <video ref={remoteVideoRef} autoPlay width="300" height="225"></video>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VideoChat;
