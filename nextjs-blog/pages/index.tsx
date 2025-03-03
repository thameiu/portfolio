"use client";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import styles from "../styles/Home.module.css"; // Import CSS

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
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "#6B6869";
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
        <title>My Portfolio</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="../styles/global.css" />
      </Head>

      <canvas id="topo-canvas" className={styles.canvas}></canvas>

      <section className={styles.hero}>
        <div className={styles.heroContent}>

          <div className={styles.profileContainer}>
            <Image
              src="/me.jpg"
              alt="Profile Picture"
              width={300}
              height={300}
              className={styles.profileImage}
            />
          </div>

          <div className={styles.textContainer}>
            <h1 className={styles.title}>Arène de Circonstances</h1>
            <p className={styles.subtitle}>Portfolio de Mathieu HERNANDEZ</p>
          </div>
        </div>
      </section>

      <div className={styles.scrollable}></div>
    </div>
  );
}
