import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './LandingPage.css';
import apollo from '../config/config';
import './ScannerListPage.css';
import Header_Landingpage from './Header_landingpage';
import Footer from './Footer';
import Popup from './ScannerPopup';
import DeletePopup from './DeleteScanner'; // Import the DeleteConfirmationPopup component
import 'bulma/css/bulma.css';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenToSquare, faChevronCircleUp, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import FetchData from './FetchScanner';
import ModifyScanner from './ModifyScanner';


function LandingPage() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for showing delete confirmation popup
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScanner, setSelectedScanner] = useState(null);
  const [showModifyPopup, setShowModifyPopup] = useState(false);
  const [scannerToModify, setScannerToModify] = useState(null);
  const [selectedScannerId, setSelectedScannerId] = useState(null);
  const [scannerCount, setScannerCount] = useState(0);

  useEffect(() => {
    // Fetch scanner count and update state
    const fetchScannerCount = async () => {
      try {
        // Fetch data
        const response = await axios.get(`${apollo.baseUrl}/scanner_list`); // Adjust the API endpoint
        setScannerCount(response.data.length);
        // Update record count
       
      } catch (error) {
        console.error('Error fetching scanner count:', error);
      }
    };

    fetchScannerCount();
  }, []); 

  const handleTrashClick = (scanner) => {
    setSelectedScanner(scanner)
    // Functionality to handle trash icon click and show delete confirmation popup
    setShowDeleteConfirmation(true);
  };

   // Handle click on the pen icon
  const handlePenClick = (scannerId) => {
    setSelectedScannerId(scannerId);
    setShowModifyPopup(true);
  };

  const handleAddUserClick = () => {
    setShowAddUserPopup(true);
  };

  const handleAddUserPopupClose = () => {
    setShowAddUserPopup(false);
  };
  // Function to close the modify scanner popup
  const handleCloseModifyScanner = () => {
    setShowModifyPopup(false);
  };

  const handleDeleteConfirmation = () => {
    // Functionality to delete the item goes here
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

  // Define the ExpandableTable component here
  const ExpandableTable = () => {
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
                <span> Scanner List</span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <FontAwesomeIcon icon={faChevronCircleDown} />
                <span> Scanner List</span>
              </React.Fragment>
            )}
          </button>
        </div>
        {expanded 
        && (
          <table className='table is-fullwidth'>
            <tbody>
              {/* Render the FetchData component */}
              <FetchData
                handleTrashClick={handleTrashClick}
                searchQuery={searchQuery}
                onSearchQueryChange={handleSearchQueryChange}
                handlePenClick={handlePenClick}

              /> {/* Pass handleTrashClick function to FetchData */}
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
            <th colspan="1" role="columnheader" className="scanner_desc" style={{ padding: '0 0px 0 30px' }}>
              <div>Scanner Description<span></span></div>
              <div><input data-testid="patientname" placeholder={`Search among ${scannerCount} records`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input></div>            </th>
            <th colspan="1" role="columnheader" className="patientnames" style={{ padding: '0 0px 0 10px' }}> 
            <div className='Sequence-type'>Station Name (0008,1010)<span></span></div></th>
            <th colspan="1" role="columnheader" className="stationname" style={{ padding: '0 40px 0px 0px' }}> 
            <div className='Sequence-type'>Modality<span></span></div></th>

            <th colspan="1" role="columnheader" className="patientnames" style={{ padding: '0 20px 0 77px' }}> 
            <div className='Sequence-type'>AE title<span></span></div></th>
            <th colspan="1" role="columnheader" className="patientnames" style={{ padding: '0 20px 0 55px' }}> 
            <div className='Sequence-type'>IP address<span></span></div></th>
            <th colspan="1" role="columnheader" className="patientnames" style={{ padding: '0 25px 0 25px' }}> 
            <div className='Sequence-type'>Action<span></span></div></th>
            <th className='patientnames'>
              <div className="add_user">
                <button className="button is-dark" onClick={() => setButtonPopup(true)}>Add Scanner</button>
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
      <ExpandableTable />

      <ModifyScanner
        trigger={showModifyPopup}
        setTrigger={setShowModifyPopup}
        scannerId={selectedScannerId}
        scannerDescription={scannerToModify?.scanner_description}
        handleModify={handleCloseModifyScanner}
      />
      
      {/* Render the DeleteConfirmationPopup component */}
      <DeletePopup
        trigger={showDeleteConfirmation}
        setTrigger={setShowDeleteConfirmation}
        handleDelete={handleDeleteConfirmation}
        scannerId={selectedScanner?.scanner_id}
        scannerDescription={selectedScanner?.scanner_description}
      />
      
      <Footer />
    </div>
  );
}

export default LandingPage;
