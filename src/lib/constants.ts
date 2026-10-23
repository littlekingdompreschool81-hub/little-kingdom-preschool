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
  { label: "Admissions", href: "#admissions", badge: "Open" },
  { label: "Contact", href: "#contact" },
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
  placeholders: {
    address: "[Campus Address Placeholder, to be verified by school management]",
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
    id: "play-based",
    title: "Play-based learning",
    description:
      "Intentional play environments designed to spark natural curiosity, problem-solving, and imaginative roleplay.",
    iconName: "Gamepad2",
    accent: "mint",
  },
  {
    id: "arts-crafts",
    title: "Creative arts and crafts",
    description:
      "Painting, sculpting, coloring, and crafting that nurture fine motor skills and open-ended creative expression.",
    iconName: "Palette",
    accent: "coral",
  },
  {
    id: "stories-literacy",
    title: "Stories, rhymes and early literacy",
    description:
      "Enchanting storytime, cheerful rhymes, and phonemic awareness that foster a lifelong love for books.",
    iconName: "BookOpen",
    accent: "sky",
  },
  {
    id: "numbers-discovery",
    title: "Numbers, shapes and discovery",
    description:
      "Hands-on counting games, colorful puzzles, and spatial discovery that make early math intuitive and fun.",
    iconName: "Shapes",
    accent: "sunshine",
  },
  {
    id: "social-teamwork",
    title: "Social skills and teamwork",
    description:
      "Sharing, listening, empathy, and collaborative group games that build healthy social bonds and emotional resilience.",
    iconName: "Users",
    accent: "mint",
  },
  {
    id: "movement-music",
    title: "Movement, music and outdoor play",
    description:
      "Rhythm, active outdoor exploration, music, and physical coordination to support vibrant physical wellbeing.",
    iconName: "Music",
    accent: "coral",
  },
];

export const PRESCHOOL_GALLERY = [
  {
    id: 1,
    title: "Classroom Play & Activity Corners",
    category: "Learning Spaces",
    caption: "[Placeholder: Colorful learning corners with interactive activity materials]",
    imageUrl: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    title: "Creative Arts, Colors & Craft Time",
    category: "Arts & Expression",
    caption: "[Placeholder: Hands-on finger painting, paper origami, and clay modeling]",
    imageUrl: "https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    title: "Storytime & Circle Discussions",
    category: "Early Literacy",
    caption: "[Placeholder: Teacher reading picture storybooks in a cozy circle]",
    imageUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    title: "Outdoor Play & Physical Fun",
    category: "Outdoor & Play",
    caption: "[Placeholder: Safe outdoor play, sandpit fun, and physical games]",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    title: "Music, Rhymes & Movement",
    category: "Music & Movement",
    caption: "[Placeholder: Rhythm circles with tambourines, songs, and gentle dance]",
    imageUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    title: "Sensory Blocks & Puzzle Solving",
    category: "Cognitive Play",
    caption: "[Placeholder: Building alphabet blocks and matching geometric shapes]",
    imageUrl: "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1000&q=80",
  },
];
