import { useEffect, useState } from "react";
import Image from "next/image";

const Header = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Show header after 5 seconds or on user interaction
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setIsVisible(true);
      }
    }, 5000);

    const handleInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        setIsVisible(true);
      }
    };

    // Listen for user interactions
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
      window.scrollTo({
        top: element.offsetTop,
        behavior: "smooth",
      });
    }
    setMenuVisible(false);
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev);
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
        <nav className="w-full flex items-center justify-center">
          <ul className="list-none flex flex-row flex-1 justify-evenly items-center p-0 m-0">
            <li className="flex-1 text-center flex items-center justify-center">
              <a
                onClick={() => scrollToSection("about")}
                className="group no-underline text-lg text-[#334A52] transition-colors cursor-pointer relative"
              >
                À propos
                <span className="absolute left-0 bottom-[-3px] w-full h-[2px] bg-[#334A52] rounded-[15px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            </li>
            <li className="flex-1 text-center flex items-center justify-center">
              <a
                onClick={() => scrollToSection("experience")}
                className="group no-underline text-lg text-[#334A52] transition-colors cursor-pointer relative"
              >
                Formation
                <span className="absolute left-0 bottom-[-3px] w-full h-[2px] bg-[#334A52] rounded-[15px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            </li>
            <li className="flex-1 text-center flex items-center justify-center">
              <a onClick={() => scrollToSection("about")} className="cursor-pointer">
                <Image
                  src="/portfolio-logo.png"
                  width={40}
                  height={40}
                  alt="Logo Initiales de Mathieu Hernandez"
                  priority
                  className="w-10 h-10 object-contain"
                />
              </a>
            </li>
            <li className="flex-1 text-center flex items-center justify-center">
              <a
                onClick={() => scrollToSection("projects")}
                className="group no-underline text-lg text-[#334A52] transition-colors cursor-pointer relative"
              >
                Projets
                <span className="absolute left-0 bottom-[-3px] w-full h-[2px] bg-[#334A52] rounded-[15px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            </li>
            <li className="flex-1 text-center flex items-center justify-center">
              <a
                onClick={() => scrollToSection("contact")}
                className="group no-underline text-lg text-[#334A52] transition-colors cursor-pointer relative"
              >
                Contact
                <span className="absolute left-0 bottom-[-3px] w-full h-[2px] bg-[#334A52] rounded-[15px] scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100"></span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Menu Button - Bigger Icon */}
      <button
        className="md:hidden fixed top-4 left-4 z-[101] w-[60px] h-[60px] bg-white/90 rounded-full shadow-lg border-none cursor-pointer flex items-center justify-center"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Image
          src="/portfolio-logo.png"
          width={40}
          height={40}
          alt="logo"
          priority
          className="mt-1"
        />
      </button>

      {/* Mobile Menu Overlay */}
      {menuVisible && (
        <div
          className="md:hidden fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center animate-fade-in"
        >
          <button
            className="absolute top-4 right-4 text-3xl text-[#334A52] cursor-pointer"
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            ✖
          </button>
          <nav className="w-full flex items-center justify-center">
            <ul className="list-none flex flex-col items-center gap-8 p-0 m-0">
              <li className="text-center">
                <a
                  onClick={() => scrollToSection("about")}
                  className="no-underline text-2xl text-[#334A52] font-bold cursor-pointer"
                >
                  À propos
                </a>
              </li>
              <li className="text-center">
                <a
                  onClick={() => scrollToSection("experience")}
                  className="no-underline text-2xl text-[#334A52] font-bold cursor-pointer"
                >
                  Formation
                </a>
              </li>
              <li className="text-center">
                <a
                  onClick={() => scrollToSection("projects")}
                  className="no-underline text-2xl text-[#334A52] font-bold cursor-pointer"
                >
                  Projets
                </a>
              </li>
              <li className="text-center">
                <a
                  onClick={() => scrollToSection("contact")}
                  className="no-underline text-2xl text-[#334A52] font-bold cursor-pointer"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;