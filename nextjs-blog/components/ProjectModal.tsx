import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import Link from "next/link";

interface ProjectModalProps {
  title: string;
  description: string;
  features: string[];
  screenshots: string[];
  techStack?: React.ReactNode;
  projectLink?: string;
  projectLinkText?: string;
  color?: string;
  light?: boolean;
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
  color = "var(--color-primary)",
  light,
  onClose,
}) => {
  const getContrastYIQ = (hexcolor: string = "") => {
    if (!hexcolor || hexcolor.startsWith("var")) return 'white';
    hexcolor = hexcolor.replace("#", "");
    if (hexcolor.length === 3) hexcolor = hexcolor.split("").map(c => c + c).join("");
    const r = parseInt(hexcolor.substring(0, 2), 16);
    const g = parseInt(hexcolor.substring(2, 2), 16);
    const b = parseInt(hexcolor.substring(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return (yiq >= 128) ? 'black' : 'white';
  };

  const adaptiveTextColor = getContrastYIQ(color);

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
        .modal-overlay::-webkit-scrollbar-thumb {
          background-color: ${color};
          border-radius: 20px;
          border: 3px solid transparent;
          background-clip: content-box;
        }
        .modal-overlay::-webkit-scrollbar {
          width: 12px;
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
  }, [color]);

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
            <button
              className="absolute top-4 right-4 md:top-5 md:right-5 flex items-center justify-center text-white/80 hover:text-white text-2xl transition-colors z-[3000]"
              onClick={closeLightbox}
              aria-label="Fermer"
            >
              <FaTimes />
            </button>
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

            {screenshots.length > 1 && (
              <button
                className="absolute left-2 md:left-5 top-1/2 -translate-y-1/2 hover:scale-125 transition-all text-3xl md:text-4xl z-20 drop-shadow-lg opacity-80 hover:opacity-100"
                style={{ color }}
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
                className="absolute right-2 md:right-5 top-1/2 -translate-y-1/2 hover:scale-125 transition-all text-3xl md:text-4xl z-20 drop-shadow-lg opacity-80 hover:opacity-100"
                style={{ color }}
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
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: index === currentImageIndex ? '32px' : '8px',
                  backgroundColor: color,
                  opacity: index === currentImageIndex ? 1 : 0.4
                }}
                />
            ))}
            </div>
        </div>
        </div>  

      )}

      {/* Modal */}
      <div
        className="modal-overlay fixed inset-0 bg-black/50 backdrop-blur-3xl flex justify-center items-start z-[1000] overflow-y-auto animate-fade-in"
        onClick={onClose}
      >
        <div
          className="w-full min-h-screen relative flex flex-col p-6 md:p-16 animate-slide-in pb-20"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 md:top-5 md:right-5 flex items-center justify-center w-[50px] h-[50px] text-white/80 hover:text-white transition-colors z-50 text-2xl"
            onClick={onClose}
          >
            <FaTimes />
          </button>

          <div className="text-center mb-8 md:mb-12 mt-10 md:mt-0 max-w-6xl mx-auto w-full">
            <h1 
              className="text-5xl md:text-6xl lg:text-8xl font-black tracking-tight mb-4 md:mb-8 drop-shadow-lg"
              style={{ color }}
            >
              {title}
            </h1>
            <p className="text-lg md:text-2xl text-white/80 mb-6 md:mb-10 px-2 md:px-5 leading-relaxed max-w-4xl mx-auto">{description}</p>
            {techStack && (
              <div className="flex flex-wrap gap-2 md:gap-3 justify-center max-w-4xl mx-auto">
                {React.Children.map(techStack as any, (child) => {
                  if (child && (child as any).type === React.Fragment) {
                    return React.Children.map((child as any).props.children, (badge) => {
                      if (React.isValidElement(badge)) {
                        return React.cloneElement(badge as React.ReactElement, {
                          color: color,
                          light: light
                        } as any);
                      }
                      return badge;
                    });
                  }
                  if (React.isValidElement(child)) {
                    return React.cloneElement(child as React.ReactElement, {
                      color: color,
                      light: light
                    } as any);
                  }
                  return child;
                })}
              </div>
            )}
          </div>



        {screenshots.length > 0 && (
        <div className="relative w-full max-w-7xl mx-auto mt-4 md:mt-8">
          <div className="flex items-center justify-center gap-2 md:gap-6">
            {screenshots.length > 1 && (
                <button
                className="flex-shrink-0 hover:scale-125 transition-all text-3xl md:text-5xl z-10 drop-shadow-lg opacity-80 hover:opacity-100 p-2"
                style={{ color }}
                onClick={(e) => { e.stopPropagation(); prevImage(e); }}
                disabled={isTransitioning}
                >
                <FaChevronLeft />
                </button>
            )}
            <div
            className="flex-1 w-full relative h-[40vh] md:h-[65vh] overflow-hidden cursor-grab rounded-2xl"
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

            <div
                className="flex h-full w-full"
                style={{
                transform: `translateX(${currentTranslate}%)`,
                transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
            >
                {screenshots.map((src, index) => (
                <div className="min-w-full h-full flex items-center justify-center p-4 md:p-8" key={index}>
                    <div className="relative w-full h-full drop-shadow-2xl">
                    <Image
                        src={src}
                        alt={`${title} screenshot ${index + 1}`}
                        fill
                        className="object-contain saturate-125 pointer-events-none rounded-xl"
                        quality={100}
                        priority={index === currentImageIndex}
                        sizes="(max-width: 768px) 100vw, 1200px"
                        unoptimized
                        draggable={false}
                    />
                    </div>
                </div>
                ))}
            </div>

            </div>
            {screenshots.length > 1 && (
                <button
                className="flex-shrink-0 hover:scale-125 transition-all text-3xl md:text-5xl z-10 drop-shadow-lg opacity-80 hover:opacity-100 p-2"
                style={{ color }}
                onClick={(e) => { e.stopPropagation(); nextImage(e); }}
                disabled={isTransitioning}
                >
                <FaChevronRight />
                </button>
            )}
          </div>

            {/* Dot Indicators for Carousel */}
            <div className="flex gap-1.5 justify-center mt-3 relative z-20">
            {screenshots.map((_, index) => (
                <div
                key={index}
                className="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                style={{
                  width: index === currentImageIndex ? '24px' : '6px',
                  backgroundColor: color,
                  opacity: index === currentImageIndex ? 1 : 0.5
                }}
                onMouseOver={(e) => {
                  if (index !== currentImageIndex) e.currentTarget.style.opacity = '0.8';
                }}
                onMouseOut={(e) => {
                   if (index !== currentImageIndex) e.currentTarget.style.opacity = '0.5';
                }}
                onClick={(e) => { e.stopPropagation(); setCurrentImageIndex(index); }}
                />
            ))}
            </div>
          <div className="text-left my-10 md:my-16 mx-auto w-full p-6 md:p-10 rounded-2xl">
            <h3 className="mt-0 text-white text-2xl md:text-3xl mb-6 font-bold tracking-tight border-b border-white/10 pb-4">
              Fonctionnalités Clés & Technique
            </h3>
            <ul className="list-none pl-0 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex text-base md:text-lg leading-relaxed text-white/80 relative items-start">
                        <div
                          className="w-2.5 h-2.5 rounded-full mt-1.5 mr-3 md:mr-4 flex-shrink-0"
                          style={{ backgroundColor: color }}
                        />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        )}

          {projectLink && (
            <Link
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 font-bold text-lg md:text-xl transition-all px-8 py-4 md:px-12 md:py-5 rounded-full hover:scale-105 mx-auto mt-4 md:mt-8 mb-10"
              style={{ 
                backgroundColor: color,
                color: light ? 'black' : 'white'
              }}
            >
              <FaExternalLinkAlt />{projectLinkText}
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectModal;