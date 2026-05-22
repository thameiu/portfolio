import type { IconPos } from "./types";

export type BackdropPreset = "none" | "rgbastDots" | "ggpsRings" | "pathfinderImage" | "glprojectGrid";

export interface BackdropConfig {
  preset: BackdropPreset;
  opacity: number;
}

export interface ProjectVisualStyle {
  id: string;
  cardPreviewIndex: number;
  iconLayout: IconPos[];
  cardBackdrop?: BackdropConfig;
  modalBackdrop?: BackdropConfig;
}
