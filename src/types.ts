export interface TemplateConfig {
  shopName: string;
  shopDescription: string;
  shopeeAffiliateUrl: string; // Base affiliate link
  whatsappNumber: string; // Contact for support/questions
  instagramUser: string; // Instagram handle
  primaryColor: string; // Shopee Orange default: #EE4D2D
  secondaryColor: string; // Accent/secondary default: #F53D2D
  backgroundColor: string; // Background color: #F5F5F5
  cardStyle: 'rounded' | 'square' | 'flat';
  gridColumns: 2 | 3 | 4;
  showCarousel: boolean;
  carouselImages: string[];
  categories: string[];
  footerText: string;
  
  // Footer Links Config
  footerAboutUrl: string;
  footerContactUrl: string;
  footerPrivacyUrl: string;
  footerTermsUrl: string;

  // Google AdSense Config
  showAdSense: boolean;
  adSenseClientId: string; // ca-pub-XXXXXXXXXXXXXXXX
  adSenseTopSlot: string; // Top Banner Slot ID
  adSenseMiddleSlot: string; // Middle Banner Slot ID
  adSenseBottomSlot: string; // Bottom Banner Slot ID
}

export interface Product {
  id: string;
  title: string;
  originalPrice: number;
  discountedPrice: number;
  imageUrl: string;
  affiliateUrl: string;
  category: string;
  badge?: string;
  isFeatured?: boolean;
}
