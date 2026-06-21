import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import Logo from "./Logo";

interface PreloaderProps {
  onComplete: () => void;
  key?: string;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  
  const loadingTexts = [
    "INITIALIZING COGNITIVE INTERFACE...",
    "ESTABLISHING QUANTUM ARCHITECTURE...",
    "SYNCHRONIZING SCHOLARLY PROTOCOLS...",
    "MAPPING INNOVATION MATRIX...",
    "VELTRIX LABS SECURE CONNECTIVITY ESTABLISHED",
    "SYSTEMS GO."
  ];

  useEffect(() => {
    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate near end
        const increment = prev > 80 ? Math.random() * 8 + 2 : Math.random() * 4 + 2;
        return Math.min(Math.round(prev + increment), 100);
      });
    }, 45);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Cycle text based on progress
    const segment = 100 / loadingTexts.length;
    const currentSegmentIndex = Math.min(
      Math.floor(progress / segment),
      loadingTexts.length - 1
    );
    setTextIndex(currentSegmentIndex);
  }, [progress]);

  useEffect(() => {
    // Trigger onComplete when progress reaches 100 with a slight delay for cinematic payout
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 bg-[#FAF9F6] z-[9999] flex flex-col items-center justify-center p-6 select-none font-serif overflow-hidden"
    >
      {/* Background Matrix/Grid Overlay */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-transparent to-[#FAF9F6] pointer-events-none" />
      
      {/* Ambient Moving Gold Halo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-[140px] animate-pulse" />

      {/* Main Core Container */}
      <div className="relative flex flex-col items-center max-w-lg w-full text-center">
        {/* Cinematic Logo */}
        <motion.div
          initial={{ scale: 0.88, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="mb-10"
        >
          <Logo size="xl" glow={false} />
        </motion.div>

        {/* Loading details */}
        <div className="w-full space-y-4 px-8 mt-4 relative z-10">
          {/* Animated Progress Bar */}
          <div className="relative h-[2px] bg-[#0B1F44]/10 rounded-full overflow-hidden">
            {/* Elegant Navy progress path */}
            <motion.div
              className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-brand-navy via-[#BA9E6B] to-brand-navy"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          {/* Progress Percent and Status */}
          <div className="flex justify-between items-center text-[11px] font-mono tracking-widest text-[#0B1F44]">
            <span className="text-[#0B1F44]/70">{loadingTexts[textIndex]}</span>
            <span className="text-brand-gold font-bold">{progress}%</span>
          </div>

          {/* Clean system status details */}
          <div className="pt-2 flex justify-center items-center gap-4 text-[9px] font-mono tracking-widest text-brand-silver">
            <span>VELTRIX LABS ENCRYPTION: QUANTUM 4096</span>
            <span className="h-1.5 w-1.5 bg-brand-gold rounded-full animate-ping" />
          </div>
        </div>
      </div>

      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-brand-gold/30" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-brand-gold/30" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-brand-gold/30" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-brand-gold/30" />
    </motion.div>
  );
}
