export type IconType = "circles" | "clock" | "satellite" | "controller" | "cubegrid";

export interface IconPos {
  x: string;
  y: string;
  size: string;
  rotation?: number;
}

export type ProjectStoryLayout =
  | "text"
  | "split-left-image"
  | "split-right-image"
  | "full-image";

export interface ProjectStoryBlock {
  id: string;
  layout: ProjectStoryLayout;
  title?: string;
  text?: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  fullTitle?: string;
  titleSvg?: string;
  description: string;
  details: string;
  techStack: string[];
  bgColor: string;
  accentColor: string;
  isDark: boolean;
  iconType: IconType;
  screenshots?: string[];
  link?: string;
  linkText?: string;
  story?: ProjectStoryBlock[];
}
