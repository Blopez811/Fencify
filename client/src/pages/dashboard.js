import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../utils/queries.js';
import Navbar from '../components/Navbar';

const Dashboard = () => {
const { loading, error, data } = useQuery(GET_CURRENT_USER)

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.log(error);
    return <p>Error occurred</p>;
  }

  const appointments = data?.me?.appointments || [];

  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h2" align="center" sx={{ marginTop: 4 }}>
          Dashboard
        </Typography>
        <Box sx={{ marginTop: 4 }}>
          <Typography variant="h4" gutterBottom>
            Your Appointments
          </Typography>
          {appointments.length > 0 ? (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment._id}>
                  <Typography>{appointment.date}</Typography>
                  <Typography>{appointment.time}</Typography>
                  <Typography>{appointment.customerName}</Typography>
                  <Typography>{appointment.phoneNumber}</Typography>
                  <Typography>{appointment.email}</Typography>
                  <Typography>{appointment.propertyAddress}</Typography>
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body1">No appointments found.</Typography>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Dashboard;
