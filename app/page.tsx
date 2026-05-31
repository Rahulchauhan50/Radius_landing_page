/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import Header from '../components/Header';
import Hero from '../components/Hero';
import CountdownBidding from '../components/CountdownBidding';
import ResellerBanner from '../components/ResellerBanner';
import ReferralRewards from '../components/ReferralRewards';
import Ambassadors from '../components/Ambassadors';
import SocialLaunchBuzz from '../components/SocialLaunchBuzz';
import StoreGallery from '../components/StoreGallery';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Multi-Tier Joint Header */}
      <Header />

      {/* Main Contents */}
      <main className="flex-1">
        {/* Animated Banner with Floating MacBook Spec Grid */}
        <Hero />

        {/* Counter Block with Bid Auction Panel */}
        <CountdownBidding />

        {/* Core Authorized Reseller Credentials Card */}
        <ResellerBanner />

        {/* Active Gamified Referral Tiers Selector */}
        <ReferralRewards />

        {/* Interactive Campus Creator Sourcing Forms */}
        <Ambassadors />

        {/* Split Section: Social Feed & Active Timeline Matcher */}
        <SocialLaunchBuzz />

        {/* Swipeable interior Gallery with Store Deal Lists */}
        <StoreGallery />

        {/* Help Center Collapsible QA accordion stack */}
        <FAQSection />
      </main>

      {/* Full Policy & Copyright Footer */}
      <Footer />
    </div>
  );
}
