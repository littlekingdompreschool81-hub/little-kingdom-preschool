import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CampusHero } from "@/components/campus/CampusHero";
import { ScrollStorytellingJourney } from "@/components/journey/ScrollStorytellingJourney";
import { AcademicsSection } from "@/components/discovery/AcademicsSection";
import { ActivitiesSection } from "@/components/discovery/ActivitiesSection";
import { FacilitiesSection } from "@/components/discovery/FacilitiesSection";
import { AchievementsSection } from "@/components/discovery/AchievementsSection";
import { PhotoGallerySection } from "@/components/discovery/PhotoGallerySection";
import { AdmissionsSection } from "@/components/admissions/AdmissionsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-ivory-100 text-brand-text">
      {/* 1. Accessible Preschool Navigation with Official Logo */}
      <Navbar />

      {/* 2. Hero: Full-Screen Cinematic Storybook Kingdom with Parallax Depth */}
      <CampusHero />

      {/* 3. Dedicated Pinned Scroll-Driven 3D Storytelling Journey */}
      <ScrollStorytellingJourney />

      {/* 4. Three Learning Worlds: Nursery, Junior KG, Senior KG */}
      <AcademicsSection />

      {/* 5. Growing Through Play: 6 Early Childhood Learning Pillars */}
      <ActivitiesSection />

      {/* 6. Safe, Inspiring Learning Spaces */}
      <FacilitiesSection />

      {/* 7. A Message from Our Principal (Mrs. Neeta Suresh Jadhav) */}
      <AchievementsSection />

      {/* 8. Glimpses of Little Kingdom (Polaroid-Style Photo Showcase) */}
      <PhotoGallerySection />

      {/* 9. Admissions & Validated Enquiry Form (Saved in Database) */}
      <AdmissionsSection />

      {/* 10. Contact Information & Google Maps Integration */}
      <ContactSection />

      {/* 11. Storybook Footer */}
      <Footer />
    </main>
  );
}
