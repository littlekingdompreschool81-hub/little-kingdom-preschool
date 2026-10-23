"use client";

import React, { useEffect, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { isWebGLAvailable } from "@/lib/utils";
import { FallbackVisual } from "./FallbackVisual";
import { Sparkles } from "lucide-react";

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
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <Sparkles className="w-4 h-4 text-sunshine-500 animate-spin-slow" />
          <span>Interactive Playful Artifacts</span>
        </div>

        {canRender3D && (
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs">
            <button
              onClick={() => setViewMode("3d")}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                viewMode === "3d"
                  ? "bg-white text-sky-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Interactive 3D
            </button>
            <button
              onClick={() => setViewMode("cards")}
              className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                viewMode === "cards"
                  ? "bg-white text-sky-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Overview Cards
            </button>
          </div>
        )}
      </div>

      {/* Render 3D Canvas or Graceful Fallback */}
      {viewMode === "3d" && canRender3D && !has3DError ? (
        <div className="relative w-full max-w-6xl h-[380px] sm:h-[440px] lg:h-[480px] rounded-3xl bg-gradient-to-b from-sky-50/60 via-white to-sunshine-50/50 border border-slate-200/90 overflow-hidden shadow-sm">
          <Suspense fallback={<FallbackVisual />}>
            <Canvas
              camera={{ position: [0, 0, 5.8], fov: 45 }}
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
          <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center gap-5 sm:gap-6">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span>Alphabet Toy Blocks</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-coral-400" />
                <span>Picture Storybook</span>
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <span className="w-2.5 h-2.5 rounded-full bg-mint-400" />
                <span>Wonder Globe</span>
              </span>
            </div>
            <span className="text-[11px] font-semibold text-slate-400 hidden sm:inline">
              Drag / Orbit to Explore
            </span>
          </div>
        </div>
      ) : (
        <FallbackVisual />
      )}
    </div>
  );
}
