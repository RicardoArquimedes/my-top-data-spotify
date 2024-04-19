// src/components/navbar/Navbar.tsx
import { Link } from "react-router-dom";
import "./Footer.css"
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <ul className="noto-sans-bold">
      <li><Link to="/home">MTDS</Link></li>
      <li><Link to="/top-artists">Contact</Link></li>
      </ul>
    </footer>
  );
};

export default Footer;
