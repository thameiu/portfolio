"use client";

import type React from "react";
import ProjectImageWithSkeleton from "./ProjectImageWithSkeleton";
import type { ProjectStoryBlock } from "./types";

function renderAccentBold(text: string, accentColor: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  const output: React.ReactNode[] = [];

  for (let idx = 0; idx < parts.length; idx += 1) {
    const part = parts[idx];
    if (part.startsWith("**") && part.endsWith("**")) {
      const value = part.slice(2, -2);
      output.push(
        <strong
          key={`${value}-${idx}`}
          style={{ color: accentColor, fontWeight: 700 }}
        >
          {value}
        </strong>,
      );
      continue;
    }

    const withBreaks = part.split(/(<br\s*\/?>)/gi);
    for (let chunkIdx = 0; chunkIdx < withBreaks.length; chunkIdx += 1) {
      const chunk = withBreaks[chunkIdx];
      if (/^<br\s*\/?>$/i.test(chunk)) {
        output.push(<br key={`br-${idx}-${chunkIdx}`} />);
        continue;
      }

      const tokenRegex =
        /(\[([^\]]+)\]\((https?:\/\/[^\s)]+)\))|(https?:\/\/[^\s<]+)/gi;
      let lastIndex = 0;
      let hasLink = false;
      let match: RegExpExecArray | null = tokenRegex.exec(chunk);
      while (match) {
        hasLink = true;
        if (match.index > lastIndex) {
          output.push(
            <span key={`txt-${idx}-${chunkIdx}-${lastIndex}`}>
              {chunk.slice(lastIndex, match.index)}
            </span>,
          );
        }

        const markdownLabel = match[2];
        const markdownUrl = match[3];
        const rawUrl = match[4];
        const href = markdownUrl || rawUrl;
        const label = markdownLabel || rawUrl;

        if (href && label) {
          output.push(
            <a
              key={`lnk-${idx}-${chunkIdx}-${match.index}`}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: accentColor,
                textDecorationColor: accentColor,
                textDecorationThickness: "1px",
                textUnderlineOffset: "2px",
                fontWeight: 600,
              }}
            >
              {label}
            </a>,
          );
        }

        lastIndex = tokenRegex.lastIndex;
        match = tokenRegex.exec(chunk);
      }

      if (hasLink) {
        if (lastIndex < chunk.length) {
          output.push(
            <span key={`txt-${idx}-${chunkIdx}-tail`}>
              {chunk.slice(lastIndex)}
            </span>,
          );
        }
      } else {
        output.push(<span key={`txt-${idx}-${chunkIdx}`}>{chunk}</span>);
      }
    }
  }

  return output;
}

