import React, { useState } from 'react';
import axios from 'axios';
import './Popup.css';
import apollo from '../config/config';

function ModifyScanner({ trigger, setTrigger, scannerId, scannerDescription, handleModify }) {
  const [newScannerDescription, setNewScannerDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a PUT request to update the scanner details
      const response = await axios.put(`${apollo.baseUrl}/scanner_list`, {
        scanner_id: scannerId,
        scanner_description: newScannerDescription
      });

      // Handle the response accordingly
      console.log('Scanner details updated:', response.data);

      // Call the handleModify function passed from the parent component
      handleModify();

      // Close the modify popup
      setTrigger(false);
    } catch (error) {
      console.error('Error updating scanner details:', error);
      // Handle any errors from the backend API
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Error updating scanner details');
      }
    }
  };

  const handleResetClick = () => {
    // Clear the form fields
    setNewScannerDescription('');
    setErrorMessage('');
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
            <label htmlFor="newScannerDescription" className='newscanner-box newscanner-spacing'>New Scanner Description:</label>
            <input className='textbox'
              type="text"
              id="newScannerDescription"
              value={newScannerDescription}
              placeholder='new scanner description'
              onChange={(e) => setNewScannerDescription(e.target.value)}
              required
            />
            <br />
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

export default ModifyScanner;
