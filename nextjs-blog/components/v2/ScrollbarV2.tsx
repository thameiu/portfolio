"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const COLOR_BY_SECTION: Record<string, string> = {
  "v2-about": "#881111",
  "v2-career": "#881111",
  "v2-projects": "#881111",
  "v2-contact": "#DD3A3A",
};

const DEFAULT_COLOR = "#881111";
const RAIL_TOP = 14;
const RAIL_BOTTOM = 14;

export default function ScrollbarV2() {
  const thumbRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const dragOffsetRef = useRef(0);
  const [hideOnMobile, setHideOnMobile] = useState(false);

  const sectionIds = useMemo(() => Object.keys(COLOR_BY_SECTION), []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px), (pointer: coarse)");
    const sync = () => setHideOnMobile(mq.matches);
    sync();
    if (mq.addEventListener) {
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }
    mq.addListener(sync);
    return () => mq.removeListener(sync);
  }, []);

  useEffect(() => {
    if (hideOnMobile) return;
    gsap.registerPlugin(ScrollSmoother);

    const thumb = thumbRef.current;
    if (!thumb) return;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    let activeSectionId = "v2-about";
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSectionId = (entry.target as HTMLElement).id;
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0.01 }
    );
    sections.forEach((el) => sectionObserver.observe(el));

    let thumbH = 70;
    const setY = gsap.quickSetter(thumb, "y", "px");
    const setBg = gsap.quickSetter(thumb, "backgroundColor");
    let lastProgress = -1;
    let lastColor = "";

    const getMaxScroll = () =>
      Math.max(1, document.documentElement.scrollHeight - window.innerHeight);

    const getRailHeight = () =>
      Math.max(0, window.innerHeight - RAIL_TOP - RAIL_BOTTOM);

    const yToScroll = (thumbY: number) => {
      const railH = getRailHeight();
      const travel = Math.max(1, railH - thumbH);
      const clampedY = gsap.utils.clamp(RAIL_TOP, RAIL_TOP + travel, thumbY);
      const progress = (clampedY - RAIL_TOP) / travel;
      return progress * getMaxScroll();
    };

    const scrollTo = (y: number) => {
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.scrollTop(y);
      else window.scrollTo(0, y);
    };

    const updateGeometry = () => {
      const doc = document.documentElement;
      const railH = Math.max(0, window.innerHeight - RAIL_TOP - RAIL_BOTTOM);
      thumbH = Math.max(46, Math.min(96, railH * (window.innerHeight / doc.scrollHeight)));
      gsap.set(thumb, { height: thumbH });
    };

    const update = () => {
      if (document.hidden) return;
      const doc = document.documentElement;
      const smoother = ScrollSmoother.get();
      const scrollY = smoother ? smoother.scrollTop() : window.scrollY;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = gsap.utils.clamp(0, 1, scrollY / maxScroll);

      const railH = getRailHeight();
      const travel = Math.max(0, railH - thumbH);
      if (Math.abs(progress - lastProgress) > 0.0004 || draggingRef.current) {
        setY(RAIL_TOP + travel * progress);
        lastProgress = progress;
      }

      const openProjectColor = document.body.style.getPropertyValue("--v2-project-open-color").trim();
      const isProjectOpen = document.body.classList.contains("v2-project-open-card");
      const nextColor = isProjectOpen && openProjectColor
        ? openProjectColor
        : (COLOR_BY_SECTION[activeSectionId] ?? DEFAULT_COLOR);
      if (nextColor !== lastColor) {
        setBg(nextColor);
        lastColor = nextColor;
      }
    };

    const onThumbPointerDown = (e: PointerEvent) => {
      draggingRef.current = true;
      thumb.setPointerCapture(e.pointerId);
      const matrix = window.getComputedStyle(thumb).transform;
      const currentY = matrix && matrix !== "none"
        ? new DOMMatrixReadOnly(matrix).m42
        : RAIL_TOP;
      dragOffsetRef.current = e.clientY - currentY;
      thumb.style.cursor = "grabbing";
      e.preventDefault();
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;
      const nextY = e.clientY - dragOffsetRef.current;
      const nextScroll = yToScroll(nextY);
      scrollTo(nextScroll);
    };

    const stopDrag = (e?: PointerEvent) => {
      if (!draggingRef.current) return;
      draggingRef.current = false;
      thumb.style.cursor = "grab";
      if (e) thumb.releasePointerCapture(e.pointerId);
    };

    updateGeometry();
    update();

    gsap.ticker.add(update);
    thumb.addEventListener("pointerdown", onThumbPointerDown);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerup", stopDrag);
    window.addEventListener("pointercancel", stopDrag);
    window.addEventListener("resize", updateGeometry);
    window.addEventListener("resize", update);

    return () => {
      gsap.ticker.remove(update);
      thumb.removeEventListener("pointerdown", onThumbPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", stopDrag);
      window.removeEventListener("pointercancel", stopDrag);
      window.removeEventListener("resize", updateGeometry);
      window.removeEventListener("resize", update);
      sectionObserver.disconnect();
    };
  }, [hideOnMobile, sectionIds]);

  if (hideOnMobile) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed right-[10px] top-0 bottom-0 z-[120] pointer-events-none"
    >
      <div
        ref={thumbRef}
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "10px",
          height: "70px",
          borderRadius: "999px",
          background: DEFAULT_COLOR,
          transform: "translate3d(0, 0, 0)",
          willChange: "transform, background-color, height",
          transition: "background-color 220ms ease",
          pointerEvents: "auto",
          cursor: "grab",
          touchAction: "none",
        }}
      />
    </div>
  );
}
