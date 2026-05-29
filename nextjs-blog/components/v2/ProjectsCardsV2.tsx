"use client";
import {
    useEffect,
    useRef,
    useState,
    useCallback,
    type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { IoArrowBack, IoClose } from "react-icons/io5";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    getProjectCardPreviewIndex,
    getProjectIconLayout,
    getProjectVisualStyle,
} from "./projets";
import ProjectBackdropLayer from "./projets/ProjectBackdropLayer";
import ProjectImageWithSkeleton from "./projets/ProjectImageWithSkeleton";
import StoryBlockView from "./projets/StoryBlockView";
import { TECH_ICON } from "./projets/techIcons";
import type { IconType, ProjectData } from "./projets/types";
import GlitchTitle from "./GlitchTitle";
import MainSectionV2 from "./MainSectionV2";

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
        // Story temporairement désactivée (hors RGBast).
        story: [],
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
        <circle
            cx="60"
            cy="60"
            r="54"
            stroke={color}
            strokeWidth="1.5"
            opacity="0.4"
        />
        {Array.from({ length: 60 }, (_, i) => {
            const angle = (i * 6 * Math.PI) / 180;
            const isMajor = i % 5 === 0;
            const r1 = isMajor ? 38 : 43;
            const r2 = 50;
            return (
                <line
                    key={i}
                    x1={60 + r1 * Math.sin(angle)}
                    y1={60 - r1 * Math.cos(angle)}
                    x2={60 + r2 * Math.sin(angle)}
                    y2={60 - r2 * Math.cos(angle)}
                    stroke={color}
                    strokeWidth={isMajor ? 2.5 : 1}
                    strokeLinecap="round"
                />
            );
        })}
        <g className="v2-clock-minute-arm">
            <line
                x1="60"
                y1="60"
                x2="60"
                y2="22"
                stroke={color}
                strokeWidth="4"
                strokeLinecap="round"
            />
        </g>
        <g className="v2-clock-hour-arm">
            <line
                x1="60"
                y1="60"
                x2="88"
                y2="72"
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
            />
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
                            ["--v2-path-ring-spin-direction" as string]:
                                i % 2 === 0 ? "normal" : "reverse",
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
    <div
        style={{ position: "relative", width: "100%", aspectRatio: "150/110" }}
    >
        <ProjectImageWithSkeleton
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
        <polygon
            points="180,24 44,92 180,160 316,92"
            stroke={color}
            strokeWidth="2.4"
            fill="none"
        />
        <polygon
            points="44,92 44,228 180,296 180,160"
            stroke={color}
            strokeWidth="2.4"
            fill="none"
        />
        <polygon
            points="316,92 316,228 180,296 180,160"
            stroke={color}
            strokeWidth="2.4"
            fill="none"
        />
    </svg>
);

function ProjectIcon({ type, color }: { type: IconType; color: string }) {
    if (type === "circles") return <CirclesIcon color={color} />;
    if (type === "clock") return <ClockIcon color={color} />;
    if (type === "satellite") return <PathfinderIcon color={color} />;
    if (type === "cubegrid") return <GLCubeGridIcon color={color} />;
    return <ControllerIcon />;
}

