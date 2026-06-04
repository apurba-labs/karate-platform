import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          <div className="footer-section">
            <h3 className="text-white text-xl mb-4">Karate Platform</h3>
            <p className="mb-4 leading-relaxed">Built to help parents, coaches, athletes and organizers follow martial arts tournaments in real time.</p>
          </div>

          <div className="footer-section">
            <h4 className="text-white text-lg mb-4">Live Dashboard</h4>
            <ul className="list-none p-0">
              <li className="mb-2"><Link to="/brackets" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Brackets</Link></li>
              <li className="mb-2"><Link to="/tournament-dashboard" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Schedule</Link></li>
              <li className="mb-2"><Link to="/tournament-dashboard" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Leaderboard</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="text-white text-lg mb-4">Management</h4>
            <ul className="list-none p-0">
              <li className="mb-2"><Link to="/tournament-center" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Tournament Center</Link></li>
              <li className="mb-2"><Link to="/tournament-center" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Participants</Link></li>
              <li className="mb-2"><Link to="/tournament-center" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Match Control</Link></li>
              <li className="mb-2"><Link to="/tournament-center" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Reports</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="text-white text-xl mb-4">Project Story</h3>
            <p className="mb-4 leading-relaxed">Built to help parents, coaches, athletes and organizers follow martial arts tournaments in real time.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;