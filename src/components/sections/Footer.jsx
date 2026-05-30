"use client";

import { Github, Linkedin, Twitter, ArrowUp, MessageCircle } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="w-full bg-primary-light border-t border-white/5 py-12 px-8 md:px-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <h2 className="font-display font-bold text-2xl tracking-tighter">
            ANISH<span className="text-accent-gold">.</span>DEV
          </h2>
          <p className="text-text-muted text-sm">
            Building the web of tomorrow.
          </p>
        </div>

        {/* Social Links & Resume */}
        <div className="flex gap-6 items-center">
          <a href="https://drive.google.com/file/d/11tQ5tSxMfFdeskaVdkLUj1cz6NG28SmN/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-text-muted hover:text-white transition-colors underline underline-offset-4">
            Download Resume
          </a>
          <div className="w-[1px] h-4 bg-white/20" />
          <a href="https://github.com/Anish-Gupta-007" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-accent-gold hover:bg-white/10 transition-all duration-300">
            <Github className="w-5 h-5" />
          </a>
          <a href="www.linkedin.com/in/anish-gupta-50b149343" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-accent-blue hover:bg-white/10 transition-all duration-300">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://wa.me/917067881648?text=Hi%20Anish,%20I%20visited%20your%20portfolio%20and%20would%20like%20to%20connect."target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-text-muted hover:text-accent-purple hover:bg-white/10 transition-all duration-300">
            <MessageCircle  className="w-5 h-5" />
          </a>
        </div>

        {/* Back to top & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm uppercase tracking-widest text-text-muted hover:text-white transition-colors group"
          >
            Back to Top 
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
          <p className="text-text-muted text-xs">
            © {new Date().getFullYear()} Anish. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
