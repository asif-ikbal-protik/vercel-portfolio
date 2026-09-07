import React, { useEffect } from 'react';
import { Calendar, Clock, Globe } from 'lucide-react';
import { CALENDLY_CONFIG } from '@/config/calendly';

interface CalendlyWidgetProps {
  calendlyUrl: string;
  className?: string;
}

const CalendlyWidget: React.FC<CalendlyWidgetProps> = ({ calendlyUrl, className = '' }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector(
        'script[src="https://assets.calendly.com/assets/external/widget.js"]',
      );
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  // Dark embed so the iframe matches the surrounding panel.
  const themedUrl = `${calendlyUrl}?hide_gdpr_banner=1&hide_landing_page_details=1&background_color=10132e&text_color=ffffff&primary_color=cbacf9`;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-white/[0.12] p-6 md:p-10 ${className}`}
      style={{ background: 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)' }}
    >
      <div className="aurora right-[-8%] top-[-30%] h-64 w-64 bg-purple" />

      <div className="relative grid gap-8 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-4">
          <p className="eyebrow">Direct booking</p>
          <h3 className="mt-4 font-display text-2xl font-semibold text-white">
            Book the first call
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white-200">
            {CALENDLY_CONFIG.DESCRIPTION}
          </p>
          <a href={calendlyUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex text-sm font-medium text-lilac underline underline-offset-4">Open booking in a new tab ↗</a>

          <dl className="mt-7 space-y-3 border-t border-white/10 pt-5">
            {[
              { icon: <Clock className="h-4 w-4" />, k: 'Length', v: CALENDLY_CONFIG.CONSULTATION_DURATION },
              { icon: <Calendar className="h-4 w-4" />, k: 'Format', v: 'Video call, agenda sent ahead' },
              { icon: <Globe className="h-4 w-4" />, k: 'Timezone', v: 'GMT+6 · flexible for US & EU' },
            ].map((row) => (
              <div key={row.k} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-lilac">
                  {row.icon}
                </span>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-white-200/60">
                    {row.k}
                  </dt>
                  <dd className="text-sm text-white-200">{row.v}</dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        <div className="md:col-span-8">
          <div
            className="calendly-inline-widget w-full"
            data-url={themedUrl}
            style={{ minWidth: '280px', height: '520px', width: '100%' }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendlyWidget;
