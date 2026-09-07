import React from 'react';
import { cn } from '@/lib/utils';

interface PinCardProps {
  children: React.ReactNode;
  /** Text shown in the floating pin head. */
  label?: string;
  href?: string;
  className?: string;
  containerClassName?: string;
}

/**
 * Aceternity-style 3D pin: the card lies back in perspective on hover while a
 * labelled pin head rises above it on a light beam.
 */
const PinCard: React.FC<PinCardProps> = ({
  children,
  label = 'Visit',
  href,
  className,
  containerClassName,
}) => {
  const Wrapper: React.ElementType = href ? 'a' : 'div';

  return (
    <Wrapper
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn('group/pin relative block h-full', containerClassName)}
      style={{ perspective: '1000px' }}
    >
      {/* Pin head + beam */}
      <div className="pointer-events-none absolute inset-x-0 -top-2 z-20 flex justify-center">
        <div className="flex -translate-y-4 flex-col items-center opacity-0 transition-all duration-500 group-hover/pin:-translate-y-5 group-hover/pin:opacity-100">
          <span className="relative z-10 rounded-full border border-purple/40 bg-black-100/90 px-4 py-1 font-display text-[11px] font-semibold tracking-wide text-lilac backdrop-blur">
            {label}
          </span>
          <span className="h-8 w-px bg-gradient-to-b from-purple via-purple/40 to-transparent" />
        </div>
      </div>

      {/* Perspective floor rings */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity duration-500 group-hover/pin:opacity-100"
        style={{ transform: 'translate(-50%, -50%) rotateX(70deg)' }}
      >
        {[1, 2, 3].map((ring) => (
          <span
            key={ring}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple/25"
            style={{
              width: `${ring * 9}rem`,
              height: `${ring * 9}rem`,
              animation: `pin-pulse 4s ease-in-out ${ring * 0.6}s infinite`,
            }}
          />
        ))}
      </div>

      {/* The card itself */}
      <div
        className={cn(
          'relative z-10 h-full transition-transform duration-700 ease-out',
          'group-hover/pin:[transform:rotateX(35deg)_scale(0.93)]',
          className,
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {children}
      </div>
    </Wrapper>
  );
};

export default PinCard;
