import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CampusHero } from "@/components/campus/CampusHero";
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

      {/* 3. Three Learning Worlds: Play Group, Nursery, Junior KG, Senior KG */}
      <AcademicsSection />

      {/* 4. Growing Through Play: Early Childhood Learning Pillars */}
      <ActivitiesSection />

      {/* 5. Safe, Inspiring Learning Spaces */}
      <FacilitiesSection />

      {/* 6. A Message from Our Principal (Mrs. Neeta Suresh Jadhav) */}
      <AchievementsSection />

      {/* 7. Glimpses of Little Kingdom (Authentic Photos & Video Reels) */}
      <PhotoGallerySection />

      {/* 8. Admissions & Validated Enquiry Form (Saved in Database) */}
      <AdmissionsSection />

      {/* 9. Contact Information & 2 Campus Locations with Maps */}
      <ContactSection />

      {/* 10. Storybook Footer */}
      <Footer />
    </main>
  );
}
