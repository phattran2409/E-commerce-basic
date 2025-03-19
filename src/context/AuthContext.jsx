import { createContext, useState, useEffect, useContext } from "react";
import API from "../api/api"; // Assuming this is an Axios instance
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const navigate = useNavigate();

  // Check if user is authenticated on mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      API.get("/auth/me", {
        headers: { Authorization: `${token}` }, // Ensure token is sent
      })
        .then((res) => {
          setUser(res.data.user);
          localStorage.setItem("USER_ROLE",res.data.user.role);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Token validation failed:", err);
          logout(); // Logout on invalid token
          setLoading(false);
        });
    } else {
      setLoading(false); // No token, skip loading
    }
  }, []); // Empty array: runs once on mount

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null); // Reset error state'
      console.log(credentials);
      const res = await API.post("/auth/login", credentials);
      const { token, user } = res.data; // Destructure response
      localStorage.setItem("authToken", token);
      setUser(user);
      console.log(credentials);
      setLoading(false);
      navigate("/dashboard"); // Redirect after login
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed"); // Set error message
      setLoading(false);
      throw error; // Allow caller to handle if needed
    }
  } 
  const register = async (credentials) => { 
    try {
      setLoading(true)
      setError(null)
      const res = await API.post("/auth/register",credentials);
      if (res.status === 201 || res.data.success) {
        navigate("/login");
        return { success: true, data: res.data }; // Return success info
      } else {
        throw new Error(res.data.message || "Registration failed unexpectedly");
      }
      
    } catch (error) {
      console.log(error)
      setError(error.response?.data?.message || "Register failed"); // Set error message
      setLoading(false);
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setError(null); // Clear any errors
    navigate("/login"); // Redirect to login page
  };

  // Context value
  const value = {
    user,
    login,
    logout,
    loading, // Expose loading state
    error, 
    register,// Expose error state
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
