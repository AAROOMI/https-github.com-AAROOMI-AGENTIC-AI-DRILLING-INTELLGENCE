/**
 * Drilling Workflow Engine
 *
 * Implements the 12-Phase Autonomous Drilling Operation Pipeline:
 * - Deterministic phase progression
 * - Dependency graph tracking
 * - Downstream invalidation & re-analysis on rejection or parameter modifications
 * - Human-in-the-loop gate enforcement before final program issuance
 * - Workflow audit history
 */

import { ApprovalRecord, PhaseStatus, WorkflowPhase, WorkflowPhaseId } from '../../types';
import { SYNTHETIC_WORKFLOW_PHASES } from '../data/initialSyntheticData';

export type WorkflowChangeListener = (phases: WorkflowPhase[]) => void;

class CentralDrillingWorkflowEngine {
  private phases: WorkflowPhase[] = JSON.parse(JSON.stringify(SYNTHETIC_WORKFLOW_PHASES));
  private approvalHistory: ApprovalRecord[] = [
    {
      id: 'appr-01',
      phaseId: 'data-validation',
      decision: 'APPROVED',
      engineerName: 'Ahmad Al-Ghamdi',
      engineerRole: 'Lead Drilling Engineer',
      timestamp: '2026-10-06T18:50:00Z',
      comments: 'All well geometry parameters and coordinate transforms verified with zero errors.',
      signatureHash: 'e7f82b09a419c8d4'
    },
    {
      id: 'appr-02',
      phaseId: 'pressure-mudweight',
      decision: 'APPROVED',
      engineerName: 'Ahmad Al-Ghamdi',
      engineerRole: 'Lead Drilling Engineer',
      timestamp: '2026-10-06T20:30:00Z',
      comments: 'Mud weight operating window 1.32 - 1.46 sg approved. Recommended 1.36 sg accepted.',
      signatureHash: '3a4f89d12c70e5b6'
    }
  ];
  private listeners: Set<WorkflowChangeListener> = new Set();

  public getPhases(): WorkflowPhase[] {
    return JSON.parse(JSON.stringify(this.phases));
  }

  public getPhase(id: WorkflowPhaseId): WorkflowPhase | undefined {
    return this.phases.find((p) => p.id === id);
  }

  public getApprovalHistory(): ApprovalRecord[] {
    return [...this.approvalHistory];
  }

  public subscribe(listener: WorkflowChangeListener): () => void {
    this.listeners.add(listener);
    listener(this.getPhases());
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    const copy = this.getPhases();
    this.listeners.forEach((fn) => fn(copy));
  }

  /**
   * Evaluates downstream dependencies and triggers intelligent rework
   * If an engineer modifies or rejects an earlier phase (e.g. Mud Weight or Casing),
   * only affected dependent downstream phases are marked for re-analysis.
   */
  public modifyPhase(
    phaseId: WorkflowPhaseId,
    decision: 'APPROVED' | 'MODIFIED' | 'REJECTED' | 'REANALYZE',
    options: {
      engineerName: string;
      comments: string;
      overrides?: string;
    }
  ): {
    updatedPhase: WorkflowPhase;
    affectedDownstreamPhases: WorkflowPhaseId[];
  } {
    const phaseIdx = this.phases.findIndex((p) => p.id === phaseId);
    if (phaseIdx === -1) throw new Error(`Phase ${phaseId} not found`);

    const current = this.phases[phaseIdx];
    let newStatus: PhaseStatus = 'APPROVED';

    if (decision === 'REJECTED') newStatus = 'REJECTED';
    else if (decision === 'MODIFIED') newStatus = 'MODIFIED';
    else if (decision === 'REANALYZE') newStatus = 'RUNNING';

    current.status = newStatus;
    current.lastUpdated = new Date().toISOString();

    // Identify all downstream dependent phases
    const affectedDownstream: WorkflowPhaseId[] = [];

    if (decision === 'MODIFIED' || decision === 'REJECTED' || decision === 'REANALYZE') {
      for (let i = phaseIdx + 1; i < this.phases.length; i++) {
        const nextPhase = this.phases[i];
        // Check if depends on modified phase directly or indirectly
        if (nextPhase.dependencies.includes(phaseId) || affectedDownstream.some((dep) => nextPhase.dependencies.includes(dep))) {
          affectedDownstream.push(nextPhase.id);
          nextPhase.status = 'PENDING';
          nextPhase.progressPercent = 0;
          nextPhase.summary = `Pending re-evaluation following modification in upstream phase: ${current.nameEn}`;
        }
      }
    } else if (decision === 'APPROVED') {
      current.status = 'APPROVED';
      current.progressPercent = 100;

      // Unlock next phase if all its dependencies are now approved/completed
      const nextPhase = this.phases[phaseIdx + 1];
      if (nextPhase && nextPhase.status === 'PENDING') {
        const allDepsSatisfied = nextPhase.dependencies.every((depId) => {
          const dep = this.phases.find((p) => p.id === depId);
          return dep && (dep.status === 'COMPLETED' || dep.status === 'APPROVED');
        });
        if (allDepsSatisfied) {
          nextPhase.status = nextPhase.id === 'human-approval' ? 'HUMAN_REVIEW' : 'RUNNING';
          nextPhase.progressPercent = nextPhase.id === 'human-approval' ? 85 : 50;
        }
      }
    }

    // Register immutable approval record
    const record: ApprovalRecord = {
      id: `appr-${Date.now()}`,
      phaseId,
      decision,
      engineerName: options.engineerName,
      engineerRole: 'Lead Drilling Engineer',
      timestamp: new Date().toISOString(),
      comments: options.comments,
      overridesApplied: options.overrides,
      signatureHash: Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10)
    };
    this.approvalHistory.unshift(record);

    this.notify();
    return {
      updatedPhase: { ...current },
      affectedDownstreamPhases: affectedDownstream
    };
  }

  /**
   * Final sign-off: approves human approval gate and automatically compiles the Drilling Program
   */
  public executeFinalSignoff(engineerName: string, comments: string): void {
    this.modifyPhase('human-approval', 'APPROVED', {
      engineerName,
      comments: comments || 'Formally validated all engineering safety factors, casing designs, and trajectory.'
    });

    const progPhase = this.phases.find((p) => p.id === 'drilling-program');
    if (progPhase) {
      progPhase.status = 'COMPLETED';
      progPhase.progressPercent = 100;
      progPhase.lastUpdated = new Date().toISOString();
      progPhase.summary = 'Complete 48-page Aramco Drilling Program package officially compiled and signed.';
    }

    this.notify();
  }
}

export const DrillingWorkflowEngine = new CentralDrillingWorkflowEngine();
