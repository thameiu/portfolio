import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import styles from "./ProjectCard.module.css";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  previewImage: string;
  width?: string;
  height?: string;
  features: string[];
  screenshots: string[];
  techStack?: React.ReactNode; 
  projectLink?: string;
  projectLinkText?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ 
  title, 
  description, 
  previewImage, 
  width, 
  height, 
  features, 
  screenshots,
  techStack,
  projectLink,
  projectLinkText = "Consulter le projet",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Touch handling refs
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Lock body scroll
  useEffect(() => {
    if (isOpen || isFocused) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [isOpen, isFocused]);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
  }, [screenshots.length]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
  }, [screenshots.length]);

  const openModal = () => {
    setCurrentImageIndex(0);
    setIsOpen(true);
  };

  const toggleFocus = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFocused(!isFocused);
  };

  const closeLightbox = () => {
    setIsFocused(false);
  };

  const handleLightboxClick = (e: React.MouseEvent) => {
    // Close if clicking anywhere except on buttons
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      closeLightbox();
    }
  };

  // Touch/Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      if (swipeDistance > 0) {
        // Swiped left - next image
        setCurrentImageIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
      } else {
        // Swiped right - previous image
        setCurrentImageIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
      }
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "Escape") {
        if (isFocused) setIsFocused(false);
        else setIsOpen(false);
      }
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isFocused, nextImage, prevImage]);

  return (
    <>
      <div className={styles.projectCard} style={{ width, height }} onClick={openModal}>
        <Image 
          src={previewImage} 
          alt={`Aperçu de ${title}`} 
          width={320} 
          height={280}
          className={styles.previewImage} 
          unoptimized={true}
        />
        <div className={styles.cardContent}>
          <h1 className={styles.cardTitle}>{title}</h1>
          <p className={styles.cardDesc}>{description}</p>
        </div>
      </div>

      {/* --- LIGHTBOX OVERLAY (FOCUS) --- */}
      {isFocused && screenshots.length > 0 && (
        <div 
          className={styles.lightboxOverlay} 
          onClick={handleLightboxClick}
        >
           <div 
             className={styles.lightboxContent} 
             ref={lightboxRef}
             onTouchStart={handleTouchStart}
             onTouchMove={handleTouchMove}
             onTouchEnd={handleTouchEnd}
           >
              {/* Close button (top-left) */}
              <button 
                className={styles.lightboxCloseButton} 
                onClick={closeLightbox}
                aria-label="Fermer"
              >
                <FaTimes />
              </button>

              <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prevImage} style={{position: 'absolute', left: '20px', zIndex: 20}}>
                  <FaChevronLeft />
              </button>
              
              {/* TRACK FOR LIGHTBOX */}
              <div 
                className={styles.lightboxTrack} 
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {screenshots.map((src, index) => (
                    <div className={styles.lightboxSlide} key={index}>
                        <Image 
                            src={src} 
                            alt={`${title} screenshot ${index + 1}`}
                            fill
                            className={styles.lightboxImage}
                            quality={100}
                            priority={index === currentImageIndex}
                            sizes="100vw"
                            unoptimized={true}
                        />
                    </div>
                ))}
              </div>

              <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextImage} style={{position: 'absolute', right: '20px', zIndex: 20}}>
                  <FaChevronRight />
              </button>
              
              {/* Nouveau compteur en bas à droite */}
              <div className={styles.lightboxCounter}>
                  {currentImageIndex + 1} / {screenshots.length}{!isMobile && ' • Echap pour fermer'}
              </div>
           </div>
        </div>
      )}

      {/* --- MODAL --- */}
      {isOpen && (
        <div className={styles.modalOverlay} onClick={() => setIsOpen(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>✖</button>
            
            <div className={styles.modalHeader}>
                <h1 className={styles.modalTitle}>{title}</h1>
                <p className={styles.modalDescription}>{description}</p>
                {techStack && <div className={styles.techStack}>{techStack}</div>}
            </div>

            <div className={styles.featuresList}>
                <h3>Fonctionnalités Clés & Technique :</h3>
                <ul>
                    {features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
            </div>

            {/* --- CAROUSEL TRACK (MODAL) --- */}
            {screenshots.length > 0 && (
                <div 
                  className={styles.carouselContainer} 
                  onClick={toggleFocus} 
                  title="Cliquez pour agrandir"
                  ref={carouselRef}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                    {screenshots.length > 1 && (
                        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={prevImage}>
                            <FaChevronLeft />
                        </button>
                    )}
                    
                    <div 
                        className={styles.carouselTrack} 
                        style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                    >
                        {screenshots.map((src, index) => (
                            <div className={styles.carouselSlide} key={index}>
                                <Image 
                                    src={src} 
                                    alt={`Screenshot ${index + 1}`}
                                    fill
                                    className={styles.carouselImage}
                                    priority={index === currentImageIndex} 
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    unoptimized={true}
                                />
                            </div>
                        ))}
                    </div>

                    {screenshots.length > 1 && (
                        <button className={`${styles.navButton} ${styles.nextButton}`} onClick={nextImage}>
                            <FaChevronRight />
                        </button>
                    )}
                    
                    <div className={styles.imageCounter}>
                        {currentImageIndex + 1} / {screenshots.length}
                    </div>
                </div>
            )}

            {projectLink && (
                 <a href={projectLink} target="_blank" rel="noopener noreferrer" className={styles.projectLink}>
                    <FaExternalLinkAlt />{projectLinkText}
                 </a>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard;