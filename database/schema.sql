-- ============================================================================
-- Enterprise Agentic AI Drilling Intelligence & Well Design Platform
-- PostgreSQL Relational Database Schema & Data Models
-- Compliance with Aramco Drilling Engineering Standards & Auditing Rules
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. Users, Roles & Permissions (RBAC)
CREATE TABLE IF NOT EXISTS roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role_name VARCHAR(64) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    permission_key VARCHAR(128) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    badge_id VARCHAR(32) UNIQUE NOT NULL,
    full_name VARCHAR(128) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    job_title VARCHAR(128),
    department VARCHAR(128) DEFAULT 'Drilling & Workover Engineering Department',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_roles (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    assigned_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (user_id, role_id)
);

-- 2. Wells & Geometry
CREATE TABLE IF NOT EXISTS wells (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    well_name VARCHAR(128) UNIQUE NOT NULL,
    field_name VARCHAR(128) NOT NULL,
    operator VARCHAR(128) NOT NULL,
    rig_identifier VARCHAR(64),
    spud_date DATE,
    target_depth_m NUMERIC(10,2) NOT NULL,
    measured_depth_m NUMERIC(10,2) NOT NULL,
    surface_lat NUMERIC(9,6) NOT NULL,
    surface_lng NUMERIC(9,6) NOT NULL,
    surface_elevation_m NUMERIC(8,2) NOT NULL,
    status VARCHAR(32) DEFAULT 'Planning',
    current_phase_id VARCHAR(64) DEFAULT 'data-collection',
    readiness_score NUMERIC(5,2) DEFAULT 0.0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_wells_field ON wells(field_name);

CREATE TABLE IF NOT EXISTS well_sections (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    well_id UUID REFERENCES wells(id) ON DELETE CASCADE,
    section_name VARCHAR(64) NOT NULL,
    hole_size_inches NUMERIC(6,3) NOT NULL,
    top_depth_m NUMERIC(10,2) NOT NULL,
    bottom_depth_m NUMERIC(10,2) NOT NULL,
    planned_mud_weight_sg NUMERIC(5,3),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Formations & Stratigraphy
CREATE TABLE IF NOT EXISTS formations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    formation_name VARCHAR(128) UNIQUE NOT NULL,
    general_lithology VARCHAR(64) NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS formation_tops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    well_id UUID REFERENCES wells(id) ON DELETE CASCADE,
    formation_name VARCHAR(128) NOT NULL,
    top_depth_m NUMERIC(10,2) NOT NULL,
    thickness_m NUMERIC(10,2),
    lithology VARCHAR(64),
    pore_pressure_grad_sg NUMERIC(5,3),
    frac_gradient_sg NUMERIC(5,3),
    drilling_hazards TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_formation_tops_well ON formation_tops(well_id, top_depth_m);

-- 4. Casing Designs & Metallurgy
CREATE TABLE IF NOT EXISTS casing_designs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    well_id UUID REFERENCES wells(id) ON DELETE CASCADE,
    section_name VARCHAR(64) NOT NULL,
    hole_size_inches NUMERIC(6,3) NOT NULL,
    casing_size_inches NUMERIC(6,3) NOT NULL,
    top_depth_m NUMERIC(10,2) NOT NULL,
    shoe_depth_m NUMERIC(10,2) NOT NULL,
    casing_grade VARCHAR(32) NOT NULL,
    weight_lb_ft NUMERIC(7,2) NOT NULL,
    burst_rating_psi NUMERIC(8,2) NOT NULL,
    collapse_rating_psi NUMERIC(8,2) NOT NULL,
    tension_safety_factor NUMERIC(5,2) NOT NULL,
    cement_top_m NUMERIC(10,2),
    is_sour_service_rated BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Pressure & Mud Weight
CREATE TABLE IF NOT EXISTS mud_weight_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    well_id UUID REFERENCES wells(id) ON DELETE CASCADE,
    depth_m NUMERIC(10,2) NOT NULL,
    pore_pressure_psi NUMERIC(8,2) NOT NULL,
    fracture_pressure_psi NUMERIC(8,2) NOT NULL,
    recommended_mud_weight_sg NUMERIC(5,3) NOT NULL,
    equivalent_ppg NUMERIC(5,2) NOT NULL,
    uncertainty_sg NUMERIC(5,3) DEFAULT 0.05,
    stability_condition VARCHAR(32) DEFAULT 'Safe',
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_mud_weight_depth ON mud_weight_records(well_id, depth_m);

-- 6. Offset Wells & Troubles
CREATE TABLE IF NOT EXISTS offset_wells (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_well_id UUID REFERENCES wells(id) ON DELETE CASCADE,
    offset_well_name VARCHAR(128) NOT NULL,
    distance_km NUMERIC(6,2) NOT NULL,
    composite_similarity_pct NUMERIC(5,2) NOT NULL,
    spatial_similarity_pct NUMERIC(5,2),
    formation_similarity_pct NUMERIC(5,2),
    trajectory_similarity_pct NUMERIC(5,2),
    final_mud_weight_sg NUMERIC(5,3),
    best_design_profile VARCHAR(64),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS offset_troubles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    offset_well_id UUID REFERENCES offset_wells(id) ON DELETE CASCADE,
    trouble_type VARCHAR(64) NOT NULL,
    depth_m NUMERIC(10,2) NOT NULL,
    description TEXT,
    remedial_action TEXT,
    npt_hours NUMERIC(6,2) DEFAULT 0.0
);

-- 7. Reports & Daily Telemetry
CREATE TABLE IF NOT EXISTS morning_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    well_id UUID REFERENCES wells(id) ON DELETE CASCADE,
    report_number INT NOT NULL,
    report_date DATE NOT NULL,
    current_depth_m NUMERIC(10,2) NOT NULL,
    midnight_rop_m_hr NUMERIC(6,2),
    current_mud_weight_sg NUMERIC(5,3),
    current_operation TEXT,
    gas_levels_units NUMERIC(6,2),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS end_of_well_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    well_id UUID REFERENCES wells(id) ON DELETE CASCADE,
    total_days INT NOT NULL,
    total_cost_usd NUMERIC(14,2),
    lessons_learned TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Execution Objectives & Trajectory
CREATE TABLE IF NOT EXISTS execution_objectives (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    well_id UUID REFERENCES wells(id) ON DELETE CASCADE,
    target_depth_tvd_m NUMERIC(10,2) NOT NULL,
    target_reservoir_zone VARCHAR(128) NOT NULL,
    target_entry_inc_deg NUMERIC(5,2) NOT NULL,
    horizontal_displacement_m NUMERIC(10,2) NOT NULL,
    azimuth_deg NUMERIC(5,2) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS directional_plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    well_id UUID REFERENCES wells(id) ON DELETE CASCADE,
    plan_version VARCHAR(32) DEFAULT 'Rev-1.0',
    kop_depth_m NUMERIC(10,2) NOT NULL,
    build_rate_deg_30m NUMERIC(5,2) NOT NULL,
    max_dls_deg_30m NUMERIC(5,2) NOT NULL,
    status VARCHAR(32) DEFAULT 'Planned',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS well_paths (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    directional_plan_id UUID REFERENCES directional_plans(id) ON DELETE CASCADE,
    station_md_m NUMERIC(10,2) NOT NULL,
    inclination_deg NUMERIC(5,2) NOT NULL,
    azimuth_deg NUMERIC(5,2) NOT NULL,
    tvd_m NUMERIC(10,2) NOT NULL,
    north_m NUMERIC(10,2) NOT NULL,
    east_m NUMERIC(10,2) NOT NULL,
    dls_deg_30m NUMERIC(5,2) DEFAULT 0.0
);
CREATE INDEX idx_well_paths_station ON well_paths(directional_plan_id, station_md_m);

-- 9. Workflow Runs & Human Approvals
CREATE TABLE IF NOT EXISTS workflow_runs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    well_id UUID REFERENCES wells(id) ON DELETE CASCADE,
    phase_id VARCHAR(64) NOT NULL,
    status VARCHAR(32) NOT NULL,
    progress_pct INT DEFAULT 0,
    summary TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS approvals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    well_id UUID REFERENCES wells(id) ON DELETE CASCADE,
    phase_id VARCHAR(64) NOT NULL,
    decision VARCHAR(32) NOT NULL,
    engineer_user_id UUID REFERENCES users(id),
    comments TEXT,
    overrides_applied TEXT,
    signature_hash VARCHAR(128) NOT NULL,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_approvals_well ON approvals(well_id, phase_id);

-- 10. Voice Configuration & Models
CREATE TABLE IF NOT EXISTS voice_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    speaker_identity VARCHAR(128) NOT NULL,
    reference_audio_url TEXT,
    pitch_base_hz NUMERIC(6,2) DEFAULT 116.0,
    speaking_rate NUMERIC(4,2) DEFAULT 1.0,
    timbre_profile VARCHAR(64) DEFAULT 'Saudi Male (Najdi Dialect)',
    provider_name VARCHAR(64) DEFAULT 'Local-Neural-Cloner',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 11. Security Audit Logs
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_identifier VARCHAR(128) NOT NULL,
    action_type VARCHAR(64) NOT NULL,
    entity_affected VARCHAR(128),
    details JSONB,
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_audit_logs_timestamp ON audit_logs(created_at DESC);
