/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MacBookSpec, ReferralTier, AmbassadorCategory, InstagramPost, LiveEventSlot, GallerySlide, FAQItem } from './types';
import slide1 from './assets/bottom_slides/slide1.png'

export const MACBOOK_MODELS: MacBookSpec[] = [
  {
    modelName: 'MacBook Air',
    badgeText: 'Save upto ₹22,400',
    mrp: 119900,
    promoPrice: 97500,
    specs: 'Apple M2/M3 Chip, 8-Core CPU'
  },
  {
    modelName: 'MacBook Neo',
    badgeText: 'Save upto ₹15,000',
    mrp: 70900,
    promoPrice: 55900,
    hasDuoPrice: true,
    duoSpecs: [
      {
        mrp: 70900,
        promoPrice: 55900,
        specs: '8GB/256'
      },
      {
        mrp: 79000,
        promoPrice: 64900,
        specs: '8GB/512'
      }
    ]
  },
  {
    modelName: 'MacBook Pro',
    badgeText: 'Save upto ₹24,000',
    mrp: 189900,
    promoPrice: 165900,
    specs: 'M3 Pro/Max Chip, Liquid Retina XDR'
  }
];

export const REFERRAL_TIERS: ReferralTier[] = [
  {
    id: 1,
    count: 1,
    label: 'Refer 1 friend',
    credits: '₹1,000 Store Credit',
    rewards: 'Bronze Level Badge & Sticker Pack',
    activeIcons: 1
  },
  {
    id: 2,
    count: 3,
    label: 'Refer 3 friends',
    credits: '₹4,000 Store Credit',
    rewards: 'Silver Level Ambassador Badge',
    activeIcons: 3
  },
  {
    id: 3,
    count: 5,
    label: 'Refer 5 friends',
    credits: '₹8,000 Store Credit',
    rewards: 'Gold Badge & Elite Tech Kit',
    activeIcons: 5
  },
  {
    id: 4,
    count: 10,
    label: 'Top referrer of the month',
    credits: 'Free AirPods Pro + ₹10k Credit',
    rewards: 'Elite Campus Leader Trophy & Title',
    activeIcons: 8
  }
];

export const AMBASSADOR_CATEGORIES: AmbassadorCategory[] = [
  {
    id: 'creators',
    title: 'Creators',
    subtitle: 'Make reels for Radius. Earn the stage.',
    deliverables: [
      '2 reels with 500+ organic views each',
      'Mention store tag @radiuschitkara',
      'Create 1 high-quality photo story'
    ],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: 'campus_stars',
    title: 'Campus Stars',
    subtitle: 'Lead peer micro-influence campaigns.',
    deliverables: [
      '1 dedicated YouTube review (2+ min)',
      '3 authentic Reels showing student workflow',
      '1 Live Student Story takeover assignment'
    ],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600'
  }
];

export const INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: 'post_1',
    imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=400&h=400',
    likes: 245,
    comments: 18,
    caption: 'Back to university with the speed of Apple Silicon. Exclusive discounts for students. 💻🔥 #RadiusElevate #Chitkara'
  },
  {
    id: 'post_2',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400&h=400',
    likes: 312,
    comments: 32,
    caption: 'Why compromise on code compiles? Build fast, test smart. Unmatched performance inside the Training Lab.'
  },
  {
    id: 'post_3',
    imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=400&h=400',
    likes: 189,
    comments: 9,
    caption: 'Designing from the quiet spots on campus. The lightweight MacBook Air goes wherever your ideas take you.'
  },
  {
    id: 'post_4',
    imageUrl: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=400&h=400',
    likes: 420,
    comments: 41,
    caption: 'Campus leaders gather! The first-ever premium experience center is finally here at Chitkara block. Stop by now!'
  },
  {
    id: 'post_5',
    imageUrl: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?auto=format&fit=crop&q=80&w=400&h=400',
    likes: 288,
    comments: 15,
    caption: 'Buy back, trade-in, and match. We give you instant value for old tech so you never fall behind. 🔄🍏'
  },
  {
    id: 'post_6',
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400&h=400',
    likes: 567,
    comments: 89,
    caption: 'Grand opening highlights! Over 5,000 students joined the reveal moments. Get your exclusive student badge today.'
  }
];

