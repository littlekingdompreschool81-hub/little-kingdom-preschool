# Premium School Website — "A Journey Into Learning"

A production-quality, responsive web application for a premier educational institution built with Next.js (App Router), TypeScript, Tailwind CSS, React Three Fiber / Three.js, and Zod.

## Design System & Creative Direction
- **Primary Palette:** Deep Navy (`#040810` / `#070E1B` / `#0B1629`), Warm Royal Gold (`#D4AF37` / `#ECC874`), Ivory Cream (`#FDFBF7`)
- **Typography:** Classical Serif headers for prestige & rigour paired with clean geometric Sans-serif for modern clarity
- **Visual Storytelling:** "A Journey Into Learning" — flows continuously from campus reveal into floating 3D intellectual artifacts (Humanities Tome, Global Coordinates Sphere, Quantum & Molecular Model) and through holistic discovery pillars.
- **Graceful Fallback:** Automatically detects WebGL support and user reduced-motion preferences; renders high-fidelity responsive CSS/SVG visual cards when 3D is disabled or unaccelerated.

---

## Storytelling Flow & Architecture
1. **Campus Reveal (`src/components/campus/CampusHero.tsx`)**
   - Full-screen architectural hero with atmospheric lighting, accreditation badges, student-faculty ratio metrics, and primary "Explore Our School" call to action.
2. **The Learning Journey (`src/components/journey/LearningJourneySection.tsx`)**
   - Real-time Three.js scene (`src/components/3d/FloatingArtifacts.tsx`, `LearningJourneyCanvas.tsx`) showcasing procedural 3D models with mouse parallax and interactive view mode toggling.
3. **School Discovery (`src/components/discovery/`)**
   - **Academics (`AcademicsSection.tsx`):** Stage selector for Foundation Stage, Middle Years, and Senior Secondary tracks.
   - **Facilities (`FacilitiesSection.tsx`):** World library, Olympic sports complex, STEM fabrication suites, and amphitheatre.
   - **Activities (`ActivitiesSection.tsx`):** Model UN, robotics, symphony orchestra, and eco-conservation guild.
   - **Achievements (`AchievementsSection.tsx`):** Verified academic passing rate benchmarks and chancellor citation.
   - **Gallery (`PhotoGallerySection.tsx`):** Categorized school photograph chronicle with full-screen lightbox modal.
4. **Admissions & Enrolment (`src/components/admissions/AdmissionsSection.tsx`)**
   - 4-step enrolment progression and live validated application form (`EnquiryForm.tsx`) communicating with `/api/enquiry`.
5. **Contact & Geolocation (`src/components/contact/ContactSection.tsx`)**
   - Contact coordinates, admissions desk office hours, visitor parking transit instructions, and Google Maps directions link (`MapPreview.tsx`).

---

## Getting Started

### Prerequisites
- Node.js LTS (v20+ or v24+)
- pnpm (or npm / yarn)

### Starting the Local Development Server
From the project directory:
```bash
# Navigate to project
cd C:\Users\shrig\.gemini\antigravity\scratch\premium-school-website

# Start dev server (runs outside sandbox for browser connectivity)
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
pnpm run build
pnpm run start
```

---

## Operational Status & Client Verification Checklist

| Feature | Current Implementation Status | Production Action Required |
|---|---|---|
| **Campus Hero & Typography** | Implemented with production design tokens | Client to supply finalized school motto & crest vector |
| **3D Learning Journey** | Implemented (Three.js procedural models + graceful fallback) | Optional: replace procedural geometries with bespoke GLTF/GLB models if requested |
| **Admissions Enquiry Form** | Operational server-side route handler with Zod validation (`/api/enquiry`) & reference ID issuance | Supply client SMTP credentials (SendGrid / AWS SES) and CRM/Database webhook (PostgreSQL / Hubspot) |
| **Campus Geolocation & Maps** | Operational directions link and styled cartographic UI preview | Supply client Google Maps Embed API key and exact gate GPS coordinates |
| **Accreditation & School Facts** | Labeled with unambiguous client placeholders | Client administration audit to verify exact registration numbers, syllabus board, and passing rates |
