"use client";
// import '../styles/v2/v2.css'

import Head from "next/head";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import HeroSection   from "../components/v2/HeroSection";
import AboutV2       from "../components/v2/AboutV2";
import CareerV2      from "../components/v2/CareerV2";
import ProjectsCardsV2 from "../components/v2/ProjectsCardsV2";
import ContactV2     from "../components/v2/ContactV2";
import Loader        from "../components/v2/Loader";
import SideDecor     from "../components/v2/SideDecor";
import HeaderV2      from "../components/v2/HeaderV2";
import ScrollbarV2   from "../components/v2/ScrollbarV2";
import type { ProjectData } from "../components/v2/ProjectCard3D";

const RAW_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
const SITE_URL = RAW_SITE_URL.replace(/\/+$/, "");
const PREVIEW_PATH = "/preview.png?v=2";
const OG_IMAGE_URL = SITE_URL ? `${SITE_URL}${PREVIEW_PATH}` : PREVIEW_PATH;
const PAGE_URL = SITE_URL || "/";

/* ─── 4 projects ──────────────────────────────── */
const PROJECTS: ProjectData[] = [
  {
    id: "rgbast",
    title: "RGBast",
    fullTitle: "RGBast",
    titleSvg: "/rgbast/rgbast.svg",
    description:
      "Application web de versionning pour palettes de couleurs : snapshots, branches, merge, revert, dossiers, générateur de palettes, bast score et sélecteur de couleur interactif.",
    details:
      "Frontend Vue 3 + Vite · Backend FastAPI + SQLAlchemy + Alembic · VPS Ubuntu + CI/CD GitHub Actions · reverse proxy Nginx + Docker.",
    bgColor: "#E9E9E9",
    accentColor: "#B410CC",
    isDark: false,
    iconType: "circles",
    techStack: ["Vue 3", "Vite", "FastAPI", "SQLAlchemy", "Docker", "GitHub Actions", "Nginx"],
    screenshots: [
      "/rgbast/rgbast-1.png",
      "/rgbast/rgbast-2.png",
      "/rgbast/rgbast-3.png",
      "/rgbast/rgbast-4.png",
      "/rgbast/rgbast-5.png",
      "/rgbast/rgbast-6.png",
      "/rgbast/rgbast-7.png",
      "/rgbast/rgbast-8.png",
      "/rgbast/rgbast-9.png",
      "/rgbast/rgbast-10.png",
    ],
    link: "https://rgbast.com",
    linkText: "Voir RGBast",
  },
  {
    id: "2clock",
    title: "2Clock",
    fullTitle: "2Clock",
    titleSvg: "/2clock/2Clock.svg",
    description:
      "Application web de pointage horodaté et d'analyse de KPI en entreprise avec sécurité avancée.",
    details:
      "Architecture microservices Next.js + Express · codes TOTP éphémères WebSocket · CI/CD Jenkins · Docker + Nginx + SSL.",
    bgColor: "#27314F",
    accentColor: "#FF4422",
    isDark: true,
    iconType: "clock",
    techStack: ["Next.js", "Express", "TypeScript", "Supabase", "Docker", "Jenkins", "Jest"],
    screenshots: [
      "/2clock/2clock-1.png",
      "/2clock/2clock-2.png",
      "/2clock/2clock-3.png",
      "/2clock/2clock-4.png",
      "/2clock/2clock-5.png",
      "/2clock/2clock-6.png",
      "/2clock/2clock-7.png",
      "/2clock/2clock-8.png",
      "/2clock/2clock-9.png",
      "/2clock/2clock-10.png",
      "/2clock/2clock-11.png",
      "/2clock/2clock-12.png",
      "/2clock/2clock-13.png",
      "/2clock/2clock-14.png",
      "/2clock/2clock-15.png",
    ],
    link: "https://github.com/abakar-oumar-abdallah/T-DEV-700",
    linkText: "Voir le dépôt",
  },
  {
    id: "pathfinder",
    title: "Pathfinder",
    fullTitle: "Pathfinder (Miratlas)",
    titleSvg: "/pathfinder/pathfinder.svg",
    description:
      "Application web de cartographie de perturbations atmosphériques pour communications FSOC en optique libre.",
    details:
      "Leaflet interactif · traitement pixel-par-pixel des images nuageuses · graphiques Recharts · back-office gestion utilisateurs.",
    bgColor: "#D4DADC",
    accentColor: "#2A7A1A",
    isDark: false,
    iconType: "satellite",
    techStack: ["Next.js", "Laravel", "Leaflet", "Docker", "TypeScript", "PHP", "PostgreSQL"],
    screenshots: [
      "/pathfinder/pathfinder-1.png",
      "/pathfinder/pathfinder-2.png",
      "/pathfinder/pathfinder-3.png",
      "/pathfinder/pathfinder-4.png",
      "/pathfinder/pathfinder-5.png",
    ],
    link: "https://miratlas.com",
    linkText: "Voir Miratlas",
  },
  {
    id: "ggps",
    title: "GGPS",
    fullTitle: "GGPS - Gamer's Global Positionning System",
    titleSvg: "/ggps/ggps.svg",
    description:
      "Application web de localisation d'événements du jeu vidéo avec chatrooms temps réel.",
    details:
      "NestJS + WebSockets Socket.io · géolocalisation Leaflet · système de permissions par rôles · authentification JWT.",
    bgColor: "#0A0A0A",
    accentColor: "#980000",
    isDark: true,
    iconType: "controller",
    techStack: ["Next.js", "NestJS", "Leaflet", "Socket.io", "TypeScript", "Docker"],
    screenshots: [
      "/ggps/ggps-1.png",
      "/ggps/ggps-2.png",
      "/ggps/ggps-3.png",
      "/ggps/ggps-4.png",
      "/ggps/ggps-5.png",
    ],
  },
];

