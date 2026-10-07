import React, { useState } from 'react';
import { Compass, Eye, ShieldCheck, Download, Table, Layers } from 'lucide-react';
import { LanguageCode } from '../../types';
import { SYNTHETIC_SURVEY_STATIONS } from '../../services/data/initialSyntheticData';

interface WellPathDirectionalViewProps {
  currentLanguage: LanguageCode;
}

export const WellPathDirectionalView: React.FC<WellPathDirectionalViewProps> = ({
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [activeTab, setActiveTab] = useState<'visual' | 'table'>('visual');

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'المسار الاتجاهي ثلاثي الأبعاد والتوجيه (3D Well Path & Directional Plan)' : '3D Directional Well Path & Minimum Curvature Trajectory'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'تخطيط المسار الأفقي لمكمن العرب دي وفق خوارزمية أقل انحناء (Minimum Curvature) وحساب DLS وتفادي تصادم الآبار.'
              : 'Minimum Curvature algorithm computing 3D space curve, DLS distribution, and anti-collision separation ratios.'}
          </div>
        </div>

        <div className="flex items-center bg-slate-900 border border-slate-800 rounded p-0.5 text-xs">
          <button
            onClick={() => setActiveTab('visual')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'visual' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3D Trajectory
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`px-2.5 py-1 rounded transition-colors ${
              activeTab === 'table' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Survey Table
          </button>
        </div>
      </div>

      {/* Trajectory Key Parameters Ribbon */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 text-xs">
        <div className="p-2.5 rounded bg-[#08101e] border border-sky-950/60">
          <div className="text-[10px] text-slate-500">Kick-Off Point (KOP):</div>
          <div className="text-slate-200 font-mono mt-0.5">950 m TVD</div>
        </div>
        <div className="p-2.5 rounded bg-[#08101e] border border-sky-950/60">
          <div className="text-[10px] text-slate-500">Landing Inclination:</div>
          <div className="text-emerald-400 font-mono mt-0.5">82.5° @ 124.0° Azi</div>
        </div>
        <div className="p-2.5 rounded bg-[#08101e] border border-sky-950/60">
          <div className="text-[10px] text-slate-500">Max Dogleg Severity:</div>
          <div className="text-sky-300 font-mono mt-0.5">0.83° / 30 m</div>
        </div>
        <div className="p-2.5 rounded bg-[#08101e] border border-sky-950/60">
          <div className="text-[10px] text-slate-500">Horizontal Displacement:</div>
          <div className="text-slate-200 font-mono mt-0.5">1,240 m</div>
        </div>
        <div className="p-2.5 rounded bg-[#08101e] border border-sky-950/60">
          <div className="text-[10px] text-slate-500">Anti-Collision Margin:</div>
          <div className="text-emerald-400 font-mono mt-0.5">SF = 3.65 (Safe)</div>
        </div>
      </div>

      {activeTab === 'visual' ? (
        <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-sky-950/40">
            <span className="text-xs text-slate-200">
              3D Profile: Target vs Planned vs Formation Horizons
            </span>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-sky-400">
                <span className="w-2.5 h-0.5 bg-sky-400 inline-block" /> Planned Well Path
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" /> Target Arab-D Entry
              </span>
              <span className="flex items-center gap-1 text-amber-400">
                <span className="w-2.5 h-0.5 bg-amber-400 inline-block" /> Formation Tops
              </span>
            </div>
          </div>

          {/* SVG 3D Trajectory Profile */}
          <div className="h-80 w-full bg-[#050a13] rounded p-2 border border-slate-900 relative">
            <svg className="w-full h-full" viewBox="0 0 700 280">
              {/* Stratigraphy Horizontal Horizon Lines */}
              <line x1="40" y1="90" x2="680" y2="90" stroke="rgba(245, 158, 11, 0.25)" strokeDasharray="3 3" />
              <text x="50" y="85" fill="#f59e0b" fontSize="9">Top Seal (Hith Anhydrite) 2,340 m</text>

              <line x1="40" y1="140" x2="680" y2="140" stroke="rgba(56, 189, 248, 0.25)" strokeDasharray="3 3" />
              <text x="50" y="135" fill="#38bdf8" fontSize="9">Upper Sand (Biyadh) 2,980 m</text>

              <line x1="40" y1="210" x2="680" y2="210" stroke="rgba(16, 185, 129, 0.4)" strokeDasharray="4 2" />
              <text x="50" y="205" fill="#10b981" fontSize="9">Target Reservoir Zone (Arab-D) 3,870 m TVD</text>

              {/* Rig Derrick Icon at Surface */}
              <polygon points="70,20 60,40 80,40" fill="#38bdf8" />
              <text x="85" y="32" fill="#94a3b8" fontSize="9">Surface Rig SAR-214 (GL: 0 m)</text>

              {/* Vertical Section before KOP */}
              <line x1="70" y1="40" x2="70" y2="75" stroke="#38bdf8" strokeWidth="3" />
              <circle cx="70" cy="75" r="3" fill="#f43f5e" />
              <text x="80" y="77" fill="#f43f5e" fontSize="8">KOP 950 m</text>

              {/* Build Section Curve into Horizontal Tangent */}
              <path
                d="M 70 75 Q 120 180 340 210 L 640 215"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="3"
              />

              {/* Target Entry Point Box */}
              <rect x="330" y="200" width="30" height="20" fill="none" stroke="#10b981" strokeWidth="1.5" />
              <text x="365" y="214" fill="#10b981" fontSize="9">Target Entry (Inc: 82.5°)</text>

              {/* Final TD point */}
              <circle cx="640" cy="215" r="4" fill="#10b981" />
              <text x="560" y="235" fill="#94a3b8" fontSize="9">TD 6,420 m MD (3,870 m TVD)</text>
            </svg>
          </div>
        </div>
      ) : (
        /* Detailed Survey Station Table */
        <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-sky-950/50 text-[10px] text-slate-500">
                <th className="pb-2">MD (m)</th>
                <th className="pb-2">INC (deg)</th>
                <th className="pb-2">AZI (deg)</th>
                <th className="pb-2">TVD (m)</th>
                <th className="pb-2">NORTH (m)</th>
                <th className="pb-2">EAST (m)</th>
                <th className="pb-2">DLS (°/30m)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-slate-300">
              {SYNTHETIC_SURVEY_STATIONS.map((st, i) => (
                <tr key={i} className="hover:bg-slate-900/40">
                  <td className="py-1.5 text-sky-400">{st.mdM}</td>
                  <td className="py-1.5">{st.incDeg}°</td>
                  <td className="py-1.5">{st.aziDeg}°</td>
                  <td className="py-1.5 text-slate-200">{st.tvdM}</td>
                  <td className="py-1.5">{st.northM}</td>
                  <td className="py-1.5">{st.eastM}</td>
                  <td className="py-1.5 text-emerald-400">{st.dlsDeg30m}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
