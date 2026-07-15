import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Server, Layout, Database, Check } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import './Onboarding.css';

const Onboarding = () => {
  const { user, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    role: '',
    experience: '',
    goal: ''
  });

  const handleComplete = () => {
    updateProfile({ preferences, onboarded: true });
    navigate('/app');
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-container">
        <div className="onboarding-progress">
          <div className="progress-bar" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>
        
        {step === 1 && (
          <div className="onboarding-step fade-in">
            <h2>What role are you aiming for?</h2>
            <p>We'll tailor your roadmaps and challenges accordingly.</p>
            <div className="options-grid">
              {[
                { id: 'frontend', icon: Layout, title: 'Frontend Developer' },
                { id: 'backend', icon: Server, title: 'Backend Developer' },
                { id: 'fullstack', icon: Code, title: 'Full Stack Developer' },
                { id: 'data', icon: Database, title: 'Data Engineer' }
              ].map(opt => (
                <button 
                  key={opt.id}
                  className={`option-card ${preferences.role === opt.id ? 'selected' : ''}`}
                  onClick={() => setPreferences({...preferences, role: opt.id})}
                >
                  <opt.icon className="option-icon" />
                  <span>{opt.title}</span>
                  {preferences.role === opt.id && <Check className="check-icon" />}
                </button>
              ))}
            </div>
            <button 
              className="btn-primary next-btn"
              disabled={!preferences.role}
              onClick={() => setStep(2)}
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="onboarding-step fade-in">
            <h2>What is your experience level?</h2>
            <div className="options-list">
              {['Beginner (0-1 years)', 'Intermediate (1-3 years)', 'Advanced (3+ years)'].map(exp => (
                <button
                  key={exp}
                  className={`option-row ${preferences.experience === exp ? 'selected' : ''}`}
                  onClick={() => setPreferences({...preferences, experience: exp})}
                >
                  <span>{exp}</span>
                  {preferences.experience === exp && <Check className="check-icon" />}
                </button>
              ))}
            </div>
            <div className="step-actions">
              <button className="btn-secondary" onClick={() => setStep(1)}>Back</button>
              <button 
                className="btn-primary"
                disabled={!preferences.experience}
                onClick={() => setStep(3)}
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="onboarding-step fade-in">
            <h2>What is your primary goal?</h2>
            <div className="options-list">
              {[
                'Prepare for job interviews',
                'Learn a new technology',
                'Build personal projects',
                'Improve my coding skills'
              ].map(goal => (
                <button
                  key={goal}
                  className={`option-row ${preferences.goal === goal ? 'selected' : ''}`}
                  onClick={() => setPreferences({...preferences, goal: goal})}
                >
                  <span>{goal}</span>
                  {preferences.goal === goal && <Check className="check-icon" />}
                </button>
              ))}
            </div>
            <div className="step-actions">
              <button className="btn-secondary" onClick={() => setStep(2)}>Back</button>
              <button 
                className="btn-primary"
                disabled={!preferences.goal}
                onClick={handleComplete}
              >
                Start Learning
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
