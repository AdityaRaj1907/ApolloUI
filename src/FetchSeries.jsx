import React, { useEffect, useState } from 'react';
import './FetchData.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faTrashAlt, faPenToSquare } from '@fortawesome/free-solid-svg-icons'; // Import the icons
import { getSeriesData } from '../services/getSeriesData';
import { config } from '@fortawesome/fontawesome-svg-core';

function FetchData({ handleTrashClick, searchQuery, sequenceType,onSearchQueryChange,handlePenClick }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
   

    useEffect(() => {
        const fetchSeriesData = async () => {
            try {
                // Make GET request to fetch series data
                const response = await getSeriesData(config);
                setData(response);
                // onDataReceived(response);
            } catch (error) {
                console.error('Error fetching series data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSeriesData();
    }, []);

    const handleLocalPenClick = (seriesDescription, sequenceType) => {
        // Functionality to handle pen icon click
        handlePenClick(seriesDescription, sequenceType);
        // console.log("Pen icon clicked for index:", index);
        // Perform modification or other actions as needed
    };
    // Function to filter data based on search query and sequence type
    const filteredData = data.filter(series =>
        series.series_description.toLowerCase().includes(searchQuery.toLowerCase())
        && (sequenceType === 'All' || series.sequence_type === sequenceType)
        
    );

   
    return (
        <div className='container'>
            <div className='mt-3'>
                <table className='table is-fullwidth'>
                    <tbody>
                        {filteredData.map((series, index) => (
                            <tr key={index}>
                                {/* <td className='circle'><FontAwesomeIcon icon={faCircle} className="left fas fa-circle readunreadbtn" aria-hidden="true" /></td> */}
                                <td className='series_description'>{series.series_description}</td> {/* Display series description */}
                                <td className='sequence_type'>{series.sequence_type}</td> {/* Display sequence type */}
                                <td className='sequence_type'>
                                    {/* Add the pen icon with onClick event */}
                                    <FontAwesomeIcon
                                        icon={faPenToSquare}
                                        onClick={() => handleLocalPenClick(series.series_description, series.sequence_type)}
                                        style={{ cursor: 'pointer', marginRight: '10px'}}
                                    />
                                    {/* Add the trash icon with onClick event */}
                                    <FontAwesomeIcon
                                        icon={faTrashAlt}
                                        onClick={() => handleTrashClick(series)}
                                        style={{ cursor: 'pointer' }}
                                    />
                                </td>
                                <td className='sequence_type'></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default FetchData;
