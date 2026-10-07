import React, { useState } from 'react';
import { Compass, MapPin, AlertCircle, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
import { LanguageCode, OffsetWell } from '../../types';
import { SYNTHETIC_OFFSET_WELLS } from '../../services/data/initialSyntheticData';

interface OffsetIntelligenceViewProps {
  currentLanguage: LanguageCode;
}

export const OffsetIntelligenceView: React.FC<OffsetIntelligenceViewProps> = ({
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [selectedOffset, setSelectedOffset] = useState<OffsetWell>(SYNTHETIC_OFFSET_WELLS[0]);

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'تحليل ومقارنة الآبار المجاورة (Offset Well Intelligence)' : 'Offset Well Intelligence & Analog Ranking'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'تحديد أفضل الآبار المماثلة ضمن نطاق 10 كم وفق الأبعاد الجيولوجية والمسار ومشاكل الحفر السابقة.'
              : 'Multi-dimensional analog similarity model ranking adjacent wells across spatial, stratigraphy, and operational metrics.'}
          </div>
        </div>
        <div className="text-[11px] text-emerald-400 font-mono">
          Optimal Analog: GHWR-088 (92%)
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column: Ranked Offset Wells */}
        <div className="lg:col-span-5 space-y-2">
          {SYNTHETIC_OFFSET_WELLS.map((off) => {
            const isSelected = selectedOffset.id === off.id;
            return (
              <div
                key={off.id}
                onClick={() => setSelectedOffset(off)}
                className={`p-3 rounded border cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-sky-950/60 border-sky-600/70 text-slate-100'
                    : 'bg-[#08101e] border-sky-950/50 hover:border-sky-800/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                    <span className="text-xs">{off.name}</span>
                  </div>
                  <span className="font-mono text-emerald-400 text-xs">
                    {off.similarityScore}%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-400 mt-2">
                  <div>Distance: <span className="text-slate-200 font-mono">{off.distanceKm} km</span></div>
                  <div>Days to TD: <span className="text-slate-200 font-mono">{off.totalDaysToTD} d</span></div>
                  <div>Final Mud Wt: <span className="text-slate-200 font-mono">{off.finalMudWeightSg} sg</span></div>
                  <div>Profile: <span className="text-slate-200">{off.bestDesignProfile}</span></div>
                </div>

                <div className="mt-2 pt-1.5 border-t border-slate-800/60 text-[10px] text-amber-300/80 truncate">
                  Hazard: {off.keyTroubles[0]}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Multi-attribute Radar Breakdown & Spatial Map */}
        <div className="lg:col-span-7 space-y-3">
          {/* Similarity Scores Breakdown */}
          <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-sky-950/40">
              <span className="text-xs text-slate-200">
                Similarity Vector Breakdown: <span className="text-sky-400">{selectedOffset.name}</span>
              </span>
              <span className="text-xs font-mono text-emerald-400">
                Overall: {selectedOffset.similarityScore}%
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Spatial Proximity (Weight: 35%)</span>
                  <span className="font-mono text-sky-300">{selectedOffset.spatialSimilarity}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-sky-500 h-full rounded-full"
                    style={{ width: `${selectedOffset.spatialSimilarity}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Formation Tops & Lithology Match (Weight: 35%)</span>
                  <span className="font-mono text-emerald-300">{selectedOffset.formationSimilarity}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full"
                    style={{ width: `${selectedOffset.formationSimilarity}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Trajectory Curvature Similarity (Weight: 20%)</span>
                  <span className="font-mono text-cyan-300">{selectedOffset.trajectorySimilarity}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-cyan-500 h-full rounded-full"
                    style={{ width: `${selectedOffset.trajectorySimilarity}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] text-slate-300 mb-1">
                  <span>Historical Drilling Behavior (Weight: 10%)</span>
                  <span className="font-mono text-amber-300">{selectedOffset.drillingBehaviorSimilarity}%</span>
                </div>
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-500 h-full rounded-full"
                    style={{ width: `${selectedOffset.drillingBehaviorSimilarity}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Known Drilling Troubles in Selected Analog */}
          <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60">
            <div className="text-xs text-slate-200 mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Historical Troubles Recorded in {selectedOffset.name}</span>
            </div>
            <div className="space-y-1.5">
              {selectedOffset.keyTroubles.map((trb, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded bg-slate-900/60 border border-slate-800/60 text-xs text-slate-300 flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>{trb}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
