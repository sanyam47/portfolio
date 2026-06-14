import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "../data/experience";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";

function Experience() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="experience"
      className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative bg-slate-950"
    >
      {/* Background elements */}
      <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-20 space-y-4">
        <div className="text-cyan-400 font-bold uppercase tracking-wider text-sm">
          / Professional Journey
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Work Experience
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          A log of my professional internships, contract roles, and freelance collaborations.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central Vertical Line Track */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 -translate-x-1/2" />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="space-y-12"
        >
          {experienceData.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className={`flex flex-col md:flex-row items-stretch relative ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Icon Node */}
                <div className="absolute left-8 md:left-1/2 w-10 h-10 rounded-full bg-slate-950 border-2 border-cyan-400 flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                  <FaBriefcase className="text-cyan-400 text-sm" />
                </div>

                {/* Left/Right Card Spacer */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                  <motion.div
                    whileHover={{ y: -5, borderColor: "rgba(34, 211, 238, 0.4)" }}
                    className="bg-slate-900/40 backdrop-blur-xl border border-slate-900 rounded-3xl p-8 space-y-4 relative shadow-lg"
                  >
                    {/* Badge Info */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-1 rounded-full border border-cyan-500/20">
                        {item.type}
                      </span>
                      <span className="text-slate-500 text-xs font-semibold flex items-center gap-1.5">
                        <FaCalendarAlt /> {item.duration}
                      </span>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white">
                        {item.role}
                      </h3>
                      <h4 className="text-sm font-semibold text-slate-400">
                        {item.company}
                      </h4>
                    </div>

                    {/* Job Description */}
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Empty Side block for desktop spacing */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Experience;
export const experience = [];