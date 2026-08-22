import React from 'react';
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  BarChart2, 
  ShieldCheck, 
  Award
} from 'lucide-react';

export default function Reports({ testCases, defects, testRuns }) {
  const total = testCases.length;
  const passed = testCases.filter(c => c.status === 'Passed').length;
  const failed = testCases.filter(c => c.status === 'Failed').length;
  const blocked = testCases.filter(c => c.status === 'Blocked').length;
  const untested = testCases.filter(c => c.status === 'Untested').length;
  
  const passRate = total > 0 ? Math.round((passed / total) * 100) : 0;
  const openDefects = defects.filter(d => d.status !== 'Closed');

  const handleDownloadJSON = () => {
    const reportObj = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalTestCases: total,
        passed,
        failed,
        blocked,
        untested,
        passRate: `${passRate}%`,
        activeDefects: openDefects.length
      },
      testCases,
      defects,
      testRuns
    };
    
    const blob = new Blob([JSON.stringify(reportObj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qaflow_executive_report_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintReport = () => {
    window.print();
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Report Controls */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileText color="var(--primary)" /> Executive Quality Audit Report
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '2px' }}>
            Generate, print, and export compliance quality reports for stakeholders.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={handlePrintReport}>
            <Printer size={16} /> Print / Export PDF
          </button>
          <button className="btn btn-primary" onClick={handleDownloadJSON}>
            <Download size={16} /> Download Raw JSON
          </button>
        </div>
      </div>

      {/* Report Document Sheet */}
      <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', background: '#0b1120' }}>
        
        {/* Document Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid var(--border-color)', paddingBottom: '20px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '6px', background: 'var(--primary)', display: 'flex', alignItems: 'center', justify: 'center', color: 'white', fontWeight: '800', fontSize: '0.9rem' }}>Q</div>
              <span style={{ fontSize: '1.25rem', fontWeight: '800', color: 'white', letterSpacing: '-0.02em' }}>QAFlow Pro</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>System Release Quality & Compliance Audit</p>
          </div>

          <div style={{ textAlign: 'right', fontSize: '0.8125rem', color: 'var(--text-dim)' }}>
            <div><strong>Report Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
            <div><strong>Environment:</strong> Staging Cluster us-east-1</div>
            <div><strong>Sign-off Status:</strong> {passRate >= 80 ? <span style={{ color: '#34d399', fontWeight: '700' }}>APPROVED FOR DEPLOYMENT</span> : <span style={{ color: '#fb7185', fontWeight: '700' }}>HOLD - CRITICAL DEFECTS</span>}</div>
          </div>
        </div>

        {/* Executive Summary Grid */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'white', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={18} color="var(--accent-amber)" /> Executive Summary & Sign-off Metrics
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>TOTAL TEST SUITES</span>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white', marginTop: '4px' }}>{total}</div>
            </div>
            <div style={{ background: 'rgba(16,185,129,0.08)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(16,185,129,0.2)' }}>
              <span style={{ fontSize: '0.78rem', color: '#34d399' }}>PASSED SCENARIOS</span>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#34d399', marginTop: '4px' }}>{passed}</div>
            </div>
            <div style={{ background: 'rgba(244,63,94,0.08)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(244,63,94,0.2)' }}>
              <span style={{ fontSize: '0.78rem', color: '#fb7185' }}>FAILED SCENARIOS</span>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fb7185', marginTop: '4px' }}>{failed}</div>
            </div>
            <div style={{ background: 'rgba(99,102,241,0.08)', padding: '16px', borderRadius: '8px', border: '1px solid rgba(99,102,241,0.2)' }}>
              <span style={{ fontSize: '0.78rem', color: '#818cf8' }}>QUALITY SUCCESS RATE</span>
              <div style={{ fontSize: '1.5rem', fontWeight: '800', color: '#818cf8', marginTop: '4px' }}>{passRate}%</div>
            </div>
          </div>
        </div>

        {/* Detailed Module Audit Table */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: '700', color: 'white', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BarChart2 size={18} color="var(--accent-cyan)" /> Module Test Matrix & Status breakdown
          </h3>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '10px 14px' }}>CASE ID</th>
                  <th style={{ padding: '10px 14px' }}>TITLE</th>
                  <th style={{ padding: '10px 14px' }}>MODULE</th>
                  <th style={{ padding: '10px 14px' }}>PRIORITY</th>
                  <th style={{ padding: '10px 14px' }}>AUTOMATION</th>
                  <th style={{ padding: '10px 14px' }}>VERDICT</th>
                </tr>
              </thead>
              <tbody>
                {testCases.map(c => (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{c.id}</td>
                    <td style={{ padding: '10px 14px', color: 'white', fontWeight: '500' }}>{c.title}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-muted)' }}>{c.module}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-muted)' }}>{c.priority}</td>
                    <td style={{ padding: '10px 14px', color: 'var(--text-dim)' }}>{c.automationStatus}</td>
                    <td style={{ padding: '10px 14px' }}>
                      {c.status === 'Passed' && <span style={{ color: '#34d399', fontWeight: '700' }}>✓ PASSED</span>}
                      {c.status === 'Failed' && <span style={{ color: '#fb7185', fontWeight: '700' }}>✗ FAILED</span>}
                      {c.status === 'Blocked' && <span style={{ color: '#fbbf24', fontWeight: '700' }}>⚠️ BLOCKED</span>}
                      {c.status === 'Untested' && <span style={{ color: '#94a3b8' }}>- UNTESTED</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}
