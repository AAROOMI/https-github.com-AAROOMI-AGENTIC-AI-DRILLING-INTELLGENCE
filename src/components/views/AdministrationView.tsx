import React, { useState } from 'react';
import {
  Settings,
  ShieldCheck,
  Cpu,
  Database,
  Download,
  Terminal,
  Monitor,
  CheckCircle2,
  Lock,
  Layers,
  Copy
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { LocalLlmGateway } from '../../services/llm/localLlmGateway';
import { FirebaseSync } from '../../services/firebase/firebaseSync';

interface AdministrationViewProps {
  currentLanguage: LanguageCode;
  airGapped: boolean;
  onToggleAirGapped: (enabled: boolean) => void;
}

export const AdministrationView: React.FC<AdministrationViewProps> = ({
  currentLanguage,
  airGapped,
  onToggleAirGapped
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [copyNotice, setCopyNotice] = useState<string | null>(null);
  const fbStatus = FirebaseSync.getStatus();

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyNotice(`Copied ${label} to clipboard.`);
    setTimeout(() => setCopyNotice(null), 2500);
  };

  const dockerComposeSnippet = `version: '3.8'
services:
  drilling-platform:
    build: .
    ports: ["3000:3000"]
    environment:
      - NODE_ENV=production
      - AIR_GAPPED=true
      - DATABASE_URL=postgresql://drilling_admin:SecureAramco2026@postgres:5432/drilling_intelligence
  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    volumes: [postgres_data:/var/lib/postgresql/data]
  ollama:
    image: ollama/ollama:latest
    ports: ["11434:11434"]
volumes:
  postgres_data:`;

  const windowsBatSnippet = `@echo off
title Aramco Agentic AI Drilling Intelligence (Windows Desktop)
start cmd /k "npm run dev"
timeout /t 3 >nul
start http://localhost:3000`;

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'إدارة المنظومة والأمان وحزم التوزيع (Enterprise Administration)' : 'Enterprise Administration, Security & Client Distribution Packages'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'تكوين النشر المعزول (Air-Gapped)، حزم Docker للعميل، وإصدار سطح المكتب المخصص لأنظمة Windows.'
              : 'Air-Gapped operational controls, RBAC governance, Docker deployment manifests, and Windows Desktop distribution.'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-sky-950/60 border border-sky-800/40 text-sky-300 text-xs font-mono">
            Security Tier: Aramco Level-4
          </span>
        </div>
      </div>

      {copyNotice && (
        <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{copyNotice}</span>
        </div>
      )}

      {/* Grid: Docker Package & Windows Desktop Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Docker Deployment Container Center */}
        <div className="p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-sky-950/40">
            <div className="flex items-center gap-2 text-xs text-slate-200 font-normal">
              <Terminal className="w-4 h-4 text-sky-400" />
              <span>Client Docker Deployment Package (Dockerfile & Compose)</span>
            </div>
            <button
              onClick={() => handleCopy(dockerComposeSnippet, 'docker-compose.yml')}
              className="text-[10px] text-sky-400 hover:text-sky-300 flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              <span>Copy Compose</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Multi-stage production Docker container enabling the client to run the complete platform on any Linux/Cloud workstation with zero external cloud dependencies.
          </p>

          <pre className="p-2.5 rounded bg-[#050a13] border border-slate-900 text-slate-300 font-mono text-[10px] overflow-x-auto max-h-40">
            {dockerComposeSnippet}
          </pre>

          <div className="space-y-1 text-[11px] text-slate-400 pt-2 border-t border-slate-800/60">
            <div>• <strong className="text-slate-300">Run via Docker: </strong> <code className="text-sky-300 font-mono text-[10px]">docker compose up -d</code></div>
            <div>• <strong className="text-slate-300">Export for offline rig: </strong> <code className="text-sky-300 font-mono text-[10px]">docker save -o aramco_drilling.tar</code></div>
          </div>
        </div>

        {/* Windows Desktop Packaging Center */}
        <div className="p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-sky-950/40">
            <div className="flex items-center gap-2 text-xs text-slate-200 font-normal">
              <Monitor className="w-4 h-4 text-emerald-400" />
              <span>Windows Desktop Native Version (.exe / Installer)</span>
            </div>
            <button
              onClick={() => handleCopy(windowsBatSnippet, 'launch-windows-desktop.bat')}
              className="text-[10px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <Copy className="w-3 h-3" />
              <span>Copy Launcher</span>
            </button>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            Engineers on offshore cyber rigs and field workstations can run this app as a standalone Windows application via Electron or the provided one-click launcher.
          </p>

          <div className="p-3 rounded bg-slate-900/60 border border-slate-800/60 space-y-2 text-xs">
            <div className="text-slate-200 font-normal flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Windows Build Specifications:</span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-400">
              <div>• Package Target: <span className="text-slate-200 font-mono">NSIS Standalone Installer (.exe)</span></div>
              <div>• Desktop Frame: <span className="text-slate-200 font-mono">Electron 30+ Secure Sandbox</span></div>
              <div>• Batch Runner: <span className="text-slate-200 font-mono">launch-windows-desktop.bat</span></div>
              <div>• Offline Mode: <span className="text-emerald-400 font-mono">100% Air-Gapped Capable</span></div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800/60 text-[10px] text-slate-500">
            Installer output path: <code className="text-slate-400 font-mono">/dist-electron/Aramco-Drilling-Setup.exe</code>
          </div>
        </div>
      </div>

      {/* Air-Gapped Mode & Backend Sync Settings */}
      <div className="p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-3">
        <div className="text-xs text-slate-200 font-normal pb-2 border-b border-sky-950/40">
          Security Environment & Persistence Configuration
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded bg-slate-900/60 border border-slate-800/60 space-y-2">
            <div className="text-slate-200 font-normal">Air-Gapped Operational Mode:</div>
            <div className="text-[11px] text-slate-400">
              When active, disables all external outbound network requests. Routes all AI reasoning strictly to the built-in Local LLM.
            </div>
            <button
              onClick={() => onToggleAirGapped(!airGapped)}
              className={`w-full py-1.5 rounded text-xs transition-colors ${
                airGapped
                  ? 'bg-amber-600 hover:bg-amber-500 text-white'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
              }`}
            >
              {airGapped ? 'Air-Gapped: ACTIVE' : 'Enable Air-Gapped Mode'}
            </button>
          </div>

          <div className="p-3 rounded bg-slate-900/60 border border-slate-800/60 space-y-2">
            <div className="text-slate-200 font-normal">Firebase Backend State:</div>
            <div className="text-[11px] text-slate-400">
              Project: <span className="text-emerald-400 font-mono">{fbStatus.projectId}</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Sync Mode: <span className="text-slate-200">{fbStatus.syncMode}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono">
              Last Synced: {new Date(fbStatus.lastSyncedAt).toLocaleTimeString()}
            </div>
          </div>

          <div className="p-3 rounded bg-slate-900/60 border border-slate-800/60 space-y-2">
            <div className="text-slate-200 font-normal">PostgreSQL Database:</div>
            <div className="text-[11px] text-slate-400">
              Schema: <span className="text-sky-300 font-mono">database/schema.sql (35 tables)</span>
            </div>
            <div className="text-[11px] text-slate-400">
              Relational migrations active with row-level security and immutable audit tables.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
