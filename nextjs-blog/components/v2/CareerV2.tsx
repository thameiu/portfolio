"use client";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { SiNextdotjs, SiReact, SiTailwindcss, SiLeaflet, SiLaravel, SiDocker,
  SiTypescript, SiPhp, SiPostgresql, SiMysql, SiMongodb, SiGit, SiGitlab,
  SiCplusplus, SiPython, SiJavascript, SiOpengl, SiCmake, SiNestjs, SiDotnet,
  SiAngular, SiQt, SiExpress, SiJenkins, SiSupabase, SiFastapi } from "react-icons/si";
import { FaNodeJs, FaJava, FaDesktop, FaServer, FaDatabase, FaTools, FaCode, FaLaptopCode } from "react-icons/fa";
import { VscAzureDevops } from "react-icons/vsc";
import { PiFileCSharp } from "react-icons/pi";
import { WindevIcon } from "../v1/Utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TABS = ["Expériences", "Formation", "Compétences"] as const;
type Tab = typeof TABS[number];

/* ── small reusable badge ── */
const Badge = ({ children }: { children: React.ReactNode }) => (
  <span
    className="v2-career-pill inline-flex items-center gap-1.5 px-3 py-1 text-xs border"
    style={{
      fontFamily: "'Sora', sans-serif",
      borderColor: "rgba(136,17,17,0.32)",
      color: "#881111",
      background: "rgba(136,17,17,0.09)",
      borderRadius: 6,
    }}
  >
    {children}
  </span>
);

const JobTag = ({ children }: { children: React.ReactNode }) => (
  <span
    className="inline-block px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider"
    style={{
      fontFamily: "'Sora', sans-serif",
      color: "#881111",
      background: "rgba(136,17,17,0.1)",
    }}
  >
    {children}
  </span>
);

/* ── timeline entry ── */
interface XPEntry {
  period: string;
  role: string;
  org: string;
  desc: React.ReactNode;
  tags?: React.ReactNode;
  badge?: React.ReactNode;
}

const XPItem = ({ e }: { e: XPEntry }) => (
  <div className="relative pl-10 pb-12 group">
    <div
      className="absolute left-0 top-1 w-3 h-3 rounded-full border-2 transition-all duration-300"
      style={{ borderColor: "#881111", background: "#FFEFEF" }}
    />
    <div
      className="absolute left-[5px] top-4 bottom-0 w-px group-last:hidden"
      style={{ background: "rgba(136,17,17,0.18)" }}
    />
    <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
      <span className="text-xs font-medium tracking-wide" style={{ color: "rgba(45,16,16,0.5)", fontFamily: "'Sora', sans-serif" }}>
        {e.period}
      </span>
      {e.badge}
    </div>
    <h3
      className="text-4xl md:text-5xl font-bold mb-0.5 transition-colors duration-300 group-hover:text-[#881111]"
      style={{ fontFamily: "'Mango Grotesque','archivo-black',sans-serif", color: "#2D1010", letterSpacing: "-0.02em" }}
    >
      {e.role}
    </h3>
    <p className="mb-3 text-sm font-medium" style={{ color: "rgba(45,16,16,0.78)", fontFamily: "'Sora', sans-serif" }}>{e.org}</p>
    <div className="text-[0.95rem] leading-relaxed mb-4" style={{ color: "rgba(45,16,16,0.9)", fontFamily: "'Sora', sans-serif" }}>{e.desc}</div>
    {e.tags && <div className="flex flex-wrap gap-2">{e.tags}</div>}
  </div>
);

/* ── skill category panel ── */
const SkillCard = ({
  icon, title, children, index,
}: {
  icon: React.ReactNode; title: string; children: React.ReactNode; index: number;
}) => (
  <div
    className="relative p-5 md:p-6 transition-all duration-300 group"
    style={{
      background: "transparent",
      borderRadius: 6,
    }}
  >
    {(index > 0 && index < 3) && (
      <div
        className="absolute left-5 right-5 top-0 h-px md:hidden"
        style={{ background: "rgba(136,17,17,0.34)" }}
      />
    )}
    {index > 2 && (
      <div
        className="absolute left-5 right-5 top-0 h-px"
        style={{ background: "rgba(136,17,17,0.34)" }}
      />
    )}
    <div className="flex items-center gap-4 mb-5 pl-2">
      <span className="text-3xl transition-colors" style={{ color: "#881111" }}>{icon}</span>
      <h4
        className="font-bold text-4xl md:text-5xl leading-none"
        style={{ fontFamily: "'Mango Grotesque','archivo-black',sans-serif", color: "#2D1010" }}
      >
        {title}
      </h4>
    </div>
    <div className="flex flex-wrap gap-2 pl-2">{children}</div>
  </div>
);

