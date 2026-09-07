import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import CalendlyWidget from '@/components/CalendlyWidget';
import { CALENDLY_CONFIG } from '@/config/calendly';

import Spotlight from '@/components/aceternity/Spotlight';
import MagicButton from '@/components/aceternity/MagicButton';
import FloatingNav from '@/components/aceternity/FloatingNav';
import TextGenerate from '@/components/aceternity/TextGenerate';
import TiltCard from '@/components/aceternity/TiltCard';
import DottedGlobe from '@/components/aceternity/DottedGlobe';
import { BentoGrid, BentoGridItem } from '@/components/aceternity/BentoGrid';
import ApproachCard from '@/components/aceternity/ApproachCard';
import MovingBorderCard from '@/components/aceternity/MovingBorderCard';

import {
  ArrowRight,
  Download,
  Home,
  User,
  Workflow,
  Briefcase,
  Mail,
  Play,
  MapPin,
  Phone,
  Linkedin,
  Github,
  GraduationCap,
  Award,
  Plus,
  Minus,
  Send,
} from 'lucide-react';

import {
  profile,
  summary,
  pullQuote,
  metrics,
  method,
  capabilities,
  toolkit,
  experience,
  featuredWork,
  managedProjects,
  engagements,
  education,
  certifications,
  bentoItems,
  deliveryHighlights,
  clientStrip,
} from '@/data/resume';

const ease = [0.22, 1, 0.36, 1] as const;

const NAV = [
  { id: 'home', label: 'Home', icon: <Home className="h-4 w-4" /> },
  { id: 'about', label: 'About', icon: <User className="h-4 w-4" /> },
  { id: 'method', label: 'Method', icon: <Workflow className="h-4 w-4" /> },
  { id: 'work', label: 'Work', icon: <Briefcase className="h-4 w-4" /> },
  { id: 'contact', label: 'Contact', icon: <Mail className="h-4 w-4" /> },
];

/** Dot-matrix colour + ground for each method card's reveal. */
const METHOD_VISUALS = [
  { colors: [[110, 231, 183], [52, 211, 153]], gradient: 'bg-emerald-950' },
  { colors: [[125, 211, 252], [56, 189, 248]], gradient: 'bg-sky-950' },
  { colors: [[244, 114, 182], [232, 121, 249]], gradient: 'bg-black' },
  { colors: [[196, 181, 253], [203, 172, 249]], gradient: 'bg-indigo-950' },
  { colors: [[253, 224, 71], [251, 191, 36]], gradient: 'bg-amber-950' },
  { colors: [[103, 232, 249], [34, 211, 238]], gradient: 'bg-cyan-950' },
];

const PROJECT_GROUPS = [
  { title: 'AI & automation', categories: ['AI & business operations', 'Sales automation', 'Knowledge & retrieval', 'AI assistant experience'] },
  { title: 'SaaS platforms & product design', categories: ['Health & wellness', 'Platform & infrastructure', 'Responsive product design'] },
];

const ProjectManagerBadge = () => (
  <span className="inline-flex w-fit shrink-0 rounded-full border border-purple/25 bg-purple/10 px-3 py-1 text-xs font-medium text-lilac">Project Manager</span>
);

const SECTION_IDS = [
  'home',
  'about',
  'method',
  'capabilities',
  'experience',
  'work',
  'impact',
  'credentials',
  'contact',
];

/* ------------------------------------------------------------------ */
/* Shared bits                                                         */
/* ------------------------------------------------------------------ */

const Reveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 26 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-70px' }}
    transition={{ duration: 0.7, delay, ease }}
  >
    {children}
  </motion.div>
);

