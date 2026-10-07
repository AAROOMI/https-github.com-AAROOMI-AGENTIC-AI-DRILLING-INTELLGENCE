import React, { useState } from 'react';
import { Layers, MapPin, Compass, CheckCircle2, Save, FileUp } from 'lucide-react';
import { LanguageCode, WellData } from '../../types';
import { SYNTHETIC_ACTIVE_WELL } from '../../services/data/initialSyntheticData';

interface DataCollectionViewProps {
  currentLanguage: LanguageCode;
}

export const DataCollectionView: React.FC<DataCollectionViewProps> = ({
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [well, setWell] = useState<WellData>(SYNTHETIC_ACTIVE_WELL);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'المرحلة 01: جمع وتغذية البيانات الهندسية (Data Collection)' : 'Phase 01: Engineering Data Collection & Ingestion'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'تغذية بيانات رأس البئر، الإحداثيات الجغرافية، العمق المستهدف، وتجهيزات منصة الحفر.'
              : 'Structured ingestion of well header, geodetic coordinates, surface elevations, and target specifications.'}
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs flex items-center gap-1.5 transition-colors"
        >
          <Save className="w-3.5 h-3.5" />
          <span>{isRtl ? 'حفظ البيانات' : 'Save Header'}</span>
        </button>
      </div>

      {savedNotice && (
        <div className="p-2.5 rounded bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Well parameters saved and committed to Postgres & Firebase backend.</span>
        </div>
      )}

      {/* Well Parameters Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 space-y-2.5 text-xs">
          <div className="text-sky-400 text-xs font-mono pb-1.5 border-b border-sky-950/40">
            A. IDENTIFICATION & ASSET
          </div>

          <div>
            <label className="text-[10px] text-slate-500">Well Identifier / Name:</label>
            <input
              type="text"
              value={well.name}
              onChange={(e) => setWell({ ...well, name: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 mt-0.5"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-500">Field Sector:</label>
            <input
              type="text"
              value={well.field}
              onChange={(e) => setWell({ ...well, field: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 mt-0.5"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-500">Operator Entity:</label>
            <input
              type="text"
              value={well.operator}
              readOnly
              className="w-full bg-slate-900/40 border border-slate-800/50 rounded px-2.5 py-1 text-xs text-slate-400 mt-0.5"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-500">Assigned Drilling Rig:</label>
            <input
              type="text"
              value={well.rig}
              onChange={(e) => setWell({ ...well, rig: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 mt-0.5"
            />
          </div>
        </div>

        <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 space-y-2.5 text-xs">
          <div className="text-sky-400 text-xs font-mono pb-1.5 border-b border-sky-950/40">
            B. GEODETICS & SURFACE LOCATION
          </div>

          <div>
            <label className="text-[10px] text-slate-500">Surface Latitude (WGS84):</label>
            <input
              type="number"
              value={well.surfaceLat}
              onChange={(e) => setWell({ ...well, surfaceLat: parseFloat(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 mt-0.5 font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-500">Surface Longitude (WGS84):</label>
            <input
              type="number"
              value={well.surfaceLng}
              onChange={(e) => setWell({ ...well, surfaceLng: parseFloat(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 mt-0.5 font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-500">Surface Elevation (MSL):</label>
            <input
              type="number"
              value={well.elevationM}
              onChange={(e) => setWell({ ...well, elevationM: parseFloat(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 mt-0.5 font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-500">UTM Projection Zone:</label>
            <input
              type="text"
              readOnly
              value="Zone 39 North (Central Meridian 51°E)"
              className="w-full bg-slate-900/40 border border-slate-800/50 rounded px-2.5 py-1 text-xs text-slate-400 mt-0.5"
            />
          </div>
        </div>

        <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 space-y-2.5 text-xs">
          <div className="text-sky-400 text-xs font-mono pb-1.5 border-b border-sky-950/40">
            C. DEPTH OBJECTIVES & SPUD SCHEDULE
          </div>

          <div>
            <label className="text-[10px] text-slate-500">Target TVD Depth (m):</label>
            <input
              type="number"
              value={well.targetDepthM}
              onChange={(e) => setWell({ ...well, targetDepthM: parseFloat(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 mt-0.5 font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-500">Planned Measured Depth MD (m):</label>
            <input
              type="number"
              value={well.measuredDepthM}
              onChange={(e) => setWell({ ...well, measuredDepthM: parseFloat(e.target.value) })}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 mt-0.5 font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-500">Spud Date Target:</label>
            <input
              type="date"
              value={well.spudDate}
              onChange={(e) => setWell({ ...well, spudDate: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1 text-xs text-slate-200 mt-0.5 font-mono"
            />
          </div>

          <div>
            <label className="text-[10px] text-slate-500">Target Formation Horizon:</label>
            <input
              type="text"
              readOnly
              value="Arab-D Carbonate Reservoir (Jurassic)"
              className="w-full bg-slate-900/40 border border-slate-800/50 rounded px-2.5 py-1 text-xs text-emerald-400 mt-0.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
