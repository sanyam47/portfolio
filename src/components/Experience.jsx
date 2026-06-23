import React from "react";
import { motion } from "framer-motion";
import { experienceData } from "../data/experience";
import { FaBriefcase, FaCalendarAlt } from "react-icons/fa";

function Experience({ isSlicingHalf = false }) {
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
      className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative bg-[#0c0a09]"
    >
      {/* Background elements */}
      <div className="absolute left-1/4 top-1/3 w-96 h-96 bg-amber-600/3 blur-[150px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-20 space-y-4">
        <div className="text-amber-500 font-bold uppercase tracking-wider text-sm">
          / Professional Journey
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Work Experience &amp; Projects
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          A log of my professional systems engineering roles, robotics work, and full stack developments.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative max-w-4xl mx-auto">
        {/* Central Vertical Line Track */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-zinc-800 -translate-x-1/2" />

        <motion.div
          initial={isSlicingHalf ? "visible" : "hidden"}
          whileInView={isSlicingHalf ? "visible" : "visible"}
          viewport={{ once: false, margin: "-100px" }}
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
                <div className="absolute left-8 md:left-1/2 w-10 h-10 rounded-full bg-[#0c0a09] border-2 border-amber-500 flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(245,158,11,0.25)]">
                  <FaBriefcase className="text-amber-500 text-sm" />
                </div>

                {/* Left/Right Card Spacer */}
                <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-8">
                  <motion.div
                    whileHover={{ y: -5, borderColor: "rgba(244, 63, 94, 0.35)" }}
                    className="bg-[#141210]/45 backdrop-blur-xl border border-zinc-900/60 rounded-3xl p-8 space-y-4 relative shadow-lg transition-colors duration-300"
                  >
                    {/* Badge Info */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-3 py-1 rounded-full border border-amber-500/20">
                        {item.type}
                      </span>
                      <span className="text-zinc-500 text-xs font-semibold flex items-center gap-1.5">
                        <FaCalendarAlt /> {item.duration}
                      </span>
                    </div>

                    {/* Job Details */}
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-white">
                        {item.role}
                      </h3>
                      <h4 className="text-sm font-semibold text-zinc-400">
                        {item.company}
                      </h4>
                    </div>

                    {/* Job Description */}
                    <p className="text-zinc-450 text-sm leading-relaxed">
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