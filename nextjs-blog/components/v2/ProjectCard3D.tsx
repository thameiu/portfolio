"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  SiNextdotjs, SiExpress, SiTypescript, SiSupabase, SiDocker, SiJenkins, SiJest, SiVite,
  SiFastapi, SiSqlalchemy, SiGithubactions, SiNginx, SiLeaflet, SiLaravel, SiPhp, SiPostgresql,
  SiNestjs, SiSocketdotio, SiVuedotjs,
} from "react-icons/si";

const PROJECT_PIN_DISTANCE = 1800;
const PROJECT_PIN_DISTANCE_MOBILE_FACTOR = 1.35;
export const PROJECT_OVERLAP = 650;
const PROJECT_OVERLAP_MOBILE = 240;

/* ═══════════════════════════════════════════════
   ICONS
   ═══════════════════════════════════════════════ */

/* RGBast — scroll-driven spinning circles */
const CirclesIcon = ({ color, spinRef }: { color: string; spinRef?: (el: SVGGElement | null) => void }) => (
  <svg viewBox="0 0 280 280" fill="none" style={{ overflow: "visible" }}>
    <g
      ref={spinRef}
      style={{
        transformBox: "fill-box" as React.CSSProperties["transformBox"],
        transformOrigin: "center",
      } as React.CSSProperties}
    >
      <circle cx="100" cy="150" r="80" stroke={color} strokeWidth="1.5"/>
      <circle cx="180" cy="150" r="80" stroke={color} strokeWidth="1.5"/>
      <circle cx="140" cy="80"  r="80" stroke={color} strokeWidth="1.5"/>
    </g>
  </svg>
);

