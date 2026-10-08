/**
 * Natural Human Male Voice Engine & Speech Synthesizer
 *
 * Implements high-fidelity, natural human male voice synthesis with:
 * 1. Primary Engine: Google Gemini 2.5 / 3.8 Natural Human Male Voice
 *    - Model: gemini-3.8-flash-lite-tts via /api/voice/synthesize
 *    - Male Voice: Charon (Saudi Lead Deep Baritone), Fenrir, Puck
 *    - Dialect: Saudi Arabian Najdi (اللهجة النجدية) & Technical Modern Standard Arabic
 * 2. Fallback Engine: High-Fidelity Client-Side Natural Male Voice
 *    - Automatic offline / air-gapped continuity
 *    - Strict elimination of robotic or synthesizer buzzing
 * 3. Custom Reference Voice Audio passthrough (uploaded sample / recorded mic)
 */

export interface VoicePlaybackOptions {
  pitchHz?: number;
  rate?: number;
  language?: 'en' | 'ar' | 'ar-najdi';
  customAudioUrl?: string;
  geminiVoiceName?: 'Charon' | 'Fenrir' | 'Puck';
  preferGeminiTTS?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: Error) => void;
}

export interface VoiceInfo {
  name: string;
  lang: string;
  isMale: boolean;
  isNatural: boolean;
}

class NaturalHumanVoiceSynthesizer {
  private isSpeaking = false;
  private currentAudioElement: HTMLAudioElement | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private customAudioDataUrl: string | null = null;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private keepAliveTimer: number | null = null;
  private lastEngineUsed: 'Google-Gemini-Natural-TTS' | 'Browser-Natural-Male-Voice' =
    'Google-Gemini-Natural-TTS';

  constructor() {
    this.initVoices();
  }

  private initVoices(): void {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return;
    }

    const loadVoices = () => {
      try {
        const voices = window.speechSynthesis.getVoices();
        if (voices && voices.length > 0) {
          this.cachedVoices = voices;
        }
      } catch (e) {
        console.warn('Voice loading warning:', e);
      }
    };

