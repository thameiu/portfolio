"use client";
import { init } from 'next/dist/compiled/webpack/webpack';
import { useEffect } from 'react';

interface BackgroundAnimationProps {
  onReady?: () => void;
}

const BackgroundAnimation = ({ onReady }: BackgroundAnimationProps) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const timer = setTimeout(() => {
      const canvas = document.getElementById("topo-canvas") as HTMLCanvasElement | null;
      if (!canvas) {
        console.error("Canvas element not found");
        return;
      }

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.error("Cannot get 2d context");
        return;
      }

      const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.height = '100vh';
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      interface Shape {
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
        moveSpeedX: number;
        moveSpeedY: number;
        color: string;
        type: 'cube' | 'pyramid' | 'hexprism' | 'prism' | 'dodecahedron';
        lineStyle: 'solid' | 'dashed' | 'dotted' | 'dashdot';
        lineDash: number[];
      }

      const shapes: Shape[] = [];
      const isMobile = window.innerWidth < 768;
      const numShapes = isMobile ? 4 : 15;

      const colors = [
        '#C5EFFD',
        '#8DE1FD',
        '#59C3F0',
        '#44A5E3',
        '#334A52',
        '#E4E6E7',
      ];

      function getRandomShapeType(): 'cube' | 'pyramid' | 'hexprism' | 'prism' | 'dodecahedron' {
        const types: ('cube' | 'pyramid' | 'hexprism' | 'prism' | 'dodecahedron')[] = ['cube', 'pyramid', 'hexprism', 'prism', 'dodecahedron'];
        return types[Math.floor(Math.random() * types.length)];
      }

      function getRandomLineStyle(): 'solid' | 'dashed' | 'dotted' | 'dashdot' {
        const styles: ('solid' | 'dashed' | 'dotted' | 'dashdot')[] = ['solid', 'dashed', 'dotted', 'dashdot'];
        return styles[Math.floor(Math.random() * styles.length)];
      }

      function getLineDashPattern(style: 'solid' | 'dashed' | 'dotted' | 'dashdot'): number[] {
        switch(style) {
          case 'solid': return [];
          case 'dashed': return [10, 7];
          case 'dotted': return [2, 5];
          case 'dashdot': return [12, 5, 2, 5];
          default: return [];
        }
      }

      for (let i = 0; i < numShapes; i++) {
        const lineStyle = getRandomLineStyle();
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 500 + 100,
          size: Math.random() * 80 + 40,
          rotationX: Math.random() * Math.PI * 2,
          rotationY: Math.random() * Math.PI * 2,
          rotationZ: Math.random() * Math.PI * 2,
          rotationSpeedX: (Math.random() - 0.5) * 0.01,
          rotationSpeedY: (Math.random() - 0.5) * 0.01,
          rotationSpeedZ: (Math.random() - 0.5) * 0.01,
          moveSpeedX: (Math.random() - 0.5) * 0.6,
          moveSpeedY: (Math.random() - 0.5) * 0.6,
          color: colors[Math.floor(Math.random() * colors.length)],
          type: getRandomShapeType(),
          lineStyle: lineStyle,
          lineDash: getLineDashPattern(lineStyle)
        });
      }

      function applyRotation(point: {x: number, y: number, z: number}, cosX: number, sinX: number, cosY: number, sinY: number, cosZ: number, sinZ: number) {
        let { x, y, z } = point;
        let rotatedY = y * cosX - z * sinX;
        let rotatedZ = y * sinX + z * cosX;
        z = rotatedZ;
        let rotatedX = x * cosY + z * sinY;
        rotatedZ = -x * sinY + z * cosY;
        x = rotatedX;
        y = rotatedY;
        rotatedX = x * cosZ - y * sinZ;
        rotatedY = x * sinZ + y * cosZ;
        return { x: rotatedX, y: rotatedY };
      }

      function drawShape(shape: Shape, rawPoints: {x: number, y: number, z: number}[], faces: number[][]) {
        const projectedSize = shape.size * (800 / (800 + shape.z));
        const cosX = Math.cos(shape.rotationX);
        const sinX = Math.sin(shape.rotationX);
        const cosY = Math.cos(shape.rotationY);
        const sinY = Math.sin(shape.rotationY);
        const cosZ = Math.cos(shape.rotationZ);
        const sinZ = Math.sin(shape.rotationZ);

        const projectedPoints = rawPoints.map(point => {
          const rotated = applyRotation(point, cosX, sinX, cosY, sinY, cosZ, sinZ);
          return {
            x: shape.x + rotated.x * projectedSize,
            y: shape.y + rotated.y * projectedSize
          };
        });

        ctx.lineWidth = 1;
        faces.forEach(face => {
          ctx.beginPath();
          ctx.moveTo(projectedPoints[face[0]].x, projectedPoints[face[0]].y);
          for (let i = 1; i < face.length; i++) {
            ctx.lineTo(projectedPoints[face[i]].x, projectedPoints[face[i]].y);
          }
          ctx.closePath();

          const opacityValue = Math.max(10, Math.round(40 * (1 - shape.z / 700)));
          const opacity = opacityValue.toString(16).padStart(2, '0');
          ctx.fillStyle = `${shape.color}${opacity}`;
          ctx.strokeStyle = shape.color;
          ctx.setLineDash(shape.lineDash);
          ctx.fill();
          ctx.stroke();
          ctx.setLineDash([]);
        });
      }

      function drawCube(shape: Shape) {
        const points = [
          { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
          { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
          { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
          { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 }
        ];
        const faces = [
          [0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4],
          [2, 3, 7, 6], [0, 3, 7, 4], [1, 2, 6, 5]
        ];
        drawShape(shape, points, faces);
      }

      function drawPyramid(shape: Shape) {
        const points = [
          { x: -1, y: -0.5, z: -1 }, { x: 1, y: -0.5, z: -1 },
          { x: 1, y: -0.5, z: 1 }, { x: -1, y: -0.5, z: 1 },
          { x: 0, y: 1, z: 0 }
        ];
        const faces = [
          [0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]
        ];
        drawShape(shape, points, faces);
      }

      function drawPrism(shape: Shape) {
        const points = [
          { x: -1, y: -0.5, z: -1 }, { x: 1, y: -0.5, z: -1 },
          { x: 0, y: 0.5, z: -1 }, { x: -1, y: -0.5, z: 1 },
          { x: 1, y: -0.5, z: 1 }, { x: 0, y: 0.5, z: 1 }
        ];
        const faces = [
          [0, 1, 2], [3, 4, 5],
          [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]
        ];
        drawShape(shape, points, faces);
      }

      function drawHexPrism(shape: Shape) {
        // Flat hexagonal prism with low height (y scale = 0.35)
        const hexPoints: {x: number, y: number, z: number}[] = [];
        const halfH = 0.35;
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          hexPoints.push({ x: Math.cos(angle), y: -halfH, z: Math.sin(angle) });
        }
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          hexPoints.push({ x: Math.cos(angle), y: halfH, z: Math.sin(angle) });
        }
        // Bottom face [0..5], top face [6..11], 6 side quads
        const faces: number[][] = [
          [0, 1, 2, 3, 4, 5],
          [6, 7, 8, 9, 10, 11],
        ];
        for (let i = 0; i < 6; i++) {
          faces.push([i, (i + 1) % 6, ((i + 1) % 6) + 6, i + 6]);
        }
        drawShape(shape, hexPoints, faces);
      }

      function drawDodecahedron(shape: Shape) {
        // 20 vertices of a dodecahedron
        const phi = (1 + Math.sqrt(5)) / 2;
        const invPhi = 1 / phi;
        const scale = 0.7;

        const points: {x: number, y: number, z: number}[] = [
          // ±1, ±1, ±1
          { x:  1,  y:  1,  z:  1 }, { x:  1,  y:  1,  z: -1 },
          { x:  1,  y: -1,  z:  1 }, { x:  1,  y: -1,  z: -1 },
          { x: -1,  y:  1,  z:  1 }, { x: -1,  y:  1,  z: -1 },
          { x: -1,  y: -1,  z:  1 }, { x: -1,  y: -1,  z: -1 },
          // 0, ±1/φ, ±φ
          { x:  0,  y:  invPhi,  z:  phi }, { x:  0,  y:  invPhi,  z: -phi },
          { x:  0,  y: -invPhi,  z:  phi }, { x:  0,  y: -invPhi,  z: -phi },
          // ±1/φ, ±φ, 0
          { x:  invPhi,  y:  phi,  z:  0 }, { x:  invPhi,  y: -phi,  z:  0 },
          { x: -invPhi,  y:  phi,  z:  0 }, { x: -invPhi,  y: -phi,  z:  0 },
          // ±φ, 0, ±1/φ
          { x:  phi,  y:  0,  z:  invPhi }, { x:  phi,  y:  0,  z: -invPhi },
          { x: -phi,  y:  0,  z:  invPhi }, { x: -phi,  y:  0,  z: -invPhi },
        ].map(p => ({ x: p.x * scale, y: p.y * scale, z: p.z * scale }));

        // 12 pentagonal faces
        const faces: number[][] = [
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
        ];
        drawShape(shape, points, faces);
      }

      let scrollY = 0;
      let lastScrollY = 0;

      const handleScroll = () => {
        scrollY = window.scrollY;
      };

      window.addEventListener('scroll', handleScroll);

      let animationFrameId: number;

      function updateAndDrawShapes() {
        ctx.fillStyle = '#192231';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const scrollDelta = scrollY - lastScrollY;
        lastScrollY = scrollY;
        shapes.sort((a, b) => b.z - a.z);

        shapes.forEach(shape => {
          shape.rotationX += shape.rotationSpeedX;
          shape.rotationY += shape.rotationSpeedY;
          shape.rotationZ += shape.rotationSpeedZ;
          shape.x += shape.moveSpeedX;
          shape.y += shape.moveSpeedY;

          const parallaxFactor = -0.15 * (1 - shape.z / 600);
          shape.y += scrollDelta * parallaxFactor;

          if (shape.x < -shape.size) shape.x = canvas.width + shape.size;
          if (shape.x > canvas.width + shape.size) shape.x = -shape.size;
          if (shape.y < -shape.size) shape.y = canvas.height + shape.size;
          if (shape.y > canvas.height + shape.size) shape.y = -shape.size;

          if (shape.type === 'cube') drawCube(shape);
          else if (shape.type === 'pyramid') drawPyramid(shape);
          else if (shape.type === 'hexprism') drawHexPrism(shape);
          else if (shape.type === 'prism') drawPrism(shape);
          else if (shape.type === 'dodecahedron') drawDodecahedron(shape);
        });

        animationFrameId = requestAnimationFrame(updateAndDrawShapes);
      }

      updateAndDrawShapes();
      if (onReady) {
        requestAnimationFrame(() => {
          onReady();
        });
      }
      return () => {
        window.removeEventListener("resize", resizeCanvas);
        window.removeEventListener('scroll', handleScroll);
        cancelAnimationFrame(animationFrameId);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return <canvas id="topo-canvas" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, display: 'block' }}></canvas>;
};

export default BackgroundAnimation;