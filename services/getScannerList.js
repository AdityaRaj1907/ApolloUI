import axios from "axios";
import apollo from "./../config/config.js";

export const getScannerList = (config) => {
    return axios.get(`${apollo.baseUrl}scanner_list`, config)
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching user:', error);
            throw error; // Re-throw the error for the caller to handle
        });
};
