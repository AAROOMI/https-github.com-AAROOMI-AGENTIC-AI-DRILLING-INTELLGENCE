import React from 'react';
import {
  ShieldCheck,
  Radio,
  Globe2,
  Cpu,
  Database,
  CloudOff,
  CheckCircle2,
  Volume2,
  BookOpen,
  Palette
} from 'lucide-react';
import { LanguageCode } from '../types';
import { CustomVoiceService } from '../services/voice/CustomVoiceService';
import { LocalLlmGateway } from '../services/llm/localLlmGateway';
import { FirebaseSync } from '../services/firebase/firebaseSync';

interface HeaderProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  airGapped: boolean;
  onToggleAirGapped: (enabled: boolean) => void;
  activeWellName: string;
  onOpenUserGuide?: () => void;
  onOpenThemeGuide?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLanguage,
  onLanguageChange,
  airGapped,
  onToggleAirGapped,
  activeWellName,
  onOpenUserGuide,
  onOpenThemeGuide
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const voiceConfig = CustomVoiceService.getConfig();
  const llmInfo = LocalLlmGateway.getModelInfo();
  const fbStatus = FirebaseSync.getStatus();

  return (
    <header className="h-14 border-b border-sky-950/40 bg-[#070e1b] px-4 flex items-center justify-between text-xs select-none">
      {/* Brand & Platform Identity */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          {/* Subtle technical logo mark */}
          <div className="w-7 h-7 rounded bg-gradient-to-br from-emerald-600 to-sky-600 flex items-center justify-center text-white text-xs">
            <Radio className="w-4 h-4 text-emerald-200 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white text-sm tracking-wide">aramco</span>
              <span className="text-slate-500">|</span>
              <span className="text-sky-300 text-xs">Drilling Intelligence & Well Design</span>
            </div>
            <div className="text-[10px] text-slate-400">
              Autonomous Well Engineering & Governed Agentic Force
            </div>
          </div>
        </div>

        {/* Active Well Badge */}
        <div className="hidden lg:flex items-center gap-2 ml-4 px-2.5 py-1 rounded bg-slate-900/80 border border-sky-900/40">
          <span className="text-slate-400 text-[11px]">{isRtl ? 'البئر النشط:' : 'Target Well:'}</span>
          <span className="text-emerald-400 text-[11px] font-mono">{activeWellName}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
        </div>
      </div>

      {/* Center Strategic Value Badges */}
      <div className="hidden xl:flex items-center gap-3 text-[11px] text-slate-300">
        <span className="px-2 py-0.5 rounded bg-sky-950/40 border border-sky-800/30 text-sky-300">
          {isRtl ? 'قرارات أكثر ذكاءً' : 'Smarter Decisions'}
        </span>
        <span className="px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/30 text-emerald-300">
          {isRtl ? 'عمليات أكثر أماناً' : 'Safer Operations'}
        </span>
        <span className="px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/30 text-cyan-300">
          {isRtl ? 'كفاءة تشغيلية أعلى' : 'Higher Efficiency'}
        </span>
      </div>

      {/* Right Controls: Connectivity, Voice, Language */}
      <div className="flex items-center gap-2">
        {/* Air-Gapped Mode Toggle */}
        <button
          onClick={() => onToggleAirGapped(!airGapped)}
          title="Toggle Air-Gapped Local Operation"
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors ${
            airGapped
              ? 'bg-amber-950/40 border-amber-700/60 text-amber-300'
              : 'bg-slate-900/60 border-slate-700/40 text-slate-300 hover:border-slate-600'
          }`}
        >
          {airGapped ? <CloudOff className="w-3.5 h-3.5 text-amber-400" /> : <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
          <span>{airGapped ? (isRtl ? 'معزول محلياً' : 'Air-Gapped') : (isRtl ? 'متصل' : 'On-Premise')}</span>
        </button>

        {/* Local LLM Mode Pill */}
        <div
          title={`LLM Engine: ${llmInfo.activeEngine}`}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/60 border border-sky-900/40 text-slate-300"
        >
          <Cpu className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-[11px] font-mono">
            {!llmInfo.isOnline || airGapped ? 'Local LLM' : 'Enterprise LLM'}
          </span>
        </div>

        {/* Firebase Backend Indicator */}
        <div
          title={`Firebase Backend: ${fbStatus.syncMode} (${fbStatus.projectId})`}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900/60 border border-emerald-900/40 text-slate-300"
        >
          <Database className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px] font-mono">Firebase Connected</span>
        </div>

        {/* Custom Voice Status Indicator */}
        <div
          title={`Custom Voice Identity: ${voiceConfig.speakerIdentity}`}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-sky-950/60 border border-cyan-800/40 text-cyan-300"
        >
          <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-[11px] hidden sm:inline">My Voice: Cloned</span>
        </div>

        {/* Audio-Visual User Guide Trigger Button */}
        {onOpenUserGuide && (
          <button
            onClick={onOpenUserGuide}
            title="Open Audio-Visual User Guide"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-950/70 border border-emerald-700/60 hover:bg-emerald-900/60 text-emerald-300 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-[11px] hidden md:inline">{isRtl ? 'دليل الاستخدام الصوتي' : 'Audio User Guide'}</span>
          </button>
        )}

        {/* Web-Ready Theme Specification Guide Button */}
        {onOpenThemeGuide && (
          <button
            onClick={onOpenThemeGuide}
            title="Open Web-Ready Theme Specification & Style Guide"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-700/50 hover:bg-amber-900/60 text-amber-300 transition-colors"
          >
            <Palette className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-[11px] hidden lg:inline">{isRtl ? 'دليل السمة (13 عنصر)' : 'Theme Guide'}</span>
          </button>
        )}

        {/* Language Switcher */}
        <div className="flex items-center bg-slate-900/80 border border-slate-700/50 rounded p-0.5">
          <Globe2 className="w-3 h-3 text-slate-400 ml-1.5 mr-0.5" />
          <button
            onClick={() => onLanguageChange('en')}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              currentLanguage === 'en' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => onLanguageChange('ar')}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              currentLanguage === 'ar' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            عربي
          </button>
          <button
            onClick={() => onLanguageChange('ar-najdi')}
            className={`px-2 py-0.5 rounded text-[11px] transition-colors ${
              currentLanguage === 'ar-najdi' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Saudi Arabic (Najdi Dialect)"
          >
            نجدي
          </button>
        </div>
      </div>
    </header>
  );
};
