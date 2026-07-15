import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, BookOpen, Star, X, Map, Play, Layers } from 'lucide-react';
import { technologies } from '../data/roadmapsData';
import './Explore.css';

const Explore = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState(null);

  const categories = ['All', ...new Set(technologies.map(t => t.category))];

  const filteredTech = technologies.filter(tech => {
    const matchesSearch = tech.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tech.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="explore-page fade-in">
      <div className="page-header">
        <h1>Explore Technologies</h1>
        <p>Discover and learn new tools, languages, and frameworks.</p>
      </div>

      <div className="explore-controls">
        <div className="search-box">
          <Search className="search-icon" size={20} />
          <input 
            type="text" 
            placeholder="Search technologies..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filters">
          <Filter size={18} className="text-secondary" />
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="tech-grid">
        {filteredTech.map(tech => (
          <div key={tech.id} className="tech-card">
            <div className="tech-header">
              <h3>{tech.name}</h3>
              {tech.popular && <Star size={16} className="popular-icon" fill="currentColor" />}
            </div>
            <div className="tech-badges">
              <span className="badge category">{tech.category}</span>
              <span className={`badge level ${tech.level.toLowerCase()}`}>{tech.level}</span>
            </div>
            <p className="tech-desc">Master {tech.name} with our interactive guides and practical challenges.</p>
            <div className="tech-actions">
              <button 
                className="btn-primary w-full justify-center"
                onClick={() => setSelectedTech(tech)}
              >
                <BookOpen size={16} /> View Details
              </button>
            </div>
          </div>
        ))}
        {filteredTech.length === 0 && (
          <div className="no-results">
            <p>No technologies found matching your criteria.</p>
          </div>
        )}
      </div>

      {selectedTech && (
        <div className="modal-overlay fade-in" onClick={() => setSelectedTech(null)}>
          <div className="modal-content tech-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedTech(null)}>
              <X size={24} />
            </button>
            
            <div className="modal-header">
              <h2>{selectedTech.name}</h2>
              <div className="tech-badges">
                <span className="badge category">{selectedTech.category}</span>
                <span className={`badge level ${selectedTech.level.toLowerCase()}`}>{selectedTech.level}</span>
                {selectedTech.popular && <span className="badge popular"><Star size={12} fill="currentColor"/> Popular</span>}
              </div>
            </div>

            <div className="modal-body">
              <p className="tech-full-desc">
                {selectedTech.name} is a powerful technology used by developers worldwide. In this module, you will learn the core concepts, advanced techniques, and best practices needed to master {selectedTech.name}.
              </p>
              
              <div className="tech-stats">
                <div className="tech-stat">
                  <span className="stat-value">12</span>
                  <span className="stat-label">Modules</span>
                </div>
                <div className="tech-stat">
                  <span className="stat-value">45</span>
                  <span className="stat-label">Exercises</span>
                </div>
                <div className="tech-stat">
                  <span className="stat-value">15h</span>
                  <span className="stat-label">Est. Time</span>
                </div>
              </div>

              <h3>Recommended Practice</h3>
              <div className="practice-links">
                <button className="btn-secondary" onClick={() => navigate('/app/quiz')}>
                  <BookOpen size={16} /> Take Quiz
                </button>
                <button className="btn-secondary" onClick={() => navigate('/app/flashcards')}>
                  <Layers size={16} /> Flashcards
                </button>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-primary w-full justify-center" onClick={() => navigate('/app/roadmaps')}>
                <Map size={18} /> Start Learning Path
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
