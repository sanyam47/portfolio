export const projectCategories = ["All", "AI & ML", "Robotics & IoT", "Web Apps"];

export const projectsData = [
  {
    title: "AI Model Trainer (V2)",
    category: "AI & ML",
    image: "",
    tech: ["FastAPI", "Celery", "Scikit-Learn", "Librosa", "SQLite", "Python"],
    shortDesc: "Autonomous ML platform that automatically scrapes data, labels it, and trains multi-modal AI models asynchronously.",
    desc: "Built a production-grade multi-modal AI training workstation that allows users to describe an AI task in plain English and automatically trains a professional model. It features a Smart Intent Router using LLMs (GPT-4o) to automatically detect data modality and task requirements. Incorporates multi-modal training pipelines: Text (automated scraping, AI-labeling, and TF-IDF), Image (feature-extraction based grayscale classification), Audio (MFCC signature recognition via Librosa), and Numeric Regression (multi-file merging and Random Forest prediction). Real-time job progress tracking is handled asynchronously via Celery with a filesystem broker, and trained models can be immediately exported as .pkl assets.",
    architecture: "Natural Language Prompt ➔ Intent Router (LLM) ➔ Celery Worker ➔ Scipy/Scikit-Learn ➔ SQL Database ➔ .pkl Export",
    challenges: "Preventing blocking web request operations during intensive Scikit-learn training runs. Solved by implementing an asynchronous Celery task queue with SQL-based status tracking and a lightweight local filesystem broker.",
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