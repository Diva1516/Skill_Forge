import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Mic, Play, Square, Video, User } from 'lucide-react';
import { ProgressContext } from '../context/ProgressContext';
import './Interview.css';

const interviewModes = [
  { id: 'tech-react', title: 'React Technical Interview', role: 'React Developer', duration: '30 mins' },
  { id: 'tech-java', title: 'Java Backend Interview', role: 'Java Developer', duration: '45 mins' },
  { id: 'hr-general', title: 'HR & Behavioral', role: 'Any Role', duration: '20 mins' },
];

const mockQuestions = [
  "Tell me about a time you faced a difficult technical challenge.",
  "How does React's reconciliation algorithm work under the hood?",
  "Can you explain the difference between useMemo and useCallback?",
  "What is your approach to testing frontend applications?"
];

const Interview = () => {
  const navigate = useNavigate();
  const { recordInterview } = useContext(ProgressContext);
  const [activeMode, setActiveMode] = useState(null);
  const [isStarted, setIsStarted] = useState(false);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const startInterview = (mode) => {
    setActiveMode(mode);
    setIsStarted(true);
    setCurrentQIndex(0);
    setFeedback(null);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would interface with MediaRecorder API
  };

  const nextQuestion = () => {
    if (isRecording) setIsRecording(false);
    
    if (currentQIndex < mockQuestions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
    } else {
      finishInterview();
    }
  };

  const finishInterview = () => {
    setIsStarted(false);
    setFeedback({
      score: 85,
      strengths: ['Clear communication', 'Deep technical knowledge of React hooks'],
      improvements: ['Could elaborate more on testing strategies']
    });
    recordInterview({
      mode: activeMode.title,
      score: 85,
      date: new Date().toISOString()
    });
  };

  if (feedback) {
    return (
      <div className="interview-feedback fade-in">
        <div className="feedback-card">
          <h2>Interview Completed</h2>
          <div className="score-circle">
            <span>{feedback.score}/100</span>
          </div>
          <div className="feedback-section">
            <h3>Strengths</h3>
            <ul>
              {feedback.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <div className="feedback-section">
            <h3>Areas for Improvement</h3>
            <ul>
              {feedback.improvements.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
          </div>
          <button className="btn-primary" onClick={() => setFeedback(null)}>Back to Modes</button>
        </div>
      </div>
    );
  }

  if (isStarted) {
    return (
      <div className="interview-room fade-in">
        <div className="video-container">
          <div className="video-feed interviewer-feed">
            <User size={64} className="feed-icon" />
            <span className="feed-label">AI Interviewer</span>
            <div className="speaking-indicator"></div>
          </div>
          <div className="video-feed user-feed">
            <User size={48} className="feed-icon" />
            <span className="feed-label">You</span>
            {isRecording && <div className="recording-indicator">REC</div>}
          </div>
        </div>

        <div className="interview-controls-panel">
          <div className="current-question-box">
            <span className="q-label">Question {currentQIndex + 1} of {mockQuestions.length}</span>
            <h3>{mockQuestions[currentQIndex]}</h3>
          </div>
          
          <div className="action-buttons">
            <button 
              className={`record-btn ${isRecording ? 'recording' : ''}`}
              onClick={toggleRecording}
            >
              {isRecording ? <Square size={24} fill="currentColor" /> : <Mic size={24} />}
            </button>
            <button className="btn-primary" onClick={nextQuestion}>
              {currentQIndex === mockQuestions.length - 1 ? 'Finish' : 'Next Question'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="interview-page fade-in">
      <div className="page-header">
        <h1>Mock Interviews</h1>
        <p>Practice with our AI interviewer to ace your next round.</p>
      </div>

      <div className="interview-modes-grid">
        {interviewModes.map(mode => (
          <div key={mode.id} className="mode-card">
            <div className="mode-icon-wrapper">
              <Video size={24} />
            </div>
            <h3>{mode.title}</h3>
            <div className="mode-details">
              <span><User size={16} /> {mode.role}</span>
              <span><Play size={16} /> {mode.duration}</span>
            </div>
            <button className="btn-primary w-full mt-4" onClick={() => startInterview(mode)}>
              Start Session
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interview;
