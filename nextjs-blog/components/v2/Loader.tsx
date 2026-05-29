"use client";
import Image from "next/image";
import { useEffect } from "react";

interface LoaderProps {
  isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    const unlockScroll = () => {
      const prevStyles = body.dataset.v2PrevStyles;
      const lockedY = body.dataset.v2LockedScrollY;

      if (prevStyles) {
        try {
          const parsed = JSON.parse(prevStyles) as {
            htmlOverflow: string;
            bodyOverflow: string;
            bodyPosition: string;
            bodyTop: string;
            bodyLeft: string;
            bodyRight: string;
            bodyWidth: string;
            bodyTouchAction: string;
          };
          html.style.overflow = parsed.htmlOverflow;
          body.style.overflow = parsed.bodyOverflow;
          body.style.position = parsed.bodyPosition;
          body.style.top = parsed.bodyTop;
          body.style.left = parsed.bodyLeft;
          body.style.right = parsed.bodyRight;
          body.style.width = parsed.bodyWidth;
          body.style.touchAction = parsed.bodyTouchAction;
        } catch {
          html.style.overflow = "";
          body.style.overflow = "";
          body.style.position = "";
          body.style.top = "";
          body.style.left = "";
          body.style.right = "";
          body.style.width = "";
          body.style.touchAction = "";
        }
      }

      if (lockedY) {
        const y = Number(lockedY);
        if (!Number.isNaN(y)) window.scrollTo(0, y);
      }

      delete body.dataset.v2PrevStyles;
      delete body.dataset.v2LockedScrollY;
    };

    if (isLoading) {
      html.classList.add("v2-loading");
      body.classList.add("v2-loading");

      const prevStyles = {
        htmlOverflow: html.style.overflow,
        bodyOverflow: body.style.overflow,
        bodyPosition: body.style.position,
        bodyTop: body.style.top,
        bodyLeft: body.style.left,
        bodyRight: body.style.right,
        bodyWidth: body.style.width,
        bodyTouchAction: body.style.touchAction,
      };
      const y = window.scrollY;
      body.dataset.v2PrevStyles = JSON.stringify(prevStyles);
      body.dataset.v2LockedScrollY = String(y);

      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
      body.style.position = "fixed";
      body.style.top = `-${y}px`;
      body.style.left = "0";
      body.style.right = "0";
      body.style.width = "100%";
      body.style.touchAction = "none";
    } else {
      html.classList.remove("v2-loading");
      body.classList.remove("v2-loading");
      unlockScroll();
    }
    return () => {
      html.classList.remove("v2-loading");
      body.classList.remove("v2-loading");
      unlockScroll();
    };
  }, [isLoading]);

  return (
    <div className={`fixed inset-0 bg-[#FFEFEF] z-[9999] flex items-center justify-center transition-opacity duration-700 ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="relative w-32 h-32 md:w-40 md:h-40 v2-loader-icon">
        <Image
          src="/pirate.svg"
          alt="Loading"
          fill
          sizes="(max-width: 767px) 8rem, 10rem"
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
