import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Mainpage from "./pages/Mainpage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Merchandise Coming Soon Page */}
        <Route path="/" element={<Mainpage />} />
      </Routes>
    </Router>
  );
}

export default App;
