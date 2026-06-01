'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import slide1 from '../assets/slides/slide1.jpeg';
import slide2 from '../assets/slides/slide2.jpeg';
import slide3 from '../assets/slides/slide3.png';

const HERO_SLIDES = [
  {
    id: 1,
    bgImage: slide1.src,
    objectPosition: 'right center'
  },
  {
    id: 2,
    bgImage: slide2.src
  },
  {
    id: 3,
    bgImage: slide3.src
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
    <div id="student-offers" className="relative w-full overflow-hidden bg-black aspect-[16/9] sm:aspect-auto min-h-0 sm:min-h-[600px] md:min-h-[700px] flex flex-col justify-between group">
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
            className="w-full h-full object-cover"
            style={{ objectPosition: HERO_SLIDES[activeSlide].objectPosition || 'center' }}
            referrerPolicy="no-referrer"
          />
          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </AnimatePresence>

      {/* Slide Navigation Overlay and dots */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 flex flex-col justify-end flex-1 w-full">
        <div className="flex items-center justify-between w-full mt-auto">
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

