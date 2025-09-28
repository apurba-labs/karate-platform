import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '@/styles/components/auth.css';

// Add role options based on your Prisma schema
const ROLE_OPTIONS = [
  { value: 'ATHLETE', label: 'Athlete' },
  { value: 'COACH', label: 'Dojo Owner/Coach' },
  { value: 'REFEREE', label: 'Referee' },
  { value: 'ORGANIZER', label: 'Event Organizer' }
  //{ value: 'ADMIN', label: 'Administrator' }
];

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dob: '',
    country: '',
    bio: '',
    role: 'ATHLETE', // Default role
    agreeToTerms: false
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showOptionalFields, setShowOptionalFields] = useState(false);

  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Form data:', formData); // Debug log
    
    // Validation
    if (!formData.username || !formData.password) {
      setError('Username and password are required');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!formData.agreeToTerms) {
      setError('You must agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      console.log('Calling register function...'); 
      const userData = {
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        dob: formData.dob || undefined,
        country: formData.country || undefined,
        bio: formData.bio || undefined
      };
      const result = await register(userData);
      if (result.success) {
        console.log('Register result:', result);
      } else {
        setError(result.error || 'Registration failed');
      }
      
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Join Karate Platform</h2>
          <p>Create your account to get started</p>
        </div>
        
        <div className="auth-body">
          {error && (
            <div className="auth-message error">
              {error}
            </div>
          )}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Required Fields */}
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username <span className="required">*</span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
                placeholder="Choose a username"
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password <span className="required">*</span>
              </label>
              <div className="password-toggle">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a password (min. 6 characters)"
                  minLength={6}
                  autoComplete="new-password"
                />
                <button type="button" className="password-toggle-btn">
                  👁️
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password <span className="required">*</span>
              </label>
              <div className="password-toggle">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button type="button" className="password-toggle-btn">
                  👁️
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="firstName" className="form-label">
                First Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="form-control"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
                autoComplete="given-name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="form-label">
                Last Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="form-control"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
                autoComplete="family-name"
              />
            </div>

            {/* Role Selection - REQUIRED */}
            <div className="form-group">
              <label htmlFor="role" className="form-label">
                Account Type <span className="required">*</span>
              </label>
              <select
                id="role"
                name="role"
                className="form-control"
                value={formData.role}
                onChange={handleChange}
                required
              >
                {ROLE_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <small className="form-text">
                Select the type of account you need
              </small>
            </div>

            {/* Optional Fields Toggle */}
            <div className="optional-fields-toggle">
              <button 
                type="button" 
                className="toggle-btn"
                onClick={() => setShowOptionalFields(!showOptionalFields)}
              >
                {showOptionalFields ? 'Hide' : 'Show'} Optional Fields
                <span className={`arrow ${showOptionalFields ? 'up' : 'down'}`}>▼</span>
              </button>
            </div>

            {/* Optional Fields */}
            {showOptionalFields && (
              <div className="optional-fields">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email (optional)"
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-control"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number (optional)"
                    autoComplete="tel"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dob" className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    className="form-control"
                    value={formData.dob}
                    onChange={handleChange}
                    max={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="country" className="form-label">Country</label>
                  <select
                    id="country"
                    name="country"
                    className="form-control"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option value="">Select your country (optional)</option>
                    <option value="US">United States</option>
                    <option value="JP">Japan</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    {/* Add more countries as needed */}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="bio" className="form-label">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    className="form-control"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about yourself (optional)"
                    rows={3}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  required
                />
                I agree to the <Link to="/terms" target="_blank">Terms of Service</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link>
              </label>
            </div>

            <button
              type="submit"
              className={`auth-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-divider">
            <span>Already have an account?</span>
          </div>

          <div className="auth-footer">
            <p className="auth-switch">
              <Link to="/login" className="auth-link">Sign in to your account</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;