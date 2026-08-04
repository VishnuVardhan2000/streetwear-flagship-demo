'use client';

export default function HeroLights() {
  return (
    <>
      {/* Soft Ambient Fill */}
      <ambientLight intensity={0.4} />

      {/* Primary Top-Right Studio Key Light for Crisp Metal Highlights */}
      <directionalLight position={[8, 12, 8]} intensity={9.0} color="#ffffff" castShadow />

      {/* Cool Slate Rim Light for Edge Contour Separation */}
      <directionalLight position={[-8, -6, -4]} intensity={3.5} color="#94a3b8" />

      {/* Warm Platinum Top Backlight for Sculptural Halo Glow */}
      <directionalLight position={[0, 8, -6]} intensity={4.5} color="#f4f4f5" />

      {/* Precision Specular Point Glare Lights */}
      <pointLight position={[4, 5, 5]} intensity={5.0} color="#ffffff" />
      <pointLight position={[-5, -3, 4]} intensity={2.5} color="#cbd5e1" />
      <pointLight position={[0, -4, -2]} intensity={2.0} color="#a1a1aa" />
    </>
  );
}
