import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ErrorBoundary } from './components/ErrorBoundary';

// Suppress unhandled third-party browser extension issues (e.g. MetaMask / web3 injection)
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const msg = String(reason?.message || reason || '');
    const stack = String(reason?.stack || '');
    if (
      msg.includes('MetaMask') ||
      msg.includes('nkbihfbeogaeaoehlefnkodbefgpgknn') ||
      stack.includes('chrome-extension://') ||
      stack.includes('moz-extension://')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });

  window.addEventListener('error', (event) => {
    const msg = String(event.message || '');
    const filename = String(event.filename || '');
    if (
      msg.includes('MetaMask') ||
      filename.includes('chrome-extension://') ||
      filename.includes('nkbihfbeogaeaoehlefnkodbefgpgknn')
    ) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);