function Carousel({
    images,
    accentColor,
    isDark,
    skeletonColor,
}: {
    images: string[];
    accentColor: string;
    isDark: boolean;
    skeletonColor?: string;
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

    const go = useCallback(
        (n: number) => {
            setIdx(((n % images.length) + images.length) % images.length);
        },
        [images.length],
    );

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
        requestAnimationFrame(() =>
            requestAnimationFrame(() => setFocusVisible(true)),
        );
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
        body.classList.add("v2-carousel-focus-active");
        html.style.overflow = "hidden";
        body.style.overflow = "hidden";
        return () => {
            body.classList.remove("v2-carousel-focus-active");
            html.style.overflow = savedHtmlOverflow;
            body.style.overflow = savedBodyOverflow;
        };
    }, [focused]);

    useEffect(() => {
        if (!focused) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeFocus();
            if (e.key === "ArrowLeft") {
                e.preventDefault();
                prev();
            }
            if (e.key === "ArrowRight") {
                e.preventDefault();
                next();
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [focused]);

    if (!images.length) return null;

    const focusOverlay =
        focused && mounted
            ? createPortal(
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
                          style={{
                              width: "100%",
                              height: "100%",
                              padding: "7vh 5vw",
                          }}
                          onClick={(e) => e.stopPropagation()}
                      >
                          <div
                              style={{
                                  width: "100%",
                                  height: "100%",
                                  overflow: "hidden",
                                  position: "relative",
                              }}
                          >
                              {images.length > 1 && (
                                  <button
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          prev();
                                      }}
                                      style={{
                                          position: "absolute",
                                          left: 14,
                                          top: "50%",
                                          transform: "translateY(-50%)",
                                          zIndex: 20,
                                          background: "rgba(0,0,0,0.5)",
                                          border: `1px solid ${accentColor}70`,
                                          color: accentColor,
                                          width: 44,
                                          height: 44,
                                          borderRadius: "50%",
                                          cursor: "pointer",
                                          fontSize: 24,
                                          lineHeight: 1,
                                      }}
                                  >
                                      ‹
                                  </button>
                              )}
                              <div
                                  style={{
                                      display: "flex",
                                      height: "100%",
                                      transform: `translateX(${translate}%)`,
                                      transition: dragging
                                          ? "none"
                                          : "transform 0.5s cubic-bezier(0.25,1,0.5,1)",
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
                                      <div
                                          key={`${src}-${i}`}
                                          style={{
                                              minWidth: "100%",
                                              height: "100%",
                                              position: "relative",
                                          }}
                                      >
                                          <ProjectImageWithSkeleton
                                              src={src}
                                              alt={`Screenshot ${i + 1}`}
                                              fill
                                              skeletonColor={skeletonColor}
                                              className="object-contain pointer-events-none"
                                              draggable={false}
                                          />
                                      </div>
                                  ))}
                              </div>
                              {images.length > 1 && (
                                  <button
                                      onClick={(e) => {
                                          e.stopPropagation();
                                          next();
                                      }}
                                      style={{
                                          position: "absolute",
                                          right: 14,
                                          top: "50%",
                                          transform: "translateY(-50%)",
                                          zIndex: 20,
                                          background: "rgba(0,0,0,0.5)",
                                          border: `1px solid ${accentColor}70`,
                                          color: accentColor,
                                          width: 44,
                                          height: 44,
                                          borderRadius: "50%",
                                          cursor: "pointer",
                                          fontSize: 24,
                                          lineHeight: 1,
                                      }}
                                  >
                                      ›
                                  </button>
                              )}
                          </div>
                      </div>
                  </div>,
                  document.body,
              )
            : null;

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
                        background: isDark
                            ? "rgba(255,255,255,0.04)"
                            : "rgba(0,0,0,0.04)",
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
                            transition: dragging
                                ? "none"
                                : "transform 0.5s cubic-bezier(0.25,1,0.5,1)",
                        }}
                    >
                        {images.map((src, i) => (
                            <div
                                key={`${src}-${i}`}
                                style={{
                                    minWidth: "100%",
                                    height: "100%",
                                    padding: "4px 6px",
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        height: "100%",
                                    }}
                                >
                                    <ProjectImageWithSkeleton
                                        src={src}
                                        alt={`Screenshot ${i + 1}`}
                                        fill
                                        skeletonColor={skeletonColor}
                                        className="object-cover object-top pointer-events-none"
                                        draggable={false}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {images.length > 1 && (
                <div className="flex gap-1.5 justify-center">
                    {images.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => go(i)}
                            style={{
                                width: i === idx ? 18 : 6,
                                height: 6,
                                borderRadius: 3,
                                border: "none",
                                cursor: "pointer",
                                background:
                                    i === idx
                                        ? accentColor
                                        : `${accentColor}40`,
                                transition: "all 0.3s",
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function withAlpha(color: string, alpha: number) {
    const normalized = color.trim();
    if (/^#[0-9a-fA-F]{3}$/.test(normalized)) {
        const r = parseInt(normalized[1] + normalized[1], 16);
        const g = parseInt(normalized[2] + normalized[2], 16);
        const b = parseInt(normalized[3] + normalized[3], 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    if (/^#[0-9a-fA-F]{6}$/.test(normalized)) {
        const r = parseInt(normalized.slice(1, 3), 16);
        const g = parseInt(normalized.slice(3, 5), 16);
        const b = parseInt(normalized.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    return normalized;
}

function ProjectInfoScrollbar({
    scrollerRef,
    accentColor,
    visible,
}: {
    scrollerRef: RefObject<HTMLDivElement | null>;
    accentColor: string;
    visible: boolean;
}) {
    const railRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scroller = scrollerRef.current;
        const rail = railRef.current;
        const thumb = thumbRef.current;
        if (!scroller || !rail || !thumb) return;

        let frameId: number | null = null;
        let dragPointerId: number | null = null;
        let dragStartY = 0;
        let dragStartScrollTop = 0;

        const scheduleUpdate = () => {
            if (frameId !== null) return;
            frameId = requestAnimationFrame(() => {
                frameId = null;
                updateThumb();
            });
        };

        const updateThumb = () => {
            const viewportH = scroller.clientHeight;
            const contentH = scroller.scrollHeight;
            const railH = rail.clientHeight;
            const maxScroll = Math.max(0, contentH - viewportH);
            const hasScroll = maxScroll > 1;
            const shouldShow = visible && hasScroll;
            rail.style.opacity = shouldShow ? "1" : "0";
            rail.style.pointerEvents = shouldShow ? "auto" : "none";
            if (!hasScroll || railH <= 0) {
                thumb.style.height = `${Math.max(railH, 0)}px`;
                thumb.style.transform = "translate3d(0, 0, 0)";
                return;
            }
            const minThumb = 42;
            const thumbH = Math.max(minThumb, (viewportH / contentH) * railH);
            const maxThumbTravel = Math.max(0, railH - thumbH);
            const progress = scroller.scrollTop / maxScroll;
            thumb.style.height = `${thumbH}px`;
            thumb.style.transform = `translate3d(0, ${maxThumbTravel * progress}px, 0)`;
        };

        const onThumbPointerDown = (event: PointerEvent) => {
            dragPointerId = event.pointerId;
            dragStartY = event.clientY;
            dragStartScrollTop = scroller.scrollTop;
            thumb.setPointerCapture(event.pointerId);
            thumb.style.cursor = "grabbing";
            event.preventDefault();
        };

        const onPointerMove = (event: PointerEvent) => {
            if (dragPointerId === null || event.pointerId !== dragPointerId)
                return;
            const viewportH = scroller.clientHeight;
            const contentH = scroller.scrollHeight;
            const railH = rail.clientHeight;
            const maxScroll = Math.max(0, contentH - viewportH);
            if (maxScroll <= 0 || railH <= 0) return;

            const minThumb = 42;
            const thumbH = Math.max(minThumb, (viewportH / contentH) * railH);
            const maxThumbTravel = Math.max(1, railH - thumbH);
            const scrollPerPixel = maxScroll / maxThumbTravel;
            const deltaY = event.clientY - dragStartY;
            scroller.scrollTop = Math.max(
                0,
                Math.min(
                    maxScroll,
                    dragStartScrollTop + deltaY * scrollPerPixel,
                ),
            );
        };

        const releaseDrag = (event?: PointerEvent) => {
            if (dragPointerId === null) return;
            if (event && event.pointerId !== dragPointerId) return;
            if (event) thumb.releasePointerCapture(event.pointerId);
            dragPointerId = null;
            thumb.style.cursor = "grab";
        };

        const onRailPointerDown = (event: PointerEvent) => {
            if (event.target === thumb) return;
            const railRect = rail.getBoundingClientRect();
            const viewportH = scroller.clientHeight;
            const contentH = scroller.scrollHeight;
            const railH = rail.clientHeight;
            const maxScroll = Math.max(0, contentH - viewportH);
            if (maxScroll <= 0 || railH <= 0) return;

            const minThumb = 42;
            const thumbH = Math.max(minThumb, (viewportH / contentH) * railH);
            const maxThumbTravel = Math.max(1, railH - thumbH);
            const rawY = event.clientY - railRect.top - thumbH * 0.5;
            const clampedY = Math.max(0, Math.min(maxThumbTravel, rawY));
            scroller.scrollTop = (clampedY / maxThumbTravel) * maxScroll;
            scheduleUpdate();
            event.preventDefault();
        };

        const resizeObserver = new ResizeObserver(scheduleUpdate);
        resizeObserver.observe(scroller);
        scheduleUpdate();
        scroller.addEventListener("scroll", scheduleUpdate, { passive: true });
        window.addEventListener("resize", scheduleUpdate);
        thumb.addEventListener("pointerdown", onThumbPointerDown);
        rail.addEventListener("pointerdown", onRailPointerDown);
        window.addEventListener("pointermove", onPointerMove, {
            passive: true,
        });
        window.addEventListener("pointerup", releaseDrag);
        window.addEventListener("pointercancel", releaseDrag);

        return () => {
            if (frameId !== null) cancelAnimationFrame(frameId);
            resizeObserver.disconnect();
            scroller.removeEventListener("scroll", scheduleUpdate);
            window.removeEventListener("resize", scheduleUpdate);
            thumb.removeEventListener("pointerdown", onThumbPointerDown);
            rail.removeEventListener("pointerdown", onRailPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", releaseDrag);
            window.removeEventListener("pointercancel", releaseDrag);
        };
    }, [accentColor, scrollerRef, visible]);

    return (
        <div
            ref={railRef}
            aria-hidden="true"
            style={{
                position: "absolute",
                top: 14,
                right: 8,
                bottom: 14,
                width: 10,
                borderRadius: 999,
                background: "transparent",
                pointerEvents: "none",
                opacity: 0,
                transition: "opacity 160ms ease",
                zIndex: 16,
            }}
        >
            <div
                ref={thumbRef}
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    width: "100%",
                    height: 42,
                    borderRadius: 999,
                    background: withAlpha(accentColor, 0.9),
                    boxShadow: `0 0 0 1px ${withAlpha(accentColor, 0.28)}`,
                    transform: "translate3d(0,0,0)",
                    willChange: "transform, height",
                    cursor: "grab",
                    touchAction: "none",
                }}
            />
        </div>
    );
}

export default function ProjectsCardsV2({
    projects,
}: {
    projects: ProjectData[];
}) {
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
    const [activeProject, setActiveProject] = useState<ProjectData | null>(
        null,
    );
  const [panelVisible, setPanelVisible] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [modalBgFade, setModalBgFade] = useState(1);
  const [modalTopOpacity, setModalTopOpacity] = useState(1);
  const [modalStoryOpacity, setModalStoryOpacity] = useState(0);
  const modalBgFadeRef = useRef(1);
  const modalTopOpacityRef = useRef(1);
  const modalStoryOpacityRef = useRef(0);
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

    const changeTab = useCallback(
        (nextTab: "web" | "others") => {
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
                    panel.style.transition =
                        "opacity 0.22s ease, transform 0.22s ease";
                    panel.style.opacity = "1";
                    panel.style.transform = "translateY(0)";
                });
            }, 165);
        },
        [activeTab],
    );

  const openProject = (project: ProjectData) => {
        clearTimers();
        setActiveProject(project);
    setPanelVisible(false);
    setLogoVisible(false);
    setInfoVisible(false);
    modalBgFadeRef.current = 1;
    modalTopOpacityRef.current = 1;
    modalStoryOpacityRef.current = 0;
    setModalBgFade(1);
    setModalTopOpacity(1);
    setModalStoryOpacity(0);
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
    modalBgFadeRef.current = 1;
    modalTopOpacityRef.current = 1;
    modalStoryOpacityRef.current = 0;
    setModalBgFade(1);
    setModalTopOpacity(1);
    setModalStoryOpacity(0);
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
        body.style.setProperty(
            "--v2-project-open-color",
            activeProject.accentColor,
        );
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
        const scroller = infoScrollRef.current;
        const saved = {
            htmlOverflow: html.style.overflow,
            bodyOverflow: body.style.overflow,
            htmlOverscrollBehavior: html.style.overscrollBehavior,
            bodyOverscrollBehavior: body.style.overscrollBehavior,
            scrollerScrollBehavior: scroller?.style.scrollBehavior ?? "",
        };

        html.style.overflow = "hidden";
        html.style.overscrollBehavior = "none";
        body.style.overflow = "hidden";
        body.style.overscrollBehavior = "none";
        if (scroller) scroller.style.scrollBehavior = "auto";

        const isEditableTarget = (target: EventTarget | null) => {
            if (!(target instanceof HTMLElement)) return false;
            const tag = target.tagName;
            return (
                target.isContentEditable ||
                tag === "INPUT" ||
                tag === "TEXTAREA" ||
                tag === "SELECT"
            );
        };

        const onKey = (e: KeyboardEvent) => {
            if (
                e.key === "Escape" &&
                document.body.classList.contains("v2-carousel-focus-active")
            ) {
                return;
            }
            if (e.key === "Escape") closeProject();
            if (!scroller || isEditableTarget(e.target)) return;

            const pageStep = Math.max(120, scroller.clientHeight * 0.88);
            let nextTop: number | null = null;

            if (e.key === "ArrowDown") nextTop = scroller.scrollTop + 72;
            else if (e.key === "ArrowUp") nextTop = scroller.scrollTop - 72;
            else if (e.key === "PageDown")
                nextTop = scroller.scrollTop + pageStep;
            else if (e.key === "PageUp") nextTop = scroller.scrollTop - pageStep;
            else if (e.key === "Home") nextTop = 0;
            else if (e.key === "End") nextTop = scroller.scrollHeight;
            else if (e.key === " " || e.key === "Spacebar")
                nextTop = scroller.scrollTop + (e.shiftKey ? -pageStep : pageStep);

            if (nextTop === null) return;
            e.preventDefault();
            scroller.scrollTo({ top: nextTop, behavior: "smooth" });
        };
        window.addEventListener("keydown", onKey);
        return () => {
            window.removeEventListener("keydown", onKey);
            html.style.overflow = saved.htmlOverflow;
            body.style.overflow = saved.bodyOverflow;
            html.style.overscrollBehavior = saved.htmlOverscrollBehavior;
            body.style.overscrollBehavior = saved.bodyOverscrollBehavior;
            if (scroller)
                scroller.style.scrollBehavior = saved.scrollerScrollBehavior;
        };
  }, [activeProject, closeProject]);

  useEffect(() => {
    if (!activeProject || !infoVisible) return;
    const scroller = infoScrollRef.current;
    if (!scroller) return;
    let rafId: number | null = null;

    const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

    const computeBgFade = (scrollTop: number) => {
      const start = 120;
      const distance = 260;
      if (scrollTop <= start) return 1;
      const t = Math.min(1, (scrollTop - start) / distance);
      return 1 - t;
    };

    const computeTopOpacity = (scrollTop: number) => {
      return 1;
    };

    const computeStoryOpacity = (scrollTop: number) => {
      const start = 8;
      const distance = 140;
      return clamp01((scrollTop - start) / distance);
    };

    const applyFade = () => {
      rafId = null;
      const scrollTop = scroller.scrollTop;
      const nextBg = computeBgFade(scrollTop);
      if (Math.abs(nextBg - modalBgFadeRef.current) >= 0.03) {
        modalBgFadeRef.current = nextBg;
        setModalBgFade(nextBg);
      }

      const nextTop = computeTopOpacity(scrollTop);
      if (Math.abs(nextTop - modalTopOpacityRef.current) >= 0.02) {
        modalTopOpacityRef.current = nextTop;
        setModalTopOpacity(nextTop);
      }

      const nextStory = computeStoryOpacity(scrollTop);
      if (Math.abs(nextStory - modalStoryOpacityRef.current) >= 0.02) {
        modalStoryOpacityRef.current = nextStory;
        setModalStoryOpacity(nextStory);
      }
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(applyFade);
    };

    applyFade();
    scroller.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      scroller.removeEventListener("scroll", onScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
      modalBgFadeRef.current = 1;
      modalTopOpacityRef.current = 1;
      modalStoryOpacityRef.current = 0;
      setModalBgFade(1);
      setModalTopOpacity(1);
      setModalStoryOpacity(0);
    };
  }, [activeProject, infoVisible]);

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
                    ref={(el) => {
                        tabBtnRefs.current[0] = el;
                    }}
                    onClick={() => changeTab("web")}
                    className="px-3 sm:px-5 py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 cursor-pointer whitespace-nowrap text-center"
                    style={{
                        fontFamily: "'Sora',sans-serif",
                        color:
                            activeTab === "web"
                                ? "#881111"
                                : "rgba(45,16,16,0.45)",
                        background: "transparent",
                        border: "none",
                        letterSpacing: "0.035em",
                    }}
                >
                    Web
                </button>
                <button
                    type="button"
                    ref={(el) => {
                        tabBtnRefs.current[1] = el;
                    }}
                    onClick={() => changeTab("others")}
                    className="px-3 sm:px-5 py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 cursor-pointer whitespace-nowrap text-center"
                    style={{
                        fontFamily: "'Sora',sans-serif",
                        color:
                            activeTab === "others"
                                ? "#881111"
                                : "rgba(45,16,16,0.45)",
                        background: "transparent",
                        border: "none",
                        letterSpacing: "0.035em",
                    }}
                >
                    Autres
                </button>
                <div
                    ref={indicatorRef}
                    className="v2-tab-indicator"
                    style={{ bottom: -1 }}
                />
            </div>

            <div
                ref={tabPanelRef}
                className="flex flex-col gap-6 md:gap-8 min-h-[12rem]"
                style={{
                    transition: "opacity 0.22s ease, transform 0.22s ease",
                }}
            >
                {visibleProjects.map((project) => {
                    const cardId = `v2-project-${project.id}`;
                    const projectFullTitle = project.fullTitle ?? project.title;
                    const cardBg = project.bgColor;
                    const titleColor = project.isDark
                        ? "rgba(255,255,255,0.95)"
                        : "rgba(18,13,13,0.93)";
                    const textColor = project.isDark
                        ? "rgba(255,255,255,0.68)"
                        : "rgba(18,13,13,0.62)";
                    const accent = project.accentColor;
                    const projectVisualStyle = getProjectVisualStyle(project.id);
                    const previewIndex = getProjectCardPreviewIndex(project.id);
                    const cardPreview =
                        project.screenshots?.[previewIndex] ??
                        project.screenshots?.[0] ??
                        null;

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
                            <ProjectBackdropLayer
                                config={projectVisualStyle?.cardBackdrop}
                            />

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
                                        <ProjectImageWithSkeleton
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
                                        <ProjectImageWithSkeleton
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
                                            fontFamily:
                                                "'Mango Grotesque','archivo-black',sans-serif",
                                            fontSize:
                                                "clamp(2rem, 4.4vw, 3.4rem)",
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
                                        style={{
                                            color: textColor,
                                            fontFamily: "'Sora',sans-serif",
                                        }}
                                    >
                                        {project.description}
                                    </p>
                                    <span
                                        className="hidden md:inline-block mt-3 text-[0.67rem] font-semibold uppercase tracking-[0.27em] opacity-0 translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                                        style={{
                                            color: accent,
                                            fontFamily: "'Sora',sans-serif",
                                        }}
                                    >
                                        Voir plus →
                                    </span>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {activeProject &&
                mounted &&
                createPortal(
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
                                transform: panelVisible
                                    ? "translateY(0%)"
                                    : "translateY(108%)",
                                transition:
                                    "transform 0.52s cubic-bezier(0.22,1,0.36,1)",
                                overflow: "hidden",
                                borderTop: `1px solid ${activeProject.accentColor}35`,
                            }}
                        >
                            <ProjectBackdropLayer
                                config={
                                    getProjectVisualStyle(activeProject.id)
                                        ?.modalBackdrop
                                }
                                opacityMultiplier={modalBgFade}
                            />
                            {getProjectIconLayout(activeProject.id).map((icon, i) => (
                                <div
                                    key={`${activeProject.id}-overlay-icon-${i}`}
                                    className={`v2-project-overlay-shape type-${activeProject.iconType}`}
                                    aria-hidden="true"
                                    style={{
                                        position: "absolute",
                                        left: icon.x,
                                        top: icon.y,
                                        width: icon.size,
                                        opacity: 0.22 * modalBgFade,
                                        pointerEvents: "none",
                                        zIndex: 1,
                                        ["--v2-shape-spin-duration" as string]: `${42 + i * 9}s`,
                                        ["--v2-shape-float-duration" as string]: `${11 + (i % 4) * 2.5}s`,
                                        ["--v2-shape-base-rotation" as string]: `${icon.rotation ?? 0}deg`,
                                        ["--v2-shape-float-y" as string]: `${i % 2 === 0 ? -10 : 10}px`,
                                    }}
                                >
                                    <div className="v2-project-overlay-shape-spin">
                                        <ProjectIcon
                                            type={
                                                activeProject.iconType as IconType
                                            }
                                            color={activeProject.accentColor}
                                        />
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
                                    opacity: isMobile
                                        ? infoVisible
                                            ? 1
                                            : 0
                                        : 1,
                                    pointerEvents: isMobile
                                        ? infoVisible
                                            ? "auto"
                                            : "none"
                                        : "auto",
                                    transition: "opacity 0.22s ease",
                                }}
                                aria-label="Retour"
                            >
                                <IoArrowBack />
                            </button>

                            <div
                                aria-hidden="true"
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    opacity:
                                        logoVisible && !infoVisible ? 1 : 0,
                                    transform:
                                        logoVisible && !infoVisible
                                            ? "translateY(0)"
                                            : "translateY(18px)",
                                    transition:
                                        "opacity 0.42s ease, transform 0.42s ease",
                                    pointerEvents: "none",
                                    zIndex: 8,
                                }}
                            >
                                {activeProject.titleSvg ? (
                                    <ProjectImageWithSkeleton
                                        src={activeProject.titleSvg}
                                        alt={
                                            activeProject.fullTitle ??
                                            activeProject.title
                                        }
                                        width={1240}
                                        height={300}
                                        skeletonColor={
                                            activeProject.accentColor
                                        }
                                        style={{
                                            width: "min(84vw, 58rem)",
                                            height: "auto",
                                            maxHeight: "36vh",
                                            objectFit: "contain",
                                        }}
                                    />
                                ) : (
                                    <span
                                        style={{
                                            fontFamily:
                                                "'Mango Grotesque','archivo-black',sans-serif",
                                            fontSize:
                                                "clamp(4rem, 14vw, 10rem)",
                                            color: activeProject.accentColor,
                                            fontWeight: 900,
                                            textTransform: "uppercase",
                                            letterSpacing: "0.01em",
                                        }}
                                    >
                                        {isMobile
                                            ? activeProject.title
                                            : (activeProject.fullTitle ??
                                              activeProject.title)}
                                    </span>
                                )}
                            </div>

                            <div
                                ref={infoScrollRef}
                                className="v2-project-info-scroller"
                                tabIndex={-1}
                                style={{
                                    position: "relative",
                                    zIndex: 12,
                                    height: "100%",
                                    overflowY: "auto",
                                    WebkitOverflowScrolling: "touch",
                                    overscrollBehavior: "contain",
                                    touchAction: "pan-y",
                                    opacity: infoVisible ? 1 : 0,
                                    transform: infoVisible
                                        ? "translateY(0)"
                                        : "translateY(24px)",
                                    transition:
                                        "opacity 0.42s ease, transform 0.42s ease",
                                }}
                            >
                                <div className="min-h-full flex flex-col">
                                    <div
                                        className="flex flex-col md:flex-row pt-14 md:pt-16 lg:pt-20 px-5 md:px-12 lg:px-20 xl:px-28 2xl:px-36"
                                        style={{
                                            minHeight: isMobile ? "92svh" : "100vh",
                                            opacity: modalTopOpacity,
                                            position: "relative",
                                        }}
                                    >
                                        <div className="w-full md:w-[40%] pt-0 pb-8 md:pt-0 md:pb-10 md:pr-6 lg:pr-8 flex flex-col justify-start md:justify-center shrink-0">
                                            <div
                                                style={{ marginBottom: "1rem" }}
                                            >
                                                <div className="md:hidden mb-4">
                                                    {activeProject.titleSvg ? (
                                                        <ProjectImageWithSkeleton
                                                            src={
                                                                activeProject.titleSvg
                                                            }
                                                            alt={
                                                                activeProject.title
                                                            }
                                                            width={440}
                                                            height={120}
                                                            skeletonColor={
                                                                activeProject.accentColor
                                                            }
                                                            style={{
                                                                width: "min(93vw, 22.5rem)",
                                                                height: "auto",
                                                                maxHeight:
                                                                    "3.75rem",
                                                                objectFit:
                                                                    "contain",
                                                                objectPosition:
                                                                    "left center",
                                                            }}
                                                        />
                                                    ) : (
                                                        <h3
                                                            style={{
                                                                fontFamily:
                                                                    "'Mango Grotesque','archivo-black',sans-serif",
                                                                fontSize:
                                                                    "clamp(1.85rem, 8.5vw, 2.7rem)",
                                                                color: activeProject.accentColor,
                                                                fontWeight: 900,
                                                                textTransform:
                                                                    "uppercase",
                                                                letterSpacing:
                                                                    "0.01em",
                                                                lineHeight: 0.95,
                                                            }}
                                                        >
                                                            {
                                                                activeProject.title
                                                            }
                                                        </h3>
                                                    )}
                                                    <span
                                                        className="block mt-2 text-xs font-bold uppercase tracking-[0.3em]"
                                                        style={{
                                                            color: activeProject.accentColor,
                                                            fontFamily:
                                                                "'Sora',sans-serif",
                                                        }}
                                                    >
                                                        {activeProject.fullTitle ??
                                                            activeProject.title}
                                                    </span>
                                                </div>
                                                <div className="hidden md:block">
                                                    {activeProject.titleSvg ? (
                                                        <ProjectImageWithSkeleton
                                                            src={
                                                                activeProject.titleSvg
                                                            }
                                                            alt={
                                                                activeProject.fullTitle ??
                                                                activeProject.title
                                                            }
                                                            width={760}
                                                            height={210}
                                                            skeletonColor={
                                                                activeProject.accentColor
                                                            }
                                                            style={{
                                                                width: "min(36vw, 25rem)",
                                                                minWidth:
                                                                    "10rem",
                                                                maxWidth:
                                                                    "100%",
                                                                height: "auto",
                                                                objectFit:
                                                                    "contain",
                                                            }}
                                                        />
                                                    ) : (
                                                        <h3
                                                            style={{
                                                                fontFamily:
                                                                    "'Mango Grotesque','archivo-black',sans-serif",
                                                                fontSize:
                                                                    "clamp(2.2rem, 5vw, 5.2rem)",
                                                                color: activeProject.accentColor,
                                                                fontWeight: 900,
                                                                textTransform:
                                                                    "uppercase",
                                                                letterSpacing:
                                                                    "0.01em",
                                                            }}
                                                        >
                                                            {activeProject.fullTitle ??
                                                                activeProject.title}
                                                        </h3>
                                                    )}
                                                </div>
                                            </div>
                                            <p
                                                className="text-sm md:text-base leading-relaxed mb-3"
                                                style={{
                                                    color: activeProject.isDark
                                                        ? "rgba(255,255,255,0.92)"
                                                        : "rgba(15,8,8,0.88)",
                                                    fontFamily:
                                                        "'Sora',sans-serif",
                                                }}
                                            >
                                                <span
                                                    className="hidden md:block text-xs font-bold uppercase tracking-[0.3em] mb-3"
                                                    style={{
                                                        color: activeProject.accentColor,
                                                        fontFamily:
                                                            "'Sora',sans-serif",
                                                    }}
                                                >
                                                    {activeProject.fullTitle ??
                                                        activeProject.title}
                                                </span>
                                                {activeProject.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {activeProject.techStack.map(
                                                    (t) => (
                                                        <span
                                                            key={t}
                                                            className="v2-tech-pill inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium tracking-wide border"
                                                            style={{
                                                                ["--pill-accent" as string]:
                                                                    activeProject.accentColor,
                                                                color: activeProject.accentColor,
                                                                borderColor:
                                                                    activeProject.isDark
                                                                        ? `${activeProject.accentColor}35`
                                                                        : `${activeProject.accentColor}50`,
                                                                background: `${activeProject.accentColor}10`,
                                                                fontFamily:
                                                                    "'Sora',sans-serif",
                                                                borderRadius: 6,
                                                            }}
                                                        >
                                                            {TECH_ICON[t] && (
                                                                <span className="text-[0.9em]">
                                                                    {
                                                                        TECH_ICON[
                                                                            t
                                                                        ]
                                                                    }
                                                                </span>
                                                            )}
                                                            {t}
                                                        </span>
                                                    ),
                                                )}
                                            </div>
                                            {activeProject.link && (
                                                <a
                                                    href={activeProject.link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="v2-project-info-link hidden md:inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-70"
                                                    style={{
                                                        color: activeProject.accentColor,
                                                        ["--v2-link-accent" as string]:
                                                            activeProject.accentColor,
                                                        fontFamily:
                                                            "'Sora',sans-serif",
                                                    }}
                                                >
                                                    {activeProject.linkText ??
                                                        "Voir le projet"}{" "}
                                                    →
                                                </a>
                                            )}
                                        </div>
                                        <div className="w-full md:w-[60%] pb-8 md:pt-0 md:pb-10 md:pl-6 lg:pl-8 flex flex-col items-start md:items-center md:justify-center shrink-0">
                                            <div style={{ width: "100%" }}>
                                                {activeProject.screenshots &&
                                                activeProject.screenshots
                                                    .length > 0 ? (
                                                    <Carousel
                                                        images={
                                                            activeProject.screenshots
                                                        }
                                                        accentColor={
                                                            activeProject.accentColor
                                                        }
                                                        isDark={
                                                            activeProject.isDark
                                                        }
                                                        skeletonColor={
                                                            activeProject.accentColor
                                                        }
                                                    />
                                                ) : (
                                                    <div
                                                        style={{
                                                            width: "100%",
                                                            aspectRatio:
                                                                "16/10",
                                                            border: `1px solid ${activeProject.accentColor}25`,
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                        }}
                                                    >
                                                        <span
                                                            style={{
                                                                color: `${activeProject.accentColor}40`,
                                                                fontFamily:
                                                                    "'Sora',sans-serif",
                                                                fontSize: 12,
                                                            }}
                                                        >
                                                            ▪ aperçu bientôt ▪
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            {activeProject.link && (
                                                <div className="mt-4 md:hidden">
                                                    <a
                                                        href={
                                                            activeProject.link
                                                        }
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="v2-project-info-link v2-project-info-link-mobile inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest transition-opacity hover:opacity-70"
                                                        style={{
                                                            color: activeProject.accentColor,
                                                            ["--v2-link-accent" as string]:
                                                                activeProject.accentColor,
                                                            fontFamily:
                                                                "'Sora',sans-serif",
                                                        }}
                                                    >
                                                        {activeProject.linkText ??
                                                            "Voir le projet"}{" "}
                                                        →
                                                    </a>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div
                                        className="mt-1 md:mt-2 lg:mt-3 px-5 pb-12 md:px-12 md:pb-14 lg:px-20 xl:px-28 2xl:px-36 flex flex-col gap-5 md:gap-7"
                                        style={{
                                            opacity: modalStoryOpacity,
                                        }}
                                    >
                                        {(activeProject.story &&
                                        activeProject.story.length > 0
                                            ? activeProject.story
                                            : []
                                        ).map((block) => (
                                            <StoryBlockView
                                                key={block.id}
                                                block={block}
                                                accentColor={
                                                    activeProject.accentColor
                                                }
                                                isDark={activeProject.isDark}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {!isMobile && (
                                <ProjectInfoScrollbar
                                    scrollerRef={infoScrollRef}
                                    accentColor={activeProject.accentColor}
                                    visible={infoVisible}
                                />
                            )}
                        </div>
                    </div>,
                    document.body,
                )}
        </MainSectionV2>
    );
}
