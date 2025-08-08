import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { LucideIcon, ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  icon: LucideIcon;
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

const InteractiveProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  tech,
  icon: Icon,
  githubUrl,
  liveUrl,
  image
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="modern-card glow-purple animate-fade-in relative overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image Overlay */}
      {image && (
        <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${image})` }}
          />
        </div>
      )}

      {/* Animated Border */}
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent-purple)] via-[var(--accent-blue)] to-[var(--accent-green)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute inset-[1px] bg-[var(--bg-secondary)] rounded-xl" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="relative">
            <Icon className="w-6 h-6 text-[var(--accent-blue)] mr-3" />
            <div className={`absolute inset-0 w-6 h-6 bg-[var(--accent-blue)] rounded-full opacity-20 transition-transform duration-300 ${isHovered ? 'scale-150' : 'scale-100'}`} />
          </div>
          <h3 className="text-xl font-semibold gradient-text">{title}</h3>
        </div>

        <p className="text-[var(--text-secondary)] mb-4 leading-relaxed group-hover:text-[var(--text-primary)] transition-colors duration-300">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tech.map((techItem, idx) => (
            <Badge 
              key={idx} 
              variant="secondary" 
              className="bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/30 transition-colors duration-300"
            >
              {techItem}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors duration-300"
            >
              <Github className="w-4 h-4" />
              <span className="text-sm">Code</span>
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-[var(--text-secondary)] hover:text-[var(--accent-green)] transition-colors duration-300"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="text-sm">Live</span>
            </a>
          )}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="w-2 h-2 bg-[var(--accent-purple)] rounded-full animate-pulse" />
      </div>
    </div>
  );
};

export default InteractiveProjectCard; 