"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlitchTitle from "./GlitchTitle";
import MainSectionV2 from "./MainSectionV2";

export default function AboutV2() {
  const sectionRef  = useRef<HTMLElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const section = sectionRef.current;
      if (!section) return;
      const isMobile = window.matchMedia("(max-width: 1023px)").matches;

      // ── Content fades in ──
      gsap.fromTo(contentRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power2.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: isMobile ? "top 94%" : "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Image parallax ──
      gsap.to(imgRef.current, {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <MainSectionV2
      id="v2-about"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col justify-center py-32 overflow-hidden"
      style={{
        background: "transparent",
      }}
    >
      {/* Mega title */}
      <GlitchTitle
        text="À Propos"
        color="#881111"
        triggerRef={sectionRef}
        className="v2-mega-title mb-16"
        style={{ color: "#881111" }}
        startDesktop="top 84%"
        startMobile="top 95%"
      />

      {/* Content row */}
      <div ref={contentRef} className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center opacity-0">
        {/* Photo */}
        <div
          ref={imgRef}
          className="relative flex-shrink-0 w-52 h-64 md:w-64 md:h-80 overflow-hidden"
          style={{
            borderRadius: "10px",
            boxShadow: "0 24px 60px rgba(136,17,17,0.12)",
            border: "1px solid rgba(136,17,17,0.14)",
          }}
        >
          <Image
            src="/photoHernandez.jpg"
            alt="Mathieu Hernandez"
            fill
            className="object-cover object-[center_20%] saturate-[1.05] contrast-[1.02]"
            priority
          />
        </div>

        {/* Text */}
        <div className="max-w-3xl space-y-6" style={{ fontFamily: "'Sora', sans-serif" }}>
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: "#2D1010" }}>
            Je m'appelle{" "}
            <strong className="font-bold" style={{ color: "#881111" }}>Mathieu HERNANDEZ</strong>,
            j'ai 21 ans et je suis actuellement étudiant à{" "}
            <strong style={{ color: "#881111" }}>Epitech</strong>, Marseille, dans le cadre d'un{" "}
            <strong style={{ color: "#881111" }}>Master of Science Technique</strong>, avec une
            spécialisation en{" "}
            <strong style={{ color: "#881111" }}>Cybersécurité + Cloud</strong>, après avoir réalisé
            un <strong style={{ color: "#881111" }}>BUT Informatique</strong> à l'IUT d'Arles.
          </p>
          <p className="text-lg md:text-xl leading-relaxed" style={{ color: "#2D1010" }}>
            Grâce à ma formation et mes expériences professionnelles, j'ai développé de solides
            compétences en{" "}
            <strong style={{ color: "#881111" }}>développement web</strong>, en conception
            d'architecture, en optimisation des performances, ainsi qu'en{" "}
            <strong style={{ color: "#881111" }}>gestion de projet</strong> et qualité de
            développement.
          </p>

          {/* Accent rule */}
          <div className="flex items-center gap-4 pt-2">
            <span
              className="block h-px flex-1 max-w-[3rem]"
              style={{ background: "#881111" }}
            />
            <span
              className="text-xs uppercase tracking-[0.25em]"
              style={{ color: "#881111", fontFamily: "'Sora', sans-serif" }}
            >
              Bouc-Bel-Air · France
            </span>
          </div>
        </div>
      </div>
    </MainSectionV2>
  );
}
