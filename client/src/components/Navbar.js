import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useAuth } from './AuthProvider'

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const token = Cookies.get('token')
    console.log('here is token in useEffect: ', token)
    setIsAuthenticated(!!token)
    console.log('Dat juicy authentication status: ', isAuthenticated)
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {!isAuthenticated && (
          <li>
            <Link href="/login">Login</Link>
          </li>
        )}
        <li>
          <Link href="/register">Register</Link>
        </li>
        {isAuthenticated && (
          <li>
          <Link href="/logout">Logout</Link>
        </li>
        )}
        {isAuthenticated && (
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
