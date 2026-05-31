/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0a0a0c] text-zinc-500 py-8 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left: Copyright */}
          <p className="text-[11px] font-mono tracking-wider text-center sm:text-left">
            Copyright © {currentYear} Radius Systems. All rights reserved.
          </p>

          {/* Right: Site Policies Links */}
          <div className="flex items-center space-x-1.5 text-[11px] font-mono tracking-wider">
            <a href="#privacy" className="hover:text-zinc-350 transition-colors hover:underline">Privacy Policy</a>
            <span>|</span>
            <a href="#terms" className="hover:text-zinc-355 transition-colors hover:underline">Terms &amp; Conditions</a>
            <span>|</span>
            <a href="#refund" className="hover:text-zinc-355 transition-colors hover:underline">Return &amp; Refund Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
