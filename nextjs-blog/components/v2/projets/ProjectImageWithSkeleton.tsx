"use client";

import { useEffect, useRef, useState } from "react";
import Image, { type ImageProps } from "next/image";

export type ProjectImageWithSkeletonProps = ImageProps & {
  skeletonColor?: string;
};

export default function ProjectImageWithSkeleton(
  props: ProjectImageWithSkeletonProps,
) {
  const { src } = props;
  const [loaded, setLoaded] = useState(false);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const isFill = Boolean(props.fill);
  const skeletonColor = props.skeletonColor;
  const resolvedSizes =
    props.sizes ??
    (isFill
      ? "(max-width: 767px) 100vw, (max-width: 1279px) 80vw, 60vw"
      : "100vw");
  const resolvedQuality = props.quality ?? 72;
  const resolvedLoading = props.priority
    ? undefined
    : (props.loading ?? "lazy");

  useEffect(() => {
    setLoaded(false);
    const rafId = requestAnimationFrame(() => {
      const img = wrapRef.current?.querySelector("img");
      if (img?.complete) setLoaded(true);
    });
    return () => cancelAnimationFrame(rafId);
  }, [src]);

  const markLoaded = () => setLoaded(true);

  return (
    <span
      ref={wrapRef}
      className="v2-image-skeleton-wrap"
      style={
        isFill
          ? { position: "absolute", inset: 0, display: "block" }
          : {
              position: "relative",
              display: "inline-block",
              lineHeight: 0,
              maxWidth: "100%",
            }
      }
    >
      <Image
        {...props}
        sizes={resolvedSizes}
        quality={resolvedQuality}
        loading={resolvedLoading}
        onLoad={(e) => {
          markLoaded();
          props.onLoad?.(e);
        }}
        onError={(e) => {
          markLoaded();
          props.onError?.(e);
        }}
        style={{
          ...(props.style ?? {}),
          opacity: loaded ? 1 : 0,
          transition: "opacity 260ms ease",
        }}
      />
      {!loaded ? (
        <span
          aria-hidden="true"
          className="v2-image-skeleton"
          style={
            skeletonColor
              ? {
                  ["--v2-skeleton-accent" as string]: skeletonColor,
                }
              : undefined
          }
        />
      ) : null}
    </span>
  );
}
