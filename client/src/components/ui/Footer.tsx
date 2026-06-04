import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 pt-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8">
          <div className="footer-section">
            <h3 className="text-white text-xl mb-4">Karate Platform</h3>
            <p className="mb-4 leading-relaxed">The complete solution for martial arts organizations, dojos, and federations.</p>
            <div className="social-links flex gap-4 mt-4">
              <a href="#" aria-label="Facebook" className="inline-block w-10 h-10 bg-gray-700 rounded-full text-center leading-10 text-white hover:bg-red-500 hover:-translate-y-1 transition-all duration-300">📘</a>
              <a href="#" aria-label="Twitter" className="inline-block w-10 h-10 bg-gray-700 rounded-full text-center leading-10 text-white hover:bg-red-500 hover:-translate-y-1 transition-all duration-300">🐦</a>
              <a href="#" aria-label="Instagram" className="inline-block w-10 h-10 bg-gray-700 rounded-full text-center leading-10 text-white hover:bg-red-500 hover:-translate-y-1 transition-all duration-300">📸</a>
              <a href="#" aria-label="YouTube" className="inline-block w-10 h-10 bg-gray-700 rounded-full text-center leading-10 text-white hover:bg-red-500 hover:-translate-y-1 transition-all duration-300">📺</a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="text-white text-lg mb-4">Quick Links</h4>
            <ul className="list-none p-0">
              <li className="mb-2"><Link to="/" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Home</Link></li>
              <li className="mb-2"><Link to="/events" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Events</Link></li>
              <li className="mb-2"><Link to="/dojos" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Dojos</Link></li>
              <li className="mb-2"><Link to="/rankings" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Rankings</Link></li>
              <li className="mb-2"><Link to="/about" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">About Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="text-white text-lg mb-4">Resources</h4>
            <ul className="list-none p-0">
              <li className="mb-2"><Link to="/rules" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Rules & Regulations</Link></li>
              <li className="mb-2"><Link to="/faq" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">FAQ</Link></li>
              <li className="mb-2"><Link to="/support" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Support</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Contact</Link></li>
              <li className="mb-2"><Link to="/privacy" className="text-gray-300 hover:text-white hover:underline transition-all duration-300">Privacy Policy</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="text-white text-lg mb-4">Connect</h4>
            <div className="contact-info space-y-2">
              <p className="flex items-center gap-2 mb-2">📧 info@karateplatform.com</p>
              <p className="flex items-center gap-2 mb-2">📞 +880 1798 161526</p>
              <p className="flex items-center gap-2 mb-2">📍 123 Martial Arts Way, Dojo City</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>&copy; 2026 Karate Platform. All rights reserved.</p>
            <div className="footer-bottom-links flex flex-wrap justify-center gap-4 md:gap-6">
              <Link to="/terms" className="text-gray-500 hover:text-white hover:underline text-sm transition-all duration-300">Terms of Service</Link>
              <Link to="/privacy" className="text-gray-500 hover:text-white hover:underline text-sm transition-all duration-300">Privacy Policy</Link>
              <Link to="/cookies" className="text-gray-500 hover:text-white hover:underline text-sm transition-all duration-300">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;