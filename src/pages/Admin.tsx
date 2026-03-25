import { useState } from "react";
import BinaryBackground from "../components/BinaryBackground";
import Navbar from "../components/Navbar";
import { Lock, Unlock, Upload, Settings, CalendarRange, Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { timelineData as initialTimeline, TimelineDay, TimelineEvent } from "../data/timeline";
import { contentData as initialContent, SiteContent, Coordinator } from "../data/content";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"events" | "content" | "flyer">("events");

  // State for Timeline
  const [timeline, setTimeline] = useState<TimelineDay[]>(initialTimeline);
  
  // State for Content
  const [content, setContent] = useState<SiteContent>(initialContent);

  // State for Flyer (to upload)
  const [flyerFile, setFlyerFile] = useState<File | null>(null);
  const [customFlyerName, setCustomFlyerName] = useState("");
  
  // Generic Save State
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      
      if (res.ok) {
        setIsAuthenticated(true);
        setError("");
      } else {
        const errorData = await res.json();
        setError(errorData.error || "Invalid password");
      }
    } catch (err) {
      setError("An error occurred. Make sure you are running via vercel edge functions or have an active internet connection.");
    }
  };

  const handleSaveToGithub = async (type: "timeline" | "content" | "flyer") => {
    setIsSaving(true);
    setSaveMessage("Saving to GitHub and deploying...");
    try {
      // Logic for saving to verving serverless API which then pushes to GitHub
      let payload = {};
      if (type === "timeline") {
         payload = { type: "timeline", data: timeline, password };
      } else if (type === "content") {
         payload = { type: "content", data: content, password };
      } else if (type === "flyer" && flyerFile) {
         // Create a base64 string
         const reader = new FileReader();
         reader.readAsDataURL(flyerFile);
         await new Promise((resolve) => (reader.onload = resolve));
         const base64 = (reader.result as string).split(',')[1];
         payload = { type: "flyer", fileName: customFlyerName || flyerFile.name, data: base64, password };
      }

      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to save changes");
      
      setSaveMessage("Successfully saved! Vercel is now rebuilding the site.");
      setTimeout(() => setSaveMessage(""), 5000);
    } catch (err: any) {
      setSaveMessage(`Error: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative selection:bg-primary/30 selection:text-primary-foreground">
        <BinaryBackground />
        <div className="z-10 bg-card/50 backdrop-blur-md p-8 rounded-xl border border-border w-full max-w-sm">
          <div className="flex flex-col items-center mb-6">
            <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mb-4">
              <Lock className="text-primary w-6 h-6" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Admin Access</h1>
            <p className="text-muted-foreground text-sm mt-1 text-center">Enter your password to manage website content</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter admin password"
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary transition-colors"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground font-bold rounded-lg px-4 py-3 hover:bg-primary/90 transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" /> Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground selection:bg-primary/30 selection:text-primary-foreground">
      <BinaryBackground />
      <Navbar />

      <main className="flex-1 relative z-10 pt-24 pb-12">
         <div className="max-w-7xl mx-auto px-6 w-full flex flex-col md:flex-row gap-8">
            
            {/* Sidebar Options hover:bg-white/5 border border-transparent hover:border-border text-muted-foreground hover:text-foreground */}
            <div className="w-full md:w-64 flex flex-col gap-2">
              <button 
                onClick={() => setActiveTab("events")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${activeTab === 'events' ? 'bg-primary/20 text-primary border border-primary/30' : 'hover:bg-white/5 border border-transparent hover:border-border text-muted-foreground hover:text-foreground'}`}>
                <CalendarRange className="w-5 h-5" /> Events Timeline
              </button>
              <button 
                onClick={() => setActiveTab("content")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${activeTab === 'content' ? 'bg-primary/20 text-primary border border-primary/30' : 'hover:bg-white/5 border border-transparent hover:border-border text-muted-foreground hover:text-foreground'}`}>
                <Settings className="w-5 h-5" /> About & Contacts
              </button>
              <button 
                onClick={() => setActiveTab("flyer")}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left font-medium transition-colors ${activeTab === 'flyer' ? 'bg-primary/20 text-primary border border-primary/30' : 'hover:bg-white/5 border border-transparent hover:border-border text-muted-foreground hover:text-foreground'}`}>
                <Upload className="w-5 h-5" /> Flyer / Brochure
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 glass-subtle p-8 rounded-xl border border-border/50 bg-card/40">
               {saveMessage && (
                 <div className="mb-6 px-4 py-3 border border-primary/50 bg-primary/10 text-primary rounded-lg">
                   {saveMessage}
                 </div>
               )}

               {activeTab === "events" && (
                 <div>
                   <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
                      <h2 className="text-2xl font-bold">Manage Events</h2>
                      <button 
                         onClick={() => handleSaveToGithub("timeline")}
                         disabled={isSaving}
                         className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-colors disabled:opacity-50">
                        <Save className="w-4 h-4" /> Save Timeline
                      </button>
                   </div>
                   
                   <div className="space-y-8">
                      {timeline.map((dayObj, dayIndex) => (
                        <div key={dayIndex} className="bg-background/40 p-6 rounded-xl border border-border/50">
                          <input 
                             value={dayObj.day}
                             onChange={(e) => {
                               const newTimeline = [...timeline];
                               newTimeline[dayIndex].day = e.target.value;
                               setTimeline(newTimeline);
                             }}
                             className="text-xl font-bold bg-transparent border-b border-border/50 mb-4 focus:outline-none focus:border-primary w-full pb-1 text-primary"
                          />
                          <div className="space-y-4">
                            {dayObj.events.map((evt, evtIndex) => (
                              <div key={evtIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-background/60 p-4 rounded-lg border border-border/30 relative group">
                                <button className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                                  onClick={() => {
                                    const newTimeline = [...timeline];
                                    newTimeline[dayIndex].events.splice(evtIndex, 1);
                                    setTimeline(newTimeline);
                                  }}>
                                  <Trash2 className="w-4 h-4" />
                                </button>
                                <div>
                                  <label className="text-xs text-muted-foreground block mb-1">Name</label>
                                  <input value={evt.name} onChange={(e) => {
                                    const newTimeline = [...timeline];
                                    newTimeline[dayIndex].events[evtIndex].name = e.target.value;
                                    setTimeline(newTimeline);
                                  }} className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                                </div>
                                <div>
                                  <label className="text-xs text-muted-foreground block mb-1">Time</label>
                                  <input value={evt.time} onChange={(e) => {
                                    const newTimeline = [...timeline];
                                    newTimeline[dayIndex].events[evtIndex].time = e.target.value;
                                    setTimeline(newTimeline);
                                  }} className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:border-primary focus:outline-none" />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="text-xs text-muted-foreground block mb-1">Description (Optional)</label>
                                  <textarea value={evt.description || ""} onChange={(e) => {
                                    const newTimeline = [...timeline];
                                    newTimeline[dayIndex].events[evtIndex].description = e.target.value;
                                    setTimeline(newTimeline);
                                  }} className="w-full bg-background border border-border rounded px-3 py-2 text-sm focus:border-primary focus:outline-none h-20" />
                                </div>
                              </div>
                            ))}
                            <button onClick={() => {
                              const newTimeline = [...timeline];
                              newTimeline[dayIndex].events.push({ id: `new-evt-${Date.now()}`, name: "New Event", time: "TBD" });
                              setTimeline(newTimeline);
                            }} className="w-full py-2 border border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors rounded-lg flex justify-center items-center gap-2 text-sm">
                              <Plus className="w-4 h-4" /> Add Event to {dayObj.day}
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <button onClick={() => {
                         setTimeline([...timeline, { day: "New Day", events: [] }]);
                      }} className="w-full py-4 border-2 border-dashed border-border/50 text-foreground font-medium hover:text-primary hover:border-primary/50 transition-colors rounded-xl flex justify-center items-center gap-2">
                        <Plus className="w-5 h-5" /> Add New Day
                      </button>
                   </div>
                 </div>
               )}

               {activeTab === "content" && (
                 <div>
                   <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
                      <h2 className="text-2xl font-bold">About & Contacts</h2>
                      <button 
                        onClick={() => handleSaveToGithub("content")}
                        disabled={isSaving}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-colors disabled:opacity-50">
                        <Save className="w-4 h-4" /> Save Content
                      </button>
                   </div>
                   
                   <div className="space-y-6">
                      <div>
                        <label className="text-sm font-bold text-foreground mb-2 block">About Us Text</label>
                        <textarea 
                           className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none h-40 font-light leading-relaxed"
                           value={content.aboutUsText}
                           onChange={(e) => setContent({...content, aboutUsText: e.target.value})}
                        />
                      </div>
                      
                      <div>
                        <label className="text-sm font-bold text-foreground mb-2 block">Brochure/Flyer Link (e.g. /my-flyer.pdf)</label>
                        <input 
                           type="text"
                           className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                           value={content.flyerLink}
                           onChange={(e) => setContent({...content, flyerLink: e.target.value})}
                        />
                        <p className="text-xs text-muted-foreground mt-1">Make sure this matches the filename you upload in the Flyer tab.</p>
                      </div>
                      
                      <div>
                        <label className="text-sm font-bold text-foreground mb-2 block">Contact Email</label>
                        <input 
                           type="email"
                           className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                           value={content.contactEmail}
                           onChange={(e) => setContent({...content, contactEmail: e.target.value})}
                        />
                      </div>
                   </div>
                 </div>
               )}

               {activeTab === "flyer" && (
                 <div>
                   <div className="flex items-center justify-between mb-8 pb-4 border-b border-border/50">
                      <h2 className="text-2xl font-bold">Flyer / Brochure</h2>
                      <button 
                         onClick={() => handleSaveToGithub("flyer")}
                         disabled={isSaving || !flyerFile}
                         className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-bold tracking-wider uppercase hover:bg-primary/90 transition-colors disabled:opacity-50">
                        <Save className="w-4 h-4" /> Upload & Deploy
                      </button>
                   </div>
                   
                   <div className="space-y-8">
                     <div className="border-2 border-dashed border-border/50 rounded-xl p-12 text-center flex flex-col items-center justify-center bg-background/30 hover:bg-background/50 transition-colors">
                        <input 
                           type="file" 
                           id="flyer-upload" 
                           className="hidden" 
                           accept="application/pdf"
                           onChange={(e) => {
                             if (e.target.files && e.target.files.length > 0) {
                               const file = e.target.files[0];
                               setFlyerFile(file);
                               setCustomFlyerName(file.name);
                             }
                           }}
                        />
                        <label htmlFor="flyer-upload" className="cursor-pointer flex flex-col items-center">
                           <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 cursor-pointer text-primary hover:bg-primary hover:text-primary-foreground transition-all">
                             <Upload className="w-8 h-8" />
                           </div>
                           <h3 className="text-xl font-bold mb-2 cursor-pointer">Select a PDF</h3>
                           <p className="text-muted-foreground text-sm cursor-pointer">
                             {flyerFile ? <span className="text-primary font-medium">{flyerFile.name} ready to upload</span> : "Click to browse files (PDF only)"}
                           </p>
                        </label>
                     </div>

                     {flyerFile && (
                       <div className="bg-background/60 p-6 rounded-xl border border-border/50">
                         <label className="text-sm font-bold text-foreground mb-2 block">Save file as (Name of the Brochure):</label>
                         <input 
                           type="text"
                           className="w-full bg-background border border-border rounded-lg px-4 py-3 text-foreground focus:border-primary focus:outline-none"
                           value={customFlyerName}
                           onChange={(e) => setCustomFlyerName(e.target.value)}
                         />
                         <p className="text-sm text-yellow-500 mt-2">
                           ⚠️ After uploading, remember to go to <b>About & Contacts</b> and update the Flyer Link to <code>/{customFlyerName}</code> so the site button works!
                         </p>
                       </div>
                     )}
                   </div>
                 </div>
               )}
            </div>
         </div>
      </main>
    </div>
  );
}
