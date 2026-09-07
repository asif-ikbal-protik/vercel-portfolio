import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface TextGenerateProps {
  words: string;
  className?: string;
  /** Inclusive [start, end] word indices that get the gradient treatment. */
  highlightRange?: [number, number];
  duration?: number;
  delay?: number;
}

/** Word-by-word blur-in used for the hero headline. */
const TextGenerate: React.FC<TextGenerateProps> = ({
  words,
  className,
  highlightRange,
  duration = 0.7,
  delay = 0,
}) => {
  const reducedMotion = useReducedMotion();
  const tokens = words.split(' ');
  const isHighlighted = (index: number) =>
    !!highlightRange && index >= highlightRange[0] && index <= highlightRange[1];

  return (
    <h1 className={cn(className)}>
      {tokens.map((token, i) => (
        <motion.span
          key={`${token}-${i}`}
          className={cn('inline-block', isHighlighted(i) && 'gradient-word')}
          initial={reducedMotion ? false : { opacity: 0, filter: 'blur(10px)', y: 12 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {token}
          <span>&nbsp;</span>
        </motion.span>
      ))}
    </h1>
  );
};

export default TextGenerate;
