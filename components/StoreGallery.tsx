'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { GALLERY_SLIDES } from '../data';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function StoreGallery() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Monitor viewport size to adjust layout translation math
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  // Prepend the last slide and append the first slide to ensure adjacent slides are always visible
  const slidesToRender = [
    GALLERY_SLIDES[GALLERY_SLIDES.length - 1], // Slide 3 (prepended)
    ...GALLERY_SLIDES,                         // Slide 0, 1, 2, 3
    GALLERY_SLIDES[0]                          // Slide 0 (appended)
  ];

  // The active slide is shifted by 1 in the render list
  const activeRenderIndex = activeSlide + 1;

  return (
    <section id="store-gallery" className="w-full bg-[#f5f5f7] py-16 md:py-20  overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title Block */}
        <div className="max-w-xl mb-10 sm:mb-12 text-left">
          <h2 className="font-sans font-bold text-3xl sm:text-[40px] lg:text-[44px] text-[#1d1d1f] tracking-tight leading-tight">
            Store Gallery
          </h2>
          <p className="text-[#515154] text-base sm:text-[17px] font-sans font-normal mt-2">
            Explore the state-of-the-art campus store experience.
          </p>
        </div>

        {/* Carousel Viewport Container */}
        <div className="relative w-full md:overflow-visible overflow-hidden rounded-[24px] group">
          {/* Sliding Track */}
          <div 
            className="flex items-center transition-transform duration-500 ease-out py-4"
            style={{
              transform: isMobile 
                ? `translateX(calc(50% - ${75 * activeRenderIndex + 37.5}% - ${16 * activeRenderIndex}px))`
                : `translateX(calc(50% - ${60 * activeRenderIndex + 30}% - ${24 * activeRenderIndex}px))`
            }}
          >
            {slidesToRender.map((slide, idx) => {
              const originalIdx = idx === 0 
                ? GALLERY_SLIDES.length - 1 
                : idx === slidesToRender.length - 1 
                  ? 0 
                  : idx - 1;
              const isActive = originalIdx === activeSlide && idx === activeRenderIndex;

              return (
                <div
                  key={`${slide.id}-${idx}`}
                  onClick={() => setActiveSlide(originalIdx)}
                  className={`relative shrink-0 rounded-[20px] md:rounded-[24px] overflow-hidden aspect-video transition-all duration-500 cursor-pointer shadow-md border border-[#d2d2d7]/35 ${
                    isActive 
                      ? 'w-[75%] md:w-[60%] opacity-100 scale-100 z-10' 
                      : 'w-[75%] md:w-[60%] opacity-40 scale-[0.88] md:scale-[0.92] hover:opacity-60 z-0'
                  }`}
                >
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Bottom Vignette Dark Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-opacity duration-500 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  
                  {/* Captions */}
                  {isActive && (
                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 text-white text-left max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <h4 className="font-sans font-bold text-sm sm:text-2xl leading-tight">
                        {slide.title}
                      </h4>
                      <p className="text-[10px] sm:text-sm text-zinc-300 font-normal mt-1 sm:mt-2 leading-relaxed line-clamp-2 sm:line-clamp-none">
                        {slide.subtitle}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Slider Arrows Overlays */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/25 backdrop-blur-xs text-white opacity-70 md:opacity-0 md:group-hover:opacity-100 hover:bg-black/45 transition-all cursor-pointer z-30 pointer-events-auto"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/25 backdrop-blur-xs text-white opacity-70 md:opacity-0 md:group-hover:opacity-100 hover:bg-black/45 transition-all cursor-pointer z-30 pointer-events-auto"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="flex items-center justify-center space-x-2 mt-6">
          {GALLERY_SLIDES.map((_, idx) => {
            const isSelected = activeSlide === idx;
            return (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`transition-all duration-350 cursor-pointer ${
                  isSelected ? 'w-6 bg-[#1d1d1f] h-1.5 rounded-full' : 'w-1.5 bg-zinc-300 hover:bg-zinc-400 h-1.5 rounded-full'
                }`}
                aria-label={`Select slide ${idx + 1}`}
              />
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
