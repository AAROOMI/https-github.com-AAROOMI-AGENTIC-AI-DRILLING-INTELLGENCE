import React, { useState } from 'react';
import { Layers, ShieldCheck, CheckCircle2, AlertCircle, Wrench, Info } from 'lucide-react';
import { CasingSection, LanguageCode } from '../../types';
import { SYNTHETIC_CASING_SECTIONS } from '../../services/data/initialSyntheticData';

interface CasingGradeViewProps {
  currentLanguage: LanguageCode;
}

export const CasingGradeView: React.FC<CasingGradeViewProps> = ({
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [selectedSection, setSelectedSection] = useState<CasingSection>(SYNTHETIC_CASING_SECTIONS[2]);

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'تصميم الأغلفة وتدرج المعادن (Casing, Hole & Metallurgy)' : 'Casing Architecture, Borehole Geometry & Metallurgy'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'التحقق من عوامل الأمان للضغط الداخلي والانبعاج وفق معايير API Spec 5CT ومطابقة NACE MR0175 لغاز H2S الحامضي.'
              : 'Triaxial stress analysis, API Spec 5CT burst/collapse verification, and NACE MR0175 sour service compliance.'}
          </div>
        </div>
        <div className="text-[11px] text-emerald-400 font-mono">
          API 5CT / NACE MR0175: PASSED
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column: Interactive Borehole Schematic */}
        <div className="lg:col-span-5 p-3.5 rounded bg-[#08101e] border border-sky-950/60 flex flex-col items-center">
          <div className="w-full flex items-center justify-between pb-2 mb-2 border-b border-sky-950/40">
            <span className="text-xs text-slate-200">Wellbore Cross-Section</span>
            <span className="text-[10px] text-slate-400 font-mono">TD: 4,500 m</span>
          </div>

          {/* SVG Wellbore Schematic */}
          <div className="h-80 w-full bg-[#050a13] rounded p-2 border border-slate-900 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 300 280">
              {/* Ground level */}
              <line x1="20" y1="20" x2="280" y2="20" stroke="#64748b" strokeWidth="2" />
              <text x="30" y="15" fill="#64748b" fontSize="9">GL: 0 m</text>

              {/* Surface String: 20" in 26" hole (0 - 800m) */}
              <rect
                x="110"
                y="20"
                width="80"
                height="60"
                fill={selectedSection.id === 'cs-01' ? 'rgba(14,165,233,0.3)' : 'rgba(30,41,59,0.5)'}
                stroke="#38bdf8"
                strokeWidth="1.5"
                className="cursor-pointer transition-colors"
                onClick={() => setSelectedSection(SYNTHETIC_CASING_SECTIONS[0])}
              />
              <text x="200" y="55" fill="#94a3b8" fontSize="9">20" Surface (800m)</text>

              {/* Intermediate String: 13-3/8" in 17-1/2" hole (800 - 2,200m) */}
              <rect
                x="125"
                y="80"
                width="50"
                height="70"
                fill={selectedSection.id === 'cs-02' ? 'rgba(14,165,233,0.3)' : 'rgba(30,41,59,0.5)'}
                stroke="#0284c7"
                strokeWidth="1.5"
                className="cursor-pointer transition-colors"
                onClick={() => setSelectedSection(SYNTHETIC_CASING_SECTIONS[1])}
              />
              <text x="185" y="120" fill="#94a3b8" fontSize="9">13-3/8" Inter (2,200m)</text>

              {/* Production String: 9-5/8" in 12-1/4" hole (2,200 - 3,500m) */}
              <rect
                x="135"
                y="150"
                width="30"
                height="65"
                fill={selectedSection.id === 'cs-03' ? 'rgba(14,165,233,0.3)' : 'rgba(30,41,59,0.5)'}
                stroke="#10b981"
                strokeWidth="1.5"
                className="cursor-pointer transition-colors"
                onClick={() => setSelectedSection(SYNTHETIC_CASING_SECTIONS[2])}
              />
              <text x="175" y="185" fill="#94a3b8" fontSize="9">9-5/8" Prod (3,500m)</text>

              {/* Production Liner: 7" in 8-1/2" hole (3,500 - 4,500m) */}
              <rect
                x="142"
                y="215"
                width="16"
                height="50"
                fill={selectedSection.id === 'cs-04' ? 'rgba(14,165,233,0.3)' : 'rgba(30,41,59,0.5)'}
                stroke="#f59e0b"
                strokeWidth="1.5"
                className="cursor-pointer transition-colors"
                onClick={() => setSelectedSection(SYNTHETIC_CASING_SECTIONS[3])}
              />
              <text x="170" y="245" fill="#94a3b8" fontSize="9">7" Liner (4,500m TD)</text>
            </svg>
          </div>
        </div>

        {/* Right Column: Detailed Mechanical Specifications */}
        <div className="lg:col-span-7 space-y-3">
          {/* Selected Section Header */}
          <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-sky-950/40">
              <div>
                <span className="text-[10px] font-mono text-slate-500">SECTION METALLURGY</span>
                <div className="text-sm text-slate-100">{selectedSection.sectionName} Casing</div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-[10px] font-mono">
                Grade: {selectedSection.casingGrade}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800/60">
                <div className="text-[10px] text-slate-500">Casing OD:</div>
                <div className="text-slate-200 font-mono mt-0.5">{selectedSection.casingSizeInches}"</div>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800/60">
                <div className="text-[10px] text-slate-500">Hole Size:</div>
                <div className="text-slate-200 font-mono mt-0.5">{selectedSection.holeSizeInches}"</div>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800/60">
                <div className="text-[10px] text-slate-500">Shoe Depth:</div>
                <div className="text-slate-200 font-mono mt-0.5">{selectedSection.shoeDepthM} m</div>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800/60">
                <div className="text-[10px] text-slate-500">Linear Weight:</div>
                <div className="text-slate-200 font-mono mt-0.5">{selectedSection.weightLbFt} lb/ft</div>
              </div>
            </div>

            {/* Safety Factors Triaxial Check */}
            <div className="grid grid-cols-3 gap-2 text-xs pt-2 border-t border-slate-800/60">
              <div className="p-2 rounded bg-slate-900/40 border border-slate-800/50">
                <div className="text-[10px] text-slate-500">Burst Rating:</div>
                <div className="text-emerald-400 font-mono mt-0.5">{selectedSection.burstRatingPsi} psi</div>
                <div className="text-[9px] text-slate-500">SF: 1.78 (Min 1.10)</div>
              </div>
              <div className="p-2 rounded bg-slate-900/40 border border-slate-800/50">
                <div className="text-[10px] text-slate-500">Collapse Rating:</div>
                <div className="text-emerald-400 font-mono mt-0.5">{selectedSection.collapseRatingPsi} psi</div>
                <div className="text-[9px] text-slate-500">SF: 1.34 (Min 1.00)</div>
              </div>
              <div className="p-2 rounded bg-slate-900/40 border border-slate-800/50">
                <div className="text-[10px] text-slate-500">Tension SF:</div>
                <div className="text-emerald-400 font-mono mt-0.5">{selectedSection.tensionSafetyFactor}</div>
                <div className="text-[9px] text-slate-500">Min 1.60 Required</div>
              </div>
            </div>
          </div>

          {/* Sour Service Compliance Card */}
          <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <div>
                <div className="text-slate-200">H2S Sour Gas Metallurgy Certification</div>
                <div className="text-[10px] text-slate-400">
                  Tubulars compliant with NACE MR0175 / ISO 15156 sulfide stress cracking criteria.
                </div>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-[10px] font-mono">
              VERIFIED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
