import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Download,
  Share2,
  CheckCircle2,
  Printer,
  FileText,
  Volume2,
  Table,
  Layers,
  ShieldCheck
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { SYNTHETIC_ACTIVE_WELL } from '../../services/data/initialSyntheticData';
import { CentralLanguageRouter } from '../../services/voice/LanguageRouter';

interface DrillingProgramViewProps {
  currentLanguage: LanguageCode;
}

export const DrillingProgramView: React.FC<DrillingProgramViewProps> = ({
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const well = SYNTHETIC_ACTIVE_WELL;
  const [isExporting, setIsExporting] = useState(false);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleDownload = (format: 'PDF' | 'SHEETS' | 'JSON') => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportNotice(
        `Successfully exported official ${well.name} Drilling Program in ${format} format.`
      );
    }, 800);
  };

  const handleVoiceSummarize = async () => {
    const text =
      currentLanguage === 'ar-najdi'
        ? 'برنامج الحفر الهندسي للبئر 102 مكتمل ومعتمد طال عمرك. التصميم المعتمد K-2 بعمق 3,870 متر عمودي و 6,420 متر مقاس، مع تغليف أربع مقاطع واستخدام طين حفر 1.36 غرام لكل سنتيمتر مكعب. تم تفادي كافة مخاطر البئر المجاورة، وجاهزين للتنفيذ الميداني.'
        : currentLanguage === 'ar'
        ? 'تم اكتمال واعتماد برنامج الحفر الهندسي للبئر 102 وفق مواصفات K-2 ووزن طين 1.36 غ/سم³. تم التحقق من عوامل الأمان لمقاطع الأغلفة الأربعة وضمان خلو المسار من أي تصادم.'
        : 'The comprehensive Aramco Drilling Program for Well-102 has been officially compiled under K-2 architecture. Target TVD is 3,870 m, MD is 6,420 m, with 4 casing strings and 11.3 ppg mud weight. All safety gates and sour service requirements are verified.';

    await CentralLanguageRouter.routeAndSpeak(text, {
      agentName: 'Drilling Program Agent',
      language: currentLanguage
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Banner & Export Actions */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'برنامج الحفر الهندسي المتكامل (Official Drilling Program Manual)' : 'Comprehensive Aramco Drilling Program Manual & Package'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'الوثيقة الهندسية الرسمية المعتمدة لمنصة الحفر SAR-214 متضمنة كافة المقاطع، الهيدروليكا، وخطط الطوارئ.'
              : 'Governed engineering authorization document incorporating all validated models, casing designs, and directional surveys.'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleVoiceSummarize}
            className="px-2.5 py-1.5 rounded bg-sky-950/80 border border-cyan-800/50 hover:bg-sky-900/60 text-cyan-300 text-xs flex items-center gap-1.5 transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isRtl ? 'ملخص صوتي' : 'Voice Briefing'}</span>
          </button>

          <button
            onClick={() => handleDownload('PDF')}
            disabled={isExporting}
            className="px-2.5 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>PDF Export</span>
          </button>

          <button
            onClick={() => handleDownload('SHEETS')}
            disabled={isExporting}
            className="px-2.5 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs flex items-center gap-1.5 transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Sheets Export</span>
          </button>
        </div>
      </div>

      {exportNotice && (
        <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{exportNotice}</span>
        </div>
      )}

      {/* Program Document Preview Sheet */}
      <div className="p-6 rounded bg-[#070e1b] border border-sky-950/70 text-slate-300 space-y-6 shadow-xl max-w-4xl mx-auto">
        {/* Document Header */}
        <div className="flex justify-between items-start pb-4 border-b border-sky-950/60">
          <div>
            <div className="text-xs text-emerald-400 font-mono">SAUDI ARABIAN OIL COMPANY (ARAMCO)</div>
            <div className="text-sm text-slate-100 font-normal mt-0.5">DRILLING & WORKOVER ENGINEERING DEPARTMENT</div>
            <div className="text-[11px] text-slate-400 mt-1">Official Drilling Program • Document No: DP-2026-GHWR-102-R1</div>
          </div>
          <div className="text-right text-xs font-mono">
            <div className="text-slate-200">Well: {well.name}</div>
            <div className="text-slate-400 text-[11px]">Rig: {well.rig}</div>
            <div className="text-emerald-400 text-[10px] mt-1">STATUS: APPROVED FOR SPUD</div>
          </div>
        </div>

        {/* Section 1: Executive Summary */}
        <div className="space-y-2 text-xs">
          <div className="text-sky-300 font-mono text-xs uppercase tracking-wide">
            1. Executive Summary & Operational Objectives
          </div>
          <p className="leading-relaxed text-slate-300 text-[11px]">
            Well-102 is planned as a high-angle horizontal oil development well in the Ghawar South (Uthmaniyah Sector) field targeting the Arab-D reservoir.
            Surface location is Lat 25.3289° N, Lng 49.6124° E (elevation 168.4 m MSL).
            Target depth is 3,870 m TVD (12,696 ft) with a planned total measured depth of 6,420 m MD (21,063 ft) and an 82.5° landing inclination along 124.0° Azimuth.
            The horizontal drain section will expose 1,240 m of high-permeability reservoir grainstones.
          </p>
        </div>

        {/* Section 2: Casing & Hole Geometry Table */}
        <div className="space-y-2 text-xs">
          <div className="text-sky-300 font-mono text-xs uppercase tracking-wide">
            2. Casing & Hole Geometry Program (K-2 Profile)
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-sky-950/60 text-[10px] text-slate-500">
                  <th className="pb-1.5">Section</th>
                  <th className="pb-1.5">Hole Size</th>
                  <th className="pb-1.5">Casing OD</th>
                  <th className="pb-1.5">Interval (m)</th>
                  <th className="pb-1.5">Grade</th>
                  <th className="pb-1.5">Burst SF</th>
                  <th className="pb-1.5">Collapse SF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300 text-[11px]">
                <tr>
                  <td className="py-1 text-slate-200">Surface</td>
                  <td className="py-1">26"</td>
                  <td className="py-1">20"</td>
                  <td className="py-1">0 - 800</td>
                  <td className="py-1">K-55</td>
                  <td className="py-1 text-emerald-400">2.15</td>
                  <td className="py-1 text-emerald-400">1.13</td>
                </tr>
                <tr>
                  <td className="py-1 text-slate-200">Intermediate</td>
                  <td className="py-1">17-1/2"</td>
                  <td className="py-1">13-3/8"</td>
                  <td className="py-1">800 - 2,200</td>
                  <td className="py-1">L-80</td>
                  <td className="py-1 text-emerald-400">1.92</td>
                  <td className="py-1 text-emerald-400">1.28</td>
                </tr>
                <tr>
                  <td className="py-1 text-slate-200">Production</td>
                  <td className="py-1">12-1/4"</td>
                  <td className="py-1">9-5/8"</td>
                  <td className="py-1">2,200 - 3,500</td>
                  <td className="py-1">P-110</td>
                  <td className="py-1 text-emerald-400">1.78</td>
                  <td className="py-1 text-emerald-400">1.34</td>
                </tr>
                <tr>
                  <td className="py-1 text-slate-200">Liner</td>
                  <td className="py-1">8-1/2"</td>
                  <td className="py-1">7"</td>
                  <td className="py-1">3,500 - 4,500</td>
                  <td className="py-1">Q-125 (Sour)</td>
                  <td className="py-1 text-emerald-400">1.84</td>
                  <td className="py-1 text-emerald-400">1.45</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Mud Program & Hydraulics */}
        <div className="space-y-2 text-xs">
          <div className="text-sky-300 font-mono text-xs uppercase tracking-wide">
            3. Mud Density & Hydraulic Schedule
          </div>
          <div className="p-3 rounded bg-slate-900/60 border border-slate-800/60 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
            <div>
              <span className="text-slate-500">Operating Mud Density:</span>
              <div className="text-emerald-400 font-mono mt-0.5">1.36 sg (11.35 ppg)</div>
            </div>
            <div>
              <span className="text-slate-500">Trip Overbalance:</span>
              <div className="text-sky-300 font-mono mt-0.5">+250 psi</div>
            </div>
            <div>
              <span className="text-slate-500">ECD Limit @ Arab-D:</span>
              <div className="text-amber-300 font-mono mt-0.5">1.44 sg max</div>
            </div>
            <div>
              <span className="text-slate-500">Fracture Breakdown Buffer:</span>
              <div className="text-slate-300 font-mono mt-0.5">480 psi</div>
            </div>
          </div>
        </div>

        {/* Section 4: Formal Engineering Sign-Off Signature Box */}
        <div className="pt-4 border-t border-sky-950/60 grid grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded bg-slate-900/40 border border-slate-800/50">
            <div className="text-[10px] text-slate-500">Lead Drilling Engineer:</div>
            <div className="text-slate-200 font-normal mt-1">Ahmad Al-Ghamdi (KSA-ENG-4912)</div>
            <div className="text-[10px] text-emerald-400 font-mono mt-1">Formal Sign-off Verified • 2026-10-06</div>
          </div>
          <div className="p-3 rounded bg-slate-900/40 border border-slate-800/50">
            <div className="text-[10px] text-slate-500">Digital Assurance Signature Hash:</div>
            <div className="text-slate-300 font-mono text-[11px] mt-1 break-all">
              SHA256: e7f82b09a419c8d43a4f89d12c70e5b699a21b44c
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
