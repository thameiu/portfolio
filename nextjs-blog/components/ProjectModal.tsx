import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

interface ProjectModalProps {
  title: string;
  description: string;
  features: string[];
  screenshots: string[];
  techStack?: React.ReactNode;
  projectLink?: string;
  projectLinkText?: string;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
  title,
  description,
  features,
  screenshots,
  techStack,
  projectLink,
  projectLinkText = "Consulter le projet",
  onClose,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Drag/Swipe states
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);

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
    // Lock scroll on both html and body
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    
    // Add custom scrollbar styles for modal
    const style = document.createElement('style');
    style.id = 'modal-scrollbar-style';
    style.innerHTML = `
      .modal-overlay::-webkit-scrollbar-track {
        background: transparent;
      }
    `;
    document.head.appendChild(style);
    
    return () => { 
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      const styleEl = document.getElementById('modal-scrollbar-style');
      if (styleEl) {
        styleEl.remove();
      }
    };
  }, []);

  // Update translate position when image changes
  useEffect(() => {
    setPrevTranslate(-currentImageIndex * 100);
    setCurrentTranslate(-currentImageIndex * 100);
  }, [currentImageIndex]);

  const nextImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev === screenshots.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsTransitioning(false), 500);
  }, [screenshots.length, isTransitioning, isDragging]);

  const prevImage = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isTransitioning || isDragging) return;
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev === 0 ? screenshots.length - 1 : prev - 1));
    setTimeout(() => setIsTransitioning(false), 500);
  }, [screenshots.length, isTransitioning, isDragging]);

  const toggleFocus = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDragging) {
      setIsFocused(!isFocused);
    }
  };

  const closeLightbox = () => {
    setIsFocused(false);
  };

  // Unified drag/swipe handlers for both mouse and touch
  const getPositionX = (event: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent): number => {
    return 'touches' in event ? event.touches[0].clientX : event.clientX;
  };

  const dragStart = (event: React.MouseEvent | React.TouchEvent) => {
    if (isTransitioning) return;
    setIsDragging(true);
    setStartX(getPositionX(event));
    
    // Disable transition during drag
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'none';
    }
    if (lightboxRef.current) {
      lightboxRef.current.style.transition = 'none';
    }
  };

  const dragMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const currentPosition = getPositionX(event);
    const diff = currentPosition - startX;
    const containerWidth = carouselRef.current?.offsetWidth || lightboxRef.current?.offsetWidth || window.innerWidth;
    const translatePercentage = (diff / containerWidth) * 100;
    
    setCurrentTranslate(prevTranslate + translatePercentage);
  };

  const dragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Re-enable transition
    if (carouselRef.current) {
      carouselRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    }
    if (lightboxRef.current) {
      lightboxRef.current.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    }

    const movedBy = currentTranslate - prevTranslate;
    const threshold = 15; // Percentage threshold to trigger slide change

    if (movedBy < -threshold && currentImageIndex < screenshots.length - 1) {
      // Swiped left - next image
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => prev + 1);
      setTimeout(() => setIsTransitioning(false), 500);
    } else if (movedBy > threshold && currentImageIndex > 0) {
      // Swiped right - previous image
      setIsTransitioning(true);
      setCurrentImageIndex((prev) => prev - 1);
      setTimeout(() => setIsTransitioning(false), 500);
    } else {
      // Snap back to current image
      setCurrentTranslate(prevTranslate);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isFocused) setIsFocused(false);
        else onClose();
      }
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, nextImage, prevImage, onClose]);

  return (
    <>
      {/* Lightbox Overlay */}
      {isFocused && screenshots.length > 0 && (
<div
    className="fixed inset-0 bg-black/92 backdrop-blur-sm z-[2000] flex items-center justify-center animate-fade-in"
    onClick={closeLightbox}
  >
    <div className="relative w-[90vw] h-[70vh] md:w-[85vw] md:h-[80vh] mb-6">
      <div
        className="relative w-full h-full overflow-hidden"
            ref={lightboxRef}
            onMouseDown={dragStart}
            onMouseMove={dragMove}
            onMouseUp={dragEnd}
            onMouseLeave={dragEnd}
            onTouchStart={dragStart}
            onTouchMove={dragMove}
            onTouchEnd={dragEnd}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            >
            <button
              className="absolute top-4 right-4 md:top-5 md:right-5 bg-black/50 hover:bg-white/20 border border-white/30 rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center text-white/90 hover:text-white text-lg md:text-xl transition-all hover:scale-110 z-30"
              onClick={closeLightbox}
              aria-label="Fermer"
            >
              <FaTimes />
            </button>

            {screenshots.length > 1 && (
              <button
                className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-[var(--color-secondary)] text-3xl md:text-4xl transition-all hover:scale-125 z-20 drop-shadow-lg"
                onClick={prevImage}
                disabled={isTransitioning}
              >
                <FaChevronLeft />
              </button>
            )}

            <div
              className="flex h-full w-full"
              style={{
                transform: `translateX(${currentTranslate}%)`,
                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {screenshots.map((src, index) => (
                <div className="min-w-full h-full relative flex items-center justify-center" key={index} >
                  <Image
                    src={src}
                    alt={`Screenshot ${index + 1}`}
                    fill
                    className="object-contain saturate-125 pointer-events-none"
                    quality={100}
                    priority={index === currentImageIndex}
                    sizes="100vw"
                    unoptimized
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            {screenshots.length > 1 && (
              <button
                className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 text-white/70 hover:text-[var(--color-secondary)] text-3xl md:text-4xl transition-all hover:scale-125 z-20 drop-shadow-lg"
                onClick={nextImage}
                disabled={isTransitioning}
              >
                <FaChevronRight />
              </button>
            )}
          </div>

            {/* Dot Indicators for Lightbox */}
            <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 flex gap-1.5 z-30">
            {screenshots.map((_, index) => (
                <div
                key={index}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                    ? 'w-8 bg-[#8DE1FD]'
                    : 'w-2 bg-[#8DE1FD]/40'
                }`}
                />
            ))}
            </div>
        </div>
        </div>  

      )}

      {/* Modal */}
      <div
        className="modal-overlay fixed inset-0 bg-black/60 flex justify-center items-start z-[1000] overflow-y-auto py-5 md:py-10 px-4 animate-fade-in"
        onClick={onClose}
        style={{
          scrollbarColor: 'rgba(140, 225, 254, 0.7) transparent'
        }}
      >
        <div
          className="w-full max-w-4xl bg-gray-50/95 rounded-xl shadow-2xl relative flex flex-col p-6 md:p-10 animate-slide-in mb-12"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-4 md:top-4 md:right-5 text-2xl md:text-3xl text-[var(--color-primary)] hover:text-red-500 transition-colors z-10"
            onClick={onClose}
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
        <div className="relative w-[85%] md:w-full mx-auto mt-4 md:mt-6">
            <div
            className="relative h-48 md:h-96 overflow-hidden cursor-grab rounded-lg"
            onClick={toggleFocus}
            title="Cliquez pour agrandir"
            ref={carouselRef}
            onMouseDown={dragStart}
            onMouseMove={dragMove}
            onMouseUp={dragEnd}
            onMouseLeave={dragEnd}
            onTouchStart={dragStart}
            onTouchMove={dragMove}
            onTouchEnd={dragEnd}
            style={{ cursor: isDragging ? 'grabbing' : 'zoom-in' }}
            >
            {screenshots.length > 1 && (
                <button
                className="absolute left-0 md:left-2 top-1/2 -translate-y-1/2 text-[var(--color-primary)] hover:text-[var(--color-secondary)] text-2xl md:text-4xl transition-all hover:scale-125 z-10 drop-shadow-md"
                onClick={prevImage}
                disabled={isTransitioning}
                >
                <FaChevronLeft />
                </button>
            )}

            <div
                className="flex h-full w-full"
                style={{
                transform: `translateX(${currentTranslate}%)`,
                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
            >
                {screenshots.map((src, index) => (
                <div className="min-w-full h-full flex items-center justify-center" key={index}>
                    <div className="relative w-full h-full">
                    <Image
                        src={src}
                        alt={`${title} screenshot ${index + 1}`}
                        fill
                        className="object-contain saturate-125 pointer-events-none"
                        quality={100}
                        priority={index === currentImageIndex}
                        sizes="(max-width: 768px) 100vw, 800px"
                        unoptimized
                        draggable={false}
                    />
                    </div>
                </div>
                ))}
            </div>

            {screenshots.length > 1 && (
                <button
                className="absolute right-0 md:right-2 top-1/2 -translate-y-1/2 text-[var(--color-primary)] hover:text-[var(--color-secondary)] text-2xl md:text-4xl transition-all hover:scale-125 z-10 drop-shadow-md"
                onClick={nextImage}
                disabled={isTransitioning}
                >
                <FaChevronRight />
                </button>
            )}
            </div>

            {/* Dot Indicators for Carousel */}
            <div className="flex gap-1.5 justify-center mt-3">
            {screenshots.map((_, index) => (
                <div
                key={index}
                className={`h-1 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                    ? 'w-6 bg-[var(--color-primary)]'
                    : 'w-1.5 bg-[var(--color-primary)]/50'
                }`}
                />
            ))}
            </div>
        </div>
        )}

          {projectLink && (
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 md:mt-8 inline-flex items-center justify-center gap-2 md:gap-3 text-[var(--color-primary)] hover:text-[var(--color-secondary)] font-bold text-base md:text-xl transition-colors hover:underline mx-auto"
            >
              <FaExternalLinkAlt />{projectLinkText}
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectModal;