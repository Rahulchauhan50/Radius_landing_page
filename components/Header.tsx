/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import RadiusLogo from '../assets/Radius Logo.png';
import ChitkaraLogo from '../assets/Chitkara Logo_Black.png';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-zinc-100 shadow-xs transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Radius Elevate Logo */}
        <div className="flex items-center space-x-2">
          <img src={RadiusLogo.src} alt="Radius Elevate Logo" className="h-10 w-auto object-contain" />
        </div>

        {/* Chitkara Campus Store Partnership Logo */}
        <div className="flex items-center space-x-3.5">
          {/* Chitkara Logo */}
          <img src={ChitkaraLogo.src} alt="Chitkara Logo" className="h-10 w-auto object-contain" />
          
          {/* Vertical Separator */}
          <div className="h-5 w-[1px] bg-zinc-200" />
          
          {/* Partnership Label */}
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full animate-pulse"></span>
            <span className="text-[14px] font-sans font-bold tracking-wider uppercase">
              Campus Store<br></br> Launch
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
