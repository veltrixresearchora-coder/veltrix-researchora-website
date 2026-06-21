export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export interface ServiceCategory {
  id: string;
  name: string;
  iconName: string;
  items: ServiceItem[];
}

export interface TestimonialItem {
  id: number;
  name: string;
  role: string;
  university: string;
  rating: number;
  comment: string;
  avatar: string;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface TechnologyItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  accentColor: string;
}

export const servicesData: ServiceCategory[] = [
  {
    id: "research",
    name: "RESEARCH SERVICES",
    iconName: "FileText",
    items: [
      {
        id: "r1",
        title: "Research Paper Writing & Alignment",
        description: "End-to-end alignment and drafting of high-impact research papers matching strict journal criteria.",
        details: ["Literature comparison matrices", "Methodology framing & abstract planning", "Reference citation matching (Harvard, IEEE, APA)"]
      },
      {
        id: "r2",
        title: "Research Proposal Draft",
        description: "Conceptualize and formulate compelling research proposals for funding authorities or academic boards.",
        details: ["Grant and fellowship structure guidance", "Scientific novelty isolation", "Feasibility and timeline mapping"]
      },
      {
        id: "r3",
        title: "Systematic Literature Review (SLR)",
        description: "Rigorous research survey following standard PRISMA guidelines to identify knowledge gaps.",
        details: ["Quantitative synthesis", "Keywords filter matrix setup", "Comprehensive bibliography preparation"]
      },
      {
        id: "r4",
        title: "Review Paper Preparation",
        description: "Construct exhaustive review papers summarizing recent state-of-the-art developments.",
        details: ["Thematic classification of literature", "Comparative analytical frameworks", "Critical evaluation charts"]
      },
      {
        id: "r5",
        title: "Research Consultation",
        description: "Direct elite consulting panels with peer-reviewed researchers and journal specialists.",
        details: ["Scopus & SCI selection advice", "Structure and storytelling mapping", "Interactive technical advice feedback"]
      },
      {
        id: "r6",
        title: "Proposal Assistant",
        description: "Fine-tune and edit existing proposals to maximize scientific approval scoring.",
        details: ["Novelty highlighting edits", "Abstract optimization", "Hypothesis validation tests"]
      },
      {
        id: "r7",
        title: "Research Presentation",
        description: "Create high-impact, futuristic academic slide presentations for defense boards.",
        details: ["Visually striking data diagrams", "Defense outline pacing lists", "Interactive presentation aids"]
      }
    ]
  },
  {
    id: "phd",
    name: "PHD SERVICES",
    iconName: "GraduationCap",
    items: [
      {
        id: "p1",
        title: "PhD Topic Selection",
        description: "Isolate cutting-edge, high-viability, novel research topics for doctorate registration.",
        details: ["Feasibility verification checks", "Current literature gap isolation", "Future scope formulation"]
      },
      {
        id: "p2",
        title: "PhD Proposal Formulation",
        description: "Formulate bullet-proof synopsis structures for university approval presentation.",
        details: ["Problem statement definitions", "Interactive timeline schedules", "Hypothesis structures"]
      },
      {
        id: "p3",
        title: "Thesis Assistance & Prep Support",
        description: "Comprehensive assistance across each chapter: abstract, literature, methods, results, conclusion.",
        details: ["Strict academic formatting alignment", "Proof validation structures", "Structural coherence audits"]
      },
      {
        id: "p4",
        title: "Thesis Editing & Refinement",
        description: "Rigorous academic polishing, styling adjustments, and readability improvements.",
        details: ["Syntactic elegance adjustments", "Cohesive transition checking", "Structural flow alignments"]
      },
      {
        id: "p5",
        title: "PhD Publication Assistance",
        description: "Secure quick, reliable publication support in premier indexed journals.",
        details: ["A-Grade Scopus/SCI journal shortlisting", "Peer-comment analysis responses", "Submission file packaging"]
      },
      {
        id: "p6",
        title: "Book Preparation Support",
        description: "Translate research achievements and findings into standard academic textbooks and reference materials.",
        details: ["ISBN procurement alignment", "Chapter formatting standards", "Academic publishing routing"]
      }
    ]
  },
  {
    id: "add-on",
    name: "ADD-ON SERVICES",
    iconName: "Briefcase",
    items: [
      {
        id: "a1",
        title: "Journal Support & Publication",
        description: "Rigorous indexing audits and submission flow guidance for prestigious publishers.",
        details: ["IEEE, Springer, Elsevier alignment", "Review correction guidance", "Acceptance rate forecasting"]
      },
      {
        id: "a2",
        title: "Plagiarism Checking & Rewriting",
        description: "Audit similarity index with peer-reviewed standards and provide precise structural phrasing alignment.",
        details: ["Turnitin index alignment", "Critical structural reconstruction", "Citation backup insertion"]
      },
      {
        id: "a3",
        title: "Grammar Checking & Proofreading",
        description: "Polish manuscripts with a team of elite, native English academic editors.",
        details: ["Grammatical corrections", "Flow, readability, style polish", "Consistency in academic voice"]
      },
      {
        id: "a4",
        title: "Language Correction",
        description: "Specialized translations and language alignments for international scholars.",
        details: ["Scientific language translation", "Readability optimizations", "Technical phrasing adjustments"]
      },
      {
        id: "a5",
        title: "Review Manuscript Service",
        description: "Pre-submission evaluation by experienced journal reviewers to assess publication chances.",
        details: ["Simulated peer review reporting", "Technical error spotting", "Novelty score evaluation"]
      }
    ]
  },
  {
    id: "content",
    name: "CONTENT SERVICES",
    iconName: "Database",
    items: [
      {
        id: "c1",
        title: "Scopus Indexed Journals Support",
        description: "Specialized alignment and content preparation tailored for Scopus parameters.",
        details: ["Indexing requirements checks", "Formatting standardizations", "Literature gap matches"]
      },
      {
        id: "c2",
        title: "Case Studies Preparation",
        description: "Develop dense, granular, real-world case studies for industrial or clinical domains.",
        details: ["Data capture outlines", "Theoretical application reviews", "Practical outcome summaries"]
      },
      {
        id: "c3",
        title: "Course Work & Reports",
        description: "Structured academic summaries, reviews, and coursework alignments.",
        details: ["Technical report formulations", "Lab result validations", "Calculations and results checks"]
      },
      {
        id: "c4",
        title: "Annotated Bibliography",
        description: "Formulate thorough analytical catalogs of cited references.",
        details: ["Critical evaluation of sources", "Direct methodology relevance assessments", "Thematic tagging profiles"]
      }
    ]
  },
  {
    id: "development",
    name: "DEVELOPMENT SERVICES",
    iconName: "Cpu",
    items: [
      {
        id: "d1",
        title: "Embedded & IoT Development",
        description: "Custom firmware development and prototyping for major microcontroller platforms.",
        details: ["STM32, Arduino, ESP32, Raspberry Pi", "Sensor integration & wireless networking", "Real-time operating structures (RTOS)"]
      },
      {
        id: "d2",
        title: "VLSI Development & FPGA",
        description: "High-performance digital circuit implementation, simulation, and synthesis support.",
        details: ["VHDL / Verilog architectural designs", "Xilinx / Altera hardware boards testing", "RTL design & timing analysis reports"]
      },
      {
        id: "d3",
        title: "Matlab Technical Development",
        description: "Sophisticated mathematical modeling, digital signal processing (DSP), and control arrays.",
        details: ["Simulink pipeline architectures", "Neural Network Toolkits integration", "Image and audio filter designs"]
      },
      {
        id: "d4",
        title: "Python-driven Engineering Solution",
        description: "Develop robust algorithm files, automation tools, and data scrapers.",
        details: ["Custom computer vision scripts", "TensorFlow & PyTorch training algorithms", "Data cleaning pipelines"]
      },
      {
        id: "d5",
        title: "Hardware Implementation Support",
        description: "Translate high-level simulations into fully functional electronic prototypes.",
        details: ["Multi-layer PCB layout designs", "Soldering & component validation lists", "Debugging with oscilloscope arrays"]
      }
    ]
  },
  {
    id: "analysis",
    name: "ANALYSIS SERVICES",
    iconName: "PieChart",
    items: [
      {
        id: "n1",
        title: "SPSS Statistical Analysis",
        description: "Expert statistical processing using professional mathematical packages.",
        details: ["Hypothesis test calculations (t-test, ANOVA)", "Correlation & regression studies", "Categorical data interpretations"]
      },
      {
        id: "n2",
        title: "Big Data & Algorithm Analysis",
        description: "Rigorous evaluation of algorithm complexity, asymptotic runtime, and efficiency metrics.",
        details: ["O-notation, Space/Time validations", "Benchmark validation graphs", "Novel optimization recommendations"]
      }
    ]
  }
];

