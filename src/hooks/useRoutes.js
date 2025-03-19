import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


 export const  useRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {user ,loading } = useAuth();
  
  const isProtectedRoute = (path) => {
    const protectedPaths = ["/dashboard", "/profile"]; // Define protected routes
    return protectedPaths.some((protectedPath) =>
      path.startsWith(protectedPath)
    );
  }
  
  const restrictRoute = (path) => {
    if (loading) return; // Wait until loading is done
    const currentPath = location.pathname;

    if (!user && isProtectedRoute(currentPath)) {
      navigate("/login", { state: { from: currentPath } }); // Redirect to login
    } else if (user && currentPath === "/login") {
      navigate("/dashboard"); // Redirect logged-in users from login
    }
  }

  const protectRoutes = () => {
    restrictRoute();
  };

  return {
    navigate, // Expose navigate for programmatic navigation
    currentPath: location.pathname, // Current route
    protectRoutes, // Function to enforce route protection
    isAuthenticated: !!user, // Boolean for auth status
    loading, // Loading state from auth
  };
};




