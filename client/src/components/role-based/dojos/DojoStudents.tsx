import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AddStudentForm from './AddStudentForm';

const DojoStudents: React.FC = () => {
  return (
    <div className="dojo-students">
      <div className="page-header">
        <h1>Student Management</h1>
        <p>Manage your dojo students and their progress</p>
      </div>

      <div className="page-actions">
        <Link to={`/dojos/manage/students/add`} className="btn btn-primary">
          ＋ Add New Student
        </Link>
      </div>

      <div className="students-content">
        {/* Students list component will go here */}
        <div className="empty-state">
          <div className="icon">👥</div>
          <h3>No students yet</h3>
          <p>Add your first student to get started</p>
        </div>
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
    </Routes>
  );
};

export default DojoStudentsSection;