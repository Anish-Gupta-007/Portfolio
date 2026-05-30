"use client";

import { motion } from "framer-motion";
import { Code2, Palette, Cuboid, Rocket } from "lucide-react";

const services = [
  {
    title: "Frontend Architecture",
    description: "Building scalable, maintainable, and high-performance React applications from the ground up.",
    icon: Code2,
    color: "group-hover:text-accent-blue"
  },
  {
    title: "3D Web Experiences",
    description: "Creating immersive WebGL environments using Three.js and React Three Fiber to wow your users.",
    icon: Cuboid,
    color: "group-hover:text-accent-gold"
  },
  {
    title: "UI/UX Engineering",
    description: "Translating beautiful designs into pixel-perfect, accessible, and responsive user interfaces.",
    icon: Palette,
    color: "group-hover:text-accent-purple"
  },
  {
    title: "Performance Optimization",
    description: "Auditing and optimizing web apps for blazing fast load times and buttery smooth animations.",
    icon: Rocket,
    color: "group-hover:text-white"
  }
];

export default function Services() {
  return (
    <section id="services" className="relative min-h-screen w-full py-24 px-8 md:px-24 flex flex-col justify-center">
      
      <div className="mb-16 flex flex-col gap-4">
        <h2 className="text-accent-gold uppercase tracking-[0.3em] text-sm md:text-base font-semibold">
          Expertise
        </h2>
        <h3 className="font-display text-4xl md:text-6xl font-bold">
          What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Do</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-7xl mx-auto">
        {services.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.15, type: "spring", bounce: 0.4 }}
            className="group relative glass p-10 rounded-3xl overflow-hidden cursor-pointer border border-white/5 hover:border-white/20 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col gap-6">
              <service.icon className={`w-12 h-12 text-text-muted transition-colors duration-500 ${service.color}`} strokeWidth={1.5} />
              <h4 className="font-display text-2xl font-bold">{service.title}</h4>
              <p className="text-text-muted leading-relaxed">
                {service.description}
              </p>
            </div>
            
            <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500 delay-100">
              <span className="text-accent-gold group-hover:scale-110 transition-transform">↗</span>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
