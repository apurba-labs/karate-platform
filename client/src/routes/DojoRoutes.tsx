import React from 'react';
import { Routes, Route } from 'react-router-dom';
import DojoManagementLayout from '@/components/role-based/dojos/DojoManagementLayout';
import DojoOverview from '@/components/role-based/dojos/DojoOverview';
import { DojoStudentsSection } from '@/components/role-based/dojos/DojoStudents';
//import DojoStudents from '@/components/role-based/dojos/DojoStudents';
import DojoAttendance from '@/components/role-based/dojos/DojoAttendance';
import DojoSchedule from '@/components/role-based/dojos/DojoSchedule';
import DojoPromotions from '@/components/role-based/dojos/DojoPromotions';
import DojoCurriculum from '@/components/role-based/dojos/DojoCurriculum';
import DojoSettings from '@/components/role-based/dojos/DojoSettings';
import DojoReports from '@/components/role-based/dojos/DojoReports';

const DojoRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="manage" element={<DojoManagementLayout />}>
        <Route index element={<DojoOverview />} />
        <Route path="students/*" element={<DojoStudentsSection />} />
        <Route path="attendance" element={<DojoAttendance />} />
        <Route path="schedule" element={<DojoSchedule />} />
        <Route path="curriculum" element={<DojoCurriculum />} />
        <Route path="promotions" element={<DojoPromotions />} />
        <Route path="settings" element={<DojoSettings />} />
        <Route path="reports" element={<DojoReports />} />
      </Route>
    </Routes>
  );
};

export default DojoRoutes;