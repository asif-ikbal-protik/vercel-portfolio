import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github, Eye, Code } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  github?: string;
  live?: string;
  details: string[];
  icon: React.ComponentType<any>;
}

interface InteractiveProjectCardProps {
  project: Project;
}

const InteractiveProjectCard: React.FC<InteractiveProjectCardProps> = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className="modern-card glow-purple animate-fade-in relative group overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Background Image/Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <project.icon className="w-6 h-6 text-[var(--accent-blue)] mr-3" />
          <h3 className="text-xl font-semibold gradient-text">{project.title}</h3>
        </div>
        
        <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
          {project.description}
        </p>
        
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, idx) => (
            <Badge 
              key={idx} 
              variant="secondary" 
              className="bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/30 transition-colors"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Expanded Details */}
        {isExpanded && (
          <div className="mt-4 p-4 bg-[var(--bg-tertiary)] rounded-lg border border-[var(--border-color)]">
            <h4 className="font-semibold text-[var(--accent-purple)] mb-2 flex items-center">
              <Code className="w-4 h-4 mr-2" />
              Key Features
            </h4>
            <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
              {project.details.map((detail, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-[var(--accent-blue)] mr-2">•</span>
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border-color)]">
          <div className="flex space-x-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--accent-blue)]/20 text-[var(--accent-blue)] hover:bg-[var(--accent-blue)]/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-[var(--accent-purple)]/20 text-[var(--accent-purple)] hover:bg-[var(--accent-purple)]/30 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
          
          <button
            className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent-blue)] transition-colors flex items-center"
          >
            <Eye className="w-4 h-4 mr-1" />
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>

      {/* Hover Effects */}
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
    </div>
  );
};

export default InteractiveProjectCard; 