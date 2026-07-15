import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Terminal, Target, Trophy, ArrowRight } from 'lucide-react';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="logo">
          <Code className="logo-icon" />
          <span className="logo-text">SkillForge</span>
        </div>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <Link to="/login" className="btn-secondary">Sign In</Link>
          <Link to="/login" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Master the Code.<br />
              <span className="text-gradient">Ace the Interview.</span>
            </h1>
            <p className="hero-subtitle">
              The premium platform for developers to learn modern technologies, practice coding challenges, and prepare for high-stakes technical interviews.
            </p>
            <div className="hero-actions">
              <Link to="/login" className="btn-primary btn-lg">
                Start Learning For Free <ArrowRight size={20} />
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-value">50+</span>
                <span className="stat-label">Learning Roadmaps</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">10k+</span>
                <span className="stat-label">Practice Questions</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">2M+</span>
                <span className="stat-label">Developers Hired</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="mockup-window">
              <div className="mockup-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="mockup-body">
                <code>
                  <span className="keyword">const</span> <span className="variable">developer</span> = <span className="keyword">new</span> <span className="class">SkillForgeUser</span>();<br/>
                  <span className="keyword">await</span> developer.learn(<span className="string">'React'</span>);<br/>
                  <span className="keyword">await</span> developer.practice(<span className="string">'Interviews'</span>);<br/>
                  developer.getHired(); <span className="comment">// Success!</span>
                </code>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="features">
          <h2 className="section-title">Everything you need to succeed</h2>
          <div className="features-grid">
            <div className="feature-card">
              <Terminal className="feature-icon" />
              <h3>Interactive Roadmaps</h3>
              <p>Step-by-step guidance to master Frontend, Backend, or Full Stack development.</p>
            </div>
            <div className="feature-card">
              <Target className="feature-icon" />
              <h3>Daily Challenges</h3>
              <p>Build your coding streak with bite-sized daily algorithmic and UI challenges.</p>
            </div>
            <div className="feature-card">
              <Trophy className="feature-icon" />
              <h3>Mock Interviews</h3>
              <p>Simulated technical and HR interviews to prepare you for the real deal.</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <p>&copy; 2026 SkillForge. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
