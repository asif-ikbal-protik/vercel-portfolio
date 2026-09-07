import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BentoGrid: React.FC<{ className?: string; children?: React.ReactNode }> = ({
  className,
  children,
}) => (
  <div
    className={cn(
      'mx-auto grid w-full',
      className,
    )}
  >
    {children}
  </div>
);

interface BentoGridItemProps {
  className?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Decorative background image or illustration slot. */
  visual?: React.ReactNode;
  /** Extra content rendered under the copy (chip rows, lists, buttons). */
  children?: React.ReactNode;
  /** Renders the "copy email" affordance used by the final tile. */
  copyEmail?: string;
  spareImg?: string;
  titleClassName?: string;
}

export const BentoGridItem: React.FC<BentoGridItemProps> = ({
  className,
  title,
  description,
  visual,
  children,
  copyEmail,
  titleClassName,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!copyEmail) return;
    try {
      await navigator.clipboard.writeText(copyEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={cn('bento-tile group/bento row-span-1', className)}>
      <div className="absolute inset-0">{visual}</div>

      <div
        className={cn(
          'relative z-10 flex h-full min-h-[14rem] flex-col p-5 transition-transform duration-300 md:p-7',
          titleClassName,
        )}
      >
        {description && (
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white-200/80">
            {description}
          </p>
        )}

        {title && (
          <h3 className="mt-2 max-w-[24rem] font-display text-lg font-semibold leading-snug text-white md:text-xl lg:text-2xl">
            {title}
          </h3>
        )}

        {children && <div className="mt-5 flex flex-1 flex-col">{children}</div>}

        {copyEmail && (
          <div className="mt-auto pt-6">
            <button onClick={handleCopy} className="magic-button w-full">
              <span className="magic-button__spin" />
              <span className="magic-button__face">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? 'Email copied' : 'Copy my email address'}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BentoGrid;
