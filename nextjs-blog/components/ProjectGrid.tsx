import ProjectCard from "./ProjectCard";
import { SiNextdotjs, SiCplusplus, SiNestjs, SiReact, SiLeaflet, SiDocker, SiTypescript, SiPhp, SiLaravel, SiOpengl, SiCmake, SiTailwindcss, SiExpress, SiPostgresql, SiJenkins, SiJest, SiSupabase } from "react-icons/si";
import { FaJs, FaNodeJs, FaJava } from "react-icons/fa";
import { DiNetbeans } from "react-icons/di";

const ProjectGrid = () => {
  const TechBadge = ({ children }: { children: React.ReactNode }) => (
    <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[var(--color-primary)] border border-primary text-white rounded-full text-xs md:text-sm transition-all hover:bg-gray-100 hover:text-[var(--color-primary)] whitespace-nowrap">
      {children}
    </div>
  );

  return (
    <div className="flex flex-wrap gap-4 md:gap-5 justify-center px-4 md:px-5 mt-10 md:mt-12">
      {/* --- 2CLOCK --- */}
      <ProjectCard
        title="2Clock"
        description="Application web de pointage horodaté et d'analyse de KPI en entreprise"
        previewImage="/2clock/2clock-preview.png"
        width="360px"
        height="280px"
        projectLink="https://2clock-mar-8.fr"
        projectLinkText="Consulter la landing page de 2clock"
        screenshots={[
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
        ]}
        features={[
          "Système de pointage sécurisé : Code éphémère (TOTP) généré via WebSockets et régénéré toutes les 30s.",
          "Architecture Microservices : Frontend Next.js et API Node.js/Express séparés, communiquant via REST et WebSockets.",
          "Gestion multi-équipes et rôles : Système complet de permissions (Employé, Manager, Propriétaire) et plannings flexibles.",
          "Analyse de données (KPI) : Visualisation graphique de la ponctualité, des retards et des absences.",
          "DevOps complet : Pipeline CI/CD Jenkins, conteneurisation Docker, Reverse Proxy Nginx et certificats SSL automatisés.",
          "Sécurité avancée : Protection CSRF, Rate Limiting, Sanitization des entrées et authentification JWT."
        ]}
        techStack={
          <>
            <TechBadge><SiNextdotjs /> Next.js</TechBadge>
            <TechBadge><SiReact /> React</TechBadge>
            <TechBadge><SiTailwindcss /> Tailwind</TechBadge>
            <TechBadge><FaNodeJs /> Node.js</TechBadge>
            <TechBadge><SiExpress /> Express</TechBadge>
            <TechBadge><SiTypescript /> TypeScript</TechBadge>
            <TechBadge><SiSupabase /> Supabase (SQL)</TechBadge>
            <TechBadge><SiDocker /> Docker</TechBadge>
            <TechBadge><SiJenkins /> Jenkins</TechBadge>
            <TechBadge><SiJest /> Jest</TechBadge>
          </>
        }
      />

      {/* --- PATHFINDER --- */}
      <ProjectCard
        title="Pathfinder"
        description="Application web de cartographie de perturbations atmosphériques (FSOC)"
        previewImage="/pathfinder/miratlas-preview.png"
        width="360px"
        height="280px"
        projectLink="https://miratlas.com"
        projectLinkText="Consulter le site de Miratlas"
        screenshots={[
          "/pathfinder/pathfinder-1.png",
          "/pathfinder/pathfinder-2.png",
          "/pathfinder/pathfinder-3.png",
          "/pathfinder/pathfinder-4.png",
          "/pathfinder/pathfinder-5.png",
        ]}
        features={[
          "Visualisation de données complexes : Graphiques dynamiques avec Recharts pour les points de présence.",
          "Traitement d'images côté client : Modification pixel par pixel pour afficher les couches de couverture nuageuse avec seuils filtrables.",
          "Cartographie interactive : Utilisation de Leaflet pour le positionnement des stations et l'affichage des calques.",
          "Back-office complet : Gestion des utilisateurs, des données et visualisation instantanée des anomalies.",
          "Architecture : Frontend Next.js et Backend Laravel (API) conteneurisés avec Docker."
        ]}
        techStack={
          <>
            <TechBadge><SiNextdotjs /> Next.js</TechBadge>
            <TechBadge><SiLaravel /> Laravel</TechBadge>
            <TechBadge><SiReact /> React</TechBadge>
            <TechBadge><SiLeaflet /> Leaflet</TechBadge>
            <TechBadge><SiDocker /> Docker</TechBadge>
            <TechBadge><SiTypescript /> TypeScript</TechBadge>
            <TechBadge><SiPhp /> PHP</TechBadge>
          </>
        }
      />

      {/* --- GGPS --- */}
      <ProjectCard
        title="GGPS"
        description="Application web de localisation d'évènements du jeu vidéo"
        previewImage="/ggps/ggps-preview.png"
        width="360px"
        height="280px"
        screenshots={[
          "/ggps/ggps-1.png",
          "/ggps/ggps-2.png",
          "/ggps/ggps-3.png",
          "/ggps/ggps-4.png",
          "/ggps/ggps-5.png",
          "/ggps/ggps-6.png",
          "/ggps/ggps-7.png",
        ]}
        features={[
          "Architecture API REST : Backend performant développé en NestJS.",
          "Communication Temps Réel : Système de Chatrooms instantanées via WebSockets (Socket.io).",
          "Géolocalisation : Recherche d'événements à proximité et création de points sur carte interactive.",
          "Fonctionnalités sociales : Communication organisateurs/participants intégrée.",
          "Authentification et Sécurité : Gestion complète des utilisateurs et validation des données."
        ]}
        techStack={
          <>
            <TechBadge><SiNextdotjs /> Next.js</TechBadge>
            <TechBadge><SiNestjs /> NestJS</TechBadge>
            <TechBadge><SiReact /> React</TechBadge>
            <TechBadge><SiLeaflet /> Leaflet</TechBadge>
            <TechBadge><SiDocker /> Docker</TechBadge>
            <TechBadge><SiTypescript /> TypeScript</TechBadge>
          </>
        }
      />

      {/* --- TOSSER OF COIN --- */}
      {/* <ProjectCard 
        title="Tosser of Coin" 
        description="API Rest - Jeu vidéo de stratégie basé sur le hasard (Pile ou Face)" 
        previewImage="/tosserofcoin-preview.png"  
        width="360px" 
        height="280px"
        screenshots={[
            "/tosserofcoin-1.png"
        ]}
        features={[
            "API Rest pure : Backend construit avec Node.js, Express et TypeScript.",
            "Mécaniques de Jeu : Gestion d'inventaire, objets modifiant les probabilités (plombs, ressorts) et système de points de vie.",
            "Architecture Logicielle : Utilisation stricte des patterns DAO (Data Access Object) et DTO.",
            "Administration : Rôles utilisateurs, système de bannissement et création d'objets par les admins.",
            "Sécurité : Middlewares d'authentification et validation des requêtes."
        ]}
        techStack={
            <>
            <TechBadge><FaNodeJs />Node.js</TechBadge>
            <TechBadge><SiExpress />ExpressJs</TechBadge>
            <TechBadge><SiTypescript />TypeScript</TechBadge>
            </>
        }
      /> */}

      {/* --- GLPROJECT --- */}
      <ProjectCard
        title="GLPROJECT"
        description="Moteur de visualisation 3D pédagogique (OpenGL)"
        previewImage="/glproject/glproject-preview.png"
        width="360px"
        height="280px"
        screenshots={[
          "/glproject/glproject-1.png",
          "/glproject/glproject-2.png"
        ]}
        features={[
          "Programmation Bas-Niveau : C++ avec gestion mémoire pour interagir avec le GPU.",
          "Shaders GLSL : Implémentation manuelle de Phong, Blinn-Phong et flou Gaussien.",
          "Texturing Avancé : Support des projections planaires, sphériques, cylindriques et cubiques.",
          "Moteur de Rendu : Chargement de modèles .obj, gestion caméra et lumières dynamiques.",
          "Pipeline Graphique : Manipulation directe des vertices et fragments."
        ]}
        techStack={
          <>
            <TechBadge><SiCplusplus /> C++</TechBadge>
            <TechBadge><SiOpengl /> OpenGL</TechBadge>
            <TechBadge><SiCmake /> CMake</TechBadge>
          </>
        }
      />

      {/* --- FINDER --- */}
      <ProjectCard
        title="Finder"
        description="Plateforme de demande de services de proximité entre particuliers"
        previewImage="/finder/finder-preview.png"
        width="360px"
        height="280px"
        screenshots={[
          "/finder/finder-1.png",
          "/finder/finder-2.png"
        ]}
        features={[
          "Développement Backend : PHP natif migré vers le framework Laravel.",
          "Marketplace : Publication d'annonces, réponses avec propositions de prix, filtrage.",
          "Système de Réputation : Notation et commentaires entre prestataires et clients.",
          "DevOps : Environnement complet (Web + BDD) conteneurisé avec Docker.",
          "Gestion de Projet : Méthode Agile, Git flow et simulation business plan."
        ]}
        techStack={
          <>
            <TechBadge><SiLaravel /> Laravel</TechBadge>
            <TechBadge><SiPhp /> PHP</TechBadge>
            <TechBadge><SiDocker /> Docker</TechBadge>
          </>
        }
      />

      {/* --- SHUCKLEDEX --- */}
      {/* <ProjectCard 
        title="ShuckleDex" 
        description="Pokédex Web utilisant l'API PokéAPI" 
        previewImage="/shuckledex-preview.png" 
        width="360px" 
        height="280px"
        screenshots={[
            "/shuckledex-1.png"
        ]}
        features={[
            "Consommation d'API : Récupération asynchrone des données via PokéAPI.",
            "Gestion d'État React : Utilisation des Hooks (useState, useEffect) pour la fluidité.",
            "Interface Riche : Affichage des sprites, stats, types et chaînes d'évolution.",
            "Moteur de Recherche : Filtrage par nom ou numéro de Pokédex."
        ]}
        techStack={
          <>
            <TechBadge><SiReact />React</TechBadge>
            <TechBadge><FaJs />JavaScript</TechBadge>
          </>
        }
      /> */}

      {/* --- FORCEDOT --- */}
      <ProjectCard
        title="ForceDot"
        description="Bibliothèque de composants React pour présentations"
        previewImage="/forcedot/forcedot-preview.png"
        width="360px"
        height="280px"
        screenshots={[
          "/forcedot/forcedot-1.png",
          "/forcedot/forcedot-2.png"
        ]}
        features={[
          "Librairie UI : Création de composants réutilisables pour générer des slides.",
          "Navigation : Système complet avec flèches et menu miniature.",
          "Support Contenu Riche : Markdown, blocs de code avec coloration syntaxique, grilles.",
          "Styling Modulaire : Utilisation de TailwindCSS pour le design system.",
          "DX : Structure déclarative (JSX) pensée pour les développeurs."
        ]}
        techStack={
          <>
            <TechBadge><SiReact /> React</TechBadge>
            <TechBadge><FaJs /> JavaScript</TechBadge>
            <TechBadge><SiTailwindcss /> Tailwind</TechBadge>
          </>
        }
      />

      {/* --- PWDMANAGER --- */}
      {/* <ProjectCard 
        title="PWDManager" 
        description="Application de gestion de mots de passe (Java Swing)" 
        previewImage="/pwdmanager-preview.png"  
        width="360px" 
        height="280px"
        screenshots={[
            "/pwdmanager-1.png",
            "/pwdmanager-2.png"
        ]}
        features={[
            "Développement Desktop : Interface graphique (GUI) complète avec Java Swing.",
            "Sécurité : Chiffrement des mots de passe avec l'algorithme BCrypt.",
            "Stockage Sécurisé : Persistance des données dans des fichiers locaux chiffrés.",
            "Fonctionnalités : Analyseur de robustesse et alertes d'expiration.",
            "Conception : Programmation Orientée Objet stricte (Patterns, Héritage)."
        ]}
        techStack={
          <>
            <TechBadge><FaJava />Java</TechBadge>
            <TechBadge><DiNetbeans />Netbeans</TechBadge>
          </>
        }
      /> */}
    </div>
  );
};

export default ProjectGrid;