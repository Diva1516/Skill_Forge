import React, { useState, useContext } from 'react';
import { Code as CodeIcon, Lightbulb, Play, CheckCircle } from 'lucide-react';
import { dailyChallengeData } from '../data/practiceData';
import { ProgressContext } from '../context/ProgressContext';
import './DailyChallenge.css';

const DailyChallenge = () => {
  const { progress, setProgress } = useContext(ProgressContext);
  const [code, setCode] = useState(dailyChallengeData.starterCode);
  const [showHint, setShowHint] = useState(false);
  const [output, setOutput] = useState('');
  
  const todayStr = new Date().toDateString();
  const isCompleted = progress.dailyChallenges.includes(todayStr);

  const handleRunCode = () => {
    // Simulate code execution
    setTimeout(() => {
      if (code.includes('return') && code.length > 50) {
        setOutput('Test Case 1: Passed\nTest Case 2: Passed\nAll tests passed successfully!');
      } else {
        setOutput('Test Case 1: Failed\nOutput: undefined\nExpected: [0, 1]');
      }
    }, 800);
  };

  const handleSubmit = () => {
    if (output.includes('All tests passed')) {
      setProgress(prev => ({
        ...prev,
        dailyChallenges: [...prev.dailyChallenges, todayStr],
        xp: prev.xp + 50
      }));
    } else {
      alert('Please pass all tests before submitting!');
    }
  };

  return (
    <div className="daily-challenge-page fade-in">
      <div className="page-header">
        <h1>Daily Challenge</h1>
        <p>Solve a new coding problem every day to build your streak.</p>
      </div>

      <div className="challenge-layout">
        <div className="challenge-problem">
          <div className="problem-header">
            <h2>{dailyChallengeData.title}</h2>
            <span className={`difficulty-badge ${dailyChallengeData.difficulty.toLowerCase()}`}>
              {dailyChallengeData.difficulty}
            </span>
          </div>

          <div className="problem-description">
            <p>{dailyChallengeData.description}</p>
          </div>

          {showHint ? (
            <div className="hint-box">
              <h4><Lightbulb size={16} /> Hint</h4>
              <p>{dailyChallengeData.hints[0]}</p>
            </div>
          ) : (
            <button className="btn-secondary btn-sm mb-4" onClick={() => setShowHint(true)}>
              <Lightbulb size={16} /> Show Hint
            </button>
          )}
        </div>

        <div className="challenge-editor">
          <div className="editor-header">
            <CodeIcon size={18} />
            <span>solution.js</span>
            {isCompleted && (
              <span className="completed-badge">
                <CheckCircle size={16} /> Completed
              </span>
            )}
          </div>
          <textarea
            className="code-textarea"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            disabled={isCompleted}
          />
          
          <div className="editor-actions">
            <button className="btn-secondary" onClick={handleRunCode} disabled={isCompleted}>
              <Play size={18} /> Run Code
            </button>
            <button 
              className="btn-primary" 
              onClick={handleSubmit}
              disabled={isCompleted || !output.includes('All tests passed')}
            >
              Submit Solution
            </button>
          </div>

          {output && (
            <div className="output-console fade-in">
              <div className="console-header">Console Output</div>
              <pre className={output.includes('Failed') ? 'error' : 'success'}>
                {output}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DailyChallenge;
