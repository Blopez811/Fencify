import React from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

const Navbar = () => {
  const token = Cookies.get('token'); 
  // TODO make the login choice conditionally render only if user is not logged in. Else it should say Logout. 
  // TODO The logout link should destroy the session/token
  return (
    <nav>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        {!token && (
           <li>
           <Link href="/login">Login</Link>
         </li>
        )}
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
