"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface KingdomSceneProps {
  scrollProgress: number; // 0 to 1
  mouseParallax?: { x: number; y: number };
}

// 1. The Stylized Little Kingdom Schoolhouse / Castle
export function LittleKingdomCastle({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const leftDoorRef = useRef<THREE.Mesh>(null);
  const rightDoorRef = useRef<THREE.Mesh>(null);
  const flag1Ref = useRef<THREE.Mesh>(null);
  const flag2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    // Flag flutter animation
    if (flag1Ref.current) {
      flag1Ref.current.rotation.y = Math.sin(Date.now() * 0.005) * 0.3;
    }
    if (flag2Ref.current) {
      flag2Ref.current.rotation.y = Math.cos(Date.now() * 0.005) * 0.3;
    }

    // Door opening animation between scroll 0.25 and 0.50
    const doorOpenProgress = THREE.MathUtils.clamp((scrollProgress - 0.25) / 0.25, 0, 1);
    if (leftDoorRef.current) {
      leftDoorRef.current.rotation.y = -doorOpenProgress * (Math.PI * 0.45);
    }
    if (rightDoorRef.current) {
      rightDoorRef.current.rotation.y = doorOpenProgress * (Math.PI * 0.45);
    }

    // Castle reacts gently to scroll
    if (groupRef.current) {
      // Scale up and push slightly as camera approaches
      const castleZ = THREE.MathUtils.lerp(0, 1.2, scrollProgress);
      groupRef.current.position.z = castleZ;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* Rolling Garden Lawn Base */}
      <mesh position={[0, -0.4, 0]} receiveShadow>
        <cylinderGeometry args={[4.8, 5.2, 0.4, 32]} />
        <meshStandardMaterial color="#4ADE80" roughness={0.6} />
      </mesh>

      {/* Main School Building Core */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 1.8, 1.8]} />
        <meshStandardMaterial color="#FFFDF8" roughness={0.4} />
      </mesh>

      {/* Main Roof (Lavender/Coral Hip Roof) */}
      <mesh position={[0, 2.05, 0]} castShadow>
        <coneGeometry args={[2.0, 0.9, 4]} />
        <meshStandardMaterial color="#C084FC" roughness={0.3} />
      </mesh>

      {/* Center Clock / Bell Tower */}
      <mesh position={[0, 2.7, 0]} castShadow>
        <boxGeometry args={[0.8, 1.0, 0.8]} />
        <meshStandardMaterial color="#FFFDF8" roughness={0.4} />
      </mesh>
      {/* Tower Pyramid Roof */}
      <mesh position={[0, 3.45, 0]} castShadow>
        <coneGeometry args={[0.65, 0.7, 4]} />
        <meshStandardMaterial color="#FBBF24" roughness={0.25} />
      </mesh>
      {/* Tower Clock Face */}
      <mesh position={[0, 2.7, 0.42]}>
        <circleGeometry args={[0.22, 24]} />
        <meshStandardMaterial color="#F59E0B" roughness={0.2} />
      </mesh>

      {/* Left Turret Cylinder */}
      <mesh position={[-1.6, 0.9, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.6, 2.2, 24]} />
        <meshStandardMaterial color="#FFFDF8" roughness={0.4} />
      </mesh>
      {/* Left Turret Cone Roof */}
      <mesh position={[-1.6, 2.45, 0]} castShadow>
        <coneGeometry args={[0.75, 1.1, 24]} />
        <meshStandardMaterial color="#38BDF8" roughness={0.3} />
      </mesh>
      {/* Left Flagpole and Flag */}
      <mesh position={[-1.6, 3.2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#D97706" />
      </mesh>
      <mesh ref={flag1Ref} position={[-1.45, 3.35, 0]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial color="#F43F5E" side={THREE.DoubleSide} />
      </mesh>

      {/* Right Turret Cylinder */}
      <mesh position={[1.6, 0.9, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.6, 2.2, 24]} />
        <meshStandardMaterial color="#FFFDF8" roughness={0.4} />
      </mesh>
      {/* Right Turret Cone Roof */}
      <mesh position={[1.6, 2.45, 0]} castShadow>
        <coneGeometry args={[0.75, 1.1, 24]} />
        <meshStandardMaterial color="#38BDF8" roughness={0.3} />
      </mesh>
      {/* Right Flagpole and Flag */}
      <mesh position={[1.6, 3.2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.6, 8]} />
        <meshStandardMaterial color="#D97706" />
      </mesh>
      <mesh ref={flag2Ref} position={[1.75, 3.35, 0]}>
        <planeGeometry args={[0.3, 0.2]} />
        <meshStandardMaterial color="#10B981" side={THREE.DoubleSide} />
      </mesh>

      {/* Welcoming Arched Entrance Frame */}
      <mesh position={[0, 0.45, 0.92]}>
        <boxGeometry args={[0.9, 1.1, 0.08]} />
        <meshStandardMaterial color="#FBBF24" roughness={0.3} />
      </mesh>
      {/* Door Interior Golden Glow */}
      <mesh position={[0, 0.45, 0.9]}>
        <planeGeometry args={[0.7, 0.95]} />
        <meshStandardMaterial color="#FEF3C7" emissive="#FDE68A" emissiveIntensity={0.8} />
      </mesh>
      {/* Left Door Panel */}
      <mesh ref={leftDoorRef} position={[-0.175, 0.45, 0.94]}>
        <boxGeometry args={[0.35, 0.9, 0.04]} />
        <meshStandardMaterial color="#0284C7" roughness={0.4} />
      </mesh>
      {/* Right Door Panel */}
      <mesh ref={rightDoorRef} position={[0.175, 0.45, 0.94]}>
        <boxGeometry args={[0.35, 0.9, 0.04]} />
        <meshStandardMaterial color="#0284C7" roughness={0.4} />
      </mesh>

      {/* Cobblestone Garden Path */}
      <mesh position={[0, -0.19, 1.8]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[0.9, 1.8]} />
        <meshStandardMaterial color="#FDE68A" roughness={0.8} />
      </mesh>

      {/* Friendly Glowing Windows */}
      <mesh position={[-0.7, 1.1, 0.92]}>
        <circleGeometry args={[0.22, 16]} />
        <meshStandardMaterial color="#FEF3C7" emissive="#FDE68A" emissiveIntensity={0.6} />
      </mesh>
      <mesh position={[0.7, 1.1, 0.92]}>
        <circleGeometry args={[0.22, 16]} />
        <meshStandardMaterial color="#FEF3C7" emissive="#FDE68A" emissiveIntensity={0.6} />
      </mesh>

      {/* Colorful Garden Flowers */}
      {[
        [-1.2, -0.15, 1.2, "#F43F5E"],
        [-1.6, -0.15, 1.5, "#FBBF24"],
        [1.2, -0.15, 1.3, "#A855F7"],
        [1.6, -0.15, 1.6, "#FB7185"],
      ].map(([x, y, z, color], i) => (
        <group key={i} position={[Number(x), Number(y), Number(z)]}>
          <mesh position={[0, 0.12, 0]}>
            <sphereGeometry args={[0.1, 12, 12]} />
            <meshStandardMaterial color={String(color)} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.04, 0]}>
            <cylinderGeometry args={[0.015, 0.015, 0.1, 8]} />
            <meshStandardMaterial color="#15803D" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// 2. Emerging 3D Educational Objects (Scroll Progress > 0.45)
export function EmergingEducationalObjects({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const blockARef = useRef<THREE.Group>(null);
  const blockBRef = useRef<THREE.Group>(null);
  const blockCRef = useRef<THREE.Group>(null);
  const bookRef = useRef<THREE.Group>(null);
  const globeRef = useRef<THREE.Group>(null);

  // Appears after door opens (progress >= 0.45)
  const emergenceFactor = THREE.MathUtils.clamp((scrollProgress - 0.45) / 0.35, 0, 1);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
    if (blockARef.current) {
      blockARef.current.rotation.x += delta * 0.6;
      blockARef.current.rotation.y += delta * 0.8;
    }
    if (blockBRef.current) {
      blockBRef.current.rotation.y += delta * 0.7;
      blockBRef.current.rotation.z += delta * 0.5;
    }
    if (blockCRef.current) {
      blockCRef.current.rotation.x += delta * 0.5;
      blockCRef.current.rotation.z += delta * 0.7;
    }
    if (bookRef.current) {
      bookRef.current.rotation.y += delta * 0.4;
      bookRef.current.position.y = 0.4 + Math.sin(Date.now() * 0.002) * 0.15;
    }
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.5;
      globeRef.current.position.y = -0.3 + Math.cos(Date.now() * 0.002) * 0.15;
    }
  });

  if (scrollProgress < 0.35) return null;

  const scale = emergenceFactor;
  const spread = THREE.MathUtils.lerp(0.5, 2.4, emergenceFactor);

  return (
    <group ref={groupRef} position={[0, 0.5, 2.0]} scale={[scale, scale, scale]}>
      {/* Alphabet Block 'A' (Sky Blue) */}
      <group ref={blockARef} position={[-spread * 1.1, 0.8, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.65, 0.65, 0.65]} />
          <meshStandardMaterial color="#38BDF8" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.34]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Alphabet Block 'B' (Sunshine Yellow) */}
      <group ref={blockBRef} position={[spread * 1.15, 0.9, -0.4]}>
        <mesh castShadow>
          <boxGeometry args={[0.65, 0.65, 0.65]} />
          <meshStandardMaterial color="#FBBF24" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.34]}>
          <sphereGeometry args={[0.15, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Alphabet Block 'C' (Mint Green) */}
      <group ref={blockCRef} position={[-spread * 0.8, -0.7, 0.3]}>
        <mesh castShadow>
          <boxGeometry args={[0.6, 0.6, 0.6]} />
          <meshStandardMaterial color="#34D399" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.31]}>
          <sphereGeometry args={[0.14, 12, 12]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Open Picture Storybook (Coral) */}
      <group ref={bookRef} position={[0, 0.4, 0.2]}>
        <mesh castShadow>
          <boxGeometry args={[0.9, 1.2, 0.16]} />
          <meshStandardMaterial color="#FB7185" roughness={0.35} />
        </mesh>
        <mesh position={[0.02, 0, 0]}>
          <boxGeometry args={[0.85, 1.15, 0.12]} />
          <meshStandardMaterial color="#FFFDF8" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.1]}>
          <circleGeometry args={[0.2, 16]} />
          <meshStandardMaterial color="#FDE68A" />
        </mesh>
      </group>

      {/* Wonder Globe with Pastel Orbit Ring */}
      <group ref={globeRef} position={[spread * 0.95, -0.5, 0.2]}>
        <mesh castShadow>
          <sphereGeometry args={[0.48, 24, 24]} />
          <meshStandardMaterial color="#7DD3FC" roughness={0.3} />
        </mesh>
        {/* Continents */}
        <mesh position={[0.1, 0.1, 0.32]}>
          <sphereGeometry args={[0.22, 12, 12]} />
          <meshStandardMaterial color="#4ADE80" roughness={0.5} />
        </mesh>
        {/* Sunshine Ring */}
        <mesh rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[0.68, 0.025, 16, 48]} />
          <meshStandardMaterial color="#FBBF24" roughness={0.2} />
        </mesh>
      </group>

      {/* Floating Golden Stars */}
      {[
        [-1.4, 1.6, -0.2],
        [1.5, 1.7, 0.1],
        [-0.3, -1.1, 0.4],
        [0.4, 1.8, -0.3],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} scale={[0.12, 0.12, 0.12]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#FBBF24"
            emissive="#FDE68A"
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  );
}