const SectionHeading: React.FC<{
  lead: string;
  highlight: string;
  eyebrow?: string;
}> = ({ lead, highlight, eyebrow }) => (
  <Reveal className="mb-12 text-center md:mb-16">
    {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
    <h2 className="display-section">
      {lead} <span className="text-lilac">{highlight}</span>
    </h2>
  </Reveal>
);

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [openRole, setOpenRole] = useState<number | null>(0);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const { toast } = useToast();

  const contactMutation = useMutation({
    mutationFn: async (formData: typeof contactForm) =>
      apiRequest('POST', '/api/contact', formData),
    onSuccess: () => {
      toast({
        title: 'Message sent',
        description: 'Thanks for reaching out. I will reply shortly.',
      });
      setContactForm({ name: '', email: '', subject: '', message: '' });
    },
    onError: () => {
      toast({
        title: 'Something went wrong',
        description: 'The message did not send. Please try again or email me directly.',
        variant: 'destructive',
      });
    },
  });

  const trackViewMutation = useMutation({
    mutationFn: async () => apiRequest('POST', '/api/portfolio-view', {}),
    onError: (error) => console.warn('Portfolio view tracking failed:', error),
  });

  useEffect(() => {
    trackViewMutation.mutate();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(contactForm);
  };

  /* ---------------------------------------------------------------- */
  /* Bento tile content                                               */
  /* ---------------------------------------------------------------- */

  const bentoExtras: Record<string, React.ReactNode> = {
    discovery: null,
    toolkit: (
      <div className="toolkit-columns column-mask flex gap-3 overflow-hidden">
        {[0, 1].map((col) => {
          const tools = toolkit.flatMap((g) => g.tools).filter((_, i) => i % 2 === col);
          return (
            <div key={col} className="flex-1 overflow-hidden">
              <div className={col === 0 ? 'chip-column' : 'chip-column-reverse'}>
                {[0, 1].map((copy) => (
                  <div key={copy} className="flex flex-col items-center gap-2.5 pb-2.5">
                    {tools.map((tool) => (
                      <span
                        key={`${copy}-${tool}`}
                        className="w-full rounded-lg border border-white/[0.1] bg-white/[0.05] py-2 text-center text-xs text-white-200"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    ),
    metrics: (
      <div className="flex flex-wrap gap-2">
        {['Funnels', 'Retention', 'Cohorts', 'Activation', 'Unit economics'].map((chip) => (
          <span key={chip} className="chip">
            {chip}
          </span>
        ))}
      </div>
    ),
    current: (
      <div className="flex flex-wrap items-center gap-2">
        <span className="chip chip-lilac">
          n8n automation
        </span>
        <span className="chip">Figma Make prototypes</span>
        <span className="chip">Looker Studio reporting</span>
      </div>
    ),
  };

  const bentoVisuals: Record<string, React.ReactNode> = {
    discovery: <img src="/images/discovery-research.png" alt="" className="collaboration-art" loading="lazy" />,
    globe: (
      <div className="timezone-globe">
        <DottedGlobe className="h-full w-full" />
      </div>
    ),
    metrics: <div className="aurora bottom-[-40%] left-[-20%] h-56 w-56 bg-indigo-500" />,
    current: (
      <>
        <div className="aurora left-[35%] top-[-60%] h-72 w-72 bg-purple" />
        <div className="dot-bg absolute inset-0 opacity-50" />
        <svg
          viewBox="0 0 320 140"
          className="absolute -bottom-4 right-4 hidden h-36 w-80 opacity-70 md:block"
          aria-hidden="true"
        >
          <g stroke="rgba(203,172,249,0.5)" strokeWidth="1.2" fill="none">
            <path d="M40 70 H110" />
            <path d="M150 70 H210" />
            <path d="M250 70 H285" />
            <path d="M130 50 V30 H210" />
            <path d="M130 90 V110 H210" />
          </g>
          {[
            [40, 70],
            [130, 70],
            [230, 30],
            [230, 70],
            [230, 110],
            [290, 70],
          ].map(([cx, cy]) => (
            <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="7" fill="#0b0f2b" stroke="#cbacf9" strokeWidth="1.2" />
          ))}
          <circle cx="40" cy="70" r="3" fill="#cbacf9">
            <animate attributeName="cx" values="40;130;230;290" dur="4s" repeatCount="indefinite" />
          </circle>
        </svg>
      </>
    ),
    contact: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-[#5b21b6] via-[#7c3aed] to-[#a21caf]" />
        <div className="dot-bg absolute inset-0 opacity-40" />
      </>
    ),
    toolkit: null,
  };

  return (
    <MotionConfig reducedMotion="user">
    <main className="relative w-full overflow-x-hidden bg-black-100 text-white">
      <a className="skip-link" href="#about">Skip to content</a>
      <FloatingNav
        navItems={NAV}
        activeId={activeSection}
        onNavigate={goTo}
        action={
          <a
            href={profile.resume}
            download
            aria-label="Download CV"
            className="ml-1 flex items-center gap-1.5 rounded-lg border border-white/15 px-2.5 py-1 text-xs text-white-200 transition-colors hover:border-purple/60 hover:text-white"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">CV</span>
          </a>
        }
      />

      {/* ============================================================ HERO */}
      <section
        id="home"
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pb-16 pt-32"
      >
        <div className="absolute inset-0">
          <Spotlight className="-left-10 -top-40 md:-left-32 md:-top-20" fill="white" />
          <Spotlight className="left-full top-10 h-[80vh] w-[50vw]" fill="#cbacf9" />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="#7c3aed" />
        </div>

        <div className="grid-bg absolute inset-0" />

        <div className="hero-layout relative z-10 mx-auto w-full max-w-[1400px] px-[var(--gutter)]">
          <div className="hero-copy">
            <p className="eyebrow mb-6 flex items-center gap-3"><span className="availability-dot" />{profile.available}</p>
            <p className="mb-4 text-base font-medium text-white-200">{profile.name} <span className="mx-2 text-white/25">/</span> {profile.role}</p>
            <TextGenerate
              words="Better questions. Clearer decisions. Stronger delivery."
              highlightRange={[2, 3]}
              className="display-hero max-w-3xl"
            />
            <p className="mt-7 max-w-xl text-base leading-relaxed text-white-200 md:text-lg">
              I find the problem behind the request, then turn evidence into a plan your team can deliver. Discovery, strategy, and delivery for web, SaaS, and AI products.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <MagicButton title="Explore my work" icon={<ArrowRight className="h-4 w-4" />} handleClick={() => goTo('work')} />
              <a href={profile.resume} download className="ghost-button"><Download className="h-4 w-4" />Download CV</a>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-white-200/80"><MapPin className="h-4 w-4 text-lilac" />Dhaka, Bangladesh · Working across time zones</p>
          </div>
          <div className="hero-art" aria-hidden="true">
            <img src="/images/discovery-orbit.png" alt="" width="1536" height="1024" fetchPriority="high" />
            <div className="hero-art-caption"><span className="font-mono text-xs text-lilac">01 / CLARITY FROM COMPLEXITY</span><span className="mt-2 block text-sm text-white-200">Discover the signal. Shape what comes next.</span></div>
          </div>
          <div className="hero-metrics">
            {metrics.map((m) => (
              <div key={m.label} className="px-4 py-6 md:px-7">
                <p className="font-display text-3xl font-semibold tracking-tight text-white">{m.value}</p>
                <p className="mt-2 text-sm text-white-200">{m.label}</p>
                <p className="mt-1 text-xs text-white-200/60">{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================== ABOUT */}
      <section id="about" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-[var(--gutter)]">
          <SectionHeading eyebrow="01 · About" lead="A partner from" highlight="question to delivery" />

          <BentoGrid className="reference-bento">
            {bentoItems.map((item, i) => (
              <Reveal key={item.id} delay={i * 0.06} className={item.className}>
                <BentoGridItem
                  className={`h-full ${item.variant === 'globe' ? 'timezone-card' : ''} ${item.variant === 'discovery' ? 'discovery-card' : ''} ${item.variant === 'toolkit' ? 'toolkit-card' : ''}`}
                  title={item.title}
                  description={item.eyebrow}
                  visual={bentoVisuals[item.variant]}
                  copyEmail={item.variant === 'contact' ? profile.email : undefined}
                >
                  {bentoExtras[item.variant]}
                </BentoGridItem>
              </Reveal>
            ))}
          </BentoGrid>

          {/* Long-form summary */}
          <div className="mt-16 grid gap-8 md:mt-20 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <div className="space-y-5 text-sm leading-relaxed text-white-200 md:text-base">
                {summary.map((para) => (
                  <p key={para.slice(0, 24)}>{para}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-5">
              <div className="glass-panel top-hairline relative p-7">
                <p className="font-display text-lg font-semibold leading-snug text-white md:text-xl">
                  “{pullQuote}”
                </p>
                <p className="eyebrow mt-5">On writing recommendations</p>

                <dl className="mt-7 space-y-3 border-t border-white/10 pt-5">
                  {[
                    ['Reports to', 'Founders & senior stakeholders'],
                    ['Works with', 'Engineering, QA, UX, operations'],
                    ['Languages', profile.languages],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 text-sm">
                      <dt className="text-white-200/70">{k}</dt>
                      <dd className="text-right text-white-200">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ========================================================== METHOD */}
      <section id="method" className="relative py-20 md:py-28">
        <div className="dot-bg absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-[1400px] px-[var(--gutter)]">
          <SectionHeading
            eyebrow="02 · Method"
            lead="My approach to"
            highlight="every engagement"
          />

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {method.map((m, i) => (
              <Reveal key={m.step} delay={i * 0.06}>
                <ApproachCard
                  phase={`${m.step} · ${m.title}`}
                  title={m.title}
                  body={m.body}
                  colors={METHOD_VISUALS[i % METHOD_VISUALS.length].colors}
                  gradient={METHOD_VISUALS[i % METHOD_VISUALS.length].gradient}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================== CAPABILITIES */}
      <section id="capabilities" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-[var(--gutter)]">
          <SectionHeading
            eyebrow="03 · Capabilities"
            lead="What I am"
            highlight="accountable for"
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.06}>
                <div className="glass-panel top-hairline relative h-full p-6">
                  <div className="mb-5 flex items-baseline justify-between">
                    <h3 className="font-display text-xl font-semibold text-white">{c.title}</h3>
                    <span className="font-mono text-xs text-lilac">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {c.items.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-white-200">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-purple" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================== EXPERIENCE */}
      <section id="experience" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-[1200px] px-[var(--gutter)]">
          <SectionHeading eyebrow="04 · Experience" lead="Where I have" highlight="delivered" />

          <div className="space-y-5">
            {experience.map((role, i) => {
              const open = openRole === i;
              return (
                <Reveal key={role.company} delay={i * 0.05}>
                  <MovingBorderCard duration={open ? 14 : 9}>
                  <article className="overflow-hidden rounded-3xl">
                    <button
                      onClick={() => setOpenRole(open ? null : i)}
                      className="flex w-full items-start gap-5 p-6 text-left md:gap-7 md:p-8"
                      aria-expanded={open}
                    >
                      <span className="mt-1 hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] font-display text-lg font-bold text-lilac md:flex">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-display text-xl font-semibold text-white md:text-2xl">
                            {role.title}
                          </h3>
                          {role.current && <span className="chip chip-lilac">Current</span>}
                        </div>
                        <p className="mt-1 text-sm text-white-200">
                          {role.company} · {role.period}
                        </p>
                        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-white-200/85">
                          {role.summary}
                        </p>
                      </div>

                      <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-white-200">
                        {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.45, ease }}
                          className="overflow-hidden"
                        >
                          <div className="grid gap-8 px-6 pb-8 md:grid-cols-12 md:px-8 md:pl-[6.25rem]">
                            <ol className="space-y-3 md:col-span-8">
                              {role.bullets.map((b, bi) => (
                                <li key={bi} className="flex gap-3 text-sm leading-relaxed">
                                  <span className="mt-0.5 font-mono text-[11px] text-lilac">
                                    {String(bi + 1).padStart(2, '0')}
                                  </span>
                                  <span className="text-white-200">{b}</span>
                                </li>
                              ))}
                            </ol>

                            <div className="md:col-span-4">
                              <p className="eyebrow mb-3">Focus</p>
                              <div className="flex flex-wrap gap-2">
                                {role.tags.map((t) => (
                                  <span key={t} className="chip">
                                    {t}
                                  </span>
                                ))}
                              </div>
                              <p className="mt-5 flex items-center gap-2 text-xs text-white-200/70">
                                <MapPin className="h-3.5 w-3.5" />
                                {role.location}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </article>
                  </MovingBorderCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ WORK */}
      <section id="work" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-[var(--gutter)]">
          <SectionHeading
            eyebrow="05 · Work"
            lead="Selected projects"
            highlight="I managed"
          />

          <p className="mx-auto -mt-5 mb-12 max-w-2xl text-center text-base leading-relaxed text-white-200">
            Project management across AI, SaaS, automation, and digital product experiences.
          </p>
          {PROJECT_GROUPS.map((group) => (
          <div key={group.title} className="mb-20">
            <h3 className="mb-7 font-display text-2xl font-semibold text-white">{group.title}</h3>
            <div className="grid gap-7 md:grid-cols-2">
            {managedProjects.filter((project) => group.categories.includes(project.category)).map((project, i) => (
              <Reveal key={project.name} delay={(i % 2) * 0.06}>
                <article className="managed-project-card flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-card">
                  <a
                    href={encodeURI(project.image)}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View full-size image of ${project.name}`}
                    className="managed-project-image group relative block overflow-hidden"
                  >
                    <img src={encodeURI(project.image)} alt={`${project.name} · project interface`} width="1000" height="750" loading="lazy" decoding="async" className="aspect-[4/3] w-full object-contain" />
                    <span className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-black/80 px-3 py-2 text-xs text-white backdrop-blur">View project image ↗</span>
                  </a>
                  <div className="flex flex-1 flex-col p-6 md:p-8">
                    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs font-medium uppercase tracking-[0.12em] text-white-200">{project.category}</span>
                      <ProjectManagerBadge />
                    </div>
                    <h3 className="font-display text-xl font-semibold leading-snug text-white md:text-2xl">{project.name}</h3>
                    <p className="mt-4 text-base leading-relaxed text-white-200">{project.description}</p>
                    <div className="mt-auto flex flex-wrap gap-2 pt-6">
                      {project.technologies.map((technology) => <span key={technology} className="chip">{technology}</span>)}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
            </div>
          </div>
          ))}

          <h3 className="mb-7 font-display text-2xl font-semibold text-white">Creative work</h3>
          {/* Featured film */}
          <Reveal>
            <TiltCard className="mb-14" amount={5}>
              <a
                href={featuredWork.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid overflow-hidden rounded-3xl border border-white/[0.12] md:grid-cols-12"
                style={{
                  background: 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
                }}
              >
                <div className="relative overflow-hidden md:col-span-7">
                  <img
                    src={featuredWork.thumb}
                    alt={featuredWork.title}
                    loading="lazy"
                    width="1536"
                    height="1024"
                    className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                  <span className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/25 bg-black/60 px-4 py-2 text-xs font-medium text-white backdrop-blur transition-colors duration-300 group-hover:border-purple group-hover:bg-purple group-hover:text-black-100">
                    <Play className="h-3 w-3 fill-current" />
                    Play film
                  </span>
                </div>

                <div className="flex flex-col justify-center p-7 md:col-span-5 md:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="eyebrow">{featuredWork.kind}</p>
                    <ProjectManagerBadge />
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-white">
                    {featuredWork.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-white-200">
                    {featuredWork.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featuredWork.tags.map((t) => (
                      <span key={t} className="chip">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-8 flex items-center gap-2 text-sm font-medium text-lilac">
                    Watch the film
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </a>
            </TiltCard>
          </Reveal>

          <h3 className="mb-7 font-display text-2xl font-semibold text-white">AI data & delivery programmes</h3>
          {/* Delivery programmes */}
          <div className="grid gap-6 md:grid-cols-2">
            {engagements.map((p, i) => (
              <Reveal key={p.index} delay={i * 0.06}>
                <div className="h-full">
                  <div
                    className="work-card relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/[0.12]"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
                    }}
                  >
                    <div className="work-card-image">
                      <img
                        src={p.image}
                        alt={p.imageAlt}
                        width="1536"
                        height="1024"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="work-card-image-label">Concept illustration</span>
                    </div>
                    <div className="relative flex flex-1 flex-col p-7 md:p-9">
                      <div className="mb-4"><ProjectManagerBadge /></div>
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-purple/40 bg-purple/10 font-display text-sm font-bold text-lilac">
                          {p.index}
                        </span>
                        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white-200/80">
                          {p.sector}
                        </p>
                      </div>

                      <h3 className="mt-5 font-display text-xl font-semibold text-white md:text-2xl">
                        {p.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white-200">
                        {p.description}
                      </p>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {p.tags.map((t) => (
                          <span key={t} className="chip">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Experience grounded in the documented career history. */}
      <section id="impact" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-[var(--gutter)]">
          <SectionHeading eyebrow="06 · Experience in practice" lead="The work behind" highlight="the numbers" />
          <div className="grid gap-5 md:grid-cols-3">
            {deliveryHighlights.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <article className="impact-card h-full">
                  <span className="font-mono text-xs text-lilac">0{i + 1} / {item.category}</span>
                  <p className="mt-8 font-display text-4xl font-semibold tracking-tight text-white">{item.value}</p>
                  <h3 className="mt-3 text-lg font-semibold text-white">{item.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-white-200">{item.description}</p>
                  <p className="mt-7 border-t border-white/10 pt-4 text-sm text-white-200/70">{item.context}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-14 border-y border-white/10 py-8">
            <p className="eyebrow mb-7 text-center">Experience across these teams</p>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {clientStrip.map((c) => (
                <div key={c.name} className="text-center">
                  <p className="font-display text-base font-semibold text-white md:text-lg">{c.name}</p>
                  <p className="mt-2 text-xs text-white-200/70">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================== CREDENTIALS */}
      <section id="credentials" className="relative py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-[var(--gutter)]">
          <SectionHeading
            eyebrow="07 · Credentials"
            lead="Education &"
            highlight="certification"
          />

          <div className="grid gap-6 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <div
                className="relative h-full overflow-hidden rounded-3xl border border-white/[0.12] p-8"
                style={{
                  background: 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
                }}
              >
                <div className="aurora left-[-15%] top-[-25%] h-56 w-56 bg-purple" />
                <div className="relative">
                  <GraduationCap className="h-8 w-8 text-lilac" />
                  <h3 className="mt-6 font-display text-2xl font-semibold leading-snug text-white">
                    {education.degree}
                  </h3>
                  <p className="mt-4 text-sm text-white-200">{education.school}</p>
                  <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 font-mono text-xs text-white-200/70">
                    <span>{education.period}</span>
                    <span>{education.location}</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="grid gap-3 md:col-span-7">
              {certifications.map((c, i) => (
                <Reveal key={c.name} delay={i * 0.04}>
                  <div className="glass-panel flex items-center gap-4 p-5 transition-colors duration-300 hover:border-purple/35">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-purple/30 bg-purple/10">
                      <Award className="h-4 w-4 text-lilac" />
                    </span>
                    <div className="flex-1">
                      <p className="text-sm font-medium leading-snug text-white">{c.name}</p>
                      <p className="mt-0.5 text-xs text-white-200/75">{c.issuer}</p>
                    </div>
                    <span className="font-mono text-xs text-lilac">{c.year}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= CONTACT */}
      <section id="contact" className="relative overflow-hidden py-20 md:py-28">
        <div className="grid-bg absolute inset-0 opacity-70" />
        <div className="aurora left-1/2 top-0 h-96 w-96 -translate-x-1/2 bg-purple" />

        <div className="relative mx-auto max-w-[1400px] px-[var(--gutter)]">
          <Reveal className="mx-auto mb-16 max-w-3xl text-center">
            <p className="eyebrow mb-5">08 · Contact</p>
            <h2 className="display-section">
              Ready to find the problem <span className="text-lilac">behind your request?</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-sm text-white-200 md:text-base">
              Bring the problem, not the feature list. The first call maps the business model, the
              users, and the workflow and usually changes what gets built.
            </p>
            <div className="mt-9 flex justify-center">
              <MagicButton
                title="Book the first call"
                icon={<ArrowRight className="h-4 w-4" />}
                handleClick={() => goTo('booking')}
              />
            </div>
          </Reveal>

          <div className="grid gap-8 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <div className="glass-panel top-hairline relative h-full p-7">
                <h3 className="font-display text-lg font-semibold text-white">Direct lines</h3>
                <dl className="mt-6 space-y-4">
                  {[
                    {
                      k: 'Email',
                      v: profile.email,
                      href: `mailto:${profile.email}`,
                      icon: <Mail className="h-4 w-4" />,
                    },
                    {
                      k: 'Phone',
                      v: profile.phone,
                      href: `tel:${profile.phone.replace(/\s/g, '')}`,
                      icon: <Phone className="h-4 w-4" />,
                    },
                    {
                      k: 'LinkedIn',
                      v: '/in/improtik',
                      href: profile.linkedin,
                      icon: <Linkedin className="h-4 w-4" />,
                    },
                    {
                      k: 'GitHub',
                      v: '/asif-ikbal-protik',
                      href: profile.github,
                      icon: <Github className="h-4 w-4" />,
                    },
                    {
                      k: 'Location',
                      v: profile.location,
                      href: '',
                      icon: <MapPin className="h-4 w-4" />,
                    },
                  ].map((row) => (
                    <div key={row.k} className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-lilac">
                        {row.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white-200/60">
                          {row.k}
                        </dt>
                        <dd className="truncate text-sm text-white-200">
                          {row.href ? (
                            <a
                              href={row.href}
                              target={row.href.startsWith('http') ? '_blank' : undefined}
                              rel="noopener noreferrer"
                              className="transition-colors hover:text-lilac"
                            >
                              {row.v}
                            </a>
                          ) : (
                            row.v
                          )}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-7">
              <form
                onSubmit={handleContactSubmit}
                className="glass-panel top-hairline relative space-y-5 p-7"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="eyebrow mb-2 block">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="field-input"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="eyebrow mb-2 block">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="field-input"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="eyebrow mb-2 block">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    required
                    placeholder="What is this about?"
                    className="field-input"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="eyebrow mb-2 block">
                    What are you trying to solve?
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    required
                    placeholder="The problem, who it affects, and what you have tried so far."
                    className="field-input"
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  />
                </div>

                <MagicButton
                  type="submit"
                  disabled={contactMutation.isPending}
                  title={contactMutation.isPending ? 'Sending…' : 'Send message'}
                  icon={<Send className="h-4 w-4" />}
                />
              </form>
            </Reveal>
          </div>

          {/* Calendly */}
          <Reveal delay={0.1}>
            <div id="booking" className="mt-16 scroll-mt-28">
              <CalendlyWidget calendlyUrl={CALENDLY_CONFIG.CALENDLY_URL} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================================================== FOOTER */}
      <footer className="relative border-t border-white/[0.08] py-10">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-[var(--gutter)] md:flex-row md:justify-between">
          <p className="text-xs text-white-200/70">
            © {new Date().getFullYear()} {profile.name} · {profile.role}, {profile.discipline}
          </p>

          <div className="flex items-center gap-3">
            {[
              { href: profile.linkedin, icon: <Linkedin className="h-4 w-4" />, label: 'LinkedIn' },
              { href: profile.github, icon: <Github className="h-4 w-4" />, label: 'GitHub' },
              {
                href: `mailto:${profile.email}`,
                icon: <Mail className="h-4 w-4" />,
                label: 'Email',
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-white-200 backdrop-blur transition-colors hover:border-purple/50 hover:text-lilac"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
    </MotionConfig>
  );
};

export default Portfolio;
