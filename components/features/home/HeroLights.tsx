'use client';

export default function HeroLights() {
  return (
    <>
      <ambientLight intensity={0.55} />
      {/* Primary Top-Right Studio Key Light (Creates signature facet glare highlights) */}
      <directionalLight position={[8, 10, 6]} intensity={7.5} color="#ffffff" castShadow />
      {/* Subtle Rim Light */}
      <directionalLight position={[-8, -5, -4]} intensity={2.5} color="#3f3f46" />
      {/* Top Backlight */}
      <directionalLight position={[0, 6, -6]} intensity={3.5} color="#ffffff" />
      {/* Specular Edge Highlights */}
      <pointLight position={[3, 4, 4]} intensity={3.5} color="#ffffff" />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color="#94a3b8" />
    </>
  );
}
