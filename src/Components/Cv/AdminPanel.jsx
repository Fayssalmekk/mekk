import React, { useState, useEffect } from 'react';
import './AdminPanel.css';
import data from './data';
import { getCVData, saveCVData } from '../../services/firebaseService';

// Note: For production, this should be validated server-side
// eslint-disable-next-line no-process-env
const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD || "admin123";

const AdminPanel = ({ onClose, data: initialData = null, onDataUpdate = () => {}, fullpage = false }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [currentData, setCurrentData] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from Firebase
    const loadData = async () => {
      try {
        const firebaseData = await getCVData();
        if (firebaseData) {
          setCurrentData(firebaseData);
        } else if (initialData && Object.keys(initialData).length > 0) {
          setCurrentData(initialData);
        } else {
          setCurrentData(data);
        }
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to local data
        if (initialData && Object.keys(initialData).length > 0) {
          setCurrentData(initialData);
        } else {
          setCurrentData(data);
        }
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [initialData]);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setPassword('');
    } else {
      alert('Incorrect password!');
      setPassword('');
    }
  };

  const saveData = async (updatedData) => {
    setCurrentData(updatedData);
    try {
      const success = await saveCVData(updatedData);
      if (success) {
        if (typeof onDataUpdate === 'function') {
          onDataUpdate(updatedData);
        }
      } else {
        alert('Error saving data. Please try again.');
      }
    } catch (error) {
      console.error('Error saving data:', error);
      alert('Error saving data. Please try again.');
    }
  };

  const handleEdit = (item, index) => {
    setEditingId(`${activeTab}-${index}`);
    setEditForm({ ...item });
  };

  const handleSaveEdit = (index) => {
    const updated = { ...currentData };
    updated[activeTab][index] = editForm;
    saveData(updated);
    setEditingId(null);
    setEditForm({});
  };


  const handleDeleteItem = (index) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updated = { ...currentData };
      updated[activeTab].splice(index, 1);
      saveData(updated);
    }
  };

  const handleAddItem = () => {
    const updated = { ...currentData };
    let newItem = {};

    switch (activeTab) {
      case 'projects':
        newItem = {
          id: Date.now(),
          title: 'New Project',
          description: 'Project description',
          link: 'https://example.com'
        };
        break;
      case 'experience':
        newItem = {
          id: Date.now(),
          company: 'Company Name',
          position: 'Position',
          startYear: new Date().getFullYear(),
          endYear: 'current',
          description: 'Job description',
          link: 'https://example.com'
        };
        break;
      case 'skills':
        newItem = 'New Skill';
        break;
      case 'education':
        newItem = {
          id: Date.now(),
          school: 'School Name',
          years: '2020 - 2024'
        };
        break;
      case 'languages':
        newItem = {
          id: Date.now(),
          language: 'Language',
          level: 3
        };
        break;
      default:
        break;
    }

    updated[activeTab].unshift(newItem);
    saveData(updated);
  };

  const handleInputChange = (e, key) => {
    setEditForm({
      ...editForm,
      [key]: e.target.value
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-login-overlay">
        <div className="admin-login-modal">
          <h2 className="mb-4">Admin Panel</h2>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Enter Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
              />
            </div>
            <button type="submit" className="btn btn-primary me-2">Login</button>
            <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          </form>
        </div>
      </div>
    );
  }

  if (!currentData || loading) {
    return <div className="text-center p-5">Loading...</div>;
  }

  const renderContent = () => {
    if (activeTab === 'basic') {
      return (
        <div className="admin-content">
          <h3>Basic Information</h3>
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                value={currentData.name}
                onChange={(e) => saveData({ ...currentData, name: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={currentData.title}
                onChange={(e) => saveData({ ...currentData, title: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">About</label>
              <textarea
                className="form-control"
                rows="4"
                value={currentData.about}
                onChange={(e) => saveData({ ...currentData, about: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                value={currentData.location}
                onChange={(e) => saveData({ ...currentData, location: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={currentData.email}
                onChange={(e) => saveData({ ...currentData, email: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone</label>
              <input
                type="tel"
                className="form-control"
                value={currentData.phone}
                onChange={(e) => saveData({ ...currentData, phone: e.target.value })}
              />
            </div>
          </form>
        </div>
      );
    }

    if (activeTab === 'projects' || activeTab === 'experience' || activeTab === 'education' || activeTab === 'languages') {
      return (
        <div className="admin-content">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="text-capitalize">{activeTab}</h3>
            <button className="btn btn-success btn-sm" onClick={handleAddItem}>
              <i className="fa fa-plus"></i> Add {activeTab.slice(0, -1)}
            </button>
          </div>
          <div className="admin-list">
            {currentData[activeTab]?.map((item, index) => (
              <div key={index} className="admin-item mb-3 p-3 border rounded">
                {editingId === `${activeTab}-${index}` ? (
                  <div className="edit-form">
                    {activeTab === 'skills' ? (
                      <>
                        <input
                          type="text"
                          className="form-control mb-2"
                          value={editForm || ''}
                          onChange={(e) => setEditForm(e.target.value)}
                        />
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleSaveEdit(index)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        {Object.keys(item).map((key) => (
                          <div key={key} className="mb-2">
                            <label className="form-label text-capitalize">{key}</label>
                            {key === 'description' ? (
                              <textarea
                                className="form-control"
                                rows="3"
                                value={editForm[key] || ''}
                                onChange={(e) => handleInputChange(e, key)}
                              />
                            ) : (
                              <input
                                type={key.includes('year') || key === 'level' ? 'number' : 'text'}
                                className="form-control"
                                value={editForm[key] || ''}
                                onChange={(e) => handleInputChange(e, key)}
                              />
                            )}
                          </div>
                        ))}
                        <button
                          className="btn btn-primary btn-sm me-2"
                          onClick={() => handleSaveEdit(index)}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditingId(null)}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="d-flex justify-content-between align-items-start">
                    <div className="flex-grow-1">
                      {activeTab === 'skills' ? (
                        <p className="mb-0">{item}</p>
                      ) : (
                        <>
                          <h5 className="mb-2">
                            {item.title || item.company || item.school || item.language}
                          </h5>
                          <p className="text-muted mb-1">
                            {item.description || item.position || item.years || `Level: ${item.level}`}
                          </p>
                          {item.link && (
                            <small className="text-secondary">{item.link}</small>
                          )}
                        </>
                      )}
                    </div>
                    <div className="btn-group-sm">
                      <button
                        className="btn btn-warning btn-sm me-1"
                        onClick={() => handleEdit(item, index)}
                      >
                        <i className="fa fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteItem(index)}
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className={`admin-overlay ${fullpage ? 'fullpage' : ''}`}>
      <div className="admin-panel">
        <div className="admin-header">
          <h2>CV Admin Panel</h2>
          {fullpage ? (
            <a href="/about-me" className="btn btn-secondary btn-sm">Back to CV</a>
          ) : (
            <button className="btn-close" onClick={onClose}></button>
          )}
        </div>

        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'basic' ? 'active' : ''}`}
            onClick={() => setActiveTab('basic')}
          >
            Basic Info
          </button>
          <button
            className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
          <button
            className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            Education
          </button>
          <button
            className={`tab-btn ${activeTab === 'languages' ? 'active' : ''}`}
            onClick={() => setActiveTab('languages')}
          >
            Languages
          </button>
          <button
            className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`}
            onClick={() => setActiveTab('skills')}
          >
            Skills
          </button>
        </div>

        <div className="admin-body">
          {renderContent()}
        </div>

        <div className="admin-footer">
          {!fullpage && <button className="btn btn-secondary" onClick={onClose}>Close Admin Panel</button>}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
