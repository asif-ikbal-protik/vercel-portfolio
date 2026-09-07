import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface CanvasRevealProps {
  /** Drives the dot animation only while true. */
  active: boolean;
  /** rgb triplets the dots are picked from. */
  colors?: number[][];
  /** Pixel pitch of the dot matrix. */
  dotSize?: number;
  /** How fast dots pop in. */
  speed?: number;
  className?: string;
  /** Fade the matrix out toward the bottom of the card. */
  fade?: boolean;
}

/**
 * 2D-canvas stand-in for Aceternity's shader-based CanvasRevealEffect:
 * a dot matrix that pops in with random per-cell delays while hovered.
 */
const CanvasReveal: React.FC<CanvasRevealProps> = ({
  active,
  colors = [[125, 211, 252]],
  dotSize = 3,
  speed = 1,
  className,
  fade = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<number>();
  const startRef = useRef<number>(0);
  const cellsRef = useRef<{ x: number; y: number; delay: number; color: number[]; base: number }[]>(
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const build = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const { width, height } = parent.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const pitch = dotSize + 2;
      const cells: typeof cellsRef.current = [];
      for (let x = 0; x < width; x += pitch) {
        for (let y = 0; y < height; y += pitch) {
          cells.push({
            x,
            y,
            delay: Math.random() * 900,
            color: colors[Math.floor(Math.random() * colors.length)],
            // Dots thin out toward the bottom of the card.
            base: fade ? Math.max(0, 1 - (y / height) * 1.15) : 1,
          });
        }
      }
      cellsRef.current = cells;
    };

    build();

    const observer = new ResizeObserver(build);
    if (canvas.parentElement) observer.observe(canvas.parentElement);

    const draw = (now: number) => {
      if (!startRef.current) startRef.current = now;
      const elapsed = reduce ? 2000 : (now - startRef.current) * speed;
      const { width, height } = canvas.getBoundingClientRect();

      ctx.clearRect(0, 0, width, height);

      cellsRef.current.forEach((cell) => {
        const t = elapsed - cell.delay;
        if (t <= 0) return;
        // Pop in, then hold with a light flicker.
        const intro = Math.min(1, t / 320);
        const flicker = 0.85 + 0.15 * Math.sin(t / 420 + cell.x + cell.y);
        const alpha = cell.base * intro * (reduce ? 1 : flicker);
        if (alpha <= 0.02) return;

        ctx.fillStyle = `rgba(${cell.color[0]}, ${cell.color[1]}, ${cell.color[2]}, ${alpha})`;
        ctx.fillRect(cell.x, cell.y, dotSize, dotSize);
      });

      if (!reduce) frameRef.current = requestAnimationFrame(draw);
    };

    if (active) {
      startRef.current = 0;
      frameRef.current = requestAnimationFrame(draw);
    } else {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
    }

    return () => {
      observer.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [active, colors, dotSize, speed, fade]);

  return (
    <div className={cn('h-full w-full', className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
};

export default CanvasReveal;
