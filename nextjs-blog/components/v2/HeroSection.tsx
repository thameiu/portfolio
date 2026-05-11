"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainSectionV2 from "./MainSectionV2";

const LINE1 = "MATHIEU";
const LINE2 = "HERNANDEZ";
const GLITCH = "#$%\\|{}[]<>@!?^*~0123456789+=;:.,";

/* negative margin-right tightens specific character pairs */
const KERN: Record<string, Record<number, string>> = {
  MATHIEU:   { 1: "-0.07em", 3: "-0.06em", 4: "-0.07em" },               // A→T, H→I, I→E
  HERNANDEZ: { 0: "-0.06em", 1: "-0.05em", 6: "-0.07em", 7: "-0.08em" }, // H→E, E→R, D→E, E→Z
};

function GlitchLine({ text, lineRef }: { text: string; lineRef: React.RefObject<(HTMLSpanElement | null)[]> }) {
  const kern = KERN[text] ?? {};
  return (
    <span className="block" style={{ whiteSpace: "nowrap", width: "max-content" }}>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          ref={el => { if (lineRef.current) lineRef.current[i] = el; }}
          className="v2-char"
          aria-hidden="false"
          style={kern[i] != null ? { marginRight: kern[i] } : undefined}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

export default function HeroSection() {
  const line1Refs = useRef<(HTMLSpanElement | null)[]>([]);
  const line2Refs = useRef<(HTMLSpanElement | null)[]>([]);
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const allSpans = [...(line1Refs.current), ...(line2Refs.current)];
    const allChars = Array.from(LINE1 + LINE2);
    const intervals: ReturnType<typeof setInterval>[] = [];

    // Init: set random glitch chars above the final baseline
    allSpans.forEach(span => {
      if (!span) return;
      span.textContent = GLITCH[Math.floor(Math.random() * GLITCH.length)];
      gsap.set(span, { y: -20, opacity: 0.45, color: "rgba(136,17,17,0.62)" });
    });

    // Slot-machine-like settle: each char glitches, then drops into place
    allChars.forEach((targetChar, i) => {
      const span = allSpans[i];
      if (!span) return;

      const delay = i * 130 + Math.random() * 95;
      const glitchDuration = 620 + Math.random() * 280;

      const iv = setInterval(() => {
        span.textContent = GLITCH[Math.floor(Math.random() * GLITCH.length)];
        gsap.to(span, {
          y: -20 + Math.random() * 10,
          duration: 0.06,
          overwrite: "auto",
          ease: "power1.out",
        });
      }, 85);
      intervals.push(iv);

      setTimeout(() => {
        clearInterval(iv);
        span.textContent = targetChar;
        gsap.set(span, { color: "#E14C4C" });
        gsap.to(span, {
          y: 0,
          opacity: 1,
          duration: 0.46,
          ease: "back.out(1.8)",
          overwrite: "auto",
          onComplete: () => {
            gsap.to(span, {
              color: "#881111",
              duration: 0.28,
              ease: "power2.out",
            });
          },
        });

        // Occasional micro-glitch after settling
        setTimeout(() => {
          const flash = setInterval(() => {
            if (Math.random() > 0.93) {
              const orig = span.textContent;
              span.textContent = GLITCH[Math.floor(Math.random() * GLITCH.length)];
              gsap.to(span, { y: -2, color: "#664d4d", duration: 0.07, ease: "power1.out" });
              setTimeout(() => {
                span.textContent = orig;
                gsap.to(span, { y: 0, color: "#881111", duration: 0.16, ease: "power1.out" });
              }, 60);
            }
          }, 2000);
          intervals.push(flash);
        }, 800);
      }, delay + glitchDuration);
    });

    // Subtitle + scroll hint appear
    if (subRef.current) {
      gsap.fromTo(subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: (allChars.length * 0.11) + 0.6, ease: "power2.out" }
      );
    }
    if (scrollHintRef.current) {
      gsap.fromTo(scrollHintRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, delay: (allChars.length * 0.11) + 1.2, ease: "power2.out" }
      );
    }

    // Scroll-based fade out + next section fade in
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current,
        { opacity: 1, y: 0 },
        {
          opacity: 0, y: -40,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "bottom 60%",
            end: "bottom 20%",
            scrub: 0.6,
          },
        }
      );
    }, containerRef);

    return () => {
      intervals.forEach(clearInterval);
      ctx.revert();
    };
  }, []);

  return (
    <MainSectionV2
      ref={containerRef}
      className="relative flex flex-col items-start justify-center min-h-screen w-full overflow-hidden select-none"
      style={{
        background: "transparent",
        paddingTop: "clamp(1.5rem, 4vh, 3rem)",
        overflowX: "visible",
      }}
    >
      <div ref={contentRef} className="relative z-20 flex flex-col items-start">
        {/* Name */}
        <h1
          ref={nameRef}
          className="relative z-10 font-black uppercase leading-[0.85]"
          style={{
            fontFamily: "'Mango Grotesque', 'archivo-black', sans-serif",
            fontSize: "clamp(6.1rem, 20.5vw, 26rem)",
            color: "#881111",
            whiteSpace: "nowrap",
            width: "max-content",
          }}
          aria-label={`${LINE1} ${LINE2}`}
        >
          <GlitchLine text={LINE1} lineRef={line1Refs as React.RefObject<(HTMLSpanElement | null)[]>} />
          <GlitchLine text={LINE2} lineRef={line2Refs as React.RefObject<(HTMLSpanElement | null)[]>} />
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="relative z-10 mt-8 text-base md:text-xl font-medium tracking-widest uppercase opacity-0"
          style={{ color: "#881111", fontFamily: "'Sora', sans-serif", letterSpacing: "0.25em" }}
        >
          Développeur Polyvalent
        </p>

        {/* Scroll hint
        <div
          ref={scrollHintRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 z-10"
        >
          <div className="w-px h-12 relative overflow-hidden" style={{ background: "rgba(136,17,17,0.2)" }}>
            <div
              className="absolute w-full"
              style={{ background: "#881111", height: "40%", top: "30%" }}
            />
          </div>
        </div>
        */}
      </div>
    </MainSectionV2>
  );
}
