import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    // If the error comes from an external browser extension (such as MetaMask), ignore it
    const msg = error?.message || '';
    const stack = error?.stack || '';
    if (
      msg.includes('MetaMask') ||
      msg.includes('nkbihfbeogaeaoehlefnkodbefgpgknn') ||
      stack.includes('chrome-extension://') ||
      stack.includes('moz-extension://')
    ) {
      return { hasError: false, error: null };
    }
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const msg = error?.message || '';
    const stack = error?.stack || '';
    if (
      msg.includes('MetaMask') ||
      msg.includes('nkbihfbeogaeaoehlefnkodbefgpgknn') ||
      stack.includes('chrome-extension://') ||
      stack.includes('moz-extension://')
    ) {
      console.warn('[Ignored Third-Party Extension Error]:', error);
      return;
    }
    console.error('Uncaught application error:', error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#060b13] text-[#cbd5e1] flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded bg-[#08101e] border border-sky-950/60 text-center space-y-4">
            <div className="w-10 h-10 rounded-full bg-amber-950/60 border border-amber-800/40 text-amber-400 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-medium text-slate-100">
                Engineering Workspace Reset
              </div>
              <div className="text-xs text-slate-400 mt-1 leading-relaxed">
                The application encountered an unexpected state. All persistent data remains safely saved.
              </div>
            </div>
            {this.state.error && (
              <pre className="p-2.5 rounded bg-slate-900/60 border border-slate-800 text-slate-400 font-mono text-[10px] text-left overflow-x-auto max-h-24">
                {this.state.error.message}
              </pre>
            )}
            <button
              onClick={this.handleReset}
              className="w-full py-2 rounded bg-sky-600 hover:bg-sky-500 text-white text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reload Workspace</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
