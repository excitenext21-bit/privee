import { PortfolioItem, Testimonial, ProcessStep } from '../types';

export const BRAND_INFO = {
  name: "DESIGN PRIVÉÉ",
  subBrand: "BY VIKRANTT",
  fullName: "DESIGN PRIVÉÉ BY VIKRANTT",
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
    "id": "port-01",
    "title": "COASTAL MANDAP OPULENCE",
    "category": "Destination Wedding",
    "image": "/portfolio/portfolio_mandap_celebration.png",
    "location": "GOA",
    "description": "Bespoke floral mandap framed by swaying palms and a celebratory rainbow smoke display.",
    "year": "2026",
    "grayscale": false
  },
  {
    "id": "port-04",
    "title": "COUTURE FLORAL ARCH",
    "category": "Signature Ceremony",
    "image": "/portfolio/portfolio_04.jpg",
    "location": "MUMBAI",
    "description": "Cascading ombré gypsophila and delicate roses framing the sacred wedding vows.",
    "year": "2026",
    "grayscale": false
  },
  {
    "id": "port-05",
    "title": "SANCTUARY OF ART",
    "category": "Bespoke Styling",
    "image": "/portfolio/portfolio_05.jpg",
    "location": "DELHI",
    "description": "Immaculately curated floral installations bringing architectural grandeur to life.",
    "year": "2026",
    "grayscale": false
  },
  {
    "id": "port-06",
    "title": "TIMELESS GRANDEUR",
    "category": "Grand Celebration",
    "image": "/portfolio/portfolio_06.jpg",
    "location": "GOA",
    "description": "A harmonious blend of contemporary spatial flow and traditional ceremonial elegance.",
    "year": "2026",
    "grayscale": false
  },
  {
    "id": "port-07",
    "title": "CELESTIAL BLOOMS",
    "category": "Fine Art Wedding",
    "image": "/portfolio/portfolio_07.jpg",
    "location": "UDAIPUR",
    "description": "Volumetric floral arrangements and bespoke candelabras creating an enchanting atmosphere.",
    "year": "2026",
    "grayscale": false
  },
  {
    "id": "port-09",
    "title": "THE CRYSTAL BALLROOM",
    "category": "Evening Gala",
    "image": "/portfolio/portfolio_09.jpg",
    "location": "MUMBAI",
    "description": "Opulent chandeliers suspended amid draped velvet, mirroring candlelit crystal tablescapes.",
    "year": "2026",
    "grayscale": false
  },
  {
    "id": "port-10",
    "title": "SERENADE IN IVORY",
    "category": "Intimate Celebration",
    "image": "/portfolio/portfolio_10.jpg",
    "location": "GOA",
    "description": "Delicate ivory florals entwined around rustic timber arches for an unforgettable sunset vow exchange.",
    "year": "2026",
    "grayscale": false
  },
  {
    "id": "port-11",
    "title": "REGAL SYMPHONY",
    "category": "Palace Wedding",
    "image": "/portfolio/portfolio_11.jpg",
    "location": "JODHPUR",
    "description": "Traditional royal court aesthetics reimagined through modern lighting and refined floral sculptures.",
    "year": "2026",
    "grayscale": false
  },
  {
    "id": "port-12",
    "title": "MEHNDI MOSAIC",
    "category": "Vibrant Pre-Wedding",
    "image": "/portfolio/portfolio_12.jpg",
    "location": "DELHI",
    "description": "A kaleidoscope of marigolds, handcrafted artisanal tapestries, and playful color-blocked lounges.",
    "year": "2026",
    "grayscale": false
  },
  {
    "id": "port-13",
    "title": "NOCTURNE ILLUMINATION",
    "category": "Cocktail Night",
    "image": "/portfolio/portfolio_13.jpg",
    "location": "MUMBAI",
    "description": "Dramatic mood lighting accented by metallic geometric structures and exotic deep-crimson flora.",
    "year": "2026",
    "grayscale": false
  },
  {
    "id": "port-14",
    "title": "HERITAGE COURTYARD",
    "category": "Cultural Wedding",
    "image": "/portfolio/portfolio_14.jpg",
    "location": "UDAIPUR",
    "description": "Centuries-old stone architecture framed by cascading jasmine, brass urns, and lotus pools.",
    "year": "2026",
    "grayscale": false
  },
  {
    "id": "port-15",
    "title": "WHISPERS OF DUSK",
    "category": "Sunset Reception",
    "image": "/portfolio/portfolio_15.jpg",
    "location": "GOA",
    "description": "Bespoke ambient lanterns and delicate fairy-light canopies creating a dreamscape under the stars.",
    "year": "2026",
    "grayscale": false
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
    quote: "The decor and floral arrangements were breathtaking. Design Privéé turned our celebration into a timeless piece of art that we will cherish forever.",
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
    quote: "Vikrant is excellent when it comes to wedding décor, designing, and overall event execution.",
    detailedQuote: "Vikrant is excellent when it comes to wedding décor, designing, and overall event execution. He has a great eye for aesthetics and knows how to bring a vision to life with creativity and perfection. From understanding the concept to handling the décor and designing aspects, he manages everything with great dedication and professionalism."
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: "01",
    title: "Consultation & Vision",
    description: "We begin with a thoughtful, unhurried dialogue to discover your personal story, aesthetic preferences, and aspirations for the celebration."
  },
  {
    number: "02",
    title: "Concept & Curation",
    description: "Translating feeling into visual form, we develop tailored color palettes, mood textures, lighting plans, and architectural spatial flow in 3D concept."
  },
  {
    number: "03",
    title: "Design & Execution",
    description: "As every event and couple is unique, we create a custom vision board and color palette for your wedding day. Upon approval we will further hand select the remaining team of vendors needed to carry out your vision. Ultimately, we assist with determining every physical and visual aspect of your event, while ensuring it reflects your values, family dynamics, style, dreams, and desires."
  },
  {
    number: "04",
    title: "Seamless Production",
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
