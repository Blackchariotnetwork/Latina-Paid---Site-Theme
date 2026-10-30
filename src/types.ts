export type UserRole = 'guest' | 'subscriber' | 'creator';

export type AccessTierId = 'free_preview' | 'club' | 'vip' | 'diamond';

export interface SubscriptionTier {
  id: AccessTierId;
  name: string;
  tagline: string;
  priceMonthly: number;
  priceAnnual: number;
  badge?: string;
  popular?: boolean;
  perks: string[];
  maxResolution: '1080p' | '1440p' | '4K UHD' | '4K UHD 60FPS HDR';
  unlimitedDownloads: boolean;
  priorityChat: boolean;
  ppvDiscountPercent: number;
}

export type ContentType = 'video' | 'gallery' | 'bts' | 'livestream';

export interface GalleryPhoto {
  id: string;
  title: string;
  resolution: string;
  aspect: string;
  accentColor: string;
  moodDescription: string;
}

export interface MediaItem {
  id: string;
  title: string;
  slug: string;
  type: ContentType;
  duration?: string;
  photoCount?: number;
  releaseDate: string;
  tierRequired: AccessTierId;
  isPPV: boolean;
  ppvPrice?: number;
  resolution: '1080p' | '1440p' | '4K UHD' | '4K HDR 60fps';
  fps: number;
  bitrate: string;
  codec: string;
  audioSpec: string;
  tags: string[];
  description: string;
  gradient: string;
  accentOverlay: string;
  viewsCount: number;
  likesCount: number;
  featured?: boolean;
  galleryPhotos?: GalleryPhoto[];
}

export interface UserSession {
  role: UserRole;
  tier: AccessTierId;
  name: string;
  email: string;
  subscriberId: string;
  subscriptionStatus: 'active' | 'canceling' | 'paused' | 'none';
  renewalDate: string;
  billingCycle: 'monthly' | 'annual';
  unlockedPPVIds: string[];
  savedPaymentMethod?: {
    type: 'card' | 'crypto' | 'merchant';
    label: string;
    last4?: string;
    brand?: string;
  };
  balance?: number;
  adultAgeVerified: boolean;
  tipTotal: number;
}

export type GalleryLayoutMode = 'grid-3' | 'grid-2' | 'masonry' | 'compact';

export type ThemeAccentColor = 'fuego' | 'oro' | 'esmeralda' | 'habano' | 'rose' | 'amber' | 'emerald' | 'violet';

export interface ThemeConfig {
  accent: ThemeAccentColor;
  blurStrength: 'subtle' | 'medium' | 'heavy';
  watermarkEnabled: boolean;
  watermarkText: string;
  compactCards: boolean;
}

export type PaymentGatewayType = 'card' | 'crypto' | 'ccbill' | 'segpay' | 'paxum';

export interface InvoiceRecord {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: 'paid' | 'pending' | 'refunded';
  gateway: string;
}
