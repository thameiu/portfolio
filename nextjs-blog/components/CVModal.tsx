"use client";
import { useEffect } from "react";
import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { FaFileDownload, FaTimes } from "react-icons/fa";

const CV_FILE = "/CV_Mathieu_Hernandez.pdf";

interface CVModalProps {
  onClose: () => void;
}

const CVModal: React.FC<CVModalProps> = ({ onClose }) => {
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

  return (
    <div
      className="fixed inset-0 z-[1000] bg-black/92 backdrop-blur-sm flex flex-col items-center p-4 md:p-6 animate-fade-in"
      onClick={onClose}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between w-full max-w-4xl mb-4 flex-shrink-0"
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
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <div
          className="flex-1 w-full max-w-4xl cv-viewer"
          onClick={e => e.stopPropagation()}
        >
          <Viewer
            fileUrl={CV_FILE}
            defaultScale={SpecialZoomLevel.PageFit}
          />
        </div>
      </Worker>
    </div>
  );
};

export default CVModal;
