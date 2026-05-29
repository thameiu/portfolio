import type { CSSProperties } from "react";
import type { BackdropConfig } from "./visual-style";

function commonLayerStyle(opacity: number): CSSProperties {
  return {
    position: "absolute",
    inset: 0,
    zIndex: 0,
    pointerEvents: "none",
    opacity,
  };
}

export default function ProjectBackdropLayer({
  config,
  opacityMultiplier = 1,
}: {
  config?: BackdropConfig;
  opacityMultiplier?: number;
}) {
  if (!config || config.preset === "none") return null;

  const opacity = config.opacity * opacityMultiplier;

  if (config.preset === "rgbastDots") {
    return (
      <div
        aria-hidden="true"
        style={{
          ...commonLayerStyle(opacity),
          backgroundImage:
            "radial-gradient(circle, rgba(38,38,38,0.22) 1.2px, transparent 1.3px), radial-gradient(circle, rgba(38,38,38,0.14) 1px, transparent 1.1px)",
          backgroundSize: "20px 20px, 20px 20px",
          backgroundPosition: "0 0, 10px 10px",
        }}
      />
    );
  }

  if (config.preset === "ggpsRings") {
    return (
      <div
        aria-hidden="true"
        style={{
          ...commonLayerStyle(opacity),
          backgroundImage:
            "repeating-radial-gradient(140% 90% at -10% 100%, rgba(188,28,28,0.52) 0 1px, transparent 1px 12px), repeating-radial-gradient(140% 90% at -10% 100%, rgba(120,0,0,0.36) 0 1px, transparent 1px 24px)",
          backgroundPosition: "0 0, 0 6px",
        }}
      />
    );
  }

  if (config.preset === "pathfinderImage") {
    return (
      <div
        aria-hidden="true"
        style={{
          ...commonLayerStyle(opacity),
          backgroundImage: "url('/pathfinder/pathfinder-background.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center center",
          backgroundSize: "cover",
        }}
      />
    );
  }

  if (config.preset === "glprojectGrid") {
    return (
      <div
        aria-hidden="true"
        className="v2-glproject-perspective-grid"
        style={{ zIndex: 0, opacity }}
      />
    );
  }

  return null;
}
