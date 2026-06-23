import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";



// Synthesize sharp metallic slice/cut sound with noise punch when diagonal is cut
const playCutSound = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.32);
    
    // Noise/shatter sweep simulation
    const noiseOsc = ctx.createOscillator();
    const noiseGain = ctx.createGain();
    noiseOsc.type = "triangle";
    noiseOsc.frequency.setValueAtTime(2800, now);
    noiseOsc.frequency.exponentialRampToValueAtTime(80, now + 0.14);
    
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    
    noiseGain.gain.setValueAtTime(0, now);
    noiseGain.gain.linearRampToValueAtTime(0.15, now + 0.005);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
    
    osc.connect(gain);
    noiseOsc.connect(noiseGain);
    
    gain.connect(ctx.destination);
    noiseGain.connect(ctx.destination);
    
    osc.start(now);
    noiseOsc.start(now);
    osc.stop(now + 0.35);
    noiseOsc.stop(now + 0.14);
  } catch (e) {
    console.warn("Could not play cut sound", e);
  }
};

function KatanaWidget({ isTearing, tearProgress, onSlashTrigger }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isSlicingVisual, setIsSlicingVisual] = useState(false);

  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, px: 0, py: 0 });
  const trailRef = useRef([]); // holds { x, y, opacity, time }
  const particlesRef = useRef([]); // holds physics-based particles
  const dragFramesRef = useRef(0);
  const hasSlicedRef = useRef(false);


  // Line segment intersection detection helper
  const checkIntersection = (p0_x, p0_y, p1_x, p1_y, p2_x, p2_y, p3_x, p3_y) => {
    const s1_x = p1_x - p0_x;
    const s1_y = p1_y - p0_y;
    const s2_x = p3_x - p2_x;
    const s2_y = p3_y - p2_y;

    const denominator = -s2_x * s1_y + s1_x * s2_y;
    if (denominator === 0) return false;

    const s = (-s1_y * (p0_x - p2_x) + s1_x * (p0_y - p2_y)) / denominator;
    const t = (s2_x * (p0_y - p2_y) - s2_y * (p0_x - p2_x)) / denominator;

    return s >= 0 && s <= 1 && t >= 0 && t <= 1;
  };

  // Canvas animation loop and event binding
  useEffect(() => {
    if (!isDragging && !isTearing) {
      trailRef.current = [];
      particlesRef.current = [];
      setIsSlicingVisual(false);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let animationFrameId;

    const tick = () => {
      const mouse = mouseRef.current;
      const dx = mouse.x - mouse.px;
      const dy = mouse.y - mouse.py;
      const frameDist = Math.sqrt(dx * dx + dy * dy);

      // Speed threshold to draw trails: > 16px per frame (approx 1000px/s)
      const isCurrentlySlicing = isDragging && frameDist > 16 && dragFramesRef.current > 3;

      if (isCurrentlySlicing) {
        setIsSlicingVisual(true);
        trailRef.current.push({
          x: mouse.x,
          y: mouse.y,
          opacity: 1.0,
          time: Date.now(),
        });

        // Spawn trail spark particles
        for (let j = 0; j < 2; j++) {
          particlesRef.current.push({
            x: mouse.x,
            y: mouse.y,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            size: Math.random() * 2 + 1,
            color: Math.random() > 0.4 ? "#f59e0b" : "#fde68a",
            life: 1.0,
            decay: Math.random() * 0.04 + 0.02
          });
        }
      } else {
        setIsSlicingVisual(false);
      }

      // Check diagonal cut intersection if slicing
      if (isCurrentlySlicing && !hasSlicedRef.current && !isTearing) {
        const diagonalY1 = canvas.height * 0.65;
        const diagonalY2 = canvas.height * 0.35;
        const hit = checkIntersection(
          mouse.px,
          mouse.py,
          mouse.x,
          mouse.y,
          0,
          diagonalY1,
          canvas.width,
          diagonalY2
        );

        if (hit && trailRef.current.length > 2) {
          hasSlicedRef.current = true;
          playCutSound();
          const startPt = trailRef.current[0];

          const endPt = { x: mouse.x, y: mouse.y };

          // Massive spark burst along the entire cut path
          const particleCount = 45;
          for (let j = 0; j < particleCount; j++) {
            const t = j / (particleCount - 1);
            const px = startPt.x + t * (endPt.x - startPt.x);
            const py = startPt.y + t * (endPt.y - startPt.y);

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 7 + 2;

            particlesRef.current.push({
              x: px,
              y: py,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed,
              size: Math.random() * 3.5 + 1.5,
              color: Math.random() > 0.45 ? "#f59e0b" : "#fef3c7", // Amber or warm white hot spark
              life: 1.0,
              decay: Math.random() * 0.02 + 0.012
            });
          }

          onSlashTrigger(startPt.x, startPt.y, endPt.x, endPt.y);
        }
      }

      // Update mouse trail coordinate refs
      mouse.px = mouse.x;
      mouse.py = mouse.y;

      // Update and fade trail
      trailRef.current.forEach((pt) => {
        pt.opacity -= 0.08; // fade out in ~12 frames
      });

      // Filter out faded points
      trailRef.current = trailRef.current.filter(
        (pt) => pt.opacity > 0 && Date.now() - pt.time < 180
      );

      // Update particles physics (friction + gravity)
      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.12; // Gravity
        p.vx *= 0.98; // Air resistance
        p.life -= p.decay;
      });

      // Filter out dead particles
      particlesRef.current = particlesRef.current.filter((p) => p.life > 0);

      // Draw canvas trail
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (trailRef.current.length > 1) {
        for (let i = 1; i < trailRef.current.length; i++) {
          const p1 = trailRef.current[i - 1];
          const p2 = trailRef.current[i];
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${p2.opacity})`;
          ctx.lineWidth = 5 * p2.opacity;
          ctx.shadowColor = "#f59e0b";
          ctx.shadowBlur = 18 * p2.opacity;
          ctx.stroke();
        }
        ctx.shadowBlur = 0;
      }

      // Draw falling spark particles
      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.size * 3 * p.life;
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    const handleMouseMove = (e) => {
      const mouse = mouseRef.current;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 0) return;
      const mouse = mouseRef.current;
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isDragging, isTearing, onSlashTrigger]);

  const handleDragStart = (e, info) => {
    setIsDragging(true);
    hasSlicedRef.current = false;
    dragFramesRef.current = 0;

    // Initialize mouse positions
    const touchX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const touchY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    mouseRef.current = {
      x: touchX,
      y: touchY,
      px: touchX,
      py: touchY,
    };
    trailRef.current = [];
  };


  const handleDrag = (event, info) => {
    dragFramesRef.current += 1;
    const mouse = mouseRef.current;
    mouse.x = info.point.x;
    mouse.y = info.point.y;
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setIsSlicingVisual(false);
  };

  return (
    <>
      {/* Floating Widget Panel */}
      <motion.div 
        className="hidden md:flex fixed top-24 right-6 z-50 flex-col items-center select-none bg-zinc-950/65 border border-zinc-800/40 p-4 rounded-2xl shadow-[0_24px_50px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.05),0_0_20px_rgba(245,158,11,0.02)] backdrop-blur-xl transition"
        whileHover={{ 
          borderColor: "rgba(245, 158, 11, 0.45)", 
          boxShadow: "0 10px 30px rgba(245, 158, 11, 0.08), 0_24px_50px_rgba(0,0,0,0.85)" 
        }}
      >
        {/* Helper Label */}
        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-bold mb-2 animate-pulse">
          {isSlicingVisual ? "SLASHING!" : isDragging ? "Swipe Fast!" : "Slash to Navigate"}
        </span>

        <div className="relative w-32 h-16 flex items-center justify-center">
          {/* Katana Rack Stand (Kake) SVG */}
          <svg width="120" height="60" viewBox="0 0 120 60" className="absolute bottom-0">
            <defs>
              <linearGradient id="holoGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="rackGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#27272a" />
                <stop offset="100%" stopColor="#09090b" />
              </linearGradient>
            </defs>
            {/* Holographic Projection Light beam */}
            <polygon points="25,46 95,46 102,25 18,25" fill="url(#holoGlow)" className="animate-pulse" style={{ opacity: isDragging ? 0.8 : 0.4 }} />
            {/* Stand Base */}
            <rect x="15" y="46" width="90" height="5" rx="1.5" fill="url(#rackGrad)" stroke="#f59e0b" strokeWidth="0.8" style={{ filter: "drop-shadow(0 0 3px rgba(245,158,11,0.3))" }} />
            {/* Left Support Hook */}
            <path d="M 35 46 L 35 22 A 3 3 0 0 1 38 19 L 38 46" fill="url(#rackGrad)" stroke="#71717a" strokeWidth="0.5" />
            {/* Right Support Hook */}
            <path d="M 82 46 L 82 22 A 3 3 0 0 1 85 19 L 85 46" fill="url(#rackGrad)" stroke="#71717a" strokeWidth="0.5" />
          </svg>


          {/* Draggable Katana Group */}
          <motion.div
            drag
            dragSnapToOrigin
            dragElastic={0.12}
            dragConstraints={{ left: -2000, right: 2000, top: -2000, bottom: 2000 }}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            className="absolute z-10 cursor-grab active:cursor-grabbing"
            style={{ touchAction: "none" }}
            whileHover={{ scale: 1.06 }}
          >
            {/* Detailed Katana Sword SVG */}
            <svg
              width="110"
              height="24"
              viewBox="0 0 110 24"
              style={{
                overflow: "visible",
                filter: isSlicingVisual
                  ? "drop-shadow(0 0 14px rgba(245,158,11,0.95))"
                  : isDragging
                  ? "drop-shadow(0 0 8px rgba(245,158,11,0.6))"
                  : "drop-shadow(0 3px 5px rgba(0,0,0,0.6))",
              }}
            >
              <defs>
                <linearGradient id="bladeSteel" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#e4e4e7" />
                  <stop offset="55%" stopColor="#71717a" />
                  <stop offset="85%" stopColor="#a1a1aa" />
                  <stop offset="100%" stopColor="#27272a" />
                </linearGradient>
                <linearGradient id="goldTsuba" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fde047" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#854d0e" />
                </linearGradient>
                <linearGradient id="hiltWrap" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d97706" />
                  <stop offset="100%" stopColor="#92400e" />
                </linearGradient>
              </defs>

              <g transform="translate(0, 4)">
                {/* Blade Spine shadow contour */}
                <path d="M 5 10 Q 50 6, 85 9 L 85 10.5 Q 50 7.5, 5 11.5 Z" fill="#18181b" opacity="0.3" />
                
                {/* Polished Steel Blade */}
                <path d="M 5 10 Q 50 6, 85 9 L 85 7.5 Q 50 4.5, 5 8.5 Z" fill="url(#bladeSteel)" stroke="#52525b" strokeWidth="0.3" />
                
                {/* Wavy Hamon Temper Line */}
                <path d="M 6 9.3 Q 15 8.3, 20 8.9 Q 30 7.9, 35 8.5 Q 45 7.5, 50 8.1 Q 60 7.1, 65 7.7 Q 75 6.7, 84 7.3 L 84 8.1 Q 50 5.1, 6 9.3 Z" fill="#ffffff" opacity="0.55" />
                
                {/* Blade Tip Reflection highlights */}
                <path d="M 5 10 L 14 9.3 L 14 8.6 Z" fill="#ffffff" opacity="0.75" />

                {/* Elegant Tsuba (Handguard) */}
                <ellipse cx="85" cy="8.5" rx="2.5" ry="7" fill="url(#goldTsuba)" stroke="#78350f" strokeWidth="0.4" />
                <circle cx="85" cy="8.5" r="0.8" fill="#18181b" />

                {/* Tsuka (Handle / Hilt) underlay */}
                <rect x="87.5" y="6" width="18" height="5" rx="0.6" fill="#09090b" />
                {/* Red Silk wrap */}
                <rect x="87.5" y="6" width="18" height="5" rx="0.6" fill="url(#hiltWrap)" opacity="0.9" />

                {/* Traditional Hilt diamond wraps details */}
                <g stroke="#09090b" strokeWidth="0.7" opacity="0.95">
                  <path d="M 88.5 6 L 91.5 11 M 91.5 6 L 88.5 11" />
                  <path d="M 91.5 6 L 94.5 11 M 94.5 6 L 91.5 11" />
                  <path d="M 94.5 6 L 97.5 11 M 97.5 6 L 94.5 11" />
                  <path d="M 97.5 6 L 100.5 11 M 100.5 6 L 97.5 11" />
                  <path d="M 100.5 6 L 103.5 11 M 103.5 6 L 100.5 11" />
                  <path d="M 103.5 6 L 105.5 11 M 105.5 6 L 103.5 11" />
                </g>

                {/* Kashira (Hilt buttcap) */}
                <rect x="105.5" y="6" width="1.5" height="5" rx="0.4" fill="url(#goldTsuba)" stroke="#78350f" strokeWidth="0.3" />
              </g>
            </svg>
          </motion.div>
        </div>
      </motion.div>



      {/* Full screen Physics Canvas overlay during dragging / tearing */}
      <AnimatePresence>
        {(isDragging || isTearing) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/10 pointer-events-none"
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full pointer-events-none z-50"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default KatanaWidget;

