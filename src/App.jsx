import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Play, 
  Bug, 
  Sparkles, 
  FileText, 
  CheckCircle2, 
  Zap, 
  ShieldCheck,
  Search,
  Bell,
  User,
  ExternalLink
} from 'lucide-react';

import Dashboard from './components/Dashboard.jsx';
import TestCaseManager from './components/TestCaseManager.jsx';
import ExecutionRunner from './components/ExecutionRunner.jsx';
import BugTracker from './components/BugTracker.jsx';
import AITestGenerator from './components/AITestGenerator.jsx';
import Reports from './components/Reports.jsx';

import { INITIAL_TEST_CASES, INITIAL_DEFECTS, INITIAL_TEST_RUNS } from './data/initialData.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [testCases, setTestCases] = useState(INITIAL_TEST_CASES);
  const [defects, setDefects] = useState(INITIAL_DEFECTS);
  const [testRuns, setTestRuns] = useState(INITIAL_TEST_RUNS);

  const [activeTestCaseForRun, setActiveTestCaseForRun] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleExecuteSingleFromRepo = (testCase) => {
    setActiveTestCaseForRun(testCase);
    setActiveTab('execution');
    showToast(`Loaded ${testCase.id} into Execution Runner`);
  };

  const handleRunAllFromDashboard = () => {
    setActiveTab('execution');
    showToast("Automated suite triggered in Execution Engine");
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-dark)' }}>
      
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 999,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-bright)',
          color: 'white',
          padding: '12px 20px',
          borderRadius: '10px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.875rem',
          animation: 'fadeIn 0.2s ease'
        }}>
          <Zap size={16} color="var(--accent-emerald)" />
          {toastMessage}
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside style={{
        width: '260px',
        background: 'var(--bg-card)',
        borderRight: '1px solid var(--border-color)',
        display: 'flex',
        flexDirection: 'column',
        justify: 'space-between',
        padding: '24px 16px',
        position: 'sticky',
        top: 0,
        height: '100vh',
        flexShrink: 0
      }}>
        <div>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0 8px 24px 8px', borderBottom: '1px solid var(--border-color)' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--primary) 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justify: 'center',
              color: 'white',
              fontWeight: '800',
              fontSize: '1.2rem',
              boxShadow: '0 4px 12px var(--primary-glow)'
            }}>
              ⚡
            </div>
            <div>
              <div style={{ fontWeight: '800', fontSize: '1.15rem', color: 'white', letterSpacing: '-0.02em' }}>QAFlow Pro</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--accent-cyan)', fontWeight: '600', letterSpacing: '0.05em' }}>ENTERPRISE QA</div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button 
              className="btn" 
              onClick={() => setActiveTab('dashboard')}
              style={{
                justifyContent: 'flex-start',
                width: '100%',
                padding: '12px 14px',
                background: activeTab === 'dashboard' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                color: activeTab === 'dashboard' ? 'white' : 'var(--text-muted)',
                borderLeft: activeTab === 'dashboard' ? '3px solid var(--primary)' : '3px solid transparent'
              }}
            >
              <LayoutDashboard size={18} color={activeTab === 'dashboard' ? 'var(--primary)' : 'currentColor'} />
              Dashboard Overview
            </button>

            <button 
              className="btn" 
              onClick={() => setActiveTab('testcases')}
              style={{
                justifyContent: 'flex-start',
                width: '100%',
                padding: '12px 14px',
                background: activeTab === 'testcases' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                color: activeTab === 'testcases' ? 'white' : 'var(--text-muted)',
                borderLeft: activeTab === 'testcases' ? '3px solid var(--primary)' : '3px solid transparent'
              }}
            >
              <Layers size={18} color={activeTab === 'testcases' ? 'var(--primary)' : 'currentColor'} />
              Test Case Repository
              <span style={{ marginLeft: 'auto', background: 'rgba(255,255,255,0.08)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem' }}>
                {testCases.length}
              </span>
            </button>

            <button 
              className="btn" 
              onClick={() => setActiveTab('execution')}
              style={{
                justifyContent: 'flex-start',
                width: '100%',
                padding: '12px 14px',
                background: activeTab === 'execution' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                color: activeTab === 'execution' ? 'white' : 'var(--text-muted)',
                borderLeft: activeTab === 'execution' ? '3px solid var(--primary)' : '3px solid transparent'
              }}
            >
              <Play size={18} color={activeTab === 'execution' ? 'var(--accent-emerald)' : 'currentColor'} />
              Execution Engine
            </button>

            <button 
              className="btn" 
              onClick={() => setActiveTab('bugtracker')}
              style={{
                justifyContent: 'flex-start',
                width: '100%',
                padding: '12px 14px',
                background: activeTab === 'bugtracker' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                color: activeTab === 'bugtracker' ? 'white' : 'var(--text-muted)',
                borderLeft: activeTab === 'bugtracker' ? '3px solid var(--primary)' : '3px solid transparent'
              }}
            >
              <Bug size={18} color={activeTab === 'bugtracker' ? 'var(--accent-rose)' : 'currentColor'} />
              Defect Tracker
              <span style={{ marginLeft: 'auto', background: 'rgba(244,63,94,0.2)', color: 'var(--accent-rose)', padding: '2px 8px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '700' }}>
                {defects.filter(d => d.status !== 'Closed').length}
              </span>
            </button>

            <button 
              className="btn" 
              onClick={() => setActiveTab('ai-generator')}
              style={{
                justifyContent: 'flex-start',
                width: '100%',
                padding: '12px 14px',
                background: activeTab === 'ai-generator' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                color: activeTab === 'ai-generator' ? 'white' : 'var(--text-muted)',
                borderLeft: activeTab === 'ai-generator' ? '3px solid var(--primary)' : '3px solid transparent'
              }}
            >
              <Sparkles size={18} color={activeTab === 'ai-generator' ? 'var(--accent-purple)' : 'currentColor'} />
              AI Test Generator
            </button>

            <button 
              className="btn" 
              onClick={() => setActiveTab('reports')}
              style={{
                justifyContent: 'flex-start',
                width: '100%',
                padding: '12px 14px',
                background: activeTab === 'reports' ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                color: activeTab === 'reports' ? 'white' : 'var(--text-muted)',
                borderLeft: activeTab === 'reports' ? '3px solid var(--primary)' : '3px solid transparent'
              }}
            >
              <FileText size={18} color={activeTab === 'reports' ? 'var(--accent-cyan)' : 'currentColor'} />
              Audit Reports
            </button>
          </nav>
        </div>

        {/* Footer Profile Status */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #06b6d4, #6366f1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '0.85rem' }}>
            QA
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: 'white' }}>Lead QA Architect</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="pulse-dot" style={{ width: '6px', height: '6px' }}></span> Online Staging
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main style={{ flex: 1, padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
        
        {/* Top Header Bar */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '16px', borderBottom: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: '600' }}>Workspace</span>
            <span style={{ color: 'var(--text-dim)' }}>/</span>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: '600', textTransform: 'capitalize' }}>
              {activeTab.replace('-', ' ')}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.05)', padding: '6px 12px', borderRadius: '20px', border: '1px solid var(--border-color)', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <ShieldCheck size={14} color="var(--accent-emerald)" /> CI/CD GitHub Webhook Active
            </div>

            <button className="btn btn-icon" title="System Notifications">
              <Bell size={16} />
            </button>
          </div>
        </header>

        {/* View Switcher */}
        {activeTab === 'dashboard' && (
          <Dashboard 
            testCases={testCases} 
            defects={defects} 
            testRuns={testRuns} 
            setActiveTab={setActiveTab}
            onRunAllTests={handleRunAllFromDashboard}
          />
        )}

        {activeTab === 'testcases' && (
          <TestCaseManager 
            testCases={testCases} 
            setTestCases={setTestCases}
            onExecuteTestCase={handleExecuteSingleFromRepo}
          />
        )}

        {activeTab === 'execution' && (
          <ExecutionRunner 
            testCases={testCases} 
            setTestCases={setTestCases}
            defects={defects}
            setDefects={setDefects}
            activeTestCase={activeTestCaseForRun}
            setActiveTestCase={setActiveTestCaseForRun}
          />
        )}

        {activeTab === 'bugtracker' && (
          <BugTracker 
            defects={defects} 
            setDefects={setDefects}
            testCases={testCases}
          />
        )}

        {activeTab === 'ai-generator' && (
          <AITestGenerator 
            setTestCases={setTestCases}
          />
        )}

        {activeTab === 'reports' && (
          <Reports 
            testCases={testCases} 
            defects={defects} 
            testRuns={testRuns}
          />
        )}

      </main>

    </div>
  );
}
