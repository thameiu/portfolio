import ProjectCard from "./ProjectCard";
import styles from "./ProjectCard.module.css";

const ProjectGrid = () => {
  return (
    <div className={styles.projectsGrid}>
      <ProjectCard title="Kwester/Finder" description="Finder, Sékoya ?" previewImage="/kev.jpg" width="320px" height="420px">
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

      <ProjectCard title="GLPROJECT" description="OpenGL" previewImage="/kev.jpg" width="280px" height="380px">
        <img src="/kev.jpg" alt="Slide 1" />
      </ProjectCard>

      <ProjectCard title="GGPS" description="Gamer's Global Positioning System" previewImage="/kev.jpg" width="160px" height="240px">
        <img src="/kev.jpg" alt="Slide 1" />
      </ProjectCard>

      <ProjectCard title="ShuckleDex" description="Le pokédex là" previewImage="/kev.jpg" width="350px" height="440px">
        <img src="/kev.jpg" alt="Slide 1" />
      </ProjectCard>

      <ProjectCard title="ForceDot" description="Bibliothèque de composants React" previewImage="/kev.jpg" width="280px" height="380px">
        <img src="/kev.jpg" alt="Slide 1" />
      </ProjectCard>

      <ProjectCard title="Portfolio Website" description="Portfolio perso" previewImage="/kev.jpg" width="350px" height="440px">
        <img src="/kev.jpg" alt="Slide 1" />
      </ProjectCard>

      <ProjectCard title="PWDManager" description="Gestionnaire de mots de passe" previewImage="/jumbo.png" width="90px" height="150px">
        <img src="/jumbo.png" alt="Slide 1" />
      </ProjectCard>
    </div>
  );
};

export default ProjectGrid;