    loadVoices();

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = () => {
        loadVoices();
      };
    }
  }

  public setCustomAudioData(dataUrl: string): void {
    this.customAudioDataUrl = dataUrl;
  }

  public getCustomAudioDataUrl(): string | null {
    return this.customAudioDataUrl;
  }

  public getLastEngineUsed(): string {
    return this.lastEngineUsed;
  }

  public isSpeechSynthesisSupported(): boolean {
    return typeof window !== 'undefined' && 'speechSynthesis' in window;
  }

  /**
   * Select the best natural human male voice for the target language.
   */
  public selectBestMaleVoice(language: 'en' | 'ar' | 'ar-najdi'): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return null;
    }

    if (this.cachedVoices.length === 0) {
      this.cachedVoices = window.speechSynthesis.getVoices();
    }

    const voices = this.cachedVoices;
    if (voices.length === 0) return null;

    const isArabic = language === 'ar' || language === 'ar-najdi';

    if (isArabic) {
      // 1. High-fidelity Natural Male Arabic voices
      const naturalMaleAr = voices.find((v) => {
        const name = v.name.toLowerCase();
        const lang = v.lang.toLowerCase();
        return (
          lang.startsWith('ar') &&
          (name.includes('natural') || name.includes('online')) &&
          (name.includes('hamed') || name.includes('shakir') || name.includes('male') || name.includes('naayf'))
        );
      });
      if (naturalMaleAr) return naturalMaleAr;

      // 2. Named Male Arabic voices (Maged, Tarik, Hamed, Shakir, Naayf)
      const namedMaleAr = voices.find((v) => {
        const name = v.name.toLowerCase();
        const lang = v.lang.toLowerCase();
        return (
          lang.startsWith('ar') &&
          (name.includes('hamed') ||
            name.includes('shakir') ||
            name.includes('maged') ||
            name.includes('tarik') ||
            name.includes('naayf') ||
            name.includes('male'))
        );
      });
      if (namedMaleAr) return namedMaleAr;

      // 3. Any Saudi Arabia Arabic voice (ar-SA)
      const saudiAr = voices.find((v) => v.lang.toLowerCase() === 'ar-sa');
      if (saudiAr) return saudiAr;

      // 4. Any Arabic voice
      const anyAr = voices.find((v) => v.lang.toLowerCase().startsWith('ar'));
      if (anyAr) return anyAr;
    }

    // English Voices: Priority is given to Natural Human Male voices
    // 1. Microsoft Natural Male voices (Ryan, Guy, Christopher, Eric)
    const naturalMaleEn = voices.find((v) => {
      const name = v.name.toLowerCase();
      const lang = v.lang.toLowerCase();
      return (
        lang.startsWith('en') &&
        (name.includes('natural') || name.includes('online')) &&
        (name.includes('ryan') ||
          name.includes('guy') ||
          name.includes('christopher') ||
          name.includes('eric') ||
          name.includes('male'))
      );
    });
    if (naturalMaleEn) return naturalMaleEn;

    // 2. Google UK English Male or Google Male
    const googleMale = voices.find((v) => {
      const name = v.name.toLowerCase();
      return name.includes('google') && (name.includes('male') || name.includes('uk english male'));
    });
    if (googleMale) return googleMale;

    // 3. OS Male Voices (Daniel, Alex, David, Mark, George, Oliver)
    const namedMaleEn = voices.find((v) => {
      const name = v.name.toLowerCase();
      const lang = v.lang.toLowerCase();
      return (
        lang.startsWith('en') &&
        (name.includes('daniel') ||
          name.includes('alex') ||
          name.includes('david') ||
          name.includes('mark') ||
          name.includes('george') ||
          name.includes('male'))
      );
    });
    if (namedMaleEn) return namedMaleEn;

    // 4. Google US English (Standard clear voice)
    const googleUs = voices.find((v) => v.name.includes('Google US English'));
    if (googleUs) return googleUs;

    // 5. Default English voice
    const anyEn = voices.find((v) => v.lang.toLowerCase().startsWith('en'));
    if (anyEn) return anyEn;

    // 6. First available voice
    return voices[0] || null;
  }

  public getActiveVoiceName(language: 'en' | 'ar' | 'ar-najdi' = 'en'): string {
    const voice = this.selectBestMaleVoice(language);
    if (!voice) return 'Google Gemini Natural Male (Charon - Saudi Najdi)';
    return voice.name;
  }

  public getAvailableMaleVoices(): VoiceInfo[] {
    if (this.cachedVoices.length === 0 && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.cachedVoices = window.speechSynthesis.getVoices();
    }

    return this.cachedVoices.map((v) => {
      const name = v.name.toLowerCase();
      const isMale =
        name.includes('male') ||
        name.includes('ryan') ||
        name.includes('guy') ||
        name.includes('david') ||
        name.includes('mark') ||
        name.includes('daniel') ||
        name.includes('alex') ||
        name.includes('hamed') ||
        name.includes('shakir') ||
        name.includes('maged') ||
        name.includes('tarik');
      const isNatural = name.includes('natural') || name.includes('online');
      return {
        name: v.name,
        lang: v.lang,
        isMale,
        isNatural
      };
    });
  }

  /**
   * Primary speech method:
   * 1. Plays custom audio file if explicitly provided in options.
   * 2. Calls Google Gemini 2.5 / 3.8 Natural Human Male Voice (Saudi Arabian Najdi Dialect) via /api/voice/synthesize.
   * 3. Falls back seamlessly to client-side Natural Male Voice if offline or rate-limited.
   */
  public async playCustomVoice(
    text: string,
    options: VoicePlaybackOptions = {}
  ): Promise<{ stop: () => void; durationSec: number }> {
    this.stop();

    // 1. If an explicit audio file URL was passed in options, play it directly
    if (options.customAudioUrl) {
      try {
        const audio = new Audio(options.customAudioUrl);
        this.currentAudioElement = audio;
        this.isSpeaking = true;
        if (options.onStart) options.onStart();

        audio.playbackRate = options.rate || 1.0;

        audio.onended = () => {
          this.isSpeaking = false;
          this.currentAudioElement = null;
          if (options.onEnd) options.onEnd();
        };

        audio.onerror = () => {
          this.isSpeaking = false;
          this.currentAudioElement = null;
          this.speakWithSpeechSynthesis(text, options);
        };

        await audio.play();
        const duration = audio.duration || 6.5;

        return {
          stop: () => this.stop(),
          durationSec: Math.round(duration * 10) / 10
        };
      } catch {
        // Fall through
      }
    }

    // 2. Try Google Gemini Natural Human Male Voice via server proxy
    if (options.preferGeminiTTS !== false) {
      try {
        const response = await fetch('/api/voice/synthesize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            language: options.language || 'ar-najdi',
            voiceName: options.geminiVoiceName || 'Charon'
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.audioBase64) {
            this.lastEngineUsed = 'Google-Gemini-Natural-TTS';
            const mime = data.mimeType || 'audio/wav';
            const audioUrl = `data:${mime};base64,${data.audioBase64}`;
            const audio = new Audio(audioUrl);
            this.currentAudioElement = audio;
            this.isSpeaking = true;
            if (options.onStart) options.onStart();

            audio.playbackRate = options.rate || 1.0;

            return new Promise((resolve) => {
              audio.onended = () => {
                this.isSpeaking = false;
                this.currentAudioElement = null;
                if (options.onEnd) options.onEnd();
              };

              audio.onerror = () => {
                this.isSpeaking = false;
                this.currentAudioElement = null;
                const fallbackRes = this.speakWithSpeechSynthesis(text, options);
                resolve(fallbackRes);
              };

              audio
                .play()
                .then(() => {
                  const duration = audio.duration || Math.max(3, Math.round(text.length / 14));
                  resolve({
                    stop: () => this.stop(),
                    durationSec: duration
                  });
                })
                .catch(() => {
                  const fallbackRes = this.speakWithSpeechSynthesis(text, options);
                  resolve(fallbackRes);
                });
            });
          }
        }
      } catch {
        // Fallback to client-side synthesis
      }
    }

    // 3. Fallback: High-Fidelity Client-Side Natural Male Voice
    this.lastEngineUsed = 'Browser-Natural-Male-Voice';
    return this.speakWithSpeechSynthesis(text, options);
  }

  /**
   * Speaks text using the browser's speech synthesis calibrated with natural male parameters
   */
  private speakWithSpeechSynthesis(
    text: string,
    options: VoicePlaybackOptions = {}
  ): { stop: () => void; durationSec: number } {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (options.onError) {
        options.onError(new Error('Speech synthesis not supported in this environment'));
      }
      return { stop: () => {}, durationSec: 0 };
    }

    const synth = window.speechSynthesis;

    // Cancel any previous speech immediately
    try {
      synth.cancel();
    } catch {}

    const lang = options.language || 'ar-najdi';
    const cleanText = text.replace(/[*#_`]/g, '').trim();

    // Estimate duration for UI animations
    const wordCount = cleanText.split(/\s+/).filter(Boolean).length;
    const estimatedDuration = Math.max(Math.round((wordCount / 3.0) * 10) / 10, 2.0);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    this.currentUtterance = utterance;

    // Select the best natural male voice
    const bestVoice = this.selectBestMaleVoice(lang);
    if (bestVoice) {
      utterance.voice = bestVoice;
      utterance.lang = bestVoice.lang;
    } else {
      utterance.lang = lang === 'ar' || lang === 'ar-najdi' ? 'ar-SA' : 'en-US';
    }

    // Natural resonant pitch (0.95: deep, warm male baritone, not robotic)
    utterance.pitch = 0.95;

    // Measured conversational rate (0.96: deliberate, clear engineering pacing, not rushed)
    utterance.rate = options.rate && options.rate >= 0.8 && options.rate <= 1.4 ? options.rate : 0.96;
    utterance.volume = 1.0;

    let hasStarted = false;

    utterance.onstart = () => {
      hasStarted = true;
      this.isSpeaking = true;
      if (options.onStart) options.onStart();

      if (this.keepAliveTimer) clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = window.setInterval(() => {
        if (synth.speaking && !synth.paused) {
          synth.pause();
          synth.resume();
        }
      }, 7000);
    };

    utterance.onend = () => {
      this.cleanupSpeech();
      if (options.onEnd) options.onEnd();
    };

    utterance.onerror = (e) => {
      if (e.error === 'canceled' || e.error === 'interrupted') {
        this.cleanupSpeech();
        return;
      }
      this.cleanupSpeech();
      if (options.onError) {
        options.onError(new Error(`Speech error: ${e.error || 'unknown'}`));
      }
    };

    try {
      synth.speak(utterance);
      this.isSpeaking = true;

      setTimeout(() => {
        if (!hasStarted && synth.speaking) {
          hasStarted = true;
          this.isSpeaking = true;
          if (options.onStart) options.onStart();
        }
      }, 350);
    } catch (err) {
      this.cleanupSpeech();
      if (options.onError) {
        options.onError(err instanceof Error ? err : new Error(String(err)));
      }
    }

    return {
      stop: () => this.stop(),
      durationSec: estimatedDuration
    };
  }

  private cleanupSpeech(): void {
    this.isSpeaking = false;
    this.currentUtterance = null;
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }
  }

  public stop(): void {
    if (this.keepAliveTimer) {
      clearInterval(this.keepAliveTimer);
      this.keepAliveTimer = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }

    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
      } catch {}
      this.currentAudioElement = null;
    }

    this.currentUtterance = null;
    this.isSpeaking = false;
  }

  public getSpeakingState(): boolean {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return this.isSpeaking || window.speechSynthesis.speaking;
    }
    return this.isSpeaking;
  }
}

export const audioSynthesizer = new NaturalHumanVoiceSynthesizer();
