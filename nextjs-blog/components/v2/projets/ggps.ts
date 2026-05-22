import type { ProjectVisualStyle } from "./visual-style";

export const PROJECT_GGPS_VISUAL_STYLE: ProjectVisualStyle = {
  id: "ggps",
  cardPreviewIndex: 2,
  iconLayout: [
    { x: "8%", y: "3%", size: "min(20vw,260px)", rotation: -18 },
    { x: "44%", y: "0%", size: "min(20vw,260px)", rotation: 28 },
    { x: "74%", y: "18%", size: "min(20vw,260px)", rotation: -36 },
    { x: "18%", y: "58%", size: "min(20vw,260px)", rotation: 42 },
    { x: "58%", y: "64%", size: "min(20vw,260px)", rotation: -22 },
  ],
  cardBackdrop: { preset: "ggpsRings", opacity: 0.46 },
  modalBackdrop: { preset: "ggpsRings", opacity: 0.58 },
};
