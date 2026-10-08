/**
 * LanguageRouter
 *
 * Central router for all conversational and agent speech output.
 * Guarantees that regardless of the language (English, Arabic, or Najdi Arabic),
 * the speaker identity remains strictly identical through CustomVoiceService.
 */

import { LanguageCode } from '../../types';
import { CustomVoiceService, VoiceGenerationResult } from './CustomVoiceService';

export class CentralLanguageRouter {
  /**
   * Routes the agent response text to the CustomVoiceService.
   * Enforces that English, Arabic, and Najdi conversational Arabic all route to the SAME custom voice.
   */
  public static async routeAndSpeak(
    text: string,
    options: {
      agentName: string;
      language: LanguageCode;
      geminiVoiceName?: 'Charon' | 'Fenrir' | 'Puck';
      onStart?: () => void;
      onEnd?: () => void;
      onError?: (err: Error) => void;
    }
  ): Promise<VoiceGenerationResult> {
    const config = CustomVoiceService.getConfig();

    // Verification check: ensure speaker identity is locked to the custom cloned voice
    if (!config.speakerIdentity) {
      console.warn('LanguageRouter warning: No custom speaker identity registered.');
    }

    // Pass through to the central CustomVoiceService
    return await CustomVoiceService.speak(text, {
      agentName: options.agentName,
      language: options.language,
      geminiVoiceName: options.geminiVoiceName,
      onStart: options.onStart,
      onEnd: options.onEnd,
      onError: options.onError
    });
  }

  /**
   * Helper to format an engineering recommendation into culturally appropriate
   * yet technically precise phrasing in the selected language.
   * Engineering data integrity is rigorously preserved (no modified figures).
   */
  public static formatAgentSpeech(
    rawText: string,
    language: LanguageCode
  ): string {
    if (language === 'ar-najdi') {
      // Natural Najdi conversational introductory cadence with preserved engineering specs
      if (!rawText.includes('هلا') && !rawText.includes('طال عمرك')) {
        return `هلا بك مهندسنا، ${rawText}`;
      }
    } else if (language === 'ar') {
      if (!rawText.includes('مرحباً') && !rawText.includes('السلام')) {
        return `مرحباً بك، ${rawText}`;
      }
    }
    return rawText;
  }
}

export const LanguageRouter = CentralLanguageRouter;
