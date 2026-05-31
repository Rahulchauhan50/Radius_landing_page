/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function ResellerBanner() {
  return (
    <section className="w-full bg-[#f5f5f7] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Heading */}
        <h2 className="font-sans font-bold text-3xl sm:text-[40px] lg:text-[44px] text-[#1d1d1f] tracking-tight leading-tight">
          North India’s 1st On-Campus <br />
          Apple Authorized Reseller
        </h2>
        
        {/* Badges Row */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
          {/* Card 1: 2,000 sq ft Apple Store */}
          <div className="flex items-center gap-3">
            <div className="w-[52px] h-[52px] bg-white rounded-[12px] border border-[#d2d2d7] flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              {/* Store Icon */}
              <svg 
                width="26" 
                height="26" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-[26px] h-[26px] text-[#1d1d1f]"
              >
                <path d="M2 22h20" />
                <path d="M3 22V10h18v12" />
                <path d="M3 6h18l-1.5 4h-15L3 6z" />
                <path d="M7 6v4" />
                <path d="M12 6v4" />
                <path d="M17 6v4" />
                <path d="M7 22v-7h4v7" />
                <path d="M9 22v-4" />
                <rect x="14" y="13" width="4" height="4" />
                <path d="M16 13v4" />
              </svg>
            </div>
            <div className="text-left leading-snug">
              <span className="block font-sans font-bold text-[15px] text-[#1d1d1f]">
                2,000 sq ft
              </span>
              <span className="block font-sans font-medium text-[12px] text-[#515154]">
                Apple Store
              </span>
            </div>
          </div>

          {/* Card 2: Dedicated Training Lab */}
          <div className="flex items-center gap-3">
            <div className="w-[52px] h-[52px] bg-white rounded-[12px] border border-[#d2d2d7] flex items-center justify-center shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
              {/* Apple Logo SVG */}
              <svg 
                viewBox="0 0 170 170" 
                width="22" 
                height="22" 
                fill="currentColor" 
                className="w-[22px] h-[22px] text-[#1d1d1f]"
              >
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.34.13-9.13-1.92-14.37-6.15-2.88-2.38-6.68-6.9-11.38-13.56-8.86-12.74-15.69-27.42-20.47-44.07-4.78-16.65-7.17-31.99-7.17-46.03 0-15.65 3.82-28.75 11.45-39.31 7.63-10.56 17.3-15.93 29.02-16.11 5.92-.12 12.35 1.88 19.28 5.99 6.94 4.12 11.45 6.18 13.54 6.18 1.98 0 6.64-2.12 13.99-6.37 7.35-4.24 13.6-6.22 18.73-5.94 15.66.75 27.5 6.64 35.5 17.65-15.98 9.68-23.73 22.86-23.25 39.52.48 13.25 5.3 24.26 14.47 33.02 9.17 8.76 20.08 13.62 32.74 14.58-.69 2.5-1.9 5.86-3.65 10.07zM119.5 28.5c0-8.12 2.87-15.42 8.6-21.9C133.82 0 141.6 0 151.5.5c.2 8.12-2.73 15.35-8.8 21.68-6.07 6.33-13.92 9.5-23.2 9.5-.2-1.32-.2-2.3-.2-3.18z" />
              </svg>
            </div>
            <div className="text-left leading-snug">
              <span className="block font-sans font-bold text-[15px] text-[#1d1d1f]">
                Dedicated
              </span>
              <span className="block font-sans font-medium text-[12px] text-[#515154]">
                Training Lab
              </span>
            </div>
          </div>
        </div>

        {/* Slogan */}
        <div className="mt-10 max-w-2xl mx-auto px-4">
          <p className="text-[#1d1d1f]/85 text-[17px] sm:text-[18px] md:text-[19px] leading-relaxed font-sans font-normal tracking-tight">
            You can buy a MacBook anywhere. <br />
            Only at Radius Radius do you buy a career.
          </p>
        </div>
      </div>
    </section>
  );
}
