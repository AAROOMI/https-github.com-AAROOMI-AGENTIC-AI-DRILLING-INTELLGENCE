import React from 'react';
import {
  LayoutDashboard,
  GitBranch,
  Layers,
  CheckCheck,
  History,
  Activity,
  Compass,
  Gauge,
  Sliders,
  ShieldAlert,
  Target,
  FileCheck2,
  FileSpreadsheet,
  Terminal,
  BookOpen,
  Cpu,
  Mic2,
  Settings,
  Palette
} from 'lucide-react';
import { LanguageCode } from '../types';

export type NavViewId =
  | 'dashboard'
  | 'user-guide'
  | 'workflow'
  | 'theme-guide'
  | 'data-collection'
  | 'data-validation'
  | 'historical-intelligence'
  | 'ongoing-intelligence'
  | 'offset-analysis'
  | 'pressure-mudweight'
  | 'well-design-selection'
  | 'casing-hole-grade'
  | 'execution-objectives'
  | 'directional-planning'
  | 'human-approval'
  | 'drilling-program'
  | 'sql-workspace'
  | 'knowledge-base'
  | 'agent-monitor'
  | 'voice-admin'
  | 'administration';

interface SidebarProps {
  activeView: NavViewId;
  onSelectView: (view: NavViewId) => void;
  currentLanguage: LanguageCode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeView,
  onSelectView,
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';

  const navSections = [
    {
      titleEn: 'COMMAND & WORKFLOW',
      titleAr: 'التحكم ومسار العمليات',
      items: [
        { id: 'dashboard' as NavViewId, labelEn: 'Executive Dashboard', labelAr: 'لوحة القيادة التنفيذية', icon: LayoutDashboard },
        { id: 'user-guide' as NavViewId, labelEn: 'Audio-Visual User Guide', labelAr: 'دليل الاستخدام الصوتي المرئي', icon: BookOpen },
        { id: 'workflow' as NavViewId, labelEn: '12-Phase Workflow', labelAr: 'مسار الحفر المعتمد (12 مرحلة)', icon: GitBranch },
        { id: 'theme-guide' as NavViewId, labelEn: 'Web-Ready Theme Guide', labelAr: 'دليل سمة التصميم (13 عنصر)', icon: Palette }
      ]
    },
    {
      titleEn: '12-PHASE ENGINEERING',
      titleAr: 'مراحل الهندسة الـ 12',
      items: [
        { id: 'data-collection' as NavViewId, labelEn: '01. Data Collection', labelAr: '01. جمع البيانات', icon: Layers },
        { id: 'data-validation' as NavViewId, labelEn: '02. Data Validation', labelAr: '02. تدقيق وصحة البيانات', icon: CheckCheck },
        { id: 'historical-intelligence' as NavViewId, labelEn: '03. Historical Wells', labelAr: '03. ذكاء الآبار السابقة', icon: History },
        { id: 'ongoing-intelligence' as NavViewId, labelEn: '04. Ongoing Operations', labelAr: '04. العمليات الجارية', icon: Activity },
        { id: 'offset-analysis' as NavViewId, labelEn: '05. Offset Intelligence', labelAr: '05. الآبار المجاورة', icon: Compass },
        { id: 'pressure-mudweight' as NavViewId, labelEn: '06. Pressure & Mud Weight', labelAr: '06. الضغط وطين الحفر', icon: Gauge },
        { id: 'well-design-selection' as NavViewId, labelEn: '07. Well Design (K-2)', labelAr: '07. تصميم البئر (K-2)', icon: Sliders },
        { id: 'casing-hole-grade' as NavViewId, labelEn: '08. Casing & Grade', labelAr: '08. الأغلفة وتدرج المعادن', icon: ShieldAlert },
        { id: 'execution-objectives' as NavViewId, labelEn: '09. Execution Objectives', labelAr: '09. أهداف التنفيذ', icon: Target },
        { id: 'directional-planning' as NavViewId, labelEn: '10. Directional & 3D Path', labelAr: '10. المسار الاتجاهي ثلاثي الأبعاد', icon: Compass },
        { id: 'human-approval' as NavViewId, labelEn: '11. Human Approval Gate', labelAr: '11. بوابة اعتماد المهندس', icon: FileCheck2 },
        { id: 'drilling-program' as NavViewId, labelEn: '12. Drilling Program', labelAr: '12. برنامج الحفر النهائي', icon: FileSpreadsheet }
      ]
    },
    {
      titleEn: 'INTELLIGENCE & TOOLS',
      titleAr: 'الذكاء الهندسي والأدوات',
      items: [
        { id: 'sql-workspace' as NavViewId, labelEn: 'Secure SQL Agent', labelAr: 'وكيل استعلامات SQL الآمن', icon: Terminal },
        { id: 'knowledge-base' as NavViewId, labelEn: 'Enterprise RAG Base', labelAr: 'قاعدة المعرفة والمستندات', icon: BookOpen },
        { id: 'agent-monitor' as NavViewId, labelEn: 'Agentic Force Monitor', labelAr: 'مراقبة الوكلاء الأذكياء', icon: Cpu },
        { id: 'voice-admin' as NavViewId, labelEn: 'Voice Cloning Studio', labelAr: 'استوديو استنساخ الصوت الخاص', icon: Mic2 },
        { id: 'administration' as NavViewId, labelEn: 'Admin & Distribution', labelAr: 'الإدارة ونشر النظام (Docker/Desktop)', icon: Settings }
      ]
    }
  ];

  return (
    <aside className="w-64 border-r border-sky-950/40 bg-[#070d18] flex flex-col h-[calc(100vh-3.5rem)] select-none shrink-0 overflow-y-auto">
      <div className="p-3 space-y-5">
        {navSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <div className="px-2 py-1 text-[10px] tracking-wider text-slate-500">
              {isRtl ? section.titleAr : section.titleEn}
            </div>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectView(item.id)}
                    className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded text-xs transition-colors text-left ${
                      isActive
                        ? 'bg-sky-950/70 border border-sky-800/50 text-sky-200'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-sky-400' : 'text-slate-500'}`} />
                    <span className="truncate">{isRtl ? item.labelAr : item.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto p-3 border-t border-sky-950/40 bg-slate-950/40 text-[10px] text-slate-500">
        <div className="flex items-center justify-between">
          <span>Enterprise Version</span>
          <span className="font-mono text-slate-400">v2.5.0-ARAMCO</span>
        </div>
        <div className="mt-1 text-slate-600">
          Governed Decision Architecture
        </div>
      </div>
    </aside>
  );
};
