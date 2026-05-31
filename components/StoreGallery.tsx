'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { GALLERY_SLIDES } from '../data';
import { ChevronLeft, ChevronRight, Sparkles, Box, Laptop, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function StoreGallery() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-play the gallery slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % GALLERY_SLIDES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveSlide((prev) => (prev === 0 ? GALLERY_SLIDES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveSlide((prev) => (prev + 1) % GALLERY_SLIDES.length);
  };

  // Neo offers sidebar packages list
  const neoOffers = [
    {
      title: 'The Creator Kit',
      price: '₹ 1,65,900*',
      details: 'MacBook Pro, AirPods, and Adobe Suite Bundle',
      icon: <Sparkles className="w-4 h-4 text-rose-500" />
    },
    {
      title: 'Introducing Neo Starter',
      price: '₹ 55,900*',
      details: '8GB/256GB - Core Academic student configurations',
      icon: <Laptop className="w-4 h-4 text-amber-500" />
    },
    {
      title: 'The Career Pack',
      price: '₹ 97,500*',
      details: 'MacBook Air + Extended 3-year store warranties included',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-500" />
    }
  ];

  return (
    <section className="w-full bg-[#f8fafc] py-16 border-b border-zinc-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Grid Layout: Left is Slide Slider (8 cols), Right is Macbook Neo Offers list (4 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Adaptive Slide Gallery */}
          <div className="lg:col-span-8 flex flex-col justify-between space-y-4">
            
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-zinc-950 shadow-md group">
              {/* Carousel Slides */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSlide}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                >
                  <img
                    src={GALLERY_SLIDES[activeSlide].imageUrl}
                    alt={GALLERY_SLIDES[activeSlide].title}
                    className="w-full h-full object-cover select-none filter brightness-90 saturate-105"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Bottom Vignette Dark Overlay to carry caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-black/10 to-transparent" />
                  
                  {/* Captions Overlaid onto slide */}
                  <div className="absolute bottom-6 left-6 right-6 text-white text-left max-w-xl">
                    <span className="text-[10px] font-mono tracking-widest font-extrabold text-rose-500 bg-rose-500/10 border border-rose-500/30 px-2 py-0.5 rounded uppercase inline-block mb-2">
                      Store interior
                    </span>
                    <h4 className="font-display font-extrabold text-lg sm:text-xl leading-tight">
                      {GALLERY_SLIDES[activeSlide].title}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-zinc-300 font-light mt-1 text-zinc-400">
                      Store interior - Grand reveal moment - 2,000 sq ft floor - {GALLERY_SLIDES[activeSlide].subtitle}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Slider Arrows Overlays (hidden until hover on hover devices) */}
              <button
                onClick={handlePrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 hover:bg-black/60 transition-all cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 backdrop-blur-xs text-white opacity-0 group-hover:opacity-100 hover:bg-black/60 transition-all cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Pagination Dots layout - 10 elegant dots representing continuous slider states */}
            <div className="flex items-center justify-center space-x-2 py-2">
              {[...Array(10)].map((_, idx) => {
                // Map the 10 dots to our 4 actual slide states using simple modulo
                const mappedIdx = idx % GALLERY_SLIDES.length;
                const isSelected = activeSlide === mappedIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(mappedIdx)}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      isSelected ? 'w-5 bg-zinc-900 border border-zinc-800' : 'w-2 bg-zinc-300 hover:bg-zinc-400'
                    }`}
                    aria-label={`Select point ${idx + 1}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Right panel: MacBook Neo Offers list block */}
          <div className="lg:col-span-4 bg-white border border-zinc-200/60 p-6 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-6">
              <div className="border-b border-zinc-100 pb-4">
                <span className="text-[10px] font-mono tracking-widest font-extrabold text-[#D22630] uppercase block">
                  Limited Deals
                </span>
                <h4 className="font-display font-black text-xl text-zinc-900 lowercase first-letter:uppercase mt-1">
                  MacBook neo <span className="text-rose-600">OFFERS</span>
                </h4>
              </div>

              {/* Individual package cards */}
              <div className="space-y-4">
                {neoOffers.map((offer) => (
                  <div
                    key={offer.title}
                    className="p-4 rounded-xl border border-zinc-100 bg-[#fbfcfd] hover:border-zinc-200 hover:bg-white transition-all flex items-start gap-3 shadow-2xs group"
                  >
                    <div className="p-2 bg-zinc-50 rounded-lg text-zinc-700 group-hover:bg-zinc-100 transition-colors">
                      {offer.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-1">
                        <h5 className="font-display font-bold text-xs text-zinc-900 truncate">
                          {offer.title}
                        </h5>
                        <span className="text-xs font-mono font-black text-[#D22630] flex-shrink-0">
                          {offer.price}
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 mt-1 font-light leading-snug">
                        {offer.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick action checklist footer */}
            <div className="mt-8 pt-4 border-t border-zinc-100 bg-zinc-50/50 p-3 rounded-xl flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                Authorized Guarantee
              </span>
              <a
                href="#student-offers"
                className="text-[11px] font-mono font-black text-[#D22630] hover:underline"
              >
                Check Pricing
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
