'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { MACBOOK_MODELS } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Inline Apple logo SVG component
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 814 1000" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.5-81.5-105.9-207.1-105.9-326.5 0-192.8 125.5-295.3 248.7-295.3 65.5 0 120.1 43.3 161.4 43.3 39.3 0 100.5-45.9 175.4-45.9 28.3 0 130.2 2.6 197.3 99.8zm-234.7-183.6c31.1-36.9 53.2-88.1 53.2-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.1 33.7-146.2 75.8-28.3 32.4-54.5 83.7-54.5 135.5 0 7.8.6 15.6 1.3 18.1 2.6.6 6.4 1.3 10.3 1.3 45.3 0 102.5-30.4 137.8-71.3z"/>
    </svg>
  );
}

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Offer For Students',
    bgImage: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1600&h=900',
    type: 'pricing_cards'
  },
  {
    id: 2,
    title: 'Campus Store Launch',
    subtitle: 'North India’s 1st On-Campus Apple Reseller',
    bgImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1600&h=900',
    type: 'store_launch'
  },
  {
    id: 3,
    title: 'Surprise Bid Live Event',
    subtitle: 'Bid for MacBook Neo & Win',
    bgImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=1600&h=900',
    type: 'surprise_bid'
  }
];

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-play the hero slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 12000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <div id="student-offers" className="relative w-full overflow-hidden bg-black min-h-[600px] sm:min-h-[700px] md:min-h-[720px] flex flex-col justify-between group">
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <img
            src={HERO_SLIDES[activeSlide].bgImage}
            alt="Hero Background"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          {/* Dark overlays for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-[#1a0e05]/30 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/35" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-14 min-h-[580px] sm:min-h-[660px] flex flex-col justify-between flex-1 w-full">
        {/* Active Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex flex-col justify-between w-full"
          >
            {/* Title */}
            <div className="text-center mt-4 mb-6">
              <h1 className="font-sans font-bold text-4xl sm:text-5xl lg:text-[56px] text-white tracking-tight leading-tight">
                {HERO_SLIDES[activeSlide].title}
              </h1>
              {HERO_SLIDES[activeSlide].subtitle && (
                <p className="text-zinc-300 text-sm sm:text-lg mt-2 font-sans font-medium">
                  {HERO_SLIDES[activeSlide].subtitle}
                </p>
              )}
            </div>

            {/* Slide Body Content */}
            <div className="flex-1 flex items-center justify-center w-full">
              {HERO_SLIDES[activeSlide].type === 'pricing_cards' ? (
                /* Slide 1 Content: MacBook Pricing Cards (mockup design, centered) */
                <div className="flex flex-row overflow-x-auto pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory gap-6 justify-start md:justify-center w-full max-w-6xl mx-auto px-4 md:px-0">
                  {MACBOOK_MODELS.map((model) => {
                    return (
                      <div
                        key={model.modelName}
                        className={`rounded-[24px] bg-black/30 backdrop-blur-md border border-white/20 p-6 sm:p-7 flex flex-col justify-between shadow-xl transition-all duration-300 hover:border-white/35 snap-center shrink-0 w-[85%] sm:w-[60%] md:w-auto ${
                          model.modelName === 'MacBook Neo' 
                            ? 'min-w-[280px] md:min-w-[420px] md:flex-[1.6]' 
                            : 'min-w-[220px] md:min-w-[260px] md:flex-1'
                        }`}
                      >
                        <div>
                          {/* Logo + Model Name */}
                          <div className="flex items-center gap-2 mb-3">
                            <AppleLogo className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                            <span className="font-sans text-lg sm:text-xl text-white italic font-bold tracking-tight">
                              {model.modelName}
                            </span>
                          </div>

                          {/* Green savings badge (bright lime green with black text) */}
                          <div className="mb-4">
                            <span className="inline-block px-3 py-0.5 rounded-full bg-[#E5F97E] text-black text-[10px] sm:text-[11px] font-sans font-bold tracking-wide">
                              {model.badgeText}
                            </span>
                          </div>

                          {/* Pricing */}
                          {model.hasDuoPrice && model.duoSpecs ? (
                            <div className="flex gap-6 justify-between mt-4">
                              {model.duoSpecs.map((sub, sIdx) => (
                                <div key={sub.specs} className={`flex flex-col flex-1 ${sIdx > 0 ? 'border-l border-white/10 pl-6' : ''}`}>
                                  <span className="text-[10px] sm:text-[11px] text-zinc-400 font-sans font-medium">
                                    MRP{' '}
                                    <span className="line-through decoration-[#D22630] decoration-1 font-semibold">
                                      ₹{sub.mrp.toLocaleString('en-IN')}
                                    </span>
                                  </span>
                                  <span className="text-xl sm:text-2xl lg:text-[26px] font-sans font-extrabold text-white tracking-tight mt-1">
                                    ₹{sub.promoPrice.toLocaleString('en-IN')}*
                                  </span>
                                  <span className="text-[10px] text-zinc-400 font-sans mt-1.5 font-medium">
                                    {sub.specs}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="flex flex-col mt-4">
                              <span className="text-[10px] sm:text-[11px] text-zinc-400 font-sans font-medium">
                                MRP{' '}
                                <span className="line-through decoration-[#D22630] decoration-1 font-semibold">
                                  ₹{model.mrp?.toLocaleString('en-IN')}
                                </span>
                              </span>
                              <span className="text-2xl sm:text-3xl lg:text-[34px] font-sans font-extrabold text-white tracking-tight mt-1">
                                ₹{model.promoPrice?.toLocaleString('en-IN')}*
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : HERO_SLIDES[activeSlide].type === 'store_launch' ? (
                /* Slide 2 Content: Campus Store Launch Features */
                <div className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory gap-6 justify-start md:justify-center w-full max-w-5xl mx-auto px-4 md:px-0">
                  <div className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-auto rounded-[24px] bg-black/35 backdrop-blur-md border border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-white">2,000 sq ft Store</h3>
                    <p className="text-zinc-300 text-xs sm:text-sm font-sans mt-3 leading-relaxed">
                      Explore and experience the complete Apple product lineup inside our premium campus center layout.
                    </p>
                  </div>
                  <div className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-auto rounded-[24px] bg-black/35 backdrop-blur-md border border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-white">Dedicated Training Lab</h3>
                    <p className="text-zinc-300 text-xs sm:text-sm font-sans mt-3 leading-relaxed">
                      Attend complimentary interactive iOS development bootcamps and Swift masterclasses led by specialists.
                    </p>
                  </div>
                  <div className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-auto rounded-[24px] bg-black/35 backdrop-blur-md border border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-white">Exclusive Academic Savings</h3>
                    <p className="text-zinc-300 text-xs sm:text-sm font-sans mt-3 leading-relaxed">
                      Save up to ₹24,000 on MacBook configurations alongside no-cost monthly financing options.
                    </p>
                  </div>
                </div>
              ) : (
                /* Slide 3 Content: Surprise Bid live auction countdown info */
                <div className="flex flex-row md:grid md:grid-cols-3 overflow-x-auto pb-4 md:pb-0 scrollbar-none snap-x snap-mandatory gap-6 justify-start md:justify-center w-full max-w-5xl mx-auto px-4 md:px-0">
                  <div className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-auto rounded-[24px] bg-black/35 backdrop-blur-md border border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-white">Register Your Bid</h3>
                    <p className="text-zinc-300 text-xs sm:text-sm font-sans mt-3 leading-relaxed">
                      Submit your own preferred price for the MacBook Neo in our live auction interface before the countdown ends.
                    </p>
                  </div>
                  <div className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-auto rounded-[24px] bg-black/35 backdrop-blur-md border border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-white">Grand Opening Draw</h3>
                    <p className="text-zinc-300 text-xs sm:text-sm font-sans mt-3 leading-relaxed">
                      Unique matching bids will take home their custom-configured devices during the live on-campus event draw.
                    </p>
                  </div>
                  <div className="snap-center shrink-0 w-[85%] sm:w-[60%] md:w-auto rounded-[24px] bg-black/35 backdrop-blur-md border border-white/20 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
                    <h3 className="font-sans font-bold text-lg sm:text-xl text-white">Ambassador Bonuses</h3>
                    <p className="text-zinc-300 text-xs sm:text-sm font-sans mt-3 leading-relaxed">
                      Earn store credits and unlock campus internship profiles by referring peers to the experience portal.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Row (Term & Condition + Dots Navigation) */}
        <div className="flex items-center justify-between w-full mt-10 z-10">
          {/* Pagination Indicators */}
          <div className="flex items-center space-x-2">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`transition-all duration-350 cursor-pointer ${
                  activeSlide === idx 
                    ? 'w-6 bg-white h-1.5 rounded-full' 
                    : 'w-1.5 bg-white/40 hover:bg-white/60 h-1.5 rounded-full'
                }`}
                aria-label={`Select Hero slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Terms footnote — bottom right */}
          <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-zinc-400 font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            Term &amp; Condition
          </div>
        </div>
      </div>

      {/* Prev/Next Navigation Overlay Arrows (Fade in on Hover) */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/30 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 hover:bg-black/55 transition-all cursor-pointer z-20 pointer-events-auto"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/30 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 hover:bg-black/55 transition-all cursor-pointer z-20 pointer-events-auto"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