export const LIVE_EVENT_SLOTS: LiveEventSlot[] = [
  {
    time: '3:00 PM',
    title: 'Orientation & Student Welcome',
    details: 'Step into the dedicated lab for dynamic, hands-on masterclasses showcasing creative Apple suites.',
    isCompleted: true
  },
  {
    time: '5:00 PM',
    title: 'Live Surprise Bid Auction',
    details: 'The peak event. Fill out your bidder profiles now. Successful unique bids on MacBook Neo announced live.',
    isCompleted: false,
    isActive: true
  },
  {
    time: '8:00 PM',
    title: 'Grand Concert & Elite Winners',
    details: 'Recognizing our top referral influencers and announcing lucky draw winners live on our main staging deck.',
    isCompleted: false
  }
];

export const GALLERY_SLIDES: GallerySlide[] = [
  {
    id: 1,
    title: '',
    subtitle: '',
    imageUrl: slide1.src,
  },
  {
    id: 2,
    title: '',
    subtitle: '',
    imageUrl: slide1.src,
  },
  {
    id: 3,
     title: '',
    subtitle: '',
    imageUrl: slide1.src,
  },
  {
    id: 4,
    title: '',
    subtitle: '',
    imageUrl: slide1.src,
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'What is the Radius Store at Chitkara?',
    answer: 'Radius Elevate is North India\'s first on-campus Apple Authorized Reseller, located inside the Chitkara University campus. It is custom-built to offer student-exclusive pricing, a dedicated interactive Apple training lab, and instant academic configurations for your course curriculum.'
  },
  {
    question: 'Am I eligible for Apple Education pricing?',
    answer: 'Yes, all students, faculty, and staff at Chitkara University with a valid college ID card or university email address can avail of exclusive Apple Education Pricing, which includes up to ₹24,000 in immediate savings and complimentary accessories.'
  },
  {
    question: 'How much can I actually save?',
    answer: 'You can save up to ₹24,000 on MacBook models, receive up to ₹10,000 in addition through exchange bonus offers, and claim complimentary custom-themed merchandise during student events.'
  },
  {
    question: 'What is the Surprise Bid auction?',
    answer: 'It is an exclusive, student-only interactive bidding event. Fill in your preferred bid price using our countdown interface. Successful and unique matches will buy the MacBook Neo at their custom bidding price during the main live event!'
  },
  {
    question: 'What is the Buyback Guarantee?',
    answer: 'We guarantee up to 60% buyback value when you upgrade your campus-purchased MacBook to the next-generation Apple Silicon model after 1 or 2 years, ensuring you are always equipped with the latest hardware.'
  },
  {
    question: 'What is Radius Academy?',
    answer: 'Radius Academy is our on-campus iOS Developer & Creator Lab where we host free certifications, swift workshops, and creative design sprints led by industry veterans and Apple experts.'
  },
  {
    question: 'How does the internship lottery work?',
    answer: 'Every MacBook purchase logs you into a seasonal student pool. Selected students undergo interviews for high-paying roles as Campus Ambassadors, Store Interns, or Support Specialists directly mentored by Apple specialists.'
  },
  {
    question: 'Can I pay in EMI?',
    answer: 'Yes! We offer student-friendly no-cost EMI structures up to 12 months with leading commercial banks, as well as offline pay-later sponsorships for merit-holders.'
  },
  {
    question: 'How do I become a Radius Ambassador?',
    answer: 'Select standard student Creator or Campus Star paths above and register your profile. Our onboarding team scans social links weekly and distributes gear kits to finalists.'
  },
  {
    question: 'Where is the store located on campus?',
    answer: 'Radius Elevate is strategically located at the central block of the Chitkara University campus (near Block-C Food Street) for fast, direct, and continuous student access.'
  }
];
