import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Popup.css';
import apollo from '../config/config';

function ModifyPopup({ trigger, setTrigger, userIdToModify, handleModify }) {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Reset the username and password fields when the popup is closed
    if (!trigger) {
      setNewUsername('');
      setNewPassword('');
      setConfirmPassword('');
      setErrorMessage('');
      setPasswordMatchError(false);
    }
  }, [trigger]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("User ID to modify:", userIdToModify);
    // Check if passwords match
    if (newPassword !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    try {
      // Make a PUT request to update the user details
      const response = await axios.put(`${apollo.baseUrl}/users/${userIdToModify}`, {
        username: newUsername,
        password: newPassword
      });

      // Handle the response accordingly
      console.log('User details updated:', response.data);

      // Call the handleModify function passed from the parent component
      handleModify();

      // Close the modify popup
      setTrigger(false);
    } catch (error) {
      console.error('Error updating user details:', error);
      // Handle any errors from the backend API
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Username Already Exists!');
      }
    }
  };

  const handleResetClick = () => {
    // Clear the form fields
    setNewUsername('');
    setNewPassword('');
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
            <label htmlFor="username" className='newuser username-spacing'>New Username:</label>
            <input className='textbox'
              type="text"
              id="username"
              name='username'
              value={newUsername}
              placeholder='username'
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
            <br />
            <label htmlFor="password" className='newpassword pwd-spacing'>New Password:</label>
            <input className='textbox'
              type="password"
              id="newPassword"
              placeholder='********'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <br />
            <label htmlFor="confirmPassword" className='newconfirmpass confirm-pwd-spacing'>Confirm Password:</label>
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
            
            {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
            <div className='add-user-button'> 
              <button type="submit" className="button addUser is-dark">Modify</button>
              <button type="button" className="button addUser is-dark" onClick={handleResetClick}>Clear Fields</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default ModifyPopup;
