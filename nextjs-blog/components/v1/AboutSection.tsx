import React from "react";
import Image from "next/image";
import Section from "./Section";

const AboutSection: React.FC = () => {
  return (
    <Section id="about" className="flex flex-col justify-center items-center pt-[10vh] w-full box-border my-10 md:my-16">
      <h2 className="fade-in-section uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-10 text-center text-white font-['archivo-black'] tracking-tight">
        À propos
      </h2>
      <div className="fade-in-section w-full max-w-[90vw] md:max-w-7xl mx-auto overflow-hidden bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl flex flex-col lg:flex-row justify-center box-border relative min-h-[400px]">
        {/* Full-height Image Container with CSS Mask for true opacity blending */}
        <div className="relative w-full lg:w-[40%] h-[300px] lg:h-auto flex-shrink-0"
             style={{
               WebkitMaskImage: 'var(--fade-mask)',
               maskImage: 'var(--fade-mask)',
             }}
        >
          <style dangerouslySetInnerHTML={{__html: `
            .flex-shrink-0 {
              --fade-mask: linear-gradient(to bottom, black 50%, transparent 100%);
            }
            @media (min-width: 1024px) {
              .flex-shrink-0 {
                --fade-mask: linear-gradient(to right, black 50%, transparent 100%);
              }
            }
          `}} />
          <Image
            src="/photoHernandez.jpg"
            alt="Mathieu Hernandez"
            fill
            className="object-cover object-[center_20%] saturate-110"
            priority={true}
          />
        </div>
        
        {/* Text Container */}
        <div className="flex-1 p-8 md:p-12 z-10 flex items-center">
          <div className="text-left w-full max-w-4xl">
            <section className="text-base md:text-2xl leading-relaxed text-white/90 space-y-6">
              <p>
                Je m'appelle <b className="text-[var(--color-accent)] font-bold">Mathieu HERNANDEZ</b>, j'ai 21 ans et je suis actuellement étudiant à <b className="text-[var(--color-accent)] font-bold">Epitech</b>, Marseille, dans le cadre d'un <b className="text-[var(--color-accent)] font-bold">Master of Science Technique</b>, avec une spécialisation en <b className="text-[var(--color-accent)] font-bold">Cybersécurité + Cloud</b>, après avoir réalisé un <b className="text-[var(--color-accent)] font-bold">BUT Informatique</b> à l'IUT d'Arles.
              </p>
              <p>
                Grâce à ma formation et mes expériences professionnelles, j'ai développé de solides compétences en <b className="text-[var(--color-accent)] font-bold">développement web</b>, en conception d'architecture, en optimisation des performances, ainsi qu'en <b className="text-[var(--color-accent)] font-bold">gestion de projet</b> et qualité de développement.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default AboutSection;
