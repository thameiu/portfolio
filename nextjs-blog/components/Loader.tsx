"use client";
import Image from 'next/image';

interface LoaderProps {
  isLoading: boolean;
}

const Loader = ({ isLoading }: LoaderProps) => {
  return (
    <div className={`fixed inset-0 bg-[#192231] z-[9999] flex items-center justify-center transition-opacity duration-700 ${isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="relative w-32 h-32 md:w-40 md:h-40 animate-pulse">
        <Image
          src="/portfolio-logo-circle.png"
          alt="Loading"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export default Loader;