// 3. Complete 3D Storybook Scene Assembly
export function Kingdom3DScene({ scrollProgress = 0, mouseParallax = { x: 0, y: 0 } }: KingdomSceneProps) {
  const cameraTargetRef = useRef<THREE.Group>(null);

  useFrame(({ camera }) => {
    // Camera movement along a smooth curve based on scrollProgress
    // 0.0 -> Panoramic [0, 1.8, 6.5]
    // 0.5 -> Approaching entrance [0, 0.8, 4.2]
    // 1.0 -> Immersive learning chamber [0, 0.9, 3.2]
    const targetZ = THREE.MathUtils.lerp(6.5, 3.2, Math.pow(scrollProgress, 0.85));
    const targetY = THREE.MathUtils.lerp(1.8, 0.9, scrollProgress);
    const targetX = (mouseParallax.x || 0) * 0.4;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY + (mouseParallax.y || 0) * 0.3, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);

    camera.lookAt(0, 0.7, 0);
  });

  return (
    <>
      <group ref={cameraTargetRef}>
        {/* Soft Sunlight & Storybook Ambient Lighting */}
        <ambientLight intensity={1.1} color="#FFFDF7" />
        <directionalLight
          position={[6, 9, 7]}
          intensity={1.6}
          color="#FFFBEB"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-4, 3, 2]} intensity={0.7} color="#BAE6FD" />
        <pointLight position={[4, -1, 3]} intensity={0.6} color="#FED7AA" />

        {/* The Illustrated Little Kingdom Schoolhouse */}
        <LittleKingdomCastle scrollProgress={scrollProgress} />

        {/* Educational 3D Objects that Emerge as Scroll Progresses */}
        <EmergingEducationalObjects scrollProgress={scrollProgress} />
      </group>
    </>
  );
}
