import React from 'react';
import './DeletePopup.css';
import axios from 'axios'; // Import axios for making HTTP requests
import apollo from '../config/config';
// import DeletePopup from './DeletePopup';

function DeletePopup({ trigger, setTrigger, scannerId, handleDelete, scannerDescription }) {
  
  const handleConfirmDelete = async () => {
    // Prepare the request data
    const requestData = {
      scanner_id: scannerId
    };

    // Call the delete API
    try {
      // Make an HTTP DELETE request to the delete endpoint
      await axios.delete(`${apollo.baseUrl}/scanner_list`, {
          headers: {
              'Content-Type': 'application/json'
          },
          data: requestData
      });

      // Call the handleDelete function passed from the parent component
      handleDelete();

      // Close the delete popup
      setTrigger(false);
    } catch (error) {
      console.error('Error deleting scanner:', error);
    }
  };

  return trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={() => setTrigger(false)}>
          X
        </button>
        <div className="delete-message">Are you sure you want to delete <br /> <strong>"{scannerDescription}"</strong> ?</div>
        <div className="button-container">
          <button className="button addUser is-dark" onClick={handleConfirmDelete}>Yes</button>
          <button className="button addUser is-dark" onClick={() => setTrigger(false)}>No</button>
        </div>
      </div>
    </div>
  ) : null;
}

export default DeletePopup;
