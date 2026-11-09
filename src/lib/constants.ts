export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Learning", href: "#learning" },
  { label: "Features", href: "#features" },
  { label: "Gallery", href: "#gallery" },
  { label: "Branches", href: "#branches", badge: "2 Locations" },
  { label: "Admissions", href: "#admissions", badge: "Open" },
  { label: "Contact", href: "#contact" },
];

export interface SchoolBranch {
  id: string;
  name: string;
  shortName: string;
  branchNumber: "01" | "02";
  badge: string;
  tagline: string;
  address: string;
  cityState: string;
  landmark: string;
  phone: string;
  email: string;
  officeHours: string;
  googleMapsQuery: string;
  googleMapsEmbedUrl?: string;
  themeColor: "sky" | "mint";
  highlights: string[];
}

export const SCHOOL_BRANCHES: SchoolBranch[] = [
  {
    id: "branch-1",
    name: "Little Kingdom Preschool — Branch 1",
    shortName: "Branch 1",
    branchNumber: "01",
    badge: "Branch 01",
    tagline: "Primary Learning & Discovery Campus",
    address: "[Branch 1 Campus Address Placeholder, to be verified by school management]",
    cityState: "[City & State Placeholder]",
    landmark: "Central neighborhood access & safe pedestrian entrance",
    phone: "[Branch 1 Contact Number Placeholder]",
    email: "[branch1@littlekingdom.example.com]",
    officeHours: "Monday to Friday: 8:30 AM – 1:30 PM (Saturday by appointment)",
    googleMapsQuery: "Little Kingdom Preschool Branch 1",
    themeColor: "sky",
    highlights: ["Sensory Play Studios", "Creative Arts Corner", "Child-Safe Discovery Lawn"],
  },
  {
    id: "branch-2",
    name: "Little Kingdom Preschool — Branch 2",
    shortName: "Branch 2",
    branchNumber: "02",
    badge: "Branch 02",
    tagline: "Spacious Activity & Storybook Campus",
    address: "[Branch 2 Campus Address Placeholder, to be verified by school management]",
    cityState: "[City & State Placeholder]",
    landmark: "Convenient transit access with dedicated drop-off bay",
    phone: "[Branch 2 Contact Number Placeholder]",
    email: "[branch2@littlekingdom.example.com]",
    officeHours: "Monday to Friday: 8:30 AM – 1:30 PM (Saturday by appointment)",
    googleMapsQuery: "Little Kingdom Preschool Branch 2",
    themeColor: "mint",
    highlights: ["Story & Reading Nook", "Indoor Motor Activity Hall", "Outdoor Nature Garden"],
  },
];

export const SCHOOL_INFO = {
  name: "Little Kingdom Preschool",
  motto: "Little Mind Big Dreams",
  principal: "Mrs. Neeta Suresh Jadhav",
  principalTitle: "Principal, Little Kingdom Preschool",
  principalMessagePlaceholder: "Principal's message to be added after approval.",
  type: "Preschool / Kindergarten",
  logoUrl: "/images/logo.png",
  logoAlt: "Little Kingdom Preschool Logo - Little Mind Big Dreams",
  branchesCount: 2,
  branches: SCHOOL_BRANCHES,
  placeholders: {
    address: "Operating across 2 convenient branches (Branch 1 & Branch 2)",
    cityState: "[City & State Placeholder]",
    phone: "[School Contact Number Placeholder]",
    email: "[School Official Email Placeholder]",
    officeHours: "Monday to Friday: 8:30 AM – 1:30 PM (Saturday by appointment)",
    admissionsSession: "Academic Session 2026–2027",
    googleMapsEmbedUrl: "", // Ready for verified client Google Maps Embed URL
  },
};

export const PRESCHOOL_LEVELS = [
  {
    id: "nursery",
    level: "Nursery",
    tagline: "Play, explore and discover.",
    description:
      "A gentle, joyful introduction to early learning where sensory activities, guided exploration, and creative play build curiosity and a love for school.",
    color: "mint",
    badge: "Level 1",
    focus: [
      "Sensory & tactile exploration",
      "Early vocabulary & expression",
      "Social interaction through play",
      "Motor skill development",
    ],
  },
  {
    id: "junior-kg",
    level: "Junior KG",
    tagline: "Build skills and confidence.",
    description:
      "Nurturing early language, numbers, and interpersonal skills through structured activities, interactive stories, and hands-on discovery.",
    color: "sky",
    badge: "Level 2",
    focus: [
      "Phonics & emergent reading",
      "Number sense & shape patterns",
      "Collaborative circle time",
      "Confidence in communication",
    ],
  },
  {
    id: "senior-kg",
    level: "Senior KG",
    tagline: "Grow, create and prepare.",
    description:
      "Developing independent thinking, foundational numeracy, expressive creativity, and readiness for primary school transitions.",
    color: "sunshine",
    badge: "Level 3",
    focus: [
      "Pre-writing & creative storytelling",
      "Foundational math & reasoning",
      "Inquiry-driven scientific wonder",
      "Primary school transition readiness",
    ],
  },
];

