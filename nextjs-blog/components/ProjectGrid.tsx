import ProjectCard from "./ProjectCard";
import styles from "./ProjectCard.module.css";

const ProjectGrid = () => {

  return (
    <div className={styles.projectsGrid}>
      <ProjectCard 
        title="Kwester/Finder" 
        description="Finder, Sékoya ?" 
        imageSrc="/kev.jpg" 
        href="/project-1" 
        width="320px" 
        height="420px"
      />
      <ProjectCard 
        title="GLPROJECT" 
        description="Opengl" 
        imageSrc="/kev.jpg" 
        href="/project-2" 
        width="280px" 
        height="380px"
      />
      <ProjectCard 
        title="GGPS" 
        description="Gamer's Global Positionning system" 
        imageSrc="/kev.jpg" 
        href="/project-3" 
        width="960px" 
        height="440px"
        />
      <ProjectCard 
        title="ShuckleDex" 
        description="Le pokédex là" 
        imageSrc="/kev.jpg" 
        href="/project-3" 
        width="350px" 
        height="440px"
      />
      <ProjectCard 
        title="ForceDot" 
        description="Bibli de composants react pour créer des présentations" 
        imageSrc="/kev.jpg" 
        href="/project-2" 
        width="280px" 
        height="380px"
      />
      <ProjectCard 
        title="Portfolio Website" 
        description="My personal portfolio built with Next.js and CSS Modules." 
        imageSrc="/kev.jpg" 
        href="/project-3" 
        width="350px" 
        height="440px"
      />
      <ProjectCard 
        title="Le Petit Prince" 
        description="Appli mobile pour école maternelle" 
        imageSrc="/kev.jpg" 
        href="/project-2" 
        width="60px" 
        height="80px"
      />

    </div>
  );
};

export default ProjectGrid;
