import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Flame, Trophy, Target, BookOpen, Code, Play, Check } from 'lucide-react';
import { ProgressContext } from '../context/ProgressContext';
import { AuthContext } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { progress } = useContext(ProgressContext);
  const { user } = useContext(AuthContext);

  // Mock data for current roadmap and daily challenge (will be fetched from data layer later)
  const currentRoadmap = {
    title: 'Frontend Developer',
    progress: 35,
    nextTopic: 'React Hooks Deep Dive'
  };

  const dailyChallenge = {
    title: 'Two Sum in JavaScript',
    difficulty: 'Easy',
    completed: progress.dailyChallenges.includes(new Date().toDateString())
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header fade-in">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name || 'Developer'}! 👋</h1>
          <p>Ready to level up your skills today?</p>
        </div>
      </header>

      <div className="stats-grid fade-in">
        <div className="stat-card">
          <div className="stat-icon-wrapper streak">
            <Flame size={24} />
          </div>
          <div className="stat-info">
            <h3>{progress.streak} Days</h3>
            <p>Learning Streak</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper xp">
            <Trophy size={24} />
          </div>
          <div className="stat-info">
            <h3>{progress.xp} XP</h3>
            <p>Level {progress.level}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon-wrapper topics">
            <BookOpen size={24} />
          </div>
          <div className="stat-info">
            <h3>{progress.completedTopics.length}</h3>
            <p>Topics Completed</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content fade-in">
        <div className="main-column">
          <section className="dashboard-section">
            <div className="section-header">
              <h2>Current Roadmap</h2>
              <Link to="/app/roadmaps" className="text-link">View all</Link>
            </div>
            <div className="roadmap-card">
              <div className="roadmap-info">
                <h3>{currentRoadmap.title}</h3>
                <div className="progress-container">
                  <div className="progress-bar-bg">
                    <div 
                      className="progress-bar-fill" 
                      style={{ width: `${currentRoadmap.progress}%` }}
                    ></div>
                  </div>
                  <span className="progress-text">{currentRoadmap.progress}% Complete</span>
                </div>
              </div>
              <div className="roadmap-action">
                <p>Up next: <strong>{currentRoadmap.nextTopic}</strong></p>
                <button className="btn-primary">Continue Learning <Play size={16} /></button>
              </div>
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <h2>Today's Goals</h2>
              <Link to="/app/goals" className="text-link">Manage Goals</Link>
            </div>
            <div className="goals-list">
              {progress.goals.length > 0 ? (
                progress.goals.slice(0,3).map(goal => (
                  <div key={goal.id} className="goal-item">
                    <div className={`goal-checkbox ${goal.completed ? 'completed' : ''}`}>
                      {goal.completed && <Check size={14} />}
                    </div>
                    <span className={goal.completed ? 'completed-text' : ''}>{goal.title}</span>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <Target size={32} className="empty-icon" />
                  <p>No goals set for today.</p>
                  <Link to="/app/goals" className="btn-secondary btn-sm">Create Goal</Link>
                </div>
              )}
            </div>
          </section>
        </div>

        <div className="side-column">
          <section className="dashboard-section challenge-section">
            <div className="section-header">
              <h2>Daily Challenge</h2>
            </div>
            <div className={`challenge-card ${dailyChallenge.completed ? 'completed' : ''}`}>
              <div className="challenge-header">
                <Code size={20} className="challenge-icon" />
                <span className={`difficulty-badge ${dailyChallenge.difficulty.toLowerCase()}`}>
                  {dailyChallenge.difficulty}
                </span>
              </div>
              <h3>{dailyChallenge.title}</h3>
              {dailyChallenge.completed ? (
                <div className="challenge-success">
                  <Trophy size={16} /> Completed! +50 XP
                </div>
              ) : (
                <Link to="/app/daily" className="btn-primary w-full justify-center">Solve Challenge</Link>
              )}
            </div>
          </section>

          <section className="dashboard-section">
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-timeline">
              {progress.quizHistory.length === 0 && progress.completedTopics.length === 0 ? (
                <p className="text-muted text-sm">No recent activity. Start learning to see your progress here!</p>
              ) : (
                <div className="timeline-items">
                  {/* Mock rendering of activity. In real app, we'd interleave and sort history arrays */}
                  {progress.quizHistory.slice(0,2).map((q, i) => (
                    <div key={i} className="timeline-item">
                      <div className="timeline-dot bg-blue"></div>
                      <div className="timeline-content">
                        <p>Completed Quiz: <strong>{q.topic}</strong></p>
                        <span className="text-sm text-muted">Score: {q.score}%</span>
                      </div>
                    </div>
                  ))}
                  {progress.completedTopics.slice(0,2).map((t, i) => (
                    <div key={i} className="timeline-item">
                      <div className="timeline-dot bg-green"></div>
                      <div className="timeline-content">
                        <p>Finished Topic: <strong>{t}</strong></p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
