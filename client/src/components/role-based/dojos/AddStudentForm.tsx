import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApi } from '@/hooks/useApi';
import { useDojo } from '@/contexts/DojoContext';

import '@/styles/components/AddStudentForm.css';

interface RegisterData {
  // User fields
  username: string;
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  dob: string;
  role: 'ATHLETE';
  
  // DojoMembers fields
  dojoId?: number;
  inviteCode?: string;
  since?: string;
  internalBeltRank?: string;
  dateOfJoining?: string;
  emergencyContact?: string;
  notes?: string;
  parentId?: number;
}

const AddStudentForm: React.FC = () => {
  const { currentDojo, isLoading, error: dojoError, refetchDojo } = useDojo();
  const navigate = useNavigate();
  const api = useApi<any>();

  // Redirect if no dojo found
  React.useEffect(() => {
    if (!isLoading && !currentDojo) {
      navigate('/dashboard');
    }
  }, [currentDojo, isLoading, navigate]);

  const [formData, setFormData] = useState<RegisterData>({
    username: '',
    email: '',
    phone: '',
    password: '',
    firstName: '',
    lastName: '',
    dob: '',
    role: 'ATHLETE',
    dojoId: currentDojo?.id,
    inviteCode: '',
    since: '',
    internalBeltRank: 'White Belt',
    dateOfJoining: new Date().toISOString().split('T')[0],
    emergencyContact: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Update formData when currentDojo is available
  React.useEffect(() => {
    if (currentDojo) {
      setFormData(prev => ({
        ...prev,
        dojoId: currentDojo.id
      }));
    }
  }, [currentDojo]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    // Validate dojoId is present
    if (!currentDojo?.id) {
      setSubmitError('No dojo selected. Please try again.');
      setIsSubmitting(false);
      return;
    }

    try {

      const userData = {
        username: formData.username,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        email: formData.email || undefined,
        phone: formData.phone || undefined,
        dob: formData.dob || undefined,
      };

      console.log('Creating user with data:', userData);

      const userResult  = await api.callApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify(userData),
      });

      if (!userResult.ok) {
        const errorData = await userResult.data;
        throw new Error(errorData?.message || 'Failed to add user account');
      }

      const newUser = await userResult.data;
      console.log('User created successfully:', newUser);

      // Add the user to the dojo as a member

      const now = new Date().toISOString();
      const dateOfJoining = formData.dateOfJoining ? new Date(formData.dateOfJoining).toISOString(): now;
      const dojoMemberData = {
        userId: newUser.user.id,
        dojoId: currentDojo.id,
        role: 'STUDENT',
        since: new Date().toISOString(),
        dateOfJoining: dateOfJoining,
        isPrimary: true,
        internalBeltRank: formData.internalBeltRank || 'White Belt',
        emergencyContact: formData.emergencyContact || undefined,
        notes: formData.notes || undefined,
        parentId: formData.parentId || undefined,
      };
      console.log('Adding to dojo with data:', dojoMemberData);
      const dojoMemberResult = await api.callApi('/dojos/add-member', {
          method: 'POST',
          body: JSON.stringify(dojoMemberData),
      });

      if (!dojoMemberResult.ok) {
        const errorData = await dojoMemberResult.data;
        throw new Error(errorData?.message || 'Failed to add student to dojo');
      }

      console.log('Student added to dojo successfully');
      navigate(`/dojos/manage/students`); 
      
    } catch (error) {
      console.error('Error creating student:', error);
      setSubmitError(error instanceof Error ? error.message : 'An error occurred while creating the student');
    } finally {
      setIsSubmitting(false);
    }
  };

  const beltRanks = [
    'White Belt',
    'Yellow Belt',
    'Orange Belt',
    'Green Belt',
    'Blue Belt',
    'Purple Belt',
    'Brown Belt',
    'Black Belt'
  ];

  if (isLoading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading dojo information...</p>
      </div>
    );
  }

  if (dojoError || !currentDojo) {
    return (
      <div className="dojo-management-error">
        <div className="error-icon">⚠️</div>
        <h3>Dojo Not Found</h3>
        <p>{dojoError || 'You need to create a dojo first'}</p>
        <button onClick={refetchDojo} className="btn btn-primary">
          Try Again
        </button>
        <Link to="/dashboard" className="btn btn-outline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="add-student-form">
      <div className="form-header">
        <h1>Add New Student</h1>
        <p>Create a new student account and add them to {currentDojo.name}</p>
      </div>

      <form onSubmit={handleSubmit} className="student-form">
        {submitError && (
          <div className="error-message">
            {submitError}
          </div>
        )}

        <div className="form-sections">
          {/* Personal Information */}
          <div className="form-section">
            <h3>👤 Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dob">Date of Birth</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          {/* Account Information */}
          <div className="form-section">
            <h3>🔐 Account Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="username">Username *</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                />
              </div>
            </div>
          </div>

          {/* Dojo Information */}
          <div className="form-section">
            <h3>🥋 Dojo Information</h3>
            <div className="dojo-info-banner">
              <strong>Dojo:</strong> {currentDojo.name} - {currentDojo.city}, {currentDojo.country}
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="internalBeltRank">Current Belt Rank</label>
                <select
                  id="internalBeltRank"
                  name="internalBeltRank"
                  value={formData.internalBeltRank}
                  onChange={handleInputChange}
                >
                  {beltRanks.map(rank => (
                    <option key={rank} value={rank}>{rank}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="dateOfJoining">Date of Joining</label>
                <input
                  type="date"
                  id="dateOfJoining"
                  name="dateOfJoining"
                  value={formData.dateOfJoining}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="emergencyContact">Emergency Contact</label>
                <input
                  type="text"
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  placeholder="Name and phone number"
                />
              </div>

              <div className="form-group full-width">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Any additional notes about the student..."
                />
              </div>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(`/dojos/manage/students`)}
            className="btn btn-outline"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Student...' : 'Create Student'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStudentForm;