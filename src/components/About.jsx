import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaMicrochip, FaBrain } from "react-icons/fa";

function About({ isSlicingHalf = false }) {
  const cards = [
    {
      icon: <FaCode className="text-3xl text-amber-500" />,
      title: "Full Stack Web",
      desc: "Building production-grade web systems. Architecting secure backends, RESTful APIs, responsive layouts, and robust databases using React, Next.js, and Node.js.",
      color: "from-amber-500/10 to-amber-500/5",
      glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
      borderColor: "group-hover:border-amber-500/40",
    },
    {
      icon: <FaMicrochip className="text-3xl text-amber-500" />,
      title: "IoT & Robotics",
      desc: "Interfacing physical microcontrollers (Arduino, ESP32) with cloud servers. Developing automation, actuators, and hardware control structures.",
      color: "from-amber-500/10 to-amber-500/5",
      glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
      borderColor: "group-hover:border-amber-500/40",
    },
    {
      icon: <FaBrain className="text-3xl text-amber-500" />,
      title: "AI Integration",
      desc: "Injecting artificial intelligence models and NLP features into standard applications. Utilizing API pipelines and local vector retrieval (RAG) models.",
      color: "from-amber-600/10 to-amber-600/5",
      glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]",
      borderColor: "group-hover:border-amber-600/40",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 overflow-hidden bg-[#0c0a09]"
    >
      {/* Decorative Blur Bubble */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-amber-600/5 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial={isSlicingHalf ? "visible" : "hidden"}
        whileInView={isSlicingHalf ? "visible" : "visible"}
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
        className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* Left Backstory Column */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
          <div className="inline-block text-amber-500 font-bold uppercase tracking-wider text-sm">
            / Who I Am
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Engineering Solutions at the Intersection of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-red-500 to-amber-600">
              Hardware &amp; Software
            </span>
          </h2>
          <p className="text-zinc-400 leading-relaxed text-lg">
            I am a software engineer and developer driven by curiosity. My skills
            bridge the gap between code running in cloud containers and code running
            directly on microcontrollers out in the physical field.
          </p>
          <p className="text-zinc-400 leading-relaxed">
            Whether it's configuring a full-stack database engine, deploying a secure
            user portal, setting up automated sensor arrays, or implementing pathing controls
            for robotic agricultural cars, I prioritize code cleanliness, efficiency, and exceptional user experience.
          </p>
        </motion.div>

        {/* Right Pillars Column */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 grid gap-6 sm:grid-cols-1 md:grid-cols-1"
        >
          <div className="space-y-6">
            {cards.map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6, scale: 1.01 }}
                className={`group relative flex flex-col md:flex-row gap-6 p-8 bg-gradient-to-r ${card.color} border border-zinc-900/60 rounded-3xl backdrop-blur-xl transition-all duration-300 ${card.borderColor} ${card.glow}`}
              >
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-zinc-950/80 border border-zinc-900/85">
                  {card.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default About;