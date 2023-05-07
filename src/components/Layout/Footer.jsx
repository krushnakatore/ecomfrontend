import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <div
      className="footer "
      style={{
        overflow: 'hidden',
        backgroundColor: 'black',
        position: 'relative',
        bottom: 0,
        left: 0,
        width: '100%',
      }}
    >
      <h3 className="text-center">All Right Reserved &copy; krushnakatore</h3>
      <p className="text-center">
        <Link style={{ textDecoration: 'none', color: 'grey' }} to="/about">
          About
        </Link>
        |
        <Link style={{ textDecoration: 'none', color: 'grey' }} to="/contact">
          Contact
        </Link>
        |
        <Link style={{ textDecoration: 'none', color: 'grey' }} to="/policy">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
};
