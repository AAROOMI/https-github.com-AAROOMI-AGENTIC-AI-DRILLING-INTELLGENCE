/**
 * SAFE SYNTHETIC TEST DATA
 * Explicitly labeled as: TEST DATA / SYNTHETIC BENCHMARK
 * Models representative Saudi Arabian drilling formations & offset wells.
 */

import {
  WellData,
  FormationTop,
  CasingSection,
  MudWeightRecord,
  OffsetWell,
  WellDesignCandidate,
  SurveyStation,
  WorkflowPhase,
  RagDocument
} from '../../types';

export const SYNTHETIC_ACTIVE_WELL: WellData = {
  id: 'well-ghawar-102',
  name: 'Well-102 (Ghawar Arab-D)',
  field: 'Ghawar South (Uthmaniyah Sector)',
  operator: 'Saudi Aramco Drilling Engineering',
  rig: 'SAR-214 (3000 HP Cyber Rig)',
  spudDate: '2026-11-15',
  targetDepthM: 3870,
  measuredDepthM: 6420,
  surfaceLat: 25.3289,
  surfaceLng: 49.6124,
  elevationM: 168.4,
  status: 'Planning',
  currentPhase: 'human-approval',
  readinessScore: 92
};

export const SYNTHETIC_FORMATION_TOPS: FormationTop[] = [
  {
    id: 'fmt-01',
    name: 'Top Seal (Hith Anhydrite)',
    topDepthM: 2340,
    thicknessM: 180,
    lithology: 'Carbonate',
    porePressureGradientEsg: 1.08,
    fracGradientEsg: 1.88,
    drillingHazards: ['Severe circulation loss in fracture zones', 'Hard stringers']
  },
  {
    id: 'fmt-02',
    name: 'Upper Sand (Biyadh/Wasia)',
    topDepthM: 2980,
    thicknessM: 340,
    lithology: 'Sandstone',
    porePressureGradientEsg: 1.15,
    fracGradientEsg: 1.74,
    drillingHazards: ['Differential sticking risk if overbalanced', 'High permeability']
  },
  {
    id: 'fmt-03',
    name: 'Target Zone (Arab-D Reservoir)',
    topDepthM: 3870,
    thicknessM: 220,
    lithology: 'Reservoir',
    porePressureGradientEsg: 1.28,
    fracGradientEsg: 1.68,
    drillingHazards: ['H2S sour gas potential', 'High reservoir pore pressure', 'Severe mud loss']
  },
  {
    id: 'fmt-04',
    name: 'Lower Sand (Jubaila / Hanifa)',
    topDepthM: 4560,
    thicknessM: 410,
    lithology: 'Limestone',
    porePressureGradientEsg: 1.34,
    fracGradientEsg: 1.78,
    drillingHazards: ['Overpressured tight limestone', 'Bit balling in interbedded shales']
  }
];

export const SYNTHETIC_CASING_SECTIONS: CasingSection[] = [
  {
    id: 'cs-01',
    sectionName: 'Surface',
    holeSizeInches: 26.0,
    casingSizeInches: 20.0,
    topDepthM: 0,
    shoeDepthM: 800,
    casingGrade: 'K-55',
    weightLbFt: 94.0,
    burstRatingPsi: 2110,
    collapseRatingPsi: 1130,
    tensionSafetyFactor: 2.15,
    cementTopM: 0,
    mudWeightSg: 1.12
  },
  {
    id: 'cs-02',
    sectionName: 'Intermediate',
    holeSizeInches: 17.5,
    casingSizeInches: 13.375,
    topDepthM: 800,
    shoeDepthM: 2200,
    casingGrade: 'L-80',
    weightLbFt: 68.0,
    burstRatingPsi: 5020,
    collapseRatingPsi: 2880,
    tensionSafetyFactor: 1.92,
    cementTopM: 650,
    mudWeightSg: 1.24
  },
  {
    id: 'cs-03',
    sectionName: 'Production',
    holeSizeInches: 12.25,
    casingSizeInches: 9.625,
    topDepthM: 2200,
    shoeDepthM: 3500,
    casingGrade: 'P-110',
    weightLbFt: 47.0,
    burstRatingPsi: 9440,
    collapseRatingPsi: 6870,
    tensionSafetyFactor: 1.78,
    cementTopM: 1950,
    mudWeightSg: 1.36
  },
  {
    id: 'cs-04',
    sectionName: 'Production Liner',
    holeSizeInches: 8.5,
    casingSizeInches: 7.0,
    topDepthM: 3500,
    shoeDepthM: 4500,
    casingGrade: 'Q-125 (Sour Service)',
    weightLbFt: 29.0,
    burstRatingPsi: 11220,
    collapseRatingPsi: 8600,
    tensionSafetyFactor: 1.84,
    cementTopM: 3400,
    mudWeightSg: 1.42
  }
];

