// src/components/navbar/Navbar.tsx
import "./Navbar.css"
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="noto-sans-semi-bold">
        <li><a href="#home">My Top Data Spotify</a></li>
        <li><a href="#songs">Songs</a></li>
        <li><a href="#artists">Artists</a></li>
        <li><a href="#albums">Albums</a></li>
        <li><a href="#top-songs">Top Songs</a></li>
        <li><a href="#top-albums">Top Albums</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
