export default function SettingsPage() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-center p-8 bg-surface-container-lowest rounded-2xl border border-surface-container-low">
      <span className="material-symbols-outlined text-[64px] text-primary mb-4">settings</span>
      <h2 className="text-display-lg font-display font-bold text-on-surface">Settings</h2>
      <p className="text-on-surface-variant mt-2 max-w-md">Local navigation layout with form fields and toggles for configuring system behaviors.</p>
    </div>
  );
}
