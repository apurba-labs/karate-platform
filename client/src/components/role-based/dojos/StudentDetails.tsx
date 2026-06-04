// StudentDetails.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDojo } from '@/contexts/DojoContext';
import { useApi } from '@/hooks/useApi';
import '@/styles/components/StudentDetails.css';

interface StudentDetails {
  id: number;
  userId: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dob?: string;
    username: string;
    country?: string;
    bio?: string;
  };
  dojo: {
    id: number;
    name: string;
  };
  internalBeltRank: string;
  dateOfJoining: string;
  emergencyContact?: string;
  notes?: string;
  since: string;
  isPrimary: boolean;
  parentId?: number;
  parent?: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  license?: {
    licenseNumber: string;
    issueDate: string;
    expiryDate: string;
    status: 'ACTIVE' | 'EXPIRED' | 'PENDING';
  };
  attendance?: {
    totalClasses: number;
    attendedClasses: number;
    attendanceRate: number;
    lastAttendance: string;
    streak: number;
  };
  curriculum?: {
    currentLevel: string;
    nextLevel: string;
    progress: number;
    lastTestDate?: string;
    nextTestDate?: string;
  };
  payments?: {
    lastPaymentDate: string;
    nextPaymentDate: string;
    status: 'PAID' | 'PENDING' | 'OVERDUE';
    amount: number;
  };
}