export const staticTechnologies: TechnologyItem[] = [
  {
    id: "ai",
    name: "Artificial Intelligence",
    description: "Deep learning models, neural networks, and sequence models optimized for complex predictive diagnostics.",
    iconName: "BrainCircuit",
    accentColor: "#00F0FF"
  },
  {
    id: "ml",
    name: "Machine Learning",
    description: "Robust statistical classification models, predictive matrices, and regression pipelines for empirical data.",
    iconName: "Cpu",
    accentColor: "#8F00FF"
  },
  {
    id: "embedded",
    name: "Embedded Systems",
    description: "Low-level microcontrollers, RTOS foundations, and localized sensor networks configured with hardware precision.",
    iconName: "Network",
    accentColor: "#FF007F"
  },
  {
    id: "vlsi",
    name: "VLSI Circuitry",
    description: "Detailed RTL coding, schematic synthesis, and timing audits verified via advanced hardware simulation panels.",
    iconName: "Grid",
    accentColor: "#C5A880"
  },
  {
    id: "iot",
    name: "Internet of Things",
    description: "Cloud-sync telemetry pipelines, MQTT connection arrays, and localized smart node systems for connected operations.",
    iconName: "Radio",
    accentColor: "#00FF66"
  },
  {
    id: "python",
    name: "Python Core Ecosystem",
    description: "Advanced Pandas, NumPy mathematical setups, Scikit-learn regressions, and automated research processing.",
    iconName: "FileCode2",
    accentColor: "#3B82F6"
  },
  {
    id: "analytics",
    name: "Data Analytics",
    description: "Intense SPSS regressions, qualitative coding maps, and robust multivariate data validations for journals.",
    iconName: "TrendingUp",
    accentColor: "#EAB308"
  },
  {
    id: "hardware",
    name: "Hardware Engineering",
    description: "Physical multi-layer PCB layout routing, thermal audits, and real-world high-frequency signal testing.",
    iconName: "Wrench",
    accentColor: "#F97316"
  },
  {
    id: "automation",
    name: "Industrial Automation",
    description: "Closed-loop feedback control architectures, robotic system automation, and SCADA configuration setups.",
    iconName: "Settings",
    accentColor: "#06B6D4"
  }
];

