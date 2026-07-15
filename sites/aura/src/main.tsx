import React, { CSSProperties, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'motion/react';
import {
  Archive,
  ChevronRight,
  FileText,
  Forward,
  Inbox,
  Menu,
  MoreHorizontal,
  Paperclip,
  Reply,
  Search,
  Send,
  Sparkles,
  Star,
  Trash2,
} from 'lucide-react';
import './index.css';

const gradientStyle: CSSProperties = {
  backgroundImage:
    'linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)',
  backgroundSize: '200% auto',
  WebkitBackgroundClip: 'text',
  backgroundClip: 'text',
  color: 'transparent',
  WebkitTextFillColor: 'transparent',
  filter: 'url(#c3-noise)',
};

const easeOut = [0.22, 1, 0.36, 1] as const;
const navLinks = ['Solutions', 'Pricing', 'Blog', 'Documentation', 'Careers'];

function AppleLogo({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 384 512" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 256 256" aria-label="Aura">
      <path
        d="M 0 128 C 70.692 128 128 185.308 128 256 L 64 256 C 64 220.654 35.346 192 0 192 Z M 256 192 C 220.654 192 192 220.654 192 256 L 128 256 C 128 185.308 185.308 128 256 128 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z"
        fill="white"
      />
    </svg>
  );
}

function AppleButton({ label = 'Download Aura', full = false }: { label?: string; full?: boolean }) {
  return (
    <button
      className={`group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all hover:bg-white/90 active:scale-[0.98] ${
        full ? 'w-full' : ''
      }`}
    >
      <AppleLogo />
      {label}
      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-px" />
    </button>
  );
}

function SectionEyebrow({ label, tag }: { label: string; tag?: string }) {
  return (
    <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-widest text-white/70">
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      {label}
      {tag ? (
        <span className="rounded-full border border-white/10 px-2 py-0.5 text-white/50 normal-case tracking-normal">
          {tag}
        </span>
      ) : null}
    </div>
  );
}

function RootNoise() {
  return (
    <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
      <filter id="c3-noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0"
        />
        <feComposite in2="SourceGraphic" operator="in" result="noise" />
        <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
      </filter>
    </svg>
  );
}

function Navbar() {
  return (
    <motion.nav
      className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <a href="#" aria-label="Aura home">
        <LogoMark />
      </a>

      <div className="hidden gap-8 md:flex">
        {navLinks.map((link, index) => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
          >
            {link}
          </motion.a>
        ))}
      </div>

      <div className="hidden md:block">
        <AppleButton />
      </div>

      <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden" aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </button>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="relative z-10 flex flex-col items-center px-6 pb-20 pt-16 text-center md:pt-28">
      <motion.h1
        className="text-4xl font-semibold leading-[0.9] tracking-tight md:text-7xl"
        initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0)' }}
        transition={{ duration: 0.8, delay: 0.3, ease: easeOut }}
      >
        <span className="block">Your email.</span>
        <span className="block animate-shiny" style={gradientStyle}>
          Revitalized
        </span>
      </motion.h1>

      <motion.p
        className="mt-8 max-w-md text-base leading-[1.5] text-white/60"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        Aura is the premier inbox platform for the current era. It leverages powerful AI to organize,
        prioritize, and refine your messages into total clarity.
      </motion.p>

      <motion.div
        className="mt-8 flex flex-col items-center gap-3"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <AppleButton />
        <p className="text-xs text-white/40">Download for Intel / Apple Silicon</p>
      </motion.div>
    </section>
  );
}

