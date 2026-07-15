import { lazy, memo, Suspense } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

const splineScene = 'https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode';

const description =
  'Enterprise security systems built in days. AI-powered surveillance deployed with zero-trust architecture. Smart access control set up for your entire facility. All of it done right, not just fast.';

const SplineBackdrop = memo(function SplineBackdrop() {
  return (
    <div className="absolute inset-0 contain-paint">
      <Suspense fallback={<div className="absolute inset-0 bg-hero-bg" />}>
        <Spline scene={splineScene} className="h-full w-full" />
      </Suspense>
    </div>
  );
});

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-hero-bg">
      <SplineBackdrop />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" />

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
