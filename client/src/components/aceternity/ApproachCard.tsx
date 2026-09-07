import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CanvasReveal from './CanvasReveal';

interface ApproachCardProps {
  /** Pill shown while the card is at rest. */
  phase: string;
  title: string;
  body: string;
  /** rgb triplets for the dot matrix. */
  colors: number[][];
  /** Card background once revealed. */
  gradient: string;
  dotSize?: number;
}

const Corner: React.FC<{ className: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    className={`absolute h-6 w-6 text-white/40 ${className}`}
    aria-hidden="true"
  >
    <path d="M12 6v12M6 12h12" />
  </svg>
);

/**
 * Rest state shows a phase pill. Hover (or focus) fills the card with the dot
 * matrix and swaps in the stage title and description.
 */
const ApproachCard: React.FC<ApproachCardProps> = ({
  phase,
  title,
  body,
  colors,
  gradient,
  dotSize = 3,
}) => {
  const [active, setActive] = useState(false);

  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      tabIndex={0}
      className="group/canvas relative flex min-h-[20rem] h-full w-full items-center justify-center rounded-3xl border border-white/[0.14] p-6 outline-none transition-colors duration-300 focus-visible:border-purple"
    >
      <Corner className="-left-3 -top-3" />
      <Corner className="-bottom-3 -left-3" />
      <Corner className="-right-3 -top-3" />
      <Corner className="-bottom-3 -right-3" />

      <AnimatePresence>
        {active && (
          <motion.div
            className="absolute inset-0 h-full w-full overflow-hidden rounded-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className={`absolute inset-0 ${gradient}`} />
            <CanvasReveal
              active={active}
              colors={colors}
              dotSize={dotSize}
              className="absolute inset-0"
            />
            <div className="absolute inset-0 bg-black/50 [mask-image:radial-gradient(360px_at_center,white,transparent)]" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full text-left">
        <p className="mb-6 font-mono text-xs uppercase tracking-[0.18em] text-lilac">{phase}</p>
        <h3 className="font-display text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-4 text-base leading-relaxed text-white-200">{body}</p>
      </div>

    </div>
  );
};

export default ApproachCard;
