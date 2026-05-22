import type { ProjectVisualStyle } from "./visual-style";

export const PROJECT_GLPROJECT_VISUAL_STYLE: ProjectVisualStyle = {
  id: "glproject",
  cardPreviewIndex: 0,
  iconLayout: [
    { x: "8%", y: "10%", size: "min(30vw,360px)", rotation: -14 },
    { x: "72%", y: "56%", size: "min(34vw,420px)", rotation: 15 },
  ],
  cardBackdrop: { preset: "glprojectGrid", opacity: 0.44 },
  modalBackdrop: { preset: "glprojectGrid", opacity: 0.3 },
};
