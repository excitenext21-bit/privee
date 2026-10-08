import { PortfolioItem, Testimonial, ProcessStep } from '../types';

export const BRAND_INFO = {
  name: "DESIGN PRIVÉE",
  subBrand: "BY VIKRANTT",
  fullName: "DESIGN PRIVÉE BY VIKRANTT",
  tagline: "A PREMIER WEDDING DESIGN & DECOR COMPANY",
  heroCategory: "A PREMIER WEDDING DESIGN & DECOR COMPANY",
  heroTitle: "Designing Artful & Impeccably Curated Weddings Reminiscent of Your Dream Event",
  websiteUrl: "www.designprivee.com",
  year: "2026"
};

export const APPROACH_CONTENT = {
  heading: "Timeless design with a contemporary\nedge and unwavering flawless execution",
  subheading: "",
  paragraph: "Every exceptional event begins with a feeling. From quiet, intimate celebrations to breathtaking weddings. We pour heart and artistry into design. Our commitment is to breathe life into your personal vision, crafting an unforgettable experience that lingers beautifully in the hearts of your guests forever.",
  ctaText: "DETAILS, PLEASE"
};

export const VIKRANTT_CONTENT = {
  greeting: "HI, I'M VIKRANTT",
  role: "Founder & Creative Director",
  dogCaption: "I'M A PROUD DOG LOVER",
  quoteAesthete: "I'm an aesthete at heart. I find inspiration in architecture, nature, travel, art, and cultures across the world. Every journey I take adds a new perspective that eventually finds its way into my designs.",
  quotePhilosophy: "My philosophy is simple: deliver exactly what is promised—and then exceed expectations.",
  quoteTrust: "Trust is the foundation of every project I take on, and ensuring that every couple feels confident, heard, and excited throughout the journey is just as important as the final design itself.",
  bioHighlight: "Vikrantt draws on years of experience in destination wedding designing & decor, creating <i>unique experiences</i> for once in a <i>lifetime memories</i>",
  modalBioTitle: "VIKRANTT",
  modalBioSubtitle: "Founder & Creative Director",
  modalBioParagraph1: "Vikrantt is artistic by nature. He creates impeccable events filled with the unexpected and attention to every sensory encounter. He selects and directs color palette, texture, lighting, organic elements, culinary cuisine and the melodic theme of the music. His events are truly magical settings where conversations and interactions are born within the elements of the ambiance for an unforgettable experience.",
  modalBioParagraph2: "Vikrantt is the creative director of each event using his experience and knowledge to source design elements that fit the vision and personalities of his clients. Much of his time is spent curating design boards and color palettes, selecting linen and stationery swatches, and showcasing mock-up tablescapes for client presentations. From an initial phone call to a wedding-day install, creating flatlays, day-of styling, Vikrantt is hands-on with all creative aspects.",
  imageVikrantt: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=900", // Refined creative director photo
  imageDog: "https://images.unsplash.com/photo-1534361960057-19889db9621e?auto=format&fit=crop&q=80&w=900" // Dog portrait matching Page 6 aesthetic
};

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "p1",
    title: "SAN YSIDRO RANCH",
    category: "Montecito",
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200",
    location: "MONTECITO",
    description: "An ethereal garden wedding surrounded by lush Montecito foothills, sheer linen draping, and golden hour florals.",
    year: "2025"
  },
  {
    id: "p2",
    title: "GLEN OAKS",
    category: "Big Sur",
    image: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=1200",
    location: "BIG SUR",
    description: "Serene fireside celebration nestled among ancient coastal redwoods with fine art botanical tablescapes.",
    year: "2025"
  },
  {
    id: "p3",
    title: "SUNSTONE VILLA",
    category: "Santa Ynez",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&q=80&w=1200",
    location: "SANTA YNEZ",
    description: "An Old-World architectural masterpiece with French limestone, vineyard views, and candlelight soirée.",
    year: "2026"
  },
  {
    id: "p4",
    title: "PRIVATE ESTATE",
    category: "Ojai",
    image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&q=80&w=1200",
    location: "OJAI",
    description: "Artful private estate celebration blending rustic California charm with refined, modern luxury details.",
    year: "2025"
  },
  {
    id: "p5",
    title: "MALIBU PRIVATE ESTATE",
    category: "Malibu",
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&q=80&w=1200",
    location: "MALIBU",
    description: "Oceanfront estate celebration with minimalist coastal decor, crystal stemware, and sunset views.",
    year: "2026"
  },
  {
    id: "p6",
    title: "LAKE COMO CONSERVATORY",
    category: "Lake Como",
    image: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&q=80&w=1200",
    location: "LAKE COMO",
    description: "Sweeping glasshouse reception with suspended greenery, velvet dining chairs, and bespoke ambient lighting.",
    year: "2025"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    clientName: "Shruti",
    roleOrRelation: "WEDDING CLIENT",
    quote: "When combined, the unique skill set Vikrantt offers brings the events he designs and plans to another level of beauty and meaningfulness that will irrefutably go down as his clients new favourite memories of all time.",
    detailedQuote: "Vikrantt is a visionary whose style is elevated, modern and fashion forward while maintaining the perfect balance of timelessness. He is organized, thorough and timely in communication and has great taste which makes his creative inputs extremely valuable. What I love most about his planning is his warmth, unshakeable calm, and attentiveness to every detail.",
    featured: true
  },
  {
    id: "t2",
    clientName: "Tasleem Arief",
    roleOrRelation: "PRIVATE CELEBRATION CLIENT",
    quote: "Working with Vikrantt was an absolute dream. His vision for our celebration decor was beyond anything we could have pictured. Every single guest was spellbound by the ambiance.",
    detailedQuote: "From our very first conversation, Vikrantt understood the precise feeling we wanted to evoke. His team anticipated every single need before we even voiced it, translating complex spatial challenges into pure poetry. His dedication to perfection and warmth made the entire journey effortless and deeply joyful."
  },
  {
    id: "t3",
    clientName: "Udesh Sir",
    roleOrRelation: "INDUSTRY EVENT PARTNER",
    quote: "Vikrantt's precision, artistic flair, and absolute professionalism stand out in the luxury wedding industry. He delivers flawless execution with calm confidence.",
    detailedQuote: "I have collaborated with top designers across the globe, and Vikrantt belongs in a tier of his own. His eye for lighting, botanical arrangements, and architectural proportions elevates every space into a museum-worthy work of art."
  },
  {
    id: "t4",
    clientName: "Jayanti Mam",
    roleOrRelation: "DESTINATION WEDDING HOST",
    quote: "The decor and floral arrangements were breathtaking. Design Privée turned our celebration into a timeless piece of art that we will cherish forever.",
    detailedQuote: "Every detail was curated with such intentionality. The candlelit tablescapes, custom linen textures, and floral installations transformed our venue into a sanctuary of beauty. Our family and friends are still talking about how magical the evening felt."
  },
  {
    id: "t5",
    clientName: "Abhijeet Bhattacharya",
    roleOrRelation: "LUXURY CELEBRATION CLIENT",
    quote: "Exquisite taste and flawless execution! Vikrantt transformed our venue into a fairytale experience that exceeded all our expectations.",
    detailedQuote: "What sets Vikrantt apart is his unwavering commitment to excellence. He took our ideas and elevated them to extraordinary heights. His team handled every logistics challenge behind the scenes, allowing us to be completely present in every moment."
  },
  {
    id: "t6",
    clientName: "Sunita Mehendi Art",
    roleOrRelation: "ARTISAN & EVENT COLLABORATOR",
    quote: "Collaborating with Vikrantt is always pure joy. His attention to detail, warm hospitality, and design harmony create seamless and effortless events.",
    detailedQuote: "As an artisan, working alongside a creative director who deeply respects craftsmanship makes all the difference. Vikrantt creates an environment where art flourishes and every vendor functions as a synchronized, harmonious ensemble."
  },
  {
    id: "t7",
    clientName: "Sunitha Choudhary",
    roleOrRelation: "@sunithasmehandiart",
    quote: "I have known Vikrant for over 10 years, and I can confidently say that he is truly exceptional at what he does.",
    detailedQuote: "I have known Vikrant for over 10 years, and I can confidently say that he is truly exceptional at what he does. I have had the opportunity to work with him on several projects, including wedding events, and his professionalism, creativity, and attention to detail have always stood out.\n\nVikrant is excellent when it comes to wedding décor, designing, and overall event execution. He has a great eye for aesthetics and knows how to bring a vision to life with creativity and perfection. From understanding the concept to handling the décor and designing aspects, he manages everything with great dedication and professionalism.\n\nHaving worked with him on multiple projects, I can genuinely say that he is outstanding at his work and someone you can completely rely on for beautiful and well-executed events.\n\nWishing Vikrant continued success and all the very best for his future. I’m sure he has many more great milestones ahead!"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "CONSULTATION & VISION",
    description: "We begin with a thoughtful, unhurried dialogue to discover your personal story, aesthetic preferences, and aspirations for the celebration."
  },
  {
    number: "02",
    title: "CONCEPT & CURATION",
    description: "Translating feeling into visual form, we develop tailored color palettes, mood textures, lighting plans, and architectural spatial flow in 3D concept."
  },
  {
    number: "03",
    title: "DESIGN & EXECUTION",
    description: "As every event and couple is unique, we create a custom vision board and color palette for your wedding day. Upon approval we will further hand select the remaining team of vendors needed to carry out your vision. Ultimately, we assist with determining every physical and visual aspect of your event, while ensuring it reflects your values, family dynamics, style, dreams, and desires."
  },
  {
    number: "04",
    title: "SEAMLESS PRODUCTION",
    description: "On-site creative directing, flatlay styling, vendor orchestration, and immaculate day-of styling ensure you experience every moment with absolute serenity."
  }
];

export const PRESS_MENTIONS = [
  "THE NEW YORK TIMES",
  "VOGUE",
  "OVER THE MOON",
  "STYLE ME PRETTY",
  "HARPER'S BAZAAR"
];
