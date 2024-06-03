import axios from "axios";
import apollo from "./../config/config.js";

export const getuser = () => {
  // Create config object with withCredentials: true
  const config = {
    withCredential: true,
    
  };

  // Make GET request with the provided config
  return axios.get(`${apollo.baseUrl}user`, config)
    .then(response => response.data)
    .catch(error => {
      // Handle error if request fails
      console.error('Error fetching user:', error);
      throw error; // Re-throw the error for the caller to handle
    });
};