function MenuBar() {
  const menus = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

  return (
    <motion.div
      className="relative z-10 h-10 border-b border-t border-white/10 bg-black/40 backdrop-blur-md"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.9 }}
    >
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6 text-xs">
        <div className="flex items-center gap-4">
          <AppleLogo className="h-3.5 w-3.5" />
          <span className="font-bold text-white">Aura</span>
          {menus.map((item, index) => (
            <span
              key={item}
              className={`${index > 3 ? 'hidden md:inline' : index > 2 ? 'hidden sm:inline' : ''} text-white/70`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2 text-white/70">
          <Search className="h-3.5 w-3.5" />
          <span>Wed May 6 1:09 PM</span>
        </div>
      </div>
    </motion.div>
  );
}

const sidebarItems = [
  { icon: Inbox, label: 'Inbox', count: '12', active: true },
  { icon: Star, label: 'Starred', count: '3' },
  { icon: Send, label: 'Sent' },
  { icon: FileText, label: 'Drafts', count: '2' },
  { icon: Archive, label: 'Archive' },
  { icon: Trash2, label: 'Trash' },
];

const messages = [
  {
    name: 'Linear',
    subject: 'Weekly product digest',
    preview: 'Your team shipped 23 issues this week...',
    time: '9:41 AM',
    unread: true,
    active: true,
  },
  {
    name: 'Sophia Chen',
    subject: 'Re: Q3 roadmap review',
    preview: 'Thanks for sending the deck over. I had a few thoughts...',
    time: '8:12 AM',
    unread: true,
  },
  { name: 'Figma', subject: 'Marcus commented on your file', preview: 'Love the new direction on the landing hero.', time: 'Yesterday' },
  { name: 'Stripe', subject: 'Payout of $12,480.00 sent', preview: 'Your payout is on its way to your bank...', time: 'Yesterday' },
  { name: 'Vercel', subject: 'Deployment ready for aura-web', preview: 'Preview is live at aura-web-g3f.vercel.app', time: 'Mon' },
  { name: 'GitHub', subject: '[aura/core] PR #482 approved', preview: 'david-lim approved your pull request.', time: 'Mon' },
];

function InboxMockup() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24">
      <motion.div
        className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0e1014]/90 backdrop-blur-2xl"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, delay: 1.1, ease: easeOut }}
      >
        <div className="relative flex h-11 items-center justify-center border-b border-white/10">
          <div className="absolute left-4 flex gap-2">
            {['#ff5f57', '#febc2e', '#28c840'].map((color) => (
              <span key={color} className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
            ))}
          </div>
          <span className="text-xs text-white/50">Aura — Inbox</span>
        </div>

        <div className="overflow-x-auto">
        <div className="grid h-[520px] min-w-[980px] grid-cols-12 overflow-hidden">
          <aside className="col-span-3 border-r border-white/10 bg-black/30 p-4">
            <button className="mb-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-black">
              <Sparkles className="h-3.5 w-3.5" />
              Compose with Aura
            </button>
            <div className="flex flex-col gap-1">
              {sidebarItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs transition-colors ${
                      item.active ? 'bg-white/10 text-white' : 'text-white/60 hover:bg-white/5'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{item.label}</span>
                    {item.count ? <span className="ml-auto text-white/40">{item.count}</span> : null}
                  </button>
                );
              })}
            </div>
            <div className="mt-8">
              <p className="mb-3 text-[10px] uppercase tracking-widest text-white/30">Labels</p>
              {[
                ['Work', '#00d2ff'],
                ['Personal', '#A4F4FD'],
                ['Travel', '#f59e0b'],
                ['Finance', '#10b981'],
              ].map(([label, color]) => (
                <div key={label} className="flex items-center gap-2 px-3 py-1.5 text-xs text-white/60">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
                  {label}
                </div>
              ))}
            </div>
          </aside>

          <div className="col-span-4 border-r border-white/10">
            <div className="flex h-12 items-center gap-2 border-b border-white/10 px-4 text-sm text-white/40">
              <Search className="h-3.5 w-3.5" />
              Search mail
            </div>
            <div>
              {messages.map((message) => (
                <div
                  key={message.subject}
                  className={`border-b border-white/10 p-4 ${message.active ? 'bg-white/10' : 'hover:bg-white/[0.03]'}`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className={`truncate text-sm ${message.unread ? 'font-semibold text-white' : 'text-white/70'}`}>{message.name}</p>
                    <span className="shrink-0 text-[10px] text-white/40">{message.time}</span>
                  </div>
                  <p className="mt-1 truncate text-xs font-medium text-white/80">{message.subject}</p>
                  <p className="mt-1 truncate text-xs text-white/40">{message.preview}</p>
                </div>
              ))}
            </div>
          </div>

          <article className="col-span-5 flex flex-col">
            <div className="flex h-12 items-center justify-between border-b border-white/10 px-4">
              <div className="flex items-center gap-1">
                {[Reply, Forward, Archive, Trash2].map((Icon, index) => (
                  <button key={index} className="flex h-7 w-7 items-center justify-center rounded-md text-white/50 hover:bg-white/5 hover:text-white">
                    <Icon className="h-3.5 w-3.5" />
                  </button>
                ))}
              </div>
              <button className="flex h-7 w-7 items-center justify-center rounded-md text-white/50 hover:bg-white/5 hover:text-white">
                <MoreHorizontal className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-6">
              <h3 className="text-xl font-semibold tracking-tight">Weekly product digest</h3>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#00d2ff] to-[#0B2551] text-xs font-bold">L</div>
                <div>
                  <p className="text-sm font-semibold">Linear</p>
                  <p className="text-xs text-white/40">to me · 9:41 AM</p>
                </div>
                <span className="ml-auto rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/50">Work</span>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-[#A4F4FD]">
                  <Sparkles className="h-4 w-4" />
                  Summary by Aura
                </div>
                <p className="mt-2 text-sm leading-[1.6] text-white/70">
                  Your team closed 23 issues, merged 14 PRs, and shipped 2 features. Top contributor: Marcus. No action needed.
                </p>
              </div>

              <div className="mt-6 space-y-4 text-sm leading-[1.7] text-white/70">
                <p>Hi team,</p>
                <p>Here is your weekly digest of everything happening across your projects. This was a strong week with significant progress on the Q3 roadmap.</p>
                <p>Twenty-three issues were closed, fourteen pull requests were merged, and two customer-facing features went out. The velocity trend continues to climb.</p>
                <p>Let me know if you would like a deeper breakdown by project or contributor.</p>
                <p className="text-white/50">— The Linear team</p>
              </div>

              <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-xs text-white/60">
                <Paperclip className="h-3.5 w-3.5" />
                digest-may-6.pdf
              </button>
            </div>
          </article>
        </div>
        </div>
      </motion.div>
    </section>
  );
}