export const SYNTHETIC_MUD_WEIGHT_PROFILE: MudWeightRecord[] = [
  { depthM: 500, porePressurePsi: 780, fracturePressurePsi: 1450, recommendedMudWeightSg: 1.10, equivalentMudWeightPpg: 9.18, uncertaintySg: 0.04, stabilityCondition: 'Safe' },
  { depthM: 1000, porePressurePsi: 1620, fracturePressurePsi: 2840, recommendedMudWeightSg: 1.18, equivalentMudWeightPpg: 9.85, uncertaintySg: 0.04, stabilityCondition: 'Safe' },
  { depthM: 1500, porePressurePsi: 2580, fracturePressurePsi: 4180, recommendedMudWeightSg: 1.22, equivalentMudWeightPpg: 10.18, uncertaintySg: 0.05, stabilityCondition: 'Safe' },
  { depthM: 2000, porePressurePsi: 3600, fracturePressurePsi: 5620, recommendedMudWeightSg: 1.25, equivalentMudWeightPpg: 10.43, uncertaintySg: 0.05, stabilityCondition: 'Safe' },
  { depthM: 2500, porePressurePsi: 4680, fracturePressurePsi: 6980, recommendedMudWeightSg: 1.32, equivalentMudWeightPpg: 11.02, uncertaintySg: 0.06, stabilityCondition: 'Safe' },
  { depthM: 3000, porePressurePsi: 5850, fracturePressurePsi: 8200, recommendedMudWeightSg: 1.38, equivalentMudWeightPpg: 11.52, uncertaintySg: 0.06, stabilityCondition: 'Safe' },
  { depthM: 3500, porePressurePsi: 7100, fracturePressurePsi: 9350, recommendedMudWeightSg: 1.42, equivalentMudWeightPpg: 11.85, uncertaintySg: 0.07, stabilityCondition: 'Safe' },
  { depthM: 3870, porePressurePsi: 8120, fracturePressurePsi: 10450, recommendedMudWeightSg: 1.45, equivalentMudWeightPpg: 12.10, uncertaintySg: 0.08, stabilityCondition: 'Safe' }
];

export const SYNTHETIC_OFFSET_WELLS: OffsetWell[] = [
  {
    id: 'off-01',
    name: 'Offset Well A (GHWR-088)',
    distanceKm: 2.1,
    similarityScore: 92,
    spatialSimilarity: 92,
    formationSimilarity: 87,
    trajectorySimilarity: 78,
    drillingBehaviorSimilarity: 69,
    keyTroubles: ['Minor mud losses at 2,410 m', 'Tight hole in shale section'],
    finalMudWeightSg: 1.38,
    bestDesignProfile: 'K-2 Casing Program',
    totalDaysToTD: 34
  },
  {
    id: 'off-02',
    name: 'Offset Well B (GHWR-094)',
    distanceKm: 3.4,
    similarityScore: 87,
    spatialSimilarity: 85,
    formationSimilarity: 89,
    trajectorySimilarity: 72,
    drillingBehaviorSimilarity: 74,
    keyTroubles: ['Differential sticking at 3,100 m', 'H2S kick 40 ppm at Arab-D top'],
    finalMudWeightSg: 1.41,
    bestDesignProfile: 'K-2 with 7" Liner',
    totalDaysToTD: 39
  },
  {
    id: 'off-03',
    name: 'Offset Well C (GHWR-067)',
    distanceKm: 5.8,
    similarityScore: 78,
    spatialSimilarity: 74,
    formationSimilarity: 81,
    trajectorySimilarity: 68,
    drillingBehaviorSimilarity: 65,
    keyTroubles: ['Severe losses in Hith Anhydrite (400 bbls)', 'Washout in 12-1/4"'],
    finalMudWeightSg: 1.36,
    bestDesignProfile: 'MK-2 Modified',
    totalDaysToTD: 44
  },
  {
    id: 'off-04',
    name: 'Offset Well D (GHWR-052)',
    distanceKm: 7.2,
    similarityScore: 69,
    spatialSimilarity: 63,
    formationSimilarity: 73,
    trajectorySimilarity: 61,
    drillingBehaviorSimilarity: 58,
    keyTroubles: ['Twisted off BHA in curved section', 'Gas influx managed through choke'],
    finalMudWeightSg: 1.44,
    bestDesignProfile: 'K-3 Conventional',
    totalDaysToTD: 52
  }
];

