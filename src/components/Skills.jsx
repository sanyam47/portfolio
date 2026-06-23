import React from "react";
import { motion } from "framer-motion";
import { skillCategories } from "../data/skills";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaGithub,
  FaDatabase,
  FaBrain,
  FaServer,
  FaCode,
  FaPython,
  FaVolumeUp,
} from "react-icons/fa";
import { SiExpress, SiNextdotjs, SiFastapi, SiScikitlearn } from "react-icons/si";

// Map names to icons for visual completeness
const iconMap = {
  "JavaScript": <FaJs className="text-yellow-400" />,
  "Python": <FaPython className="text-blue-400" />,
  "React.js": <FaReact className="text-cyan-400" />,
  "Next.js": <SiNextdotjs className="text-white" />,
  "HTML & CSS": (
    <div className="flex gap-1">
      <FaHtml5 className="text-orange-500" />
      <FaCss3Alt className="text-blue-500" />
    </div>
  ),
  "Node.js": <FaNodeJs className="text-green-500" />,
  "Express.js": <SiExpress className="text-slate-350" />,
  "FastAPI": <SiFastapi className="text-emerald-400" />,
  "SQL": <FaDatabase className="text-sky-400" />,
  "SQLite": <FaDatabase className="text-sky-500" />,
  "Scikit-learn": <SiScikitlearn className="text-orange-400" />,
  "NLP Basics": <FaBrain className="text-pink-400" />,
  "Librosa (Audio)": <FaVolumeUp className="text-amber-400" />,
  "Git & GitHub": (
    <div className="flex gap-1">
      <FaGitAlt className="text-orange-600" />
      <FaGithub className="text-slate-200" />
    </div>
  ),
  "REST APIs": <FaServer className="text-indigo-400" />
};

function Skills({ isSlicingHalf = false }) {
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
      className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative overflow-hidden bg-[#0c0a09]"
    >
      {/* Decorative Glow */}
      <div className="absolute left-0 bottom-1/4 w-72 h-72 bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-20 space-y-4">
        <div className="text-amber-500 font-bold uppercase tracking-wider text-sm">
          / Abilities &amp; Tools
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Skills &amp; Technologies
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          A representation of the languages, tools, frameworks, and database architectures I have mastered.
        </p>
      </div>

      {/* Grid Categories */}
      <motion.div
        initial={isSlicingHalf ? "visible" : "hidden"}
        whileInView={isSlicingHalf ? "visible" : "visible"}
        viewport={{ once: false, margin: "-50px" }}
        variants={containerVariants}
        className="grid gap-8 md:grid-cols-2"
      >
        {skillCategories.map((category) => (
          <motion.div
            key={category.title}
            variants={cardVariants}
            className="bg-[#141210]/45 backdrop-blur-xl border border-zinc-900/60 rounded-3xl p-8 space-y-6 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
          >
            <h3 className="text-xl font-extrabold text-white border-b border-zinc-800 pb-3 tracking-wide">
              {category.title}
            </h3>

            <div className="space-y-5">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3 font-semibold text-zinc-350">
                      <div className="text-lg w-7 flex justify-start">
                        {iconMap[skill.name] || <FaCode className="text-amber-500" />}
                      </div>
                      <span>{skill.name}</span>
                    </div>
                    <span className="text-amber-500 font-mono font-bold">
                      {skill.level}%
                    </span>
                  </div>

                  {/* Level Progress Bar */}
                  <div className="w-full h-1.5 bg-zinc-950 rounded-full overflow-hidden relative">
                    {isSlicingHalf ? (
                      <div
                        className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      />
                    ) : (
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full"
                      />
                    )}
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