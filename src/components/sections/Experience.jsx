"use client";

import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Senior Software Developer",
    company: "Tech Innovations Inc.",
    date: "2023 - Present",
    description: "Leading frontend architecture, optimizing React applications for maximum performance, and mentoring junior developers.",
  },
  {
    type: "work",
    title: "Full Stack Engineer",
    company: "Digital Agency Solutions",
    date: "2021 - 2023",
    description: "Built and deployed over a dozen scalable web applications using Next.js, Node.js, and modern databases.",
  },
  {
    type: "education",
    title: "B.S. Computer Science",
    company: "University of Technology",
    date: "2017 - 2021",
    description: "Specialized in Software Engineering, Algorithms, and Human-Computer Interaction.",
  }
];

export default function Experience() {
  return (
    <section id="experience" className="relative min-h-screen w-full py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-primary flex flex-col justify-center overflow-hidden">
      
      <div className="mb-24 flex flex-col gap-4 text-center items-center">
        <h2 className="text-accent-gold uppercase tracking-[0.3em] text-sm md:text-base font-semibold">
          Journey
        </h2>
        <h3 className="font-display text-4xl md:text-6xl font-bold">
          My <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple to-accent-blue">Experience</span>
        </h3>
      </div>

      <div className="relative max-w-5xl w-full mx-auto">
        
        {/* Desktop Central Timeline Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-white/10 to-transparent hidden md:block" />

        <div className="flex flex-col gap-12 md:gap-24">
          {experiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            return (
              <div key={index} className="relative flex flex-col md:flex-row items-center w-full justify-between">
                
                {/* Desktop Timeline Center Dot */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full glass border border-accent-gold items-center justify-center z-10 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                  {exp.type === "work" ? (
                    <Briefcase className="w-5 h-5 text-accent-gold" />
                  ) : (
                    <GraduationCap className="w-5 h-5 text-accent-blue" />
                  )}
                </div>

                {/* Desktop Left Side Content */}
                <div className={`w-full md:w-[45%] flex ${isEven ? "md:justify-end" : "md:justify-start hidden md:flex"}`}>
                  {isEven && <ExperienceCard exp={exp} direction="right" />}
                </div>

                {/* Desktop Right Side Content */}
                <div className={`w-full md:w-[45%] flex ${!isEven ? "md:justify-start" : "md:justify-end hidden md:flex"}`}>
                  {!isEven && <ExperienceCard exp={exp} direction="left" />}
                </div>
                
                {/* Mobile Fallback Card (shows in standard vertical column) */}
                <div className="w-full block md:hidden mt-8 relative">
                   {/* Mobile Timeline Line & Dot */}
                   <div className="absolute -left-4 top-6 w-3 h-3 rounded-full bg-accent-gold border-2 border-primary z-10" />
                   <div className="absolute -left-[11px] top-8 bottom-[-4rem] w-[2px] bg-white/10" />
                   
                   <ExperienceCard exp={exp} direction="left" />
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Reusable animated card component for the timeline
function ExperienceCard({ exp, direction }) {
  const initialX = direction === "right" ? -50 : 50;

  return (
    <motion.div 
      initial={{ opacity: 0, x: initialX, y: 50 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
      className="glass p-8 rounded-3xl w-full border border-white/5 hover:border-white/20 transition-colors group relative overflow-hidden text-left"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex flex-col gap-2">
        <span className="text-accent-gold font-mono text-sm tracking-wider">{exp.date}</span>
        <h4 className="font-display text-2xl font-bold text-white mt-2">{exp.title}</h4>
        <span className="text-accent-purple font-medium tracking-wide text-sm uppercase">{exp.company}</span>
        <p className="text-text-muted mt-4 leading-relaxed">
          {exp.description}
        </p>
      </div>
    </motion.div>
  );
}
