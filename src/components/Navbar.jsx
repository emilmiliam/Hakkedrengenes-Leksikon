'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/movies', label: 'Alle film' },
    { href: '/admin', label: 'Tilføj film' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border/40 bg-background/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="font-bold text-foreground tracking-tight text-lg">
          Hakkedrengene
        </Link>

        <div className="flex items-center gap-6 text-sm">
          {links.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  isActive
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>

      </div>
    </nav>
  );
}