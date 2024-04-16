// src/components/navbar/Navbar.tsx
import { Link } from "react-router-dom";
import "./Navbar.css"
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="noto-sans-bold">
      <li><Link to="/home">MTDS</Link></li>
      <li><Link to="/top-artists">Top Artists</Link></li>
        <li><Link to="/top-songs">Top Songs</Link></li>
        <li><Link to="/top-today-songs">Top Today</Link></li>
        <li><Link to="/today-played">Recently Played Today</Link></li>
        <li><Link to="/midnights">The Eras Play | TS</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
