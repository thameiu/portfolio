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
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const playedRef = useRef(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const chars = text.split("");
    const intervals: ReturnType<typeof setInterval>[] = [];
    const delayedCalls: gsap.core.Tween[] = [];
    const section = triggerRef.current;
    const title = titleRef.current;
    if (!section || !title) return;

    charRefs.current.forEach((span) => {
      if (!span) return;
      gsap.set(span, { opacity: 0, y: -18, color });
    });

    const runGlitch = () => {
      if (playedRef.current) return;
      playedRef.current = true;

      chars.forEach((targetChar, i) => {
        const span = charRefs.current[i];
        if (!span) return;
        if (targetChar === " ") {
          const spaceCall = gsap.delayedCall(i * 0.03 + 0.06, () => {
            span.textContent = "\u00A0";
            gsap.to(span, { y: 0, opacity: 1, duration: 0.2, ease: "power1.out" });
          });
          delayedCalls.push(spaceCall);
          return;
        }

        span.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        gsap.set(span, { opacity: 0.42, y: -16, color: "rgba(120,80,80,0.72)" });

        const delay = i * 95 + Math.random() * 55;
        const glitchDuration = 430 + Math.random() * 210;
        const iv = setInterval(() => {
          span.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
          gsap.to(span, {
            y: -16 + Math.random() * 8,
            duration: 0.06,
            overwrite: "auto",
            ease: "power1.out",
          });
        }, 75);
        intervals.push(iv);

        const settleCall = gsap.delayedCall((delay + glitchDuration) / 1000, () => {
          clearInterval(iv);
          span.textContent = targetChar;
          gsap.set(span, { color });
          gsap.to(span, {
            y: 0,
            opacity: 1,
            duration: 0.42,
            ease: "back.out(1.7)",
            overwrite: "auto",
          });

          // Occasional micro-glitch after settling (same spirit as main name)
          const microGlitch = setInterval(() => {
            if (Math.random() > 0.93) {
              const orig = span.textContent;
              span.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
              gsap.to(span, { y: -2, color: "rgba(120,80,80,0.9)", duration: 0.07, ease: "power1.out" });
              setTimeout(() => {
                span.textContent = orig;
                gsap.to(span, { y: 0, color, duration: 0.16, ease: "power1.out" });
              }, 60);
            }
          }, 2000);
          intervals.push(microGlitch);
        });
        delayedCalls.push(settleCall);
      });
    };

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    const st = ScrollTrigger.create({
      trigger: section,
      start: isMobile ? startMobile : startDesktop,
      once: true,
      onEnter: runGlitch,
    });

    if (st.progress > 0 || st.isActive) runGlitch();

    return () => {
      intervals.forEach(clearInterval);
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
      {text.split("").map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          ref={(el) => { charRefs.current[i] = el; }}
          className="v2-char"
          style={{ display: "inline-block", opacity: 0 }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </h2>
  );
}
