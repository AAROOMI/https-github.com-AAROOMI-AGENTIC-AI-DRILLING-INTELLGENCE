import React, { useState } from 'react';
import {
  BookOpen,
  Volume2,
  Play,
  Square,
  CheckCircle2,
  Compass,
  Gauge,
  Layers,
  ShieldCheck,
  Activity,
  Terminal,
  Cpu,
  Mic,
  Download,
  Monitor,
  RotateCcw,
  Sparkles,
  Info,
  ArrowRight,
  Database,
  FileSpreadsheet,
  FileCheck2,
  Target,
  Sliders,
  History,
  CheckCheck
} from 'lucide-react';
import { LanguageCode } from '../../types';
import { CentralLanguageRouter } from '../../services/voice/LanguageRouter';
import { CustomVoiceService } from '../../services/voice/CustomVoiceService';
import { NavViewId } from '../Sidebar';

interface UserGuideViewProps {
  currentLanguage: LanguageCode;
  onNavigate: (view: NavViewId) => void;
}

export const UserGuideView: React.FC<UserGuideViewProps> = ({
  currentLanguage,
  onNavigate
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [activeSectionId, setActiveSectionId] = useState<string>('intro');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [currentNarratingTitle, setCurrentNarratingTitle] = useState<string>('');

  const guideSections = [
    {
      id: 'intro',
      titleEn: '1. Platform Overview & Governed Architecture',
      titleAr: '1. نظرة عامة على المنظومة والهندسة المعتمدة',
      icon: ShieldCheck,
      badge: 'Core Architecture',
      narrationEn:
        'Welcome to the Aramco Agentic AI Drilling Intelligence and Well Design Platform. This platform transforms fragmented drilling data into governed, evidence-backed engineering decisions across 12 distinct phases, powered by 19 specialized engineering agents and unified under my cloned voice.',
      narrationAr:
        'مرحباً بكم في منصة ذكاء الحفر وتصميم الآبار المعتمدة لأرامكو. تعمل هذه المنظومة على تحويل البيانات المشتتة إلى قرارات هندسية موثقة عبر اثنتي عشرة مرحلة متكاملة وتسعة عشر وكيلاً ذكياً متخصصاً، تحت هوية صوتية موحدة معتمدة.',
      narrationNajdi:
        'يا هلا ومسهلا بك في منصة أرامكو لذكاء الحفر وتصميم الآبار. المنظومة ذي صُممت لتسهيل قرارات المهندسين وربط اثناعش مرحلة حفر من جمع البيانات إلى البرنامج النهائي، مع تسعة عشر وكيلاً ذكياً يحسبون كل صغيرة وكبيرة بصوت بشري معتمد.',
      whatItDoesEn:
        'Serves as the centralized operating system for drilling engineers. Combines deterministic physics calculations, agentic reasoning, and human approval gates.',
      whatItDoesAr:
        'نظام تشغيل مركزي لمهندسي الحفر يجمع بين الحسابات الفيزيائية القطعية، التحليل الذكي للوكلاء، وبوابات الاعتماد البشري الإلزامية.',
      howToUseEn:
        'Navigate using the left sidebar. Review visual telemetry meters on the Dashboard, run specialized analyses, and use the Speaking Agent on the right to ask technical questions.',
      diagramNodes: ['Sensor Telemetry', 'Agentic Force Orchestrator', 'Physics Engines', 'Engineer Sign-off']
    },
    {
      id: 'dashboard-meters',
      titleEn: '2. Executive Dashboard & Interactive Visual Meters',
      titleAr: '2. لوحة القيادة التنفيذية ومقاييس المراحل التفاعلية',
      icon: Gauge,
      badge: 'Live Telemetry',
      narrationEn:
        'The Executive Dashboard features twelve circular radial meters representing every processing step from Data Collection to Final Drilling Program. Clicking on any meter immediately prompts me to explain that specific engineering stage out loud with exact technical figures.',
      narrationAr:
        'تتضمن لوحة القيادة التنفيذية اثني عشر مقياساً دائرياً يمثل كل مرحلة من مراحل الحفر. بمجرد النقر على أي مقياس، سأقوم فوراً بشرح تفاصيل المرحلة هندسياً بصوت طبيعي مع استعراض الأرقام الدقيقة.',
      narrationNajdi:
        'لوحة القيادة فيها اثناعش عداد دائري لكل خطوة من خطوات الحفر من البداية للنهاية. بمجرد ما تضغط على أي عداد، بطلع لك بالصوت وأشرح لك وش صار بهالمرحلة وأعطيك التوصيات الهندسية كاملة.',
      whatItDoesEn:
        'Provides an instant, at-a-glance visualization of well readiness (92%), mud weight operating window, ROP, Standpipe Pressure, and all 12 pipeline steps.',
      whatItDoesAr:
        'توفر نظرة شاملة وفورية لجاهزية البئر (92%)، نافذة وزن طين الحفر، معدل الاختراق، وضغط الأنابيب مع 12 عداداً تفاعلياً.',
      howToUseEn:
        'Click any of the 12 circular meters to hear the live voice briefing. Toggle between gauges and click "Launch Workspace" for detailed parameter inspections.',
      diagramNodes: ['Readiness Dial (92%)', 'Mud Weight (1.36 sg)', 'SPP Gauge (2,840 psi)', '12 Phase Meters']
    },
    {
      id: 'voice-cloning',
      titleEn: '3. Custom Voice Cloning System (My Own Voice)',
      titleAr: '3. نظام استنساخ الصوت الخاص وهوية الوكيل الموحدة',
      icon: Mic,
      badge: 'Single Voice ID',
      narrationEn:
        'All nineteen specialized agents speak using my single, authenticated custom voice identity. Regardless of whether you switch between English, Modern Standard Arabic, or Najdi conversational dialect, the speaker identity remains strictly identical and never falls back to robotic voices.',
      narrationAr:
        'جميع الوكلاء التسعة عشر يتحدثون بهوية صوتية موحدة مستنسخة من ملف الصوت المرجعي. وسواء اخترت الإنجليزية أو العربية الفصحى أو اللهجة النجدية، تبقى هوية المتحدث مطابقة تماماً بدون استخدام أي أصوات آلية مفتعلة.',
      narrationNajdi:
        'كل الوكلاء يتكلمون بنفس الصوت البشري المعتمد اللي تم استنساخه من تسجيلي. لو حولت بين الإنجليزي أو الفصحى أو اللهجة النجدية، الصوت هو نفسه، وما فيه أي صوت آلي روبوتي.',
      whatItDoesEn:
        'Guarantees brand and auditory consistency across the enterprise. Ensures engineering figures (ppg, sg, psi, depths) are strictly preserved during synthesis.',
      whatItDoesAr:
        'يضمن الاتساق الصوتي والهندسي، ويمنع تغيير أي معطيات أو أرقام قياسية أثناء التحويل إلى كلام.',
      howToUseEn:
        'Visit Voice Cloning Studio in the Administration view to upload your MP3/MP4 reference audio, record live via microphone, test speech snippets, or calibrate pitch.',
      diagramNodes: ['Audio Reference (MP3/Mic)', 'Acoustic Timbre Extraction', 'Language Router', 'Auditory Response']
    },
    {
      id: 'workflow-stages',
      titleEn: '4. The 12 Governed Engineering Workflow Steps',
      titleAr: '4. خطوات مسار الحفر الهندسي المعتمد (12 مرحلة)',
      icon: Layers,
      badge: 'Governed Pipeline',
      narrationEn:
        'The workflow proceeds deterministically: Phase 1 Data Collection, Phase 2 Data Validation, Phase 3 Historical Analog Mining, Phase 4 Ongoing Telemetry, Phase 5 Offset Ranking, Phase 6 Formation Pressure and Mud Window, Phase 7 Well Design Profile, Phase 8 Casing and Metallurgy, Phase 9 Objectives, Phase 10 Directional Trajectory, Phase 11 Human Approval Gate, and Phase 12 Final Drilling Program.',
      narrationAr:
        'يسير مسار العمل بشكل تتابعي محكم: جمع البيانات، تدقيقها، تحليل الآبار السابقة، رصد العمليات الجارية، تصنيف الآبار المجاورة، نافذة ضغط طين الحفر، اختيار تصميم البئر، الأغلفة وتدرج المعادن، أهداف التنفيذ، المسار الاتجاهي، بوابة اعتماد المهندس، ثم برنامج الحفر النهائي.',
      narrationNajdi:
        'المسار يمشي بالترتيب الهندسي: جمع البيانات وتدقيقها، دراسة الآبار القديمة والمجاورة، حساب ضغوط الطبقات وطين الحفر، اختيار تصميم K-2، فحص الأغلفة ومقاومة H2S، تخطيط المسار الاتجاهي، ثم اعتماد المهندس قبل إخراج برنامج الحفر.',
      whatItDoesEn:
        'Enforces downstream dependency tracking. If any parameter in an upstream phase is modified or rejected, affected downstream phases automatically reset for re-analysis.',
      whatItDoesAr:
        'يفرض التتبع الآلي للتبعيات الهندسية؛ فأي تعديل في مرحلة سابقة يعيد تلقائياً فتح المراحل اللاحقة لإعادة الحساب والتدقيق.',
      howToUseEn:
        'Track progress along the 12 steps from the Workflow tab or click any step to modify parameters or review engineering evidence.',
      diagramNodes: ['01-04 Data Ingestion', '05-06 Offsets & Pressure', '07-10 Architecture & Trajectory', '11-12 Review & Release']
    },
    {
      id: 'pressure-casing',
      titleEn: '5. Pressure, Mud Weight & Casing Design (K-2 Profile)',
      titleAr: '5. نافذة الضغوط وتصميم الأغلفة (ملف K-2 المعتمد)',
      icon: Compass,
      badge: 'Calculated Physics',
      narrationEn:
        'Our geomechanical model evaluates Eaton pore pressure against leak-off fracture gradients. For Well-102, the safe operating mud window is 1.32 to 1.46 specific gravity, with 1.36 recommended. The K-2 casing design incorporates four strings with sour service Q-125 liner compliant with NACE MR0175.',
      narrationAr:
        'يقوم النموذج الجيوميكانيكي بمعايرة ضغوط المسام ومقاومة التكسر. نافذة وزن طين الحفر الآمنة للبئر 102 هي بين 1.32 و 1.46 غ/سم³ والموصى به 1.36. تصميم K-2 يضم أربعة مقاطع أغلفة مع بطانة إنتاج Q-125 المقاومة للغاز الحامضي.',
      narrationNajdi:
        'حسبنا ضغط مكمن العرب دي وضغط كسر الطبقات، وطلع وزن الطين الآمن 1.36 غرام/سم³ (11.35 باوند). وتصميم K-2 وفرنا فيه أربع أغلفة مع بطانة 7 بوصة بمعدن Q-125 لحماية البئر من غاز H2S الحامضي.',
      whatItDoesEn:
        'Calculates pore pressure profiles, API Spec 5CT burst and collapse safety factors, and tension margins.',
      whatItDoesAr:
        'حساب منحنيات الضغط وعوامل أمان الضغط الداخلي والانبعاج ومقاومة الشد وفق المعايير القياسية.',
      howToUseEn:
        'Open Phase 06 (Pressure & Mud Weight) or Phase 08 (Casing & Grade) to adjust mud weights with the interactive slider and inspect real-time safety factor calculations.',
      diagramNodes: ['Eaton Pore Pressure', 'Safe Mud Window 1.36sg', '4 Casing Strings', 'Sour Service Q-125']
    },
    {
      id: 'approval-gate',
      titleEn: '6. Human Authority Gate & Final Drilling Program',
      titleAr: '6. بوابة اعتماد المهندس البشري وبرنامج الحفر النهائي',
      icon: CheckCircle2,
      badge: 'Governance Mandate',
      narrationEn:
        'Under Aramco engineering governance, no AI recommendation is permitted to self-approve. The Lead Drilling Engineer must formally approve, modify, or reject candidates at Phase 11. Upon signature, the comprehensive 12-section Drilling Program is compiled and exported in PDF, Google Sheets, or JSON.',
      narrationAr:
        'وفق حوكمة أرامكو الهندسية الصارمة، يُمنع تماماً اعتماد التوصيات آلياً بواسطة الذكاء الاصطناعي. يجب على مهندس الحفر المعتمد التوقيع رسمياً في المرحلة الحادية عشرة، ليتولى النظام فوراً تجميع برنامج الحفر الهندسي الكامل وتصديره كملف PDF أو جداول إكسل وشيتس.',
      narrationNajdi:
        'حسب أنظمة الحوكمة بأرامكو، الذكاء الاصطناعي ما يعتمد من نفسه. لازم مهندس الحفر يراجع ويوقع رسمياً بالمرحلة 11. وبعد الاعتماد، النظام يطلع لك برنامج الحفر الرسمي كامل بصيغة PDF أو شيتس مع التوقيع الإلكتروني.',
      whatItDoesEn:
        'Maintains complete cryptographic audit trails (SHA-256 signatures) and prevents unauthorized operational drilling releases.',
      whatItDoesAr:
        'تسجيل التوقيعات الرقمية المشفرة ومنع بدء العمليات الميدانية دون موافقة المهندس المسؤول.',
      howToUseEn:
        'Go to Human Approval Gate (Phase 11) to sign off, input review remarks, or request automated re-analysis, then download the full program in Phase 12.',
      diagramNodes: ['AI Candidate Proposal', 'Engineer Audit Review', 'Cryptographic Sign-off', 'Multi-format Export']
    },
    {
      id: 'tools-rag-sql',
      titleEn: '7. Secure SQL Agent & Local Enterprise RAG Base',
      titleAr: '7. وكيل SQL الآمن وقاعدة المعرفة والوثائق (RAG)',
      icon: Terminal,
      badge: 'Zero Cloud Leakage',
      narrationEn:
        'The Secure SQL Agent translates natural language requests into read-only SQL queries with strict syntax validation that permanently blocks destructive statements. The Local RAG system indexes engineering manuals, EOWR reports, and geological atlases with exact page citations, functioning completely offline without internet dependencies.',
      narrationAr:
        'يقوم وكيل SQL الآمن بتحويل الأسئلة العادية إلى استعلامات قراءة فقط مع حظر كامل لأي أوامر تعديل أو حذف. وتقوم قاعدة المعرفة بفهرسة المعايير الهندسية وتقارير الآبار السابقة واسترجاع المقاطع مع توثيق المصدر والصفحة بدون اتصال بالإنترنت.',
      narrationNajdi:
        'وكيل SQL الآمن يجاوبك على أي استفسار بقاعدة البيانات بأمان تام وبدون أي مخاطر تعديل. وقاعدة المعرفة المحلية تبحث في كتيبات أرامكو وتقارير الآبار القديمة وتعطيك المرجع ورقم الصفحة بدون إنترنت.',
      whatItDoesEn:
        'Enables natural language querying of drilling records and semantic evidence retrieval with zero cloud data leakage.',
      whatItDoesAr:
        'الاستعلام باللغة الطبيعية عن سجلات الحفر والبحث الدلالي عن الأدلة الهندسية دون تسريب أي بيانات سحابياً.',
      howToUseEn:
        'Access "Secure SQL Agent" or "Enterprise RAG Base" from the sidebar to query tables or index technical documents (PDF, DOCX, XLSX).',
      diagramNodes: ['Natural Language Query', 'AST Read-Only Validator', 'Postgres/Firestore', 'Semantic Embeddings']
    },
    {
      id: 'deployment-desktop',
      titleEn: '8. Air-Gapped Mode, Docker & Windows Desktop Edition',
      titleAr: '8. التشغيل المعزول، حاويات Docker وإصدار Windows لسطح المكتب',
      icon: Monitor,
      badge: 'Deployment Ready',
      narrationEn:
        'The platform supports total air-gapped deployment for isolated field rigs. Toggling air-gapped mode automatically switches AI reasoning to the built-in Local LLM. Clients can deploy the entire stack via Docker Compose or install the native Windows Desktop edition using the provided installer and one-click launcher.',
      narrationAr:
        'تدعم المنظومة التشغيل المعزول تماماً عن الإنترنت لمواقع الحفر النائية. عند تفعيل وضع العزل، يتحول الذكاء الاصطناعي تلقائياً للنموذج المحلي. كما تتوفر حزم النشر عبر دوكر وإصدار سطح المكتب المخصص لأنظمة ويندوز.',
      narrationNajdi:
        'البرنامج يشتغل بمعزل تام عن الإنترنت لمنصات الحفر الميدانية. وتقدر تشغله عبر دوكر أو تثبته كبرنامج مستقل على أجهزة ويندوز بضغطة زر وحدة مع حفظ البيانات محلياً وبقاعدة فايربيس.',
      whatItDoesEn:
        'Provides multi-stage Dockerfiles, docker-compose.yml, launch-windows-desktop.bat, and Electron NSIS packaging for field laptops.',
      whatItDoesAr:
        'توفير ملفات دوكر الجاهزة، وأداة التشغيل السريع لويندوز، وحزم التثبيت للأجهزة الميدانية.',
      howToUseEn:
        'Visit the Administration view to copy Docker configurations, toggle Air-Gapped mode, or generate the Windows Desktop package.',
      diagramNodes: ['Dockerfile / Compose', 'Air-Gapped Offline LLM', 'Electron Windows App', 'Firebase Local Mirror']
    }
  ];

  const activeSection = guideSections.find((s) => s.id === activeSectionId) || guideSections[0];

  const handleSpeakSection = async (section: (typeof guideSections)[0]) => {
    if (isPlayingAudio && currentNarratingTitle === section.id) {
      CustomVoiceService.stopSpeaking();
      setIsPlayingAudio(false);
      return;
    }

    const narrationText =
      currentLanguage === 'ar-najdi'
        ? section.narrationNajdi
        : currentLanguage === 'ar'
        ? section.narrationAr
        : section.narrationEn;

    setCurrentNarratingTitle(section.id);
    setIsPlayingAudio(true);

    await CentralLanguageRouter.routeAndSpeak(narrationText, {
      agentName: 'Aramco Lead Drilling AI Agent',
      language: currentLanguage,
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => {
        setIsPlayingAudio(false);
        setCurrentNarratingTitle('');
      },
      onError: () => {
        setIsPlayingAudio(false);
        setCurrentNarratingTitle('');
      }
    });
  };

  const handlePlayAuthenticVoiceSample = async () => {
    const authenticSampleText =
      'السلام عليكم متابعينا الكرام، الله يمسّيكم بالخير. معك المهندس أحمد الغامدي من الذكاء الاصطناعي لحفر أرامكو. نصيحتي الهندسية للبئر 102: تم تدقيق كافة مقاطع الأغلفة ووزن طين الحفر 1.36 غرام/سم مكعب، ونوصي باعتماد تصميم K-2 مع التوجيه الدقيق لمكمن العرب دي.';

    setCurrentNarratingTitle('authentic-sample');
    setIsPlayingAudio(true);

    await CentralLanguageRouter.routeAndSpeak(authenticSampleText, {
      agentName: 'Aramco Lead Drilling AI Agent (Verified Sample)',
      language: 'ar-najdi',
      onStart: () => setIsPlayingAudio(true),
      onEnd: () => {
        setIsPlayingAudio(false);
        setCurrentNarratingTitle('');
      },
      onError: () => {
        setIsPlayingAudio(false);
        setCurrentNarratingTitle('');
      }
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Banner with Real Avatar & Audio Guide Controls */}
      <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 flex flex-col md:flex-row items-center justify-between gap-3 shadow-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-2 border-emerald-400 p-0.5 bg-slate-900 overflow-hidden shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0">
              <img
                src="/aramco_engineer.jpg"
                alt="Aramco Lead Drilling Engineer"
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            {isPlayingAudio && (
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 items-center justify-center text-[9px] text-slate-950">
                  <Volume2 className="w-2 h-2" />
                </span>
              </span>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-200 font-normal">
                {isRtl ? 'دليل الاستخدام الصوتي المرئي الشامل' : 'Comprehensive Audio-Visual User Guide'}
              </span>
              <span className="px-2 py-0.2 rounded bg-emerald-950/60 border border-emerald-800/40 text-emerald-300 text-[10px] font-mono">
                Voice-Guided Tour Active
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5 max-w-xl leading-relaxed">
              {isRtl
                ? 'تعرف على وظائف المنظومة، كيفية استخدام كل شاشة، وشرح مراحل الحفر الـ 12 بالصوت الطبيعي للمهندس المسؤول.'
                : 'Interactive step-by-step tour explaining every function, workflow stage, and decision gate narrated with natural voice.'}
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            onClick={handlePlayAuthenticVoiceSample}
            className="px-2.5 py-1.5 rounded bg-sky-950/80 border border-cyan-700/60 hover:bg-sky-900/60 text-cyan-300 text-xs flex items-center gap-1.5 transition-colors"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{isRtl ? 'استمع لعيّنة الصوت الأصلية' : 'Play Voice Sample'}</span>
          </button>

          <button
            onClick={() => handleSpeakSection(activeSection)}
            className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs flex items-center gap-1.5 transition-colors"
          >
            {isPlayingAudio && currentNarratingTitle === activeSection.id ? (
              <>
                <Square className="w-3 h-3 fill-white" />
                <span>{isRtl ? 'إيقاف الشرح الصوتي' : 'Pause Narration'}</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-white" />
                <span>{isRtl ? 'استمع لشرح هذا القسم' : 'Listen to Section'}</span>
              </>
            )}
          </button>

          <button
            onClick={() => onNavigate('dashboard')}
            className="px-2.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors"
          >
            {isRtl ? 'الذهاب للوحة القيادة' : 'Back to Dashboard'}
          </button>
        </div>
      </div>

      {/* Visual Workflow Steps Infographic Ribbon */}
      <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/70 space-y-2.5">
        <div className="flex items-center justify-between pb-1.5 border-b border-sky-950/40 text-xs">
          <div className="flex items-center gap-1.5 text-slate-200 font-normal">
            <Activity className="w-3.5 h-3.5 text-sky-400" />
            <span>{isRtl ? 'مخطط تدفق العمليات الهندسية الـ 12' : 'The 12 Engineering Processing Steps Visual Architecture'}</span>
          </div>
          <span className="text-[10px] text-cyan-400 font-mono">100% Governed • Continuous Audit Trace</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-1.5">
          {[
            { id: 'data-collection', title: '01. Data', sub: 'UTM 39N' },
            { id: 'data-validation', title: '02. Validate', sub: 'API 5CT' },
            { id: 'historical-intelligence', title: '03. History', sub: '28 Wells' },
            { id: 'ongoing-intelligence', title: '04. Live', sub: 'SAR-214' },
            { id: 'offset-analysis', title: '05. Offsets', sub: '92% Sim' },
            { id: 'pressure-mudweight', title: '06. Mud Wt', sub: '1.36 sg' },
            { id: 'well-design-selection', title: '07. Design', sub: 'K-2 Slim' },
            { id: 'casing-hole-grade', title: '08. Casing', sub: 'Q-125' },
            { id: 'execution-objectives', title: '09. Target', sub: '3,870m' },
            { id: 'directional-planning', title: '10. Path', sub: 'DLS 0.83' },
            { id: 'human-approval', title: '11. Gate', sub: 'Sign-off' },
            { id: 'drilling-program', title: '12. Program', sub: 'Export' }
          ].map((st, i) => (
            <div
              key={st.id}
              onClick={() => onNavigate(st.id as NavViewId)}
              className="p-1.5 rounded bg-slate-900/60 border border-sky-950/60 hover:border-cyan-700/60 cursor-pointer text-center transition-colors"
            >
              <div className="text-[9px] text-slate-400 font-mono">#{i + 1}</div>
              <div className="text-[10px] text-slate-200 truncate font-normal mt-0.5">{st.title}</div>
              <div className="text-[8px] text-cyan-400 font-mono truncate">{st.sub}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column: Table of Contents & Feature Sections */}
        <div className="lg:col-span-5 space-y-1.5">
          {guideSections.map((sec) => {
            const isSelected = activeSectionId === sec.id;
            const isNarrating = isPlayingAudio && currentNarratingTitle === sec.id;
            const Icon = sec.icon;

            return (
              <div
                key={sec.id}
                onClick={() => setActiveSectionId(sec.id)}
                className={`p-2.5 rounded border cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-sky-950/70 border-sky-600/70 text-slate-100 shadow-sm'
                    : 'bg-[#08101e] border-sky-950/50 hover:border-sky-800/40 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-sky-400' : 'text-slate-500'}`} />
                    <span className="text-xs font-normal">{isRtl ? sec.titleAr : sec.titleEn}</span>
                  </div>
                  <span className="text-[9px] font-mono text-cyan-400 bg-sky-950/80 px-1.5 py-0.2 rounded border border-cyan-900/40">
                    {sec.badge}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 pl-5">
                  <span className="truncate max-w-[220px]">
                    {isRtl ? sec.whatItDoesAr : sec.whatItDoesEn}
                  </span>
                  {isNarrating && (
                    <span className="text-emerald-400 font-mono animate-pulse flex items-center gap-1">
                      <Volume2 className="w-2.5 h-2.5" />
                      <span>Speaking</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Column: Deep-Dive Visual & Interactive Explanation Card */}
        <div className="lg:col-span-7 p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-sky-950/40">
              <div>
                <span className="text-[10px] font-mono text-cyan-400">{activeSection.badge}</span>
                <div className="text-sm text-slate-100 mt-0.5 font-normal">
                  {isRtl ? activeSection.titleAr : activeSection.titleEn}
                </div>
              </div>

              <button
                onClick={() => handleSpeakSection(activeSection)}
                className="px-2.5 py-1 rounded bg-sky-950/60 border border-cyan-800/50 text-cyan-300 hover:text-cyan-200 text-xs flex items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>{isRtl ? 'تشغيل الصوت' : 'Read Aloud'}</span>
              </button>
            </div>

            {/* Architecture Node Flow Diagram for this Section */}
            <div className="p-2.5 rounded bg-slate-900/60 border border-sky-950/60 space-y-1.5">
              <div className="text-[10px] text-slate-400 font-mono">
                {isRtl ? 'مخطط سير البيانات لهذا القسم:' : 'Functional Architecture Flow for this section:'}
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                {activeSection.diagramNodes.map((node, idx) => (
                  <React.Fragment key={node}>
                    <span className="px-2 py-0.5 rounded bg-[#060e1a] border border-cyan-900/60 text-cyan-300 font-normal text-[11px]">
                      {node}
                    </span>
                    {idx < activeSection.diagramNodes.length - 1 && (
                      <ArrowRight className="w-3 h-3 text-slate-500 shrink-0" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>

            {/* Audio Transcript Box Spoken by AI Agent */}
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-normal">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isRtl ? 'شرح المساعد الصوتي (المهندس أحمد الغامدي):' : 'Spoken Explanation by AI Agent:'}</span>
              </div>
              <div className="p-3 rounded bg-slate-900/60 border border-slate-800/60 text-slate-200 text-xs leading-relaxed font-normal">
                {currentLanguage === 'ar-najdi'
                  ? activeSection.narrationNajdi
                  : currentLanguage === 'ar'
                  ? activeSection.narrationAr
                  : activeSection.narrationEn}
              </div>
            </div>

            {/* What it does & How to use */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded bg-slate-900/40 border border-slate-800/50 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase font-mono">
                  {isRtl ? 'ماذا تفعل هذه الوظيفة؟' : 'What this function does:'}
                </div>
                <div className="text-slate-200 text-[11px] leading-relaxed font-normal">
                  {isRtl ? activeSection.whatItDoesAr : activeSection.whatItDoesEn}
                </div>
              </div>

              <div className="p-3 rounded bg-slate-900/40 border border-slate-800/50 space-y-1">
                <div className="text-[10px] text-slate-500 uppercase font-mono">
                  {isRtl ? 'كيفية الاستخدام خطوة بخطوة:' : 'How to use it step-by-step:'}
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed font-normal">
                  {activeSection.howToUseEn}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Quick Jump Action */}
          <div className="pt-3 border-t border-sky-950/40 flex items-center justify-between text-xs">
            <span className="text-[11px] text-slate-400">
              {isRtl ? 'مستعد لتجربة هذه الميزة عملياً؟' : 'Ready to inspect this live in the workspace?'}
            </span>
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs transition-colors"
            >
              {isRtl ? 'فتح في لوحة القيادة' : 'Open in Dashboard'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
