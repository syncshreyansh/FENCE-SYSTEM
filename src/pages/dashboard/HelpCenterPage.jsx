import { useState } from 'react';
import { HelpCircle, BookOpen, Cpu, ShieldAlert, PhoneCall, ChevronDown, ExternalLink } from 'lucide-react';

const faqs = [
  {
    q: 'How does the ML classifier distinguish legal pulses from illegal taps?',
    a: 'DFENCE uses high-frequency sampling (1 kHz) to analyze the decay waveform of each energizer pulse. Natural wildlife contacts generate rapid capacitive discharge transients with <5% duty cycle. Continuous resistive illegal taps flatten the discharge arc and elevate average duty cycle beyond 80%.'
  },
  {
    q: 'What should forest guards do when a "CASE OPENED" tamper alert fires?',
    a: 'A case open alert signifies physical breach of the solar controller enclosure. Immediately verify GPS coordinates in the Device Map and dispatch the nearest patrol unit with a tamper reset key and replacement security seals.'
  },
  {
    q: 'What is the standard battery backup life without solar recharge?',
    a: 'Each controller features a 12V LiFePO4 battery pack providing up to 14 days of continuous operation under overcast conditions or heavy foliage canopy.'
  }
];

export default function HelpCenterPage() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="flex flex-col gap-6 w-full min-w-0 select-none pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-sans font-black text-on-surface tracking-tight leading-none">
            Help Center & Manuals
          </h1>
          <p className="text-[12px] sm:text-[13px] text-on-surface-variant font-mono uppercase tracking-wider mt-1.5 opacity-80">
            Hardware Manuals, ML Classifier Guides & Patrol Protocols
          </p>
        </div>
      </div>

      {/* Guide Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center mb-3">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-on-surface text-[16px] tracking-tight mb-1">Hardware & Energizer Manual</h3>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">Pinout diagrams, voltage scaling, solar array calibration, and battery replacement steps.</p>
          </div>
          <span className="text-[12px] font-mono font-semibold text-primary mt-4 flex items-center gap-1">
            <span>Read Hardware Docs</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center mb-3">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-on-surface text-[16px] tracking-tight mb-1">Incident Response SOP</h3>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">Standard protocols for verified illegal taps, legal documentation, and wildlife protection response.</p>
          </div>
          <span className="text-[12px] font-mono font-semibold text-primary mt-4 flex items-center gap-1">
            <span>View SOP Guide</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </span>
        </div>

        <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-5 shadow-card flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary border border-primary/30 flex items-center justify-center mb-3">
              <PhoneCall className="w-5 h-5" />
            </div>
            <h3 className="font-sans font-bold text-on-surface text-[16px] tracking-tight mb-1">24/7 Technical Dispatch</h3>
            <p className="text-[13px] text-on-surface-variant leading-relaxed">Direct emergency satellite bridge for hardware failures and field assistance.</p>
          </div>
          <span className="text-[12px] font-mono font-semibold text-primary mt-4 flex items-center gap-1">
            <span>+91 800-DFENCE-SOS</span>
          </span>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-6 shadow-card">
        <h3 className="text-[18px] font-sans font-black tracking-tight text-on-surface mb-4">Frequently Asked Questions</h3>
        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className="border border-surface-container-high/60 rounded-xl p-4 bg-surface cursor-pointer"
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <div className="flex justify-between items-center gap-4">
                <span className="font-sans font-bold text-on-surface text-[14px]">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-on-surface-variant transition-transform shrink-0 ${openFaq === i ? 'rotate-180' : ''}`} />
              </div>
              {openFaq === i && (
                <p className="text-[13px] text-on-surface-variant mt-2.5 leading-relaxed pt-2.5 border-t border-surface-container-high/40">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
