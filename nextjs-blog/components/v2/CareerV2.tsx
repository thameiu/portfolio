"use client";
import { useState, useRef, useEffect } from "react";
import { SiNextdotjs, SiReact, SiTailwindcss, SiLeaflet, SiLaravel, SiDocker,
  SiTypescript, SiPhp, SiPostgresql, SiMysql, SiMongodb, SiGit, SiGitlab,
  SiCplusplus, SiPython, SiJavascript, SiOpengl, SiCmake, SiNestjs, SiDotnet,
  SiAngular, SiQt, SiExpress, SiJenkins, SiSupabase, SiFastapi } from "react-icons/si";
import { FaNodeJs, FaJava, FaDesktop, FaServer, FaDatabase, FaTools, FaCode, FaLaptopCode } from "react-icons/fa";
import { VscAzureDevops } from "react-icons/vsc";
import { PiFileCSharp } from "react-icons/pi";
import { WindevIcon } from "../v1/Utils";
import GlitchTitle from "./GlitchTitle";
import MainSectionV2 from "./MainSectionV2";

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
      className="absolute left-0 top-1 w-3 h-3 transition-all duration-300"
      style={{ background: "#881111" }}
    />
    <div
      className="absolute left-[6px] top-[10px] bottom-[-10px] w-px group-last:hidden"
      style={{ background: "rgba(136,17,17,0.35)" }}
    />
    <div className="flex flex-col items-start gap-1 mb-1 md:flex-row md:items-start md:justify-between md:gap-2">
      <span className="text-xs font-medium tracking-wide" style={{ color: "rgba(45,16,16,0.5)", fontFamily: "'Sora', sans-serif" }}>
        {e.period}
      </span>
      {e.badge && <div className="self-start md:self-auto">{e.badge}</div>}
    </div>
    <h3
      className="v2-role-title text-4xl md:text-5xl font-bold mb-0.5 transition-colors duration-300 group-hover:text-[#881111]"
      style={{ fontFamily: "'Mango Grotesque','archivo-black',sans-serif", color: "#2D1010" }}
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
        className="v2-skill-title font-bold text-4xl md:text-5xl leading-none"
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
    org: "ACD ▪ Aix-en-Provence",
    badge: <JobTag>Alternance</JobTag>,
    desc: <>Maintenance applicative et développement sur <strong>Suite Expert</strong>, solution Bureau et Web pour experts comptables. Optimisation des performances, résolution de bugs, refactorisation.</>,
    tags: <><Badge><SiDotnet/> ASP.NET MVC</Badge><Badge><PiFileCSharp/> C#</Badge><Badge><SiJavascript/> JavaScript</Badge><Badge><SiMysql/> SQL</Badge><Badge><VscAzureDevops/> Azure DevOps</Badge><Badge><WindevIcon/> WinDev</Badge></>,
  },
  {
    period: "Septembre 2024 - Juin 2025",
    role: "Développeur Full-Stack",
    org: "Miratlas ▪ Pertuis",
    badge: <JobTag>Alternance</JobTag>,
    desc: <>Refonte de <strong>Pathfinder</strong>, application de cartographie de perturbations atmosphériques (FSOC). Conception BDD, API REST, dynamisation Frontend via Leaflet, graphiques temps réel.</>,
    tags: <><Badge><SiNextdotjs/> Next.js</Badge><Badge><SiLaravel/> Laravel</Badge><Badge><SiLeaflet/> Leaflet</Badge><Badge><SiDocker/> Docker</Badge><Badge><SiPostgresql/> PostgreSQL</Badge><Badge><SiGitlab/> GitLab</Badge></>,
  },
  {
    period: "Avril - Juin 2024",
    role: "Développeur Web",
    org: "Amiltone ▪ Aix-en-Provence",
    badge: <JobTag>Stage</JobTag>,
    desc: <>Développement sur <strong>Flotto</strong>, solution web de gestion de flotte automobile. Nouvelles fonctionnalités Frontend/Backend, accessibilité, corrections de bugs.</>,
    tags: <><Badge><SiReact/> React</Badge><Badge><SiAngular/> Angular</Badge><Badge><SiNestjs/> NestJS</Badge><Badge><SiTypescript/> TypeScript</Badge><Badge><SiGitlab/> GitLab</Badge></>,
  },
];

