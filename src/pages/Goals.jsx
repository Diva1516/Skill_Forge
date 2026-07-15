import React, { useState, useContext } from 'react';
import { Target, Plus, Trash2, CheckCircle, Circle } from 'lucide-react';
import { ProgressContext } from '../context/ProgressContext';
import './Goals.css';

const Goals = () => {
  const { progress, addGoal, toggleGoal, deleteGoal } = useContext(ProgressContext);
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;
    
    addGoal({ title: newGoalTitle });
    setNewGoalTitle('');
    setIsAdding(false);
  };

  const completedCount = progress.goals.filter(g => g.completed).length;
  const totalCount = progress.goals.length;
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className="goals-page fade-in">
      <div className="page-header">
        <h1>Learning Goals</h1>
        <p>Set and track your daily or long-term objectives.</p>
      </div>

      <div className="goals-overview">
        <div className="goals-progress-card">
          <div className="progress-info">
            <div>
              <h3>Overall Progress</h3>
              <p>{completedCount} of {totalCount} goals completed</p>
            </div>
            <h2>{progressPercent}%</h2>
          </div>
          <div className="progress-bar-bg">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
        <button className="btn-primary add-goal-btn" onClick={() => setIsAdding(true)}>
          <Plus size={20} /> New Goal
        </button>
      </div>

      {isAdding && (
        <form className="add-goal-form fade-in" onSubmit={handleAddGoal}>
          <input
            type="text"
            placeholder="e.g. Complete React Router module..."
            value={newGoalTitle}
            onChange={(e) => setNewGoalTitle(e.target.value)}
            autoFocus
          />
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={() => setIsAdding(false)}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={!newGoalTitle.trim()}>Save Goal</button>
          </div>
        </form>
      )}

      <div className="goals-list-container">
        {progress.goals.length === 0 ? (
          <div className="empty-state">
            <Target size={48} className="empty-icon" />
            <h3>No goals yet</h3>
            <p>Set your first goal to start tracking your progress.</p>
          </div>
        ) : (
          <div className="goals-grid">
            {progress.goals.map(goal => (
              <div key={goal.id} className={`goal-card ${goal.completed ? 'completed' : ''}`}>
                <button 
                  className="goal-toggle"
                  onClick={() => toggleGoal(goal.id)}
                  aria-label="Toggle goal status"
                >
                  {goal.completed ? (
                    <CheckCircle className="icon-completed" size={24} />
                  ) : (
                    <Circle className="icon-pending" size={24} />
                  )}
                </button>
                <div className="goal-content">
                  <h3 className={goal.completed ? 'text-strikethrough' : ''}>{goal.title}</h3>
                </div>
                <button 
                  className="goal-delete"
                  onClick={() => deleteGoal(goal.id)}
                  aria-label="Delete goal"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Goals;
