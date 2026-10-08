import React, { useState, useEffect } from 'react';
import {
  Mic2,
  Upload,
  Play,
  Square,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Volume2,
  Globe2,
  Cpu
} from 'lucide-react';
import { LanguageCode, VoiceProfileConfig } from '../../types';
import { CustomVoiceService } from '../../services/voice/CustomVoiceService';
import { CentralLanguageRouter } from '../../services/voice/LanguageRouter';

interface AdminVoiceViewProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
}

export const AdminVoiceView: React.FC<AdminVoiceViewProps> = ({
  currentLanguage,
  onLanguageChange
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [config, setConfig] = useState<VoiceProfileConfig>(CustomVoiceService.getConfig());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [selectedSnippetLang, setSelectedSnippetLang] = useState<LanguageCode>('ar-najdi');
  const [customTestSentence, setCustomTestSentence] = useState('');
  const [uploadNotice, setUploadNotice] = useState<string | null>(null);

  useEffect(() => {
    const unsub = CustomVoiceService.subscribe((state) => {
      setConfig(state.config);
      setIsSpeaking(state.isSpeaking);
    });
    return unsub;
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const res = await CustomVoiceService.uploadReferenceRecording(file);
    setUploadNotice(res.message);
    setConfig(CustomVoiceService.getConfig());
  };

  const handlePlaySnippet = async (lang: LanguageCode) => {
    const text =
      lang === 'ar-najdi'
        ? config.sampleSnippets.najdi
        : lang === 'ar'
        ? config.sampleSnippets.ar
        : config.sampleSnippets.en;

    await CentralLanguageRouter.routeAndSpeak(text, {
      agentName: 'Custom Voice Testing Studio',
      language: lang
    });
  };

  const handlePlayCustomSentence = async () => {
    if (!customTestSentence.trim()) return;
    await CentralLanguageRouter.routeAndSpeak(customTestSentence, {
      agentName: 'Custom Voice Testing Studio',
      language: selectedSnippetLang
    });
  };

  const handleToggleService = () => {
    CustomVoiceService.updateConfig({
      isServiceAvailable: !config.isServiceAvailable
    });
  };

  const handlePitchChange = (newPitch: number) => {
    CustomVoiceService.updateConfig({
      pitchBaseHz: newPitch
    });
  };

  const handleRateChange = (newRate: number) => {
    CustomVoiceService.updateConfig({
      speakingRate: newRate
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Banner */}
      <div className="p-3 rounded bg-[#08101e] border border-sky-950/60 flex items-center justify-between">
        <div>
          <div className="text-xs text-slate-200">
            {isRtl ? 'إدارة استنساخ الصوت الخاص (Central Voice Architecture)' : 'Administration: Central Custom Voice Management & Cloning Studio'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'صوت موحد لجميع الوكلاء الأذكياء (14 وكيلاً) مستنسخ من ملف الصوت المرجعي بصيغة MP3/MP4.'
              : 'Mandatory central voice architecture: Single cloned identity powering all 14+ drilling agents across English, Arabic, and Najdi.'}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-2.5 py-1 rounded text-xs font-mono border ${
            config.isServiceAvailable
              ? 'bg-emerald-950/60 border-emerald-800/40 text-emerald-300'
              : 'bg-rose-950/60 border-rose-800/40 text-rose-300'
          }`}>
            {config.isServiceAvailable ? 'Voice Service: ONLINE' : 'Voice Service: UNAVAILABLE'}
          </span>

          <button
            onClick={handleToggleService}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs transition-colors"
          >
            {config.isServiceAvailable ? 'Simulate Offline' : 'Set Online'}
          </button>
        </div>
      </div>

      {uploadNotice && (
        <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{uploadNotice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column: Voice Reference Upload & Timbre Calibration */}
        <div className="lg:col-span-6 p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-sky-950/40">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full border border-emerald-400 p-0.5 bg-slate-900 overflow-hidden shrink-0">
                <img
                  src="/aramco_engineer.jpg"
                  alt="Aramco Lead Engineer"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-xs text-slate-100 font-medium">Aramco Lead Drilling Engineer Identity</span>
                <div className="text-[10px] text-slate-400 font-mono">Verified Clone • Reference Audio Registered</div>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              CLONED
            </span>
          </div>

          {/* Authentic Reference Voice Playback Card */}
          <div className="p-3 rounded bg-slate-900/60 border border-cyan-900/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-cyan-300 font-medium flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                <span>Uploaded Reference Recording (Najdi Dialect)</span>
              </span>
              <button
                onClick={() => {
                  const text = 'السلام عليكم متابعينا الكرام، الله يمسّيكم بالخير. معك المهندس أحمد الغامدي من الذكاء الاصطناعي لحفر أرامكو. نصيحتي الهندسية للبئر 102: تم تدقيق كافة مقاطع الأغلفة ووزن طين الحفر 1.36 غرام/سم مكعب، ونوصي باعتماد تصميم K-2 مع التوجيه الدقيق لمكمن العرب دي.';
                  CentralLanguageRouter.routeAndSpeak(text, {
                    agentName: 'Aramco Lead Drilling AI Agent (Verified Sample)',
                    language: 'ar-najdi'
                  });
                }}
                className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] flex items-center gap-1 transition-colors"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Play Uploaded Sample</span>
              </button>
            </div>
            <div className="text-[11px] text-slate-300 p-2 rounded bg-slate-950/60 border border-slate-800 leading-relaxed font-normal">
              "السلام عليكم متابعينا الكرام، الله يمسّيكم بالخير، كثير من الناس يسأل يقول: عندي كاش، أروح أشتري سيارة كاش ولا أروح للتمويل التأجيري؟ نصيحتي الشخصية: إذا الكاش تقدر تحتفظ فيه وتشغّله وتستفيد منه، روح للتمويل التأجيري..."
            </div>
          </div>

          <div className="p-4 rounded border-2 border-dashed border-sky-900/40 bg-slate-900/40 flex flex-col items-center justify-center text-center space-y-2">
            <Upload className="w-6 h-6 text-sky-400" />
            <div className="text-xs text-slate-300">
              Upload your reference voice recording (MP3 or MP4)
            </div>
            <div className="text-[10px] text-slate-500">
              Extracts acoustic pitch, formant envelope, speaking tempo, and Saudi male Najdi dialect cadence.
            </div>
            <label className="mt-2 px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs cursor-pointer transition-colors">
              <span>Choose MP3 / MP4 File</span>
              <input
                type="file"
                accept=".mp3,.mp4,audio/*,video/mp4"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {/* Extracted Voice Parameters */}
          <div className="space-y-3 pt-2">
            <div className="text-xs text-slate-400">Extracted Acoustic Profile:</div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800/60">
                <div className="text-[10px] text-slate-500">Reference File:</div>
                <div className="text-slate-200 font-mono truncate text-[11px] mt-0.5">
                  {config.referenceAudioFileName}
                </div>
              </div>
              <div className="p-2.5 rounded bg-slate-900/60 border border-slate-800/60">
                <div className="text-[10px] text-slate-500">Speaker Identity:</div>
                <div className="text-cyan-400 truncate text-[11px] mt-0.5">
                  {config.speakerIdentity}
                </div>
              </div>
            </div>

            {/* Pitch Tuning */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Fundamental Pitch (F0):</span>
                <span className="font-mono text-emerald-400">{config.pitchBaseHz} Hz (Male Warm Baritone)</span>
              </div>
              <input
                type="range"
                min="95"
                max="145"
                value={config.pitchBaseHz}
                onChange={(e) => handlePitchChange(parseInt(e.target.value))}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            {/* Speaking Rate Tuning */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Speaking Rate (Cadence):</span>
                <span className="font-mono text-sky-400">{config.speakingRate.toFixed(1)}x Normal</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.3"
                step="0.05"
                value={config.speakingRate}
                onChange={(e) => handleRateChange(parseFloat(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Multi-Language Testing Studio & Speech Preview */}
        <div className="lg:col-span-6 p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-sky-950/40">
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-slate-200">Voice Synthesis & Multilingual Verification</span>
            </div>
            {isSpeaking && (
              <span className="text-[10px] text-emerald-400 font-mono animate-pulse">
                Speaking...
              </span>
            )}
          </div>

          {/* Language Selection for Snippets */}
          <div className="space-y-2 text-xs">
            <div className="text-[11px] text-slate-400">
              Select Language to Test Unified Speaker Identity:
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setSelectedSnippetLang('en')}
                className={`p-2 rounded border text-left transition-colors ${
                  selectedSnippetLang === 'en'
                    ? 'bg-sky-950/70 border-sky-600 text-sky-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-medium">1. English</div>
                <div className="text-[9px] text-slate-500">Same cloned identity</div>
              </button>

              <button
                onClick={() => setSelectedSnippetLang('ar')}
                className={`p-2 rounded border text-left transition-colors ${
                  selectedSnippetLang === 'ar'
                    ? 'bg-sky-950/70 border-sky-600 text-sky-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-medium">2. العربية الفصحى</div>
                <div className="text-[9px] text-slate-500">Same cloned identity</div>
              </button>

              <button
                onClick={() => setSelectedSnippetLang('ar-najdi')}
                className={`p-2 rounded border text-left transition-colors ${
                  selectedSnippetLang === 'ar-najdi'
                    ? 'bg-emerald-950/70 border-emerald-600 text-emerald-200'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="font-medium">3. اللهجة النجدية</div>
                <div className="text-[9px] text-slate-500">Saudi Najdi style</div>
              </button>
            </div>
          </div>

          {/* Preset Engineering Speech Snippet */}
          <div className="space-y-2 text-xs">
            <div className="text-[11px] text-slate-400">Sample Engineering Test Snippet:</div>
            <div className="p-3 rounded bg-slate-900/60 border border-slate-800/60 text-slate-200 leading-relaxed text-[11px]">
              {selectedSnippetLang === 'ar-najdi'
                ? config.sampleSnippets.najdi
                : selectedSnippetLang === 'ar'
                ? config.sampleSnippets.ar
                : config.sampleSnippets.en}
            </div>

            <button
              onClick={() => handlePlaySnippet(selectedSnippetLang)}
              className="w-full py-2 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Preview Speech with My Cloned Voice</span>
            </button>
          </div>

          {/* Custom Sentence Testing Box */}
          <div className="space-y-2 pt-2 border-t border-sky-950/40 text-xs">
            <div className="text-[11px] text-slate-400">Test Custom Engineering Sentence:</div>
            <div className="flex gap-2">
              <input
                type="text"
                value={customTestSentence}
                onChange={(e) => setCustomTestSentence(e.target.value)}
                placeholder="Type any drilling recommendation to speak..."
                className="flex-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200"
              />
              <button
                onClick={handlePlayCustomSentence}
                disabled={!customTestSentence.trim()}
                className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-white text-xs flex items-center gap-1 transition-colors"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Speak</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
