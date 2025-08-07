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
    <div className={`modern-card glow-green animate-fade-in ${className}`}>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Left Side - Schedule a Meeting Content */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-4">
            <Calendar className="w-8 h-8 text-[var(--accent-green)] mr-3" />
            <h3 className="text-2xl font-semibold gradient-text">Schedule a Meeting</h3>
          </div>
          
          <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
            {CALENDLY_CONFIG.DESCRIPTION}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-center md:justify-start space-x-2 text-[var(--text-secondary)]">
              <Clock className="w-4 h-4 text-[var(--accent-green)]" />
              <span>{CALENDLY_CONFIG.CONSULTATION_DURATION}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-2 text-[var(--text-secondary)]">
              <Calendar className="w-4 h-4 text-[var(--accent-green)]" />
              <span>Flexible scheduling</span>
            </div>
          </div>
        </div>

        {/* Right Side - Calendly Widget */}
        <div className="flex justify-center md:justify-end">
          <div 
            className="calendly-inline-widget"
            data-url={calendlyUrl}
            style={{ minWidth: '320px', height: '400px', width: '100%', maxWidth: '400px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendlyWidget; 