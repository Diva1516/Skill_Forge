import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Map, Code, BookOpen, MessageSquare } from 'lucide-react';
import './CommandPalette.css';

const commands = [
  { id: '1', title: 'Dashboard', icon: Code, path: '/app' },
  { id: '2', title: 'Learning Roadmaps', icon: Map, path: '/app/roadmaps' },
  { id: '3', title: 'Quizzes', icon: BookOpen, path: '/app/quiz' },
  { id: '4', title: 'Interviews', icon: MessageSquare, path: '/app/interview' },
  { id: '5', title: 'Daily Challenge', icon: Code, path: '/app/daily' },
];

const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const filteredCommands = commands.filter(cmd => 
    cmd.title.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selectedCmd = filteredCommands[selectedIndex];
        if (selectedCmd) {
          navigate(selectedCmd.path);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="cmd-overlay" onClick={onClose}>
      <div className="cmd-modal" onClick={e => e.stopPropagation()}>
        <div className="cmd-header">
          <Search size={20} className="cmd-search-icon" />
          <input 
            ref={inputRef}
            className="cmd-input"
            placeholder="What do you want to learn today?"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
        </div>
        <div className="cmd-body">
          {filteredCommands.length > 0 ? (
            <ul className="cmd-list">
              {filteredCommands.map((cmd, idx) => {
                const Icon = cmd.icon;
                return (
                  <li 
                    key={cmd.id} 
                    className={`cmd-item ${idx === selectedIndex ? 'selected' : ''}`}
                    onClick={() => {
                      navigate(cmd.path);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <Icon size={18} className="cmd-item-icon" />
                    <span>{cmd.title}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="cmd-empty">No results found for "{query}"</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
