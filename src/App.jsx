import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ActivitiesPage from "./pages/ActivitiesPage/ActivitiesPage";
import ReservationsPage from "./pages/ReservationsPage/ReservationsPage";
import ActivityDetail from "./pages/ActivityDetail/ActivityDetail";
import ReservationDetail from "./pages/ReservationDetail/ReservationDetail";
import SearchPage from "./pages/SearchPage/SearchPage";
import PrivateRoute from "./components/PrivateRoute";

import "./App.css";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
          <Route path="/activities/:id" element={<ActivityDetail />} />
          <Route path="/search" element={<SearchPage />} />

          <Route
            path="/reservations"
            element={
              <PrivateRoute>
                <ReservationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/reservations/:id"
            element={
              <PrivateRoute>
                <ReservationDetail />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
