import React, { useState, useEffect } from "react";
import { X, Send, Sparkles, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function NewsletterPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user has already dismissed or signed up
    const hasInteracted = localStorage.getItem("veltrix-newsletter-dismissed");
    if (hasInteracted) return;

    // Show popup after 8 seconds of browsing
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    localStorage.setItem("veltrix-newsletter-dismissed", "true");
    setIsVisible(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Record interaction
    localStorage.setItem("veltrix-newsletter-dismissed", "true");
    setSubmitted(true);

    // Mock successful signup, close after 2 seconds
    setTimeout(() => {
      setIsVisible(false);
    }, 2500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm select-none font-serif">
          {/* Main Card Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 180 }}
            className="relative max-w-md w-full glass-panel overflow-hidden rounded-2xl shadow-2xl border border-brand-cyan/35"
          >
            {/* Visual Header / Glowing Ring banner */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-cyan via-brand-violet to-brand-gold animate-pulse-slow" />
            
            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-[#8f96a3] hover:text-white transition-colors duration-150 p-1 rounded-lg hover:bg-white/5 cursor-pointer z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8 flex flex-col items-center text-center">
              {/* Badge Icon */}
              <div className="w-12 h-12 rounded-xl bg-brand-cyan/10 border border-brand-cyan/30 flex items-center justify-center mb-6 text-brand-cyan shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                <BookOpen className="w-6 h-6 animate-pulse" />
              </div>

              {/* Headings */}
              <h3 className="text-xl font-bold text-white tracking-wide">
                VELTRIX CHRONICLES
              </h3>
              <p className="text-[10px] text-brand-gold font-mono tracking-widest uppercase mt-1 mb-3">
                Research & Innovation Insights
              </p>

              {/* Description */}
              <p className="text-xs text-brand-silver/90 leading-relaxed max-w-sm mb-6">
                Subscribe to receive peer-reviewed journal templates, PhD abstract strategies, and updates on advanced embedded & hardware designs. Direct to your scholar desk.
              </p>

              {/* Form/Trigger Section */}
              {!submitted ? (
                <form onSubmit={handleSubmit} className="w-full space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="Enter academic email address"
                      className="w-full text-xs text-white placeholder:text-gray-500 bg-[#030612]/90 border border-brand-violet/30 rounded-xl py-3 px-4 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-gradient-to-r from-brand-violet to-brand-cyan hover:from-brand-cyan hover:to-brand-violet text-white text-xs font-bold rounded-xl transition-all duration-300 shadow-md shadow-brand-violet/25 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>JOIN COGNITIVE CIRCLE</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="w-full py-6 text-brand-cyan font-mono text-xs flex flex-col items-center gap-2 animate-bounce">
                  <Sparkles className="w-5 h-5 text-brand-gold" />
                  <span>TRANSMISSION COMPLETE. WELCOME ABOARD!</span>
                </div>
              )}

              {/* Minor status label */}
              <p className="text-[9px] text-[#4d5668] mt-4 font-mono">
                NO SPAM. SECURE DISMISS AUTOMATICALLY STORED LOCALLY.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
