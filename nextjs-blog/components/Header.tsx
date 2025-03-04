import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false); // For mobile menu toggle

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY === 0) {
        setIsVisible(true); // Always show when at the top
      } else if (scrollY > lastScrollY && !hovering) {
        setIsVisible(false); // Hide when scrolling down
      }

      setLastScrollY(scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, hovering]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY < 20) {
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
  };

  const toggleMenu = () => {
    setMenuVisible((prev) => !prev); // Toggle the menu visibility
  };

  return (
    <div
      className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <button className={styles.menuButton} onClick={toggleMenu}>
        <img src="portfolio-logo.png" className={styles.logo} alt="Hamburger icon" />
      </button>
      <nav className={`${styles.navbar} ${menuVisible ? styles.menuVisible : ""}`}>
        <ul className={styles.navLinks}>
          <li>
            <a onClick={() => scrollToSection("about")}>A propos</a>
          </li>
          <li>
            <a onClick={() => scrollToSection("projects")}>Projets</a>
          </li>
          <li>
            <a onClick={() => scrollToSection("about")}>
              <img className={styles.logo} src="portfolio-logo.png" alt="Logo Initiales de Mathieu Hernandez" />
            </a>
          </li>
          <li>
            <a onClick={() => scrollToSection("contact")}>Formation</a>
          </li>
          <li>
            <a onClick={() => scrollToSection("contact")}>Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
