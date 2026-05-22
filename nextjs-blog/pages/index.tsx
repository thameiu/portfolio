"use client";
// import '../styles/v2/v2.css'

import Head from "next/head";
import type { GetServerSideProps } from "next";
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
import type { ProjectData } from "../components/v2/projets/types";

const PREVIEW_PATH = "/preview.png";

type PortfolioV2Props = {
  pageUrl: string;
  ogImageUrl: string;
  ogImageSecureUrl: string | null;
};

/* ─── 4 projects ──────────────────────────────── */
const PROJECTS: ProjectData[] = [
  {
    id: "rgbast",
    title: "RGBast",
    fullTitle: "RGBast",
    titleSvg: "/rgbast/rgbast.svg",
    description:
      "Application web de versionning et génération de palettes de couleurs pour designers et développeurs.",
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
      "/rgbast/rgbast-11.png",
      "/rgbast/rgbast-12.png",
      "/rgbast/rgbast-8.png",
      "/rgbast/rgbast-9.png",
      "/rgbast/rgbast-10.png",
    ],
    story: [
      {
        id: "rgbast-story-1",
        layout: "text",
        title: "Contexte",
        text: "J’utilisais souvent Coolors, application web de génération et visualisation de **palettes**, en outil pour réaliser les chartes graphiques de mes projets d’études. Mais ce site a certains défauts qui me gênaient. Outre les fonctionnalités qui sont **payantes**, ce qui est déjà très limitant, on ne peut pas modifier une **palette** enregistrée : l’ouvrir dans le générateur et la sauvegarder en crée une autre. Et le générateur de palettes est très linéaire, on ne peut pas choisir de **couleurs** à garder, ou de types d’harmonies, c’est complètement aléatoire.<br/><br/>À l’origine je voulais simplement créer un meilleur système de sauvegarde de palette… Puis j’ai eu une meilleure idée : **Git**.",
      },
      {
        id: "rgbast-story-2",
        layout: "split-right-image",
        title: "Fonctionnalités",
        text: "Sur RGBAST, on peut créer des palettes avec 1 à 15 couleurs, chacune avec son label personnalisé. Chaque sauvegarde crée un **Snapshot** avec des changements liés à celui-ci. Au-delà du snapshot initial, SEULS les changements sont stockés : **Addition**, **Modification** (code hexadécimal ou label), **déplacement**, **suppression**). Cela permet de ne stocker que les informations nécessaires sans duplication de données, reproduisant l’essence de Git.",
        image: "/rgbast/rgbast-4.png",
        imageAlt: "Section avec en parallèle l’image rgbast-4",
      },
      {
        id: "rgbast-story-3",
        layout: "text",
        text: "J’ai également implémenté un système de **branches**, qui ici servent de brouillons pour explorer des variantes de couleurs. Un **Merge** peut être effectué d’une branche vers la palette principale afin de valider des changements. Mais si la version la plus récente de la palette ne vous convient plus, il est toujours possible d’effectuer un **Revert**, ce qui fait revenir une branche à un ancien snapshot.",
      },
      {
        id: "rgbast-story-4",
        layout: "text",
        text: "Pour l’indexation des couleurs, afin de conserver leur ordre sans devoir réindexer chaque élément en cas d’une insertion au début, RGBAST utilise un **Classement Lexicographique**, avec des lettres à la place de chiffres.<br/> [Lexicographic order - Wikipedia](https://en.wikipedia.org/wiki/Lexicographic_order)<br/><br/>Seul l’élément déplacé ou inséré est modifié, aucun changement supplémentaire ne doit être stocké.",
      },
      {
        id: "rgbast-story-5",
        layout: "text",
        text: "En restant dans le thème du dépôt de code, un système de dossiers est présent, pour ranger ses palettes, et pour générer des URLs plus pertinentes :<br/><br/>[https://www.rgbast.com/users/thameiu/projets/ErgoSix](https://www.rgbast.com/users/thameiu/projets%2FErgoSix)",
      },
      {
        id: "rgbast-story-6",
        layout: "split-left-image",
        text: "Pour la génération de palettes, un choix d’**harmonies** est disponible, permettant par exemple d’avoir des couleurs opposées, ou plutôt des nuances proches, et surtout permet de générer des palettes autour d’1 à 3 couleurs, si une vous tient à cœur. Ou alors, si une image est inspirante, il est possible d’en extraire les **couleurs dominantes**.",
        image: "/rgbast/rgbast-generation.png",
        imageAlt: "Section avec en parallèle l’image rgbast-generation",
      },
      {
        id: "rgbast-story-7",
        layout: "text",
        text: "Un export en PDF, PNG, SVG et même en variables CSS/SCSS est également disponible pour la portabilité maximale de la palette.",
      },
      {
        id: "rgbast-story-8",
        layout: "text",
        text: "Afin de compléter l’application, un **sélecteur de couleur** est disponible, donnant toutes les informations pertinentes d’une couleur, comme les conversions, son nom approximatif, son contraste sur du noir, blanc, ou une autre couleur, ses équivalences avec différents types de daltonisme, et surtout le **Bast Score** : Score inédit indiquant, sur une échelle de 0 à 100 à quel point une couleur est indescriptible, ambiguë, bâtarde. C’est de là que RGBAST tient son nom, même si un jeu de mot avec “Past” existe aussi.",
      },
      {
        id: "rgbast-story-9",
        layout: "text",
        text: "Dans le contexte de cet ajout, je suis tombé sur une autre problématique. Je voulais trouver un moyen d’afficher un sélecteur affichant l’intégralité des couleurs RGB en une image… mais c’est impossible, si l’on veut un résultat lisible, car le système RGB est en 3 dimensions. C’est en faisant mes recherches que je suis tombé sur le concept de **visualisateur RGB 3D** : Sous la forme d’un cube, sur lequel les axes x, y et z correspondent à des valeurs, de 0 à 255, de rouge, vert, bleu.",
      },
      {
        id: "rgbast-story-10",
        layout: "split-right-image",
        text: "J’ai donc implémenté ce sélecteur, en le rendant le plus intuitif et maniable possible : avec des **sliders** pour chaque axe, permettant de “trancher” le cube pour accéder aux valeurs en son centre, et un 4ème slider optionnel pour limiter le nombre de valeurs par axe. Vous devez vous dire : à quoi sert un sélecteur 3D de couleurs ? … Ça sert à rien, j’avoue. Mais si jamais quelqu’un en a besoin, ça existe. C’est toute l’essence de RGBAST.",
        image: "/rgbast/rgbast-cube.png",
        imageAlt: "Section avec en parallèle rgbast-cube",
      },
      {
        id: "rgbast-story-11",
        layout: "text",
        title: "Stack Technique",
        text: "Côté stack, RGBAST repose sur **Vue.js** pour le frontend, **FastAPI** pour l’API, **PostgreSQL** en tant que SGBDR et **Docker** pour conteneuriser le Back. Celui-ci est déployé sur un **VPS Ubuntu IONOS**, exposé via **Nginx** en reverse proxy. J’ai aussi mis en place **SMTP IONOS** pour les emails (inscription et réinitialisation de mot de passe), ainsi qu’un pipeline **GitHub Actions** pour le déploiement du backend et les migrations automatiques.<br/><br/>Ce projet m’a permis de travailler sur tous les aspects du développement - **architecture backend**, **conceptualisation BDD 4NF**, **web design & UX** - tout en m’amusant.",
      },
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
    // Story temporairement désactivée (hors RGBast).
    story: [],
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
    // Story temporairement désactivée (hors RGBast).
    story: [],
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
      "/ggps/ggps-6.png",
      "/ggps/ggps-7.png",
    ],
    // Story temporairement désactivée (hors RGBast).
    story: [],
  },
];

