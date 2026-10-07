import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Discover from "./Pages/HomePages/Discover";
import DashboardLayout from "./Components/DashboardLayout";
import Requests from "./Pages/HomePages/Request";
import Connections from "./Pages/HomePages/Connection";
import Profile from "./Pages/HomePages/Profile";
import { isLoggedIn } from "./auth";

const ProtectedRoute = () => {
  return isLoggedIn() ? <DashboardLayout /> : <Navigate to="/login" replace />;
};

const PublicOnlyRoute = ({ children }) => {
  return isLoggedIn() ? <Navigate to="/discover" replace /> : children;
};

const App = () => {
  const navigate = useNavigate();
  const [, setAuthVersion] = useState(0);

  useEffect(() => {
    const handleLogout = () => {
      setAuthVersion((value) => value + 1);
      navigate("/login", { replace: true });
    };
    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn() ? "/discover" : "/login"} replace />} />
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/signup" element={<PublicOnlyRoute><Signup /></PublicOnlyRoute>} />

      <Route element={<ProtectedRoute />}>
        <Route path="/discover" element={<Discover />} />
        <Route path="/connections" element={<Connections />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to={isLoggedIn() ? "/discover" : "/login"} replace />} />
    </Routes>
  );
};

export default App;
