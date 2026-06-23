import React, { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

function Navbar({ activePage, onPageChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Experience", id: "experience" },
    { name: "Education", id: "education" },
    { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    onPageChange(id);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled || activePage !== "hero"
          ? "bg-[#0c0a09]/80 backdrop-blur-xl border-b border-zinc-900/60 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Animated Brand Logo */}
        <a
          href="#hero"
          onClick={(e) => handleLinkClick(e, "hero")}
          className="relative z-50 flex items-center group"
        >
          <span className="text-2xl font-black text-white tracking-widest group-hover:text-amber-500 transition-colors duration-300">
            SANYAM
            <span className="text-amber-500 group-hover:text-white transition-colors duration-300">.</span>
          </span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <li key={link.name} className="relative">
                <a
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`text-sm tracking-wider uppercase font-semibold transition-colors duration-300 hover:text-amber-500 ${
                    isActive ? "text-amber-500" : "text-zinc-400"
                  }`}
                >
                  {link.name}
                </a>
                {isActive && (
                  <motion.div
                    layoutId="activeUnderline"
                    className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 to-amber-600 shadow-[0_1px_8px_rgba(245,158,11,0.4)]"
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
            className="text-zinc-400 hover:text-amber-500 transition-colors duration-300"
          >
            <FaGithub />
          </motion.a>
          <motion.a
            whileHover={{ y: -3, scale: 1.1 }}
            href="https://www.linkedin.com/in/sanyam-asopa-7b654731b"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-amber-500 transition-colors duration-300"
          >
            <FaLinkedin />
          </motion.a>
        </div>

        {/* Mobile Hamburguer Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="text-zinc-400 hover:text-amber-500 focus:outline-none z-50 text-2xl"
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
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#0c0a09]/98 z-40 flex flex-col justify-center px-8"
          >
            <ul className="flex flex-col gap-6 text-center">
              {navLinks.map((link, idx) => {
                const isActive = activePage === link.id;
                return (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <a
                      onClick={(e) => handleLinkClick(e, link.id)}
                      href={`#${link.id}`}
                      className={`text-2xl tracking-wider uppercase font-black transition-colors duration-300 ${
                        isActive ? "text-amber-500" : "text-white"
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
                className="text-white hover:text-amber-500 transition-colors duration-300"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/sanyam-asopa-7b654731b"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-amber-500 transition-colors duration-300"
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