import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hovering, setHovering] = useState(false);

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

  // Detect hover at the top of the screen
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (event.clientY < 20) {
        setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      className={`${styles.header} ${isVisible ? styles.visible : styles.hidden}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <nav className={styles.navbar}>
        <ul className={styles.navLinks}>
          <li><a href="#">A propos</a></li>
          <li><a href="#">Formation</a></li>
          <li><a href="#">Expériences</a></li>
          <li><a href="#"><img className={styles.logo} src='portfolio-logo.png' alt="Logo Initiales de Mathieu Hernandez"></img></a></li>
          <li><a href="#">Compétences</a></li>
          <li><a href="#">Projets</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
