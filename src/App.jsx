import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Order from "./pages/Order";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <Sidebar />
        <main className="flex-grow p-6 bg-gray-100 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking-query" element={<Order />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
