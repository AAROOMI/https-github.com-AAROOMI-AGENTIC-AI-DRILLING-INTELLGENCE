/**
 * Agentic Force Central Orchestrator & Supervisor Engine
 *
 * Coordinates:
 * - Agent Registry and Discovery
 * - Intelligent Query Routing
 * - Engineering Context Memory & Session State
 * - Human-in-the-Loop Approval Control
 * - Multi-Agent Execution Audit Logs
 * - Unified Custom Voice Response routing
 */

import {
  AgentExecutionLog,
  ChatMessage,
  LanguageCode,
  WellData,
  WorkflowPhaseId
} from '../../types';
import { SYNTHETIC_ACTIVE_WELL } from '../data/initialSyntheticData';
import { LocalLlmGateway } from '../llm/localLlmGateway';
import { CentralLanguageRouter, LanguageRouter } from '../voice/LanguageRouter';
import { SPECIALIZED_AGENTS, SpecializedAgentDef } from './specializedAgents';

export interface OrchestrationContext {
  currentUser: {
    name: string;
    role: string;
    badgeId: string;
  };
  currentWell: WellData;
  currentPhase: WorkflowPhaseId;
  sessionStartTime: string;
  previousDecisions: string[];
}

class CentralAgenticForce {
  private context: OrchestrationContext = {
    currentUser: {
      name: 'Ahmad Al-Ghamdi',
      role: 'Lead Drilling Engineer',
      badgeId: 'KSA-ENG-4912'
    },
    currentWell: { ...SYNTHETIC_ACTIVE_WELL },
    currentPhase: 'human-approval',
    sessionStartTime: new Date().toISOString(),
    previousDecisions: [
      'Approved: 20" Surface Casing depth set to 800 m',
      'Approved: Intermediate Casing set to 13-3/8" L-80 @ 2,200 m',
      'Verified: Eaton pore pressure calibration against LOT on GHWR-088'
    ]
  };

  private executionLogs: AgentExecutionLog[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.seedInitialExecutionLogs();
  }

  private seedInitialExecutionLogs(): void {
    SPECIALIZED_AGENTS.slice(0, 10).forEach((agent, idx) => {
      this.executionLogs.push({
        id: `log-${idx + 1}`,
        agentName: agent.name,
        timestamp: new Date(Date.now() - (10 - idx) * 3600000).toISOString(),
        phase: agent.phase,
        status: 'COMPLETED',
        inputSummary: `Evaluated ${this.context.currentWell.name} parameters under ${agent.role}`,
        evidence: agent.evidence.join('; '),
        confidence: agent.confidence,
        recommendation: agent.currentRecommendation,
        warnings: agent.warnings,
        requiresApproval: agent.phase === 'human-approval'
      });
    });
  }

  public getContext(): OrchestrationContext {
    return { ...this.context };
  }

  public getAgents(): SpecializedAgentDef[] {
    return [...SPECIALIZED_AGENTS];
  }

  public getExecutionLogs(): AgentExecutionLog[] {
    return [...this.executionLogs];
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    this.listeners.forEach((fn) => fn());
  }

