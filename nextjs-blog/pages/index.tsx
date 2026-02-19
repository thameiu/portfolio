"use client";
import Head from "next/head";
import { useState, useEffect, useCallback } from "react";
import ProjectGrid from "../components/ProjectGrid";
import Header from "../components/Header";
import BackgroundAnimation from "../components/BackgroundAnimation";
import Section from "../components/Section";
import { FaLinkedin, FaPhoneAlt, FaFileDownload, FaEnvelope, FaGithub } from "react-icons/fa";
import { SiCplusplus, SiNextdotjs, SiNestjs, SiReact, SiLeaflet, SiDocker, SiTypescript, SiPhp, SiLaravel, SiOpengl, SiCmake, SiTailwindcss, SiExpress, SiMysql, SiPython, SiJavascript, SiGit, SiPostgresql, SiMongodb, SiGitlab } from "react-icons/si";
import { FaJs, FaNodeJs, FaJava } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { GiFlame } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import Image from 'next/image';
import "animate.css";
import Loader from "../components/Loader";
import ExperienceSection from "../components/ExperienceSection";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("experience");
  const [heroVisible, setHeroVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const handleBackgroundReady = useCallback(() => {
    setIsLoading(false);
  }, []);
  
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const heroHeight = window.innerHeight * 0.3; // 30vh threshold - disappears earlier
      
      if (scrollPosition > heroHeight) {
        setHeroVisible(false);
      } else {
        setHeroVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const SkillBadge = ({ children }: { children: React.ReactNode }) => (
    <div className="inline-flex items-center gap-1.5 md:gap-2 px-3 py-2 md:px-4 md:py-2.5 bg-[#334A52] border border-[#334A52] text-white rounded-full text-xs md:text-sm transition-all hover:bg-gray-100 hover:text-[#334A52] whitespace-nowrap">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen p-2 flex flex-col justify-start items-center font-['sofia-pro-regular']">
      <Head>
        <title>Portfolio - Mathieu HERNANDEZ</title>
        <meta name="description" content="Portfolio de Mathieu HERNANDEZ - Développeur Full-Stack" />
        <link rel="icon" href="/favicon.ico" />

      </Head>


      {/* Loading Screen */}
      <Loader isLoading={isLoading} />

      <BackgroundAnimation onReady={handleBackgroundReady} />

      <Header />

      {/* Hero Title Section - Full Screen */}
      <div className={`w-full h-[90vh] flex flex-col items-start justify-center px-6 md:px-12 lg:px-20 ${heroVisible ? 'animate__animated animate__fadeInDown' : 'animate__animated animate__fadeOutUp animate__faster'}`}>
        <p className="text-[6vw] text-white/90 mb-4 md:mb-6 lg:mb-8 max-w-full font-light tracking-tight ">
          Portfolio de
        </p>
        <h1 className="text-[12vw] font-bold leading-[0.85] text-white/95 m-0 font-['archivo-black'] w-full tracking-tighter">
          MATHIEU<br /><span className="text-[#8DE1FD]">HERNANDEZ</span>
        </h1>
      </div>

      {/* Hero Section */}
      <Section id="about" className="flex flex-col justify-center items-center pt-[10vh] w-full box-border my-10 md:my-16">
        <h2 className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-10 text-center text-white font-['archivo-black'] tracking-tight">
          À propos
        </h2>
        <div className="w-[90vw] md:w-[80vw] bg-gray-50/95 rounded-3xl flex flex-col items-center p-5 md:p-10 shadow-2xl justify-center box-border">
          <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-6 md:gap-8">
            <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px] mb-5 md:mb-0 flex-shrink-0">
              <Image
                src="/photoHernandez.jpg"
                alt="Mathieu Hernandez"
                fill
                className="rounded-full border-4 border-white shadow-lg object-cover saturate-125"
                priority={true}
              />
            </div>
            <div className="text-left w-full md:w-auto">
              <section className="text-base md:text-2xl leading-relaxed text-gray-700 space-y-4">
                <p>
                  Je m'appelle <b>Mathieu HERNANDEZ</b>, j'ai 21 ans et je suis actuellement étudiant à <b>Epitech</b>, Marseille, dans le cadre d'un <b>Master of Science Technique</b>, avec une spécialisation en <b>Cybersécurité + Cloud</b>, après avoir réalisé un <b>BUT Informatique</b> à l'IUT d'Arles.
                </p>
                <p>
                  Grâce à ma formation et mes expériences professionnelles, j'ai développé de solides compétences en <b>développement web</b>, en conception d'architecture, en optimisation des performances, ainsi qu'en <b>gestion de projet</b> et qualité de développement.
                </p>
                {/* <p>
                  Ces expériences m'ont permis d'adopter des méthodologies <b>rigoureuses</b> et d'améliorer ma capacité à concevoir des solutions <b>efficaces</b> et bien <b>structurées</b>.
                </p> */}
              </section>
            </div>
          </div>
        </div>
      </Section>

      {/* Experience Section */}
      <Section id="experience" className="mt-[10vh] md:my-16 w-full px-4">
        <h2 className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-10 text-center text-white font-['archivo-black'] tracking-tight">
          Parcours et Compétences
        </h2>
        <ExperienceSection />
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="mt-[10vh] w-full">
        <h2 className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-10 text-center text-white font-['archivo-black'] tracking-tight">
          Projets
        </h2>
        <ProjectGrid />
      </Section>

    {/* Contact Section */}
      <Section id="contact" className="mt-[15vh] mb-[20vh] w-full px-4">
        <h2 className="uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-10 text-center text-white font-['archivo-black'] tracking-tight">
          Contact
        </h2>
        <div className="w-full max-w-[95vw] md:max-w-4xl mx-auto rounded-2xl text-left bg-gray-50/95 shadow-2xl p-5 md:p-10 flex flex-col items-start gap-5 md:gap-6">
          <a 
            href="mailto:hernandez.mathieu19@gmail.com" 
            className="flex items-center gap-3 md:gap-4 text-[#334A52] no-underline transition-colors hover:text-[#8DE1FD] w-full group"
          >
            <FaEnvelope className="text-2xl md:text-4xl flex-shrink-0 transition-transform group-hover:scale-110" />
            <span className="text-sm md:text-lg break-all leading-tight">E-mail : hernandez.mathieu19@gmail.com</span>
          </a>
          <a 
            href="tel:+33662011741" 
            className="flex items-center gap-3 md:gap-4 text-[#334A52] no-underline transition-colors hover:text-[#8DE1FD] w-full group"
          >
            <FaPhoneAlt className="text-2xl md:text-4xl flex-shrink-0 transition-transform group-hover:scale-110" />
            <span className="text-sm md:text-lg leading-tight">Téléphone : 06 62 01 17 41</span>
          </a>
          <a 
            href="/CV_HERNANDEZ_MATHIEU_2025.pdf" 
            download 
            className="flex items-center gap-3 md:gap-4 text-[#334A52] no-underline transition-colors hover:text-[#8DE1FD] w-full group"
          >
            <FaFileDownload className="text-2xl md:text-4xl flex-shrink-0 transition-transform group-hover:scale-110" />
            <span className="text-sm md:text-lg leading-tight">Télécharger mon CV</span>
          </a>
          <a 
            href="https://www.linkedin.com/in/mathieu-hernandez-306914264/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 md:gap-4 text-[#334A52] no-underline transition-colors hover:text-[#8DE1FD] w-full group"
          >
            <FaLinkedin className="text-2xl md:text-4xl flex-shrink-0 transition-transform group-hover:scale-110" />
            <span className="text-sm md:text-lg leading-tight">Mon profil LinkedIn</span>
          </a>
          <a 
            href="https://github.com/thameiu" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-3 md:gap-4 text-[#334A52] no-underline transition-colors hover:text-[#8DE1FD] w-full group"
          >
            <FaGithub className="text-2xl md:text-4xl flex-shrink-0 transition-transform group-hover:scale-110" />
            <span className="text-sm md:text-lg leading-tight">Mon profil Github</span>
          </a>
        </div>
      </Section>

      {/* Footer */}
      <footer className="bg-[#334A52] text-white text-center text-xs md:text-sm px-3 md:px-5 py-4 rounded-[50px]">
        <p>&copy; {new Date().getFullYear()} Mathieu Hernandez. Tous droits réservés.</p>
      </footer>
    </div>
  );
}