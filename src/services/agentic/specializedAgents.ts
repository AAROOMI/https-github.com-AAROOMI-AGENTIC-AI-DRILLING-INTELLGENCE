/**
 * Specialized Engineering Agents
 *
 * Implements the 19 domain engineering agents defined in the Agentic Force architecture.
 * Each agent provides:
 * - Deterministic engineering logic & configurable rules
 * - Traceable evidence provenance
 * - Confidence metric
 * - Audited inputs and outputs
 * - Human override support
 */

import { WorkflowPhaseId } from '../../types';

export interface SpecializedAgentDef {
  id: string;
  name: string;
  nameAr: string;
  role: string;
  phase: WorkflowPhaseId;
  description: string;
  tools: string[];
  permissions: string[];
  confidence: number;
  lastRunTimestamp?: string;
  currentRecommendation: string;
  currentRecommendationAr: string;
  evidence: string[];
  assumptions: string[];
  warnings: string[];
  engineeringRulesApplied: string[];
}

export const SPECIALIZED_AGENTS: SpecializedAgentDef[] = [
  {
    id: 'agent-data',
    name: 'Data Intelligence Agent',
    nameAr: 'وكيل استخبارات البيانات',
    role: 'Ingestion & Schema Normalization',
    phase: 'data-collection',
    description: 'Ingests, parses, and harmonizes structured well headers, coordinates, and wellbore geometries.',
    tools: ['parse_well_header', 'coordinate_transform_utm', 'schema_validator'],
    permissions: ['READ_DATA_COLLECTION', 'WRITE_WELL_HEADER'],
    confidence: 98,
    currentRecommendation: 'Well-102 surface coordinates (Lat 25.3289, Lng 49.6124) verified against Aramco Geographic Survey UTM Zone 39N.',
    currentRecommendationAr: 'تم التحقق من إحداثيات السطح للبئر 102 ومطابقتها مع مسح أرامكو الجغرافي للمنطقة 39 شمالاً.',
    evidence: ['Field GIS boundary records', 'Rig move survey report RMS-2026-88'],
    assumptions: ['Surface elevation datum is Mean Sea Level (MSL = 168.4 m)'],
    warnings: [],
    engineeringRulesApplied: ['DEM-GEO-01: Geodetic coordinate integrity verification']
  },
  {
    id: 'agent-validation',
    name: 'Data Validation Agent',
    nameAr: 'وكيل التحقق من صحة البيانات',
    role: 'Integrity & Anomaly Detection',
    phase: 'data-validation',
    description: 'Scans for conflicting formation tops, overlapping casing shoes, and invalid unit representations.',
    tools: ['depth_consistency_check', 'casing_shoe_validator', 'unit_checker'],
    permissions: ['READ_ALL', 'WRITE_VALIDATION_FLAGS'],
    confidence: 96,
    currentRecommendation: 'All section depths are monotonically increasing. No conflicting casing intervals detected.',
    currentRecommendationAr: 'جميع أعماق المقاطع متناسقة ومتصاعدة. لا توجد تداخلات متناقضة في أقطار الأغلفة.',
    evidence: ['Well schematic geometry check', 'Formation top hierarchy parser'],
    assumptions: ['API casing tolerances comply with Spec 5CT standard tables'],
    warnings: [],
    engineeringRulesApplied: ['API-5CT: Casing clearance verification', 'DER-VAL-03: Depth monotonicity validation']
  },
  {
    id: 'agent-historical',
    name: 'Historical Intelligence Agent',
    nameAr: 'وكيل الآبار التاريخية',
    role: 'Historical Mining & Lessons Learned',
    phase: 'historical-intelligence',
    description: 'Extracts performance baselines, NPT records, and lessons learned from past wells drilled in the field.',
    tools: ['query_historical_wells', 'extract_lessons_learned', 'npt_analyzer'],
    permissions: ['READ_HISTORICAL_DB', 'RAG_SEARCH'],
    confidence: 94,
    currentRecommendation: 'Synthesized 28 historical wells drilled in Ghawar South Arab-D. Average drilling duration to TD is 36.2 days.',
    currentRecommendationAr: 'تم تجميع بيانات 28 بئراً تاريخية في قطاع عثمانية بجنوب الغوار، وبلغ متوسط زمن الحفر 36.2 يوماً.',
    evidence: ['Drilling database 2018-2025 records', 'EOWR reports GHWR-044 through GHWR-099'],
    assumptions: ['Bit technology comparable to PDC 5-blade matrix bodies'],
    warnings: ['High NPT reported historically in Hith Anhydrite due to fractured thief zones'],
    engineeringRulesApplied: ['DER-HIST-02: Historical analog clustering by reservoir zone']
  },
  {
    id: 'agent-ongoing',
    name: 'Ongoing Well Intelligence Agent',
    nameAr: 'وكيل العمليات الجارية',
    role: 'Real-Time Telemetry & Drilling Progress',
    phase: 'ongoing-intelligence',
    description: 'Tracks real-time telemetry, morning reports, ECD, standpipe pressure, and ROP trends.',
    tools: ['witsml_stream_reader', 'morning_report_parser', 'ecd_tracker'],
    permissions: ['READ_TELEMETRY', 'READ_MORNING_REPORTS'],
    confidence: 91,
    currentRecommendation: 'Connected to Rig SAR-214 cyber telemetry stream. Pre-spud operational checklist 100% complete.',
    currentRecommendationAr: 'تم الربط مع تدفق البيانات اللحظية لمنصة الحفر SAR-214، واكتمال جاهزية ما قبل بدء الحفر بنسبة 100%.',
    evidence: ['Daily Morning Report DMR-01', 'BOP pressure test certificate'],
    assumptions: ['Mud pumps duplex efficiency rated at 95%'],
    warnings: [],
    engineeringRulesApplied: ['API-RP-53: Blowout prevention equipment operational readiness']
  },
  {
    id: 'agent-offset',
    name: 'Offset Intelligence Agent',
    nameAr: 'وكيل ذكاء الآبار المجاورة',
    role: 'Analog Ranking & Similarity Modeling',
    phase: 'offset-analysis',
    description: 'Computes multi-dimensional similarity scores for adjacent offset wells within a 10 km radius.',
    tools: ['spatial_distance_calculator', 'lithology_similarity_vector', 'offset_clusterer'],
    permissions: ['READ_OFFSET_DATA', 'CALCULATE_SIMILARITY'],
    confidence: 92,
    currentRecommendation: 'Offset Well A (GHWR-088) is the primary analog with 92% similarity (Distance: 2.1 km, Arab-D formation match 87%).',
    currentRecommendationAr: 'البئر المجاورة (أ) GHWR-088 هي النظير الأمثل بنسبة تشابه 92% على بعد 2.1 كم.',
    evidence: ['Spatial offset index', 'Composite similarity matrix algorithm', 'Subsurface structure map'],
    assumptions: ['Structural dip angle remains consistent at 2.4 degrees SW'],
    warnings: ['Offset Well C encountered 400 bbl mud losses at 2,340 m depth'],
    engineeringRulesApplied: ['DER-OFF-05: Multi-attribute similarity weighting (Spatial: 35%, Formation: 35%, Trajectory: 30%)']
  },
  {
    id: 'agent-pressure-mw',
    name: 'Pressure & Mud Weight Agent',
    nameAr: 'وكيل الضغوط وطين الحفر',
    role: 'Pore Pressure & Hydraulic Window Estimation',
    phase: 'pressure-mudweight',
    description: 'Calculates pore pressure profile, fracture gradient, and safe operational mud weight window.',
    tools: ['eaton_pore_pressure_calc', 'hubbert_willis_frac_grad', 'mud_window_optimizer'],
    permissions: ['CALCULATE_HYDRAULICS', 'WRITE_MUD_WINDOW'],
    confidence: 93,
    currentRecommendation: 'Safe operating mud weight window: 1.32 - 1.46 sg (11.0 - 12.2 ppg). Recommended operational mud weight: 1.36 sg (11.35 ppg).',
    currentRecommendationAr: 'نافذة وزن طين الحفر الآمنة: 1.32 إلى 1.46 غ/سم³ (11.0 - 12.2 باوند). الوزن الموصى به: 1.36 غ/سم³.',
    evidence: ['Eaton method acoustic log calibration', 'Offset GHWR-088 leak-off test (LOT = 1.74 sg at 2,200m)'],
    assumptions: ['Normal overburden gradient of 1.00 psi/ft (2.31 sg)'],
    warnings: ['Pore pressure in Arab-D kicks up to 1.28 sg; keep 200 psi trip margin'],
    engineeringRulesApplied: ['API-RP-13D: Rheology and hydraulics of drilling fluids', 'DER-MW-08: Safe overbalance criteria']
  },
  {
    id: 'agent-trouble-prediction',
    name: 'Drilling Troubles Agent',
    nameAr: 'وكيل التنبؤ بمشاكل الحفر',
    role: 'Hazard Prediction & Risk Mitigation',
    phase: 'pressure-mudweight',
    description: 'Predicts probabilities of lost circulation, differential sticking, pack-offs, and gas kicks.',
    tools: ['hazard_prob_model', 'sticking_risk_evaluator', 'loss_zone_detector'],
    permissions: ['READ_GEOLOGY', 'WRITE_RISK_FACTORS'],
    confidence: 89,
    currentRecommendation: 'Predicted trouble exposure: Lost circulation risk 3.2% (Medium), Differential sticking 1.4% (Low), Gas kick 0.6% (Low).',
    currentRecommendationAr: 'المخاطر المتوقعة: فقدان طين الحفر 3.2% (متوسط)، التصاق أنابيب الحفر 1.4% (منخفض)، تدفق غازي 0.6% (منخفض).',
    evidence: ['Historical trouble database', 'Fault proximity analysis', 'Permeable sand overbalance delta'],
    assumptions: ['Mud filtration loss controlled below 4.0 cc/30min API'],
    warnings: ['Prepare 100 bbl coarse calcium carbonate LCM pill prior to drilling Hith Anhydrite'],
    engineeringRulesApplied: ['DER-TRB-01: Proactive drilling hazard mitigation framework']
  },
  {
    id: 'agent-well-design',
    name: 'Well Design Agent',
    nameAr: 'وكيل تصميم البئر',
    role: 'Architecture Selection (K-3 / K-2 / MK-2)',
    phase: 'well-design-selection',
    description: 'Evaluates architectural casing programs (K-3, K-2, MK-2, K-1, MK-1) against reservoir objectives and cost.',
    tools: ['casing_program_evaluator', 'cost_estimator', 'schematic_generator'],
    permissions: ['WRITE_DESIGN_SELECTION', 'READ_ALL_ENGINEERING'],
    confidence: 92,
    currentRecommendation: 'Selected Candidate: K-2 Slim/Optimized Casing Profile (92% confidence, estimated cost $4.85MM, 32 drilling days).',
    currentRecommendationAr: 'الخيار الموصى به: تصميم K-2 المطور (ثقة 92%، تكلفة تقديرية 4.85 مليون دولار، 32 يوماً إجمالياً).',
    evidence: ['Multi-criteria decision matrix', 'Offset Well A performance benchmarking', 'Drilling cost optimization model'],
    assumptions: ['Wellbore stability maintained without intermediate casing collapse'],
    warnings: ['Annular clearance between 9-5/8" casing and 12-1/4" hole is tight; centralizer spacing critical'],
    engineeringRulesApplied: ['Aramco DEM Casing Program Selection Standard (K-Series Matrix)']
  },
  {
    id: 'agent-casing-grade',
    name: 'Casing & Grade Agent',
    nameAr: 'وكيل الأغلفة وتدرج المعادن',
    role: 'Stress Analysis & Metallurgy Selection',
    phase: 'casing-hole-grade',
    description: 'Verifies burst, collapse, tension safety factors, and selects sour service metallurgy grades (NACE MR0175).',
    tools: ['triaxial_stress_analysis', 'api_burst_collapse_calc', 'metallurgy_spec_checker'],
    permissions: ['CALCULATE_CASING_STRESS', 'WRITE_CASING_DESIGN'],
    confidence: 95,
    currentRecommendation: 'Surface: 20" K-55, Intermediate: 13-3/8" L-80, Production: 9-5/8" P-110, Liner: 7" Q-125 (Sour Service). Burst SF: 1.78, Collapse SF: 1.34.',
    currentRecommendationAr: 'المقاطع: 20" K-55، و 13-3/8" L-80، و 9-5/8" P-110، وبطانة 7" Q-125 مقاومة للغاز الحامضي H2S.',
    evidence: ['API 5C3 design calculation report', 'NACE MR0175 material compatibility matrix'],
    assumptions: ['Maximum surface pressure during gas kick evacuation = 3,450 psi'],
    warnings: [],
    engineeringRulesApplied: ['API Spec 5CT: Specification for Casing and Tubing', 'DER-12: H2S Sour Gas Metallurgy Requirements']
  },
  {
    id: 'agent-execution-objectives',
    name: 'Execution Objective Agent',
    nameAr: 'وكيل أهداف التنفيذ',
    role: 'Target Geometries & Reservoir Boundaries',
    phase: 'execution-objectives',
    description: 'Defines target entry window, true vertical depth, reservoir penetration angles, and formation limits.',
    tools: ['target_box_generator', 'geonavigation_boundary_calc'],
    permissions: ['WRITE_OBJECTIVES', 'READ_GEOLOGY'],
    confidence: 97,
    currentRecommendation: 'Target Reservoir Entry: Arab-D top at 3,870 m TVD with entry inclination 82.5 deg. Target box tolerance: +/- 5 m TVD.',
    currentRecommendationAr: 'نقطة دخول المكمن: قمة العرب دي عند عمق 3,870 م عمودي بزاوية ميل 82.5 درجة ونطاق سماح +/- 5 أمتار.',
    evidence: ['Geological prognosis GP-2026-102', '3D seismic reservoir attribute map'],
    assumptions: ['Reservoir contact length >= 1,200 m horizontal displacement'],
    warnings: [],
    engineeringRulesApplied: ['DEM-RES-03: Reservoir horizontal penetration objectives']
  },
  {
    id: 'agent-directional',
    name: 'Directional Planning Agent',
    nameAr: 'وكيل التوجيه وتخطيط المسار',
    role: '3D Trajectory & Anti-Collision Analysis',
    phase: 'directional-planning',
    description: 'Computes 3D trajectory using minimum curvature method, calculates Dogleg Severity, and verifies anti-collision.',
    tools: ['minimum_curvature_solver', 'anti_collision_scanner', 'dls_optimizer'],
    permissions: ['CALCULATE_TRAJECTORY', 'WRITE_SURVEY_POINTS'],
    confidence: 94,
    currentRecommendation: '3D trajectory computed with KOP @ 950 m, build rate 2.5 deg/30m, maximum DLS 0.83 deg/30m, landing MD 6,420 m. Clearance factor > 3.5.',
    currentRecommendationAr: 'مسار ثلاثي الأبعاد يبدأ من عمق 950 م بمعدل بناء 2.5 درجة/30م وأقصى انحناء 0.83 درجة ومعامل تباعد آمن > 3.5.',
    evidence: ['Minimum Curvature Algorithm survey table', 'Spider plot anti-collision scan against 6 nearest wells'],
    assumptions: ['Rotary Steerable System (RSS) inclination sensor accuracy within 0.1 deg'],
    warnings: [],
    engineeringRulesApplied: ['ISCWSA: Error model for MWD survey accuracy', 'DEM-DIR-02: Minimum clearance factor threshold >= 2.0']
  },
  {
    id: 'agent-risk-assurance',
    name: 'Risk & Assurance Agent',
    nameAr: 'وكيل إدارة المخاطر والجودة',
    role: 'Compliance & Assurance Gatekeeping',
    phase: 'human-approval',
    description: 'Audits the entire engineering package against company standards, safety rules, and environmental criteria.',
    tools: ['compliance_rule_engine', 'risk_matrix_evaluator', 'assurance_checker'],
    permissions: ['AUDIT_ALL_PHASES', 'WRITE_ASSURANCE_REPORT'],
    confidence: 96,
    currentRecommendation: 'Overall well design compliance: PASS (92% readiness score). All 8 primary engineering assurance gates verified.',
    currentRecommendationAr: 'نتيجة تدقيق ومطابقة التصميم الهندسي: اجتياز كامل بنسبة جاهزية 92% واعتماد كافة بوابات الأمان.',
    evidence: ['Aramco DEM checklist verification', 'Well barrier schematic audit'],
    assumptions: ['All rig equipment certified under API Standard 53'],
    warnings: ['Mandatory hold point: Engineer physical approval required before Phase 12 generation'],
    engineeringRulesApplied: ['ISO 16530-1: Well integrity for operational phase', 'DEM-SAF-01: Risk & Assurance framework']
  },
  {
    id: 'agent-engineer-review',
    name: 'Engineer Review Agent',
    nameAr: 'وكيل مراجعة المهندس',
    role: 'Human Gate Interface & Decision Traceability',
    phase: 'human-approval',
    description: 'Interfaces with the human drilling engineer, collects modifications, overrides, and registers formal approval signatures.',
    tools: ['record_approval', 'invalidate_downstream_phases', 'audit_logger'],
    permissions: ['RECORD_HUMAN_DECISION', 'TRIGGER_WORKFLOW_REWORK'],
    confidence: 100,
    currentRecommendation: 'Awaiting human authorization for Well-102. Ready to execute approval or process parameter modifications.',
    currentRecommendationAr: 'في انتظار اعتماد المهندس المختص للبئر 102 لتوقيع البرنامج أو تسجيل التعديلات المطلوبة.',
    evidence: ['Phase 1 through 10 engineering deliverables compiled in gate package'],
    assumptions: ['Approval authorizer holds minimum Senior Drilling Engineer credentials'],
    warnings: [],
    engineeringRulesApplied: ['Corporate Governance: Human Authority Gate requirement']
  },
  {
    id: 'agent-drilling-program',
    name: 'Drilling Program Agent',
    nameAr: 'وكيل برنامج الحفر المتكامل',
    role: 'Final Engineering Program Compilation',
    phase: 'drilling-program',
    description: 'Compiles the full 12-section drilling program manual, casing sheets, hydraulic schedules, and operational steps.',
    tools: ['compile_drilling_program', 'export_pdf', 'export_json', 'export_sheets'],
    permissions: ['WRITE_PROGRAM_MANUAL', 'EXPORT_DOCUMENTS'],
    confidence: 95,
    currentRecommendation: 'Drilling Program package structured: 12 sections including Executive Summary, Casing, Hydraulics, BHA, and Contingencies.',
    currentRecommendationAr: 'برنامج الحفر الهندسي الكامل جاهز للإخراج بـ 12 قسماً شاملاً ملخص التصميم، الأغلفة، الهيدروليكا وخطة الطوارئ.',
    evidence: ['Approved parameters from Phases 1-11', 'API-formatted operational sequence'],
    assumptions: ['Rig spud window remains as scheduled for 2026-11-15'],
    warnings: [],
    engineeringRulesApplied: ['DEM-PRG-01: Standard format for official drilling programs']
  },
  {
    id: 'agent-sql',
    name: 'Secure SQL Agent',
    nameAr: 'وكيل الاستعلامات الآمنة',
    role: 'Read-Only Enterprise Querying',
    phase: 'data-collection',
    description: 'Translates natural language questions into safe, read-only SQL queries with AST validation and table allowlisting.',
    tools: ['nl_to_sql_parser', 'ast_safety_validator', 'readonly_query_executor'],
    permissions: ['READ_DATABASE_ALLOWLIST', 'EXECUTE_SAFE_SQL'],
    confidence: 98,
    currentRecommendation: 'SQL security gateway active: Enforcing READ-ONLY permissions, row limits (max 500), and blocking DDL/DML statements.',
    currentRecommendationAr: 'بوابة استعلام SQL الآمنة نشطة: صلاحيات قراءة فقط مع حظر كامل لكافة أوامر التعديل أو الحذف.',
    evidence: ['Parser AST inspection log', 'Table whitelist: wells, formations, casings, pressures, offsets'],
    assumptions: ['Database connections run under least-privilege role'],
    warnings: [],
    engineeringRulesApplied: ['OWASP Top 10 Database Security & AST-level SQL Injection Prevention']
  },
  {
    id: 'agent-rag',
    name: 'RAG Knowledge Agent',
    nameAr: 'وكيل المعرفة والمستندات',
    role: 'Semantic Search & Evidence Grounding',
    phase: 'data-collection',
    description: 'Indexes engineering manuals, EOWR reports, and geomechanical studies to provide traceable citations.',
    tools: ['vector_search', 'chunk_retriever', 'citation_formatter'],
    permissions: ['READ_VECTOR_DB', 'EXTRACT_CHUNKS'],
    confidence: 96,
    currentRecommendation: 'RAG index contains 4 enterprise documents (686 verified chunks). Semantic retrieval active with source citations.',
    currentRecommendationAr: 'فهرس قاعدة المعرفة يحتوي على 4 مستندات معتمدة (686 مقطعاً) مع توثيق دقيق للمصادر والمراجع.',
    evidence: ['DEM-STD-2024 citation vector', 'EOWR GHWR-088 chunk #42'],
    assumptions: ['Embedding dimensions = 384 local cosine space'],
    warnings: [],
    engineeringRulesApplied: ['Enterprise Evidence Provenance Directive']
  },
  {
    id: 'agent-visualization',
    name: 'Visualization Agent',
    nameAr: 'وكيل الرسوم البيانية التفاعلية',
    role: 'Chart & Spatial Trajectory Rendering',
    phase: 'directional-planning',
    description: 'Generates 3D well trajectories, pressure vs depth profiles, offset comparison charts, and casing schematics.',
    tools: ['render_trajectory_3d', 'render_pressure_profile', 'render_casing_schematic'],
    permissions: ['GENERATE_CHARTS', 'TRANSFORM_PLOT_DATA'],
    confidence: 99,
    currentRecommendation: 'Rendered interactive 3D trajectory, pore pressure curve, and offset well similarity radar with real backend data.',
    currentRecommendationAr: 'تم إنشاء الرسم البياني ثلاثي الأبعاد للمسار ومنحنى ضغط المسام ورادار مقارنة الآبار المجاورة.',
    evidence: ['Synthetic benchmark dataset arrays', 'Survey station coordinates'],
    assumptions: [],
    warnings: [],
    engineeringRulesApplied: ['W3C SVG & WebGL Rendering Guidelines']
  },
  {
    id: 'agent-copilot',
    name: 'AI Engineering Copilot',
    nameAr: 'المساعد الهندسي الذكي',
    role: 'Cross-Discipline Orchestration & Dialogue',
    phase: 'human-approval',
    description: 'General engineering conversational partner, guides the user through workflows, explains trade-offs, and coordinates actions.',
    tools: ['orchestrate_agents', 'format_dialogue', 'trigger_voice_synthesis'],
    permissions: ['CONVERSATIONAL_DISPATCH', 'VOICE_TRIGGER'],
    confidence: 96,
    currentRecommendation: 'Ready to assist Lead Drilling Engineer in reviewing K-2 design candidate, testing mud weight, or executing queries.',
    currentRecommendationAr: 'جاهز لمساعدة مهندس الحفر في مراجعة تصميم K-2 واختبار خيارات وزن الطين وتوليد التقارير.',
    evidence: ['Agentic Force unified state'],
    assumptions: [],
    warnings: [],
    engineeringRulesApplied: ['Human-in-the-Loop Governance Standard']
  }
];
