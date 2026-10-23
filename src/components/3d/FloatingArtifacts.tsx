"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingArtifactsProps {
  activeStage?: number;
}

// 1. Procedural 3D Scholarly Tome (Book)
export function ThreeBook({ position = [-3.2, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
      groupRef.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.15;
      groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0015) * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Book Cover (Navy Blue Bound) */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.6, 2.2, 0.35]} />
        <meshStandardMaterial
          color="#0F203B"
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>
      {/* Book Inner Pages (Ivory) */}
      <mesh position={[0.04, 0, 0]}>
        <boxGeometry args={[1.5, 2.1, 0.28]} />
        <meshStandardMaterial
          color="#FDFBF7"
          roughness={0.8}
          metalness={0.05}
        />
      </mesh>
      {/* Gold Trim / Spine Accents */}
      <mesh position={[-0.78, 0, 0]}>
        <boxGeometry args={[0.08, 2.22, 0.37]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>
      {/* Gold Crest Embossing */}
      <mesh position={[0.1, 0, 0.19]}>
        <circleGeometry args={[0.3, 32]} />
        <meshStandardMaterial
          color="#ECC874"
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

// 2. Procedural 3D Terrestrial Armillary Globe
export function ThreeGlobe({ position = [0, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0012 + 1) * 0.25;
    }
    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.5;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Inner Sphere (Deep Navy / Oceans) */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.95, 32, 32]} />
        <meshStandardMaterial
          color="#0B1629"
          roughness={0.4}
          metalness={0.3}
          wireframe={false}
        />
      </mesh>
      {/* Wireframe Coordinate Grid */}
      <mesh>
        <sphereGeometry args={[0.97, 16, 16]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={0.9}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
      {/* Equator Gold Ring */}
      <mesh ref={ringRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[1.25, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#ECC874"
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>
      {/* Meridian Gold Ring */}
      <mesh ref={ringRef2} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[1.35, 0.03, 16, 64]} />
        <meshStandardMaterial
          color="#D4AF37"
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>
    </group>
  );
}

// 3. Procedural 3D Atomic / Scientific Model
export function ThreeScienceModel({ position = [3.2, 0, 0] }: { position?: [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);
  const orbit1 = useRef<THREE.Group>(null);
  const orbit2 = useRef<THREE.Group>(null);
  const orbit3 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(Date.now() * 0.0014 + 2) * 0.22;
    }
    if (orbit1.current) orbit1.current.rotation.y += delta * 1.2;
    if (orbit2.current) orbit2.current.rotation.x += delta * 1.0;
    if (orbit3.current) orbit3.current.rotation.z += delta * 1.4;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Central Nucleus (Glowing Gold) */}
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#D4AF37"
          emissive="#ECC874"
          emissiveIntensity={0.35}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Orbit 1 */}
      <group ref={orbit1} rotation={[0.4, 0.3, 0]}>
        <mesh>
          <torusGeometry args={[1.2, 0.02, 16, 64]} />
          <meshStandardMaterial color="#8EADE0" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[1.2, 0, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#FDFBF7" emissive="#D4AF37" emissiveIntensity={0.6} />
        </mesh>
      </group>

      {/* Orbit 2 */}
      <group ref={orbit2} rotation={[-0.5, 0.6, 0]}>
        <mesh>
          <torusGeometry args={[1.35, 0.02, 16, 64]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[-1.35, 0, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#ECC874" emissive="#ECC874" emissiveIntensity={0.7} />
        </mesh>
      </group>

      {/* Orbit 3 */}
      <group ref={orbit3} rotation={[0.8, -0.4, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.02, 16, 64]} />
          <meshStandardMaterial color="#C4D5F2" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0, 1.5, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={0.8} />
        </mesh>
      </group>
    </group>
  );
}

// 4. Floating Stardust Particle Field
export function StardustField({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  // Generate deterministic particles
  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, [count]);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.04;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#D4AF37"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

export function FloatingArtifactsScene() {
  return (
    <>
      <ambientLight intensity={0.55} color="#C4D5F2" />
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.4}
        color="#ECC874"
        castShadow
      />
      <pointLight position={[-6, -4, -3]} intensity={0.8} color="#214273" />
      <pointLight position={[0, 2, 4]} intensity={0.6} color="#D4AF37" />

      <StardustField count={140} />
      <ThreeBook position={[-2.8, 0, 0]} />
      <ThreeGlobe position={[0, 0, 0]} />
      <ThreeScienceModel position={[2.8, 0, 0]} />
    </>
  );
}
