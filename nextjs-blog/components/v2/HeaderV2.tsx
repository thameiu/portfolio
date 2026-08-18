"use client";
import { useEffect, useState, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const PRIMARY = "#881111";
const ACCENT  = "#DD3A3A";
const MOBILE_HIGHLIGHT_TEXT = "#000000";
const LEGACY_BLEND_SOURCE = "#FFFFFF";
const invertHexColor = (hex: string) => {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) return LEGACY_BLEND_SOURCE;
  const [r, g, b] = normalized.match(/.{2}/g) ?? [];
  if (!r || !g || !b) return LEGACY_BLEND_SOURCE;

  const inverted = [r, g, b]
    .map((channel) => (255 - Number.parseInt(channel, 16)).toString(16).padStart(2, "0"))
    .join("");

  return `#${inverted.toUpperCase()}`;
};
const HEADER_BLEND_SOURCE = invertHexColor(PRIMARY);
const HEADER_ACTIVE_BLEND_SOURCE = invertHexColor(ACCENT);

const navItems = [
  { id: "v2-about",          label: "à propos" },
  { id: "v2-career",         label: "parcours" },
  { id: "v2-projects",       label: "projets"  },
  { id: "v2-contact",        label: "contact"  },
];
const navItemsLeft = navItems.slice(0, 2);
const navItemsRight = navItems.slice(2);
const DEFAULT_ACTIVE_SECTION = "v2-about";

function MHLogo() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 188.89 183.82"
      style={{
        display: "block",
        width: "clamp(2rem, 2.2vw, 2.8rem)",
        height: "auto",
      }}
    >
      <path
        fill="currentColor"
        d="M94.44,70.37a525.21,525.21,0,0,0,27-67.89c8-.72,12-1.22,20-2.48q14.21,89.73,28.42,179.45-18.18,2.88-36.56,4.37-4.15-65.55-8.88-131.07l-.82-.46a589.35,589.35,0,0,1-26.27,61c-2.32,0-3.49,0-5.81,0a590.28,590.28,0,0,1-26.27-61l-.82.46q-4.73,65.52-8.88,131.07Q37.21,182.34,19,179.45,33.22,89.72,47.43,0c8,1.26,12,1.76,20,2.48A526.6,526.6,0,0,0,94.44,70.37Z"
      />
      <path fill="currentColor" d="M188.89,139H0l5-18h179Q186.41,130,188.89,139Z" />
    </svg>
  );
}

