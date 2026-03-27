import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader2 } from "lucide-react";
import BinaryBackground from "./components/BinaryBackground";

const Home = lazy(() => import("./pages/Home"));
const Admin = lazy(() => import("./pages/Admin"));
const Brochure = lazy(() => import("./pages/Brochure"));
const NotFound = lazy(() => import("./pages/NotFound"));

const FullScreenLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background relative text-primary">
    <BinaryBackground />
    <Loader2 className="w-12 h-12 animate-spin opacity-50 relative z-10" />
  </div>
);

const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Suspense fallback={<FullScreenLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/brochure" element={<Brochure />} />
            <Route path="/download" element={<Brochure />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
