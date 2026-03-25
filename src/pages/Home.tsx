import BinaryBackground from "../components/BinaryBackground";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Timeline from "../components/Timeline";
import { Mail, Phone } from "lucide-react";
import { contentData } from "../data/content";

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <BinaryBackground />

      <Navbar />

      <main className="flex-1 relative z-10">
        <div className="max-w-7xl mx-auto px-6 w-full">

          {/* Hero / About Section */}
          <section
            id="about"
            className="min-h-screen flex flex-col justify-center pt-24 pb-12 relative"
          >
            <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

            <div className="glass-premium p-12 rounded-2xl relative z-10 border-animated shadow-glow-primary overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10">
                <div className="inline-block py-1 px-3 mb-6 rounded-full border border-primary/30 bg-primary/10 text-primary font-mono text-sm shadow-[0_0_15px_rgba(var(--primary),0.3)] backdrop-blur-md">
                  // INITIATING APAROKSHA
                </div>

                <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/50">
                  ABOUT <span className="text-glow-primary text-primary">APAROKSHA</span>
                </h1>

                <div className="prose prose-invert max-w-3xl space-y-6">
                  <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
                    {contentData.aboutUsText}
                  </p>

                  <div className="flex flex-wrap gap-4 pt-6">
                    <a
                      href="#contact"
                      className="px-8 py-4 bg-primary text-primary-foreground font-bold tracking-wider rounded-lg hover:shadow-glow-primary hover:bg-primary/90 transition-all uppercase text-sm"
                    >
                      Get in Touch
                    </a>
                    <a
                      href={contentData.flyerLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cyber-button px-8 py-4 border border-primary/50 text-foreground hover:bg-primary/10 transition-all uppercase text-sm tracking-wider flex items-center gap-2 group"
                    >
                      <span className="relative z-10">View Flyer</span>
                      <span className="relative z-10 font-mono text-primary group-hover:translate-x-1 transition-transform">_&gt;</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Timeline Section */}
          <Timeline />

          {/* Contact Section */}
          <section id="contact" className="py-24 relative">
            <div className="inline-flex items-center gap-4 mb-12">
              <h2 className="text-4xl font-bold tracking-tighter text-glow-secondary">CONTACT</h2>
              <div className="h-px bg-border flex-grow max-w-[200px]" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {/* Contact Card 2 */}
              <div className="glass-subtle hover-lift p-8 rounded-xl border border-border/50 bg-card/40 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-secondary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(var(--secondary),0.2)]">
                  <Mail className="text-secondary w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold uppercase tracking-wider mb-2">Email</h3>
                <p className="text-muted-foreground font-mono text-sm leading-relaxed">
                  {contentData.contactEmail}
                </p>
              </div>

              {/* Contact Card 3 */}
              <div className="glass-subtle hover-lift p-8 rounded-xl border border-border/50 bg-card/40 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(var(--accent),0.2)]">
                  <Phone className="text-accent w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wider mb-4">Student Coordinators</h4>
                <div className="text-muted-foreground font-mono text-sm leading-relaxed space-y-2">
                  {contentData.studentCoordinators.map((coord, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span>{coord.name}</span>
                      <a href={`tel:${coord.phone.replace(/\s+/g, "")}`} className="hover:text-accent transition-colors">
                        {coord.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Card 4: Faculty Incharge */}
              <div className="glass-subtle hover-lift p-8 rounded-xl border border-border/50 bg-card/40 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300" />
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6 shadow-[0_0_15px_rgba(var(--primary),0.2)]">
                  <Phone className="text-primary w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold uppercase tracking-wider mb-4">Faculty Incharge</h4>
                <div className="text-muted-foreground font-mono text-sm leading-relaxed">
                  {contentData.facultyIncharge.map((faculty, i) => (
                    <div key={i} className="flex justify-between items-center">
                      <span>{faculty.name}</span>
                      <a href={`tel:${faculty.phone.replace(/\s+/g, "")}`} className="hover:text-primary transition-colors">
                        {faculty.phone}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
