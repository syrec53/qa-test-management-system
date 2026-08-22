import React, { useState } from 'react';
import { 
  Bug, 
  Plus, 
  Filter, 
  Search, 
  Kanban, 
  List, 
  AlertCircle, 
  CheckCircle, 
  UserCheck,
  X
} from 'lucide-react';

export default function BugTracker({ defects, setDefects, testCases }) {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    severity: 'High',
    linkedTestCaseId: '',
    assignee: 'Alex Rivera',
    module: 'Billing & Cart',
    description: ''
  });

  const statuses = ['Open', 'In Progress', 'Resolved', 'Closed'];

  const filteredDefects = defects.filter(d => {
    const matchesSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          d.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'All' || d.severity === severityFilter;
    return matchesSearch && matchesSeverity;
  });

  const handleStatusChange = (id, newStatus) => {
    setDefects(prev => prev.map(d => d.id === id ? { ...d, status: newStatus } : d));
  };

  const handleCreateBug = (e) => {
    e.preventDefault();
    const newBug = {
      id: `BUG-${Math.floor(300 + Math.random() * 600)}`,
      title: formData.title,
      severity: formData.severity,
      status: 'Open',
      linkedTestCaseId: formData.linkedTestCaseId || 'N/A',
      reporter: 'Current QA Engineer',
      assignee: formData.assignee,
      module: formData.module,
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
      description: formData.description || 'No detailed steps provided.'
    };
    setDefects(prev => [newBug, ...prev]);
    setIsModalOpen(false);
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'Critical': return <span className="badge badge-critical">Critical</span>;
      case 'High': return <span className="badge badge-high">High</span>;
      case 'Medium': return <span className="badge badge-medium">Medium</span>;
      default: return <span className="badge badge-low">Low</span>;
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header Bar */}
      <div className="glass-panel" style={{ padding: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Bug color="var(--accent-rose)" /> Defect & Issue Tracker ({filteredDefects.length})
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '2px' }}>
            Log, assign, and track defects linked directly to failed QA test runs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <div style={{ background: 'var(--bg-dark)', borderRadius: '8px', padding: '4px', display: 'flex', border: '1px solid var(--border-color)' }}>
            <button 
              className="btn" 
              style={{ padding: '6px 12px', background: viewMode === 'kanban' ? 'var(--bg-card-hover)' : 'transparent', color: viewMode === 'kanban' ? 'white' : 'var(--text-dim)' }}
              onClick={() => setViewMode('kanban')}
            >
              <Kanban size={15} /> Board
            </button>
            <button 
              className="btn" 
              style={{ padding: '6px 12px', background: viewMode === 'list' ? 'var(--bg-card-hover)' : 'transparent', color: viewMode === 'list' ? 'white' : 'var(--text-dim)' }}
              onClick={() => setViewMode('list')}
            >
              <List size={15} /> List
            </button>
          </div>

          <button className="btn btn-rose" onClick={() => setIsModalOpen(true)}>
            <Plus size={16} /> Log Defect
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="glass-panel" style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: '1 1 250px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
          <input 
            type="text" 
            className="input-field" 
            placeholder="Search defect title, ID, or assignee..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '36px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Filter size={16} color="var(--text-dim)" />
          <select className="input-field" value={severityFilter} onChange={e => setSeverityFilter(e.target.value)} style={{ width: '150px' }}>
            <option value="All">All Severities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>
      </div>

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {statuses.map(status => {
            const columnDefects = filteredDefects.filter(d => d.status === status);
            let headerColor = '#64748b';
            if (status === 'Open') headerColor = '#f43f5e';
            if (status === 'In Progress') headerColor = '#f59e0b';
            if (status === 'Resolved') headerColor = '#06b6d4';
            if (status === 'Closed') headerColor = '#34d399';

            return (
              <div key={status} className="glass-panel" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '480px' }}>
                
                {/* Column Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                  <span style={{ fontWeight: '700', fontSize: '0.875rem', color: headerColor, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {status} ({columnDefects.length})
                  </span>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: headerColor }}></div>
                </div>

                {/* Cards */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {columnDefects.map(bug => (
                    <div 
                      key={bug.id} 
                      style={{ 
                        background: 'var(--bg-card-alt)', 
                        padding: '14px', 
                        borderRadius: '10px', 
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: '700', color: 'var(--accent-rose)' }}>
                          {bug.id}
                        </span>
                        {getSeverityBadge(bug.severity)}
                      </div>

                      <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: 'white', lineHeight: '1.4' }}>
                        {bug.title}
                      </h4>

                      {bug.linkedTestCaseId && bug.linkedTestCaseId !== 'N/A' && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)', background: 'rgba(6,182,212,0.1)', padding: '2px 8px', borderRadius: '4px', width: 'fit-content' }}>
                          Linked to {bug.linkedTestCaseId}
                        </div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-dim)', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <UserCheck size={12} /> {bug.assignee}
                        </span>
                        
                        {/* Status switcher */}
                        <select 
                          className="input-field" 
                          value={bug.status} 
                          onChange={e => handleStatusChange(bug.id, e.target.value)}
                          style={{ padding: '2px 6px', fontSize: '0.72rem', width: 'auto' }}
                        >
                          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="glass-panel" style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px 16px' }}>BUG ID</th>
                <th style={{ padding: '12px 16px' }}>TITLE & DESCRIPTION</th>
                <th style={{ padding: '12px 16px' }}>SEVERITY</th>
                <th style={{ padding: '12px 16px' }}>STATUS</th>
                <th style={{ padding: '12px 16px' }}>ASSIGNEE</th>
                <th style={{ padding: '12px 16px' }}>LINKED TEST</th>
              </tr>
            </thead>
            <tbody>
              {filteredDefects.map(bug => (
                <tr key={bug.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontWeight: '600', color: 'var(--accent-rose)' }}>
                    {bug.id}
                  </td>
                  <td style={{ padding: '12px 16px', maxWidth: '300px' }}>
                    <div style={{ fontWeight: '600', color: 'white' }}>{bug.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {bug.description}
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>{getSeverityBadge(bug.severity)}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <select 
                      className="input-field" 
                      value={bug.status} 
                      onChange={e => handleStatusChange(bug.id, e.target.value)}
                      style={{ padding: '4px 8px', fontSize: '0.8rem', width: 'auto' }}
                    >
                      {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--text-muted)' }}>{bug.assignee}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>{bug.linkedTestCaseId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Log Defect Modal */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: 'white' }}>
                Log New Defect / Bug Report
              </h3>
              <button className="btn btn-icon" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateBug} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Defect Summary *
                </label>
                <input 
                  type="text" 
                  className="input-field" 
                  required 
                  placeholder="e.g. Stripe webhook fails signature check on staging"
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Severity
                  </label>
                  <select className="input-field" value={formData.severity} onChange={e => setFormData({...formData, severity: e.target.value})}>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Assignee
                  </label>
                  <input 
                    type="text" 
                    className="input-field" 
                    value={formData.assignee} 
                    onChange={e => setFormData({...formData, assignee: e.target.value})}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
                    Linked Test Case
                  </label>
                  <select className="input-field" value={formData.linkedTestCaseId} onChange={e => setFormData({...formData, linkedTestCaseId: e.target.value})}>
                    <option value="">None / Manual</option>
                    {testCases.map(tc => (
                      <option key={tc.id} value={tc.id}>{tc.id} - {tc.title.slice(0, 20)}...</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '6px' }}>
                  Reproduction Steps & Description
                </label>
                <textarea 
                  className="input-field" 
                  rows="4" 
                  placeholder="Steps to reproduce, stack trace, or environment details..."
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-rose">
                  Log Defect
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
