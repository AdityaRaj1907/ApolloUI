import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './Popup.css';
import apollo from '../config/config';
function Popup({ trigger, setTrigger }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Reset the username and password fields when the popup is closed
    if (!trigger) {
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      setPasswordMatchError(false);
    }
  }, [trigger]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    try {
      // Make POST request to your backend API endpoint
      const response = await axios.post(`${apollo.baseUrl}/user`, {
        username,
        password
      });

      // Handle the response from the backend API accordingly
      console.log('User created:', response.data);

      // Reset the form fields after successful submission
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setPasswordMatchError(false);
      setErrorMessage('');
      
      // Close the popup after successful submission
      setTrigger(false);
    } catch (error) {
      console.error('Error creating user:', error);
      // Handle any errors from the backend API
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Username Already Exists!');
      }
    }
  };

  const handleResetClick = () => {
    // Clear the data filled in username, password, and confirm password fields
    setUsername('');
    setPassword('');
    setConfirmPassword('');
    setErrorMessage('');
    setPasswordMatchError(false);
  };

  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => setTrigger(false)}>
          X
        </button>
        
        <form onSubmit={handleFormSubmit}>
          <div className="login-form-popup">
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <label htmlFor="username" className='username-spacing' >Username:</label>
            <input className='textbox' 
              type="text"
              id="username"
              name="username"
              value={username}
              placeholder='username'
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <br />
            <label htmlFor="password" className='pwd-spacing'>Password:</label>
            <input className='textbox'
              type="password"
              id="password"
              name="password"
              placeholder='********'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <label htmlFor="confirmPassword" className='confirm-pwd-spacing'>Confirm Password:</label>
            <input className='textbox'
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder='********'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {passwordMatchError && <p className="error-message">Passwords do not match!</p>}
            <br />
            
          </div>
          <div className='add-user-button'> 
              <button type="submit" className="button addUser is-dark">Add User</button>
              <button type="button" className="button addUser is-dark" onClick={handleResetClick}>Clear Fields</button>
            </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default Popup;
