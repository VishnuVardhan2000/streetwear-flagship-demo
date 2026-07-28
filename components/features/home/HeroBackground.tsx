'use client';

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Pure Black Base */}
      <div className="absolute inset-0 bg-[#000000]" />

      {/* Primary Radial Glow Behind Sculpture */}
      <div className="absolute top-1/2 left-[60%] h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.03] blur-[160px]" />

      {/* Subtle Polished Glass Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.85)_100%)]" />

      {/* Bottom Glossy Reflection Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent" />
    </div>
  );
}
