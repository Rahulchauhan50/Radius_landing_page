/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ShieldCheck, Laptop, GraduationCap } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Radius Elevate Logo */}
        <div className="flex items-center space-x-2">
          {/* Logo Graphical Arc */}
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-zinc-950">
            {/* Semicircular outer border line (representative of Radius Elevate arc) */}
            <div className="absolute inset-0.5 rounded-full border border-radius-orange/70 animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-white" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-1">
              <span className="font-display font-extrabold text-[#111116] tracking-tight text-lg">RADIUS</span>
              <span className="font-display font-black text-rose-600 tracking-wider text-lg">ELEVATE</span>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-zinc-400 font-bold uppercase leading-none">authorized reseller</span>
          </div>
        </div>

        {/* Center Navigation helper items (very clean, light-touch) */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold tracking-wide text-zinc-600 uppercase">
          <a href="#student-offers" className="hover:text-black transition-colors">Offers</a>
          <a href="#surprise-bid" className="hover:text-black transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span> Live Auction
          </a>
          <a href="#gamified-incentives" className="hover:text-black transition-colors">Rewards</a>
          <a href="#ambassadors" className="hover:text-black transition-colors">Ambassadors</a>
          <a href="#faqs" className="hover:text-black transition-colors">Help</a>
        </nav>

        {/* Chitkara Campus Store Partnership Logo */}
        <div className="flex items-center space-x-3 border-l border-zinc-200 pl-4 py-1">
          <div className="flex flex-col items-end">
            <div className="flex items-center space-x-1">
              <span className="text-right text-[11px] font-display font-bold text-zinc-900 group-hover:text-rose-600">CHITKARA</span>
              <span className="px-1 py-0.5 bg-rose-600 text-white rounded-[2px] text-[8px] font-extrabold tracking-tight">UNIVERSITY</span>
            </div>
            <div className="flex items-center space-x-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              <span className="text-[10px] font-sans font-semibold tracking-wider text-[#D22630] uppercase">CAMPUS STORE LAUNCH</span>
            </div>
          </div>
          {/* Chitkara Red Shield Representative Graphic */}
          <div className="w-7 h-8 bg-[#D22630] rounded-[3px] flex flex-col justify-between p-1 text-white shadow-xs">
            <div className="w-full h-1 bg-white opacity-40"></div>
            <div className="flex justify-center flex-1 items-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <div className="w-full h-1 bg-white opacity-40"></div>
          </div>
        </div>
      </div>
    </header>
  );
}
