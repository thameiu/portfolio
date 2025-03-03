import Link from "next/link";
import Image from "next/image";
import styles from "./ProjectCard.module.css";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
  width?: string;
  height?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  imageSrc,
  href,
  width = "300px",
  height = "400px",
}) => {
  return (
    <Link href={href} passHref className={styles.projectLink}>
      <div className={styles.card} style={{ width, height }}>
        <div className={styles.imageContainer}>
          <Image src={imageSrc} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
