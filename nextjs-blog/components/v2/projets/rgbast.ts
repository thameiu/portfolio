import type { ProjectVisualStyle } from "./visual-style";

export const PROJECT_RGBAST_VISUAL_STYLE: ProjectVisualStyle = {
  id: "rgbast",
  cardPreviewIndex: 3,
  iconLayout: [
    { x: "8%", y: "6%", size: "min(44vw,540px)" },
    { x: "54%", y: "40%", size: "min(44vw,540px)" },
  ],
  cardBackdrop: { preset: "rgbastDots", opacity: 0.36 },
  modalBackdrop: { preset: "rgbastDots", opacity: 0.46 },
};
