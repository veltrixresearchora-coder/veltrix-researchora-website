import React, { useEffect, useState, useRef } from "react";

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // path total duration in ms
}

function Counter({ target, suffix = "", prefix = "", duration = 1500 }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressPercentage = Math.min(progress / duration, 1);
      
      // Ease out exponential calculation
      const easedProgress = 1 - Math.pow(1 - progressPercentage, 3);
      setCount(Math.floor(easedProgress * target));

      if (progressPercentage < 1) {
        requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  return (
    <span ref={elementRef} className="tabular-nums">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const stats = [
    {
      value: 2022,
      label: "SINCE",
      description: "Establishing Research Trust",
      glowColor: "rgba(197, 168, 128, 0.4)",
      suffix: "",
      prefix: "",
    },
    {
      value: 100,
      label: "GLOBAL CLIENTS",
      description: "Empowering Worldwide Scholars",
      glowColor: "rgba(0, 240, 255, 0.4)",
      suffix: "+",
      prefix: "",
    },
    {
      value: 200,
      label: "RESEARCH PAPERS",
      description: "Published in Scopus, SCI, Web of Sci",
      glowColor: "rgba(143, 0, 255, 0.4)",
      suffix: "+",
      prefix: "",
    },
    {
      value: 50,
      label: "HARDWARE DESIGNS",
      description: "Completed Laboratory Prototypes",
      glowColor: "rgba(59, 130, 246, 0.4)",
      suffix: "+",
      prefix: "",
    }
  ];

  return (
    <section className="relative py-16 bg-[#020716] overflow-hidden border-y border-brand-violet/10 font-serif">
      {/* Visual backgrid lines */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl glass-panel transition-all duration-300 hover:scale-105 hover:border-brand-cyan/30 flex flex-col justify-center items-center text-center group"
            >
              {/* Outer soft glowing neon spot behind numbers */}
              <div
                className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle 80px at center, ${stat.glowColor}, transparent)`
                }}
              />

              {/* Number Count Display */}
              <div className="text-4xl lg:text-5xl font-bold font-serif text-transparent bg-clip-text bg-gradient-to-b from-white via-brand-silver to-white flex items-center mb-2 tracking-tight">
                <Counter target={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              </div>

              {/* Label */}
              <div className="text-xs uppercase tracking-[0.2em] font-bold text-brand-gold mb-1">
                {stat.label}
              </div>

              {/* Minor Detail */}
              <p className="text-[11px] text-brand-silver/70">
                {stat.description}
              </p>

              {/* Elegant futuristic bottom border highlights */}
              <div className="absolute bottom-0 left-10 right-10 h-[1.5px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
