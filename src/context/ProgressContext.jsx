import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const ProgressContext = createContext();

const initialProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  lastActive: null,
  completedTopics: [],
  quizHistory: [],
  interviewHistory: [],
  achievements: [],
  goals: [],
  dailyChallenges: []
};

export const ProgressProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  
  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('skillforge_progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...initialProgress, ...parsed };
      } catch (e) {
        return initialProgress;
      }
    }
    return initialProgress;
  });

  useEffect(() => {
    localStorage.setItem('skillforge_progress', JSON.stringify(progress));
  }, [progress]);

  // Actions
  const addXP = (amount) => {
    setProgress(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 1000) + 1; // 1000 XP per level
      return { ...prev, xp: newXp, level: newLevel };
    });
  };

  const completeTopic = (topicId) => {
    setProgress(prev => {
      if (prev.completedTopics.includes(topicId)) return prev;
      return { ...prev, completedTopics: [...prev.completedTopics, topicId] };
    });
    addXP(50);
  };

  const recordQuiz = (quizResult) => {
    setProgress(prev => ({
      ...prev,
      quizHistory: [quizResult, ...prev.quizHistory]
    }));
    addXP(quizResult.score * 10);
  };

  const recordInterview = (interviewResult) => {
    setProgress(prev => ({
      ...prev,
      interviewHistory: [interviewResult, ...prev.interviewHistory]
    }));
    addXP(150);
  };

  const updateStreak = () => {
    const today = new Date().toDateString();
    setProgress(prev => {
      if (prev.lastActive === today) return prev; // Already active today
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      let newStreak = prev.streak;
      if (prev.lastActive === yesterday.toDateString()) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
      
      return { ...prev, streak: newStreak, lastActive: today };
    });
  };

  useEffect(() => {
    if (user) {
      updateStreak();
    }
  }, [user]);

  const addGoal = (goal) => {
    setProgress(prev => ({
      ...prev,
      goals: [...prev.goals, { ...goal, id: Date.now(), completed: false }]
    }));
  };

  const toggleGoal = (goalId) => {
    setProgress(prev => ({
      ...prev,
      goals: prev.goals.map(g => g.id === goalId ? { ...g, completed: !g.completed } : g)
    }));
  };
  
  const deleteGoal = (goalId) => {
    setProgress(prev => ({
      ...prev,
      goals: prev.goals.filter(g => g.id !== goalId)
    }));
  };

  return (
    <ProgressContext.Provider value={{ 
      progress, 
      setProgress,
      addXP, 
      completeTopic, 
      recordQuiz, 
      recordInterview,
      addGoal,
      toggleGoal,
      deleteGoal
    }}>
      {children}
    </ProgressContext.Provider>
  );
};
