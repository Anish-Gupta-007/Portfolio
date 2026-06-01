"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { Code2, Server, Database, Smartphone, Globe, Cpu, GitBranch, Github } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React / Next.js", icon: Globe, color: "text-accent-blue", borderColor: "border-accent-blue md:border-white/5 hover:border-accent-blue" },
  { name: "JavaScript (ES6+)", icon: Code2, color: "text-accent-gold", borderColor: "border-accent-gold md:border-white/5 hover:border-accent-gold" },
  { name: "Node.js / Express", icon: Server, color: "text-green-400", borderColor: "border-green-400 md:border-white/5 hover:border-green-400" },
  { name: "MongoDB", icon: Database, color: "text-green-500", borderColor: "border-green-500 md:border-white/5 hover:border-green-500" },
  { name: "PostgreSQL", icon: Database, color: "text-accent-blue", borderColor: "border-accent-blue md:border-white/5 hover:border-accent-blue" },
  { name: "Tailwind CSS", icon: Smartphone, color: "text-accent-purple", borderColor: "border-accent-purple md:border-white/5 hover:border-accent-purple" },
  { name: "Git", icon: GitBranch, color: "text-orange-500", borderColor: "border-orange-500 md:border-white/5 hover:border-orange-500" },
  { name: "GitHub", icon: Github, color: "text-white", borderColor: "border-white/50 md:border-white/5 hover:border-white/50" },
  { name: "API Architecture", icon: Cpu, color: "text-accent-gold", borderColor: "border-accent-gold md:border-white/5 hover:border-accent-gold" }
];

export default function Skills() {
  const sectionRef = useRef(null);
  const mobileSectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mobileSectionRef.current, // Pin the inner mobile container!
            start: "top top", // Pin exact when hitting top
            pin: true,
            scrub: 1.5, // Buttery smooth scrub
            // Massively long scroll distance to give them time to swipe through 9 cards
            end: () => "+=" + (window.innerHeight * 8) 
          }
        });

        // 1. Initial 3D Setup: Stack them like a deck of cards
        cardsRef.current.forEach((card, i) => {
          gsap.set(card, {
            zIndex: cardsRef.current.length - i,
            scale: 1 - i * 0.05, // Each card gets progressively smaller backwards
            y: i * 20, // Push them down to reveal the stack
            opacity: 1 - i * 0.1 // Fade them out backwards
          });
        });

        // 2. The Card Dealing Animation
        cardsRef.current.forEach((card, i) => {
          if (i === cardsRef.current.length - 1) return; // Leave the last card pinned!

          // The top card physically flies up and rotates off-screen
          tl.to(card, {
            y: -window.innerHeight, 
            rotationZ: i % 2 === 0 ? -25 : 25, // Alternate fly-away rotation
            scale: 1.2,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut"
          }, i); // Use 'i' as absolute timeline position so things sync

          // Every card BEHIND it moves up one slot in the stack
          for (let j = i + 1; j < cardsRef.current.length; j++) {
            tl.to(cardsRef.current[j], {
              scale: "+=0.05",
              y: "-=20",
              opacity: "+=0.1",
              duration: 1,
              ease: "power2.inOut"
            }, i); // Runs simultaneously with the fly-away
          }
        });

        // MASSIVE FIX: Add an empty tween at the end of the timeline.
        // This ensures that after the final card appears, the screen stays pinned 
        // for a little bit longer so the user can actually read the final card 
        // before the section unpins and scrolls away.
        tl.to({}, { duration: 1.5 }); 

      });

    }, mobileSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative w-full py-16 md:py-24 flex flex-col justify-center bg-primary">
      
      {/* =========================================
          MOBILE VIEW: Crazy GSAP Stacking Deck 
          ========================================= */}
      <div className="block md:hidden">
        <div ref={mobileSectionRef} className="w-full min-h-screen flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden relative">
          
          <div className="absolute top-16 left-0 w-full text-center px-4 z-50">
            <h2 className="text-accent-gold uppercase tracking-[0.3em] text-sm font-semibold mb-2">
              My Arsenal
            </h2>
            <h3 className="font-display text-4xl font-bold">
              Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Skills</span>
            </h3>
          </div>

          <div className="relative w-full max-w-[280px] h-[350px] mt-12" style={{ perspective: "1000px" }}>
            {skills.map((skill, index) => (
              <div 
                key={index} 
                ref={el => cardsRef.current[index] = el}
                className={`absolute inset-0 w-full h-full glass p-8 rounded-3xl border ${skill.borderColor} flex flex-col items-center justify-center gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-primary/95 backdrop-blur-md`}
              >
                <div className={`w-20 h-20 rounded-full glass flex items-center justify-center border border-white/5 ${skill.color} shadow-lg`}>
                  <skill.icon className="w-10 h-10" strokeWidth={1.5} />
                </div>
                
                <h4 className="font-display text-xl font-bold text-center text-white">
                  {skill.name}
                </h4>
                
                {/* Count indicator in the corner */}
                <div className="absolute bottom-6 right-6 text-[10px] text-text-muted font-bold tracking-widest">
                  0{index + 1} / 0{skills.length}
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-0 w-full flex flex-col items-center gap-2 opacity-50 animate-pulse z-50">
            <span className="text-[10px] uppercase tracking-widest text-white">Swipe Down To Deal Cards</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-white/50 to-transparent" />
          </div>

        </div>
      </div>

      {/* =========================================
          DESKTOP VIEW: Standard Grid Layout 
          ========================================= */}
      <div className="hidden md:flex flex-col gap-16 max-w-5xl mx-auto w-full px-16 lg:px-24">
        
        <div className="mb-8 flex flex-col gap-4 text-center items-center">
          <h2 className="text-accent-gold uppercase tracking-[0.3em] text-sm md:text-base font-semibold">
            My Arsenal
          </h2>
          <h3 className="font-display text-4xl md:text-6xl font-bold">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Skills</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full" style={{ perspective: "1000px" }}>
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 150, rotateX: -45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className="group glass p-8 rounded-2xl flex flex-col items-center justify-center gap-4 border border-white/5 hover:border-accent-gold hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-2"
            >
              <skill.icon className={`w-10 h-10 text-text-muted transition-colors duration-300 ${skill.color.replace('text', 'group-hover:text')}`} strokeWidth={1.5} />
              <h4 className="font-display text-lg font-bold text-center text-text-main group-hover:text-white transition-colors duration-300">
                {skill.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
