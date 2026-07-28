'use client';

export default function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Primary Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(28,28,38,0.5)_0%,rgba(5,5,5,1)_85%)]" />

      {/* Layered Accent Glow Sphere */}
      <div className="absolute top-1/2 left-2/3 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.035] blur-[140px]" />

      {/* Subtle Bottom Ambient Gradient */}
      <div className="absolute right-0 bottom-0 left-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