export const SYNTHETIC_WELL_DESIGN_CANDIDATES: WellDesignCandidate[] = [
  {
    code: 'K-2',
    name: 'K-2 Slim/Optimized Casing Profile',
    recommended: true,
    confidencePercent: 92,
    sectionsCount: 4,
    estimatedCostMM: 4.85,
    drillingDays: 32,
    advantages: [
      'Optimal wellbore stability for Arab-D horizontal drain',
      'Minimizes steel weight and cementing volume by 18%',
      'Maximized reservoir contact with 1,240 m horizontal displacement',
      'High compatibility with Offset Well A (92% similarity)'
    ],
    risks: [
      'Tighter annular clearance across 9-5/8" to 7" liner overlap',
      'Requires precise ECD management to avoid losses in Hith formation'
    ],
    assumptions: [
      'Pore pressure does not exceed 1.32 sg prior to reservoir entry',
      'Directional build rate limited to 8.5 deg / 100 ft max'
    ],
    engineeringRulesApplied: [
      'Aramco Drilling Engineering Rule DER-04 (Liner overlap >= 100 m)',
      'API Spec 5CT Casing Design Safety Factors (Burst >= 1.10, Collapse >= 1.00, Tension >= 1.60)',
      'DER-12: Dual barrier philosophy for H2S sour gas environments'
    ],
    casingScheme: ['20" Surface @ 800m', '13-3/8" Intermediate @ 2200m', '9-5/8" Production @ 3500m', '7" Liner @ 4500m']
  },
  {
    code: 'K-3',
    name: 'K-3 Heavy Duty 5-String Conventional',
    recommended: false,
    confidencePercent: 81,
    sectionsCount: 5,
    estimatedCostMM: 6.20,
    drillingDays: 45,
    advantages: [
      'Maximum redundancy against extreme lost circulation zones',
      'Extra casing string isolates intermediate salt beds independently'
    ],
    risks: [
      '28% higher total CAPEX and longer rig days',
      'Larger hole sizes require higher pump flow rates and mud volume'
    ],
    assumptions: [
      'Assumes abnormal tectonic overpressuring in pre-Arab D formations'
    ],
    engineeringRulesApplied: [
      'DER-01: Conventional 5-string program for exploration and high-risk wildcats'
    ],
    casingScheme: ['30" Conductor @ 150m', '20" Surface @ 900m', '13-3/8" 1st Inter @ 2100m', '9-5/8" 2nd Inter @ 3400m', '7" Prod Liner @ 4400m']
  },
  {
    code: 'MK-2',
    name: 'MK-2 Monobore Extended Reach Variant',
    recommended: false,
    confidencePercent: 74,
    sectionsCount: 3,
    estimatedCostMM: 4.10,
    drillingDays: 27,
    advantages: [
      'Fastest drilling duration and lowest tubular expenditure',
      'Uniform casing diameter simplifies completion strings'
    ],
    risks: [
      'Elevated differential sticking risk in permeable sands (no separate intermediate isolation)',
      'Reduced pressure tolerance if unforeseen gas kick occurs'
    ],
    assumptions: [
      'Assumes stable pressure regime without unexpected tectonic faulting'
    ],
    engineeringRulesApplied: [
      'DER-09: Fast-track monobore casing guidelines for mature infill fields'
    ],
    casingScheme: ['16" Surface @ 950m', '9-5/8" Intermediate @ 3300m', '7" Production String @ 4600m']
  }
];

