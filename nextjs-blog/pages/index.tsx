"use client";
import Head from "next/head";
import { useEffect } from "react";
import styles from "../styles/Home.module.css";
import ProjectCard from "../components/ProjectCard";
import ProjectGrid from "../components/ProjectGrid";
import Header from "../components/Header";

export default function Home() {
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
      ctx.clearRect(0, 0,canvas.width, canvas.height);
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

  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio</title>
        <link rel="icon" href="/portfolio-logo.png" />
        <link rel="stylesheet" href="../styles/global.css" />
      </Head>

      <canvas id="topo-canvas" className={styles.canvas}></canvas>

      <Header />
      <section className={styles.hero}>
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
              <h2 className={styles.aboutMeTitle}>About Me</h2>
              <section className={styles.aboutMeDescription}>
                I'm a full-stack developer with a passion for creating web applications. I specialize in React, Node.js, and MongoDB. I'm always looking for new opportunities to learn and grow as a developer.
              </section>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.projects}>
      <h2 className={styles.sectionTitle}>Projects</h2>
      <ProjectGrid />
      </section>


      <div className={styles.scrollable}></div>
    </div>
  );
}
