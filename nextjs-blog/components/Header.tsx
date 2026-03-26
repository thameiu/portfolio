import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [hovering, setHovering] = useState(false);
  const isClickScrolling = useRef(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // On mobile, show immediately. On desktop, wait for 4s or mouse movement.
    if (window.innerWidth < 768) {
      setHasInteracted(true);
    } else {
      const timer = setTimeout(() => setHasInteracted(true), 4000);
      const onInteract = () => setHasInteracted(true);
      
      window.addEventListener("mousemove", onInteract, { once: true });
      window.addEventListener("scroll", onInteract, { once: true });

      return () => {
        clearTimeout(timer);
        window.removeEventListener("mousemove", onInteract);
        window.removeEventListener("scroll", onInteract);
      };
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        setIsVisible(true);
        // Don't hide on mobile
      } else {
        const isModalOpen = document.querySelector('[class*="z-[1000]"], [class*="z-[2000]"]');

        if (isModalOpen) {
          setIsVisible(false);
          return;
        }

        if (hovering) {
          setIsVisible(true);
        } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
          setIsVisible(true);
        }
      }

      // If we hit the very bottom of the page and aren't click-scrolling, force "contact"
      // to handle cases where the contact section is too short to hit the observer threshold
      if (!isClickScrolling.current) {
        if (window.innerHeight + currentScrollY >= document.documentElement.scrollHeight - 10) {
          setActiveSection("contact");
        }
      }

      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (window.innerWidth >= 768 && event.clientY < 50) {
            setIsVisible(true);
        }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    
    handleScroll(); // Initial check

    return () => {
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("mousemove", handleMouseMove);
    }
  }, [lastScrollY, hovering]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isClickScrolling.current) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -30% 0px" }
    );

    const sections = ["about", "experience", "projects", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const isMobile = window.innerWidth < 768;
    setMenuVisible(false);
    
    // Immediately set active and block observer updates during smooth scroll
    isClickScrolling.current = true;
    setActiveSection(sectionId);
    setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000); // Wait for smooth scroll to finish

    const executeScroll = () => {
      const element = document.getElementById(sectionId);
      if (element) {
        const offset = -80;
        window.scrollTo({ top: element.offsetTop + offset, behavior: "smooth" });
      }
    };

    if (isMobile) {
      // Wait for the morph animation to close completely before scrolling,
      // avoiding layout jumps while Framer Motion calculates coordinates.
      setTimeout(executeScroll, 300);
    } else {
      executeScroll();
    }
  };

  const navItems = [
    { id: "about", label: "À propos" },
    { id: "experience", label: "Parcours" },
    { id: "projects", label: "Projets" },
    { id: "contact", label: "Contact" },
  ];

  const shouldShow = isVisible && hasInteracted;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: shouldShow ? 0 : -100, opacity: shouldShow ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-4 left-0 w-full z-50 flex justify-start md:justify-center px-4 pointer-events-none"
      >
        <div 
          className="pointer-events-auto flex"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
        >
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center justify-center h-[50px] p-1 rounded-full bg-[var(--color-primary)]/30 backdrop-blur-lg border border-white/10 shadow-lg w-max relative">
            <ul className="flex items-center justify-between h-full relative">
              {navItems.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <li
                    key={item.id}
                    className="relative cursor-pointer flex items-center justify-center h-full transition-colors duration-300 text-white/80 hover:text-white font-['Sora'] font-semibold whitespace-nowrap px-5 lg:px-7"
                    onClick={() => scrollToSection(item.id)}
                  >
                    <span className={`relative z-10 transition-colors ${isActive ? 'text-[var(--color-accent)]' : ''}`}>
                        {item.label}
                    </span>
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 bg-white/10 -z-0 rounded-full"
                        layoutId="active-pill-desktop"
                        transition={{
                          type: "spring",
                          stiffness: 800,
                          damping: 40,
                          mass: 0.5,
                        }}
                        style={{ borderRadius: 9999 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
            
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            {!menuVisible && (
              <motion.button
                layoutId="mobile-menu-container"
                onClick={() => setMenuVisible(true)}
                className="flex items-center justify-center w-[50px] h-[50px] bg-[var(--color-primary)]/30 backdrop-blur-xl border border-white/10 shadow-lg text-white/80 hover:text-white transition-colors"
                style={{ borderRadius: 25 }}
                transition={{ type: "tween", ease: "circInOut", duration: 0.25 }}
              >
                <FaBars size={22} />
              </motion.button>
            )}
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuVisible && (
          <motion.div
            layoutId="mobile-menu-container"
            className="fixed inset-0 z-[1000]  bg-[var(--color-primary)]/70 backdrop-blur-3xl md:hidden overflow-hidden flex flex-col items-center justify-center"
            onClick={() => setMenuVisible(false)}
            style={{ borderRadius: 0 }}
            transition={{ type: "tween", ease: "circInOut", duration: 0.25 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              className="relative w-full px-8"
              onClick={(e) => e.stopPropagation()}
            >
              <ul className="flex flex-col items-center justify-center gap-4 w-full">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li
                      key={item.id}
                      className="relative cursor-pointer flex items-center justify-center h-full transition-colors duration-300 text-white/80 hover:text-white font-['Sora'] font-semibold whitespace-nowrap px-8 py-3 text-2xl sm:text-3xl w-full"
                      onClick={() => scrollToSection(item.id)}
                    >
                      <span className={`relative z-10 transition-colors ${isActive ? 'text-[var(--color-accent)]' : ''}`}>
                          {item.label}
                      </span>
                      {isActive && (
                        <motion.div
                          className="absolute inset-0 bg-white/10 -z-0 rounded-full"
                          layoutId="active-pill-mobile"
                          transition={{
                            type: "spring",
                            stiffness: 800,
                            damping: 40,
                            mass: 0.5,
                          }}
                          style={{ borderRadius: 9999 }}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
            <div className="absolute top-4 left-4">
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={() => setMenuVisible(false)} 
                className="flex items-center justify-center w-[50px] h-[50px] text-white/80 hover:text-white transition-colors"
              >
                <FaTimes size={28} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;