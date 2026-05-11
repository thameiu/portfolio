"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { IoArrowBack, IoClose } from "react-icons/io5";
import {
  SiNextdotjs, SiExpress, SiTypescript, SiSupabase, SiDocker, SiJenkins, SiJest, SiVite,
  SiFastapi, SiSqlalchemy, SiGithubactions, SiNginx, SiLeaflet, SiLaravel, SiPhp, SiPostgresql,
  SiNestjs, SiSocketdotio, SiVuedotjs, SiCplusplus, SiCmake, SiOpengl,
} from "react-icons/si";
import type { ProjectData } from "./ProjectCard3D";
import GlitchTitle from "./GlitchTitle";
import MainSectionV2 from "./MainSectionV2";

const TECH_ICON: Record<string, React.ReactNode> = {
  "Next.js": <SiNextdotjs />,
  Express: <SiExpress />,
  TypeScript: <SiTypescript />,
  Supabase: <SiSupabase />,
  Docker: <SiDocker />,
  Jenkins: <SiJenkins />,
  Jest: <SiJest />,
  "Vue 3": <SiVuedotjs />,
  Vite: <SiVite />,
  FastAPI: <SiFastapi />,
  SQLAlchemy: <SiSqlalchemy />,
  "GitHub Actions": <SiGithubactions />,
  Nginx: <SiNginx />,
  Leaflet: <SiLeaflet />,
  Laravel: <SiLaravel />,
  PHP: <SiPhp />,
  PostgreSQL: <SiPostgresql />,
  NestJS: <SiNestjs />,
  "Socket.io": <SiSocketdotio />,
  "C++": <SiCplusplus />,
  OpenGL: <SiOpengl />,
  CMake: <SiCmake />,
};

type IconType = "circles" | "clock" | "satellite" | "controller" | "cubegrid";
interface IconPos { x: string; y: string; size: string; rotation?: number }

const CARD_PREVIEW_INDEX_BY_PROJECT: Record<string, number> = {
  rgbast: 2,
  "2clock": 3,
  pathfinder: 1,
  ggps: 2,
  glproject: 0,
};

const OTHER_PROJECTS: ProjectData[] = [
  {
    id: "glproject",
    title: "GLProject",
    fullTitle: "GLProject",
    titleSvg: "/glproject/glproject.svg",
    description: "Moteur de visualisation 3D pédagogique (OpenGL).",
    details:
      "Programmation bas-niveau C++ et GPU, shaders GLSL (Phong, Blinn-Phong, flou Gaussien), projections planaires/sphériques/cylindriques/cubiques, chargement .obj, caméra et lumières dynamiques.",
    techStack: ["C++", "OpenGL", "CMake"],
    bgColor: "#191919",
    accentColor: "#2889A9",
    isDark: true,
    iconType: "cubegrid",
    screenshots: [
      "/glproject/glproject-1.png",
      "/glproject/glproject-2.png",
    ],
  },
];

const CirclesIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 280 280" fill="none" style={{ overflow: "visible" }}>
    <circle cx="100" cy="150" r="80" stroke={color} strokeWidth="1.5" />
    <circle cx="180" cy="150" r="80" stroke={color} strokeWidth="1.5" />
    <circle cx="140" cy="80" r="80" stroke={color} strokeWidth="1.5" />
  </svg>
);

const ClockIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="54" stroke={color} strokeWidth="1.5" opacity="0.4" />
    {Array.from({ length: 60 }, (_, i) => {
      const angle = (i * 6) * Math.PI / 180;
      const isMajor = i % 5 === 0;
      const r1 = isMajor ? 38 : 43;
      const r2 = 50;
      return (
        <line
          key={i}
          x1={60 + r1 * Math.sin(angle)} y1={60 - r1 * Math.cos(angle)}
          x2={60 + r2 * Math.sin(angle)} y2={60 - r2 * Math.cos(angle)}
          stroke={color}
          strokeWidth={isMajor ? 2.5 : 1}
          strokeLinecap="round"
        />
      );
    })}
    <g className="v2-clock-minute-arm">
      <line x1="60" y1="60" x2="60" y2="22" stroke={color} strokeWidth="4" strokeLinecap="round" />
    </g>
    <g className="v2-clock-hour-arm">
      <line x1="60" y1="60" x2="88" y2="72" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    </g>
    <circle cx="60" cy="60" r="5" fill={color} />
  </svg>
);

