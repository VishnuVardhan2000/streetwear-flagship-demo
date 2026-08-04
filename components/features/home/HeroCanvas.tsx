'use client';

import { Canvas } from '@react-three/fiber';
import HeroLights from './HeroLights';
import HeroObject from './HeroObject';

export default function HeroCanvas() {
  return (
    <div className="pointer-events-auto absolute inset-0 z-10 h-full w-full [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
      <Canvas
        camera={{ position: [0, 0, 4.0], fov: 42, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 2, 2)]}
        className="h-full w-full bg-transparent"
      >
        <HeroLights />
        <HeroObject />
      </Canvas>
    </div>
  );
}
