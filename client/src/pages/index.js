import React from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Fencify</h1>
      <p>
        Please <Link href="/login">login</Link> or{' '}
        <Link href="/register">register</Link> to book an appointment.
      </p>
    </div>
  );
};

export default HomePage;
