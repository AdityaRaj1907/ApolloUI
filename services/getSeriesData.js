import axios from "axios";
import apollo from "./../config/config.js";

export const getSeriesData = (config) => {
    return axios.get(`${apollo.baseUrl}series_description`,{
        ...config,
        withCredentials: true,
        credentials: 'same-origin'
        // headers: headers()
    })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching user:', error);
            throw error; // Re-throw the error for the caller to handle
        });
};
