import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ProjectModal from "./ProjectModal";

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
  const [isCardHovered, setIsCardHovered] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const allImages = [previewImage, ...screenshots];

  // Auto-slide preview images on hover with actual sliding animation
  useEffect(() => {
    if (isCardHovered && allImages.length > 1) {
      intervalRef.current = setInterval(() => {
        setPreviewIndex((prev) => (prev + 1) % allImages.length);
      }, 2100);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setPreviewIndex(0);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isCardHovered, allImages.length]);

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      {/* Project Card */}
      <div
        className="group relative bg-white rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col w-full sm:w-[360px]"
        style={{ height: height || '380px' }}
        onClick={openModal}
        onMouseEnter={() => setIsCardHovered(true)}
        onMouseLeave={() => setIsCardHovered(false)}
      >
        {/* Image Container with Sliding Animation */}
        <div className="relative w-full h-[60%] overflow-hidden bg-gray-100">
          <div 
            className="flex h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${previewIndex * 100}%)` }}
          >
            {allImages.map((src, index) => (
              <div key={index} className="min-w-full h-full relative flex-shrink-0">
                <Image
                  src={src}
                  alt={`${title} preview ${index + 1}`}
                  fill
                  className="object-cover"
                  quality={90}
                />
              </div>
            ))}
          </div>
          
          {/* Gradient Overlay on Hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
          
          {/* Preview Indicators */}
          {screenshots.length > 0 && (
            <div className={`absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10 transition-opacity duration-300 ${
              isCardHovered ? 'opacity-100' : 'opacity-0'
            }`}>
              {allImages.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    index === previewIndex
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 pb-3 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-[var(--color-primary)] mb-2 group-hover:text-[var(--color-secondary)] transition-colors">
              {title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
              {description}
            </p>
          </div>
          
          {/* Click indicator */}
          <div className="mt-2 flex items-center gap-2 text-xs text-[var(--color-secondary)] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Voir plus</span>
            <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <ProjectModal
          title={title}
          description={description}
          features={features}
          screenshots={screenshots}
          techStack={techStack}
          projectLink={projectLink}
          projectLinkText={projectLinkText}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default ProjectCard;