import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const SENSITIVITY = 0.8;
const navLinks = ['Labs', 'Studio', 'Openings', 'Shop'];
const typewriterText =
  'Glad you stopped in. Good taste tends to find us. Now, what are we building?';
const email = 'hello@mainframe.co';

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);

    let index = 0;
    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));

        if (index >= text.length) {
          if (intervalId) {
            window.clearInterval(intervalId);
          }
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function CopyIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-3 w-3 shrink-0"
      fill="none"
      viewBox="0 0 12 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="1.5" y="3.5" width="6" height="6" rx="1" stroke="currentColor" />
      <rect x="4.5" y="1.5" width="6" height="6" rx="1" stroke="currentColor" />
    </svg>
  );
}

function Navbar({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return (
    <>
      <nav className="fixed left-0 top-0 z-10 flex w-full items-center justify-between px-5 py-4 text-black sm:px-8 sm:py-5">
        <a href="#" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
          <span
            className="text-[21px] tracking-tight sm:text-[26px]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Mainframe®
          </span>
          <span
            className="select-none text-[25px] sm:text-[30px]"
            style={{ letterSpacing: '-0.02em' }}
          >
            ✳︎
          </span>
        </a>

        <div className="hidden text-[23px] md:flex">
          {navLinks.map((link, index) => (
            <React.Fragment key={link}>
              <a href="#" className="transition-opacity hover:opacity-60">
                {link}
              </a>
              {index < navLinks.length - 1 ? <span>,&nbsp;</span> : null}
            </React.Fragment>
          ))}
        </div>

        <a
          href={`mailto:${email}`}
          className="hidden text-[23px] text-black underline underline-offset-2 transition-opacity hover:opacity-60 md:inline-flex"
        >
          Get in touch
        </a>

        <button
          type="button"
          className="flex flex-col gap-[5px] md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`h-[2px] w-6 bg-black transition-all duration-300 ${
              menuOpen ? 'translate-y-[7px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-black transition-opacity duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`h-[2px] w-6 bg-black transition-all duration-300 ${
              menuOpen ? '-translate-y-[7px] -rotate-45' : ''
            }`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[9] flex flex-col items-start justify-center gap-8 bg-white/95 px-8 text-black backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link}
            href="#"
            className="text-[32px] font-medium transition-opacity hover:opacity-60"
            onClick={() => setMenuOpen(false)}
          >
            {link}
          </a>
        ))}
        <a
          href={`mailto:${email}`}
          className="text-[32px] font-medium underline underline-offset-2 transition-opacity hover:opacity-60"
          onClick={() => setMenuOpen(false)}
        >
          Get in touch
        </a>
      </div>
    </>
  );
}

function ScrubVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef(0);
  const seekingRef = useRef(false);

  const performSeek = () => {
    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
      return;
    }

    seekingRef.current = true;
    video.currentTime = clamp(targetTimeRef.current, 0, video.duration);
  };

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const video = videoRef.current;

      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
        prevXRef.current = event.clientX;
        return;
      }

      if (prevXRef.current === null) {
        prevXRef.current = event.clientX;
        targetTimeRef.current = video.currentTime;
        return;
      }

      const delta = event.clientX - prevXRef.current;
      prevXRef.current = event.clientX;

      const offset = (delta / window.innerWidth) * SENSITIVITY * video.duration;
      targetTimeRef.current = clamp(targetTimeRef.current + offset, 0, video.duration);

      if (!seekingRef.current) {
        performSeek();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      targetTimeRef.current = video.currentTime;
    }
  };

  const handleSeeked = () => {
    const video = videoRef.current;

    if (!video) {
      seekingRef.current = false;
      return;
    }

    if (Math.abs(video.currentTime - targetTimeRef.current) > 0.02) {
      performSeek();
      return;
    }

    seekingRef.current = false;
  };

  return (
    <video
      ref={videoRef}
      className="fixed inset-0 z-0 h-full w-full object-cover object-[70%_center]"
      src="/assets/mainframe-background.mp4"
      muted
      playsInline
      preload="auto"
      onLoadedMetadata={handleLoadedMetadata}
      onSeeked={handleSeeked}
      aria-hidden="true"
    />
  );
}

function Hero() {
  const { displayed, done } = useTypewriter(typewriterText);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => setButtonsVisible(true), 400);
    return () => window.clearTimeout(timeoutId);
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(email);
  };

  const pillClasses =
    'inline-flex items-center justify-center whitespace-nowrap rounded-full px-4 py-[0.3em] mx-[0.2em] mb-[0.4em] text-[13px] transition-colors duration-200 sm:px-5 sm:text-[15px]';

  return (
    <section className="relative z-[1] flex h-screen flex-col justify-end overflow-hidden px-5 pb-12 sm:px-8 md:justify-center md:px-10 md:pb-0">
      <div className="relative z-10 max-w-xl">
        <p className="pointer-events-none mb-5 select-none text-[clamp(18px,4vw,26px)] font-normal leading-[1.3] text-black blur-[4px] sm:mb-6">
          Hey there, meet A.R.I.A,
          <br />
          Mainframe&apos;s Adaptive Response Interface Agent
        </p>

        <p className="mb-5 min-h-[54px] text-[clamp(18px,4vw,26px)] font-normal leading-[1.35] text-black sm:mb-6">
          {displayed}
          {!done ? (
            <span className="ml-[2px] inline-block h-[1.1em] w-[2px] animate-[blink_1s_step-end_infinite] align-middle bg-black" />
          ) : null}
        </p>

        <div
          className={`flex flex-wrap gap-y-1 transition-[opacity,transform] duration-400 ease-out ${
            buttonsVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
          }`}
        >
          {['Pitch us an idea', 'Come work here', 'Send a brief hello', 'See how we operate'].map(
            (label) => (
              <button
                key={label}
                type="button"
                className={`${pillClasses} border border-black/10 bg-white text-black hover:bg-black hover:text-white`}
              >
                {label}
              </button>
            ),
          )}

          <button
            type="button"
            className={`${pillClasses} gap-2 border border-white bg-transparent text-white hover:bg-white hover:text-black sm:gap-3`}
            onClick={copyEmail}
          >
            <span>
              Reach us: <span className="underline underline-offset-1">{email}</span>
            </span>
            <CopyIcon />
          </button>
        </div>
      </div>
    </section>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-black">
      <ScrubVideo />
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
    </main>
  );
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
