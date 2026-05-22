import type { ProjectVisualStyle } from "./visual-style";

export const PROJECT_PATHFINDER_VISUAL_STYLE: ProjectVisualStyle = {
  id: "pathfinder",
  cardPreviewIndex: 1,
  iconLayout: [{ x: "70%", y: "62%", size: "min(62vw,760px)" }],
  cardBackdrop: { preset: "pathfinderImage", opacity: 0.2 },
  modalBackdrop: { preset: "pathfinderImage", opacity: 0.24 },
};
