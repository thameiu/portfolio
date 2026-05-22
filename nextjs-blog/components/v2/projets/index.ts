import { PROJECT_2CLOCK_VISUAL_STYLE } from "./2clock";
import { PROJECT_GGPS_VISUAL_STYLE } from "./ggps";
import { PROJECT_GLPROJECT_VISUAL_STYLE } from "./glproject";
import { PROJECT_PATHFINDER_VISUAL_STYLE } from "./pathfinder";
import { PROJECT_RGBAST_VISUAL_STYLE } from "./rgbast";
import type { IconPos } from "./types";
import type { ProjectVisualStyle } from "./visual-style";

const DEFAULT_ICON_LAYOUT: IconPos[] = [
  { x: "8%", y: "6%", size: "min(44vw,540px)" },
  { x: "54%", y: "40%", size: "min(44vw,540px)" },
];

const PROJECT_VISUAL_STYLE_MAP: Record<string, ProjectVisualStyle> = {
  [PROJECT_RGBAST_VISUAL_STYLE.id]: PROJECT_RGBAST_VISUAL_STYLE,
  [PROJECT_2CLOCK_VISUAL_STYLE.id]: PROJECT_2CLOCK_VISUAL_STYLE,
  [PROJECT_PATHFINDER_VISUAL_STYLE.id]: PROJECT_PATHFINDER_VISUAL_STYLE,
  [PROJECT_GGPS_VISUAL_STYLE.id]: PROJECT_GGPS_VISUAL_STYLE,
  [PROJECT_GLPROJECT_VISUAL_STYLE.id]: PROJECT_GLPROJECT_VISUAL_STYLE,
};

export function getProjectVisualStyle(projectId: string): ProjectVisualStyle | null {
  return PROJECT_VISUAL_STYLE_MAP[projectId] ?? null;
}

export function getProjectIconLayout(projectId: string): IconPos[] {
  return getProjectVisualStyle(projectId)?.iconLayout ?? DEFAULT_ICON_LAYOUT;
}

export function getProjectCardPreviewIndex(projectId: string): number {
  return getProjectVisualStyle(projectId)?.cardPreviewIndex ?? 0;
}
