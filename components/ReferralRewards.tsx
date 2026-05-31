'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Copy, Check, Gift, Share2 } from 'lucide-react';
import { REFERRAL_TIERS } from '../data';

// Import local SVG assets
import StudentBuysIcon from '../assets/icons/Student_buys.svg';
import ShareCertificateIcon from '../assets/icons/share_certificate.svg';
import ShareIcon from '../assets/icons/share.svg';
import ReviewIcon from '../assets/icons/review.svg';
import LeaderboardIcon from '../assets/icons/leaderboard.svg';

// Helper component to render the purple silhouettes on cards
function ReferralTierIcons({ tierId }: { tierId: number }) {
  const personIcon = (key: number) => (
    <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.001 12.772C19.2517 12.772 21.8869 10.1367 21.8869 6.88599C21.8869 3.63525 19.2517 1 16.001 1C12.7502 1 10.115 3.63525 10.115 6.88599C10.115 10.1367 12.7502 12.772 16.001 12.772Z" stroke="url(#paint0_linear_372_393)" stroke-width="2" />
      <path d="M16.001 16.5308C8.31324 16.5308 1.96667 21.9272 1.01647 28.9091C0.87788 29.9277 1.68712 30.7862 2.71234 30.8612L7.05976 31.1794C13.0126 31.6154 18.9894 31.6154 24.9422 31.1794L29.2896 30.8612C30.3148 30.7862 31.124 29.9277 30.9855 28.9091C30.0353 21.9272 23.6887 16.5308 16.001 16.5308Z" stroke="url(#paint1_linear_372_393)" stroke-width="2" stroke-linecap="round" />
      <defs>
        <linearGradient id="paint0_linear_372_393" x1="16.001" y1="1" x2="16.001" y2="12.772" gradientUnits="userSpaceOnUse">
          <stop stop-color="#D558F9" />
          <stop offset="1" stop-color="#7F8EE7" />
        </linearGradient>
        <linearGradient id="paint1_linear_372_393" x1="16.001" y1="16.5308" x2="16.001" y2="31.5064" gradientUnits="userSpaceOnUse">
          <stop stop-color="#D558F9" />
          <stop offset="1" stop-color="#7F8EE7" />
        </linearGradient>
      </defs>
    </svg>

  );

  if (tierId === 1) {
    return (
      <div className="flex justify-center items-center h-10">
        {personIcon(1)}
      </div>
    );
  }
  if (tierId === 2) {
    return (
      <div className="flex justify-center items-center gap-1.5 h-10">
        {personIcon(1)}
        {personIcon(2)}
        {personIcon(3)}
      </div>
    );
  }
  if (tierId === 3) {
    return (
      <div className="flex justify-center items-center gap-1 h-10">
        {personIcon(1)}
        {personIcon(2)}
        {personIcon(3)}
        {personIcon(4)}
        {personIcon(5)}
      </div>
    );
  }
  // Clustered silhouettes for Top Referrer of the Month
  return (
    <div className="flex flex-col items-center justify-center h-10 gap-0.5">
      <div className="flex gap-1 opacity-70 scale-90 -mb-1">
        {personIcon(1)}
        {personIcon(2)}
        {personIcon(3)}
      </div>
      <div className="flex gap-1">
        {personIcon(4)}
        {personIcon(5)}
        {personIcon(6)}
      </div>
    </div>
  );
}

export default function ReferralRewards() {
  const [selectedTier, setSelectedTier] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [copied, setCopied] = useState(false);

  // Workflow steps with custom outline SVGs and text
  const steps = [
    {
      index: '1',
      title: 'Student Buys',
      desc: 'Purchase from Radius -\ngets unique badge',
      icon: StudentBuysIcon
    },
    {
      index: '2',
      title: 'Shares Badge',
      desc: 'Sends to friends via\nWhatsApp / Instagram',
      icon: ShareCertificateIcon
    },
    {
      index: '3',
      title: 'Friend Buys',
      desc: 'Using referral text or\nQR - attribution\nattribution captured',
      icon: ShareIcon
    },
    {
      index: '4',
      title: 'Reward Unlocks',
      desc: 'Instore credit applied\nfor future purchase',
      icon: ReviewIcon
    },
    {
      index: '5',
      title: 'Leaderboard',
      desc: 'Top influencer gets\nELITE status + bonus',
      icon: LeaderboardIcon
    }
  ];

  const handleGenerateLink = (e: FormEvent) => {
    e.preventDefault();
    if (!studentName || !rollNumber) return;

    const pseudoCode = `RAD-${studentName.substring(0, 3).toUpperCase()}-${rollNumber.slice(-4)}`;
    const mockUrl = `https://radius-elevate.com/invite/${pseudoCode}`;
    setGeneratedLink(mockUrl);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="gamified-incentives" className="w-full bg-white py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* Title & Introduction */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <h2 className="font-sans font-bold text-3xl sm:text-[40px] text-[#1d1d1f] tracking-tight leading-[1.15]">
            Refer a friend. Earn a badge. <br />
            Get store credit
          </h2>
        </div>

        {/* 5 Progression Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-10 gap-x-4 max-w-5xl mx-auto mb-12">
          {steps.map((step) => (
            <div key={step.index} className="flex flex-col items-center text-center px-1">
              <div className="mb-3 flex items-center justify-center h-10 w-10">
                <img
                  src={typeof step.icon === 'string' ? step.icon : (step.icon as any)?.src || step.icon}
                  className="w-7 h-7 object-contain"
                  alt={step.title}
                />
              </div>
              <h3 className="font-sans font-bold text-sm text-[#1d1d1f]">{step.title}</h3>
              <p className="text-[11px] text-[#515154] mt-1.5 leading-normal max-w-[160px] whitespace-pre-line font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Horizontal Divider */}
        <div className="w-full h-[1px] bg-zinc-200/80 mb-12" />

        {/* Referral Tiers Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-10">
          {REFERRAL_TIERS.map((tier) => {
            const isActive = selectedTier === tier.id;
            return (
              <button
                key={tier.id}
                onClick={() => setSelectedTier(tier.id)}
                className={`flex flex-col items-center justify-center py-7 px-4 rounded-[16px] border text-center transition-all cursor-pointer ${isActive
                    ? 'bg-[#f5f5f7] border-purple-500/80 shadow-xs ring-1 ring-purple-500/10'
                    : 'bg-[#f5f5f7] border-transparent hover:border-zinc-300'
                  }`}
              >
                <div className="mb-3 flex items-center justify-center">
                  <ReferralTierIcons tierId={tier.id} />
                </div>
                <span className="block font-sans font-medium text-[13px] sm:text-[14px] text-[#1d1d1f] tracking-tight">
                  {tier.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* CTA Refer Now */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-3.5 bg-[#1d1d1f] hover:bg-black text-white font-sans font-semibold text-[15px] rounded-[8px] transition-colors duration-200 shadow-xs cursor-pointer active:scale-98"
          >
            Refer Now
          </button>
        </div>

        {/* Modal Generator Drawer */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="relative w-full max-w-md bg-white rounded-2xl border border-zinc-200 p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setGeneratedLink('');
                  setStudentName('');
                  setRollNumber('');
                }}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200"
              >
                ✕
              </button>

              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Gift className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-zinc-900">Campus Invitation Portal</h3>
                  <p className="text-[10px] font-mono text-zinc-400">Generate Your Trackable Invite Link</p>
                </div>
              </div>

              {!generatedLink ? (
                <form onSubmit={handleGenerateLink} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase mb-1">Your Full Name</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Rahul Chauhan"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-900 focus:outline-hidden focus:border-[#1d1d1f] focus:ring-1 focus:ring-[#1d1d1f] transition-all font-sans"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-zinc-500 uppercase mb-1">Chitkara Roll Number</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. 2110991234"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      className="w-full bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-xs text-zinc-900 focus:outline-hidden focus:border-[#1d1d1f] focus:ring-1 focus:ring-[#1d1d1f] transition-all font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#1d1d1f] hover:bg-black text-white font-sans font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Generate Invite Link
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="p-3 bg-zinc-50 rounded-lg border border-zinc-200">
                    <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-1">Your Custom Referral Invite Url</span>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-zinc-700 truncate select-all">{generatedLink}</span>
                      <button
                        onClick={copyToClipboard}
                        className="p-1.5 rounded bg-white hover:bg-zinc-100 text-zinc-600 border border-zinc-200 cursor-pointer"
                        title="Copy link"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                      </button>
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 leading-normal font-light">
                    Share this link via WhatsApp or Instagram stories. For every peer who registers a MacBook query through this, you gain 1 credit point!
                  </p>

                  <a
                    href={`https://api.whatsapp.com/send?text=Hey!%20Get%20exclusive%20Chitkara%20Apple%2520Student%2520Discounts%2520at%2520the%20Radius%20Experience%20Center.%20Use%2520my%2520invite%20to%20register%2520interest%21%20${encodeURIComponent(generatedLink)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#25D366] hover:bg-emerald-600 text-white font-sans font-bold text-xs uppercase tracking-wider py-2.5 rounded-lg transition-colors text-center cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share directly on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
