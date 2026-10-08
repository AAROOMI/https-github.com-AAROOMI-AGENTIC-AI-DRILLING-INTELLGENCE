import React from 'react';
import { History, BookOpen, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { LanguageCode } from '../../types';

interface HistoricalIntelligenceViewProps {
  currentLanguage: LanguageCode;
}

export const HistoricalIntelligenceView: React.FC<HistoricalIntelligenceViewProps> = ({
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';

  const lessons = [
    {
      title: 'Hith Anhydrite Lost Circulation Mitigation',
      frequency: 'Encountered in 6 of 28 wells',
      remedy: 'Pre-treat mud active system with 25 lb/bbl coarse calcium carbonate (CaCO3) prior to penetrating 2,340 m. Kept static losses below 15 bbl/hr.',
      impact: 'Saved average of 42 rig hours in intermediate sections.'
    },
    {
      title: 'Biyadh Permeable Sandstone Differential Sticking',
      frequency: 'Encountered in 3 of 28 wells',
      remedy: 'Maintain low fluid loss (< 3.5 cc API) and restrict overbalance differential pressure to less than 350 psi across 2,980 - 3,320 m interval.',
      impact: 'Zero stuck pipe incidents recorded when lubricant concentration held at 2.5%.'
    },
    {
      title: 'Optimal Bit & BHA Selection for Arab-D Horizontal Drain',
      frequency: 'Field benchmark',
      remedy: '5-blade 16mm PDC matrix bit with Point-the-Bit Rotary Steerable System (RSS) delivered 18.5 m/hr average ROP in lateral section.',
      impact: 'Completed horizontal drain in single bit run.'
    },
    {
      title: 'H2S Sour Gas Reservoir Well Control Baseline',
      frequency: 'Mandatory standard',
      remedy: 'Displace to 1.36 sg mud weight prior to milling 9-5/8" shoe track. Verify degasser vacuum efficiency and flare igniter circuits.',
      impact: '100% well integrity compliance across all historic completions.'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'المرحلة 03: ذكاء الآبار التاريخية والدروس المستفادة' : 'Phase 03: Historical Well Intelligence & Lessons Learned Mining'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'تحليل استرجاعي لبيانات 28 بئراً تاريخية محفورة في قطاع عثمانية بجنوب الغوار.'
              : 'Synthesized telemetry and End-of-Well Reports (EOWR) across 28 offset wells drilled in the field.'}
          </div>
        </div>
        <div className="text-[11px] text-sky-400 font-mono">
          28 Historical Wells Cataloged
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {lessons.map((les, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 space-y-2 text-xs"
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-sky-950/40">
              <span className="text-slate-200 font-normal">{les.title}</span>
              <span className="text-[10px] text-amber-400 font-mono">{les.frequency}</span>
            </div>

            <div className="text-[11px] text-slate-400 leading-relaxed">
              <strong className="text-slate-300">Engineering Action: </strong>
              {les.remedy}
            </div>

            <div className="pt-1.5 border-t border-slate-800/60 text-[10px] text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 shrink-0" />
              <span>{les.impact}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
