import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import NewsList from '@/components/public/NewsList';
import EventCarousel from '@/components/public/EventCarousel';
import DojoHighlights from '@/components/public/DojoHighlights';

import '@/styles/home.css'

const Home: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [featuredEvents, setFeaturedEvents] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 1000,
    totalDojos: 3,
    totalEvents: 3,
    activeMembers: 800
  });
// Dummy events
  const dummyEvents = [
    {
      id: 1,
      title: "National Karate Championship 2025",
      date: "2025-10-10",
      location: "Tokyo, Japan",
      imageUrl: "/images/event1.jpg",
      description: "A grand event featuring top karate athletes from across the nation."
    },
    {
      id: 2,
      title: "World Karate Open Tournament",
      date: "2025-11-15",
      location: "New York, USA",
      imageUrl: "/images/event2.jpg",
      description: "Compete against the world's best karatekas and test your skills."
    },
    {
      id: 3,
      title: "Junior Karate League",
      date: "2025-12-05",
      location: "Bangkok, Thailand",
      imageUrl: "/images/event3.jpg",
      description: "Special tournament for young karate talents to showcase their abilities."
    }
  ];

  // Dummy dojos
  const dummyDojos = [
    {
      id: 1,
      name: "Tokyo Elite Dojo",
      location: "Tokyo, Japan",
      imageUrl: "/images/dojo1.jpg",
      members: 150,
      description: "A top-tier dojo known for producing world-class champions."
    },
    {
      id: 2,
      name: "Dragon Spirit Karate Club",
      location: "Bangkok, Thailand",
      imageUrl: "/images/dojo2.jpg",
      members: 95,
      description: "Focused on discipline and kata excellence."
    },
    {
      id: 3,
      name: "Karate Warriors Academy",
      location: "New York, USA",
      imageUrl: "/images/dojo3.jpg",
      members: 120,
      description: "Offering modern and traditional karate training."
    }
  ];
  useEffect(() => {
    fetchHomeData();
  }, []);

  const fetchHomeData = async () => {
    try {
      //const [eventsResponse, statsResponse] = await Promise.all([
      //  fetch('/api/events/featured'),
      //  fetch('/api/stats')
      //]);
      setFeaturedEvents(dummyEvents);
      setStats({
        totalUsers: 1000,
        totalDojos: dummyDojos.length,     // example count
        totalEvents: dummyEvents.length,   // example count
        activeMembers: 800
      });                                  //
    } catch (error) {
      console.error('Error fetching home data:', error);
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to the World Karate Platform
          </h1>
          <p className="hero-subtitle">
            The complete solution for martial arts organizations, dojos, and athletes worldwide.
            Manage events, track progress, and connect with the global karate community.
          </p>
          
          <div className="hero-actions">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="btn btn-primary btn-large">
                  Join Now
                </Link>
                <Link to="/login" className="btn btn-outline btn-large">
                  Sign In
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="btn btn-primary btn-large">
                  Go to Dashboard
                </Link>
                <Link to="/events" className="btn btn-outline btn-large">
                  Browse Events
                </Link>
              </>
            )}
          </div>
        </div>
        
        <div className="hero-image">
          <img 
            src="/hero-karate.jpg" 
            alt="Karate practitioners" 
            className="hero-img"
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{stats.totalUsers.toLocaleString()}</span>
            <span className="stat-label">Registered Members</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.totalDojos.toLocaleString()}</span>
            <span className="stat-label">Active Dojos</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.totalEvents.toLocaleString()}</span>
            <span className="stat-label">Tournaments</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{stats.activeMembers.toLocaleString()}</span>
            <span className="stat-label">Active This Month</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Tournament Management</h3>
            <p>Complete event organization with bracket generation, registration, and real-time scoring.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Progress Tracking</h3>
            <p>Monitor your development with detailed analytics, belt progression, and skill mastery.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Global Community</h3>
            <p>Connect with dojos and athletes worldwide. Share knowledge and compete internationally.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Real-time Updates</h3>
            <p>Live scoring, instant notifications, and up-to-date rankings and results.</p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="events-section">
        <h2 className="section-title">Upcoming Events</h2>
        <EventCarousel events={featuredEvents} />
        <div className="section-actions">
          <Link to="/events" className="btn btn-outline">
            View All Events
          </Link>
        </div>
      </section>

      {/* Featured Dojos */}
      <section className="dojos-section">
        <h2 className="section-title">Featured Dojos</h2>
        <DojoHighlights />
        <div className="section-actions">
          <Link to="/dojos" className="btn btn-outline">
            Browse All Dojos
          </Link>
        </div>
      </section>

      {/* Latest News */}
      <section className="news-section">
        <h2 className="section-title">Latest News</h2>
        <NewsList />
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Begin Your Journey?</h2>
          <p>Join thousands of martial artists who trust our platform for their training and competition needs.</p>
          {!isAuthenticated ? (
            <Link to="/register" className="btn btn-primary btn-large">
              Create Your Account
            </Link>
          ) : (
            <Link to="/dashboard" className="btn btn-primary btn-large">
              Explore Your Dashboard
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;