function FeatureTriage() {
  const groups = [
    { title: 'Priority', count: '4', color: '#ffffff', items: ['Sophia Chen — Q3 review', 'David Lim — contract signoff'] },
    { title: 'Follow-up', count: '7', color: '#e5e5e5', items: ['Marcus — design review', 'Figma — comment thread'] },
    { title: 'Updates', count: '18', color: '#a3a3a3', items: ['Vercel — deploy ready', 'GitHub — PR #482 merged'] },
    { title: 'Archived', count: '13', color: '#525252', items: ['Stripe payout · Newsletter · Receipts'] },
  ];

  return (
    <section className="relative z-10 mx-auto grid max-w-6xl items-start gap-10 px-6 py-20 md:grid-cols-2 md:gap-16 md:py-28">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
        <SectionEyebrow label="Triage" tag="AI-native" />
        <h2 className="mt-5 text-3xl font-semibold leading-[1.02] tracking-tight md:text-5xl">
          Clear your inbox
          <br />
          in a single pass.
        </h2>
        <p className="mt-6 max-w-md text-base leading-[1.6] text-white/60">
          Aura reads every message, understands intent, and routes the noise away from the signal. Focus on what moves your day forward — the rest handles itself.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {['Auto-categorize', 'Snooze for later', 'Silent newsletters', 'One-tap unsubscribe'].map((chip) => (
            <span key={chip} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-white/70">
              {chip}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div className="liquid-glass rounded-2xl p-5" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}>
        <p className="mb-4 text-xs text-white/50">Today · 42 messages triaged</p>
        <div className="grid gap-3">
          {groups.map((group) => (
            <div key={group.title} className="liquid-glass rounded-lg p-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ backgroundColor: group.color }} />
                <p className="text-sm font-semibold text-white">{group.title}</p>
                <span className="ml-auto text-xs text-white/40">{group.count}</span>
              </div>
              <div className="mt-3 space-y-1.5 text-xs text-white/55">
                {group.items.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function LogoCloud() {
  const logos = ['Linear', 'Vercel', 'Figma', 'Stripe', 'Ramp', 'Notion', 'Loom', 'Arc'];
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-16 text-center md:py-20">
      <p className="text-xs uppercase tracking-widest text-white/40">Trusted by the world&apos;s most thoughtful teams</p>
      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-8">
        {logos.map((logo, index) => (
          <motion.p
            key={logo}
            className="text-sm font-semibold tracking-tight text-white/50 transition-colors hover:text-white"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            {logo}
          </motion.p>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const testimonials = [
    {
      quote: 'Aura gave our leadership team four hours of their week back. It reads like email from the future.',
      name: 'Parker Wilf',
      role: 'Group Product Manager',
      company: 'MERCURY',
    },
    {
      quote: "The command palette alone has changed how I process messages. I can't imagine going back to a traditional client.",
      name: 'Andrew von Rosenbach',
      role: 'Senior Engineering Program Manager',
      company: 'COHERE',
    },
    {
      quote: 'Triage that actually understands context. Our team stopped dreading Monday morning inboxes.',
      name: 'Mathies Christensen',
      role: 'Engineering Manager',
      company: 'LUNAR',
    },
  ];

  return (
    <section className="relative z-10 mx-auto max-w-6xl border-t border-white/10 px-6 py-20 md:py-28">
      <div className="grid gap-5 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure key={testimonial.name} className="liquid-glass rounded-2xl p-6">
            <blockquote className="text-sm leading-[1.6] text-white/80">“{testimonial.quote}”</blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-5">
              <p className="text-sm font-semibold">{testimonial.name}</p>
              <p className="mt-1 text-xs text-white/50">{testimonial.role}</p>
              <p className="mt-3 text-xs font-semibold tracking-wide text-white">{testimonial.company}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

const planData = [
  {
    name: 'Free',
    price: 'Free',
    desc: 'For creators taking their first steps with Forma.',
    features: ['Up to 3 projects in the cloud', 'Image export up to 1080p', 'Basic editing tools', 'Free templates and icons', 'Access via web and mobile app'],
  },
  {
    name: 'Standard',
    monthly: '$9,99/m',
    yearly: '$99,99/y',
    desc: 'For freelancers and small teams who need more freedom and flexibility.',
    features: ['Up to 50 projects in the cloud', 'Export up to 4K', 'Advanced editing toolkit', 'Team collaboration (up to 5 members)', 'Access to premium template library'],
  },
  {
    name: 'Pro',
    monthly: '$19,99/m',
    yearly: '$199,99/y',
    desc: 'For studios, agencies, and professional creators working with brands.',
    features: ['Unlimited projects', 'Export up to 8K + animations', 'AI-powered content generation tools', 'Unlimited team members', 'Brand customization'],
    pro: true,
  },
];

function Pricing() {
  const [yearly, setYearly] = useState(false);

  return (
    <section className="c3-pricing-section relative z-10" id="pricing">
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden="true">
        <filter id="c3-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.5" numOctaves="2" stitchTiles="stitch" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.075" />
          </feComponentTransfer>
          <feComposite in2="SourceGraphic" operator="in" result="noise" />
          <feBlend in="SourceGraphic" in2="noise" mode="overlay" />
        </filter>
      </svg>

      <div className="c3-watermark-container">
        <div className="c3-watermark-main">
          <span className="c3-watermark-line-1">Your email.</span>
          <span className="c3-watermark-line-2">Revitalized</span>
        </div>
      </div>

      <div className="c3-grid">
        {planData.map((plan) => (
          <article key={plan.name} className={`c3-card ${plan.pro ? 'c3-card-pro' : ''}`}>
            <p className="c3-tier-small">{plan.name}</p>
            <p className="c3-tier-large">{plan.price ?? (yearly ? plan.yearly : plan.monthly)}</p>
            <p className="c3-desc">{plan.desc}</p>
            <ul className="c3-list">
              {plan.features.map((feature) => (
                <li key={feature}>
                  <span className="c3-check">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M11.5 3.75 5.6 9.65 2.5 6.55" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <button className="c3-btn">Choose Plan</button>
          </article>
        ))}
      </div>

      <div className="c3-toggle-wrap">
        <span className="text-sm text-white/60">Yearly</span>
        <button className={`c3-toggle ${yearly ? 'active' : ''}`} aria-pressed={yearly} onClick={() => setYearly((value) => !value)}>
          <span className="c3-toggle-knob" />
        </button>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20 md:py-32">
      <motion.div
        className="liquid-glass relative overflow-hidden rounded-3xl px-8 py-16 text-center md:py-24"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: easeOut }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{ background: 'radial-gradient(600px circle at 50% 0%, rgba(255,255,255,0.15), transparent 70%)' }}
        />
        <div className="relative z-10">
          <h2 className="text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl">
            Close the tabs.
            <br />
            Open your day.
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-[1.6] text-white/60">
            Join thousands of builders, founders, and operators who treat email like a tool — not an obligation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <AppleButton label="Download Aura" />
            <button className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5">
              Talk to sales
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function App() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0c0c0c] text-white">
      <RootNoise />
      <div className="pointer-events-none fixed inset-0 z-0">
        <video autoPlay loop muted playsInline className="h-full w-full object-cover pointer-events-none" src="/assets/aura-background.mp4" />
      </div>
      <div className="pointer-events-none fixed inset-0 z-[1] bg-black/65" />
      <div className="pointer-events-none fixed inset-y-0 left-1/2 z-[5] hidden w-px -translate-x-[calc(50%+36rem)] bg-white/10 md:block" />
      <div className="pointer-events-none fixed inset-y-0 left-1/2 z-[5] hidden w-px translate-x-[calc(-50%+36rem)] bg-white/10 md:block" />

      <Navbar />
      <Hero />
      <MenuBar />
      <InboxMockup />
      <FeatureTriage />
      <LogoCloud />
      <Testimonials />
      <Pricing />
      <FinalCTA />
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
