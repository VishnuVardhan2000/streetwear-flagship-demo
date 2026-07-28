'use client';

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#000000]">
      {/* Pure Black Base */}
      <div className="absolute inset-0 bg-[#000000]" />

      {/* Subtle Glossy Ambient Stage Glow */}
      <div className="absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.025] blur-[160px]" />

      {/* Polished Surface Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.9)_100%)]" />

      {/* Subtle Glossy Floor Depth Shadow */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#000000] via-[#000000]/80 to-transparent" />
    </div>
  );
}
