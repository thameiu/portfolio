"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import ProjectCard from "../components/ProjectCard";
import ProjectGrid from "../components/ProjectGrid";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFile, faPhoneAlt } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("experience");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const canvas = document.getElementById("topo-canvas") as HTMLCanvasElement | null;
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const lines: { y: number; speed: number }[] = [];
    const numLines = 30;
    const lineSpacing = 40;

    for (let i = 0; i < numLines; i++) {
      lines.push({
        y: i * lineSpacing,
        speed: Math.random() * 0.5 + 0.1,
      });
    }

    function drawLines() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#C5EFFD";
      ctx.lineWidth = 2;

      lines.forEach((line) => {
        ctx.beginPath();
        for (let x = 0; x < canvas.width; x += 10) {
          const yOffset = Math.sin((x + line.y) / 100) * 20;
          ctx.lineTo(x, line.y + yOffset);
        }
        ctx.stroke();

        line.y -= line.speed;
        if (line.y < -lineSpacing) {
          line.y = canvas.height;
        }
      });
    }

    function animate() {
      drawLines();
      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio</title>
        <link rel="icon" href="/portfolio-logo.png" />
        <link rel="stylesheet" href="../styles/global.css" />
      </Head>

      <canvas id="topo-canvas" className={styles.canvas}></canvas>

      <Header />
      <section id="about" className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.textContainer}>
            <p className={styles.title}>Tétra-Développement</p>
            <p className={styles.subtitle}>Portfolio de Mathieu HERNANDEZ</p>
          </div>

          <div className={styles.profileContainer}>
            <div className={styles.profileImageContainer}>
              <img src="/me.jpg" alt="Mathieu Hernandez" className={styles.profileImage} />
            </div>
            <div className={styles.aboutMeContainer}>
              <h2 className={styles.aboutMeTitle}>À propos de moi</h2>
              <section className={styles.aboutMeDescription}>
                I'm a full-stack developer with a passion for creating web applications. I specialize in React, Node.js, and MongoDB. I'm always looking for new opportunities to learn and grow as a developer.
              </section>
            </div>
          </div>
        </div>
      </section>

      {/* Professional Experiences, Studies, and Skills */}
      <section id="experience" className={styles.experienceSection}>
        <h2 className={styles.sectionTitle}>Expériences, Formation, Compétences</h2>
        <div className={styles.experienceContent}>
          <div className={styles.tabs}>
            <button
              onClick={() => handleTabClick("experience")}
              className={activeTab === "experience" ? styles.activeTab : ""}
            >
              Expériences
            </button>
            <button
              onClick={() => handleTabClick("studies")}
              className={activeTab === "studies" ? styles.activeTab : ""}
            >
              Formation
            </button>
            <button
              onClick={() => handleTabClick("skills")}
              className={activeTab === "skills" ? styles.activeTab : ""}
            >
                Compétences
            </button>
          </div>
          <div className={styles.tabContent}>
          {activeTab === "experience" && (
            <div className={styles.professionalExperienceContainer}>
              {/* <h3>Professional Experience</h3> */}
              <div className={styles.experienceList}>
                <div className={styles.experienceItem}>
                  <span className={styles.jobTitle}>Alternance en Développement full-stack</span>
                  <span className={styles.companyName}>Miratlas (Pertuis)</span>
                  <span className={styles.period}>Septembre 2024 - Juin 2025</span>
                </div>
                <div className={styles.experienceItem}>
                  <span className={styles.jobTitle}>Stage étudiant en Développement web</span>
                  <span className={styles.companyName}>Amiltone (Aix-en-Provence)</span>
                  <span className={styles.period}>Avril - Juin 2024</span>
                </div>
                {/* <div className={styles.experienceItem}>
                  <span className={styles.jobTitle}>Intern</span>
                  <span className={styles.companyName}>Tech Solutions</span>
                  <span className={styles.period}>2021-2022</span>
                </div> */}
              </div>
            </div>
          )}

          {activeTab === "studies" && (
            <div className={styles.studiesContainer}>
              <div className={styles.experienceList}>
                <div className={styles.experienceItem}>
                  <span className={styles.jobTitle}>BUT Informatique</span>
                  <span className={styles.companyName}>Aix-Marseille Université (Arles)</span>
                  <span className={styles.period}>2022-2025</span>
                </div>
                <div className={styles.experienceItem}>
                  <span className={styles.jobTitle}>Baccalauréat Général</span>
                  <span className={styles.companyName}>Lycée Georges Duby (Luynes)</span>
                  <span className={styles.period}>2022</span>
                </div>
              </div>
            </div>
          )}

            {activeTab === "skills" && (
              <div>
                <h3>Skills</h3>
                <ul>
                  <li>JavaScript (React, Node.js)</li>
                  <li>Python (Data Science, Django)</li>
                  <li>Database Management (SQL, MongoDB)</li>
                  <li>Version Control (Git, GitHub)</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="projects" className={styles.projects}>
        <h2 className={styles.sectionTitle}>Projects</h2>
        <ProjectGrid />
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <h2 className={styles.sectionTitle}>Me Contacter</h2>
        <div className={styles.contactDetails}>
          <a href="mailto:hernandez.mathieu19@gmail.com" className={styles.contactItem}>
            <FontAwesomeIcon height={"40px"} icon={faEnvelope} />
            <span>E-mail : hernandez.mathieu19@gmail.com</span>
          </a>
          <a href="tel:+33662011741" className={styles.contactItem}>
            <FontAwesomeIcon height={"40px"} icon={faPhoneAlt} />
            <span>Téléphone : 06 62 01 17 41</span>
          </a>
          <a href="/CV_HERNANDEZ_MATHIEU_2025_2026.pdf" download className={styles.contactItem}>
            <FontAwesomeIcon width={"40px"} icon={faFile} />
            <span>Télécharger mon CV</span>
          </a>
        </div>
      </section>

      <div className={styles.scrollable}></div>
    </div>
  );
}
