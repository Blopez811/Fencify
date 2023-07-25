import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useAuth } from './AuthProvider'

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  useEffect(() => {
    const token = Cookies.get('token')
    setIsAuthenticated(!!token)
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
            <Link href="/dashboard">Dashboard</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
