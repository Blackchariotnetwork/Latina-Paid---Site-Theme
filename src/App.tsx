/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  MediaItem,
  UserSession,
  SubscriptionTier,
  GalleryLayoutMode,
  ThemeConfig,
} from './types';
import { MEDIA_CATALOG, SUBSCRIPTION_TIERS, INITIAL_USER_SESSIONS } from './data/mockData';
import { TopNavigation } from './components/TopNavigation';
import { HeroSection } from './components/HeroSection';
import { ContentGallery } from './components/ContentGallery';
import { VideoStreamingPlayer } from './components/VideoStreamingPlayer';
import { PhotoGalleryLightbox } from './components/PhotoGalleryLightbox';
import { SubscriptionModal } from './components/SubscriptionModal';
import { PaymentGatewayModal } from './components/PaymentGatewayModal';
import { CreatorStudioDrawer } from './components/CreatorStudioDrawer';
import { AgeVerificationModal } from './components/AgeVerificationModal';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';

export default function App() {
  // Theme & Dark mode
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    accent: 'fuego',
    blurStrength: 'medium',
    watermarkEnabled: true,
    watermarkText: 'FUEGO NOIR · [USER_ID] · PRIVÉ',
    compactCards: false,
  });

  // User session state (switchable between guest, vip, and creator)
  const [userSession, setUserSession] = useState<UserSession>(INITIAL_USER_SESSIONS['vip']);
  const [ageVerified, setAgeVerified] = useState(false);

  // Content catalog state (supports dynamic publishing)
  const [catalogItems, setCatalogItems] = useState<MediaItem[]>(MEDIA_CATALOG);
  const [layoutMode, setLayoutMode] = useState<GalleryLayoutMode>('grid-3');
  const [activeNav, setActiveNav] = useState('vault');

  // Modals & Players
  const [activeVideoItem, setActiveVideoItem] = useState<MediaItem | null>(null);
  const [activeGalleryItem, setActiveGalleryItem] = useState<MediaItem | null>(null);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [isPaymentGatewayModalOpen, setIsPaymentGatewayModalOpen] = useState(false);
  const [isCreatorStudioOpen, setIsCreatorStudioOpen] = useState(false);
  const [isTipJarOpen, setIsTipJarOpen] = useState(false);

  // Checkout context
  const [checkoutTier, setCheckoutTier] = useState<SubscriptionTier | undefined>(undefined);
  const [checkoutCycle, setCheckoutCycle] = useState<'monthly' | 'annual'>('monthly');
  const [checkoutPPVItem, setCheckoutPPVItem] = useState<MediaItem | undefined>(undefined);

  // Sync dark mode class on <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Check stored age verification
  useEffect(() => {
    const verified = localStorage.getItem('vn_age_verified');
    if (verified === 'true') {
      setAgeVerified(true);
    }
  }, []);

  const handleConfirmAge = () => {
    setAgeVerified(true);
    localStorage.setItem('vn_age_verified', 'true');
  };

  // Content Selection
  const handleSelectItem = (item: MediaItem) => {
    if (item.type === 'gallery') {
      setActiveGalleryItem(item);
    } else {
      setActiveVideoItem(item);
    }
  };

  // PPV Unlock checkout trigger
  const handleUnlockPPV = (item: MediaItem) => {
    setCheckoutPPVItem(item);
    setCheckoutTier(undefined);
    setIsTipJarOpen(false);
    setIsPaymentGatewayModalOpen(true);
  };

  // Subscription checkout trigger
  const handleSelectTierToPay = (tier: SubscriptionTier, cycle: 'monthly' | 'annual') => {
    setCheckoutTier(tier);
    setCheckoutCycle(cycle);
    setCheckoutPPVItem(undefined);
    setIsTipJarOpen(false);
    setIsSubscriptionModalOpen(false);
    setIsPaymentGatewayModalOpen(true);
  };

  // Open Tip Jar
  const handleOpenTipJar = () => {
    setIsTipJarOpen(true);
    setCheckoutTier(undefined);
    setCheckoutPPVItem(undefined);
    setIsPaymentGatewayModalOpen(true);
  };

  // Payment success handler
  const handlePaymentSuccess = (details: {
    gateway: string;
    amount: number;
    description: string;
    tierId?: string;
    ppvId?: string;
  }) => {
    setIsPaymentGatewayModalOpen(false);

    if (details.ppvId) {
      setUserSession(prev => ({
        ...prev,
        unlockedPPVIds: [...prev.unlockedPPVIds, details.ppvId!],
      }));
    } else if (details.tierId) {
      setUserSession(prev => ({
        ...prev,
        tier: details.tierId as any,
        subscriptionStatus: 'active',
        renewalDate: 'November 30, 2026',
        billingCycle: checkoutCycle,
        role: 'subscriber',
      }));
    } else if (isTipJarOpen) {
      setUserSession(prev => ({
        ...prev,
        tipTotal: prev.tipTotal + details.amount,
      }));
    }
  };

  // Subscription lifecycle handlers
  const handleCancelSubscription = () => {
    setUserSession(prev => ({
      ...prev,
      subscriptionStatus: 'canceling',
    }));
  };

  const handlePauseSubscription = () => {
    setUserSession(prev => ({
      ...prev,
      subscriptionStatus: 'paused',
    }));
  };

  const handleResumeSubscription = () => {
    setUserSession(prev => ({
      ...prev,
      subscriptionStatus: 'active',
    }));
  };

  // Persona switcher for testing
  const handleSwitchSession = (roleKey: 'guest' | 'vip' | 'creator') => {
    setUserSession(INITIAL_USER_SESSIONS[roleKey]);
  };

  // Creator publish mock drop
  const handlePublishMockItem = (newItem: {
    title: string;
    type: 'video' | 'gallery';
    price: number;
    resolution: string;
  }) => {
    const created: MediaItem = {
      id: `media-custom-${Date.now()}`,
      title: newItem.title,
      slug: newItem.title.toLowerCase().replace(/\s+/g, '-'),
      type: newItem.type,
      duration: newItem.type === 'video' ? '22:15' : undefined,
      photoCount: newItem.type === 'gallery' ? 36 : undefined,
      releaseDate: 'Just Now',
      tierRequired: 'vip',
      isPPV: newItem.price > 0,
      ppvPrice: newItem.price > 0 ? newItem.price : undefined,
      resolution: newItem.resolution as any,
      fps: 60,
      bitrate: '38.2 Mbps',
      codec: 'AV1 Main 10-bit',
      audioSpec: 'Dolby 5.1 Surround',
      tags: ['New Release', 'Creator Drop', '4K Master'],
      description: 'Exclusive freshly published high-bitrate master drop directly from the Creator Studio console.',
      gradient: 'from-rose-950 via-zinc-900 to-black',
      accentOverlay: 'rgba(244, 63, 94, 0.2)',
      viewsCount: 1,
      likesCount: 1,
    };
    setCatalogItems(prev => [created, ...prev]);
  };

  const featuredMedia = catalogItems[0] || MEDIA_CATALOG[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* 18+ Age Verification Modal */}
      <AgeVerificationModal
        isOpen={!ageVerified}
        onConfirm={handleConfirmAge}
      />

      {/* Top Bar Navigation Contract */}
      <TopNavigation
        userSession={userSession}
        activeNav={activeNav}
        onSelectNav={nav => {
          setActiveNav(nav);
          if (nav === 'memberships') {
            setIsSubscriptionModalOpen(true);
          }
        }}
        onOpenSubscribe={() => setIsSubscriptionModalOpen(true)}
        onOpenAccount={() => setIsSubscriptionModalOpen(true)}
        onOpenTipJar={handleOpenTipJar}
        onToggleCreatorStudio={() => setIsCreatorStudioOpen(true)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Persona Notice Strip */}
      <div className="bg-zinc-900/60 border-b border-zinc-800/80 px-4 py-1.5 text-center text-xs flex items-center justify-center gap-2">
        <span className="text-zinc-400">Demostración de Tema Fuego Noir:</span>
        <span className="font-semibold text-amber-400 font-mono">
          {userSession.name} ({userSession.tier.toUpperCase()})
        </span>
        <button
          onClick={() => setIsCreatorStudioOpen(true)}
          className="underline text-amber-500/90 hover:text-white ml-2 cursor-pointer"
        >
          Cambiar Creadora & Estudio
        </button>
      </div>

      {/* Hero Section */}
      <HeroSection
        featuredItem={featuredMedia}
        userSession={userSession}
        onPlayFeatured={() => handleSelectItem(featuredMedia)}
        onOpenSubscribe={() => setIsSubscriptionModalOpen(true)}
      />

      {/* Customizable Content Gallery */}
      <ContentGallery
        items={catalogItems}
        userSession={userSession}
        onSelectItem={handleSelectItem}
        onUnlockPPV={handleUnlockPPV}
        onOpenSubscribe={() => setIsSubscriptionModalOpen(true)}
        layoutMode={layoutMode}
        onChangeLayout={setLayoutMode}
      />

      {/* Video Streaming Player Modal */}
      {activeVideoItem && (
        <VideoStreamingPlayer
          item={activeVideoItem}
          userSession={userSession}
          onClose={() => setActiveVideoItem(null)}
          onUnlockPPV={handleUnlockPPV}
          onSelectAnotherVideo={item => setActiveVideoItem(item)}
          allVideos={catalogItems.filter(i => i.type === 'video' || i.type === 'bts' || i.type === 'livestream')}
        />
      )}

      {/* Photo Gallery Lightbox Modal */}
      {activeGalleryItem && (
        <PhotoGalleryLightbox
          item={activeGalleryItem}
          userSession={userSession}
          onClose={() => setActiveGalleryItem(null)}
          onUnlock={() => setIsSubscriptionModalOpen(true)}
        />
      )}

      {/* Subscription Tiers & Membership Management Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        userSession={userSession}
        onClose={() => setIsSubscriptionModalOpen(false)}
        onSelectTierToPay={handleSelectTierToPay}
        onCancelSubscription={handleCancelSubscription}
        onPauseSubscription={handlePauseSubscription}
        onResumeSubscription={handleResumeSubscription}
      />

      {/* Payment Gateway Modal (Cards, Crypto, CCBill, PPV, Tip Jar) */}
      <PaymentGatewayModal
        isOpen={isPaymentGatewayModalOpen}
        onClose={() => setIsPaymentGatewayModalOpen(false)}
        tierItem={checkoutTier}
        billingCycle={checkoutCycle}
        ppvItem={checkoutPPVItem}
        isTipJar={isTipJarOpen}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Creator Studio & Live Theme Customizer Drawer */}
      <CreatorStudioDrawer
        isOpen={isCreatorStudioOpen}
        onClose={() => setIsCreatorStudioOpen(false)}
        themeConfig={themeConfig}
        onChangeThemeConfig={cfg => setThemeConfig(prev => ({ ...prev, ...cfg }))}
        currentSession={userSession}
        onSwitchSession={handleSwitchSession}
        onPublishMockItem={handlePublishMockItem}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activeNav={activeNav}
        onSelectNav={nav => {
          setActiveNav(nav);
          if (nav === 'memberships') {
            setIsSubscriptionModalOpen(true);
          }
        }}
        onOpenSubscribe={() => setIsSubscriptionModalOpen(true)}
        onOpenTipJar={handleOpenTipJar}
        onToggleCreatorStudio={() => setIsCreatorStudioOpen(true)}
        userSession={userSession}
      />

      {/* Compliant Footer */}
      <Footer
        onOpenSubscribe={() => setIsSubscriptionModalOpen(true)}
        onOpenAgeModal={() => setAgeVerified(false)}
      />

    </div>
  );
}
