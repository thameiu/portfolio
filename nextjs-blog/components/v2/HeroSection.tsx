"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MainSectionV2 from "./MainSectionV2";

const LINE1 = "MATHIEU";
const LINE2 = "HERNANDEZ";
const GLITCH_CHARS = [
  "#", "$", "%", "\\", "|", "{", "}", "[", "]", "<", ">", "@",
  "!", "?", "^", "*", "~", "+", "=", ";", ":", ".", ",",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "☺\uFE0E",
];

const randomGlitchChar = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
const randomGlitchText = (length: number) => Array.from({ length }, randomGlitchChar).join("");
const placeholderGlitchText = (text: string) =>
  text.split("").map((char) => (char === " " ? "\u00A0" : "#")).join("");

function GlitchLine({
  text,
  baseRef,
  overlayRef,
}: {
  text: string;
  baseRef: React.RefObject<HTMLSpanElement | null>;
  overlayRef: React.RefObject<HTMLSpanElement | null>;
}) {
  return (
    <span className="v2-glitch-line" style={{ whiteSpace: "nowrap", width: "max-content" }}>
      <span ref={baseRef} className="v2-glitch-base">
        {text}
      </span>
      <span ref={overlayRef} className="v2-glitch-overlay" aria-hidden="true">
        {placeholderGlitchText(text)}
      </span>
    </span>
  );
}

export default function HeroSection() {
  const line1BaseRef = useRef<HTMLSpanElement>(null);
  const line2BaseRef = useRef<HTMLSpanElement>(null);
  const line1OverlayRef = useRef<HTMLSpanElement>(null);
  const line2OverlayRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const startLift = isMobile ? 0 : -20;

    const delayedCalls: gsap.core.Tween[] = [];
    const revealStartStep = isMobile ? 0.105 : 0.13;
    const revealScrambleStep = isMobile ? 0.07 : 0.08;
    const scrambleCount = isMobile ? 3 : 4;
    let latestSettleAt = 0;

    const animateLine = (
      targetText: string,
      base: HTMLSpanElement | null,
      overlay: HTMLSpanElement | null,
      lineOffset = 0
    ) => {
      if (!base || !overlay) return;
      const chars = targetText.split("");
      let displayed = randomGlitchText(chars.length).split("");

      overlay.textContent = displayed.join("");
      gsap.set(base, { opacity: 0 });
      gsap.set(overlay, { y: startLift, opacity: 0.48, color: "rgba(136,17,17,0.62)" });

      chars.forEach((targetChar, i) => {
        const startAt = lineOffset + i * revealStartStep + Math.random() * 0.06;
        for (let step = 0; step < scrambleCount; step += 1) {
          const scrambleAt = startAt + step * revealScrambleStep;
          const scrambleCall = gsap.delayedCall(scrambleAt, () => {
            displayed[i] = randomGlitchChar();
            overlay.textContent = displayed.join("");
            gsap.set(overlay, {
              y: isMobile ? 0 : (-18 + Math.random() * 8),
              opacity: 0.46,
              color: "rgba(136,17,17,0.62)",
            });
          });
          delayedCalls.push(scrambleCall);
        }

        const settleAt = startAt + scrambleCount * revealScrambleStep;
        latestSettleAt = Math.max(latestSettleAt, settleAt);
        const settleCall = gsap.delayedCall(settleAt, () => {
          displayed[i] = targetChar;
          overlay.textContent = displayed.join("");
          gsap.to(overlay, {
            y: 0,
            opacity: 1,
            color: "#E14C4C",
            duration: 0.34,
            ease: "power1.out",
            overwrite: "auto",
          });
        });
        delayedCalls.push(settleCall);
      });

      const finishAt = lineOffset + chars.length * revealStartStep + scrambleCount * revealScrambleStep + 0.28;
      latestSettleAt = Math.max(latestSettleAt, finishAt);
      delayedCalls.push(gsap.delayedCall(finishAt, () => {
        gsap.set(base, { opacity: 1 });
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.34,
          ease: "power2.out",
          overwrite: "auto",
        });
      }));
    };

    animateLine(LINE1, line1BaseRef.current, line1OverlayRef.current, 0);
    animateLine(LINE2, line2BaseRef.current, line2OverlayRef.current, LINE1.length * revealStartStep * 0.35);

    // Subtitle + scroll hint appear
    const subtitleDelay = latestSettleAt + 0.55;
    if (subRef.current) {
      gsap.fromTo(subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: subtitleDelay, ease: "power2.out" }
      );
    }
    if (scrollHintRef.current) {
      gsap.fromTo(scrollHintRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6, delay: subtitleDelay + 0.6, ease: "power2.out" }
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
      delayedCalls.forEach((t) => t.kill());
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
          <GlitchLine text={LINE1} baseRef={line1BaseRef} overlayRef={line1OverlayRef} />
          <GlitchLine text={LINE2} baseRef={line2BaseRef} overlayRef={line2OverlayRef} />
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          className="relative z-10 mt-8 ml-1 text-[1rem] md:text-xl font-medium uppercase opacity-0 whitespace-nowrap"
          style={{ color: "#881111", fontFamily: "'Sora', sans-serif", letterSpacing: "0.25em" }}
        >
        ▪ Développeur Full-stack ▪
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
