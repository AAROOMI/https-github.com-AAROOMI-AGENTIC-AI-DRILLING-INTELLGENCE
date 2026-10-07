import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Send,
  Square,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  AlertCircle,
  CheckCircle,
  HelpCircle,
  Languages
} from 'lucide-react';
import { ChatMessage, LanguageCode } from '../types';
import { CustomVoiceService } from '../services/voice/CustomVoiceService';
import { AgenticForce } from '../services/agentic/AgenticForce';
import { CentralLanguageRouter } from '../services/voice/LanguageRouter';

interface SpeakingAgentPanelProps {
  currentLanguage: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  activePhase?: string;
  onNavigateToPhase?: (phaseId: string) => void;
}

export const SpeakingAgentPanel: React.FC<SpeakingAgentPanelProps> = ({
  currentLanguage,
  onLanguageChange,
  activePhase,
  onNavigateToPhase
}) => {
  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';
  const [interactionMode, setInteractionMode] = useState<'voice' | 'chat' | 'manual'>('voice');
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceServiceUnavailable, setVoiceServiceUnavailable] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-01',
      sender: 'agent',
      agentName: 'AI Speaking Agent (Saudi Male - Najdi)',
      text:
        currentLanguage === 'ar-najdi'
          ? 'يا هلا بك مهندسنا أحمد. تم تحليل كافة بيانات البئر 102 ومقارنتها بالآبار المجاورة في مكمن العرب دي. التصميم الموصى به هو K-2 بوزن طين 1.36 غرام/سم³. جاهز للإجابة على استفساراتك أو إعداد وثيقة الاعتماد.'
          : currentLanguage === 'ar'
          ? 'مرحباً بك مهندسنا الكريم. تم تدقيق كافة معطيات البئر 102 ومطابقتها مع الآبار المجاورة. نوصي بتصميم K-2 ووزن طين 1.36 غ/سم³. أنا في خدمتك لأي استفسار هندسي.'
          : 'Welcome, Lead Engineer. Operational parameters for Well-102 have been benchmarked against Ghawar Arab-D offset wells. Recommended profile is K-2 with 11.3 ppg mud weight. Ready to assist with technical analysis or approval review.',
      timestamp: '08:30 AM',
      language: currentLanguage,
      hasAudio: true,
      audioDurationSec: 6.5,
      evidence: 'Offset Well A (92% match) & DEM Casing Guidelines'
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const voiceConfig = CustomVoiceService.getConfig();

  // Subscribe to central custom voice state changes
  useEffect(() => {
    const unsub = CustomVoiceService.subscribe((state) => {
      setIsSpeaking(state.isSpeaking);
      setVoiceServiceUnavailable(!state.config.isServiceAvailable);
    });
    return unsub;
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isSpeaking]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || isProcessing) return;

    setInputText('');
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: currentLanguage
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsProcessing(true);

    try {
      const shouldSpeak = interactionMode === 'voice';
      const agentResponse = await AgenticForce.executeRequest(query, {
        language: currentLanguage,
        speakResponse: shouldSpeak
      });

      setMessages((prev) => [...prev, agentResponse]);
      if (agentResponse.hasAudio) {
        setVoiceServiceUnavailable(false);
      }
    } catch (err) {
      console.error('Agent execution error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStopSpeech = () => {
    CustomVoiceService.stopSpeaking();
  };

  const handleReplayAudio = async (msg: ChatMessage) => {
    if (CustomVoiceService.isSpeaking()) {
      CustomVoiceService.stopSpeaking();
    }
    const result = await CentralLanguageRouter.routeAndSpeak(msg.text, {
      agentName: msg.agentName || 'AI Speaking Agent',
      language: msg.language
    });
    if (!result.success && result.isUnavailableFallback) {
      setVoiceServiceUnavailable(true);
    }
  };

  const quickPrompts = [
    {
      en: 'What is the recommended mud weight?',
      ar: 'ما هو وزن طين الحفر الموصى به؟',
      najdi: 'كم وزن الطين المناسب للمقطع هذا؟'
    },
    {
      en: 'Compare K-2 vs K-3 casing design',
      ar: 'قارن بين تصميمي الأغلفة K-2 و K-3',
      najdi: 'وش الفرق بين تصميم K-2 و K-3؟'
    },
    {
      en: 'Show offset wells similarity scores',
      ar: 'أظهر نسب تشابه الآبار المجاورة',
      najdi: 'عطني مقارنة الآبار المجاورة ونسب التشابه'
    },
    {
      en: 'Review Human Approval gate status',
      ar: 'ما هي حالة بوابة اعتماد المهندس؟',
      najdi: 'وش وضع بوابة الاعتماد الحين؟'
    }
  ];

  return (
    <aside className="w-80 lg:w-96 border-l border-sky-950/40 bg-[#070d18] flex flex-col h-[calc(100vh-3.5rem)] shrink-0 select-none">
      {/* Panel Top Bar: Mode Selectors */}
      <div className="p-3 border-b border-sky-950/40 bg-slate-950/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-slate-200">
              {isRtl ? 'المساعد الهندسي المتحدث' : 'AI Speaking Agent'}
            </span>
          </div>
          <span className="text-[10px] text-cyan-400 bg-sky-950/60 px-2 py-0.5 rounded border border-cyan-800/40">
            {isRtl ? 'صوت نجد الذكي' : 'Saudi Male (Najdi)'}
          </span>
        </div>

        {/* Interaction Mode Switcher */}
        <div className="grid grid-cols-3 gap-1 bg-slate-900/80 p-0.5 rounded text-[11px]">
          <button
            onClick={() => setInteractionMode('voice')}
            className={`py-1 rounded text-center transition-colors flex items-center justify-center gap-1 ${
              interactionMode === 'voice'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Mic className="w-3 h-3" />
            <span>{isRtl ? 'صوتي' : 'Voice'}</span>
          </button>
          <button
            onClick={() => setInteractionMode('chat')}
            className={`py-1 rounded text-center transition-colors ${
              interactionMode === 'chat'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{isRtl ? 'محادثة' : 'Chat'}</span>
          </button>
          <button
            onClick={() => setInteractionMode('manual')}
            className={`py-1 rounded text-center transition-colors ${
              interactionMode === 'manual'
                ? 'bg-sky-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>{isRtl ? 'يدوي' : 'Manual'}</span>
          </button>
        </div>
      </div>

      {/* Voice Avatar & Frequency Waveform Visualizer */}
      <div className="p-3 bg-gradient-to-b from-[#091426] to-[#070d18] border-b border-sky-950/30 flex flex-col items-center">
        <div className="relative">
          {/* Avatar Ring */}
          <div
            className={`w-20 h-20 rounded-full p-1 border transition-all duration-300 ${
              isSpeaking
                ? 'border-emerald-400 shadow-[0_0_18px_rgba(16,185,129,0.35)] scale-105'
                : 'border-sky-800/60'
            } bg-slate-900 flex items-center justify-center`}
          >
            {/* Synthetic Engineer Avatar Graphic */}
            <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-tr from-slate-900 via-sky-950 to-emerald-950 flex flex-col items-center justify-center text-center p-1">
              <span className="text-[10px] text-emerald-300">Aramco Lead</span>
              <span className="text-[9px] text-slate-400">Drilling AI</span>
            </div>
          </div>

          {/* Active Speaking Indicator */}
          {isSpeaking && (
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-[9px] px-2 py-0.2 rounded-full flex items-center gap-1 shadow">
              <Volume2 className="w-2.5 h-2.5 animate-bounce" />
              <span>Speaking</span>
            </div>
          )}
        </div>

        {/* Live Audio Frequency Bars */}
        <div className="flex items-center justify-center gap-1 h-6 mt-3 w-40">
          {[18, 35, 60, 90, 75, 45, 80, 100, 65, 40, 25, 55, 70, 30].map((height, i) => (
            <span
              key={i}
              style={{
                height: isSpeaking ? `${Math.max(6, Math.sin(Date.now() / 200 + i) * height * 0.25 + height * 0.2)}px` : '4px',
                transition: 'height 0.1s ease'
              }}
              className={`w-1 rounded-full transition-colors ${
                isSpeaking ? 'bg-gradient-to-t from-sky-400 to-emerald-400' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>

        {/* Custom Voice Identity Specification */}
        <div className="mt-2 text-center text-[10px] text-slate-400 max-w-[90%] truncate">
          <span className="text-cyan-400">{voiceConfig.speakerIdentity}</span>
        </div>

        {/* Stop Speaking Button */}
        {isSpeaking && (
          <button
            onClick={handleStopSpeech}
            className="mt-2 flex items-center gap-1.5 px-3 py-1 rounded bg-rose-950/60 border border-rose-800/50 text-rose-300 text-xs hover:bg-rose-900/60 transition-colors"
          >
            <Square className="w-3 h-3 fill-rose-300" />
            <span>{isRtl ? 'إيقاف الصوت' : 'Interrupt / Stop Audio'}</span>
          </button>
        )}
      </div>

      {/* Voice Fallback Warning if unavailable */}
      {voiceServiceUnavailable && (
        <div className="m-2 p-2 rounded bg-amber-950/40 border border-amber-800/50 flex items-center justify-between text-[11px] text-amber-300">
          <div className="flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Custom Voice Service Unavailable</span>
          </div>
          <button
            onClick={() => setVoiceServiceUnavailable(false)}
            className="px-2 py-0.5 rounded bg-amber-900/60 hover:bg-amber-800/60 text-white text-[10px]"
          >
            Retry
          </button>
        </div>
      )}

      {/* Messages Transcript List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-1 text-[10px] text-slate-500 mb-0.5">
                <span>{isUser ? (isRtl ? 'أنت (المهندس)' : 'You (Lead Engineer)') : msg.agentName || 'Engineering Agent'}</span>
                <span>•</span>
                <span>{msg.timestamp}</span>
              </div>

              <div
                className={`p-2.5 rounded text-xs max-w-[95%] leading-relaxed ${
                  isUser
                    ? 'bg-sky-900/40 border border-sky-800/40 text-slate-200 rounded-br-none'
                    : 'bg-slate-900/70 border border-sky-950/60 text-slate-200 rounded-bl-none'
                }`}
              >
                <div>{msg.text}</div>

                {/* Evidence & Phase Context */}
                {msg.evidence && (
                  <div className="mt-1.5 pt-1.5 border-t border-slate-800/70 text-[10px] text-cyan-400/90 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400 shrink-0" />
                    <span>Evidence: {msg.evidence}</span>
                  </div>
                )}

                {/* Re-speak Action */}
                {!isUser && (
                  <div className="mt-2 flex items-center justify-between pt-1 border-t border-slate-800/60 text-[10px]">
                    <span className="text-slate-500">Custom Cloned Voice</span>
                    <button
                      onClick={() => handleReplayAudio(msg)}
                      title="Replay Audio using custom voice"
                      className="flex items-center gap-1 text-slate-400 hover:text-sky-300 transition-colors"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>{isRtl ? 'إعادة الاستماع' : 'Replay'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isProcessing && (
          <div className="flex items-center gap-2 p-2 text-xs text-sky-400 bg-slate-900/60 rounded border border-sky-950/40">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>{isRtl ? 'جاري التحليل الهندسي...' : 'Agentic Force reasoning...'}</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Engineering Prompts */}
      <div className="px-3 py-1.5 border-t border-sky-950/30 bg-slate-950/30 overflow-x-auto flex gap-1.5 text-[10px]">
        {quickPrompts.map((p, idx) => {
          const text = currentLanguage === 'ar-najdi' ? p.najdi : currentLanguage === 'ar' ? p.ar : p.en;
          return (
            <button
              key={idx}
              onClick={() => handleSendMessage(text)}
              className="px-2 py-1 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-300 hover:border-sky-800 shrink-0 transition-colors"
            >
              {text}
            </button>
          );
        })}
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-sky-950/40 bg-slate-950/60">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-1.5"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              currentLanguage === 'ar-najdi'
                ? 'اسأل المساعد الهندسي بصوتك أو كتابة...'
                : currentLanguage === 'ar'
                ? 'اطرح سؤالاً على المساعد الهندسي...'
                : 'Ask the Drilling Assistant...'
            }
            className="flex-1 bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-sky-600 transition-colors"
          />

          <button
            type="submit"
            disabled={!inputText.trim() || isProcessing}
            className="p-1.5 rounded bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </aside>
  );
};
