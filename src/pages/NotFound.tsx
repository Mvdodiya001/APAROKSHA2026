import BinaryBackground from "../components/BinaryBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <Helmet>
        <title>404 - Page Not Found | Aparoksha</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <BinaryBackground />
      <Navbar />

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-6 pt-24 pb-12 text-center">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-red-500/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        
        <div className="glass-premium p-12 rounded-3xl relative z-10 border border-red-500/20 shadow-[0_0_30px_rgba(var(--primary),0.1)] overflow-hidden w-full max-w-2xl flex flex-col items-center">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-8 border border-red-500/30">
            <AlertCircle className="w-10 h-10 text-red-400" />
          </div>
          
          <h1 className="text-6xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50">
            404
          </h1>
          <h2 className="text-2xl font-bold tracking-widest uppercase mb-6 text-glow-primary text-primary">
            System Failure
          </h2>
          
          <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto font-light leading-relaxed">
            The neural link to the requested data sector was not found. Please verify the coordinates or return to base.
          </p>

          <Link
            to="/"
            className="px-8 py-4 bg-primary text-primary-foreground font-bold tracking-wider rounded-lg hover:shadow-glow-primary hover:bg-primary/90 transition-all uppercase text-sm border border-transparent hover:border-primary/50"
          >
            Return to Initialization
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
