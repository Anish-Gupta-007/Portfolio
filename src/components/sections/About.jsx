"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // 1. Dynamic 3D Scrub Animation (The card tilts and scales based on your scroll position)
      gsap.fromTo(cardRef.current, 
        { 
          opacity: 0, 
          y: 200, 
          rotationX: 45, 
          scale: 0.8 
        },
        {
          opacity: 1, 
          y: 0, 
          rotationX: 0, 
          scale: 1,
          ease: "none", // Scrub animations shouldn't have eases
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 90%", // Start animating when the top of the section hits the bottom 90% of screen
            end: "center center", // End when it reaches the center
            scrub: 1, // 1 second smoothing for that buttery "tied to scroll wheel" feel
          }
        }
      );

      // 2. Text Reveal Stagger (Reveals text inside the card once it enters)
      const children = textRef.current.children;
      gsap.fromTo(children,
        { opacity: 0, y: 30, filter: "blur(10px)" },
        {
          opacity: 1, 
          y: 0, 
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.2, // Each element fades in one after the other
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%", // Triggers when the card is well into view
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert(); // Cleanup memory on unmount
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      // OPTIMIZATION: min-h-[60vh] on mobile so it doesn't take the full screen, min-h-screen on desktop
      className="relative min-h-[60vh] md:min-h-screen w-full flex items-center justify-center py-16 md:py-24 px-4 sm:px-8 md:px-16 lg:px-24 bg-primary"
    >
      <div className="w-full max-w-5xl mx-auto" style={{ perspective: "1200px" }}>
        <div 
          ref={cardRef}
          // OPTIMIZATION: Less padding and smaller border radius on mobile
          className="glass p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] border border-white/10 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5 opacity-50" />
          
          <div ref={textRef} className="relative z-10 flex flex-col items-center text-center gap-4 md:gap-6">
            <h2 className="text-accent-gold uppercase tracking-[0.3em] text-xs md:text-sm font-semibold">
              About Me
            </h2>
            
            {/* OPTIMIZATION: Scaled down typography for mobile, stays huge on desktop */}
            <h3 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              A Software Developer driven by <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-gold">Code & Design</span>
            </h3>
            
            <div className="w-12 md:w-16 h-[2px] bg-accent-gold my-2 md:my-4" />
            
            {/* OPTIMIZATION: Tighter line-height and smaller font for mobile */}
            <p className="text-text-muted text-sm sm:text-base md:text-xl leading-relaxed md:leading-loose max-w-3xl">
              I am Anish, a passionate developer who loves bridging the gap between logic and user experience. 
              I specialize in creating clean, fast, and scalable applications. My goal is to craft digital 
              experiences that are not only highly functional but also visually stunning. 
              I believe in keeping the architecture simple and the UI intuitive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
