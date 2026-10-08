import React from 'react';
import { Activity, Radio, Gauge, Clock, Database, TrendingUp } from 'lucide-react';
import { LanguageCode } from '../../types';

interface OngoingIntelligenceViewProps {
  currentLanguage: LanguageCode;
}

export const OngoingIntelligenceView: React.FC<OngoingIntelligenceViewProps> = ({
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';

  const telemetryMetrics = [
    { label: 'Surface Standpipe Pressure (SPP)', value: '2,840 psi', status: 'Normal', delta: '+12 psi' },
    { label: 'Total Flow Rate (Pumps 1 & 2)', value: '720 gpm', status: 'Optimal', delta: '0 gpm' },
    { label: 'Rotary Speed (Top Drive RPM)', value: '110 rpm', status: 'Stable', delta: '+5 rpm' },
    { label: 'Weight On Bit (WOB)', value: '28 klbs', status: 'Normal', delta: '-2 klbs' },
    { label: 'Surface Torque', value: '14,200 ft-lb', status: 'Optimal', delta: '+150 ft-lb' },
    { label: 'Active Pit Volume', value: '840 bbl', status: 'Level Safe', delta: '+2 bbl' },
    { label: 'Mud Density In / Out', value: '1.36 / 1.37 sg', status: 'Balanced', delta: '+0.01 sg' },
    { label: 'Total Background Gas', value: '18 units', status: 'Safe (< 50)', delta: '-3 units' }
  ];

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'المرحلة 04: معلومات العمليات الجارية وتدفق البيانات اللحظية' : 'Phase 04: Ongoing Well Operations & Rig Telemetry Stream'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'مراقبة حية لمعلمات الحفر، الضغط اللحظي، عزم الدوران، ومستويات طين الحفر من منصة SAR-214.'
              : 'WITSML telemetry acquisition from Rig SAR-214 cyber rig with real-time drilling parameter monitoring.'}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] text-emerald-400 font-mono">Stream: LIVE (1.0 Hz)</span>
        </div>
      </div>

      {/* Telemetry Sensor Matrix */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
        {telemetryMetrics.map((m, idx) => (
          <div
            key={idx}
            className="p-3 rounded bg-[#08101e] border border-sky-950/60 space-y-1 text-xs"
          >
            <div className="text-[10px] text-slate-500 truncate">{m.label}</div>
            <div className="text-sm font-mono text-slate-100">{m.value}</div>
            <div className="flex justify-between items-center text-[10px] pt-1 border-t border-slate-800/50">
              <span className="text-emerald-400 font-normal">{m.status}</span>
              <span className="text-slate-500 font-mono">{m.delta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Morning Report Summary Box */}
      <div className="p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-2 text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-sky-950/40">
          <span className="text-slate-200 font-normal">Daily Morning Report (DMR-01) Summary</span>
          <span className="text-[10px] font-mono text-slate-400">Date: 2026-10-06 06:00 HRS</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Rig SAR-214: Pre-spud maintenance completed. Performed BOP test on blind and pipe rams to 5,000 psi for 10 minutes (held solid).
          Rigged up 26" surface hole drilling BHA. Loaded 840 bbl bentonite spud mud (1.10 sg). Commenced spudding Well-102 at 04:30 HRS. Zero incidents or delays reported.
        </p>
      </div>
    </div>
  );
};
