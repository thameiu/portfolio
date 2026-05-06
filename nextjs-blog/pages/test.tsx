"use client";

import { useEffect, useMemo, useRef } from "react";

type ShapeType = "cube" | "pyramid" | "dodeca";
type Vec3 = { x: number; y: number; z: number };

const BANNER_W = 1584;
const BANNER_H = 396;
const MAIN_SHAPE_COUNT = 24;
const AROUND_SHAPE_COUNT = 20;

function createRng(seed = 20260506) {
  let s = seed >>> 0;
  return () => {
    s = (1664525 * s + 1013904223) >>> 0;
    return s / 0xffffffff;
  };
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function applyRotation(
  point: Vec3,
  cosX: number,
  sinX: number,
  cosY: number,
  sinY: number,
  cosZ: number,
  sinZ: number,
): Vec3 {
  let { x, y, z } = point;

  let ry = y * cosX - z * sinX;
  let rz = y * sinX + z * cosX;
  y = ry;
  z = rz;

  let rx = x * cosY + z * sinY;
  rz = -x * sinY + z * cosY;
  x = rx;
  z = rz;

  rx = x * cosZ - y * sinZ;
  ry = x * sinZ + y * cosZ;

  return { x: rx, y: ry, z };
}

const DODECA_POINTS: Vec3[] = (() => {
  const phi = (1 + Math.sqrt(5)) / 2;
  const invPhi = 1 / phi;
  const scale = 0.7;
  return [
    { x: 1, y: 1, z: 1 },
    { x: 1, y: 1, z: -1 },
    { x: 1, y: -1, z: 1 },
    { x: 1, y: -1, z: -1 },
    { x: -1, y: 1, z: 1 },
    { x: -1, y: 1, z: -1 },
    { x: -1, y: -1, z: 1 },
    { x: -1, y: -1, z: -1 },
    { x: 0, y: invPhi, z: phi },
    { x: 0, y: invPhi, z: -phi },
    { x: 0, y: -invPhi, z: phi },
    { x: 0, y: -invPhi, z: -phi },
    { x: invPhi, y: phi, z: 0 },
    { x: invPhi, y: -phi, z: 0 },
    { x: -invPhi, y: phi, z: 0 },
    { x: -invPhi, y: -phi, z: 0 },
    { x: phi, y: 0, z: invPhi },
    { x: phi, y: 0, z: -invPhi },
    { x: -phi, y: 0, z: invPhi },
    { x: -phi, y: 0, z: -invPhi },
  ].map((p) => ({ x: p.x * scale, y: p.y * scale, z: p.z * scale }));
})();

const MODELS: Record<ShapeType, { points: Vec3[]; faces: number[][] }> = {
  cube: {
    points: [
      { x: -1, y: -1, z: -1 },
      { x: 1, y: -1, z: -1 },
      { x: 1, y: 1, z: -1 },
      { x: -1, y: 1, z: -1 },
      { x: -1, y: -1, z: 1 },
      { x: 1, y: -1, z: 1 },
      { x: 1, y: 1, z: 1 },
      { x: -1, y: 1, z: 1 },
    ],
    faces: [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [0, 1, 5, 4],
      [2, 3, 7, 6],
      [0, 3, 7, 4],
      [1, 2, 6, 5],
    ],
  },
  pyramid: {
    points: [
      { x: -1, y: -0.5, z: -1 },
      { x: 1, y: -0.5, z: -1 },
      { x: 1, y: -0.5, z: 1 },
      { x: -1, y: -0.5, z: 1 },
      { x: 0, y: 1, z: 0 },
    ],
    faces: [
      [0, 1, 2, 3],
      [0, 1, 4],
      [1, 2, 4],
      [2, 3, 4],
      [3, 0, 4],
    ],
  },
  dodeca: {
    points: DODECA_POINTS,
    faces: [
      [0, 8, 10, 2, 16],
      [0, 16, 17, 1, 12],
      [0, 12, 14, 4, 8],
      [1, 17, 3, 11, 9],
      [1, 9, 5, 14, 12],
      [2, 10, 6, 15, 13],
      [2, 13, 3, 17, 16],
      [3, 13, 15, 7, 11],
      [4, 14, 5, 19, 18],
      [4, 18, 6, 10, 8],
      [5, 9, 11, 7, 19],
      [6, 18, 19, 7, 15],
    ],
  },
};

type ShapeState = {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  z: number;
  size: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  rotationSpeedX: number;
  rotationSpeedY: number;
  rotationSpeedZ: number;
  color: string;
  dark: boolean;
  transparent: boolean;
  lineDash: number[];
  opacity: number;
};

export default function TestBannerPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const shapes = useMemo<ShapeState[]>(() => {
    const rng = createRng();
    const rand = (min: number, max: number) => min + (max - min) * rng();

    const types: ShapeType[] = ["cube", "pyramid", "dodeca"];
    const pool: ShapeType[] = [];
    while (pool.length < MAIN_SHAPE_COUNT + AROUND_SHAPE_COUNT) {
      for (
        let i = 0;
        i < types.length && pool.length < MAIN_SHAPE_COUNT + AROUND_SHAPE_COUNT;
        i += 1
      ) {
        pool.push(types[i]);
      }
    }
    for (let i = pool.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rng() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }

    const dashStyles = [[], [10, 7], [2, 5], [12, 5, 2, 5]];
    const placed: Array<{ x: number; y: number; size: number }> = [];
    const mainPlaced: Array<{ x: number; y: number; size: number; t: number }> = [];
    const result: ShapeState[] = [];
    let previousSize = 8;
    const trayY = (t: number) => {
      const trend = BANNER_H * (0.84 - 0.7 * t);
      const wave = Math.sin(t * Math.PI * 3) * (54 - t * 12);
      return trend - wave;
    };

    const canPlace = (cx: number, cy: number, size: number, distScale = 0.72, gap = 10) => {
      for (let j = 0; j < placed.length; j += 1) {
        const p = placed[j];
        const minDistance = (size + p.size) * distScale + gap;
        if (Math.hypot(cx - p.x, cy - p.y) < minDistance) return false;
      }
      return true;
    };

    for (let i = 0; i < MAIN_SHAPE_COUNT; i += 1) {
      const t = i / (MAIN_SHAPE_COUNT - 1);
      const xCurve = Math.pow(t, 1.95);

      const rightBoost = 1 + Math.max(0, t - 0.58) * 2.9;
      const baseSize = (8 + Math.pow(t, 3.35) * 392) * rightBoost;
      const targetSize = clamp(baseSize + rand(-0.4, 8.2), 8, 486);
      const size = clamp(Math.max(previousSize + 4.2, targetSize), 8, 486);
      previousSize = size;

      let shapeSize = size;
      let x = BANNER_W / 2;
      let y = BANNER_H / 2;
      let placedOk = false;

      for (let attempt = 0; attempt < 320; attempt += 1) {
        if (attempt > 0 && attempt % 30 === 0) {
          shapeSize = Math.max(8, shapeSize * 0.94);
        }

        const jitterX = rand(-12, 12) * (1 - t * 0.82);
        const jitterY = rand(-13, 13) * (1 - t * 0.46);
        const xRaw = 26 + xCurve * (BANNER_W - 52) + jitterX;
        const yRaw = trayY(t) + jitterY;

        x = clamp(xRaw, shapeSize * 0.64, BANNER_W - shapeSize * 0.64);
        y = clamp(yRaw, shapeSize * 0.64, BANNER_H - shapeSize * 0.64);

        if (canPlace(x, y, shapeSize, 0.63, 7)) {
          placedOk = true;
          break;
        }
      }

      if (!placedOk) {
        const expectedX = 26 + Math.pow(t, 1.95) * (BANNER_W - 52);
        const expectedY = trayY(t);
        for (let attempt = 0; attempt < 380; attempt += 1) {
          const fallbackSize = Math.max(8, shapeSize * 0.9);
          const fx = clamp(
            expectedX + rand(-44, 44) * (1 - t * 0.55),
            fallbackSize * 0.64,
            BANNER_W - fallbackSize * 0.64,
          );
          const fy = clamp(
            expectedY + rand(-28, 28) * (1 - t * 0.35),
            fallbackSize * 0.64,
            BANNER_H - fallbackSize * 0.64,
          );
          if (canPlace(fx, fy, fallbackSize, 0.61, 6)) {
            x = fx;
            y = fy;
            shapeSize = fallbackSize;
            placedOk = true;
            break;
          }
        }
      }

      if (!placedOk) continue;

      placed.push({ x, y, size: shapeSize });
      mainPlaced.push({ x, y, size: shapeSize, t });

      const type = pool[i];
      const dark = rng() < 0.3;
      result.push({
        id: `shape-${i}`,
        type,
        x,
        y,
        z: rand(120, 560),
        size: shapeSize * 0.41,
        rotationX: rand(0, Math.PI * 2),
        rotationY: rand(0, Math.PI * 2),
        rotationZ: rand(0, Math.PI * 2),
        rotationSpeedX: rand(-0.007, 0.007),
        rotationSpeedY: rand(-0.007, 0.007),
        rotationSpeedZ: rand(-0.006, 0.006),
        color: dark ? "#D07171" : "#EEA2A2",
        dark,
        transparent: type !== "dodeca" && rng() < 0.45,
        lineDash: dashStyles[Math.floor(rng() * dashStyles.length)],
        opacity: rand(0.5, 0.95),
      });
    }

    for (let i = 0; i < mainPlaced.length - 1; i += 1) {
      const a = mainPlaced[i];
      const b = mainPlaced[i + 1];
      const mt = (a.t + b.t) * 0.5;
      if (mt < 0.38) continue;

      const connectorSize = Math.max(10, Math.min(a.size, b.size) * rand(0.28, 0.42));
      const cx = (a.x + b.x) * 0.5 + rand(-14, 14);
      const cy = (a.y + b.y) * 0.5 + rand(-14, 14);
      if (!canPlace(cx, cy, connectorSize, 0.58, 5)) continue;

      placed.push({ x: cx, y: cy, size: connectorSize });
      result.push({
        id: `link-${i}`,
        type: types[Math.floor(rng() * types.length)],
        x: cx,
        y: cy,
        z: rand(150, 520),
        size: connectorSize * 0.36,
        rotationX: rand(0, Math.PI * 2),
        rotationY: rand(0, Math.PI * 2),
        rotationZ: rand(0, Math.PI * 2),
        rotationSpeedX: rand(-0.006, 0.006),
        rotationSpeedY: rand(-0.006, 0.006),
        rotationSpeedZ: rand(-0.005, 0.005),
        color: rng() < 0.28 ? "#D07171" : "#EEA2A2",
        dark: rng() < 0.28,
        transparent: rng() < 0.62,
        lineDash: dashStyles[Math.floor(rng() * dashStyles.length)],
        opacity: rand(0.45, 0.8),
      });
    }

    for (let i = 0; i < AROUND_SHAPE_COUNT; i += 1) {
      const t = (i + 0.5) / AROUND_SHAPE_COUNT;
      const anchorX = 28 + Math.pow(t, 1.95) * (BANNER_W - 56);
      const anchorY = trayY(t);
      let tinySize = rand(13, 23) * (0.9 + t * 0.24);
      let x = BANNER_W / 2;
      let y = BANNER_H / 2;
      let placedOk = false;

      for (let attempt = 0; attempt < 220; attempt += 1) {
        if (attempt > 0 && attempt % 35 === 0) {
          tinySize = Math.max(10, tinySize * 0.94);
        }

        x = anchorX + rand(-56, 56);
        y = anchorY + (rng() < 0.5 ? -1 : 1) * rand(24, 70);
        x += rand(-14, 14);
        y += rand(-12, 12);

        x = clamp(x, tinySize * 0.65, BANNER_W - tinySize * 0.65);
        y = clamp(y, tinySize * 0.65, BANNER_H - tinySize * 0.65);

        if (canPlace(x, y, tinySize * 0.95, 0.66, 7)) {
          placedOk = true;
          break;
        }
      }

      if (!placedOk) continue;

      placed.push({ x, y, size: tinySize * 0.95 });
      result.push({
        id: `scatter-${i}`,
        type: pool[MAIN_SHAPE_COUNT + i],
        x,
        y,
        z: rand(140, 540),
        size: tinySize * 0.34,
        rotationX: rand(0, Math.PI * 2),
        rotationY: rand(0, Math.PI * 2),
        rotationZ: rand(0, Math.PI * 2),
        rotationSpeedX: rand(-0.006, 0.006),
        rotationSpeedY: rand(-0.006, 0.006),
        rotationSpeedZ: rand(-0.005, 0.005),
        color: rng() < 0.25 ? "#D07171" : "#EEA2A2",
        dark: rng() < 0.25,
        transparent: rng() < 0.58,
        lineDash: dashStyles[Math.floor(rng() * dashStyles.length)],
        opacity: rand(0.42, 0.8),
      });
    }

    return result;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderShapes = shapes.map((shape) => ({ ...shape }));
    let raf = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawOne = (shape: ShapeState) => {
      const model = MODELS[shape.type];
      const perspective = 860 / (860 + shape.z);
      const projectedSize = shape.size * perspective;

      const cosX = Math.cos(shape.rotationX);
      const sinX = Math.sin(shape.rotationX);
      const cosY = Math.cos(shape.rotationY);
      const sinY = Math.sin(shape.rotationY);
      const cosZ = Math.cos(shape.rotationZ);
      const sinZ = Math.sin(shape.rotationZ);

      const projected = model.points.map((p) => {
        const r = applyRotation(p, cosX, sinX, cosY, sinY, cosZ, sinZ);
        return {
          x: shape.x + r.x * projectedSize,
          y: shape.y + r.y * projectedSize,
          z: r.z,
        };
      });

      const sortedFaces = model.faces
        .map((face) => {
          let zAvg = 0;
          for (let i = 0; i < face.length; i += 1) zAvg += projected[face[i]].z;
          zAvg /= face.length;
          return { face, zAvg };
        })
        .sort((a, b) => a.zAvg - b.zAvg);

      ctx.strokeStyle = shape.color;
      ctx.lineWidth = shape.dark ? 1.35 : 1.15;
      ctx.setLineDash(shape.lineDash);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      for (let i = 0; i < sortedFaces.length; i += 1) {
        const face = sortedFaces[i].face;
        ctx.beginPath();
        ctx.moveTo(projected[face[0]].x, projected[face[0]].y);
        for (let j = 1; j < face.length; j += 1) {
          ctx.lineTo(projected[face[j]].x, projected[face[j]].y);
        }
        ctx.closePath();

        const alpha = shape.transparent ? 0.03 : 0.07;
        ctx.fillStyle = shape.dark
          ? `rgba(208, 113, 113, ${alpha * shape.opacity})`
          : `rgba(238, 162, 162, ${alpha * shape.opacity})`;
        ctx.fill();
        ctx.stroke();
      }

      ctx.setLineDash([]);
    };

    const draw = () => {
      ctx.clearRect(0, 0, BANNER_W, BANNER_H);

      renderShapes.sort((a, b) => b.z - a.z);
      for (let i = 0; i < renderShapes.length; i += 1) {
        const shape = renderShapes[i];
        shape.rotationX += shape.rotationSpeedX;
        shape.rotationY += shape.rotationSpeedY;
        shape.rotationZ += shape.rotationSpeedZ;
        drawOne(shape);
      }

      raf = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = window.requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(raf);
    };
  }, [shapes]);

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#000000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 0,
      }}
    >
      <div
        aria-label="Banner test with faux 3D wire shapes"
        style={{
          width: "min(1584px, 100vw)",
          height: "396px",
          background: "#FFEFEF",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
          width={BANNER_W}
          height={BANNER_H}
        />
      </div>
    </main>
  );
}
