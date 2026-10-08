import React, { useState } from 'react';
import {
  Compass,
  Gauge,
  Layers,
  ShieldCheck,
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Sliders,
  Volume2,
  Play,
  Square,
  Sparkles,
  Info,
  BookOpen
} from 'lucide-react';
import { LanguageCode, WorkflowPhase } from '../../types';
import {
  SYNTHETIC_ACTIVE_WELL,
  SYNTHETIC_CASING_SECTIONS,
  SYNTHETIC_FORMATION_TOPS,
  SYNTHETIC_OFFSET_WELLS,
  SYNTHETIC_WORKFLOW_PHASES
} from '../../services/data/initialSyntheticData';
import { CentralLanguageRouter } from '../../services/voice/LanguageRouter';
import { CustomVoiceService } from '../../services/voice/CustomVoiceService';
import { NavViewId } from '../Sidebar';

interface DashboardViewProps {
  currentLanguage: LanguageCode;
  onNavigate: (view: NavViewId) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  currentLanguage,
  onNavigate
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const well = SYNTHETIC_ACTIVE_WELL;

  const [activeStageId, setActiveStageId] = useState<string>('well-design-selection');
  const [isSpeakingStage, setIsSpeakingStage] = useState<boolean>(false);
  const [currentSpokenText, setCurrentSpokenText] = useState<string>('');

