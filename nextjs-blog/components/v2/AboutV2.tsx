"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { IoLocationOutline } from "react-icons/io5";
import GlitchTitle from "./GlitchTitle";
import MainSectionV2 from "./MainSectionV2";
import RichText from "./RichText";
import type { PortfolioCopy } from "./i18n";
import frCopy from "./i18n/fr.json";

export default function AboutV2({
  copy = frCopy.about,
}: {
  copy?: PortfolioCopy["about"];
}) {
  const sectionRef  = useRef<HTMLElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const imgRef      = useRef<HTMLDivElement>(null);
  const [showCubeGif, setShowCubeGif] = useState(false);

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
        y: -24,
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
        text={copy.title}
        color="#881111"
        triggerRef={sectionRef}
        className="v2-mega-title mb-16"
        style={{ color: "#881111" }}
        startDesktop="top 84%"
        startMobile="top 95%"
      />

      {/* Content row */}
      <div ref={contentRef} className="flex flex-col lg:flex-row gap-7 md:gap-9 lg:gap-20 items-center lg:items-start opacity-0">
        {/* Photo */}
        <div
          ref={imgRef}
          className="relative flex-shrink-0 w-56 h-56 md:w-80 md:h-80 overflow-visible"
        >
          <button
            type="button"
            aria-label={showCubeGif ? copy.showPhoto : copy.showCube}
            onClick={() => setShowCubeGif((prev) => !prev)}
            style={{
              position: "relative",
              display: "block",
              width: "100%",
              height: "100%",
              padding: 0,
              border: "none",
              background: "transparent",
              lineHeight: 0,
              overflow: showCubeGif ? "visible" : "hidden",
              borderRadius: 4,
              boxShadow: showCubeGif
                ? "none"
                : "0 18px 34px rgba(136,17,17,0.22), 0 6px 14px rgba(136,17,17,0.14)",
              backgroundColor: showCubeGif ? "transparent" : "#f6e8ea",
              cursor: "pointer",
            }}
          >
            <Image
              src={showCubeGif ? "/me_but_cube.gif" : "/mathieu.png"}
              alt="Mathieu Hernandez"
              fill
              unoptimized={showCubeGif}
              sizes="(max-width: 767px) 14rem, (max-width: 1023px) 20rem, 22rem"
              // quality={100}
              className="w-full h-full"
              style={{
                objectFit: "contain",
                objectPosition: "center",
                display: "block",
                transform: showCubeGif ? "none" : "scale(1.01)",
                transformOrigin: "center",
              }}
              priority
            />
          </button>
        </div>

        {/* Text */}
        <div className="max-w-3xl space-y-6 lg:-mt-4" style={{ fontFamily: "'Sora', sans-serif" }}>
          {copy.paragraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="text-lg md:text-xl leading-relaxed"
              style={{ color: "#2D1010" }}
            >
              <RichText text={paragraph} />
            </p>
          ))}

          <div className="flex items-center gap-2.5 pt-2">
            <span
              aria-hidden="true"
              style={{
                color: "#881111",
                display: "inline-flex",
                alignItems: "center",
                fontSize: "0.95rem",
                lineHeight: 1,
              }}
            >
              <IoLocationOutline />
            </span>
            <span
              className="text-lg tracking-wider "
              style={{ color: "#881111", fontFamily: "'Sora', sans-serif" }}
            >
              {copy.location}
            </span>
          </div>
        </div>
      </div>
    </MainSectionV2>
  );
}
