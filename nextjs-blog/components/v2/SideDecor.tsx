"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";

type V3 = [number, number, number];
type Edge = [number, number];

/* ── geometry ─────────────────────────────────── */
const CUBE_V: V3[] = [
  [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
  [-1,-1, 1],[1,-1, 1],[1,1, 1],[-1,1, 1],
];
const CUBE_E: Edge[] = [
  [0,1],[1,2],[2,3],[3,0],
  [4,5],[5,6],[6,7],[7,4],
  [0,4],[1,5],[2,6],[3,7],
];

/* Regular tetrahedron inscribed in a cube */
const TETRA_V: V3[] = [
  [ 1, 1, 1], [-1,-1, 1], [-1, 1,-1], [ 1,-1,-1],
];
const TETRA_E: Edge[] = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];

const φ = (1 + Math.sqrt(5)) / 2;
const DODEC_V: V3[] = [
  [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
  [-1,-1, 1],[1,-1, 1],[1,1, 1],[-1,1, 1],
  [0,-1/φ,-φ],[0,1/φ,-φ],[0,1/φ,φ],[0,-1/φ,φ],
  [-1/φ,-φ,0],[1/φ,-φ,0],[1/φ,φ,0],[-1/φ,φ,0],
  [-φ,0,-1/φ],[φ,0,-1/φ],[φ,0,1/φ],[-φ,0,1/φ],
];
const TARGET_D2 = 4 / (φ * φ);
const DODEC_E: Edge[] = (() => {
  const edges: Edge[] = [];
  for (let i = 0; i < 20; i++)
    for (let j = i + 1; j < 20; j++) {
      const [x1,y1,z1] = DODEC_V[i]; const [x2,y2,z2] = DODEC_V[j];
      if (Math.abs((x2-x1)**2+(y2-y1)**2+(z2-z1)**2 - TARGET_D2) < 0.05)
        edges.push([i, j]);
    }
  return edges;
})();

/* ── shape definitions ────────────────────────── */
interface Shape {
  verts: V3[]; edges: Edge[];
  size: number;
  baseY: number;  // 0-1 fraction of viewport height
  baseX: number;  // 0-1 fraction of viewport width
  parallax: number;
  alpha: number;
  color: string;
}

const TMP_X = new Float32Array(24);
const TMP_Y = new Float32Array(24);
const PROJ_FOV = 4;

function drawOne(ctx: CanvasRenderingContext2D, shape: Shape, cx: number, cy: number, rx: number, ry: number) {
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  for (let i = 0; i < shape.verts.length; i++) {
    const [x, y, z] = shape.verts[i];
    const x1 = x * cosY - z * sinY;
    const z1 = x * sinY + z * cosY;
    const y2 = y * cosX - z1 * sinX;
    const z2 = y * sinX + z1 * cosX;
    const s = PROJ_FOV / (PROJ_FOV + z2 + 3);
    TMP_X[i] = x1 * s;
    TMP_Y[i] = y2 * s;
  }
  ctx.beginPath();
  for (const [a, b] of shape.edges) {
    ctx.moveTo(cx + TMP_X[a] * shape.size, cy + TMP_Y[a] * shape.size);
    ctx.lineTo(cx + TMP_X[b] * shape.size, cy + TMP_Y[b] * shape.size);
  }
  ctx.stroke();
}

const SHAPES: Shape[] = [
  /* far left */
  { verts:CUBE_V,  edges:CUBE_E,  size:78, baseY:0.07, baseX:0.04, parallax:0.28, alpha:0.88, color:'#881111' },
  { verts:TETRA_V, edges:TETRA_E, size:62, baseY:0.28, baseX:0.08, parallax:0.44, alpha:0.62, color:'#AA2222' },
  { verts:DODEC_V, edges:DODEC_E, size:50, baseY:0.62, baseX:0.05, parallax:0.18, alpha:0.48, color:'#661111' },
  { verts:TETRA_V, edges:TETRA_E, size:70, baseY:0.85, baseX:0.11, parallax:0.36, alpha:0.72, color:'#CC3333' },
  /* left */
  { verts:CUBE_V,  edges:CUBE_E,  size:54, baseY:0.45, baseX:0.19, parallax:0.55, alpha:0.54, color:'#881111' },
  { verts:DODEC_V, edges:DODEC_E, size:68, baseY:0.14, baseX:0.22, parallax:0.32, alpha:0.76, color:'#AA1111' },
  /* center-left */
  { verts:TETRA_V, edges:TETRA_E, size:58, baseY:0.70, baseX:0.30, parallax:0.48, alpha:0.62, color:'#CC3333' },
  { verts:CUBE_V,  edges:CUBE_E,  size:42, baseY:0.35, baseX:0.27, parallax:0.20, alpha:0.44, color:'#661111' },
  /* center */
  { verts:DODEC_V, edges:DODEC_E, size:86, baseY:0.20, baseX:0.48, parallax:0.38, alpha:0.82, color:'#881111' },
  { verts:TETRA_V, edges:TETRA_E, size:52, baseY:0.55, baseX:0.52, parallax:0.50, alpha:0.50, color:'#AA2222' },
  { verts:CUBE_V,  edges:CUBE_E,  size:66, baseY:0.90, baseX:0.44, parallax:0.26, alpha:0.70, color:'#CC3333' },
  /* center-right */
  { verts:CUBE_V,  edges:CUBE_E,  size:48, baseY:0.40, baseX:0.72, parallax:0.54, alpha:0.54, color:'#661111' },
  { verts:DODEC_V, edges:DODEC_E, size:72, baseY:0.12, baseX:0.66, parallax:0.22, alpha:0.78, color:'#881111' },
  { verts:TETRA_V, edges:TETRA_E, size:62, baseY:0.78, baseX:0.70, parallax:0.42, alpha:0.66, color:'#AA2222' },
  /* right */
  { verts:CUBE_V,  edges:CUBE_E,  size:82, baseY:0.30, baseX:0.82, parallax:0.60, alpha:0.76, color:'#881111' },
  { verts:TETRA_V, edges:TETRA_E, size:56, baseY:0.60, baseX:0.87, parallax:0.35, alpha:0.47, color:'#CC3333' },
  /* far right */
  { verts:DODEC_V, edges:DODEC_E, size:72, baseY:0.15, baseX:0.94, parallax:0.46, alpha:0.82, color:'#AA2222' },
  { verts:TETRA_V, edges:TETRA_E, size:62, baseY:0.75, baseX:0.91, parallax:0.30, alpha:0.61, color:'#661111' },
];

/* ── component ───────────────────────────────── */
export default function SideDecor({ embedded = false }: { embedded?: boolean }) {
  const layerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    const syncCanvasSize = () => {
      const layer = layerRef.current;
      if (embedded && layer) {
        W = Math.max(1, Math.round(layer.clientWidth));
        H = Math.max(1, Math.round(layer.clientHeight));
      } else {
        W = window.innerWidth;
        H = window.innerHeight;
      }
      canvas.width = W;
      canvas.height = H;
    };
    syncCanvasSize();
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const renderScale = embedded ? (isMobile ? 0.46 : 0.62) : 1;
    const frameBudgetMs = embedded ? 1000 / 30 : 0;
    const activeShapes = embedded
      ? (
          isMobile
            ? SHAPES.filter((_, i) => i % 4 === 0 || i === 10 || i === 14)
            : SHAPES.filter((_, i) => i % 2 === 0 || i === 15 || i === 16)
        )
      : (
          isMobile
            ? SHAPES.filter((_, i) => i % 3 === 0 || i === 10 || i === 14)
            : SHAPES
        );
    const minShapeSize = activeShapes.reduce((min, shape) => Math.min(min, shape.size), Number.POSITIVE_INFINITY);
    const maxShapeSize = activeShapes.reduce((max, shape) => Math.max(max, shape.size), 0);
    const shapeSizeRange = Math.max(1, maxShapeSize - minShapeSize);

    let lastLayerOffset = Number.NaN;
    let lastDrawTs = 0;
    let lastMotionY = Number.NaN;
    let idleFrames = 0;
    let forceFrames = 3;
    let pageVisible = !document.hidden;
    let embeddedInView = !embedded;
    let embeddedClassVisible = !embedded;
    const getSmoother = () => (embedded ? null : ScrollSmoother.get());

    const canRenderNow = () => pageVisible && (!embedded || (embeddedInView && embeddedClassVisible));
    const syncEmbeddedClassVisible = () => {
      embeddedClassVisible = embedded ? document.body.classList.contains("v2-contact-shapes-visible") : true;
    };
    syncEmbeddedClassVisible();

    const syncLayerOffset = (scrollPos: number) => {
      if (!layerRef.current || embedded) return;
      const layerOffset = getSmoother() ? scrollPos : 0;
      const snappedOffset = Math.round(layerOffset * 1000) / 1000;
      if (Math.abs(snappedOffset - lastLayerOffset) > 0.1 || Number.isNaN(lastLayerOffset)) {
        layerRef.current.style.transform = `translate3d(0, ${snappedOffset}px, 0)`;
        lastLayerOffset = snappedOffset;
      }
    };
    const onResize = () => {
      syncCanvasSize();
      if (embedded) {
        const pixelW = Math.max(1, Math.round(W * renderScale));
        const pixelH = Math.max(1, Math.round(H * renderScale));
        canvas.width = pixelW;
        canvas.height = pixelH;
        ctx.setTransform(renderScale, 0, 0, renderScale, 0, 0);
      } else {
        canvas.width = W;
        canvas.height = H;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
      forceFrames = 4;
      idleFrames = 0;
    };
    const onVisibility = () => {
      pageVisible = !document.hidden;
      if (pageVisible) {
        forceFrames = 4;
        idleFrames = 0;
      }
    };

    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    const ro = (embedded && layerRef.current && typeof ResizeObserver !== "undefined")
      ? new ResizeObserver(() => syncCanvasSize())
      : null;
    if (ro && layerRef.current) ro.observe(layerRef.current);
    const io = (embedded && layerRef.current && typeof IntersectionObserver !== "undefined")
      ? new IntersectionObserver(
          (entries) => {
            const e = entries[0];
            if (!e) return;
            embeddedInView = e.isIntersecting;
            if (embeddedInView) {
              forceFrames = 4;
              idleFrames = 0;
            }
          },
          { threshold: 0.01 }
        )
      : null;
    if (io && layerRef.current) io.observe(layerRef.current);
    const mo = (embedded && typeof MutationObserver !== "undefined")
      ? new MutationObserver(() => {
          const before = embeddedClassVisible;
          syncEmbeddedClassVisible();
          if (embeddedClassVisible && !before) {
            forceFrames = 4;
            idleFrames = 0;
          }
        })
      : null;
    if (mo) mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });

    onResize();

    const drawFrame = (scrollPos: number, now: number) => {
      if (frameBudgetMs > 0 && lastDrawTs > 0 && now - lastDrawTs < frameBudgetMs) {
        return false;
      }
      lastDrawTs = now;
      ctx.clearRect(0, 0, W, H);

      const getRxForY = (shape: Shape, shapeIndex: number, y: number) => {
        const normalizedY = (y / H) * 2 - 1;
        return normalizedY * 0.55 + Math.sin(shape.baseY * 9 + shapeIndex) * 0.09;
      };

      activeShapes.forEach((shape, i) => {
        const baseYpx = shape.baseY * H;
        const motionSource = scrollPos;
        const offset  = -(motionSource * shape.parallax) % H;
        let cy = ((baseYpx + offset) % H + H) % H;
        const cx = shape.baseX * W;

        const normalizedX = shape.baseX * 2 - 1;
        const ry = normalizedX * 0.48 + Math.sin(shape.baseX * 11 + i * 0.8) * 0.28;
        const sizeNorm = (shape.size - minShapeSize) / shapeSizeRange;
        const depthAlpha = 0.25 + sizeNorm * 0.75;

        ctx.save();
        ctx.globalAlpha = shape.alpha * depthAlpha;
        ctx.strokeStyle = shape.color;
        const desktopLine = 1.8 + sizeNorm * 1.6;
        ctx.lineWidth = embedded
          ? (isMobile ? desktopLine * 0.62 : desktopLine * 0.72)
          : (isMobile ? desktopLine * 0.8 : desktopLine);

        drawOne(ctx, shape, cx, cy, getRxForY(shape, i, cy), ry);
        if (cy < shape.size + 30) {
          const wrappedCy = cy + H;
          drawOne(ctx, shape, cx, wrappedCy, getRxForY(shape, i, wrappedCy), ry);
        }
        if (cy > H - shape.size - 30) {
          const wrappedCy = cy - H;
          drawOne(ctx, shape, cx, wrappedCy, getRxForY(shape, i, wrappedCy), ry);
        }

        ctx.restore();
      });
      return true;
    };

    const tick = () => {
      if (!canRenderNow()) {
        return;
      }
      const smoother = getSmoother();
      const targetScrollY = smoother ? smoother.scrollTop() : window.scrollY;
      syncLayerOffset(targetScrollY);
      const delta = Number.isNaN(lastMotionY) ? Number.POSITIVE_INFINITY : Math.abs(targetScrollY - lastMotionY);
      lastMotionY = targetScrollY;
      if (delta > 0.01) {
        idleFrames = 0;
        forceFrames = 3;
      } else {
        idleFrames += 1;
      }
      const shouldDraw = forceFrames > 0 || delta > 0.01 || idleFrames < 2;
      if (!shouldDraw) return;
      const drew = drawFrame(targetScrollY, performance.now());
      if (drew && forceFrames > 0) forceFrames -= 1;
    };

    gsap.ticker.add(tick);
    tick();

    return () => {
      gsap.ticker.remove(tick);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      ro?.disconnect();
      io?.disconnect();
      mo?.disconnect();
      if (layerRef.current && !embedded) layerRef.current.style.transform = "translate3d(0, 0, 0)";
    };
  }, [embedded]);

  return (
    <div ref={layerRef} className={`side-decor-layer${embedded ? " embedded" : ""}`} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="side-decor-canvas"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
