import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './index.css';

gsap.registerPlugin(useGSAP);

const navItems = ['Device', 'Real Stories', 'Science', 'Plans', 'Reach Us'];
const spotlightRadius = 260;

function Logo() {
  return (
    <svg
      aria-label="Measured"
      className="h-7 w-7"
      fill="none"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M 256 64 L 256 128 L 192.5 128 L 160 95 L 128 64 L 96 95 L 63.5 128 L 64 128 L 128 192 L 128 256 L 64.5 256 L 32 223 L 0 192 L 0 64 L 64 0 L 192 0 Z M 256 192 L 256 256 L 192.5 256 L 160 223 L 128 192 L 128 128 L 192 128 Z"
        fill="white"
      />
    </svg>
  );
}

function Navigation({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return (
    <>
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-5 sm:px-7 md:px-8">
        <a href="#" className="block" aria-label="Measured home">
          <Logo />
        </a>

        <div className="fixed left-1/2 top-5 hidden -translate-x-1/2 md:block">
          <div className="liquid-glass flex items-center gap-1 rounded-full px-2 py-2">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white"
              >
                {item}
              </a>
            ))}
          </div>
        </div>

        <a
          href="#reserve"
          className="liquid-glass hidden items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-white md:inline-flex"
        >
          <span className="h-2 w-2 rounded-full bg-green-400" />
          Reserve Yours
        </a>

        <button
          className="liquid-glass flex rounded-full px-4 py-3 md:hidden"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <span className="flex flex-col items-end gap-1.5">
            <span className="h-[1.5px] w-5 bg-white" />
            <span className="h-[1.5px] w-3.5 bg-white" />
          </span>
        </button>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <div
      className={`fixed inset-0 z-[55] flex flex-col bg-[#0a0a0a] px-8 py-6 transition-opacity duration-300 md:hidden ${
        open ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-hidden={!open}
    >
      <button
        className={`liquid-glass ml-auto flex h-12 w-12 items-center justify-center rounded-full ${
          open ? 'animate-[closeIn_0.5s_cubic-bezier(0.77,0,0.18,1)_forwards]' : ''
        }`}
        type="button"
        aria-label="Close menu"
        onClick={onClose}
      >
        <span className="absolute h-[1.5px] w-5 rotate-45 bg-white" />
        <span className="absolute h-[1.5px] w-5 -rotate-45 bg-white" />
      </button>

      <div className="flex flex-1 flex-col items-center justify-center gap-7">
        {navItems.map((item, index) => (
          <a
            key={item}
            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
            className={`text-3xl font-medium text-white/90 sm:text-4xl ${open ? 'opacity-0' : ''}`}
            style={
              open
                ? {
                    animation: 'menuItemIn 0.7s cubic-bezier(0.77, 0, 0.18, 1) forwards',
                    animationDelay: `${100 + index * 60}ms`,
                  }
                : undefined
            }
            onClick={onClose}
          >
            {item}
          </a>
        ))}
      </div>

      <a
        href="#reserve"
        className={`liquid-glass mx-auto mb-4 inline-flex items-center gap-2 rounded-full px-6 py-4 text-sm font-medium text-white ${
          open ? 'opacity-0' : ''
        }`}
        style={
          open
            ? {
                animation: 'menuItemIn 0.7s cubic-bezier(0.77, 0, 0.18, 1) forwards',
                animationDelay: `${100 + navItems.length * 60}ms`,
              }
            : undefined
        }
        onClick={onClose}
      >
        <span className="h-2 w-2 rounded-full bg-green-400" />
        Reserve Yours
      </a>
    </div>
  );
}

function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const revealRef = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const section = sectionRef.current;
    const gridEl = gridRef.current;
    const revealEl = revealRef.current;
    if (!section || !gridEl || !revealEl) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const smooth = { x: target.x, y: target.y };
    const grid = { x: 0, y: 0 };
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const setSpotlightX = gsap.quickSetter(revealEl, '--spotlight-x', 'px');
    const setSpotlightY = gsap.quickSetter(revealEl, '--spotlight-y', 'px');
    const setGridX = gsap.quickSetter(gridEl, 'x', 'px');
    const setGridY = gsap.quickSetter(gridEl, 'y', 'px');

    const updateCenter = () => {
      const rect = section.getBoundingClientRect();
      target.x = rect.width / 2;
      target.y = rect.height * 0.62;
      smooth.x = target.x;
      smooth.y = target.y;
      setSpotlightX(smooth.x);
      setSpotlightY(smooth.y);
    };

    const updateTarget = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      target.x = event.clientX - rect.left;
      target.y = event.clientY - rect.top;
    };

    const render = () => {
      const width = section.clientWidth;
      const height = section.clientHeight;

      smooth.x += (target.x - smooth.x) * 0.1;
      smooth.y += (target.y - smooth.y) * 0.1;
      setSpotlightX(smooth.x);
      setSpotlightY(smooth.y);

      const nextGridX = ((target.x - width / 2) / width) * 16;
      const nextGridY = ((target.y - height / 2) / height) * 16;
      grid.x += (nextGridX - grid.x) * 0.06;
      grid.y += (nextGridY - grid.y) * 0.06;
      setGridX(grid.x);
      setGridY(grid.y);
    };

    updateCenter();
    section.addEventListener('pointermove', updateTarget, { passive: true });
    window.addEventListener('resize', updateCenter);
    if (!prefersReducedMotion) {
      gsap.ticker.add(render);
    }

    return () => {
      section.removeEventListener('pointermove', updateTarget);
      window.removeEventListener('resize', updateCenter);
      gsap.ticker.remove(render);
    };
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="font-helvetica-neue relative h-screen overflow-hidden bg-white">
      <div
        ref={gridRef}
        className="absolute inset-0 z-0 opacity-10"
      >
        <svg className="h-[calc(100%+96px)] w-[calc(100%+96px)] -translate-x-12 -translate-y-12">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div
        className="absolute inset-0 z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/measured-background.webp')" }}
      />

      <h1 className="absolute inset-x-0 top-20 z-20 text-center font-instrument text-[4.5rem] uppercase leading-[0.9] text-white xs:text-[5.5rem] sm:top-28 sm:text-[10rem] md:top-32 md:text-[13rem] lg:text-[16rem]">
        Measured
      </h1>

      <img
        src="/assets/measured-overlay.png"
        alt=""
        className="pointer-events-none absolute inset-0 z-[25] h-full w-full object-cover"
      />

      <div
        ref={revealRef}
        className="measured-reveal pointer-events-none absolute inset-0 z-30"
        style={{
          clipPath: 'inset(40% 0 0 0)',
        }}
      >
        <video
          className="h-full w-full object-cover"
          src="/assets/measured-front.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  useBodyLock(menuOpen);

  return (
    <main className="h-screen overflow-hidden bg-white">
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
    </main>
  );
}

const root = createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    root.unmount();
  });
}
