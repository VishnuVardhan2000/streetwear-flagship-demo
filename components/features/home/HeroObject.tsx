'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// Data definitions for 12 Ambient Floating Orbs & Glass Micro-Particles
interface OrbConfig {
  id: string;
  type: 'large' | 'medium' | 'particle';
  basePos: [number, number, number];
  scale: number;
  parallaxFactor: number;
  rotationSpeed: number;
  color: string;
  roughness: number;
  metalness: number;
  transmission?: number;
  opacity?: number;
}

const AMBIENT_ORBS: OrbConfig[] = [
  // 2 Large Blurred Glass Orbs (Deep Background - Slow Parallax)
  {
    id: 'large-1',
    type: 'large',
    basePos: [-3.8, 2.2, -3.2],
    scale: 1.4,
    parallaxFactor: 0.12,
    rotationSpeed: 0.0006,
    color: '#18181b',
    roughness: 0.1,
    metalness: 0.8,
    transmission: 0.6,
  },
  {
    id: 'large-2',
    type: 'large',
    basePos: [3.4, -2.6, -3.5],
    scale: 1.75,
    parallaxFactor: 0.1,
    rotationSpeed: 0.0005,
    color: '#09090b',
    roughness: 0.12,
    metalness: 0.85,
    transmission: 0.55,
  },

  // 3 Medium Chrome / Distorted Glass Spheres (Midground - Moderate Parallax)
  {
    id: 'medium-1',
    type: 'medium',
    basePos: [-2.4, -1.9, -1.5],
    scale: 0.55,
    parallaxFactor: 0.35,
    rotationSpeed: 0.0018,
    color: '#d4d4d8',
    roughness: 0.04,
    metalness: 0.98,
  },
  {
    id: 'medium-2',
    type: 'medium',
    basePos: [3.2, 2.4, -1.8],
    scale: 0.65,
    parallaxFactor: 0.38,
    rotationSpeed: 0.0014,
    color: '#27272a',
    roughness: 0.06,
    metalness: 0.92,
    transmission: 0.2,
  },
  {
    id: 'medium-3',
    type: 'medium',
    basePos: [-1.4, 3.1, -2.0],
    scale: 0.45,
    parallaxFactor: 0.42,
    rotationSpeed: 0.002,
    color: '#e4e4e7',
    roughness: 0.03,
    metalness: 0.99,
  },

  // 7 Floating Glass Micro-Particles (Foreground - Fast Parallax)
  {
    id: 'part-1',
    type: 'particle',
    basePos: [-2.8, 0.8, 0.5],
    scale: 0.12,
    parallaxFactor: 0.85,
    rotationSpeed: 0.004,
    color: '#ffffff',
    roughness: 0.02,
    metalness: 0.99,
  },
  {
    id: 'part-2',
    type: 'particle',
    basePos: [-1.8, -2.2, 0.8],
    scale: 0.09,
    parallaxFactor: 0.92,
    rotationSpeed: 0.005,
    color: '#e4e4e7',
    roughness: 0.03,
    metalness: 0.95,
  },
  {
    id: 'part-3',
    type: 'particle',
    basePos: [2.1, 1.2, 0.6],
    scale: 0.14,
    parallaxFactor: 0.88,
    rotationSpeed: 0.0035,
    color: '#ffffff',
    roughness: 0.02,
    metalness: 0.99,
  },
  {
    id: 'part-4',
    type: 'particle',
    basePos: [3.5, -1.1, 0.3],
    scale: 0.11,
    parallaxFactor: 0.95,
    rotationSpeed: 0.0045,
    color: '#a1a1aa',
    roughness: 0.05,
    metalness: 0.9,
  },
  {
    id: 'part-5',
    type: 'particle',
    basePos: [0.8, 2.5, 0.4],
    scale: 0.08,
    parallaxFactor: 1.05,
    rotationSpeed: 0.006,
    color: '#ffffff',
    roughness: 0.02,
    metalness: 0.99,
  },
  {
    id: 'part-6',
    type: 'particle',
    basePos: [-0.6, -2.8, 0.7],
    scale: 0.13,
    parallaxFactor: 1.12,
    rotationSpeed: 0.0038,
    color: '#d4d4d8',
    roughness: 0.03,
    metalness: 0.96,
  },
  {
    id: 'part-7',
    type: 'particle',
    basePos: [2.8, -2.9, 0.9],
    scale: 0.1,
    parallaxFactor: 1.0,
    rotationSpeed: 0.0048,
    color: '#ffffff',
    roughness: 0.02,
    metalness: 0.99,
  },
];