export const staticTestimonials: TestimonialItem[] = [
  {
    id: 1,
    name: "Dr. Anand Krishnan",
    role: "Senior Scholar, Robotics Division",
    university: "Indian Institute of Science (IISc)",
    rating: 5,
    comment: "VELTRIX RESEARCHORA converted our complex embedded project into a fully functional Scopus indexed publication. Their structural feedback and hardware assistance was incredibly professional.",
    avatar: "👨‍🔬"
  },
  {
    id: 2,
    name: "Prof. Maria Santos",
    role: "PhD Candidate, Healthcare Informatics",
    university: "NTU Digital Laboratories",
    rating: 5,
    comment: "The SPSS data modeling and grammatical polish was of outstanding caliber. They answered every peer reviewer comment immediately, guaranteeing a seamless academic journey.",
    avatar: "👩‍🎓"
  },
  {
    id: 3,
    name: "Dr. Sarah Jenkins",
    role: "Postdoctoral Fellow, VLSI Architecture",
    university: "MIT Electronics Laboratory",
    rating: 5,
    comment: "Their expertise in Verilog hardware implementations and RTL designs helped us complete our project milestone 2 months before the defense deadline! Exceptional fidelity.",
    avatar: "👩‍🔬"
  },
  {
    id: 4,
    name: "Rahul Verma",
    role: "PhD Scholar, AI & Computer Vision",
    university: "IIT Hyderabad",
    rating: 5,
    comment: "Finding a team capable of both writing and writing python simulations was fantastic. The Systematic Literature Review followed exact PRISMA protocols perfectly.",
    avatar: "👨‍🎓"
  }
];

export const staticFAQs: FAQItem[] = [
  {
    id: 1,
    question: "Do you assist with the implementation of custom hardware prototypes?",
    answer: "Yes, our team specialises in complete Hardware Implementation, including multi-layer PCB design, fabrication support, and microcontroller microcontroller component integration (STM32, VLSI, IoT systems, Raspberry Pi, etc.) paired with detailed step-by-step documentation."
  },
  {
    id: 2,
    question: "Which journals do you help with for publication?",
    answer: "We support manuscript alignment and indexing matching for premier global indexed journals, including Scopus, Science Citation Index Expanded (SCIE), Web of Science (WoS), IEEE, Springer, Elsevier, and Wiley."
  },
  {
    id: 3,
    question: "How do you ensure data security and research confidentiality?",
    answer: "We maintain absolute, bullet-proof academic integrity. All shared abstracts, data files, algorithms, and proposals are guarded under strict non-disclosure terms, and stored within fully offline secured file nodes."
  },
  {
    id: 4,
    question: "Do you compile response documents to address Peer Reviewer feedback?",
    answer: "Yes! As part of our comprehensive PhD and Journal publication assistance, we analyze reviewer comments line-by-line and help draft precise scientific responses, editing the manuscript accordingly to guarantee high acceptance chances."
  },
  {
    id: 5,
    question: "Can we track the progress of our embedded software/Matlab project?",
    answer: "Absolutely. We share periodic code commits, simulation validation videos, and SPSS output charts to keep you informed of structural achievements every step of direct development."
  }
];
