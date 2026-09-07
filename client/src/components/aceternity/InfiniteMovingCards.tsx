import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface Item {
  quote: string;
  name: string;
  title: string;
}

interface InfiniteMovingCardsProps {
  items: Item[];
  direction?: 'left' | 'right';
  speed?: 'fast' | 'normal' | 'slow';
  pauseOnHover?: boolean;
  className?: string;
}

/** Duplicates its children once, then translates the track by -50% forever. */
const InfiniteMovingCards: React.FC<InfiniteMovingCardsProps> = ({
  items,
  direction = 'left',
  speed = 'slow',
  pauseOnHover = true,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const scroller = scrollerRef.current;
    if (!container || !scroller) return;

    Array.from(scroller.children).forEach((child) => {
      const clone = child.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      scroller.appendChild(clone);
    });

    container.style.setProperty(
      '--animation-direction',
      direction === 'left' ? 'forwards' : 'reverse',
    );
    container.style.setProperty(
      '--animation-duration',
      speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s',
    );

    setStart(true);
  }, [direction, speed]);

  return (
    <div
      ref={containerRef}
      className={cn('marquee-mask relative z-20 max-w-7xl overflow-hidden', className)}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-6 py-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]',
        )}
      >
        {items.map((item) => (
          <li
            key={item.name + item.quote.slice(0, 12)}
            className="relative w-[85vw] max-w-full flex-shrink-0 rounded-2xl border border-white/[0.12] p-6 md:w-[36rem] md:p-10"
            style={{ background: 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)' }}
          >
            <blockquote>
              <span className="relative z-20 text-sm leading-[1.7] font-normal text-white-200 md:text-lg">
                {item.quote}
              </span>
              <div className="relative z-20 mt-6 flex flex-row items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple/70 to-indigo-500/40 font-display text-sm font-semibold text-white">
                  {item.name
                    .split(' ')
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join('')}
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold leading-tight text-white md:text-base">
                    {item.name}
                  </span>
                  <span className="text-xs leading-tight text-white-200">{item.title}</span>
                </span>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InfiniteMovingCards;
