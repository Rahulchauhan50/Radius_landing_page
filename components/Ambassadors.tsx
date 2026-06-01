'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState, FormEvent } from 'react';
import { CheckCircle } from 'lucide-react';

export default function Ambassadors() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const closeModal = () => {
    setSelectedCategory(null);
    setName('');
    setEmail('');
    setPhone('');
  };

  const handleRegister = (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      closeModal();
    }, 3500);
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

        {/* Registration Popup */}
        {selectedCategory && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
            onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
          >
            <div className="relative w-full max-w-sm bg-white rounded-2xl border border-zinc-200/80 p-7 shadow-2xl">
              {/* Close */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-400 hover:text-zinc-700 transition-colors cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>

              {/* Header */}
              <div className="mb-6">
                <span className="inline-block px-2 py-0.5 bg-zinc-100 text-[10px] font-sans font-extrabold text-zinc-500 rounded tracking-widest uppercase">
                  {selectedCategory === 'creators' ? 'Creators' : 'Campus Stars'}
                </span>
                <h3 className="font-sans font-bold text-[20px] text-[#1d1d1f] mt-2 leading-tight">
                  Register Now
                </h3>
                <p className="text-[12px] text-zinc-400 font-sans mt-0.5">Fill in your details and we'll get in touch.</p>
              </div>

              {submitted ? (
                <div className="py-8 flex flex-col items-center justify-center text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h4 className="font-sans font-bold text-base text-zinc-900">You're registered!</h4>
                  <p className="text-[12px] text-zinc-500 mt-1.5 max-w-[220px] leading-relaxed">
                    Our team will review your details and reach out soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-sans font-semibold text-zinc-500 mb-1.5">
                      Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#1d1d1f] focus:ring-1 focus:ring-[#1d1d1f]/20 transition-all font-sans"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-sans font-semibold text-zinc-500 mb-1.5">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#1d1d1f] focus:ring-1 focus:ring-[#1d1d1f]/20 transition-all font-sans"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] font-sans font-semibold text-zinc-500 mb-1.5">
                      Phone
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+91 XXXXX XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-[#1d1d1f] focus:ring-1 focus:ring-[#1d1d1f]/20 transition-all font-sans"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 py-3 bg-[#1d1d1f] hover:bg-black text-white font-sans font-semibold text-sm rounded-xl transition-colors cursor-pointer"
                  >
                    Submit
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
