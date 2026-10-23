import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CampusHero } from "@/components/campus/CampusHero";
import { LearningJourneySection } from "@/components/journey/LearningJourneySection";
import { AcademicsSection } from "@/components/discovery/AcademicsSection";
import { FacilitiesSection } from "@/components/discovery/FacilitiesSection";
import { ActivitiesSection } from "@/components/discovery/ActivitiesSection";
import { AchievementsSection } from "@/components/discovery/AchievementsSection";
import { PhotoGallerySection } from "@/components/discovery/PhotoGallerySection";
import { AdmissionsSection } from "@/components/admissions/AdmissionsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-navy-950 text-ivory selection:bg-gold-500 selection:text-navy-950">
      {/* Navigation */}
      <Navbar />

      {/* 1. Campus Reveal: Hero with cinematic visual and Explore Our School CTA */}
      <CampusHero />

      {/* 2. Learning Journey: Emerging 3D educational objects with graceful fallback */}
      <LearningJourneySection />

      {/* 3. School Discovery: Academics */}
      <AcademicsSection />

      {/* 3. School Discovery: Facilities */}
      <FacilitiesSection />

      {/* 3. School Discovery: Activities & Co-Curricular */}
      <ActivitiesSection />

      {/* 3. School Discovery: Achievements & Benchmarks */}
      <AchievementsSection />

      {/* 3. School Discovery: Genuine School Photographs Gallery */}
      <PhotoGallerySection />

      {/* 4. Admissions: Admissions Enquiry CTA and interactive form */}
      <AdmissionsSection />

      {/* 5. Contact & Google Maps Integration */}
      <ContactSection />

      {/* Institutional Footer */}
      <Footer />
    </main>
  );
}
