import React from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Play, 
  Plus, 
  Bug, 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  Layers,
  Cpu
} from 'lucide-react';

export default function Dashboard({ testCases, defects, testRuns, setActiveTab, onRunAllTests }) {
  const total = testCases.length;
  const passed = testCases.filter(c => c.status === 'Passed').length;
  const failed = testCases.filter(c => c.status === 'Failed').length;
  const blocked = testCases.filter(c => c.status === 'Blocked').length;
  const untested = testCases.filter(c => c.status === 'Untested').length;
  
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;
  const automatedCount = testCases.filter(c => c.automationStatus === 'Automated').length;
  const autoCoverage = total > 0 ? Math.round((automatedCount / total) * 100) : 0;
  
  const openDefects = defects.filter(d => d.status === 'Open' || d.status === 'In Progress').length;
  const criticalDefects = defects.filter(d => d.severity === 'Critical' && d.status !== 'Closed').length;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(19, 27, 46, 0.9) 0%, rgba(30, 41, 67, 0.6) 100%)', borderLeft: '4px solid var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span className="pulse-dot"></span>
            <span style={{ fontSize: '0.8125rem', color: 'var(--accent-emerald)', fontWeight: '600', letterSpacing: '0.05em' }}>LIVE QA HEALTH INDEX</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
            Quality Suite Status: <span className="gradient-text">{passRate >= 80 ? 'Healthy' : 'Requires Attention'}</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
            {passed} of {total} test cases passing ({passRate}% success rate). {criticalDefects} critical defects active.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button className="btn btn-emerald" onClick={onRunAllTests}>
            <Play size={16} /> Run Automated Suite
          </button>
          <button className="btn btn-primary" onClick={() => setActiveTab('testcases')}>
            <Plus size={16} /> New Test Case
          </button>
          <button className="btn btn-secondary" onClick={() => setActiveTab('ai-generator')}>
            <Sparkles size={16} color="var(--accent-purple)" /> AI Generator
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '18px' }}>
        
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: '600' }}>TEST CASES</span>
              <div style={{ fontSize: '1.875rem', fontWeight: '800', marginTop: '6px', color: 'white' }}>{total}</div>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
              <Layers size={22} />
            </div>
          </div>
          <div style={{ marginTop: '12px', fontSize: '0.8125rem', color: 'var(--text-dim)', display: 'flex', gap: '12px' }}>
            <span style={{ color: 'var(--accent-emerald)' }}>✓ {passed} Pass</span>
            <span style={{ color: 'var(--accent-rose)' }}>✗ {failed} Fail</span>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: '600' }}>PASS RATE</span>
              <div style={{ fontSize: '1.875rem', fontWeight: '800', marginTop: '6px', color: passRate >= 80 ? '#34d399' : '#fb7185' }}>
                {passRate}%
              </div>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-emerald)' }}>
              <ShieldCheck size={22} />
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ marginTop: '14px', width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ width: `${passRate}%`, height: '100%', background: passRate >= 80 ? 'var(--accent-emerald)' : 'var(--accent-rose)', transition: 'width 0.5s ease' }}></div>
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: '600' }}>AUTOMATION COVERAGE</span>
              <div style={{ fontSize: '1.875rem', fontWeight: '800', marginTop: '6px', color: 'var(--accent-cyan)' }}>
                {autoCoverage}%
              </div>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-cyan)' }}>
              <Cpu size={22} />
            </div>
          </div>
          <div style={{ marginTop: '12px', fontSize: '0.8125rem', color: 'var(--text-dim)' }}>
            {automatedCount} Automated • {total - automatedCount} Manual
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: '600' }}>ACTIVE DEFECTS</span>
              <div style={{ fontSize: '1.875rem', fontWeight: '800', marginTop: '6px', color: openDefects > 0 ? 'var(--accent-rose)' : 'white' }}>
                {openDefects}
              </div>
            </div>
            <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: 'rgba(244, 63, 94, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--accent-rose)' }}>
              <Bug size={22} />
            </div>
          </div>
          <div style={{ marginTop: '12px', fontSize: '0.8125rem', color: 'var(--accent-rose)' }}>
            ⚠️ {criticalDefects} Critical Severity
          </div>
        </div>

      </div>

      {/* Main Charts & Breakdown Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Test Execution Distribution */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={18} color="var(--primary)" /> Test Execution Distribution
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><CheckCircle2 size={14} color="#34d399" /> Passed ({passed})</span>
                <span style={{ fontWeight: '600', color: '#34d399' }}>{total > 0 ? Math.round((passed/total)*100) : 0}%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(passed/total)*100}%`, height: '100%', background: '#34d399' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><XCircle size={14} color="#fb7185" /> Failed ({failed})</span>
                <span style={{ fontWeight: '600', color: '#fb7185' }}>{total > 0 ? Math.round((failed/total)*100) : 0}%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(failed/total)*100}%`, height: '100%', background: '#fb7185' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={14} color="#fbbf24" /> Blocked ({blocked})</span>
                <span style={{ fontWeight: '600', color: '#fbbf24' }}>{total > 0 ? Math.round((blocked/total)*100) : 0}%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(blocked/total)*100}%`, height: '100%', background: '#fbbf24' }}></div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} color="#94a3b8" /> Untested ({untested})</span>
                <span style={{ fontWeight: '600', color: '#94a3b8' }}>{total > 0 ? Math.round((untested/total)*100) : 0}%</span>
              </div>
              <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: `${(untested/total)*100}%`, height: '100%', background: '#94a3b8' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Defect Severity Breakdown */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bug size={18} color="var(--accent-rose)" /> Defect Breakdown by Severity
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: 'rgba(244, 63, 94, 0.1)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#f43f5e' }}>CRITICAL</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f43f5e', marginTop: '4px' }}>
                {defects.filter(d => d.severity === 'Critical').length}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Action Required</span>
            </div>

            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(245, 158, 11, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#f59e0b' }}>HIGH</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#f59e0b', marginTop: '4px' }}>
                {defects.filter(d => d.severity === 'High').length}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>In Backlog</span>
            </div>

            <div style={{ background: 'rgba(6, 182, 212, 0.1)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(6, 182, 212, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#06b6d4' }}>MEDIUM</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#06b6d4', marginTop: '4px' }}>
                {defects.filter(d => d.severity === 'Medium').length}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scheduled</span>
            </div>

            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '16px', borderRadius: '10px', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#818cf8' }}>LOW</div>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#818cf8', marginTop: '4px' }}>
                {defects.filter(d => d.severity === 'Low').length}
              </div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Minor Tweak</span>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Test Runs Section */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={18} color="var(--accent-purple)" /> Recent Test Suite Runs
          </h3>
          <button className="btn btn-secondary" onClick={() => setActiveTab('execution')}>
            View All Runs →
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 16px' }}>RUN ID</th>
                <th style={{ padding: '12px 16px' }}>SUITE NAME</th>
                <th style={{ padding: '12px 16px' }}>ENVIRONMENT</th>
                <th style={{ padding: '12px 16px' }}>PASS / TOTAL</th>
                <th style={{ padding: '12px 16px' }}>STATUS</th>
                <th style={{ padding: '12px 16px' }}>EXECUTED</th>
              </tr>
            </thead>
            <tbody>
              {testRuns.map(run => (
                <tr key={run.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--accent-cyan)' }}>
                    {run.id}
                  </td>
                  <td style={{ padding: '12px 16px', fontWeight: '600', color: 'white' }}>
                    {run.name}
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>
                    {run.environment}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{ color: '#34d399', fontWeight: '600' }}>{run.passed}</span> / {run.totalCases}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span className="badge badge-passed">{run.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-dim)' }}>
                    {run.executedAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
