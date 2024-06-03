import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Popup.css';
import apollo from '../config/config';

function Popup({ trigger, setTrigger }) {
  const [seriesDescription, setSeriesDescription] = useState('');
  const [sequenceTypes, setSequenceTypes] = useState([]);
  const [selectedSequenceType, setSelectedSequenceType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
      // Fetch your data and update sequence types
      const fetchSequenceTypes = async () => {
        try {
          // Fetch data
          const response = await axios.get('http://65.0.44.123:5003/series_description'); // Adjust the API endpoint
          const sequenceTypesFromAPI = response.data.map(series => series.sequence_type); // Adjust based on your API response structure
          
          // Extract unique sequence types
          const uniqueTypes = [...new Set(sequenceTypesFromAPI)];
          console.log("Sequence Types:", uniqueTypes);
          setSequenceTypes(uniqueTypes);
        } catch (error) {
          console.error('Error fetching sequence types:', error);
        }
      };
  
      fetchSequenceTypes();
    }, []); 

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make POST request to your backend API endpoint to add series description
      const response = await axios.post(`${apollo.baseUrl}/series_description`, {
        series_description: seriesDescription,
        sequence_type: selectedSequenceType
      });

      // Handle the response from the backend API accordingly
      console.log('Series Description added:', response.data);

      // Reset the form fields after successful submission
      setSeriesDescription('');
      setSelectedSequenceType('');
      setErrorMessage('');
      
      // Close the popup after successful submission
      setTrigger(false);
    } catch (error) {
      console.error('Error adding series description:', error);
      // Handle any errors from the backend API
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Failed to add series description!');
      }
    }
  };

  const handleResetClick = () => {
    // Clear the data filled in series description and sequence type fields
    setSeriesDescription('');
    setSelectedSequenceType('');
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
            <label htmlFor="seriesDescription" className='series-box username-spacing'>Series Description*:</label>
            
            <input className='textbox'
              type="text"
              id="seriesDescription"
              name="seriesDescription"
              value={seriesDescription}
              onChange={(e) => setSeriesDescription(e.target.value)}
              required
            />
            <br />
            <label htmlFor="sequenceType" className='sequence-box pwd-spacing'>Sequence Type:</label>
            <select className='textbox-dropdown'
              id="sequenceType"
              name="sequenceType"
              value={selectedSequenceType}
              onChange={(e) => setSelectedSequenceType(e.target.value)}
              required
            >
              <option value="">Select Sequence Type</option>
              {sequenceTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
            
            <br />
            <span className="series-description-note">*Please ensure that this matches hospital settings for DICOM tag (0008,103E)</span>
            <div className='add-user-button'> 
              <button type="submit" className=" addUser button is-dark">Add Series Description</button>
              <button type="button" className="addUser button is-dark" onClick={handleResetClick}>Clear Fields</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : null;
}

export default Popup;
