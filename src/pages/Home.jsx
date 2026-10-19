import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence, animate } from "framer-motion";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import KatanaWidget from "../components/KatanaWidget";
import { tearOffsets } from "../data/tearOffsets";

const pages = ["hero", "about", "skills", "projects", "experience", "education", "contact"];

// Algorithm to calculate dynamic split polygons based on slash coordinates
export function calculateSplitPolygons(x1, y1, x2, y2, width, height, offsets) {
  const dx = x2 - x1;
  const dy = y2 - y1;

  // Fallback to default diagonal if slice segment is too small
  if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
    return calculateSplitPolygons(0, height * 0.65, width, height * 0.35, width, height, offsets);
  }

  const intersections = [];

  // 1. Find edge intersections
  // Top Edge (y=0)
  if (Math.abs(dy) > 0.001) {
    const x = x1 + (0 - y1) * dx / dy;
    if (x >= 0 && x <= width) {
      intersections.push({ x, y: 0 });
    }
  }
  // Bottom Edge (y=height)
  if (Math.abs(dy) > 0.001) {
    const x = x1 + (height - y1) * dx / dy;
    if (x >= 0 && x <= width) {
      intersections.push({ x, y: height });
    }
  }
  // Left Edge (x=0)
  if (Math.abs(dx) > 0.001) {
    const y = y1 + (0 - x1) * dy / dx;
    if (y >= 0 && y <= height) {
      intersections.push({ x: 0, y });
    }
  }
  // Right Edge (x=width)
  if (Math.abs(dx) > 0.001) {
    const y = y1 + (width - x1) * dy / dx;
    if (y >= 0 && y <= height) {
      intersections.push({ x: width, y });
    }
  }

  // Filter unique intersection points
  const uniqueIntersections = [];
  intersections.forEach((p) => {
    if (!uniqueIntersections.some((u) => Math.abs(u.x - p.x) < 1 && Math.abs(u.y - p.y) < 1)) {
      uniqueIntersections.push(p);
    }
  });

  // Fallback if not exactly 2 boundary points
  if (uniqueIntersections.length < 2) {
    return calculateSplitPolygons(0, height * 0.65, width, height * 0.35, width, height, offsets);
  }

  // Map to perimeter positions (clockwise starting at (0,0))
  const getClockwisePos = (p) => {
    if (p.y <= 1) return p.x; // Top
    if (p.x >= width - 1) return width + p.y; // Right
    if (p.y >= height - 1) return width + height + (width - p.x); // Bottom
    if (p.x <= 1) return 2 * width + height + (height - p.y); // Left
    return 0;
  };

  // Sort intersections by clockwise perimeter position
  uniqueIntersections.sort((a, b) => getClockwisePos(a) - getClockwisePos(b));
  const [sP1, sP2] = uniqueIntersections;
  const sPos1 = getClockwisePos(sP1);
  const sPos2 = getClockwisePos(sP2);

  // Generate jagged path vertices from sP1 to sP2
  const jaggedPoints = [];
  const N = offsets.length;
  const vx = sP2.x - sP1.x;
  const vy = sP2.y - sP1.y;
  const len = Math.sqrt(vx * vx + vy * vy);

  const ux = vx / len;
  const uy = vy / len;
  const nx = -uy; // Perpendicular normal
  const ny = ux;

  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const baseX = sP1.x + t * vx;
    const baseY = sP1.y + t * vy;
    const offset = offsets[i];

    const jx = baseX + offset * nx;
    const jy = baseY + offset * ny;

    // Convert to percentages for CSS clip-path
    const jxPct = (jx / width) * 100;
    const jyPct = (jy / height) * 100;
    jaggedPoints.push({ x: jxPct, y: jyPct });
  }

  // Corners in clockwise order
  const corners = [
    { x: 0, y: 0, pos: 0 },
    { x: 100, y: 0, pos: width },
    { x: 100, y: 100, pos: width + height },
    { x: 0, y: 100, pos: 2 * width + height }
  ];

  const totalPerimeter = 2 * (width + height);
  const dist1to2 = (sPos2 - sPos1 + totalPerimeter) % totalPerimeter;
  const dist2to1 = (sPos1 - sPos2 + totalPerimeter) % totalPerimeter;

  // Corners lying clockwise between sP1 and sP2
  const corners1 = corners
    .map((c) => ({ ...c, dist: (c.pos - sPos1 + totalPerimeter) % totalPerimeter }))
    .filter((c) => c.dist > 0 && c.dist < dist1to2)
    .sort((a, b) => a.dist - b.dist);

  // Corners lying clockwise between sP2 and sP1
  const corners2 = corners
    .map((c) => ({ ...c, dist: (c.pos - sPos2 + totalPerimeter) % totalPerimeter }))
    .filter((c) => c.dist > 0 && c.dist < dist2to1)
    .sort((a, b) => a.dist - b.dist);

  // Polygon 1 path: corners2 (C0, C1 area) + jaggedPoints (from sP1 to sP2)
  const poly1Path = [
    ...corners2,
    ...jaggedPoints
  ].map((p) => `${p.x.toFixed(3)}% ${p.y.toFixed(3)}%`).join(", ");

  // Polygon 2 path: corners1 (C2, C3 area) + reverse jaggedPoints (from sP2 to sP1)
  const poly2Path = [
    ...corners1,
    ...[...jaggedPoints].reverse()
  ].map((p) => `${p.x.toFixed(3)}% ${p.y.toFixed(3)}%`).join(", ");

  return {
    clip1: `polygon(${poly1Path})`,
    clip2: `polygon(${poly2Path})`,
    jaggedPoints,
    angleRad: Math.atan2(vy, vx),
  };
}

