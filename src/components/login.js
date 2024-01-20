// src/components/Login.js

import React from 'react';
import { Container, Paper, Grid, TextField, Button, Typography } from '@mui/material';

import Fastenal from '../assets/Fastenal.png'


const Login = () => {
  return (
    <Container
      sx={{
        height: '100vh',
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'center',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
      maxWidth={false}
    >
      <Grid container spacing={0}>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            position: 'relative',
            background: 'linear-gradient(to bottom right, #001a33, #004080)',
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            height: '100%',
            overflow: 'hidden',
          }}
        >
          <img
            src={Fastenal} // Replace with the path to your image
            alt="Company Logo"
            style={{
              width: '100%', // Adjust the width as needed
              height: '10rem', // Maintain aspect ratio
              borderRadius: '8px', // Optional: Add border-radius for rounded corners
            }}
          />
          {/* Pseudo-element to create a curved overlay */}
          <div
            sx={{
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: '80%',
              background: 'linear-gradient(to bottom left, #001a33, #004080)',
              zIndex: 1,
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
            }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
          }}
        >
          <Paper elevation={3} sx={{ padding: '20px', width: '80%' }}>
            <Typography textAlign='center' variant="h4" fontWeight="bold" gutterBottom>
              Login
            </Typography>
            <form>
              <TextField label="Username" variant="outlined" fullWidth margin="normal" />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
