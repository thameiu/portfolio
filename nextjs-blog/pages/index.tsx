"use client";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import ProjectCard from "../components/ProjectCard";
import ProjectGrid from "../components/ProjectGrid";
import Header from "../components/Header";
import { FaLinkedin, FaPhoneAlt, FaFileDownload, FaEnvelope, FaGithub } from "react-icons/fa";
import { SiCplusplus, SiNextdotjs, SiNestjs, SiReact, SiLeaflet, SiDocker, SiTypescript, SiPhp, SiLaravel,SiOpengl,SiCmake, SiTailwindcss,SiExpress, SiMysql, SiPython, SiJavascript, SiGit, SiPostgresql, SiMongodb, SiGitlab } from "react-icons/si";

import { FaJs,FaNodeJs,FaJava  } from "react-icons/fa";
import { DiNetbeans } from "react-icons/di";
import { MdAccessTimeFilled } from "react-icons/md";
import { GiFlame } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";

import "animate.css";

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
        <meta name="google-site-verification" content="9gob9xK_TYszbdBCenuGlccq09xNyIFaaOUg9FI81VA" />
        <meta name="description" content="Portfolio de Mathieu HERNANDEZ, développeur full-stack spécialisé en React, TypeScript et intelligence artificielle. BUT Informatique à l'IUT d'Arles." />
        <meta name="keywords" content="développeur, full-stack, intelligence artificielle, web, portfolio, Mathieu HERNANDEZ, finder, Finder, Kwester, kwester, GGPS, Tétra-Développement, tetradeveloppement, tétradéveloppement, programmeur, programmation, hernandez, mathieu, " />
        <meta name="author" content="Mathieu HERNANDEZ" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Portfolio - Mathieu HERNANDEZ" />
        <meta property="og:description" content="Développeur full-stack, étudiant en Msc Technique à Epitech (Marseille)" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.mathieu-hernandez.fr/" />
        <title>Portfolio - Mathieu HERNANDEZ</title>
        <link rel="icon" href="/portfolio-logo.png" />
      </Head>

      <canvas id="topo-canvas" className={styles.canvas}></canvas>

      <Header />
      <section id="about" className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.textContainer}>
            <p className={`${styles.title} animate__animated animate__fadeInDown`}>Tétra-Développement</p>
            <p className={`${styles.subtitle} animate__animated animate__fadeInDown`}>Portfolio de Mathieu HERNANDEZ</p>
          </div>

          <div className={styles.profileContainer}>
            <div className={styles.profileImageContainer}>
              <img src="/me.jpg" alt="Mathieu Hernandez" className={styles.profileImage} />
            </div>
            <div className={styles.aboutMeContainer}>
              <h2 className={styles.aboutMeTitle}>À propos de moi</h2>
              <section className={styles.aboutMeDescription}>
                
              Je m'appelle <b>Mathieu HERNANDEZ</b>, j'ai 20 ans et je suis en troisième année de <b>BUT Informatique</b> à l'IUT d'Arles. <br/>
              Passionné par la programmation et souhaitant m'orienter vers l’<b>intelligence artificielle</b> et y faire carrière,
              je vais bientôt intégrer un Master of Science en IA à <b>Epitech</b>.<br/>
              Grâce à ma formation et mes expériences professionnelles, j’ai acquis de solides compétences en <b>développement web</b>,
              en optimisation des performances, ainsi qu’en <b>gestion de projet</b> et qualité de développement. <br/>
              Ces expériences m’ont permis d’adopter des méthodologies <b>rigoureuses</b> et d’améliorer ma capacité à concevoir des solutions <b>efficaces</b> et bien <b>structurées</b>.

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
            <div className={styles.professionalExperienceContainer}>
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
            <div className={styles.skillsContainer}>

            <h4 className={styles.skillCategory}>Soft Skills</h4>
              <div className={styles.skillStack}>
                <div className={styles.skillBadge}>
                  <MdAccessTimeFilled /> Ponctualité
                </div>
                <div className={styles.skillBadge}>
                  <IoPeople /> Sociabilité
                </div>
                <div className={styles.skillBadge}>
                  <GiFlame /> Persévérance
                </div>
              </div>

              <h4 className={styles.skillCategory}>Langages de Programmation</h4>
              <div className={styles.skillStack}>
                <div className={styles.skillBadge}>
                  <SiCplusplus /> C++
                </div>
                <div className={styles.skillBadge}>
                  <FaJava /> Java
                </div>
                <div className={styles.skillBadge}>
                  <SiPython /> Python
                </div>
                <div className={styles.skillBadge}>
                  <SiJavascript /> JavaScript
                </div>
                <div className={styles.skillBadge}>
                  <SiTypescript /> TypeScript
                </div>
                <div className={styles.skillBadge}>
                  <SiPhp /> PHP
                </div>
                <div className={styles.skillBadge}>
                  <SiMysql /> SQL
                </div>
              </div>

              <h4 className={styles.skillCategory}>Frameworks, Librairies</h4>
              <div className={styles.skillStack}>

                <div className={styles.skillBadge}>
                  <SiReact /> React.js
                </div>
                <div className={styles.skillBadge}>
                  <SiNextdotjs /> Next.js
                </div>
                <div className={styles.skillBadge}>
                  <SiNextdotjs /> Node.js
                </div>
                <div className={styles.skillBadge}>
                  <SiExpress /> Express.js
                </div>
                <div className={styles.skillBadge}>
                  <SiNestjs /> Nest.js
                </div>
                <div className={styles.skillBadge}>
                  <SiLaravel /> Laravel
                </div>
                <div className={styles.skillBadge}>
                  <SiLeaflet /> Leaflet
                </div>
                <div className={styles.skillBadge}>
                  <SiOpengl /> OpenGL
                </div>
              </div>

              <h4 className={styles.skillCategory}>Bases de Données</h4>
              <div className={styles.skillStack}>
                <div className={styles.skillBadge}>
                  <SiMysql /> MySQL
                </div>
                <div className={styles.skillBadge}>
                  <SiPostgresql /> PostGreSQL
                </div>
                <div className={styles.skillBadge}>
                  <SiMongodb /> MongoDB
                </div>
              </div>


              <h4 className={styles.skillCategory}>Outils, Plateformes</h4>
              <div className={styles.skillStack}>
                  <div className={styles.skillBadge}>
                    <SiGit /> Git
                  </div>
                  <div className={styles.skillBadge}>
                    <SiGitlab /> Gitlab
                  </div>
                  <div className={styles.skillBadge}>
                    <SiDocker /> Docker
                  </div>
              </div>
            </div>
          )}

          </div>
        </div>
      </section>

      <section id="projects" className={styles.projects}>
        <h2 className={styles.sectionTitle}>Projets</h2>
        <ProjectGrid />
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <h2 className={styles.sectionTitle}>Me Contacter</h2>
        <div className={styles.contactDetails}>
          <a href="mailto:hernandez.mathieu19@gmail.com" className={styles.contactItem}>
              <FaEnvelope size={40} />

            <span>E-mail : hernandez.mathieu19@gmail.com</span>
          </a>
          <a href="tel:+33662011741" className={styles.contactItem}>
            <FaPhoneAlt size={40} />
            <span>Téléphone : 06 62 01 17 41</span>
          </a>
          <a href="/CV_HERNANDEZ_MATHIEU_2025_2026.pdf" download className={styles.contactItem}>
              <FaFileDownload size={40} />
            <span>Télécharger mon CV</span>
          </a>
          <a href="https://www.linkedin.com/in/mathieu-hernandez-306914264/" className={styles.contactItem}>
            <FaLinkedin size={40} />
            <span>Mon profil LinkedIn</span>
          </a>
          <a href="https://github.com/thameiu" className={styles.contactItem}>
            <FaGithub size={40} />
            <span>Mon profil Github</span>
          </a>
        </div>
      </section>

           {/* Footer */}
      <footer className={styles.footer}>
        <p>&copy; {new Date().getFullYear()} Mathieu Hernandez. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
