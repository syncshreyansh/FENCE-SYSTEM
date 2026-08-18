import { useState } from 'react';
import { Users, Shield, Radio, Phone, Mail, UserCheck, Plus } from 'lucide-react';

const mockTeam = [
  { name: 'Officer Rao', role: 'Forest Guard Lead', zone: 'Kanha Zone', status: 'On Patrol', phone: '+91 98450 11234', initials: 'R', alertsHandled: 42 },
  { name: 'Commander Sharma', role: 'Perimeter Security Chief', zone: 'Central Command', status: 'Online', phone: '+91 98450 55678', initials: 'S', alertsHandled: 128 },
  { name: 'Ranger K. Borah', role: 'Field Technical Officer', zone: 'Sonitpur Zone', status: 'On Patrol', phone: '+91 98450 99881', initials: 'B', alertsHandled: 36 },
  { name: 'Inspector Verma', role: 'Wildlife Conflict Officer', zone: 'Kanha Zone', status: 'Standby', phone: '+91 98450 33442', initials: 'V', alertsHandled: 19 },
  { name: 'Officer Deka', role: 'IoT Hardware Specialist', zone: 'Sonitpur Zone', status: 'Online', phone: '+91 98450 77112', initials: 'D', alertsHandled: 54 },
  { name: 'Ranger Patel', role: 'Perimeter Patrol Unit 2', zone: 'Kanha Zone', status: 'On Patrol', phone: '+91 98450 22331', initials: 'P', alertsHandled: 23 }
];

export default function TeamPage() {
  return (
    <div className="flex flex-col gap-6 w-full min-w-0 select-none pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[34px] font-sans font-black text-on-surface tracking-tight leading-none">
            Team & Field Units
          </h1>
          <p className="text-[12px] sm:text-[13px] text-on-surface-variant font-mono uppercase tracking-wider mt-1.5 opacity-80">
            Active Forest Guards & Technical Staff · <span className="text-primary font-sans font-bold">{mockTeam.length}</span> Active Personnel
          </p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-xl text-[12px] font-mono font-bold hover:brightness-110 transition-all shadow-sm cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Member Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockTeam.map((member, i) => (
          <div 
            key={i}
            className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-5 shadow-card flex flex-col justify-between hover:border-primary/40 transition-colors"
          >
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-primary text-black font-sans font-black text-[16px] flex items-center justify-center shrink-0">
                    {member.initials}
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-on-surface text-[15px] tracking-tight">{member.name}</h3>
                    <p className="text-[12px] font-mono text-on-surface-variant">{member.role}</p>
                  </div>
                </div>

                <span className={`px-2.5 py-0.5 rounded text-[10px] font-sans font-bold uppercase tracking-tight ${
                  member.status === 'On Patrol'
                    ? 'bg-[#142500] text-primary border border-primary/30'
                    : member.status === 'Online'
                      ? 'bg-surface-container text-on-surface'
                      : 'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {member.status}
                </span>
              </div>

              <div className="bg-surface p-3.5 rounded-xl border border-surface-container-high/40 flex flex-col gap-2 font-mono text-[11px] text-on-surface-variant mb-4">
                <div className="flex justify-between">
                  <span>Assigned Zone:</span>
                  <strong className="text-on-surface font-sans">{member.zone}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Phone:</span>
                  <span className="text-primary">{member.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span>Alerts Handled:</span>
                  <strong className="text-on-surface font-sans font-bold">{member.alertsHandled} incidents</strong>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-surface-container-high/40">
              <a
                href={`tel:${member.phone}`}
                className="flex-1 py-1.5 bg-surface-container text-on-surface text-[11px] font-mono font-semibold rounded-lg text-center hover:bg-surface-container-high transition-colors"
              >
                Call Unit
              </a>
              <button className="flex-1 py-1.5 bg-surface-container text-on-surface text-[11px] font-mono font-semibold rounded-lg text-center hover:bg-surface-container-high transition-colors">
                Dispatch
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
