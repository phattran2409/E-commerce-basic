// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { useRoutes } from "./hooks/useRoutes";
import { routes } from "./routes/routes";
import ProtectedRoute from "./routes/protectedRoutes";
import PublicRoute from "./routes/publicRoutes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
function App() {
  const { protectRoutes } = useRoutes();

  // Protect routes on every render or state change
  protectRoutes();

  return (
    <div>
      <Routes>
        {routes.map((route) => {
          const Element = route.element;
          if (route.isProtected) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<ProtectedRoute>{Element}</ProtectedRoute>}
              />
            );
          } else if (route.isPublic) {
            return (
              <Route
                key={route.path}
                path={route.path}
                element={<PublicRoute>{Element}</PublicRoute>}
              />
            );
          }
          return <Route key={route.path} path={route.path} element={Element} />;
        })}
      </Routes>
      <ToastContainer/>
    </div>
  );
}

export default App;
