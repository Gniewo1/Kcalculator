import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register";
import Home from "./pages/Home/Home";
import Test from "./pages/Test/Test";
import DayView from "./pages/DayView/DayView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Strona główna np. Dashboard lub Home */}
        <Route path="/" element={<Home/>} />
        <Route path="/test" element={<Test/>} />
        <Route path="/calendar/:year/:month/:day" element={<DayView />} />
      </Routes>
    </Router>
  );
}

export default App;