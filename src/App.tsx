import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Brochure from "./pages/Brochure";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/brochure" element={<Brochure />} />
        <Route path="/download" element={<Brochure />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
