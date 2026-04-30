"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

const COLOR_BY_SECTION: Record<string, string> = {
  "v2-about": "#881111",
  "v2-career": "#881111",
  "v2-project-rgbast": "#B410CC",
  "v2-project-2clock": "#FF4422",
  "v2-project-pathfinder": "#2A7A1A",
  "v2-project-ggps": "#980000",
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

    let thumbH = 70;
    const setY = gsap.quickSetter(thumb, "y", "px");
    const setBg = gsap.quickSetter(thumb, "backgroundColor");

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
      const doc = document.documentElement;
      const smoother = ScrollSmoother.get();
      const scrollY = smoother ? smoother.scrollTop() : window.scrollY;
      const maxScroll = Math.max(1, doc.scrollHeight - window.innerHeight);
      const progress = gsap.utils.clamp(0, 1, scrollY / maxScroll);

      const railH = getRailHeight();
      const travel = Math.max(0, railH - thumbH);
      setY(RAIL_TOP + travel * progress);

      const probeY = window.innerHeight * 0.5;
      let active = "v2-about";
      for (const el of sections) {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom >= probeY) {
          active = el.id;
          break;
        }
      }
      setBg(COLOR_BY_SECTION[active] ?? DEFAULT_COLOR);
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
