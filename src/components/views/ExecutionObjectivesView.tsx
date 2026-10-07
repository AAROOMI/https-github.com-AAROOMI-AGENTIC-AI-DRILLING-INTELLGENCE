import React from 'react';
import { Target, MapPin, Compass, ShieldCheck } from 'lucide-react';
import { LanguageCode } from '../../types';

interface ExecutionObjectivesViewProps {
  currentLanguage: LanguageCode;
}

export const ExecutionObjectivesView: React.FC<ExecutionObjectivesViewProps> = ({
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'المرحلة 09: أهداف التنفيذ الجيولوجي والهندسي (Execution Objectives)' : 'Phase 09: Subsurface Target Geometries & Execution Objectives'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'تحديد أبعاد صندوق الدخول للمكمن، زوايا الاختراق، وأطوال التماس الهيدروكربوني.'
              : 'Target entry window tolerances, geological prognosis penetration angles, and reservoir contact objectives.'}
          </div>
        </div>
        <div className="text-[11px] text-emerald-400 font-mono">
          Drain Length: 1,240 m Target
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
        {/* Subsurface Target Coordinate Box */}
        <div className="p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-sky-950/40 text-slate-200 font-medium">
            <Target className="w-4 h-4 text-emerald-400" />
            <span>Target Reservoir Entry Parameters</span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">Target Formation Top:</span>
              <span className="text-slate-200 font-medium">Arab-D Carbonate (Jurassic)</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">Target TVD Depth:</span>
              <span className="text-emerald-400 font-mono">3,870.0 m (12,696 ft)</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">Entry Tolerance Box (Vertical):</span>
              <span className="text-sky-300 font-mono">+/- 5.0 m</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">Entry Tolerance Box (Horizontal):</span>
              <span className="text-sky-300 font-mono">+/- 15.0 m</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">Target Landing Inclination:</span>
              <span className="text-amber-300 font-mono">82.5° @ 124.0° Azimuth</span>
            </div>
          </div>
        </div>

        {/* Drainage & Production Objectives */}
        <div className="p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-sky-950/40 text-slate-200 font-medium">
            <Compass className="w-4 h-4 text-sky-400" />
            <span>Reservoir Contact & Completion Goals</span>
          </div>

          <div className="space-y-2 text-[11px]">
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">Net Horizontal Drain Length:</span>
              <span className="text-slate-200 font-mono">1,240 m (4,068 ft)</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">Expected Reservoir Pressure:</span>
              <span className="text-slate-200 font-mono">8,120 psi (1.28 sg eq.)</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">Reservoir Fluid Type:</span>
              <span className="text-slate-200">Light Arab Crude (32° API, 2.5% H2S)</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">Completion Type Planned:</span>
              <span className="text-slate-200">Standalone Pre-packed Screens with ICDs</span>
            </div>
            <div className="flex justify-between p-2 rounded bg-slate-900/60 border border-slate-800/60">
              <span className="text-slate-400">Expected Initial Production Rate:</span>
              <span className="text-emerald-400 font-mono">8,500 BOPD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
