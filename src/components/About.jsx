import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaMicrochip, FaBrain } from "react-icons/fa";

function About() {
  const cards = [
    {
      icon: <FaCode className="text-3xl text-cyan-400" />,
      title: "Full Stack Web",
      desc: "Building production-grade web systems. Architecting secure backends, RESTful APIs, responsive layouts, and robust databases using MERN and Java Spring Boot.",
      color: "from-cyan-500/20 to-blue-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.25)]",
      borderColor: "group-hover:border-cyan-500/50",
    },
    {
      icon: <FaMicrochip className="text-3xl text-indigo-400" />,
      title: "IoT & Electronics",
      desc: "Interfacing physical microcontrollers (ESP32, Arduino) with cloud servers. Developing automation, sensor readings, actuators, and telemetry systems.",
      color: "from-indigo-500/20 to-purple-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]",
      borderColor: "group-hover:border-indigo-500/50",
    },
    {
      icon: <FaBrain className="text-3xl text-emerald-400" />,
      title: "AI & Integrations",
      desc: "Injecting artificial intelligence models and automation features into standard applications. Utilizing API pipelines and local custom models.",
      color: "from-emerald-500/20 to-teal-500/10",
      glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]",
      borderColor: "group-hover:border-emerald-500/50",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="about"
      className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 overflow-hidden"
    >
      {/* Decorative Blur Bubble */}
      <div className="absolute right-0 top-1/4 w-80 h-80 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* Left Backstory Column */}
        <motion.div variants={itemVariants} className="lg:col-span-5 space-y-6">
          <div className="inline-block text-cyan-400 font-bold uppercase tracking-wider text-sm">
            / Who I Am
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Engineering Solutions at the Intersection of{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-indigo-400">
              Hardware &amp; Software
            </span>
          </h2>
          <p className="text-slate-400 leading-relaxed text-lg">
            I am a software designer and developer driven by curiosity. My skills
            bridge the gap between code running in cloud containers and code running
            directly on microcontrollers out in the physical field.
          </p>
          <p className="text-slate-400 leading-relaxed">
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
                className={`group relative flex flex-col md:flex-row gap-6 p-8 bg-gradient-to-r ${card.color} border border-slate-900 rounded-3xl backdrop-blur-xl transition-all duration-300 ${card.borderColor} ${card.glow}`}
              >
                <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-slate-950/80 border border-slate-800">
                  {card.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
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