export const projectCategories = [
  "All",
  "AI Applications",
  "IoT & Hardware",
  "Java Spring Boot"
];

export const projectsData = [
  {
    title: "AI Trainer (V2) – No-Code AI Model Training Platform",
    category: "AI Applications",

    features: [
      "Natural Language Training",
      "Live Playground",
      "Model Refinement"
    ],

    tech: [
      "Python",
      "FastAPI",
      "Machine Learning",
      "Scikit-Learn",
      "SQLite",
      "Celery",
      "Librosa",
      "Pillow"
    ],

    shortDesc:
      "Train custom AI models using simple English prompts with live testing and model refinement.",

    desc:
      "Developed an autonomous AI training platform that allows users to create and train custom machine learning models using natural language instructions instead of complex coding workflows. The platform supports text, image, audio, and regression-based training pipelines. It features a live playground for real-time model testing, enabling users to instantly evaluate outputs and performance. Users can refine existing models through an intuitive interface by updating datasets, modifying configurations, and retraining models without rebuilding the entire workflow. The system simplifies AI development for non-technical users while providing flexibility for experimentation and optimization.",

    architecture:
      "User Prompt Interface ➔ AI Training Engine ➔ Model Generation ➔ Live Playground ➔ Model Refinement Dashboard",

    challenges:
      "Building a workflow that allows users to train and improve AI models through simple English instructions while maintaining an intuitive testing and iteration experience across multiple data types.",

    codeLink: "https://github.com/sanyam47",
    liveLink: "#"
  },

  {
    title: "AI Lawyer Assistant",
    category: "AI Applications",

    features: [
      "Legal Research",
      "Document Analysis",
      "AI Consultation"
    ],

    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AI"
    ],

    shortDesc:
      "AI-powered legal assistant for legal queries, document understanding, and guidance.",

    desc:
      "Built an AI-powered legal assistant that helps users understand legal concepts, analyze legal information, and receive guidance through natural language interactions. The platform provides quick access to legal knowledge, document explanations, and simplified legal assistance through an interactive conversational interface.",

    architecture:
      "React Frontend ➔ Express API ➔ AI Processing Layer ➔ MongoDB",

    challenges:
      "Presenting complex legal information in a simplified and user-friendly manner while maintaining response relevance and clarity.",

    codeLink: "https://github.com/sanyam47",
    liveLink: "#"
  },

  {
    title: "AI-Powered Seed Sowing Vehicle",
    category: "IoT & Hardware",

    features: [
      "Bluetooth Control",
      "Seed Automation",
      "Sensor Integration"
    ],

    tech: [
      "Arduino",
      "Bluetooth",
      "Sensors",
      "AI",
      "Embedded Systems"
    ],

    shortDesc:
      "Autonomous and Bluetooth-controlled seed sowing vehicle for small-scale agriculture.",

    desc:
      "Designed and developed a compact seed sowing vehicle capable of autonomous and Bluetooth-controlled operation. The system integrates sensors, motors, and intelligent control logic to improve sowing efficiency. The project focuses on reducing manual effort while maintaining accurate seed placement for small agricultural fields.",

    architecture:
      "Mobile App ➔ Bluetooth Module ➔ Arduino Controller ➔ Motors & Sensors",

    challenges:
      "Achieving consistent seed placement and integrating multiple hardware components into a compact and reliable system.",

    codeLink: "https://github.com/sanyam47",
    liveLink: "#"
  },

  {
    title: "Student Assignment & Assessment Portal",
    category: "Java Spring Boot",

    features: [
      "Online Assignments",
      "Role-Based Access",
      "Result Management"
    ],

    tech: [
      "Java",
      "Spring Boot",
      "MySQL",
      "Thymeleaf",
      "Bootstrap"
    ],

    shortDesc:
      "Online portal for assignments, tests, submissions, evaluation, and result management.",

    desc:
      "Developed a web-based academic management platform that allows administrators to create assignments and tests, students to submit work online, and teachers to evaluate submissions. The system includes role-based access control, result management, and a streamlined workflow for managing academic assessments.",

    architecture:
      "Spring Boot ➔ Spring Security ➔ Thymeleaf ➔ MySQL",

    challenges:
      "Implementing secure role-based access control and managing assignment submission workflows efficiently.",

    codeLink: "https://github.com/sanyam47",
    liveLink: "#"
  }
];