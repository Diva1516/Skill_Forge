import React, { useContext } from 'react';
import { Award, Lock, Flame, Target, BookOpen, Code } from 'lucide-react';
import { ProgressContext } from '../context/ProgressContext';
import './Achievements.css';

const allAchievements = [
  { id: 'first_login', title: 'First Steps', description: 'Log in to SkillForge for the first time.', icon: Award, requirement: 1, type: 'login' },
  { id: 'streak_3', title: 'On Fire', description: 'Maintain a 3-day learning streak.', icon: Flame, requirement: 3, type: 'streak' },
  { id: 'streak_7', title: 'Unstoppable', description: 'Maintain a 7-day learning streak.', icon: Flame, requirement: 7, type: 'streak' },
  { id: 'goal_1', title: 'Goal Setter', description: 'Complete your first learning goal.', icon: Target, requirement: 1, type: 'goal' },
  { id: 'topic_5', title: 'Knowledge Seeker', description: 'Complete 5 learning topics.', icon: BookOpen, requirement: 5, type: 'topic' },
  { id: 'quiz_perfect', title: 'Flawless Victory', description: 'Score 100% on a quiz.', icon: Award, requirement: 100, type: 'quiz' },
  { id: 'challenge_1', title: 'Daily Coder', description: 'Complete your first daily challenge.', icon: Code, requirement: 1, type: 'challenge' },
];

const Achievements = () => {
  const { progress } = useContext(ProgressContext);

  const checkUnlocked = (ach) => {
    switch (ach.type) {
      case 'login': return true; // Assuming they are logged in if here
      case 'streak': return progress.streak >= ach.requirement;
      case 'goal': return progress.goals.filter(g => g.completed).length >= ach.requirement;
      case 'topic': return progress.completedTopics.length >= ach.requirement;
      case 'quiz': return progress.quizHistory.some(q => q.score >= ach.requirement);
      case 'challenge': return progress.dailyChallenges.length >= ach.requirement;
      default: return false;
    }
  };

  const unlockedCount = allAchievements.filter(a => checkUnlocked(a)).length;

  return (
    <div className="achievements-page fade-in">
      <div className="page-header">
        <h1>Achievements</h1>
        <p>Track your milestones and unlock badges as you progress.</p>
      </div>

      <div className="achievements-stats">
        <div className="stat-card">
          <div className="stat-info">
            <h3>{unlockedCount} / {allAchievements.length}</h3>
            <p>Achievements Unlocked</p>
          </div>
          <div className="stat-icon-wrapper topics">
            <Award size={24} />
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-info">
            <h3>Level {progress.level}</h3>
            <p>{progress.xp} Total XP</p>
          </div>
          <div className="stat-icon-wrapper xp">
            <Flame size={24} />
          </div>
        </div>
      </div>

      <div className="achievements-grid">
        {allAchievements.map(ach => {
          const isUnlocked = checkUnlocked(ach);
          const Icon = ach.icon;

          return (
            <div key={ach.id} className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}>
              <div className="achievement-icon-wrapper">
                {isUnlocked ? <Icon size={28} /> : <Lock size={28} />}
              </div>
              <div className="achievement-details">
                <h3>{ach.title}</h3>
                <p>{ach.description}</p>
                {isUnlocked ? (
                  <span className="status unlocked-status">Unlocked</span>
                ) : (
                  <span className="status locked-status">Locked</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Achievements;
