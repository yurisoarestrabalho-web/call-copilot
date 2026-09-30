import React, { useState } from 'react';
import { ScriptProvider, useScript } from './context/ScriptContext';
import { HomeStartView } from './components/home/HomeStartView';
import { CallCopilotView } from './components/copilot/CallCopilotView';
import { ScriptBuilderView } from './components/builder/ScriptBuilderView';
import { CallAnalyticsView } from './components/analytics/CallAnalyticsView';

function AppContent() {
  const { currentSession } = useScript();
  const [view, setView] = useState<'home' | 'builder' | 'analytics'>('home');

  // If there is an active call in progress, always show the Call Copilot screen
  if (currentSession && currentSession.status === 'active') {
    return <CallCopilotView />;
  }

  // Otherwise, render Home, Builder or Analytics
  if (view === 'builder') {
    return <ScriptBuilderView onBackToHome={() => setView('home')} />;
  }

  if (view === 'analytics') {
    return <CallAnalyticsView onBackToHome={() => setView('home')} />;
  }

  return (
    <HomeStartView
      onOpenBuilder={() => setView('builder')}
      onOpenAnalytics={() => setView('analytics')}
    />
  );
}

export function App() {
  return (
    <ScriptProvider>
      <AppContent />
    </ScriptProvider>
  );
}

export default App;
