import BinaryBackground from "../components/BinaryBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Download as DownloadIcon, FileText } from "lucide-react";
import { useContent } from "../hooks/useSiteData";
import { Loader2 } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function Brochure() {
  const { contentData, loading } = useContent();

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col relative bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
        <Helmet>
          <title>Aparoksha | Brochures & Downloads</title>
        </Helmet>
        <BinaryBackground />
        <Navbar />
        <main className="flex-1 relative z-10 flex flex-col items-center justify-center pt-24 pb-12 px-6">
          <Loader2 className="w-12 h-12 text-primary animate-spin opacity-50" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <Helmet>
        <title>Aparoksha | Brochures & Downloads</title>
        <meta name="description" content="Download the main flyer and schedules for Aparoksha'26 of IIIT Allahabad." />
        <link rel="canonical" href="https://aparoksha.iiita.ac.in/brochure" />
      </Helmet>
      <BinaryBackground />
      <Navbar />

      <main className="flex-1 relative z-10 flex flex-col items-center justify-center pt-24 pb-12 px-6">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

        <div className="glass-premium p-12 md:p-16 rounded-3xl relative z-10 border-animated shadow-glow-primary overflow-hidden w-full max-w-5xl text-center flex flex-col items-center">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 transition-opacity duration-700" />

          <div className="relative z-10 flex flex-col items-center w-full">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/70">
              APAROKSHA 2026<br /><span className="text-glow-primary text-primary">DOWNLOADS</span>
            </h1>

            <p className="text-muted-foreground text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
              Discover all the events, schedules, rules, and details about Aparoksha'26 of IIIT Allahabad.
            </p>

            <div className="flex justify-center w-full">
              {/* Main Flyer Card */}
              <div className="bg-background/40 border border-border/50 p-8 rounded-2xl flex flex-col items-center group hover:bg-background/60 transition-colors max-w-md w-full">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-6 border border-primary/30 shadow-[0_0_20px_rgba(var(--primary),0.3)] group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Main Flyer</h3>
                <p className="text-muted-foreground text-sm mb-8 text-center">
                  The quick overview and schedule of the festival.
                </p>

                <div className="mt-auto flex flex-col sm:flex-row gap-3 w-full justify-center">
                  <a href={contentData.flyerLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-transparent border border-border text-foreground font-bold tracking-wider rounded-lg hover:bg-white/5 transition-all text-sm flex items-center justify-center">
                    Preview
                  </a>
                  <a href={contentData.flyerLink} target="_blank" rel="noopener noreferrer" download="APK_timeline.pdf" className="px-6 py-3 bg-primary border border-primary text-primary-foreground font-bold tracking-wider rounded-lg hover:shadow-glow-primary transition-all text-sm flex items-center justify-center gap-2">
                    <DownloadIcon className="w-4 h-4" /> Download
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
