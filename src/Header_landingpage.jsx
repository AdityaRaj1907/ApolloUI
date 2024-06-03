import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apollo from '../config/config';
import { Link, useLocation } from 'react-router-dom'; // Import Link component for navigation
import './Header_landingpage.css';
import 'bulma/css/bulma.css';

function Header_Landingpage() {
  const [isActive, setIsActive] = useState(false);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    // Update current date and time every second
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId); // Clean up interval
    };
  }, []); // Empty dependency array ensures effect runs only once


  const formatDate = (date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  const handleLogout = async () => {
    try {
      // Call the logout endpoint
      await axios.get(`${apollo.baseUrl}/logout`);  // Assuming your backend is running on the same host
      // Redirect to the login page after successful logout
      history.push('/'); // Redirect to the login page
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout error if needed
    }
  };

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };


  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/landing" className="navbar-item">
          Apollo Admin
        </Link>
        <button className={`navbar-burger burger ${isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navMenu" onClick={toggleDropdown}>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
        <div className="navbar-start">
          <Link to="/landing">
            <a className="button is-dark">User Administration</a>
          </Link>
          <div className="navbar-item has-dropdown is-hoverable">
            <div className='button Scanner is-dark'>
            <a className="navbar-link">
            Scanner Administration
            </a>
            <div className="navbar-dropdown">
              <Link to="/series-description" className="navbar-item">
                Series Description
              </Link>
              <Link to="/scanner-list" className="navbar-item">
                Scanner List
              </Link>
            </div>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <span className="user">Date: {formatDate(currentDateTime)} {formatTime(currentDateTime)}</span>
            <span className="user">User: cerebriu1</span>
            <div className="buttons">
            <button className="button is-dark" onClick={handleLogout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header_Landingpage;
