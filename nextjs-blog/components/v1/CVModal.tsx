"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FaFileDownload, FaTimes } from "react-icons/fa";

const CV_FILE = "/CV_Mathieu_Hernandez.pdf";

interface CVModalProps {
  onClose: () => void;
}

const CVModal: React.FC<CVModalProps> = ({ onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleDownload = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const a = document.createElement("a");
    a.href = CV_FILE;
    a.download = CV_FILE.split("/").pop()!;
    a.click();
  };

  if (!mounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-sm flex flex-col items-center p-0 animate-fade-in"
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between w-full px-4 md:px-6 py-3 flex-shrink-0"
        onClick={e => e.stopPropagation()}
      >
        <span className="text-white font-semibold text-lg"></span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 bg-[var(--color-primary)] hover:bg-[var(--color-secondary)] text-white rounded-lg transition-colors text-sm font-medium"
          >
            <FaFileDownload />
            <span className="hidden sm:inline">Télécharger</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <FaTimes className="text-xl text-white" />
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div
        className="flex-1 w-full px-2 md:px-4 pb-3"
        onClick={e => e.stopPropagation()}
      >
        <iframe
          src={CV_FILE}
          title="CV Mathieu Hernandez"
          className="w-full h-full border-0 bg-transparent"
        />
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default CVModal;
