import { useEffect, useState } from "react";
import Image from "next/image";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) setIsVisible(true);
    }, 5000);

    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleInteraction);
    window.addEventListener('mousemove', handleInteraction);
    window.addEventListener('keydown', handleInteraction);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('keydown', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [hasInteracted]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY === 0) {
        setIsVisible(true);
      } else if (scrollY > lastScrollY && !hovering) {
        setIsVisible(false);
      }
      setLastScrollY(scrollY);

      // Track active section
      const sections = ["about", "experience", "projects", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, hovering]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const modals = document.querySelectorAll('[class*="z-[1000]"], [class*="z-[2000]"]');
      const isModalOpen = modals.length > 0;
      if (isModalOpen) {
        setIsVisible(false);
      } else if (event.clientY < 20) {
        setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({ top: element.offsetTop-80, behavior: "smooth" });
    }
    setMenuVisible(false);
  };

  const toggleMenu = () => setMenuVisible((prev) => !prev);

  const navItems = [
    { id: "about", label: "À propos" },
    { id: "experience", label: "Formation" },
  ];
  const navItemsRight = [
    { id: "projects", label: "Projets" },
    { id: "contact", label: "Contact" },
  ];
const NavItem = ({ id, label, mobile = false }: { id: string; label: string; mobile?: boolean }) => {
    const isActive = activeSection === id;
    return (
      <li className={mobile ? "text-center" : "flex-1 text-center flex items-center justify-center"}>
        <span
          onClick={() => scrollToSection(id)}
          className={`
            relative cursor-pointer select-none
            ${mobile
              ? "block text-2xl font-bold px-6 py-2 rounded-full"
              : "text-lg font-semibold px-4 py-1.5 rounded-full"
            }
          `}
        >
          {/* Background pill — always in DOM, fades via opacity */}
          <span
            aria-hidden="true"
            className="absolute inset-0 rounded-full bg-[var(--color-primary)]"
            style={{
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.4s ease-in-out',
            }}
          />
          {/* Text — always in DOM, color transitions via style */}
          <span
            className="relative z-10"
            style={{
              color: isActive ? 'white' : 'var(--color-primary)',
              transition: 'color 0.4s ease-in-out',
            }}
          >
            {label}
          </span>
        </span>
      </li>
    );
  };
  return (
    <>
      {/* Desktop Header */}
      <div
        className={`hidden md:flex fixed top-2.5 left-1/2 -translate-x-1/2 w-[80%] max-w-[900px] h-[50px] bg-white/90 rounded-[25px] shadow-lg transition-all duration-300 items-center justify-center z-[100] ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <nav className="w-full flex items-center justify-center px-4">
          <ul className="list-none flex flex-row flex-1 justify-evenly items-center p-0 m-0">
            {navItems.map(item => <NavItem key={item.id} {...item} />)}

            <li className="flex-1 text-center flex items-center justify-center">
              <span onClick={() => scrollToSection("about")} className="cursor-pointer">
                <Image
                  src="/portfolio-logo.png"
                  width={36}
                  height={36}
                  alt="Logo Initiales de Mathieu Hernandez"
                  priority
                  className="w-9 h-9 object-contain"
                />
              </span>
            </li>

            {navItemsRight.map(item => <NavItem key={item.id} {...item} />)}
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-[101] w-[60px] h-[60px] bg-white/90 rounded-full shadow-lg border-none cursor-pointer flex items-center justify-center"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Image src="/portfolio-logo.png" width={40} height={40} alt="logo" priority className="mt-1" />
      </button>

      {/* Mobile Menu Overlay */}
      {menuVisible && (
        <div className="md:hidden fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center animate-fade-in">
          <button
            className="absolute top-4 right-4 text-3xl text-[var(--color-primary)] font-bold cursor-pointer"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            ✖
          </button>
          <nav className="w-full flex items-center justify-center">
            <ul className="list-none flex flex-col items-center gap-5 p-0 m-0">
              {[...navItems, ...navItemsRight].map(item => (
                <NavItem key={item.id} {...item} mobile />
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;