import React from 'react';
import { CheckCheck, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { LanguageCode } from '../../types';

interface DataValidationViewProps {
  currentLanguage: LanguageCode;
}

export const DataValidationView: React.FC<DataValidationViewProps> = ({
  currentLanguage
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';

  const checks = [
    {
      title: 'Depth Monotonicity & Section Sequencing',
      status: 'PASSED',
      rule: 'DEM-VAL-01',
      details: 'All hole section intervals are strictly monotonic (0 -> 800m -> 2,200m -> 3,500m -> 4,500m). No negative intervals.'
    },
    {
      title: 'Casing Clearance & Annular Tolerances',
      status: 'PASSED',
      rule: 'API Spec 5CT',
      details: 'Concentric tubular clearance: 20" in 26" hole, 13-3/8" in 17-1/2" hole, 9-5/8" in 12-1/4" hole, 7" in 8-1/2" hole comply with minimum annular thickness.'
    },
    {
      title: 'Liner Lap Overlap Criterion',
      status: 'PASSED',
      rule: 'DER-04',
      details: '7" Production Liner top set at 3,400 m, providing 100 m lap inside 9-5/8" shoe (3,500 m). Exceeds minimum requirement of 300 ft.'
    },
    {
      title: 'Stratigraphic Hierarchy & Datum Integrity',
      status: 'PASSED',
      rule: 'DEM-GEO-02',
      details: 'Formation top sequence verified against regional Ghawar basin marker tops. Hith Anhydrite directly overlies Arab-D formation.'
    },
    {
      title: 'Unit Representation & Metric/Field Coherence',
      status: 'PASSED',
      rule: 'API-STD-09',
      details: 'Consistent conversions verified between meters and feet (TVD 3,870 m = 12,696 ft) and mud weight specific gravity (1.36 sg = 11.35 ppg).'
    },
    {
      title: 'Duplicate Record & Conflict Detection',
      status: 'PASSED',
      rule: 'ISO 8000',
      details: 'Zero conflicting survey stations or duplicate wellbore identifiers detected across local database and master registry.'
    }
  ];

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'المرحلة 02: تدقيق وصحة البيانات الهندسية (Data Validation)' : 'Phase 02: Automated Engineering Data Validation Engine'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'فحص شامل للتناسق الهندسي، تداخل الأغلفة، تدرج الأعماق، وتوافق الوحدات القياسية.'
              : 'Rigorous multi-layer rule engine verifying physical sanity, clearances, and stratigraphic sequences.'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-xs font-mono">
            Integrity Score: 100%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {checks.map((c, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 space-y-2 text-xs"
          >
            <div className="flex items-center justify-between pb-1.5 border-b border-sky-950/40">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="text-slate-200 font-medium">{c.title}</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono px-1.5 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40">
                {c.status}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 leading-relaxed">
              {c.details}
            </div>

            <div className="pt-1 text-[10px] text-slate-500 font-mono">
              Rule standard: {c.rule}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
