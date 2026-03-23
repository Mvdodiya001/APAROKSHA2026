import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarClock, ArrowUpRight, ChevronDown } from "lucide-react";
import { timelineData, TimelineEvent } from "../data/timeline";
import { cn } from "../lib/utils";

const Snapcard = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const colors = [
    "from-primary/20 to-primary/5 border-primary/30",
    "from-secondary/20 to-secondary/5 border-secondary/30",
    "from-accent/20 to-accent/5 border-accent/30",
  ];
  const activeColor = colors[index % colors.length];
  const accentText = ["text-primary", "text-secondary", "text-accent"][index % 3];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className={cn(
        "glass-subtle relative overflow-hidden rounded-xl border group transition-all duration-300",
        activeColor,
        isExpanded ? "shadow-glow-primary/20 scale-[1.02] z-10" : "hover:border-primary/50"
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br opacity-50 pointer-events-none" />

      <div className="p-6 relative z-10 flex flex-col h-full">
        <div className="flex justify-between items-start gap-4 mb-4">
          <h3 className="text-xl font-bold tracking-tight uppercase leading-tight group-hover:text-glow-primary transition-all">
            {event.name}
          </h3>
          {event.link && (
            <a
              href={event.link}
              target="_blank"
              rel="noopener noreferrer"
              className={cn("p-2 rounded-full bg-background/50 hover:bg-background border border-border/50", accentText)}
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight className="w-4 h-4" />
            </a>
          )}
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm font-mono text-muted-foreground">
          <CalendarClock className={cn("w-4 h-4", accentText)} />
          <span>{event.time}</span>
        </div>

        {event.description && (
          <div className="mt-auto">
            <motion.div
              layout
              className={cn(
                "text-muted-foreground/80 text-sm leading-relaxed overflow-hidden",
                !isExpanded && "line-clamp-2"
              )}
            >
              {event.description}
            </motion.div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full mt-4 text-xs font-mono uppercase tracking-widest text-primary/80 hover:text-primary transition-colors focus:outline-none"
            >
              <span>{isExpanded ? "Show Less" : "Read More"}</span>
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  return (
    <section id="timeline" className="py-24 relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/2 left-0 w-full h-1/2 bg-secondary/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl">
        <div className="inline-flex items-center gap-4 mb-16">
          <h2 className="text-4xl font-bold tracking-tighter text-glow-primary">EVENT TIMELINE</h2>
          <div className="h-px bg-border flex-grow max-w-[200px]" />
        </div>

        <div className="space-y-20 relative">
          {/* Timeline Vertical Line for Desktop */}
          <div className="hidden md:block absolute left-4 md:left-[120px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-primary/0 pointer-events-none" />

          {timelineData.map((dayData) => (
            <div key={dayData.day} className="relative z-10">
              <div className="flex flex-col md:flex-row gap-8">
                
                {/* Day Header */}
                <div className="md:w-[120px] shrink-0 relative flex items-start">
                  <div className="md:sticky md:top-24 flex items-center gap-4 md:block relative bg-background md:bg-transparent z-20 py-2 md:py-0 w-full">
                    <div className="hidden md:block absolute -right-[24.5px] top-2 w-3 h-3 rounded-full bg-primary shadow-glow-primary z-10" />
                    <h3 className="text-3xl md:text-xl md:-translate-y-1 font-bold tracking-tighter uppercase font-mono text-glow-secondary bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground mr-4 md:mr-0 inline-block">
                      {dayData.day}
                    </h3>
                    <div className="h-px w-full bg-border md:hidden" />
                  </div>
                </div>

                {/* Event Cards Grid */}
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
                  <AnimatePresence>
                    {dayData.events.map((event, idx) => (
                      <Snapcard key={event.id} event={event} index={idx} />
                    ))}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
