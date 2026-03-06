"use client";
import { useEffect, useState } from "react";
import { FaLinkedin, FaPhoneAlt, FaFileDownload, FaEnvelope, FaGithub } from "react-icons/fa";

const ContactSection = () => {
  const [emailDisplay, setEmailDisplay] = useState("");

  const linkClass = "flex items-center gap-3 md:gap-4 text-[var(--color-primary)] no-underline transition-all hover:text-[var(--color-secondary)] w-full group";
  const iconClass = "text-2xl md:text-4xl flex-shrink-0 transition-transform group-hover:scale-110 text-[var(--color-primary)]";

  const getEmail = () => ["hernandez.mathieu19", "gmail", "com"].join("@").replace("@gmail", "@gmail");

  useEffect(() => {
    setEmailDisplay(getEmail());
  }, []);
  
  return (
    <div className="w-full max-w-[95vw] md:max-w-4xl mx-auto rounded-2xl text-left bg-gray-50/95 shadow-2xl p-5 md:p-10 flex flex-col items-start gap-4 md:gap-5 hover:cursor-pointer">
      
      <a className={linkClass} onClick={() => { navigator.clipboard.writeText(getEmail()); setEmailDisplay("E-mail copié !"); setTimeout(() => setEmailDisplay(getEmail()), 1000); }}>
        <FaEnvelope className={iconClass} />
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">E-mail</span>
          <span className="text-sm md:text-lg font-semibold text-[var(--color-primary)] truncate group-hover:text-[var(--color-secondary)] transition-colors">
            {emailDisplay}
          </span>
        </div>
      </a>

      <div className="w-full h-px bg-gray-200" />

      <a
        href="/CV_HERNANDEZ_MATHIEU_2025.pdf"
        download
        className={linkClass}
      >
        <FaFileDownload className={iconClass} />
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">CV</span>
          <span className="text-sm md:text-lg font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
            Télécharger mon CV
          </span>
        </div>
      </a>

      <div className="w-full h-px bg-gray-200" />

      <a
        href="https://www.linkedin.com/in/mathieu-hernandez-306914264/"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <FaLinkedin className={iconClass} />
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">LinkedIn</span>
          <span className="text-sm md:text-lg font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
            Mon profil LinkedIn
          </span>
        </div>
      </a>

      <div className="w-full h-px bg-gray-200" />

      <a
        href="https://github.com/thameiu"
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        <FaGithub className={iconClass} />
        <div className="flex flex-col min-w-0">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">GitHub</span>
          <span className="text-sm md:text-lg font-semibold text-[var(--color-primary)] group-hover:text-[var(--color-secondary)] transition-colors">
            Mon profil Github
          </span>
        </div>
      </a>

    </div>
  );
};

export default ContactSection;