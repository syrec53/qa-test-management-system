import React, { useState } from 'react';
import { 
  Sparkles, 
  Plus, 
  CheckCircle2, 
  Zap, 
  FileCode, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';

export default function AITestGenerator({ setTestCases }) {
  const [promptInput, setPromptInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCases, setGeneratedCases] = useState([]);
  const [importedIds, setImportedIds] = useState(new Set());

  const samplePrompts = [
    "JWT Authentication Endpoint (/api/v1/auth/token) with Refresh Tokens & Expiration",
    "File Upload REST API with S3 Storage, File Type Validation, and 10MB Max Size Limit",
    "Stripe Subscription Webhook Handler with Signature Verification & Retry Logic",
    "User Profile Password Reset with 6-Digit OTP Email Verification & Rate Limiting"
  ];

  const handleGenerateScenarios = (textToUse) => {
    const input = textToUse || promptInput;
    if (!input.trim()) return;

    setIsGenerating(true);
    setGeneratedCases([]);

    setTimeout(() => {
      const generated = [
        {
          id: `TC-AI-${Math.floor(1000 + Math.random() * 9000)}`,
          title: `[Happy Path] Valid input submission for ${input.slice(0, 40)}`,
          module: "AI Generated",
          type: "API",
          priority: "High",
          status: "Untested",
          automationStatus: "Automated",
          executionTime: "-",
          steps: [
            `Send valid HTTP request payload to target endpoint.`,
            `Assert response status code is 200 OK or 201 Created.`,
            `Validate JSON schema keys and data types match OpenAPI specs.`
          ],
          expectedResult: "Resource successfully created/processed with valid payload response."
        },
        {
          id: `TC-AI-${Math.floor(1000 + Math.random() * 9000)}`,
          title: `[Boundary Analysis] Maximum payload size and string character limits`,
          module: "AI Generated",
          type: "Boundary",
          priority: "Medium",
          status: "Untested",
          automationStatus: "Automated",
          executionTime: "-",
          steps: [
            `Send payload containing max boundary characters (e.g. 255 chars).`,
            `Verify system handles maximum threshold without truncation.`,
            `Attempt 256 chars and verify HTTP 422 Unprocessable Entity.`
          ],
          expectedResult: "System enforces boundary constraints gracefully."
        },
        {
          id: `TC-AI-${Math.floor(1000 + Math.random() * 9000)}`,
          title: `[Security & Abuse] Malformed JSON & SQL/XSS payload injection`,
          module: "AI Generated",
          type: "Security",
          priority: "Critical",
          status: "Untested",
          automationStatus: "Automated",
          executionTime: "-",
          steps: [
            `Inject malicious string '<script>alert(1)</script>' in input fields.`,
            `Verify response headers include Content-Security-Policy and X-XSS-Protection.`,
            `Ensure database query escapes special characters safely.`
          ],
          expectedResult: "Input sanitized; no execution of embedded scripts or DB errors."
        },
        {
          id: `TC-AI-${Math.floor(1000 + Math.random() * 9000)}`,
          title: `[Negative Flow] Invalid token & expired session handling`,
          module: "AI Generated",
          type: "Negative",
          priority: "High",
          status: "Untested",
          automationStatus: "Automated",
          executionTime: "-",
          steps: [
            `Send request with expired Bearer token header.`,
            `Verify API responds with HTTP 401 Unauthorized.`,
            `Assert error code 'TOKEN_EXPIRED' is returned in response body.`
          ],
          expectedResult: "HTTP 401 Returned with standard error JSON."
        }
      ];

      setGeneratedCases(generated);
      setIsGenerating(false);
    }, 900);
  };

  const handleImportCase = (tc) => {
    setTestCases(prev => [tc, ...prev]);
    setImportedIds(prev => new Set([...prev, tc.id]));
  };

  const handleImportAll = () => {
    setTestCases(prev => [...generatedCases, ...prev]);
    setImportedIds(new Set(generatedCases.map(c => c.id)));
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div className="glass-panel" style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.15) 0%, rgba(19, 27, 46, 0.9) 100%)', borderLeft: '4px solid var(--accent-purple)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
          <Sparkles color="var(--accent-purple)" size={22} />
          <span style={{ fontSize: '0.8125rem', color: 'var(--accent-purple)', fontWeight: '700', letterSpacing: '0.05em' }}>AI SCENARIO GENERATOR</span>
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white' }}>
          Instant Test Scenario Builder
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px', maxWidth: '750px' }}>
          Enter a feature requirement, user story, or API endpoint specification. AI will automatically construct comprehensive positive, boundary, edge case, and security test scenarios.
        </p>
      </div>

      {/* Input Section */}
      <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: '700', color: 'white' }}>
          Feature Description / User Story / API Specification
        </label>
        
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <input 
            type="text" 
            className="input-field" 
            placeholder="e.g. User authentication endpoint with OAuth 2.0 PKCE flow..." 
            value={promptInput}
            onChange={e => setPromptInput(e.target.value)}
            style={{ flex: 1, minWidth: '280px' }}
          />
          <button 
            className="btn btn-primary" 
            onClick={() => handleGenerateScenarios()}
            disabled={isGenerating || !promptInput.trim()}
            style={{ background: 'linear-gradient(135deg, #a855f7 0%, #7c3aed 100%)' }}
          >
            <Sparkles size={16} />
            {isGenerating ? 'Synthesizing Test Scenarios...' : 'Generate Scenarios'}
          </button>
        </div>

        {/* Quick Sample Prompts */}
        <div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Lightbulb size={13} color="var(--accent-amber)" /> Try these quick sample specifications:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {samplePrompts.map((sample, idx) => (
              <button 
                key={idx} 
                onClick={() => {
                  setPromptInput(sample);
                  handleGenerateScenarios(sample);
                }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                {sample}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Test Cases Results */}
      {generatedCases.length > 0 && (
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Zap color="var(--accent-amber)" size={18} /> Generated Test Cases ({generatedCases.length})
            </h3>
            
            <button className="btn btn-emerald" onClick={handleImportAll}>
              <Plus size={16} /> Import All {generatedCases.length} Test Cases
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
            {generatedCases.map(tc => {
              const isImported = importedIds.has(tc.id);

              return (
                <div 
                  key={tc.id} 
                  style={{
                    background: 'var(--bg-card-alt)',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    padding: '18px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '14px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-purple)' }}>
                        {tc.id}
                      </span>
                      <span className="badge badge-medium">{tc.type}</span>
                    </div>

                    <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: 'white', marginBottom: '8px' }}>
                      {tc.title}
                    </h4>

                    <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '10px' }}>
                      <strong>Expected:</strong> {tc.expectedResult}
                    </div>

                    <div style={{ background: 'rgba(0,0,0,0.3)', padding: '10px', borderRadius: '6px', fontSize: '0.78rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                      {tc.steps.map((step, i) => (
                        <div key={i} style={{ marginBottom: '4px' }}>
                          {i+1}. {step}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '12px', display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      className={`btn ${isImported ? 'btn-secondary' : 'btn-primary'}`} 
                      onClick={() => handleImportCase(tc)}
                      disabled={isImported}
                      style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                    >
                      {isImported ? <CheckCircle2 size={14} color="#34d399" /> : <Plus size={14} />}
                      {isImported ? 'Imported to Suite' : 'Import to Test Repository'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
}
