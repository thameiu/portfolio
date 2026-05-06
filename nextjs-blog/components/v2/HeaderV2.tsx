"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const PRIMARY = "#881111";
const ACCENT  = "#DD3A3A";

const navItems = [
  { id: "v2-about",          label: "À propos" },
  { id: "v2-career",         label: "Parcours" },
  { id: "v2-project-rgbast", label: "Projets"  },
  { id: "v2-contact",        label: "Contact"  },
];

export default function HeaderV2() {
  const [isVisible,      setVisible]    = useState(false);
  const [menuVisible,    setMenu]       = useState(false);
  const [activeSection,  setActive]     = useState("");
  const [hovering,       setHovering]   = useState(false);
  const isClickScrolling = useRef(false);
  const hideTimerRef     = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoveringRef      = useRef(false);
  const lastScrollYRef    = useRef(0);
  const mobileMenuPanelRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuOverlayRef = useRef<HTMLDivElement | null>(null);
  const mobileMenuClosingRef = useRef(false);

  /* keep hoveringRef in sync */
  useEffect(() => { hoveringRef.current = hovering; }, [hovering]);

  /* hide/show on scroll */
  useEffect(() => {
    const scheduleHide = () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      hideTimerRef.current = setTimeout(() => {
        if (!hoveringRef.current) setVisible(false);
      }, 1500);
    };

    const onScroll = () => {
      const y = window.scrollY;
      const lastY = lastScrollYRef.current;

      if (hoveringRef.current) {
        setVisible(true);
      } else if (y > lastY + 2) {
        if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
        setVisible(false);
      } else if (y < lastY - 2) {
        setVisible(true);
        scheduleHide();
      }

      if (!isClickScrolling.current) {
        if (window.innerHeight + y >= document.documentElement.scrollHeight - 10) {
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
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, []);

  /* section detection */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting && !isClickScrolling.current) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -35% 0px" }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
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
      const el = document.getElementById(id);
      if (!el) return;
      const baseTop = window.scrollY + el.getBoundingClientRect().top;
      const isMobileViewport = window.innerWidth < 768;
      const isProjectAnchor = id.startsWith("v2-project-");
      const isContactAnchor = id === "v2-contact";
      const targetTop = isContactAnchor
        ? isMobileViewport
          ? Math.max(0, baseTop - 16)
          : Math.max(0, document.documentElement.scrollHeight - window.innerHeight)
        : isProjectAnchor
          ? baseTop + window.innerHeight * 0.42
          : Math.max(0, baseTop - 80);
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

  return (
    <>
      <div
        className="fixed top-0 left-0 w-full h-12 z-40 pointer-events-auto"
        onMouseEnter={() => setVisible(true)}
        aria-hidden="true"
      />
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: shouldShow ? 0 : -100, opacity: shouldShow ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-4 left-0 w-full z-50 flex justify-start md:justify-center px-4 pointer-events-none"
      >
        <div className="pointer-events-auto flex"
          onMouseEnter={() => { setHovering(true); if (hideTimerRef.current) clearTimeout(hideTimerRef.current); }}
          onMouseLeave={() => {
            setHovering(false);
            /* restart hide timer when cursor leaves header */
            if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            hideTimerRef.current = setTimeout(() => setVisible(false), 1500);
          }}>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center justify-center h-[48px] p-1 rounded-2xl backdrop-blur-lg border border-white/10 shadow-lg w-max relative"
            style={{ background: `${PRIMARY}33` }}>
            <ul className="flex items-center justify-between h-full relative">
              {navItems.map(item => {
                const isActive = activeSection === item.id;
                return (
                  <li key={item.id}
                    className="relative cursor-pointer flex items-center justify-center h-full transition-colors duration-300 text-white/80 hover:text-white font-['Sora'] font-semibold whitespace-nowrap px-5 lg:px-7"
                    onClick={() => scrollToSection(item.id)}>
                    <span className="relative z-10 transition-colors"
                      style={{ color: isActive ? ACCENT : undefined }}>
                      {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 -z-0 rounded-xl"
                        layoutId="v2-active-pill"
                        transition={{ type: "spring", stiffness: 800, damping: 40, mass: 0.5 }}
                        style={{ borderRadius: 12, background: "rgba(255,255,255,0.1)" }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Mobile button */}
          <div className="md:hidden">
            {!menuVisible && (
              <button
                onClick={() => setMenu(true)}
                className="flex items-center justify-center w-[50px] h-[50px] backdrop-blur-xl border border-white/10 shadow-lg text-white/80 hover:text-white transition-colors"
                style={{ borderRadius: 14, background: `${PRIMARY}33` }}>
                <FaBars size={22}/>
              </button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
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
                      className="relative cursor-pointer flex items-center justify-start h-full transition-colors duration-300 text-[#120D0D]/76 hover:text-[#120D0D] font-['Sora'] font-semibold whitespace-nowrap px-4 py-3 text-2xl w-full"
                      onClick={() => scrollToSection(item.id)}>
                      <span className="relative z-10 transition-colors"
                        style={{ color: isActive ? ACCENT : undefined }}>
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 -z-0 rounded-xl"
                          layoutId="v2-active-pill-mobile"
                          transition={{ type: "spring", stiffness: 800, damping: 40, mass: 0.5 }}
                          style={{ borderRadius: 12, background: "rgba(136,17,17,0.1)" }}
                        />
                      )}
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
      </AnimatePresence>
    </>
  );
}
