import axios from "axios";

const API = axios.create({
  baseURL: "https://employee-management-system-qnq9.onrender.com",
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default API;