export const SYNTHETIC_SURVEY_STATIONS: SurveyStation[] = [
  { mdM: 0, incDeg: 0.0, aziDeg: 0.0, tvdM: 0, northM: 0, eastM: 0, dlsDeg30m: 0.0 },
  { mdM: 600, incDeg: 0.0, aziDeg: 0.0, tvdM: 600, northM: 0, eastM: 0, dlsDeg30m: 0.0 },
  { mdM: 1200, incDeg: 12.4, aziDeg: 124.0, tvdM: 1195, northM: 38, eastM: 56, dlsDeg30m: 0.62 },
  { mdM: 1800, incDeg: 28.5, aziDeg: 124.0, tvdM: 1762, northM: 142, eastM: 210, dlsDeg30m: 0.81 },
  { mdM: 2400, incDeg: 42.0, aziDeg: 124.0, tvdM: 2251, northM: 295, eastM: 437, dlsDeg30m: 0.68 },
  { mdM: 3000, incDeg: 58.2, aziDeg: 124.0, tvdM: 2638, northM: 489, eastM: 724, dlsDeg30m: 0.81 },
  { mdM: 3600, incDeg: 74.8, aziDeg: 124.0, tvdM: 2872, northM: 712, eastM: 1054, dlsDeg30m: 0.83 },
  { mdM: 4200, incDeg: 82.5, aziDeg: 124.0, tvdM: 2998, northM: 958, eastM: 1419, dlsDeg30m: 0.39 },
  { mdM: 5200, incDeg: 82.5, aziDeg: 124.0, tvdM: 3375, northM: 1374, eastM: 2035, dlsDeg30m: 0.0 },
  { mdM: 6420, incDeg: 82.5, aziDeg: 124.0, tvdM: 3870, northM: 1880, eastM: 2785, dlsDeg30m: 0.0 }
];

export const SYNTHETIC_WORKFLOW_PHASES: WorkflowPhase[] = [
  {
    id: 'data-collection',
    order: 1,
    nameEn: 'Data Collection',
    nameAr: 'جمع البيانات',
    status: 'COMPLETED',
    agentName: 'Data Intelligence Agent',
    progressPercent: 100,
    lastUpdated: '2026-10-06T18:20:00Z',
    summary: 'Well parameters, coordinates, surface elevation, and target parameters extracted and cataloged.',
    dependencies: []
  },
  {
    id: 'data-validation',
    order: 2,
    nameEn: 'Data Validation',
    nameAr: 'تدقيق وصحة البيانات',
    status: 'COMPLETED',
    agentName: 'Validation Agent',
    progressPercent: 100,
    lastUpdated: '2026-10-06T18:45:00Z',
    summary: 'Zero schema errors detected. Depth bounds, casing sizes, and unit conversions validated.',
    dependencies: ['data-collection']
  },
  {
    id: 'historical-intelligence',
    order: 3,
    nameEn: 'Historical Well Intelligence',
    nameAr: 'ذكاء الآبار التاريخية',
    status: 'COMPLETED',
    agentName: 'Historical Well Agent',
    progressPercent: 100,
    lastUpdated: '2026-10-06T19:10:00Z',
    summary: 'Synthesized 28 historical wells across Ghawar field; 12 lessons learned integrated.',
    dependencies: ['data-validation']
  },
  {
    id: 'ongoing-intelligence',
    order: 4,
    nameEn: 'Ongoing Well Intelligence',
    nameAr: 'معلومات العمليات الجارية',
    status: 'COMPLETED',
    agentName: 'Ongoing Well Agent',
    progressPercent: 100,
    lastUpdated: '2026-10-06T19:30:00Z',
    summary: 'Rig telemetry and morning reports connected. Real-time ROP and torque/drag baselines active.',
    dependencies: ['historical-intelligence']
  },
  {
    id: 'offset-analysis',
    order: 5,
    nameEn: 'Offset Well Analysis',
    nameAr: 'تحليل الآبار المجاورة',
    status: 'COMPLETED',
    agentName: 'Offset Intelligence Agent',
    progressPercent: 100,
    lastUpdated: '2026-10-06T20:00:00Z',
    summary: '4 offset wells ranked. Offset Well A (GHWR-088) identified as optimal analog with 92% similarity.',
    dependencies: ['ongoing-intelligence']
  },
  {
    id: 'pressure-mudweight',
    order: 6,
    nameEn: 'Formation Pressure & Mud Weight',
    nameAr: 'الطبقات وضغط طين الحفر',
    status: 'COMPLETED',
    agentName: 'Pressure & Mud Weight Agent',
    progressPercent: 100,
    lastUpdated: '2026-10-06T20:25:00Z',
    summary: 'Pore pressure profile established. Safe operating mud window computed at 1.32 - 1.46 sg (11.0 - 12.2 ppg).',
    dependencies: ['offset-analysis']
  },
  {
    id: 'well-design-selection',
    order: 7,
    nameEn: 'Well Design Selection',
    nameAr: 'تصميم واختيار نوع البئر',
    status: 'COMPLETED',
    agentName: 'Well Design Agent',
    progressPercent: 100,
    lastUpdated: '2026-10-06T20:50:00Z',
    summary: 'K-2 casing profile recommended with 92% confidence over K-3 and MK-2 options.',
    dependencies: ['pressure-mudweight']
  },
  {
    id: 'casing-hole-grade',
    order: 8,
    nameEn: 'Casing, Hole & Metallurgy Grade',
    nameAr: 'أغلفة ومقاطع وتدرج المعادن',
    status: 'COMPLETED',
    agentName: 'Casing Design Agent',
    progressPercent: 100,
    lastUpdated: '2026-10-06T21:15:00Z',
    summary: 'Surface 20", Intermediate 13-3/8", Production 9-5/8", Liner 7" (Q-125 Sour Service) verified.',
    dependencies: ['well-design-selection']
  },
  {
    id: 'execution-objectives',
    order: 9,
    nameEn: 'Execution Objectives',
    nameAr: 'أهداف التنفيذ الهندسي',
    status: 'COMPLETED',
    agentName: 'Execution Objective Agent',
    progressPercent: 100,
    lastUpdated: '2026-10-06T21:30:00Z',
    summary: 'Target depth 3,870 m TVD, 6,420 m MD. Target entry window: +/- 5 m vertical, +/- 15 m horizontal.',
    dependencies: ['casing-hole-grade']
  },
  {
    id: 'directional-planning',
    order: 10,
    nameEn: 'Directional Trajectory Planning',
    nameAr: 'التوجيه الأفقي وتخطيط المسار',
    status: 'COMPLETED',
    agentName: 'Directional Planning Agent',
    progressPercent: 100,
    lastUpdated: '2026-10-06T21:55:00Z',
    summary: 'Planned 3D trajectory computed with minimum curvature algorithm. Max DLS 0.83 deg/30m, inclination 82.5 deg.',
    dependencies: ['execution-objectives']
  },
  {
    id: 'human-approval',
    order: 11,
    nameEn: 'Engineer Review & Approval Gate',
    nameAr: 'مراجعة واعتماد المهندس المختص',
    status: 'HUMAN_REVIEW',
    agentName: 'Engineer Review Agent',
    progressPercent: 85,
    lastUpdated: '2026-10-07T02:00:00Z',
    summary: 'Awaiting Lead Drilling Engineer formal sign-off. K-2 design & 11.3 ppg mud weight ready for decision.',
    dependencies: ['directional-planning']
  },
  {
    id: 'drilling-program',
    order: 12,
    nameEn: 'Comprehensive Drilling Program',
    nameAr: 'برنامج الحفر الهندسي المتكامل',
    status: 'PENDING',
    agentName: 'Drilling Program Agent',
    progressPercent: 0,
    lastUpdated: '2026-10-07T02:10:00Z',
    summary: 'Will generate comprehensive 48-page drilling manual upon engineer sign-off in Phase 11.',
    dependencies: ['human-approval']
  }
];

