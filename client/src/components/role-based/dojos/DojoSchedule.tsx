// src/components/role-based/coach/dojos/DojoSettings.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import DojoSettingsForm from '@/components/dojos/DojoSettingsForm';

const DojoSchedule: React.FC = () => {
  const { dojoId } = useParams();

  return (
    <div className="dojo-settings">
      <div className="page-header">
        <h1>Dojo Settings</h1>
        <p>Configure your dojo preferences and management options</p>
      </div>

      <div className="settings-content">
        <DojoSettingsForm 
          dojoId={parseInt(dojoId || '0')} 
          onSave={() => {
            // Show success message
            console.log('Settings saved successfully');
          }}
        />
      </div>
    </div>
  );
};

export default DojoSchedule;