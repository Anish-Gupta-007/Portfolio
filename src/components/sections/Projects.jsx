"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "One-Cart E-Commerce",
    description: "A full-stack modern e-commerce platform built with React.js and Stripe integration.",
    tags: ["React.js", "Tailwind", "Node.js","JWT Authentication","MongoDB"],
    liveUrl: "https://onecart-ecommerceadminn.onrender.com",
    githubUrl: "https://github.com/Anish-Gupta-007/OneCart-Ecommerce"
  },
  {
    title: "Chattlery",
    description: "Realtime messaging application with rich UI.",
    tags: ["React", "Tailwind","Socket.io","Node.js","JWT Authentication"],
    liveUrl: "https://chatlery-realtime-chatapp.onrender.com/",
    githubUrl: "https://github.com/Anish-Gupta-007/Chatlery-Realtime_chatApp"
  },
  {
    title: "Portfolio Website",
    description: "A luxury developer portfolio utilizing robust frontend architecture and simple UI.",
    tags: ["Framer Motion", "React", "Tailwind"],
    liveUrl: "https://your-live-link.com",
    githubUrl: "https://github.com/yourusername/portfolio"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="relative min-h-screen w-full py-24 px-8 md:px-24 bg-primary flex flex-col justify-center">
      
      <div className="mb-16 flex flex-col gap-4 text-center items-center">
        <h2 className="text-accent-gold uppercase tracking-[0.3em] text-sm md:text-base font-semibold">
          Portfolio
        </h2>
        <h3 className="font-display text-4xl md:text-6xl font-bold">
          Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Projects</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full mx-auto" style={{ perspective: "1000px" }}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 100, rotateY: 25 }}
            whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.15, ease: "easeOut" }}
            className="group glass p-8 rounded-[2rem] flex flex-col justify-between min-h-[350px] border border-white/10 hover:border-accent-blue hover:bg-white/5 transition-all duration-500"
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
