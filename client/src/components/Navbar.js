import React from 'react';
import Link from 'next/link';

const Navbar = () => {
  const token = typeof window !== 'undefined' && localStorage.getItem('token');

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        {token && (
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