/* ── data ── */
const experiences: XPEntry[] = [
  {
    period: "Septembre 2025 - Aujourd'hui",
    role: "Analyste Développeur",
    org: "ACD — Aix-en-Provence",
    badge: <JobTag>Alternance</JobTag>,
    desc: <>Maintenance applicative et développement sur <strong>Suite Expert</strong>, solution Bureau et Web pour experts comptables. Optimisation des performances, résolution de bugs, refactorisation.</>,
    tags: <><Badge><SiDotnet/> ASP.NET MVC</Badge><Badge><PiFileCSharp/> C#</Badge><Badge><SiJavascript/> JavaScript</Badge><Badge><SiMysql/> SQL</Badge><Badge><VscAzureDevops/> Azure DevOps</Badge><Badge><WindevIcon/> WinDev</Badge></>,
  },
  {
    period: "Septembre 2024 - Juin 2025",
    role: "Développeur Full-Stack",
    org: "Miratlas — Pertuis",
    badge: <JobTag>Alternance</JobTag>,
    desc: <>Refonte de <strong>Pathfinder</strong>, application de cartographie de perturbations atmosphériques (FSOC). Conception BDD, API REST, dynamisation Frontend via Leaflet, graphiques temps réel.</>,
    tags: <><Badge><SiNextdotjs/> Next.js</Badge><Badge><SiLaravel/> Laravel</Badge><Badge><SiLeaflet/> Leaflet</Badge><Badge><SiDocker/> Docker</Badge><Badge><SiPostgresql/> PostgreSQL</Badge><Badge><SiGitlab/> GitLab</Badge></>,
  },
  {
    period: "Avril - Juin 2024",
    role: "Développeur Web",
    org: "Amiltone — Aix-en-Provence",
    badge: <JobTag>Stage</JobTag>,
    desc: <>Développement sur <strong>Flotto</strong>, solution web de gestion de flotte automobile. Nouvelles fonctionnalités Frontend/Backend, accessibilité, corrections de bugs.</>,
    tags: <><Badge><SiReact/> React</Badge><Badge><SiAngular/> Angular</Badge><Badge><SiNestjs/> NestJS</Badge><Badge><SiTypescript/> TypeScript</Badge><Badge><SiGitlab/> GitLab</Badge></>,
  },
];

const formations: XPEntry[] = [
  {
    period: "2025 - 2027",
    role: "Master of Science Technique",
    org: "Epitech - Marseille",
    desc: "Architecte de Systèmes d'Information. Spécialisation Cybersécurité + Cloud. Projets avancés en équipe, projet de fin d'études sur 2 ans.",
  },
  {
    period: "2022 - 2025",
    role: "BUT Informatique",
    org: "Aix-Marseille Université — IUT d'Arles",
    desc: "Formation complète en développement logiciel, bases de données, réseaux et gestion de projet. Méthodologies agiles et bonnes pratiques.",
  },
];

