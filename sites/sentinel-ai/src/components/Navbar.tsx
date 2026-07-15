import { Button } from '@/components/ui/button';

const navLinks = ['Services', 'About Us', 'Projects', 'Team', 'Contacts'];

export function Navbar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-8 py-5 lg:px-16">
      <a href="#" className="text-xl font-semibold tracking-tight text-foreground">
        SENTINEL
      </a>

      <div className="hidden items-center gap-8 md:flex">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
            className="text-sm uppercase tracking-widest text-muted-foreground transition-colors hover:text-foreground"
          >
            {link}
          </a>
        ))}
      </div>

      <Button
        variant="navCta"
        size="lg"
        className="hidden rounded-lg px-6 text-xs uppercase tracking-widest md:inline-flex"
      >
        Get Quote
      </Button>
    </nav>
  );
}
