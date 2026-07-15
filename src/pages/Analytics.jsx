import React, { useContext } from 'react';
import { BarChart2, TrendingUp, Target, Activity } from 'lucide-react';
import { ProgressContext } from '../context/ProgressContext';
import './Analytics.css';

const Analytics = () => {
  const { progress } = useContext(ProgressContext);

  // Mock data for charts
  const activityData = [
    { day: 'Mon', value: 45 },
    { day: 'Tue', value: 80 },
    { day: 'Wed', value: 30 },
    { day: 'Thu', value: 90 },
    { day: 'Fri', value: 100 },
    { day: 'Sat', value: 60 },
    { day: 'Sun', value: 75 },
  ];

  const skillData = [
    { name: 'React', level: 85 },
    { name: 'JavaScript', level: 90 },
    { name: 'CSS', level: 70 },
    { name: 'Java', level: 40 },
    { name: 'Spring', level: 30 },
  ];

  return (
    <div className="analytics-page fade-in">
      <div className="page-header">
        <h1>Analytics Overview</h1>
        <p>Track your learning progress and performance.</p>
      </div>

      <div className="analytics-grid">
        <div className="chart-card activity-chart">
          <div className="card-header">
            <h3><Activity size={20} /> Weekly Activity</h3>
          </div>
          <div className="bar-chart">
            {activityData.map((data, index) => (
              <div key={index} className="bar-wrapper">
                <div 
                  className="bar" 
                  style={{ height: `${data.value}%` }}
                  title={`${data.value} mins`}
                ></div>
                <span className="bar-label">{data.day}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card skills-chart">
          <div className="card-header">
            <h3><TrendingUp size={20} /> Skill Distribution</h3>
          </div>
          <div className="progress-list">
            {skillData.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}%</span>
                </div>
                <div className="skill-bar-bg">
                  <div 
                    className="skill-bar-fill"
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chart-card summary-card">
          <div className="card-header">
            <h3><BarChart2 size={20} /> Performance Summary</h3>
          </div>
          <div className="summary-stats">
            <div className="summary-stat">
              <span className="stat-label">Total Time</span>
              <span className="stat-value">24h 30m</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Avg. Quiz Score</span>
              <span className="stat-value">
                {progress.quizHistory.length > 0 
                  ? Math.round(progress.quizHistory.reduce((a,b)=>a+b.score, 0)/progress.quizHistory.length) 
                  : 0}%
              </span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Completed Modules</span>
              <span className="stat-value">{progress.completedTopics.length}</span>
            </div>
            <div className="summary-stat">
              <span className="stat-label">Current Streak</span>
              <span className="stat-value">{progress.streak} days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
