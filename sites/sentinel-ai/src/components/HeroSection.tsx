import { lazy, memo, Suspense, useCallback, useLayoutEffect, useRef } from 'react';
import type { Application } from '@splinetool/runtime';

const Spline = lazy(() => import('@splinetool/react-spline'));

const splineScene = 'https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode';

const description =
  'Enterprise security systems built in days. AI-powered surveillance deployed with zero-trust architecture. Smart access control set up for your entire facility. All of it done right, not just fast.';

const maxCanvasWidth = 1280;
const maxCanvasHeight = 820;

function tuneSplineCanvas(app: Application) {
  const canvas = app.canvas;
  canvas.style.transform = 'translateZ(0)';
}

const SplineBackdrop = memo(function SplineBackdrop() {
  const splineRef = useRef<Application | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);

  const syncFrameSize = useCallback(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const scale = Math.max(width / maxCanvasWidth, height / maxCanvasHeight, 1);
    const frameWidth = Math.ceil(width / scale);
    const frameHeight = Math.ceil(height / scale);

    frame.style.width = `${frameWidth}px`;
    frame.style.height = `${frameHeight}px`;
    frame.style.transform = `translate3d(-50%, -50%, 0) scale(${scale})`;
  }, []);

  const handleLoad = useCallback((app: Application) => {
    splineRef.current = app;
    app.setGlobalEvents(false);
    tuneSplineCanvas(app);
  }, []);

  useLayoutEffect(() => {
    let frame = 0;

    const handleResize = () => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        syncFrameSize();
        if (splineRef.current) tuneSplineCanvas(splineRef.current);
      });
    };

    syncFrameSize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, [syncFrameSize]);

  return (
    <div className="spline-stage absolute inset-0 contain-paint">
      <div ref={frameRef} className="spline-resolution-frame">
        <Suspense fallback={<div className="absolute inset-0 bg-hero-bg" />}>
          <Spline scene={splineScene} className="h-full w-full" onLoad={handleLoad} />
        </Suspense>
      </div>
    </div>
  );
});

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-hero-bg">
      <SplineBackdrop />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" />
      <div className="hero-shadow-bloom pointer-events-none absolute inset-0 z-[2]" />

      <div className="pointer-events-none relative z-10 w-full max-w-[90%] px-6 pb-10 pt-32 sm:max-w-md md:px-10 md:pb-10 lg:max-w-2xl">
        <h1
          className="mb-2 text-[clamp(3rem,8vw,6rem)] font-bold uppercase leading-[1.05] tracking-[-0.05em] text-foreground opacity-0 animate-fade-up md:mb-4"
          style={{ animationDelay: '0.2s' }}
        >
          SENTINEL <span className="text-primary">AI</span>
        </h1>

        <p
          className="mb-3 text-[clamp(1.125rem,2.5vw,1.875rem)] font-light text-foreground/80 opacity-0 animate-fade-up md:mb-6"
          style={{ animationDelay: '0.4s' }}
        >
          We implement security correctly.
        </p>

        <p
          className="mb-4 text-[clamp(0.875rem,1.5vw,1.25rem)] font-light text-muted-foreground opacity-0 animate-fade-up md:mb-8"
          style={{ animationDelay: '0.55s' }}
        >
          {description}
        </p>

        <div
          className="flex flex-wrap gap-3 font-bold opacity-0 animate-fade-up"
          style={{ animationDelay: '0.7s' }}
        >
          <button className="pointer-events-auto cursor-pointer rounded-sm bg-primary px-6 py-3 text-sm text-primary-foreground transition-all hover:brightness-110 active:scale-[0.97] md:px-8 md:py-4">
            Book a Call
          </button>
          <button className="pointer-events-auto cursor-pointer rounded-sm bg-white px-6 py-3 text-sm text-background transition-all hover:brightness-90 active:scale-[0.97] md:px-8 md:py-4">
            Our Work
          </button>
        </div>

        <p
          className="mt-4 text-xs font-light text-muted-foreground/60 opacity-0 animate-fade-up md:mt-6"
          style={{ animationDelay: '0.85s' }}
        >
          Trusted security partner. Columbus, OH. 12 systems deployed.
        </p>
      </div>
    </section>
  );
}
