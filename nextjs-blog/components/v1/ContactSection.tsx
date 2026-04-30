"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { FaLinkedin, FaFileDownload, FaEnvelope, FaGithub } from "react-icons/fa";

const CVModal = dynamic(() => import("./CVModal"), { ssr: false });

const ContactSection = () => {
  const [emailDisplay, setEmailDisplay] = useState("");
  const [isCVOpen, setIsCVOpen] = useState(false);

  const linkClass = "flex items-center gap-3 md:gap-4 text-white/80 no-underline transition-all hover:text-[var(--color-accent)] w-full group p-3 rounded-2xl hover:bg-white/5";
  const iconClass = "text-2xl md:text-4xl flex-shrink-0 transition-all duration-300 group-hover:scale-110 text-white/80 group-hover:text-[var(--color-accent)]";

  const getEmail = () => "hernandez.mathieu19@gmail.com";

  useEffect(() => {
    setEmailDisplay(getEmail());
  }, []);
  
  return (<>
    <div className="fade-in-section w-full max-w-[95vw] md:max-w-4xl mx-auto rounded-3xl text-left bg-white/10 backdrop-blur-lg border border-white/20 p-5 md:p-10 flex flex-col items-start gap-4 md:gap-5 hover:cursor-pointer transition-all duration-300">
      
      <a className={linkClass} onClick={() => { navigator.clipboard.writeText(getEmail()); setEmailDisplay("E-mail copié !"); setTimeout(() => setEmailDisplay(getEmail()), 1000); }}>
        <FaEnvelope className={iconClass} />
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-white/50 font-medium uppercase tracking-wide">E-mail</span>
          <span className="text-sm md:text-lg font-semibold text-white truncate group-hover:text-[var(--color-accent)] transition-colors">
            {emailDisplay}
          </span>
        </div>
      </a>

      <div className="w-full h-px bg-white/10" />

      <a onClick={() => setIsCVOpen(true)} className={linkClass}>
        <FaFileDownload className={iconClass} />
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-white/50 font-medium uppercase tracking-wide">CV</span>
          <span className="text-sm md:text-lg font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors">
            Mon CV
          </span>
        </div>
      </a>

      <div className="w-full h-px bg-white/10" />

      <a
        href="https://www.linkedin.com/in/mathieu-hernandez-306914264/"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <FaLinkedin className={iconClass} />
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-white/50 font-medium uppercase tracking-wide">LinkedIn</span>
          <span className="text-sm md:text-lg font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors">
            Mon profil LinkedIn
          </span>
        </div>
      </a>

      <div className="w-full h-px bg-white/10" />

      <a
        href="https://github.com/thameiu"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <FaGithub className={iconClass} />
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-white/50 font-medium uppercase tracking-wide">GitHub</span>
          <span className="text-sm md:text-lg font-semibold text-white group-hover:text-[var(--color-accent)] transition-colors">
            Mon profil Github
          </span>
        </div>
      </a>

    </div>

    {isCVOpen && <CVModal onClose={() => setIsCVOpen(false)} />}
  </>);
};

export default ContactSection;