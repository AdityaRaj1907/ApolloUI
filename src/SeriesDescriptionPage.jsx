import React, { useState, useEffect } from 'react';
// import './LandingPage.css';
import axios from 'axios';
import apollo from '../config/config';
import './SeriesDescriptionPage.css';
import Header_Landingpage from './Header_landingpage';
import Footer from './Footer';
import Popup from './SeriesPopup';
import DeletePopup from './DeleteSeries'; // Import the DeleteConfirmationPopup component
import 'bulma/css/bulma.css';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenToSquare, faChevronCircleUp, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import FetchData from './FetchSeries';
import ModifyPopup from './ModifySeries';

function LandingPage() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for showing delete confirmation popup
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSequenceType, setSelectedSequenceType] = useState('All'); // State for selected sequence type
  const [selectedSeries, setSelectedSeries] = useState(null); // State to store the selected series for deletion
  const [modifyPopupTrigger, setModifyPopupTrigger] = useState(false);
  const [selectedSeriesDescription, setSelectedSeriesDescription] = useState('');
  const [sequenceTypes, setSequenceTypes] = useState(['All']); // State to store sequence types

    // Assuming FetchData fetches data that includes sequence types
  useEffect(() => {
      // Fetch your data and update sequence types
      const fetchSequenceTypes = async () => {
        try {
          // Fetch data
          const response = await axios.get(`${apollo.baseUrl}/series_description`); 
          const sequenceTypesFromAPI = response.data.map(series => series.sequence_type); // Adjust based on your API response structure
          
          // Extract unique sequence types
          const uniqueTypes = ['All', ...new Set(sequenceTypesFromAPI)];
          console.log("Sequence Types:", uniqueTypes);
          setSequenceTypes(uniqueTypes);

          setRecordCount(response.data.length);
        } catch (error) {
          console.error('Error fetching sequence types:', error);
        }
      };
  
      fetchSequenceTypes();
    }, []); 
  const handleTrashClick = (series) => {
    // Set the selected series for deletion
    setSelectedSeries(series);
    // Show the delete confirmation popup
    setShowDeleteConfirmation(true);
  };
  const handlePenClick = (seriesDescription, sequenceType) => {
    setSelectedSeriesDescription(seriesDescription);
    setSelectedSequenceType(sequenceType);
    setModifyPopupTrigger(true);
  };


  
  const handleModify = () => {
    // Perform any actions needed after modification (e.g., refetch data)
    console.log('Series details modified');
    // You can add any additional actions here
  };

  const handleAddUserClick = () => {
    setShowAddUserPopup(true);
  };

  const handleAddUserPopupClose = () => {
    setShowAddUserPopup(false);
  };

  const handleDeleteConfirmation = () => {
    // Functionality to delete the item goes here
    // setSelectedSequenceType(sequenceType);
    // setSelectedSeriesDescription(seriesDescription);

    console.log("Item deleted");
    setShowDeleteConfirmation(false); // Close the delete confirmation popup after deletion
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false); // Close the delete confirmation popup
  };

  // Define the handleSearchQueryChange function
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };
  // Define handleSequenceTypeChange function to handle dropdown selection change
  const handleSequenceTypeChange = (event) => {
    setSelectedSequenceType(event.target.value);
  };

  const [recordCount, setRecordCount] = useState(0);
  // Define the ExpandableTable component here
  const ExpandableTable = ({ recordCount }) => {
    const [expanded, setExpanded] = useState(true);

    const handleToggleClick = () => {
      setExpanded(!expanded);
    };

    return (
      <div>
      <section className='section study-list'>
        <div className='expandable-button'>
          <button className='expand-button' onClick={handleToggleClick}>
            {expanded ? (
              <React.Fragment>
                <FontAwesomeIcon icon={faChevronCircleUp} />
                <span> Series List</span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <FontAwesomeIcon icon={faChevronCircleDown} />
                <span> Series List</span>
              </React.Fragment>
            )}
          </button>
        </div>
        {expanded 
        && (
          <table className='table is-fullwidth'>
            <tbody>
              {/* Render the FetchSeries component */}
              <FetchData
                handleTrashClick={handleTrashClick}
                searchQuery={searchQuery}
                sequenceType={selectedSequenceType}
                onSearchQueryChange={handleSearchQueryChange}
                handlePenClick={handlePenClick}
                modifyPopupTrigger={modifyPopupTrigger}
              />
            </tbody>
          </table>
        )}
        </section>
      </div>
    );
  };

  return (
    <div className='landing-page'>
      <Header_Landingpage />
     
      <table className="table-parent">
        <thead>
          <tr>
            
            <th colspan="1" role="columnheader" className="series_desc" style={{ padding: '0 0 0 25px' }}>
              <div>Series Description (0008,103E) <span></span></div>
              <div><input data-testid="patientname" placeholder={`Search among ${recordCount} records`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input></div>
            </th>
            <th colspan="1" role="columnheader" className="patientname" > 
            <div className='Sequence-type'>Sequence Type<span></span></div>
                          {/* Dropdown box for sequence type */}
                          <div className='Sequence-type'>
                <select value={selectedSequenceType} onChange={handleSequenceTypeChange}>
                  {sequenceTypes.map((type, index) => (
                    <option key={index} value={type}>{type}</option>
                  ))}
                </select>
              </div>
            </th>
            <th className='patientname'>Action</th>
            <th className='patientname' >
              <div className="add_user">
                <button className="button is-dark" onClick={() => setButtonPopup(true)}>Add Description</button>
                <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
                  <h3>My Popup</h3>
                </Popup>
              </div>
            </th>
          </tr>
        </thead>
      </table>

      {/* Render the Add User popup */}
      {showAddUserPopup && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleAddUserPopupClose}>&times;</span>
            <h2>Add New User</h2>

            {/* Add form elements for adding new user */}
          </div>
        </div>
      )}

      

      {/* Integrate the ExpandableTable component here */}
      <ExpandableTable  />
      <ModifyPopup
        trigger={modifyPopupTrigger}
        setTrigger={setModifyPopupTrigger}
        seriesDescription={selectedSeriesDescription}
        sequenceType={selectedSequenceType}
        handleModify={handleModify}
      />
      
      {/* Render the DeleteConfirmationPopup component */}
      <DeletePopup
        trigger={showDeleteConfirmation}
        setTrigger={setShowDeleteConfirmation}
        handleDelete={handleDeleteConfirmation}
        sequenceType={selectedSeries?.sequence_type}
        seriesDescription={selectedSeries?.series_description}
      />
      
      <Footer />
    </div>
  );
}

export default LandingPage;
