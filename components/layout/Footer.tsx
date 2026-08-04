'use client';

import Image from 'next/image';

export default function Footer() {
  const navLinks = [
    { name: 'COLLECTION', href: '#collection' },
    { name: 'MANIFESTO', href: '#manifesto' },
    { name: 'STORE', href: '#store' },
  ];

  const socialLinks = [
    { name: 'INSTAGRAM', href: '#' },
    { name: 'X / TWITTER', href: '#' },
  ];

  return (
    <footer className="w-full border-t border-white/10 bg-black px-6 py-16 text-white md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col space-y-12 md:flex-row md:items-center md:justify-between md:space-y-0">
        {/* Brand, Location & Copyright */}
        <div className="flex flex-col space-y-3">
          <Image
            src="/images/branding/fliq-logo-transparent-p2.png"
            alt="FLIQ Unisex Clothing"
            width={140}
            height={45}
            className="h-8 w-auto object-contain brightness-200 contrast-125"
          />
          <p className="font-sans text-[10px] tracking-[0.2em] text-zinc-400 uppercase">
            FLAGSHIP // MADHAPUR, HYDERABAD (OPPOSITE GOWRA FOUNTAINHEAD)
          </p>
          <p className="font-sans text-[10px] tracking-[0.2em] text-zinc-500 uppercase">
            © 2026 FLIQ UNISEX CLOTHING. ALL RIGHTS RESERVED.
          </p>
        </div>

        {/* Navigation & Social Links */}
        <div className="flex flex-col space-y-6 md:flex-row md:items-center md:space-y-0 md:space-x-12">
          {/* Navigation Links */}
          <nav className="flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans text-xs tracking-[0.2em] text-zinc-400 uppercase transition-colors hover:text-white"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Divider */}
          <div className="hidden h-4 w-[1px] bg-white/10 md:block" />

          {/* Social Links */}
          <div className="flex items-center space-x-8">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="font-sans text-[10px] tracking-[0.25em] text-zinc-500 uppercase transition-colors hover:text-white"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
