import { useState } from 'react';
import { MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FeedbackPage() {
  const [submitted, setSubmitted] = useState(false);
  const [category, setCategory] = useState('Hardware');
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSubject('');
      setDetails('');
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-6 w-full min-w-0 select-none pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-sans font-black text-on-surface tracking-tight leading-none">
            Submit Feedback & Reports
          </h1>
          <p className="text-[12px] sm:text-[13px] text-on-surface-variant font-mono uppercase tracking-wider mt-1.5 opacity-80">
            Field Observations, Model Accuracy Feedback & Hardware Issues
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Card */}
        <div className="lg:col-span-2 bg-surface-container-lowest border border-surface-container-high rounded-2xl p-6 shadow-card">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-on-surface-variant mb-2">Category</label>
              <div className="flex gap-2 flex-wrap">
                {['Hardware Issue', 'ML Classification Error', 'UI Suggestion', 'Wildlife Sighting'].map(cat => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-[12px] font-mono font-bold transition-all cursor-pointer ${
                      category === cat 
                        ? 'bg-primary text-black' 
                        : 'bg-surface border border-surface-container-high text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-on-surface-variant mb-1.5">Subject</label>
              <input
                type="text"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Brief summary of observation..."
                className="w-full bg-surface border border-surface-container-high rounded-xl px-4 py-2.5 text-[13px] text-on-surface outline-none focus:border-primary font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase tracking-wider text-on-surface-variant mb-1.5">Detailed Report</label>
              <textarea
                rows="4"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Include device ID, exact GPS sector, animal footprints, or wire condition..."
                className="w-full bg-surface border border-surface-container-high rounded-xl p-4 text-[13px] text-on-surface outline-none focus:border-primary font-sans resize-none"
              />
            </div>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 bg-primary text-black px-6 py-3 rounded-xl text-[13px] font-mono font-bold hover:brightness-110 transition-all shadow-sm cursor-pointer self-start"
            >
              {submitted ? <CheckCircle2 className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              <span>{submitted ? 'Ticket Logged #TKT-8842' : 'Submit Field Report'}</span>
            </button>
          </form>
        </div>

        {/* Previous Tickets */}
        <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-6 shadow-card flex flex-col justify-between">
          <div>
            <h3 className="font-sans font-bold text-on-surface text-[16px] tracking-tight mb-3">Recent Submissions</h3>
            <div className="flex flex-col gap-3">
              {[
                { id: 'TKT-8839', title: 'Elephant contact on DEV-004', time: 'Yesterday', status: 'Reviewed' },
                { id: 'TKT-8820', title: 'Solar panel wire loose DEV-088', time: '3 days ago', status: 'Actioned' },
                { id: 'TKT-8801', title: 'False tap on wet grass DEV-067', time: '1 week ago', status: 'Closed' }
              ].map(ticket => (
                <div key={ticket.id} className="p-3 bg-surface rounded-xl border border-surface-container-high/40 text-[12px]">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-mono font-bold text-primary">{ticket.id}</span>
                    <span className="font-sans font-bold text-[10px] uppercase bg-surface-container-high px-2 py-0.5 rounded text-on-surface-variant">
                      {ticket.status}
                    </span>
                  </div>
                  <div className="font-sans font-medium text-on-surface">{ticket.title}</div>
                  <div className="font-mono text-[10px] text-on-surface-variant mt-1">{ticket.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
