'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { BidRecord } from '../types';

export default function CountdownBidding() {
  // Target: 5:00 PM IST on Friday, 5th June 2026
  // IST = UTC+5:30 → 5 PM IST = 11:30 AM UTC
  const TARGET_DATE = new Date('2026-06-05T11:30:00Z');

  const calcTimeLeft = () => {
    const diff = TARGET_DATE.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const totalSeconds = Math.floor(diff / 1000);
    return {
      days: Math.floor(totalSeconds / 86400),
      hours: Math.floor((totalSeconds % 86400) / 3600),
      minutes: Math.floor((totalSeconds % 3600) / 60),
      seconds: totalSeconds % 60,
    };
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);

  // Client form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    bidAmount: '',
  });

  const [bids, setBids] = useState<BidRecord[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    text: string;
    type: 'success' | 'error' | '';
  }>({ text: '', type: '' });

  // Load existing bids on mount
  useEffect(() => {
    const savedBids = localStorage.getItem('radius_auction_bids');
    if (savedBids) {
      setBids(JSON.parse(savedBids));
    } else {
      const initialBids: BidRecord[] = [
        { id: 'b1', name: 'Kabir Singh', phone: '******8210', email: 'kabir.s***@chitkara.edu', bidAmount: 48500, timestamp: '10 mins ago', status: 'competing' },
        { id: 'b2', name: 'Sneha Sharma', phone: '******9940', email: 'sneha.s***@chitkara.edu', bidAmount: 51200, timestamp: '24 mins ago', status: 'competing' },
        { id: 'b3', name: 'Arjun Verma', phone: '******4132', email: 'arjun.v***@chitkara.edu', bidAmount: 49900, timestamp: '1 hr ago', status: 'competing' },
      ];
      localStorage.setItem('radius_auction_bids', JSON.stringify(initialBids));
      setBids(initialBids);
    }
  }, []);

  // Ticking countdown timer — recalculates against the real target every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Form submit handler
  const handleBidSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const { name, phone, email, bidAmount } = formData;

    if (!name || !phone || !email || !bidAmount) {
      setStatusMessage({ text: 'Please fill all fields to log your bid!', type: 'error' });
      return;
    }

    const parsedBid = parseFloat(bidAmount);
    if (isNaN(parsedBid) || parsedBid <= 0) {
      setStatusMessage({ text: 'Please enter a valid numeric bid amount.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage({ text: '', type: '' });

    try {
      const response = await fetch('/api/bid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          bidAmount: parsedBid,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit bid.');
      }

      const newBid: BidRecord = {
        id: data.bidId || ('bid_' + Math.random().toString(36).substring(2, 9)),
        name: name.trim(),
        phone: phone.substring(0, Math.min(phone.length, 3)) + '******' + phone.substring(Math.max(0, phone.length - 4)),
        email: email.split('@')[0].substring(0, 4) + '***@' + (email.split('@')[1] || 'chitkara.edu'),
        bidAmount: parsedBid,
        timestamp: 'Just now',
        status: 'accepted',
      };

      const updatedBids = [newBid, ...bids];
      setBids(updatedBids);
      localStorage.setItem('radius_auction_bids', JSON.stringify(updatedBids));

      setStatusMessage({
        text: `Congratulations ${name.split(' ')[0]}! Your bid of ₹${parsedBid.toLocaleString('en-IN')} has been logged (Bid ID: ${data.bidId}), and confirmation emails have been sent.`,
        type: 'success',
      });

      setFormData({ name: '', phone: '', email: '', bidAmount: '' });
    } catch (error: any) {
      console.error('Bid submission error:', error);
      setStatusMessage({
        text: error?.message || 'Something went wrong. Please check your connection and try again.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => {
        setStatusMessage((prev) => {
          return prev.type === 'success' ? { text: '', type: '' } : prev;
        });
      }, 6000);
    }
  };

  return (
    <div id="surprise-bid" className="w-full bg-black text-white py-12 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Row: Title, Countdown Timer, and Product Info */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Title */}
          <div className="flex-1 text-center lg:text-left">
            <h2 className="font-sans font-bold text-3xl sm:text-[40px] lg:text-[44px] text-white tracking-tight leading-tight">
              Grand Opening Countdown
            </h2>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center justify-center gap-3">
            {/* Days Card */}
            <div className="w-[68px] h-[82px] bg-[#1c1c1e] border border-zinc-800/80 rounded-xl flex flex-col justify-between py-2.5 shadow-md">
              <div className="flex-1 flex items-center justify-center">
                <span className="text-3xl font-semibold text-white tracking-tight leading-none">
                  {timeLeft.days.toString().padStart(2, '0')}
                </span>
              </div>
              <div className="w-full border-t border-zinc-800/80"></div>
              <span className="text-[9px] font-bold tracking-widest text-zinc-400 text-center uppercase">
                DAYS
              </span>
            </div>

            {/* Colon */}
            <div className="flex flex-col gap-2.5 px-0.5 justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-650 bg-[#52525b]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-650 bg-[#52525b]"></div>
            </div>

            {/* Hours Card */}
            <div className="w-[68px] h-[82px] bg-[#1c1c1e] border border-zinc-800/80 rounded-xl flex flex-col justify-between py-2.5 shadow-md">
              <div className="flex-1 flex items-center justify-center">
                <span className="text-3xl font-semibold text-white tracking-tight leading-none">
                  {timeLeft.hours.toString().padStart(2, '0')}
                </span>
              </div>
              <div className="w-full border-t border-zinc-800/80"></div>
              <span className="text-[9px] font-bold tracking-widest text-zinc-400 text-center uppercase">
                HRS
              </span>
            </div>

            {/* Colon */}
            <div className="flex flex-col gap-2.5 px-0.5 justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-650 bg-[#52525b]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-650 bg-[#52525b]"></div>
            </div>

            {/* Minutes Card */}
            <div className="w-[68px] h-[82px] bg-[#1c1c1e] border border-zinc-800/80 rounded-xl flex flex-col justify-between py-2.5 shadow-md">
              <div className="flex-1 flex items-center justify-center">
                <span className="text-3xl font-semibold text-white tracking-tight leading-none">
                  {timeLeft.minutes.toString().padStart(2, '0')}
                </span>
              </div>
              <div className="w-full border-t border-zinc-800/80"></div>
              <span className="text-[9px] font-bold tracking-widest text-zinc-400 text-center uppercase">
                MINS
              </span>
            </div>

            {/* Colon */}
            <div className="flex flex-col gap-2.5 px-0.5 justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-650 bg-[#52525b]"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-650 bg-[#52525b]"></div>
            </div>

            {/* Seconds Card */}
            <div className="w-[68px] h-[82px] bg-[#1c1c1e] border border-zinc-800/80 rounded-xl flex flex-col justify-between py-2.5 shadow-md">
              <div className="flex-1 flex items-center justify-center">
                <span className="text-3xl font-semibold text-white tracking-tight leading-none">
                  {timeLeft.seconds.toString().padStart(2, '0')}
                </span>
              </div>
              <div className="w-full border-t border-zinc-800/80"></div>
              <span className="text-[9px] font-bold tracking-widest text-zinc-400 text-center uppercase">
                SECS
              </span>
            </div>
          </div>

          {/* Product Description */}
          <div className="flex-1 text-center lg:text-left pl-0 lg:pl-4">
            <h3 className="text-white text-lg font-medium font-sans">
              MacBook Neo
            </h3>
            <p className="text-zinc-400 text-sm font-sans mt-0.5">
              Take it home at your price.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full border-t border-zinc-900 my-8"></div>

        {/* Bottom Row: Instruction & Form */}
        <div className="w-full">
          <p className="text-zinc-350 text-xs sm:text-[13px] font-normal mb-4 text-left font-sans text-zinc-300">
            Fill form below to be a part of the auction to buy MacBook Neo at price of your choice
          </p>

          <form onSubmit={handleBidSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-stretch w-full">
            <input
              type="text"
              required
              disabled={isSubmitting}
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-white text-black placeholder-zinc-500 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D22630] transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
            />
            <input
              type="tel"
              required
              disabled={isSubmitting}
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-white text-black placeholder-zinc-500 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D22630] transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
            />
            <input
              type="email"
              required
              disabled={isSubmitting}
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-white text-black placeholder-zinc-500 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D22630] transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
            />
            <input
              type="number"
              required
              disabled={isSubmitting}
              placeholder="Your Bid Amount"
              value={formData.bidAmount}
              onChange={(e) => setFormData({ ...formData, bidAmount: e.target.value })}
              className="bg-white text-black placeholder-zinc-500 px-4 py-3 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#D22630] transition-all duration-200 disabled:opacity-75 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#D22630] hover:bg-[#b81d24] text-white font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer text-center flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Your Bid'
              )}
            </button>
          </form>

          {/* Status Message */}
          {statusMessage.text && (
            <div className={`mt-4 p-3.5 rounded-lg text-xs leading-normal font-medium tracking-wide ${
              statusMessage.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                : 'bg-rose-500/10 border border-rose-500/20 text-rose-400'
            }`}>
              {statusMessage.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
