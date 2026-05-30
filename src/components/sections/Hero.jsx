"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Hero3D from "../three/Hero3D";

export default function Hero() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Powerful, cinematic entrance animation
      gsap.from(textRef.current.children, {
        y: 80,
        opacity: 0,
        rotationX: -15, // Adds a 3D tilt as it reveals
        duration: 1.5,
        stagger: 0.15,
        ease: "power4.out",
        delay: 0.5
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
    id="home"
      ref={containerRef} 
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-20"
    >
      {/* 3D Background */}
      <Hero3D />

      {/* Foreground UI Overlay */}
      <div 
        ref={textRef} 
        className="z-10 flex flex-col items-center justify-center text-center px-4 max-w-5xl pointer-events-none"
      >
        <div className="glass px-6 py-2 rounded-full border border-white/10 mb-8 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-accent-gold animate-pulse" />
          <span className="text-text-muted uppercase tracking-[0.2em] text-xs font-semibold">
            Available for new projects
          </span>
        </div>
        
        <h1 className="font-display text-6xl md:text-8xl lg:text-[10rem] font-bold leading-[0.9] tracking-tighter mb-8 mix-blend-screen text-white">
          HI, I'M <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold via-accent-blue to-accent-purple italic font-light">ANISH</span>
        </h1>
        
        <p className="text-text-muted text-lg md:text-2xl max-w-2xl mb-12 font-light leading-relaxed">
          I am a Software Developer. I specialize in building modern, interactive, and high-performance web applications with a focus on clean design.
        </p>
        
        {/* Buttons need pointer-events-auto because parent is pointer-events-none */}
        <div className="flex gap-4 md:gap-6 pointer-events-auto flex-wrap justify-center">
          <a href="#projects" className="bg-white text-black px-8 md:px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm hover:scale-105 transition-transform duration-300">
            View Projects
          </a>
          <a href="https://drive.google.com/file/d/11tQ5tSxMfFdeskaVdkLUj1cz6NG28SmN/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="glass text-white px-8 md:px-10 py-4 rounded-full border border-white/20 font-bold uppercase tracking-widest text-xs md:text-sm hover:border-accent-gold hover:bg-white/5 transition-all duration-300">
            Resume
          </a>
          <a href="#contact" className="glass text-white px-8 md:px-10 py-4 rounded-full border border-white/20 font-bold uppercase tracking-widest text-xs md:text-sm hover:border-accent-blue hover:bg-white/5 transition-all duration-300">
            Contact
          </a>
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10 pointer-events-none">
        <span className="text-xs uppercase tracking-widest rotate-90 mb-4 text-text-muted">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
}
