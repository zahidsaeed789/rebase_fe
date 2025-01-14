import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import Login from "./components/auth/Login";
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
};

export default App;
