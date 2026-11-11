import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CampusHero } from "@/components/campus/CampusHero";
import { AchievementsSection } from "@/components/discovery/AchievementsSection";
import { AcademicsSection } from "@/components/discovery/AcademicsSection";
import { ActivitiesSection } from "@/components/discovery/ActivitiesSection";
import { PhotoGallerySection } from "@/components/discovery/PhotoGallerySection";
import { FacilitiesSection } from "@/components/discovery/FacilitiesSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { AdmissionsSection } from "@/components/admissions/AdmissionsSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-ivory-100 text-brand-text">
      {/* 1. Accessible Preschool Navigation with Official Logo */}
      <Navbar />

      {/* 2. Hero: Full-Screen Storybook Kingdom with Direct Action CTAs */}
      <CampusHero />

      {/* 3. Leadership & Welcome Message from Principal Mrs. Neeta Suresh Jadhav */}
      <AchievementsSection />

      {/* 4. Four Progressive Learning Levels (Play Group to Sr. KG) & Daily Routine Rhythm */}
      <AcademicsSection />

      {/* 5. Growing Through Play: Early Childhood "Learning by Doing" Pillars */}
      <ActivitiesSection />

      {/* 6. Authentic Media Showcase: Structured Event Albums & HD Video Reels */}
      <PhotoGallerySection />

      {/* 7. Safe, Inspiring Learning Spaces & Child Safety Protocols */}
      <FacilitiesSection />

      {/* 8. Our Two Campuses in Dombivli West (Ambika Nagar & Rajvaibhav NX) & Maps */}
      <ContactSection />

      {/* 9. Admissions 2026–2027 & Validated Parent Enquiry Form */}
      <AdmissionsSection />

      {/* 10. Storybook Preschool Footer with Verified Contacts */}
      <Footer />
    </main>
  );
}