export default function PortfolioV2() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prevRestoration = window.history.scrollRestoration;
    window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.documentElement.classList.add("v2-page");
    document.body.classList.add("v2-page");
    return () => {
      window.history.scrollRestoration = prevRestoration;
      document.documentElement.classList.remove("v2-page");
      document.body.classList.remove("v2-page");
    };
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

    const shouldUseNativeScroll = window.matchMedia("(max-width: 1023px)").matches;
    ScrollTrigger.config({
      limitCallbacks: true,
      ignoreMobileResize: shouldUseNativeScroll,
    });

    if (shouldUseNativeScroll) {
      ScrollTrigger.normalizeScroll(true);
    }

    document.body.classList.toggle("v2-smooth", !shouldUseNativeScroll);
    const smoother = shouldUseNativeScroll
      ? null
      : ScrollSmoother.create({
          wrapper: "#smooth-wrapper",
          content: "#smooth-content",
          smooth: 1.4,
          effects: true,
        });

    if (smoother) smoother.scrollTop(0);
    else window.scrollTo(0, 0);

    return () => {
      if (shouldUseNativeScroll) {
        ScrollTrigger.normalizeScroll(false);
      }
      document.body.classList.remove("v2-smooth");
      smoother?.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useEffect(() => {
    const finishLoading = () => setIsLoading(false);

    if (document.readyState === "complete") {
      finishLoading();
      return;
    }

    window.addEventListener("load", finishLoading);
    return () => window.removeEventListener("load", finishLoading);
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <Head>
        <title>Mathieu Hernandez - Portfolio</title>
        <meta name="description" content="Mathieu Hernandez, Développeur Polyvalent - Portfolio" />
        <meta
          name="keywords"
          content="Mathieu Hernandez, portfolio, développeur web, développeur full-stack, développeur frontend, développeur backend, Next.js, React, TypeScript, NestJS, FastAPI, Laravel, Docker, Leaflet, PostgreSQL, cybersécurité, cloud, alternance, Marseille, Aix-en-Provence, Windev, rgbast, RGBast, GGPS, Pathfinder, 2Clock, Three, Three.js, Web Design, Web Designer, webdev, web dev, dev web"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:site_name" content="Mathieu Hernandez Portfolio" />
        <meta property="og:title" content="Mathieu Hernandez - Portfolio" />
        <meta property="og:description" content="Portfolio de Mathieu Hernandez, développeur polyvalent (Frontend, Backend, Cloud, Cybersécurité)." />
        <meta property="og:image" content={OG_IMAGE_URL} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="644" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Aperçu du portfolio de Mathieu Hernandez" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={PAGE_URL} />
        <meta name="twitter:title" content="Mathieu Hernandez - Portfolio" />
        <meta name="twitter:description" content="Portfolio de Mathieu Hernandez, développeur full-stack." />
        <meta name="twitter:image" content={OG_IMAGE_URL} />
        <meta name="twitter:image:alt" content="Aperçu du portfolio de Mathieu Hernandez" />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Fixed elements outside smooth-content */}
      <HeaderV2 />
      <ScrollbarV2 />

      <div id="smooth-wrapper">
        <div id="smooth-content">
          <SideDecor />
          <HeroSection />
          <AboutV2 />
          <CareerV2 />
          <ProjectsCardsV2 projects={PROJECTS} />

          <ContactV2 />
        </div>
      </div>
    </>
  );
}
