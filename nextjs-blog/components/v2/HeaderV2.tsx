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

  const scrollToSection = (id: string) => {
    setMenu(false);
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
          <nav className="hidden md:flex items-center justify-center h-[50px] p-1 rounded-full backdrop-blur-lg border border-white/10 shadow-lg w-max relative"
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
                        className="absolute inset-0 -z-0 rounded-full"
                        layoutId="v2-active-pill"
                        transition={{ type: "spring", stiffness: 800, damping: 40, mass: 0.5 }}
                        style={{ borderRadius: 9999, background: "rgba(255,255,255,0.1)" }}
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
              <motion.button
                layoutId="v2-mobile-menu"
                onClick={() => setMenu(true)}
                className="flex items-center justify-center w-[50px] h-[50px] backdrop-blur-xl border border-white/10 shadow-lg text-white/80 hover:text-white transition-colors"
                style={{ borderRadius: 25, background: `${PRIMARY}33` }}
                transition={{ type: "tween", ease: "circInOut", duration: 0.25 }}>
                <FaBars size={22}/>
              </motion.button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuVisible && (
          <motion.div
            layoutId="v2-mobile-menu"
            className="fixed inset-0 z-[1000] backdrop-blur-3xl md:hidden overflow-hidden flex flex-col items-center justify-center"
            onClick={() => setMenu(false)}
            style={{ borderRadius: 0, background: `${PRIMARY}AA` }}
            transition={{ type: "tween", ease: "circInOut", duration: 0.25 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="relative w-full px-8"
              onClick={e => e.stopPropagation()}>
              <ul className="flex flex-col items-center justify-center gap-4 w-full">
                {navItems.map(item => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}
                      className="relative cursor-pointer flex items-center justify-center h-full transition-colors duration-300 text-white/80 hover:text-white font-['Sora'] font-semibold whitespace-nowrap px-8 py-3 text-2xl sm:text-3xl w-full"
                      onClick={() => scrollToSection(item.id)}>
                      <span className="relative z-10 transition-colors"
                        style={{ color: isActive ? ACCENT : undefined }}>
                        {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 -z-0 rounded-full"
                          layoutId="v2-active-pill-mobile"
                          transition={{ type: "spring", stiffness: 800, damping: 40, mass: 0.5 }}
                          style={{ borderRadius: 9999, background: "rgba(255,255,255,0.1)" }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
            <div className="absolute top-4 left-4">
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setMenu(false)}
                className="flex items-center justify-center w-[50px] h-[50px] text-white/80 hover:text-white transition-colors">
                <FaTimes size={28}/>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
