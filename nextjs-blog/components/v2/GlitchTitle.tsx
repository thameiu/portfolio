"use client";
import { useEffect, useRef } from "react";
import type { CSSProperties, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GLITCH_CHARS = [
  "#", "$", "%", "\\", "|", "{", "}", "[", "]", "<", ">", "@",
  "!", "?", "^", "*", "~", "+", "=", ";", ":", ".", ",",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
  "☺\uFE0E",
];

const randomGlitchChar = () => GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
const randomGlitchText = (text: string) =>
  text.split("").map((char) => (char === " " ? "\u00A0" : randomGlitchChar())).join("");
const placeholderGlitchText = (text: string) =>
  text.split("").map((char) => (char === " " ? "\u00A0" : "#")).join("");

type GlitchTitleProps = {
  text: string;
  color: string;
  triggerRef: RefObject<HTMLElement>;
  className?: string;
  style?: CSSProperties;
  startDesktop?: string;
  startMobile?: string;
};

export default function GlitchTitle({
  text,
  color,
  triggerRef,
  className,
  style,
  startDesktop = "top 85%",
  startMobile = "top 92%",
}: GlitchTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const baseRef = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLSpanElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;

    const chars = text.split("");
    const delayedCalls: gsap.core.Tween[] = [];
    const section = triggerRef.current;
    const title = titleRef.current;
    const base = baseRef.current;
    const overlay = overlayRef.current;
    if (!section || !title || !base || !overlay) return;

    gsap.set(base, { opacity: 0 });
    gsap.set(overlay, { opacity: 0, y: -18, color });

    const runGlitch = () => {
      if (playedRef.current) return;
      playedRef.current = true;
      const scrambleCount = isMobile ? 3 : 4;
      const startStep = isMobile ? 0.108 : 0.125;
      const scrambleStep = isMobile ? 0.07 : 0.078;
      let displayed = randomGlitchText(text).split("");

      overlay.textContent = displayed.join("");
      gsap.set(overlay, { opacity: 0.42, y: -16, color: "rgba(120,80,80,0.72)" });

      chars.forEach((targetChar, i) => {
        if (targetChar === " ") {
          return;
        }

        const startAt = i * startStep + Math.random() * 0.06;
        for (let step = 0; step < scrambleCount; step += 1) {
          const scrambleAt = startAt + step * scrambleStep;
          const scrambleCall = gsap.delayedCall(scrambleAt, () => {
            displayed[i] = randomGlitchChar();
            overlay.textContent = displayed.join("");
            gsap.set(overlay, {
              y: isMobile ? 0 : (-16 + Math.random() * 8),
              opacity: 0.42,
              color: "rgba(120,80,80,0.72)",
            });
          });
          delayedCalls.push(scrambleCall);
        }

        const settleCall = gsap.delayedCall(startAt + scrambleCount * scrambleStep, () => {
          displayed[i] = targetChar;
          overlay.textContent = displayed.join("");
          gsap.to(overlay, {
            y: 0,
            opacity: 1,
            color,
            duration: 0.56,
            ease: "back.out(1.7)",
            overwrite: "auto",
          });
        });
        delayedCalls.push(settleCall);
      });

      const finishAt = chars.length * startStep + scrambleCount * scrambleStep + 0.3;
      delayedCalls.push(gsap.delayedCall(finishAt, () => {
        gsap.set(base, { opacity: 1 });
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.32,
          ease: "power2.out",
          overwrite: "auto",
        });
      }));
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: isMobile ? startMobile : startDesktop,
      once: true,
      onEnter: runGlitch,
    });

    if (st.progress > 0 || st.isActive) runGlitch();

    return () => {
      delayedCalls.forEach((t) => t.kill());
      st.kill();
    };
  }, [text, color, triggerRef, startDesktop, startMobile]);

  return (
    <h2
      ref={titleRef}
      className={className}
      style={style}
      aria-label={text}
    >
      <span ref={baseRef} className="v2-glitch-base">
        {text}
      </span>
      <span ref={overlayRef} className="v2-glitch-overlay" aria-hidden="true">
        {placeholderGlitchText(text)}
      </span>
    </h2>
  );
}
