import React, { useState } from 'react';
import { Terminal, ShieldCheck, Play, AlertCircle, Database, CheckCircle2, History } from 'lucide-react';
import { LanguageCode } from '../../types';
import { SecureSqlAgent, SqlQueryResult } from '../../services/sql/secureSqlAgent';

interface SqlWorkspaceViewProps {
  currentLanguage: LanguageCode;
}

export const SqlWorkspaceView: React.FC<SqlWorkspaceViewProps> = ({
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [naturalPrompt, setNaturalPrompt] = useState('Show all offset wells within 10 km ordered by similarity');
  const [queryResult, setQueryResult] = useState<SqlQueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const samplePrompts = [
    'Show all offset wells within 10 km ordered by similarity',
    'List all casing sections with shoe depths and burst ratings',
    'Show formation pressure and mud weight records',
    'List formation tops and known drilling hazards'
  ];

  const handleExecute = async (promptToRun?: string) => {
    const q = promptToRun || naturalPrompt;
    if (!q.trim()) return;

    setIsExecuting(true);
    try {
      const res = await SecureSqlAgent.executeNaturalLanguageQuery(q);
      setQueryResult(res);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'وكيل استعلامات SQL الآمن (Secure Natural Language SQL Agent)' : 'Secure Natural Language SQL Agent & Query Sandbox'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'تحويل الأسئلة باللغة الطبيعية إلى استعلامات SQL آمنة للقراءة فقط مع حظر كامل لكافة أوامر التعديل والحذف.'
              : 'Strict READ-ONLY AST validation engine blocking DDL/DML injections (DROP, DELETE, UPDATE, ALTER).'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs font-mono">
            Read-Only Enforced
          </span>
        </div>
      </div>

      {/* Query Input Section */}
      <div className="p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={naturalPrompt}
            onChange={(e) => setNaturalPrompt(e.target.value)}
            placeholder="Ask a database question in plain English or Arabic..."
            className="flex-1 bg-slate-900 border border-slate-800 rounded px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-600"
          />
          <button
            onClick={() => handleExecute()}
            disabled={isExecuting || !naturalPrompt.trim()}
            className="px-4 py-2 rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white text-xs flex items-center gap-1.5 transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Execute</span>
          </button>
        </div>

        {/* Quick Sample Prompts */}
        <div className="flex flex-wrap gap-1.5 text-[10px]">
          <span className="text-slate-500 py-0.5">Quick Queries:</span>
          {samplePrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => {
                setNaturalPrompt(p);
                handleExecute(p);
              }}
              className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-300 transition-colors"
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Query Results & Generated SQL */}
      {queryResult && (
        <div className="p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-sky-950/40 text-xs">
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-sky-400" />
              <span className="text-slate-200">Generated Safe SQL Statement:</span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Latency: {queryResult.executionTimeMs}ms • Rows: {queryResult.rowCount}
            </div>
          </div>

          <pre className="p-2.5 rounded bg-[#050a13] border border-slate-900 text-sky-300 font-mono text-[11px] overflow-x-auto">
            {queryResult.sql}
          </pre>

          {/* Results Table */}
          {queryResult.success ? (
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-sky-950/50 text-[10px] text-slate-500">
                    {queryResult.columns.map((col) => (
                      <th key={col} className="pb-1.5 uppercase">{col.replace(/_/g, ' ')}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40 text-slate-300">
                  {queryResult.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-900/40">
                      {queryResult.columns.map((col) => (
                        <td key={col} className="py-1.5 text-[11px]">
                          {String(row[col] ?? '')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-3 rounded bg-rose-950/30 border border-rose-800/50 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{queryResult.error}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
