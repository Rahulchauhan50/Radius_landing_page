'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, FormEvent } from 'react';
import { CheckCircle } from 'lucide-react';

export default function Ambassadors() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [handle, setHandle] = useState('');
  const [niche, setNiche] = useState('tech');
  const [submitted, setSubmitted] = useState(false);

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!handle) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedCategory(null);
      setHandle('');
    }, 4000);
  };

  // Local categories definition matching the design mockup precisely
  const categories = [
    {
      id: 'creators',
      title: 'Creators',
      deliverables: [
        '2 reels with 50 views / month each'
      ],
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'campus_stars',
      title: 'Campus Stars',
      deliverables: [
        '1 YouTube (2+ min)',
        '3 Reels + Story takeover'
      ],
      image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <section id="ambassadors" className="w-full bg-[#f5f5f7] py-16 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="max-w-xl mb-10 sm:mb-12 text-left">
          <h2 className="font-sans font-bold text-3xl sm:text-[40px] lg:text-[44px] text-[#1d1d1f] tracking-tight leading-tight">
            Radius Ambassadors
          </h2>
          <p className="text-[#515154] text-base sm:text-[17px] font-sans font-normal mt-2">
            Make reels for Radius. Earn the stage.
          </p>
        </div>

        {/* 2 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto items-stretch">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white rounded-[24px] overflow-hidden flex flex-col shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-[#d2d2d7]/35 transition-all duration-300"
            >
              {/* Photo Header block */}
              <div className="h-64 sm:h-72 relative w-full overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Card description body */}
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-sans font-bold text-[22px] text-[#1d1d1f]">
                    {cat.title}
                  </h3>

                  {/* Deliverables checklist list block */}
                  <div className="mt-4">
                    <span className="text-[11px] font-sans font-bold text-[#1d1d1f] block mb-2">
                      Deliverables
                    </span>
                    <ul className="space-y-1.5 text-[13px] text-[#515154] font-medium font-sans">
                      {cat.deliverables.map((del) => (
                        <li key={del} className="flex items-start gap-1.5">
                          <span className="text-[#515154]">•</span>
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="mt-8">
                  <button
                    onClick={() => setSelectedCategory(cat.id)}
                    className="inline-flex items-center justify-center px-5 py-2 bg-[#1d1d1f] hover:bg-black font-sans font-semibold text-xs text-white rounded-full transition-colors cursor-pointer active:scale-98"
                  >
                    Register Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Overlay for social submission application */}
        {selectedCategory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="relative w-full max-w-sm bg-white rounded-2xl border border-zinc-200 p-6 shadow-2xl animate-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  setSelectedCategory(null);
                  setHandle('');
                }}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-655 text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200"
              >
                ✕
              </button>

              <div className="text-center mb-6">
                <span className="px-2 py-0.5 bg-zinc-100 text-[10px] font-sans leading-none tracking-widest font-extrabold text-zinc-500 rounded uppercase">
                  ambassador onboarding
                </span>
                <h3 className="font-sans font-bold text-lg text-zinc-900 mt-2">
                  Register for {selectedCategory === 'creators' ? 'Creators' : 'Campus Stars'}
                </h3>
              </div>

              {submitted ? (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                    <CheckCircle className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="font-sans font-bold text-sm text-zinc-950">Application Logged</h4>
                  <p className="text-[11px] text-zinc-500 mt-1 max-w-[240px]">
                    Our social audit team will review your timeline and reach out on campus!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-sans font-bold text-zinc-500 uppercase mb-1">
                      Social Username / Channel Link
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-zinc-400 text-xs font-sans">@</span>
                      <input
                        required
                        type="text"
                        placeholder="e.g. rahul_creates"
                        value={handle}
                        onChange={(e) => setHandle(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-lg pl-7 pr-3 py-2 text-xs text-zinc-900 focus:outline-hidden focus:border-[#1d1d1f] focus:ring-1 focus:ring-[#1d1d1f] transition-all font-sans"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans font-bold text-zinc-500 uppercase mb-1">
                      Content Focus Niche
                    </label>
                    <select
                      value={niche}
                      onChange={(e) => setNiche(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-900 focus:outline-hidden focus:border-[#1d1d1f] transition-all font-sans"
                    >
                      <option value="tech">Tech Reviews & Hardware Sprints</option>
                      <option value="lifestyle">Vlog, Campus Routine & Aesthetic</option>
                      <option value="coding">Software Engineering, Coding & Design</option>
                      <option value="academics">Study Hacks, Notion Templates & Prep</option>
                    </select>
                  </div>

                  <p className="text-[10px] text-zinc-400 font-light leading-normal font-sans">
                    By submitting, you agree to grant Radius teams non-exclusive storage and marketing repost rights for audit reels on campus.
                  </p>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#1d1d1f] hover:bg-black text-white font-sans font-bold uppercase text-xs tracking-wider rounded-lg transition-colors cursor-pointer"
                  >
                    Lock My Profile
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
