import ProjectCard from "./ProjectCard";
import styles from "./ProjectCard.module.css";
import { SiNextdotjs, SiCplusplus,SiNestjs, SiReact, SiLeaflet, SiDocker, SiTypescript, SiPhp, SiLaravel,SiOpengl,SiCmake, SiTailwindcss,SiExpress } from "react-icons/si";
import { FaJs,FaNodeJs,FaJava  } from "react-icons/fa";
import { DiNetbeans } from "react-icons/di";
import Image from "next/image";

const ProjectGrid = () => {
  return (
    <div className={styles.projectsGrid}>
     
      <ProjectCard
        title="GGPS"
        description="Application web de localisation d'évènements du jeu vidéo"
        previewImage="/ggps-preview.png"
        width="320px"
        height="280px"
      >
          <div className={styles.techStack}>
            <div className={styles.techBadge}><SiNextdotjs /> Next.js</div>
            <div className={styles.techBadge}><SiNestjs /> NestJS</div>
            <div className={styles.techBadge}><SiReact /> React</div>
            <div className={styles.techBadge}><SiLeaflet /> Leaflet</div>
            <div className={styles.techBadge}><SiDocker /> Docker</div>
            <div className={styles.techBadge}><SiTypescript /> TypeScript</div>
          </div>


        <div className={styles.modalContentGrid}>
          <Image 
            src="/ggps-map.png" 
            alt="Carte GGPS" 
            width={800}
            height={500}
            className={styles.modalContentGridImage}
          />
          <section>
            <p>
              Dans le cadre de ma 3ème année de BUT Informatique, nous devions réaliser un projet de notre choix validant
              les compétences des 2 derniers semestres. <br/>
              J'ai donc créé GGPS (Gamer's Global Positionning System), une application web avec une 
              architecture API REST permettant de localiser des évènements du jeu vidéo autour de soi et de créer les siens, où l'on veut.
            </p>
          </section>

          <section>
            <p>
              GGPS permet également de communiquer avec les organisateurs et participants des évènements dans des chatrooms, 
              avec une communication quasi-instantanée grâce aux WebSockets. <br/>
              J'ai pu forger mes compétences sur la création et la gestion d'une API Rest, et apprendre à utiliser 
              de nouvelles technologies à travers ce projet, qui est aujourd'hui le plus abouti, complet et optimisé de mon portfolio.
            </p>
          </section>
          <Image 
            src="/ggps-chat.png" 
            alt="Chat GGPS" 
            width={800}
            height={500}
            className={styles.modalContentGridImage}
          />
        </div>
      </ProjectCard>

      
      <ProjectCard title="Tosser of Coin" description="API Rest - Jeu vidéo sans interface de pile ou face amélioré" previewImage="/tosserofcoin-preview.png"  width="320px" height="280px">
          <div className={styles.techStack}>
            <div className={styles.techBadge}><FaNodeJs />Node.js</div>
            <div className={styles.techBadge}><SiExpress />ExpressJs</div>
            <div className={styles.techBadge}><SiTypescript />TypeScript</div>
          </div>
          <div className={styles.modalContentGrid}>
            <Image 
              src="/tosserofcoin-1.png" 
              alt="Requête pour jouer à Tosser of Coin" 
              width={800}
              height={500}
              className={styles.modalContentGridImage}
            />
            <section>
              <p>
                Dans le cadre de ma 2ème année de BUT Informatique,nous devions créer une API Rest en Node.js, avec Express, en TypeScript. <br/>
                Afin de sortir du lot et de créer un projet plus intéressant, j'ai décidé de créer une API pour un jeu vidéo sans interface de pile ou face amélioré. <br/>
                L'API permet de créer un compte, de se connecter, de jouer, de consulter le classement des joueurs, et de consulter son inventaire.
                Les administrateurs peuvent bannir des joueurs, mais aussi créer des objets et en rajouter aux inventaires des joueurs. <br/>
                Le jeu est uniquement accessible via des requêtes HTTP, et permet de jouer à pile ou face, mais avec des règles supplémentaires. <br/>
                Des objets sont présents, et permettent de manipuler les lancers de pièces (Les plombs permettent de manipuler le poix d'un côté, 
                les ressorts permettent de survivre en cas de défaite, certains pièces ont des probabilités différentes et donnent ou retirent plus de points.)
                Le jeu contient également des ennemis, qui peuvent détruire des objets, et qu'il faut éliminer en les plaçant sur la pièce. <br/>
                Ce projet m'a permis de développement mes compétences et connaissances sur les API Rest, de mieux comprendre le fonctionnement des middlewares, des DAO 
                (Data Access Object) et des DTO (Data Transfer Object).
              </p>
            </section>
          </div>
          
      </ProjectCard>

      <ProjectCard title="GLPROJECT" description="Projet pédagogique présentant des fonctionnalités de la librairie OpenGL" previewImage="/opengl.jpg"  width="320px" height="280px">
          <div className={styles.techStack}>
            <div className={styles.techBadge}><SiCplusplus />C++</div>
            <div className={styles.techBadge}><SiOpengl />OpenGL</div>
            <div className={styles.techBadge}><SiCmake />CMake</div>
          </div>
          <div className={styles.modalContentGrid}>
            <Image 
              src="/glproject-1.png" 
              alt="Finder - page d'accueil" 
              width={800}
              height={500}
              className={styles.modalContentGridImage}
            />
            <section>
              <p>
                Dans le cadre de ma 3ème année de BUT Informatique, j'ai du réaliser un projet pédagogique présentant des fonctionnalités de la librairie OpenGL. <br/>
                GLPROJECT est une application permettant de visualiser des modèles 3D (format .obj), de les déplacer, de manipuler la lumière, d'appliquer 
                différents shaders sur l'objet (Phong, Blinn-Phong, Gaussian) et de modifier la projection de la texture (Plane, Sphérique, Cylindrique, Cubique).<br/>
                Ce projet était l'un des plus complexes de ma formation, car OpenGL est une librairie bas-niveau (proche du matériel et des ressources de l'ordinateur), 
                et il a fallu apprendre à manipuler les shaders, les textures et les objets 3D, point par point, pixel par pixel. Il m'a permis de découvrir
                le développement avancé en C++ et de comprendre le fonctionnement des aspects de la 3D.
                 <br/>
              </p>
            </section>

          </div>
      </ProjectCard>

      <ProjectCard title="Finder" description="Application web de prestations de services entre particuliers" previewImage="/finder-preview.png" width="320px" height="280px">
          <div className={styles.techStack}>
            <div className={styles.techBadge}><SiLaravel />Laravel</div>
            <div className={styles.techBadge}><SiPhp /> PHP</div>
            <div className={styles.techBadge}><SiDocker /> Docker</div>
          </div>
          <div className={styles.modalContentGrid}>
            <Image 
              src="/finder-2.png" 
              alt="Finder - page d'accueil" 
              width={800}
              height={500}
              className={styles.modalContentGridImage}
            />
            <section>
              <p>
                Dans le cadre de ma 2ème année de BUT Informatique, nous devions réaliser un projet en groupe, à présenter à la fin du 
                second semestre. Les différents sujets étaient répartis, avec pour chacun, un commanditaire (professeur de l'IUT). <br/>
                Notre projet était Finder, application de services entre prestataires. Cette application permet de publier des annonces 
                de services doit vous être rendu (ex: ménage, jardinage, cours particuliers, etc.) et de répondre à des annonces, 
                pour communiquer avec la personne en proposant son prix. Il y a également un système de notation et de commentaires.
              </p>
            </section>
            <section>
              <p>
                Nous avons choisi de réaliser ce projet en PHP, avec Docker pour contenairiser la base de données et le serveur web.<br/>
                Pour faire évoluer l'application, nous l'avons amélioré en utilisant Laravel, un framework PHP. <br/>
                J'ai pu apprendre à travailler en équipe, à gérer un projet en mettant en oeuvre des méthodes agiles, à utiliser des outils de versionning (Git) et à
                travailler avec des technologies que je ne connaissais pas. <br/>
                En 3ème année, nous avons pu revenir sur ce projet pour une simulation d'entreprenariat, en calculant un business plan.
              </p>
            </section>
            <Image 
              src="/finder-1.png" 
              alt="Finder - recherche d'annonces" 
              width={800}
              height={500}
              className={styles.modalContentGridImage}
            />
          </div>
      </ProjectCard>


      <ProjectCard title="ShuckleDex" description="Pokédex Web utilisant l'API PokéAPI" previewImage="/shuckledex-preview.png" width="320px" height="280px">
          <div className={styles.techStack}>
            <div className={styles.techBadge}><SiReact />React</div>
            <div className={styles.techBadge}><FaJs />JavaScript</div>
          </div>
          <div className={styles.modalContentGrid}>
          <Image 
            src="/shuckledex-1.png" 
            alt="Carte GGPS" 
            width={800}
            height={500}
            className={styles.modalContentGridImage}
          />
          <section>
            <p>
              Dans le cadre de ma 2ème année de BUT Informatique, nous devions réaliser un projet de notre choix en React faisant 
              appel à une API externe. J'ai donc créé ShuckleDex, un Pokédex (encyclopédie de Pokémon) permettant de rechercher des informations sur les
              différents Pokémon existants. <br/>
              J'ai utilisé l'API PokéAPI pour récupérer les Sprites, types, descriptions, attaques, statistiques, et évolutives d'un Pokémon, 
              à partir de son nom ou de son numéro. <br/>
              Ce projet m'a permis de découvrir React, de comprendre le fonctionnement des composants, des props, des states, et des API.
            </p>
          </section>
        </div>
      </ProjectCard>

      <ProjectCard title="ForceDot" description="Bibliothèque de composants React permettant de créer des diapositives" previewImage="/forcedot-preview.png" width="320px" height="280px">
          <div className={styles.techStack}>
            <div className={styles.techBadge}><SiReact />React</div>
            <div className={styles.techBadge}><FaJs />JavaScript</div>
            <div className={styles.techBadge}><SiTailwindcss />Tailwind</div>
          </div>
          <div className={styles.modalContentGrid}>
            <Image 
              src="/forcedot-1.png" 
              alt="Carte GGPS" 
              width={800}
              height={500}
              className={styles.modalContentGridImage}
            />
            <section>
              <p>
                Dans le cadre de ma 2ème année de BUT Informatique, nous devions créer une bibliothèque de composants React,
                permettant de créer des slides (diapositives) pour une présentation. <br/>
                J'ai donc créé ForceDot, une bibliothèque de composants React permettant de créer des diapositives avec du contenu organisé en sections,
                et de naviguer entre ces diapositives, avec des flèches directionnelles et un menu à miniatures. <br/>
              </p>
            </section>

            <section>
              <p>
              La bibliothèque contient des composants pour la Présentation, les dispositives, les titres, les images, les grilles de contenus, et 
              même des portions de markdown et de code, avec coloration syntaxique. Ce projet est plutôt orienté pour les développeurs, car
              les slides sont générés à partir de balises, similaires à du HTML.
              J'ai utilisé TailwindCSS pour le design et l'organisation des composants, et j'ai appris à créer des composants React, à les organiser
              en sections, à les styliser, et à les rendre interactifs. <br/>
              Ce projet m'a permis à développer mes compétences sur l'utilisation des composants, des props, des states, et des hooks en React.
              </p>
            </section>
            <Image 
              src="/forcedot-2.png" 
              alt="Chat GGPS" 
              width={800}
              height={500}
              className={styles.modalContentGridImage}
            />
          </div>
      </ProjectCard>


      <ProjectCard title="PWDManager" description="Application de gestion de mots de passe en Java" previewImage="/pwdmanager-preview.png"  width="320px" height="280px">
          <div className={styles.techStack}>
            <div className={styles.techBadge}><FaJava />Java</div>
            <div className={styles.techBadge}><DiNetbeans />Netbeans</div>
          </div>
          <div className={styles.modalContentGrid}>
            <Image 
              src="/pwdmanager-1.png" 
              alt="Carte GGPS" 
              width={800}
              height={500}
              className={styles.modalContentGridImage}
            />
            <section>
              <p>
                Dans le cadre de ma 2ème année de BUT Informatique, nous devions réaliser un projet en Java, avec une interface graphique. <br/>
                Nous avions le choix entre plusieurs sujets, et j'ai choisi de réaliser un gestionnaire de mots de passe, que j'ai intitulé PWDManager. <br/>
                L'application permet de stocker des mots de passe, de les afficher, de les modifier, de les supprimer, et de les trier par différents critères. <br/>
                La première utilisation de l'application demande de créer un mot de passe maître, qui sera crypté, puis demandé pour accéder à la liste des mots de passes. <br/>
                
              </p>
            </section>

            <section>
              <p>
              Tous les mots de passes sont cryptés avec BCrypt, et stockés dans un fichier chiffré. L'application permet également de vérifier la force d'un mot de passe,
              et de prévenir l'utilisateur si un mot de passe est expiré.<br/>
              Grâce à ce projet, j'ai pu apprendre à créer une interface graphique en Java avec Netbeans, en utilisant des composants Swing, et en 
              portant beaucoup d'attention à l'aspect orienté objet du projet, pour une meilleure qualité de développement. 
              </p>
            </section>
            <Image 
              src="/pwdmanager-2.png" 
              alt="Chat GGPS" 
              width={800}
              height={500}
              className={styles.modalContentGridImage}
            />
          </div>
      </ProjectCard>
    </div>
  );
};

export default ProjectGrid;