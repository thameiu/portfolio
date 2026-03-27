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
import ContactSection from "../components/ContactSection";
import CuteLinks from "../components/CuteLinks";
import AboutSection from "../components/AboutSection";

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("experience");
  const [heroVisible, setHeroVisible] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  const handleBackgroundReady = useCallback(() => {
    setIsLoading(false);
  }, []);

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

  return (
    <div className="min-h-screen p-2 flex flex-col justify-start items-center font-['Sora']">
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
          MATHIEU<br /><span className="text-[var(--color-accent)]">HERNANDEZ</span>
        </h1>
      </div>

      <AboutSection />

      {/* Experience Section */}
      <Section id="experience" className="mt-[10vh] md:my-16 w-full px-4">
        <h2 className="fade-in-section uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-10 text-center text-white font-['archivo-black'] tracking-tight">
          Parcours et Compétences
        </h2>
        <ExperienceSection />
      </Section>

      {/* Projects Section */}
      <Section id="projects" className="mt-[10vh] w-full">
        <h2 className="fade-in-section uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-10 text-center text-white font-['archivo-black'] tracking-tight">
          Projets
        </h2>
        <ProjectGrid />
      </Section>

    {/* Contact Section */}
      <Section id="contact" className="mt-[15vh] mb-[20vh] w-full px-4">
        <h2 className="fade-in-section uppercase text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-10 text-center text-white font-['archivo-black'] tracking-tight">
          Contact
        </h2>
        <ContactSection />
      </Section>

      {/* Friends and stuff */}

      <CuteLinks />

      {/* Footer */}
      <footer className="w-full flex items-center justify-center px-6 md:px-12 py-5 mt-8 border-t border-white/10">
        <p className="text-[var(--color-accent)] text-xs md:text-sm font-['Sora']">
          &copy; {new Date().getFullYear()} Mathieu Hernandez.
        </p>
      </footer>
    </div>
  );
}