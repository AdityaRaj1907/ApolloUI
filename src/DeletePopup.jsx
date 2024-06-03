import React, { useState } from 'react';
import './DeletePopup.css';
import axios from 'axios'; // Import axios for making HTTP requests
import apollo from '../config/config';

function DeletePopup({ trigger, setTrigger, userIdToDelete ,username, handleDelete, }) {
  const handleConfirmDelete = async () => {
    // Call the delete API
    try {
      // Make an HTTP DELETE request to your delete endpoint
      await axios.delete(`${apollo.baseUrl}/users/${userIdToDelete}`); // Update the URL with your actual delete endpoint

      // Call the handleDelete function passed from the LandingPage component
      handleDelete();

      // Close the delete popup
      setTrigger(false);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => setTrigger(false)}>
          X
        </button>
        <div className="delete-message">Are you sure you want to delete<br /> <strong>"{username}"</strong> ?</div>
        <div className="button-container">
          <button className="button addUser is-dark" onClick={handleConfirmDelete}>Yes</button>
          <button className="button addUser is-dark" onClick={() => setTrigger(false)}>No</button>
        </div>
      </div>
    </div>
  ) : null;
}

export default DeletePopup;


