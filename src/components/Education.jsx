import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaCalendarAlt, FaUniversity, FaTrophy, FaMedal } from "react-icons/fa";

function Education({ isSlicingHalf = false }) {
  const academicData = [
    {
      degree: "B. Tech (Bachelor of Technology): Computer Science Engineering (CSE)",
      institution: "Jodhpur Institute of Engineering And Technology (JIET)",
      duration: "09/2024 - Present",
      score: "Active Student",
      details: "Focusing on AI-powered applications, software engineering, and database systems. Engaging in coding hackathons, technical models creation, and physical IoT deployments.",
    },
  ];

  const accomplishmentsData = [
    {
      title: "Selected for Offline Round - RECKON 7.0 Hackathon",
      detail: "Led the development team as Team Lead, designing real-time AI solutions under high-pressure parameters.",
      icon: <FaTrophy className="text-yellow-500" />
    },
    {
      title: "Finalist - Sabka AI Hackathon 2026",
      detail: "Team Lead for our AI project submission, managing timelines, ML models integration, and presentation pitches.",
      icon: <FaMedal className="text-amber-400" />
    },
    {
      title: "Winner - IT Model Making Competition, JIET",
      detail: "Awarded for designing and engineering a fully functional IT/Robotics model demonstration.",
      icon: <FaTrophy className="text-yellow-500" />
    },
    {
      title: "Rank 183 - Unstop Engineering Quiz",
      detail: "Achieved a national-level high ranking among thousands of engineering applicants in logical coding assessments.",
      icon: <FaMedal className="text-amber-400" />
    }
  ];



  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
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
      id="education"
      className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative bg-[#0c0a09]"
    >
      {/* Background Glow */}
      <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-amber-600/3 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-20 space-y-4">
        <div className="text-amber-500 font-bold uppercase tracking-wider text-sm">
          / Learning &amp; Credentials
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Education &amp; Accomplishments
        </h2>
        <p className="text-zinc-400 max-w-2xl mx-auto">
          My academic foundation, hackathon achievements, and technical credentials.
        </p>
      </div>

      <motion.div
        initial={isSlicingHalf ? "visible" : "hidden"}
        whileInView={isSlicingHalf ? "visible" : "visible"}
        viewport={{ once: false, margin: "-100px" }}
        variants={containerVariants}
        className="grid lg:grid-cols-12 gap-12 items-start"
      >
        {/* Left Column: Academic Qualifications */}
        <div className="lg:col-span-7 space-y-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <FaGraduationCap className="text-amber-500" /> Academic Qualifications
          </h3>

          <div className="space-y-6">
            {academicData.map((edu, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4, borderColor: "rgba(244, 63, 94, 0.3)" }}
                className="bg-[#141210]/45 backdrop-blur-xl border border-zinc-900/60 rounded-3xl p-8 space-y-4 shadow-md transition-all duration-300"
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white leading-tight">
                      {edu.degree}
                    </h4>
                    <p className="text-zinc-400 text-sm font-semibold flex items-center gap-2">
                      <FaUniversity className="text-amber-500/80" /> {edu.institution}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-xs font-semibold text-zinc-500 flex items-center gap-1">
                      <FaCalendarAlt /> {edu.duration}
                    </span>
                    <span className="bg-amber-500/10 text-amber-455 text-xs font-bold px-3 py-0.5 rounded-full border border-amber-500/20">
                      {edu.score}
                    </span>
                  </div>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {edu.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Achievements & Certifications */}
        <div className="lg:col-span-5 space-y-8">
          {/* Accomplishments Section */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3">
              <FaTrophy className="text-amber-500" /> Key Accomplishments
            </h3>

            <div className="grid gap-4">
              {accomplishmentsData.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, borderColor: "rgba(244, 63, 94, 0.3)" }}
                  className="bg-[#141210]/45 backdrop-blur-xl border border-zinc-900/60 rounded-2xl p-5 flex items-start gap-4 shadow-sm transition-all duration-300"
                >
                  <div className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl flex-shrink-0 text-lg">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-sm md:text-base leading-tight">
                      {item.title}
                    </h4>
                    <p className="text-zinc-450 text-xs leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>


        </div>
      </motion.div>
    </section>
  );
}

export default Education;