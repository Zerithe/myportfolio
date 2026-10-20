import React, { useEffect, useState } from "react";
import { Menu, X, Sparkles, PartyPopper, CheckCircle2, Terminal, RefreshCw, ChevronRight } from "lucide-react";

const surpriseCards = [
  {
    title: "⚡ Secret Dev Mode Activated!",
    quote: "“It's not a bug – it's an undocumented feature.”",
    stat: "Coffee converted into C++ & React code: 1,480+ cups",
    highlight: "Built with 💜 Next.js, Tailwind CSS & Supabase"
  },
  {
    title: "🚀 Easter Egg Unlocked!",
    quote: "“There are 10 types of people in the world: those who understand binary, and those who don't.”",
    stat: "Favorite Keyboard Shortcut: Ctrl + Z (Life saver)",
    highlight: "Cross-platform Game Engines & Full-stack Architecture Specialist"
  },
  {
    title: "🎮 Gamer & Graphics Geek!",
    quote: "“Simplicity is prerequisite for reliability.” — Edsger W. Dijkstra",
    stat: "Custom Shaders Written: 250+ GLSL/HLSL files",
    highlight: "BGFX rendering + Cross-hatch shader algorithms enthusiast"
  }
];

export default function Navbar() {
  // States for Navbar functionality & sliding navigation
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [scrolled, setScrolled] = useState(false);

  // States for Surprise Modal & Particle celebration
  const [showSurpriseModal, setShowSurpriseModal] = useState(false);
  const [surpriseIndex, setSurpriseIndex] = useState(0);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; color: string; size: number }[]>([]);

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Toggle compact sticky navbar background on scroll
      setScrolled(window.scrollY > 20);

      // Explicit check when near top of the page
      if (window.scrollY < 150) {
        setActiveSection('about');
        return;
      }

      // Track active section using viewport positions
      const sections = ['skills', 'experience', 'projects'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Active if section top is near the upper viewport
          if (rect.top <= 220 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on load
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    setActiveSection(sectionId);

    // If About is clicked, slide all the way to top of window
    if (sectionId === 'about') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80; // Account for fixed header height
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const triggerSurprise = () => {
    // Generate celebratory floating particle effect
    const colors = ['#a855f7', '#10b981', '#3b82f6', '#f59e0b', '#ec4899'];
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      y: Math.random() * 50 + 20,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 4
    }));
    
    setParticles(newParticles);
    setSurpriseIndex((prev) => (prev + 1) % surpriseCards.length);
    setShowSurpriseModal(true);

    setTimeout(() => {
      setParticles([]);
    }, 2500);
  };

  return (
    <>
      {/* Particle Animation Layer for Surprise Event */}
      {particles.length > 0 && (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full animate-bounce"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                boxShadow: `0 0 12px ${p.color}`,
                transition: 'all 1s ease-out'
              }}
            />
          ))}
        </div>
      )}

      {/* Main Header / Navbar */}
      <header className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#0a0c0f]/80 backdrop-blur-md border-b border-white/10 shadow-xl py-4' : 'bg-transparent py-6'
      }`}>
        <nav className="flex items-center justify-between px-6 max-w-7xl mx-auto">
          {/* Brand Logo */}
          <button 
            onClick={() => scrollToSection('about')}
            className="text-xl font-bold tracking-widest text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            JO<span className="text-purple-500">.</span>DEV
          </button>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`transition-all duration-200 relative py-1 cursor-pointer ${
                  activeSection === link.id 
                    ? 'text-purple-400 font-semibold' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full animate-in fade-in duration-300" />
                )}
              </button>
            ))}
          </div>

          {/* Interactive Surprise Button */}
          <div className="hidden md:block">
            <button
              onClick={triggerSurprise}
              className="px-4 py-2 text-xs font-semibold tracking-wider border border-gray-700 hover:border-purple-500/50 rounded-full bg-white/5 backdrop-blur-sm text-purple-300 hover:text-white transition-all duration-300 flex items-center gap-2 group cursor-pointer shadow-[0_0_15px_rgba(168,85,247,0.1)] hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400 group-hover:rotate-12 transition-transform" />
              <span>Surprise!</span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 border-b border-white/10 bg-[#0a0c0f]/95 backdrop-blur-xl px-6 py-6 animate-in slide-in-from-top duration-300 shadow-2xl">
            <div className="flex flex-col space-y-4 text-base font-medium">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-left py-3 px-4 rounded-lg transition-colors flex items-center justify-between ${
                    activeSection === link.id
                      ? 'bg-purple-500/10 text-purple-400 font-semibold border-l-2 border-purple-500'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </button>
              ))}

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    triggerSurprise();
                  }}
                  className="w-full py-3 px-4 text-xs font-semibold tracking-wider border border-purple-500/40 rounded-full bg-gradient-to-r from-purple-500/20 to-emerald-500/20 text-purple-200 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Tap for a Surprise! ✨</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Surprise Easter Egg Modal */}
      {showSurpriseModal && (
        <div 
          className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowSurpriseModal(false)}
        >
          <div 
            className="relative max-w-md w-full bg-gradient-to-b from-[#1a1d26] to-[#111319] border border-purple-500/40 rounded-2xl p-6 shadow-2xl space-y-6 text-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setShowSurpriseModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center mx-auto text-purple-400">
              <PartyPopper className="w-6 h-6 animate-pulse" />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                {surpriseCards[surpriseIndex].title}
              </h3>
              <p className="text-purple-300 italic text-sm">
                {surpriseCards[surpriseIndex].quote}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-left space-y-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{surpriseCards[surpriseIndex].stat}</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300 pt-1">
                <Terminal className="w-4 h-4 shrink-0" />
                <span>{surpriseCards[surpriseIndex].highlight}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={triggerSurprise}
                className="flex-1 py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Spin Another</span>
              </button>
              <button
                onClick={() => setShowSurpriseModal(false)}
                className="py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 text-xs font-medium transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}