"use client";
// import '../styles/v2/v2.css'

import Head from "next/head";
import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import HeroSection from "../components/v2/HeroSection";
import AboutV2 from "../components/v2/AboutV2";
import CareerV2 from "../components/v2/CareerV2";
import ProjectsCardsV2 from "../components/v2/ProjectsCardsV2";
import ContactV2 from "../components/v2/ContactV2";
import Loader from "../components/v2/Loader";
import SideDecor from "../components/v2/SideDecor";
import HeaderV2 from "../components/v2/HeaderV2";
import ScrollbarV2 from "../components/v2/ScrollbarV2";
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
        techStack: [
            "Vue 3",
            "Vite",
            "FastAPI",
            "SQLAlchemy",
            "Docker",
            "GitHub Actions",
            "Nginx",
        ],
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
        linkText: "voir RGBAST",
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
        techStack: [
            "Next.js",
            "Express",
            "TypeScript",
            "Supabase",
            "Docker",
            "Jenkins",
            "Jest",
        ],
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
        story: [
            {
                id: "2clock-story-1",
                layout: "text",
                title: "Contexte",
                text: "Au début de ma 1ère année de Master of Science Technique à Epitech, j’ai dû réaliser un projet de développement d’une application de pointage horodaté, permettant de visualiser au moins 2 types de **KPI**.<br/><br/>Avec mon équipe de projet, nous l’avons appelée **2Clock**, symbolisant l’aspect “binaire” du pointage, et sa simplicité sur cette application : 2 pointages, et c’est tout. C’est également un jeu de mot sur le terme anglais “To clock in/out”, signifiant “pointer”.<br/><br/>2Clock est conçu pour être ultra-flexible et solide. Une fois votre accès créé, vous pouvez gérer vos différentes équipes, et vous pouvez également faire partie des employés d’une autre équipe.",
            },
            {
                id: "2clock-story-2",
                layout: "split-right-image",
                text: "Chaque employé hérite par défaut du **Planning** général, mais peut également avoir son propre emploi du temps hebdomadaire, avec des jours de repos, des horaires précis de début et de fin, fonctionnant aussi avec les horaires nocturnes.",
                image: "/2clock/2clock_planning.png",
                imageAlt: "Planning hebdomadaire dans 2Clock",
            },
            {
                id: "2clock-story-3",
                layout: "split-right-image",
                text: "L’application étant uniquement numérique (sans système de badges physiques), afin de sécuriser le pointage, il s’effectue avec un code **éphémère** à 6 chiffres, s’actualisant toutes les 30 secondes, accessible uniquement par un responsable de l’équipe.",
                image: "/2clock/2clock-clock.png",
                imageAlt: "Code de pointage éphémère dans 2Clock",
            },
            {
                id: "2clock-story-4",
                layout: "text",
                text: "Chaque équipe a son propre fuseau horaire, afin de calculer correctement les heures d’arrivée et de départ. L’UX pour les employés est conçue pour être le plus droit au but possible : vous tapez le code, vous validez, et c’est tout.<br/><br/>Les managers, quant à eux, ont accès à des pages de statistiques par employé, permettant de connaître leur ponctualité d’arrivée et de départ (avance, retard, heures supplémentaires…) sur une plage de dates ou de jours passés, et leurs absences, qui peuvent être corrigées en cas d’oubli de pointage ou d’imprévu. Les KPI sont également conçus pour être intuitifs, faciles à comprendre et à manipuler.",
            },
            {
                id: "2clock-story-5",
                layout: "full-image",
                image: "/2clock/2clock-kpi.png",
                imageAlt: "Dashboard KPI de 2Clock",
            },
            {
                id: "2clock-story-6",
                layout: "text",
                title: "Côté technique",
                text: "Pour rendre l’application la plus flexible, solide et durable, l’aspect le plus important de ce projet était la conception de la base de données.<br/><br/>Nous avons réussi à créer un modèle compact, **4NF**, permettant à chaque donnée d’être techniquement “définitive”.",
            },
            {
                id: "2clock-story-7",
                layout: "full-image",
                image: "/2clock/2clock-db.png",
                imageAlt: "Schéma de base de données de 2Clock",
            },
            {
                id: "2clock-story-8",
                layout: "text",
                text: "Chaque **Clock**, ou pointage, contient l’heure d’arrivée et de départ, définissant donc une journée de travail. Celui-ci est toujours lié à un planning hebdomadaire, soit celui de l’équipe (par défaut), soit celui de l’utilisateur, au sein de l’équipe (en cas de différence d’emploi du temps).<br/><br/>Pour éviter les colonnes vides et la redondance de données, un planning rassemble 1 à 7 **Schedule**, emplois du temps quotidiens, avec le jour de la semaine (lundi, mardi…) et les horaires. Si un employé ne travaille que le lundi, seules les données du lundi existeront en base. Lorsqu’un planning est modifié, 2Clock en crée un nouveau, tout en conservant le précédent. Un pointage sera alors définitivement lié à un emploi du temps, ce qui donne aux KPI et statistiques une immunité aux incohérences et données erronées.<br/><br/>Pour la fonctionnalité du pointage protégé, nous sommes passés par un **WebSocket**, canal de communication entre le client et le serveur, fonctionnant par signaux émis et reçus. Cela permet d’avoir un code identique pour toute l’équipe, et de l’actualiser automatiquement toutes les 30 secondes sur l’écran du responsable, avec le décompte.",
            },
            {
                id: "2clock-story-9",
                layout: "text",
                title: "Stack Technique",
                text: "Le backend de ce projet a été réalisé en **Express.js**, et est protégé par différents **Middlewares** empêchant les injections, attaques, spams, et vérifiant les permissions et rôles d’équipes, en plus de l’authentification. Le frontend est en **Next.js**, conteneurisé avec le backend via **Docker**, et nous sommes passés par **Supabase** pour créer la base de données, afin d’avoir des données de test partagées. Hébergé, pendant le projet, sur un serveur **OVHCloud**, nous avons utilisé **Jenkins** pour mettre en place un pipeline **CI/CD**, vérifiant le formatage du code, les tests unitaires, et déployant en production.",
            },
        ],
        link: "https://github.com/abakar-oumar-abdallah/T-DEV-700",
        linkText: "voir le dépôt",
    },
    {
        id: "pathfinder",
        title: "Pathfinder",
        fullTitle: "Pathfinder (Miratlas)",
        titleSvg: "/pathfinder/pathfinder.svg",
        description:
            "Application web de cartographie de perturbations atmosphériques pour communications optiques en espace libre.",
        details:
            "Leaflet interactif · traitement pixel-par-pixel des images nuageuses · graphiques Recharts · back-office gestion utilisateurs et datasets",
        bgColor: "#D4DADC",
        accentColor: "#2A7A1A",
        isDark: false,
        iconType: "satellite",
        techStack: [
            "Next.js",
            "Laravel",
            "Leaflet",
            "Docker",
            "TypeScript",
            "PHP",
            "PostgreSQL",
        ],
        screenshots: [
            "/pathfinder/pathfinder-1.png",
            "/pathfinder/pathfinder-2.png",
            "/pathfinder/pathfinder-3.png",
            "/pathfinder/pathfinder-4.png",
            "/pathfinder/pathfinder-5.png",
        ],
        story: [
            {
                id: "pathfinder-story-0",
                layout: "text",
                title: "Miratlas",
                text: "Dans le cadre de ma **3ème année** de **BUT Informatique**, j’ai réalisé une alternance chez **Miratlas**.<br/><br/>**Miratlas** est une entreprise française qui fournit aux opérateurs télécoms, institutions spatiales et acteurs de la défense des mesures atmosphériques précises pour garantir la fiabilité des communications optiques, en continu. Pour cela, ils conçoivent et déploient des instruments et des services permettant de mesurer en temps réel l’ensemble des paramètres qui impactent la propagation de la lumière dans l’atmosphère, notamment la **turbulence**, la **couverture nuageuse**, et l’**absorption** de lumière.",
            },
            {
                id: "pathfinder-story-0b",
                layout: "text",
                text: "Leur outil principal : le **Sky Monitor**, outil compact d’analyse de perturbations atmosphériques, dont les images et données sont accessibles via une **API**. Il permet de mesurer les conditions pour assurer une communication optique **sol-espace** de la plus haute qualité.",
            },
            {
                id: "pathfinder-story-0c",
                layout: "split-right-image",
                text: "Le **Sky Monitor** se démarque particulièrement par sa petite taille, sa facilité d’installation, et son prix réduit, en comparaison aux autres solutions. Malgré cela, il ne permet pas directement de décider de la localisation d’une station optique. C’est là que **Pathfinder** intervient.",
                image: "/pathfinder/pathinder-skymonitor.png",
                imageAlt: "Sky Monitor de Miratlas",
            },
            {
                id: "pathfinder-story-1",
                layout: "text",
                title: "Pathfinder 1.0",
                text: "**Pathfinder** est un outil logiciel d’analyse et de simulation qui aide à sélectionner les sites les plus performants pour les stations **OGS** et à optimiser les liens optiques. Il prend la forme d’une application web en **Next.js** avec une carte, où l’on peut visualiser ses points d’intérêts, chacun ayant des graphiques de perturbations atmosphériques (**histogrammes**, **séries temporelles**).",
            },
            {
                id: "pathfinder-story-2",
                layout: "split-right-image",
                text: "Il permet également de voir les taux moyens de couverture nuageuse et de turbulence, par semestre et période de la journée, dans toute la planète, avec des layers de carte. Le taux de **TCC** (**Total Cloud Cover**) est visualisé à travers un spectre de couleurs de **1** (couverture totale) à **0** (absence de nuages), et il en va de même pour le **r0**, représentant le diamètre moyen d’une zone sans turbulence, de **0,01 m** à **0,15 m**. Ces images sont conçues de façon intuitive : plus les valeurs sont élevées, plus les couleurs sont chaudes et claires, représentant des conditions optimales pour les communications optiques.",
                image: "/pathfinder/pathfinder-demo.png",
                imageAlt: "Démonstration de Pathfinder 1.0",
            },
            {
                id: "pathfinder-story-3",
                layout: "text",
                text: "À mon arrivée, **Pathfinder** n’était pas très scalable : il utilisait **Appwrite** pour stocker les utilisateurs et images de graphiques, générées en amont via **Matplotlib**. Les gestions d’accès n’étaient pas très solides, se basant principalement sur le DNS de l’adresse e-mail de l’utilisateur, ce qui bloquait particulièrement la gestion des accès. Bien que fonctionnel et déployé, il était surtout à l’état de **POC**.",
            },
            {
                id: "pathfinder-story-4",
                layout: "text",
                text: "En tant qu’alternant chez **Miratlas**, ma mission était de faire une version **2.0** de **Pathfinder**, sans **Appwrite**, en conceptualisant et réalisant un backend **Laravel** et une **BDD**, de zéro.",
            },
            {
                id: "pathfinder-story-5",
                layout: "text",
                title: "Pathfinder 2.0",
                text: "La première étape était de modéliser un schéma de données solide et **4NF**. La base gère désormais les données ainsi :<br/><br/>Les **utilisateurs (Users)** font désormais partie d’**équipes (Teams & Memberships)**, et les **accès** des équipes aux **points d’intérêts géolocalisés (Sites)** se font à travers des **catégories (Categories & Accesses)**.",
            },
            {
                id: "pathfinder-story-6",
                layout: "text",
                text: "Les sites ont tous **10 graphiques**, visualisant des données de **r0**, **theta0**, **tau0**, **TCC** et de l’**indice de Rytov**. Ils ont **5 histogrammes (Histograms)**, qui représentent **50 intervalles** (`[0;0.2]`, `[0.2;0.4]` … `[0.98;1]`) avec le nombre de valeurs trouvées dans chacun, et **5 cartes de chaleur**, ou **séries temporelles (Timeseries)**, qui représentent pour chaque jour de l’année (abscisses) et toutes les **3 heures** (ordonnées) le taux de chaque perturbation (couleur, sur un spectre). Chaque ligne va donc avoir l’identifiant du site, et les données nécessaires, séparées atomiquement en plusieurs colonnes.<br/><br/>Grâce à ce format de stockage, les données sont faciles à maintenir, importables en **CSV** (ou archive de **CSV**, pour un import en masse), et visualisées dynamiquement sur le frontend grâce aux librairies **Recharts** et **heatmap-grid**.",
            },
            {
                id: "pathfinder-story-6b",
                layout: "full-image",
                image: "/pathfinder/pathfinder-histograms.png",
                imageAlt: "Histogrammes de Pathfinder 2.0",
                imageSecondary: "/pathfinder/pathfinder-timeseries.png",
                imageSecondaryAlt: "Séries temporelles de Pathfinder 2.0",
            },
            {
                id: "pathfinder-story-7",
                layout: "text",
                title: "Seuils de valeurs",
                text: "Les images overlay, affichant la couverture nuageuse ou la turbulence moyenne à travers la planète, sont désormais stockées dans un dossier public du backend afin de les rendre accessibles via l’**API**. Cette fonctionnalité avait également **2 axes d’amélioration** : la possibilité d’appliquer des **seuils de transparence**, pour cacher des valeurs en dessous d’un minimum ou supérieures à un maximum, et l’option de changer la **colormap** utilisée, car ces images étaient toutes générées via **Matplotlib** avec le spectre **viridis** (violet - jaune fluo).",
            },
            {
                id: "pathfinder-story-8",
                layout: "text",
                text: "Ma première idée était de dynamiser les fonds de carte, similairement aux graphiques.<br/><br/>En stockant toutes les valeurs, utilisées pour générer les fonds de carte, au sein de la base de données, il serait possible de les récupérer sur le frontend et de calculer la couleur des zones selon leurs valeurs. Mais cette méthode est loin d’être optimale.<br/><br/>Il faut prendre en compte que ces images visualisent des valeurs tous les **0,3** de latitude et longitude, ce qui fait donc :<br/><br/>(90 x 2 / 0,3) x (180 x 2 / 0,3) = **600 x 1200 valeurs** au sein des tableaux utilisés pour générer les fonds de carte, ou, au sein d’une éventuelle table de la base de données, **720 000 valeurs**, pour une seule carte. Cela ferait **21 600 000** de lignes au sein de la base de données, pour remplacer des images.<br/><br/>Dans ces conditions, l’utilisation d’images reste optimale, car **Leaflet** permet de les afficher en tant que « couche » de la carte, et cette fonctionnalité est déjà assez optimisée. Alors pour implémenter les fonctionnalités de seuils et de changement de palette, la solution n’était pas de dynamiser les fonds de carte, mais de directement les modifier, côté client, via l’**imagerie numérique**.",
            },
            {
                id: "pathfinder-story-9",
                layout: "text",
                text: "J’ai eu la chance de trouver une librairie **JavaScript** de niche sur **GitHub**, intitulée **js-colormaps**, qui introduit toutes les **colormaps** de **Matplotlib** en JavaScript, avec une fonction permettant de trouver la couleur au sein d’un spectre avec une valeur entre **0** et **1**.",
            },
            {
                id: "pathfinder-story-9b",
                layout: "split-right-image",
                text: "Grâce aux données des colormaps, et à une fonction que j’ai réalisée qui trouve le placement d’une couleur, entre **0** et **1**, au sein d’un spectre, j’ai pu créer un **contrôleur de seuils**. Celui-ci va permettre de manipuler les seuils minimal et maximal des images, affichant des zones grises opaques sous le minimum, et de la transparence au-dessus du maximum. Il peut également ajuster le spectre aux seuils, ce qui va recalculer tous les pixels pour augmenter la lisibilité et le contraste.",
                image: "/pathfinder/pathfinder-thresholds.png",
                imageAlt: "Controleur de seuils pour les overlays Pathfinder",
            },
            {
                id: "pathfinder-story-9c",
                layout: "text",
                text: "Par exemple, là où une valeur de **TCC** à **0.5** afficherait normalement une couleur verte, si le seuil minimal est à **0.5**, les pixels avec cette valeur extraite seront désormais violets.",
            },
            {
                id: "pathfinder-story-10",
                layout: "full-image",
                image: "/pathfinder/pathfinder-3.png",
                imageAlt:
                    "Vue Pathfinder avec overlays et controleur de seuils",
            },
            {
                id: "pathfinder-story-11",
                layout: "text",
                title: "Bilan",
                text: "**Pathfinder**, suite à ces améliorations et aux travaux des chercheurs qui ont permis un large dataset de perturbations atmosphériques, est désormais une application unique en son genre, permettant aux décideurs des communications optiques de choisir facilement leurs sites d’installation.<br/><br/>Ce projet m’a particulièrement plu, non seulement grâce à son aspect technique complexe qui m’a demandé beaucoup de réflexion, mais aussi grâce aux connaissances que j’ai pu apprendre, dans le domaine des communications optiques sol-espace et des perturbations atmosphériques.",
            },
        ],
        link: "https://miratlas.com",
        linkText: "voir Miratlas",
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
        techStack: [
            "Next.js",
            "NestJS",
            "Leaflet",
            "Socket.io",
            "TypeScript",
            "Docker",
        ],
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

export const getServerSideProps: GetServerSideProps<PortfolioV2Props> = async ({
    req,
}) => {
    const envSiteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");

    const forwardedHost = req.headers["x-forwarded-host"];
    const host = Array.isArray(forwardedHost)
        ? forwardedHost[0]
        : forwardedHost || req.headers.host || "";

    const forwardedProtoHeader = req.headers["x-forwarded-proto"];
    const forwardedProto = Array.isArray(forwardedProtoHeader)
        ? forwardedProtoHeader[0]
        : forwardedProtoHeader;
    const proto =
        forwardedProto?.split(",")[0].trim() ||
        (host.includes("localhost") ? "http" : "https");
    const requestSiteUrl = host ? `${proto}://${host}` : "";

    const siteUrl = (requestSiteUrl || envSiteUrl).replace(/\/+$/, "");
    const pageUrl = siteUrl || "/";
    const ogImageUrl = siteUrl ? `${siteUrl}${PREVIEW_PATH}` : PREVIEW_PATH;
    const ogImageSecureUrl = ogImageUrl.startsWith("https://")
        ? ogImageUrl
        : null;

    return {
        props: {
            pageUrl,
            ogImageUrl,
            ogImageSecureUrl,
        },
    };
};

export default function PortfolioV2({
    pageUrl,
    ogImageUrl,
    ogImageSecureUrl,
}: PortfolioV2Props) {
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
        if (isLoading) return;

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

        const shouldUseNativeScroll = window.matchMedia(
            "(max-width: 1023px)",
        ).matches;
        ScrollTrigger.config({
            limitCallbacks: true,
            ignoreMobileResize: shouldUseNativeScroll,
        });

        document.body.classList.toggle("v2-smooth", !shouldUseNativeScroll);
        let cancelled = false;
        let smoother: ReturnType<typeof ScrollSmoother.create> | null = null;
        let idleCallbackHandle: number | null = null;
        let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

        const setupSmoother = () => {
            if (cancelled) return;

            smoother = shouldUseNativeScroll
                ? null
                : ScrollSmoother.create({
                      wrapper: "#smooth-wrapper",
                      content: "#smooth-content",
                      smooth: 1.15,
                      effects: false,
                  });

            if (smoother) smoother.scrollTop(0);
            else window.scrollTo(0, 0);
        };

        if ("requestIdleCallback" in window) {
            idleCallbackHandle = window.requestIdleCallback(setupSmoother, {
                timeout: 500,
            });
        } else {
            timeoutHandle = globalThis.setTimeout(setupSmoother, 180);
        }

        return () => {
            cancelled = true;
            document.body.classList.remove("v2-smooth");
            if (idleCallbackHandle !== null && "cancelIdleCallback" in window) {
                window.cancelIdleCallback(idleCallbackHandle);
            }
            if (timeoutHandle !== null) {
                globalThis.clearTimeout(timeoutHandle);
            }
            smoother?.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, [isLoading]);

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
                <meta
                    name="description"
                    content="Mathieu Hernandez, Développeur Polyvalent - Portfolio"
                />
                <meta
                    name="keywords"
                    content="Mathieu Hernandez, portfolio, développeur web, développeur full-stack, développeur frontend, développeur backend, Next.js, React, TypeScript, NestJS, FastAPI, Laravel, Docker, Leaflet, PostgreSQL, cybersécurité, cloud, alternance, Marseille, Aix-en-Provence, Windev, rgbast, RGBast, GGPS, Pathfinder, 2Clock, Three, Three.js, Web Design, Web Designer, webdev, web dev, dev web"
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={pageUrl} />
                <meta
                    property="og:site_name"
                    content="Mathieu Hernandez Portfolio"
                />
                <meta
                    property="og:title"
                    content="Mathieu Hernandez - Portfolio"
                />
                <meta
                    property="og:description"
                    content="Portfolio de Mathieu Hernandez, développeur polyvalent (Frontend, Backend, Web Design, Cloud, Cybersécurité)."
                />
                <meta property="og:image" content={ogImageUrl} />
                {ogImageSecureUrl ? (
                    <meta
                        property="og:image:secure_url"
                        content={ogImageSecureUrl}
                    />
                ) : null}
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="644" />
                <meta property="og:image:type" content="image/png" />
                <meta
                    property="og:image:alt"
                    content="Aperçu du portfolio de Mathieu Hernandez"
                />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content={pageUrl} />
                <meta
                    name="twitter:title"
                    content="Mathieu Hernandez - Portfolio"
                />
                <meta
                    name="twitter:description"
                    content="Portfolio de Mathieu Hernandez, développeur full-stack."
                />
                <meta name="twitter:image" content={ogImageUrl} />
                <meta
                    name="twitter:image:alt"
                    content="Aperçu du portfolio de Mathieu Hernandez"
                />
                <link
                    rel="preload"
                    href="/fonts/Sora-Regular.otf"
                    as="font"
                    type="font/otf"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/Sora-SemiBold.otf"
                    as="font"
                    type="font/otf"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/Sora-Bold.otf"
                    as="font"
                    type="font/otf"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/MangoGrotesque-Black.ttf"
                    as="font"
                    type="font/ttf"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/fonts/MangoGrotesque-ExtraBold.ttf"
                    as="font"
                    type="font/ttf"
                    crossOrigin="anonymous"
                />
                <link rel="canonical" href={pageUrl} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* Fixed elements outside smooth-content */}
            <HeaderV2 />
            {!isLoading ? <ScrollbarV2 /> : null}

            <div id="smooth-wrapper">
                <div id="smooth-content">
                    {!isLoading ? <SideDecor /> : null}
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
