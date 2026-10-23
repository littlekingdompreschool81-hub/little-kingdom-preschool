"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// 1. Playful 3D Alphabet Wooden Toy Block ('A' 'B' 'C')
export function AlphabetBlock({
  position = [-2.6, 0, 0],
  color = "#38BDF8",
  accentColor = "#FEF3C7",
}: {
  position?: [number, number, number];
  color?: string;
  accentColor?: string;
}) {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.45;
      meshRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0016) * 0.2;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Main Cube */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.35, 1.35, 1.35]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.05} />
      </mesh>
      {/* Edge Bevel Frame Accent */}
      <mesh>
        <boxGeometry args={[1.4, 1.4, 0.08]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} />
      </mesh>
      {/* Letter 'A' decorative relief sphere on face */}
      <mesh position={[0, 0, 0.7]}>
        <sphereGeometry args={[0.32, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
      </mesh>
    </group>
  );
}

// 2. Playful Illustrated Storybook
export function PlayfulStorybook({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.35;
      groupRef.current.rotation.z = Math.sin(Date.now() * 0.0012) * 0.15;
      groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0014 + 1) * 0.22;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Cheerful Coral / Sunshine Cover */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.5, 2.0, 0.28]} />
        <meshStandardMaterial color="#FB7185" roughness={0.3} metalness={0.05} />
      </mesh>
      {/* Book Pages */}
      <mesh position={[0.04, 0, 0]}>
        <boxGeometry args={[1.4, 1.9, 0.22]} />
        <meshStandardMaterial color="#FFFDF9" roughness={0.8} />
      </mesh>
      {/* Sunshine Spine */}
      <mesh position={[-0.72, 0, 0]}>
        <boxGeometry args={[0.08, 2.02, 0.3]} />
        <meshStandardMaterial color="#FBBF24" roughness={0.3} />
      </mesh>
      {/* Cheerful Sun Emblem on Cover */}
      <mesh position={[0.1, 0, 0.16]}>
        <circleGeometry args={[0.35, 32]} />
        <meshStandardMaterial color="#FDE68A" roughness={0.2} />
      </mesh>
    </group>
  );
}

// 3. Mini Friendly Wonder Globe
export function WonderGlobe({ position = [2.6, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0015 + 2) * 0.24;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Pastel Blue Sphere (Oceans) */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.85, 32, 32]} />
        <meshStandardMaterial color="#7DD3FC" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Mint Green Continents Emboss */}
      <mesh position={[0.1, 0.2, 0.6]}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshStandardMaterial color="#34D399" roughness={0.5} />
      </mesh>
      <mesh position={[-0.3, -0.2, 0.55]}>
        <sphereGeometry args={[0.28, 16, 16]} />
        <meshStandardMaterial color="#34D399" roughness={0.5} />
      </mesh>
      {/* Playful Sunshine Orbit Ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.2, 0.035, 16, 64]} />
        <meshStandardMaterial color="#FBBF24" roughness={0.2} />
      </mesh>
      {/* Little Star Satellite */}
      <mesh position={[1.2, 0, 0]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#F43F5E" emissive="#FB7185" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

// 4. Playful Pastel Floating Stars & Circles Field
export function PlayfulParticles({ count = 90 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.065} color="#FBBF24" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

export function FloatingArtifactsScene() {
  return (
    <>
      <ambientLight intensity={0.85} color="#FFFFFF" />
      <directionalLight position={[5, 8, 5]} intensity={1.2} color="#FFFBEB" castShadow />
      <pointLight position={[-4, -3, 2]} intensity={0.5} color="#BAE6FD" />
      <pointLight position={[3, 3, 3]} intensity={0.6} color="#FEF3C7" />

      <PlayfulParticles count={80} />
      <AlphabetBlock position={[-2.5, 0, 0]} color="#38BDF8" accentColor="#FEF3C7" />
      <PlayfulStorybook position={[0, 0, 0]} />
      <WonderGlobe position={[2.5, 0, 0]} />
    </>
  );
}
