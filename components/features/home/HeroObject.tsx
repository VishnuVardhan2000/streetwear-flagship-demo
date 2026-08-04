'use client';

import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

export default function HeroObject() {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const ringOneRef = useRef<THREE.Mesh>(null);
  const ringTwoRef = useRef<THREE.Mesh>(null);
  const ringThreeRef = useRef<THREE.Mesh>(null);

  const { viewport } = useThree();
  const touchDelta = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);
  const previousTouch = useRef({ x: 0, y: 0 });

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
    if (groupRef.current) {
      // Mouse pointer parallax + Mobile touch drag rotation inertia
      const mouseTargetX = (state.pointer.x * Math.PI) / 7;
      const mouseTargetY = (state.pointer.y * Math.PI) / 7;

      const targetX = mouseTargetX + touchDelta.current.x;
      const targetY = mouseTargetY + touchDelta.current.y;

      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.035;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.035;

      // Smooth inertia decay on touch release
      if (!isDragging.current) {
        touchDelta.current.x *= 0.94;
        touchDelta.current.y *= 0.94;
      }
    }

    // Continuous smooth luxury idle rotation
    if (coreRef.current) {
      coreRef.current.rotation.y += 0.0015;
      coreRef.current.rotation.x += 0.0008;
    }
    if (innerCoreRef.current) {
      innerCoreRef.current.rotation.y -= 0.0022;
      innerCoreRef.current.rotation.z += 0.0011;
    }
    if (ringOneRef.current) {
      ringOneRef.current.rotation.x += 0.0022;
      ringOneRef.current.rotation.z -= 0.0014;
    }
    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.y -= 0.0018;
      ringTwoRef.current.rotation.x += 0.0015;
    }
    if (ringThreeRef.current) {
      ringThreeRef.current.rotation.z += 0.002;
      ringThreeRef.current.rotation.y += 0.001;
    }
  });

  // Dedicated Mobile vs Desktop responsive 3D composition positioning
  const isMobile = viewport.width < 5.5;
  const objectScale = isMobile ? 1.45 : 1.95;
  const objectPosition: [number, number, number] = isMobile ? [0, -0.1, 0] : [1.1, 0, 0];

  return (
    <group ref={groupRef} position={objectPosition}>
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.25}>
        {/* Outer Faceted Obsidian Glass Jewel Core */}
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

        {/* Inner High-Gloss Platinum Prism Core */}
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

        {/* Floor Shadow Plane */}
        <mesh position={[0, -2.6, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[16, 16]} />
          <shadowMaterial opacity={0.4} />
        </mesh>
      </Float>
    </group>
  );
}
