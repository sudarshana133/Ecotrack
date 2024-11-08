import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy } from "react";
const Login = lazy(() => import("./pages/login/Login"));
const Home = lazy(() => import("./pages/user/home/Home"));
const Devices = lazy(() => import("./pages/user/devices/Devices"));

const App: React.FC = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />}>
          <Route path="/devices" element={<Devices />} />
        </Route>
      </Routes>
    </Suspense>
  </Router>
);

export default App;
