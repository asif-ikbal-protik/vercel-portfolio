import React, { useEffect, useRef, useState } from 'react';
import createGlobe from 'cobe';

/** Geographic globe with routes from Dhaka to US and European time zones. */
const DottedGlobe: React.FC<{ className?: string }> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [unavailable, setUnavailable] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let phi = 0.45;
    let lastTime = performance.now();
    let width = canvas.clientWidth;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const observer = new ResizeObserver(() => { width = canvas.clientWidth; });
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; });
    observer.observe(canvas);
    intersection.observe(canvas);
    let frame = 0;
    let globe: ReturnType<typeof createGlobe> | undefined;
    try {
      globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi,
        theta: 0.22,
        dark: 1,
        diffuse: 1.6,
        mapSamples: 18000,
        mapBrightness: 5,
        baseColor: [0.12, 0.1, 0.3],
        markerColor: [0.4, 0.9, 1],
        glowColor: [0.19, 0.12, 0.4],
        markers: [
          { location: [23.8103, 90.4125], size: 0.075 },
          { location: [51.5072, -0.1276], size: 0.045 },
          { location: [52.52, 13.405], size: 0.035 },
          { location: [40.7128, -74.006], size: 0.045 },
          { location: [37.7749, -122.4194], size: 0.035 },
        ],
        arcs: [
          { from: [23.8103, 90.4125], to: [51.5072, -0.1276] },
          { from: [23.8103, 90.4125], to: [52.52, 13.405] },
          { from: [23.8103, 90.4125], to: [40.7128, -74.006] },
          { from: [23.8103, 90.4125], to: [37.7749, -122.4194] },
        ],
        arcColor: [0.8, 0.67, 0.98],
        arcWidth: 0.6,
        arcHeight: 0.25,

      });
      const draw = () => {
        const now = performance.now();
        if (visible && !document.hidden) {
          if (!motion.matches) phi += Math.min(now - lastTime, 50) * 0.00012;
          globe?.update({ phi, width: width * dpr, height: width * dpr });
        }
        lastTime = now;
        frame = requestAnimationFrame(draw);
      };
      frame = requestAnimationFrame(draw);
    } catch {
      setUnavailable(true);
    }
    return () => { cancelAnimationFrame(frame); observer.disconnect(); intersection.disconnect(); globe?.destroy(); };
  }, []);

  return (
    <div className={className} aria-hidden="true">
      {unavailable ? <div className="globe-fallback">DHAKA · EUROPE · US</div> : <canvas ref={canvasRef} className="h-full w-full" />}
    </div>
  );
};

export default DottedGlobe;
