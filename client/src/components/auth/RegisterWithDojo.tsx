import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'

interface DojoOption {
  id: number;
  name: string;
  city: string;
  country: string;
}

const RegisterWithDojo: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    role: 'ATHLETE' as const,
    inviteCode: ''
  });
  
  const [dojos, setDojos] = useState<DojoOption[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();

  // Search for dojos
  const searchDojos = async (query: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/dojos?search=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setDojos(data);
      }
    } catch (error) {
      console.error('Search dojos error:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await register(formData);
    
    if (!result.success) {
      setError(result.error || 'Registration failed');
    }
    
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        
        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Date of Birth:</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Role:</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="ATHLETE">Athlete</option>
            <option value="COACH">Coach</option>
            <option value="REFEREE">Referee</option>
          </select>
        </div>

        {/* Dojo Selection Section */}
        <div className="form-section">
          <h3>Dojo Membership (Optional)</h3>
          
          <div className="form-group">
            <label>Search for Dojo:</label>
            <input
              type="text"
              placeholder="Search dojos by name, city, or country"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                searchDojos(e.target.value);
              }}
            />
          </div>

          {dojos.length > 0 && (
            <div className="dojo-results">
              <label>Select Dojo:</label>
              <select
                name="dojoId"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="">-- Select a Dojo --</option>
                {dojos.map(dojo => (
                  <option key={dojo.id} value={dojo.id}>
                    {dojo.name} - {dojo.city}, {dojo.country}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="form-group">
            <label>Or use invitation code:</label>
            <input
              type="text"
              name="inviteCode"
              value={formData.inviteCode}
              onChange={handleChange}
              placeholder="Enter invitation code"
            />
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>

      <div className="auth-links">
        <p>Already have an account? <a href="/login">Login here</a></p>
        <p>Want to join a dojo later? <a href="/register">Skip for now</a></p>
      </div>
    </div>
  );
};

export default RegisterWithDojo;