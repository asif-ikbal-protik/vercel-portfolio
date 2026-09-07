import React, { useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  amount?: number;
}

/** Pointer-driven 3D tilt. Falls back to a static card for touch/reduced motion. */
const TiltCard: React.FC<TiltCardProps> = ({ children, className, amount = 9 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTransform(
      `rotateY(${x * amount * 2}deg) rotateX(${-y * amount * 2}deg) translateZ(0) scale(1.015)`,
    );
  };

  const reset = () => setTransform('');

  return (
    <div className={cn('tilt-scene', className)}>
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="tilt-card h-full"
        style={{ transform }}
      >
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