function Home() {
  const [activePage, setActivePage] = useState("hero");
  const [isTearing, setIsTearing] = useState(false);
  const [tearProgress, setTearProgress] = useState(0);
  const [slicingPage, setSlicingPage] = useState("hero");
  const [nextPage, setNextPage] = useState("about");
  const [sliceCoords, setSliceCoords] = useState(null); // { x1, y1, x2, y2 }
  const scrollLockedRef = useRef(false);

  // Sync active page with hash route on initial load
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (pages.includes(hash)) {
      setActivePage(hash);
    }
  }, []);

  // Handle normal scroll page navigation
  useEffect(() => {
    let touchStartY = 0;

    const transitionToPage = (direction) => {
      const currentIndex = pages.indexOf(activePage);
      const nextIndex = currentIndex + direction;

      // Prevent wrap-around scrolling past boundaries (Hero and Contact pages)
      if (nextIndex < 0 || nextIndex >= pages.length) {
        return;
      }

      scrollLockedRef.current = true;
      const targetPage = pages[nextIndex];
      setActivePage(targetPage);
      window.location.hash = `#${targetPage}`;

      // 1000ms cooldown to block scrolling spam
      setTimeout(() => {
        scrollLockedRef.current = false;
      }, 1000);
    };


    const handleWheel = (e) => {
      // Don't transition if a project modal is being scrolled internally
      const scrollableModal = document.querySelector(".project-modal-scrollable");
      if (scrollableModal && scrollableModal.contains(e.target)) {
        return;
      }

      if (scrollLockedRef.current || isTearing) return;

      // Boundary scroll check: only transition page if container is fully scrolled to edge
      const activeContainer = document.querySelector(".custom-scrollbar");
      if (activeContainer) {
        const scrollTop = activeContainer.scrollTop;
        const scrollHeight = activeContainer.scrollHeight;
        const clientHeight = activeContainer.clientHeight;

        if (e.deltaY > 0) { // Scrolling down
          if (scrollTop + clientHeight < scrollHeight - 8) {
            return; // Let the container scroll internally
          }
        } else if (e.deltaY < 0) { // Scrolling up
          if (scrollTop > 8) {
            return; // Let the container scroll internally
          }
        }
      }

      if (Math.abs(e.deltaY) > 30) {
        const direction = e.deltaY > 0 ? 1 : -1;
        transitionToPage(direction);
      }
    };

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (scrollLockedRef.current || isTearing) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      // Boundary scroll check for mobile touch swipes
      const activeContainer = document.querySelector(".custom-scrollbar");
      if (activeContainer) {
        const scrollTop = activeContainer.scrollTop;
        const scrollHeight = activeContainer.scrollHeight;
        const clientHeight = activeContainer.clientHeight;

        if (deltaY > 0) { // Swiping up (scrolling down)
          if (scrollTop + clientHeight < scrollHeight - 8) {
            return; // Let the container scroll internally
          }
        } else if (deltaY < 0) { // Swiping down (scrolling up)
          if (scrollTop > 8) {
            return; // Let the container scroll internally
          }
        }
      }

      if (Math.abs(deltaY) > 50) {
        const direction = deltaY > 0 ? 1 : -1;
        transitionToPage(direction);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activePage, isTearing]);

  // Slash trigger from KatanaWidget
  const handleSlashTrigger = (x1, y1, x2, y2) => {
    if (isTearing) return;

    setSliceCoords({ x1, y1, x2, y2 });

    const currentIndex = pages.indexOf(activePage);
    const nextIndex = (currentIndex + 1) % pages.length;
    const targetPage = pages[nextIndex];

    setSlicingPage(activePage);
    setNextPage(targetPage);
    setIsTearing(true);

    // Animate tear progress from 0 to 1
    animate(0, 1, {
      duration: 1.1,
      ease: "easeInOut",
      onUpdate: (latest) => setTearProgress(latest),
      onComplete: () => {
        setActivePage(targetPage);
        window.location.hash = `#${targetPage}`;
        setIsTearing(false);
        setTearProgress(0);
        setSliceCoords(null);
      },
    });
  };

  const splitData = useMemo(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (sliceCoords) {
      return calculateSplitPolygons(
        sliceCoords.x1,
        sliceCoords.y1,
        sliceCoords.x2,
        sliceCoords.y2,
        width,
        height,
        tearOffsets
      );
    } else {
      // Default slice coordinates diagonal
      return calculateSplitPolygons(
        0,
        height * 0.65,
        width,
        height * 0.35,
        width,
        height,
        tearOffsets
      );
    }
  }, [sliceCoords]);

  // Calculate dynamic translations and rotations for both halves
  const motionValues = useMemo(() => {
    // We translate along the normal of the slash angle
    const angle = splitData.angleRad ?? Math.atan2(-0.3 * window.innerHeight, window.innerWidth);
    const normalX = -Math.sin(angle);
    const normalY = Math.cos(angle);

    // Increase translation distance to 1.15x max screen dimension to clear viewport completely
    const translateDist = tearProgress * Math.max(window.innerWidth, window.innerHeight) * 1.15;

    return {
      half1: {
        x: -translateDist * normalX,
        y: -translateDist * normalY,
        rotate: -tearProgress * 3.5, // Subtle swing
      },
      half2: {
        x: translateDist * normalX,
        y: translateDist * normalY,
        rotate: tearProgress * 3.5, // Subtle swing
      },
    };
  }, [tearProgress, splitData]);

  // Render custom themed backgrounds unique for different pages
  const renderBackgroundElements = (pageName) => {
    switch (pageName) {
      case "hero":
        return (
          <>
            <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-amber-600/5 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(245,158,11,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.02)_1px,transparent_1px)] bg-[size:45px_45px] opacity-40 pointer-events-none" />
          </>
        );
      case "about":
        return (
          <>
            <div className="absolute bottom-10 right-10 w-[35rem] h-[35rem] bg-amber-600/4 blur-[130px] rounded-full pointer-events-none" />
            <svg className="absolute top-10 left-10 w-96 h-96 stroke-amber-500/5 stroke-[1.5] fill-none pointer-events-none" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" strokeDasharray="4,6" />
              <circle cx="50" cy="50" r="25" />
            </svg>
          </>
        );
      case "skills":
        return (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30rem] h-[30rem] bg-amber-600/5 blur-[120px] rounded-full pointer-events-none" />
            <svg className="absolute inset-0 w-full h-full stroke-amber-500/5 stroke-[0.5] fill-none pointer-events-none">
              <pattern id="skills-grid" width="80" height="80" patternUnits="userSpaceOnUse">
                <circle cx="40" cy="40" r="1.5" className="fill-amber-500/10" />
                <path d="M 0 40 L 80 40 M 40 0 L 40 80" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#skills-grid)" />
            </svg>
          </>
        );
      case "projects":
        return (
          <>
            <div className="absolute right-0 bottom-0 w-[45rem] h-[45rem] bg-amber-600/5 blur-[160px] rounded-full pointer-events-none" />
            <svg className="absolute inset-0 w-full h-full stroke-amber-600/3 stroke-1 fill-none pointer-events-none">
              <line x1="0" y1="25%" x2="100%" y2="75%" />
              <line x1="0" y1="75%" x2="100%" y2="25%" strokeWidth="0.5" />
            </svg>
          </>
        );
      case "experience":
        return (
          <>
            <div className="absolute left-10 top-1/4 w-[30rem] h-[30rem] bg-amber-600/4 blur-[120px] rounded-full pointer-events-none" />
            <svg className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-20 stroke-amber-500/5 stroke-1 stroke-dasharray-[3_6] fill-none pointer-events-none">
              <line x1="10" y1="0" x2="10" y2="100%" />
              <line x1="70" y1="0" x2="70" y2="100%" />
            </svg>
          </>
        );
      case "education":
        return (
          <>
            <div className="absolute right-1/4 bottom-1/4 w-[35rem] h-[35rem] bg-amber-600/4 blur-[130px] rounded-full pointer-events-none" />
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[20px] bg-gradient-to-r from-transparent via-amber-500/5 to-transparent rotate-[32deg] transform origin-top-left" />
              <div className="absolute top-[15%] left-[-20%] w-[150%] h-[10px] bg-gradient-to-r from-transparent via-amber-500/3 to-transparent rotate-[32deg] transform origin-top-left" />
            </div>
          </>
        );
      case "contact":
        return (
          <>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-amber-600/5 blur-[160px] rounded-full pointer-events-none" />
            <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] stroke-amber-500/5 fill-none pointer-events-none">
              <circle cx="400" cy="400" r="120" />
              <circle cx="400" cy="400" r="280" strokeDasharray="3,6" />
              <line x1="400" y1="0" x2="400" y2="800" />
              <line x1="0" y1="400" x2="800" y2="400" />
            </svg>
          </>
        );
      default:
        return null;
    }
  };

  const renderPageContent = (pageName, isSlicingHalf = false) => {
    switch (pageName) {
      case "hero":
        return <Hero onPageChange={setActivePage} />;
      case "about":
        return <About isSlicingHalf={isSlicingHalf} />;
      case "skills":
        return <Skills isSlicingHalf={isSlicingHalf} />;
      case "projects":
        return <Projects />;
      case "experience":
        return <Experience isSlicingHalf={isSlicingHalf} />;
      case "education":
        return <Education isSlicingHalf={isSlicingHalf} />;
      case "contact":
        return (
          <div className="flex flex-col min-h-screen justify-between bg-[#0c0a09]">
            <div className="flex-grow flex items-center justify-center">
              <Contact />
            </div>
            <Footer />
          </div>
        );
      default:
        return <Hero onPageChange={setActivePage} />;
    }
  };

  return (
    <div className="w-full h-screen overflow-hidden bg-[#0c0a09] relative select-none">
      <Navbar activePage={activePage} onPageChange={setActivePage} />
      <KatanaWidget isTearing={isTearing} tearProgress={tearProgress} onSlashTrigger={handleSlashTrigger} />

      {/* Page rendering layer */}
      {!isTearing ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full overflow-y-auto custom-scrollbar relative"
          >
            {renderBackgroundElements(activePage)}
            <div className="relative z-10">
              {renderPageContent(activePage, false)}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        // Active page tearing animation layout
        <div className="relative w-full h-full overflow-hidden">
          {/* Background target page loading - fades in smoothly */}
          <div
            style={{ opacity: tearProgress < 0.2 ? 0 : (tearProgress - 0.2) / 0.8 }}
            className="absolute inset-0 w-full h-full z-10"
          >
            {renderBackgroundElements(nextPage)}
            <div className="relative z-10">
              {renderPageContent(nextPage, false)}
            </div>
          </div>

          {/* Polygon 1 Diagonal Page Half (C0, C1 area) - slides & fades out */}
          <motion.div
            style={{
              clipPath: splitData.clip1,
              opacity: tearProgress < 0.25 ? 1 : Math.max(0, 1 - (tearProgress - 0.25) / 0.75)
            }}
            animate={motionValues.half1}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full z-30 pointer-events-none overflow-hidden bg-[#0c0a09]"
          >
            <div className="w-full h-full relative pointer-events-none">
              {renderBackgroundElements(slicingPage)}
              <div className="relative z-10">
                {renderPageContent(slicingPage, true)}
              </div>
              {/* Glowing Amber cut edge overlay */}
              {splitData.jaggedPoints && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-50" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d={"M " + splitData.jaggedPoints.map(p => `${p.x.toFixed(3)} ${p.y.toFixed(3)}`).join(" L ")}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="0.8"
                    style={{
                      filter: "drop-shadow(0 0 3px #f59e0b) drop-shadow(0 0 8px #f59e0b)",
                      opacity: 1 - tearProgress * 0.5
                    }}
                  />
                </svg>
              )}
            </div>
          </motion.div>

          {/* Polygon 2 Diagonal Page Half (C2, C3 area) - slides & fades out */}
          <motion.div
            style={{
              clipPath: splitData.clip2,
              opacity: tearProgress < 0.25 ? 1 : Math.max(0, 1 - (tearProgress - 0.25) / 0.75)
            }}
            animate={motionValues.half2}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full z-30 pointer-events-none overflow-hidden bg-[#0c0a09]"
          >
            <div className="w-full h-full relative pointer-events-none">
              {renderBackgroundElements(slicingPage)}
              <div className="relative z-10">
                {renderPageContent(slicingPage, true)}
              </div>
              {/* Glowing Amber cut edge overlay */}
              {splitData.jaggedPoints && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-50" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path
                    d={"M " + splitData.jaggedPoints.map(p => `${p.x.toFixed(3)} ${p.y.toFixed(3)}`).join(" L ")}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="0.8"
                    style={{
                      filter: "drop-shadow(0 0 3px #f59e0b) drop-shadow(0 0 8px #f59e0b)",
                      opacity: 1 - tearProgress * 0.5
                    }}
                  />
                </svg>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Home;
