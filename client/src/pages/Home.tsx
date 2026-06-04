import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

import '@/styles/home.css'

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    participants: 320,
    dojos: 42,
    activeRings: 8,
    matchesToday: 156
  });

  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    // Simulate API call to fetch stats
    setTimeout(() => {    
      setStats({
        participants: 320,
        dojos: 42,      
        activeRings: 8,
        matchesToday: 156
      });
    }, 1000);
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">
            🥋 Live Tournament Experience
          </span>

          <h1 className="hero-title">
            Follow Every Match.
            Track Every Score.
            Never Miss A Tournament.
          </h1>

          <p className="hero-subtitle">
            A modern martial arts tournament dashboard designed for
            parents, coaches, athletes, and organizers.
            Follow live matches, brackets, schedules, and results
            from anywhere.
          </p>

          <div className="hero-actions">
            <Link
              to="/tournament-dashboard"
              className="btn btn-primary btn-large"
            >
              View Live Tournament
            </Link>

            <Link
              to="/brackets"
              className="btn btn-outline btn-large"
            >
              Explore Brackets
            </Link>
          </div>
        </div>

        <div className="hero-image">
          <img
            src="/images/karate-arena.jpg"
            alt="Karate Tournament Arena"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{stats.participants}</span>
            <span className="stat-label">Participants</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">{stats.dojos}</span>
            <span className="stat-label">Dojos</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">{stats.activeRings}</span>
            <span className="stat-label">Active Rings</span>
          </div>

          <div className="stat-item">
            <span className="stat-number">{stats.matchesToday}</span>
            <span className="stat-label">Matches Today</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">
          Everything You Need During A Tournament
        </h2>

        <div className="features-grid">

          <div className="feature-card">
            <div className="feature-icon">🥊</div>
            <h3>Live Match Tracking</h3>
            <p>
              Follow active matches and scores in real time.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Tournament Brackets</h3>
            <p>
              Visualize athlete progression throughout the competition.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Competition Schedule</h3>
            <p>
              Know exactly when and where matches are happening.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Real-Time Scoreboard</h3>
            <p>
              Keep parents, coaches, and athletes informed instantly.
            </p>
          </div>

        </div>
      </section>

      {/* Upcoming Events */}
      <section className="events-section">
        <h2 className="section-title">
          Featured Tournament
        </h2>

        <div className="featured-event-card">
          <h3>🥋 National Karate Championship 2026</h3>

          <p>
            320 Participants • 42 Dojos • 8 Rings
          </p>

          <p>
            Follow live scores, brackets, rankings, and match progress.
          </p>

          <Link
            to="/dashboard"
            className="btn btn-primary"
          >
            Launch Tournament Dashboard
          </Link>
        </div>
      </section>
      {/* Featured Dojos */}

      {/* Latest News */}
     
      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>
            Experience A Martial Arts Tournament
            Like Never Before
          </h2>

          <p>
            Built to help parents, coaches, athletes, and organizers
            stay connected throughout every competition.
          </p>

          <Link
            to="/dashboard"
            className="btn btn-primary btn-large"
          >
            View Live Dashboard
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;