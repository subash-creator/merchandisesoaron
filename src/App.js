import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Merchandise from "./pages/Merchandise";
import Checkout from "./components/Checkout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main page (default route) */}
        <Route path="/merchandise" element={<Merchandise />} />

        {/* Checkout Page */}
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
