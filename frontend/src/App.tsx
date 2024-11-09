import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy } from "react";

// Lazy-loaded components
const Statistics = lazy(() => import("./pages/user/statistics/statistics"));
const Login = lazy(() => import("./pages/login/Login"));
const UserHome = lazy(() => import("./pages/user/home/Home"));
const Devices = lazy(() => import("./pages/user/devices/Devices"));
const Dashboard = lazy(() => import("./pages/user/home/Dashboard"));
const Home = lazy(() => import("./pages/landing/Landing"));

const App: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Top-level routes */}

        {/* UserHome and nested routes */}
        <Route path="/" element={<UserHome />}>
          <Route index element={<Dashboard />} /> {/* Index route for / */}
          <Route path="devices" element={<Devices />} />
          <Route path="statistics" element={<Statistics />} />
          <Route path="/landing" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);

export default App;
