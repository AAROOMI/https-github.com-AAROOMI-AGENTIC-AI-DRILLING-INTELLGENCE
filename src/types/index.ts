/**
 * Agentic AI Drilling Intelligence & Well Design Platform
 * Enterprise Type Definitions
 */

export type LanguageCode = 'en' | 'ar' | 'ar-najdi';

export type WorkflowPhaseId =
  | 'data-collection'
  | 'data-validation'
  | 'historical-intelligence'
  | 'ongoing-intelligence'
  | 'offset-analysis'
  | 'pressure-mudweight'
  | 'well-design-selection'
  | 'casing-hole-grade'
  | 'execution-objectives'
  | 'directional-planning'
  | 'human-approval'
  | 'drilling-program';

export type PhaseStatus =
  | 'PENDING'
  | 'RUNNING'
  | 'AGENT_REVIEW'
  | 'HUMAN_REVIEW'
  | 'APPROVED'
  | 'REJECTED'
  | 'MODIFIED'
  | 'COMPLETED';

export interface WorkflowPhase {
  id: WorkflowPhaseId;
  order: number;
  nameEn: string;
  nameAr: string;
  status: PhaseStatus;
  agentName: string;
  progressPercent: number;
  lastUpdated: string;
  summary: string;
  dependencies: WorkflowPhaseId[];
}

export interface WellData {
  id: string;
  name: string;
  field: string;
  operator: string;
  rig: string;
  spudDate: string;
  targetDepthM: number;
  measuredDepthM: number;
  surfaceLat: number;
  surfaceLng: number;
  elevationM: number;
  status: 'Planning' | 'Active Drilling' | 'Suspended' | 'Completed';
  currentPhase: WorkflowPhaseId;
  readinessScore: number; // e.g. 92%
}

export interface FormationTop {
  id: string;
  name: string;
  topDepthM: number;
  thicknessM: number;
  lithology: 'Shale' | 'Sandstone' | 'Carbonate' | 'Limestone' | 'Reservoir';
  porePressureGradientEsg: number; // sg
  fracGradientEsg: number; // sg
  drillingHazards: string[];
}

export interface CasingSection {
  id: string;
  sectionName: string; // Surface, Intermediate, Production, Liner
  holeSizeInches: number; // 26", 17.5", 12.25", 8.5"
  casingSizeInches: number; // 20", 13.375", 9.625", 7"
  topDepthM: number;
  shoeDepthM: number;
  casingGrade: string; // K-55, L-80, P-110, Q-125
  weightLbFt: number;
  burstRatingPsi: number;
  collapseRatingPsi: number;
  tensionSafetyFactor: number;
  cementTopM: number;
  mudWeightSg: number;
}

export interface MudWeightRecord {
  depthM: number;
  porePressurePsi: number;
  fracturePressurePsi: number;
  recommendedMudWeightSg: number;
  equivalentMudWeightPpg: number;
  uncertaintySg: number;
  stabilityCondition: 'Safe' | 'Marginal' | 'Critical';
}

export interface OffsetWell {
  id: string;
  name: string;
  distanceKm: number;
  similarityScore: number; // 0-100%
  spatialSimilarity: number;
  formationSimilarity: number;
  trajectorySimilarity: number;
  drillingBehaviorSimilarity: number;
  keyTroubles: string[];
  finalMudWeightSg: number;
  bestDesignProfile: string;
  totalDaysToTD: number;
}

export interface WellDesignCandidate {
  code: 'K-3' | 'K-2' | 'MK-2' | 'K-1' | 'MK-1' | 'MMK-1';
  name: string;
  recommended: boolean;
  confidencePercent: number;
  sectionsCount: number;
  estimatedCostMM: number;
  drillingDays: number;
  advantages: string[];
  risks: string[];
  assumptions: string[];
  engineeringRulesApplied: string[];
  casingScheme: string[];
}

export interface SurveyStation {
  mdM: number;
  incDeg: number;
  aziDeg: number;
  tvdM: number;
  northM: number;
  eastM: number;
  dlsDeg30m: number;
}

export interface ApprovalRecord {
  id: string;
  phaseId: WorkflowPhaseId;
  decision: 'APPROVED' | 'MODIFIED' | 'REJECTED' | 'REANALYZE';
  engineerName: string;
  engineerRole: string;
  timestamp: string;
  comments: string;
  overridesApplied?: string;
  signatureHash: string;
}

export interface AgentExecutionLog {
  id: string;
  agentName: string;
  timestamp: string;
  phase: WorkflowPhaseId;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  inputSummary: string;
  evidence: string;
  confidence: number;
  recommendation: string;
  warnings?: string[];
  requiresApproval: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  agentName?: string;
  text: string;
  timestamp: string;
  language: LanguageCode;
  hasAudio?: boolean;
  audioDurationSec?: number;
  evidence?: string;
  phaseContext?: WorkflowPhaseId;
  isApprovalRequired?: boolean;
  approvalStatus?: 'PENDING' | 'APPROVED' | 'REJECTED';
}

export interface VoiceProfileConfig {
  id: string;
  name: string;
  speakerIdentity: string; // The user's custom voice identity
  isCloned: boolean;
  referenceAudioFileName?: string;
  referenceAudioDurationSec?: number;
  referenceAudioFileSize?: number;
  pitchBaseHz: number; // e.g. 115 Hz
  speakingRate: number; // 0.9 - 1.2
  timbreProfile: 'Saudi Male (Najdi Accent)' | 'Aramco Executive Lead';
  provider: 'Local-Neural-Cloner' | 'ElevenLabs-Clone' | 'XTTS-v2-Local' | 'Coqui-Engine';
  isServiceAvailable: boolean;
  lastCalibratedAt?: string;
  sampleSnippets: {
    en: string;
    ar: string;
    najdi: string;
  };
}

export interface RagDocument {
  id: string;
  title: string;
  category: 'Morning Report' | 'EOWR' | 'Standard' | 'Geomechanics' | 'Troubles';
  fileType: 'PDF' | 'DOCX' | 'XLSX' | 'TXT' | 'CSV';
  uploadDate: string;
  chunkCount: number;
  sizeKb: number;
  extractedWell?: string;
  summary: string;
}

export interface SqlQueryAudit {
  id: string;
  user: string;
  timestamp: string;
  naturalQuery: string;
  generatedSql: string;
  executionTimeMs: number;
  rowCount: number;
  isReadOnlyValidated: boolean;
  status: 'SUCCESS' | 'BLOCKED' | 'ERROR';
}