  /**
   * Intelligent Agent Routing
   * Maps natural language prompt to the most qualified specialized agent
   */
  public routePromptToAgent(prompt: string): SpecializedAgentDef {
    const p = prompt.toLowerCase();

    if (p.includes('offset') || p.includes('مجاور') || p.includes('نظير') || p.includes('analog')) {
      return SPECIALIZED_AGENTS.find((a) => a.id === 'agent-offset')!;
    }
    if (p.includes('mud weight') || p.includes('ppg') || p.includes('sg') || p.includes('طين') || p.includes('وزن')) {
      return SPECIALIZED_AGENTS.find((a) => a.id === 'agent-pressure-mw')!;
    }
    if (p.includes('pressure') || p.includes('pore') || p.includes('frac') || p.includes('ضغط')) {
      return SPECIALIZED_AGENTS.find((a) => a.id === 'agent-pressure-mw')!;
    }
    if (p.includes('casing') || p.includes('غلاف') || p.includes('تغليف') || p.includes('liner') || p.includes('grade')) {
      return SPECIALIZED_AGENTS.find((a) => a.id === 'agent-casing-grade')!;
    }
    if (p.includes('k-2') || p.includes('k-3') || p.includes('mk-2') || p.includes('design') || p.includes('تصميم')) {
      return SPECIALIZED_AGENTS.find((a) => a.id === 'agent-well-design')!;
    }
    if (p.includes('trajectory') || p.includes('مسار') || p.includes('dls') || p.includes('azimuth') || p.includes('انحراف') || p.includes('direction')) {
      return SPECIALIZED_AGENTS.find((a) => a.id === 'agent-directional')!;
    }
    if (p.includes('trouble') || p.includes('sticking') || p.includes('loss') || p.includes('مخاطر') || p.includes('مشاكل') || p.includes('kick')) {
      return SPECIALIZED_AGENTS.find((a) => a.id === 'agent-trouble-prediction')!;
    }
    if (p.includes('program') || p.includes('برنامج') || p.includes('تقرير') || p.includes('report') || p.includes('manual')) {
      return SPECIALIZED_AGENTS.find((a) => a.id === 'agent-drilling-program')!;
    }
    if (p.includes('approval') || p.includes('اعتماد') || p.includes('sign') || p.includes('موافقة')) {
      return SPECIALIZED_AGENTS.find((a) => a.id === 'agent-engineer-review')!;
    }
    if (p.includes('sql') || p.includes('select') || p.includes('query') || p.includes('قاعدة بيانات')) {
      return SPECIALIZED_AGENTS.find((a) => a.id === 'agent-sql')!;
    }
    if (p.includes('rag') || p.includes('manual') || p.includes('document') || p.includes('مستند') || p.includes('معيار')) {
      return SPECIALIZED_AGENTS.find((a) => a.id === 'agent-rag')!;
    }

    // Default to general engineering copilot
    return SPECIALIZED_AGENTS.find((a) => a.id === 'agent-copilot')!;
  }

  /**
   * Executes a user request through the designated agent
   * Automatically coordinates reasoning, evidence collection, audit logging,
   * and optional voice synthesis using the unified custom voice.
   */
  public async executeRequest(
    userText: string,
    options: {
      language: LanguageCode;
      speakResponse?: boolean;
    }
  ): Promise<ChatMessage> {
    const targetAgent = this.routePromptToAgent(userText);
    const startTime = performance.now();

    // Generate response using LocalLlmGateway (with automatic offline fallback)
    const llmResult = await LocalLlmGateway.generate({
      prompt: `${userText}. Target Agent: ${targetAgent.name}. Engineering context: Well-102 Arab-D horizontal development.`,
      systemPrompt: `You are ${targetAgent.name} in Saudi Aramco drilling intelligence. Provide concise, rigorous engineering recommendations with exact numbers and evidence.`
    });

    let responseText = llmResult.text;
    if (options.language === 'ar-najdi' && targetAgent.currentRecommendationAr) {
      responseText = targetAgent.currentRecommendationAr;
    } else if (options.language === 'ar' && targetAgent.currentRecommendationAr) {
      responseText = targetAgent.currentRecommendationAr;
    } else if (targetAgent.currentRecommendation) {
      responseText = targetAgent.currentRecommendation;
    }

    // Format speech politely while strictly maintaining engineering figures
    const speechFormattedText = CentralLanguageRouter.formatAgentSpeech(responseText, options.language);

    // Audit logging
    const logEntry: AgentExecutionLog = {
      id: `exec-${Date.now()}`,
      agentName: targetAgent.name,
      timestamp: new Date().toISOString(),
      phase: targetAgent.phase,
      status: 'COMPLETED',
      inputSummary: userText,
      evidence: targetAgent.evidence.join('; '),
      confidence: targetAgent.confidence,
      recommendation: responseText,
      warnings: targetAgent.warnings,
      requiresApproval: targetAgent.phase === 'human-approval'
    };
    this.executionLogs.unshift(logEntry);
    this.notify();

    let hasAudio = false;
    let audioDurationSec = 0;

    // Trigger voice if requested via the central CustomVoiceService
    if (options.speakResponse) {
      const voiceResult = await CentralLanguageRouter.routeAndSpeak(speechFormattedText, {
        agentName: targetAgent.name,
        language: options.language
      });
      hasAudio = voiceResult.success;
      audioDurationSec = voiceResult.audioDurationSec || 0;
    }

    return {
      id: `msg-${Date.now()}`,
      sender: 'agent',
      agentName: targetAgent.name,
      text: responseText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: options.language,
      hasAudio,
      audioDurationSec,
      evidence: targetAgent.evidence.join(' | '),
      phaseContext: targetAgent.phase,
      isApprovalRequired: targetAgent.phase === 'human-approval',
      approvalStatus: targetAgent.phase === 'human-approval' ? 'PENDING' : undefined
    };
  }
}

export const AgenticForce = new CentralAgenticForce();
