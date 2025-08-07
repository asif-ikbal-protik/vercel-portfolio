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

  // Add dark theme parameter to Calendly URL
  const darkThemeUrl = `${calendlyUrl}?hide_gdpr_banner=1&background_color=000000&text_color=ffffff&primary_color=22c55e`;

  return (
    <div className={`modern-card glow-green animate-fade-in ${className}`}>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Schedule a Meeting Content */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start mb-6">
            <Calendar className="w-10 h-10 text-[var(--accent-green)] mr-4" />
            <h3 className="text-3xl font-semibold gradient-text">Schedule a Meeting</h3>
          </div>
          
          <p className="text-[var(--text-secondary)] mb-8 leading-relaxed text-lg">
            {CALENDLY_CONFIG.DESCRIPTION}
          </p>
          
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-3 text-[var(--text-secondary)] text-lg">
              <Clock className="w-5 h-5 text-[var(--accent-green)]" />
              <span>{CALENDLY_CONFIG.CONSULTATION_DURATION}</span>
            </div>
            <div className="flex items-center justify-center md:justify-start space-x-3 text-[var(--text-secondary)] text-lg">
              <Calendar className="w-5 h-5 text-[var(--accent-green)]" />
              <span>Flexible scheduling</span>
            </div>
          </div>
        </div>

        {/* Right Side - Calendly Widget */}
        <div className="flex justify-center md:justify-end">
          <div 
            className="calendly-inline-widget"
            data-url={darkThemeUrl}
            style={{ minWidth: '400px', height: '600px', width: '100%', maxWidth: '500px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendlyWidget; 