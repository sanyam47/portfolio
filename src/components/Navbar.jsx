import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", "about", "skills", "projects", "experience", "education", "contact"];
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -55% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-slate-950/70 backdrop-blur-xl border-b border-slate-900/80 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Animated Brand Logo */}
        <a href="#hero" className="relative z-50 flex items-center group">
          <span className="text-2xl font-black text-white tracking-widest group-hover:text-cyan-400 transition-colors duration-300">
            SANYAM
            <span className="text-cyan-400 group-hover:text-white transition-colors duration-300">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.slice(1);
            return (
              <li key={link.name} className="relative">
                <a
                  href={link.href}
                  className={`text-sm tracking-wider uppercase font-semibold transition-colors duration-300 hover:text-cyan-400 ${
                    isActive ? "text-cyan-400" : "text-slate-300"
                  }`}
                >
                  {link.name}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-cyan-400"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Action / Social Info */}
        <div className="hidden md:flex items-center gap-4 text-xl">
          <motion.a
            whileHover={{ y: -3, scale: 1.1 }}
            href="https://github.com/sanyam47"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-cyan-400 transition-colors duration-300"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            whileHover={{ y: -3, scale: 1.1 }}
            href="https://www.linkedin.com/in/sanyam-asopa-7b654731b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-300 hover:text-cyan-400 transition-colors duration-300"
          >
            <FaLinkedin />
          </motion.a>
        </div>

        {/* Mobile Hamburguer Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="text-slate-300 hover:text-cyan-400 focus:outline-none z-50 text-2xl"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-slate-950/98 z-40 flex flex-col justify-center px-8"
          >
            <ul className="flex flex-col gap-6 text-center">
              {navLinks.map((link, idx) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <a
                      onClick={() => setIsOpen(false)}
                      href={link.href}
                      className={`text-2xl tracking-wider uppercase font-black transition-colors duration-300 ${
                        isActive ? "text-cyan-400" : "text-white"
                      }`}
                    >
                      {link.name}
                    </a>
                  </motion.li>
                );
              })}
            </ul>

            <div className="flex justify-center gap-8 text-3xl mt-16">
              <a
                href="https://github.com/sanyam47"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors duration-300"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/sanyam-asopa-7b654731b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan-400 transition-colors duration-300"
              >
                <FaLinkedin />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;