export default function CareerV2() {
  const [activeTab, setActiveTab] = useState<Tab>("Expériences");
  const [panelMinHeight, setPanelMinHeight] = useState<number>(0);
  const sectionRef   = useRef<HTMLElement>(null);
  const titleRef     = useRef<HTMLHeadingElement>(null);
  const tabNavRef    = useRef<HTMLDivElement>(null);
  const tabBtnRefs   = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabPanelRef  = useRef<HTMLDivElement>(null);
  const measureExpRef = useRef<HTMLDivElement>(null);
  const measureFormRef = useRef<HTMLDivElement>(null);
  const measureSkillsRef = useRef<HTMLDivElement>(null);

  /* ── scroll-trigger title animation ── */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const title   = titleRef.current;
      const section = sectionRef.current;
      if (!title || !section) return;
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;
      const titleStart = isMobile ? "top 96%" : "top 85%";
      const titleEnd = isMobile ? "bottom 28%" : "bottom 20%";

      title.style.opacity   = "0";
      title.style.transform = "translateX(-80px)";
      title.style.willChange = "transform, opacity";

      ScrollTrigger.create({
        trigger: section,
        start: titleStart,
        end: titleEnd,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress    = self.progress;
          const inProgress  = Math.min(1, progress / 0.42);
          const outProgress = Math.min(1, Math.max(0, (progress - 0.58) / 0.28));
          const opacity     = Math.max(0, inProgress * (1 - outProgress));
          const x = -80 * (1 - inProgress);
          const y = -60 * outProgress;
          title.style.opacity   = String(opacity);
          title.style.transform = `translate(${x}px, ${y}px)`;
        },
      });

      /* Keep Parcours fixed, then let the first project cover it. */
      ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        end: () => "+=" + (window.innerHeight * 1.1),
        pin: section,
        pinSpacing: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  /* ── tab indicator ── */
  const moveIndicator = (idx: number) => {
    const btn = tabBtnRefs.current[idx];
    const nav = tabNavRef.current;
    const ind = indicatorRef.current;
    if (!btn || !nav || !ind) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    ind.style.left  = `${btnRect.left - navRect.left}px`;
    ind.style.width = `${btnRect.width}px`;
  };

  useLayoutEffect(() => {
    const idx = TABS.indexOf(activeTab);
    moveIndicator(idx);
  }, [activeTab]);

  useEffect(() => {
    const idx = TABS.indexOf(activeTab);
    setTimeout(() => moveIndicator(idx), 50);
  }, []);

  useEffect(() => {
    const measure = () => {
      const h1 = measureExpRef.current?.getBoundingClientRect().height ?? 0;
      const h2 = measureFormRef.current?.getBoundingClientRect().height ?? 0;
      const h3 = measureSkillsRef.current?.getBoundingClientRect().height ?? 0;
      const next = Math.ceil(Math.max(h1, h2, h3));
      if (next > 0) setPanelMinHeight(next);
    };
    const run = () => requestAnimationFrame(() => requestAnimationFrame(measure));
    run();
    window.addEventListener("resize", run);
    return () => window.removeEventListener("resize", run);
  }, []);

  /* ── animated tab change ── */
  const changeTab = (tab: Tab) => {
    if (tab === activeTab) return;
    const panel = tabPanelRef.current;
    if (panel) {
      panel.style.transition = "opacity 0.18s ease, transform 0.18s ease";
      panel.style.opacity    = "0";
      panel.style.transform  = "translateX(-16px)";
    }
    setTimeout(() => {
      setActiveTab(tab);
      if (panel) {
        panel.style.transition = "none";
        panel.style.opacity    = "0";
        panel.style.transform  = "translateX(16px)";
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (panel) {
            panel.style.transition = "opacity 0.22s ease, transform 0.22s ease";
            panel.style.opacity    = "1";
            panel.style.transform  = "translateX(0)";
          }
        });
      });
    }, 180);
  };

  const renderTabContent = (tab: Tab) => {
    if (tab === "Expériences") {
      return <div>{experiences.map((e, i) => <XPItem key={`xp-${i}`} e={e} />)}</div>;
    }
    if (tab === "Formation") {
      return <div>{formations.map((e, i) => <XPItem key={`f-${i}`} e={e} />)}</div>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <SkillCard icon={<FaDesktop/>} title="Frontend" index={0}>
          <Badge><SiReact/> React</Badge>
          <Badge><SiNextdotjs/> Next.js</Badge>
          <Badge><SiAngular/> Angular</Badge>
          <Badge><SiTailwindcss/> Tailwind</Badge>
          <Badge><SiLeaflet/> Leaflet</Badge>
          <Badge><SiDotnet/> Kendo UI</Badge>
        </SkillCard>
        <SkillCard icon={<FaServer/>} title="Backend" index={1}>
          <Badge><FaNodeJs/> Node.js</Badge>
          <Badge><SiNestjs/> NestJS</Badge>
          <Badge><SiFastapi/> FastAPI</Badge>
          <Badge><SiExpress/> Express</Badge>
          <Badge><SiLaravel/> Laravel</Badge>
          <Badge><SiDotnet/> ASP.NET</Badge>
        </SkillCard>
        <SkillCard icon={<FaDatabase/>} title="Bases de données" index={2}>
          <Badge><SiPostgresql/> PostgreSQL</Badge>
          <Badge><SiMysql/> MySQL</Badge>
          <Badge><SiMongodb/> MongoDB</Badge>
          <Badge><SiSupabase/> Supabase</Badge>
        </SkillCard>
        <SkillCard icon={<FaTools/>} title="Outils" index={3}>
          <Badge><SiDocker/> Docker</Badge>
          <Badge><SiGit/> Git</Badge>
          <Badge><SiGitlab/> GitLab</Badge>
          <Badge><SiJenkins/> Jenkins</Badge>
          <Badge><VscAzureDevops/> Azure DevOps</Badge>
        </SkillCard>
        <SkillCard icon={<FaCode/>} title="Langages" index={4}>
          <Badge><SiJavascript/> JavaScript</Badge>
          <Badge><SiTypescript/> TypeScript</Badge>
          <Badge><PiFileCSharp/> C#</Badge>
          <Badge><SiPhp/> PHP</Badge>
          <Badge><SiPython/> Python</Badge>
          <Badge><FaJava/> Java</Badge>
          <Badge><SiCplusplus/> C++</Badge>
        </SkillCard>
        <SkillCard icon={<FaLaptopCode/>} title="Bureau" index={5}>
          <Badge><SiOpengl/> OpenGL</Badge>
          <Badge><SiQt/> Qt</Badge>
          <Badge><WindevIcon/> WinDev</Badge>
        </SkillCard>
      </div>
    );
  };

  return (
    <section
      id="v2-career"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-start lg:justify-center px-[8vw] pt-20 pb-36 md:pt-24 md:pb-24 lg:py-32 overflow-hidden"
      style={{ background: "#FFFAFB" }}
    >
      {/* Mega title */}
      <h2
        ref={titleRef}
        className="v2-mega-title mb-16 opacity-0"
        style={{ color: "#881111" }}
      >
        Parcours
      </h2>

      {/* Tab nav */}
      <div
        ref={tabNavRef}
        className="relative flex justify-center md:justify-start gap-1 md:gap-0 mb-10 border-b"
        style={{ borderColor: "rgba(136,17,17,0.18)" }}
      >
        {TABS.map((tab, i) => (
          <button
            key={tab}
            ref={el => { tabBtnRefs.current[i] = el; }}
            onClick={() => changeTab(tab)}
            className="px-4 sm:px-6 py-3 text-sm md:text-base font-semibold transition-colors duration-300 cursor-pointer whitespace-nowrap text-center"
            style={{
              fontFamily: "'Sora', sans-serif",
              color: activeTab === tab ? "#881111" : "rgba(45,16,16,0.45)",
              background: "transparent",
              border: "none",
              letterSpacing: "0.01em",
            }}
          >
            {tab}
          </button>
        ))}
        {/* animated indicator */}
        <div ref={indicatorRef} className="v2-tab-indicator" style={{ bottom: -1 }} />
      </div>

      {/* ── Tab panels ── */}
      <div
        ref={tabPanelRef}
        className="min-h-[640px] md:min-h-[420px]"
        style={{
          transition: "opacity 0.22s ease, transform 0.22s ease",
          minHeight: panelMinHeight > 0 ? `${panelMinHeight}px` : undefined,
        }}
      >
        {renderTabContent(activeTab)}
      </div>

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          opacity: 0,
          pointerEvents: "none",
          zIndex: -1,
          top: 0,
          left: "8vw",
          right: "8vw",
          visibility: "hidden",
        }}
      >
        <div ref={measureExpRef}>{renderTabContent("Expériences")}</div>
        <div ref={measureFormRef}>{renderTabContent("Formation")}</div>
        <div ref={measureSkillsRef}>{renderTabContent("Compétences")}</div>
      </div>
    </section>
  );
}
