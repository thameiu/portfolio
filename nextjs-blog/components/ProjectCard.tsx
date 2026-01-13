import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  }, [screenshots.length, isTransitioning]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  }, [screenshots.length, isTransitioning]);

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
    const target = e.target as HTMLElement;
    if (!target.closest('button') && !target.closest('img')) {
      closeLightbox();
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isTransitioning) return;
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (isTransitioning) return;
    const swipeThreshold = 50;
    const swipeDistance = touchStartX.current - touchEndX.current;

    if (Math.abs(swipeDistance) > swipeThreshold) {
      setIsTransitioning(true);
      if (swipeDistance > 0) {
        setCurrentImageIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
      } else {
        setCurrentImageIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
      }
      setTimeout(() => setIsTransitioning(false), 500);
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

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
      {/* Project Card */}
      <div
        className="bg-gray-50/90 rounded-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 flex flex-col w-full sm:w-[360px]"
        style={{ height: height || '280px' }}
        onClick={openModal}
      >
        <div className="relative w-full h-1/2">
          <Image
            src={previewImage}
            alt={`Aperçu de ${title}`}
            fill
            className="object-cover"
            unoptimized={true}
          />
        </div>
        <div className="p-4 flex-1 flex flex-col justify-between text-center">
          <h1 className="text-3xl font-bold text-[var(--color-primary)] mb-2">{title}</h1>
          <p className="text-base text-gray-800">{description}</p>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {isFocused && screenshots.length > 0 && (
        <div
          className="fixed inset-0 bg-black/92 backdrop-blur-sm z-[2000] flex items-center justify-center animate-fade-in"
          onClick={handleLightboxClick}
        >
          <div
            className="relative w-[90vw] h-[70vh] md:w-[85vw] md:h-[80vh] overflow-hidden"
            ref={lightboxRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <button
              className="absolute top-4 left-4 md:top-5 md:left-5 bg-black/50 hover:bg-white/20 border border-white/30 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/90 hover:text-white text-lg md:text-xl transition-all hover:scale-110 z-30"
              onClick={closeLightbox}
              aria-label="Fermer"
            >
              <FaTimes />
            </button>

            {screenshots.length > 1 && (
              <button
                className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-[var(--color-secondary)]  text-3xl md:text-4xl transition-all hover:scale-125 z-20 drop-shadow-lg"
                onClick={prevImage}
                disabled={isTransitioning}
              >
                <FaChevronLeft />
              </button>
            )}

            <div
              className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
            >
              {screenshots.map((src, index) => (
                <div className="min-w-full h-full flex items-center justify-center" key={index}>
                  <div className="relative w-full h-full">
                    <Image
                      src={src}
                      alt={`${title} screenshot ${index + 1}`}
                      fill
                      className="object-contain saturate-125"
                      quality={100}
                      priority={index === currentImageIndex}
                      sizes="100vw"
                      unoptimized={true}
                    />
                  </div>
                </div>
              ))}
            </div>

            {screenshots.length > 1 && (
              <button
                className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-[var(--color-secondary)]  text-3xl md:text-4xl transition-all hover:scale-125 z-20 drop-shadow-lg"
                onClick={nextImage}
                disabled={isTransitioning}
              >
                <FaChevronRight />
              </button>
            )}

            <div className="absolute bottom-4 right-4 md:bottom-5 md:right-5 bg-black/50 text-white/90 px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm border border-white/20 z-30">
              {currentImageIndex + 1} / {screenshots.length}{!isMobile && ' • Echap pour fermer'}
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-start z-[1000] overflow-y-auto py-5 md:py-10 px-4 animate-fade-in"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-4xl bg-gray-50/95 rounded-xl shadow-2xl relative flex flex-col p-6 md:p-10 animate-slide-in mb-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-4 md:top-4 md:right-5 text-2xl md:text-3xl text-[var(--color-primary)] hover:text-red-500 transition-colors z-10"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>

            <div className="text-center mb-4 md:mb-6">
              <h1 className="text-3xl md:text-5xl font-bold text-[var(--color-primary)] mb-2 md:mb-4">{title}</h1>
              <p className="text-base md:text-lg text-gray-600 mb-4 md:mb-6 px-2 md:px-5">{description}</p>
              {techStack && (
                <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                  {techStack}
                </div>
              )}
            </div>

            <div className="text-left my-6 md:my-8 mx-auto w-full max-w-3xl bg-[var(--color-primary)]/5 p-4 md:p-6 rounded-lg border-l-4 border-primary">
              <h3 className="mt-0 text-[var(--color-primary)] text-lg md:text-xl mb-3 md:mb-4 font-bold">
                Fonctionnalités Clés & Technique :
              </h3>
              <ul className="list-disc pl-5 md:pl-6 space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="text-sm md:text-base leading-relaxed text-gray-800">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {screenshots.length > 0 && (
              <div
                className="relative w-[85%] md:w-full h-48 md:h-96 mx-auto mt-4 md:mt-6 overflow-hidden cursor-zoom-in rounded-lg"
                onClick={toggleFocus}
                title="Cliquez pour agrandir"
                ref={carouselRef}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {screenshots.length > 1 && (
                  <button
                    className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 text-[var(--color-primary)] hover:text-[var(--color-secondary)]  text-2xl md:text-4xl transition-all hover:scale-125 z-10 drop-shadow-md"
                    onClick={prevImage}
                    disabled={isTransitioning}
                  >
                    <FaChevronLeft />
                  </button>
                )}

                <div
                  className="flex h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                  style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                >
                  {screenshots.map((src, index) => (
                    <div className="min-w-full h-full relative flex items-center justify-center" key={index}>
                      <Image
                        src={src}
                        alt={`Screenshot ${index + 1}`}
                        fill
                        className="object-contain saturate-125"
                        priority={index === currentImageIndex}
                        sizes="(max-width: 768px) 100vw, 800px"
                        unoptimized={true}
                      />
                    </div>
                  ))}
                </div>

                {screenshots.length > 1 && (
                  <button
                    className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 text-[var(--color-primary)] hover:text-[var(--color-secondary)]  text-2xl md:text-4xl transition-all hover:scale-125 z-10 drop-shadow-md"
                    onClick={nextImage}
                    disabled={isTransitioning}
                  >
                    <FaChevronRight />
                  </button>
                )}

                <div className="absolute bottom-2 md:bottom-3 right-3 md:right-5 bg-white/90 text-gray-800 px-2 py-1 md:px-3 md:py-1.5 rounded-xl text-xs md:text-sm font-bold z-10">
                  {currentImageIndex + 1} / {screenshots.length}
                </div>
              </div>
            )}

            {projectLink && (
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 md:mt-8 inline-flex items-center justify-center gap-2 md:gap-3 text-[var(--color-primary)] hover:text-[var(--color-secondary)]  font-bold text-base md:text-xl transition-colors hover:underline mx-auto"
              >
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