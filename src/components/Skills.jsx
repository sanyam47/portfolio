import React from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../data/skills";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaJava,
  FaGitAlt,
  FaGithub,
  FaDatabase,
  FaMicrochip,
  FaBrain,
  FaServer,
  FaCode,
} from "react-icons/fa";
import { SiSpringboot, SiTailwindcss, SiExpress, SiMongodb } from "react-icons/si";

// Map names to icons for visual completeness
const iconMap = {
  "React.js": <FaReact className="text-cyan-400" />,
  "Tailwind CSS": <SiTailwindcss className="text-cyan-400" />,
  "JavaScript (ES6+)": <FaJs className="text-yellow-400" />,
  "HTML5 & CSS3": (
    <div className="flex gap-1">
      <FaHtml5 className="text-orange-500" />
      <FaCss3Alt className="text-blue-500" />
    </div>
  ),
  "Framer Motion": <FaBrain className="text-pink-400" />,
  "Node.js & Express": (
    <div className="flex gap-1.5">
      <FaNodeJs className="text-green-500" />
      <SiExpress className="text-slate-300" />
    </div>
  ),
  "Java & Spring Boot": (
    <div className="flex gap-1.5">
      <FaJava className="text-red-500" />
      <SiSpringboot className="text-emerald-500" />
    </div>
  ),
  "MongoDB": <SiMongodb className="text-green-500" />,
  "MySQL": <FaDatabase className="text-sky-400" />,
  "RESTful APIs": <FaServer className="text-indigo-400" />,
  "Arduino & ESP32": <FaMicrochip className="text-emerald-400" />,
  "Sensors & Automation": <FaMicrochip className="text-teal-400" />,
  "IoT Protocols & MQTT": <FaServer className="text-amber-500" />,
  "Embedded Systems": <FaMicrochip className="text-indigo-500" />,
  "Git & GitHub": (
    <div className="flex gap-1">
      <FaGitAlt className="text-orange-600" />
      <FaGithub className="text-slate-200" />
    </div>
  ),
  "VS Code": <FaCode className="text-blue-500" />,
  "AI API Integration": <FaBrain className="text-purple-400" />,
  "System Design": <FaServer className="text-slate-400" />,
};

function Skills() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="skills"
      className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative overflow-hidden bg-slate-950"
    >
      {/* Decorative Glow */}
      <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-20 space-y-4">
        <div className="text-cyan-400 font-bold uppercase tracking-wider text-sm">
          / Abilities &amp; Tools
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Skills &amp; Technologies
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A representation of the languages, tools, frameworks, and hardware architectures I have mastered.
        </p>
      </div>

      {/* Grid Categories */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="grid gap-8 md:grid-cols-2"
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            variants={cardVariants}
            className="bg-slate-900/40 backdrop-blur-xl border border-slate-900 rounded-3xl p-8 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.2)]"
          >
            <h3 className="text-xl font-extrabold text-white border-b border-slate-800 pb-3 tracking-wide">
              {category.title}
            </h3>

            <div className="space-y-5">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3 font-semibold text-slate-300">
                      <div className="text-lg w-7 flex justify-start">
                        {iconMap[skill.name] || <FaCode className="text-cyan-400" />}
                      </div>
                      <span>{skill.name}</span>
                    </div>
                    <span className="text-cyan-400 font-mono font-bold">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Level Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}

export default Skills;