import React from 'react';
import { cn } from '@/lib/utils';

interface MovingBorderCardProps {
  children: React.ReactNode;
  className?: string;
  /** Seconds for one full trip around the border. */
  duration?: number;
  /** Corner radius in px for the frame and the travelling arc. */
  radius?: number;
}

/**
 * A glowing arc that travels continuously around the card edge, the same read as
 * Aceternity's MovingBorder. Uses a normalised `pathLength` so the arc keeps its
 * proportions no matter how tall the card grows.
 */
const MovingBorderCard: React.FC<MovingBorderCardProps> = ({
  children,
  className,
  duration = 8,
  radius = 24,
}) => (
  <div className={cn('relative', className)} style={{ borderRadius: radius }}>
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mb-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#cbacf9" stopOpacity="0" />
          <stop offset="50%" stopColor="#cbacf9" stopOpacity="1" />
          <stop offset="100%" stopColor="#67e8f9" stopOpacity="0" />
        </linearGradient>
        <filter id="mb-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Resting hairline */}
      <rect
        x="0.5"
        y="0.5"
        width="calc(100% - 1px)"
        height="calc(100% - 1px)"
        rx={radius}
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="1"
      />

      {/* Travelling arc */}
      <rect
        x="0.5"
        y="0.5"
        width="calc(100% - 1px)"
        height="calc(100% - 1px)"
        rx={radius}
        fill="none"
        stroke="url(#mb-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1000}
        strokeDasharray="110 890"
        filter="url(#mb-glow)"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="0"
          to="-1000"
          dur={`${duration}s`}
          repeatCount="indefinite"
        />
      </rect>
    </svg>

    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        borderRadius: radius,
        background: 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
      }}
    >
      {children}
    </div>
  </div>
);

export default MovingBorderCard;
