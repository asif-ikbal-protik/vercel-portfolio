import React, { useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';
import { CALENDLY_CONFIG } from '@/config/calendly';

interface CalendlyWidgetProps {
  calendlyUrl: string;
  className?: string;
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({ calendlyUrl, className = '' }) => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div className={`modern-card glow-green animate-fade-in ${className} p-0 md:p-0`}>
      <div className="text-center mb-4 md:mb-6">
        <div className="flex items-center justify-center mb-2 md:mb-4">
          <Calendar className="w-8 h-8 text-[var(--accent-green)] mr-3" />
          <h3 className="text-2xl font-semibold gradient-text">Schedule a Meeting</h3>
        </div>
        <p className="text-[var(--text-secondary)] mb-4 leading-relaxed">
          {CALENDLY_CONFIG.DESCRIPTION}
        </p>
        <div className="space-y-2 mb-4">
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
      {/* Calendly Inline Widget */}
      <div 
        className="calendly-inline-widget w-full"
        data-url={calendlyUrl}
        style={{ minWidth: '320px', height: '400px', width: '100%' }}
      />
    </div>
  );
};

export default CalendlyWidget; 