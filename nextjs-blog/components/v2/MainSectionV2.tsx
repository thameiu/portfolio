"use client";

import React, { forwardRef, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type MainSectionV2Props = React.HTMLAttributes<HTMLElement>;

const MainSectionV2 = forwardRef<HTMLElement, MainSectionV2Props>(
  ({ className = "", children, ...rest }, ref) => {
    const localRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      gsap.registerPlugin(ScrollTrigger);
      const section = localRef.current;
      if (!section) return;

      const ctx = gsap.context(() => {
        gsap.fromTo(
          section,
          { opacity: 0.2, y: 28 },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: "top 58%",
              scrub: true,
            },
          }
        );

        gsap.fromTo(
          section,
          { opacity: 1, y: 0 },
          {
            opacity: 0.2,
            y: -18,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "bottom 50%",
              end: "bottom 10%",
              scrub: true,
            },
          }
        );
      }, section);

      return () => ctx.revert();
    }, []);

    const setRefs = (node: HTMLElement | null) => {
      localRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };

    const mergedClassName = ["v2-section-shell", "v2-main-section", className]
      .filter(Boolean)
      .join(" ");

    return (
      <section ref={setRefs} className={mergedClassName} {...rest}>
        {children}
      </section>
    );
  }
);

MainSectionV2.displayName = "MainSectionV2";

export default MainSectionV2;
