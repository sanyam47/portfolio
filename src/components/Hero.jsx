import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import CountUp from "react-countup";
import { FaDownload, FaArrowRight } from "react-icons/fa";

const CountUpComponent =
  typeof CountUp === "function" || (typeof CountUp === "object" && CountUp.$$typeof)
    ? CountUp
    : (CountUp.default || CountUp);

function Hero({ onPageChange }) {
  const stats = [
    { value: 2, suffix: "+", label: "Years of Coding" },
    { value: 10, suffix: "+", label: "Projects Completed" },
    { value: 15, suffix: "+", label: "Tech Stack Skills" },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0c0a09] px-6 py-24 md:py-32"
    >
      {/* Background Animated Gradient Mesh - Red and Dark Rose Glows */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-amber-600/15 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.08, 0.18, 0.08],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-700/10 blur-[120px] rounded-full"
        />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        {/* Left Info Column */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col text-left space-y-6"
        >
          {/* Label with Glow */}
          <div className="inline-flex items-center gap-2 bg-amber-950/20 border border-amber-500/20 px-4 py-2 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-amber-400 text-xs md:text-sm font-semibold tracking-wider uppercase">
              Full Stack Developer &amp; AI Specialist
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white">
            Hi, I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-red-500 to-amber-600">
              Sanyam Asopa
            </span>
          </h1>

          {/* Typing Loop */}
          <div className="text-xl md:text-3xl font-bold text-zinc-300 min-h-[40px]">
            <span>I build </span>
            <span className="text-amber-500 font-extrabold border-b-2 border-amber-500 pb-1">
              <TypeAnimation
                sequence={[
                  "autonomous AI agents",
                  2000,
                  "local LLM systems",
                  2000,
                  "scalable web backends",
                  2000,
                  "smart IoT hardware",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </span>
          </div>

          {/* Bio text */}
          <p className="text-zinc-400 text-base md:text-lg leading-relaxed max-w-xl">
            Passionate software engineer building cross-disciplinary solutions. 
            From MERN Stack systems and enterprise FastAPI backends, to automated IoT smart 
            hardware and local AI model deployments.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-2">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#projects"
              onClick={(e) => { e.preventDefault(); onPageChange && onPageChange("projects"); }}
              className="group flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-600 hover:from-amber-700 hover:to-amber-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-amber-600/10 transition-all duration-300"
            >
              View My Work
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.03, backgroundColor: "rgba(244, 63, 94, 0.05)" }}
              whileTap={{ scale: 0.98 }}
              href="/Sanyam's Resume.pdf"
              download
              className="flex items-center gap-2 border border-amber-500/20 text-amber-500 font-bold px-8 py-4 rounded-xl transition-all duration-300"
            >
              Download CV <FaDownload className="text-sm" />
            </motion.a>
          </div>

          {/* Mobile swipe hint — hidden on desktop where katana handles navigation */}
          <div className="flex md:hidden items-center gap-2 text-zinc-600 text-xs animate-bounce mt-2">
            <span>↑</span>
            <span className="tracking-widest uppercase font-semibold">Swipe up to explore</span>
            <span>↑</span>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-4 border-t border-zinc-900/60 pt-8 mt-4">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col">
                <span className="text-3xl md:text-4xl font-extrabold text-white">
                  <CountUpComponent end={stat.value} duration={3} />
                  <span className="text-amber-500">{stat.suffix}</span>
                </span>
                <span className="text-zinc-500 text-xs md:text-sm tracking-wide mt-1 uppercase font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right Graphic Column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex justify-center items-center relative"
        >
          {/* Orbital glowing ring - Red */}
          <div className="absolute w-[360px] h-[360px] md:w-[460px] md:h-[460px] border border-amber-500/10 rounded-full animate-[spin_20s_linear_infinite]" />
          <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] border border-dashed border-zinc-900 rounded-full animate-[spin_45s_linear_infinite_reverse]" />

          {/* Decorative floating profile */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            {/* Glowing Red Backdrop behind image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-600 to-amber-600 rounded-full blur-3xl opacity-30 animate-pulse scale-90" />

            {/* Main Avatar Profile Image */}
            <img
              src="/images/WhatsApp Image 2026-06-13 at 10.30.19 PM.jpeg"
              alt="Sanyam Asopa"
              className="relative w-72 h-72 md:w-85 md:h-85 rounded-full object-cover border-4 border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.25)] z-10 transition-transform duration-500 hover:scale-105"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;