  // Detailed spoken engineering explanations for each of the 12 processing steps
  const stageExplanations: Record<string, {
    titleEn: string;
    titleAr: string;
    agentName: string;
    metricLabel: string;
    metricValue: string;
    percent: number;
    speechEn: string;
    speechAr: string;
    speechNajdi: string;
    viewId: NavViewId;
  }> = {
    'data-collection': {
      titleEn: '01. Data Collection',
      titleAr: '01. جمع البيانات',
      agentName: 'Data Intelligence Agent',
      metricLabel: 'Parameters Ingested',
      metricValue: '14 Verified',
      percent: 100,
      speechEn: 'Phase 1 Data Collection has ingested all well headers for Well-102, geodetic coordinates in UTM Zone 39 North, and target depth at 3,870 meters true vertical depth.',
      speechAr: 'المرحلة الأولى: تم استكمال جمع كافة معطيات رأس البئر 102، وتدقيق الإحداثيات الجغرافية بدقة، مع تحديد العمق المستهدف عند 3,870 متراً عمودياً.',
      speechNajdi: 'يا هلا بك، المرحلة الأولى اكتملت بنجاح. دخلنا كل بيانات البئر مية واثنين وإحداثيات الموقع وعمق الهدف عند ثلاثة آلاف وثمانمية وسبعين متر.',
      viewId: 'data-collection'
    },
    'data-validation': {
      titleEn: '02. Data Validation',
      titleAr: '02. تدقيق وصحة البيانات',
      agentName: 'Validation Agent',
      metricLabel: 'Integrity Rating',
      metricValue: '100% Passed',
      percent: 100,
      speechEn: 'Phase 2 Validation verified depth monotonicity and casing shoe clearances under API Spec 5CT. Zero conflicting intervals detected.',
      speechAr: 'المرحلة الثانية: تم تدقيق صحة البيانات والتأكد من تدرج الأعماق وفواصل الأغلفة وخلوها من أي تعارض أو تكرار.',
      speechNajdi: 'المرحلة الثانية فحصنا فيها تدرج الأعماق ومقاسات الأغلفة، والنتائج مية بالمية وما فيه أي تعارض هندسي طال عمرك.',
      viewId: 'data-validation'
    },
    'historical-intelligence': {
      titleEn: '03. Historical Wells',
      titleAr: '03. ذكاء الآبار التاريخية',
      agentName: 'Historical Well Agent',
      metricLabel: 'Offset Wells Mined',
      metricValue: '28 Wells',
      percent: 100,
      speechEn: 'Phase 3 Historical Intelligence analyzed 28 analog wells across Ghawar South. Average drilling duration is 36.2 days with twelve key lessons integrated.',
      speechAr: 'المرحلة الثالثة: تم تحليل سجلات 28 بئراً تاريخية بجنوب الغوار، ودمج 12 درساً مستفاداً لتفادي فقدان طين الحفر وتآكل الرؤوس.',
      speechNajdi: 'المرحلة الثالثة فحصنا ثمانية وعشرين بئر قديمة بجنوب الغوار واستفدنا من اثناعش تجربة لتفادي فقدان الطين وتوفير وقت الحفر.',
      viewId: 'historical-intelligence'
    },
    'ongoing-intelligence': {
      titleEn: '04. Ongoing Operations',
      titleAr: '04. العمليات الجارية',
      agentName: 'Ongoing Well Agent',
      metricLabel: 'Telemetry Status',
      metricValue: 'Rig SAR-214 Live',
      percent: 100,
      speechEn: 'Phase 4 Ongoing Intelligence is streaming real-time telemetry from Rig SAR-214: Standpipe pressure is 2,840 psi, ROP is 18.5 meters per hour, and gas units are safe.',
      speechAr: 'المرحلة الرابعة: البث اللحظي لمنصة الحفر SAR-214 نشط، وضغط الأنابيب عند 2,840 رطل/بوصة مربعة ومعدل الحفر 18.5 متر/ساعة.',
      speechNajdi: 'المرحلة الرابعة مربوطة بالبث المباشر للمنصة SAR-214، والضغط ممتاز ومعدل الاختراق ثمانية عشر فاصلة خمسة متر بالساعة.',
      viewId: 'ongoing-intelligence'
    },
    'offset-analysis': {
      titleEn: '05. Offset Intelligence',
      titleAr: '05. الآبار المجاورة',
      agentName: 'Offset Intelligence Agent',
      metricLabel: 'Optimal Analog Match',
      metricValue: 'GHWR-088 (92%)',
      percent: 92,
      speechEn: 'Phase 5 Offset Analysis ranked nearby wells. Offset Well A (GHWR-088) is the primary analog with 92% multi-attribute similarity at 2.1 kilometers distance.',
      speechAr: 'المرحلة الخامسة: البئر المجاورة GHWR-088 هي النظير الأفضل بنسبة تشابه 92% ومسافة 2.1 كيلومتر، وتم اعتماد سجلاتها كمعيار.',
      speechNajdi: 'المرحلة الخامسة صنفنا الآبار القريبة، والبئر (أ) على بعد اثنين كيلو ونسبة تشابهها اثنين وتسعين بالمية وهي أفضل مقارنة لنا.',
      viewId: 'offset-analysis'
    },
    'pressure-mudweight': {
      titleEn: '06. Pressure & Mud Weight',
      titleAr: '06. الضغط وطين الحفر',
      agentName: 'Pressure & Mud Weight Agent',
      metricLabel: 'Operating Window',
      metricValue: '1.36 sg (11.3 ppg)',
      percent: 93,
      speechEn: 'Phase 6 Pressure and Mud Weight computed a safe window between 1.32 and 1.46 specific gravity. The recommended density of 1.36 sg provides a 250 psi overbalance margin.',
      speechAr: 'المرحلة السادسة: نافذة وزن طين الحفر الآمنة بين 1.32 و 1.46 غ/سم³. الوزن الموصى به 1.36 غ/سم³ يمنح هامش أمان 250 رطل ضد تدفق الغاز.',
      speechNajdi: 'المرحلة السادسة حسبنا وزن الطين المطلوب، والأفضل هو واحد فاصلة ستة وثلاثين (11.3 باوند) يعطيك هامش أمان ميتين وخمسين رطل ضد الغاز.',
      viewId: 'pressure-mudweight'
    },
    'well-design-selection': {
      titleEn: '07. Well Design (K-2)',
      titleAr: '07. تصميم البئر (K-2)',
      agentName: 'Well Design Agent',
      metricLabel: 'Selected Architecture',
      metricValue: 'K-2 Slim (92%)',
      percent: 92,
      speechEn: 'Phase 7 Well Design selected the K-2 Slim Casing Profile with 92% confidence over K-3 and MK-2. Estimated duration is 32 drilling days with optimized steel weight.',
      speechAr: 'المرحلة السابعة: تم اختيار تصميم K-2 المطور بثقة 92%، ويوفر 18% من وزن الفولاذ بزمن حفر متوقع 32 يوماً.',
      speechNajdi: 'المرحلة السابعة اعتمدنا تصميم K-2 بنسبة ثقة اثنين وتسعين بالمية، يوفر تكاليف الفولاذ ومناسب جداً للوصول لمكمن العرب دي.',
      viewId: 'well-design-selection'
    },
    'casing-hole-grade': {
      titleEn: '08. Casing & Grade',
      titleAr: '08. الأغلفة وتدرج المعادن',
      agentName: 'Casing Design Agent',
      metricLabel: 'Strings & Metallurgy',
      metricValue: '4 Strings / Q-125',
      percent: 95,
      speechEn: 'Phase 8 Casing and Grade verified 4 strings: 20 inch surface, 13-3/8 intermediate, 9-5/8 production, and 7 inch liner with Q-125 sour service metallurgy.',
      speechAr: 'المرحلة الثامنة: أربعة مقاطع أغلفة معتمدة ومطابقة لمواصفات NACE MR0175 المقاومة للغاز الحامضي، وعامل أمان الضغط الداخلي 1.78.',
      speechNajdi: 'المرحلة الثامنة اعتمدنا أربع مقاطع أغلفة مع بطانة سبعة بوصة بمعدن Q-125 المقاوم لغاز H2S وعوامل الأمان مطابقة للمواصفات.',
      viewId: 'casing-hole-grade'
    },
    'execution-objectives': {
      titleEn: '09. Execution Objectives',
      titleAr: '09. أهداف التنفيذ',
      agentName: 'Execution Objective Agent',
      metricLabel: 'Horizontal Drain',
      metricValue: '1,240 m Drain',
      percent: 97,
      speechEn: 'Phase 9 Execution Objectives defined target entry at 3,870 meters TVD with 1,240 meters of net horizontal reservoir contact at 82.5 degrees inclination.',
      speechAr: 'المرحلة التاسعة: نقطة دخول المكمن محددة عند 3,870 متراً عمودياً مع تماس أفقي بطول 1,240 متراً بزاوية ميل 82.5 درجة.',
      speechNajdi: 'المرحلة التاسعة حددنا نقطة الدخول عند ثلاثة آلاف وثمانمية وسبعين متر وزاوية ميل 82.5 مع تماس أفقي ألف وميتين وأربعين متر.',
      viewId: 'execution-objectives'
    },
    'directional-planning': {
      titleEn: '10. Directional & 3D Path',
      titleAr: '10. المسار الاتجاهي ثلاثي الأبعاد',
      agentName: 'Directional Planning Agent',
      metricLabel: 'Trajectory Curvature',
      metricValue: 'DLS 0.83° / 30m',
      percent: 94,
      speechEn: 'Phase 10 Directional Planning computed the 3D trajectory using Minimum Curvature. Maximum dogleg severity is 0.83 degrees per 30 meters with anti-collision safety factor 3.65.',
      speechAr: 'المرحلة العاشرة: تم حساب المسار ثلاثي الأبعاد بخوارزمية أقل انحناء، وأقصى انحراف 0.83 درجة لكل 30 متراً ومعامل تفادي تصادم 3.65.',
      speechNajdi: 'المرحلة العاشرة خططنا المسار الاتجاهي ثلاثي الأبعاد بانحناء سلس ومعامل أمان ممتاز ضد تصادم الآبار المجاورة.',
      viewId: 'directional-planning'
    },
    'human-approval': {
      titleEn: '11. Human Approval Gate',
      titleAr: '11. بوابة اعتماد المهندس',
      agentName: 'Engineer Review Agent',
      metricLabel: 'Authority Gate',
      metricValue: 'Awaiting Sign-off',
      percent: 85,
      speechEn: 'Phase 11 Human Approval Gate is the mandatory engineering gate. The AI recommendation is compiled and awaiting the Lead Drilling Engineer signature before field release.',
      speechAr: 'المرحلة الحادية عشرة: بوابة الاعتماد البشري الإلزامية. كافة التوصيات جاهزة وفي انتظار توقيع واعتماد مهندس الحفر المسؤول.',
      speechNajdi: 'المرحلة الحادية عشرة هي بوابة الاعتماد الإلزامية للمهندس، كل المعطيات جاهزة وتنتظر توقيعك الرسمي قبل بدء العمليات الميدانية.',
      viewId: 'human-approval'
    },
    'drilling-program': {
      titleEn: '12. Drilling Program',
      titleAr: '12. برنامج الحفر النهائي',
      agentName: 'Drilling Program Agent',
      metricLabel: 'Document Package',
      metricValue: '12 Sections Ready',
      percent: 90,
      speechEn: 'Phase 12 Comprehensive Drilling Program compiles all approved parameters into a 12-section operational manual ready for export in PDF, Sheets, or JSON.',
      speechAr: 'المرحلة الثانية عشرة: برنامج الحفر المتكامل جاهز بـ 12 قسماً تشغيلياً معتمداً للتصدير بصيغة PDF وجداول إكسل وشيتس.',
      speechNajdi: 'المرحلة الثانية عشرة يتولد فيها برنامج الحفر الكامل المكون من اثناعش قسم جاهز للطباعة والتصدير بصيغة PDF أو شيتس.',
      viewId: 'drilling-program'
    }
  };