export default function HeaderV2() {
  const [isVisible,      setVisible]    = useState(false);
  const [menuVisible,    setMenu]       = useState(false);
  const [activeSection,  setActive]     = useState(DEFAULT_ACTIVE_SECTION);
  const [activeLetterHighlighted, setActiveLetterHighlighted] = useState(true);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [hovering,       setHovering]   = useState(false);
  const isClickScrolling = useRef(false);
  const hideTimerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveringRef      = useRef(false);
  const lastScrollYRef    = useRef(0);
  const mobileMenuPanelRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuOverlayRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuClosingRef = useRef(false);
  const headerHoverRef = useRef<HTMLDivElement | null>(null);

  const getDocumentTop = (node: HTMLElement) => {
    let top = 0;
    let current: HTMLElement | null = node;
    while (current) {
      top += current.offsetTop;
      current = current.offsetParent as HTMLElement | null;
    }
    return top;
  };

  const getSectionTargetTop = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return null;
    const isMobileViewport = window.innerWidth < 768;
    const isProjectAnchor = id.startsWith("v2-project-") || id === "v2-projects";
    const isContactAnchor = id === "v2-contact";
    const titleEl = (isProjectAnchor || isContactAnchor)
      ? (el.querySelector(".v2-mega-title") as HTMLElement | null)
      : null;
    const baseTop = getDocumentTop(el);
    const titleTop = titleEl ? getDocumentTop(titleEl) : baseTop;
    const headerOffset = isMobileViewport ? 82 : 96;
    const contactNudge = isMobileViewport ? 12 : 16;

    if (isContactAnchor) return Math.max(0, titleTop - headerOffset + contactNudge);
    if (isProjectAnchor) return Math.max(0, titleTop - headerOffset);
    return Math.max(0, baseTop - 80);
  };

  /* keep hoveringRef in sync */
  useEffect(() => { hoveringRef.current = hovering; }, [hovering]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveLetterHighlighted((value) => !value);
    }, 500);

    return () => window.clearInterval(intervalId);
  }, []);

  /* hide/show on scroll */
  useEffect(() => {
    let maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const updateScrollBounds = () => {
      maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    };

    const scheduleHide = () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        if (!hoveringRef.current) setVisible(false);
      }, 1500);
    };

    const onScroll = () => {
      const smoother = ScrollSmoother.get();
      const y = smoother ? smoother.scrollTop() : window.scrollY;
      const lastY = lastScrollYRef.current;

      if (hoveringRef.current) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setVisible(true);
      } else if (y > lastY + 2) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setVisible(false);
      } else if (y < lastY - 2) {
        setVisible(true);
        scheduleHide();
      }

      if (!isClickScrolling.current) {
        const isReallyScrollable = maxScroll > 120;
        if (isReallyScrollable && y >= maxScroll - 10) {
          setActive("v2-contact");
        }
      }
      lastScrollYRef.current = y;
    };

    const onMouse = (e: MouseEvent) => {
      if (e.clientY < 56) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setVisible(true);
      }
    };

    window.addEventListener("scroll",    onScroll, { passive: true });
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("resize", updateScrollBounds);
    window.addEventListener("load", updateScrollBounds);
    updateScrollBounds();
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", updateScrollBounds);
      window.removeEventListener("load", updateScrollBounds);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  /* section detection */
  useEffect(() => {
    let rafId: number | null = null;

    const resolveActiveSection = () => {
      if (isClickScrolling.current) return;
      const smoother = ScrollSmoother.get();
      const currentY = smoother ? smoother.scrollTop() : window.scrollY;
      let bestId = "";
      let bestDist = Number.POSITIVE_INFINITY;

      navItems.forEach(({ id }) => {
        const targetTop = getSectionTargetTop(id);
        if (targetTop === null) return;
        const dist = Math.abs(targetTop - currentY);
        if (dist < bestDist) {
          bestDist = dist;
          bestId = id;
        }
      });

      if (bestId) setActive(bestId);
    };

    const scheduleResolveActiveSection = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        resolveActiveSection();
      });
    };

    const observer = new IntersectionObserver(
      () => {
        scheduleResolveActiveSection();
      },
      { rootMargin: "-35% 0px -35% 0px" }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    window.addEventListener("scroll", scheduleResolveActiveSection, { passive: true });
    window.addEventListener("resize", scheduleResolveActiveSection);
    window.addEventListener("load", scheduleResolveActiveSection);
    resolveActiveSection();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", scheduleResolveActiveSection);
      window.removeEventListener("resize", scheduleResolveActiveSection);
      window.removeEventListener("load", scheduleResolveActiveSection);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!menuVisible) return;
    const panel = mobileMenuPanelRef.current;
    const overlay = mobileMenuOverlayRef.current;
    if (!panel) return;
    gsap.set(panel, { xPercent: -100 });
    if (overlay) gsap.set(overlay, { opacity: 0 });
    const tl = gsap.timeline();
    if (overlay) {
      tl.to(overlay, { opacity: 1, duration: 0.2, ease: "power2.out" }, 0);
    }
    tl.to(panel, {
      xPercent: 0,
      duration: 0.36,
      ease: "power3.out",
      clearProps: "transform",
    }, 0);
    return () => {
      tl.kill();
    };
  }, [menuVisible]);

  const closeMobileMenu = () => {
    if (!menuVisible) return;
    if (mobileMenuClosingRef.current) return;
    const panel = mobileMenuPanelRef.current;
    const overlay = mobileMenuOverlayRef.current;
    if (!panel) {
      setMenu(false);
      return;
    }
    mobileMenuClosingRef.current = true;
    const tl = gsap.timeline({
      onComplete: () => {
        mobileMenuClosingRef.current = false;
        setMenu(false);
      },
    });
    if (overlay) {
      tl.to(overlay, { opacity: 0, duration: 0.16, ease: "power2.inOut" }, 0);
    }
    tl.to(panel, {
      xPercent: -100,
      duration: 0.28,
      ease: "power3.inOut",
    }, 0);
  };

  const scrollToSection = (id: string) => {
    closeMobileMenu();
    setVisible(true);
    isClickScrolling.current = true;
    setActive(id);
    setTimeout(() => { isClickScrolling.current = false; }, 1500);

    const execute = () => {
      gsap.registerPlugin(ScrollSmoother);
      const targetTop = getSectionTargetTop(id);
      if (targetTop === null) return;
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(targetTop, true);
      } else {
        window.scrollTo({ top: targetTop, behavior: "smooth" });
      }
    };

    if (window.innerWidth < 768) setTimeout(execute, 300);
    else execute();
  };

  const shouldShow = isVisible || hovering || menuVisible;
  const animatedSection =
    hoveredSection && hoveredSection !== activeSection
      ? hoveredSection
      : activeSection;

  const renderAnimatedLabel = (
    label: string,
    isAnimated: boolean,
    highlightBackground: string,
    highlightTextColor: string,
  ) => {
    const [firstLetter = "", ...restLetters] = Array.from(label);
    const shouldHighlightFirstLetter = isAnimated && activeLetterHighlighted;

    return (
      <span className="relative z-10 inline transition-opacity duration-300">
        <span
          style={{
            display: "inline-block",
            lineHeight: 1,
            paddingInline: "0.015em",
            borderRadius: 0,
            background: shouldHighlightFirstLetter ? highlightBackground : "transparent",
            color: shouldHighlightFirstLetter ? highlightTextColor : "inherit",
            transition: "background-color 180ms ease, color 180ms ease",
          }}
        >
          {firstLetter}
        </span>
        <span>{restLetters.join("")}</span>
      </span>
    );
  };

  const renderDesktopNavItem = (item: (typeof navItems)[number]) => {
    const isActive = activeSection === item.id;
    const isHovered = hoveredSection === item.id;
    const isEmphasized = isActive || isHovered;
    const isAnimated = animatedSection === item.id;
    return (
      <li
        key={item.id}
        className="relative flex items-center justify-center"
      >
        <button
          type="button"
          className="group relative cursor-pointer flex items-center justify-center h-full transition-opacity duration-300 font-['Sora'] font-semibold whitespace-nowrap px-4 lg:px-6 xl:px-8 text-base lg:text-lg xl:text-[1.2rem]"
          onClick={() => scrollToSection(item.id)}
          onMouseEnter={() => setHoveredSection(item.id)}
          onMouseLeave={() => setHoveredSection((current) => (current === item.id ? null : current))}
          style={{
            color: isEmphasized ? HEADER_ACTIVE_BLEND_SOURCE : "currentColor",
            opacity: isEmphasized ? 1 : 0.82,
          }}
        >
          <span className="relative z-10 inline-flex items-center gap-[0.24em] transition-opacity duration-300">
            <span>{isActive ? "▪" : "▫"}</span>
            {renderAnimatedLabel(
              item.label,
              isAnimated,
              HEADER_ACTIVE_BLEND_SOURCE,
              LEGACY_BLEND_SOURCE,
            )}
            <span>{isActive ? "▪" : "▫"}</span>
          </span>
        </button>
      </li>
    );
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-12 z-40 pointer-events-auto"
        onMouseEnter={() => setVisible(true)}
        aria-hidden="true"
      />
      <header
        className="fixed top-4 left-0 w-full z-[140] flex justify-start md:justify-center px-2 md:px-4 pointer-events-none"
        style={{
          color: HEADER_BLEND_SOURCE,
          mixBlendMode: "difference",
          top: shouldShow ? "0.5rem" : "-4rem",
          transition: "top 300ms ease-in-out",
          willChange: "top",
        }}
      >
        <div
          ref={headerHoverRef}
          className="pointer-events-auto flex w-full md:justify-center"
          onMouseEnter={() => { setHovering(true); if (hideTimerRef.current) clearTimeout(hideTimerRef.current); }}
          onMouseLeave={() => {
            setHovering(false);
            /* restart hide timer when cursor leaves header */
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            hideTimerRef.current = setTimeout(() => setVisible(false), 1500);
          }}>

          {/* Desktop nav */}
          <nav
            className="hidden md:block relative"
            style={{
              width: "min(calc(100vw - 2.75rem), 1500px)",
              color: "currentColor",
            }}
          >
            <div
              className="grid items-center"
              style={{
                gridTemplateColumns: "1fr 1fr auto 1fr 1fr",
                minHeight: "54px",
              }}
            >
              <ul className="contents">
                {navItemsLeft.map(renderDesktopNavItem)}
              </ul>
              <div
                className="flex items-center justify-center px-4 lg:px-6 xl:px-8"
                aria-hidden="true"
              >
                <span
                  className="block transition-opacity duration-300"
                  style={{ color: "currentColor" }}
                >
                  <MHLogo />
                </span>
              </div>
              <ul className="contents">
                {navItemsRight.map(renderDesktopNavItem)}
              </ul>
            </div>
          </nav>

          {/* Mobile button */}
          <div className="md:hidden">
            {!menuVisible && (
              <button
                onClick={() => setMenu(true)}
                className="flex items-center justify-center w-[75px] h-[75px] text-current hover:text-current transition-colors"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "currentColor",
                }}>
                <FaBars size={33}/>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {menuVisible && (
          <div className="fixed inset-0 z-[1000] md:hidden">
            <div
              ref={mobileMenuOverlayRef}
              className="absolute inset-0 backdrop-blur-[2px]"
              onClick={closeMobileMenu}
              style={{ background: "rgba(18,13,13,0.22)" }}
            />
            <div
              ref={mobileMenuPanelRef}
              className="absolute top-0 left-0 h-full w-full border-r border-[#120D0D]/10 shadow-2xl px-6 pt-20 pb-8"
              style={{ background: "rgba(255,250,251,0.96)" }}
              onClick={e => e.stopPropagation()}
            >
              <ul className="flex flex-col items-start justify-start gap-3 w-full">
                {navItems.map(item => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}
                      className="relative cursor-pointer flex items-center justify-start h-full transition-colors duration-300 font-['Sora'] font-semibold whitespace-nowrap px-4 py-3 text-[2.15rem] w-full text-left"
                      style={{ color: isActive ? ACCENT : PRIMARY }}
                      onClick={() => scrollToSection(item.id)}>
                      <span
                        aria-hidden="true"
                        className="mr-3 inline-block"
                        style={{
                          color: isActive ? ACCENT : PRIMARY,
                          lineHeight: 1,
                        }}
                      >
                        {isActive ? "▪" : "▫"}
                      </span>
                      <span
                        className="relative z-10 transition-colors"
                      >
                        {renderAnimatedLabel(
                          item.label,
                          isActive,
                          ACCENT,
                          MOBILE_HIGHLIGHT_TEXT,
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="absolute top-4 left-4">
              <button
                onClick={closeMobileMenu}
                className="flex items-center justify-center w-[50px] h-[50px] text-[#120D0D]/72 hover:text-[#120D0D] transition-colors">
                <FaTimes size={28}/>
              </button>
            </div>
          </div>
      )}
    </>
  );
}
