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
import Image from 'next/image';
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

    // Create an array of 3D shapes
    interface Shape {
      x: number;
      y: number;
      z: number;
      size: number;
      rotationX: number;
      rotationY: number;
      rotationZ: number;
      rotationSpeedX: number;
      rotationSpeedY: number;
      rotationSpeedZ: number;
      moveSpeedX: number;
      moveSpeedY: number;
      color: string;
      type: 'cube' | 'pyramid' | 'diamond' | 'prism';
      lineStyle: 'solid' | 'dashed' | 'dotted' | 'dashdot'; // Line style for the stroke
      lineDash: number[]; // Custom dash pattern for the stroke
    }

    const shapes: Shape[] = [];
    const numShapes = 15; // Reduced number of shapes
    
    // Color palette in shades of blue
    const colors = [
      '#C5EFFD',
      '#8DE1FD',
      '#59C3F0',
      '#44A5E3',
      '#334A52',
      '#E4E6E7',
    ];

    // Function to get a random shape type with equal distribution
    function getRandomShapeType(): 'cube' | 'pyramid' | 'diamond' | 'prism' {
      const types: ('cube' | 'pyramid' | 'diamond' | 'prism')[] = ['cube', 'pyramid', 'diamond', 'prism'];
      return types[Math.floor(Math.random() * types.length)];
    }
    
    // Function to get a random line style
    function getRandomLineStyle(): 'solid' | 'dashed' | 'dotted' | 'dashdot' {
      const styles: ('solid' | 'dashed' | 'dotted' | 'dashdot')[] = ['solid', 'dashed', 'dotted', 'dashdot'];
      return styles[Math.floor(Math.random() * styles.length)];
    }
    
    // Function to get line dash pattern based on style
    function getLineDashPattern(style: 'solid' | 'dashed' | 'dotted' | 'dashdot'): number[] {
      switch(style) {
        case 'solid':
          return [];
        case 'dashed':
          return [10, 7];
        case 'dotted':
          return [2, 5];
        case 'dashdot':
          return [12, 5, 2, 5];
        default:
          return [];
      }
    }
    
    // Initialize shapes with random properties
    for (let i = 0; i < numShapes; i++) {
      const lineStyle = getRandomLineStyle();
      shapes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 500 + 100, // Controls how close/far the shapes appear
        size: Math.random() * 80 + 40, // Bigger shapes: Random size between 40-80
        rotationX: Math.random() * Math.PI * 2,
        rotationY: Math.random() * Math.PI * 2,
        rotationZ: Math.random() * Math.PI * 2,
        rotationSpeedX: (Math.random() - 0.5) * 0.01, // Slower rotation
        rotationSpeedY: (Math.random() - 0.5) * 0.01, // Slower rotation
        rotationSpeedZ: (Math.random() - 0.5) * 0.01, // Slower rotation
        moveSpeedX: (Math.random() - 0.5) * 0.6, // Slower movement
        moveSpeedY: (Math.random() - 0.5) * 0.6, // Slower movement
        color: colors[Math.floor(Math.random() * colors.length)],
        type: getRandomShapeType(),
        lineStyle: lineStyle,
        lineDash: getLineDashPattern(lineStyle)
      });
    }

    // Function to draw a 3D cube with perspective
    function drawCube(shape: Shape) {
      // Calculate the projected size based on z-depth
      const projectedSize = shape.size * (800 / (800 + shape.z));
      
      // Rotate the points
      const cosX = Math.cos(shape.rotationX);
      const sinX = Math.sin(shape.rotationX);
      const cosY = Math.cos(shape.rotationY);
      const sinY = Math.sin(shape.rotationY);
      const cosZ = Math.cos(shape.rotationZ);
      const sinZ = Math.sin(shape.rotationZ);
      
      // Define the 8 corners of a cube
      const points = [
        { x: -1, y: -1, z: -1 },
        { x: 1, y: -1, z: -1 },
        { x: 1, y: 1, z: -1 },
        { x: -1, y: 1, z: -1 },
        { x: -1, y: -1, z: 1 },
        { x: 1, y: -1, z: 1 },
        { x: 1, y: 1, z: 1 },
        { x: -1, y: 1, z: 1 }
      ];
      
      // Rotate and project the points
      const projectedPoints = points.map(point => {
        // Rotate around X axis
        let y = point.y;
        let z = point.z;
        let rotatedY = y * cosX - z * sinX;
        let rotatedZ = y * sinX + z * cosX;
        
        // Rotate around Y axis
        let x = point.x;
        z = rotatedZ;
        let rotatedX = x * cosY + z * sinY;
        rotatedZ = -x * sinY + z * cosY;
        
        // Rotate around Z axis
        x = rotatedX;
        y = rotatedY;
        rotatedX = x * cosZ - y * sinZ;
        rotatedY = x * sinZ + y * cosZ;
        
        // Scale and project
        return {
          x: shape.x + rotatedX * projectedSize,
          y: shape.y + rotatedY * projectedSize
        };
      });
      
      // Define faces (each face is specified by indices into the points array)
      const faces = [
        [0, 1, 2, 3], // front face
        [4, 5, 6, 7], // back face
        [0, 1, 5, 4], // bottom face
        [2, 3, 7, 6], // top face
        [0, 3, 7, 4], // left face
        [1, 2, 6, 5]  // right face
      ];
      
      // Draw each face as a filled path
      ctx.lineWidth = 1;
      faces.forEach((face, i) => {
        ctx.beginPath();
        ctx.moveTo(projectedPoints[face[0]].x, projectedPoints[face[0]].y);
        
        for (let i = 1; i < face.length; i++) {
          ctx.lineTo(projectedPoints[face[i]].x, projectedPoints[face[i]].y);
        }
        
        ctx.closePath();
        
        // Set fill style with z-dependent transparency
        const opacityValue = Math.max(10, Math.round(40 * (1 - shape.z / 700))); // Opacity decreases with distance
        const opacity = opacityValue.toString(16).padStart(2, '0'); // Convert to hex
        ctx.fillStyle = `${shape.color}${opacity}`;
        ctx.strokeStyle = shape.color;
        
        // Apply line dash pattern if specified
        ctx.setLineDash(shape.lineDash);
        
        ctx.fill();
        ctx.stroke();
      });
    }
    
    // Function to draw a pyramid
    function drawPyramid(shape: Shape) {
      // Calculate the projected size based on z-depth
      const projectedSize = shape.size * (800 / (800 + shape.z));
      
      // Rotate the points
      const cosX = Math.cos(shape.rotationX);
      const sinX = Math.sin(shape.rotationX);
      const cosY = Math.cos(shape.rotationY);
      const sinY = Math.sin(shape.rotationY);
      const cosZ = Math.cos(shape.rotationZ);
      const sinZ = Math.sin(shape.rotationZ);
      
      // Define the 5 points of a pyramid (4 base points and 1 top point)
      const points = [
        { x: -1, y: -0.5, z: -1 }, // base point 1
        { x: 1, y: -0.5, z: -1 },  // base point 2
        { x: 1, y: -0.5, z: 1 },   // base point 3
        { x: -1, y: -0.5, z: 1 },  // base point 4
        { x: 0, y: 1, z: 0 }       // apex
      ];
      
      // Rotate and project the points
      const projectedPoints = points.map(point => {
        // Rotate around X axis
        let y = point.y;
        let z = point.z;
        let rotatedY = y * cosX - z * sinX;
        let rotatedZ = y * sinX + z * cosX;
        
        // Rotate around Y axis
        let x = point.x;
        z = rotatedZ;
        let rotatedX = x * cosY + z * sinY;
        rotatedZ = -x * sinY + z * cosY;
        
        // Rotate around Z axis
        x = rotatedX;
        y = rotatedY;
        rotatedX = x * cosZ - y * sinZ;
        rotatedY = x * sinZ + y * cosZ;
        
        // Scale and project
        return {
          x: shape.x + rotatedX * projectedSize,
          y: shape.y + rotatedY * projectedSize
        };
      });
      
      // Define faces (each face is specified by indices into the points array)
      const faces = [
        [0, 1, 2, 3], // base
        [0, 1, 4],    // side 1
        [1, 2, 4],    // side 2
        [2, 3, 4],    // side 3
        [3, 0, 4]     // side 4
      ];
      
      // Draw each face as a filled path
      faces.forEach(face => {
        ctx.beginPath();
        ctx.moveTo(projectedPoints[face[0]].x, projectedPoints[face[0]].y);
        
        for (let i = 1; i < face.length; i++) {
          ctx.lineTo(projectedPoints[face[i]].x, projectedPoints[face[i]].y);
        }
        
        ctx.closePath();
        
        // Set fill style with z-dependent transparency
        const opacityValue = Math.max(10, Math.round(40 * (1 - shape.z / 700))); // Opacity decreases with distance
        const opacity = opacityValue.toString(16).padStart(2, '0'); // Convert to hex
        ctx.fillStyle = `${shape.color}${opacity}`;
        ctx.strokeStyle = shape.color;
        
        // Apply line dash pattern if specified
        ctx.setLineDash(shape.lineDash);
        
        ctx.fill();
        ctx.stroke();
      });
    }

    // Function to draw a diamond (bipyramid)
    function drawDiamond(shape: Shape) {
      // Calculate the projected size based on z-depth
      const projectedSize = shape.size * (800 / (800 + shape.z));
      
      // Rotate the points
      const cosX = Math.cos(shape.rotationX);
      const sinX = Math.sin(shape.rotationX);
      const cosY = Math.cos(shape.rotationY);
      const sinY = Math.sin(shape.rotationY);
      const cosZ = Math.cos(shape.rotationZ);
      const sinZ = Math.sin(shape.rotationZ);
      
      // Define the 6 points of a diamond (octahedron - 4 middle points and 2 apex points)
      const points = [
        { x: 0, y: 0, z: -1.5 },   // top apex
        { x: -1, y: 0, z: 0 },     // middle point 1
        { x: 0, y: 1, z: 0 },      // middle point 2
        { x: 1, y: 0, z: 0 },      // middle point 3
        { x: 0, y: -1, z: 0 },     // middle point 4
        { x: 0, y: 0, z: 1.5 }     // bottom apex
      ];
      
      // Rotate and project the points
      const projectedPoints = points.map(point => {
        // Rotate around X axis
        let y = point.y;
        let z = point.z;
        let rotatedY = y * cosX - z * sinX;
        let rotatedZ = y * sinX + z * cosX;
        
        // Rotate around Y axis
        let x = point.x;
        z = rotatedZ;
        let rotatedX = x * cosY + z * sinY;
        rotatedZ = -x * sinY + z * cosY;
        
        // Rotate around Z axis
        x = rotatedX;
        y = rotatedY;
        rotatedX = x * cosZ - y * sinZ;
        rotatedY = x * sinZ + y * cosZ;
        
        // Scale and project
        return {
          x: shape.x + rotatedX * projectedSize,
          y: shape.y + rotatedY * projectedSize
        };
      });
      
      // Define faces (each face is a triangle)
      const faces = [
        [0, 1, 2], // top 1
        [0, 2, 3], // top 2
        [0, 3, 4], // top 3
        [0, 4, 1], // top 4
        [5, 1, 2], // bottom 1
        [5, 2, 3], // bottom 2
        [5, 3, 4], // bottom 3
        [5, 4, 1]  // bottom 4
      ];
      
      // Draw each face as a filled path
      ctx.lineWidth = 1;
      faces.forEach(face => {
        ctx.beginPath();
        ctx.moveTo(projectedPoints[face[0]].x, projectedPoints[face[0]].y);
        
        for (let i = 1; i < face.length; i++) {
          ctx.lineTo(projectedPoints[face[i]].x, projectedPoints[face[i]].y);
        }
        
        ctx.closePath();
        
        // Set fill style with z-dependent transparency
        const opacityValue = Math.max(10, Math.round(40 * (1 - shape.z / 700))); // Opacity decreases with distance
        const opacity = opacityValue.toString(16).padStart(2, '0'); // Convert to hex
        ctx.fillStyle = `${shape.color}${opacity}`;
        ctx.strokeStyle = shape.color;
        
        // Apply line dash pattern if specified
        ctx.setLineDash(shape.lineDash);
        
        ctx.fill();
        ctx.stroke();
      });
    }

    // Function to draw a triangular prism
    function drawPrism(shape: Shape) {
      // Calculate the projected size based on z-depth
      const projectedSize = shape.size * (800 / (800 + shape.z));
      
      // Rotate the points
      const cosX = Math.cos(shape.rotationX);
      const sinX = Math.sin(shape.rotationX);
      const cosY = Math.cos(shape.rotationY);
      const sinY = Math.sin(shape.rotationY);
      const cosZ = Math.cos(shape.rotationZ);
      const sinZ = Math.sin(shape.rotationZ);
      
      // Define the 6 points of a triangular prism
      const points = [
        { x: -1, y: -0.5, z: -1 },  // bottom triangle point 1
        { x: 1, y: -0.5, z: -1 },   // bottom triangle point 2
        { x: 0, y: 0.5, z: -1 },    // bottom triangle point 3
        { x: -1, y: -0.5, z: 1 },   // top triangle point 1
        { x: 1, y: -0.5, z: 1 },    // top triangle point 2
        { x: 0, y: 0.5, z: 1 }      // top triangle point 3
      ];
      
      // Rotate and project the points
      const projectedPoints = points.map(point => {
        // Rotate around X axis
        let y = point.y;
        let z = point.z;
        let rotatedY = y * cosX - z * sinX;
        let rotatedZ = y * sinX + z * cosX;
        
        // Rotate around Y axis
        let x = point.x;
        z = rotatedZ;
        let rotatedX = x * cosY + z * sinY;
        rotatedZ = -x * sinY + z * cosY;
        
        // Rotate around Z axis
        x = rotatedX;
        y = rotatedY;
        rotatedX = x * cosZ - y * sinZ;
        rotatedY = x * sinZ + y * cosZ;
        
        // Scale and project
        return {
          x: shape.x + rotatedX * projectedSize,
          y: shape.y + rotatedY * projectedSize
        };
      });
      
      // Define faces (triangular ends and rectangular sides)
      const faces = [
        [0, 1, 2],     // bottom triangle
        [3, 4, 5],     // top triangle
        [0, 1, 4, 3],  // side rectangle 1
        [1, 2, 5, 4],  // side rectangle 2
        [2, 0, 3, 5]   // side rectangle 3
      ];
      
      // Draw each face as a filled path
      ctx.lineWidth = 1;
      faces.forEach(face => {
        ctx.beginPath();
        ctx.moveTo(projectedPoints[face[0]].x, projectedPoints[face[0]].y);
        
        for (let i = 1; i < face.length; i++) {
          ctx.lineTo(projectedPoints[face[i]].x, projectedPoints[face[i]].y);
        }
        
        ctx.closePath();
        
        // Set fill style with z-dependent transparency
        const opacityValue = Math.max(10, Math.round(40 * (1 - shape.z / 700))); // Opacity decreases with distance
        const opacity = opacityValue.toString(16).padStart(2, '0'); // Convert to hex
        ctx.fillStyle = `${shape.color}${opacity}`;
        ctx.strokeStyle = shape.color;
        
        ctx.fill();
        ctx.stroke();
      });
    }

    // Track scroll position
    let scrollY = 0;
    let lastScrollY = 0;
    
    // Add scroll event listener
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    });
    
    function updateAndDrawShapes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate scroll delta for parallax effect
      const scrollDelta = scrollY - lastScrollY;
      lastScrollY = scrollY;
      
      // Sort shapes by z-depth to implement basic z-buffering
      shapes.sort((a, b) => b.z - a.z);
      
      // Update and draw each shape
      shapes.forEach(shape => {
        // Update rotation angles
        shape.rotationX += shape.rotationSpeedX;
        shape.rotationY += shape.rotationSpeedY;
        shape.rotationZ += shape.rotationSpeedZ;
        
        // Update position
        shape.x += shape.moveSpeedX;
        shape.y += shape.moveSpeedY;
        
        // Apply parallax effect based on depth (z-position)
        // Negative sign makes shapes go in opposite direction of scroll
        // Increased strength from 0.05 to 0.15 for more sensitivity
        // z value affects how much each shape moves (closer shapes move more)
        const parallaxFactor = -0.15 * (1 - shape.z / 600);
        shape.y += scrollDelta * parallaxFactor;
        
        // Boundary checks
        if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
        if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
        if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
        if (shape.y > canvas.height + shape.size) shape.y = -shape.size;
        
        // Draw the shape
        if (shape.type === 'cube') {
          drawCube(shape);
        } else if (shape.type === 'pyramid') {
          drawPyramid(shape);
        } else if (shape.type === 'diamond') {
          drawDiamond(shape);
        } else if (shape.type === 'prism') {
          drawPrism(shape);
        }
      });
    }

    function animate() {
      updateAndDrawShapes();
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
        <meta name="description" content="Bienvenue sur le Portfolio de Mathieu HERNANDEZ, développeur full-stack, se spécialisant en Intelligence Artificielle à Epitech." />
        <meta name="keywords" content="développeur, full-stack, intelligence artificielle, web, portfolio, Mathieu HERNANDEZ, finder, Finder, Kwester, kwester, GGPS, Tétra-Développement, tetradeveloppement, tétradéveloppement, programmeur, programmation, hernandez, mathieu, Marseille, Bouc-Bel-Air, Aix-en-Provence, Aix-Marseille, Aix-Marseille Université, Université, Epitech, React, Nextjs, Laravel, freelance" />
        <meta name="author" content="Mathieu HERNANDEZ" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="Portfolio - Mathieu HERNANDEZ" />
        <meta property="og:description" content="Bienvenue sur le Portfolio de Mathieu HERNANDEZ, développeur full-stack, se spécialisant en Intelligence Artificielle à Epitech." />
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
            <Image 
              src="/me.jpg" 
              alt="Mathieu Hernandez" 
              width={400} 
              height={400} 
              className={styles.profileImage}
              priority={true} // For above-fold images
            />
            </div>
            <div className={styles.aboutMeContainer}>
              <h2 className={styles.aboutMeTitle}>À propos de moi</h2>
              <section className={styles.aboutMeDescription}>
                
              Je m'appelle <b>Mathieu HERNANDEZ</b>, j'ai 20 ans et j'intègre bientôt <b>Epitech</b>, Marseille, dans le cadre d'un <b>Master of Science Technique</b>, avec une spécialisation en <b>Intelligence Artificielle</b>, après avoir réalisé un <b>BUT Informatique</b> à l'IUT d'Arles. <br/>
              {/* Passionné par la programmation et souhaitant m'orienter vers l’<b>intelligence artificielle</b> et y faire carrière,
              je vais bientôt intégrer un Master of Science en IA à <b>Epitech</b>.<br/> */}
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
                  <span className={styles.jobTitle}>Master of Science Technique - Spécialisation IA</span>
                  <span className={styles.companyName}>Epitech (Marseille)</span>
                  <span className={styles.period}>2025-2027</span>
                </div>
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
          <a href="/CV_HERNANDEZ_MATHIEU_2025.pdf" download className={styles.contactItem}>
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
