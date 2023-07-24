import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';
import Navbar from "../components/Navbar"
import { useMutation } from '@apollo/client'
import { LOGIN } from '../utils/mutations'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { data, loading, error }] = useMutation(LOGIN);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const input = { email, password };

    try {
      const response = await login({ variables: { input } });
      const { token } = response.data.login;
       
      Cookies.set('token', token);
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to login user', error);
      alert("Invalid credentials please try again!")
    }
  };

  return (
    <>
    <Navbar/>
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', marginTop: 3 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="email"
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
            Login
          </Button>
        </Box>
      </Box>
    </Container>
    </>
  );
};

export default Login;
