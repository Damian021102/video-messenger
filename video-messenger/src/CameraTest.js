import React, { useRef, useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Box, Button } from '@mui/material';
import { Videocam, Close } from '@mui/icons-material';

const CameraTest = () => {
  const [open, setOpen] = useState(false); // State to control the dialog
  const localVideoRef = useRef(null); // Reference for the local video stream

  // Open the dialog and start the camera
  const handleOpen = () => {
    setOpen(true);
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream; // Set the local video stream
        }
      })
      .catch((error) => {
        console.error('Error accessing media devices:', error);
      });
  };

  // Close the dialog and stop the camera
  const handleClose = () => {
    setOpen(false);
    if (localVideoRef.current && localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop()); // Stop all tracks
    }
  };

  return (
    <>
      {/* Button to open the camera test dialog */}
      <Button
        variant="contained"
        startIcon={<Videocam />}
        onClick={handleOpen}
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

      {/* Camera test dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>
          Camera Test
          <IconButton onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" justifyContent="center">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              style={{
                width: '100%',
                maxWidth: '500px',
                height: 'auto',
                border: '2px solid #39ff14',
                borderRadius: '8px',
              }}
            />
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CameraTest;