import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";

function Footer() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }

      // Show/hide back to top button
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // SVG parameters for progress circle
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <footer className="border-t border-slate-900 bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo / Branding */}
        <div className="flex items-center gap-1">
          <span className="text-xl font-black text-white tracking-widest">
            SANYAM<span className="text-cyan-400">.</span>
          </span>
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm">
          <a href="#about" className="text-slate-400 hover:text-cyan-400 transition-colors">
            About
          </a>
          <a href="#skills" className="text-slate-400 hover:text-cyan-400 transition-colors">
            Skills
          </a>
          <a href="#projects" className="text-slate-400 hover:text-cyan-400 transition-colors">
            Projects
          </a>
          <a href="#experience" className="text-slate-400 hover:text-cyan-400 transition-colors">
            Experience
          </a>
          <a href="#contact" className="text-slate-400 hover:text-cyan-400 transition-colors">
            Contact
          </a>
        </div>

        {/* Social Icons & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex gap-4 text-lg">
            <a
              href="https://github.com/sanyam47"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/sanyam-asopa-7b654731b"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>
          <p className="text-xs text-slate-500">
            &copy; {new Date().getFullYear()} Sanyam Asopa. All rights reserved.
          </p>
        </div>
      </div>

      {/* Floating Animated Scroll-to-Top Widget with SVG Progress Ring */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 shadow-[0_0_20px_rgba(0,0,0,0.5)] cursor-pointer focus:outline-none hover:text-white group"
          >
            {/* SVG Circle indicator */}
            <svg className="absolute w-full h-full transform -rotate-90">
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-slate-850"
                strokeWidth="2.5"
                fill="transparent"
              />
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="stroke-cyan-400 transition-all duration-100"
                strokeWidth="2.5"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <FaArrowUp className="relative z-10 text-sm group-hover:-translate-y-0.5 transition-transform duration-300" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}

export default Footer;