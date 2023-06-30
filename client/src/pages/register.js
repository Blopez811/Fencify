import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../utils/mutations.js';
import Navbar from '../components/Navbar';
import { useRouter } from 'next/router';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const input = {
      username,
      email,
      password,
    };

    try {
      const response = await registerUser({ variables: { input } });
      const { token, user } = response.data.signup;
       
       localStorage.setItem('token', token);
       router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <Container maxWidth="xs">
        <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', marginTop: 3 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 3, marginBottom: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Register;
