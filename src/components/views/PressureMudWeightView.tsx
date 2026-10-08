import React, { useState } from 'react';
import { Gauge, ShieldCheck, AlertTriangle, Sliders, CheckCircle2 } from 'lucide-react';
import { LanguageCode } from '../../types';
import { SYNTHETIC_MUD_WEIGHT_PROFILE } from '../../services/data/initialSyntheticData';

interface PressureMudWeightViewProps {
  currentLanguage: LanguageCode;
}

export const PressureMudWeightView: React.FC<PressureMudWeightViewProps> = ({
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [testedMudWeight, setTestedMudWeight] = useState<number>(1.36);

  // Safety evaluations against Arab-D pore pressure (1.28 sg) and fracture gradient (1.74 sg)
  const porePressureSg = 1.28;
  const fractureGradientSg = 1.74;
  const overbalanceMarginPsi = Math.round((testedMudWeight - porePressureSg) * 0.433 * 3870 * 3.28084);
  const fracSafetyBufferPsi = Math.round((fractureGradientSg - testedMudWeight) * 0.433 * 3870 * 3.28084);

  const isSafeWindow = testedMudWeight >= 1.32 && testedMudWeight <= 1.46;

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'تحليل الضغوط ونافذة طين الحفر الآمنة' : 'Formation Pressure & Safe Mud Weight Window Engine'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'معايرة طريقة إيتون مع قراءات اختبار ضغط التكسير (LOT) من البئر المجاورة GHWR-088.'
              : 'Eaton acoustic pore pressure modeling calibrated with Leak-Off Tests from offset GHWR-088.'}
          </div>
        </div>
        <div className="text-[11px] text-emerald-400 font-mono">
          Safe Window: 1.32 - 1.46 sg (11.0 - 12.2 ppg)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column: Interactive SVG Pressure Depth Chart */}
        <div className="lg:col-span-8 p-3.5 rounded bg-[#08101e] border border-sky-950/60 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-sky-950/40">
            <span className="text-xs text-slate-200">
              Pressure Gradient vs True Vertical Depth (TVD Profile)
            </span>
            <div className="flex items-center gap-3 text-[10px]">
              <span className="flex items-center gap-1 text-sky-400">
                <span className="w-2.5 h-0.5 bg-sky-400 inline-block" /> Pore Pressure
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <span className="w-2.5 h-0.5 bg-rose-400 inline-block" /> Fracture Gradient
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <span className="w-2.5 h-0.5 bg-emerald-400 inline-block" /> Mud Weight Window
              </span>
            </div>
          </div>

          {/* SVG Depth Chart */}
          <div className="relative h-72 w-full bg-[#050a13] rounded p-2 border border-slate-900">
            <svg className="w-full h-full" viewBox="0 0 600 260" preserveAspectRatio="none">
              {/* Grid Lines */}
              {[50, 100, 150, 200, 250].map((y) => (
                <line key={y} x1="40" y1={y} x2="580" y2={y} stroke="#1e293b" strokeDasharray="3 3" />
              ))}
              {[150, 260, 370, 480].map((x) => (
                <line key={x} x1={x} y1="10" x2={x} y2="230" stroke="#1e293b" strokeDasharray="3 3" />
              ))}

              {/* Shaded Safe Mud Weight Operating Window */}
              <polygon
                points="220,20 280,20 340,220 270,220"
                fill="rgba(16, 185, 129, 0.12)"
                stroke="none"
              />

              {/* Pore Pressure Curve (Blue) */}
              <polyline
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
                points="180,20 200,60 215,100 230,140 245,180 270,220"
              />

              {/* Fracture Gradient Curve (Red/Rose) */}
              <polyline
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                points="420,20 400,60 380,100 365,140 350,180 340,220"
              />

              {/* Currently Selected Mud Weight Line (Emerald) */}
              <line
                x1={200 + (testedMudWeight - 1.0) * 200}
                y1="20"
                x2={200 + (testedMudWeight - 1.0) * 200}
                y2="220"
                stroke="#10b981"
                strokeWidth="2"
                strokeDasharray="4 2"
              />

              {/* Labels on SVG */}
              <text x="5" y="30" fill="#64748b" fontSize="10">0 m</text>
              <text x="5" y="125" fill="#64748b" fontSize="10">2,000 m</text>
              <text x="5" y="225" fill="#64748b" fontSize="10">3,870 m</text>

              <text x="170" y="250" fill="#64748b" fontSize="10">1.0 sg</text>
              <text x="270" y="250" fill="#64748b" fontSize="10">1.4 sg</text>
              <text x="380" y="250" fill="#64748b" fontSize="10">1.8 sg</text>
            </svg>
          </div>

          <div className="flex justify-between text-[11px] text-slate-400">
            <span>Surface TVD: 0 m</span>
            <span>Intermediate Shoe: 2,200 m</span>
            <span>Target Arab-D TD: 3,870 m</span>
          </div>
        </div>

        {/* Right Column: Interactive Test Slider & Safety Margins */}
        <div className="lg:col-span-4 p-3.5 rounded bg-[#08101e] border border-sky-950/60 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-sky-950/40">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-200">Engineer Mud Weight Tuning</span>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Tested Density:</span>
                <span className="font-mono text-emerald-400 text-sm">
                  {testedMudWeight.toFixed(2)} sg ({Math.round(testedMudWeight * 8.3454 * 10) / 10} ppg)
                </span>
              </div>
              <input
                type="range"
                min="1.15"
                max="1.65"
                step="0.01"
                value={testedMudWeight}
                onChange={(e) => setTestedMudWeight(parseFloat(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                <span>1.15 sg</span>
                <span>Rec: 1.36 sg</span>
                <span>1.65 sg</span>
              </div>
            </div>

            {/* Real-time Safety Verification Box */}
            <div className={`p-3 rounded border text-xs space-y-2 ${
              isSafeWindow
                ? 'bg-emerald-950/30 border-emerald-800/50 text-slate-200'
                : 'bg-rose-950/30 border-rose-800/50 text-rose-200'
            }`}>
              <div className="flex items-center gap-1.5 font-normal">
                {isSafeWindow ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <AlertTriangle className="w-4 h-4 text-rose-400" />
                )}
                <span>{isSafeWindow ? 'Safety Criteria Verified' : 'Operating Window Violation'}</span>
              </div>

              <div className="space-y-1 text-[11px] text-slate-300">
                <div className="flex justify-between">
                  <span>Trip Overbalance:</span>
                  <span className="font-mono text-sky-300">+{overbalanceMarginPsi} psi</span>
                </div>
                <div className="flex justify-between">
                  <span>Frac Breakdown Buffer:</span>
                  <span className="font-mono text-rose-300">{fracSafetyBufferPsi} psi</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800/60 text-[10px] text-slate-400 leading-relaxed">
              Standard Aramco Rule DEM-MW-08 enforces minimum 200 psi overbalance margin across Arab-D reservoir while avoiding lost circulation in upper Hith fractures.
            </div>
          </div>

          <button
            onClick={() => setTestedMudWeight(1.36)}
            className="w-full py-1.5 mt-2 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
          >
            Reset to Recommended (1.36 sg / 11.3 ppg)
          </button>
        </div>
      </div>
    </div>
  );
};