  const handleStageClick = async (stageKey: string) => {
    setActiveStageId(stageKey);
    const stage = stageExplanations[stageKey];
    if (!stage) return;

    const speechText =
      currentLanguage === 'ar-najdi'
        ? stage.speechNajdi
        : currentLanguage === 'ar'
        ? stage.speechAr
        : stage.speechEn;

    setCurrentSpokenText(speechText);
    setIsSpeakingStage(true);

    await CentralLanguageRouter.routeAndSpeak(speechText, {
      agentName: stage.agentName,
      language: currentLanguage,
      onStart: () => setIsSpeakingStage(true),
      onEnd: () => setIsSpeakingStage(false),
      onError: () => setIsSpeakingStage(false)
    });
  };

  const handleStopSpeech = () => {
    CustomVoiceService.stopSpeaking();
    setIsSpeakingStage(false);
  };

  const activeStageData = stageExplanations[activeStageId] || stageExplanations['well-design-selection'];

  return (
    <div className="space-y-4">
      {/* 1. Real Aramco Engineer Avatar Voice Briefing Bar */}
      <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/70 flex flex-col md:flex-row items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          {/* Real Engineer Photo */}
          <div className="relative shrink-0">
            <div className={`w-14 h-14 rounded-full border-2 p-0.5 bg-slate-900 overflow-hidden transition-all duration-300 ${
              isSpeakingStage
                ? 'border-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.4)] scale-105'
                : 'border-sky-700/60'
            }`}>
              <img
                src="/aramco_engineer.jpg"
                alt="Aramco Lead Drilling Engineer"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            {isSpeakingStage && (
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-100 font-medium">
                {isRtl ? 'المهندس أحمد الغامدي (الذكاء الاصطناعي لحفر أرامكو)' : 'Eng. Ahmad Al-Ghamdi (Aramco Lead Drilling AI)'}
              </span>
              <span className="text-[10px] px-2 py-0.2 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-800/40 font-mono">
                {isRtl ? 'صوت بشري طبيعي نشط' : 'Natural Voice Active'}
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 max-w-xl">
              {isSpeakingStage ? (
                <span className="text-cyan-300 animate-pulse">
                  "{currentSpokenText || activeStageData.speechEn}"
                </span>
              ) : (
                <span>
                  {isRtl
                    ? 'اضغط على أي عداد من الـ 12 مرحلة أدناه لسماع الشرح الصوتي الهندسي المباشر.'
                    : 'Click any of the 12 processing step meters below to hear immediate voice explanation.'}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Controls & User Guide Shortcut */}
        <div className="flex items-center gap-2 shrink-0">
          {isSpeakingStage ? (
            <button
              onClick={handleStopSpeech}
              className="px-2.5 py-1 rounded bg-rose-950/60 border border-rose-800/50 hover:bg-rose-900/60 text-rose-300 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Square className="w-3 h-3 fill-rose-300" />
              <span>{isRtl ? 'إيقاف الصوت' : 'Stop Voice'}</span>
            </button>
          ) : (
            <button
              onClick={() => handleStageClick(activeStageId)}
              className="px-2.5 py-1 rounded bg-sky-950/80 border border-cyan-800/50 hover:bg-sky-900/60 text-cyan-300 text-xs flex items-center gap-1.5 transition-colors"
            >
              <Play className="w-3 h-3 fill-cyan-300" />
              <span>{isRtl ? 'استمع للمرحلة الحالية' : 'Hear Current Stage'}</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('user-guide')}
            className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3 h-3" />
            <span>{isRtl ? 'دليل الاستخدام الصوتي' : 'Audio User Guide'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top Executive Telemetry Gauges Ribbon (Visual Needle & Circular Meters) */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2.5">
        {/* Meter 1: Well Readiness Dial */}
        <div className="p-2.5 rounded bg-[#091322] border border-sky-950/60 flex flex-col items-center text-center">
          <div className="text-[10px] text-slate-400 mb-1">{isRtl ? 'جاهزية البئر' : 'Well Readiness'}</div>
          {/* SVG Circular Meter */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.2"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400"
                strokeDasharray="92, 100"
                strokeWidth="3.2"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-xs font-mono text-emerald-300">92%</div>
          </div>
          <div className="text-[9px] text-emerald-400 font-mono mt-1">Ready for Sign-off</div>
        </div>

        {/* Meter 2: Operating Mud Weight Gauge */}
        <div className="p-2.5 rounded bg-[#091322] border border-sky-950/60 flex flex-col items-center text-center">
          <div className="text-[10px] text-slate-400 mb-1">{isRtl ? 'وزن الطين' : 'Mud Weight'}</div>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.2"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-cyan-400"
                strokeDasharray="75, 100"
                strokeWidth="3.2"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-[11px] font-mono text-cyan-300">1.36 sg</div>
          </div>
          <div className="text-[9px] text-slate-400 font-mono mt-1">11.35 ppg</div>
        </div>

        {/* Meter 3: Standpipe Pressure (SPP) Needle Gauge */}
        <div className="p-2.5 rounded bg-[#091322] border border-sky-950/60 flex flex-col items-center text-center">
          <div className="text-[10px] text-slate-400 mb-1">{isRtl ? 'ضغط الأنابيب SPP' : 'Standpipe (SPP)'}</div>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16" viewBox="0 0 60 50">
              {/* Semi-circular dial arc */}
              <path d="M 10 40 A 22 22 0 0 1 50 40" fill="none" stroke="#1e293b" strokeWidth="4" />
              <path d="M 10 40 A 22 22 0 0 1 38 18" fill="none" stroke="#38bdf8" strokeWidth="4" />
              {/* Needle pointer */}
              <line x1="30" y1="40" x2="38" y2="20" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
              <circle cx="30" cy="40" r="3" fill="#64748b" />
            </svg>
            <div className="absolute bottom-1 text-[10px] font-mono text-sky-300">2,840 psi</div>
          </div>
          <div className="text-[9px] text-emerald-400 font-mono mt-0.5">Optimal Range</div>
        </div>

        {/* Meter 4: Real-time ROP Meter */}
        <div className="p-2.5 rounded bg-[#091322] border border-sky-950/60 flex flex-col items-center text-center">
          <div className="text-[10px] text-slate-400 mb-1">{isRtl ? 'معدل الاختراق ROP' : 'ROP Drilling'}</div>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.2"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-emerald-400"
                strokeDasharray="62, 100"
                strokeWidth="3.2"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-[11px] font-mono text-emerald-300">18.5</div>
          </div>
          <div className="text-[9px] text-slate-400 font-mono mt-1">m / hr (Arab-D)</div>
        </div>

        {/* Meter 5: Surface Torque Dial */}
        <div className="p-2.5 rounded bg-[#091322] border border-sky-950/60 flex flex-col items-center text-center">
          <div className="text-[10px] text-slate-400 mb-1">{isRtl ? 'عزم الدوران' : 'Torque'}</div>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16" viewBox="0 0 60 50">
              <path d="M 10 40 A 22 22 0 0 1 50 40" fill="none" stroke="#1e293b" strokeWidth="4" />
              <path d="M 10 40 A 22 22 0 0 1 35 19" fill="none" stroke="#f59e0b" strokeWidth="4" />
              <line x1="30" y1="40" x2="35" y2="21" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
              <circle cx="30" cy="40" r="3" fill="#64748b" />
            </svg>
            <div className="absolute bottom-1 text-[10px] font-mono text-amber-300">14.2k</div>
          </div>
          <div className="text-[9px] text-slate-400 font-mono mt-0.5">ft - lb</div>
        </div>

        {/* Meter 6: Trip Overbalance Safety Dial */}
        <div className="p-2.5 rounded bg-[#091322] border border-sky-950/60 flex flex-col items-center text-center">
          <div className="text-[10px] text-slate-400 mb-1">{isRtl ? 'هامش الأمان' : 'Trip Margin'}</div>
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800"
                strokeWidth="3.2"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-sky-400"
                strokeDasharray="83, 100"
                strokeWidth="3.2"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute text-[10px] font-mono text-sky-300">+250</div>
          </div>
          <div className="text-[9px] text-emerald-400 font-mono mt-1">psi Safe Margin</div>
        </div>
      </div>

      {/* 3. The 12 Processing Steps Visual Grid with Circular Radial Dial Meters (Click-to-Speak Enabled!) */}
      <div className="p-4 rounded bg-[#08101e] border border-sky-950/70 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-sky-950/40">
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-emerald-400" />
            <span className="text-xs text-slate-200 font-medium">
              {isRtl ? 'المقاييس الدائرية لمراحل معالجة الحفر الـ 12 (اضغط لسماع الشرح الصوتي)' : 'The 12 Processing Step Radial Dial Meters (Click to Speak & Explain)'}
            </span>
          </div>
          <span className="text-[10px] text-cyan-400 font-mono">
            Interactive AI Voice Commentary Enabled
          </span>
        </div>

        {/* 12 Circular Dial Meters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-2">
          {Object.entries(stageExplanations).map(([stageKey, stage], idx) => {
            const isSelected = activeStageId === stageKey;
            const isSpeakingThis = isSpeakingStage && activeStageId === stageKey;

            return (
              <div
                key={stageKey}
                onClick={() => handleStageClick(stageKey)}
                className={`p-2 rounded border cursor-pointer transition-all flex flex-col items-center text-center ${
                  isSelected
                    ? 'bg-sky-950/70 border-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.3)] scale-[1.02]'
                    : 'bg-[#060c16] border-sky-950/60 hover:border-sky-800 hover:bg-slate-900/40'
                }`}
              >
                {/* Stage Order Badge */}
                <div className="w-full flex justify-between items-center text-[9px] text-slate-500 font-mono mb-1">
                  <span>#{idx + 1}</span>
                  {isSpeakingThis ? (
                    <Volume2 className="w-2.5 h-2.5 text-emerald-400 animate-bounce" />
                  ) : stage.percent >= 100 ? (
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                  ) : (
                    <Clock className="w-2.5 h-2.5 text-amber-400" />
                  )}
                </div>

                {/* Circular Radial Gauge */}
                <div className="relative w-12 h-12 flex items-center justify-center my-0.5">
                  <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={
                        isSelected
                          ? 'text-cyan-400'
                          : stage.percent >= 100
                          ? 'text-emerald-400'
                          : 'text-amber-400'
                      }
                      strokeDasharray={`${stage.percent}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute text-[10px] font-mono text-slate-200">
                    {stage.percent}%
                  </div>
                </div>

                {/* Stage Title */}
                <div className="text-[10px] text-slate-200 truncate w-full mt-1 font-medium">
                  {isRtl ? stage.titleAr.replace(/^\d+\.\s*/, '') : stage.titleEn.replace(/^\d+\.\s*/, '')}
                </div>

                {/* Key Metric Label */}
                <div className="text-[9px] text-cyan-400 font-mono truncate w-full mt-0.5">
                  {stage.metricValue}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Stage Audio Explanation Banner */}
        <div className="p-3 rounded bg-slate-900/60 border border-sky-900/40 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 flex items-center justify-center shrink-0">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-slate-100 font-medium">
                  {isRtl ? activeStageData.titleAr : activeStageData.titleEn}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">
                  ({activeStageData.agentName})
                </span>
              </div>
              <div className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                {currentLanguage === 'ar-najdi'
                  ? activeStageData.speechNajdi
                  : currentLanguage === 'ar'
                  ? activeStageData.speechAr
                  : activeStageData.speechEn}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleStageClick(activeStageId)}
              className="px-2.5 py-1 rounded bg-sky-950/80 border border-cyan-800/60 text-cyan-300 hover:text-cyan-200 text-xs flex items-center gap-1 transition-colors"
            >
              <Volume2 className="w-3 h-3" />
              <span>{isRtl ? 'إعادة الاستماع' : 'Replay Voice'}</span>
            </button>
            <button
              onClick={() => onNavigate(activeStageData.viewId)}
              className="px-2.5 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs flex items-center gap-1 transition-colors"
            >
              <span>{isRtl ? 'فتح مساحة العمل' : 'Launch Workspace'}</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Complete Interactive 12-Step Visual Flow Diagram */}
      <div className="p-4 rounded bg-[#08101e] border border-sky-950/70 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-sky-950/40">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-sky-400" />
            <span className="text-xs text-slate-200 font-medium">
              {isRtl ? 'المخطط الهندسي التفاعلي لمسار تدفق القرارات والبيانات' : 'Interactive End-to-End Drilling Decision Flow Diagram'}
            </span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            Deterministic Physics • Governed Agentic Gate
          </span>
        </div>

        {/* SVG Flow Diagram */}
        <div className="h-44 w-full bg-[#050a13] rounded p-2 border border-slate-900 relative overflow-x-auto">
          <svg className="w-full h-full min-w-[760px]" viewBox="0 0 900 150">
            {/* Animated Flow Connector Lines */}
            <path d="M 60 75 L 140 75 L 220 75 L 300 75 L 380 75 L 460 75 L 540 75 L 620 75 L 700 75 L 780 75 L 850 75" fill="none" stroke="#1e293b" strokeWidth="3" />
            <path d="M 60 75 L 700 75" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeDasharray="6 4" className="animate-pulse" />

            {/* Nodes */}
            {[
              { id: 'data-collection', x: 60, label: '01. Data', sub: 'UTM 39N' },
              { id: 'data-validation', x: 140, label: '02. Validate', sub: 'API 5CT' },
              { id: 'historical-intelligence', x: 220, label: '03. History', sub: '28 Wells' },
              { id: 'ongoing-intelligence', x: 300, label: '04. Telemetry', sub: 'SAR-214' },
              { id: 'offset-analysis', x: 380, label: '05. Offsets', sub: '92% Sim' },
              { id: 'pressure-mudweight', x: 460, label: '06. Pressure', sub: '1.36 sg' },
              { id: 'well-design-selection', x: 540, label: '07. Design', sub: 'K-2 Slim' },
              { id: 'casing-hole-grade', x: 620, label: '08. Casing', sub: 'Q-125 Sour' },
              { id: 'execution-objectives', x: 700, label: '09. Target', sub: '3,870m TVD' },
              { id: 'directional-planning', x: 780, label: '10. 3D Path', sub: 'DLS 0.83' },
              { id: 'human-approval', x: 840, label: '11. Gate', sub: 'Human Sign' }
            ].map((node) => {
              const isSelected = activeStageId === node.id;
              return (
                <g key={node.id} className="cursor-pointer" onClick={() => handleStageClick(node.id)}>
                  <circle
                    cx={node.x}
                    cy="75"
                    r={isSelected ? "18" : "14"}
                    fill={isSelected ? "#0284c7" : "#0f172a"}
                    stroke={isSelected ? "#38bdf8" : "#334155"}
                    strokeWidth="2"
                  />
                  <circle cx={node.x} cy="75" r="4" fill={isSelected ? "#ffffff" : "#10b981"} />
                  <text x={node.x} y="40" fill={isSelected ? "#38bdf8" : "#e2e8f0"} fontSize="9" textAnchor="middle" fontWeight="500">
                    {node.label}
                  </text>
                  <text x={node.x} y="115" fill="#64748b" fontSize="8" textAnchor="middle" fontFamily="monospace">
                    {node.sub}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 5. Triple Technical Deep Dives (Offset Radar, Pressure Curve & Casing Schematic) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
        {/* Panel 1: Offset Well Similarity */}
        <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-sky-950/40">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-sky-400" />
                <span className="text-xs text-slate-200">
                  {isRtl ? 'الآبار المجاورة ونسب التشابه' : 'Offset Well Similarity Ranking'}
                </span>
              </div>
              <button
                onClick={() => onNavigate('offset-analysis')}
                className="text-[11px] text-sky-400 hover:text-sky-300"
              >
                {isRtl ? 'التفاصيل' : 'Details'}
              </button>
            </div>

            <div className="space-y-2 text-xs">
              {SYNTHETIC_OFFSET_WELLS.map((off) => (
                <div
                  key={off.id}
                  className="p-2 rounded bg-slate-900/60 border border-slate-800/60 flex items-center justify-between"
                >
                  <div>
                    <div className="text-slate-200 flex items-center gap-1.5">
                      <span>{off.name}</span>
                      <span className="text-[10px] text-slate-500">({off.distanceKm} km)</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate max-w-[200px]">
                      {off.keyTroubles[0]}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-emerald-400 font-mono text-xs">{off.similarityScore}%</div>
                    <div className="w-16 bg-slate-800 h-1 rounded-full overflow-hidden mt-1">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${off.similarityScore}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel 2: Pressure vs Depth Window */}
        <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-sky-950/40">
              <div className="flex items-center gap-2">
                <Gauge className="w-4 h-4 text-cyan-400" />
                <span className="text-xs text-slate-200">
                  {isRtl ? 'نافذة الضغوط وطين الحفر' : 'Pressure & Mud Weight Window'}
                </span>
              </div>
              <button
                onClick={() => onNavigate('pressure-mudweight')}
                className="text-[11px] text-sky-400 hover:text-sky-300"
              >
                {isRtl ? 'المخطط الكامل' : 'Full Curve'}
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800/60 space-y-1">
                <div className="flex justify-between text-slate-300">
                  <span>Pore Pressure (Arab-D):</span>
                  <span className="font-mono text-sky-300">1.28 sg (10.68 ppg)</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Fracture Gradient (LOT):</span>
                  <span className="font-mono text-rose-300">1.74 sg (14.50 ppg)</span>
                </div>
                <div className="flex justify-between text-emerald-300 pt-1 border-t border-slate-800">
                  <span>Recommended Mud Weight:</span>
                  <span className="font-mono font-medium">1.36 sg (11.35 ppg)</span>
                </div>
              </div>

              <div className="p-2 rounded bg-slate-900/40 text-[11px] text-slate-400 leading-relaxed border border-slate-800/40">
                {isRtl
                  ? 'يوفر وزن الطين هامش أمان قدره 250 رطل/بوصة مربعة ضد التدفقات الغازية مع البقاء بأمان دون ضغط كسر الطبقات.'
                  : 'Provides 250 psi trip overbalance against Arab-D gas kick surges while maintaining 480 psi buffer below fracture breakdown pressure.'}
              </div>
            </div>
          </div>
        </div>

        {/* Panel 3: Casing Schematic Summary */}
        <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-sky-950/40">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-200">
                  {isRtl ? 'برنامج تغليف البئر (K-2)' : 'Casing Architecture (K-2)'}
                </span>
              </div>
              <button
                onClick={() => onNavigate('casing-hole-grade')}
                className="text-[11px] text-sky-400 hover:text-sky-300"
              >
                {isRtl ? 'المواصفات' : 'Schematic'}
              </button>
            </div>

            <div className="space-y-1.5 text-xs">
              {SYNTHETIC_CASING_SECTIONS.map((c) => (
                <div
                  key={c.id}
                  className="p-1.5 rounded bg-slate-900/60 border border-slate-800/60 flex items-center justify-between"
                >
                  <div>
                    <span className="text-slate-200">{c.sectionName}</span>
                    <span className="text-slate-400 text-[10px] ml-1.5 font-mono">
                      {c.casingSizeInches}" ({c.casingGrade})
                    </span>
                  </div>
                  <div className="text-slate-300 text-[11px] font-mono">
                    {c.topDepthM}-{c.shoeDepthM} m
                  </div>
                </div>
              ))}

              <div className="mt-2 p-2 rounded bg-emerald-950/30 border border-emerald-900/50 flex items-center justify-between text-[11px]">
                <span className="text-emerald-300">{isRtl ? 'بوابة الاعتماد:' : 'Approval Gate:'}</span>
                <button
                  onClick={() => onNavigate('human-approval')}
                  className="px-2 py-0.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] transition-colors"
                >
                  {isRtl ? 'مراجعة وتوقيع' : 'Review & Sign-off'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
