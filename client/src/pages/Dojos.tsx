import React from 'react';
import { Outlet } from 'react-router-dom';

const Dojos: React.FC = () => {
  return (
    <div className="dojos-page">
      <Outlet />
    </div>
  );
};

export default Dojos;