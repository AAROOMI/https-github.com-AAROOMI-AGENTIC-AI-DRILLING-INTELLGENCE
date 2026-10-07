import React from 'react';
import {
  Compass,
  Gauge,
  Layers,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  FileText,
  Sliders
} from 'lucide-react';
import { LanguageCode } from '../../types';
import {
  SYNTHETIC_ACTIVE_WELL,
  SYNTHETIC_CASING_SECTIONS,
  SYNTHETIC_FORMATION_TOPS,
  SYNTHETIC_OFFSET_WELLS,
  SYNTHETIC_WORKFLOW_PHASES
} from '../../services/data/initialSyntheticData';
import { NavViewId } from '../Sidebar';

interface DashboardViewProps {
  currentLanguage: LanguageCode;
  onNavigate: (view: NavViewId) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentLanguage,
  onNavigate
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const well = SYNTHETIC_ACTIVE_WELL;

  return (
    <div className="space-y-4">
      {/* Top Executive KPI Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
        <div className="p-3 rounded bg-[#091322] border border-sky-950/60">
          <div className="text-[10px] text-slate-400">{isRtl ? 'البئر المستهدف' : 'Target Well'}</div>
          <div className="text-sm text-sky-300 font-mono mt-0.5">{well.name}</div>
          <div className="text-[10px] text-slate-500 mt-1">{well.field}</div>
        </div>

        <div className="p-3 rounded bg-[#091322] border border-sky-950/60">
          <div className="text-[10px] text-slate-400">{isRtl ? 'جاهزية البئر' : 'Well Readiness'}</div>
          <div className="text-sm text-emerald-400 font-mono mt-0.5 flex items-center gap-1.5">
            <span>{well.readinessScore}%</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-[10px] text-emerald-500 mt-1">{isRtl ? 'جاهز للاعتماد' : 'Ready for Sign-off'}</div>
        </div>

        <div className="p-3 rounded bg-[#091322] border border-sky-950/60">
          <div className="text-[10px] text-slate-400">{isRtl ? 'العمق المستهدف (TVD)' : 'Target Depth (TVD)'}</div>
          <div className="text-sm text-slate-200 font-mono mt-0.5">3,870 m</div>
          <div className="text-[10px] text-slate-500 mt-1">12,696 ft (Arab-D)</div>
        </div>

        <div className="p-3 rounded bg-[#091322] border border-sky-950/60">
          <div className="text-[10px] text-slate-400">{isRtl ? 'العمق المقاس (MD)' : 'Measured Depth (MD)'}</div>
          <div className="text-sm text-slate-200 font-mono mt-0.5">6,420 m</div>
          <div className="text-[10px] text-slate-500 mt-1">Inclination: 82.5°</div>
        </div>

        <div className="p-3 rounded bg-[#091322] border border-sky-950/60">
          <div className="text-[10px] text-slate-400">{isRtl ? 'وزن الطين الموصى به' : 'Mud Weight Window'}</div>
          <div className="text-sm text-cyan-300 font-mono mt-0.5">1.32 - 1.46 sg</div>
          <div className="text-[10px] text-cyan-500 mt-1">11.0 - 12.2 ppg</div>
        </div>

        <div className="p-3 rounded bg-[#091322] border border-sky-950/60">
          <div className="text-[10px] text-slate-400">{isRtl ? 'التصميم المعتمد' : 'Selected Profile'}</div>
          <div className="text-sm text-amber-300 font-mono mt-0.5">K-2 Slim (92%)</div>
          <div className="text-[10px] text-slate-500 mt-1">{isRtl ? '4 مقاطع أغلفة' : '4 Casing Strings'}</div>
        </div>
      </div>

      {/* 12-Phase Workflow Linear Mini-Tracker */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60">
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-200">
              {isRtl ? 'مسار هندسة الحفر المعتمد (12 مرحلة)' : '12-Phase Governed Engineering Workflow'}
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/50 text-emerald-300 border border-emerald-800/40">
              {isRtl ? '10 مراحل مكتملة • مرحلة قيد المراجعة' : '10 Completed • 1 In Review • 1 Pending'}
            </span>
          </div>
          <button
            onClick={() => onNavigate('workflow')}
            className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors"
          >
            <span>{isRtl ? 'عرض المسار الكامل' : 'Open Pipeline'}</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-1.5">
          {SYNTHETIC_WORKFLOW_PHASES.map((p) => {
            const isCompleted = p.status === 'COMPLETED';
            const isHumanReview = p.status === 'HUMAN_REVIEW';
            return (
              <div
                key={p.id}
                onClick={() => onNavigate(p.id as NavViewId)}
                className={`p-2 rounded border cursor-pointer transition-all text-left ${
                  isHumanReview
                    ? 'bg-amber-950/30 border-amber-600/60 hover:bg-amber-950/50'
                    : isCompleted
                    ? 'bg-slate-900/40 border-emerald-900/40 hover:border-emerald-700/50'
                    : 'bg-slate-900/20 border-slate-800/40 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">#{p.order}</span>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  ) : isHumanReview ? (
                    <Clock className="w-3 h-3 text-amber-400 animate-spin" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  )}
                </div>
                <div className="text-[11px] text-slate-200 truncate mt-1">
                  {isRtl ? p.nameAr : p.nameEn}
                </div>
                <div className="text-[9px] text-slate-400 truncate mt-0.5">
                  {p.agentName.replace(' Agent', '')}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid of Technical Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Panel 1: Offset Well Similarity Ranking */}
        <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-sky-950/40">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-sky-400" />
              <span className="text-xs text-slate-200">
                {isRtl ? 'الآبار المجاورة ونسب التشابه' : 'Offset Well Similarity Ranking'}
              </span>
            </div>
            <button
              onClick={() => onNavigate('offset-analysis')}
              className="text-[11px] text-sky-400 hover:text-sky-300"
            >
              {isRtl ? 'التفاصيل' : 'Details'}
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {SYNTHETIC_OFFSET_WELLS.map((off) => (
              <div
                key={off.id}
                className="p-2 rounded bg-slate-900/60 border border-slate-800/60 flex items-center justify-between"
              >
                <div>
                  <div className="text-slate-200 flex items-center gap-1.5">
                    <span>{off.name}</span>
                    <span className="text-[10px] text-slate-500">({off.distanceKm} km)</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[200px]">
                    {off.keyTroubles[0]}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-emerald-400 font-mono text-xs">{off.similarityScore}%</div>
                  <div className="w-16 bg-slate-800 h-1 rounded-full overflow-hidden mt-1">
                    <div
                      className="bg-emerald-500 h-full rounded-full"
                      style={{ width: `${off.similarityScore}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Panel 2: Pressure vs Depth & Mud Operating Window */}
        <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-sky-950/40">
            <div className="flex items-center gap-2">
              <Gauge className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-slate-200">
                {isRtl ? 'نافذة الضغوط وطين الحفر' : 'Pressure & Mud Weight Window'}
              </span>
            </div>
            <button
              onClick={() => onNavigate('pressure-mudweight')}
              className="text-[11px] text-sky-400 hover:text-sky-300"
            >
              {isRtl ? 'المخطط الكامل' : 'Full Curve'}
            </button>
          </div>

          <div className="space-y-2 text-xs flex-1">
            <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800/60">
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Pore Pressure (Arab-D):</span>
                <span className="font-mono text-sky-300">1.28 sg (10.68 ppg)</span>
              </div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Fracture Gradient (LOT):</span>
                <span className="font-mono text-rose-300">1.74 sg (14.50 ppg)</span>
              </div>
              <div className="flex justify-between text-emerald-300">
                <span>Recommended Mud Weight:</span>
                <span className="font-mono">1.36 sg (11.35 ppg)</span>
              </div>
            </div>

            <div className="p-2 rounded bg-slate-900/40 text-[11px] text-slate-400 leading-relaxed border border-slate-800/40">
              {isRtl
                ? 'يوفر وزن الطين هامش أمان قدره 250 رطل/بوصة مربعة ضد التدفقات الغازية مع البقاء بأمان دون ضغط كسر الطبقات.'
                : 'Provides 250 psi trip overbalance against Arab-D gas kick surges while maintaining 480 psi buffer below fracture breakdown pressure.'}
            </div>
          </div>
        </div>

        {/* Panel 3: Casing Schematic Summary */}
        <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 flex flex-col">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-sky-950/40">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-200">
                {isRtl ? 'برنامج تغليف البئر (K-2)' : 'Casing Architecture (K-2)'}
              </span>
            </div>
            <button
              onClick={() => onNavigate('casing-hole-grade')}
              className="text-[11px] text-sky-400 hover:text-sky-300"
            >
              {isRtl ? 'المواصفات' : 'Schematic'}
            </button>
          </div>

          <div className="space-y-1.5 text-xs flex-1">
            {SYNTHETIC_CASING_SECTIONS.map((c) => (
              <div
                key={c.id}
                className="p-1.5 rounded bg-slate-900/60 border border-slate-800/60 flex items-center justify-between"
              >
                <div>
                  <span className="text-slate-200">{c.sectionName}</span>
                  <span className="text-slate-400 text-[10px] ml-1.5 font-mono">
                    {c.casingSizeInches}" ({c.casingGrade})
                  </span>
                </div>
                <div className="text-slate-300 text-[11px] font-mono">
                  {c.topDepthM}-{c.shoeDepthM} m
                </div>
              </div>
            ))}

            <div className="mt-2 p-2 rounded bg-emerald-950/30 border border-emerald-900/50 flex items-center justify-between text-[11px]">
              <span className="text-emerald-300">{isRtl ? 'بوابة الاعتماد:' : 'Approval Gate:'}</span>
              <button
                onClick={() => onNavigate('human-approval')}
                className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] transition-colors"
              >
                {isRtl ? 'مراجعة وتوقيع' : 'Review & Sign-off'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
