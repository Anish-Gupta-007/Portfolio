"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure GSAP registers the plugin
gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }) {
  useEffect(() => {
    // 1. Initialize Lenis
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
      wheelMultiplier: 1, 
    });

    // 2. Sync Lenis scroll with GSAP ScrollTrigger
    // This is REQUIRED so that GSAP knows exactly where the custom scrollbar is
    lenis.on('scroll', ScrollTrigger.update);

    // 3. Connect GSAP's ticker to Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Prevent GSAP from lagging during heavy frames
    gsap.ticker.lagSmoothing(0);

    // Cleanup on unmount
    return () => {
      gsap.ticker.remove(lenis.raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
