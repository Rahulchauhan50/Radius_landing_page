/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MacBookSpec {
  modelName: string;
  badgeText: string;
  mrp: number;
  promoPrice: number;
  specs?: string;
  hasDuoPrice?: boolean;
  duoSpecs?: {
    mrp: number;
    promoPrice: number;
    specs: string;
  }[];
}

export interface BidRecord {
  id: string;
  name: string;
  phone: string;
  email: string;
  bidAmount: number;
  timestamp: string;
  status: 'pending' | 'accepted' | 'competing';
}

export interface ReferralTier {
  id: number;
  count: number;
  label: string;
  credits: string;
  rewards: string;
  activeIcons: number;
}

export interface AmbassadorCategory {
  id: string;
  title: string;
  subtitle: string;
  deliverables: string[];
  image: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
  caption: string;
}

export interface LiveEventSlot {
  time: string;
  title: string;
  details: string;
  isCompleted: boolean;
  isActive?: boolean;
}

export interface GallerySlide {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}
