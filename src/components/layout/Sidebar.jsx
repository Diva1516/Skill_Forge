import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Map, 
  Compass, 
  BookOpen, 
  MessageSquare, 
  Layers, 
  Target, 
  BarChart2, 
  Award, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Code
} from 'lucide-react';
import './Sidebar.css';

const navItems = [
  { path: '/app', label: 'Dashboard', icon: Home },
  { path: '/app/roadmaps', label: 'Roadmaps', icon: Map },
  { path: '/app/explore', label: 'Explore Skills', icon: Compass },
  { path: '/app/quiz', label: 'Quizzes', icon: BookOpen },
  { path: '/app/interview', label: 'Interviews', icon: MessageSquare },
  { path: '/app/flashcards', label: 'Flashcards', icon: Layers },
  { path: '/app/daily', label: 'Daily Challenge', icon: Code },
  { path: '/app/goals', label: 'Goals', icon: Target },
  { path: '/app/analytics', label: 'Analytics', icon: BarChart2 },
  { path: '/app/achievements', label: 'Achievements', icon: Award },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <Code className="logo-icon" />
          {!isCollapsed && <span className="logo-text">SkillForge</span>}
        </div>
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label="Toggle Sidebar"
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink 
              key={item.path} 
              to={item.path} 
              end={item.path === '/app'}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" size={20} />
              {!isCollapsed && <span className="nav-label">{item.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/app/settings" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          <Settings className="nav-icon" size={20} />
          {!isCollapsed && <span className="nav-label">Settings</span>}
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
