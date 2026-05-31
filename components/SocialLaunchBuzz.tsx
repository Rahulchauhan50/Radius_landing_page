'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';

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

export default function SocialLaunchBuzz() {
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(1); // Default to index 1 (5:00 PM / Live Auction)

  // Local slots definition matching the mockup events and text
  const slots = [
    {
      time: '3:00 PM',
      title: 'Orientation & Student Welcome',
      details: 'Step into the dedicated lab for dynamic, hands-on masterclasses showcasing creative Apple suites.'
    },
    {
      time: '5:00 PM',
      title: 'Live Auction',
      details: 'Winner takes device at bid price'
    },
    {
      time: '8:00 PM',
      title: 'Grand Concert & Elite Winners',
      details: 'Recognizing our top referral influencers and announcing lucky draw winners live on our main staging deck.'
    }
  ];

  // Local Instagram posts matching the mockup visuals
  const posts = [
    {
      id: 'post_1',
      imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=400',
      type: 'carousel'
    },
    {
      id: 'post_2',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400',
      type: 'single'
    },
    {
      id: 'post_3',
      imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&q=80&w=400',
      type: 'carousel'
    },
    {
      id: 'post_4',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
      type: 'carousel'
    },
    {
      id: 'post_5',
      imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400',
      type: 'video'
    },
    {
      id: 'post_6',
      imageUrl: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=400',
      type: 'single'
    }
  ];

  const activeSlot = slots[selectedSlotIndex];

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

            {/* 3x2 Instagram Grid (3:4 aspect ratio) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="group relative aspect-[1/1] bg-[#f5f5f7] rounded-[16px] overflow-hidden cursor-pointer"
                >
                  <img
                    src={post.imageUrl}
                    alt="Instagram Post"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Insta icon corner */}
                  {post.type !== 'single' && (
                    <div className="absolute top-2.5 right-2.5 p-1 rounded bg-black/40 backdrop-blur-xs text-white opacity-95">
                      {post.type === 'carousel' ? <CarouselIcon /> : <PlayIcon />}
                    </div>
                  )}
                </div>
              ))}
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

            {/* Spotlight Card */}
            <div className="bg-[#f5f5f7] rounded-[24px] overflow-hidden border border-[#d2d2d7]/35 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between">
              {/* Event Image */}
              <div className="h-60 relative w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=700"
                  alt="Student bidding crowd"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
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
    </section>
  );
}
