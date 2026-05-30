"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2, CheckCircle, XCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Reset form
      
      // Reset back to idle after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" className="relative min-h-screen w-full py-24 px-8 md:px-24 bg-primary flex flex-col justify-center overflow-hidden">
      
      <div className="mb-16 flex flex-col gap-4 text-center items-center">
        <h2 className="text-accent-gold uppercase tracking-[0.3em] text-sm md:text-base font-semibold">
          Get In Touch
        </h2>
        <h3 className="font-display text-4xl md:text-6xl font-bold">
          Let's Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-gold to-accent-blue">Together</span>
        </h3>
      </div>

      <div className="w-full max-w-3xl mx-auto" style={{ perspective: "1000px" }}>
        <motion.div 
          initial={{ opacity: 0, y: 100, rotateX: 15 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 relative"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 relative z-10">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-text-muted ml-2 uppercase tracking-widest">Name</label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 outline-none focus:border-accent-gold transition-colors duration-300"
                  placeholder="John Doe"
                />
              </div>

              {/* Email Input */}
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-text-muted ml-2 uppercase tracking-widest">Email</label>
                <input 
                  type="email" 
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 outline-none focus:border-accent-gold transition-colors duration-300"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-text-muted ml-2 uppercase tracking-widest">Message</label>
              <textarea 
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/20 outline-none focus:border-accent-gold transition-colors duration-300 resize-none"
                placeholder="Tell me about your project..."
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={status === "loading" || status === "success"}
              className="mt-4 w-full md:w-auto self-end bg-white text-black px-12 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:scale-105 transition-transform duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100"
            >
              {status === "idle" && <><Send className="w-4 h-4" /> Send Message</>}
              {status === "loading" && <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>}
              {status === "success" && <><CheckCircle className="w-4 h-4 text-green-600" /> Sent Successfully</>}
              {status === "error" && <><XCircle className="w-4 h-4 text-red-600" /> Error</>}
            </button>

          </form>
        </motion.div>
      </div>
    </section>
  );
}
