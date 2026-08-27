"use client";
import { useEffect, useState, useRef, type CSSProperties } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import type { Language, PortfolioCopy } from "./i18n";

const PRIMARY = "#881111";
const ACCENT  = "#DD3A3A";
const MOBILE_HIGHLIGHT_TEXT = "#000000";
const LEGACY_BLEND_SOURCE = "#FFFFFF";
// These sources resolve to the site's reds when difference-blended over the off-white page.
const HEADER_BLEND_SOURCE = "#77EEEE";
const HEADER_ACTIVE_BLEND_SOURCE = "#22C5C5";

const NAV_ITEM_CONFIG = [
  { id: "v2-about", key: "about" },
  { id: "v2-projects", key: "projects" },
  { id: "v2-career", key: "career" },
  { id: "v2-contact", key: "contact" },
] as const;
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

export default function HeaderV2({
  copy,
  language,
  onLanguageChange,
}: {
  copy: PortfolioCopy;
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  const navItems = NAV_ITEM_CONFIG.map((item) => ({
    id: item.id,
    label: copy.nav[item.key],
  }));
  const navItemsLeft = navItems.slice(0, 2);
  const navItemsRight = navItems.slice(2);
  const [menuVisible,    setMenu]       = useState(false);
  const [activeSection,  setActive]     = useState(DEFAULT_ACTIVE_SECTION);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const isClickScrolling = useRef(false);
  const mobileMenuPanelRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuOverlayRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuClosingRef = useRef(false);

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

  /* bottom-of-page active section guard */
  useEffect(() => {
    let maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const updateScrollBounds = () => {
      maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    };

    const onScroll = () => {
      const smoother = ScrollSmoother.get();
      const y = smoother ? smoother.scrollTop() : window.scrollY;

      if (!isClickScrolling.current) {
        const isReallyScrollable = maxScroll > 120;
        if (isReallyScrollable && y >= maxScroll - 10) {
          setActive("v2-contact");
        }
      }
    };

    window.addEventListener("scroll",    onScroll, { passive: true });
    window.addEventListener("resize", updateScrollBounds);
    window.addEventListener("load", updateScrollBounds);
    updateScrollBounds();
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollBounds);
      window.removeEventListener("load", updateScrollBounds);
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

    return (
      <span className="relative z-10 inline transition-opacity duration-300">
        <span
          className={isAnimated ? "v2-header-label-first v2-header-label-first--blink" : "v2-header-label-first"}
          style={{
            "--v2-header-highlight-bg": highlightBackground,
            "--v2-header-highlight-color": highlightTextColor,
          } as CSSProperties}
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
            color: isEmphasized
                ? HEADER_ACTIVE_BLEND_SOURCE
                : "currentColor",
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

  const renderLanguageSelector = (isMobile = false) => {
    const options: Language[] = ["en", "fr"];

    return (
    <div
      className={isMobile ? "mt-auto flex items-center gap-3 px-4 pb-2" : "absolute right-3 md:right-4 top-0 bottom-0 flex items-center gap-1.5"}
      aria-label={copy.language.ariaLabel}
      role="group"
    >
      {options.map((item) => {
        const isActiveLanguage = language === item;
        const languageColor = isMobile
          ? isActiveLanguage
            ? ACCENT
            : PRIMARY
          : isActiveLanguage
            ? HEADER_ACTIVE_BLEND_SOURCE
            : "currentColor";

        return (
          <button
            key={item}
            type="button"
            onClick={() => onLanguageChange(item)}
            className="font-['Sora'] text-xs font-semibold tracking-[0.14em] leading-none transition-opacity"
            style={{
              color: languageColor,
              opacity: isActiveLanguage ? 1 : 0.58,
              background: "transparent",
              border: `1px solid ${isActiveLanguage ? languageColor : "transparent"}`,
              borderRadius: 0,
              padding: isMobile ? "0.44rem 0.5rem" : "0.28rem 0.32rem",
              cursor: "pointer",
              textTransform: "lowercase",
              fontSize: isMobile ? "1.6rem" : undefined,
            }}
            aria-pressed={isActiveLanguage}
          >
            {copy.language[item].toLowerCase()}
          </button>
        );
      })}
    </div>
    );
  };

  return (
    <>
      <header
        className="fixed top-4 left-0 w-full z-[140] flex justify-start md:justify-center px-2 md:px-4 pointer-events-none"
        style={{
          color: HEADER_BLEND_SOURCE,
          mixBlendMode: "difference",
          top: "0.5rem",
          transition: "top 300ms ease-in-out",
        }}
      >
        <div
          className="pointer-events-auto flex w-full md:justify-center"
        >

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
            {renderLanguageSelector()}
          </nav>

          {/* Mobile button */}
          <div className="md:hidden relative w-full min-h-[75px] flex items-center justify-between pr-3">
            <button
              onClick={() => setMenu(true)}
              className="flex items-center justify-center w-[75px] h-[75px] text-current hover:text-current transition-colors"
              style={{
                background: "transparent",
                border: "none",
                color: "currentColor",
                opacity: menuVisible ? 0 : 1,
                pointerEvents: menuVisible ? "none" : "auto",
              }}
              aria-hidden={menuVisible}
              tabIndex={menuVisible ? -1 : 0}
            >
              <FaBars size={33}/>
            </button>
            {renderLanguageSelector()}
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
              className="absolute top-0 left-0 flex h-full w-full flex-col border-r border-[#120D0D]/10 shadow-2xl px-6 pt-20 pb-8"
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
              {renderLanguageSelector(true)}
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
