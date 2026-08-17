export default function AlertsPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-surface-container-lowest rounded-2xl border border-surface-container-low">
      <span className="material-symbols-outlined text-[64px] text-error mb-4">notifications_active</span>
      <h2 className="text-display-lg font-display font-bold text-on-surface">Alerts</h2>
      <p className="text-on-surface-variant mt-2 max-w-md">Comprehensive list of 12+ alert cards with summary sidebar and resolve actions.</p>
    </div>
  );
}
