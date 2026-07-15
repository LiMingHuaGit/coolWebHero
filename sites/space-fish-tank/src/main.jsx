import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, Menu, X } from 'lucide-react';
import './index.css';

const navLinks = ['Home', 'Projects', 'Studio', 'Reach Us'];

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <main className="relative h-screen w-full overflow-hidden bg-black font-geist">
      <video
        className="absolute h-full w-full object-cover object-[70%_center]"
        src="/assets/space-fish-tank-background.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      <nav className="relative z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16">
        <div className="flex items-center gap-9">
          <a
            href="#"
            className="text-lg font-semibold tracking-tight text-white sm:text-xl"
            onClick={closeMobileMenu}
          >
            空间鱼缸
          </a>

          <div className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-white/80 transition-colors hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <a
          href="#"
          className="hidden rounded-lg bg-white px-5 py-2 text-sm font-medium text-black transition-transform hover:scale-105 md:inline-flex"
        >
          Let's Talk
        </a>

        <button
          type="button"
          className="relative z-50 flex h-10 w-10 items-center justify-center text-white transition-transform active:scale-90 md:hidden"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          <Menu
            size={24}
            className={`absolute transition-all duration-300 ${
              mobileMenuOpen
                ? 'rotate-90 scale-75 opacity-0'
                : 'rotate-0 scale-100 opacity-100'
            }`}
          />
          <X
            size={24}
            className={`absolute transition-all duration-300 ${
              mobileMenuOpen
                ? 'rotate-0 scale-100 opacity-100'
                : '-rotate-90 scale-75 opacity-0'
            }`}
          />
        </button>
      </nav>

      <div
        className={`absolute inset-x-0 top-0 z-20 overflow-hidden bg-black/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? 'h-screen opacity-100'
            : 'pointer-events-none h-0 opacity-0'
        }`}
      >
        <div className="flex h-full flex-col justify-center px-8">
          <div
            className={`flex flex-col items-start gap-6 transition-all delay-100 duration-500 ${
              mobileMenuOpen
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link}
                href="#"
                className="text-3xl font-medium text-white/90 transition-colors hover:text-white"
                onClick={closeMobileMenu}
              >
                {link}
              </a>
            ))}
            <a
              href="#"
              className="mt-6 rounded-full bg-white px-8 py-3.5 text-base font-medium text-black transition-transform hover:scale-105"
              onClick={closeMobileMenu}
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>

      <section className="relative z-10 flex h-[calc(100vh-80px)] flex-col justify-between px-6 pb-10 pt-12 sm:pb-12 sm:pt-16 md:px-12 md:pb-16 md:pt-20 lg:px-16">
        <div className="max-w-3xl">
          <p className="mb-4 text-xs text-white/90 animate-[fadeSlideUp_0.8s_ease_0.2s_both] sm:mb-6 sm:text-sm">
            Brand &amp; Visual Storytelling
          </p>
          <h1 className="text-3xl font-medium leading-[1.1] tracking-tight text-white animate-[fadeSlideUp_0.8s_ease_0.4s_both] sm:text-5xl md:text-6xl lg:text-7xl">
            Shaping visual
            <br />
            narratives,
            <br />
            one pixel at a time.
          </h1>
        </div>

        <div>
          <p className="mb-5 max-w-sm text-sm leading-relaxed text-white/60 animate-[fadeSlideUp_0.8s_ease_0.7s_both] sm:mb-6 sm:max-w-lg sm:text-base md:text-lg">
            Turning vision into reality through craft, motion, and an endless pursuit of beauty.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-105 animate-[fadeSlideUp_0.8s_ease_0.9s_both] sm:px-6 sm:py-3"
          >
            Explore Work
            <ArrowRight size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
