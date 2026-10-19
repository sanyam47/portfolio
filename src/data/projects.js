export const projectCategories = ["All", "AI & ML", "Robotics & IoT", "Web Apps"];

export const projectsData = [
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
    title: "AI Model Trainer (V2)",
    category: "AI & ML",
    image: "",
    tech: ["FastAPI", "Celery", "Scikit-Learn", "GPT-4o", "Librosa", "SQLite", "Docker", "Python"],
    shortDesc: "Production-grade autonomous ML platform — describe a task in plain English and get a trained, exportable AI model.",
    desc: "A production-ready multi-modal AI training workstation that lets anyone describe an AI task in plain English and automatically trains a professional model. Features a Smart Intent Router (GPT-4o) to detect data modality and task requirements. Supports four training pipelines: Text (automated scraping + AI-labeling + TF-IDF), Image (grayscale feature-extraction classification), Audio (MFCC signature recognition via Librosa), and Numeric Regression (multi-file CSV merging + Random Forest). Supports manual dataset uploads, real-time Celery job tracking, cloud deployment via Render, and instant .pkl model export. Includes stress testing, live test suites, and Docker support.",
    architecture: "Natural Language Prompt ➔ Intent Router (GPT-4o) ➔ Celery Worker ➔ Scikit-Learn Pipeline ➔ SQLite Job Tracker ➔ .pkl Export",
    challenges: "Preventing blocking operations during intensive training runs across 4 different data modalities. Solved with an async Celery task queue using a filesystem broker and SQL-based real-time status polling.",
    codeLink: "https://github.com/sanyam47",
    liveLink: "#"
  },
  {
    title: "AI Lawyer Assistant",
    category: "AI & ML",
    image: "",
    tech: ["Next.js", "Node.js", "Express", "MongoDB", "Ollama", "Mistral", "RAG"],
    shortDesc: "Full-stack legal intelligence platform providing conversational guidance and document analysis using local ML RAG pipelines.",
    desc: "Developed a secure AI-powered legal assistant capable of document analysis, OCR extraction, and semantic vector retrieval (Retrieval-Augmented Generation). The application reads uploaded PDFs and images, extracts raw text via OCR, chunks it, and generates embeddings using Ollama's 'nomic-embed-text' model. Embeddings are stored as vectors in MongoDB. User queries trigger a Cosine Similarity Search to retrieve top relevant context chunks, which are then injected into a local 'mistral' LLM to generate highly grounded, memory-aware, and summarized legal advice.",
    architecture: "Legal PDF/Image ➔ OCR Extraction ➔ Chunks ➔ nomic-embed-text (Ollama) ➔ MongoDB Vector Store ➔ Cosine Similarity Search ➔ mistral LLM ➔ Grounded Response",
    challenges: "Achieving accurate semantic searches without relying on commercial cloud APIs. Solved by designing a custom vector storage solution inside MongoDB and optimizing cosine similarity queries locally.",
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
  },
  {
    title: "Agri Commerce",
    category: "Web Apps",
    image: "",
    tech: ["React.js", "Node.js", "Express", "MongoDB", "JWT", "Multer"],
    shortDesc: "Full-stack direct farmer-to-buyer e-commerce marketplace enabling catalog listing and secure transactions.",
    desc: "Built a dedicated full-stack agricultural e-commerce platform designed to remove middlemen and connect local farmers directly with consumers and wholesale buyers. Features user roles (Farmer vs. Buyer) with separate dashboards, product listings with image uploads (multer), shopping cart state persistence, JWT token authentication, order tracking, and order histories.",
    architecture: "React.js Frontend ➔ Axios ➔ Express REST APIs ➔ Mongoose ➔ MongoDB Atlas",
    challenges: "Handling multiple image uploads and maintaining role-based routes for Farmers and Buyers securely. Solved using Mongoose schemas with distinct User roles, middleware verification, and local file storage systems.",
    codeLink: "https://github.com/sanyam47",
    liveLink: "#"
  }
];