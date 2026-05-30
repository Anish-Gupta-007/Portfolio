"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="relative min-h-screen w-full flex items-center justify-center px-8 md:px-24 py-24 bg-primary">
      
      
      <div className="w-full max-w-5xl mx-auto" style={{ perspective: "1000px" }}>
        <motion.div 
          initial={{ opacity: 0, y: 100, rotateY: 15, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="glass p-10 md:p-16 rounded-[2.5rem] border border-white/10 relative overflow-hidden group"
        >
          
          <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/5 to-accent-purple/5 opacity-50" />
          
          <div className="relative z-10 flex flex-col items-center text-center gap-6">
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-accent-gold uppercase tracking-[0.3em] text-sm font-semibold"
            >
              About Me
            </motion.h2>
            
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-display text-4xl md:text-5xl font-bold leading-tight"
            >
              A Software Developer driven by <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-gold">Code & Design</span>
            </motion.h3>
            
            <motion.div 
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="w-16 h-[2px] bg-accent-gold my-4 origin-left" 
            />
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-text-muted text-lg md:text-xl leading-relaxed max-w-3xl"
            >
              I am Anish, a passionate developer who loves bridging the gap between logic and user experience. 
              I specialize in creating clean, fast, and scalable applications. My goal is to craft digital 
              experiences that are not only highly functional but also visually stunning. 
              I believe in keeping the architecture simple and the UI intuitive.
            </motion.p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
