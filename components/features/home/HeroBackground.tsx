'use client';

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 bg-transparent">
      {/* Subtle Glossy Ambient Stage Glow */}
      <div className="absolute top-1/2 left-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.02] blur-[160px]" />

      {/* Polished Surface Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(5,5,5,0.8)_100%)]" />

      {/* Seamless Transition Fade Taper to Collection Section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050505]" />
    </div>
  );
}
