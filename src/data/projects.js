export const projectCategories = ["All", "AI & ML", "Robotics & IoT"];

export const projectsData = [
  {
    title: "Unleash-Agent (formerly AI Trainer)",
    category: "AI & ML",
    image: "",
    tech: ["Python 3.11", "FastAPI", "Ollama LLMs", "Playwright", "AES-256-GCM", "Scikit-Learn", "Celery", "Docker"],
    shortDesc: "Local-first autonomous AI engineering workstation with 7-layer verification, multi-modal model training, and zero cloud telemetry.",
    desc: "Unleash-Agent (evolved from AI Model Trainer V2) is a local-first autonomous AI software engineering and model training platform. Operates completely on-device without cloud data leaks. Features multi-modal ML training pipelines (Text, Image, Audio, Numeric), a 7-layer Defect Provenance & Verification Engine with headless Chromium interaction audits via Playwright, an AES-256-GCM authenticated credential vault with PBKDF2 key derivation, project-scoped persistent memory, and 1-click snapshot rollback.",
    architecture: "Natural Language Prompt ➔ Tiered Local Model (DeepSeek/Llama) ➔ Execution Sandbox & Celery Worker ➔ Playwright Browser Verification ➔ 7/7 Self-Healing Passes ➔ Verified Artifact / Model",
    challenges: "Preventing hallucination loops on small 8B local models during browser errors. Solved by implementing priority error filtering (stripping 404 noise) and attributing errors to a computed single primary repair file with immediate rollback capabilities.",
    codeLink: "https://github.com/sanyam47/unleash-agent",
    liveLink: "https://github.com/sanyam47/unleash-agent"
  },
  {
    title: "Ashtavadhani — Agentic Video Editor",
    category: "AI & ML",
    image: "",
    tech: ["FastAPI", "Python", "Google Gemini", "MoviePy", "OpenCV", "Whisper", "PyTorch", "Qualcomm AI Hub"],
    shortDesc: "Multi-agent AI video synthesis engine that orchestrates 8 specialized AI agents to edit, beat-sync, and render production-grade videos.",
    desc: "Ashtavadhani (inspired by the ancient Indian art of performing eight cognitive tasks simultaneously) is a multi-agent collaborative video synthesis engine. It orchestrates a council of 8 specialized AI agents — Manager, Vision, Reference, Music, SFX, Transitions, Motion Graphics, and Caption — each handling a distinct editing dimension. In Template Mode it uses BiRefNet for neural background matting, LaMa for inpainting background reconstruction, a Smart Anatomical Aligner for eye-locked subject placement, and a 3D Depth Compositor for cinematic text rendering. Supports Qualcomm Snapdragon NPU acceleration via Qualcomm AI Hub with auto-fallback to CUDA or CPU. Real-time progress streams via Server-Sent Events (SSE).",
    architecture: "Raw Footage + Audio ➔ 8 AI Agent Council (Gemini) ➔ BiRefNet Matting ➔ LaMa Inpainting ➔ Anatomical Aligner ➔ Beat-Sync Audio ➔ 3D Compositor ➔ MP4 Export",
    challenges: "Coordinating 8 independent AI agents without race conditions while streaming real-time progress to a UI. Solved using JSON-based agentic plans streamed via SSE with a fail-safe NPU→CUDA→CPU fallback pipeline.",
    codeLink: "https://github.com/sanyam47",
    liveLink: "#"
  },
  {
    title: "AI Seed Sowing Car",
    category: "Robotics & IoT",
    image: "",
    tech: ["Arduino Uno", "Bluetooth (HC-05)", "Motor Driver (L298N)", "Servos", "Embedded C++"],
    shortDesc: "Autonomous agricultural robotic vehicle featuring smart pathing, obstacle detection, and Bluetooth controls.",
    desc: "Designed and engineered an agricultural robotic prototype to automate seed-sowing processes on rough fields. It utilizes an Arduino Uno microcontroller connected to L298N motor drivers and a custom servo dispensing mechanism. Equipped with HC-05 Bluetooth modules for direct wireless manual override, and ultrasonic sensors to handle obstacle avoidance. The mechanical loader triggers servo-controlled dispensing gates to release seeds at regular intervals during movement.",
    architecture: "Arduino Uno ➔ HC-05 Bluetooth ➔ L298N Motor Driver ➔ Obstacle Avoidance ➔ Servo Seed Gates",
    challenges: "Maintaining accurate seed gate timing and distance on uneven soil. Solved by integrating rotary wheel encoders and dynamically adjusting the servo motor seed gate speed relative to real-time wheel velocity.",
    codeLink: "https://github.com/sanyam47",
    liveLink: "#"
  }
];