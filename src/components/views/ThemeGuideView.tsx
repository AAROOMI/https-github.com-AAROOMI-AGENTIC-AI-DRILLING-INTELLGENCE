import React, { useState } from 'react';
import {
  Palette,
  Layers,
  Sparkles,
  Sliders,
  Copy,
  Check,
  Download,
  Info,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  TrendingUp,
  Activity,
  Code2,
  Eye,
  FileCode2
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { WEB_READY_THEME, WebReadyThemeDefinition } from '../../theme/themeConfig';

interface ThemeGuideViewProps {
  currentLanguage: LanguageCode;
}

export const ThemeGuideView: React.FC<ThemeGuideViewProps> = ({ currentLanguage }) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const theme = WEB_READY_THEME;

  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'export'>('visual');
  const [testHoverItem, setTestHoverItem] = useState<number>(0);
  const [exportFormat, setExportFormat] = useState<'json' | 'css' | 'tailwind'>('json');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(label);
    setTimeout(() => {
      setCopiedToken(null);
    }, 2000);
  };

  const getExportString = (): string => {
    if (exportFormat === 'json') {
      return JSON.stringify(theme, null, 2);
    } else if (exportFormat === 'css') {
      return `:root {
  /* 1. Primary background */
  --theme-bg-primary: ${theme.primaryBackground.base.hex};
  --theme-bg-primary-surface: ${theme.primaryBackground.surface.hex};
  --theme-bg-primary-deep: ${theme.primaryBackground.deep.hex};

  /* 2. Secondary background */
  --theme-bg-secondary: ${theme.secondaryBackground.base.hex};
  --theme-bg-secondary-elevated: ${theme.secondaryBackground.elevated.hex};

  /* 3. Primary/secondary green */
  --theme-green-primary: ${theme.greens.primaryAramco.hex};
  --theme-green-primary-hover: ${theme.greens.primaryHover.hex};
  --theme-green-secondary: ${theme.greens.secondaryEmerald.hex};

  /* 4. Gold/yellow accent */
  --theme-gold-accent: ${theme.goldAccents.primaryGold.hex};
  --theme-gold-light: ${theme.goldAccents.goldLight.hex};
  --theme-yellow-energy: ${theme.goldAccents.yellowEnergy.hex};

  /* 5. Dark text */
  --theme-text-dark-primary: ${theme.darkText.primary.hex};
  --theme-text-on-gold: ${theme.darkText.onGold.hex};

  /* 6. Light text */
  --theme-text-light-primary: ${theme.lightText.primary.hex};
  --theme-text-light-secondary: ${theme.lightText.secondary.hex};
  --theme-text-light-muted: ${theme.lightText.muted.hex};

  /* 7. Cards/panels */
  --theme-card-bg: ${theme.cardsPanels.bgBase};
  --theme-card-border: ${theme.cardsPanels.borderBase};

  /* 8. Borders/dividers */
  --theme-border-subtle: ${theme.bordersDividers.subtle};
  --theme-border-standard: ${theme.bordersDividers.standard};

  /* 10. Status colors */
  --theme-status-success: ${theme.statusColors.success.main.hex};
  --theme-status-warning: ${theme.statusColors.warning.main.hex};
  --theme-status-danger: ${theme.statusColors.danger.main.hex};
  --theme-status-info: ${theme.statusColors.info.main.hex};
}`;
    } else {
      return `// Tailwind CSS Theme Extension Token Map
module.exports = {
  theme: {
    extend: {
      colors: {
        aramco: {
          primary: '${theme.greens.primaryAramco.hex}',
          hover: '${theme.greens.primaryHover.hex}',
          secondary: '${theme.greens.secondaryEmerald.hex}',
          gold: '${theme.goldAccents.primaryGold.hex}',
          yellow: '${theme.goldAccents.yellowEnergy.hex}',
          dark: '${theme.primaryBackground.base.hex}',
          navy: '${theme.secondaryBackground.base.hex}',
          surface: '${theme.secondaryBackground.elevated.hex}',
        }
      }
    }
  }
};`;
    }
  };

  return (
    <div className="space-y-6 text-xs">
      {/* Top Banner & Overview */}
      <div className="theme-card p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 tracking-wider">
                {isRtl ? 'نظام السمة المعتمد للويب' : 'WEB-READY THEME SYSTEM'}
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-amber-400">
                {isRtl ? 'المواصفات الرسمية الـ 13' : '13 Complete Specifications'}
              </span>
            </div>
            <h1 className="text-sm text-slate-100 font-normal">
              {isRtl
                ? 'دليل سمة التصميم المتكامل لمنصة حفر أرامكو السعودية'
                : 'Saudi Aramco Drilling Intelligence Web-Ready Theme Specification'}
            </h1>
            <p className="text-slate-400 text-xs mt-1 max-w-3xl font-normal leading-relaxed">
              {isRtl
                ? 'تم تحديد كافة العناصر الـ 13 بدقة هندسية عالية: الخلفيات الأساسية والثانوية، اللون الأخضر الأساسي والثانوي، لمسات الذهب والأصفر، النصوص الفاتحة والداكنة، البطاقات، الفواصل، الأزرار، مؤشرات الحالة، الرسوم البيانية، التدرجات وحالات التفاعل النشطة مع التزام صارم بالخط الطبيعي العادي.'
                : 'Architected with 13 comprehensive specifications: Primary and secondary backgrounds, primary/secondary green, gold/yellow accents, dark/light texts, cards/panels, borders/dividers, buttons, status colors, charts/infographics, gradients, and hover/active states with strict normal font compliance.'}
            </p>
          </div>

          {/* Action Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-950/70 border border-slate-800 rounded self-start md:self-auto">
            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs ${
                activeTab === 'visual'
                  ? 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isRtl ? 'المعرض البصري' : 'Visual Showcase'}</span>
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs ${
                activeTab === 'code'
                  ? 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>{isRtl ? 'رموز CSS والمتغيرات' : 'CSS Tokens'}</span>
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs ${
                activeTab === 'export'
                  ? 'bg-emerald-950/80 border border-emerald-700/60 text-emerald-300'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>{isRtl ? 'تصدير للعميل' : 'Client Export'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 13 SPECIFICATION SECTIONS */}
      {activeTab === 'visual' && (
        <div className="space-y-6">
          {/* Spec 1 & 2: Primary & Secondary Backgrounds */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 1. Primary background */}
            <div className="theme-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-950/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-[10px] text-emerald-400 font-mono">
                    01
                  </span>
                  <span className="text-slate-200 text-xs font-normal">
                    {isRtl ? 'الخلفية الأساسية (Primary Background)' : 'Primary Background'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">Dark Navy Base Foundation</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(theme.primaryBackground).map(([key, item]) => (
                  <div
                    key={key}
                    onClick={() => copyToClipboard(item.hex, item.name)}
                    className="group cursor-pointer p-2.5 rounded border border-slate-800/80 hover:border-emerald-600/50 transition-all"
                    style={{ backgroundColor: item.hex }}
                  >
                    <div className="h-6 flex items-center justify-end">
                      {copiedToken === item.name ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <div className="mt-2 text-[11px] text-slate-200 font-normal truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.hex}</div>
                    <div className="text-[9px] text-slate-500 truncate mt-1">{item.usage}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. Secondary background */}
            <div className="theme-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-950/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-[10px] text-emerald-400 font-mono">
                    02
                  </span>
                  <span className="text-slate-200 text-xs font-normal">
                    {isRtl ? 'الخلفية الثانوية (Secondary Background)' : 'Secondary Background'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">Elevated Containers & Sidebar</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.entries(theme.secondaryBackground).map(([key, item]) => (
                  <div
                    key={key}
                    onClick={() => copyToClipboard(item.hex, item.name)}
                    className="group cursor-pointer p-2.5 rounded border border-slate-800/80 hover:border-emerald-600/50 transition-all"
                    style={{ backgroundColor: item.hex }}
                  >
                    <div className="h-6 flex items-center justify-end">
                      {copiedToken === item.name ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <div className="mt-2 text-[11px] text-slate-200 font-normal truncate">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.hex}</div>
                    <div className="text-[9px] text-slate-500 truncate mt-1">{item.usage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Spec 3 & 4: Primary/Secondary Green & Gold/Yellow Accent */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 3. Primary/secondary green */}
            <div className="theme-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-950/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-[10px] text-emerald-400 font-mono">
                    03
                  </span>
                  <span className="text-slate-200 text-xs font-normal">
                    {isRtl ? 'الأخضر الأساسي والثانوي (Primary / Secondary Green)' : 'Primary & Secondary Green'}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono">Aramco Official #00843D</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(theme.greens).map(([key, item]) => (
                  <div
                    key={key}
                    onClick={() => copyToClipboard(item.hex, item.name)}
                    className="group cursor-pointer p-2.5 rounded border border-slate-800/80 hover:border-emerald-500 transition-all bg-slate-900/60"
                  >
                    <div className="h-7 rounded flex items-center justify-between px-2" style={{ backgroundColor: item.hex }}>
                      <span className="text-[9px] text-white/90 font-mono">{item.hex}</span>
                      {copiedToken === item.name ? (
                        <Check className="w-3 h-3 text-white" />
                      ) : (
                        <Copy className="w-2.5 h-2.5 text-white/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <div className="mt-2 text-[11px] text-slate-200 font-normal truncate">{item.name}</div>
                    <div className="text-[9px] text-slate-400 truncate mt-0.5">{item.usage}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Gold/yellow accent */}
            <div className="theme-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-950/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-amber-950/80 border border-amber-700/40 flex items-center justify-center text-[10px] text-amber-400 font-mono">
                    04
                  </span>
                  <span className="text-slate-200 text-xs font-normal">
                    {isRtl ? 'لمسات الذهب والأصفر (Gold / Yellow Accent)' : 'Gold & Yellow Accent'}
                  </span>
                </div>
                <span className="text-[10px] text-amber-400 font-mono">Desert Gold #EAA824</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {Object.entries(theme.goldAccents).map(([key, item]) => (
                  <div
                    key={key}
                    onClick={() => copyToClipboard(item.hex, item.name)}
                    className="group cursor-pointer p-2.5 rounded border border-slate-800/80 hover:border-amber-500 transition-all bg-slate-900/60"
                  >
                    <div className="h-7 rounded flex items-center justify-between px-2 text-slate-950" style={{ backgroundColor: item.hex }}>
                      <span className="text-[9px] font-mono">{item.hex}</span>
                      {copiedToken === item.name ? (
                        <Check className="w-3 h-3 text-slate-950" />
                      ) : (
                        <Copy className="w-2.5 h-2.5 text-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </div>
                    <div className="mt-2 text-[11px] text-slate-200 font-normal truncate">{item.name}</div>
                    <div className="text-[9px] text-slate-400 truncate mt-0.5">{item.usage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Spec 5 & 6: Dark Text & Light Text */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 5. Dark text */}
            <div className="theme-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-950/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-[10px] text-emerald-400 font-mono">
                    05
                  </span>
                  <span className="text-slate-200 text-xs font-normal">
                    {isRtl ? 'النص الداكن (Dark Text)' : 'Dark Text'}
                  </span>
                </div>
                <span className="text-[10px] text-emerald-400">WCAG AAA for Light/Gold Surfaces</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {Object.entries(theme.darkText).map(([key, item]) => (
                  <div key={key} className="p-2.5 rounded bg-amber-400/90 border border-amber-300">
                    <div className="flex items-center justify-between">
                      <span style={{ color: item.hex }} className="text-[11px] font-normal">
                        {item.name}
                      </span>
                      <span style={{ color: item.hex }} className="text-[9px] font-mono">
                        {item.hex}
                      </span>
                    </div>
                    <div style={{ color: item.hex }} className="text-[10px] mt-1 opacity-90 leading-tight">
                      Aa - Arabic & English Legible Typography
                    </div>
                    <div className="text-[9px] text-slate-800/70 mt-1 truncate">{item.usage}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Light text */}
            <div className="theme-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-950/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-[10px] text-emerald-400 font-mono">
                    06
                  </span>
                  <span className="text-slate-200 text-xs font-normal">
                    {isRtl ? 'النص الفاتح (Light Text)' : 'Light Text'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">Primary Dark Canvas Readability</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {Object.entries(theme.lightText).map(([key, item]) => (
                  <div key={key} className="p-2.5 rounded bg-[#0b1422] border border-slate-800">
                    <div className="flex items-center justify-between">
                      <span style={{ color: item.hex }} className="text-[11px] font-normal">
                        {item.name}
                      </span>
                      <span style={{ color: item.hex }} className="text-[9px] font-mono">
                        {item.hex}
                      </span>
                    </div>
                    <div style={{ color: item.hex }} className="text-[10px] mt-1 leading-tight">
                      Aa - Ghawar South Formation 3,870m TVD
                    </div>
                    <div className="text-[9px] text-slate-500 mt-1 truncate">{item.usage}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Spec 7 & 8: Cards/Panels & Borders/Dividers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 7. Cards/panels */}
            <div className="theme-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-950/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-[10px] text-emerald-400 font-mono">
                    07
                  </span>
                  <span className="text-slate-200 text-xs font-normal">
                    {isRtl ? 'البطاقات والألواح (Cards / Panels)' : 'Cards & Panels'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">Structural Surface Tokens</span>
              </div>

              <div className="space-y-2.5">
                {/* Standard Base Card Preview */}
                <div className="theme-card p-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-200">
                    <span>Base Card (.theme-card)</span>
                    <span className="text-emerald-400 font-mono text-[10px]">#0c1524</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Standard engineering dashboard container with hairline border.
                  </div>
                </div>

                {/* Elevated Card Preview */}
                <div className="theme-card-elevated p-3">
                  <div className="flex items-center justify-between text-[11px] text-slate-200">
                    <span>Elevated Card (.theme-card-elevated)</span>
                    <span className="text-cyan-400 font-mono text-[10px]">#101d30</span>
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Used for modal dialogues, popovers, and highlighted intelligence panels.
                  </div>
                </div>

                {/* Panel with Header and Footer */}
                <div className="border border-slate-800 rounded overflow-hidden">
                  <div className="bg-slate-900/90 px-3 py-1.5 text-[10px] text-slate-300 border-b border-slate-800 flex items-center justify-between">
                    <span>Panel Header</span>
                    <span className="text-slate-500">Auto-Docked</span>
                  </div>
                  <div className="p-3 bg-[#0a1220] text-[10px] text-slate-400">
                    Embedded Telemetry & Log Monitoring Stream
                  </div>
                  <div className="bg-slate-950/80 px-3 py-1 text-[9px] text-slate-500 border-t border-slate-900">
                    Panel Footer · 12ms Latency
                  </div>
                </div>
              </div>
            </div>

            {/* 8. Borders/dividers */}
            <div className="theme-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-950/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-[10px] text-emerald-400 font-mono">
                    08
                  </span>
                  <span className="text-slate-200 text-xs font-normal">
                    {isRtl ? 'الحدود والفواصل (Borders / Dividers)' : 'Borders & Dividers'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">Precision Hairlines</span>
              </div>

              <div className="space-y-3 pt-1">
                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                    <span>Subtle Hairline Border</span>
                    <span className="text-[10px] font-mono text-slate-500">rgba(56, 189, 248, 0.10)</span>
                  </div>
                  <div className="h-px bg-sky-950/40 w-full" />
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                    <span>Standard Section Divider</span>
                    <span className="text-[10px] font-mono text-slate-500">rgba(56, 189, 248, 0.20)</span>
                  </div>
                  <div className="h-px bg-slate-700/50 w-full" />
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                    <span>Aramco Green Accent Border</span>
                    <span className="text-[10px] font-mono text-emerald-400">rgba(16, 185, 129, 0.40)</span>
                  </div>
                  <div className="h-0.5 bg-emerald-500/40 w-full" />
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                    <span>Saudi Gold Highlight Border</span>
                    <span className="text-[10px] font-mono text-amber-400">rgba(234, 168, 36, 0.40)</span>
                  </div>
                  <div className="h-0.5 bg-amber-500/40 w-full" />
                </div>

                <div>
                  <div className="flex items-center justify-between text-[11px] text-slate-300 mb-1">
                    <span>Dark Hairline Technical Divider</span>
                    <span className="text-[10px] font-mono text-slate-600">rgba(51, 65, 85, 0.35)</span>
                  </div>
                  <div className="h-px bg-slate-800/80 w-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Spec 9 & 10: Buttons & Status Colors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* 9. Buttons */}
            <div className="theme-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-950/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-[10px] text-emerald-400 font-mono">
                    09
                  </span>
                  <span className="text-slate-200 text-xs font-normal">
                    {isRtl ? 'الأزرار (Buttons)' : 'Buttons'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">Interactive Action States</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Primary Green Button */}
                <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400 mb-2">Primary Green CTA</div>
                  <button className="btn-primary-green w-full py-1.5 px-3 flex items-center justify-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve Stage</span>
                  </button>
                </div>

                {/* Secondary Outline Button */}
                <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400 mb-2">Secondary Outline</div>
                  <button className="btn-secondary-outline w-full py-1.5 px-3 flex items-center justify-center gap-1.5 text-xs">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Run Simulation</span>
                  </button>
                </div>

                {/* Accent Gold Button */}
                <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400 mb-2">Saudi Gold Accent</div>
                  <button className="btn-accent-gold w-full py-1.5 px-3 flex items-center justify-center gap-1.5 text-xs">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Executive Gate</span>
                  </button>
                </div>

                {/* Ghost & Danger Buttons */}
                <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800">
                  <div className="text-[10px] text-slate-400 mb-2">Ghost / Danger State</div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-1 px-2 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 text-xs transition-colors">
                      Cancel
                    </button>
                    <button className="flex-1 py-1 px-2 rounded bg-red-950/60 border border-red-700/50 text-red-300 hover:bg-red-900/60 text-xs transition-colors">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 10. Status colors */}
            <div className="theme-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-950/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-[10px] text-emerald-400 font-mono">
                    10
                  </span>
                  <span className="text-slate-200 text-xs font-normal">
                    {isRtl ? 'ألوان الحالات (Status Colors)' : 'Status Colors'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500">Universal Operational Signals</span>
              </div>

              <div className="space-y-2">
                {/* Success */}
                <div className="p-2 rounded flex items-center justify-between border" style={{ backgroundColor: theme.statusColors.success.bg, borderColor: theme.statusColors.success.border }}>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-xs" style={{ color: theme.statusColors.success.text }}>Success / Verified (100% Passed)</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">{theme.statusColors.success.main.hex}</span>
                </div>

                {/* Warning */}
                <div className="p-2 rounded flex items-center justify-between border" style={{ backgroundColor: theme.statusColors.warning.bg, borderColor: theme.statusColors.warning.border }}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-xs" style={{ color: theme.statusColors.warning.text }}>Warning / Advisory (Pore Pressure Kick)</span>
                  </div>
                  <span className="text-[10px] font-mono text-amber-400">{theme.statusColors.warning.main.hex}</span>
                </div>

                {/* Danger */}
                <div className="p-2 rounded flex items-center justify-between border" style={{ backgroundColor: theme.statusColors.danger.bg, borderColor: theme.statusColors.danger.border }}>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-3.5 h-3.5 text-red-400" />
                    <span className="text-xs" style={{ color: theme.statusColors.danger.text }}>Danger / Critical Stop (H2S Breach)</span>
                  </div>
                  <span className="text-[10px] font-mono text-red-400">{theme.statusColors.danger.main.hex}</span>
                </div>

                {/* Info & Neutral */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded flex items-center justify-between border" style={{ backgroundColor: theme.statusColors.info.bg, borderColor: theme.statusColors.info.border }}>
                    <div className="flex items-center gap-1.5">
                      <Info className="w-3 h-3 text-cyan-400" />
                      <span className="text-[11px]" style={{ color: theme.statusColors.info.text }}>Info / Telemetry</span>
                    </div>
                    <span className="text-[9px] font-mono text-cyan-400">{theme.statusColors.info.main.hex}</span>
                  </div>
                  <div className="p-2 rounded flex items-center justify-between border" style={{ backgroundColor: theme.statusColors.neutral.bg, borderColor: theme.statusColors.neutral.border }}>
                    <div className="flex items-center gap-1.5">
                      <HelpCircle className="w-3 h-3 text-slate-400" />
                      <span className="text-[11px]" style={{ color: theme.statusColors.neutral.text }}>Neutral / Queued</span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-400">{theme.statusColors.neutral.main.hex}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Spec 11, 12, 13: Charts & Infographics, Gradients, Hover/Active */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 11. Charts and infographic elements */}
            <div className="theme-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-950/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-[10px] text-emerald-400 font-mono">
                    11
                  </span>
                  <span className="text-slate-200 text-xs font-normal">
                    {isRtl ? 'الرسوم البيانية والإنفوجرافيك' : 'Charts & Infographics'}
                  </span>
                </div>
              </div>

              {/* Mini Well Curve & Infographic Preview */}
              <div className="p-3 bg-slate-950/80 rounded border border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Pore Pressure vs Mud Weight</span>
                  <span className="text-emerald-400 font-mono">Safe Window</span>
                </div>
                {/* SVG Visual Representation */}
                <div className="h-20 w-full relative flex items-center justify-center">
                  <svg className="w-full h-full" viewBox="0 0 200 60" preserveAspectRatio="none">
                    {/* Safe Mud Window Fill */}
                    <path
                      d="M 10 15 Q 80 20 150 18 L 190 22 L 190 48 Q 120 45 60 50 Z"
                      fill={theme.charts.mudWeightSafeEnvelope}
                    />
                    {/* Pore Pressure Bound (Amber) */}
                    <path
                      d="M 10 40 Q 70 42 120 38 T 190 35"
                      fill="none"
                      stroke={theme.charts.porePressureBound}
                      strokeWidth="2"
                    />
                    {/* Fracture Gradient Limit (Red) */}
                    <path
                      d="M 10 12 Q 90 14 140 10 T 190 8"
                      fill="none"
                      stroke={theme.charts.fractureGradientLimit}
                      strokeWidth="1.5"
                      strokeDasharray="3,3"
                    />
                    {/* Actual Mud Program (Aramco Green) */}
                    <path
                      d="M 10 26 Q 60 28 110 25 T 190 22"
                      fill="none"
                      stroke={theme.charts.pressureGradientCurve}
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                {/* Legend Chips */}
                <div className="flex items-center justify-between text-[9px] text-slate-400 pt-1 border-t border-slate-900">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-0.5 bg-sky-400" /> Mud Wt
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-0.5 bg-amber-400" /> Pore Press
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-0.5 bg-red-400" /> Frac Limit
                  </span>
                </div>
              </div>
            </div>

            {/* 12. Gradients */}
            <div className="theme-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-950/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-[10px] text-emerald-400 font-mono">
                    12
                  </span>
                  <span className="text-slate-200 text-xs font-normal">
                    {isRtl ? 'التدرجات اللونية (Gradients)' : 'Gradients'}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                {/* Aramco Brand Gradient */}
                <div className="p-2.5 rounded text-white flex items-center justify-between gradient-aramco-brand">
                  <span className="text-[11px]">Aramco Primary Brand</span>
                  <span className="text-[9px] font-mono text-white/80">#00843D → #0284c7</span>
                </div>

                {/* Saudi Gold Sheen */}
                <div className="p-2.5 rounded text-slate-950 flex items-center justify-between gradient-gold-sheen">
                  <span className="text-[11px]">Saudi Desert Gold Sheen</span>
                  <span className="text-[9px] font-mono text-slate-950/80">#d97706 → #fbbf24</span>
                </div>

                {/* Progress Gradient */}
                <div className="p-2 rounded bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>Workflow Progress Sheen</span>
                    <span className="text-emerald-400">92%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded overflow-hidden">
                    <div
                      className="h-full rounded"
                      style={{ width: '92%', background: theme.gradients.statusProgress }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 13. Hover/active states */}
            <div className="theme-card p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-sky-950/40 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-emerald-950/80 border border-emerald-700/40 flex items-center justify-center text-[10px] text-emerald-400 font-mono">
                    13
                  </span>
                  <span className="text-slate-200 text-xs font-normal">
                    {isRtl ? 'حالات التفاعل النشطة (Hover / Active)' : 'Hover / Active States'}
                  </span>
                </div>
              </div>

              {/* Interactive Test Rail */}
              <div className="space-y-1.5">
                {[
                  { label: '01. Interactive Item Alpha', code: 'Phase Active' },
                  { label: '02. Interactive Item Beta', code: 'Hover Ready' },
                  { label: '03. Interactive Item Gamma', code: 'Click to Focus' }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => setTestHoverItem(idx)}
                    className={`p-2 rounded border cursor-pointer theme-interactive-item flex items-center justify-between ${
                      testHoverItem === idx
                        ? 'active bg-emerald-950/40 border-emerald-600/50 text-emerald-200'
                        : 'border-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <span className="text-[11px]">{item.label}</span>
                    <span className="text-[9px] font-mono text-emerald-400">
                      {testHoverItem === idx ? 'ACTIVE' : 'IDLE'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CODE & TOKEN CHEAT SHEET TAB */}
      {activeTab === 'code' && (
        <div className="theme-card p-5 space-y-4">
          <div className="flex items-center justify-between border-b border-sky-950/40 pb-3">
            <div>
              <h2 className="text-xs text-slate-200 font-normal">
                {isRtl ? 'جدول متغيرات CSS ورموز السمة' : 'CSS Variables & Design Tokens Reference'}
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {isRtl
                  ? 'انقر على أي متغير لنسخه مباشرة إلى الحافظة لاستخدامه في أي مكون.'
                  : 'Click on any CSS custom property or class to copy it directly.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-[11px] space-y-1.5 overflow-x-auto">
              <div className="text-emerald-400 mb-2">/* Primary & Secondary Backgrounds */</div>
              <div className="text-slate-300">--theme-bg-primary: <span className="text-amber-300">#060b13</span>;</div>
              <div className="text-slate-300">--theme-bg-primary-surface: <span className="text-amber-300">#080f1a</span>;</div>
              <div className="text-slate-300">--theme-bg-secondary: <span className="text-amber-300">#0d1726</span>;</div>
              <div className="text-slate-300">--theme-bg-secondary-elevated: <span className="text-amber-300">#111e32</span>;</div>

              <div className="text-emerald-400 mt-3 mb-2">/* Primary & Secondary Green */</div>
              <div className="text-slate-300">--theme-green-primary: <span className="text-emerald-400">#00843D</span>;</div>
              <div className="text-slate-300">--theme-green-primary-hover: <span className="text-emerald-400">#059669</span>;</div>
              <div className="text-slate-300">--theme-green-secondary: <span className="text-emerald-400">#10B981</span>;</div>

              <div className="text-emerald-400 mt-3 mb-2">/* Gold & Yellow Accents */</div>
              <div className="text-slate-300">--theme-gold-accent: <span className="text-amber-400">#EAA824</span>;</div>
              <div className="text-slate-300">--theme-gold-light: <span className="text-amber-400">#FBBF24</span>;</div>
              <div className="text-slate-300">--theme-yellow-energy: <span className="text-yellow-400">#FACC15</span>;</div>
            </div>

            <div className="bg-slate-950 p-3 rounded border border-slate-800 font-mono text-[11px] space-y-1.5 overflow-x-auto">
              <div className="text-emerald-400 mb-2">/* Text Tokens (Strict Normal Weight) */</div>
              <div className="text-slate-300">--theme-text-dark-primary: <span className="text-slate-400">#060d17</span>;</div>
              <div className="text-slate-300">--theme-text-on-gold: <span className="text-slate-400">#030712</span>;</div>
              <div className="text-slate-300">--theme-text-light-primary: <span className="text-slate-100">#F8FAFC</span>;</div>
              <div className="text-slate-300">--theme-text-light-secondary: <span className="text-slate-300">#CBD5E1</span>;</div>

              <div className="text-emerald-400 mt-3 mb-2">/* Status Colors */</div>
              <div className="text-slate-300">--theme-status-success: <span className="text-emerald-400">#10B981</span>;</div>
              <div className="text-slate-300">--theme-status-warning: <span className="text-amber-400">#F59E0B</span>;</div>
              <div className="text-slate-300">--theme-status-danger: <span className="text-red-400">#EF4444</span>;</div>
              <div className="text-slate-300">--theme-status-info: <span className="text-cyan-400">#0EA5E9</span>;</div>
            </div>
          </div>
        </div>
      )}

      {/* EXPORT TAB FOR CLIENT */}
      {activeTab === 'export' && (
        <div className="theme-card p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-sky-950/40 pb-3">
            <div>
              <h2 className="text-xs text-slate-200 font-normal">
                {isRtl ? 'تصدير مواصفات السمة للعميل' : 'Export Web-Ready Theme Specification'}
              </h2>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {isRtl
                  ? 'حزمة قابلة للنسخ والتنزيل لتطبيق السمة على واجهات العميل وخطوط الإنتاج.'
                  : 'Ready-to-deploy configuration for external client projects and production.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center p-0.5 bg-slate-900 border border-slate-800 rounded">
                {(['json', 'css', 'tailwind'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setExportFormat(fmt)}
                    className={`px-2.5 py-1 text-[11px] rounded transition-colors uppercase ${
                      exportFormat === fmt ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>

              <button
                onClick={() => copyToClipboard(getExportString(), 'Export Config')}
                className="btn-primary-green px-3 py-1 flex items-center gap-1.5 text-xs"
              >
                {copiedToken === 'Export Config' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{isRtl ? 'نسخ الحزمة' : 'Copy Spec'}</span>
              </button>
            </div>
          </div>

          <pre className="p-4 bg-slate-950 border border-slate-800 rounded font-mono text-[11px] text-slate-300 max-h-96 overflow-y-auto whitespace-pre">
            {getExportString()}
          </pre>
        </div>
      )}
    </div>
  );
};
