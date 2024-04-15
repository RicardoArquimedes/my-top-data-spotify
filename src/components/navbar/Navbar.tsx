// src/components/navbar/Navbar.tsx
import { Link } from "react-router-dom";
import "./Navbar.css"
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="noto-sans-bold">
      <li><Link to="/home">My Top Data Spotify</Link></li>
        <li><Link to="/top-songs">Top Songs</Link></li>
        <li><Link to="/played">Top Today</Link></li>
        <li><Link to="/today-played">Played Today</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
