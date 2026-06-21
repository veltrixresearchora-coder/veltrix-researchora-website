import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "viewport";
  glow?: boolean;
}

export default function Logo({ className = "", size = "md", glow = false }: LogoProps) {
  const widths: Record<string, number> = {
    sm: 130,
    md: 220,
    lg: 320,
    xl: 420,
    viewport: 240,
  };

  const width = widths[size] ?? 220;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <img
        src="/logo.png"
        alt="Veltrix Researchora"
        style={{
          width: width,
          height: "auto",
          objectFit: "contain",
          display: "block",
          filter: glow ? "drop-shadow(0 0 12px rgba(201,168,76,0.65))" : "none",
        }}
      />
    </div>
  );
}