/* 2Clock — static tick ring, scroll-driven spinning hands */
const ClockIcon = ({ color, spinRef }: { color: string; spinRef?: (el: SVGGElement | null) => void }) => (
  <svg viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="54" stroke={color} strokeWidth="1.5" opacity="0.4"/>
    {Array.from({ length: 60 }, (_, i) => {
      const angle   = (i * 6) * Math.PI / 180;
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
    <g
      ref={spinRef}
    >
      <line x1="60" y1="60" x2="60" y2="22" stroke={color} strokeWidth="4" strokeLinecap="round"/>
      <line x1="60" y1="60" x2="88" y2="72" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
    </g>
    <circle cx="60" cy="60" r="5" fill={color}/>
  </svg>
);

/* Pathfinder — 7 concentric semicircles */
const PathfinderIcon = ({ color, spinRef }: { color: string; spinRef?: (el: SVGGElement | null) => void }) => {
  const cx = 350;
  const cy = 220;
  const startAngle = (300 * Math.PI) / 180;
  const endAngle = (60 * Math.PI) / 180;
  const radii = [52, 84, 128, 174, 228, 282, 336];
  return (
    <svg viewBox="0 0 700 420" fill="none" style={{ overflow: "visible" }}>
      <g ref={spinRef}>
      {radii.map((r, i) => {
        const x1 = cx + r * Math.cos(startAngle);
        const y1 = cy + r * Math.sin(startAngle);
        const x2 = cx + r * Math.cos(endAngle);
        const y2 = cy + r * Math.sin(endAngle);
        return (
          <g key={i} data-path-ring={i}>
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
      </g>
    </svg>
  );
};

/* GGPS — controller.svg image */
const ControllerSvgIcon = () => (
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

type IconType = "circles" | "clock" | "satellite" | "controller";

function ProjectIcon({
  type,
  color,
  spinRef,
}: {
  type: IconType;
  color: string;
  spinRef?: (el: SVGGElement | null) => void;
}) {
  if (type === "circles")    return <CirclesIcon   color={color} spinRef={spinRef}/>;
  if (type === "clock")      return <ClockIcon     color={color} spinRef={spinRef}/>;
  if (type === "satellite")  return <PathfinderIcon color={color} spinRef={spinRef}/>;
  return <ControllerSvgIcon />;
}

/* ═══════════════════════════════════════════════
   ICON LAYOUTS  (per project type)
   ═══════════════════════════════════════════════ */
interface IconPos { x: string; y: string; size: string; rotation?: number }

function getIconLayout(iconType: IconType): IconPos[] {
  if (iconType === "clock") {
    return [
      { x: "10%", y: "10%", size: "min(30vw,360px)" },
      { x: "44%", y: "4%",  size: "min(30vw,360px)" },
      { x: "70%", y: "36%", size: "min(30vw,360px)" },
    ];
  }
  if (iconType === "controller") {
    return [
      { x: "8%",  y: "3%",  size: "min(20vw,260px)", rotation: -18 },
      { x: "44%", y: "0%",  size: "min(20vw,260px)", rotation: 28  },
      { x: "74%", y: "18%", size: "min(20vw,260px)", rotation: -36 },
      { x: "18%", y: "58%", size: "min(20vw,260px)", rotation: 42  },
      { x: "58%", y: "64%", size: "min(20vw,260px)", rotation: -22 },
    ];
  }
  if (iconType === "satellite") {
    return [
      { x: "46%", y: "43%", size: "min(78vw,920px)" },
    ];
  }
  /* circles — two thin icons for RGBast */
  return [
    { x: "8%",  y: "6%",  size: "min(44vw,540px)" },
    { x: "54%", y: "40%", size: "min(44vw,540px)" },
  ];
}

/* ═══════════════════════════════════════════════
   CAROUSEL  (CSS-driven · drag · lightbox)
   ═══════════════════════════════════════════════ */
function Carousel({ images, accentColor, isDark }: {
  images: string[]; accentColor: string; isDark: boolean;
}) {
  const [idx,           setIdx]   = useState(0);
  const [translate,     setTrans] = useState(0);
  const [prevTrans,     setPrev]  = useState(0);
  const [dragging,      setDrag]  = useState(false);
  const [focused,       setFocus] = useState(false);
  const [focusVisible,  setFocusVisible] = useState(false);
  const [transitioning, setTr]   = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startXRef    = useRef(0);
  const didDragRef   = useRef(false);
  const idxRef       = useRef(0);
  const lockRef      = useRef(false);
  const trTimerRef   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const focusOverlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    idxRef.current = idx;
    setPrev(-idx * 100);
    setTrans(-idx * 100);
  }, [idx]);

  const go = useCallback((n: number) => {
    if (lockRef.current) return;
    lockRef.current = true;
    setTr(true);
    setIdx(((n % images.length) + images.length) % images.length);
    if (trTimerRef.current) clearTimeout(trTimerRef.current);
    trTimerRef.current = setTimeout(() => {
      lockRef.current = false;
      setTr(false);
    }, 520);
  }, [images.length]);

  const prev = () => go(idxRef.current - 1);
  const next = () => go(idxRef.current + 1);

  const getX = (e: React.MouseEvent | React.TouchEvent) =>
    "touches" in e ? e.touches[0].clientX : e.clientX;

  const onDown = (e: React.MouseEvent | React.TouchEvent) => {
    if (lockRef.current) return;
    startXRef.current  = getX(e);
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
    if      (moved < -12 && idx < images.length - 1) go(idx + 1);
    else if (moved >  12 && idx > 0)                 go(idx - 1);
    else                                              setTrans(prevTrans);
  };

  const openFocus = () => {
    if (didDragRef.current) return;
    setFocus(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setFocusVisible(true)));
  };

  const closeFocus = () => {
    setFocusVisible(false);
    setTimeout(() => setFocus(false), 300);
  };

  useEffect(() => {
    if (!focused) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")     closeFocus();
      if (e.key === "ArrowLeft")  { e.preventDefault(); prev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); next(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focused]);

  useEffect(() => {
    if (!focused) return;

    const html = document.documentElement;
    const body = document.body;
    const saved = {
      htmlOverflow: html.style.overflow,
      bodyOverflow: body.style.overflow,
      htmlOverscrollBehavior: html.style.overscrollBehavior,
      bodyOverscrollBehavior: body.style.overscrollBehavior,
      htmlTouchAction: html.style.touchAction,
      bodyTouchAction: body.style.touchAction,
    };

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overscrollBehavior = "none";
    html.style.touchAction = "none";
    body.style.touchAction = "none";

    const preventScroll = (e: Event) => {
      const overlay = focusOverlayRef.current;
      const target = e.target as Node | null;
      if (!overlay || !target || !overlay.contains(target)) {
        e.preventDefault();
        return;
      }
      // In the focus overlay, carousel gestures are handled manually.
      e.preventDefault();
    };

    window.addEventListener("wheel", preventScroll, { passive: false, capture: true });
    window.addEventListener("touchmove", preventScroll, { passive: false, capture: true });

    return () => {
      window.removeEventListener("wheel", preventScroll, true);
      window.removeEventListener("touchmove", preventScroll, true);
      html.style.overflow = saved.htmlOverflow;
      body.style.overflow = saved.bodyOverflow;
      html.style.overscrollBehavior = saved.htmlOverscrollBehavior;
      body.style.overscrollBehavior = saved.bodyOverscrollBehavior;
      html.style.touchAction = saved.htmlTouchAction;
      body.style.touchAction = saved.bodyTouchAction;
    };
  }, [focused]);

  useEffect(() => {
    return () => {
      if (trTimerRef.current) clearTimeout(trTimerRef.current);
    };
  }, []);

  if (!images.length) return null;

  const trackStyle = (t: number): React.CSSProperties => ({
    display: "flex", height: "100%",
    transform: `translateX(${t}%)`,
    transition: dragging ? "none" : "transform 0.5s cubic-bezier(0.25,1,0.5,1)",
    willChange: "transform",
  });

  const arrowStyle = (side: "left" | "right"): React.CSSProperties => ({
    position: "absolute", [side]: 16, top: "50%", transform: "translateY(-50%)",
    zIndex: 20, background: "rgba(0,0,0,0.5)", border: `1px solid ${accentColor}70`,
    color: accentColor, width: 48, height: 48,
    display: "flex", alignItems: "center", justifyContent: "center",
    borderRadius: "50%", cursor: "pointer", fontSize: 24, lineHeight: 1,
    transition: "background 0.2s",
  });

  return (
    <div className="w-full flex flex-col gap-3 select-none">

      {/* ── lightbox ── */}
      {focused && (
        <div
          ref={focusOverlayRef}
          style={{
            position: "fixed", inset: 0, zIndex: 2000,
            background: "rgba(0,0,0,0.94)", backdropFilter: "blur(12px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            opacity: focusVisible ? 1 : 0,
            transform: focusVisible ? "scale(1)" : "scale(1.025)",
            transition: "opacity 0.38s ease-in-out, transform 0.38s ease-in-out",
          }}
          onClick={closeFocus}
        >
          <div style={{ position: "relative", width: "100vw", height: "100vh", padding: "6vh 5vw" }}
               onClick={e => e.stopPropagation()}>
            <button onClick={closeFocus} style={{
              position: "absolute", top: 24, right: 28,
              background: "none", border: "none", color: accentColor,
              fontSize: 26, cursor: "pointer", zIndex: 10, fontFamily: "sans-serif",
            }}>✕</button>

            <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
              {images.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); prev(); }}
                  style={arrowStyle("left") as React.CSSProperties}>‹</button>
              )}
              <div style={trackStyle(translate)}
                onMouseDown={onDown} onMouseMove={onMove}
                onMouseUp={onUp}    onMouseLeave={onUp}
                onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}>
                {images.map((src, i) => (
                  <div key={src} style={{ minWidth: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ position: "relative", width: "100%", height: "100%" }}>
                      <Image src={src} alt={`Screenshot ${i+1}`} fill
                        className="object-contain pointer-events-none" draggable={false}/>
                    </div>
                  </div>
                ))}
              </div>
              {images.length > 1 && (
                <button onClick={(e) => { e.stopPropagation(); next(); }}
                  style={arrowStyle("right") as React.CSSProperties}>›</button>
              )}
            </div>

            <div style={{ position: "absolute", bottom: 24, left: 0, right: 0, display: "flex", gap: 6, justifyContent: "center" }}>
              {images.map((_, i) => (
                <div key={i} onClick={() => go(i)} style={{
                  width: i === idx ? 24 : 6, height: 6, borderRadius: 3,
                  background: i === idx ? accentColor : `${accentColor}50`,
                  cursor: "pointer", transition: "all 0.3s",
                }}/>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── main carousel with side navigation ── */}
      <div style={{ position: "relative", padding: "0 2.5rem" }}>
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="v2-carousel-side-nav v2-carousel-side-nav-left"
              style={{ color: accentColor }}
              aria-label="Image précédente"
            >
              ‹
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
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
            aspectRatio: "16/10", overflow: "hidden", position: "relative",
            background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)",
            border: `1px solid ${accentColor}30`,
            cursor: dragging ? "grabbing" : "zoom-in",
          }}
          onClick={openFocus}
          onMouseDown={onDown} onMouseMove={onMove}
          onMouseUp={onUp}    onMouseLeave={onUp}
          onTouchStart={onDown} onTouchMove={onMove} onTouchEnd={onUp}
        >
          <div style={trackStyle(translate)}>
            {images.map((src, i) => (
              <div key={src} style={{ minWidth: "100%", height: "100%", padding: "4px 6px" }}>
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  <Image src={src} alt={`Screenshot ${i+1}`} fill
                    className="object-cover object-top pointer-events-none" draggable={false}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── indicators ── */}
      {images.length > 1 && (
        <div className="flex gap-1.5 justify-center">
          {images.map((_, i) => (
            <button key={i} onClick={() => go(i)} style={{
              width: i === idx ? 18 : 6, height: 6, borderRadius: 3, border: "none",
              cursor: "pointer", background: i === idx ? accentColor : `${accentColor}40`,
              transition: "all 0.3s",
            }}/>
          ))}
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PROJECT DATA TYPE
   ═══════════════════════════════════════════════ */
export interface ProjectData {
  id: string; title: string; titleSvg?: string;
  description: string; details: string; techStack: string[];
  bgColor: string; accentColor: string; isDark: boolean;
  iconType: IconType; screenshots?: string[];
  link?: string; linkText?: string;
}

const activeProjectStates = new Set<string>();

function setProjectActive(key: string, active: boolean) {
  if (active) activeProjectStates.add(key);
  else activeProjectStates.delete(key);
  document.body.classList.toggle("v2-project-active", activeProjectStates.size > 0);
}

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
};

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════ */
export default function ProjectCard3D({ project, index }: { project: ProjectData; index: number }) {
  const sectionRef   = useRef<HTMLElement>(null);
  const panelRef     = useRef<HTMLDivElement>(null);
  const hugeTitleRef = useRef<HTMLDivElement>(null);
  const logoRef      = useRef<HTMLDivElement>(null);
  const contentRef   = useRef<HTMLDivElement>(null);
  const carouselRef  = useRef<HTMLDivElement>(null);
  const decorRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const spinRefs     = useRef<(SVGGElement | null)[]>([]);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const iconLayout = getIconLayout(project.iconType);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
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
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setPrefersReducedMotion(mq.matches);
    sync();
    if (mq.addEventListener) {
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }
    mq.addListener(sync);
    return () => mq.removeListener(sync);
  }, []);

  /* ScrollTrigger animation */
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const useSimplifiedMotion = prefersReducedMotion;
    const layoutForMotion = getIconLayout(project.iconType);

    const ctx = gsap.context(() => {
      gsap.set(hugeTitleRef.current, { opacity: 0 });
      if (useSimplifiedMotion) {
        gsap.set(logoRef.current,     { opacity: 0, y: 16 });
        gsap.set(contentRef.current,  { opacity: 0, y: 16 });
        gsap.set(carouselRef.current, { opacity: 0, y: 16 });
        gsap.set(decorRefs.current,   { opacity: 0.08 });

        decorRefs.current.forEach((el, i) => {
          if (!el) return;
          const baseRot = layoutForMotion[i]?.rotation ?? 0;
          gsap.set(el, { rotate: baseRot });
          gsap.to(el, {
            y: (i % 2 === 0 ? -1 : 1) * (7 + (i % 3) * 2),
            x: (i % 2 === 0 ? 1 : -1) * (4 + (i % 2) * 2),
            duration: 4.6 + i * 0.3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

        const reveal = gsap.timeline({ paused: true })
          .to([logoRef.current, contentRef.current, carouselRef.current], {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power2.out",
            stagger: 0.06,
          });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 78%",
          end: "bottom 18%",
          onEnter:     () => { setProjectActive(`${project.id}-pin`, true); reveal.play(); },
          onEnterBack: () => { setProjectActive(`${project.id}-pin`, true); reveal.play(); },
          onLeave:     () => setProjectActive(`${project.id}-pin`, false),
          onLeaveBack: () => setProjectActive(`${project.id}-pin`, false),
        });
      } else {
        gsap.set(logoRef.current,      { opacity: 0 });
        gsap.set(contentRef.current,   { opacity: 0 });
        gsap.set(carouselRef.current,  { opacity: 0 });
        gsap.set(decorRefs.current,    { opacity: 0 });

        /* Floating icons */
        decorRefs.current.forEach((el, i) => {
          if (!el) return;
          const baseRot  = layoutForMotion[i]?.rotation ?? 0;
          if (isMobile) {
            gsap.set(el, { rotate: baseRot });
            return;
          }
          const floatRot = (i % 2 === 0 ? 1 : -1) * (8 + (i % 3) * 2);
          gsap.set(el, { rotate: baseRot });
          gsap.to(el, {
            y: (i % 2 === 0 ? -1 : 1) * (10 + (i % 3) * 4),
            x: (i % 2 === 0 ?  1 : -1) * (6  + (i % 4) * 3),
            rotate: baseRot + floatRot,
            duration: 3.8 + i * 0.35,
            repeat: -1, yoyo: true, ease: "sine.inOut",
          });
        });

        /* Main scrubbed trigger — pin the section itself */
        const pinDistance = isMobile
          ? Math.round(window.innerHeight * PROJECT_PIN_DISTANCE_MOBILE_FACTOR)
          : PROJECT_PIN_DISTANCE;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${pinDistance}`,
          pin: sectionRef.current,
          pinSpacing: true,
          scrub: isMobile ? true : 1,
          anticipatePin: 0,
          onRefresh: () => {
            const spacer = sectionRef.current?.parentElement;
            if (spacer) {
              spacer.style.background = project.bgColor;
              spacer.style.marginBottom = "0px";
            }
          },
          onEnter:     () => setProjectActive(`${project.id}-pin`, true),
          onEnterBack: () => setProjectActive(`${project.id}-pin`, true),
          onLeave:     () => setProjectActive(`${project.id}-pin`, false),
          onLeaveBack: () => setProjectActive(`${project.id}-pin`, false),
          onUpdate: (self) => {
            const p = self.progress;

            /* Big logo appears early during cover, then fades out before info. */
            const hugeIn  = gsap.utils.clamp(0, 1, (p - 0.10) / 0.07);
            const hugeOut = gsap.utils.clamp(0, 1, (p - 0.30) / 0.08);
            gsap.set(hugeTitleRef.current, { opacity: hugeIn * (1 - hugeOut) });

            /* Info appears after cover is established, then stays fixed while next covers. */
            const info = gsap.utils.clamp(0, 1, (p - 0.34) / 0.06);
            gsap.set(logoRef.current,    { opacity: info });
            gsap.set(contentRef.current, { opacity: info });
            gsap.set(carouselRef.current,{ opacity: info });
            gsap.set(decorRefs.current,  { opacity: info * 0.24 });

            /* Scroll-reactive background motion */
            if (isMobile) {
              // Keep mobile background stable to prevent visual jitter.
              decorRefs.current.forEach(el => {
                if (!el) return;
                gsap.set(el, { x: 0, y: 0, overwrite: "auto" });
              });

              if (project.iconType === "clock") {
                spinRefs.current.forEach(el => {
                  if (el) el.setAttribute("transform", `rotate(${p * 90} 60 60)`);
                });
              } else if (project.iconType === "circles") {
                spinRefs.current.forEach(el => {
                  if (el) el.style.transform = `rotate(${p * 45}deg)`;
                });
              } else if (project.iconType === "satellite") {
                const speed = [26, -34, 20, -28, 16, -22, 30];
                spinRefs.current.forEach(el => {
                  if (!el) return;
                  const rings = el.querySelectorAll("[data-path-ring]");
                  rings.forEach((ring, i) => {
                    const angle = p * speed[i % speed.length];
                    (ring as SVGGElement).setAttribute("transform", `rotate(${angle} 350 220)`);
                  });
                });
              }
            } else {
              if (project.iconType === "clock") {
                spinRefs.current.forEach(el => {
                  if (el) el.setAttribute("transform", `rotate(${p * 360} 60 60)`);
                });
              } else if (project.iconType === "circles") {
                spinRefs.current.forEach(el => {
                  if (el) el.style.transform = `rotate(${p * 180}deg)`;
                });
              } else if (project.iconType === "satellite") {
                const speed = [110, -160, 80, -130, 60, -95, 140];
                spinRefs.current.forEach(el => {
                  if (!el) return;
                  const rings = el.querySelectorAll("[data-path-ring]");
                  rings.forEach((ring, i) => {
                    const angle = p * speed[i % speed.length];
                    (ring as SVGGElement).setAttribute("transform", `rotate(${angle} 350 220)`);
                  });
                });
              }
            }
          },
        });
      }

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onEnter:     () => setProjectActive(`${project.id}-viewport`, true),
        onEnterBack: () => setProjectActive(`${project.id}-viewport`, true),
        onLeave:     () => setProjectActive(`${project.id}-viewport`, false),
        onLeaveBack: () => setProjectActive(`${project.id}-viewport`, false),
      });

    }, sectionRef);

    return () => {
      setProjectActive(`${project.id}-pin`, false);
      setProjectActive(`${project.id}-viewport`, false);
      ctx.revert();
    };
  }, [isMobile, prefersReducedMotion, project.bgColor, project.iconType, project.id]);

  const { isDark, accentColor, bgColor } = project;
  const textPrimary = isDark ? "rgba(255,255,255,0.92)" : "rgba(15,8,8,0.88)";
  const textMuted   = isDark ? "rgba(255,255,255,0.52)" : "rgba(15,8,8,0.50)";
  const borderCol   = isDark ? `${accentColor}35`       : `${accentColor}50`;
  const isRgbast = project.id === "rgbast";
  const isGgps = project.id === "ggps";
  const isPathfinder = project.id === "pathfinder";
  const useSimplifiedMotion = prefersReducedMotion;
  const projectOverlap = isMobile ? PROJECT_OVERLAP_MOBILE : PROJECT_OVERLAP;

  return (
    <section
      ref={sectionRef}
      id={`v2-project-${project.id}`}
      className="min-h-screen"
      style={{
        height: useSimplifiedMotion ? "auto" : "100vh",
        minHeight: "100vh",
        position: "relative",
        overflow: useSimplifiedMotion ? "visible" : "hidden",
        zIndex: 10 + index,
        background: bgColor,
        marginTop: useSimplifiedMotion ? 0 : -projectOverlap,
      }}
    >
      <div ref={panelRef}
        style={{
          position: "relative",
          height: useSimplifiedMotion ? "auto" : "100%",
          minHeight: "100vh",
          overflow: useSimplifiedMotion ? "visible" : "hidden",
          background: bgColor,
        }}>

        {/* Project-specific subtle backdrops */}
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
              opacity: 0.46,
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
              opacity: 0.58,
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
              opacity: 0.24,
            }}
          />
        )}

        {/* Floating background icons */}
        {iconLayout.map((icon, i) => (
          <div
            key={`${project.id}-icon-${i}`}
            ref={el => { decorRefs.current[i] = el; }}
            style={{
              position: "absolute", left: icon.x, top: icon.y,
              width: icon.size, opacity: 0,
              pointerEvents: "none", zIndex: 1, overflow: "visible",
            }}
          >
            <ProjectIcon
              type={project.iconType}
              color={accentColor}
              spinRef={el => { spinRefs.current[i] = el; }}
            />
          </div>
        ))}

        {/* Big centered title — logo appears at 50%, info appears during fade-out */}
        {!useSimplifiedMotion && (
          <div ref={hugeTitleRef} style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0, zIndex: 3, pointerEvents: "none",
            textAlign: "center", width: "100%", height: "100%",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {project.titleSvg ? (
              <Image src={project.titleSvg} alt={project.title}
                width={1200} height={300}
                style={{ width: "min(78vw, 920px)", height: "auto", maxHeight: "42vh", objectFit: "contain" }}/>
            ) : (
              <span style={{
                fontFamily: "'Mango Grotesque','archivo-black',sans-serif",
                fontSize: "clamp(5rem, 16vw, 17rem)", color: accentColor,
                fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.01em",
                display: "block",
              }}>{project.title}</span>
            )}
          </div>
        )}

        {/* Layout */}
        <div style={{
          position: useSimplifiedMotion ? "relative" : "absolute",
          inset: useSimplifiedMotion ? undefined : 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          zIndex: 6,
        }}>

          {/* Left column */}
          <div style={{
            flex: isMobile ? "0 0 auto" : "0 0 42%",
            display: "flex",
            flexDirection: "column",
            justifyContent: isMobile ? "flex-end" : "center",
            paddingLeft: isMobile ? "6vw" : "8vw",
            paddingRight: isMobile ? "6vw" : "3vw",
            paddingTop: isMobile ? "10vh" : "0",
            paddingBottom: isMobile ? "14vh" : "0",
          }}>
            {/* Small logo */}
            <div ref={logoRef} style={{ opacity: 0, marginBottom: "1.5rem", display: "inline-block" }}>
              {project.titleSvg ? (
                <Image src={project.titleSvg} alt={project.title}
                  width={760} height={210}
                  style={{ width: "min(32vw,22rem)", minWidth: "10rem", height: "auto", objectFit: "contain" }}/>
              ) : (
                <span style={{
                  fontFamily: "'Mango Grotesque','archivo-black',sans-serif",
                  fontSize: "clamp(2.2rem,5vw,6rem)", color: accentColor,
                  fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.01em",
                }}>{project.title}</span>
              )}
            </div>

            {/* Textual content */}
            <div ref={contentRef} style={{ opacity: 0 }}>
              <span className="block text-xs font-bold uppercase tracking-[0.3em] mb-4"
                style={{ color: accentColor, fontFamily: "'Sora',sans-serif" }}>
                {String(index + 1).padStart(2, "0")} /
              </span>
              <p className="text-sm md:text-base leading-relaxed mb-3"
                style={{ color: textPrimary, fontFamily: "'Sora',sans-serif" }}>
                {project.description}
              </p>
              <p className="text-xs leading-relaxed mb-5"
                style={{ color: textMuted, fontFamily: "'Sora',sans-serif" }}>
                {project.details}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techStack.map(t => (
                  <span key={t} className="v2-tech-pill inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium tracking-wide border"
                    style={{ color: accentColor, borderColor: borderCol, background: `${accentColor}10`, fontFamily: "'Sora',sans-serif", borderRadius: 6, ["--pill-accent" as string]: accentColor }}>
                    {TECH_ICON[t] && <span className="text-[0.9em]">{TECH_ICON[t]}</span>}
                    {t}
                  </span>
                ))}
              </div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest border-b pb-0.5 transition-opacity hover:opacity-70"
                  style={{ color: accentColor, borderColor: accentColor, fontFamily: "'Sora',sans-serif" }}>
                  {project.linkText ?? "Voir le projet"} →
                </a>
              )}
            </div>
          </div>

          {/* Right column — carousel */}
          <div ref={carouselRef}
            style={{
              flex: isMobile ? "0 0 auto" : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingRight: isMobile ? "6vw" : "6vw",
              paddingLeft: isMobile ? "6vw" : "2vw",
              paddingBottom: isMobile ? "6vh" : "0",
              opacity: 0,
            }}>
            {project.screenshots && project.screenshots.length > 0 ? (
              <div style={{ width: "100%", maxWidth: isMobile ? "100%" : 520 }}>
                <Carousel images={project.screenshots} accentColor={accentColor} isDark={isDark}/>
              </div>
            ) : (
              <div style={{
                width: "100%", maxWidth: 520, aspectRatio: "16/10",
                border: `1px solid ${accentColor}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ color: `${accentColor}40`, fontFamily: "'Sora',sans-serif", fontSize: 12 }}>
                  — aperçu bientôt —
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
