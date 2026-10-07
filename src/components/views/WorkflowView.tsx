import React, { useState, useEffect } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { LanguageCode, PhaseStatus, WorkflowPhase } from '../../types';
import { DrillingWorkflowEngine } from '../../services/workflow/DrillingWorkflowEngine';
import { NavViewId } from '../Sidebar';

interface WorkflowViewProps {
  currentLanguage: LanguageCode;
  onNavigate: (view: NavViewId) => void;
}

export const WorkflowView: React.FC<WorkflowViewProps> = ({
  currentLanguage,
  onNavigate
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [phases, setPhases] = useState<WorkflowPhase[]>(DrillingWorkflowEngine.getPhases());
  const [selectedPhase, setSelectedPhase] = useState<WorkflowPhase>(phases[10] || phases[0]);

  useEffect(() => {
    const unsub = DrillingWorkflowEngine.subscribe((updated) => {
      setPhases(updated);
      setSelectedPhase((prev) => updated.find((p) => p.id === prev.id) || updated[0]);
    });
    return unsub;
  }, []);

  const getStatusBadge = (status: PhaseStatus) => {
    switch (status) {
      case 'COMPLETED':
        return <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-[10px]">COMPLETED</span>;
      case 'APPROVED':
        return <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-[10px]">APPROVED</span>;
      case 'HUMAN_REVIEW':
        return <span className="px-2 py-0.5 rounded bg-amber-950/60 border border-amber-800/40 text-amber-300 text-[10px] animate-pulse">HUMAN REVIEW</span>;
      case 'AGENT_REVIEW':
        return <span className="px-2 py-0.5 rounded bg-sky-950/60 border border-sky-800/40 text-sky-300 text-[10px]">AGENT REVIEW</span>;
      case 'MODIFIED':
        return <span className="px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40 text-purple-300 text-[10px]">MODIFIED</span>;
      case 'REJECTED':
        return <span className="px-2 py-0.5 rounded bg-rose-950/60 border border-rose-800/40 text-rose-300 text-[10px]">REJECTED</span>;
      default:
        return <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-500 text-[10px]">PENDING</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'محرك مسار الحفر الذكي (12 مرحلة)' : '12-Phase Governed Drilling Engineering Pipeline'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'تتبع تبعيات المراحل وإعادة التقييم التلقائي للمراحل اللاحقة عند حدوث أي تعديل هندسي.'
              : 'Deterministic phase execution with dependency tracking, downstream invalidation, and human sign-off gates.'}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-emerald-400 font-mono">10 / 12 Approved</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column: 12 Phases List */}
        <div className="lg:col-span-5 space-y-1.5">
          {phases.map((p) => {
            const isSelected = selectedPhase.id === p.id;
            return (
              <div
                key={p.id}
                onClick={() => setSelectedPhase(p)}
                className={`p-2.5 rounded border cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-sky-950/70 border-sky-600/70 text-slate-100'
                    : 'bg-[#08101e] border-sky-950/50 hover:border-sky-800/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500 w-5">#{p.order}</span>
                    <span className="text-xs">{isRtl ? p.nameAr : p.nameEn}</span>
                  </div>
                  {getStatusBadge(p.status)}
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 pl-7">
                  <span>{p.agentName}</span>
                  <span className="font-mono">{p.progressPercent}%</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Phase Detailed Inspector */}
        <div className="lg:col-span-7 p-4 rounded bg-[#08101e] border border-sky-950/60 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-sky-950/40">
              <div>
                <span className="text-[10px] font-mono text-sky-400">PHASE #{selectedPhase.order}</span>
                <div className="text-sm text-slate-100 mt-0.5">
                  {isRtl ? selectedPhase.nameAr : selectedPhase.nameEn}
                </div>
              </div>
              {getStatusBadge(selectedPhase.status)}
            </div>

            <div className="space-y-2 text-xs">
              <div className="text-[11px] text-slate-400">Summary & Recommendation:</div>
              <div className="p-3 rounded bg-slate-900/60 border border-slate-800/60 text-slate-200 leading-relaxed text-xs">
                {selectedPhase.summary}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800/50">
                <div className="text-[10px] text-slate-500">Responsible Agent:</div>
                <div className="text-slate-200 mt-0.5">{selectedPhase.agentName}</div>
              </div>
              <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800/50">
                <div className="text-[10px] text-slate-500">Last Updated:</div>
                <div className="text-slate-200 font-mono mt-0.5 text-[11px]">
                  {new Date(selectedPhase.lastUpdated).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <div className="text-[10px] text-slate-500">Dependencies:</div>
              <div className="flex flex-wrap gap-1">
                {selectedPhase.dependencies.length > 0 ? (
                  selectedPhase.dependencies.map((dep) => (
                    <span
                      key={dep}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 text-[10px] font-mono"
                    >
                      {dep}
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 text-[11px]">Initial root phase (No dependencies)</span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-sky-950/40 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">
              Interactive workspace available for this phase.
            </span>
            <button
              onClick={() => onNavigate(selectedPhase.id as NavViewId)}
              className="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs flex items-center gap-1.5 transition-colors"
            >
              <span>{isRtl ? 'فتح مساحة العمل' : 'Launch Workspace'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
