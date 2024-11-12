import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Loader from "./components/Loader";
const Statistics = lazy(() => import("./pages/user/statistics/statistics"));
const Login = lazy(() => import("./pages/login/Login"));
const UserHome = lazy(() => import("./pages/user/home/Home"));
const Devices = lazy(() => import("./pages/user/devices/Devices"));
const Dashboard = lazy(() => import("./pages/user/home/Dashboard"));
const Home = lazy(() => import("./pages/landing/Landing"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const Device = lazy(() => import("./pages/user/devices/Device"));
const Settings = lazy(() => import("./pages/user/settings/Settings"));
const Locations = lazy(() => import("./pages/user/locations/Locations"));
const AddLocation = lazy(() => import("./pages/user/locations/AddLocation"));
const App: React.FC = () => (
  <Router>
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center">
          <Loader />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route
          path="/login"
          element={
            !localStorage.getItem("token") ? (
              <Login />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !localStorage.getItem("token") ? (
              <Signup />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            localStorage.getItem("token") ? (
              <UserHome />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="devices/:locationId" element={<Devices />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="devices/:locationId/:deviceId" element={<Device />} />
          <Route path="settings" element={<Settings />} />
          <Route path="locations" element={<Locations />} />
          <Route path="addLocation" element={<AddLocation />} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);

export default App;
