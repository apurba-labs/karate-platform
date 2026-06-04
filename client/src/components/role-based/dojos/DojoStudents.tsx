import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { useDojo } from '@/contexts/DojoContext';
import { useApi } from '@/hooks/useApi';
import AddStudentForm from './AddStudentForm';
import StudentDetails from './StudentDetails';
import '@/styles/components/DojoStudents.css';

interface Student {
  id: number;
  userId: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    dob?: string;
  };
  internalBeltRank: string;
  dateOfJoining: string;
  emergencyContact?: string;
  since: string;
  attendanceRate?: number;
  lastClassAttended?: string;
}

const DojoStudents: React.FC = () => {
  const { currentDojo } = useDojo();
  const api = useApi<any>();
  const navigate = useNavigate();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [beltFilter, setBeltFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(20);

  useEffect(() => {
    if (currentDojo?.id) {
      fetchStudents();
    }
  }, [currentDojo]);

  useEffect(() => {
    filterAndSortStudents();
  }, [students, searchTerm, beltFilter, sortBy, sortOrder]);

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await api.callApi(`/dojos/${currentDojo.id}/members`);
      
      if (response.ok) {
        const studentsData = await response.data;
        setStudents(Array.isArray(studentsData) ? studentsData : []);
      } else {
        setError('Failed to load students');
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setError('Failed to load students');
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortStudents = () => {
    let filtered = students.filter(student => {
      const matchesSearch = searchTerm === '' || 
        student.user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.user.email.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBelt = beltFilter === 'ALL' || student.internalBeltRank === beltFilter;
      
      return matchesSearch && matchesBelt;
    });

    // Sort students
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'name':
          aValue = `${a.user.firstName} ${a.user.lastName}`.toLowerCase();
          bValue = `${b.user.firstName} ${b.user.lastName}`.toLowerCase();
          break;
        case 'belt':
          aValue = a.internalBeltRank;
          bValue = b.internalBeltRank;
          break;
        case 'joinDate':
          aValue = new Date(a.dateOfJoining);
          bValue = new Date(b.dateOfJoining);
          break;
        case 'attendance':
          aValue = a.attendanceRate || 0;
          bValue = b.attendanceRate || 0;
          break;
        default:
          aValue = a.user.firstName.toLowerCase();
          bValue = b.user.firstName.toLowerCase();
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredStudents(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
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
      month: 'short',
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

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  const beltRanks = [
    'ALL',
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
      <div className="dojo-students">
        <div className="page-header">
          <h1>Student Management</h1>
          <p>Manage your dojo students and their progress</p>
        </div>
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dojo-students">
        <div className="page-header">
          <h1>Student Management</h1>
          <p>Manage your dojo students and their progress</p>
        </div>
        <div className="error-state">
          <div className="error-icon">⚠️</div>
          <h3>Error Loading Students</h3>
          <p>{error}</p>
          <button onClick={fetchStudents} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dojo-students">
      <div className="page-header">
        <div className="header-content">
          <div>
            <h1>Student Management</h1>
            <p>Manage {students.length} students in your dojo</p>
          </div>
          <div className="students-stats">
            <span className="stat-badge">
              Total: <strong>{students.length}</strong>
            </span>
            <span className="stat-badge">
              Showing: <strong>{filteredStudents.length}</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="students-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="filters">
          <select 
            value={beltFilter} 
            onChange={(e) => setBeltFilter(e.target.value)}
            className="filter-select"
          >
            {beltRanks.map(rank => (
              <option key={rank} value={rank}>
                {rank === 'ALL' ? 'All Belts' : rank}
              </option>
            ))}
          </select>

          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="name">Sort by Name</option>
            <option value="belt">Sort by Belt</option>
            <option value="joinDate">Sort by Join Date</option>
            <option value="attendance">Sort by Attendance</option>
          </select>
        </div>

        <div className="actions">
          <Link to={`/dojos/manage/students/add`} className="btn btn-primary">
            ＋ Add New Student
          </Link>
          <button onClick={fetchStudents} className="btn btn-outline">
            ↻ Refresh
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="students-content">
        {filteredStudents.length === 0 ? (
          <div className="empty-state">
            <div className="icon">👥</div>
            <h3>No students found</h3>
            <p>Try adjusting your search or filters</p>
            {(searchTerm || beltFilter !== 'ALL') && (
              <button 
                onClick={() => { setSearchTerm(''); setBeltFilter('ALL'); }}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className="students-table-container">
              <table className="students-table">
                <thead>
                  <tr>
                    <th onClick={() => handleSort('name')} className="sortable">
                      Student {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th>Contact</th>
                    <th onClick={() => handleSort('belt')} className="sortable">
                      Belt Rank {sortBy === 'belt' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th>Age</th>
                    <th onClick={() => handleSort('joinDate')} className="sortable">
                      Joined {sortBy === 'joinDate' && (sortOrder === 'asc' ? '↑' : '↓')}
                    </th>
                    <th>Attendance</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentStudents.map((student) => (
                    <tr key={student.id} className="student-row">
                      <td>
                        <div className="student-info">
                          <div className="student-avatar">
                            {student.user.firstName[0]}{student.user.lastName[0]}
                          </div>
                          <div>
                            <div className="student-name">
                              {student.user.firstName} {student.user.lastName}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="contact-info">
                          <div>{student.user.email}</div>
                          {student.user.phone && (
                            <div className="phone">{student.user.phone}</div>
                          )}
                        </div>
                      </td>
                      <td>
                        <span 
                          className="belt-badge"
                          style={{ 
                            backgroundColor: getBeltColor(student.internalBeltRank),
                            color: student.internalBeltRank === 'Black Belt' ? 'white' : 'black'
                          }}
                        >
                          {student.internalBeltRank}
                        </span>
                      </td>
                      <td>
                        {student.user.dob ? calculateAge(student.user.dob) : 'N/A'}
                      </td>
                      <td>
                        {formatDate(student.dateOfJoining)}
                      </td>
                      <td>
                        <div className="attendance-info">
                          {student.attendanceRate ? (
                            <>
                              <div className="attendance-rate">{student.attendanceRate}%</div>
                              {student.lastClassAttended && (
                                <div className="last-class">
                                  Last: {formatDate(student.lastClassAttended)}
                                </div>
                              )}
                            </>
                          ) : (
                            <span className="no-data">No data</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button
                            onClick={() => navigate(`/dojos/manage/students/${student.userId}`)}
                            className="btn btn-sm btn-outline"
                          >
                            View
                          </button>
                          <button className="btn btn-sm btn-primary">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                >
                  ← Previous
                </button>
                
                <div className="pagination-info">
                  Page {currentPage} of {totalPages}
                  <span className="students-count">
                    (Showing {indexOfFirstStudent + 1}-{Math.min(indexOfLastStudent, filteredStudents.length)} of {filteredStudents.length})
                  </span>
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="pagination-btn"
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Create a wrapper component for the students section
export const DojoStudentsSection: React.FC = () => {
  return (
    <Routes>
      <Route index element={<DojoStudents />} />
      <Route path="add" element={<AddStudentForm />} />
      <Route path=":studentId" element={<StudentDetails />} />
    </Routes>
  );
};

export default DojoStudentsSection;