const PathfinderIcon = ({ color }: { color: string }) => {
  const cx = 350;
  const cy = 220;
  const startAngle = (300 * Math.PI) / 180;
  const endAngle = (60 * Math.PI) / 180;
  const radii = [52, 84, 128, 174, 228, 282, 336];
  return (
    <svg viewBox="0 0 700 420" fill="none" style={{ overflow: "visible" }}>
      {radii.map((r, i) => {
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cy + r * Math.sin(endAngle);
        return (
          <g
            key={i}
            className="v2-path-ring"
            style={{
              ["--v2-path-ring-spin-duration" as string]: `${34 + i * 9}s`,
              ["--v2-path-ring-spin-direction" as string]: i % 2 === 0 ? "normal" : "reverse",
            }}
          >
            <path
              d={`M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`}
              stroke={color}
              strokeWidth={3 - i * 0.25}
              fill="none"
              opacity={0.9 - i * 0.08}
            />
          </g>
        );
      })}
    </svg>
  );
};

const ControllerIcon = () => (
  <div style={{ position: "relative", width: "100%", aspectRatio: "150/110" }}>
    <Image
      src="/controller.svg"
      alt=""
      fill
      style={{
        objectFit: "contain",
        filter: "brightness(0) saturate(100%) invert(14%) sepia(90%) saturate(4000%) hue-rotate(348deg) brightness(60%)",
      }}
    />
  </div>
);

const GLCubeGridIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 360 300" fill="none" style={{ overflow: "visible" }}>
    <polygon points="180,24 44,92 180,160 316,92" stroke={color} strokeWidth="2.4" fill="none" />
    <polygon points="44,92 44,228 180,296 180,160" stroke={color} strokeWidth="2.4" fill="none" />
    <polygon points="316,92 316,228 180,296 180,160" stroke={color} strokeWidth="2.4" fill="none" />
  </svg>
);

function ProjectIcon({ type, color }: { type: IconType; color: string }) {
  if (type === "circles") return <CirclesIcon color={color} />;
  if (type === "clock") return <ClockIcon color={color} />;
  if (type === "satellite") return <PathfinderIcon color={color} />;
  if (type === "cubegrid") return <GLCubeGridIcon color={color} />;
  return <ControllerIcon />;
}

function getIconLayout(iconType: IconType): IconPos[] {
  if (iconType === "clock") {
    return [
      { x: "10%", y: "10%", size: "min(30vw,360px)" },
      { x: "44%", y: "4%", size: "min(30vw,360px)" },
      { x: "70%", y: "36%", size: "min(30vw,360px)" },
    ];
  }
  if (iconType === "controller") {
    return [
      { x: "8%", y: "3%", size: "min(20vw,260px)", rotation: -18 },
      { x: "44%", y: "0%", size: "min(20vw,260px)", rotation: 28 },
      { x: "74%", y: "18%", size: "min(20vw,260px)", rotation: -36 },
      { x: "18%", y: "58%", size: "min(20vw,260px)", rotation: 42 },
      { x: "58%", y: "64%", size: "min(20vw,260px)", rotation: -22 },
    ];
  }
  if (iconType === "satellite") {
    return [{ x: "70%", y: "62%", size: "min(62vw,760px)" }];
  }
  if (iconType === "cubegrid") {
    return [
      { x: "8%", y: "10%", size: "min(30vw,360px)", rotation: -14 },
      { x: "72%", y: "56%", size: "min(34vw,420px)", rotation: 15 },
    ];
  }
  return [
    { x: "8%", y: "6%", size: "min(44vw,540px)" },
    { x: "54%", y: "40%", size: "min(44vw,540px)" },
  ];
}

