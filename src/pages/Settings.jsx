import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings as SettingsIcon, Download, Upload, Trash2, RotateCcw } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { ProgressContext } from '../context/ProgressContext';
import './Settings.css';

const Settings = () => {
  const navigate = useNavigate();
  const { user, updateProfile, logout } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { progress, setProgress } = useContext(ProgressContext);

  const [name, setName] = useState(user?.name || '');
  const [saveMsg, setSaveMsg] = useState('');

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ name });
    setSaveMsg('Profile saved successfully.');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleExportData = () => {
    const data = {
      user,
      progress
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "skillforge_data.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleImportData = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = e => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (importedData.progress) {
          setProgress(importedData.progress);
        }
        if (importedData.user) {
          updateProfile(importedData.user);
        }
        alert('Data imported successfully!');
      } catch (err) {
        alert('Invalid JSON file.');
      }
    };
  };

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset all your learning progress? This cannot be undone.")) {
      localStorage.removeItem('skillforge_progress');
      window.location.reload();
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure you want to delete your account and all local data?")) {
      localStorage.removeItem('skillforge_user');
      localStorage.removeItem('skillforge_progress');
      logout();
      navigate('/');
    }
  };

  return (
    <div className="settings-page fade-in">
      <div className="page-header">
        <h1>Settings & Profile</h1>
        <p>Manage your account, preferences, and data.</p>
      </div>

      <div className="settings-grid">
        <div className="settings-section">
          <h2><User size={20} /> Profile Information</h2>
          <form onSubmit={handleSaveProfile} className="settings-form">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name} 
                onChange={e => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" value={user?.email} disabled />
              <small>Email cannot be changed in this demo.</small>
            </div>
            <button type="submit" className="btn-primary">Save Changes</button>
            {saveMsg && <span className="save-msg">{saveMsg}</span>}
          </form>
        </div>

        <div className="settings-section">
          <h2><SettingsIcon size={20} /> Preferences</h2>
          <div className="preferences-group">
            <div className="pref-row">
              <div>
                <h4>App Theme</h4>
                <p>Toggle between light and dark mode</p>
              </div>
              <button className="btn-secondary" onClick={toggleTheme}>
                {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              </button>
            </div>
          </div>
        </div>

        <div className="settings-section data-section">
          <h2><Download size={20} /> Data Management</h2>
          <p className="section-desc">SkillForge stores all your data locally in your browser. You can export it to back it up or move to another device.</p>
          
          <div className="data-actions">
            <button className="btn-secondary" onClick={handleExportData}>
              <Download size={18} /> Export Data (JSON)
            </button>
            
            <label className="btn-secondary file-upload">
              <Upload size={18} /> Import Data
              <input type="file" accept=".json" onChange={handleImportData} hidden />
            </label>
          </div>

          <div className="danger-zone">
            <h3>Danger Zone</h3>
            <div className="danger-actions">
              <button className="btn-danger-outline" onClick={handleResetProgress}>
                <RotateCcw size={18} /> Reset Progress
              </button>
              <button className="btn-danger" onClick={handleDeleteAccount}>
                <Trash2 size={18} /> Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
