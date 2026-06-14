import { motion } from "framer-motion";

function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950"
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing Ambient Backdrop */}
        <div className="absolute w-64 h-64 bg-cyan-500/25 rounded-full blur-3xl" />

        {/* Animated Drawing Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative text-5xl md:text-6xl font-black tracking-widest text-white z-10"
        >
          SANYAM
          <motion.span
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: [0, 1.5, 1] }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-cyan-400 inline-block ml-1"
          >
            .
          </motion.span>
        </motion.div>

        {/* Modern Progress Line */}
        <div className="w-48 h-[2px] bg-slate-800 rounded-full mt-6 overflow-hidden relative z-10">
          <motion.div
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
            }}
            className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          />
        </div>

        {/* Loading text subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.4 }}
          className="text-slate-400 text-xs tracking-widest uppercase mt-4 z-10"
        >
          Initializing Portfolio
        </motion.p>
      </div>
    </motion.div>
  );
}

export default Loader;
