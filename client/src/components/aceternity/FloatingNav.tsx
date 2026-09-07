import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface NavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface FloatingNavProps {
  navItems: NavItem[];
  activeId: string;
  onNavigate: (id: string) => void;
  className?: string;
  action?: React.ReactNode;
}

/**
 * Pill nav that hides while scrolling down and reappears on the way back up.
 * Always visible at the very top of the page.
 */
const FloatingNav: React.FC<FloatingNavProps> = ({
  navItems,
  activeId,
  onNavigate,
  className,
  action,
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current !== 'number') return;
    const previous = scrollYProgress.getPrevious() ?? 0;
    const direction = current - previous;

    if (current < 0.02) {
      setVisible(true);
    } else {
      setVisible(direction < 0);
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.nav
        aria-label="Main navigation"
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25 }}
        className={cn(
          'fixed inset-x-0 top-6 z-[5000] mx-auto flex max-w-fit items-center justify-center gap-2 rounded-2xl border border-white/[0.15] px-4 py-3 md:gap-4 md:px-8',
          className,
        )}
        style={{
          backdropFilter: 'blur(16px) saturate(180%)',
          background: 'rgba(17, 25, 40, 0.75)',
          boxShadow:
            '0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset',
        }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            aria-label={item.label}
            aria-current={activeId === item.id ? "location" : undefined}
            onClick={() => onNavigate(item.id)}
            className={cn(
              'relative flex items-center space-x-1 min-h-10 min-w-10 justify-center px-2 py-1 text-sm transition-colors',
              activeId === item.id ? 'text-white' : 'text-white-200 hover:text-white',
            )}
          >
            <span className="block sm:hidden">{item.icon}</span>
            <span className="hidden text-sm sm:block">{item.label}</span>
            {activeId === item.id && (
              <motion.span
                layoutId="floating-nav-active"
                className="absolute inset-x-0 -bottom-1 mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-purple to-transparent"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
        {action}
      </motion.nav>
    </AnimatePresence>
  );
};

export default FloatingNav;
