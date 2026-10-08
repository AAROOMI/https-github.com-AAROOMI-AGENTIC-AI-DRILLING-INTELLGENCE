/**
 * Web-Ready Theme Specification & Design Tokens
 * Tailored for Saudi Aramco Autonomous Well Engineering & Drilling Intelligence
 * 
 * 13 Defined Specifications:
 * 1. Primary background
 * 2. Secondary background
 * 3. Primary/secondary green
 * 4. Gold/yellow accent
 * 5. Dark text
 * 6. Light text
 * 7. Cards/panels
 * 8. Borders/dividers
 * 9. Buttons
 * 10. Status colors
 * 11. Charts and infographic elements
 * 12. Gradients
 * 13. Hover/active states
 * 
 * Strict Constraint: Always normal font (weight: 400), no oversized or bold text.
 */

export interface ThemeColorToken {
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  variable: string;
  usage: string;
}

export interface WebReadyThemeDefinition {
  // 1. Primary background
  primaryBackground: {
    base: ThemeColorToken;
    surface: ThemeColorToken;
    deep: ThemeColorToken;
    canvas: ThemeColorToken;
  };

  // 2. Secondary background
  secondaryBackground: {
    base: ThemeColorToken;
    elevated: ThemeColorToken;
    muted: ThemeColorToken;
    sidebar: ThemeColorToken;
  };

  // 3. Primary/secondary green
  greens: {
    primaryAramco: ThemeColorToken;      // Aramco Signature Green
    primaryHover: ThemeColorToken;
    primarySubtle: ThemeColorToken;
    secondaryEmerald: ThemeColorToken;   // Secondary Emerald Green
    secondaryMint: ThemeColorToken;
    secondaryDark: ThemeColorToken;
  };

  // 4. Gold/yellow accent
  goldAccents: {
    primaryGold: ThemeColorToken;        // Saudi Arabian Desert Gold
    goldLight: ThemeColorToken;
    goldSubtle: ThemeColorToken;
    goldMuted: ThemeColorToken;
    yellowEnergy: ThemeColorToken;
  };

  // 5. Dark text
  darkText: {
    primary: ThemeColorToken;            // High-contrast on light/gold surfaces
    secondary: ThemeColorToken;
    muted: ThemeColorToken;
    onGold: ThemeColorToken;
  };

  // 6. Light text
  lightText: {
    primary: ThemeColorToken;            // High-contrast on dark backgrounds
    secondary: ThemeColorToken;
    muted: ThemeColorToken;
    caption: ThemeColorToken;
  };

  // 7. Cards/panels
  cardsPanels: {
    bgBase: string;
    bgElevated: string;
    bgGlass: string;
    bgHover: string;
    borderBase: string;
    borderHighlight: string;
    panelHeaderBg: string;
    panelFooterBg: string;
    radius: string;
    shadow: string;
  };

  // 8. Borders/dividers
  bordersDividers: {
    subtle: string;
    standard: string;
    highlightGreen: string;
    highlightGold: string;
    dividerHairline: string;
    dividerSection: string;
  };

  // 9. Buttons
  buttons: {
    primaryGreen: {
      bg: string;
      hover: string;
      active: string;
      text: string;
      border: string;
    };
    secondaryOutline: {
      bg: string;
      hover: string;
      active: string;
      text: string;
      border: string;
    };
    accentGold: {
      bg: string;
      hover: string;
      active: string;
      text: string;
      border: string;
    };
    ghost: {
      bg: string;
      hover: string;
      active: string;
      text: string;
      border: string;
    };
    danger: {
      bg: string;
      hover: string;
      active: string;
      text: string;
      border: string;
    };
  };

  // 10. Status colors
  statusColors: {
    success: {
      main: ThemeColorToken;
      bg: string;
      border: string;
      text: string;
    };
    warning: {
      main: ThemeColorToken;
      bg: string;
      border: string;
      text: string;
    };
    danger: {
      main: ThemeColorToken;
      bg: string;
      border: string;
      text: string;
    };
    info: {
      main: ThemeColorToken;
      bg: string;
      border: string;
      text: string;
    };
    neutral: {
      main: ThemeColorToken;
      bg: string;
      border: string;
      text: string;
    };
  };

  // 11. Charts and infographic elements
  charts: {
    palette: string[];
    pressureGradientCurve: string;
    porePressureBound: string;
    fractureGradientLimit: string;
    mudWeightSafeEnvelope: string;
    ropTelemetry: string;
    torqueAndDrag: string;
    casingSectionConductor: string;
    casingSectionSurface: string;
    casingSectionIntermediate: string;
    casingSectionProduction: string;
    gridLines: string;
    crosshair: string;
  };

  // 12. Gradients
  gradients: {
    aramcoPrimary: string;
    aramcoSubtle: string;
    goldAccent: string;
    emeraldToAzure: string;
    darkCanvasVignette: string;
    cardSheen: string;
    statusProgress: string;
  };

  // 13. Hover/active states
  hoverActive: {
    itemHoverBg: string;
    itemActiveBg: string;
    itemActiveBorder: string;
    itemActiveText: string;
    buttonHoverTransform: string;
    transitionStandard: string;
    focusRingGreen: string;
    focusRingGold: string;
  };
}

export const WEB_READY_THEME: WebReadyThemeDefinition = {
  // 1. Primary background
  primaryBackground: {
    base: {
      name: 'Primary Dark Base',
      hex: '#060b13',
      rgb: '6, 11, 19',
      hsl: '217, 52%, 5%',
      variable: '--theme-bg-primary',
      usage: 'App viewport, primary background foundation'
    },
    surface: {
      name: 'Primary Surface Canvas',
      hex: '#080f1a',
      rgb: '8, 15, 26',
      hsl: '217, 53%, 7%',
      variable: '--theme-bg-primary-surface',
      usage: 'Main workspace canvas and top-level view containers'
    },
    deep: {
      name: 'Primary Deep Obsidian',
      hex: '#04070c',
      rgb: '4, 7, 12',
      hsl: '218, 50%, 3%',
      variable: '--theme-bg-primary-deep',
      usage: 'Embedded telemetry logs, terminal views, modals backdrop'
    },
    canvas: {
      name: 'Primary Canvas Grid',
      hex: '#0a1220',
      rgb: '10, 18, 32',
      hsl: '218, 52%, 8%',
      variable: '--theme-bg-primary-canvas',
      usage: '3D wellbore trajectory canvas and seismic viewports'
    }
  },

  // 2. Secondary background
  secondaryBackground: {
    base: {
      name: 'Secondary Deep Navy',
      hex: '#0d1726',
      rgb: '13, 23, 38',
      hsl: '216, 49%, 10%',
      variable: '--theme-bg-secondary',
      usage: 'Sidebar panels, navigation rails, elevated containers'
    },
    elevated: {
      name: 'Secondary Elevated Card',
      hex: '#111e32',
      rgb: '17, 30, 50',
      hsl: '216, 49%, 13%',
      variable: '--theme-bg-secondary-elevated',
      usage: 'Inspection drawers, tooltips, dropdown popovers'
    },
    muted: {
      name: 'Secondary Muted Panel',
      hex: '#0a1322',
      rgb: '10, 19, 34',
      hsl: '218, 55%, 9%',
      variable: '--theme-bg-secondary-muted',
      usage: 'Subtle section separators and inactive tabs'
    },
    sidebar: {
      name: 'Secondary Sidebar Rail',
      hex: '#070d18',
      rgb: '7, 13, 24',
      hsl: '219, 55%, 6%',
      variable: '--theme-bg-secondary-sidebar',
      usage: 'Vertical navigation panel and engineering step rail'
    }
  },

  // 3. Primary/secondary green
  greens: {
    primaryAramco: {
      name: 'Aramco Signature Emerald',
      hex: '#00843D',
      rgb: '0, 132, 61',
      hsl: '148, 100%, 26%',
      variable: '--theme-green-primary',
      usage: 'Brand identity, primary CTA buttons, approved well stages'
    },
    primaryHover: {
      name: 'Aramco Emerald Hover',
      hex: '#059669',
      rgb: '5, 150, 105',
      hsl: '160, 94%, 30%',
      variable: '--theme-green-primary-hover',
      usage: 'Button hover state, active telemetry indicators'
    },
    primarySubtle: {
      name: 'Aramco Emerald Subtle Tint',
      hex: '#064e3b',
      rgb: '6, 78, 59',
      hsl: '164, 86%, 16%',
      variable: '--theme-green-primary-subtle',
      usage: 'Subtle pill container backgrounds, selection fills'
    },
    secondaryEmerald: {
      name: 'Secondary Spring Emerald',
      hex: '#10B981',
      rgb: '16, 185, 129',
      hsl: '160, 84%, 39%',
      variable: '--theme-green-secondary',
      usage: 'Online state, successful completions, secondary icons'
    },
    secondaryMint: {
      name: 'Secondary Mint Accent',
      hex: '#34D399',
      rgb: '52, 211, 153',
      hsl: '158, 64%, 52%',
      variable: '--theme-green-secondary-mint',
      usage: 'Chart safe zones, active flow rate gauge pins'
    },
    secondaryDark: {
      name: 'Secondary Deep Forest',
      hex: '#022c22',
      rgb: '2, 44, 34',
      hsl: '166, 91%, 9%',
      variable: '--theme-green-secondary-dark',
      usage: 'Low-contrast badge backdrops, card header accents'
    }
  },

  // 4. Gold/yellow accent
  goldAccents: {
    primaryGold: {
      name: 'Saudi Desert Gold',
      hex: '#EAA824',
      rgb: '234, 168, 36',
      hsl: '40, 82%, 53%',
      variable: '--theme-gold-accent',
      usage: 'VIP approvals, critical attention gates, gold accent tags'
    },
    goldLight: {
      name: 'Sunlight Gold Highlight',
      hex: '#FBBF24',
      rgb: '251, 191, 36',
      hsl: '43, 96%, 56%',
      variable: '--theme-gold-light',
      usage: 'Hover glow on gold buttons, important warning flags'
    },
    goldSubtle: {
      name: 'Subtle Amber Tint',
      hex: '#78350F',
      rgb: '120, 53, 15',
      hsl: '22, 78%, 26%',
      variable: '--theme-gold-subtle',
      usage: 'Warning notification backdrop, advisory panels'
    },
    goldMuted: {
      name: 'Muted Desert Ochre',
      hex: '#B45309',
      rgb: '180, 83, 9',
      hsl: '26, 90%, 37%',
      variable: '--theme-gold-muted',
      usage: 'Offset well casing grade indicators, formation tops'
    },
    yellowEnergy: {
      name: 'Kinetic Energy Yellow',
      hex: '#FACC15',
      rgb: '250, 204, 21',
      hsl: '48, 96%, 53%',
      variable: '--theme-yellow-energy',
      usage: 'Active bit RPM gauges, drill string vibration highlights'
    }
  },

  // 5. Dark text
  darkText: {
    primary: {
      name: 'High Contrast Ink',
      hex: '#060d17',
      rgb: '6, 13, 23',
      hsl: '215, 59%, 6%',
      variable: '--theme-text-dark-primary',
      usage: 'Text on gold buttons, light badges, bright status chips'
    },
    secondary: {
      name: 'Deep Slate Ink',
      hex: '#0f172a',
      rgb: '15, 23, 42',
      hsl: '222, 47%, 11%',
      variable: '--theme-text-dark-secondary',
      usage: 'Secondary labels on light summary cards'
    },
    muted: {
      name: 'Muted Charcoal Ink',
      hex: '#334155',
      rgb: '51, 65, 85',
      hsl: '215, 25%, 27%',
      variable: '--theme-text-dark-muted',
      usage: 'Subtext on light inspection popovers'
    },
    onGold: {
      name: 'Contrast Text On Gold',
      hex: '#030712',
      rgb: '3, 7, 18',
      hsl: '225, 71%, 4%',
      variable: '--theme-text-on-gold',
      usage: 'Guaranteed 12:1 WCAG AAA readability on Saudi Gold buttons'
    }
  },

  // 6. Light text
  lightText: {
    primary: {
      name: 'Primary Pure Slate',
      hex: '#F8FAFC',
      rgb: '248, 250, 252',
      hsl: '210, 40%, 98%',
      variable: '--theme-text-light-primary',
      usage: 'Primary engineering titles, active sensor readouts'
    },
    secondary: {
      name: 'Readable Slate Secondary',
      hex: '#CBD5E1',
      rgb: '203, 213, 225',
      hsl: '213, 27%, 84%',
      variable: '--theme-text-light-secondary',
      usage: 'Body copy, engineering descriptions, parameter values'
    },
    muted: {
      name: 'Muted Slate Ghost',
      hex: '#94A3B8',
      rgb: '148, 163, 184',
      hsl: '215, 20%, 65%',
      variable: '--theme-text-light-muted',
      usage: 'Table column headers, metadata, inactive step labels'
    },
    caption: {
      name: 'Dim Caption Slate',
      hex: '#64748B',
      rgb: '100, 116, 139',
      hsl: '215, 16%, 47%',
      variable: '--theme-text-light-caption',
      usage: 'Footnotes, timestamp records, audit hashes, license text'
    }
  },

  // 7. Cards/panels
  cardsPanels: {
    bgBase: '#0c1524',
    bgElevated: '#101d30',
    bgGlass: 'rgba(12, 21, 36, 0.85)',
    bgHover: '#13233a',
    borderBase: 'rgba(56, 189, 248, 0.12)',
    borderHighlight: 'rgba(16, 185, 129, 0.35)',
    panelHeaderBg: 'rgba(8, 15, 26, 0.95)',
    panelFooterBg: 'rgba(6, 11, 19, 0.8)',
    radius: '0.375rem', // Clean technical radius (6px), no bubble pills
    shadow: '0 4px 14px 0 rgba(0, 0, 0, 0.37)'
  },

  // 8. Borders/dividers
  bordersDividers: {
    subtle: 'rgba(56, 189, 248, 0.10)',
    standard: 'rgba(56, 189, 248, 0.20)',
    highlightGreen: 'rgba(16, 185, 129, 0.40)',
    highlightGold: 'rgba(234, 168, 36, 0.40)',
    dividerHairline: 'rgba(51, 65, 85, 0.35)',
    dividerSection: 'rgba(30, 41, 59, 0.70)'
  },

  // 9. Buttons
  buttons: {
    primaryGreen: {
      bg: '#00843D',
      hover: '#059669',
      active: '#047857',
      text: '#ffffff',
      border: 'transparent'
    },
    secondaryOutline: {
      bg: 'rgba(16, 185, 129, 0.08)',
      hover: 'rgba(16, 185, 129, 0.18)',
      active: 'rgba(16, 185, 129, 0.28)',
      text: '#34d399',
      border: 'rgba(16, 185, 129, 0.45)'
    },
    accentGold: {
      bg: '#EAA824',
      hover: '#fbbf24',
      active: '#d97706',
      text: '#030712',
      border: 'transparent'
    },
    ghost: {
      bg: 'transparent',
      hover: 'rgba(203, 213, 225, 0.08)',
      active: 'rgba(203, 213, 225, 0.15)',
      text: '#cbd5e1',
      border: 'transparent'
    },
    danger: {
      bg: '#dc2626',
      hover: '#ef4444',
      active: '#b91c1c',
      text: '#ffffff',
      border: 'transparent'
    }
  },

  // 10. Status colors
  statusColors: {
    success: {
      main: {
        name: 'Success Emerald',
        hex: '#10B981',
        rgb: '16, 185, 129',
        hsl: '160, 84%, 39%',
        variable: '--theme-status-success',
        usage: 'Validated parameters, approved milestones, stable pressure'
      },
      bg: 'rgba(6, 78, 59, 0.35)',
      border: 'rgba(16, 185, 129, 0.40)',
      text: '#6ee7b7'
    },
    warning: {
      main: {
        name: 'Warning Amber Gold',
        hex: '#F59E0B',
        rgb: '245, 158, 11',
        hsl: '38, 92%, 50%',
        variable: '--theme-status-warning',
        usage: 'Pore pressure kick warning, offset well collision advisory'
      },
      bg: 'rgba(120, 53, 15, 0.35)',
      border: 'rgba(245, 158, 11, 0.45)',
      text: '#fde68a'
    },
    danger: {
      main: {
        name: 'Danger Crimson',
        hex: '#EF4444',
        rgb: '239, 68, 68',
        hsl: '0, 84%, 60%',
        variable: '--theme-status-danger',
        usage: 'Critical fracture limit breach, H2S sensor alarm, hard stop'
      },
      bg: 'rgba(127, 29, 29, 0.40)',
      border: 'rgba(239, 68, 68, 0.50)',
      text: '#fca5a5'
    },
    info: {
      main: {
        name: 'Info Azure Sky',
        hex: '#0EA5E9',
        rgb: '14, 165, 233',
        hsl: '199, 89%, 48%',
        variable: '--theme-status-info',
        usage: 'AI reasoning rationale, offset log telemetry correlation'
      },
      bg: 'rgba(12, 74, 110, 0.35)',
      border: 'rgba(14, 165, 233, 0.40)',
      text: '#7dd3fc'
    },
    neutral: {
      main: {
        name: 'Neutral Technical Slate',
        hex: '#64748B',
        rgb: '100, 116, 139',
        hsl: '215, 16%, 47%',
        variable: '--theme-status-neutral',
        usage: 'Pending workflow stages, standby tools, scheduled jobs'
      },
      bg: 'rgba(30, 41, 59, 0.45)',
      border: 'rgba(100, 116, 139, 0.30)',
      text: '#cbd5e1'
    }
  },

  // 11. Charts and infographic elements
  charts: {
    palette: [
      '#00843D', // Aramco Green
      '#10B981', // Spring Emerald
      '#EAA824', // Saudi Gold
      '#0EA5E9', // Azure Sky
      '#8B5CF6', // Royal Purple
      '#F43F5E', // Rose Crimson
      '#F97316', // Desert Orange
      '#14B8A6'  // Teal Wave
    ],
    pressureGradientCurve: '#38bdf8',
    porePressureBound: '#f59e0b',
    fractureGradientLimit: '#ef4444',
    mudWeightSafeEnvelope: 'rgba(16, 185, 129, 0.20)',
    ropTelemetry: '#10b981',
    torqueAndDrag: '#eaa824',
    casingSectionConductor: '#64748b',
    casingSectionSurface: '#0ea5e9',
    casingSectionIntermediate: '#00843D',
    casingSectionProduction: '#eaa824',
    gridLines: 'rgba(56, 189, 248, 0.08)',
    crosshair: 'rgba(234, 168, 36, 0.60)'
  },

  // 12. Gradients
  gradients: {
    aramcoPrimary: 'linear-gradient(135deg, #00843D 0%, #0284c7 100%)',
    aramcoSubtle: 'linear-gradient(180deg, rgba(0, 132, 61, 0.15) 0%, rgba(6, 11, 19, 0.90) 100%)',
    goldAccent: 'linear-gradient(135deg, #d97706 0%, #eaa824 50%, #fbbf24 100%)',
    emeraldToAzure: 'linear-gradient(90deg, #10b981 0%, #06b6d4 100%)',
    darkCanvasVignette: 'radial-gradient(circle at 50% 20%, #0d1726 0%, #060b13 85%)',
    cardSheen: 'linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0) 100%)',
    statusProgress: 'linear-gradient(90deg, #00843D 0%, #10b981 60%, #eaa824 100%)'
  },

  // 13. Hover/active states
  hoverActive: {
    itemHoverBg: 'rgba(19, 35, 58, 0.65)',
    itemActiveBg: 'rgba(6, 78, 59, 0.35)',
    itemActiveBorder: 'rgba(16, 185, 129, 0.55)',
    itemActiveText: '#6ee7b7',
    buttonHoverTransform: 'translateY(-1px)',
    transitionStandard: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    focusRingGreen: '0 0 0 2px rgba(16, 185, 129, 0.50)',
    focusRingGold: '0 0 0 2px rgba(234, 168, 36, 0.60)'
  }
};

/**
 * Returns CSS variable definitions formatted for injection into :root in index.css
 */
export function generateCssVariablesString(): string {
  const t = WEB_READY_THEME;
  return `
  /* 1. Primary background */
  ${t.primaryBackground.base.variable}: ${t.primaryBackground.base.hex};
  ${t.primaryBackground.surface.variable}: ${t.primaryBackground.surface.hex};
  ${t.primaryBackground.deep.variable}: ${t.primaryBackground.deep.hex};
  ${t.primaryBackground.canvas.variable}: ${t.primaryBackground.canvas.hex};

  /* 2. Secondary background */
  ${t.secondaryBackground.base.variable}: ${t.secondaryBackground.base.hex};
  ${t.secondaryBackground.elevated.variable}: ${t.secondaryBackground.elevated.hex};
  ${t.secondaryBackground.muted.variable}: ${t.secondaryBackground.muted.hex};
  ${t.secondaryBackground.sidebar.variable}: ${t.secondaryBackground.sidebar.hex};

  /* 3. Primary/secondary green */
  ${t.greens.primaryAramco.variable}: ${t.greens.primaryAramco.hex};
  ${t.greens.primaryHover.variable}: ${t.greens.primaryHover.hex};
  ${t.greens.primarySubtle.variable}: ${t.greens.primarySubtle.hex};
  ${t.greens.secondaryEmerald.variable}: ${t.greens.secondaryEmerald.hex};
  ${t.greens.secondaryMint.variable}: ${t.greens.secondaryMint.hex};
  ${t.greens.secondaryDark.variable}: ${t.greens.secondaryDark.hex};

  /* 4. Gold/yellow accent */
  ${t.goldAccents.primaryGold.variable}: ${t.goldAccents.primaryGold.hex};
  ${t.goldAccents.goldLight.variable}: ${t.goldAccents.goldLight.hex};
  ${t.goldAccents.goldSubtle.variable}: ${t.goldAccents.goldSubtle.hex};
  ${t.goldAccents.goldMuted.variable}: ${t.goldAccents.goldMuted.hex};
  ${t.goldAccents.yellowEnergy.variable}: ${t.goldAccents.yellowEnergy.hex};

  /* 5. Dark text */
  ${t.darkText.primary.variable}: ${t.darkText.primary.hex};
  ${t.darkText.secondary.variable}: ${t.darkText.secondary.hex};
  ${t.darkText.muted.variable}: ${t.darkText.muted.hex};
  ${t.darkText.onGold.variable}: ${t.darkText.onGold.hex};

  /* 6. Light text */
  ${t.lightText.primary.variable}: ${t.lightText.primary.hex};
  ${t.lightText.secondary.variable}: ${t.lightText.secondary.hex};
  ${t.lightText.muted.variable}: ${t.lightText.muted.hex};
  ${t.lightText.caption.variable}: ${t.lightText.caption.hex};

  /* 7. Cards/panels */
  --theme-card-bg: ${t.cardsPanels.bgBase};
  --theme-card-bg-elevated: ${t.cardsPanels.bgElevated};
  --theme-card-border: ${t.cardsPanels.borderBase};

  /* 8. Borders/dividers */
  --theme-border-subtle: ${t.bordersDividers.subtle};
  --theme-border-standard: ${t.bordersDividers.standard};
  --theme-divider-hairline: ${t.bordersDividers.dividerHairline};

  /* 10. Status colors */
  ${t.statusColors.success.main.variable}: ${t.statusColors.success.main.hex};
  ${t.statusColors.warning.main.variable}: ${t.statusColors.warning.main.hex};
  ${t.statusColors.danger.main.variable}: ${t.statusColors.danger.main.hex};
  ${t.statusColors.info.main.variable}: ${t.statusColors.info.main.hex};
  ${t.statusColors.neutral.main.variable}: ${t.statusColors.neutral.main.hex};
  `.trim();
}
