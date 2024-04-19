// src/components/navbar/Navbar.tsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import "./Navbar.css";
import appLogoWhite from '../../assets/img/play-title.svg';
import hamburgerIcon from '../../assets/img/hamburger.svg'; // Ensure you have an icon

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null); // Ref for the navbar

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Event listener to close the menu when clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Clean up the listener when the component unmounts
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navbarRef]);

  return (
    <div ref={navbarRef}> {/* Attach the ref to the navbar container */}
      <nav>
        <Link to="/home" className="logo">
          <img src={appLogoWhite} alt="MTDS Logo" />
          MTDS
        </Link>
        <button className="hamburger" onClick={toggleMenu}>
          <img src={hamburgerIcon} alt="Menu" />
          
        </button>
        <ul className={`menu ${isMenuOpen ? 'open' : ''}`}>
          <li><Link to="/midnights">The Eras Play | TS</Link></li>
          <li><Link to="/top-artists">Top Artists</Link></li>
          <li><Link to="/top-songs">Top Songs</Link></li>
          <li><Link to="/top-today-songs">Top Today</Link></li>
          <li><Link to="/today-played">Recently Played Today</Link></li>
    
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
