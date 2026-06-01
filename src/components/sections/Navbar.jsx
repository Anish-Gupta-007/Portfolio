"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef(null);

  useEffect(() => {
    // Animate the navbar dropping in when the page loads
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.5
      });
    });

    return () => ctx.revert(); // Cleanup GSAP context
  }, []);

  return (
    <nav 
      ref={navRef} 
      className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 md:px-16 lg:px-24 py-6 flex justify-between items-center"
    >
      {/* Logo */}
      <div className="font-display font-bold text-2xl tracking-tighter cursor-pointer">
        ANISH<span className="text-accent-gold">.</span>DEV
      </div>

      {/* Nav Links */}
      <div className="hidden md:flex gap-8 items-center glass px-8 py-3 rounded-full">
        {["Home", "About", "Services", "Projects"].map((item) => (
          <a 
            key={item} 
            href={`#${item.toLowerCase()}`}
            className="text-sm uppercase tracking-widest text-text-muted hover:text-accent-gold transition-colors duration-300"
          >
            {item}
          </a>
        ))}
      </div>

      {/* CTA Button */}
      <div className="cursor-pointer font-medium text-sm border border-white/20 px-6 py-2 rounded-full hover:bg-white/10 transition-colors duration-300">
        <a href="#contact">Let's Talk</a>
      </div>
    </nav>
  );
}
