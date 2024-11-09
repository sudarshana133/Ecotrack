import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
const Statistics = lazy(() => import("./pages/user/statistics/statistics"));
const Login = lazy(() => import("./pages/login/Login"));
const UserHome = lazy(() => import("./pages/user/home/Home"));
const Devices = lazy(() => import("./pages/user/devices/Devices"));
const Dashboard = lazy(() => import("./pages/user/home/Dashboard"));
const Home = lazy(() => import("./pages/landing/Landing"));
const Signup = lazy(() => import("./pages/signup/Signup"));
const App: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<UserHome />}>
          <Route index element={<Dashboard />} />
          <Route path="devices" element={<Devices />} />
          <Route path="statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);

export default App;
