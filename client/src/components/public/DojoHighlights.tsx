import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Dojo {
  id: number;
  name: string;
  city: string;
  country: string;
  description: string;
  logoUrl?: string;
  memberCount: number;
  isApproved: boolean;
}

// Dummy dojos
  const dummyDojos = [
    {
      id: 1,
      name: "Elite Dojo",
      city: "Tokyo, Japan",
      country: "/images/dojo1.jpg",
      memberCount: 150,
      description: "A top-tier dojo known for producing world-class champions.",
      imageUrl: "/images/dojo2.jpg",
      isApproved:true
    },
    {
      id: 2,
      name: "Dragon Spirit Karate Club",
      city: "Bangkok, Thailand",
      imageUrl: "/images/dojo2.jpg",
      country: "Thailand",
      memberCount: 95,
      description: "Focused on discipline and kata excellence.",
      isApproved:true
    },
  ];

const DojoHighlights: React.FC = () => {
  const [featuredDojos, setFeaturedDojos] = useState<Dojo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedDojos();
  }, []);

  const fetchFeaturedDojos = async () => {
    try {
      //const response = await fetch('/api/dojos/featured');
      
      setFeaturedDojos(dummyDojos);
    } catch (error) {
      console.error('Error fetching featured dojos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dojos...</div>;
  }

  if (featuredDojos.length === 0) {
    return (
      <div className="dojo-highlights">
        <div className="empty-dojos">
          <p>No featured dojos available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dojo-highlights">
      <div className="dojos-grid">
        {featuredDojos.map(dojo => (
          <div key={dojo.id} className="dojo-card">
            <div className="dojo-image">
              {dojo.logoUrl ? (
                <img src={dojo.logoUrl} alt={dojo.name} />
              ) : (
                <div className="dojo-placeholder">🥋</div>
              )}
            </div>
            
            <div className="dojo-content">
              <h3 className="dojo-name">{dojo.name}</h3>
              <p className="dojo-location">{dojo.city}, {dojo.country}</p>
              <p className="dojo-description">{dojo.description.substring(0, 100)}...</p>
              
              <div className="dojo-stats">
                <span className="members-count">
                  👥 {dojo.memberCount} members
                </span>
                {dojo.isApproved && (
                  <span className="verified-badge">✅ Verified</span>
                )}
              </div>

              <div className="dojo-actions">
                <Link to={`/dojos/${dojo.id}`} className="btn btn-outline btn-small">
                  View Dojo
                </Link>
                <Link to={`/dojos/${dojo.id}/join`} className="btn btn-primary btn-small">
                  Join Dojo
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DojoHighlights;