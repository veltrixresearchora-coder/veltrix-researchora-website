import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import { Search, Menu, X, Sun, Moon, Sparkles, MessageCircle, HelpCircle } from "lucide-react";
import { servicesData, ServiceItem } from "../types";

interface NavbarProps {
  onSearchSelect: (item: ServiceItem) => void;
  activePage: string;
  onChangePage: (page: string) => void;
}

export default function Navbar({ onSearchSelect, activePage, onChangePage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ServiceItem[]>([]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update search results
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const query = searchQuery.toLowerCase();
    const matches: ServiceItem[] = [];
    
    servicesData.forEach((category) => {
      category.items.forEach((item) => {
        if (
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
        ) {
          matches.push(item);
        }
      });
    });
    setSearchResults(matches);
  }, [searchQuery]);

  const handleResultClick = (item: ServiceItem) => {
    onSearchSelect(item);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "services", label: "Services" },
    { id: "technology", label: "Technology" },
    { id: "work", label: "How We Work" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[9990] flex items-start justify-center pt-24 px-4 font-serif">
          <div className="w-full max-w-2xl bg-[#FAF9F6] border border-[#0B1F44]/15 rounded-2xl p-6 shadow-2xl animate-float">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#0B1F44] text-md font-bold flex items-center gap-2">
                <Search className="w-4 h-4 text-brand-gold" />
                <span>QUERY RESEARCH DEPOSITORY</span>
              </h3>
              <button
                onClick={() => setSearchOpen(false)}
                className="text-[#0B1F44]/60 hover:text-[#0B1F44] p-1 rounded-lg hover:bg-[#0B1F44]/5 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Input Bar */}
            <div className="relative mb-4">
              <input
                type="text"
                autoFocus
                placeholder="Search across services (e.g., Scopus, embedded, hardware, SPSS...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-[#0B1F44] placeholder:text-[#596780]/50 border border-brand-gold/45 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-[#0B1F44] transition-colors"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold w-5 h-5" />
            </div>

            {/* Output Panel */}
            <div className="max-h-80 overflow-y-auto space-y-2 pr-1 scrollbar-thin">
              {searchResults.length > 0 ? (
                searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleResultClick(item)}
                    className="p-3 bg-white border border-[#0B1F44]/10 rounded-xl hover:border-brand-gold hover:bg-[#FAF9F6] transition-all cursor-pointer text-left"
                  >
                    <h4 className="text-xs font-bold text-[#0B1F44] tracking-wide">{item.title}</h4>
                    <p className="text-[10px] text-[#596780] mt-1 line-clamp-1">{item.description}</p>
                  </div>
                ))
              ) : searchQuery ? (
                <div className="text-center py-8 text-[#596780]/70 text-xs font-mono">
                  NO ACADEMIC ENTRIES MATCHED. TRY REWORDING QUERY...
                </div>
              ) : (
                <div className="text-center py-8 text-[#596780]/50 text-xs font-mono">
                  TYPE A TERM ABOVE TO INITIATE SYSTEM QUERY PATHS
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Bar Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[800] transition-all duration-300 font-serif ${
          scrolled || activePage !== "home"
            ? "py-3 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-[#0B1F44]/15 shadow-md shadow-[#0B1F44]/5"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex justify-between items-center">
          {/* Logo Brand Title */}
          <button 
            onClick={() => {
              onChangePage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 hover:opacity-95 transition-opacity cursor-pointer text-left bg-transparent border-none p-0"
          >
            <Logo size="sm" glow={false} className="scale-90" />
          </button>

          {/* Nav Menu Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onChangePage(link.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-xs tracking-wider uppercase font-semibold transition-all relative before:absolute before:bottom-[-4px] before:left-0 before:right-0 before:h-[1.5px] before:bg-brand-gold before:transition-transform before:duration-200 cursor-pointer ${
                  activePage === link.id
                    ? "text-[#BA9E6B] before:scale-x-100"
                    : "text-[#0B1F44]/75 hover:text-[#0b1f44] before:scale-x-0 hover:before:scale-x-100"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action Tools Section */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search Input trigger Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 text-[#0B1F44]/85 hover:text-[#0B1F44] hover:bg-[#0B1F44]/5 rounded-full transition-colors cursor-pointer"
              title="Search Services"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Quick Contact Action Button */}
            <button
              onClick={() => {
                onChangePage("contact");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`py-1.5 px-4 rounded-full border text-xs tracking-wider transition-all cursor-pointer font-bold ${
                activePage === "contact"
                  ? "bg-brand-gold text-white border-brand-gold shadow-sm"
                  : "border-brand-gold text-brand-gold hover:bg-[#BA9E6B]/10 hover:shadow-sm"
              }`}
            >
              ENQUIRE NOW
            </button>
          </div>

          {/* Mobile UI Menu and Tools */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Tool bar switches */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 text-[#0B1F44]/80 hover:text-[#0B1F44] cursor-pointer"
            >
              <Search className="w-4.5 h-4.5" />
            </button>

            {/* Burger Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-1.5 text-[#0B1F44]/80 hover:text-[#0B1F44] transition-colors cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown List */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 bg-[#FAF9F6]/95 backdrop-blur-xl border-b border-[#0B1F44]/10 flex flex-col p-6 space-y-4 lg:hidden shadow-lg">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onChangePage(link.id);
                  setIsOpen(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-xs uppercase tracking-widest py-1.5 transition-all text-center font-bold cursor-pointer ${
                  activePage === link.id ? "text-brand-gold" : "text-[#0B1F44]/80 hover:text-[#0B1F44]"
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                onChangePage("contact");
                setIsOpen(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="py-2.5 rounded-xl bg-[#0B1F44] text-white text-xs tracking-wider font-bold transition-all text-center cursor-pointer hover:bg-[#BA9E6B]"
            >
              FREE SAMPLE AUDIT
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
