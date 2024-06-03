// login.js in services

import Axios from "axios";
import apollo from "./../config/config.js";

export const login = async (data) => {
  try {
    const response = await Axios.post(`${apollo.baseUrl}login`, data, { withCredential: true});
    return response;
  } catch (error) {
    // Handle error if request fails
    console.error("Login request failed:", error);
    throw error; // Rethrow the error to handle it in the calling code if needed
  }
};
