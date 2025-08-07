import React, { useEffect, useRef } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { CALENDLY_CONFIG } from '@/config/calendly';

// Declare Calendly type for TypeScript
declare global {
  interface Window {
    Calendly?: {
      initInlineWidget: (options: { 
        url: string;
        parentElement: HTMLElement;
        minWidth?: string;
        height?: string;
      }) => void;
    };
  }
}

interface CalendlyWidgetProps {
  calendlyUrl: string;
  className?: string;
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({ calendlyUrl, className = '' }) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    
    script.onload = () => {
      // Initialize inline widget after script loads
      if (window.Calendly && widgetRef.current) {
        window.Calendly.initInlineWidget({
          url: calendlyUrl,
          parentElement: widgetRef.current,
          minWidth: '320px',
          height: '700px'
        });
      }
    };
    
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, [calendlyUrl]);

  return (
    <div className={`modern-card glow-green animate-fade-in ${className}`}>
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-4">
          <Calendar className="w-8 h-8 text-[var(--accent-green)] mr-3" />
          <h3 className="text-2xl font-semibold gradient-text">Schedule a Meeting</h3>
        </div>
        
        <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
          {CALENDLY_CONFIG.DESCRIPTION}
        </p>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-center justify-center space-x-2 text-[var(--text-secondary)]">
            <Clock className="w-4 h-4 text-[var(--accent-green)]" />
            <span>{CALENDLY_CONFIG.CONSULTATION_DURATION}</span>
          </div>
          <div className="flex items-center justify-center space-x-2 text-[var(--text-secondary)]">
            <Calendar className="w-4 h-4 text-[var(--accent-green)]" />
            <span>Flexible scheduling</span>
          </div>
        </div>
      </div>
      
      {/* Calendly Inline Widget Container */}
      <div 
        ref={widgetRef}
        className="calendly-inline-widget"
        style={{ minWidth: '320px', height: '700px' }}
      />
    </div>
  );
};

export default CalendlyWidget; 