'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import tab3 from '../assets/tabs/Tab1.png';
import tab2 from '../assets/tabs/Tab2.png';
import tab1 from '../assets/tabs/Tab3.png';

// Custom icons for Instagram posts
function CarouselIcon() {
  return (
    <svg 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="text-white"
    >
      <rect x="8" y="8" width="12" height="12" rx="1.5" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg 
      width="14" 
      height="14" 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className="text-white"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}

interface InstaPost {
  id: string;
  imageUrl: string;
  type: 'carousel' | 'video' | 'single';
  permalink: string;
  caption: string;
}

export default function SocialLaunchBuzz() {
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(1); // Default to index 1 (5:00 PM / Live Auction)
  const [posts, setPosts] = useState<InstaPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch Instagram posts on mount
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/instagram');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts.slice(0, 6));
        }
      } catch (err) {
        console.error('Failed to load Instagram posts:', err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPosts();
  }, []);

  // Local slots definition matching the mockup events and text
  const slots = [
    {
      time: '3:00 PM',
      title: 'Reel contest winner',
      details: 'Radius Ambassadors',
      imageUrl: tab1.src
    },
    {
      time: '5:00 PM',
      title: 'Celebrity Kick off',
      details: 'Guest performance / Entertainment',
      imageUrl: tab2.src
    },
    {
      time: '8:00 PM',
      title: 'Live Auction',
      details: 'winner takes device at bid price',
      imageUrl: tab3.src
    }
  ];

  const activeSlot = slots[selectedSlotIndex];

  const handlePrev = () => {
    setSelectedSlotIndex((prev) => (prev === 0 ? slots.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedSlotIndex((prev) => (prev + 1) % slots.length);
  };

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Container: Left (Instagram) & Right (Timeline Card) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-16 items-start">
          
          {/* Left Column: Live Instagram (7 cols) */}
          <div className="md:col-span-7 space-y-8">
            {/* Title Block */}
            <div className="text-left">
              <h3 className="font-sans font-bold text-3xl sm:text-[40px] lg:text-[44px] text-[#1d1d1f] tracking-tight leading-tight">
                Live Instagram
              </h3>
              <p className="text-[#515154] text-sm sm:text-base font-sans font-normal mt-1">
                @radiuschitkara
              </p>
            </div>

            {/* 3x2 Instagram Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {isLoading ? (
                // Loading skeletons
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={`skeleton-${i}`}
                    className="aspect-[1/1] bg-[#f5f5f7] rounded-[16px] overflow-hidden animate-pulse"
                  >
                    <div className="w-full h-full bg-gradient-to-br from-[#e8e8ed] to-[#f5f5f7]" />
                  </div>
                ))
              ) : posts.length > 0 ? (
                posts.map((post) => (
                  <a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-[1/1] bg-[#f5f5f7] rounded-[16px] overflow-hidden cursor-pointer block"
                  >
                    <img
                      src={post.imageUrl}
                      alt={post.caption ? post.caption.slice(0, 80) : 'Instagram Post'}
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {/* Subtle Insta icon corner */}
                    {post.type !== 'single' && (
                      <div className="absolute top-2.5 right-2.5 p-1 rounded bg-black/40 backdrop-blur-xs text-white opacity-95">
                        {post.type === 'carousel' ? <CarouselIcon /> : <PlayIcon />}
                      </div>
                    )}
                  </a>
                ))
              ) : (
                // Empty state
                <div className="col-span-2 sm:col-span-3 py-12 text-center">
                  <p className="text-[#86868b] text-sm font-sans">No posts available right now.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Launch Buzz / Auction (5 cols) */}
          <div className="md:col-span-5 space-y-8">
            {/* Title Block */}
            <div className="text-left">
              <h3 className="font-sans font-bold text-3xl sm:text-[40px] lg:text-[44px] text-[#1d1d1f] tracking-tight leading-tight">
                Launch Buzz
              </h3>
              <p className="text-[#515154] text-sm sm:text-base font-sans font-normal mt-1">
                5th May
              </p>
            </div>

            {/* Spotlight Card Carousel */}
            <div className="relative group/card">
              <div className="bg-[#f5f5f7] rounded-[24px] overflow-hidden border border-[#d2d2d7]/35 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                {/* Event Image with animated crossfade */}
                <div className="h-60 relative w-full overflow-hidden">
                  {slots.map((slot, idx) => (
                    <img
                      key={idx}
                      src={slot.imageUrl}
                      alt={slot.title}
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-500 ${
                        idx === selectedSlotIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                  ))}

                  {/* Prev/Next arrows */}
                  <button
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 backdrop-blur-xs text-white opacity-0 group-hover/card:opacity-100 hover:bg-black/50 transition-all z-10 cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/30 backdrop-blur-xs text-white opacity-0 group-hover/card:opacity-100 hover:bg-black/50 transition-all z-10 cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Slide dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-10">
                    {slots.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSlotIndex(idx)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          idx === selectedSlotIndex
                            ? 'w-4 h-1.5 bg-white'
                            : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/75'
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Spotlight Description */}
                <div className="p-8 flex flex-col justify-between flex-1 min-h-[220px]">
                  <div className="space-y-2">
                    <h4 className="font-sans font-bold text-[22px] text-[#1d1d1f] leading-snug">
                      {activeSlot.title}
                    </h4>
                    <p className="text-[13px] text-[#515154] font-medium leading-relaxed">
                      {activeSlot.details}
                    </p>
                  </div>

                  {/* Interactive Horizontal Timeline Slider */}
                  <div className="mt-8 pt-6 border-t border-[#d2d2d7]/50">
                    <div className="relative h-[4px] bg-[#1d1d1f] rounded-full mx-6">
                      <div
                        className="absolute h-full bg-[#d22630] rounded-full transition-all duration-300"
                        style={{
                          width: selectedSlotIndex === 0 ? '15%' : selectedSlotIndex === 1 ? '50%' : '100%'
                        }}
                      />
                    </div>

                    <div className="flex justify-between px-6 mt-3 text-[12px] font-sans font-bold">
                      {slots.map((slot, idx) => {
                        const isActive = selectedSlotIndex === idx;
                        return (
                          <button
                            key={slot.time}
                            onClick={() => setSelectedSlotIndex(idx)}
                            className={`cursor-pointer transition-colors duration-200 ${
                              isActive ? 'text-[#d22630]' : 'text-[#86868b]'
                            }`}
                          >
                            {slot.time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
