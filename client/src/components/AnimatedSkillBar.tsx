import React, { useEffect, useRef, useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface SkillBarProps {
  name: string;
  percentage: number;
  icon: LucideIcon;
  color: string;
}

const AnimatedSkillBar: React.FC<SkillBarProps> = ({ name, percentage, icon: Icon, color }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate the percentage
          let start = 0;
          const increment = percentage / 50; // 50 steps for smooth animation
          const timer = setInterval(() => {
            start += increment;
            if (start >= percentage) {
              setAnimatedPercentage(percentage);
              clearInterval(timer);
            } else {
              setAnimatedPercentage(start);
            }
          }, 20);
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [percentage]);

  return (
    <div ref={barRef} className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className="w-5 h-5" style={{ color }} />
          <span className="font-medium text-[var(--text-primary)]">{name}</span>
        </div>
        <span className="text-sm text-[var(--text-secondary)]">{Math.round(animatedPercentage)}%</span>
      </div>
      <div className="w-full bg-[var(--bg-tertiary)] rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: `${animatedPercentage}%`,
            background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
            boxShadow: `0 0 10px ${color}40`
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedSkillBar; 