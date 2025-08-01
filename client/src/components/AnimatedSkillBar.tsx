import React, { useEffect, useRef, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  color: string;
  icon?: React.ComponentType<any>;
}

interface AnimatedSkillBarProps {
  skill: Skill;
  delay?: number;
}

const AnimatedSkillBar: React.FC<AnimatedSkillBarProps> = ({ skill, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
            // Animate progress
            const duration = 2000;
            const startTime = Date.now();
            
            const animate = () => {
              const elapsed = Date.now() - startTime;
              const currentProgress = Math.min((elapsed / duration) * skill.level, skill.level);
              
              setProgress(currentProgress);
              
              if (elapsed < duration) {
                requestAnimationFrame(animate);
              }
            };
            
            requestAnimationFrame(animate);
          }, delay);
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [skill.level, delay]);

  return (
    <div ref={barRef} className="modern-card glow-blue animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {skill.icon && <skill.icon className="w-5 h-5 text-[var(--accent-blue)]" />}
          <h3 className="text-lg font-semibold text-[var(--accent-blue)]">{skill.name}</h3>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-[var(--text-secondary)]">{Math.round(progress)}%</span>
          {progress >= skill.level && (
            <CheckCircle className="w-4 h-4 text-green-500 animate-pulse" />
          )}
        </div>
      </div>
      
      <div className="relative h-3 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${
            isVisible ? 'animate-pulse' : ''
          }`}
          style={{
            width: `${progress}%`,
            background: skill.color,
            boxShadow: isVisible ? `0 0 10px ${skill.color}40` : 'none',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
      </div>
    </div>
  );
};

export default AnimatedSkillBar; 