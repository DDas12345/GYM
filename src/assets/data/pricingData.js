export const PRICING_TIERS = [
  {
    id: 'tier-athletic',
    name: 'The Athletic Pass',
    badge: 'Core Performance',
    monthlyPrice: 195,
    annualPrice: 165,
    description: 'Unlimited access to the training arena, Olympic platforms, and select masterclasses.',
    features: [
      'Full access to 35,000 sq ft main floor & turf arena',
      'Eleiko Olympic lifting platforms & specialty bars',
      'Unlimited group signature classes (HIIT & Boxing)',
      'Digital biometric tracking & companion app access',
      'Luxury locker rooms with Malin+Goetz amenities'
    ],
    ctaText: 'Apply for Athletic Pass',
    popular: false
  },
  {
    id: 'tier-obsidian',
    name: 'Obsidian Black',
    badge: 'Most Distinguished',
    monthlyPrice: 320,
    annualPrice: 275,
    description: 'Our premier all-access tier including contrast hydrotherapy, cryotherapy, and private recovery vaults.',
    features: [
      'Everything in The Athletic Pass tier',
      'Unlimited Contrast Hydrotherapy & Finnish Cedar Sauna',
      'Weekly Sub-Zero Cryotherapy session included',
      'Quarterly InBody 970 & 3D ForceDecks Biometric Scans',
      'Dedicated private laundry & plush towel service',
      'Complimentary Obsidian Fuel Bar adaptogenic tonic daily',
      'Priority booking window for all masterclasses'
    ],
    ctaText: 'Apply for Obsidian Black',
    popular: true
  },
  {
    id: 'tier-sovereign',
    name: 'Founding Sovereign',
    badge: 'Ultra-Exclusive (Cap of 50)',
    monthlyPrice: 580,
    annualPrice: 495,
    description: 'Bespoke high-performance residency with 1-on-1 concierge coaching and private suite privileges.',
    features: [
      'Everything in Obsidian Black tier',
      'Permanent personalized engraved wood & steel locker',
      '4 Monthly 1-on-1 Biomechanics coaching sessions',
      'Unlimited Cryotherapy & Normatec compression suites',
      'Valet parking & executive boardroom lounge access',
      'Full guest access privileges (2 VIP passes/month)',
      'Direct line to Medical Director & Sports Nutritionist'
    ],
    ctaText: 'Apply for Sovereign Membership',
    popular: false
  }
];

export const TESTIMONIALS = [
  {
    id: 't-1',
    quote: "KINETIX isn't just another gym; it's a high-performance sanctuary. The Eleiko platforms and biometric feedback completely transformed my preparation for the Boston Marathon and Olympic lifting PRs.",
    author: 'Julian Sterling',
    role: 'Venture Partner & Endurance Athlete',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    tier: 'Obsidian Black Member'
  },
  {
    id: 't-2',
    quote: "The contrast therapy plunge and cedar sauna alone are worth every penny. Going from a high-intensity session with Coach Vance directly into the 38°F plunge has eradicated my chronic inflammation.",
    author: 'Seraphina Lin',
    role: 'Tech Founder & HYROX Competitor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    tier: 'Founding Sovereign Member'
  },
  {
    id: 't-3',
    quote: "The acoustic isolation and moody lighting create an atmosphere of pure focus. No crowds, no waiting for racks, just uncompromising equipment and world-class biomechanical coaching.",
    author: 'Damian Cross',
    role: 'Architectural Director',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    tier: 'Obsidian Black Member'
  }
];