const formations: XPEntry[] = [
  {
    period: "2025 - 2027",
    role: "Master of Science Technique",
    org: "Epitech ▪ Marseille",
    desc: "Architecte de Systèmes d'Information. Spécialisation Cybersécurité + Cloud. Projets avancés en équipe, projet de fin d'études sur 2 ans.",
  },
  {
    period: "2022 - 2025",
    role: "BUT Informatique",
    org: "Aix-Marseille Université ▪ IUT d'Arles",
    desc: "Formation complète en développement logiciel, bases de données, réseaux et gestion de projet. Méthodologies agiles et bonnes pratiques.",
  },
];

export default function CareerV2() {
  const [activeTab, setActiveTab] = useState<Tab>("Expériences");
  const [panelMinHeight, setPanelMinHeight] = useState<number>(0);
  const sectionRef   = useRef<HTMLElement>(null);
  const tabNavRef    = useRef<HTMLDivElement>(null);
  const tabBtnRefs   = useRef<(HTMLButtonElement | null)[]>([]);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabPanelRef  = useRef<HTMLDivElement>(null);
  const measureExpRef = useRef<HTMLDivElement>(null);
  const measureFormRef = useRef<HTMLDivElement>(null);
  const measureSkillsRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const idx = TABS.indexOf(activeTab);
    moveIndicator(idx);
  }, [activeTab]);

  useEffect(() => {
    const idx = TABS.indexOf(activeTab);
    setTimeout(() => moveIndicator(idx), 50);
  }, []);

  useEffect(() => {
    const getActiveTabMeasureRef = () => {
      if (activeTab === "Expériences") return measureExpRef.current;
      if (activeTab === "Formation") return measureFormRef.current;
      return measureSkillsRef.current;
    };

    const measure = () => {
      const activeMeasure = getActiveTabMeasureRef();
      const activeTabHeight = Math.ceil(
        activeMeasure?.getBoundingClientRect().height ??
        tabPanelRef.current?.getBoundingClientRect().height ??
        0
      );
      if (activeTabHeight > 0) setPanelMinHeight(activeTabHeight);
    };

    const run = () => requestAnimationFrame(() => requestAnimationFrame(measure));
    run();

    const ro = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(() => run())
      : null;
    if (ro) {
      if (sectionRef.current) ro.observe(sectionRef.current);
      if (tabPanelRef.current) ro.observe(tabPanelRef.current);
    }

    window.addEventListener("resize", run);
    return () => {
      window.removeEventListener("resize", run);
      ro?.disconnect();
    };
  }, [activeTab]);

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
    <MainSectionV2
      id="v2-career"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-start lg:justify-center pt-20 pb-36 md:pt-24 md:pb-24 lg:py-32 overflow-hidden"
      style={{ background: "transparent" }}
    >
      {/* Mega title */}
      <GlitchTitle
        text="Parcours"
        color="#881111"
        triggerRef={sectionRef}
        className="v2-mega-title mb-16"
        style={{ color: "#881111" }}
        startDesktop="top 84%"
        startMobile="top 95%"
      />

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
            className="px-3 sm:px-5 py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 cursor-pointer whitespace-nowrap text-center"
            style={{
              fontFamily: "'Sora', sans-serif",
              color: activeTab === tab ? "#881111" : "rgba(45,16,16,0.45)",
              background: "transparent",
              border: "none",
              letterSpacing: "0.035em",
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
        className="min-h-[320px] md:min-h-[280px]"
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
    </MainSectionV2>
  );
}
