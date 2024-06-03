import React, { useEffect, useState } from 'react';
import './FetchData.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faTrashAlt, faPenToSquare } from '@fortawesome/free-solid-svg-icons'; // Import the icons
import { getScannerList } from '../services/getScannerList';
import { config } from '@fortawesome/fontawesome-svg-core';

function FetchData({ handleTrashClick, searchQuery, handlePenClick, scannerData }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchScannerData = async () => {
            try {
                
                // Make GET request to fetch series data with token authentication
                const response = await getScannerList(config);
                setData(response);
            } catch (error) {
                console.error('Error fetching series data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchScannerData();

     
    }, []); 
    // Function to filter data based on search query
    const filteredData = data.filter(scanner =>
        scanner.scanner_description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className='container'>
            <div className='mt-3'>
                <table className='table is-fullwidth'>
                    <tbody>
                        {filteredData.map((scanner, index) => (
                            <tr key={index}>
                                
                                <td className='scanner_description'>{scanner.scanner_description}</td> {/* Display series description */}
                                <td className='scanner'>{scanner.scanner_id}</td> {/* Display sequence type */}
                                <td className='scanner'>{scanner.modality}</td>
                                <td className='scanner'>{scanner.ae_title}</td>
                                <td className='scanner'>{scanner.ip_address}</td>
                                <td className='scanner'>
                                    {/* Add the pen icon with onClick event */}
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        onClick={() => handlePenClick(scanner.scanner_id)}
                                        style={{ cursor: 'pointer', marginRight: '10px'}}
                                    />
                                    {/* Add the trash icon with onClick event */}
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        onClick={() => handleTrashClick(scanner)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>

                                <td className='scanner'></td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default FetchData;
