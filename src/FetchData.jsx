import React, { useEffect, useState } from 'react';
import './FetchData.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPenToSquare } from '@fortawesome/free-solid-svg-icons'; // Import the icons
import { getuser } from '../services/getuser'; // Import the getuser function
import { config } from '@fortawesome/fontawesome-svg-core';



function FetchData({ handleTrashClick, handlePenClick, searchQuery,modifyPopupTrigger, setModifyPopupTrigger  }) {
    const [userIdToModify, setUserIdToModify] = useState(null); 
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {

                // Make GET request to fetch user data
                const response = await getuser(config)
                setData(response);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []); // Depend on token to refetch data when token changes


    const filteredData = data.filter(user => {
        return user.username.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div className='container'>
            <div className='mt-3'>
                <table className='table is-fullwidth'>
                    <tbody>
                        {filteredData.map((user, index) => (
                            <tr key={index}>
                                
                                <td className='username'>{user.username}</td>
                                <td className='username'>
                                    {/* Add the pen icon with onClick event */}
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        onClick={() => handlePenClick(user._id)}
                                        style={{ cursor: 'pointer', marginRight: '10px'}}
                                    />
                                    {/* Add the trash icon with onClick event */}
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        onClick={() => handleTrashClick(user._id, user.username)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                                <td className='username'></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
}

export default FetchData;
