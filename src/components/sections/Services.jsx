"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, Palette, Cuboid, Rocket } from "lucide-react";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Frontend Architecture",
    description: "Building scalable, maintainable, and high-performance React applications from the ground up.",
    icon: Code2,
    iconColor: "text-accent-blue md:text-text-muted group-hover:text-accent-blue",
    borderColor: "border-accent-blue md:border-white/5 hover:border-accent-blue"
  },
  {
    title: "3D Web Experiences",
    description: "Creating immersive WebGL environments using Three.js and React Three Fiber to wow your users.",
    icon: Cuboid,
    iconColor: "text-accent-gold md:text-text-muted group-hover:text-accent-gold",
    borderColor: "border-accent-gold md:border-white/5 hover:border-accent-gold"
  },
  {
    title: "UI/UX Engineering",
    description: "Translating beautiful designs into pixel-perfect, accessible, and responsive user interfaces.",
    icon: Palette,
    iconColor: "text-accent-purple md:text-text-muted group-hover:text-accent-purple",
    borderColor: "border-accent-purple md:border-white/5 hover:border-accent-purple"
  },
  {
    title: "Performance Optimization",
    description: "Auditing and optimizing web apps for blazing fast load times and buttery smooth animations.",
    icon: Rocket,
    iconColor: "text-green-400 md:text-text-muted group-hover:text-green-400",
    borderColor: "border-green-400 md:border-white/5 hover:border-green-400"
  }
];

export default function Services() {
  const sectionRef = useRef(null); // Use outer section for pin
  const mobileSectionRef = useRef(null); // Re-added for GSAP context scoping
  const carouselRef = useRef(null);
  const entranceRefs = useRef([]);
  const levitateRefs = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        // 1. Create a Timeline that handles both the entrance and the carousel
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileSectionRef.current, // Pin the mobile-specific container
            start: "top top", 
            pin: true,
            scrub: 2, 
            snap: {
              snapTo: [0, 0.33, 0.66, 1], 
              duration: { min: 0.5, max: 1 }
            },
            end: () => "+=" + (window.innerHeight * 4) 
          }
        });

        // Setup the initial "crazy" corner positions
        gsap.set(entranceRefs.current[0], { x: -400, y: -400, rotationZ: -45, scale: 0.2, opacity: 0 }); // Top Left
        gsap.set(entranceRefs.current[1], { x: 400, y: -400, rotationZ: 45, scale: 0.2, opacity: 0 });  // Top Right
        gsap.set(entranceRefs.current[2], { x: -400, y: 400, rotationZ: -45, scale: 0.2, opacity: 0 }); // Bottom Left
        gsap.set(entranceRefs.current[3], { x: 400, y: 400, rotationZ: 45, scale: 0.2, opacity: 0 });   // Bottom Right

        // Step 1: Assemble them into the center (x:0, y:0 relative to the flex track)
        tl.to(entranceRefs.current, {
          x: 0,
          y: 0,
          rotationZ: 0,
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.5)" // Gives it a nice bouncy snap into place
        });

        // Step 2: The Horizontal Scroll Carousel starts AFTER they assemble
        tl.to(carouselRef.current, {
          x: () => -(window.innerWidth * (services.length - 1)),
          ease: "none",
          duration: 3 // Take up the rest of the scroll space
        });

        // 3. The "Levitating" Effect runs infinitely and independently on the INNER div
        levitateRefs.current.forEach((card, i) => {
          gsap.to(card, {
            y: i % 2 === 0 ? -15 : 15,
            rotationZ: i % 2 === 0 ? -2 : 2, // Slight floating rotation
            duration: 2.5,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: i * 0.3
          });
        });
      });

    }, mobileSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative w-full py-16 md:py-24 flex flex-col justify-center overflow-x-hidden">
      
      {/* =========================================
          MOBILE VIEW: Crazy GSAP Pinned Carousel 
          ========================================= */}
      <div className="block md:hidden">
        <div ref={mobileSectionRef} className="w-full min-h-screen flex flex-col justify-center pt-20 pb-10 overflow-hidden">
          
          <div className="mb-8 w-full text-center px-4">
            <h2 className="text-accent-gold uppercase tracking-[0.3em] text-sm font-semibold mb-2">
              Expertise
            </h2>
            <h3 className="font-display text-4xl font-bold">
              What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Do</span>
            </h3>
          </div>

          <div className="flex w-[400vw] h-[60vh] items-center" ref={carouselRef}>
            {services.map((service, index) => (
              <div 
                key={index} 
                className="w-[100vw] px-6 flex justify-center"
                style={{ perspective: "1000px" }}
              >
                {/* OUTER DIV: Controlled by ScrollTrigger for corner fly-in */}
                <div ref={el => entranceRefs.current[index] = el} className="w-full max-w-sm">
                  
                  {/* INNER DIV: Controlled by infinite float tween */}
                  <div 
                    ref={el => levitateRefs.current[index] = el}
                    className={`glass p-8 rounded-[2rem] border ${service.borderColor} shadow-2xl`}
                  >
                    <div className="flex flex-col gap-4">
                      <service.icon className={`w-12 h-12 ${service.iconColor}`} strokeWidth={1.5} />
                      <h4 className="font-display text-2xl font-bold">{service.title}</h4>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
          
          {/* Swipe Indicator for Mobile */}
          <div className="flex justify-center gap-2 mt-4 opacity-50 animate-pulse">
            <span className="text-xs uppercase tracking-widest text-white">Keep Scrolling</span>
            <span className="text-white">↓</span>
          </div>

        </div>
      </div>

      {/* =========================================
          DESKTOP VIEW: Standard Grid Layout 
          ========================================= */}
      <div className="hidden md:flex flex-col gap-12 max-w-7xl mx-auto px-16 lg:px-24">
        
        <div className="w-full text-left">
          <h2 className="text-accent-gold uppercase tracking-[0.3em] text-sm md:text-base font-semibold mb-2">
            Expertise
          </h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold">
            What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Do</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1, type: "spring", bounce: 0.3 }}
            className={`group relative glass p-10 rounded-[2rem] overflow-hidden cursor-pointer border transition-all duration-500 ${service.borderColor}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col gap-6">
              <service.icon className={`w-12 h-12 transition-colors duration-500 ${service.iconColor}`} strokeWidth={1.5} />
              <h4 className="font-display text-2xl font-bold">{service.title}</h4>
              <p className="text-text-muted text-base leading-relaxed">
                {service.description}
              </p>
            </div>
            
            <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500">
              <span className="text-white text-sm group-hover:scale-110 transition-transform">↗</span>
            </div>
          </motion.div>
        ))}
        </div>
      </div>

    </section>
  );
}
