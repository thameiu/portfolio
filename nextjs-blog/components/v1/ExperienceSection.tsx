import { useState, useRef, useEffect } from "react";
import { SiNextdotjs, SiReact, SiTailwindcss, SiExpress, SiTypescript, SiPhp, SiLaravel, SiDocker, SiJenkins, SiSupabase, SiLeaflet, SiPostgresql, SiMysql, SiMongodb, SiGit, SiGitlab, SiCplusplus, SiPython, SiJavascript, SiOpengl, SiCmake, SiNestjs, SiDotnet, SiAngular, SiQt } from "react-icons/si";
import { FaJs, FaNodeJs, FaJava, FaWindows, FaDesktop, FaServer, FaDatabase, FaTools, FaCode, FaLaptopCode } from "react-icons/fa";
import { MdAccessTimeFilled } from "react-icons/md";
import { VscAzureDevops } from "react-icons/vsc";
import { PiFileCSharp } from "react-icons/pi";
import { GiFlame } from "react-icons/gi";
import { IoPeople } from "react-icons/io5";
import { SkillBadge, TechBadge, JobTypeBadge, WindevIcon } from "./Utils";

const ExperienceSection = () => {
  const [activeTab, setActiveTab] = useState<string>("experience");
  const [previousTab, setPreviousTab] = useState<string>("experience");
  const [contentHeight, setContentHeight] = useState<number>(400);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({
    experience: null,
    studies: null,
    skills: null,
  });

  const tabOrder = ["experience", "studies", "skills"];

  useEffect(() => {
    // Update height when tab changes
    const activeContent = contentRefs.current[activeTab];
    if (activeContent) {
      setContentHeight(activeContent.scrollHeight);
    }
  }, [activeTab]);

  const handleTabChange = (newTab: string) => {
    setPreviousTab(activeTab);
    setActiveTab(newTab);
  };

  const getTransitionClass = (tab: string) => {
    const currentIndex = tabOrder.indexOf(activeTab);
    const tabIndex = tabOrder.indexOf(tab);
    const previousIndex = tabOrder.indexOf(previousTab);

    if (tab === activeTab) {
      return "opacity-100 translate-x-0 relative";
    }

    // Determine direction based on tab indices
    if (currentIndex > previousIndex) {
      // Moving right (to a higher index tab)
      return tabIndex < currentIndex
        ? "opacity-0 -translate-x-full absolute top-0 left-0 w-full pointer-events-none"
        : "opacity-0 translate-x-full absolute top-0 left-0 w-full pointer-events-none";
    } else {
      // Moving left (to a lower index tab)
      return tabIndex > currentIndex
        ? "opacity-0 translate-x-full absolute top-0 left-0 w-full pointer-events-none"
        : "opacity-0 -translate-x-full absolute top-0 left-0 w-full pointer-events-none";
    }
  };


  return (
    <div className="fade-in-section w-full max-w-[90vw] md:max-w-7xl mx-auto bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-5 md:p-8 md:px-4 ">
      {/* Tab Navigation */}
      <div className="flex flex-row flex-wrap justify-center gap-2 md:gap-3 mb-5 md:mb-8">
        <button
          onClick={() => handleTabChange("experience")}
          className={`min-w-[28%] md:min-w-0 md:w-auto px-4 py-2.5 md:px-6 md:py-3 rounded-[25px] cursor-pointer text-sm md:text-lg transition-all duration-300 font-['Sora'] font-medium ${
            activeTab === "experience"
              ? "bg-white/20 text-white border border-white/30"
              : "bg-transparent text-white/70 hover:bg-white/10 hover:text-white border border-transparent"
          }`}
        >
          Expériences
        </button>
        <button
          onClick={() => handleTabChange("studies")}
          className={`min-w-[28%] md:min-w-0 md:w-auto px-4 py-2.5 md:px-6 md:py-3 rounded-[25px] cursor-pointer text-sm md:text-lg transition-all duration-300 font-['Sora'] font-medium ${
            activeTab === "studies"
              ? "bg-white/20 text-white border border-white/30"
              : "bg-transparent text-white/70 hover:bg-white/10 hover:text-white border border-transparent"
          }`}
        >
          Formation
        </button>
        <button
          onClick={() => handleTabChange("skills")}
          className={`min-w-[28%] md:min-w-0 md:w-auto px-4 py-2.5 md:px-6 md:py-3 rounded-[25px] cursor-pointer text-sm md:text-lg transition-all duration-300 font-['Sora'] font-medium ${
            activeTab === "skills"
              ? "bg-white/20 text-white border border-white/30"
              : "bg-transparent text-white/70 hover:bg-white/10 hover:text-white border border-transparent"
          }`}
        >
          Compétences
        </button>
      </div>

      {/* Tab Content */}
      <div 
        className="relative overflow-hidden transition-all duration-700 ease-in-out"
        style={{ height: `${contentHeight}px` }}
      >
        {/* Experience Tab */}
        <div
          ref={(el) => { contentRefs.current.experience = el; }}
          className={`transition-all duration-700 ease-in-out ${getTransitionClass("experience")}`}
        >
          <div className="flex flex-col items-center w-full">
            <div className="relative w-full md:w-[95%] mt-5">
              {/* Experience Item 1 */}
              <div className="group relative pl-0 md:pl-12 mb-8 md:mb-10">
                {/* Timeline Dot - desktop only */}
                <div className="hidden md:block absolute left-[48px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-6 h-6 bg-white/20 border border-white/40 rounded-full transition-transform duration-300 group-hover:scale-125" />
                    <div className="absolute w-4 h-4 bg-[var(--color-accent)] rounded-full transition-transform duration-300 group-hover:scale-150" />
                  </div>
                </div>
                
                <div className="bg-transparent p-4 md:p-6 transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/20 rounded-2xl">
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs md:text-base text-white/60 font-medium">
                        Septembre 2025 - Aujourd'hui
                      </p>
                      <JobTypeBadge>Alternance</JobTypeBadge>
                    </div>
                    <h3 className="text-lg md:text-3xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
                      Analyste Développeur
                    </h3>
                    <p className="text-base md:text-xl text-white/80">
                      ACD (Aix-en-Provence)
                    </p>
                  </div>
                  
                  <p className="text-sm md:text-lg text-white/70 leading-relaxed mb-4">
                    Maintenance applicative et développement de nouvelles fonctionnalités sur <b className="text-white/90">Suite Expert</b>, solution Bureau et Web pour experts comptables. <br/>
                    Participation à l'optimisation des performances, à la résolution de problèmes déclarés ou détectés et à la refactorisation du code existant.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <TechBadge><WindevIcon />WinDev</TechBadge>
                    <TechBadge><SiDotnet /> ASP.NET MVC</TechBadge>
                    <TechBadge><SiDotnet />Kendo UI MVC</TechBadge>
                    <TechBadge><VscAzureDevops /> Azure DevOps</TechBadge>
                    <TechBadge><SiMysql /> SQL</TechBadge>
                    <TechBadge><PiFileCSharp /> C#</TechBadge>
                    <TechBadge><SiJavascript /> JavaScript</TechBadge>
                    <TechBadge><SiTypescript /> TypeScript</TechBadge>
                  </div>
                </div>
              </div>

              {/* Experience Item 2 */}
              <div className="group relative pl-0 md:pl-12 mb-8 md:mb-10">
                <div className="hidden md:block absolute left-[48px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-6 h-6 bg-white/20 border border-white/40 rounded-full transition-transform duration-300 group-hover:scale-125" />
                    <div className="absolute w-4 h-4 bg-[var(--color-accent)] rounded-full transition-transform duration-300 group-hover:scale-150" />
                  </div>
                </div>
                
                <div className="bg-transparent p-4 md:p-6 transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/20 rounded-2xl">
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs md:text-base text-white/60 font-medium">
                        Septembre 2024 - Juin 2025
                      </p>
                      <JobTypeBadge>Alternance</JobTypeBadge>
                    </div>
                    <h3 className="text-lg md:text-3xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
                      Développeur Full-stack
                    </h3>
                    <p className="text-base md:text-xl text-white/80">
                      Miratlas (Pertuis)
                    </p>
                  </div>
                  
                  <p className="text-sm md:text-lg text-white/70 leading-relaxed mb-4">
                    Refonte de <b className="text-white/90">Pathfinder</b>, Application web de cartographie de perturbations atmosphériques pour les communications espace en optique libre. <br/>
                    Conception et réalisation de la base de données et d'une API Rest. <br/>
                    Dynamisation complète du Frontend et des données affichées, via des graphiques et fonds de carte modifiables en temps réel avec de l'imagerie numérique.<br/>
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <TechBadge><SiNextdotjs /> Next.js</TechBadge>
                    <TechBadge><SiReact /> React</TechBadge>
                    <TechBadge><SiTailwindcss /> Tailwind</TechBadge>
                    <TechBadge><SiLeaflet /> Leaflet</TechBadge>
                    <TechBadge><SiLaravel /> Laravel</TechBadge>
                    <TechBadge><SiDocker /> Docker</TechBadge>
                    <TechBadge><SiTypescript /> TypeScript</TechBadge>
                    <TechBadge><SiPhp /> PHP</TechBadge>
                    <TechBadge><SiPostgresql /> PostgreSQL</TechBadge>
                    <TechBadge><SiGitlab /> Gitlab</TechBadge>
                  </div>
                </div>
              </div>

              {/* Experience Item 3 */}
              <div className="group relative pl-0 md:pl-12">
                <div className="hidden md:block absolute left-[48px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-6 h-6 bg-white/20 border border-white/40 rounded-full transition-transform duration-300 group-hover:scale-125" />
                    <div className="absolute w-4 h-4 bg-[var(--color-accent)] rounded-full transition-transform duration-300 group-hover:scale-150" />
                  </div>
                </div>
                
                <div className="bg-transparent p-4 md:p-6 transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/20 rounded-2xl">
                  <div className="flex flex-col gap-2 mb-3">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs md:text-base text-white/60 font-medium">
                        Avril - Juin 2024
                      </p>
                      <JobTypeBadge>Stage</JobTypeBadge>
                    </div>
                    <h3 className="text-lg md:text-3xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
                      Développeur Web
                    </h3>
                    <p className="text-base md:text-xl text-white/80">
                      Amiltone (Aix-en-Provence)
                    </p>
                  </div>
                  
                  <p className="text-sm md:text-lg text-white/70 leading-relaxed mb-4">
                    Participation au développement de <b className="text-white/90">Flotto</b>, solution web de gestion de flotte automobile. <br/>
                    Réalisation de nouvelles fonctionnalités sur le Frontend et le Backend, amélioration de l'accessibilité, correction de bugs. <br/>
                  </p>

                  <div className="flex flex-wrap gap-2">
                    <TechBadge><SiReact /> React</TechBadge>
                    <TechBadge><SiTailwindcss /> Tailwind</TechBadge>
                    <TechBadge><SiNestjs /> NestJS</TechBadge>
                    <TechBadge><SiAngular /> Angular</TechBadge>
                    <TechBadge><SiTypescript /> TypeScript</TechBadge>
                    <TechBadge><SiGitlab /> Gitlab</TechBadge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studies Tab */}
        <div
          ref={(el) => { contentRefs.current.studies = el; }}
          className={`transition-all duration-700 ease-in-out ${getTransitionClass("studies")}`}
        >
          <div className="flex flex-col items-center w-full">
            <div className="relative w-full md:w-[95%] mt-5">
              {/* Study Item 1 */}
              <div className="group relative pl-0 md:pl-12 mb-8 md:mb-10">
                <div className="hidden md:block absolute left-[48px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-6 h-6 bg-white/20 border border-white/40 rounded-full transition-transform duration-300 group-hover:scale-125" />
                    <div className="absolute w-4 h-4 bg-[var(--color-accent)] rounded-full transition-transform duration-300 group-hover:scale-150" />
                  </div>
                </div>
                
                <div className="bg-transparent p-4 md:p-6 transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/20 rounded-2xl">
                  <div className="flex flex-col gap-2 mb-3">
                    <p className="text-xs md:text-base text-white/60 font-medium">
                      2025-2027
                    </p>
                    <h3 className="text-lg md:text-3xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
                      Master of Science Technique - Architecte de Systèmes d'Information
                    </h3>
                    <p className="text-base md:text-xl text-white/80">
                      Epitech (Marseille)
                    </p>
                  </div>
                  
                  <p className="text-sm md:text-lg text-white/70 leading-relaxed">
                    Spécialisation en Cybersécurité et Cloud. Projets avancés en équipe avec cadre professionnel, et réalisation d'un projet de fin d'études sur 2 ans.
                  </p>
                </div>
              </div>

              {/* Study Item 2 */}
              <div className="group relative pl-0 md:pl-12">
                <div className="hidden md:block absolute left-[48px] top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute w-6 h-6 bg-white/20 border border-white/40 rounded-full transition-transform duration-300 group-hover:scale-125" />
                    <div className="absolute w-4 h-4 bg-[var(--color-accent)] rounded-full transition-transform duration-300 group-hover:scale-150" />
                  </div>
                </div>
                
                <div className="bg-transparent p-4 md:p-6 transition-all duration-300 hover:bg-white/10 border border-transparent hover:border-white/20 rounded-2xl">
                  <div className="flex flex-col gap-2 mb-3">
                    <p className="text-xs md:text-base text-white/60 font-medium">
                      2022-2025
                    </p>
                    <h3 className="text-lg md:text-3xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">
                      BUT Informatique
                    </h3>
                    <p className="text-base md:text-xl text-white/80">
                      Aix-Marseille Université (IUT d'Arles)
                    </p>
                  </div>
                  
                  <p className="text-sm md:text-lg text-white/70 leading-relaxed">
                    Formation complète en développement logiciel, bases de données, réseaux et gestion de projet. Apprentissage des méthodologies agiles et des bonnes pratiques de développement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Tab */}
        <div
          ref={(el) => { contentRefs.current.skills = el; }}
          className={`transition-all duration-700 ease-in-out ${getTransitionClass("skills")}`}
        >
          <div className="w-full px-2 md:px-4 py-4">
            {/* 2x3 Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Frontend */}
              <div className="group bg-white/5 hover:bg-white/10 rounded-2xl p-4 md:p-5 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <FaDesktop className="text-white/80 group-hover:text-[var(--color-accent)] transition-colors text-lg md:text-2xl" />
                  <h4 className="text-base md:text-xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">Frontend</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge><SiReact /> React</SkillBadge>
                  <SkillBadge><SiNextdotjs /> Next.js</SkillBadge>
                  <SkillBadge><SiAngular /> Angular</SkillBadge>
                  <SkillBadge><SiTailwindcss /> Tailwind</SkillBadge>
                  <SkillBadge><SiLeaflet /> Leaflet</SkillBadge>
                  <SkillBadge><SiDotnet /> Kendo UI MVC</SkillBadge>
                </div>
              </div>

              {/* Backend */}
              <div className="group bg-white/5 hover:bg-white/10 rounded-2xl p-4 md:p-5 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <FaServer className="text-white/80 group-hover:text-[var(--color-accent)] transition-colors text-lg md:text-2xl" />
                  <h4 className="text-base md:text-xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">Backend</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge><FaNodeJs /> Node.js</SkillBadge>
                  <SkillBadge><SiNestjs /> NestJS</SkillBadge>
                  <SkillBadge><SiExpress /> Express</SkillBadge>
                  <SkillBadge><SiLaravel /> Laravel</SkillBadge>
                  <SkillBadge><SiDotnet /> ASP.NET MVC</SkillBadge>
                </div>
              </div>

              {/* Database */}
              <div className="group bg-white/5 hover:bg-white/10 rounded-2xl p-4 md:p-5 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <FaDatabase className="text-white/80 group-hover:text-[var(--color-accent)] transition-colors text-lg md:text-2xl" />
                  <h4 className="text-base md:text-xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">Bases de données</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge><SiPostgresql /> PostgreSQL</SkillBadge>
                  <SkillBadge><SiMysql /> MySQL</SkillBadge>
                  <SkillBadge><SiMongodb /> MongoDB</SkillBadge>
                </div>
              </div>

              {/* Tools */}
              <div className="group bg-white/5 hover:bg-white/10 rounded-2xl p-4 md:p-5 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <FaTools className="text-white/80 group-hover:text-[var(--color-accent)] transition-colors text-lg md:text-2xl" />
                  <h4 className="text-base md:text-xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">Outils</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge><SiDocker /> Docker</SkillBadge>
                  <SkillBadge><SiGit /> Git</SkillBadge>
                  <SkillBadge><SiGitlab /> GitLab</SkillBadge>
                  <SkillBadge><VscAzureDevops /> Azure DevOps</SkillBadge>
                </div>
              </div>

              {/* Languages */}
              <div className="group bg-white/5 hover:bg-white/10 rounded-2xl p-4 md:p-5 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <FaCode className="text-white/80 group-hover:text-[var(--color-accent)] transition-colors text-lg md:text-2xl" />
                  <h4 className="text-base md:text-xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">Langages</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge><SiJavascript /> JavaScript</SkillBadge>
                  <SkillBadge><SiTypescript /> TypeScript</SkillBadge>
                  <SkillBadge><PiFileCSharp /> C#</SkillBadge>
                  <SkillBadge><SiPhp /> PHP</SkillBadge>
                  <SkillBadge><SiPython /> Python</SkillBadge>
                  <SkillBadge><FaJava /> Java</SkillBadge>
                  <SkillBadge><SiCplusplus /> C++</SkillBadge>
                  <SkillBadge><SiMysql /> SQL</SkillBadge>
                </div>
              </div>

              {/* Desktop */}
              <div className="group bg-white/5 hover:bg-white/10 rounded-2xl p-4 md:p-5 border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <FaLaptopCode className="text-white/80 group-hover:text-[var(--color-accent)] transition-colors text-lg md:text-2xl" />
                  <h4 className="text-base md:text-xl font-bold text-white group-hover:text-[var(--color-accent)] transition-colors">Bureau</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  <SkillBadge><SiOpengl /> OpenGL</SkillBadge>
                  <SkillBadge><SiQt /> Qt</SkillBadge>
                  <SkillBadge><FaJava /> NetBeans</SkillBadge>
                  <SkillBadge><WindevIcon /> WinDev</SkillBadge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;