import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Defined outside component so it's a stable reference (prevents infinite re-renders)
const DOTS = [
  { id: 1, pos: 15 },
  { id: 2, pos: 29 },
  { id: 3, pos: 43 },
  { id: 4, pos: 57 },
  { id: 5, pos: 71 },
  { id: 6, pos: 85 },
];

function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  
  const audioCtxRef = useRef(null);
  const eatenDotsRef = useRef(new Set());

  // Initialize browser AudioContext
  const initAudio = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    } catch (e) {
      console.warn("AudioContext initialization failed", e);
    }
  };

  // Play retro Pacman chomp ("waka") sound using oscillator frequency sweep
  const playChompSound = () => {
    initAudio(); // Try to resume context
    const ctx = audioCtxRef.current;
    // Only schedule if context is active to prevent overlapping queue-bursts
    if (!ctx || ctx.state !== "running") return;

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.type = "triangle"; // Classic retro triangle wave
    const now = ctx.currentTime;

    // Fast frequency sweep up and down
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.exponentialRampToValueAtTime(550, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(250, now + 0.16);

    // Amplitude envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.02);
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.14);
    gainNode.gain.linearRampToValueAtTime(0, now + 0.16);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.16);
  };

  // Play retro victory fanfare (C5 -> E5 -> G5 -> C6 arpeggio)
  const playVictorySound = () => {
    initAudio(); // Try to resume context
    const ctx = audioCtxRef.current;
    if (!ctx || ctx.state !== "running") return;

    const now = ctx.currentTime;

    const playNote = (freq, startTime, duration) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "square"; // Square wave for high-pitched retro victory beep
      osc.frequency.setValueAtTime(freq, startTime);

      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.02);
      gainNode.gain.linearRampToValueAtTime(0.2, startTime + duration - 0.02);
      gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    playNote(523.25, now, 0.08);        // C5
    playNote(659.25, now + 0.08, 0.08); // E5
    playNote(783.99, now + 0.16, 0.08); // G5
    playNote(1046.50, now + 0.24, 0.25); // C6
  };

  // Autoplay attempt: Initialize and resume context immediately on component mount
  useEffect(() => {
    initAudio();
  }, []);

  // Resume AudioContext silently on first click/touch if blocked by autoplay policy
  useEffect(() => {
    const handleInteraction = () => {
      initAudio();
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);
    return () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, []);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Keep references to audio functions stable inside the effect
  const playChompRef = useRef(playChompSound);
  const playVictoryRef = useRef(playVictorySound);
  useEffect(() => {
    playChompRef.current = playChompSound;
    playVictoryRef.current = playVictorySound;
  });

  useEffect(() => {
    let startTime;
    const duration = 2200; // 2.2 seconds loading time

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const currentProgress = Math.min(elapsed / duration, 1);
      const pct = currentProgress * 100;
      
      setProgress(pct);

      // Check for eaten dots
      DOTS.forEach((dot) => {
        const isEaten = pct >= dot.pos - 2;
        if (isEaten && !eatenDotsRef.current.has(dot.id)) {
          eatenDotsRef.current.add(dot.id);
          playChompRef.current();
        }
      });

      if (currentProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        playVictoryRef.current();
        const timer = setTimeout(() => {
          if (onCompleteRef.current) onCompleteRef.current();
        }, 350);
        return () => clearTimeout(timer);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);


  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0c0a09]"
    >
      <div className="relative flex flex-col items-center">
        {/* Glowing Ambient Backdrop */}
        <div className="absolute w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

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
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-amber-500 inline-block ml-1"
          >
            .
          </motion.span>
        </motion.div>

        {/* Pacman Track */}
        <div className="w-64 h-12 relative mt-8 flex items-center z-10">
          {/* Track background line */}
          <div className="absolute left-0 right-0 h-[2px] bg-zinc-800/60 rounded" />

          {/* Pac-dots */}
          {DOTS.map((dot) => {
            const isEaten = progress >= dot.pos - 2;
            return (
              <div
                key={dot.id}
                style={{
                  left: `${dot.pos}%`,
                  transform: `translate(-50%, -50%) scale(${isEaten ? 0 : 1})`,
                  opacity: isEaten ? 0 : 1,
                  transition: "transform 150ms cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 100ms ease-out",
                }}
                className="absolute top-1/2 w-2.5 h-2.5 rounded-full bg-amber-200 shadow-[0_0_8px_#fde047]"
              />
            );
          })}

          {/* Pacman */}
          <div
            style={{
              left: `${progress}%`,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute top-1/2 w-8 h-8"
          >
            <div className="relative w-full h-full">
              {/* Top Jaw */}
              <div className="absolute top-0 left-0 w-8 h-4 bg-yellow-400 rounded-t-full origin-bottom shadow-[0_-2px_6px_rgba(250,204,21,0.4)] animate-chomp-top" />
              {/* Bottom Jaw */}
              <div className="absolute bottom-0 left-0 w-8 h-4 bg-yellow-400 rounded-b-full origin-top shadow-[0_2px_6px_rgba(250,204,21,0.4)] animate-chomp-bottom" />
            </div>
          </div>
        </div>

        {/* Loading text subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.3 }}
          className="text-slate-400 text-xs tracking-widest uppercase mt-4 z-10"
        >
          Initializing Portfolio
        </motion.p>
      </div>
    </motion.div>
  );
}

export default Loader;
