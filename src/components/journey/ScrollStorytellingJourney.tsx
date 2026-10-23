"use client";

import React, { useRef, useState, useEffect, Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { isWebGLAvailable } from "@/lib/utils";
import { FallbackVisual } from "../3d/FallbackVisual";
import {
  Sparkles,
  ChevronDown,
  ArrowRight,
  BookOpen,
  Smile,
  Heart,
  Compass,
} from "lucide-react";

// Dynamically import Canvas from @react-three/fiber with ssr: false
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const Kingdom3DScene = dynamic(
  () => import("../3d/Kingdom3DScene").then((mod) => mod.Kingdom3DScene),
  { ssr: false }
);

export function ScrollStorytellingJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [canRender3D, setCanRender3D] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setMounted(true);
    const webglOk = isWebGLAvailable();
    const reducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    setCanRender3D(webglOk && !reducedMotion);

    // Scroll progress handler
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentProgress = -rect.top / totalScrollable;
      const clamped = Math.min(Math.max(currentProgress, 0), 1);
      setScrollProgress(clamped);
    };

    // Gentle mouse parallax
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouseParallax({ x, y });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Determine active scene based on progress
  let activeSceneIndex = 0;
  if (scrollProgress >= 0.75) activeSceneIndex = 3;
  else if (scrollProgress >= 0.45) activeSceneIndex = 2;
  else if (scrollProgress >= 0.2) activeSceneIndex = 1;

  const scenes = [
    {
      badge: "Scene 1 • Approach the Kingdom",
      tagline: "Where Little Minds Begin Big Dreams",
      title: "Step Into Our World of Wonder",
      description:
        "Under sunny skies and cheerful turrets, every morning begins with warmth, wide-eyed curiosity, and a sense of belonging.",
      icon: <Smile className="w-5 h-5 text-sky-600" />,
      accent: "sky",
    },
    {
      badge: "Scene 2 • The Doors Open",
      tagline: "A Safe, Welcoming Second Home",
      title: "The Gates of Discovery Swing Open",
      description:
        "Inside Little Kingdom Preschool, thoughtfully designed spaces invite your child to touch, build, giggle, and question.",
      icon: <Heart className="w-5 h-5 text-coral-600" />,
      accent: "coral",
    },
    {
      badge: "Scene 3 • Learning Comes Alive",
      tagline: "Play-Based Wonder in Every Corner",
      title: "Curiosity Takes Flight",
      description:
        "Vibrant alphabet blocks, colorful picture books, and hands-on toys orbit into view. Letters and numbers become lifelong friends.",
      icon: <Sparkles className="w-5 h-5 text-sunshine-600" />,
      accent: "sunshine",
    },
    {
      badge: "Scene 4 • Three Learning Worlds",
      tagline: "Three Developmental Milestones",
      title: "Nursery, Junior KG & Senior KG",
      description:
        "Our journey branches into three tailored developmental stages, guiding little steps into confident big strides.",
      icon: <Compass className="w-5 h-5 text-mint-600" />,
      accent: "mint",
    },
  ];

  const currentScene = scenes[activeSceneIndex];

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative bg-gradient-to-b from-sky-50/70 via-ivory-100 to-ivory-200"
      style={{ height: canRender3D && !hasError ? "350vh" : "auto" }}
    >
      {canRender3D && !hasError ? (
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
          {/* Edge-to-edge 3D Canvas Viewport */}
          <div className="absolute inset-0 z-0 pointer-events-auto">
            <Suspense fallback={<FallbackVisual />}>
              <Canvas
                shadows
                camera={{ position: [0, 1.8, 6.5], fov: 42 }}
                dpr={[1, 1.5]}
                gl={{
                  antialias: true,
                  alpha: true,
                  powerPreference: "high-performance",
                }}
                onError={(err) => {
                  console.warn("[WebGL Kingdom Warning]", err);
                  setHasError(true);
                }}
              >
                <Kingdom3DScene
                  scrollProgress={scrollProgress}
                  mouseParallax={mouseParallax}
                />
              </Canvas>
            </Suspense>
          </div>

          {/* Top Story Chapter Indicator Bar */}
          <div className="relative z-10 pt-6 px-4 sm:px-8 max-w-7xl mx-auto w-full flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200 shadow-xs text-xs font-bold text-slate-700 pointer-events-auto">
              <Sparkles className="w-3.5 h-3.5 text-sunshine-500 animate-pulse" />
              <span>Scroll to Travel Through the Kingdom</span>
            </div>

            {/* Scroll Progress Meter */}
            <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 shadow-xs pointer-events-auto">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    activeSceneIndex === idx
                      ? "w-6 bg-sky-500"
                      : "w-2 bg-slate-200"
                  }`}
                />
              ))}
              <span className="text-[11px] font-mono text-slate-500 ml-1">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>

          {/* Bottom Floating Story Narrative Card */}
          <div className="relative z-10 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full pointer-events-none">
            <div className="storybook-card p-6 sm:p-8 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl pointer-events-auto transition-all duration-500 transform">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
                <span className="storybook-sticker bg-sunshine-100 text-sunshine-800 border border-sunshine-200">
                  {currentScene.badge}
                </span>

                <span className="text-xs font-semibold text-slate-500 italic">
                  {currentScene.tagline}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-heading mb-2">
                {currentScene.title}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-5">
                {currentScene.description}
              </p>

              {/* Dynamic Interactive Callouts based on Phase */}
              {activeSceneIndex === 3 ? (
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href="#learning"
                      className="px-4 py-2 rounded-xl bg-mint-500 hover:bg-mint-600 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      Nursery
                    </Link>
                    <Link
                      href="#learning"
                      className="px-4 py-2 rounded-xl bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs shadow-xs transition-colors"
                    >
                      Junior KG
                    </Link>
                    <Link
                      href="#learning"
                      className="px-4 py-2 rounded-xl bg-sunshine-500 hover:bg-sunshine-600 text-slate-900 font-bold text-xs shadow-xs transition-colors"
                    >
                      Senior KG
                    </Link>
                  </div>
                  <Link
                    href="#learning"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-600 hover:text-sky-800 underline"
                  >
                    <span>View Curriculum Stages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ) : (
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                    <ChevronDown className="w-4 h-4 text-sky-500 animate-bounce" />
                    <span>Continue scrolling to journey forward</span>
                  </span>
                  <Link
                    href="#learning"
                    className="hover:text-sky-600 underline font-semibold"
                  >
                    Skip to Learning Levels
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* Graceful Fallback for non-WebGL / mobile reduced-motion */
        <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="storybook-sticker bg-sky-100 text-sky-800 border border-sky-200 mb-3">
              Interactive Storybook
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-heading mt-2">
              A Little World of Wonder
            </h2>
            <p className="text-slate-600 mt-2 text-base">
              Explore the four visual chapters of our early childhood journey.
            </p>
          </div>
          <FallbackVisual />
        </div>
      )}
    </section>
  );
}
