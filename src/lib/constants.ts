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
  { label: "Photos & Videos", href: "#gallery", badge: "Live" },
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
  contactPerson: string;
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
    tagline: "Ambika Nagar Campus",
    address: "Subhash Chandra Bose Rd, behind S Raju Photo Studio, Ambika Nagar, Dombivli West",
    cityState: "Dombivli, Kalyan, Maharashtra 421202",
    landmark: "Behind S Raju Photo Studio",
    phone: "+91 7039015296",
    contactPerson: "Neeta Jadhav",
    email: "admissions@littlekingdompreschool.com",
    officeHours: "Monday to Friday: 8:30 AM – 1:30 PM (Saturday by appointment)",
    googleMapsQuery: "Subhash Chandra Bose Rd, behind S Raju Photo Studio, Dombivli, Ambika Nagar, Dombivli West, Dombivali, Kalyan, Maharashtra 421202",
    themeColor: "sky",
    highlights: ["Sensory Play Studios", "Creative Arts Corner", "Child-Safe Discovery Rooms"],
  },
  {
    id: "branch-2",
    name: "Little Kingdom Preschool — Branch 2",
    shortName: "Branch 2",
    branchNumber: "02",
    badge: "Branch 02",
    tagline: "Rajvaibhav NX Campus",
    address: "Bhagwan, Kathe Chawl, Rajvaibhav NX, Dombivli West",
    cityState: "Dombivli, Kalyan, Maharashtra 421202",
    landmark: "Near Rajvaibhav NX, Kathe Chawl",
    phone: "+91 7039015296",
    contactPerson: "Neeta Jadhav",
    email: "admissions@littlekingdompreschool.com",
    officeHours: "Monday to Friday: 8:30 AM – 1:30 PM (Saturday by appointment)",
    googleMapsQuery: "Bhagwan, Kathe Chawl, Rajvaibhav NX, Dombivli, Dombivli West, Dombivli, Kalyan, Maharashtra 421202",
    themeColor: "mint",
    highlights: ["Story & Reading Nook", "Indoor Motor Activity Space", "Interactive Learning Corners"],
  },
];

export const PRINCIPAL_MESSAGE = {
  title: "A Message from the Principal",
  paragraphs: [
    "Welcome to Little Kingdom Preschool, where every little step leads to a brighter future!",
    "We believe that childhood is a beautiful journey of discovery, learning, and growth. Our vision is to create a warm, safe, and stimulating environment where every child feels valued, encouraged, and inspired to explore their potential.",
    "With a perfect blend of care, creativity, and meaningful learning experiences, we strive to nurture confident, curious, and compassionate young minds.",
    "We look forward to partnering with parents in shaping a joyful and enriching foundation for every child's future.",
  ],
  signOff: "Warm Regards,",
  signOffRole: "Principal",
  signOffSchool: "Little Kingdom Preschool",
};

export const SCHOOL_INFO = {
  name: "Little Kingdom Preschool",
  motto: "Little Mind Big Dreams",
  tagline: "Learning by doing",
  principal: "Mrs. Neeta Suresh Jadhav",
  principalTitle: "Principal, Little Kingdom Preschool",
  principalPhone: "+91 7039015296",
  principalPhoneFormatted: "70390 15296",
  principalMessage: PRINCIPAL_MESSAGE,
  principalMessagePlaceholder:
    "Welcome to Little Kingdom Preschool, where every little step leads to a brighter future! We believe that childhood is a beautiful journey of discovery, learning, and growth.",
  coordinator: "Mrs. Kalpana Kadam",
  coordinatorTitle: "Admissions Coordinator",
  coordinatorPhone: "+91 9594681373",
  coordinatorPhoneFormatted: "95946 81373",
  type: "Preschool / Kindergarten",
  logoUrl: "/images/logo.png",
  logoAlt: "Little Kingdom Preschool Logo - Little Mind Big Dreams",
  branchesCount: 2,
  branches: SCHOOL_BRANCHES,
  cityState: "Dombivli West, Kalyan, Maharashtra 421202",
  phone: "+91 7039015296",
  placeholders: {
    address: "Branch 1: Subhash Chandra Bose Rd, Ambika Nagar | Branch 2: Rajvaibhav NX, Dombivli West",
    cityState: "Dombivli, Kalyan, Maharashtra 421202",
    phone: "+91 7039015296",
    email: "admissions@littlekingdompreschool.com",
    officeHours: "Monday to Friday: 8:30 AM – 1:30 PM (Saturday by appointment)",
    admissionsSession: "Academic Session 2026–2027",
    googleMapsEmbedUrl: "", // Ready for verified client Google Maps Embed URL
  },
};

export const PRESCHOOL_LEVELS = [
  {
    id: "play-group",
    level: "Play Group",
    tagline: "Sensory wonder and joyful first steps.",
    description:
      "A warm, secure beginning where toddlers explore colors, tactile materials, rhythm, and gentle interactive play in a loving atmosphere.",
    color: "coral",
    badge: "Level 0",
    focus: [
      "Sensory & motor development",
      "Gentle socialization through play",
      "Action rhymes & cheerful music",
      "Safe, caring & nurturing guidance",
    ],
  },
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
    title: "Official Admissions & Learning Programs",
    category: "Campus & Admissions",
    caption: "Official Little Kingdom Pre-School banner highlighting 'Learning by doing', Play Group, Nursery, Jr. KG, and Sr. KG programs, and verified coordinators.",
    imageUrl: "/images/gallery/school-admission-banner.jpg",
    isAuthentic: true,
    tag: "Official Campus Banner",
  },
];

export interface CampusVideo {
  id: string;
  title: string;
  category: string;
  duration: string;
  caption: string;
  thumbnailUrl: string;
  videoUrl?: string;
  tag: string;
  accent: "coral" | "sky" | "sunshine" | "mint";
}

export const PRESCHOOL_VIDEOS: CampusVideo[] = [
  {
    id: "janmashtami-celebration",
    title: "Janmashtami & Cultural Swings Celebration Reel",
    category: "Festivals & Celebrations",
    duration: "0:45 min",
    caption: "Lively celebration reel at Little Kingdom Pre School featuring little Radha & Krishna, festive marigold swings, traditional attire, and pure festival joy.",
    thumbnailUrl: "/images/gallery/janmashtami-celebration.jpg",
    videoUrl: "/videos/janmashtami-celebration.mp4",
    tag: "Festival Reel",
    accent: "sunshine",
  },
  {
    id: "learning-by-doing",
    title: "Learning by Doing: Daily Discovery & Play Group",
    category: "Classroom Activities",
    duration: "1:15 min",
    caption: "A joyful glimpse into our play-based learning, phonics fun, art & craft, and sensory exploration across Play Group and KG classrooms.",
    thumbnailUrl: "/images/gallery/school-admission-banner.jpg",
    videoUrl: "/videos/learning-by-doing.mp4",
    tag: "Campus Experience",
    accent: "sky",
  },
  {
    id: "cultural-program",
    title: "Annual Day & Cultural Dance Highlights",
    category: "Cultural Programs",
    duration: "2:00 min",
    caption: "Little performers presenting group action songs, cheerful rhythm dances, and rhymes celebrating childhood milestones.",
    thumbnailUrl: "/images/gallery/janmashtami-celebration.jpg",
    videoUrl: "/videos/cultural-program.mp4",
    tag: "Milestone Celebration",
    accent: "coral",
  },
];
