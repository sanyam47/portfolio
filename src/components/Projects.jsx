import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectCategories, projectsData } from "../data/projects";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCog, FaToolbox } from "react-icons/fa";

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  // Filter projects by category
  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === selectedCategory);

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative bg-slate-950"
    >
      {/* Decorative Glow */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="text-cyan-400 font-bold uppercase tracking-wider text-sm">
          / My Showcase
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Featured Projects
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Explore a showcase of custom-designed hardware solutions, smart devices, and complex web applications.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {projectCategories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide uppercase border transition-all duration-300 ${
              selectedCategory === category
                ? "bg-cyan-500 text-slate-950 border-cyan-400 font-bold shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                : "bg-slate-900/40 text-slate-400 border-slate-900 hover:text-white hover:border-slate-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid Container with Layout Animation */}
      <motion.div
        layout
        className="grid md:grid-cols-2 gap-8 items-stretch"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -8 }}
              className="flex flex-col bg-slate-900/40 border border-slate-900 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)] group"
            >
              {/* Project Showcase Panel */}
<div className="h-64 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border-b border-slate-800">

  {/* Watermark Title */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <h2 className="text-5xl md:text-6xl font-black uppercase text-white/[0.04] text-center px-6 leading-none">
      {project.title.split("–")[0]}
    </h2>
  </div>

  <div className="relative z-10 h-full flex flex-col items-center justify-center px-8">

    <h3 className="text-xl font-bold text-white text-center mb-6">
      {project.title.split("–")[0]}
    </h3>

    <div className="space-y-3 mb-6">
      {(project.features || []).map((feature) => (
        <div
          key={feature}
          className="flex items-center justify-center gap-2 text-sm text-slate-300"
        >
          <span className="text-cyan-400 font-bold">✓</span>
          <span>{feature}</span>
        </div>
      ))}
    </div>

    <div className="flex flex-wrap justify-center gap-2">
      {project.tech.slice(0, 4).map((tech) => (
        <span
          key={tech}
          className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold"
        >
          {tech}
        </span>
      ))}
    </div>

  </div>
</div>

              {/* Card Body */}
              <div className="p-8 flex flex-col flex-grow justify-between">
                <div className="space-y-4">
                  <span className="text-cyan-400 text-xs font-semibold tracking-widest uppercase">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {project.shortDesc}
                  </p>
                </div>

                {/* Tech Tags */}
                <div className="mt-6">
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-semibold"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setActiveProject(project)}
                      className="text-cyan-400 hover:text-white font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 transition-colors"
                    >
                      Details ➔
                    </button>
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-cyan-400 transition-colors flex items-center gap-1"
                    >
                      <FaGithub /> <span className="text-xs">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Interactive Project Details Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md overflow-y-auto"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 z-50 text-slate-400 hover:text-white bg-slate-950/60 p-3 rounded-full hover:scale-105 transition"
              >
                <FaTimes />
              </button>

              {/* Graphic Banner */}
              <div className="h-64 sm:h-80 w-full relative">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <span className="bg-cyan-500 text-slate-950 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {activeProject.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white mt-2">
                    {activeProject.title}
                  </h3>
                </div>
              </div>

              {/* Content Panels */}
              <div className="p-8 md:p-10 space-y-8 max-h-[50vh] overflow-y-auto custom-scrollbar">
                {/* Description */}
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <FaToolbox className="text-cyan-400" /> Project Overview
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                    {activeProject.desc}
                  </p>
                </div>

                {/* System Architecture */}
                {activeProject.architecture && (
                  <div className="space-y-3 bg-slate-950/40 border border-slate-900 p-5 rounded-2xl">
                    <h4 className="text-sm font-black uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                      <FaCog className="animate-[spin_4s_linear_infinite]" /> System Architecture Flow
                    </h4>
                    <p className="text-slate-300 font-mono text-xs md:text-sm leading-relaxed">
                      {activeProject.architecture}
                    </p>
                  </div>
                )}

                {/* Challenges & Solutions */}
                {activeProject.challenges && (
                  <div className="space-y-3">
                    <h4 className="text-lg font-bold text-white flex items-center gap-2">
                      💡 Technical Challenges &amp; Solutions
                    </h4>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {activeProject.challenges}
                    </p>
                  </div>
                )}

                {/* Tools & Tech Tag Array */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">
                    Built With
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-6 bg-slate-950/80 border-t border-slate-800/60 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-4">
                  <a
                    href={activeProject.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white border border-slate-800 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300"
                  >
                    <FaGithub /> Source Code
                  </a>
                  {activeProject.liveLink && activeProject.liveLink !== "#" && (
                    <a
                      href={activeProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-600 hover:to-indigo-600 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-md shadow-cyan-500/10"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setActiveProject(null)}
                  className="text-slate-400 hover:text-white font-bold text-sm tracking-wider uppercase py-2 px-4"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;