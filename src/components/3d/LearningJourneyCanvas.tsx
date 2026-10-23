"use client";

import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { isWebGLAvailable } from "@/lib/utils";
import { FallbackVisual } from "./FallbackVisual";
import { Sparkles, Eye, ShieldAlert } from "lucide-react";

// Dynamically import Canvas from @react-three/fiber with ssr: false
const Canvas = dynamic(
  () => import("@react-three/fiber").then((mod) => mod.Canvas),
  { ssr: false }
);

const FloatingArtifactsScene = dynamic(
  () => import("./FloatingArtifacts").then((mod) => mod.FloatingArtifactsScene),
  { ssr: false }
);

export function LearningJourneyCanvas() {
  const [mounted, setMounted] = useState(false);
  const [canRender3D, setCanRender3D] = useState(false);
  const [has3DError, setHas3DError] = useState(false);
  const [viewMode, setViewMode] = useState<"3d" | "cards">("3d");

  useEffect(() => {
    setMounted(true);
    // Check WebGL and reduced motion
    const webglSupported = isWebGLAvailable();
    const prefersReducedMotion =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (webglSupported && !prefersReducedMotion) {
      setCanRender3D(true);
      setViewMode("3d");
    } else {
      setCanRender3D(false);
      setViewMode("cards");
    }
  }, []);

  if (!mounted) {
    return <FallbackVisual />;
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* 3D Scene Controls & Mode Indicator */}
      <div className="flex items-center justify-between w-full max-w-6xl mb-4 px-2">
        <div className="flex items-center gap-2 text-xs font-mono text-gold-400">
          <Sparkles className="w-4 h-4 text-gold-400 animate-spin-slow" />
          <span>Interactive Scholarly Artifacts</span>
        </div>

        {canRender3D && (
          <div className="flex items-center gap-2 bg-navy-850/80 p-1 rounded-md border border-gold-500/20 text-xs">
            <button
              onClick={() => setViewMode("3d")}
              className={`px-3 py-1 rounded transition-colors ${
                viewMode === "3d"
                  ? "bg-gold-500 text-navy-950 font-semibold"
                  : "text-ivory/70 hover:text-ivory"
              }`}
            >
              Real-time 3D
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1 rounded transition-colors ${
                viewMode === "cards"
                  ? "bg-gold-500 text-navy-950 font-semibold"
                  : "text-ivory/70 hover:text-ivory"
              }`}
            >
              Detailed Overview
            </button>
          </div>
        )}
      </div>

      {/* Render 3D Canvas or Graceful Fallback */}
      {viewMode === "3d" && canRender3D && !has3DError ? (
        <div className="relative w-full max-w-6xl h-[420px] sm:h-[480px] lg:h-[520px] rounded-2xl bg-gradient-to-b from-navy-900/90 via-navy-950/90 to-navy-900/90 border border-gold-500/25 overflow-hidden shadow-2xl">
          {/* Subtle Canvas Border Glow */}
          <div className="absolute inset-0 pointer-events-none border border-gold-400/20 rounded-2xl z-10" />

          <Suspense fallback={<FallbackVisual />}>
            <Canvas
              camera={{ position: [0, 0, 6.2], fov: 45 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
              onError={(e) => {
                console.warn("[WebGL Canvas Render Warning]", e);
                setHas3DError(true);
              }}
            >
              <FloatingArtifactsScene />
            </Canvas>
          </Suspense>

          {/* Interactive Legend Overlay */}
          <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 flex flex-wrap items-center justify-between gap-3 text-xs text-ivory/70 bg-navy-950/70 backdrop-blur-md px-4 py-2.5 rounded-lg border border-gold-500/20 z-10">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5 text-gold-300">
                <span className="w-2 h-2 rounded-full bg-gold-400" />
                <span>The Humanities Book</span>
              </span>
              <span className="flex items-center gap-1.5 text-gold-300">
                <span className="w-2 h-2 rounded-full bg-navy-400" />
                <span>The Global Armillary Sphere</span>
              </span>
              <span className="flex items-center gap-1.5 text-gold-300">
                <span className="w-2 h-2 rounded-full bg-sky-300" />
                <span>The Scientific Orbital Model</span>
              </span>
            </div>
            <span className="text-[11px] font-mono text-ivory/50">
              Interactive Real-time Rendering
            </span>
          </div>
        </div>
      ) : (
        <FallbackVisual />
      )}
    </div>
  );
}
