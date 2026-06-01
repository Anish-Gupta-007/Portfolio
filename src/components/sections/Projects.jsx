"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "One-Cart E-Commerce",
    description: "A full-stack modern e-commerce platform built with React.js and Stripe integration.",
    tags: ["React.js", "Tailwind", "Node.js", "JWT", "MongoDB"],
    liveUrl: "https://onecart-ecommerceadminn.onrender.com",
    githubUrl: "https://github.com/Anish-Gupta-007/OneCart-Ecommerce",
    borderColor: "border-accent-blue md:border-white/10 hover:border-accent-blue"
  },
  {
    title: "Chattlery",
    description: "Realtime messaging application with rich UI.",
    tags: ["React", "Tailwind", "Socket.io", "Node.js", "JWT"],
    liveUrl: "https://chatlery-realtime-chatapp.onrender.com/",
    githubUrl: "https://github.com/Anish-Gupta-007/Chatlery-Realtime_chatApp",
    borderColor: "border-accent-purple md:border-white/10 hover:border-accent-purple"
  },
  {
    title: "Portfolio Website",
    description: "A luxury developer portfolio utilizing robust frontend architecture and simple UI.",
    tags: ["Framer Motion", "React", "Tailwind", "GSAP"],
    liveUrl: "https://your-live-link.com",
    githubUrl: "https://github.com/yourusername/portfolio",
    borderColor: "border-accent-gold md:border-white/10 hover:border-accent-gold"
  }
];

export default function Projects() {
  const mobileContainerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        // Sticky Stacking Cards Scale Effect
        cardsRef.current.forEach((card, i) => {
          if (i === cardsRef.current.length - 1) return; // The very last card doesn't shrink

          // We grab the DOM element of the NEXT card to use as the scroll trigger
          const nextCard = cardsRef.current[i + 1];

          gsap.to(card, {
            scale: 0.85,
            opacity: 0.3,
            y: -30,
            rotationX: 10,
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: nextCard, // When the next card starts sliding up...
              start: "top bottom", // ...from the bottom of the screen
              end: "top top", // ...until it reaches the top
              scrub: true, // Smoothly animate the current card shrinking backwards
            }
          });
        });
      });

    }, mobileContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="relative w-full py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-primary flex flex-col justify-center">
      
      <div className="mb-12 md:mb-16 flex flex-col gap-4 text-center items-center">
        <h2 className="text-accent-gold uppercase tracking-[0.3em] text-sm md:text-base font-semibold">
          Portfolio
        </h2>
        <h3 className="font-display text-4xl md:text-6xl font-bold">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Projects</span>
        </h3>
      </div>

      {/* =========================================
          MOBILE VIEW: Sticky Stacking Wipe Effect
          ========================================= */}
      <div className="block md:hidden relative w-full pb-32" ref={mobileContainerRef}>
        {projects.map((project, index) => (
          <div 
            key={index}
            className="sticky top-24 w-full h-[70vh] flex justify-center items-start pt-4"
            style={{ zIndex: index + 10 }} // Higher index stacks on top
          >
            {/* The Actual Card */}
            <div 
              ref={el => cardsRef.current[index] = el}
              className={`w-full max-w-sm h-full glass p-8 rounded-[2rem] border ${project.borderColor} shadow-[0_30px_60px_rgba(0,0,0,0.6)] flex flex-col justify-between bg-primary/95 backdrop-blur-xl`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-display text-2xl font-bold text-white">
                    {project.title}
                  </h4>
                  <span className="text-xs text-text-muted font-bold tracking-widest opacity-50">
                    0{index + 1}
                  </span>
                </div>
                <p className="text-text-muted leading-relaxed text-sm">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-col gap-6 mt-8">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-wider font-semibold px-3 py-1.5 bg-white/5 rounded-full text-text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 pt-4 border-t border-white/10">
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-white hover:text-accent-gold transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-white transition-colors">
                    <Github className="w-4 h-4" /> Source
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================
          DESKTOP VIEW: Standard Grid Layout 
          ========================================= */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full mx-auto" style={{ perspective: "1000px" }}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100, rotateY: 25 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
            className={`group glass p-8 rounded-[2rem] flex flex-col justify-between min-h-[350px] border ${project.borderColor} transition-all duration-500`}
          >
            <div className="flex flex-col gap-4">
              <h4 className="font-display text-2xl font-bold text-white group-hover:text-accent-gold transition-colors duration-300">
                {project.title}
              </h4>
              <p className="text-text-muted leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="flex flex-col gap-6 mt-8">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs uppercase tracking-wider font-semibold px-3 py-1 bg-white/5 rounded-full text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4 pt-4 border-t border-white/10">
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-white hover:text-accent-gold transition-colors">
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-text-muted hover:text-white transition-colors">
                  <Github className="w-4 h-4" /> Source
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
