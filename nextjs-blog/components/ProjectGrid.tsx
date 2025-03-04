import ProjectCard from "./ProjectCard";
import styles from "./ProjectCard.module.css";

const ProjectGrid = () => {
  return (
    <div className={styles.projectsGrid}>
      <ProjectCard title="Finder" description="Application web de prestations de services entre particuliers" previewImage="/finder-preview.png
      " width="320px" height="280px">
        <img src="/kev.jpg" alt="Slide 1" />
        <img src="/jumbo.png" alt="Slide 2" />
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>
        <p>Loirem asdhzbiukzhdn zkej fnczyjs sfz esfz stegvdrg ed</p>

      </ProjectCard>

      <ProjectCard title="GLPROJECT" description="Projet pédagogique présentant des fonctionnalités de la librairie OpenGL" previewImage="/opengl.jpg"  width="320px" height="280px">
        <img src="/kev.jpg" alt="Slide 1" />
      </ProjectCard>

      <ProjectCard title="GGPS" description="Application web de localisation d'évènements du jeu vidéo" previewImage="/ggps-preview.png"  width="320px" height="280px">
        <img src="/kev.jpg" alt="Slide 1" />
      </ProjectCard>

      <ProjectCard title="ShuckleDex" description="Pokédex en React" previewImage="/shuckledex-preview.png" width="320px" height="280px">
        <img src="/kev.jpg" alt="Slide 1" />
      </ProjectCard>

      <ProjectCard title="ForceDot" description="Bibliothèque de composants React permettant de créer des diapositives" previewImage="/forcedot-preview.png" width="320px" height="280px">
        <img src="/kev.jpg" alt="Slide 1" />
      </ProjectCard>

      <ProjectCard title="Tosser of Coin" description="Jeu vidéo sans interface de pile ou face amélioré en RogueLike" previewImage="/tosserofcoin-preview.png"  width="320px" height="280px">
        <img src="/kev.jpg" alt="Slide 1" />
      </ProjectCard>

      <ProjectCard title="PWDManager" description="Application Java de gestion de mots de passe" previewImage="/pwdmanager-preview.png"  width="320px" height="280px">
        <img src="/jumbo.png" alt="Slide 1" />
      </ProjectCard>
    </div>
  );
};

export default ProjectGrid;
