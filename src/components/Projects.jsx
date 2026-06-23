import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projectCategories, projectsData } from "../data/projects";
import { FaGithub, FaExternalLinkAlt, FaTimes, FaCog, FaToolbox, FaBrain, FaGlobe, FaMicrochip } from "react-icons/fa";

// Category-based dynamic graphic placeholders
function ProjectPlaceholder({ category, isModal }) {
  let icon = <FaToolbox className={`${isModal ? "text-5xl" : "text-4xl"} text-amber-500/40 mb-2 transition-transform duration-500 group-hover:scale-110`} />;
  let tagText = "System Integration";
  let gradient = "from-amber-950/40 to-zinc-950/90";

  if (category === "AI & ML") {
    icon = <FaBrain className={`${isModal ? "text-5xl" : "text-4xl"} text-amber-500/40 mb-2 transition-transform duration-500 group-hover:scale-110`} />;
    tagText = "AI & Machine Learning";
    gradient = "from-amber-950/30 via-zinc-900/50 to-zinc-950/90";
  } else if (category === "Robotics & IoT") {
    icon = <FaMicrochip className={`${isModal ? "text-5xl" : "text-4xl"} text-amber-500/40 mb-2 transition-transform duration-500 group-hover:scale-110`} />;
    tagText = "Robotics & Hardware Systems";
    gradient = "from-amber-950/30 via-zinc-900/50 to-zinc-950/90";
  } else if (category === "Web Apps") {
    icon = <FaGlobe className={`${isModal ? "text-5xl" : "text-4xl"} text-amber-500/40 mb-2 transition-transform duration-500 group-hover:scale-110`} />;
    tagText = "Web Application Core";
    gradient = "from-zinc-900 via-amber-950/15 to-zinc-950/95";
  }

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex flex-col items-center justify-center relative ${isModal ? "border-b border-zinc-900" : ""}`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.06),transparent_60%)]" />
      {icon}
      <span className={`${isModal ? "text-xs" : "text-[9.5px]"} text-amber-500/60 uppercase tracking-[0.2em] font-black`}>{tagText}</span>
    </div>
  );
}

// Sub-component featuring a premium 3D Parallax Tilt hover effect
function ProjectCard({ project, setActiveProject }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const centerX = box.width / 2;
    const centerY = box.height / 2;

    // Maximum 8 degrees of rotation for subtle, premium tilt
    const rotateX = ((centerY - y) / centerY) * 8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setTilt({ x: rotateY, y: rotateX });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale3d(1.015, 1.015, 1.015)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: isHovered ? "none" : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
        transformStyle: "preserve-3d",
      }}
      className="flex flex-col bg-[#141210]/45 border border-zinc-900/60 rounded-3xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.3)] group cursor-pointer"
      onClick={() => setActiveProject(project)}
    >
      {/* Image Container with Overlay */}
      <div 
        style={{ transform: isHovered ? "translateZ(15px)" : "translateZ(0px)", transition: isHovered ? "none" : "transform 0.5s ease" }}
        className="h-64 relative overflow-hidden bg-zinc-950 border-b border-zinc-900/40"
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <ProjectPlaceholder category={project.category} isModal={false} />
        )}
        <div className="absolute inset-0 bg-zinc-950/85 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-4 transition-opacity duration-300">
          <button
            className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-transform duration-300 hover:scale-105"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div 
        style={{ transform: isHovered ? "translateZ(25px)" : "translateZ(0px)", transition: isHovered ? "none" : "transform 0.5s ease" }}
        className="p-8 flex flex-col flex-grow justify-between"
      >
        <div className="space-y-4">
          <span className="text-amber-400 text-xs font-semibold tracking-widest uppercase">
            {project.category}
          </span>
          <h3 className="text-2xl font-bold text-white group-hover:text-amber-500 transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {project.shortDesc}
          </p>
        </div>

        {/* Tech Tags */}
        <div className="mt-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((item) => (
              <span
                key={item}
                className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold"
              >
                {item}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <button
              className="text-amber-500 hover:text-white font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 transition-colors"
            >
              Details ➔
            </button>
            <a
              href={project.codeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-zinc-400 hover:text-amber-500 transition-colors flex items-center gap-1"
            >
              <FaGithub /> <span className="text-xs">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((project) => project.category === selectedCategory);

  return (
    <section
      id="projects"
      className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative bg-[#0c0a09]"
    >
      {/* Decorative Glow */}
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-16 space-y-4">
        <div className="text-amber-500 font-bold uppercase tracking-wider text-sm">
          / My Showcase
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Featured Projects
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
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
                ? "bg-amber-600 text-white border-amber-500 font-bold shadow-[0_0_20px_rgba(245,158,11,0.2)]"
                : "bg-zinc-900/40 text-zinc-400 border-zinc-900/60 hover:text-white hover:border-zinc-800"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div
        layout
        className="grid md:grid-cols-2 gap-8 items-stretch"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              setActiveProject={setActiveProject}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative animate-in fade-in duration-300"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-6 right-6 z-50 text-zinc-400 hover:text-white bg-zinc-950/60 p-3 rounded-full hover:scale-105 transition"
              >
                <FaTimes />
              </button>

              {/* Graphic Banner */}
              <div className="h-64 sm:h-80 w-full relative bg-zinc-950">
                {activeProject.image ? (
                  <img
                    src={activeProject.image}
                    alt={activeProject.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ProjectPlaceholder category={activeProject.category} isModal={true} />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent" />
                <div className="absolute bottom-6 left-8">
                  <span className="bg-amber-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    {activeProject.category}
                  </span>
                  <h3 className="text-3xl md:text-4xl font-black text-white mt-2">
                    {activeProject.title}
                  </h3>
                </div>
              </div>

              {/* Content Panels */}
              <div className="p-8 md:p-10 space-y-8 max-h-[50vh] overflow-y-auto custom-scrollbar project-modal-scrollable">
                {/* Description */}
                <div className="space-y-3">
                  <h4 className="text-lg font-bold text-white flex items-center gap-2">
                    <FaToolbox className="text-amber-500" /> Project Overview
                  </h4>
                  <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                    {activeProject.desc}
                  </p>
                </div>

                {/* System Architecture */}
                {activeProject.architecture && (
                  <div className="space-y-3 bg-zinc-950/45 border border-zinc-900/60 p-5 rounded-2xl">
                    <h4 className="text-sm font-black uppercase tracking-widest text-amber-400 flex items-center gap-2">
                      <FaCog className="animate-[spin_4s_linear_infinite]" /> System Architecture Flow
                    </h4>
                    <p className="text-zinc-300 font-mono text-xs md:text-sm leading-relaxed">
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
                    <p className="text-zinc-300 text-sm leading-relaxed">
                      {activeProject.challenges}
                    </p>
                  </div>
                )}

                {/* Tools & Tech Tag Array */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-widest text-zinc-500">
                    Built With
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProject.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3.5 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer Controls */}
              <div className="p-6 bg-zinc-950/80 border-t border-zinc-800/60 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-4">
                  <a
                    href={activeProject.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300"
                  >
                    <FaGithub /> Source Code
                  </a>
                  {activeProject.liveLink && activeProject.liveLink !== "#" && (
                    <a
                      href={activeProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-600 hover:from-amber-700 hover:to-amber-700 text-white px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 shadow-md shadow-amber-950/20"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setActiveProject(null)}
                  className="text-zinc-400 hover:text-white font-bold text-sm tracking-wider uppercase py-2 px-4"
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