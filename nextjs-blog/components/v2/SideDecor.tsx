"use client";
import { useEffect, useRef } from "react";

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

/* ── math helpers ─────────────────────────────── */
function rotate([x,y,z]: V3, rx: number, ry: number): V3 {
  const x1 = x*Math.cos(ry) - z*Math.sin(ry);
  const z1 = x*Math.sin(ry) + z*Math.cos(ry);
  const y2 = y*Math.cos(rx) - z1*Math.sin(rx);
  const z2 = y*Math.sin(rx) + z1*Math.cos(rx);
  return [x1, y2, z2];
}
function project([x,y,z]: V3, fov = 4): [number,number] {
  const s = fov / (fov + z + 3);
  return [x*s, y*s];
}

/* ── shape definitions ────────────────────────── */
interface Shape {
  verts: V3[]; edges: Edge[];
  size: number;
  baseY: number;  // 0-1 fraction of viewport height
  baseX: number;  // 0-1 fraction of viewport width
  parallax: number;
  blur: number;
  alpha: number;
  color: string;
}

function drawOne(ctx: CanvasRenderingContext2D, shape: Shape, cx: number, cy: number, rx: number, ry: number) {
  const proj = shape.verts.map(v => project(rotate(v, rx, ry)));
  ctx.beginPath();
  for (const [a, b] of shape.edges) {
    const [ax, ay] = proj[a]; const [bx, by] = proj[b];
    ctx.moveTo(cx + ax * shape.size, cy + ay * shape.size);
    ctx.lineTo(cx + bx * shape.size, cy + by * shape.size);
  }
  ctx.stroke();
}

const SHAPES: Shape[] = [
  /* far left */
  { verts:CUBE_V,  edges:CUBE_E,  size:78, baseY:0.07, baseX:0.04, parallax:0.28, blur:0.0, alpha:0.88, color:'#881111' },
  { verts:TETRA_V, edges:TETRA_E, size:62, baseY:0.28, baseX:0.08, parallax:0.44, blur:0.8, alpha:0.62, color:'#AA2222' },
  { verts:DODEC_V, edges:DODEC_E, size:50, baseY:0.62, baseX:0.05, parallax:0.18, blur:2.0, alpha:0.48, color:'#661111' },
  { verts:TETRA_V, edges:TETRA_E, size:70, baseY:0.85, baseX:0.11, parallax:0.36, blur:0.0, alpha:0.72, color:'#CC3333' },
  /* left */
  { verts:CUBE_V,  edges:CUBE_E,  size:54, baseY:0.45, baseX:0.19, parallax:0.55, blur:1.0, alpha:0.54, color:'#881111' },
  { verts:DODEC_V, edges:DODEC_E, size:68, baseY:0.14, baseX:0.22, parallax:0.32, blur:0.0, alpha:0.76, color:'#AA1111' },
  /* center-left */
  { verts:TETRA_V, edges:TETRA_E, size:58, baseY:0.70, baseX:0.30, parallax:0.48, blur:0.4, alpha:0.62, color:'#CC3333' },
  { verts:CUBE_V,  edges:CUBE_E,  size:42, baseY:0.35, baseX:0.27, parallax:0.20, blur:2.3, alpha:0.44, color:'#661111' },
  /* center */
  { verts:DODEC_V, edges:DODEC_E, size:86, baseY:0.20, baseX:0.48, parallax:0.38, blur:0.0, alpha:0.82, color:'#881111' },
  { verts:TETRA_V, edges:TETRA_E, size:52, baseY:0.55, baseX:0.52, parallax:0.50, blur:1.3, alpha:0.50, color:'#AA2222' },
  { verts:CUBE_V,  edges:CUBE_E,  size:66, baseY:0.90, baseX:0.44, parallax:0.26, blur:0.0, alpha:0.70, color:'#CC3333' },
  /* center-right */
  { verts:CUBE_V,  edges:CUBE_E,  size:48, baseY:0.40, baseX:0.72, parallax:0.54, blur:0.9, alpha:0.54, color:'#661111' },
  { verts:DODEC_V, edges:DODEC_E, size:72, baseY:0.12, baseX:0.66, parallax:0.22, blur:0.0, alpha:0.78, color:'#881111' },
  { verts:TETRA_V, edges:TETRA_E, size:62, baseY:0.78, baseX:0.70, parallax:0.42, blur:0.4, alpha:0.66, color:'#AA2222' },
  /* right */
  { verts:CUBE_V,  edges:CUBE_E,  size:82, baseY:0.30, baseX:0.82, parallax:0.60, blur:0.0, alpha:0.76, color:'#881111' },
  { verts:TETRA_V, edges:TETRA_E, size:56, baseY:0.60, baseX:0.87, parallax:0.35, blur:1.7, alpha:0.47, color:'#CC3333' },
  /* far right */
  { verts:DODEC_V, edges:DODEC_E, size:72, baseY:0.15, baseX:0.94, parallax:0.46, blur:0.0, alpha:0.82, color:'#AA2222' },
  { verts:TETRA_V, edges:TETRA_E, size:62, baseY:0.75, baseX:0.91, parallax:0.30, blur:0.8, alpha:0.61, color:'#661111' },
];

/* ── component ───────────────────────────────── */
export default function SideDecor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W; canvas.height = H;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const activeShapes = isMobile
      ? SHAPES.filter((_, i) => i % 3 === 0 || i === 10 || i === 14)
      : SHAPES;

    let scrollY = window.scrollY;
    let smoothScrollY = scrollY;
    let rafId: number;

    const onScroll = () => { scrollY = window.scrollY; };
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    function draw() {
      smoothScrollY += (scrollY - smoothScrollY) * 0.08;
      ctx.clearRect(0, 0, W, H);

      activeShapes.forEach((shape, i) => {
        const baseYpx = shape.baseY * H;
        const offset  = -(smoothScrollY * shape.parallax) % H;
        let cy = ((baseYpx + offset) % H + H) % H;
        const cx = shape.baseX * W;

        const normalizedY = (cy / H) * 2 - 1;
        const normalizedX = shape.baseX * 2 - 1;
        const rx = normalizedY * 0.55 + Math.sin(shape.baseY * 9  + i) * 0.09;
        const ry = normalizedX * 0.48 + Math.sin(shape.baseX * 11 + i * 0.8) * 0.28;

        ctx.save();
        if (shape.blur > 0) ctx.filter = `blur(${shape.blur}px)`;
        ctx.globalAlpha = shape.alpha;
        ctx.strokeStyle = shape.color;
        const desktopLine = shape.blur > 2 ? 2.0 : (shape.blur > 0 ? 2.6 : 3.2);
        ctx.lineWidth = isMobile ? desktopLine * 0.8 : desktopLine;

        drawOne(ctx, shape, cx, cy, rx, ry);
        if (cy < shape.size + 30) drawOne(ctx, shape, cx, cy + H, rx, ry);
        if (cy > H - shape.size - 30) drawOne(ctx, shape, cx, cy - H, rx, ry);

        ctx.restore();
      });

      rafId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="side-decor-canvas"
      style={{ width: "100%", height: "100%" }}
    />
  );
}