export default function StoryBlockView({
  block,
  accentColor,
  isDark,
}: {
  block: ProjectStoryBlock;
  accentColor: string;
  isDark: boolean;
}) {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const isPlanningImage = Boolean(
    block.image && /2clock[-_]planning\.png$/i.test(block.image),
  );
  const isClockImage = Boolean(
    block.image && /2clock-clock\.png$/i.test(block.image),
  );
  const isKpiDbImage = Boolean(
    block.image && /2clock-(kpi|db)\.png$/i.test(block.image),
  );
  const isSmallRgbastSplitImage = Boolean(
    block.image && /(rgbast-generation|rgbast-cube)\.png$/i.test(block.image),
  );
  const isRgbastOr2ClockStoryBlock = /^(rgbast|2clock)-story-/i.test(block.id);
  const isSmall2ClockSplitImage = isPlanningImage || isClockImage;
  const isPortraitStoryImage = Boolean(
    block.image &&
      /(rgbast-generation|rgbast-cube|2clock[-_]planning|2clock-clock)\.png$/i.test(
        block.image,
      ),
  );
  const imageAspectRatio = isPortraitStoryImage ? "5/6" : "16/10";
  const imageContainerClass = isSmall2ClockSplitImage || isSmallRgbastSplitImage
    ? "w-full md:w-1/2 md:mx-auto"
    : isKpiDbImage
      ? "w-full md:w-[60%] md:mx-auto"
      : "w-full";

  const textNode = block.text ? (
    <p
      className="text-sm md:text-[0.95rem] leading-relaxed"
      style={{
        color: textColor,
        fontFamily: "'Sora',sans-serif",
        whiteSpace: "pre-line",
        fontSize: "clamp(0.95rem, 0.34vw + 0.86rem, 1.3rem)",
      }}
    >
      {renderAccentBold(block.text, accentColor)}
    </p>
  ) : null;

  const imageNode = block.image ? (
    <div
      className={imageContainerClass}
      style={{
        position: "relative",
        aspectRatio: imageAspectRatio,
        overflow: "hidden",
        borderRadius: 8,
      }}
    >
      <ProjectImageWithSkeleton
        src={block.image}
        alt={block.imageAlt ?? "Story image"}
        fill
        sizes={
          isSmall2ClockSplitImage || isSmallRgbastSplitImage
            ? "(max-width: 767px) 100vw, 50vw"
            : isKpiDbImage
              ? "(max-width: 767px) 100vw, 60vw"
              : "(max-width: 767px) 100vw, 50vw"
        }
        quality={68}
        skeletonColor={accentColor}
        className="object-contain"
        draggable={false}
      />
    </div>
  ) : null;

  if (block.layout === "full-image") {
    return (
      <article className="flex flex-col gap-2">
        {imageNode}
        {block.caption ? (
          <p
            className="text-xs md:text-sm"
            style={{
              color: textColor,
              fontFamily: "'Sora',sans-serif",
              whiteSpace: "pre-line",
              fontSize: "clamp(0.82rem, 0.24vw + 0.76rem, 1.08rem)",
            }}
          >
            {renderAccentBold(block.caption, accentColor)}
          </p>
        ) : null}
      </article>
    );
  }

  if (block.layout === "split-left-image" || block.layout === "split-right-image") {
    const imageFirstDesktop = isPlanningImage;
    const imageFirstMobile = isRgbastOr2ClockStoryBlock;
    const splitColumnsClass = isPortraitStoryImage
      ? imageFirstDesktop
        ? "md:[grid-template-columns:minmax(0,0.3fr)_minmax(0,0.7fr)]"
        : "md:[grid-template-columns:minmax(0,0.7fr)_minmax(0,0.3fr)]"
      : "";

    return (
      <article
        className={`grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 ${
          isPortraitStoryImage ? "items-start md:items-center" : "items-start"
        } ${splitColumnsClass}`}
      >
        <div
          className={`${imageFirstMobile ? "order-2" : "order-1"} ${
            imageFirstDesktop ? "md:order-2" : "md:order-1"
          }`}
          style={{ textAlign: "left" }}
        >
          {block.title ? (
            <h4
              className="mb-2"
              style={{
                color: accentColor,
                fontFamily: "'Mango Grotesque','archivo-black',sans-serif",
                letterSpacing: "0.035em",
                fontWeight: 700,
                fontSize: "clamp(1.9rem, 0.95vw + 1.5rem, 2.65rem)",
                lineHeight: 1.05,
              }}
            >
              {renderAccentBold(block.title, accentColor)}
            </h4>
          ) : null}
          {textNode}
        </div>
        <div
          className={`${imageFirstMobile ? "order-1" : "order-2"} ${
            imageFirstDesktop ? "md:order-1" : "md:order-2"
          } md:self-center`}
        >
          {imageNode}
        </div>
      </article>
    );
  }

  return (
    <article>
      {block.title ? (
        <h4
          className="mb-2"
          style={{
            color: accentColor,
            fontFamily: "'Mango Grotesque','archivo-black',sans-serif",
            letterSpacing: "0.035em",
            fontWeight: 700,
            fontSize: "clamp(1.9rem, 0.95vw + 1.5rem, 2.65rem)",
            lineHeight: 1.05,
          }}
        >
          {renderAccentBold(block.title, accentColor)}
        </h4>
      ) : null}
      {textNode}
    </article>
  );
}
