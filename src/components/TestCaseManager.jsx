import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit3, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Layers,
  ChevronRight,
  X
} from 'lucide-react';

export default function TestCaseManager({ testCases, setTestCases, onExecuteTestCase }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTestCase, setEditingTestCase] = useState(null);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    module: 'Auth & Security',
    type: 'API',
    priority: 'High',
    automationStatus: 'Automated',
    expectedResult: '',
    stepsText: ''
  });

  const modules = ['All', ...new Set(testCases.map(c => c.module))];

  const filteredCases = testCases.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'All' || item.module === moduleFilter;
    const matchesPriority = priorityFilter === 'All' || item.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesModule && matchesPriority && matchesStatus;
  });

  const handleOpenCreateModal = () => {
    setEditingTestCase(null);
    setFormData({
      title: '',
      module: 'Auth & Security',
      type: 'API',
      priority: 'High',
      automationStatus: 'Automated',
      expectedResult: '',
      stepsText: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (testCase) => {
    setEditingTestCase(testCase);
    setFormData({
      title: testCase.title,
      module: testCase.module,
      type: testCase.type,
      priority: testCase.priority,
      automationStatus: testCase.automationStatus,
      expectedResult: testCase.expectedResult,
      stepsText: Array.isArray(testCase.steps) ? testCase.steps.join('\n') : ''
    });
    setIsModalOpen(true);
  };

  const handleSaveTestCase = (e) => {
    e.preventDefault();
    const stepsArray = formData.stepsText
      .split('\n')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingTestCase) {
      // Edit
      setTestCases(prev => prev.map(tc => tc.id === editingTestCase.id ? {
        ...tc,
        title: formData.title,
        module: formData.module,
        type: formData.type,
        priority: formData.priority,
        automationStatus: formData.automationStatus,
        expectedResult: formData.expectedResult,
        steps: stepsArray.length > 0 ? stepsArray : ["Execute standard test verification procedure."]
      } : tc));
    } else {
      // Create
      const newId = `TC-${Math.floor(100 + Math.random() * 900)}`;
      const newCase = {
        id: newId,
        title: formData.title,
        module: formData.module,
        type: formData.type,
        priority: formData.priority,
        status: 'Untested',
        automationStatus: formData.automationStatus,
        executionTime: '-',
        steps: stepsArray.length > 0 ? stepsArray : ["Execute standard test verification procedure."],
        expectedResult: formData.expectedResult || "Expected result verified.",
        author: "Current QA Engineer",
        lastRun: "Never"
      };
      setTestCases(prev => [newCase, ...prev]);
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (confirm(`Are you sure you want to delete test case ${id}?`)) {
      setTestCases(prev => prev.filter(c => c.id !== id));
    }
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Title", "Module", "Type", "Priority", "Status", "Automation", "Last Run"];
    const rows = testCases.map(c => [
      c.id, `"${c.title.replace(/"/g, '""')}"`, c.module, c.type, c.priority, c.status, c.automationStatus, c.lastRun
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `qaflow_test_cases_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Passed': return <span className="badge badge-passed"><CheckCircle2 size={12} /> Passed</span>;
      case 'Failed': return <span className="badge badge-failed"><XCircle size={12} /> Failed</span>;
      case 'Blocked': return <span className="badge badge-blocked"><AlertTriangle size={12} /> Blocked</span>;
      default: return <span className="badge badge-untested"><Clock size={12} /> Untested</span>;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'Critical': return <span className="badge badge-critical">Critical</span>;
      case 'High': return <span className="badge badge-high">High</span>;
      case 'Medium': return <span className="badge badge-medium">Medium</span>;
      default: return <span className="badge badge-low">Low</span>;
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header & Action Controls */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Layers color="var(--primary)" /> Test Case Repository ({filteredCases.length})
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '2px' }}>
            Author, organize, and manage manual and automated test scenarios.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={handleExportCSV}>
            <Download size={16} /> Export CSV
          </button>
          <button className="btn btn-primary" onClick={handleOpenCreateModal}>
            <Plus size={16} /> Add Test Case
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 250px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search test case title or ID (e.g. TC-101)..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Filter size={16} color="var(--text-dim)" />
          
          <select className="input-field" value={moduleFilter} onChange={e => setModuleFilter(e.target.value)} style={{ width: '150px' }}>
            <option value="All">All Modules</option>
            {modules.filter(m => m !== 'All').map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>

          <select className="input-field" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} style={{ width: '130px' }}>
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <select className="input-field" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} style={{ width: '130px' }}>
            <option value="All">All Statuses</option>
            <option value="Passed">Passed</option>
            <option value="Failed">Failed</option>
            <option value="Blocked">Blocked</option>
            <option value="Untested">Untested</option>
          </select>
        </div>
      </div>

      {/* Test Case Table View */}
      <div className="glass-panel" style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', background: 'rgba(0,0,0,0.2)' }}>
              <th style={{ padding: '14px 16px' }}>ID</th>
              <th style={{ padding: '14px 16px' }}>TITLE & STEPS</th>
              <th style={{ padding: '14px 16px' }}>MODULE</th>
              <th style={{ padding: '14px 16px' }}>TYPE</th>
              <th style={{ padding: '14px 16px' }}>PRIORITY</th>
              <th style={{ padding: '14px 16px' }}>STATUS</th>
              <th style={{ padding: '14px 16px' }}>AUTOMATION</th>
              <th style={{ padding: '14px 16px', textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredCases.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No test cases found matching your filter criteria.
                </td>
              </tr>
            ) : (
              filteredCases.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.15s' }}>
                  <td style={{ padding: '14px 16px', fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--accent-cyan)' }}>
                    {item.id}
                  </td>
                  <td style={{ padding: '14px 16px', maxWidth: '320px' }}>
                    <div style={{ fontWeight: '600', color: 'white', marginBottom: '4px' }}>{item.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.expectedResult}
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: 'rgba(255,255,255,0.06)', padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      {item.module}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                    {item.type}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {getPriorityBadge(item.priority)}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    {getStatusBadge(item.status)}
                  </td>
                  <td style={{ padding: '14px 16px', color: item.automationStatus === 'Automated' ? 'var(--accent-emerald)' : 'var(--text-dim)', fontSize: '0.8125rem', fontWeight: '500' }}>
                    ⚡ {item.automationStatus}
                  </td>
                  <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                      <button className="btn btn-icon" onClick={() => onExecuteTestCase(item)} title="Run Single Test">
                        <ChevronRight size={16} color="var(--accent-emerald)" />
                      </button>
                      <button className="btn btn-icon" onClick={() => handleOpenEditModal(item)} title="Edit Test Case">
                        <Edit3 size={15} color="var(--primary)" />
                      </button>
                      <button className="btn btn-icon" onClick={() => handleDelete(item.id)} title="Delete Test Case">
                        <Trash2 size={15} color="var(--accent-rose)" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal dialog for Create/Edit */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>
                {editingTestCase ? `Edit Test Case (${editingTestCase.id})` : 'Create New Test Case'}
              </h3>
              <button className="btn btn-icon" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveTestCase} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Test Case Title *
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  required 
                  placeholder="e.g. Verify JWT token expiration payload"
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Module
                  </label>
                  <input 
                    type="text" 
                    className="input-field" 
                    placeholder="e.g. Auth & Security"
                    value={formData.module} 
                    onChange={e => setFormData({...formData, module: e.target.value})}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Priority
                  </label>
                  <select className="input-field" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Type
                  </label>
                  <select className="input-field" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})}>
                    <option value="API">API</option>
                    <option value="UI">UI</option>
                    <option value="E2E">E2E</option>
                    <option value="Security">Security</option>
                    <option value="Regression">Regression</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Execution Steps (One per line)
                </label>
                <textarea 
                  className="input-field" 
                  rows="4" 
                  placeholder="Step 1: Send request to /api/v1/auth...&#10;Step 2: Verify HTTP 200..."
                  value={formData.stepsText} 
                  onChange={e => setFormData({...formData, stepsText: e.target.value})}
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8125rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Expected Result
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  placeholder="What is the expected outcome of this test?"
                  value={formData.expectedResult} 
                  onChange={e => setFormData({...formData, expectedResult: e.target.value})}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingTestCase ? 'Save Changes' : 'Create Test Case'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
