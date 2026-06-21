import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileText, GraduationCap, Briefcase, Database, Cpu, PieChart, 
  BrainCircuit, ShieldAlert, CheckCircle2, Sparkles, Send, Star, 
  HelpCircle, ChevronDown, ChevronUp, UserCheck, ArrowUp, Mail, 
  Phone, Instagram, Linkedin, Facebook, MessageSquare, Compass, 
  Glasses, Award, Code2, Layers, Binary, ShieldCheck, HeartHandshake,
  Flame, CheckCircle, X
} from "lucide-react";

import Navbar from "./components/Navbar";
import Preloader from "./components/Preloader";
import CursorGlow from "./components/CursorGlow";
import WhatsAppChat from "./components/WhatsAppChat";
import NewsletterPopup from "./components/NewsletterPopup";
import StatsCounter from "./components/StatsCounter";
import Logo from "./components/Logo";

import { 
  servicesData, staticTechnologies, staticTestimonials, 
  staticFAQs, ServiceItem, ServiceCategory, FAQItem 
} from "./types";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState<string>("home");
  
  // States for services interactions
  const [selectedCategory, setSelectedCategory] = useState<string>("research");
  const [selectedServiceDetail, setSelectedServiceDetail] = useState<ServiceItem | null>(null);
  
  // Typing animation constants
  const phrases = [
    "Where Research Meets Innovation.",
    "Empowering Researchers Since 2022.",
    "PhD Proposal & Publication Support Panel.",
    "Direct Microprocessor Hardware Prototyping."
  ];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // States for active indicators
  const [heroSlide, setHeroSlide] = useState(0);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showToTop, setShowToTop] = useState(false);

  // Contact form input tracking
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "Research Proposal Prep",
    message: ""
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Gallery slider images of lab and academics
  const heroSliderImages = [
    "https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=1200&q=80", // Research Lab
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80", // Electrical Proto
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80", // AI neural background
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80"  // Digital network deepspace
  ];

  // Scroll to top display handler
  useEffect(() => {
    const handleScroll = () => {
      setShowToTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Text writer typing code loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullText = phrases[phraseIndex];
    const editingSpeed = isDeleting ? 25 : 55;

    if (!isDeleting && typedText === currentFullText) {
      timer = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    } else {
      timer = setTimeout(() => {
        setTypedText(
          isDeleting
            ? currentFullText.substring(0, typedText.length - 1)
            : currentFullText.substring(0, typedText.length + 1)
        );
      }, editingSpeed);
    }
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, phraseIndex]);

  // Gallery Autoplay interval
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSliderImages.length);
    }, 4500);
    return () => clearInterval(slideInterval);
  }, []);

  // Testimonials slide automation
  useEffect(() => {
    const testInterval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % staticTestimonials.length);
    }, 6000);
    return () => clearInterval(testInterval);
  }, []);

  // Form Submission Whatsapp redirect logic
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.message) return;

    setFormSubmitted(true);

    const textToEncode = 
      `*Academic Enquiry - VELTRIX RESEARCHORA*%0A%0A` +
      `*Scholar Name:* ${encodeURIComponent(contactForm.name)}%0A` +
      `*Email ID:* ${encodeURIComponent(contactForm.email)}%0A` +
      `*Phone Number:* ${encodeURIComponent(contactForm.phone || "Not provided")}%0A` +
      `*Enquiry Domain:* ${encodeURIComponent(contactForm.service)}%0A` +
      `*Abstract Message:* ${encodeURIComponent(contactForm.message)}`;

    const whatsappRedirectUrl = `https://wa.me/919385527437?text=${textToEncode}`;
    
    setTimeout(() => {
      window.open(whatsappRedirectUrl, "_blank", "noopener,noreferrer");
      setFormSubmitted(false);
      setContactForm({
        name: "",
        email: "",
        phone: "",
        service: "Research Proposal Prep",
        message: ""
      });
    }, 1200);
  };

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  // Direct select service card inside the Search results
  const handleSearchServiceClick = (item: ServiceItem) => {
    setSelectedServiceDetail(item);
    setActivePage("services");
  };

  // Helper mapping icon names to Lucide elements
  const categoryIconMap: { [key: string]: any } = {
    FileText: FileText,
    GraduationCap: GraduationCap,
    Briefcase: Briefcase,
    Database: Database,
    Cpu: Cpu,
    PieChart: PieChart
  };

  const pageTransitionVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] overflow-hidden text-[#596780]">
      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preload-panel" onComplete={() => setLoading(false)} />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative font-sans flex flex-col min-h-screen"
          >
            {/* Custom Interactive Particle Cursor element */}
            <CursorGlow />

            {/* Persistent background layers */}
            <div className="fixed inset-0 grid-bg opacity-45 pointer-events-none z-[1]" />
            
            {/* Floating back-light spots */}
            <div className="fixed top-10 right-[-100px] w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-20 bg-brand-gold/25 z-0" />
            <div className="fixed bottom-[-100px] left-[-200px] w-[600px] h-[600px] rounded-full bg-[#0B1F44]/5 blur-[150px] pointer-events-none opacity-30 z-0" />

            {/* Floating Menu Header */}
            <Navbar 
              onSearchSelect={handleSearchServiceClick} 
              activePage={activePage}
              onChangePage={setActivePage}
            />

            {/* Floating Widgets */}
            <WhatsAppChat />
            <NewsletterPopup />

            {/* Back to top button */}
            {showToTop && (
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="fixed bottom-24 right-7 z-[900] p-3 rounded-xl bg-white border border-[#0B1F44]/20 hover:border-brand-gold hover:bg-[#FAF9F6] text-[#0B1F44] hover:text-brand-gold shadow-md transition-all hover:scale-110 cursor-pointer"
              >
                <ArrowUp className="w-4.5 h-4.5 animate-bounce" />
              </button>
            )}

            {/* MAIN DYNAMIC Multi-Page Router Inner Shell */}
            <main className="flex-grow pt-24 z-10 w-full">
              <AnimatePresence mode="wait">
                {activePage === "home" && (
                  <motion.div
                    key="home-page"
                    variants={pageTransitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="w-full"
                  >
                    {/* HOMEPAGE HERO SECTION */}
                    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden w-full bg-[#FAF9F6]">
                      <div className="absolute inset-0 scanline pointer-events-none opacity-[0.05]" />
                      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-12 relative z-10">
                        {/* Text Panels */}
                        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6">
                          {/* Since Tag */}
                          <div className="inline-flex self-start items-center gap-2 py-1.5 px-4 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                            <Sparkles className="w-3.5 h-3.5 text-brand-gold" />
                            <span className="text-[10px] font-mono tracking-widest text-[#BA9E6B] font-bold uppercase">
                              IN ACADEMIC INTEGRITY SINCE 2022
                            </span>
                          </div>

                          {/* Slogan title */}
                          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#0B1F44] leading-[1.1] max-w-2xl font-serif">
                            Where Research Meets <br />
                            <span className="text-[#BA9E6B] glow-text-cyan">
                              Innovation.
                            </span>
                          </h1>

                          {/* Auto typing subtitle */}
                          <div className="h-6 flex items-center">
                            <span className="text-[#0B1F44] text-sm md:text-md tracking-wider font-mono uppercase">
                              🚀 {typedText}
                            </span>
                            <span className="w-1.5 h-4 bg-brand-gold/80 ml-1.5 animate-pulse" />
                          </div>

                          {/* Deep descriptive intro */}
                          <p className="text-sm md:text-base text-[#596780]/90 max-w-xl leading-relaxed">
                            VELTRIX RESEARCHORA is an elite global research and innovation firm. We empower scholars, researchers, and tech pioneers through structured academic solutions, peerless journal strategies, and direct micro-processor logic implementations.
                          </p>

                          {/* Main Hero CTA button grid */}
                          <div className="flex flex-wrap items-center gap-4 pt-4">
                            <button
                              onClick={() => {
                                setActivePage("services");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="py-3 px-6 rounded-xl bg-[#0B1F44] hover:bg-[#BA9E6B] text-white text-xs font-bold font-serif tracking-widest uppercase transition-all duration-300 shadow-md hover:scale-[1.03] cursor-pointer"
                            >
                              EXPLORE SERVICES
                            </button>
                            <button
                              onClick={() => {
                                setActivePage("about");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="py-3 px-6 rounded-xl border border-[#0B1F44]/20 text-[#0B1F44] hover:bg-[#0B1F44]/5 text-xs font-bold font-serif tracking-widest uppercase transition-all hover:scale-[1.03] cursor-pointer"
                            >
                              ABOUT COMPANY
                            </button>
                            <button
                              onClick={() => {
                                setActivePage("contact");
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                              className="py-3 px-6 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-bold font-serif tracking-widest uppercase flex items-center gap-2 transition-all hover:scale-[1.03] cursor-pointer"
                            >
                              <MessageSquare className="w-4 h-4" />
                              <span>WHATSAPP PANEL</span>
                            </button>
                          </div>
                        </div>

                        {/* Interactive Circuit Overlay & Logo Block */}
                        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-45">
                            <div className="w-[300px] h-[300px] rounded-full border border-[#BA9E6B]/15 animate-spin-slow" />
                            <div className="w-[320px] h-[320px] rounded-full border border-dashed border-[#0B1F44]/10 animate-spin-slow duration-[40s] rotate-[-45deg]" />
                          </div>

                          <div className="w-full max-w-[380px] aspect-square rounded-3xl overflow-hidden bg-white border border-[#0B1F44]/10 p-5 shadow-xl relative z-10">
                            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#FAF9F6] flex items-center justify-center">
                              <AnimatePresence mode="wait">
                                <motion.img
                                  key={heroSlide}
                                  src={heroSliderImages[heroSlide]}
                                  alt="VELTRIX PROJECTS"
                                  className="absolute inset-0 w-full h-full object-cover opacity-80"
                                  initial={{ opacity: 0, scale: 1.1 }}
                                  animate={{ opacity: 0.85, scale: 1 }}
                                  exit={{ opacity: 0 }}
                                  transition={{ duration: 1 }}
                                />
                              </AnimatePresence>

                              <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-transparent opacity-95" />

                              <div className="absolute inset-0 flex flex-col justify-end p-6 text-center select-none">
                                <h4 className="text-[10px] font-mono tracking-widest text-[#BA9E6B] uppercase mb-1 font-bold">
                                  VELTRIX INNOVATION PATHWAY
                                </h4>
                                <p className="text-xs font-serif italic text-[#0B1F44] leading-relaxed font-semibold">
                                  "Translating advanced academic hypothesis into concrete modern technologies."
                                </p>
                              </div>

                              {/* Slider indicator dots */}
                              <div className="absolute top-4 right-4 flex gap-1.5 z-20">
                                {heroSliderImages.map((_, dotIdx) => (
                                  <button
                                    key={dotIdx}
                                    onClick={() => setHeroSlide(dotIdx)}
                                    className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                                      heroSlide === dotIdx ? "bg-brand-gold w-4" : "bg-[#0B1F44]/25 hover:bg-[#0B1F44]/50"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* STATS COUNT OVERVIEW */}
                    <div className="py-6 border-y border-[#0B1F44]/5 bg-white/50">
                      <StatsCounter />
                    </div>

                    {/* FRONT PAGE OVERVIEW HIGHLIGHTS */}
                    <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                      <div className="p-8 rounded-2xl bg-white border border-[#0B1F44]/5 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0B1F44] font-serif">PhD Academic Mentorship</h3>
                        <p className="text-xs text-[#596780] leading-relaxed">
                          Complete professional guidance covering literature reviews, thesis blueprints, and peer corrections. Built to turn hypotheses into SCI-indexed realities.
                        </p>
                        <button 
                          onClick={() => { setActivePage("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="text-xs font-bold text-brand-gold hover:text-[#0B1F44] flex items-center gap-1 group font-mono"
                        >
                          <span>OUR ACADEMICS</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                      </div>

                      <div className="p-8 rounded-2xl bg-white border border-[#0B1F44]/5 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                          <Cpu className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0B1F44] font-serif">Simulations & Hardware</h3>
                        <p className="text-xs text-[#596780] leading-relaxed">
                          Custom hardware integration featuring logic analyzer diagnostics, embedded processor coding (STM32, ESP32, FPGA), and robust Matlab/VLSI software simulation blocks.
                        </p>
                        <button 
                          onClick={() => { setActivePage("technology"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="text-xs font-bold text-brand-gold hover:text-[#0B1F44] flex items-center gap-1 group font-mono"
                        >
                          <span>LAB PLATFORMS</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                      </div>

                      <div className="p-8 rounded-2xl bg-white border border-[#0B1F44]/5 shadow-sm space-y-4 hover:shadow-md transition-shadow">
                        <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <h3 className="text-lg font-bold text-[#0B1F44] font-serif">Uncompromised Ethical Code</h3>
                        <p className="text-xs text-[#596780] leading-relaxed">
                          We operate with strict privacy standards and a firm anti-plagiarism stance. Genuine references, Scopus formatting guidelines, and thorough data modeling are standard.
                        </p>
                        <button 
                          onClick={() => { setActivePage("work"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="text-xs font-bold text-brand-gold hover:text-[#0B1F44] flex items-center gap-1 group font-mono"
                        >
                          <span>OPERATIONAL STEPS</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                      </div>
                    </section>

                    {/* MINI TESTIMONY ACCENTS */}
                    <section className="py-16 bg-[#0b1f44]/5 px-6">
                      <div className="max-w-4xl mx-auto text-center space-y-4">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#BA9E6B] font-bold">SCIENTIFIC IMPACT</span>
                        <h3 className="text-2xl font-serif text-[#0B1F44] font-bold">Trusted by Thousands of Modern Researchers</h3>
                        <p className="text-xs text-[#596780] max-w-xl mx-auto">
                          Our team has formatted and prototyped over 750 successful peer-reviewed documents across internationally renowned journal indices.
                        </p>
                        <button
                          onClick={() => { setActivePage("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="mt-4 py-2.5 px-6 rounded-xl bg-[#0B1F44] hover:bg-brand-gold text-white text-xs font-serif font-bold tracking-widest uppercase transition-all duration-300"
                        >
                          GET IN TOUCH NOW
                        </button>
                      </div>
                    </section>
                  </motion.div>
                )}

                {activePage === "about" && (
                  <motion.div
                    key="about-page"
                    variants={pageTransitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="max-w-7xl mx-auto px-6 py-12 space-y-16"
                  >
                    {/* Header Heading */}
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                      <span className="text-[10px] font-mono tracking-[0.25em] font-extrabold text-[#BA9E6B] uppercase">GET TO KNOW US</span>
                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1F44]">
                        Academic Authenticity & Hardware Prowess
                      </h2>
                      <p className="text-xs text-[#596780]">
                        Empowering researchers and technological pioneers globally with unmatched ethical standards.
                      </p>
                    </div>

                    {/* About details layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                      <div className="space-y-6 text-left">
                        <h3 className="text-2xl font-serif font-bold text-[#0B1F44]">Academic Integrity Since 2022</h3>
                        <p className="text-sm text-[#596780]/90 leading-relaxed">
                          VELTRIX RESEARCHORA has established itself as an international benchmark of scholarly excellence. With a dedicated panel of Scopus journal editors, IEEE embedded firmware engineers, and SPSS data statisticians, we guide candidates to craft unique, robust, and industry-aligned academic reports.
                        </p>
                        <p className="text-sm text-[#596780]/90 leading-relaxed">
                          We handle full research pathways starting with original abstract outlines and literature surveys, leading through sophisticated software simulation steps, and wrapping up with comprehensive thesis writing and professional defense slide decks.
                        </p>
                      </div>

                      {/* Side Vision values card panels */}
                      <div className="space-y-4">
                        <div className="p-6 rounded-2xl bg-white border border-[#0B1F44]/5 shadow-sm text-left relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#BA9E6B]" />
                          <h4 className="text-sm font-bold uppercase tracking-wider text-[#0B1F44] font-serif mb-1">Our Mission</h4>
                          <p className="text-xs text-[#596780] italic">
                            "To provide ethical, innovative, and high-quality research solutions in PhD guidance, journal publication, and hardware implementation, empowering scholars and researchers to achieve academic and technological excellence."
                          </p>
                        </div>

                        <div className="p-6 rounded-2xl bg-white border border-[#0B1F44]/5 shadow-sm text-left relative overflow-hidden">
                          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0B1F44]" />
                          <h4 className="text-sm font-bold uppercase tracking-wider text-[#0B1F44] font-serif mb-1">Our Vision</h4>
                          <p className="text-xs text-[#596780] italic">
                            "To become a globally trusted research and innovation partner recognized for academic integrity, advanced technological solutions, and impactful scholarly contributions."
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Core Pillars 4x2 bento grid */}
                    <div className="space-y-8 pt-6">
                      <div className="text-center max-w-md mx-auto space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-brand-gold font-bold">FOUNDATIONAL MATRIX</span>
                        <h3 className="text-2xl font-serif font-bold text-[#0B1F44]">Our Foundations of Integrity</h3>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                          { title: "Innovation", text: "Pushing the limits of modern software, embedded code, & analog sensor rigs.", icon: BrainCircuit },
                          { title: "Ethics First", text: "100% genuine results verified against strict global university mandates.", icon: ShieldCheck },
                          { title: "Academic Excellence", text: "Focused on placing research drafts in Scopus, SCI, and high-tier peer journals.", icon: Award },
                          { title: "Plagiarism Controls", text: "Thorough similarity checking, clean paraphrasing, and verified source logs.", icon: Glasses },
                          { title: "Iterative Refinement", text: "Continuous assistance matching exact technical reviewer feedback and comments.", icon: HeartHandshake },
                          { title: "Direct Coaching", text: "Direct consultation alongside certified doctorate mentors and firmware coders.", icon: UserCheck },
                          { title: "Advanced Platforms", text: "Matlab architectures, NS3 simulation modeling, and SPSS math matrices database.", icon: Code2 },
                          { title: "Synopsis Success", text: "Empowering scholars so they can confidently explain their defense parameters.", icon: Flame },
                        ].map((pillar, pIdx) => {
                          const PillarIcon = pillar.icon;
                          return (
                            <div key={pIdx} className="p-6 rounded-2xl bg-white border border-[#0B1F44]/5 shadow-sm text-left space-y-3 hovering-accent">
                              <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                                <PillarIcon className="w-5 h-5" />
                              </div>
                              <h4 className="text-sm font-bold font-serif text-[#0B1F44]">{pillar.title}</h4>
                              <p className="text-xs text-[#596780] leading-relaxed">{pillar.text}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activePage === "services" && (
                  <motion.div
                    key="services-page"
                    variants={pageTransitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="max-w-7xl mx-auto px-6 py-12 space-y-12"
                  >
                    {/* Page Header */}
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                      <span className="text-[10px] font-mono tracking-[0.25em] font-extrabold text-[#BA9E6B] uppercase">SPECIALTY FIELDS</span>
                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1F44]">
                        Bespoke Scholarly & Technological Services
                      </h2>
                      <p className="text-xs text-[#596780]">
                        Explore specialized modules led by certified experts, covering thesis composition, data modeling, and physical microcontroller setups.
                      </p>
                    </div>

                    {/* Filter Category Tabs bar */}
                    <div className="flex justify-center flex-wrap gap-2.5 pb-4 max-w-3xl mx-auto border-b border-[#0B1F44]/5">
                      {servicesData.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-4 py-2.5 text-[11px] font-serif font-bold tracking-widest rounded-xl transition-all uppercase flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                            selectedCategory === cat.id
                              ? "bg-[#0B1F44] text-white shadow"
                              : "bg-white border border-[#0B1F44]/15 text-[#0B1F44]/80 hover:bg-[#FAF9F6]"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>

                    {/* Display Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                      {servicesData
                        .find((cat) => cat.id === selectedCategory)
                        ?.items.map((item) => (
                          <div
                            key={item.id}
                            onClick={() => setSelectedServiceDetail(item)}
                            className="p-6 rounded-2xl bg-white border border-[#0B1F44]/5 hover:border-brand-gold/60 pointer-events-auto transition-all duration-300 shadow-sm flex flex-col justify-between cursor-pointer group"
                          >
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <span className="text-[9px] font-mono font-bold tracking-widest text-[#BA9E6B] bg-brand-gold/10 px-2 py-0.5 rounded">
                                  MODULE {item.id.toUpperCase()}
                                </span>
                                <Sparkles className="w-3.5 h-3.5 text-[#BA9E6B]/60 group-hover:text-brand-gold transition-colors" />
                              </div>

                              <h3 className="text-md font-serif font-bold text-[#0B1F44] group-hover:text-brand-gold transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-xs text-[#596780] leading-relaxed line-clamp-3">
                                {item.description}
                              </p>
                            </div>

                            <div className="pt-4 mt-4 border-t border-[#0B1F44]/5 flex items-center justify-between text-[10px] text-brand-gold font-mono tracking-widest font-bold">
                              <span>EXAMINE PARAMETERS</span>
                              <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                            </div>
                          </div>
                        ))}
                    </div>
                  </motion.div>
                )}

                {activePage === "technology" && (
                  <motion.div
                    key="technology-page"
                    variants={pageTransitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="max-w-7xl mx-auto px-6 py-12 space-y-12 animate-fade-in"
                  >
                    {/* Header Heading */}
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                      <span className="text-[10px] font-mono tracking-[0.25em] font-extrabold text-[#BA9E6B] uppercase">HARDWARE & SIMULATION ENGINE</span>
                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1F44]">
                        Sovereign Hardware Implementations
                      </h2>
                      <p className="text-xs text-[#596780]">
                        We operate real diagnostic boards, mixed-signal analyzers, and modeling processors inside the Veltrix Lab matrix.
                      </p>
                    </div>

                    {/* Tech grids */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
                      {staticTechnologies.map((tech) => (
                        <div
                          key={tech.id}
                          className="p-6 rounded-2xl bg-white border border-[#0B1F44]/5 shadow-sm space-y-3 relative overflow-hidden"
                          style={{ borderLeft: `3px solid ${tech.accentColor}` }}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[9px] font-mono text-brand-gold uppercase tracking-widest font-bold font-serif">Lab Verified System</span>
                            <div 
                              className="px-2 py-0.5 rounded text-[8px] font-mono tracking-widest uppercase font-bold"
                              style={{ color: tech.accentColor, backgroundColor: `${tech.accentColor}10` }}
                            >
                              Core Node
                            </div>
                          </div>

                          <h4 className="text-[#0B1F44] font-serif font-bold text-md pr-6">
                            {tech.name}
                          </h4>
                          <p className="text-xs text-[#596780] leading-relaxed">
                            {tech.description}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Custom lab preview details block */}
                    <div className="p-8 rounded-2xl bg-[#0B1F44]/5 border border-[#0B1F44]/10 max-w-4xl mx-auto text-left gap-8 grid grid-cols-1 md:grid-cols-12 items-center">
                      <div className="md:col-span-8 space-y-3">
                        <span className="text-[9px] font-mono uppercase bg-brand-gold/15 px-3 py-1 text-brand-gold tracking-widest rounded-full font-bold">LAB SCHEMATIC MATRIX</span>
                        <h4 className="text-lg font-serif font-bold text-[#0B1F44]">Need Custom FPGA or Embedded Sensor Prototyping?</h4>
                        <p className="text-xs text-[#596780] leading-relaxed">
                          Our developers flash clean C/C++ microchip instructions and map physical hardware circuits (STM32, Raspberry Pi Pico, RF modules, Arduino platforms) to cross-verify academic hypothesis blocks accurately.
                        </p>
                      </div>
                      <div className="md:col-span-4 flex justify-end">
                        <button
                          onClick={() => { setActivePage("contact"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                          className="py-3 px-6 rounded-xl bg-[#BA9E6B] hover:bg-[#0B1F44] text-white text-xs font-serif font-bold tracking-widest uppercase transition-colors shadow-md w-full text-center"
                        >
                          REQUEST SIMULATION
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activePage === "work" && (
                  <motion.div
                    key="work-page"
                    variants={pageTransitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="max-w-7xl mx-auto px-6 py-12 space-y-20"
                  >
                    {/* Operational Protocols Timeline Header */}
                    <div className="space-y-12">
                      <div className="text-center max-w-2xl mx-auto space-y-3">
                        <span className="text-[10px] font-mono tracking-[0.25em] font-extrabold text-[#BA9E6B] uppercase">SYSTEM PROTOCOLS</span>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1F44]">
                          Our Operational Matrix Timeline
                        </h2>
                        <p className="text-xs text-[#596780]">
                          How we execute, review, and finalize scholar proposals from baseline requirement analysis to final peer-approved publication.
                        </p>
                      </div>

                      <div className="relative grid grid-cols-1 md:grid-cols-5 gap-6 text-center">
                        <div className="absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-brand-gold/25 hidden md:block" />

                        {[
                          { step: "01", name: "Domain Analysis", info: "Detailed virtual consultation discussing university instructions, dataset needs, and targeted Scopus journals.", icon: "💬" },
                          { step: "02", name: "Structured Planning", info: "We document clean hypotheses parameters, formulate the code timeline, and propose specific peer references.", icon: "📋" },
                          { step: "03", name: "Fidelity Development", info: "Candidates receive actual, error-free source codes, software setup instructions, and chapter drafts.", icon: "⚙️" },
                          { step: "04", name: "Rigorous Screening", info: "Drafts are formatted under strict academic style rules and screened with authentic similarity-checking reports.", icon: "🔍" },
                          { step: "05", name: "Handover & Presentation Support", info: "Complete academic materials are safely delivered alongside custom defense slide decks.", icon: "🎓" }
                        ].map((proc, pIdx) => (
                          <div key={pIdx} className="relative z-10 p-6 rounded-2xl bg-white border border-[#0B1F44]/5 flex flex-col items-center space-y-3 shadow-sm hover:border-[#BA9E6B]/40 transition-colors">
                            <div className="w-10 h-10 rounded-full bg-[#0B1F44] text-[#FAF9F6] text-xs font-mono flex items-center justify-center font-bold">
                              {proc.step}
                            </div>
                            <h4 className="text-xs font-bold text-[#0B1F44] font-serif leading-none pt-1">{proc.name}</h4>
                            <p className="text-[10px] text-[#596780] leading-relaxed pt-1">{proc.info}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* FAQ section stacked beautifully */}
                    <div className="max-w-3xl mx-auto space-y-8 pt-12 border-t border-[#0B1F44]/5">
                      <div className="text-center space-y-2">
                        <span className="text-[10px] font-mono uppercase text-brand-gold font-bold">RESOLVED DIRECTIVES</span>
                        <h3 className="text-2xl font-serif font-bold text-[#0B1F44]">Frequently Resolved Questions</h3>
                        <p className="text-xs text-[#596780]">
                          Common insights on pricing models, academic confidentiality, journal formatting, and client controls.
                        </p>
                      </div>

                      <div className="space-y-4 text-left">
                        {staticFAQs.map((faq, index) => {
                          const isOpen = activeFaq === index;
                          return (
                            <div
                              key={faq.id}
                              className="rounded-xl bg-white border border-[#0B1F44]/5 overflow-hidden shadow-sm"
                            >
                              <button
                                onClick={() => setActiveFaq(isOpen ? null : index)}
                                className="w-full p-4 flex justify-between items-center text-left text-[#0B1F44] font-serif select-none cursor-pointer"
                              >
                                <span className="text-xs md:text-sm font-bold pr-4">
                                  {faq.question}
                                </span>
                                <span className="text-brand-gold">
                                  {isOpen ? <ChevronUp className="w-4.5 h-4.5" /> : <ChevronDown className="w-4.5 h-4.5" />}
                                </span>
                              </button>

                              <AnimatePresence initial={false}>
                                {isOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.25 }}
                                    className="border-t border-[#0B1F44]/5 bg-[#FAF9F6]/40"
                                  >
                                    <p className="p-4 text-xs text-[#596780] leading-relaxed">
                                      {faq.answer}
                                    </p>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activePage === "contact" && (
                  <motion.div
                    key="contact-page"
                    variants={pageTransitionVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="max-w-7xl mx-auto px-6 py-12 space-y-12"
                  >
                    {/* Header Details */}
                    <div className="text-center max-w-2xl mx-auto space-y-3">
                      <span className="text-[10px] font-mono tracking-[0.25em] font-extrabold text-[#BA9E6B] uppercase">SECURE PORTAL CONNECTION</span>
                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#0B1F44]">
                        Submit Your Research Abstract
                      </h2>
                      <p className="text-xs text-[#596780]">
                        Connect directly with our doctorate coaches and embedded lab techs. Secure, prompt, and entirely confidential answers guaranteed.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                      {/* Left Block details */}
                      <div className="lg:col-span-5 text-left space-y-6">
                        <h3 className="text-xl font-serif font-bold text-[#0B1F44]">Operational Contacts</h3>
                        <p className="text-xs text-[#596780]/90 leading-relaxed">
                          Whether you require custom microprocessor circuits, SPSS path diagrams, thesis formatting alignments, or an authentic similarity analysis, submit an enquiry. Our senior research consultants will review your abstract parameters.
                        </p>

                        <div className="space-y-4 pt-2">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                              <Mail className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-[9px] font-mono uppercase tracking-wider text-[#596780]">Secure Email gateway</h4>
                              <a href="mailto:veltrixresearchora@gmail.com" className="text-xs text-[#0B1F44] hover:text-brand-gold font-bold">
                                veltrixresearchora@gmail.com
                              </a>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                              <Phone className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="text-[9px] font-mono uppercase tracking-wider text-[#596780]">Consultant helpline</h4>
                              <a href="tel:+919385527437" className="text-xs text-[#0B1F44] hover:text-brand-gold font-bold">
                                +91 9385527437
                              </a>
                            </div>
                          </div>
                        </div>

                        {/* Social Blocks */}
                        <div className="pt-6 space-y-3">
                          <h4 className="text-[9px] font-mono uppercase font-bold text-brand-gold">Official Social Streams</h4>
                          <div className="flex flex-wrap items-center gap-3">
                            <a 
                              href="https://www.instagram.com/veltrixresearchora?igsh=ZDZma2c5dDEwaHMz" 
                              target="_blank" 
                              rel="noreferrer"
                              className="p-3 bg-brand-gold/10 hover:bg-brand-gold/20 rounded-xl border border-brand-gold/20 text-brand-gold hover:scale-105 transition-all text-xs flex items-center gap-2 cursor-pointer font-bold font-mono text-[9px] uppercase tracking-wider"
                            >
                              <Instagram className="w-4 h-4" />
                              <span>Veltrixresearchora</span>
                            </a>
                            
                            <button 
                              onClick={() => window.open("https://wa.me/919385527437", "_blank")}
                              className="p-3 bg-green-500/10 hover:bg-green-500/20 rounded-xl border border-green-500/25 text-[#20ba5a] hover:scale-105 transition-all text-xs flex items-center gap-1.5 cursor-pointer font-bold font-mono text-[9px] uppercase tracking-wider"
                            >
                              <MessageSquare className="w-4 h-4" />
                              <span>Direct chat Link</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Form panel */}
                      <div className="lg:col-span-7">
                        <div className="p-6 md:p-8 rounded-2xl bg-white border border-[#0B1F44]/5 shadow-sm text-left">
                          <form onSubmit={handleContactSubmit} className="space-y-4">
                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-gold mb-1 font-bold">Candidate Scholar Name *</label>
                              <input
                                type="text"
                                name="name"
                                required
                                value={contactForm.name}
                                onChange={handleFormInputChange}
                                placeholder="e.g., Dr. Jane Doe / Scholar Candidate"
                                className="w-full bg-[#FAF9F6]/60 border border-[#0B1F44]/15 rounded-xl py-2.5 px-4 text-xs text-[#0B1F44] focus:outline-none focus:border-brand-gold transition-colors"
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-gold mb-1 font-bold">Email Address *</label>
                                <input
                                  type="email"
                                  name="email"
                                  required
                                  value={contactForm.email}
                                  onChange={handleFormInputChange}
                                  placeholder="scholar@university.edu"
                                  className="w-full bg-[#FAF9F6]/60 border border-[#0B1F44]/15 rounded-xl py-2.5 px-4 text-xs text-[#0B1F44] focus:outline-none focus:border-brand-gold transition-colors"
                                />
                              </div>
                              <div>
                                <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-gold mb-1 font-bold">Phone Number</label>
                                <input
                                  type="text"
                                  name="phone"
                                  value={contactForm.phone}
                                  onChange={handleFormInputChange}
                                  placeholder="e.g., +91 93855 27437"
                                  className="w-full bg-[#FAF9F6]/60 border border-[#0B1F44]/15 rounded-xl py-2.5 px-4 text-xs text-[#0B1F44] focus:outline-none focus:border-brand-gold transition-colors"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-gold mb-1 font-bold">Enquiry Academic Field</label>
                              <select
                                name="service"
                                value={contactForm.service}
                                onChange={handleFormInputChange}
                                className="w-full bg-white border border-[#0B1F44]/15 rounded-xl py-2.5 px-3 text-xs text-[#0B1F44] focus:outline-none focus:border-brand-gold transition-colors"
                              >
                                <option value="Research Proposal Prep">Research Proposal Prep</option>
                                <option value="PhD Synopsis Framing">PhD Synopsis Framing</option>
                                <option value="Manuscript Preparation">Manuscript Preparation Alignment</option>
                                <option value="Scopus Journal Publication">Scopus Journal Support</option>
                                <option value="Embedded Systems Hardware">Embedded systems & VLSI hardware design</option>
                                <option value="SPSS Qualitative Modeling">SPSS Structural Math modeling</option>
                              </select>
                            </div>

                            <div>
                              <label className="block text-[9px] uppercase font-mono tracking-wider text-brand-gold mb-1 font-bold">Abstract or Parameters *</label>
                              <textarea
                                name="message"
                                required
                                rows={4}
                                value={contactForm.message}
                                onChange={handleFormInputChange}
                                placeholder="Paste draft titles, university instructions, sensor modules needed, or abstract paragraphs here..."
                                className="w-full bg-[#FAF9F6]/60 border border-[#0B1F44]/15 rounded-xl py-2.5 px-4 text-xs text-[#0B1F44] focus:outline-none focus:border-brand-gold transition-colors resize-none"
                              />
                            </div>

                            <button
                              type="submit"
                              disabled={formSubmitted}
                              className="w-full py-3 px-6 rounded-xl bg-[#0B1F44] hover:bg-[#BA9E6B] text-[#FAF9F6] text-xs font-bold font-serif tracking-widest uppercase transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                            >
                              {formSubmitted ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                  <span>TRANSLATING TELEMETRY PACKET...</span>
                                </>
                              ) : (
                                <>
                                  <Send className="w-4.5 h-4.5" />
                                  <span>SECURE WA DISPATCH</span>
                                </>
                              )}
                            </button>
                          </form>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* SERVICES POPUP SPECIFICATION MODAL */}
            <AnimatePresence>
              {selectedServiceDetail && (
                <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm font-serif select-none">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 15 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 15 }}
                    className="max-w-lg w-full bg-white border border-[#0B1F44]/15 rounded-2xl shadow-2xl p-6 md:p-8 relative text-left"
                  >
                    <button
                      onClick={() => setSelectedServiceDetail(null)}
                      className="absolute top-4 right-4 text-[#0B1F44]/60 hover:text-[#0B1F44] p-1 rounded-lg hover:bg-[#0B1F44]/5 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="space-y-4">
                      <span className="text-[9px] font-mono text-[#BA9E6B] font-bold uppercase tracking-widest bg-brand-gold/10 border border-[#BA9E6B]/25 py-1 px-3 rounded-full inline-block">
                        Veltrix Spec Module Detail
                      </span>
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-[#0B1F44] leading-normal pt-1">
                        {selectedServiceDetail.title}
                      </h3>
                      <p className="text-xs text-[#596780] leading-relaxed">
                        {selectedServiceDetail.description}
                      </p>

                      <div className="space-y-2 pt-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#BA9E6B] font-bold block">
                          Technical Outcome Parameters:
                        </span>
                        <ul className="space-y-2">
                          {selectedServiceDetail.details.map((detail, dIdx) => (
                            <li key={dIdx} className="text-xs text-[#596780] flex items-start gap-2">
                              <span className="text-[#BA9E6B] mt-1">•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Direct Consulting Action */}
                      <div className="pt-6 flex gap-3">
                        <button
                          onClick={() => {
                            const detailMsg = `*Academic consultation module request*%0A%0A*Name:* Scholar Candidate%0A*Service Interest:* ${encodeURIComponent(selectedServiceDetail.title)}`;
                            const waLaunchUrl = `https://wa.me/919385527437?text=${detailMsg}`;
                            window.open(waLaunchUrl, "_blank");
                          }}
                          className="flex-1 py-2.5 px-4 rounded-xl bg-[#0B1F44] hover:bg-[#BA9E6B] text-white text-xs tracking-widest uppercase font-serif font-bold transition-colors shadow-sm cursor-pointer"
                        >
                          CONSULT STAFF DESK
                        </button>
                        <button
                          onClick={() => setSelectedServiceDetail(null)}
                          className="py-2.5 px-4 rounded-xl border border-[#0B1F44]/15 text-[#0B1F44] hover:bg-[#FAF9F6] text-xs font-serif font-bold transition-colors cursor-pointer"
                        >
                          DISMISS
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

            {/* CORE PREMIUM FOOTER */}
            <footer className="bg-[#FAF9F6] border-t border-[#0B1F44]/10 py-16 px-6 md:px-12 select-none font-serif text-left">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#0B1F44]/10">
                {/* Brand description footer block */}
                <div className="lg:col-span-5 space-y-4">
                  <Logo size="sm" glow={false} className="self-start items-start justify-start flex align-left ml-0 pl-0 scale-90" />
                  <p className="text-xs text-[#596780] leading-relaxed max-w-sm mt-3">
                    Premium academic thesis mentoring, peer SCI/Scopus journal alignments, qualitative data matrices, and advanced microprocessor lab testing models. Active since 2022.
                  </p>
                  <div className="flex gap-4 text-[#596780] text-[10px] font-mono">
                    <span>SECURED ENCRYPTION SYSTEM</span>
                    <span className="text-brand-gold font-bold">● ONLINE GATEWAY</span>
                  </div>
                </div>

                {/* Navigation and quick links footer block */}
                <div className="lg:col-span-3 space-y-4">
                  <h4 className="text-xs font-bold text-[#0B1F44] uppercase tracking-wider">Operational Links</h4>
                  <ul className="space-y-2 text-xs text-[#596780]">
                    <li>
                      <button 
                        onClick={() => { setActivePage("about"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="hover:text-brand-gold transition-colors text-left bg-transparent border-none p-0 cursor-pointer"
                      >
                        About Corporate Info
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => { setActivePage("services"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="hover:text-brand-gold transition-colors text-left bg-transparent border-none p-0 cursor-pointer"
                      >
                        Services Catalog
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => { setActivePage("technology"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="hover:text-brand-gold transition-colors text-left bg-transparent border-none p-0 cursor-pointer"
                      >
                        Lab Simulation Arrays
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => { setActivePage("work"); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        className="hover:text-brand-gold transition-colors text-left bg-transparent border-none p-0 cursor-pointer"
                      >
                        Interactive FAQ Directives
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Support details footer block */}
                <div className="lg:col-span-4 space-y-4">
                  <h4 className="text-xs font-bold text-[#0B1F44] uppercase tracking-wider">Office Inquiries</h4>
                  <p className="text-xs text-[#596780]">
                    HELPLINE: +91 9385527437 <br />
                    EMAIL: veltrixresearchora@gmail.com
                  </p>
                  <p className="text-[10px] text-brand-gold font-mono uppercase tracking-widest font-bold">
                    Hours: Mon - Sat 09:00 - 19:00 IST (UTC+5:30)
                  </p>
                </div>
              </div>

              {/* Copyright panel line */}
              <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#596780]/80">
                <p>© 2022-{new Date().getFullYear()} VELTRIX RESEARCHORA. All Rights Reserved.</p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-[#596780]/40">
                  Formulated with Academic Integrity & Engineering Excellence
                </p>
              </div>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
