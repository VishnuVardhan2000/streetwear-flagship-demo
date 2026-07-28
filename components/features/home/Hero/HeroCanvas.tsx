'use client';

import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function LuxuryObsidianSculpture() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ringOneRef = useRef<THREE.Mesh>(null);
  const ringTwoRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    // Restrained, smooth mouse parallax inertia
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 6;
      const targetY = (state.pointer.y * Math.PI) / 6;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.04;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.04;
    }

    if (coreRef.current) {
      coreRef.current.rotation.y += 0.002;
      coreRef.current.rotation.x += 0.001;
    }
    if (ringOneRef.current) {
      ringOneRef.current.rotation.x += 0.003;
      ringOneRef.current.rotation.z -= 0.0015;
    }
    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.y -= 0.0025;
      ringTwoRef.current.rotation.x += 0.0015;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.35}>
        {/* Large Monolithic Gloss Obsidian Faceted Core (Occupying ~85% height) */}
        <mesh ref={coreRef} castShadow receiveShadow scale={1.85}>
          <icosahedronGeometry args={[1.35, 1]} />
          <meshPhysicalMaterial
            color="#0c0c10"
            metalness={0.96}
            roughness={0.1}
            clearcoat={1.0}
            clearcoatRoughness={0.04}
            reflectivity={1.0}
            iridescence={0.4}
            iridescenceIOR={1.4}
            sheen={1.0}
            sheenRoughness={0.1}
            sheenColor="#ffffff"
          />
        </mesh>

        {/* Inner High-Gloss Chrome Orbital Ring */}
        <mesh ref={ringOneRef} rotation={[Math.PI / 4, Math.PI / 6, 0]} scale={1.05}>
          <torusGeometry args={[2.5, 0.045, 32, 120]} />
          <meshStandardMaterial color="#e4e4e7" metalness={0.99} roughness={0.05} />
        </mesh>

        {/* Outer High-Gloss Chrome Orbital Ring */}
        <mesh ref={ringTwoRef} rotation={[-Math.PI / 3, -Math.PI / 8, Math.PI / 4]} scale={1.05}>
          <torusGeometry args={[2.85, 0.035, 32, 120]} />
          <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.06} />
        </mesh>
      </Float>

      {/* Multi-Angle Professional Studio Lighting */}
      <ambientLight intensity={0.55} />
      <directionalLight position={[8, 10, 6]} intensity={7.0} color="#ffffff" />
      <directionalLight position={[-8, -5, -4]} intensity={2.5} color="#3f3f46" />
      <directionalLight position={[0, 6, -6]} intensity={3.5} color="#ffffff" />
      <pointLight position={[3, 4, 4]} intensity={3.5} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color="#94a3b8" />
    </group>
  );
}

export default function HeroCanvas() {
  return (
    <div className="pointer-events-auto relative z-10 flex h-full min-h-[480px] w-full items-center justify-center sm:min-h-[580px] lg:min-h-[720px]">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 42, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        className="h-full w-full bg-transparent"
      >
        <LuxuryObsidianSculpture />
      </Canvas>
    </div>
  );
}
