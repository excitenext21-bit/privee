export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  image: string;
  location: string;
  description: string;
  year: string;
  grayscale?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  roleOrRelation: string;
  quote: string;
  detailedQuote?: string;
  featured?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  eventDate: string;
  location: string;
  guestCount: string;
  budget: string;
  message: string;
}

export interface TextStyle {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string;
  fontColor?: string;
  textDecoration?: string;
  fontStyle?: string;
  textTransform?: string;
  letterSpacing?: string;
  lineHeight?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
}

export interface HeroSectionData {
  mediaType: 'video' | 'image';
  videoUrl: string;
  imageUrl: string;
  category: string;
  title: string;
  categoryStyle: TextStyle;
  titleStyle: TextStyle;
}

export interface ApproachSectionData {
  leftImageUrl: string;
  rightImageUrl: string;
  eyebrow: string;
  heading: string;
  subheading: string;
  paragraph: string;
  ctaText: string;
  ctaUrl: string;
  headingStyle: TextStyle;
  subheadingStyle: TextStyle;
  paragraphStyle: TextStyle;
}

export interface VikranttSectionData {
  greeting: string;
  portraitHeading?: string;
  portraitHeadingStyle?: TextStyle;
  aestheteQuote: string;
  dogImageUrl: string;
  dogImageGrayscale: boolean;
  dogCaption: string;
  philosophyQuote: string;
  trustQuote: string;
  vikranttPortraitUrl: string;
  bgImageUrl?: string;
  portraitGrayscale: boolean;
  bioHighlightText: string;
  ctaUrl: string;
  modalBioTitle?: string;
  modalBioSubtitle?: string;
  modalBioParagraph1?: string;
  modalBioParagraph2?: string;
  modalPortraitUrl?: string;
  greetingStyle: TextStyle;
  quotesStyle: TextStyle;
}

export interface PublicationItem {
  id: string;
  name: string;
  logoUrl?: string;
  isImage?: boolean;
  grayscale?: boolean;
}

export interface PublicationsSectionData {
  title: string;
  items: PublicationItem[];
  globalGrayscale: boolean;
}

export interface PortfolioSectionData {
  title: string;
  subtitle: string;
  globalGrayscale: boolean;
  items: PortfolioItem[];
  titleStyle: TextStyle;
}

export interface TestimonialsSectionData {
  sectionHeading: string;
  imageUrl?: string;
  items: Testimonial[];
  headingStyle: TextStyle;
  quoteStyle: TextStyle;
}

export interface ProcessSectionData {
  eyebrow: string;
  heading: string;
  steps: ProcessStep[];
  headingStyle: TextStyle;
  stepTitleStyle: TextStyle;
}

export interface ContactSectionData {
  heading: string;
  introText: string;
  imageUrl: string;
  email: string;
  phone: string;
  address: string;
  instagramUrl: string;
  headingStyle: TextStyle;
  introStyle: TextStyle;
}

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  eventDate: string;
  location: string;
  guestCount: string;
  budget: string;
  message: string;
  submittedAt: string;
  status: 'New' | 'Contacted' | 'Archived';
}

export interface DatabaseConfig {
  enabled: boolean;
  type: 'mysql' | 'postgres' | 'rest_api' | 'supabase';
  host: string;
  port: string;
  databaseName: string;
  username: string;
  password?: string;
  apiUrl?: string;
  apiKey?: string;
  autoSync: boolean;
  lastConnected?: string;
  status: 'disconnected' | 'connected' | 'error';
  errorMessage?: string;
}

export interface NavItem {
  id: string;
  name: string;
  href: string;
}

export interface WatermarkConfig {
  enabled: boolean;
  type: 'text' | 'image';
  text: string;
  customImageUrl?: string;
  opacity: number; // 0.05 to 0.8
  position: 'bottom-right' | 'center' | 'bottom-left' | 'top-right' | 'diagonal-center' | 'repeat-subtle';
  size: 'small' | 'medium' | 'large';
  colorTheme: 'light' | 'gold' | 'dark';
  fontFamily: 'serif' | 'sans';
  letterSpacing?: string;
  showBorder?: boolean;
}

export interface BrandingConfig {
  siteTitle?: string;
  faviconUrl?: string;
  
  // Auto Proportional Height Toggle (applies to both logos)
  autoHeightProportional?: boolean;

  // Header Logo
  headerLogoUrl?: string;
  headerLogoWidth?: number; // e.g. 190 px
  headerLogoMaxHeight?: number; // e.g. 60 px

  // Footer Logo
  footerLogoUrl?: string;
  footerLogoWidth?: number; // e.g. 200 px
  footerLogoMaxHeight?: number; // e.g. 70 px

  // Watermark Settings
  watermark?: WatermarkConfig;

  // Navigation Links & Styling
  navItems: NavItem[];
  navStyle: TextStyle;
}

export interface SiteData {
  branding?: BrandingConfig;
  hero: HeroSectionData;
  approach: ApproachSectionData;
  vikrantt: VikranttSectionData;
  publications: PublicationsSectionData;
  portfolio: PortfolioSectionData;
  testimonials: TestimonialsSectionData;
  process: ProcessSectionData;
  contact: ContactSectionData;
  enquiries: Enquiry[];
  dbConfig?: DatabaseConfig;
}