export default function HeroObject() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const ringOneRef = useRef<THREE.Mesh>(null);
  const ringTwoRef = useRef<THREE.Mesh>(null);
  const ringThreeRef = useRef<THREE.Mesh>(null);

  const orbRefs = useRef<(THREE.Mesh | null)[]>([]);
  const scrollYRef = useRef(0);

  const { viewport } = useThree();
  const touchDelta = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousTouch = useRef({ x: 0, y: 0 });

  // Scroll listener for multi-depth parallax
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Touch drag gesture handler for mobile 3D interaction
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches[0]) {
        isDragging.current = true;
        previousTouch.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !e.touches[0]) return;
      const deltaX = (e.touches[0].clientX - previousTouch.current.x) * 0.005;
      const deltaY = (e.touches[0].clientY - previousTouch.current.y) * 0.005;

      touchDelta.current.x += deltaX;
      touchDelta.current.y += deltaY;

      previousTouch.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useFrame((state) => {
    const scrollY = scrollYRef.current;

    // Main Sculpture Rotation & Parallax (Moves the least: 0.05x factor)
    if (groupRef.current) {
      const mouseTargetX = (state.pointer.x * Math.PI) / 8;
      const mouseTargetY = (state.pointer.y * Math.PI) / 8;

      const targetX = mouseTargetX + touchDelta.current.x;
      const targetY = mouseTargetY + touchDelta.current.y;

      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.03;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.03;

      // Subtle main sculpture scroll parallax
      groupRef.current.position.y = (isMobile ? -0.1 : 0) - scrollY * 0.0006;

      if (!isDragging.current) {
        touchDelta.current.x *= 0.94;
        touchDelta.current.y *= 0.94;
      }
    }

    // Idle Rotations for Sculpture Core & Rings
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.0012;
      coreRef.current.rotation.x += 0.0006;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= 0.0018;
      innerCoreRef.current.rotation.z += 0.0009;
    }
    if (ringOneRef.current) {
      ringOneRef.current.rotation.x += 0.0018;
      ringOneRef.current.rotation.z -= 0.001;
    }
    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.y -= 0.0014;
      ringTwoRef.current.rotation.x += 0.0012;
    }
    if (ringThreeRef.current) {
      ringThreeRef.current.rotation.z += 0.0015;
    }

    // Animate 12 Ambient Orbs with Independent Multi-Depth Scroll Parallax
    AMBINET_ORBS_LOOP: AMBIENT_ORBS.forEach((orb, idx) => {
      const mesh = orbRefs.current[idx];
      if (!mesh) return;

      // Rotate each orb at its unique speed
      mesh.rotation.x += orb.rotationSpeed;
      mesh.rotation.y += orb.rotationSpeed * 1.5;

      // Multi-depth scroll offset calculation
      const parallaxOffsetY = scrollY * 0.003 * orb.parallaxFactor;
      mesh.position.y = orb.basePos[1] + parallaxOffsetY;
    });
  });

  // TASK 1: Rebuilt Hero Composition (~35% reduction in size, positioned rightward)
  const isMobile = viewport.width < 5.5;
  const objectScale = isMobile ? 0.95 : 1.25; // ~35% scale reduction
  const objectPosition: [number, number, number] = isMobile ? [0, -0.1, 0] : [1.65, 0, 0]; // Positioned rightward

  return (
    <>
      {/* 12 Ambient Floating Orbs & Micro-Particles (Background Layer) */}
      {AMBIENT_ORBS.map((orb, idx) => (
        <Float
          key={orb.id}
          speed={orb.type === 'particle' ? 2.0 : orb.type === 'medium' ? 1.4 : 0.8}
          rotationIntensity={0.2}
          floatIntensity={0.4}
        >
          <mesh
            ref={(el) => {
              orbRefs.current[idx] = el;
            }}
            position={orb.basePos}
            scale={orb.scale}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial
              color={orb.color}
              metalness={orb.metalness}
              roughness={orb.roughness}
              transmission={orb.transmission || 0}
              thickness={0.5}
              clearcoat={1.0}
              reflectivity={1.0}
              transparent
              opacity={orb.type === 'large' ? 0.45 : orb.type === 'medium' ? 0.75 : 0.9}
            />
          </mesh>
        </Float>
      ))}

      {/* Main Refined Hero Sculpture (Supporting Content - Right Side Positioned) */}
      <group ref={groupRef} position={objectPosition}>
        <Float speed={1.0} rotationIntensity={0.1} floatIntensity={0.2}>
          {/* Faceted Obsidian Core (~35% Reduced Scale) */}
          <mesh ref={coreRef} castShadow receiveShadow scale={objectScale}>
            <icosahedronGeometry args={[1.25, 1]} />
            <meshPhysicalMaterial
              color="#08080a"
              metalness={0.96}
              roughness={0.03}
              clearcoat={1.0}
              clearcoatRoughness={0.02}
              reflectivity={1.0}
              iridescence={0.45}
              iridescenceIOR={1.6}
              sheen={1.0}
              sheenRoughness={0.05}
              sheenColor="#ffffff"
              transmission={0.1}
              thickness={0.6}
            />
          </mesh>

          {/* Inner Platinum Prism Core */}
          <mesh ref={innerCoreRef} scale={objectScale * 0.55}>
            <octahedronGeometry args={[1.1, 0]} />
            <meshPhysicalMaterial
              color="#18181b"
              metalness={0.99}
              roughness={0.02}
              clearcoat={1.0}
              reflectivity={1.0}
            />
          </mesh>

          {/* Inner Orbital Chrome Ring */}
          <mesh ref={ringOneRef} rotation={[Math.PI / 4, Math.PI / 6, 0]} scale={objectScale * 0.52}>
            <torusGeometry args={[2.4, 0.035, 32, 120]} />
            <meshStandardMaterial color="#e4e4e7" metalness={0.99} roughness={0.03} />
          </mesh>

          {/* Middle Orbital Chrome Ring */}
          <mesh
            ref={ringTwoRef}
            rotation={[-Math.PI / 3, -Math.PI / 8, Math.PI / 4]}
            scale={objectScale * 0.52}
          >
            <torusGeometry args={[2.75, 0.028, 32, 120]} />
            <meshStandardMaterial color="#ffffff" metalness={0.99} roughness={0.04} />
          </mesh>

          {/* Outer Thin Halo Ring */}
          <mesh
            ref={ringThreeRef}
            rotation={[Math.PI / 6, -Math.PI / 3, -Math.PI / 6]}
            scale={objectScale * 0.52}
          >
            <torusGeometry args={[3.1, 0.02, 32, 120]} />
            <meshStandardMaterial color="#a1a1aa" metalness={0.98} roughness={0.05} />
          </mesh>

          {/* Subtle Floor Shadow */}
          <mesh position={[0, -2.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeGeometry args={[12, 12]} />
            <shadowMaterial opacity={0.35} />
          </mesh>
        </Float>
      </group>
    </>
  );
}
