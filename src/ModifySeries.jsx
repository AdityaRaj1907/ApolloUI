import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Popup.css';
import apollo from '../config/config';

function ModifyPopup({ trigger, setTrigger, seriesDescription, sequenceType, handleModify }) {
  const [newSeriesDescription, setNewSeriesDescription] = useState('');
  const [newSequenceType, setNewSequenceType] = useState('');
  const [sequenceTypes, setSequenceTypes] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch sequence types when the component mounts
    const fetchSequenceTypes = async () => {
      try {
        // Make GET request to fetch sequence types
        const response = await axios.get('http://65.0.44.123:5003/series_description');
        const sequenceTypesFromAPI = response.data.map(series => series.sequence_type);
        const uniqueSequenceTypes = [...new Set(sequenceTypesFromAPI)];
        setSequenceTypes(uniqueSequenceTypes);
      } catch (error) {
        console.error('Error fetching sequence types:', error);
      }
    };

    fetchSequenceTypes();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a PUT request to update the series details
      const response = await axios.put(`${apollo.baseUrl}/series_description`, {
        series_description: seriesDescription,
        sequence_type: sequenceType,
        new_series_description: newSeriesDescription,
        new_sequence_type: newSequenceType
      });

      // Handle the response accordingly
      console.log('Series details updated:', response.data);

      // Call the handleModify function passed from the parent component
      handleModify();

      // Close the modify popup
      setTrigger(false);
    } catch (error) {
      console.error('Error updating series details:', error);
      // Handle any errors from the backend API
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage('Error updating series details');
      }
    }
  };

  const handleResetClick = () => {
    // Clear the form fields
    setNewSeriesDescription('');
    setNewSequenceType('');
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
            <label htmlFor="seriesDescription" className='newseries-box username-spacing'>New Series Description:</label>
            <input className='modify-textbox'
              type="text"
              id="seriesDescription"
              name='seriesDescription'
              value={newSeriesDescription}
              placeholder='series description'
              onChange={(e) => setNewSeriesDescription(e.target.value)}
              required
            />
            <br />
            <label htmlFor="sequenceType" className='sequence-box pwd-spacing'>New Sequence Type:</label>
            <select className='modifytextbox-dropdown'
              id="sequenceType"
              name='sequencetype'
              value={newSequenceType}
              onChange={(e) => setNewSequenceType(e.target.value)}
              required
            >
              <option value="">Select New Sequence Type</option>
              {sequenceTypes.map((type, index) => (
                <option key={index} value={type}>{type}</option>
              ))}
            </select>
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

export default ModifyPopup;