export const GROWING_THROUGH_PLAY_FEATURES = [
  {
    id: "play-discovery",
    title: "Play & Discovery",
    description:
      "Intentional sensory play spaces and interactive stations that spark children's natural curiosity, problem-solving, and joyful exploration.",
    iconName: "Gamepad2",
    accent: "mint",
    badge: "Sensory & Tactile",
  },
  {
    id: "art-creativity",
    title: "Art & Creativity",
    description:
      "Hands-on finger painting, sculpting with clay, collage making, and open drawing that nurture fine motor skills and imaginative self-expression.",
    iconName: "Palette",
    accent: "coral",
    badge: "Fine Motor Skills",
  },
  {
    id: "stories-rhymes",
    title: "Stories & Rhymes",
    description:
      "Enchanting illustrated storybooks, cheerful nursery rhymes, and expressive circle reading that build early phonemic awareness and a lifelong love for books.",
    iconName: "BookOpen",
    accent: "sky",
    badge: "Early Literacy",
  },
  {
    id: "puzzles-thinking",
    title: "Puzzles & Thinking",
    description:
      "Colorful wooden shape sorters, counting puzzles, patterns, and spatial matching that make foundational numeracy intuitive, tangible, and fun.",
    iconName: "Shapes",
    accent: "sunshine",
    badge: "Early Math & Logic",
  },
  {
    id: "music-movement",
    title: "Music & Movement",
    description:
      "Rhythm circles, joyful action songs, creative dance, and physical coordination games that nurture sensory harmony and lively confidence.",
    iconName: "Music",
    accent: "lavender",
    badge: "Gross Motor Fun",
  },
  {
    id: "nature-exploration",
    title: "Nature & Exploration",
    description:
      "Observing sprouting seedlings, discovering leaves and textures, and guided outdoor garden curiosity that connect young minds with the natural world.",
    iconName: "Compass",
    accent: "mint",
    badge: "Eco Curiosity",
  },
];

export interface GalleryPhoto {
  id: number;
  title: string;
  category: string;
  caption: string;
  imageUrl: string;
  isAuthentic?: boolean;
  tag?: string;
}

export const PRESCHOOL_GALLERY: GalleryPhoto[] = [
  {
    id: 1,
    title: "Janmashtami & Traditional Day Celebration",
    category: "Festivals & Celebrations",
    caption: "Joyful celebration at Little Kingdom Pre School featuring little Radha & Krishna in traditional dress with festive flower swing and decorations.",
    imageUrl: "/images/gallery/janmashtami-celebration.jpg",
    isAuthentic: true,
    tag: "Authentic Campus Photograph",
  },
  {
    id: 2,
    title: "Creative Arts, Colors & Craft Time",
    category: "Arts & Expression",
    caption: "[Placeholder: Hands-on finger painting, paper origami, and clay modeling]",
    imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1000&q=80",
    isAuthentic: false,
    tag: "Illustrative Learning Scene",
  },
  {
    id: 3,
    title: "Storytime & Circle Discussions",
    category: "Early Literacy",
    caption: "[Placeholder: Teacher reading picture storybooks in a cozy circle]",
    imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80",
    isAuthentic: false,
    tag: "Illustrative Learning Scene",
  },
  {
    id: 4,
    title: "Outdoor Play & Physical Fun",
    category: "Outdoor & Play",
    caption: "[Placeholder: Safe outdoor play, sandpit fun, and physical games]",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
    isAuthentic: false,
    tag: "Illustrative Learning Scene",
  },
  {
    id: 5,
    title: "Music, Rhymes & Movement",
    category: "Music & Movement",
    caption: "[Placeholder: Rhythm circles with tambourines, songs, and gentle dance]",
    imageUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80",
    isAuthentic: false,
    tag: "Illustrative Learning Scene",
  },
  {
    id: 6,
    title: "Classroom Play & Sensory Discovery",
    category: "Learning Spaces",
    caption: "[Placeholder: Colorful learning corners with interactive activity materials]",
    imageUrl: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=1000&q=80",
    isAuthentic: false,
    tag: "Illustrative Learning Scene",
  },
];
