'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MACBOOK_MODELS } from '../data';
import { motion } from 'motion/react';

// Inline Apple logo SVG component
function AppleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 814 1000" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.5-81.5-105.9-207.1-105.9-326.5 0-192.8 125.5-295.3 248.7-295.3 65.5 0 120.1 43.3 161.4 43.3 39.3 0 100.5-45.9 175.4-45.9 28.3 0 130.2 2.6 197.3 99.8zm-234.7-183.6c31.1-36.9 53.2-88.1 53.2-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.1 33.7-146.2 75.8-28.3 32.4-54.5 83.7-54.5 135.5 0 7.8.6 15.6 1.3 18.1 2.6.6 6.4 1.3 10.3 1.3 45.3 0 102.5-30.4 137.8-71.3z"/>
    </svg>
  );
}

export default function Hero() {
  return (
    <div id="student-offers" className="relative w-full overflow-hidden bg-black">
      {/* Background Image — student with MacBook by window */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1600&h=900"
          alt="Student using MacBook"
          className="w-full h-full object-cover object-left"
          referrerPolicy="no-referrer"
        />
        {/* Warm brown-to-black gradient overlay — transparent left, dark right */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-black/50 to-black/95" /> */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a0e05]/40 to-black" />
        {/* Bottom fade for cards area */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-28 pb-10 sm:pb-14 min-h-[520px] sm:min-h-[600px] flex flex-col justify-between">
        {/* Title — positioned to the right like in the design */}
        <div className="text-right mb-8 sm:mb-12">
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[56px] text-white tracking-tight leading-tight">
            Offer For Students
          </h1>
        </div>

        {/* MacBook Product Cards */}
        <div className="flex flex-col sm:flex-row items-stretch gap-4 sm:gap-5 justify-center sm:justify-end">
          {MACBOOK_MODELS.map((model, idx) => {
            const isNeo = model.modelName === 'MacBook Neo';
            return (
              <motion.div
                key={model.modelName}
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative rounded-xl bg-zinc-900/70 backdrop-blur-md border border-zinc-700/50 p-5 sm:p-6 flex flex-col min-w-[200px] sm:min-w-[220px] max-w-[320px] hover:border-zinc-600/60 transition-all duration-300"
              >
                {/* Apple Logo + Model Name */}
                <div className="flex items-center gap-2 mb-3">
                  <AppleLogo className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-300" />
                  <span className="font-display text-lg sm:text-xl text-white italic font-semibold tracking-tight">
                    {model.modelName}
                  </span>
                </div>

                {/* Green savings badge */}
                <div className="mb-4">
                  <span className="inline-block px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] sm:text-[11px] font-bold tracking-wide">
                    {model.badgeText}
                  </span>
                </div>

                {/* Pricing */}
                {model.hasDuoPrice && model.duoSpecs ? (
                  /* MacBook Neo — dual pricing side by side */
                  <div className="flex gap-4 sm:gap-6">
                    {model.duoSpecs.map((sub) => (
                      <div key={sub.specs} className="flex flex-col">
                        <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono">
                          MRP{' '}
                          <span className="line-through decoration-red-500/70 decoration-1">
                            ₹{sub.mrp.toLocaleString('en-IN')}
                          </span>
                        </span>
                        <span className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight mt-0.5">
                          ₹{sub.promoPrice.toLocaleString('en-IN')}*
                        </span>
                        <span className="text-[10px] text-zinc-500 font-mono mt-1">
                          {sub.specs}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* MacBook Air / Pro — single pricing */
                  <div className="flex flex-col">
                    <span className="text-[10px] sm:text-[11px] text-zinc-400 font-mono">
                      MRP{' '}
                      <span className="line-through decoration-red-500/70 decoration-1">
                        ₹{model.mrp.toLocaleString('en-IN')}
                      </span>
                    </span>
                    <span className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight mt-0.5">
                      ₹{model.promoPrice.toLocaleString('en-IN')}*
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Terms footnote — bottom right */}
        <div className="flex justify-end mt-6">
          <span className="text-[10px] sm:text-[11px] text-zinc-500 font-mono flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-zinc-500" />
            Term &amp; Condition
          </span>
        </div>
      </div>
    </div>
  );
}
