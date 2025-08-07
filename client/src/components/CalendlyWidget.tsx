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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
        {/* Left Side - Schedule a Meeting Content (order-1 on all, order-1 on mobile, order-1 on desktop) */}
        <div className="text-center lg:text-left order-1">
          <div className="flex items-center justify-center lg:justify-start mb-4 lg:mb-6">
            <Calendar className="w-8 h-8 lg:w-10 lg:h-10 text-[var(--accent-green)] mr-3 lg:mr-4" />
            <h3 className="text-2xl lg:text-3xl font-semibold gradient-text">Schedule a Meeting</h3>
          </div>
          
          <p className="text-[var(--text-secondary)] mb-6 lg:mb-8 leading-relaxed text-base lg:text-lg">
            {CALENDLY_CONFIG.DESCRIPTION}
          </p>
          
          <div className="space-y-3 lg:space-y-4">
            <div className="flex items-center justify-center lg:justify-start space-x-2 lg:space-x-3 text-[var(--text-secondary)] text-sm lg:text-lg">
              <Clock className="w-4 h-4 lg:w-5 lg:h-5 text-[var(--accent-green)]" />
              <span>{CALENDLY_CONFIG.CONSULTATION_DURATION}</span>
            </div>
            <div className="flex items-center justify-center lg:justify-start space-x-2 lg:space-x-3 text-[var(--text-secondary)] text-sm lg:text-lg">
              <Calendar className="w-4 h-4 lg:w-5 lg:h-5 text-[var(--accent-green)]" />
              <span>Flexible scheduling</span>
            </div>
          </div>
        </div>

        {/* Right Side - Calendly Widget (order-2 on all, order-2 on mobile, order-2 on desktop) */}
        <div className="flex justify-center lg:justify-end order-2">
          <div 
            className="calendly-inline-widget w-full lg:max-w-[500px]"
            data-url={darkThemeUrl}
            style={{ 
              minWidth: '280px', 
              height: '400px', 
              width: '100%'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendlyWidget; 