'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { FAQ_ITEMS } from '../data';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first item

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="w-full bg-[#5C060C] text-white py-16 sm:py-20 border-t border-red-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title and Intro */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-flex items-center gap-1 text-[11px] font-mono leading-none tracking-widest font-extrabold text-red-200 bg-red-950/40 px-2.5 py-1 rounded-md uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-rose-300" /> Support Desk
          </span>
          
          <h2 className="font-sans font-bold text-3xl sm:text-[40px] lg:text-[44px] text-white tracking-tight mt-3 leading-tight">
            Still have <span className="text-rose-300 italic underline decoration-rose-300/40 underline-offset-4">Questions?</span>
          </h2>
          <p className="mt-2 text-red-100/75 font-light text-xs sm:text-sm max-w-md mx-auto">
            Everything you need to know about academic eligibility, the Surprise Bid Live Event, and store checkouts.
          </p>
        </div>

        {/* Accordions Stack */}
        <div className="space-y-3.5 max-w-3xl mx-auto">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.question}
                className="border-b border-rose-950/40 overflow-hidden transition-all duration-300 bg-red-950/15 rounded-xl hover:bg-red-950/25 border border-red-900/30"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-4.5 sm:p-5 flex items-center justify-between text-left cursor-pointer select-none focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-medium text-sm sm:text-base text-zinc-100 hover:text-white transition-colors tracking-wide">
                    {item.question}
                  </span>
                  
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-red-300 flex-shrink-0 ml-4 transition-transform duration-200" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-red-200/50 flex-shrink-0 ml-4 transition-transform duration-200" />
                  )}
                </button>

                {/* Simulated Collapsible Body Panel */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[300px] border-t border-red-950/40 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                  }`}
                >
                  <div className="p-4.5 sm:p-5 bg-red-950/25">
                    <p className="text-xs sm:text-sm text-red-100/80 leading-relaxed font-light">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact/Support Footer Box */}
        <div className="mt-14 max-w-md mx-auto text-center p-5 bg-red-950/20 border border-red-900/20 rounded-2xl">
          <span className="text-[10px] font-mono text-center text-red-300 uppercase tracking-widest block font-bold">
            Need Direct Assistance?
          </span>
          <p className="text-xs text-red-100/70 font-light mt-1.5 leading-normal">
            Visit our central counter near Block-C or reach out directly with our support specialists via mail.
          </p>
          <a
            href="mailto:support@radiuselevate.com"
            className="inline-block mt-3 text-xs font-mono font-bold text-white hover:text-rose-300 underline"
          >
            support@radiuselevate.com
          </a>
        </div>
      </div>
    </section>
  );
}
