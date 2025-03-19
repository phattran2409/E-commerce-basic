import axios from "axios";

const API = axios.create({
  baseURL: "https://localhost:7149/api/v1",
  withCredentials: true, // Ensure cookies are sent
});

// Interceptor to include token in requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
