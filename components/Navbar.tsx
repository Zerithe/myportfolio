import React from "react";
import { Menu } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="relative z-50 flex items-center justify-between px-6 py-6 max-w-7xl mx-auto">
        <div className="text-xl font-bold tracking-widest text-white/90">
          JO<span className="text-purple-500">.</span>DEV
        </div>
        
        <div className="md:flex items-center space-x-8 text-sm font-medium text-gray-400">
          <a href="#" className="hover:text-white transition-colors">About</a>
          <a href="#" className="hover:text-white transition-colors">Skills</a>
          <a href="#" className="hover:text-white transition-colors">Experience</a>
          <a href="#" className="hover:text-white transition-colors">Projects</a>
        </div>

        {/* make a surprise button */}
        <div className="hidden md:block px-4 py-2 text-xs font-semibold tracking-wider border border-gray-700 rounded-full bg-white/5 backdrop-blur-sm">
          
        </div>

      </nav>

  );
}

/**
 * <div className="hidden md:block px-4 py-2 text-xs font-semibold tracking-wider border border-gray-700 rounded-full bg-white/5 backdrop-blur-sm">
          Next.js + Tailwind
        </div>
 */