export const getServerSideProps: GetServerSideProps<PortfolioV2Props> = async ({ req }) => {
  const envSiteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

  const forwardedHost = req.headers["x-forwarded-host"];
  const host = Array.isArray(forwardedHost)
    ? forwardedHost[0]
    : (forwardedHost || req.headers.host || "");

  const forwardedProtoHeader = req.headers["x-forwarded-proto"];
  const forwardedProto = Array.isArray(forwardedProtoHeader)
    ? forwardedProtoHeader[0]
    : forwardedProtoHeader;
  const proto = (forwardedProto?.split(",")[0].trim() || (host.includes("localhost") ? "http" : "https"));
  const requestSiteUrl = host ? `${proto}://${host}` : "";

  const siteUrl = (requestSiteUrl || envSiteUrl).replace(/\/+$/, "");
  const pageUrl = siteUrl || "/";
  const ogImageUrl = siteUrl ? `${siteUrl}${PREVIEW_PATH}` : PREVIEW_PATH;
  const ogImageSecureUrl = ogImageUrl.startsWith("https://") ? ogImageUrl : null;

  return {
    props: {
      pageUrl,
      ogImageUrl,
      ogImageSecureUrl,
    },
  };
};

export default function PortfolioV2({ pageUrl, ogImageUrl, ogImageSecureUrl }: PortfolioV2Props) {
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
        <meta property="og:url" content={pageUrl} />
        <meta property="og:site_name" content="Mathieu Hernandez Portfolio" />
        <meta property="og:title" content="Mathieu Hernandez - Portfolio" />
        <meta property="og:description" content="Portfolio de Mathieu Hernandez, développeur polyvalent (Frontend, Backend, Web Design, Cloud, Cybersécurité)." />
        <meta property="og:image" content={ogImageUrl} />
        {ogImageSecureUrl ? <meta property="og:image:secure_url" content={ogImageSecureUrl} /> : null}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="644" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:alt" content="Aperçu du portfolio de Mathieu Hernandez" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content="Mathieu Hernandez - Portfolio" />
        <meta name="twitter:description" content="Portfolio de Mathieu Hernandez, développeur full-stack." />
        <meta name="twitter:image" content={ogImageUrl} />
        <meta name="twitter:image:alt" content="Aperçu du portfolio de Mathieu Hernandez" />
        <link rel="canonical" href={pageUrl} />
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
