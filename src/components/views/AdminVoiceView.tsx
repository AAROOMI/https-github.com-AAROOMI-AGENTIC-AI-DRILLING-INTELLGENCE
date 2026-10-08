import React, { useState, useEffect } from 'react';
import {
  Mic,
  MicOff,
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
  Cpu,
  Radio,
  FileAudio
} from 'lucide-react';
import { LanguageCode, VoiceProfileConfig } from '../../types';
import { CustomVoiceService } from '../../services/voice/CustomVoiceService';
import { CentralLanguageRouter } from '../../services/voice/LanguageRouter';
import { audioSynthesizer } from '../../services/voice/audioSynthesizer';

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
  const [selectedGeminiVoice, setSelectedGeminiVoice] = useState<'Charon' | 'Fenrir' | 'Puck'>('Charon');
  const [notice, setNotice] = useState<string | null>(null);
  const [isRecordingMic, setIsRecordingMic] = useState(false);
  const [hasCustomRecording, setHasCustomRecording] = useState(false);

  useEffect(() => {
    const unsub = CustomVoiceService.subscribe((state) => {
      setConfig(state.config);
      setIsSpeaking(state.isSpeaking);
      setHasCustomRecording(state.hasCustomRecording);
    });
    return unsub;
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const res = await CustomVoiceService.uploadReferenceRecording(file);
    setNotice(res.message);
    setConfig(CustomVoiceService.getConfig());
  };

  const handleStartMic = async () => {
    const res = await CustomVoiceService.startMicrophoneRecording();
    if (res.success) {
      setIsRecordingMic(true);
      setNotice(res.message);
    } else {
      setNotice(res.message);
    }
  };

  const handleStopMic = async () => {
    const res = await CustomVoiceService.stopMicrophoneRecording();
    setIsRecordingMic(false);
    setNotice(res.message);
    setConfig(CustomVoiceService.getConfig());
  };

  const handlePlayReference = async () => {
    await CustomVoiceService.playReferenceRecording();
  };

  const handlePlaySnippet = async (lang: LanguageCode) => {
    const text =
      lang === 'ar-najdi'
        ? config.sampleSnippets.najdi
        : lang === 'ar'
        ? config.sampleSnippets.ar
        : config.sampleSnippets.en;

    await CentralLanguageRouter.routeAndSpeak(text, {
      agentName: 'Aramco Lead Drilling AI Agent (Google Gemini Voice)',
      language: lang,
      geminiVoiceName: selectedGeminiVoice
    });
  };

  const handlePlayCustomSentence = async () => {
    if (!customTestSentence.trim()) return;
    await CentralLanguageRouter.routeAndSpeak(customTestSentence, {
      agentName: 'Aramco Lead Drilling AI Agent (Google Gemini Voice)',
      language: selectedSnippetLang,
      geminiVoiceName: selectedGeminiVoice
    });
  };

  const handleStopAudio = () => {
    CustomVoiceService.stopSpeaking();
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
      <div className="p-3.5 rounded bg-[#08101e] border border-sky-950/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-md">
        <div>
          <div className="text-xs text-slate-200 font-normal">
            {isRtl ? 'إدارة استنساخ الصوت الخاص (Central Voice Architecture)' : 'Administration: Central Custom Voice Management & Cloning Studio'}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            {isRtl
              ? 'صوت بشري موحد لجميع الوكلاء الأذكياء (14 وكيلاً) مستنسخ من ملف الصوت المرجعي بصيغة MP3/MP4.'
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

      {notice && (
        <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800/60 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {/* Left Column: Voice Reference Upload & Microphone Capture */}
        <div className="lg:col-span-6 p-4 rounded bg-[#08101e] border border-sky-950/60 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-sky-950/40">
            <div className="flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-full border border-emerald-400 p-0.5 bg-slate-900 overflow-hidden shrink-0">
                <img
                  src="/aramco_engineer.jpg"
                  alt="Aramco Lead Engineer"
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div>
                <span className="text-xs text-slate-100 font-normal">Aramco Lead Drilling Engineer Identity</span>
                <div className="text-[10px] text-slate-400 font-mono">
                  {hasCustomRecording ? 'Custom Voice Sample Active' : 'Verified Clone • Reference Audio Registered'}
                </div>
              </div>
            </div>
            <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/40">
              CLONED
            </span>
          </div>

          {/* Authentic Reference Voice Playback Card */}
          <div className="p-3 rounded bg-slate-900/60 border border-cyan-900/40 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-cyan-300 font-normal flex items-center gap-1.5">
                <FileAudio className="w-3.5 h-3.5" />
                <span>Uploaded Reference Recording (Najdi Dialect)</span>
              </span>
              <div className="flex items-center gap-1.5">
                {isSpeaking ? (
                  <button
                    onClick={handleStopAudio}
                    className="px-2.5 py-1 rounded bg-rose-950/60 border border-rose-800/40 text-rose-300 text-[10px] flex items-center gap-1 transition-colors"
                  >
                    <Square className="w-3 h-3 fill-rose-300" />
                    <span>Stop</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePlayReference}
                    className="px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] flex items-center gap-1 transition-colors"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Play Reference Recording</span>
                  </button>
                )}
              </div>
            </div>
            <div className="text-[11px] text-slate-300 p-2.5 rounded bg-slate-950/60 border border-slate-800 leading-relaxed font-normal">
              "السلام عليكم متابعينا الكرام، الله يمسّيكم بالخير، كثير من الناس يسأل يقول: عندي كاش، أروح أشتري سيارة كاش ولا أروح للتمويل التأجيري؟ نصيحتي الشخصية: إذا الكاش تقدر تحتفظ فيه وتشغّله وتستفيد منه، روح للتمويل التأجيري..."
            </div>
          </div>

          {/* Two Ingestion Modes: Upload File OR Live Microphone Record */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* Mode 1: Upload MP3 / MP4 */}
            <div className="p-3.5 rounded border border-dashed border-sky-900/50 bg-slate-900/40 flex flex-col items-center justify-center text-center space-y-2">
              <Upload className="w-5 h-5 text-sky-400" />
              <div className="text-xs text-slate-300 font-normal">Upload Audio/Video</div>
              <div className="text-[10px] text-slate-500">MP3, WAV, MP4, M4A</div>
              <label className="mt-1 px-3 py-1 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs cursor-pointer transition-colors">
                <span>Choose File</span>
                <input
                  type="file"
                  accept=".mp3,.mp4,.wav,.m4a,audio/*,video/mp4"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Mode 2: Live Microphone Recording */}
            <div className="p-3.5 rounded border border-dashed border-emerald-900/50 bg-slate-900/40 flex flex-col items-center justify-center text-center space-y-2">
              <Mic className="w-5 h-5 text-emerald-400" />
              <div className="text-xs text-slate-300 font-normal">Record via Microphone</div>
              <div className="text-[10px] text-slate-500">Capture your own voice live</div>
              {isRecordingMic ? (
                <button
                  onClick={handleStopMic}
                  className="mt-1 px-3 py-1 rounded bg-rose-600 hover:bg-rose-500 text-white text-xs flex items-center gap-1 animate-pulse"
                >
                  <Square className="w-3 h-3 fill-white" />
                  <span>Stop & Save Voice</span>
                </button>
              ) : (
                <button
                  onClick={handleStartMic}
                  className="mt-1 px-3 py-1 rounded bg-emerald-700 hover:bg-emerald-600 text-white text-xs flex items-center gap-1"
                >
                  <Radio className="w-3 h-3" />
                  <span>Record My Voice</span>
                </button>
              )}
            </div>
          </div>

          {/* Extracted Voice Parameters */}
          <div className="space-y-3 pt-1">
            <div className="text-xs text-slate-400 font-normal">Extracted Acoustic Profile:</div>

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
              <span className="text-xs text-slate-200 font-normal">Voice Synthesis & Multilingual Verification</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-emerald-400 font-normal flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Human Natural Male Voice
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {audioSynthesizer.getActiveVoiceName(selectedSnippetLang)}
              </span>
            </div>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed">
            Test and preview newly generated sentences using the cloned speaker identity. The language switches seamlessly while the speaker's vocal identity remains completely locked.
          </div>

          {/* Gemini Male Voice Selection & Dialect Info */}
          <div className="p-3 rounded bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-normal">Google Gemini Natural Male Voice Profile:</span>
              <span className="text-[10px] text-emerald-400 font-mono">gemini-3.8-flash-lite-tts</span>
            </div>
            <div className="grid grid-cols-3 gap-1.5 text-xs">
              <button
                onClick={() => setSelectedGeminiVoice('Charon')}
                className={`py-1.5 px-2 rounded border text-[11px] text-center transition-all ${
                  selectedGeminiVoice === 'Charon'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-sm'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>Charon (Saudi Lead)</div>
                <div className="text-[9px] text-slate-500 mt-0.5">Deep Baritone</div>
              </button>
              <button
                onClick={() => setSelectedGeminiVoice('Fenrir')}
                className={`py-1.5 px-2 rounded border text-[11px] text-center transition-all ${
                  selectedGeminiVoice === 'Fenrir'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-sm'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>Fenrir</div>
                <div className="text-[9px] text-slate-500 mt-0.5">Confident Lead</div>
              </button>
              <button
                onClick={() => setSelectedGeminiVoice('Puck')}
                className={`py-1.5 px-2 rounded border text-[11px] text-center transition-all ${
                  selectedGeminiVoice === 'Puck'
                    ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-sm'
                    : 'bg-slate-900/40 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>Puck</div>
                <div className="text-[9px] text-slate-500 mt-0.5">Conversational</div>
              </button>
            </div>
            <div className="text-[10px] text-sky-400 flex items-center justify-between pt-1 border-t border-slate-800/60">
              <span>Dialect: Saudi Arabian Najdi (اللهجة النجدية)</span>
              <span className="text-slate-400 font-mono">Engine: Google Gemini TTS</span>
            </div>
          </div>

          {/* Language Selection Tabs */}
          <div className="flex items-center gap-2 p-1 rounded bg-slate-900/60 border border-slate-800">
            <button
              onClick={() => setSelectedSnippetLang('ar-najdi')}
              className={`flex-1 py-1.5 text-xs rounded transition-colors ${
                selectedSnippetLang === 'ar-najdi'
                  ? 'bg-sky-600 text-white font-normal'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              اللهجة النجدية (Saudi/Najdi)
            </button>
            <button
              onClick={() => setSelectedSnippetLang('ar')}
              className={`flex-1 py-1.5 text-xs rounded transition-colors ${
                selectedSnippetLang === 'ar'
                  ? 'bg-sky-600 text-white font-normal'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              العربية الفصحى (Arabic)
            </button>
            <button
              onClick={() => setSelectedSnippetLang('en')}
              className={`flex-1 py-1.5 text-xs rounded transition-colors ${
                selectedSnippetLang === 'en'
                  ? 'bg-sky-600 text-white font-normal'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              English (Technical)
            </button>
          </div>

          {/* Preset Sample Snippet Player */}
          <div className="p-3.5 rounded bg-slate-900/60 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-300 font-normal">
                {selectedSnippetLang === 'ar-najdi'
                  ? 'نص الاختبار: اللهجة النجدية السعودية'
                  : selectedSnippetLang === 'ar'
                  ? 'نص الاختبار: اللغة العربية الفصحى'
                  : 'Standard Test Passage: Technical English'}
              </span>

              {isSpeaking ? (
                <button
                  onClick={handleStopAudio}
                  className="px-2.5 py-1 rounded bg-rose-950/60 border border-rose-800/40 text-rose-300 text-xs flex items-center gap-1 transition-colors"
                >
                  <Square className="w-3 h-3 fill-rose-300" />
                  <span>Stop</span>
                </button>
              ) : (
                <button
                  onClick={() => handlePlaySnippet(selectedSnippetLang)}
                  className="px-2.5 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs flex items-center gap-1 transition-colors"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>Synthesize & Speak</span>
                </button>
              )}
            </div>

            <div className="p-2.5 rounded bg-[#060c16] border border-slate-800/80 text-xs text-slate-300 leading-relaxed font-normal">
              {selectedSnippetLang === 'ar-najdi'
                ? config.sampleSnippets.najdi
                : selectedSnippetLang === 'ar'
                ? config.sampleSnippets.ar
                : config.sampleSnippets.en}
            </div>
          </div>

          {/* Custom Sentence Speech Synthesizer */}
          <div className="space-y-2 pt-2">
            <div className="text-xs text-slate-300 font-normal">
              Test Any Custom Drilling Sentence:
            </div>
            <textarea
              value={customTestSentence}
              onChange={(e) => setCustomTestSentence(e.target.value)}
              placeholder="Enter engineering sentence here (e.g. 'Recommended mud weight is 11.3 ppg for the Arab-D reservoir')..."
              rows={3}
              className="w-full p-2.5 rounded bg-slate-900/80 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handlePlayCustomSentence}
                disabled={!customTestSentence.trim() || isSpeaking}
                className="px-3 py-1.5 rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-50 text-white text-xs flex items-center gap-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Speak Custom Sentence With Cloned Voice</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