function Carousel({ images, accentColor, isDark }: {
  images: string[]; accentColor: string; isDark: boolean;
}) {
  const [mounted, setMounted] = useState(false);
  const [idx, setIdx] = useState(0);
  const [translate, setTrans] = useState(0);
  const [prevTrans, setPrev] = useState(0);
  const [dragging, setDrag] = useState(false);
  const [focused, setFocus] = useState(false);
  const [focusVisible, setFocusVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef = useRef(0);
  const didDragRef = useRef(false);
  const idxRef = useRef(0);

  useEffect(() => {
    idxRef.current = idx;
    setPrev(-idx * 100);
    setTrans(-idx * 100);
  }, [idx]);

  const go = useCallback((n: number) => {
    setIdx(((n % images.length) + images.length) % images.length);
  }, [images.length]);

  const prev = () => go(idxRef.current - 1);
  const next = () => go(idxRef.current + 1);

  const getX = (e: React.MouseEvent | React.TouchEvent) =>
    "touches" in e ? e.touches[0].clientX : e.clientX;

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    startXRef.current = getX(e);
    didDragRef.current = false;
    setDrag(true);
  };

  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragging) return;
    const w = containerRef.current?.offsetWidth || window.innerWidth;
    const d = ((getX(e) - startXRef.current) / w) * 100;
    if (Math.abs(d) > 2) didDragRef.current = true;
    setTrans(prevTrans + d);
  };

  const onUp = () => {
    if (!dragging) return;
    setDrag(false);
    const moved = translate - prevTrans;
    if (moved < -12 && idx < images.length - 1) go(idx + 1);
    else if (moved > 12 && idx > 0) go(idx - 1);
    else setTrans(prevTrans);
  };

  const openFocus = () => {
    if (didDragRef.current) return;
    setFocus(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setFocusVisible(true)));
  };

  const closeFocus = () => {
    setFocusVisible(false);
    setTimeout(() => setFocus(false), 280);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!focused) return;
    const html = document.documentElement;
    const body = document.body;
    const savedHtmlOverflow = html.style.overflow;
    const savedBodyOverflow = body.style.overflow;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    return () => {
      html.style.overflow = savedHtmlOverflow;
      body.style.overflow = savedBodyOverflow;
    };
  }, [focused]);

  useEffect(() => {
    if (!focused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeFocus();
      if (e.key === "ArrowLeft") { e.preventDefault(); prev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focused]);

  if (!images.length) return null;

  const focusOverlay = focused && mounted ? createPortal(
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 4100,
        background: "rgba(0,0,0,0.965)",
        backdropFilter: "blur(10px)",
        opacity: focusVisible ? 1 : 0,
        transition: "opacity 0.32s ease",
      }}
      onClick={closeFocus}
    >
      <button
        onClick={closeFocus}
        style={{
          position: "absolute",
          top: 20,
          right: 16,
          width: 52,
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "none",
          border: "none",
          color: accentColor,
          fontSize: 30,
          lineHeight: 1,
          cursor: "pointer",
          zIndex: 10,
          padding: 0,
        }}
      >
        <IoClose />
      </button>
      <div
        style={{ width: "100%", height: "100%", padding: "7vh 5vw" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
          {images.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); prev(); }}
              style={{
                position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                zIndex: 20, background: "rgba(0,0,0,0.5)", border: `1px solid ${accentColor}70`,
                color: accentColor, width: 44, height: 44, borderRadius: "50%",
                cursor: "pointer", fontSize: 24, lineHeight: 1,
              }}>‹</button>
          )}
          <div
            style={{
              display: "flex",
              height: "100%",
              transform: `translateX(${translate}%)`,
              transition: dragging ? "none" : "transform 0.5s cubic-bezier(0.25,1,0.5,1)",
            }}
            onMouseDown={onDown}
            onMouseMove={onMove}
            onMouseUp={onUp}
            onMouseLeave={onUp}
            onTouchStart={onDown}
            onTouchMove={onMove}
            onTouchEnd={onUp}
          >
            {images.map((src, i) => (
              <div key={`${src}-${i}`} style={{ minWidth: "100%", height: "100%", position: "relative" }}>
                <Image
                  src={src}
                  alt={`Screenshot ${i + 1}`}
                  fill
                  className="object-contain pointer-events-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
          {images.length > 1 && (
            <button onClick={(e) => { e.stopPropagation(); next(); }}
              style={{
                position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                zIndex: 20, background: "rgba(0,0,0,0.5)", border: `1px solid ${accentColor}70`,
                color: accentColor, width: 44, height: 44, borderRadius: "50%",
                cursor: "pointer", fontSize: 24, lineHeight: 1,
              }}>›</button>
          )}
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <div className="w-full flex flex-col gap-3 select-none">
      {focusOverlay}

      <div style={{ position: "relative", padding: "0 2.5rem" }}>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prev();
              }}
              className="v2-carousel-side-nav v2-carousel-side-nav-left"
              style={{ color: accentColor }}
              aria-label="Image précédente"
            >
              ‹
            </button>
            <button
              type="button"
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onTouchStart={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                next();
              }}
              className="v2-carousel-side-nav v2-carousel-side-nav-right"
              style={{ color: accentColor }}
              aria-label="Image suivante"
            >
              ›
            </button>
          </>
        )}

        <div
          ref={containerRef}
          style={{
            aspectRatio: "16/10",
            overflow: "hidden",
            position: "relative",
            background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            border: `1px solid ${accentColor}30`,
            cursor: dragging ? "grabbing" : "zoom-in",
          }}
          onClick={openFocus}
          onMouseDown={onDown}
          onMouseMove={onMove}
          onMouseUp={onUp}
          onMouseLeave={onUp}
          onTouchStart={onDown}
          onTouchMove={onMove}
          onTouchEnd={onUp}
        >
          <div
            style={{
              display: "flex",
              height: "100%",
              transform: `translateX(${translate}%)`,
              transition: dragging ? "none" : "transform 0.5s cubic-bezier(0.25,1,0.5,1)",
            }}
          >
            {images.map((src, i) => (
              <div key={`${src}-${i}`} style={{ minWidth: "100%", height: "100%", padding: "4px 6px" }}>
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image src={src} alt={`Screenshot ${i + 1}`} fill
                    className="object-cover object-top pointer-events-none" draggable={false} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-1.5 justify-center">
          {images.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{
              width: i === idx ? 18 : 6, height: 6, borderRadius: 3, border: "none",
              cursor: "pointer", background: i === idx ? accentColor : `${accentColor}40`,
              transition: "all 0.3s",
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProjectsCardsV2({ projects }: { projects: ProjectData[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const infoScrollRef = useRef<HTMLDivElement>(null);
  const tabNavRef = useRef<HTMLDivElement>(null);
  const tabPanelRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tabBtnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<"web" | "others">("web");
  const [activeProject, setActiveProject] = useState<ProjectData | null>(null);
  const [panelVisible, setPanelVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const visibleProjects = activeTab === "web" ? projects : OTHER_PROJECTS;

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  const moveIndicator = useCallback((idx: number) => {
    const btn = tabBtnRefs.current[idx];
    const nav = tabNavRef.current;
    const ind = indicatorRef.current;
    if (!btn || !nav || !ind) return;
    const navRect = nav.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    ind.style.left = `${btnRect.left - navRect.left}px`;
    ind.style.width = `${btnRect.width}px`;
  }, []);

  const changeTab = useCallback((nextTab: "web" | "others") => {
    if (nextTab === activeTab) return;
    const panel = tabPanelRef.current;
    if (!panel) {
      setActiveTab(nextTab);
      return;
    }
    panel.style.transition = "opacity 0.18s ease, transform 0.18s ease";
    panel.style.opacity = "0";
    panel.style.transform = "translateY(12px)";
    if (tabTimerRef.current) clearTimeout(tabTimerRef.current);
    tabTimerRef.current = setTimeout(() => {
      setActiveTab(nextTab);
      requestAnimationFrame(() => {
        panel.style.transition = "opacity 0.22s ease, transform 0.22s ease";
        panel.style.opacity = "1";
        panel.style.transform = "translateY(0)";
      });
    }, 165);
  }, [activeTab]);

  const openProject = (project: ProjectData) => {
    clearTimers();
    setActiveProject(project);
    setPanelVisible(false);
    setLogoVisible(false);
    setInfoVisible(false);
    requestAnimationFrame(() => setPanelVisible(true));
    timersRef.current.push(setTimeout(() => setLogoVisible(true), 180));
    timersRef.current.push(setTimeout(() => setInfoVisible(true), 680));
    requestAnimationFrame(() => {
      if (infoScrollRef.current) infoScrollRef.current.scrollTop = 0;
    });
  };

  const closeProject = useCallback(() => {
    clearTimers();
    setInfoVisible(false);
    setLogoVisible(false);
    setPanelVisible(false);
    timersRef.current.push(setTimeout(() => setActiveProject(null), 360));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px), (pointer: coarse)");
    const sync = () => setIsMobile(mq.matches);
    sync();
    if (mq.addEventListener) {
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }
    mq.addListener(sync);
    return () => mq.removeListener(sync);
  }, []);

  useEffect(() => {
    return () => clearTimers();
  }, []);

  useEffect(() => {
    const idx = activeTab === "web" ? 0 : 1;
    moveIndicator(idx);
    return () => {
      if (tabTimerRef.current) clearTimeout(tabTimerRef.current);
    };
  }, [activeTab, moveIndicator]);

  useEffect(() => {
    const onResize = () => moveIndicator(activeTab === "web" ? 0 : 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeTab, moveIndicator]);

  useEffect(() => {
    const body = document.body;
    if (!activeProject) {
      body.classList.remove("v2-project-open-card");
      body.style.removeProperty("--v2-project-open-color");
      return;
    }
    body.classList.add("v2-project-open-card");
    body.style.setProperty("--v2-project-open-color", activeProject.accentColor);
  }, [activeProject]);

  useEffect(() => {
    return () => {
      const body = document.body;
      body.classList.remove("v2-project-open-card");
      body.style.removeProperty("--v2-project-open-color");
    };
  }, []);

  useEffect(() => {
    if (!activeProject) return;
    const html = document.documentElement;
    const body = document.body;
    const saved = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
    };
    let lastTouchY = 0;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";

    const onTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      lastTouchY = touch.clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const scroller = infoScrollRef.current;
      const target = e.target as Node | null;
      if (!scroller || !target || !scroller.contains(target)) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const touch = e.touches[0];
      if (!touch) return;
      const currentY = touch.clientY;
      const deltaY = currentY - lastTouchY;
      lastTouchY = currentY;

      const canScroll = scroller.scrollHeight > scroller.clientHeight + 1;
      if (!canScroll) {
        if (e.cancelable) e.preventDefault();
        return;
      }

      const atTop = scroller.scrollTop <= 0;
      const atBottom = scroller.scrollTop + scroller.clientHeight >= scroller.scrollHeight - 1;
      if ((atTop && deltaY > 0) || (atBottom && deltaY < 0)) {
        if (e.cancelable) e.preventDefault();
      }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeProject();
    };
    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("keydown", onKey);
      html.style.overflow = saved.htmlOverflow;
      body.style.overflow = saved.bodyOverflow;
      html.style.overscrollBehavior = saved.htmlOverscrollBehavior;
      body.style.overscrollBehavior = saved.bodyOverscrollBehavior;
    };
  }, [activeProject, closeProject]);

  return (
    <MainSectionV2
      id="v2-projects"
      ref={sectionRef}
      className="relative pt-20 pb-24 md:pt-24 md:pb-28"
      style={{ background: "transparent" }}
    >
      <GlitchTitle
        text="Projets"
        color="#881111"
        triggerRef={sectionRef}
        className="v2-mega-title mb-14"
        style={{ color: "#881111" }}
        startDesktop="top 84%"
        startMobile="top 95%"
      />

      <div
        ref={tabNavRef}
        className="relative flex justify-center md:justify-start gap-1 md:gap-0 mb-10 border-b"
        style={{ borderColor: "rgba(136,17,17,0.18)" }}
      >
        <button
          type="button"
          ref={(el) => { tabBtnRefs.current[0] = el; }}
          onClick={() => changeTab("web")}
          className="px-3 sm:px-5 py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 cursor-pointer whitespace-nowrap text-center"
          style={{
            fontFamily: "'Sora',sans-serif",
            color: activeTab === "web" ? "#881111" : "rgba(45,16,16,0.45)",
            background: "transparent",
            border: "none",
            letterSpacing: "0.035em",
          }}
        >
          Web
        </button>
        <button
          type="button"
          ref={(el) => { tabBtnRefs.current[1] = el; }}
          onClick={() => changeTab("others")}
          className="px-3 sm:px-5 py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 cursor-pointer whitespace-nowrap text-center"
          style={{
            fontFamily: "'Sora',sans-serif",
            color: activeTab === "others" ? "#881111" : "rgba(45,16,16,0.45)",
            background: "transparent",
            border: "none",
            letterSpacing: "0.035em",
          }}
        >
          Autres
        </button>
        <div ref={indicatorRef} className="v2-tab-indicator" style={{ bottom: -1 }} />
      </div>

      <div
        ref={tabPanelRef}
        className="flex flex-col gap-6 md:gap-8 min-h-[12rem]"
        style={{ transition: "opacity 0.22s ease, transform 0.22s ease" }}
      >
        {visibleProjects.map((project) => {
          const cardId = `v2-project-${project.id}`;
          const projectFullTitle = project.fullTitle ?? project.title;
          const cardBg = project.bgColor;
          const titleColor = project.isDark ? "rgba(255,255,255,0.95)" : "rgba(18,13,13,0.93)";
          const textColor = project.isDark ? "rgba(255,255,255,0.68)" : "rgba(18,13,13,0.62)";
          const accent = project.accentColor;
          const previewIndex = CARD_PREVIEW_INDEX_BY_PROJECT[project.id] ?? 0;
          const cardPreview =
            project.screenshots?.[previewIndex] ??
            project.screenshots?.[0] ??
            null;
          const isRgbast = project.id === "rgbast";
          const isGgps = project.id === "ggps";
          const isPathfinder = project.id === "pathfinder";
          const isGlproject = project.id === "glproject";

          return (
            <button
              key={project.id}
              id={cardId}
              onClick={() => openProject(project)}
              className="v2-project-card group w-full text-left overflow-hidden border transition-transform duration-300 hover:-translate-y-1 relative"
              style={{
                background: cardBg,
                borderColor: `${accent}3D`,
                borderRadius: 12,
                minHeight: "clamp(11.5rem, 20vw, 15rem)",
                isolation: "isolate",
                cursor: "pointer",
              }}
            >
              {isRgbast && (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                    backgroundImage:
                      "radial-gradient(circle, rgba(38,38,38,0.22) 1.2px, transparent 1.3px), radial-gradient(circle, rgba(38,38,38,0.14) 1px, transparent 1.1px)",
                    backgroundSize: "20px 20px, 20px 20px",
                    backgroundPosition: "0 0, 10px 10px",
                    opacity: 0.36,
                  }}
                />
              )}
              {isGgps && (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                    backgroundImage:
                      "repeating-radial-gradient(140% 90% at -10% 100%, rgba(188,28,28,0.52) 0 1px, transparent 1px 12px), repeating-radial-gradient(140% 90% at -10% 100%, rgba(120,0,0,0.36) 0 1px, transparent 1px 24px)",
                    backgroundPosition: "0 0, 0 6px",
                    opacity: 0.46,
                  }}
                />
              )}
              {isPathfinder && (
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                    backgroundImage: "url('/pathfinder/pathfinder-background.png')",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center center",
                    backgroundSize: "cover",
                    opacity: 0.2,
                  }}
                />
              )}
              {isGlproject && (
                <div
                  aria-hidden="true"
                  className="v2-glproject-perspective-grid"
                  style={{ zIndex: 0, opacity: 0.44 }}
                />
              )}

              <div className="h-full flex flex-col md:block relative overflow-hidden">
                {cardPreview && (
                  <div
                    className="md:hidden relative w-full h-[58%] z-0 pointer-events-none overflow-hidden"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 58%, rgba(0,0,0,0.46) 82%, rgba(0,0,0,0) 100%)",
                      maskImage:
                        "linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.96) 58%, rgba(0,0,0,0.46) 82%, rgba(0,0,0,0) 100%)",
                    }}
                  >
                    <Image
                      src={cardPreview}
                      alt={`${projectFullTitle} aperçu`}
                      fill
                      className="object-cover object-top"
                      draggable={false}
                    />
                  </div>
                )}

                {cardPreview && (
                  <div
                    className="hidden md:block absolute inset-y-0 right-0 w-[52%] z-0 pointer-events-none"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.28) 16%, rgba(0,0,0,0.8) 24%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 100%)",
                      maskImage:
                        "linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,0.28) 16%, rgba(0,0,0,0.8) 24%, rgba(0,0,0,1) 30%, rgba(0,0,0,1) 100%)",
                    }}
                  >
                    <Image
                      src={cardPreview}
                      alt={`${projectFullTitle} aperçu`}
                      fill
                      className="object-cover object-right"
                      draggable={false}
                    />
                  </div>
                )}

                <div className="w-full md:w-[48%] flex-1 md:h-full p-3.5 md:p-6 lg:p-7 flex flex-col justify-end md:justify-center relative z-[1]">
                  <h3
                    style={{
                      fontFamily: "'Mango Grotesque','archivo-black',sans-serif",
                      fontSize: "clamp(2rem, 4.4vw, 3.4rem)",
                      lineHeight: 0.92,
                      marginBottom: "0.65rem",
                      color: titleColor,
                      textTransform: "uppercase",
                      letterSpacing: "0.035em",
                      fontWeight: 700,
                    }}
                  >
                    {project.title}
                  </h3>
                  <p
                    className="v2-project-card-desc text-[0.77rem] md:text-[0.95rem] leading-relaxed"
                    style={{ color: textColor, fontFamily: "'Sora',sans-serif" }}
                  >
                    {project.description}
                  </p>
                  <span
                    className="hidden md:inline-block mt-3 text-[0.67rem] font-semibold uppercase tracking-[0.27em] opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                    style={{ color: accent, fontFamily: "'Sora',sans-serif" }}
                  >
                    Voir plus →
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {activeProject && mounted && createPortal(
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 3900,
            background: "rgba(8,6,6,0.74)",
            backdropFilter: "blur(8px)",
            opacity: panelVisible ? 1 : 0,
            transition: "opacity 0.34s ease",
          }}
          onClick={closeProject}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              inset: 0,
              background: activeProject.bgColor,
              transform: panelVisible ? "translateY(0%)" : "translateY(108%)",
              transition: "transform 0.52s cubic-bezier(0.22,1,0.36,1)",
              overflow: "hidden",
              borderTop: `1px solid ${activeProject.accentColor}35`,
            }}
          >
            {activeProject.id === "rgbast" && (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  pointerEvents: "none",
                  backgroundImage:
                    "radial-gradient(circle, rgba(38,38,38,0.22) 1.2px, transparent 1.3px), radial-gradient(circle, rgba(38,38,38,0.14) 1px, transparent 1.1px)",
                  backgroundSize: "20px 20px, 20px 20px",
                  backgroundPosition: "0 0, 10px 10px",
                  opacity: 0.46,
                }}
              />
            )}
            {activeProject.id === "ggps" && (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  pointerEvents: "none",
                  backgroundImage:
                    "repeating-radial-gradient(140% 90% at -10% 100%, rgba(188,28,28,0.52) 0 1px, transparent 1px 12px), repeating-radial-gradient(140% 90% at -10% 100%, rgba(120,0,0,0.36) 0 1px, transparent 1px 24px)",
                  backgroundPosition: "0 0, 0 6px",
                  opacity: 0.58,
                }}
              />
            )}
            {activeProject.id === "pathfinder" && (
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  zIndex: 0,
                  pointerEvents: "none",
                  backgroundImage: "url('/pathfinder/pathfinder-background.png')",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  backgroundSize: "cover",
                  opacity: 0.24,
                }}
              />
            )}
            {activeProject.id === "glproject" && (
              <div
                aria-hidden="true"
                className="v2-glproject-perspective-grid"
                style={{ zIndex: 0, opacity: 0.3 }}
              />
            )}
            {getIconLayout(activeProject.iconType as IconType).map((icon, i) => (
              <div
                key={`${activeProject.id}-overlay-icon-${i}`}
                className={`v2-project-overlay-shape type-${activeProject.iconType}`}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: icon.x,
                  top: icon.y,
                  width: icon.size,
                  opacity: 0.22,
                  pointerEvents: "none",
                  zIndex: 1,
                  ["--v2-shape-spin-duration" as string]: `${42 + i * 9}s`,
                  ["--v2-shape-float-duration" as string]: `${11 + (i % 4) * 2.5}s`,
                  ["--v2-shape-base-rotation" as string]: `${icon.rotation ?? 0}deg`,
                  ["--v2-shape-float-y" as string]: `${i % 2 === 0 ? -10 : 10}px`,
                }}
              >
                <div className="v2-project-overlay-shape-spin">
                  <ProjectIcon type={activeProject.iconType as IconType} color={activeProject.accentColor} />
                </div>
              </div>
            ))}

            <button
              onClick={closeProject}
              style={{
                position: "absolute",
                top: 14,
                left: 14,
                width: 54,
                height: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "none",
                border: "none",
                color: activeProject.accentColor,
                fontSize: 34,
                lineHeight: 1,
                cursor: "pointer",
                zIndex: 30,
                padding: 0,
                opacity: isMobile ? (infoVisible ? 1 : 0) : 1,
                pointerEvents: isMobile ? (infoVisible ? "auto" : "none") : "auto",
                transition: "opacity 0.22s ease",
              }}
              aria-label="Retour"
            >
              <IoArrowBack />
            </button>

            {isMobile && infoVisible && (
              <div
                style={{
                  position: "absolute",
                  top: 19,
                  left: 64,
                  right: 14,
                  height: 44,
                  display: "flex",
                  alignItems: "center",
                  zIndex: 30,
                  pointerEvents: "none",
                }}
              >
                {activeProject.titleSvg ? (
                  <Image
                    src={activeProject.titleSvg}
                    alt={activeProject.title}
                    width={440}
                    height={120}
                    style={{
                      width: "min(44vw, 12.5rem)",
                      height: "auto",
                      maxHeight: "2.1rem",
                      objectFit: "contain",
                      objectPosition: "left center",
                    }}
                  />
                ) : (
                  <span
                    style={{
                      fontFamily: "'Mango Grotesque','archivo-black',sans-serif",
                      fontSize: "clamp(1.25rem, 5.3vw, 1.85rem)",
                      color: activeProject.accentColor,
                      fontWeight: 800,
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      lineHeight: 1,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {activeProject.title}
                  </span>
                )}
              </div>
            )}

            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: logoVisible && !infoVisible ? 1 : 0,
                transform: logoVisible && !infoVisible ? "translateY(0)" : "translateY(18px)",
                transition: "opacity 0.42s ease, transform 0.42s ease",
                pointerEvents: "none",
                zIndex: 8,
              }}
            >
              {activeProject.titleSvg ? (
                  <Image
                    src={activeProject.titleSvg}
                    alt={activeProject.fullTitle ?? activeProject.title}
                    width={1240}
                  height={300}
                  style={{
                    width: "min(84vw, 58rem)",
                    height: "auto",
                    maxHeight: "36vh",
                    objectFit: "contain",
                  }}
                />
              ) : (
                  <span style={{
                  fontFamily: "'Mango Grotesque','archivo-black',sans-serif",
                  fontSize: "clamp(4rem, 14vw, 10rem)",
                  color: activeProject.accentColor,
                  fontWeight: 900,
                  textTransform: "uppercase",
                  letterSpacing: "0.01em",
                  }}>
                  {isMobile ? activeProject.title : (activeProject.fullTitle ?? activeProject.title)}
                </span>
              )}
            </div>

            <div
              ref={infoScrollRef}
              className="v2-project-info-scroller"
              style={{
                position: "relative",
                zIndex: 12,
                height: "100%",
                overflowY: "auto",
                WebkitOverflowScrolling: "touch",
                overscrollBehavior: "contain",
                opacity: infoVisible ? 1 : 0,
                transform: infoVisible ? "translateY(0)" : "translateY(24px)",
                transition: "opacity 0.42s ease, transform 0.42s ease",
              }}
            >
              <div className="min-h-full md:h-full flex flex-col md:flex-row">
                <div className="w-full md:w-[44%] px-5 pt-16 pb-8 md:px-8 md:pt-10 md:pb-10 lg:px-10 flex flex-col justify-start md:justify-center shrink-0">
                  <div style={{ marginBottom: "1rem" }}>
                    <div className="hidden md:block">
                      {activeProject.titleSvg ? (
                      <Image
                        src={activeProject.titleSvg}
                        alt={activeProject.fullTitle ?? activeProject.title}
                        width={760}
                        height={210}
                        style={{
                          width: "min(36vw, 25rem)",
                          minWidth: "10rem",
                          maxWidth: "100%",
                          height: "auto",
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <h3 style={{
                        fontFamily: "'Mango Grotesque','archivo-black',sans-serif",
                        fontSize: "clamp(2.2rem, 5vw, 5.2rem)",
                        color: activeProject.accentColor,
                        fontWeight: 900,
                        textTransform: "uppercase",
                        letterSpacing: "0.01em",
                      }}>
                        {activeProject.fullTitle ?? activeProject.title}
                      </h3>
                    )}
                    </div>
                  </div>
                  <p
                    className="text-sm md:text-base leading-relaxed mb-3"
                    style={{
                      color: activeProject.isDark ? "rgba(255,255,255,0.92)" : "rgba(15,8,8,0.88)",
                      fontFamily: "'Sora',sans-serif",
                    }}
                  >
                    <span
                      className="hidden md:block text-xs font-bold uppercase tracking-[0.3em] mb-3"
                      style={{ color: activeProject.accentColor, fontFamily: "'Sora',sans-serif" }}
                    >
                      {activeProject.fullTitle ?? activeProject.title}
                    </span>
                    {activeProject.description}
                  </p>
                  <p
                    className="text-xs md:text-sm leading-relaxed mb-5"
                    style={{
                      color: activeProject.isDark ? "rgba(255,255,255,0.55)" : "rgba(15,8,8,0.6)",
                      fontFamily: "'Sora',sans-serif",
                    }}
                  >
                    {activeProject.details}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {activeProject.techStack.map((t) => (
                      <span
                        key={t}
                        className="v2-tech-pill inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium tracking-wide border"
                        style={{
                          ["--pill-accent" as string]: activeProject.accentColor,
                          color: activeProject.accentColor,
                          borderColor: activeProject.isDark
                            ? `${activeProject.accentColor}35`
                            : `${activeProject.accentColor}50`,
                          background: `${activeProject.accentColor}10`,
                          fontFamily: "'Sora',sans-serif",
                          borderRadius: 6,
                        }}
                      >
                        {TECH_ICON[t] && <span className="text-[0.9em]">{TECH_ICON[t]}</span>}
                        {t}
                      </span>
                    ))}
                  </div>
                  {activeProject.link && (
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="v2-project-info-link hidden md:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-70"
                      style={{
                        color: activeProject.accentColor,
                        ["--v2-link-accent" as string]: activeProject.accentColor,
                        fontFamily: "'Sora',sans-serif",
                      }}
                    >
                      {activeProject.linkText ?? "Voir le projet"} →
                    </a>
                  )}
                </div>
                <div className="w-full md:w-[56%] px-4 pb-8 md:px-8 md:pt-10 md:pb-10 flex flex-col items-start md:items-center md:justify-center shrink-0">
                  <div style={{ width: "100%" }}>
                    {activeProject.screenshots && activeProject.screenshots.length > 0 ? (
                      <Carousel
                        images={activeProject.screenshots}
                        accentColor={activeProject.accentColor}
                        isDark={activeProject.isDark}
                      />
                    ) : (
                      <div
                        style={{
                          width: "100%",
                          aspectRatio: "16/10",
                          border: `1px solid ${activeProject.accentColor}25`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span
                          style={{
                            color: `${activeProject.accentColor}40`,
                            fontFamily: "'Sora',sans-serif",
                            fontSize: 12,
                          }}
                        >
                          — aperçu bientôt —
                        </span>
                      </div>
                    )}
                  </div>
                  {activeProject.link && (
                    <div className="mt-4 md:hidden">
                      <a
                        href={activeProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="v2-project-info-link v2-project-info-link-mobile inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-70"
                        style={{
                          color: activeProject.accentColor,
                          ["--v2-link-accent" as string]: activeProject.accentColor,
                          fontFamily: "'Sora',sans-serif",
                        }}
                      >
                        {activeProject.linkText ?? "Voir le projet"} →
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </MainSectionV2>
  );
}
