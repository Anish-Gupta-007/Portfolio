"use client";

import { motion } from "framer-motion";
import { Code2, Server, Database, Smartphone, Globe, Cpu, GitBranch, Github } from "lucide-react";

const skills = [
  { name: "React / Next.js", icon: Globe },
  { name: "JavaScript (ES6+)", icon: Code2 },
  { name: "Node.js / Express", icon: Server },
  { name: "MongoDB", icon: Database },
  { name: "PostgreSQL", icon: Database },
  { name: "Tailwind CSS", icon: Smartphone },
  { name: "Git", icon: GitBranch },
  { name: "GitHub", icon: Github },
  { name: "API Architecture", icon: Cpu }
];

export default function Skills() {
  return (
    <section id="skills" className="relative min-h-screen w-full py-24 px-8 md:px-24 bg-primary flex flex-col justify-center">
      
      <div className="mb-16 flex flex-col gap-4 text-center items-center">
        <h2 className="text-accent-gold uppercase tracking-[0.3em] text-sm md:text-base font-semibold">
          My Arsenal
        </h2>
        <h3 className="font-display text-4xl md:text-6xl font-bold">
          Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-blue to-accent-purple">Skills</span>
        </h3>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl w-full mx-auto" style={{ perspective: "1000px" }}>
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 150, rotateX: -45 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            className="group glass p-8 rounded-2xl flex flex-col items-center justify-center gap-4 border border-white/5 hover:border-accent-gold hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-2"
          >
            <skill.icon className="w-10 h-10 text-text-muted group-hover:text-accent-gold transition-colors duration-300" strokeWidth={1.5} />
            <h4 className="font-display text-lg font-bold text-center text-text-main group-hover:text-white transition-colors duration-300">
              {skill.name}
            </h4>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