export const SYNTHETIC_RAG_DOCUMENTS: RagDocument[] = [
  {
    id: 'doc-01',
    title: 'Aramco Drilling Engineering Manual (DEM-STD-2024)',
    category: 'Standard',
    fileType: 'PDF',
    uploadDate: '2026-09-12',
    chunkCount: 342,
    sizeKb: 18450,
    summary: 'Official corporate engineering directives for casing design safety factors and kick tolerance.'
  },
  {
    id: 'doc-02',
    title: 'Ghawar South Arab-D Geomechanical Model & Pore Pressure Atlas',
    category: 'Geomechanics',
    fileType: 'PDF',
    uploadDate: '2026-09-18',
    chunkCount: 184,
    sizeKb: 9240,
    extractedWell: 'Well-102 Analog Cluster',
    summary: 'Pore pressure estimation methodology, regional stress tensor, and fracture gradient curves.'
  },
  {
    id: 'doc-03',
    title: 'End of Well Report: GHWR-088 (Offset Well A)',
    category: 'EOWR',
    fileType: 'PDF',
    uploadDate: '2026-09-22',
    chunkCount: 96,
    sizeKb: 5410,
    extractedWell: 'GHWR-088',
    summary: 'Actual vs planned drilling days, bit records, mud weights used, and lost circulation remedies.'
  },
  {
    id: 'doc-04',
    title: 'H2S Drilling Safety & Metallurgy Guidelines (DER-12)',
    category: 'Standard',
    fileType: 'PDF',
    uploadDate: '2026-10-01',
    chunkCount: 64,
    sizeKb: 3120,
    summary: 'Material selection for sour service environments: Q-125 and NACE MR0175 compliant tubulars.'
  }
];
