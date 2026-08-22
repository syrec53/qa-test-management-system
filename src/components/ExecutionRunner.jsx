import React, { useState, useEffect } from 'react';
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Terminal, 
  RefreshCw, 
  Bug, 
  Zap, 
  ShieldAlert,
  FastForward,
  Layers
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ExecutionRunner({ testCases, setTestCases, defects, setDefects, activeTestCase, setActiveTestCase }) {
  const [isRunning, setIsRunning] = useState(false);
  const [currentRunningIndex, setCurrentRunningIndex] = useState(-1);
  const [logs, setLogs] = useState([
    { timestamp: new Date().toLocaleTimeString(), text: "Runner ready. Select a test case or click 'Run All Automated Suites'.", type: "info" }
  ]);

  const [selectedSuite, setSelectedSuite] = useState("All Automated");

  const appendLog = (text, type = "info") => {
    setLogs(prev => [
      ...prev,
      { timestamp: new Date().toLocaleTimeString(), text, type }
    ]);
  };

  const handleRunSingleTest = async (testCase) => {
    setIsRunning(true);
    appendLog(`[START] Executing single test case: ${testCase.id} - ${testCase.title}`, "info");
    
    // Simulate step execution delay
    await new Promise(r => setTimeout(r, 600));
    appendLog(`Evaluating precondition checks & payload assertions...`, "info");
    
    await new Promise(r => setTimeout(r, 800));
    // Determine outcome (if title has checkout or SQL, simulate specific behavior)
    const isSuccess = testCase.title.toLowerCase().includes('checkout') ? false : true;
    
    const timeMs = `${Math.floor(80 + Math.random() * 350)}ms`;
    
    if (isSuccess) {
      appendLog(`[PASS] ${testCase.id} passed all steps in ${timeMs}`, "success");
      setTestCases(prev => prev.map(tc => tc.id === testCase.id ? { ...tc, status: 'Passed', executionTime: timeMs, lastRun: 'Just Now' } : tc));
    } else {
      appendLog(`[FAIL] ${testCase.id} assertion failed: Expected Order ID header missing (HTTP 500)`, "error");
      setTestCases(prev => prev.map(tc => tc.id === testCase.id ? { ...tc, status: 'Failed', executionTime: timeMs, lastRun: 'Just Now' } : tc));
      
      // Check if bug already exists
      const bugExists = defects.some(d => d.linkedTestCaseId === testCase.id);
      if (!bugExists) {
        const newBug = {
          id: `BUG-${Math.floor(300 + Math.random() * 600)}`,
          title: `Auto-Reported Defect: Failure in ${testCase.title}`,
          severity: "High",
          status: "Open",
          linkedTestCaseId: testCase.id,
          reporter: "Automated Test Runner",
          assignee: "QA Lead",
          module: testCase.module,
          createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
          description: `Automatically created during execution of test case ${testCase.id}. Assertion failure detected in expected outcome: ${testCase.expectedResult}`
        };
        setDefects(prev => [newBug, ...prev]);
        appendLog(`[AUTO-BUG] Logged new defect ${newBug.id} in Bug Tracker!`, "warning");
      }
    }
    
    setIsRunning(false);
  };

  const handleRunAllSuites = async () => {
    setIsRunning(true);
    setLogs([]);
    appendLog("==========================================", "info");
    appendLog("🚀 STARTING AUTOMATED TEST SUITE EXECUTION", "info");
    appendLog(`Environment: Staging (us-east-1) | Parallel Threads: 4`, "info");
    appendLog("==========================================", "info");

    let passCount = 0;
    let failCount = 0;

    for (let i = 0; i < testCases.length; i++) {
      const tc = testCases[i];
      setCurrentRunningIndex(i);
      appendLog(`[EXECUTING] [${i+1}/${testCases.length}] ${tc.id}: ${tc.title}...`, "info");

      await new Promise(r => setTimeout(r, 450));

      const isPass = !tc.title.toLowerCase().includes('checkout') && tc.priority !== 'Blocked';
      const executionTime = `${Math.floor(100 + Math.random() * 400)}ms`;

      if (isPass) {
        passCount++;
        appendLog(`  ✓ STEP 1: Request payload serialized (${executionTime})`, "info");
        appendLog(`  ✓ STEP 2: Response status 200 OK verified`, "info");
        appendLog(`[RESULT] ${tc.id} -> PASSED`, "success");
        setTestCases(prev => prev.map(item => item.id === tc.id ? { ...item, status: 'Passed', executionTime, lastRun: 'Just Now' } : item));
      } else {
        failCount++;
        appendLog(`  ✓ STEP 1: Payload dispatched`, "info");
        appendLog(`  ✗ STEP 2: Assertion error - Expected HTTP status 200, got HTTP 500 Internal Error`, "error");
        appendLog(`[RESULT] ${tc.id} -> FAILED`, "error");
        setTestCases(prev => prev.map(item => item.id === tc.id ? { ...item, status: 'Failed', executionTime, lastRun: 'Just Now' } : item));
      }
    }

    appendLog("==========================================", "info");
    appendLog(`🎉 SUITE EXECUTION COMPLETE: ${passCount} Passed, ${failCount} Failed`, passCount > 0 ? "success" : "info");
    appendLog("==========================================", "info");

    setCurrentRunningIndex(-1);
    setIsRunning(false);

    if (failCount === 0) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleUpdateStatusManually = (tcId, newStatus) => {
    setTestCases(prev => prev.map(tc => tc.id === tcId ? { ...tc, status: newStatus, lastRun: 'Just Now' } : tc));
    appendLog(`Manually set ${tcId} status to [${newStatus.toUpperCase()}]`, newStatus === 'Passed' ? 'success' : newStatus === 'Failed' ? 'error' : 'warning');
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Runner Toolbar */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap color="var(--accent-emerald)" /> Test Execution Engine
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '2px' }}>
            Execute automated test suites, view step assertions, and inspect real-time execution logs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-emerald" onClick={handleRunAllSuites} disabled={isRunning}>
            {isRunning ? <RefreshCw className="animate-spin" size={16} /> : <Play size={16} />}
            {isRunning ? 'Executing Suite...' : 'Run All Automated Suites'}
          </button>
        </div>
      </div>

      {/* Main Grid: Left Side Test Selector, Right Side Terminal Logs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        
        {/* Test Suite / Single Execution Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'white', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Layers size={18} color="var(--primary)" /> Select Test Case for Single Run
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '420px', overflowY: 'auto', paddingRight: '4px' }}>
              {testCases.map((tc, idx) => (
                <div 
                  key={tc.id}
                  style={{
                    padding: '12px 14px',
                    borderRadius: '8px',
                    background: currentRunningIndex === idx ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-card-alt)',
                    border: currentRunningIndex === idx ? '1px solid var(--primary)' : '1px solid var(--border-color)',
                    display: 'flex',
                    justify: 'space-between',
                    alignItems: 'center',
                    gap: '12px'
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-cyan)' }}>
                        {tc.id}
                      </span>
                      <span style={{ fontSize: '0.85rem', fontWeight: '600', color: 'white' }}>{tc.title}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
                      {tc.module} • {tc.type}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    {/* Manual override buttons */}
                    <button 
                      onClick={() => handleUpdateStatusManually(tc.id, 'Passed')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: tc.status === 'Passed' ? 1 : 0.4 }}
                      title="Mark Passed"
                    >
                      <CheckCircle2 size={16} color="#34d399" />
                    </button>
                    <button 
                      onClick={() => handleUpdateStatusManually(tc.id, 'Failed')}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: tc.status === 'Failed' ? 1 : 0.4 }}
                      title="Mark Failed"
                    >
                      <XCircle size={16} color="#fb7185" />
                    </button>
                    <button 
                      className="btn btn-secondary" 
                      onClick={() => handleRunSingleTest(tc)}
                      disabled={isRunning}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      Run
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Console / Terminal Log Output */}
        <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', background: '#050811', border: '1px solid #1e2942' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', borderBottom: '1px solid #1e2942', paddingBottom: '10px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)' }}>
              <Terminal size={16} color="var(--accent-emerald)" /> EXECUTION_CONSOLE_STREAM
            </h3>
            <button className="btn btn-secondary" onClick={() => setLogs([])} style={{ padding: '4px 8px', fontSize: '0.75rem' }}>
              Clear Terminal
            </button>
          </div>

          <div style={{ flex: 1, minHeight: '380px', maxHeight: '520px', overflowY: 'auto', fontFamily: 'var(--font-mono)', fontSize: '0.8125rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {logs.map((log, i) => {
              let color = '#94a3b8';
              if (log.type === 'success') color = '#34d399';
              if (log.type === 'error') color = '#fb7185';
              if (log.type === 'warning') color = '#fbbf24';

              return (
                <div key={i} style={{ color, wordBreak: 'break-all', lineHeight: '1.4' }}>
                  <span style={{ color: '#475569', marginRight: '8px' }}>[{log.timestamp}]</span>
                  {log.text}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
