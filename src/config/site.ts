/* Blog share targets. 'native' = device share sheet, 'copy' = copy link —
   both are JS-only and hidden when unsupported. The rest are plain intent links. */
export type ShareTarget =
  | 'native'
  | 'copy'
  | 'x'
  | 'facebook'
  | 'linkedin'
  | 'bluesky'
  | 'threads'
  | 'whatsapp'
  | 'telegram'
  | 'reddit'
  | 'pinterest'
  | 'email'
  | 'sms';

export interface Site {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  /* Primary offering, used to build the homepage <title> ("[primaryService] in [city] | [name]")
     and AI-search summaries. Keep short and human. */
  primaryService: string;
  /* Marketing city for SEO titles + homepage copy. Keep in sync with address.locality. */
  city: string;
  url: string;
  logo: string;
  email: string;
  phone: string;
  address: { street: string; locality: string; region: string; postalCode: string; country: string };
  geo: { lat: number; lng: number };
  /* Plain-language service area. Online-service business: no storefront, works anywhere. */
  serviceArea: string;
  /* Areas served — footer line + LocalBusiness JSON-LD areaServed. */
  serviceAreas: string[];
  hours: Array<{ days: string; dayOfWeek: string[]; opens: string; closes: string }>;
  nav: Array<{ label: string; href: string }>;
  /* Primary conversion action, reused in the nav and hero. */
  cta: { label: string; href: string };
  socials: Array<{ label: string; href: string; icon: string }>;
  /* Which share targets appear on blog posts, in render order. */
  shareLinks: ShareTarget[];
  analytics: { provider: 'none' | 'plausible' | 'ga'; id?: string };
  form: { endpoint: string; turnstileSiteKey: string; recipientLabel: string };
  /* Credibility facts. rating/license/dispatch are storefront-template slots —
     unused for Ampolic (no published rating or trade license). */
  trust: { established: number; ratingValue: number; reviewCount: number; license: string; dispatch: string };
  /* E-E-A-T owner/credential slots. Licenses/certifications may be empty. */
  credentials: {
    owner: { name: string; title: string; photo?: string };
    licenses: string[];
    certifications: string[];
  };
  /* Pricing tiers rendered on the homepage #pricing section. `regular` is the
     struck-through list price shown next to the current `price`. */
  pricing: Array<{
    name: string;
    price: string;
    regular: string;
    period: string;
    blurb: string;
    features: string[];
    featured?: boolean;
  }>;
  /* Literal colors for build-time OG social cards. Satori needs concrete values;
     keep these in sync with the corresponding @theme tokens in global.css. */
  og: { bg: string; fg: string; brand: string };
  /* Privacy/terms config. Drives the /privacy and /terms pages; see the Legal type. */
  legal: Legal;
  /* Discreet agency attribution in the footer + humans.txt. This IS the agency's
     own site, so the credit line is redundant — disabled. */
  credit: { enabled: boolean; name: string; url: string };
}

/* Legal/privacy config. Feeds the /privacy and /terms pages. Values here are
   placeholders until reviewed — the business must review both pages with counsel. */
export interface Legal {
  businessLegalName: string;
  contactEmail: string;
  /* Date the current policy text takes effect. TODO: set before launch. */
  effectiveDate: string;
  lastReviewed: string;
  formProcessor: { name: string; privacyUrl: string };
  analyticsProvider: string | null;
  analyticsSnippet: string | null;
  jurisdictionNote: string;
}

