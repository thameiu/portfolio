import type { ProjectVisualStyle } from "./visual-style";

export const PROJECT_PATHFINDER_VISUAL_STYLE: ProjectVisualStyle = {
  id: "pathfinder",
  cardPreviewIndex: 1,
  iconLayout: [{ x: "70%", y: "62%", size: "min(80vw,988px)" }],
  cardBackdrop: { preset: "pathfinderImage", opacity: 0.14 },
  modalBackdrop: { preset: "pathfinderImage", opacity: 0.17 },
};
