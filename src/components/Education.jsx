import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaAward, FaCalendarAlt, FaUniversity } from "react-icons/fa";

function Education() {
  const academicData = [
  {
    degree: "Bachelor of Technology in Computer Science & Engineering",
    institution: "Jodhpur Institute of Engineering & Technology (JIET)",
    duration: "2024 - 2028",
    score: "8.49 CGPA",
    details: "Specialized in Artificial Intelligence, Full Stack Development, Internet of Things (IoT), and Software Engineering. Active participant in hackathons, technical competitions, and innovative project development.",
  },
];

  const certificationsData = [
  {
    title: "Web Application Development Intern",
    issuer: "Anand Rathi",
    date: "2026",
  },
  {
    title: "Winner - IT Model Making Competition",
    issuer: "JIET",
    date: "2026",
  },
  {
    title: "Selected for Offline Round - RECKON 7.0 Hackathon",
    issuer: "RECKON 7.0",
    date: "2026",
  },
  {
    title: "Finalist - Sabka AI Hackathon",
    issuer: "Sabka AI",
    date: "2026",
  },
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
      className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative bg-slate-950"
    >
      {/* Background Glow */}
      <div className="absolute right-1/4 bottom-1/4 w-80 h-80 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-20 space-y-4">
        <div className="text-cyan-400 font-bold uppercase tracking-wider text-sm">
          / Learning &amp; Credentials
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          Education &amp; Certifications
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto">
          My academic foundation and professional technical certifications that back my knowledge.
        </p>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="grid lg:grid-cols-12 gap-12 items-start"
      >
        {/* Left Column: Academic Qualifications */}
        <div className="lg:col-span-7 space-y-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <FaGraduationCap className="text-cyan-400" /> Academic Qualifications
          </h3>

          <div className="space-y-6">
            {academicData.map((edu, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ y: -4, borderColor: "rgba(34, 211, 238, 0.3)" }}
                className="bg-slate-900/40 backdrop-blur-xl border border-slate-900 rounded-3xl p-8 space-y-4 shadow-md transition-all duration-300"
              >
                <div className="flex flex-wrap justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="text-lg font-bold text-white leading-tight">
                      {edu.degree}
                    </h4>
                    <p className="text-slate-400 text-sm font-semibold flex items-center gap-2">
                      <FaUniversity className="text-cyan-500/80" /> {edu.institution}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1.5">
                    <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                      <FaCalendarAlt /> {edu.duration}
                    </span>
                    <span className="bg-cyan-500/10 text-cyan-400 text-xs font-bold px-3 py-0.5 rounded-full border border-cyan-500/20">
                      {edu.score}
                    </span>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {edu.details}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Certifications */}
        <div className="lg:col-span-5 space-y-8">
          <h3 className="text-2xl font-bold text-white flex items-center gap-3">
            <FaAward className="text-cyan-400" /> Technical Certifications
          </h3>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {certificationsData.map((cert, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                whileHover={{ scale: 1.02, borderColor: "rgba(34, 211, 238, 0.3)" }}
                className="bg-slate-900/40 backdrop-blur-xl border border-slate-900 rounded-2xl p-6 flex items-start gap-4 shadow-sm transition-all duration-300"
              >
                <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl text-cyan-400 flex-shrink-0">
                  <FaAward />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-white text-sm md:text-base leading-tight">
                    {cert.title}
                  </h4>
                  <div className="flex justify-between items-center text-xs text-slate-500 font-semibold gap-4">
                    <span>{cert.issuer}</span>
                    <span>{cert.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Education;