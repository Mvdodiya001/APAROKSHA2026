import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Brochure from "./pages/Brochure";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/brochure" element={<Brochure />} />
          <Route path="/download" element={<Brochure />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
