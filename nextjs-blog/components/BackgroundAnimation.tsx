"use client";
import { useEffect } from 'react';

interface BackgroundAnimationProps {
  onReady?: () => void;
}

const BackgroundAnimation = ({ onReady }: BackgroundAnimationProps) => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Wait for DOM to be ready
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
        type: 'cube' | 'pyramid' | 'diamond' | 'prism';
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

      function getRandomShapeType(): 'cube' | 'pyramid' | 'diamond' | 'prism' {
        const types: ('cube' | 'pyramid' | 'diamond' | 'prism')[] = ['cube', 'pyramid', 'diamond', 'prism'];
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

      function drawCube(shape: Shape) {
        const projectedSize = shape.size * (800 / (800 + shape.z));
        const cosX = Math.cos(shape.rotationX);
        const sinX = Math.sin(shape.rotationX);
        const cosY = Math.cos(shape.rotationY);
        const sinY = Math.sin(shape.rotationY);
        const cosZ = Math.cos(shape.rotationZ);
        const sinZ = Math.sin(shape.rotationZ);

        const points = [
          { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
          { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
          { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
          { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 }
        ];

        const projectedPoints = points.map(point => {
          let y = point.y;
          let z = point.z;
          let rotatedY = y * cosX - z * sinX;
          let rotatedZ = y * sinX + z * cosX;
          let x = point.x;
          z = rotatedZ;
          let rotatedX = x * cosY + z * sinY;
          rotatedZ = -x * sinY + z * cosY;
          x = rotatedX;
          y = rotatedY;
          rotatedX = x * cosZ - y * sinZ;
          rotatedY = x * sinZ + y * cosZ;

          return {
            x: shape.x + rotatedX * projectedSize,
            y: shape.y + rotatedY * projectedSize
          };
        });

        const faces = [
          [0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4],
          [2, 3, 7, 6], [0, 3, 7, 4], [1, 2, 6, 5]
        ];

        ctx.lineWidth = 1;
        faces.forEach((face) => {
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

      function drawPyramid(shape: Shape) {
        const projectedSize = shape.size * (800 / (800 + shape.z));
        const cosX = Math.cos(shape.rotationX);
        const sinX = Math.sin(shape.rotationX);
        const cosY = Math.cos(shape.rotationY);
        const sinY = Math.sin(shape.rotationY);
        const cosZ = Math.cos(shape.rotationZ);
        const sinZ = Math.sin(shape.rotationZ);

        const points = [
          { x: -1, y: -0.5, z: -1 }, { x: 1, y: -0.5, z: -1 },
          { x: 1, y: -0.5, z: 1 }, { x: -1, y: -0.5, z: 1 },
          { x: 0, y: 1, z: 0 }
        ];

        const projectedPoints = points.map(point => {
          let y = point.y;
          let z = point.z;
          let rotatedY = y * cosX - z * sinX;
          let rotatedZ = y * sinX + z * cosX;
          let x = point.x;
          z = rotatedZ;
          let rotatedX = x * cosY + z * sinY;
          rotatedZ = -x * sinY + z * cosY;
          x = rotatedX;
          y = rotatedY;
          rotatedX = x * cosZ - y * sinZ;
          rotatedY = x * sinZ + y * cosZ;

          return {
            x: shape.x + rotatedX * projectedSize,
            y: shape.y + rotatedY * projectedSize
          };
        });

        const faces = [
          [0, 1, 2, 3], [0, 1, 4], [1, 2, 4], [2, 3, 4], [3, 0, 4]
        ];

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

      function drawDiamond(shape: Shape) {
        const projectedSize = shape.size * (800 / (800 + shape.z));
        const cosX = Math.cos(shape.rotationX);
        const sinX = Math.sin(shape.rotationX);
        const cosY = Math.cos(shape.rotationY);
        const sinY = Math.sin(shape.rotationY);
        const cosZ = Math.cos(shape.rotationZ);
        const sinZ = Math.sin(shape.rotationZ);

        const points = [
          { x: 0, y: 0, z: -1.5 }, { x: -1, y: 0, z: 0 },
          { x: 0, y: 1, z: 0 }, { x: 1, y: 0, z: 0 },
          { x: 0, y: -1, z: 0 }, { x: 0, y: 0, z: 1.5 }
        ];

        const projectedPoints = points.map(point => {
          let y = point.y;
          let z = point.z;
          let rotatedY = y * cosX - z * sinX;
          let rotatedZ = y * sinX + z * cosX;
          let x = point.x;
          z = rotatedZ;
          let rotatedX = x * cosY + z * sinY;
          rotatedZ = -x * sinY + z * cosY;
          x = rotatedX;
          y = rotatedY;
          rotatedX = x * cosZ - y * sinZ;
          rotatedY = x * sinZ + y * cosZ;

          return {
            x: shape.x + rotatedX * projectedSize,
            y: shape.y + rotatedY * projectedSize
          };
        });

        const faces = [
          [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
          [5, 1, 2], [5, 2, 3], [5, 3, 4], [5, 4, 1]
        ];

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

      function drawPrism(shape: Shape) {
        const projectedSize = shape.size * (800 / (800 + shape.z));
        const cosX = Math.cos(shape.rotationX);
        const sinX = Math.sin(shape.rotationX);
        const cosY = Math.cos(shape.rotationY);
        const sinY = Math.sin(shape.rotationY);
        const cosZ = Math.cos(shape.rotationZ);
        const sinZ = Math.sin(shape.rotationZ);

        const points = [
          { x: -1, y: -0.5, z: -1 }, { x: 1, y: -0.5, z: -1 },
          { x: 0, y: 0.5, z: -1 }, { x: -1, y: -0.5, z: 1 },
          { x: 1, y: -0.5, z: 1 }, { x: 0, y: 0.5, z: 1 }
        ];

        const projectedPoints = points.map(point => {
          let y = point.y;
          let z = point.z;
          let rotatedY = y * cosX - z * sinX;
          let rotatedZ = y * sinX + z * cosX;
          let x = point.x;
          z = rotatedZ;
          let rotatedX = x * cosY + z * sinY;
          rotatedZ = -x * sinY + z * cosY;
          x = rotatedX;
          y = rotatedY;
          rotatedX = x * cosZ - y * sinZ;
          rotatedY = x * sinZ + y * cosZ;

          return {
            x: shape.x + rotatedX * projectedSize,
            y: shape.y + rotatedY * projectedSize
          };
        });

        const faces = [
          [0, 1, 2], [3, 4, 5],
          [0, 1, 4, 3], [1, 2, 5, 4], [2, 0, 3, 5]
        ];

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

      let scrollY = 0;
      let lastScrollY = 0;

      const handleScroll = () => {
        scrollY = window.scrollY;
      };

      window.addEventListener('scroll', handleScroll);

      let animationFrameId: number;

      function updateAndDrawShapes() {
        // Clear with background color
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
          else if (shape.type === 'diamond') drawDiamond(shape);
          else if (shape.type === 'prism') drawPrism(shape);
        });

        animationFrameId = requestAnimationFrame(updateAndDrawShapes);
      }

      updateAndDrawShapes();

      // Signal that background is ready after first frame
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
  }, [onReady]);

  return <canvas id="topo-canvas" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: -1, display: 'block' }}></canvas>;
};

export default BackgroundAnimation;