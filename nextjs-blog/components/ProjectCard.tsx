import { useState, useEffect } from "react";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  description: string;
  previewImage: string; // Preview image
  width?: string;
  height?: string;
  children: React.ReactNode; // Carousel images inside modal
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, previewImage, width, height, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      document.body.style.overflow = "auto"; // Reset when component unmounts
    };
  }, [isOpen]);

  return (
    <>
      {/* Project Card */}
      <div className={styles.projectCard} style={{ width, height }} onClick={() => setIsOpen(true)}>
        <img src={previewImage} alt={title} className={styles.previewImage} />
        <div className={styles.cardContent}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>✖</button>
            <img src={previewImage} alt={title} className={styles.modalPreviewImage} />

            <h2>{title}</h2>
            <p>{description}</p>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
