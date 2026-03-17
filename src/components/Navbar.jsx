import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="border-b border-border bg-background sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">

        <Link href="/" className="font-bold text-foreground tracking-tight text-lg">
          Hakkedrengene
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
            Tilføj film
          </Link>
        </div>

      </div>
    </nav>
  );
}