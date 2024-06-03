import React, { useState, useEffect } from 'react';
import axios from 'axios';
import apollo from '../config/config';
import './LandingPage.css';
import Header_Landingpage from './Header_landingpage';
import Footer from './Footer';
import Popup from './Popup';
import DeletePopup from './DeletePopup'; // Import the DeleteConfirmationPopup component
import ModifyPopup from './ModifyPopup';
import 'bulma/css/bulma.css';
import 'bulma/css/bulma.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenToSquare, faChevronCircleUp, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import FetchData from './FetchData';

function LandingPage() {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [showAddUserPopup, setShowAddUserPopup] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // State for showing delete confirmation popup
  const [searchQuery, setSearchQuery] = useState(''); // State to manage the search query
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [modifyPopupTrigger, setModifyPopupTrigger] = useState(false); 
  const [userIdToModify, setUserIdToModify] = useState(null);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [recordCount, setRecordCount] = useState(0); // State to manage the total record count


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${apollo.baseUrl}/user`);
      const data = response.data;
      setRecordCount(data.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddUserClick = () => {
    setShowAddUserPopup(true);
  };

  const handleAddUserPopupClose = () => {
    setShowAddUserPopup(false);
  };

  const handleDeleteConfirmation = () => {
    // Functionality to delete the item goes here
    console.log("Item deleted");
    setShowDeleteConfirmation(false); // Close the delete confirmation popup after deletion
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false); // Close the delete confirmation popup
  };

  // Function to handle changes in the search query
  const handleSearchQueryChange = (query) => {
    setSearchQuery(query);
  };
  
  const handleTrashClick = (userId, username) => {
    // Functionality to handle trash icon click and show delete confirmation popup
    setUserIdToDelete(userId);
    setShowDeleteConfirmation(true);
    handleSetSelectedUsername(username);
  };
  const handlePenClick = (userId) => {
    // Functionality to handle pen icon click
    console.log("Pen icon clicked for user ID:", userId);
    // You can trigger the modify popup here, or any other action you want
    setUserIdToModify(userId);
    setModifyPopupTrigger(true);
  };
  
  const handleModify = () => {
    // Perform any actions needed after modification (e.g., refetch data)
    console.log('User details modified');
    // You can add any additional actions here
  };
  const handleSetSelectedUsername = (username) => {
    setSelectedUsername(username);
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
                <span> User List</span>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <FontAwesomeIcon icon={faChevronCircleDown} />
                <span> User List</span>
              </React.Fragment>
            )}
          </button>
        </div>
        {expanded 
        && (
          <table className='table is-fullwidth'>
            <tbody>
              {/* Render the FetchData component with searchQuery and handleSearchQueryChange */}
              <FetchData
                handleTrashClick={handleTrashClick}
                handlePenClick={handlePenClick}
                searchQuery={searchQuery}
                onSearchQueryChange={handleSearchQueryChange}
                modifyPopupTrigger={modifyPopupTrigger} // Pass the modifyPopupTrigger state
                setModifyPopupTrigger={setModifyPopupTrigger} // Pass the setModifyPopupTrigger function
                onSetSelectedUsername={handleSetSelectedUsername}
                setRecordCount={setRecordCount}
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
            <th colSpan="1" role="columnheader" className="patientname" style={{ padding: '0 22px' }}>
              <div>User Name<span></span></div>
              {/* Add the search input with onChange event */}
              <div><input data-testid="patientname" placeholder={`Search among ${recordCount} records`} value={searchQuery} onChange={(e) => handleSearchQueryChange(e.target.value)}></input></div>
            </th>
            <th className='action'>Action</th>
            <th className='patientname'>
              <div className="add_user">
                <button className="button is-dark" onClick={() => setButtonPopup(true)}>Add User</button>
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
      <ModifyPopup
        trigger={modifyPopupTrigger}
        setTrigger={setModifyPopupTrigger}
        userIdToModify={userIdToModify}
        handleModify={handleModify}
      />
      {/* Render the DeleteConfirmationPopup component */}
      <DeletePopup
        trigger={showDeleteConfirmation}
        setTrigger={setShowDeleteConfirmation}
        userIdToDelete={userIdToDelete} // Pass userIdToDelete to DeletePopup
        handleDelete={handleDeleteConfirmation}
        username={selectedUsername}
      />
      
      <Footer />
    </div>
  );
}

export default LandingPage;
