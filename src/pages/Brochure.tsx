import BinaryBackground from "../components/BinaryBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Download as DownloadIcon, FileText } from "lucide-react";
import { contentData } from "../data/content";

export default function Brochure() {
  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
              {/* Main Flyer Card */}
              <div className="bg-background/40 border border-border/50 p-8 rounded-2xl flex flex-col items-center group hover:bg-background/60 transition-colors">
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
                  <a href={contentData.flyerLink} download className="px-6 py-3 bg-primary border border-primary text-primary-foreground font-bold tracking-wider rounded-lg hover:shadow-glow-primary transition-all text-sm flex items-center justify-center gap-2">
                    <DownloadIcon className="w-4 h-4" /> Download
                  </a>
                </div>
              </div>

              {/* Events Brochure Card */}
              <div className="bg-background/40 border border-border/50 p-8 rounded-2xl flex flex-col items-center group hover:bg-background/60 transition-colors">
                <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-6 border border-secondary/30 shadow-[0_0_20px_rgba(var(--secondary),0.3)] group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Events Brochure</h3>
                <p className="text-muted-foreground text-sm mb-8 text-center">
                  Detailed rules, prize pools, and structure for every event.
                </p>

                <div className="mt-auto flex flex-col sm:flex-row gap-3 w-full justify-center">
                  <a href={contentData.eventsBrochureLink} target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-transparent border border-border text-foreground font-bold tracking-wider rounded-lg hover:bg-white/5 transition-all text-sm flex items-center justify-center">
                    Preview
                  </a>
                  <a href={contentData.eventsBrochureLink} download className="px-6 py-3 bg-secondary border border-secondary text-secondary-foreground font-bold tracking-wider rounded-lg hover:shadow-[0_0_20px_rgba(var(--secondary),0.5)] transition-all text-sm flex items-center justify-center gap-2">
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