const StudentDetails: React.FC = () => {
  const { studentId } = useParams();
  const { currentDojo } = useDojo();
  const navigate = useNavigate();
  const api = useApi<any>();
  
  const [student, setStudent] = useState<StudentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (studentId && currentDojo?.id) {
      fetchStudentDetails();
    }
  }, [studentId, currentDojo]);

  const fetchStudentDetails = async () => {
    try {
      setIsLoading(true);
      const response = await api.callApi(`/dojos/${currentDojo.id}/members/${studentId}`);
      
      if (response.ok) {
        const studentData = await response.data;
        setStudent(studentData);
      } else {
        setError('Student not found');
      }
    } catch (error) {
      console.error('Error fetching student details:', error);
      setError('Failed to load student details');
    } finally {
      setIsLoading(false);
    }
  };

  const getBeltColor = (beltRank: string) => {
    const beltColors: { [key: string]: string } = {
      'White Belt': '#f8f9fa',
      'Yellow Belt': '#ffd700',
      'Orange Belt': '#ffa500',
      'Green Belt': '#28a745',
      'Blue Belt': '#007bff',
      'Purple Belt': '#6f42c1',
      'Brown Belt': '#8b4513',
      'Black Belt': '#000000'
    };
    return beltColors[beltRank] || '#6c757d';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (dob: string) => {
    if (!dob) return 'N/A';
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const getDaysSinceJoining = (joinDate: string) => {
    const join = new Date(joinDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - join.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return (
      <div className="student-details-page">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading student details...</p>
        </div>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className="student-details-page">
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>{error || 'Student not found'}</h3>
          <button onClick={() => navigate(-1)} className="btn btn-primary">
            Back to Students
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="student-details-page">
      {/* Header Section */}
      <div className="student-header">
        <div className="header-main">
          <button onClick={() => navigate(-1)} className="btn btn-outline btn-sm">
            ← Back to Students
          </button>
          <div className="student-profile">
            <div className="profile-avatar">
              {student.user.firstName[0]}{student.user.lastName[0]}
            </div>
            <div className="profile-info">
              <h1>{student.user.firstName} {student.user.lastName}</h1>
              <div className="profile-meta">
                <span 
                  className="belt-badge"
                  style={{ 
                    backgroundColor: getBeltColor(student.internalBeltRank),
                    color: student.internalBeltRank === 'Black Belt' ? 'white' : 'black'
                  }}
                >
                  {student.internalBeltRank}
                </span>
                <span className="member-since">
                  Member since {formatDate(student.dateOfJoining)}
                </span>
                <span className="attendance-rate">
                  {student.attendance?.attendanceRate || 0}% Attendance
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <Link 
            to={`/dojos/${currentDojo?.id}/manage/students/${student.userId}/edit`}
            className="btn btn-primary"
          >
            Edit Profile
          </Link>
          <Link 
            to={`/dojos/${currentDojo?.id}/manage/students`}
            className="btn btn-outline"
          >
            All Students
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="student-tabs">
        <button 
          className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button 
          className={`tab-btn ${activeTab === 'attendance' ? 'active' : ''}`}
          onClick={() => setActiveTab('attendance')}
        >
          📅 Attendance
        </button>
        <button 
          className={`tab-btn ${activeTab === 'curriculum' ? 'active' : ''}`}
          onClick={() => setActiveTab('curriculum')}
        >
          🥋 Curriculum
        </button>
        <button 
          className={`tab-btn ${activeTab === 'payments' ? 'active' : ''}`}
          onClick={() => setActiveTab('payments')}
        >
          💰 Payments
        </button>
        <button 
          className={`tab-btn ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          📑 Documents
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="details-grid">
              {/* Personal Information */}
              <div className="detail-section">
                <h3>👤 Personal Information</h3>
                <div className="detail-cards">
                  <div className="detail-card">
                    <label>Full Name</label>
                    <p>{student.user.firstName} {student.user.lastName}</p>
                  </div>
                  <div className="detail-card">
                    <label>Date of Birth</label>
                    <p>
                      {student.user.dob ? formatDate(student.user.dob) : 'Not provided'}
                      {student.user.dob && ` (${calculateAge(student.user.dob)} years old)`}
                    </p>
                  </div>
                  <div className="detail-card">
                    <label>Username</label>
                    <p>{student.user.username}</p>
                  </div>
                  <div className="detail-card">
                    <label>Country</label>
                    <p>{student.user.country || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="detail-section">
                <h3>📞 Contact Information</h3>
                <div className="detail-cards">
                  <div className="detail-card">
                    <label>Email Address</label>
                    <p>{student.user.email}</p>
                  </div>
                  <div className="detail-card">
                    <label>Phone Number</label>
                    <p>{student.user.phone || 'Not provided'}</p>
                  </div>
                  <div className="detail-card">
                    <label>Emergency Contact</label>
                    <p>{student.emergencyContact || 'Not provided'}</p>
                  </div>
                </div>
              </div>

              {/* Dojo Information */}
              <div className="detail-section">
                <h3>🥋 Dojo Information</h3>
                <div className="detail-cards">
                  <div className="detail-card">
                    <label>Current Dojo</label>
                    <p>{student.dojo.name}</p>
                  </div>
                  <div className="detail-card">
                    <label>Date of Joining</label>
                    <p>{formatDate(student.dateOfJoining)} ({getDaysSinceJoining(student.dateOfJoining)} days)</p>
                  </div>
                  <div className="detail-card">
                    <label>Primary Dojo</label>
                    <p>{student.isPrimary ? 'Yes' : 'No'}</p>
                  </div>
                  <div className="detail-card">
                    <label>Member Since</label>
                    <p>{formatDate(student.since)}</p>
                  </div>
                </div>
              </div>

              {/* Parent/Guardian Information */}
              {student.parent && (
                <div className="detail-section">
                  <h3>👨‍👩‍👧‍👦 Parent/Guardian Information</h3>
                  <div className="detail-cards">
                    <div className="detail-card">
                      <label>Parent Name</label>
                      <p>{student.parent.firstName} {student.parent.lastName}</p>
                    </div>
                    <div className="detail-card">
                      <label>Parent Email</label>
                      <p>{student.parent.email}</p>
                    </div>
                    <div className="detail-card">
                      <label>Parent Phone</label>
                      <p>{student.parent.phone}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* License Information */}
              {student.license && (
                <div className="detail-section">
                  <h3>📜 License Information</h3>
                  <div className="detail-cards">
                    <div className="detail-card">
                      <label>License Number</label>
                      <p>{student.license.licenseNumber}</p>
                    </div>
                    <div className="detail-card">
                      <label>Issue Date</label>
                      <p>{formatDate(student.license.issueDate)}</p>
                    </div>
                    <div className="detail-card">
                      <label>Expiry Date</label>
                      <p className={student.license.status === 'EXPIRED' ? 'expired' : ''}>
                        {formatDate(student.license.expiryDate)}
                        {student.license.status === 'EXPIRED' && ' (Expired)'}
                      </p>
                    </div>
                    <div className="detail-card">
                      <label>Status</label>
                      <p className={`status-${student.license.status.toLowerCase()}`}>
                        {student.license.status}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              {student.notes && (
                <div className="detail-section">
                  <h3>📝 Notes</h3>
                  <div className="notes-card">
                    <p>{student.notes}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'attendance' && (
          <div className="attendance-tab">
            <div className="attendance-stats">
              <div className="stat-card">
                <div className="stat-value">{student.attendance?.attendanceRate || 0}%</div>
                <div className="stat-label">Overall Attendance</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{student.attendance?.attendedClasses || 0}</div>
                <div className="stat-label">Classes Attended</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{student.attendance?.totalClasses || 0}</div>
                <div className="stat-label">Total Classes</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">{student.attendance?.streak || 0}</div>
                <div className="stat-label">Current Streak</div>
              </div>
            </div>
            
            <div className="attendance-actions">
              <Link 
                to={`/dojos/${currentDojo?.id}/attendance?student=${student.userId}`}
                className="btn btn-primary"
              >
                View Attendance History
              </Link>
              <Link 
                to={`/dojos/${currentDojo?.id}/schedule`}
                className="btn btn-outline"
              >
                Class Schedule
              </Link>
            </div>
            
            {student.attendance?.lastAttendance && (
              <div className="last-attendance">
                <h4>Last Class Attended</h4>
                <p>{formatDate(student.attendance.lastAttendance)}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'curriculum' && (
          <div className="curriculum-tab">
            {student.curriculum ? (
              <>
                <div className="curriculum-progress">
                  <h4>Current Progress</h4>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${student.curriculum.progress}%` }}
                    ></div>
                  </div>
                  <div className="progress-info">
                    <span>{student.curriculum.progress}% Complete</span>
                    <span>Next: {student.curriculum.nextLevel}</span>
                  </div>
                </div>

                <div className="curriculum-details">
                  <div className="detail-card">
                    <label>Current Level</label>
                    <p>{student.curriculum.currentLevel}</p>
                  </div>
                  <div className="detail-card">
                    <label>Next Level</label>
                    <p>{student.curriculum.nextLevel}</p>
                  </div>
                  {student.curriculum.lastTestDate && (
                    <div className="detail-card">
                      <label>Last Test Date</label>
                      <p>{formatDate(student.curriculum.lastTestDate)}</p>
                    </div>
                  )}
                  {student.curriculum.nextTestDate && (
                    <div className="detail-card">
                      <label>Next Test Date</label>
                      <p>{formatDate(student.curriculum.nextTestDate)}</p>
                    </div>
                  )}
                </div>

                <div className="curriculum-actions">
                  <Link 
                    to={`/dojos/${currentDojo?.id}/curriculum?student=${student.userId}`}
                    className="btn btn-primary"
                  >
                    View Full Curriculum
                  </Link>
                  <Link 
                    to={`/dojos/${currentDojo?.id}/promotions?student=${student.userId}`}
                    className="btn btn-outline"
                  >
                    Belt Promotion History
                  </Link>
                </div>
              </>
            ) : (
              <div className="no-data">
                <p>No curriculum data available</p>
                <Link 
                  to={`/dojos/${currentDojo?.id}/curriculum`}
                  className="btn btn-primary"
                >
                  Assign Curriculum
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="payments-tab">
            {student.payments ? (
              <>
                <div className="payment-status">
                  <h4>Payment Status</h4>
                  <div className={`status-badge status-${student.payments.status.toLowerCase()}`}>
                    {student.payments.status}
                  </div>
                </div>
                
                <div className="payment-details">
                  <div className="detail-card">
                    <label>Last Payment</label>
                    <p>{formatDate(student.payments.lastPaymentDate)}</p>
                  </div>
                  <div className="detail-card">
                    <label>Next Payment Due</label>
                    <p>{formatDate(student.payments.nextPaymentDate)}</p>
                  </div>
                  <div className="detail-card">
                    <label>Monthly Amount</label>
                    <p>${student.payments.amount}</p>
                  </div>
                </div>

                <div className="payment-actions">
                  <Link 
                    to={`/dojos/${currentDojo?.id}/payments?student=${student.userId}`}
                    className="btn btn-primary"
                  >
                    Payment History
                  </Link>
                  <button className="btn btn-outline">
                    Record Payment
                  </button>
                </div>
              </>
            ) : (
              <div className="no-data">
                <p>No payment information available</p>
                <Link 
                  to={`/dojos/${currentDojo?.id}/payments`}
                  className="btn btn-primary"
                >
                  Set Up Payments
                </Link>
              </div>
            )}
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="documents-tab">
            <div className="documents-actions">
              <button className="btn btn-primary">
                Upload Document
              </button>
              <Link 
                to={`/dojos/${currentDojo?.id}/documents?student=${student.userId}`}
                className="btn btn-outline"
              >
                View All Documents
              </Link>
            </div>
            
            <div className="documents-list">
              <p>Document management coming soon...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetails;