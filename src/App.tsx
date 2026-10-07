import React, { useState, useEffect } from 'react';
import { LanguageCode } from './types';
import { Header } from './components/Header';
import { Sidebar, NavViewId } from './components/Sidebar';
import { SpeakingAgentPanel } from './components/SpeakingAgentPanel';
import { DashboardView } from './components/views/DashboardView';
import { WorkflowView } from './components/views/WorkflowView';
import { DataCollectionView } from './components/views/DataCollectionView';
import { DataValidationView } from './components/views/DataValidationView';
import { HistoricalIntelligenceView } from './components/views/HistoricalIntelligenceView';
import { OngoingIntelligenceView } from './components/views/OngoingIntelligenceView';
import { OffsetIntelligenceView } from './components/views/OffsetIntelligenceView';
import { PressureMudWeightView } from './components/views/PressureMudWeightView';
import { WellDesignView } from './components/views/WellDesignView';
import { CasingGradeView } from './components/views/CasingGradeView';
import { ExecutionObjectivesView } from './components/views/ExecutionObjectivesView';
import { WellPathDirectionalView } from './components/views/WellPathDirectionalView';
import { ApprovalCenterView } from './components/views/ApprovalCenterView';
import { DrillingProgramView } from './components/views/DrillingProgramView';
import { SqlWorkspaceView } from './components/views/SqlWorkspaceView';
import { KnowledgeBaseView } from './components/views/KnowledgeBaseView';
import { AgentMonitorView } from './components/views/AgentMonitorView';
import { AdminVoiceView } from './components/views/AdminVoiceView';
import { AdministrationView } from './components/views/AdministrationView';
import { SYNTHETIC_ACTIVE_WELL } from './services/data/initialSyntheticData';
import { LocalLlmGateway } from './services/llm/localLlmGateway';

export default function App() {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>('ar-najdi');
  const [activeView, setActiveView] = useState<NavViewId>('dashboard');
  const [airGapped, setAirGapped] = useState<boolean>(false);

  const isRtl = currentLanguage === 'ar' || currentLanguage === 'ar-najdi';

  useEffect(() => {
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage === 'en' ? 'en' : 'ar';
  }, [isRtl, currentLanguage]);

  const handleToggleAirGapped = (enabled: boolean) => {
    setAirGapped(enabled);
    LocalLlmGateway.setAirGapped(enabled);
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView currentLanguage={currentLanguage} onNavigate={setActiveView} />;
      case 'workflow':
        return <WorkflowView currentLanguage={currentLanguage} onNavigate={setActiveView} />;
      case 'data-collection':
        return <DataCollectionView currentLanguage={currentLanguage} />;
      case 'data-validation':
        return <DataValidationView currentLanguage={currentLanguage} />;
      case 'historical-intelligence':
        return <HistoricalIntelligenceView currentLanguage={currentLanguage} />;
      case 'ongoing-intelligence':
        return <OngoingIntelligenceView currentLanguage={currentLanguage} />;
      case 'offset-analysis':
        return <OffsetIntelligenceView currentLanguage={currentLanguage} />;
      case 'pressure-mudweight':
        return <PressureMudWeightView currentLanguage={currentLanguage} />;
      case 'well-design-selection':
        return <WellDesignView currentLanguage={currentLanguage} />;
      case 'casing-hole-grade':
        return <CasingGradeView currentLanguage={currentLanguage} />;
      case 'execution-objectives':
        return <ExecutionObjectivesView currentLanguage={currentLanguage} />;
      case 'directional-planning':
        return <WellPathDirectionalView currentLanguage={currentLanguage} />;
      case 'human-approval':
        return <ApprovalCenterView currentLanguage={currentLanguage} onNavigate={setActiveView} />;
      case 'drilling-program':
        return <DrillingProgramView currentLanguage={currentLanguage} />;
      case 'sql-workspace':
        return <SqlWorkspaceView currentLanguage={currentLanguage} />;
      case 'knowledge-base':
        return <KnowledgeBaseView currentLanguage={currentLanguage} />;
      case 'agent-monitor':
        return <AgentMonitorView currentLanguage={currentLanguage} />;
      case 'voice-admin':
        return <AdminVoiceView currentLanguage={currentLanguage} onLanguageChange={setCurrentLanguage} />;
      case 'administration':
        return (
          <AdministrationView
            currentLanguage={currentLanguage}
            airGapped={airGapped}
            onToggleAirGapped={handleToggleAirGapped}
          />
        );
      default:
        return <DashboardView currentLanguage={currentLanguage} onNavigate={setActiveView} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#060b13] text-[#cbd5e1] flex flex-col font-normal ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Top Header */}
      <Header
        currentLanguage={currentLanguage}
        onLanguageChange={setCurrentLanguage}
        airGapped={airGapped}
        onToggleAirGapped={handleToggleAirGapped}
        activeWellName={SYNTHETIC_ACTIVE_WELL.name}
      />

      {/* Main Control Room Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          activeView={activeView}
          onSelectView={setActiveView}
          currentLanguage={currentLanguage}
        />

        {/* Center Engineering Workspace */}
        <main className="flex-1 overflow-y-auto p-4 bg-[#050a12]/90">
          <div className="max-w-7xl mx-auto">
            {renderActiveView()}
          </div>
        </main>

        {/* Right AI Speaking Agent & Voice Cloning Console */}
        <SpeakingAgentPanel
          currentLanguage={currentLanguage}
          onLanguageChange={setCurrentLanguage}
          activePhase={activeView}
          onNavigateToPhase={(phaseId) => setActiveView(phaseId as NavViewId)}
        />
      </div>
    </div>
  );
}