export const site: Site = {
  name: 'Ampolic Digital Solutions',
  legalName: 'Ampolic Digital Solutions LLC',
  tagline: 'Digital marketing for small businesses.',
  description:
    'Ampolic Digital Solutions is an Ohio based digital marketing company that is dedicated to providing premium and affordable websites.',
  primaryService: 'Digital Marketing',
  city: 'Toledo',
  url: 'https://ampolic.com',
  logo: '/favicon.svg',
  /* TODO: replace with the real public contact address if different. */
  email: 'claude@ampolic.com',
  phone: '+1-419-740-1850',
  /* Online-service business — no published street address. TODO: add street/postal
     code if a mailing address is ever published. */
  address: { street: '', locality: 'Toledo', region: 'OH', postalCode: '', country: 'US' },
  /* Toledo, OH city-center coordinates (general area, not a storefront). */
  geo: { lat: 41.6528, lng: -83.5379 },
  serviceArea: 'Ohio, United States',
  serviceAreas: ['Ohio, United States'],
  /* TODO: confirm business hours; support replies within 1–2 business days. */
  hours: [
    {
      days: 'Mon-Fri',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '17:00',
    },
  ],
  nav: [
    { label: 'About', href: '/#about' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Our Work', href: '/our-work' },
    { label: 'Team', href: '/team' },
    { label: 'Contact', href: '/#contact' },
  ],
  cta: { label: 'Contact Us', href: '/#contact' },
  socials: [
    { label: 'Facebook', href: 'https://www.facebook.com/Ampolic/about/', icon: 'lucide:facebook' },
    { label: 'GitHub', href: 'https://github.com/ampolic', icon: 'lucide:github' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/ampolic/', icon: 'lucide:linkedin' },
    { label: 'X', href: 'https://x.com/AmpolicDigital', icon: 'lucide:twitter' },
  ],
  shareLinks: ['native', 'copy', 'facebook', 'linkedin', 'x', 'email'],
  analytics: { provider: 'none' },
  form: { endpoint: '/api/contact', turnstileSiteKey: '1x00000000000000000000AA', recipientLabel: 'the Ampolic team' },
  /* rating/license/dispatch unused — no published rating or trade license. */
  trust: { established: 2020, ratingValue: 0, reviewCount: 0, license: '', dispatch: '' },
  credentials: {
    owner: { name: 'Sam Scherf', title: 'CEO / Co-Owner' },
    licenses: [],
    certifications: [],
  },
  pricing: [
    {
      name: 'One-Pager',
      price: '$39',
      regular: '$99',
      period: '/mo',
      blurb: 'Best for new businesses that need a clean, professional web presence',
      features: [
        'Custom one-page website',
        'Mobile-friendly design',
        'Contact form + email notifications',
        'Initial SEO setup',
        'Hosting included',
        'Domain setup',
      ],
    },
    {
      name: 'Small Business Bundle',
      price: '$99',
      regular: '$199',
      period: '/mo',
      blurb: 'For businesses that need more room to explain services, locations, and customer trust signals',
      features: [
        'Everything in One-Pager',
        'Up to 10 pages',
        'Service, about, contact, and location pages',
        'Ongoing SEO',
        'Basic content updates',
        'Domain and maintenance included',
      ],
      featured: true,
    },
    {
      name: 'Custom Package',
      price: '$199+',
      regular: '$499+',
      period: '/mo',
      blurb: 'For businesses that need advanced features, ongoing content, or custom workflows',
      features: [
        'Everything in Bundle',
        'Blog system',
        'Custom email hosting',
        'Complex forms',
        'E-commerce',
        'Advanced SEO and integrations',
        'Priority support',
      ],
    },
  ],
  /* Keep in sync with @theme tokens in global.css. */
  og: { bg: '#061221', fg: '#f4f8fc', brand: '#ff9e62' },
  legal: {
    businessLegalName: 'Ampolic Digital Solutions LLC',
    contactEmail: 'claude@ampolic.com',
    /* TODO: set real effective/review dates before launch. */
    effectiveDate: '2026-08-05',
    lastReviewed: '2026-08-05',
    formProcessor: { name: 'Resend', privacyUrl: 'https://resend.com/legal/privacy-policy' },
    analyticsProvider: null,
    analyticsSnippet: null,
    jurisdictionNote: 'the State of Ohio, United States',
  },
  credit: { enabled: false, name: 'Ampolic Digital Solutions', url: 'https://ampolic.com' },
};

export default site;
