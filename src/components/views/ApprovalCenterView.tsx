import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  ShieldCheck,
  UserCheck,
  FileText,
  KeyRound,
  History
} from 'lucide-react';
import { ApprovalRecord, LanguageCode } from '../../types';
import { DrillingWorkflowEngine } from '../../services/workflow/DrillingWorkflowEngine';
import { NavViewId } from '../Sidebar';

interface ApprovalCenterViewProps {
  currentLanguage: LanguageCode;
  onNavigate: (view: NavViewId) => void;
}

export const ApprovalCenterView: React.FC<ApprovalCenterViewProps> = ({
  currentLanguage,
  onNavigate
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [comments, setComments] = useState('');
  const [engineerName, setEngineerName] = useState('Ahmad Al-Ghamdi');
  const [history, setHistory] = useState<ApprovalRecord[]>(DrillingWorkflowEngine.getApprovalHistory());
  const [decisionFeedback, setDecisionFeedback] = useState<string | null>(null);

  const handleDecision = (decision: 'APPROVED' | 'MODIFIED' | 'REJECTED' | 'REANALYZE') => {
    if (decision === 'APPROVED') {
      DrillingWorkflowEngine.executeFinalSignoff(engineerName, comments || 'Formally validated all engineering safety factors, casing designs, and trajectory.');
      setDecisionFeedback('Phase 11 Formally Approved. Drilling Program (Phase 12) is now compiled and ready for operational issuance.');
    } else {
      const res = DrillingWorkflowEngine.modifyPhase('well-design-selection', decision, {
        engineerName,
        comments: comments || `${decision} recorded by lead engineer.`
      });
      setDecisionFeedback(`Decision recorded: ${decision}. Affected downstream phases: ${res.affectedDownstreamPhases.join(', ')} marked for re-analysis.`);
    }

    setHistory(DrillingWorkflowEngine.getApprovalHistory());
    setComments('');
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'بوابة مراجعة واعتماد المهندس المختص (Human-in-the-Loop Gate)' : 'Human Approval Center & Governance Authority Gate'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'السلطة النهائية لمهندس الحفر: يمنع منعاً باتاً اعتماد القرارات آلياً دون توقيع المهندس البشري المسؤول.'
              : 'Engineering governance mandate: AI recommendations require verified human authority sign-off before field execution.'}
          </div>
        </div>
        <div className="text-[11px] text-amber-400 font-mono flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Gate Active: Pending Sign-off</span>
        </div>
      </div>

      {decisionFeedback && (
        <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{decisionFeedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column: Decision Package Summary */}
        <div className="lg:col-span-7 p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-sky-950/40">
            <div>
              <span className="text-[10px] font-mono text-slate-500">ENGINEERING GATE PACKAGE</span>
              <div className="text-sm text-slate-100">Well-102 Design Sign-off Candidate</div>
            </div>
            <span className="px-2.5 py-1 rounded bg-sky-950 text-sky-300 border border-sky-800/50 text-xs font-mono">
              Candidate: K-2 Profile
            </span>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded bg-slate-900/60 border border-slate-800/60 space-y-2 text-slate-300">
              <div className="text-slate-200 font-medium">Executive AI Recommendation:</div>
              <p className="leading-relaxed text-[11px] text-slate-300">
                Deploy K-2 Slim/Optimized profile with 4 casing strings (20", 13-3/8", 9-5/8", 7" Q-125 Liner).
                Recommended mud weight is 1.36 sg (11.35 ppg) honoring Arab-D 1.28 sg pore pressure and providing 250 psi overbalance margin.
                3D Trajectory reaches 3,870 m TVD / 6,420 m MD with max DLS 0.83°/30m.
              </p>
              <div className="flex items-center gap-3 pt-2 text-[10px] text-slate-400 border-t border-slate-800/60">
                <span>Confidence: <strong className="text-emerald-400">92%</strong></span>
                <span>Analog: <strong className="text-sky-400">GHWR-088 (92%)</strong></span>
                <span>Readiness: <strong className="text-emerald-400">92%</strong></span>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-slate-400">Authorized Engineer Credentials:</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  value={engineerName}
                  onChange={(e) => setEngineerName(e.target.value)}
                  className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
                  placeholder="Engineer Name"
                />
                <input
                  type="text"
                  readOnly
                  value="Lead Drilling Engineer (KSA-ENG-4912)"
                  className="bg-slate-900/40 border border-slate-800/50 rounded px-2.5 py-1.5 text-xs text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] text-slate-400">Engineering Review Comments / Override Justification:</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                placeholder="Enter formal engineering approval rationale or modification directions..."
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-sky-600"
              />
            </div>
          </div>

          {/* Action Decision Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-sky-950/40">
            <button
              onClick={() => handleDecision('APPROVED')}
              className="py-2 px-3 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isRtl ? 'اعتماد التصميم' : 'Approve'}</span>
            </button>

            <button
              onClick={() => handleDecision('MODIFIED')}
              className="py-2 px-3 rounded bg-sky-700 hover:bg-sky-600 text-white text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <span>{isRtl ? 'تعديل المعايير' : 'Modify'}</span>
            </button>

            <button
              onClick={() => handleDecision('REANALYZE')}
              className="py-2 px-3 rounded bg-amber-700 hover:bg-amber-600 text-white text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{isRtl ? 'إعادة التحليل' : 'Re-analyze'}</span>
            </button>

            <button
              onClick={() => handleDecision('REJECTED')}
              className="py-2 px-3 rounded bg-rose-700 hover:bg-rose-600 text-white text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>{isRtl ? 'رفض' : 'Reject'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Immutable Audit History */}
        <div className="lg:col-span-5 p-4 rounded bg-[#08101e] border border-sky-950/60 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-sky-950/40">
              <div className="flex items-center gap-2">
                <History className="w-4 h-4 text-sky-400" />
                <span className="text-xs text-slate-200">Immutable Audit Ledger</span>
              </div>
              <KeyRound className="w-3.5 h-3.5 text-slate-500" />
            </div>

            <div className="space-y-2 overflow-y-auto max-h-72 text-xs">
              {history.map((rec) => (
                <div
                  key={rec.id}
                  className="p-2.5 rounded bg-slate-900/60 border border-slate-800/60 space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-mono text-[11px]">{rec.decision}</span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(rec.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-300">{rec.comments}</div>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/50">
                    <span>{rec.engineerName}</span>
                    <span className="font-mono text-[9px] text-slate-400">Sig: {rec.signatureHash}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-sky-950/40 flex items-center justify-between text-xs">
            <span className="text-slate-400">Next Stage:</span>
            <button
              onClick={() => onNavigate('drilling-program')}
              className="text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              <span>{isRtl ? 'عرض برنامج الحفر' : 'Drilling Program'}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
