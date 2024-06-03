import React, { useState } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests
import './Popup.css';
import apollo from '../config/config';

function Popup({ trigger, setTrigger }) {
  const [scannerDescription, setScannerDescription] = useState('');
  const [scannerID, setScannerID] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make POST request to your backend API endpoint
      const response = await axios.post(`${apollo.baseUrl}/scanner_list`, {
        scanner_description: scannerDescription,
        scanner_id: scannerID
      });

      // Handle the response from the backend API accordingly
      console.log('Scanner added:', response.data);

      // Reset the form fields after successful submission
      setScannerDescription('');
      setScannerID('');
      setErrorMessage('');
      
      // Close the popup after successful submission
      setTrigger(false);
    } catch (error) {
      console.error('Error adding scanner:', error);
      // Handle any errors from the backend API
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Unknown error occurred.');
      }
    }
  };

  const handleResetClick = () => {
    // Clear the data filled in series description and scanner ID fields
    setScannerDescription('');
    setScannerID('');
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
            <label htmlFor="seriesDescription" className='scanner-box username-spacing'>Scanner Description:</label>
            <input className='textbox'
              type="text"
              id="seriesDescription"
              name="seriesDescription"
              value={scannerDescription}
              onChange={(e) => setScannerDescription(e.target.value)}
              required
            />
            <br />
            <label htmlFor="scannerID" className='scannerid-box pwd-spacing'>Station Name:</label>
            <input className='textbox'
              type="text"
              id="scannerID"
              name="scannerID"
              value={scannerID}
              onChange={(e) => setScannerID(e.target.value)}
              required
            />
            <br />
            <div className='add-user-button'> 
              <button type="submit" className="addUser button is-dark">Add Scanner</button>
              <button type="button" className="addUser button is-dark" onClick={handleResetClick}>Clear Fields</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default Popup;
