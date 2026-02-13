import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import data from './data';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { getCVData, saveCVData } from '../../services/firebaseService';
import { auth } from '../../firebase';
import {  signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

// Optional admin email restriction
const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL || null;

const AdminPanel = ({ onClose, data: initialData = null, onDataUpdate = () => {}, fullpage = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Removed email/password state, only Google auth
  const [currentData, setCurrentData] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const firebaseData = await getCVData();
        if (firebaseData) setCurrentData(firebaseData);
        else if (initialData && Object.keys(initialData).length) setCurrentData(initialData);
        else setCurrentData(data);
      } catch (err) {
        console.error('Load data error', err);
        setCurrentData(initialData || data);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [initialData]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (ADMIN_EMAIL) setIsAuthenticated(user.email === ADMIN_EMAIL);
        else setIsAuthenticated(true);
      } else setIsAuthenticated(false);
    });
    return () => unsubscribe();
  }, []);

  // Removed email/password submit handler

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (ADMIN_EMAIL && user.email !== ADMIN_EMAIL) {
        alert('This Google account is not authorized as admin.');
        await signOut(auth);
        return;
      }
      setIsAuthenticated(true);
    } catch (err) {
      console.error('Google sign-in error', err);
      alert('Google sign-in failed.');
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (err) {
      console.error('Sign-out error', err);
    }
  };

  const saveData = async (updated) => {
    setCurrentData(updated);
    try {
      const ok = await saveCVData(updated);
      if (ok && typeof onDataUpdate === 'function') onDataUpdate(updated);
    } catch (err) {
      console.error('Save error', err);
      alert('Save failed');
    }
  };

  const handleBasicSave = () => saveData(currentData);

  const handleEdit = (section, item, index) => {
    setEditingId(`${section}-${index}`);
    if (section === 'skills') setEditForm({ value: item });
    else if (typeof item === 'string') setEditForm({ value: item });
    else setEditForm({ ...item });
  };

  const handleSaveEdit = (section, index) => {
    const updated = { ...currentData };
    if (!updated[section]) updated[section] = [];
    if (section === 'skills') updated[section][index] = editForm.value || '';
    else if (typeof updated[section][index] === 'string') updated[section][index] = editForm.value || '';
    else updated[section][index] = { ...editForm };
    saveData(updated);
    setEditingId(null);
    setEditForm({});
  };

  const handleDeleteItem = (section, index) => {
    if (!window.confirm('Delete this item?')) return;
    const updated = { ...currentData };
    if (!updated[section]) updated[section] = [];
    updated[section].splice(index, 1);
    saveData(updated);
  };

  const handleAddItem = (section) => {
    const updated = { ...currentData };
    if (!updated[section]) updated[section] = [];
    let newItem = null;
    switch (section) {
      case 'projects':
        newItem = { id: Date.now(), title: 'New Project', description: 'Describe it', link: '' };
        break;
      case 'experience':
        newItem = { id: Date.now(), company: 'Company', position: 'Role', startYear: 2020, endYear: 'current', description: '' };
        break;
      case 'education':
        newItem = { id: Date.now(), school: 'School', years: '2020 - 2024' };
        break;
      case 'languages':
        newItem = { id: Date.now(), language: 'Language', level: 3 };
        break;
      case 'skills':
        newItem = 'New Skill';
        break;
      default:
        newItem = {};
    }
    updated[section].unshift(newItem);
    saveData(updated);
  };

  const handleInputChange = (e, key) => setEditForm({ ...editForm, [key]: e.target.value });

  const handleAddTool = () => {
    const updated = { ...currentData };
    if (!updated.itServices) updated.itServices = { tools: [], certifications: [] };
    if (!updated.itServices.tools) updated.itServices.tools = [];
    updated.itServices.tools.push({ name: 'New Tool', icon: '' });
    saveData(updated);
  };

  const handleEditTool = (index) => {
    const tool = currentData.itServices.tools[index];
    setEditingId(`tool-${index}`);
    setEditForm({ ...tool });
  };

  const handleSaveTool = (index) => {
    const updated = { ...currentData };
    updated.itServices.tools[index] = editForm;
    saveData(updated);
    setEditingId(null);
    setEditForm({});
  };

  const handleDeleteTool = (index) => {
    if (!window.confirm('Delete this tool?')) return;
    const updated = { ...currentData };
    updated.itServices.tools.splice(index, 1);
    saveData(updated);
  };

  const handleAddCertification = () => {
    const updated = { ...currentData };
    if (!updated.itServices) updated.itServices = { tools: [], certifications: [] };
    if (!updated.itServices.certifications) updated.itServices.certifications = [];
    updated.itServices.certifications.push({ id: Date.now(), name: 'New Certification', issuer: '', year: new Date().getFullYear() });
    saveData(updated);
  };

  const handleEditCertification = (index) => {
    const cert = currentData.itServices.certifications[index];
    setEditingId(`cert-${index}`);
    setEditForm({ ...cert });
  };

  const handleSaveCertification = (index) => {
    const updated = { ...currentData };
    updated.itServices.certifications[index] = editForm;
    saveData(updated);
    setEditingId(null);
    setEditForm({});
  };

  const handleDeleteCertification = (index) => {
    if (!window.confirm('Delete this certification?')) return;
    const updated = { ...currentData };
    updated.itServices.certifications.splice(index, 1);
    saveData(updated);
  };

  const renderLoadingSkeleton = () => (
    <div className={`admin-page ${fullpage ? 'fullpage' : ''}`}>
      <div className={`admin-panel modern ${fullpage ? 'fullpage-mode' : ''}`}>
        <div className="admin-header">
          <div className="header-left">
            <div className="brand-badge">CV</div>
            <h2>Admin</h2>
          </div>
        </div>
        <div className="admin-body">
          <div style={{ padding: '20px' }}>
            {[...Array(4)].map((_, i) => (
              <div key={i} style={{ marginBottom: '24px' }}>
                <Skeleton width="30%" height={24} style={{ marginBottom: '12px' }} />
                <div style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px' }}>
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} count={2} height={16} style={{ marginBottom: '8px' }} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );


  // Tab state for section navigation (must be at top level, not inside conditional)
  const [activeTab, setActiveTab] = useState('basic');
  const tabList = [
    { key: 'basic', label: 'Basic Info' },
    { key: 'tools', label: 'IT Tools' },
    { key: 'certs', label: 'Certifications' },
    { key: 'projects', label: 'Projects' },
    { key: 'experience', label: 'Experience' },
    { key: 'education', label: 'Education' },
    { key: 'languages', label: 'Languages' },
    { key: 'skills', label: 'Skills' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-modal">
          <h2>Admin Sign In</h2>
          <div className="d-flex flex-column align-items-center" style={{ gap: 16 }}>
            <button type="button" className="google-btn" onClick={handleGoogleSignIn}>
              <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="G" style={{ marginRight: 8 }} />
              Sign in with Google
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  if (loading || !currentData) return renderLoadingSkeleton();

  return (
    <div className={`admin-page ${fullpage ? 'fullpage' : ''}`}>
      <div className={`admin-panel modern ${fullpage ? 'fullpage-mode' : ''}`}>
        <div className="admin-header">
          <div className="header-left">
            <div className="brand-badge">CV</div>
            <h2>Admin</h2>
          </div>
          <div className="d-flex align-items-center">
            <div className="admin-user me-3"><small>{auth && auth.currentUser ? auth.currentUser.email : ''}</small></div>
            <button className="btn btn-outline-danger btn-sm me-2" onClick={handleSignOut}>Sign out</button>
            {!fullpage && <button className="btn-close" onClick={onClose}></button>}
          </div>
        </div>

        {/* Tab Navigation */}
        <ul className="nav nav-tabs mb-3" style={{ borderBottom: '2px solid #eee' }}>
          {tabList.map(tab => (
            <li className="nav-item" key={tab.key}>
              <button
                className={`nav-link${activeTab === tab.key ? ' active' : ''}`}
                style={{ cursor: 'pointer' }}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="admin-body">
          {/* Basic Info */}
          {activeTab === 'basic' && (
            <div className="admin-content mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>Basic Info</h3>
                <button className="btn btn-success btn-sm" onClick={handleBasicSave}>Save</button>
              </div>
              <div className="card p-3 mb-3">
                <div className="mb-2">
                  <label className="form-label">Name</label>
                  <input className="form-control" value={currentData.name || ''} onChange={(e) => setCurrentData({ ...currentData, name: e.target.value })} />
                </div>
                <div className="mb-2">
                  <label className="form-label">Title</label>
                  <input className="form-control" value={currentData.title || ''} onChange={(e) => setCurrentData({ ...currentData, title: e.target.value })} />
                </div>
                <div className="mb-2">
                  <label className="form-label">About</label>
                  <textarea className="form-control" rows="4" value={currentData.about || ''} onChange={(e) => setCurrentData({ ...currentData, about: e.target.value })} />
                </div>
                <div className="d-flex gap-2">
                  <input className="form-control" placeholder="Location" value={currentData.location || ''} onChange={(e) => setCurrentData({ ...currentData, location: e.target.value })} />
                  <input className="form-control" placeholder="Email" value={currentData.email || ''} onChange={(e) => setCurrentData({ ...currentData, email: e.target.value })} />
                  <input className="form-control" placeholder="Phone" value={currentData.phone || ''} onChange={(e) => setCurrentData({ ...currentData, phone: e.target.value })} />
                </div>
              </div>
            </div>
          )}

          {/* IT Services - Tools */}
          {activeTab === 'tools' && (
            <div className="admin-content mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>IT Services - Tools</h3>
                <button className="btn btn-success btn-sm" onClick={handleAddTool}>Add Tool</button>
              </div>
              <div className="admin-list">
                {currentData.itServices && currentData.itServices.tools && currentData.itServices.tools.map((tool, index) => (
                  <div key={`tool-${index}`} className="admin-item mb-3 p-3">
                    {editingId === `tool-${index}` ? (
                      <div className="edit-form">
                        <div className="mb-2">
                          <label className="form-label">Tool Name</label>
                          <input className="form-control" value={editForm.name || ''} onChange={(e) => handleInputChange(e, 'name')} />
                        </div>
                        <div className="mb-2">
                          <label className="form-label">Icon URL</label>
                          <input className="form-control" value={editForm.icon || ''} onChange={(e) => handleInputChange(e, 'icon')} />
                        </div>
                        <div>
                          <button className="btn btn-primary btn-sm me-2" onClick={() => handleSaveTool(index)}>Save</button>
                          <button className="btn btn-secondary btn-sm" onClick={() => { setEditingId(null); setEditForm({}); }}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <h5 className="mb-2">{tool.name}</h5>
                          {tool.icon && <small className="text-secondary">{tool.icon.substring(0, 50)}...</small>}
                        </div>
                        <div className="btn-group-sm">
                          <button className="btn btn-warning btn-sm me-1" onClick={() => handleEditTool(index)}><i className="fa fa-edit"></i></button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTool(index)}><i className="fa fa-trash"></i></button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* IT Services - Certifications */}
          {activeTab === 'certs' && (
            <div className="admin-content mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>IT Services - Certifications</h3>
                <button className="btn btn-success btn-sm" onClick={handleAddCertification}>Add Certification</button>
              </div>
              <div className="admin-list">
                {currentData.itServices && currentData.itServices.certifications && currentData.itServices.certifications.map((cert, index) => (
                  <div key={`cert-${index}`} className="admin-item mb-3 p-3">
                    {editingId === `cert-${index}` ? (
                      <div className="edit-form">
                        <div className="mb-2">
                          <label className="form-label">Certification Name</label>
                          <input className="form-control" value={editForm.name || ''} onChange={(e) => handleInputChange(e, 'name')} />
                        </div>
                        <div className="mb-2">
                          <label className="form-label">Issuer</label>
                          <input className="form-control" value={editForm.issuer || ''} onChange={(e) => handleInputChange(e, 'issuer')} />
                        </div>
                        <div className="mb-2">
                          <label className="form-label">Year</label>
                          <input className="form-control" type="number" value={editForm.year || ''} onChange={(e) => handleInputChange(e, 'year')} />
                        </div>
                        <div>
                          <button className="btn btn-primary btn-sm me-2" onClick={() => handleSaveCertification(index)}>Save</button>
                          <button className="btn btn-secondary btn-sm" onClick={() => { setEditingId(null); setEditForm({}); }}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-between align-items-start">
                        <div className="flex-grow-1">
                          <h5 className="mb-2">{cert.name}</h5>
                          <p className="text-muted mb-1">{cert.issuer}</p>
                          <small className="text-secondary">{cert.year}</small>
                        </div>
                        <div className="btn-group-sm">
                          <button className="btn btn-warning btn-sm me-1" onClick={() => handleEditCertification(index)}><i className="fa fa-edit"></i></button>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDeleteCertification(index)}><i className="fa fa-trash"></i></button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {activeTab === 'projects' && (
            <SectionList
              title="Projects"
              sectionKey="projects"
              currentData={currentData}
              editingId={editingId}
              editForm={editForm}
              onEdit={handleEdit}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDeleteItem}
              onAdd={handleAddItem}
              onInputChange={handleInputChange}
              onCancel={() => { setEditingId(null); setEditForm({}); }}
            />
          )}

          {/* Experience */}
          {activeTab === 'experience' && (
            <SectionList
              title="Experience"
              sectionKey="experience"
              currentData={currentData}
              editingId={editingId}
              editForm={editForm}
              onEdit={handleEdit}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDeleteItem}
              onAdd={handleAddItem}
              onInputChange={handleInputChange}
              onCancel={() => { setEditingId(null); setEditForm({}); }}
            />
          )}

          {/* Education */}
          {activeTab === 'education' && (
            <SectionList
              title="Education"
              sectionKey="education"
              currentData={currentData}
              editingId={editingId}
              editForm={editForm}
              onEdit={handleEdit}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDeleteItem}
              onAdd={handleAddItem}
              onInputChange={handleInputChange}
              onCancel={() => { setEditingId(null); setEditForm({}); }}
            />
          )}

          {/* Languages */}
          {activeTab === 'languages' && (
            <SectionList
              title="Languages"
              sectionKey="languages"
              currentData={currentData}
              editingId={editingId}
              editForm={editForm}
              onEdit={handleEdit}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDeleteItem}
              onAdd={handleAddItem}
              onInputChange={handleInputChange}
              onCancel={() => { setEditingId(null); setEditForm({}); }}
            />
          )}

          {/* Skills */}
          {activeTab === 'skills' && (
            <SectionList
              title="Skills"
              sectionKey="skills"
              currentData={currentData}
              editingId={editingId}
              editForm={editForm}
              onEdit={handleEdit}
              onSaveEdit={handleSaveEdit}
              onDelete={handleDeleteItem}
              onAdd={handleAddItem}
              onInputChange={handleInputChange}
              onCancel={() => { setEditingId(null); setEditForm({}); }}
            />
          )}

        </div>

      </div>
    </div>
  );
};

export default AdminPanel;

// Small helper component inside same file for section rendering
function SectionList({ title, sectionKey, currentData, editingId, editForm, onEdit, onSaveEdit, onDelete, onAdd, onInputChange, onCancel }) {
  const list = currentData[sectionKey] || [];
  return (
    <div className="admin-content mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>{title}</h3>
        <button className="btn btn-success btn-sm" onClick={() => onAdd(sectionKey)}>Add</button>
      </div>
      <div className="admin-list">
        {list.map((item, index) => (
          <div key={`${sectionKey}-${index}`} className="admin-item mb-3 p-3">
            {editingId === `${sectionKey}-${index}` ? (
              <div className="edit-form">
                {sectionKey === 'skills' ? (
                  <>
                    <input className="form-control mb-2" value={editForm.value || ''} onChange={(e) => onInputChange(e, 'value')} />
                    <div>
                      <button className="btn btn-primary btn-sm me-2" onClick={() => onSaveEdit(sectionKey, index)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    {Object.keys(item).map((key) => (
                      <div key={key} className="mb-2">
                        <label className="form-label text-capitalize">{key}</label>
                          {key === 'description' ? (
                            <textarea className="form-control" rows="3" value={editForm[key] || ''} onChange={(e) => onInputChange(e, key)} />
                          ) : key === 'years' ? (
                            <input className="form-control" type="text" value={editForm[key] || ''} onChange={(e) => onInputChange(e, key)} />
                          ) : (
                            <input className="form-control" type={key.includes('year') || key === 'level' ? 'number' : 'text'} value={editForm[key] || ''} onChange={(e) => onInputChange(e, key)} />
                          )}
                      </div>
                    ))}
                    <div>
                      <button className="btn btn-primary btn-sm me-2" onClick={() => onSaveEdit(sectionKey, index)}>Save</button>
                      <button className="btn btn-secondary btn-sm" onClick={onCancel}>Cancel</button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="d-flex justify-content-between align-items-start">
                <div className="flex-grow-1">
                  {sectionKey === 'skills' ? (
                    <p className="mb-0">{item}</p>
                  ) : (
                    <>
                      <h5 className="mb-2">{item.title || item.company || item.school || item.language}</h5>
                      <p className="text-muted mb-1">{item.description || item.position || item.years || `Level: ${item.level}`}</p>
                      {item.link && <small className="text-secondary">{item.link}</small>}
                    </>
                  )}
                </div>
                <div className="btn-group-sm">
                  <button className="btn btn-warning btn-sm me-1" onClick={() => onEdit(sectionKey, item, index)}><i className="fa fa-edit"></i></button>
                  <button className="btn btn-danger btn-sm" onClick={() => onDelete(sectionKey, index)}><i className="fa fa-trash"></i></button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
