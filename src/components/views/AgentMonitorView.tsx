import React, { useState, useEffect } from 'react';
import { Cpu, Activity, CheckCircle2, AlertTriangle, ShieldCheck, Clock, Terminal } from 'lucide-react';
import { AgentExecutionLog, LanguageCode } from '../../types';
import { AgenticForce } from '../../services/agentic/AgenticForce';
import { SPECIALIZED_AGENTS, SpecializedAgentDef } from '../../services/agentic/specializedAgents';

interface AgentMonitorViewProps {
  currentLanguage: LanguageCode;
}

export const AgentMonitorView: React.FC<AgentMonitorViewProps> = ({
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [logs, setLogs] = useState<AgentExecutionLog[]>(AgenticForce.getExecutionLogs());
  const [selectedAgent, setSelectedAgent] = useState<SpecializedAgentDef>(SPECIALIZED_AGENTS[0]);

  useEffect(() => {
    const unsub = AgenticForce.subscribe(() => {
      setLogs(AgenticForce.getExecutionLogs());
    });
    return unsub;
  }, []);

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'مراقبة الوكلاء الأذكياء وقوة التنسيق (Agentic Force Control Room)' : 'Agentic Force Orchestrator & Multi-Agent Execution Graph'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'مراقبة حية لتنفيذ 19 وكيلاً هندسياً متخصصاً مع تتبع الأدلة والبراهين وسجلات التدقيق.'
              : 'Real-time telemetry across 19 specialized engineering agents with evidence tracking and execution audit trails.'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] text-emerald-400 font-mono">19 Agents Synchronized</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column: 19 Agents Grid */}
        <div className="lg:col-span-5 space-y-1.5 max-h-[520px] overflow-y-auto">
          {SPECIALIZED_AGENTS.map((agent) => {
            const isSelected = selectedAgent.id === agent.id;
            return (
              <div
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`p-2.5 rounded border cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-sky-950/70 border-sky-600/70 text-slate-100'
                    : 'bg-[#08101e] border-sky-950/50 hover:border-sky-800/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Cpu className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                    <span className="text-xs font-normal">{agent.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">
                    {agent.confidence}%
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 pl-5">
                  <span className="truncate max-w-[200px]">{agent.role}</span>
                  <span className="text-slate-500 font-mono">{agent.phase}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Selected Agent Deep Inspection & Live Logs */}
        <div className="lg:col-span-7 space-y-3">
          {/* Agent Deep Inspection Card */}
          <div className="p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-sky-950/40">
              <div>
                <span className="text-[10px] font-mono text-slate-500">AGENT SPECIFICATION</span>
                <div className="text-sm text-slate-100">{selectedAgent.name}</div>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                Confidence: {selectedAgent.confidence}%
              </span>
            </div>

            <div className="text-xs text-slate-300 leading-relaxed">
              {selectedAgent.description}
            </div>

            {/* Current Recommendation */}
            <div className="p-3 rounded bg-slate-900/60 border border-slate-800/60 space-y-1.5 text-xs">
              <div className="text-[10px] text-slate-500 uppercase font-mono">Current Recommendation Output:</div>
              <div className="text-slate-200 text-[11px] leading-relaxed">
                {selectedAgent.currentRecommendation}
              </div>
            </div>

            {/* Tools & Permissions */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800/50 space-y-1">
                <div className="text-[10px] text-slate-500">Bound Tools:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedAgent.tools.map((t) => (
                    <span key={t} className="px-1.5 py-0.2 rounded bg-slate-900 text-sky-300 font-mono text-[9px] border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-900/40 border border-slate-800/50 space-y-1">
                <div className="text-[10px] text-slate-500">Security Permissions:</div>
                <div className="flex flex-wrap gap-1">
                  {selectedAgent.permissions.map((p) => (
                    <span key={p} className="px-1.5 py-0.2 rounded bg-slate-900 text-emerald-300 font-mono text-[9px] border border-slate-800">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Execution Logs */}
          <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 space-y-2">
            <div className="text-xs text-slate-200 pb-1.5 border-b border-sky-950/40 flex items-center justify-between">
              <span>Agentic Force Execution Logs</span>
              <span className="text-[10px] text-slate-500 font-mono">{logs.length} entries recorded</span>
            </div>

            <div className="space-y-1.5 max-h-48 overflow-y-auto text-xs font-mono">
              {logs.slice(0, 8).map((log) => (
                <div
                  key={log.id}
                  className="p-2 rounded bg-slate-900/50 border border-slate-800/50 text-[11px] flex items-center justify-between"
                >
                  <div className="flex items-center gap-2 truncate max-w-[80%]">
                    <span className="text-sky-400">[{log.agentName.replace(' Agent', '')}]</span>
                    <span className="text-slate-300 truncate">{log.inputSummary}</span>
                  </div>
                  <span className="text-slate-500 text-[10px] shrink-0">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
