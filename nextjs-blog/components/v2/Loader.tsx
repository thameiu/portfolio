"use client";
import Image from "next/image";
import { useEffect } from "react";

interface LoaderProps {
  isLoading: boolean;
}

export default function Loader({ isLoading }: LoaderProps) {
  useEffect(() => {
    const html = document.documentElement;
    if (isLoading) html.classList.add("v2-loading");
    else html.classList.remove("v2-loading");
    return () => html.classList.remove("v2-loading");
  }, [isLoading]);

  return (
    <div className={`fixed inset-0 bg-[#FFEFEF] z-[9999] flex items-center justify-center transition-opacity duration-700 ${isLoading ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
      <div className="relative w-32 h-32 md:w-40 md:h-40 v2-loader-icon">
        <Image
          src="/pirate.svg"
          alt="Loading"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}