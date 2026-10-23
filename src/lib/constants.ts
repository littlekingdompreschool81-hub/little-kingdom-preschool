export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Campus", href: "#campus" },
  { label: "Journey", href: "#journey" },
  { label: "Academics", href: "#academics" },
  { label: "Facilities", href: "#facilities" },
  { label: "Activities", href: "#activities" },
  { label: "Achievements", href: "#achievements" },
  { label: "Gallery", href: "#gallery" },
  { label: "Admissions", href: "#admissions", badge: "Open" },
  { label: "Contact", href: "#contact" },
];

export const SCHOOL_PLACEHOLDERS = {
  institutionName: "[School Name Placeholder]",
  tagline: "A Journey Into Learning & Distinction",
  motto: "Tradition, Rigour & Modern Discovery",
  accreditation: "[Affiliated Board / Accreditation Authority Placeholder]",
  affiliationNumber: "[Affiliation / License ID: #XXXXXX]",
  establishedYear: "[Est. Year Placeholder]",
  campusSize: "[Campus Area: e.g. 25 Acres Placeholder]",
  studentTeacherRatio: "[10:1 Ratio Placeholder]",
  studentCapacity: "[Enrollment Capacity Placeholder]",
  address: {
    line1: "[Campus Avenue / Institutional Sector Placeholder]",
    line2: "[District / City Area Placeholder]",
    city: "[City Placeholder]",
    stateZip: "[State & Postal Code Placeholder]",
    country: "[Country Placeholder]",
  },
  contact: {
    admissionsPhone: "+[Country Code] [Admissions Office Phone Placeholder]",
    generalPhone: "+[Country Code] [Reception Phone Placeholder]",
    admissionsEmail: "admissions@[schooldomain-placeholder].edu",
    generalEmail: "office@[schooldomain-placeholder].edu",
    officeHours: "Monday – Saturday: 08:30 AM – 04:30 PM",
  },
  socials: {
    portalNotice: "Student & Parent ERP Portal will connect once institution credentials are provisioned.",
  },
};

export const ACADEMIC_STAGES = [
  {
    stage: "Foundation Stage",
    grades: "[Grades / Age Group: e.g., Pre-K to Grade 2]",
    description:
      "Nurturing curiosity, early linguistic mastery, experiential play, and emotional resilience in early learners.",
    highlights: [
      "[Play-Based Experiential Learning Framework]",
      "[Phonics & Bilingual Immersion Modules]",
      "[Kinesthetic Discovery Studios]",
    ],
  },
  {
    stage: "Middle Years",
    grades: "[Grades / Age Group: e.g., Grade 3 to Grade 8]",
    description:
      "Transitioning from foundational curiosity into disciplined inquiry, mathematical reasoning, and collaborative sciences.",
    highlights: [
      "[STEAM & Applied Robotics Workshops]",
      "[Humanities & Critical Literature Studies]",
      "[Physical Education & Inter-School Athletics]",
    ],
  },
  {
    stage: "Senior Secondary",
    grades: "[Grades / Age Group: e.g., Grade 9 to Grade 12]",
    description:
      "Rigorous pre-university preparatory tracks equipped with global curriculum pathways, career advisory, and laboratory research.",
    highlights: [
      "[Advanced Placement / International Baccalaureate Pathways]",
      "[Global University Admissions Advisory]",
      "[Independent Capstone Research Thesis]",
    ],
  },
];

export const FACILITIES = [
  {
    title: "Centennial Research & World Library",
    category: "Academic Architecture",
    description:
      "A multi-tier sanctuary of knowledge housing print volumes, peer-reviewed digital archives, and quiet carrels for scholarly contemplation.",
    status: "[Verified Facility: Specifications Pending Client Audit]",
    specs: "30,000+ Curated Volumes, Archival Periodicals, Quiet Study Pods",
  },
  {
    title: "Olympic Aquatic & Sports Complex",
    category: "Athletics & Wellbeing",
    description:
      "All-weather climate-controlled swimming center, synthetic running track, covered tennis courts, and high-performance athletic training.",
    status: "[Verified Facility: Specifications Pending Client Audit]",
    specs: "50m FINA Swimming Facility, 400m Track, Multi-Sport Arena",
  },
  {
    title: "Advanced STEM & Fabrication Labs",
    category: "Innovation & Sciences",
    description:
      "Specialized physics, biotechnology, chemistry, and rapid-prototyping robotics laboratories built to university research standards.",
    status: "[Verified Facility: Specifications Pending Client Audit]",
    specs: "Clean-room ventilation, 3D Prototyping, Computational Modeling Suites",
  },
  {
    title: "Grand Performing Arts Amphitheatre",
    category: "Culture & Expression",
    description:
      "Acoustically tuned 900-seat auditorium with professional orchestral pit, proscenium staging, and multimedia production control rooms.",
    status: "[Verified Facility: Specifications Pending Client Audit]",
    specs: "Acoustically Tuned Shell, LED Cyclorama, Orchestral Pit",
  },
];

export const ACHIEVEMENTS = [
  {
    metric: "100%",
    label: "Graduation Board Passing Rate",
    detail: "[Historical 5-year average verified by external examination board]",
  },
  {
    metric: "94.2%",
    label: "Top-Tier University Placements",
    detail: "[Admitted to Tier-1 domestic and international institutions]",
  },
  {
    metric: "1:8",
    label: "Faculty Mentorship Ratio",
    detail: "[Guaranteed personalized academic and pastoral supervision]",
  },
  {
    metric: "38+",
    label: "National Arts & Athletic Honours",
    detail: "[Competitions won across inter-school and national circuits]",
  },
];

export const ACTIVITIES = [
  {
    category: "Academic & Debate",
    title: "Model United Nations & Parliamentary Debate",
    description:
      "Fostering geopolitical diplomacy, public argumentation, resolution drafting, and cross-cultural discourse.",
  },
  {
    category: "Technology & Innovation",
    title: "Autonomous Robotics & Aerospace Club",
    description:
      "Hands-on mechanical engineering, telemetry coding, drone construction, and competitive battlebots leagues.",
  },
  {
    category: "Visual & Performing Arts",
    title: "Symphony Orchestra & Classical Ensemble",
    description:
      "String, brass, and percussion training culminating in seasonal seasonal recitals and regional symphonic festivals.",
  },
  {
    category: "Leadership & Community",
    title: "Civic Outreach & Eco-Conservation Guild",
    description:
      "Student-directed environmental remediation projects, literacy outreach, and clean-energy campus audits.",
  },
];

export const GALLERY_PHOTOS = [
  {
    id: 1,
    title: "Main Quadrangle & Heritage Colonade",
    category: "Campus Architecture",
    caption: "[Placeholder: High-resolution photograph of the central academic colonnade]",
    imageUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "Advanced Chemistry & Molecular Science Lab",
    category: "Academics",
    caption: "[Placeholder: Students conducting titration experiments in scientific laboratories]",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "Central Curated Scholarly Library",
    category: "Facilities",
    caption: "[Placeholder: Architectural view of the silent study gallery and digital terminals]",
    imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "Annual Sports Tournament & Track Day",
    category: "Athletics",
    caption: "[Placeholder: Track and field sprint heats at the school sports pavilion]",
    imageUrl: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 5,
    title: "Symphonic Recital at the Auditorium",
    category: "Arts & Culture",
    caption: "[Placeholder: Orchestral string section performing at the annual gala]",
    imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 6,
    title: "Robotics Laboratory & Prototyping",
    category: "Innovation",
    caption: "[Placeholder: Engineering students testing microcontrollers and robotic arms]",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=80",
  },
];
