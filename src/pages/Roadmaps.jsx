import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Map, Lock, Unlock, CheckCircle, ChevronRight, Play } from 'lucide-react';
import { roadmaps } from '../data/roadmapsData';
import { ProgressContext } from '../context/ProgressContext';
import { NotificationContext } from '../context/NotificationContext';
import './Roadmaps.css';

const Roadmaps = () => {
  const navigate = useNavigate();
  const [activeRoadmap, setActiveRoadmap] = useState(roadmaps[0]);
  const { progress, completeTopic } = useContext(ProgressContext);
  const { addNotification } = useContext(NotificationContext);

  const getStatusIcon = (status) => {
    switch(status) {
      case 'completed': return <CheckCircle className="status-icon completed" size={20} />;
      case 'available': return <Unlock className="status-icon available" size={20} />;
      case 'locked': return <Lock className="status-icon locked" size={20} />;
      default: return null;
    }
  };

  const handleStartLearning = (module) => {
    if (!progress.completedTopics.includes(module.id)) {
      completeTopic(module.id);
      addNotification({
        title: 'Module Completed!',
        message: `You earned 50 XP for completing ${module.title}.`
      });
    }
    // Simulate navigating to the learning material
    navigate('/app/quiz');
  };

  return (
    <div className="roadmaps-page fade-in">
      <div className="page-header">
        <h1>Learning Roadmaps</h1>
        <p>Structured paths to master modern development.</p>
      </div>

      <div className="roadmaps-container">
        <aside className="roadmaps-sidebar">
          <h3>Available Paths</h3>
          <div className="roadmap-tabs">
            {roadmaps.map(rm => (
              <button 
                key={rm.id}
                className={`roadmap-tab ${activeRoadmap.id === rm.id ? 'active' : ''}`}
                onClick={() => setActiveRoadmap(rm)}
              >
                <Map size={18} />
                <span>{rm.title}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="roadmap-content">
          <div className="roadmap-header">
            <h2>{activeRoadmap.title}</h2>
            <p>{activeRoadmap.description}</p>
          </div>

          <div className="roadmap-timeline">
            {activeRoadmap.modules.map((module, index) => {
              // Compute dynamic status based on progress
              const isCompleted = progress.completedTopics.includes(module.id) || module.status === 'completed';
              const isAvailable = isCompleted || index === 0 || progress.completedTopics.includes(activeRoadmap.modules[index - 1].id) || activeRoadmap.modules[index - 1].status === 'completed';
              const currentStatus = isCompleted ? 'completed' : (isAvailable ? 'available' : 'locked');

              return (
                <div key={module.id} className={`roadmap-module ${currentStatus}`}>
                  <div className="module-connector">
                    <div className={`connector-dot ${currentStatus}`}>
                      {getStatusIcon(currentStatus)}
                    </div>
                    {index < activeRoadmap.modules.length - 1 && <div className={`connector-line ${currentStatus}`}></div>}
                  </div>
                  
                  <div className="module-card">
                    <div className="module-header">
                      <h3>{module.title}</h3>
                      <span className={`status-badge ${currentStatus}`}>
                        {currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1)}
                      </span>
                    </div>
                    <ul className="module-topics">
                      {module.topics.map((topic, i) => (
                        <li key={i}>
                          <ChevronRight size={16} className="topic-icon" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                    {currentStatus !== 'locked' && (
                      <button 
                        className={`btn-primary btn-sm mt-3 ${currentStatus === 'completed' ? 'btn-outline' : ''}`}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        onClick={() => handleStartLearning(module)}
                      >
                        {currentStatus === 'completed' ? 'Review Module' : 'Start Learning'}
                        {currentStatus !== 'completed' && <Play size={14} />}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Roadmaps;
