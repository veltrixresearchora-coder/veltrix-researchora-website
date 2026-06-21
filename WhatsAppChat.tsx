import React, { useState, useEffect } from "react";
import { MessageSquare, Send, X, SendToBack, Sparkles } from "lucide-react";

export default function WhatsAppChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Research Assistance",
    message: ""
  });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show notification badge after 12 seconds to prompt engagement
    const timer = setTimeout(() => {
      setShowNotification(true);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    // Formatting direct text for WhatsApp Link encoding
    const formattedText = `*New Enquiry - VELTRIX RESEARCHORA*%0A%0A` +
      `*Name:* ${encodeURIComponent(formData.name)}%0A` +
      `*Email:* ${encodeURIComponent(formData.email || "Not Provided")}%0A` +
      `*Selected Service:* ${encodeURIComponent(formData.service)}%0A` + 
      `*Message:* ${encodeURIComponent(formData.message)}`;

    const waUrl = `https://wa.me/919385527437?text=${formattedText}`;
    
    // Redirect
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[990] flex flex-col items-end select-none font-serif">
      {/* Quick Chat Popup panel */}
      {isOpen && (
        <div className="mb-4 w-[340px] glass-panel rounded-2xl overflow-hidden shadow-2xl border border-brand-cyan/25 animate-float">
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-brand-slate via-brand-navy to-brand-dark border-b border-brand-violet/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-lg">
                  👩‍🔬
                </div>
                {/* Active Indicator Ring */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-brand-dark rounded-full animate-pulse" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">Research Consultant</h4>
                <p className="text-[10px] text-brand-gold font-mono tracking-widest uppercase">Academic Desk</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-brand-silver hover:text-white transition-colors duration-150 p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Body & Quick Form */}
          <form onSubmit={handleQuickSubmit} className="p-4 space-y-3 bg-[#050B20]/95 text-xs text-brand-silver">
            <div className="text-[11px] text-brand-cyan/90 bg-brand-cyan/5 p-2 rounded-lg border border-brand-cyan/10">
              ⚡ Hello, scholar! Share your research requirement below, and we will consult you instantly via Whatsapp.
            </div>

            {/* Name Input */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-brand-gold mb-1">Your Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Dr. / Mr. / Ms. Name"
                className="w-full bg-[#030612]/80 border border-brand-violet/20 rounded-lg py-1.5 px-3 text-white focus:outline-none focus:border-brand-cyan transition-colors"
              />
            </div>

            {/* Email Input */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-brand-gold mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="scholar@university.edu"
                className="w-full bg-[#030612]/80 border border-brand-violet/20 rounded-lg py-1.5 px-3 text-white focus:outline-none focus:border-brand-cyan transition-colors"
              />
            </div>

            {/* Service Input */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-brand-gold mb-1">Research Service</label>
              <select
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full bg-[#030612] border border-brand-violet/20 rounded-lg py-1.5 px-2 text-white focus:outline-none focus:border-brand-cyan transition-colors"
              >
                <option value="Research Paper">Research Paper Support</option>
                <option value="PhD Proposal">PhD Thesis / Proposal</option>
                <option value="Hardware Implementation">Embedded / Hardware Dev</option>
                <option value="Journal Publication">Scopus / Journal Support</option>
                <option value="Plagiarism Correction">Plagiarism Alignment</option>
              </select>
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-brand-gold mb-1">Your Abstract / Query *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={2}
                placeholder="Describe your research outline..."
                className="w-full bg-[#030612]/80 border border-brand-violet/20 rounded-lg py-1.5 px-3 text-white focus:outline-none focus:border-brand-cyan transition-colors resize-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full mt-2 py-2 px-4 rounded-lg bg-gradient-to-r from-brand-violet to-brand-cyan hover:from-brand-cyan hover:to-brand-violet text-white font-bold transition-all duration-300 shadow-lg shadow-brand-violet/20 hover:shadow-brand-cyan/35 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>LAUNCH WHATSAPP SHELL</span>
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShowNotification(false);
        }}
        className="relative p-4 rounded-full bg-gradient-to-br from-green-500 to-teal-600 hover:from-brand-cyan hover:to-brand-violet text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 border-2 border-white/20 group cursor-pointer"
        style={{ boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)" }}
      >
        <MessageSquare className="w-6 h-6 group-hover:rotate-12 transition-transform duration-200" />
        
        {/* Glowing floating ring */}
        <span className="absolute -inset-1 border border-green-400 rounded-full animate-ping opacity-40 pointer-events-none" />

        {/* Dynamic Support Prompt text on hover */}
        <span className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#050B20] text-[10px] font-mono tracking-widest text-[#00F0FF] py-1 px-3.5 rounded-lg border border-[#00F0FF]/30 whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          CONSULT SCHOLAR DESK
        </span>

        {/* Unread Alert Notification badge */}
        {showNotification && !isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-[9px] font-mono font-bold text-white items-center justify-center">1</span>
          </span>
        )}
      </button>
    </div>
  );
}
