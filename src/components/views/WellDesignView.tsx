import React, { useState } from 'react';
import { Sliders, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, DollarSign, Calendar } from 'lucide-react';
import { LanguageCode, WellDesignCandidate } from '../../types';
import { SYNTHETIC_WELL_DESIGN_CANDIDATES } from '../../services/data/initialSyntheticData';

interface WellDesignViewProps {
  currentLanguage: LanguageCode;
  onSelectCandidateForApproval?: (candidate: WellDesignCandidate) => void;
}

export const WellDesignView: React.FC<WellDesignViewProps> = ({
  currentLanguage,
  onSelectCandidateForApproval
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [candidates, setCandidates] = useState<WellDesignCandidate[]>(SYNTHETIC_WELL_DESIGN_CANDIDATES);
  const [selectedCode, setSelectedCode] = useState<'K-3' | 'K-2' | 'MK-2'>('K-2');

  const selectedCandidate = candidates.find((c) => c.code === selectedCode) || candidates[0];

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'مقارنة واختيار تصميم البئر (Well Design Architecture Engine)' : 'Well Design Architecture & Casing Profile Selection'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'تقييم نماذج K-3، K-2، MK-2، K-1، MK-1 بالاعتماد على معايير أرامكو لتصميم الآبار ومطابقة التكاليف والأمان.'
              : 'Architectural evaluation across K-Series configurations benchmarking safety, drilling days, and tubular expenditures.'}
          </div>
        </div>
        <div className="text-[11px] text-amber-300 font-mono">
          Recommended: K-2 Profile (92% Confidence)
        </div>
      </div>

      {/* Candidate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {candidates.map((cand) => {
          const isSelected = selectedCode === cand.code;
          return (
            <div
              key={cand.code}
              onClick={() => setSelectedCode(cand.code as 'K-3' | 'K-2' | 'MK-2')}
              className={`p-3.5 rounded border cursor-pointer transition-all ${
                isSelected
                  ? 'bg-sky-950/60 border-sky-500 shadow-[0_0_15px_rgba(14,165,233,0.15)] text-slate-100'
                  : 'bg-[#08101e] border-sky-950/50 hover:border-sky-800/40 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between pb-2 border-b border-sky-950/40">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-mono text-sky-400">{cand.code}</span>
                  {cand.recommended && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 text-[10px]">
                      RECOMMENDED
                    </span>
                  )}
                </div>
                <span className="font-mono text-emerald-400 text-xs">{cand.confidencePercent}%</span>
              </div>

              <div className="text-xs text-slate-200 mt-2">{cand.name}</div>

              <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-800/60">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3 h-3 text-slate-500" />
                  <span>Cost: <span className="text-slate-200 font-mono">${cand.estimatedCostMM}M</span></span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-500" />
                  <span>Duration: <span className="text-slate-200 font-mono">{cand.drillingDays} days</span></span>
                </div>
              </div>

              <div className="mt-3 space-y-1 text-[10px] text-slate-400">
                <div className="text-slate-500">Casing Program:</div>
                {cand.casingScheme.map((cs, i) => (
                  <div key={i} className="text-slate-300 font-mono truncate">
                    • {cs}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deep Dive Analysis for Selected Candidate */}
      <div className="p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-sky-950/40">
          <div>
            <span className="text-[10px] font-mono text-slate-500">DEEP DIVE INSPECTION</span>
            <div className="text-sm text-slate-100">{selectedCandidate.name}</div>
          </div>
          <span className="text-xs font-mono text-emerald-400">
            Confidence: {selectedCandidate.confidencePercent}%
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Advantages */}
          <div className="p-3 rounded bg-slate-900/60 border border-slate-800/60 space-y-2">
            <div className="text-emerald-400 flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Engineering Advantages</span>
            </div>
            <div className="space-y-1.5">
              {selectedCandidate.advantages.map((adv, idx) => (
                <div key={idx} className="text-slate-300 text-[11px] flex items-start gap-1.5">
                  <span className="text-emerald-400 mt-0.5">•</span>
                  <span>{adv}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Risks */}
          <div className="p-3 rounded bg-slate-900/60 border border-slate-800/60 space-y-2">
            <div className="text-amber-400 flex items-center gap-1.5 text-xs">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Operational Risks & Mitigations</span>
            </div>
            <div className="space-y-1.5">
              {selectedCandidate.risks.map((risk, idx) => (
                <div key={idx} className="text-slate-300 text-[11px] flex items-start gap-1.5">
                  <span className="text-amber-400 mt-0.5">•</span>
                  <span>{risk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Applied Engineering Rules */}
        <div className="p-3 rounded bg-slate-900/40 border border-slate-800/50 space-y-1.5">
          <div className="text-[11px] text-slate-400">Aramco Governing Standards & Calculation Rules:</div>
          <div className="flex flex-wrap gap-1.5">
            {selectedCandidate.engineeringRulesApplied.map((rule, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded bg-sky-950/60 border border-sky-900/50 text-sky-300 text-[10px]"
              >
                {rule}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
